import type { Metadata } from 'next';
import { Quicksand, Ubuntu_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header, Sidebar } from '@/components/header';
import './globals.css';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Linux Platform — Reference interactive des commandes Linux',
    template: '%s — Linux Platform',
  },
  description:
    'Explorez 113+ commandes Linux avec exemples pratiques, tutoriels, guides complets, glossaire et FAQ. Recherche instantanee et navigation par categories.',
  metadataBase: new URL('https://linux.mouctar.fr'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Linux Platform',
    title: 'Linux Platform — Reference interactive des commandes Linux',
    description:
      'Explorez 113+ commandes Linux avec exemples pratiques, tutoriels, guides complets, glossaire et FAQ.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${quicksand.variable} ${ubuntuMono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="min-h-[calc(100vh-3.5rem)] flex-1 overflow-x-hidden">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
