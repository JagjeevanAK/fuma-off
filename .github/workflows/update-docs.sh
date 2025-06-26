#!/bin/bash

# OpenAPI Docs Update Script
# This script handles downloading and updating OpenAPI docs from various sources

set -e

# Load configuration
CONFIG_FILE="${GITHUB_WORKSPACE}/.github/workflows/config.env"
if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
else
    echo "Configuration file not found. Using default settings."
fi

# Default values
SOURCE_TYPE=${SOURCE_TYPE:-"github_repo"}
SOURCE_LOCATION=${SOURCE_LOCATION:-"docs/api/ref"}
TARGET_DIR=${TARGET_DIR:-"ref"}
BACKUP_ENABLED=${BACKUP_ENABLED:-"true"}

echo "🚀 Starting OpenAPI docs update process..."
echo "Source type: $SOURCE_TYPE"
echo "Source location: $SOURCE_LOCATION"
echo "Target directory: $TARGET_DIR"

# Create temporary directory
TEMP_DIR=$(mktemp -d)
echo "Created temporary directory: $TEMP_DIR"

download_from_github_repo() {
    local owner="$1"
    local repo="$2"
    local branch="$3"
    local path="$4"
    local temp_dir="$5"
    
    echo "📥 Downloading from GitHub repository: $owner/$repo/$path"
    
    # Use GitHub API to download the directory contents
    local api_url="https://api.github.com/repos/$owner/$repo/contents/$path?ref=$branch"
    
    # Download directory listing
    curl -s -H "Accept: application/vnd.github.v3+json" "$api_url" > "$temp_dir/listing.json"
    
    # Check if it's a directory or file
    if jq -r '.[0].type' "$temp_dir/listing.json" >/dev/null 2>&1; then
        # It's a directory
        jq -r '.[] | select(.type == "file") | .download_url' "$temp_dir/listing.json" | while read -r file_url; do
            filename=$(basename "$file_url")
            echo "  Downloading: $filename"
            curl -s -L "$file_url" -o "$temp_dir/$filename"
        done
        
        # Handle subdirectories recursively
        jq -r '.[] | select(.type == "dir") | .name' "$temp_dir/listing.json" | while read -r dir_name; do
            mkdir -p "$temp_dir/$dir_name"
            download_from_github_repo "$owner" "$repo" "$branch" "$path/$dir_name" "$temp_dir/$dir_name"
        done
    else
        # It's a single file
        local download_url=$(jq -r '.download_url' "$temp_dir/listing.json")
        local filename=$(jq -r '.name' "$temp_dir/listing.json")
        echo "  Downloading file: $filename"
        curl -s -L "$download_url" -o "$temp_dir/$filename"
    fi
}

download_from_url() {
    local url="$1"
    local temp_dir="$2"
    
    echo "📥 Downloading from URL: $url"
    wget -r -np -nH --cut-dirs=3 -P "$temp_dir/" "$url" || \
    curl -L "$url" -o "$temp_dir/downloaded_content"
}

download_from_api() {
    local base_url="$1"
    local endpoints="$2"
    local temp_dir="$3"
    
    echo "📥 Downloading from API endpoints"
    IFS=',' read -ra ENDPOINTS <<< "$endpoints"
    for endpoint in "${ENDPOINTS[@]}"; do
        echo "  Downloading: $endpoint"
        curl -L "$base_url/$endpoint" -o "$temp_dir/$endpoint"
    done
}

# Main download logic
case "$SOURCE_TYPE" in
    "github_repo")
        download_from_github_repo "$SOURCE_REPO_OWNER" "$SOURCE_REPO_NAME" "$SOURCE_BRANCH" "$SOURCE_LOCATION" "$TEMP_DIR"
        ;;
    "url")
        download_from_url "$SOURCE_URL" "$TEMP_DIR"
        ;;
    "api_endpoint")
        download_from_api "$API_BASE_URL" "$API_ENDPOINTS" "$TEMP_DIR"
        ;;
    *)
        echo "❌ Unknown source type: $SOURCE_TYPE"
        exit 1
        ;;
esac

# Backup existing directory if enabled
if [ "$BACKUP_ENABLED" = "true" ] && [ -d "$TARGET_DIR" ]; then
    echo "💾 Creating backup of existing $TARGET_DIR directory"
    cp -r "$TARGET_DIR" "${TARGET_DIR}_backup_$(date +%Y%m%d_%H%M%S)"
fi

# Update target directory
echo "📝 Updating $TARGET_DIR directory"
if [ -d "$TARGET_DIR" ]; then
    rm -rf "$TARGET_DIR"
fi
mv "$TEMP_DIR" "$TARGET_DIR"

# Clean up any backup directories older than 7 days
find . -name "${TARGET_DIR}_backup_*" -type d -mtime +7 -exec rm -rf {} + 2>/dev/null || true

echo "✅ OpenAPI docs update completed successfully!"
echo "Updated directory: $TARGET_DIR"
echo "Files updated:"
ls -la "$TARGET_DIR"
