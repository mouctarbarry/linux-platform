import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllTutorialSlugs, getTutorialBySlug } from '@/lib/tutorials';
import { TerminalBlock } from '@/components/terminal-block';
import { remarkPlugins, rehypePlugins } from '@/lib/mdx-options';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTutorialSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) return {};
  return {
    title: `${tutorial.meta.title} — Linux Platform`,
    description: tutorial.meta.description,
  };
}

const mdxComponents = {
  TerminalBlock,
};

export default async function TutorialPage({ params }: PageProps) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6">
        <Link
          href="/tutorials"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
        >
          ← Tous les tutoriels
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">{tutorial.meta.title}</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {tutorial.meta.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tutorial.meta.tags.map((tag) => (
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
        <MDXRemote
          source={tutorial.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins, rehypePlugins } }}
        />
      </article>
    </div>
  );
}
