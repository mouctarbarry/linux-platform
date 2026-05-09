import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Category } from './categories';

export interface CommandMeta {
  slug: string;
  title: string;
  category: Category;
  description: string;
  tags: string[];
}

export interface Command extends CommandMeta {
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/commands');

export function getCommands(): CommandMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(raw);
      return {
        slug: filename.replace(/\.mdx$/, ''),
        title: data.title as string,
        category: data.category as Category,
        description: data.description as string,
        tags: data.tags as string[],
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getCommandBySlug(slug: string): Command | undefined {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    category: data.category as Category,
    description: data.description as string,
    tags: data.tags as string[],
    content,
  };
}

export function getCommandsByCategory(category: Category): CommandMeta[] {
  return getCommands().filter((cmd) => cmd.category === category);
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}
