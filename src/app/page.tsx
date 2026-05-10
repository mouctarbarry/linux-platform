import { getCommands } from '@/lib/commands';
import { CATEGORIES, type Category } from '@/lib/categories';
import { SearchBar } from '@/components/search-bar';
import { CategoryNav } from '@/components/category-nav';
import { getTutorials } from '@/lib/tutorials';
import { getGuides } from '@/lib/guides';
import type { SearchableItem } from '@/lib/search';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Linux Platform — Reference interactive des commandes Linux',
  description:
    'Explorez les commandes Linux essentielles avec des exemples pratiques, une recherche instantanee et une navigation par categories.',
};

export default function HomePage() {
  const commands = getCommands();
  const tutorials = getTutorials();
  const guides = getGuides();

  const categoryCounts = commands.reduce<Partial<Record<Category, number>>>((acc, cmd) => {
    acc[cmd.category] = (acc[cmd.category] ?? 0) + 1;
    return acc;
  }, {});

  const allItems: SearchableItem[] = [
    ...commands.map((cmd) => ({
      type: 'commande' as const,
      slug: cmd.slug,
      title: cmd.title,
      description: cmd.description,
      tags: cmd.tags,
      href: `/commands/${cmd.slug}`,
    })),
    ...tutorials.map((t) => ({
      type: 'tutoriel' as const,
      slug: t.slug,
      title: t.title,
      description: t.description,
      tags: t.tags,
      href: `/tutorials/${t.slug}`,
    })),
    ...guides.map((g) => ({
      type: 'guide' as const,
      slug: g.slug,
      title: g.title,
      description: g.description,
      tags: g.tags,
      href: `/guides/${g.slug}`,
    })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16">
      <header className="mb-10 text-center sm:mb-14">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl">Linux Platform</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
          Reference interactive des commandes Linux — exemples pratiques et recherche instantanee
        </p>
        <div className="text-muted-foreground mx-auto mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
          {(Object.entries(CATEGORIES) as [Category, (typeof CATEGORIES)[Category]][]).map(
            ([key, cat]) => (
              <span key={key} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${cat.color}`} />
                <span className="text-foreground font-mono font-bold">
                  {categoryCounts[key] ?? 0}
                </span>
                <span>{cat.label.toLowerCase()}</span>
              </span>
            ),
          )}
        </div>
      </header>

      <section className="mb-10">
        <CategoryNav />
      </section>

      <section>
        <SearchBar commands={commands} allItems={allItems} />
      </section>
    </div>
  );
}
