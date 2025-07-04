import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { openapi } from '@/lib/source';
import { APIPage } from 'fumadocs-openapi/ui';
import { Callout } from 'fumadocs-ui/components/callout';
import { Steps, Step } from 'fumadocs-ui/components/steps';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    APIPage: props => <APIPage {...openapi.getAPIPageProps(props)} />,
    Callout,
    Steps,
    Step,
    ...components,
  };
}
