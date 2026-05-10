import Link from 'next/link';

interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  tags: string[];
  difficulty?: 'debutant' | 'intermediaire' | 'avance';
  estimatedTime?: string;
}

const DIFFICULTY_STYLES = {
  debutant: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  intermediaire: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  avance: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
} as const;

const DIFFICULTY_LABELS = {
  debutant: 'Debutant',
  intermediaire: 'Intermediaire',
  avance: 'Avance',
} as const;

export function ContentCard({
  title,
  description,
  href,
  tags,
  difficulty,
  estimatedTime,
}: ContentCardProps) {
  return (
    <Link
      href={href}
      className="border-border bg-card hover:border-primary/30 hover:shadow-primary/5 group block rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="mb-3 flex items-center gap-2">
        <h3 className="group-hover:text-primary text-lg font-bold tracking-tight">
          {title}
        </h3>
      </div>
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{description}</p>
      <div className="flex flex-wrap items-center gap-1.5">
        {difficulty && (
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-semibold ${DIFFICULTY_STYLES[difficulty]}`}
          >
            {DIFFICULTY_LABELS[difficulty]}
          </span>
        )}
        {estimatedTime && (
          <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            {estimatedTime}
          </span>
        )}
        {tags.map((tag) => (
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
