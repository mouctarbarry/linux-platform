import { getTutorials } from '@/lib/tutorials';
import { ContentCard } from '@/components/content-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tutoriels Linux — Linux Platform',
  description: 'Tutoriels pratiques pour apprendre Linux pas à pas.',
};

export default function TutorialsPage() {
  const tutorials = getTutorials();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Tutoriels</h1>
      <p className="text-muted-foreground mb-8 text-lg">
        Guides pratiques pas à pas pour maîtriser Linux, du débutant à l&apos;avancé.
      </p>
      {tutorials.length === 0 ? (
        <p className="text-muted-foreground">Les tutoriels arrivent bientôt.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tuto) => (
            <ContentCard
              key={tuto.slug}
              title={tuto.title}
              description={tuto.description}
              href={`/tutorials/${tuto.slug}`}
              tags={tuto.tags}
              difficulty={tuto.difficulty}
            />
          ))}
        </div>
      )}
    </div>
  );
}
