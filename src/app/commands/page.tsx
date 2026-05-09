import { getCommands } from '@/lib/commands';
import { CommandCard } from '@/components/command-card';
import { CategoryNav } from '@/components/category-nav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toutes les commandes — Linux Platform',
  description: 'Liste complete des commandes Linux documentees avec exemples pratiques.',
};

export default function CommandsPage() {
  const commands = getCommands();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Toutes les commandes</h1>
      <div className="mb-8">
        <CategoryNav />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {commands.map((cmd) => (
          <CommandCard key={cmd.slug} command={cmd} />
        ))}
      </div>
    </main>
  );
}
