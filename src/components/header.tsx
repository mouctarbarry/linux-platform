'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { Menu, X } from 'lucide-react';

const NAV_SECTIONS = [
  { label: 'Accueil', href: '/', color: 'bg-blue-500' },
  { label: 'Introduction', href: '/introduction', color: 'bg-purple-500' },
  { label: 'Commandes', href: '/commands', color: 'bg-green-500' },
  { label: 'Tutoriels', href: '/tutorials', color: 'bg-amber-500' },
  { label: 'Guides', href: '/guides', color: 'bg-rose-500' },
  { label: 'Scripts Bash', href: '/scripts', color: 'bg-cyan-500' },
  { label: 'Mini-Projets', href: '/projets', color: 'bg-teal-500' },
  { label: 'Glossaire', href: '/glossaire', color: 'bg-indigo-500' },
  { label: 'FAQ', href: '/faq', color: 'bg-orange-500' },
  { label: 'Ressources', href: '/ressources', color: 'bg-emerald-500' },
] as const;

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
            aria-label="Menu"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <span className="font-mono text-xl font-bold tracking-tight">Linux Platform</span>
          </Link>
        </div>
        <ThemeToggle />
      </header>

      {sidebarOpen && (
        <MobileSidebar onClose={() => { setSidebarOpen(false); }} />
      )}
    </>
  );
}

function MobileSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <nav className="absolute left-0 top-14 bottom-0 w-64 overflow-y-auto border-r border-border bg-background p-4">
        <SidebarContent onNavigate={onClose} />
      </nav>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden lg:block lg:w-60 lg:shrink-0">
      <nav className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border p-4">
        <SidebarContent />
      </nav>
    </aside>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="space-y-1">
      {NAV_SECTIONS.map((section) => {
        const isActive =
          section.href === '/'
            ? pathname === '/'
            : pathname.startsWith(section.href);

        return (
          <li key={section.href}>
            <Link
              href={section.href}
              {...(onNavigate ? { onClick: () => { onNavigate(); } } : {})}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${section.color}`} />
              {section.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
