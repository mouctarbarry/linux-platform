import path from 'node:path';
import { getContentBySlug } from './content';
import type { ContentMeta, ContentItem } from './content';

const PAGES_DIR = path.join(process.cwd(), 'src/content/pages');

function transform(slug: string, data: Record<string, unknown>): ContentMeta {
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    tags: (data.tags as string[]) ?? [],
  };
}

export function getPageBySlug(slug: string): ContentItem<ContentMeta> | undefined {
  return getContentBySlug(PAGES_DIR, slug, transform);
}
