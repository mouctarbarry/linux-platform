import Link from 'next/link';
import type { CommandMeta } from '@/lib/commands';
import { CATEGORIES } from '@/lib/categories';

interface CommandCardProps {
  command: CommandMeta;
}

export function CommandCard({ command }: CommandCardProps) {
  const category = CATEGORIES[command.category];

  return (
    <Link
      href={`/commands/${command.slug}`}
      className="border-border bg-card hover:border-primary/30 hover:shadow-primary/5 group block rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="text-lg">{category.icon}</span>
        <h3 className="group-hover:text-primary font-mono text-lg font-bold tracking-tight">
          {command.title}
        </h3>
      </div>
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{command.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {command.tags.map((tag) => (
          <span
            key={tag}
            className="bg-secondary text-secondary-foreground rounded-md px-2 py-0.5 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
