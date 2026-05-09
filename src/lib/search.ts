import type { CommandMeta } from './commands';

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
