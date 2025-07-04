import * as OpenAPI from 'fumadocs-openapi';
import { rimrafSync } from 'rimraf';
import { existsSync } from 'fs';

const outV2 = './content/docs/(api)/Product-Opener/v2'; 
const outV3 = './content/docs/(api)/Product-Opener/v3';
const outkPanel = './content/docs/(api)/kPanel';
const outRobotoff = './content/docs/(api)/robotoff';
const outOpenPrices = './content/docs/(api)/open-prices';
const outFolksonomy = './content/docs/(api)/folksonomy';

rimrafSync(outV2, {
  filter(v) {
    return !v.endsWith('index.mdx') && !v.endsWith('meta.json');
  },
});

rimrafSync(outV3, {
  filter(v) {
    return !v.endsWith('index.mdx') && !v.endsWith('meta.json');
  },
});

rimrafSync(outkPanel, {
  filter(v) {
    return !v.endsWith('index.mdx') && !v.endsWith('meta.json');
  },
});

rimrafSync(outRobotoff, {
  filter(v) {
    return !v.endsWith('index.mdx') && !v.endsWith('meta.json');
  },
});

rimrafSync(outOpenPrices, {
  filter(v) {
    return !v.endsWith('index.mdx') && !v.endsWith('meta.json');
  },
});

rimrafSync(outFolksonomy, {
  filter(v) {
    return !v.endsWith('index.mdx') && !v.endsWith('meta.json');
  },
});

void OpenAPI.generateFiles({
  input: ['./specfiles-json/openapi.json'],
  output: outV2,
  groupBy: 'tag',
  options: {
    includeResponses: true,
  },
  includeDescription: true
});

void OpenAPI.generateFiles({
  input: ['./specfiles-json/openapi-v3.json'],
  output: outV3,
  groupBy: 'tag',
  options: {
    includeResponses: true,
  },
  includeDescription: true
});

if (existsSync('./specfiles-json/kPanels-openapi.json')) {
  void OpenAPI.generateFiles({
    input: ['./specfiles-json/kPanels-openapi.json'],
    output: outkPanel,
    groupBy: 'tag',
    options: {
      includeResponses: true,
    },
    includeDescription: true
  });
} else {
  console.log('FastAPI spec not found, skipping Facets documentation generation');
}

if (existsSync('./specfiles-json/robotoff-openapi.json')) {
  void OpenAPI.generateFiles({
    input: ['./specfiles-json/robotoff-openapi.json'],
    output: outRobotoff,
    groupBy: 'tag',
    options: {
      includeResponses: true,
    },
    includeDescription: true
  });
} else {
  console.log('Robotoff spec not found, skipping Robotoff documentation generation');
}

if (existsSync('./specfiles-json/open-prices-openapi.json')) {
  void OpenAPI.generateFiles({
    input: ['./specfiles-json/open-prices-openapi.json'],
    output: outOpenPrices,
    groupBy: 'tag',
    options: {
      includeResponses: true,
    },
    includeDescription: true
  });
} else {
  console.log('Open Prices spec not found, skipping Open Prices documentation generation');
}

if (existsSync('./specfiles-json/folksonomy-openapi.json')) {
  void OpenAPI.generateFiles({
    input: ['./specfiles-json/folksonomy-openapi.json'],
    output: outFolksonomy,
    groupBy: 'tag',
    options: {
      includeResponses: true,
    },
    includeDescription: true
  });
} else {
  console.log('Folksonomy spec not found, skipping Folksonomy documentation generation');
}
