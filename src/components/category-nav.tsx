import Link from 'next/link';
import { CATEGORIES, type Category } from '@/lib/categories';

interface CategoryNavProps {
  active?: Category;
}

export function CategoryNav({ active }: CategoryNavProps) {
  return (
    <nav className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
          !active
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        Toutes
      </Link>
      {(Object.entries(CATEGORIES) as [Category, (typeof CATEGORIES)[Category]][]).map(
        ([key, cat]) => (
          <Link
            key={key}
            href={`/categories/${key}`}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              active === key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {cat.icon} {cat.label}
          </Link>
        ),
      )}
    </nav>
  );
}
