'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import type { CommandMeta } from '@/lib/commands';
import { searchCommands } from '@/lib/search';
import { CommandCard } from './command-card';

interface SearchBarProps {
  commands: CommandMeta[];
}

export function SearchBar({ commands }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  const results = searchCommands(commands, debouncedQuery);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Rechercher une commande (ex: grep, find, chmod...)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-base outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
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
