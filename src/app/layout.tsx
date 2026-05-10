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
  title: 'Linux Platform',
  description: 'Reference interactive des commandes Linux',
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
