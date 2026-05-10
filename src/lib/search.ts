import type { CommandMeta } from './commands';

export interface SearchableItem {
  type: 'commande' | 'tutoriel' | 'guide';
  slug: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export function searchCommands(commands: CommandMeta[], query: string): CommandMeta[] {
  const q = query.toLowerCase().trim();
  if (!q) return commands;

  return commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q) ||
      cmd.tags.some((tag) => tag.toLowerCase().includes(q)),
  );
}

export function searchAll(items: SearchableItem[], query: string): SearchableItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return items;

  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q)),
  );
}
