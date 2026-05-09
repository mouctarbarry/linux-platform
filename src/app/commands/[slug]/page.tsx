import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllSlugs, getCommandBySlug } from '@/lib/commands';
import { CATEGORIES } from '@/lib/categories';
import { TerminalBlock } from '@/components/terminal-block';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const command = getCommandBySlug(slug);
  if (!command) return {};
  return {
    title: `${command.title} — Linux Platform`,
    description: command.description,
  };
}

const mdxComponents = {
  TerminalBlock,
};

export default async function CommandPage({ params }: PageProps) {
  const { slug } = await params;
  const command = getCommandBySlug(slug);
  if (!command) notFound();

  const category = CATEGORIES[command.category];

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6">
        <Link
          href="/commands"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
        >
          ← Toutes les commandes
        </Link>
      </nav>

      <header className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span>{category.icon}</span>
          <Link
            href={`/categories/${command.category}`}
            className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            {category.label}
          </Link>
        </div>
        <h1 className="mb-2 font-mono text-4xl font-bold">{command.title}</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">{command.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {command.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={command.content} components={mdxComponents} />
      </article>
    </main>
  );
}
