import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPageBySlug } from '@/lib/pages';
import { rehypePlugins } from '@/lib/mdx-options';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glossaire Linux — Linux Platform',
  description: "Lexique complet des termes essentiels de l'ecosysteme Linux et Unix.",
};

export default function GlossairePage() {
  const page = getPageBySlug('glossaire');
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold">{page.meta.title}</h1>
      <p className="text-muted-foreground mb-8 text-lg">{page.meta.description}</p>
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={page.content} options={{ mdxOptions: { rehypePlugins } }} />
      </article>
    </div>
  );
}
