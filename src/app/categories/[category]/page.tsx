import { notFound } from 'next/navigation';
import { getCommandsByCategory } from '@/lib/commands';
import { CATEGORIES, type Category } from '@/lib/categories';
import { CommandCard } from '@/components/command-card';
import { CategoryNav } from '@/components/category-nav';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  if (!(category in CATEGORIES)) return {};
  const cat = CATEGORIES[category as Category];
  return {
    title: `${cat.label} — Linux Platform`,
    description: `Commandes Linux dans la catégorie ${cat.label}.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categoryParam } = await params;
  const category = categoryParam as Category;
  if (!(category in CATEGORIES)) notFound();

  const commands = getCommandsByCategory(category);
  const cat = CATEGORIES[category];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">
        <span className={`mr-2 inline-block h-3 w-3 rounded-full ${cat.color}`} />
        {cat.label}
      </h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        {commands.length} commande{commands.length !== 1 ? 's' : ''} dans cette categorie
      </p>
      <div className="mb-8">
        <CategoryNav active={category} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {commands.map((cmd) => (
          <CommandCard key={cmd.slug} command={cmd} />
        ))}
      </div>
    </div>
  );
}
