'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useDebounce } from '@/hooks/use-debounce';
import type { CommandMeta } from '@/lib/commands';
import { searchCommands, searchAll } from '@/lib/search';
import type { SearchableItem } from '@/lib/search';
import { CommandCard } from './command-card';

interface SearchBarProps {
  commands: CommandMeta[];
  allItems?: SearchableItem[];
}

const TYPE_LABELS: Record<SearchableItem['type'], string> = {
  commande: 'Commandes',
  tutoriel: 'Tutoriels',
  guide: 'Guides',
};

export function SearchBar({ commands, allItems }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);

  if (allItems) {
    return <GlobalSearch items={allItems} query={query} setQuery={setQuery} debouncedQuery={debouncedQuery} />;
  }

  const results = searchCommands(commands, debouncedQuery);

  return (
    <div>
      <SearchInput query={query} setQuery={setQuery} />
      {debouncedQuery && (
        <p className="mt-3 text-sm text-muted-foreground">
          {results.length} resultat{results.length !== 1 ? 's' : ''} pour &quot;{debouncedQuery}
          &quot;
        </p>
      )}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((cmd) => (
          <CommandCard key={cmd.slug} command={cmd} />
        ))}
      </div>
    </div>
  );
}

function SearchInput({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (q: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        placeholder="Rechercher une commande, un tutoriel, un guide..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-base outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function GlobalSearch({
  items,
  query,
  setQuery,
  debouncedQuery,
}: {
  items: SearchableItem[];
  query: string;
  setQuery: (q: string) => void;
  debouncedQuery: string;
}) {
  const results = searchAll(items, debouncedQuery);

  const grouped = results.reduce<Record<string, SearchableItem[]>>((acc, item) => {
    const key = item.type;
    if (!acc[key]) acc[key] = [];
    acc[key]!.push(item);
    return acc;
  }, {});

  return (
    <div>
      <SearchInput query={query} setQuery={setQuery} />
      {debouncedQuery && (
        <p className="mt-3 text-sm text-muted-foreground">
          {results.length} resultat{results.length !== 1 ? 's' : ''} pour &quot;{debouncedQuery}&quot;
        </p>
      )}
      {debouncedQuery && (
        <div className="mt-5 space-y-8">
          {Object.entries(grouped).map(([type, groupItems]) => (
            <div key={type}>
              <h3 className="mb-3 text-lg font-semibold">
                {TYPE_LABELS[type as SearchableItem['type']] ?? type}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {groupItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-border bg-card hover:border-primary/30 group block rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <h4 className="group-hover:text-primary font-mono font-bold">{item.title}</h4>
                    <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
