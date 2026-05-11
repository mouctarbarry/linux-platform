import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPageBySlug } from '@/lib/pages';
import { remarkPlugins, rehypePlugins } from '@/lib/mdx-options';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ressources Linux — Linux Platform',
  description: 'Liens et références essentiels pour approfondir vos connaissances Linux.',
};

export default function RessourcesPage() {
  const page = getPageBySlug('ressources');
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold">{page.meta.title}</h1>
      <p className="text-muted-foreground mb-8 text-lg">{page.meta.description}</p>
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={page.content} options={{ mdxOptions: { remarkPlugins, rehypePlugins } }} />
      </article>
    </div>
  );
}
