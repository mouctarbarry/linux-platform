import { getGuides } from '@/lib/guides';
import { ContentCard } from '@/components/content-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides Linux — Linux Platform',
  description: 'Guides complets pour configurer et administrer des services Linux.',
};

export default function GuidesPage() {
  const guides = getGuides();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Guides</h1>
      <p className="text-muted-foreground mb-8 text-lg">
        Guides complets et detailles pour installer, configurer et administrer des services.
      </p>
      {guides.length === 0 ? (
        <p className="text-muted-foreground">Les guides arrivent bientot.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <ContentCard
              key={guide.slug}
              title={guide.title}
              description={guide.description}
              href={`/guides/${guide.slug}`}
              tags={guide.tags}
              difficulty={guide.difficulty}
              estimatedTime={guide.estimatedTime}
            />
          ))}
        </div>
      )}
    </div>
  );
}
