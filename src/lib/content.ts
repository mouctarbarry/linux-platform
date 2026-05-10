import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface ContentMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ContentItem<T extends ContentMeta = ContentMeta> {
  meta: T;
  content: string;
}

export function getContentItems<T extends ContentMeta>(
  dir: string,
  transform: (slug: string, data: Record<string, unknown>) => T,
): T[] {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data } = matter(raw);
      return transform(filename.replace(/\.mdx$/, ''), data);
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getContentBySlug<T extends ContentMeta>(
  dir: string,
  slug: string,
  transform: (slug: string, data: Record<string, unknown>) => T,
): ContentItem<T> | undefined {
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    meta: transform(slug, data),
    content,
  };
}

export function getAllSlugsFromDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}
