import { getCommands } from '@/lib/commands';
import { CATEGORIES, type Category } from '@/lib/categories';
import { SearchBar } from '@/components/search-bar';
import { CategoryNav } from '@/components/category-nav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Linux Platform — Reference interactive des commandes Linux',
  description:
    'Explorez les commandes Linux essentielles avec des exemples pratiques, une recherche instantanee et une navigation par categories.',
};

export default function HomePage() {
  const commands = getCommands();
  const categoryCounts = commands.reduce<Partial<Record<Category, number>>>((acc, cmd) => {
    acc[cmd.category] = (acc[cmd.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <header className="mb-14 text-center">
        <h1 className="text-5xl font-bold tracking-tight">Linux Platform</h1>
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
        <SearchBar commands={commands} />
      </section>
    </div>
  );
}
