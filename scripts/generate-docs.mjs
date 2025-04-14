import * as OpenAPI from 'fumadocs-openapi';
import { rimrafSync } from 'rimraf';

const outV2 = './content/docs/(api)/v2';
const outV3 = './content/docs/(api)/v3';

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

void OpenAPI.generateFiles({
  input: ['./openapi.json'],
  output: outV2,
  groupBy: 'tag',
  options: {
    includeResponses: true,
  }
});

void OpenAPI.generateFiles({
  input: ['./openapi-v3.json'],
  output: outV3,
  groupBy: 'tag',
  options: {
    includeResponses: true,
  }
});
