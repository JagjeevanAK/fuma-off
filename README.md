# OpenAPI Specification Documentation

This is an example API documentation based on Unkey's
[API documentation](https://github.com/unkeyed/unkey), using Fumadocs OpenAPI.

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Install dependencies:

```bash
npm install
```

2. Install pre-commit hooks:

```bash
npm run prepare
```

3. Start the development server:

```bash
npm run dev
```

### Code Quality

This project uses several tools to maintain code quality:

- **Dependabot**: Automatically updates dependencies
- **Pre-commit hooks**: Run linting, formatting, and validation before commits
- **ESLint**: TypeScript/JavaScript linting
- **Prettier**: Code formatting
- **YAML validation**: Validates OpenAPI specs and configuration files

#### Pre-commit Hooks

Pre-commit hooks are automatically installed when running `npm install`. They include:

- Code formatting with Prettier
- Linting with ESLint
- TypeScript type checking
- YAML validation for OpenAPI specs
- Security scanning for secrets
- Markdown linting

To run pre-commit hooks manually:

```bash
npx pre-commit run --all-files
```

To bypass pre-commit hooks (not recommended):

```bash
git commit --no-verify
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:docs` - Generate API documentation
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run types:check` - TypeScript type checking
