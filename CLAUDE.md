# CLAUDE.md — Linux Platform

## Project overview

Static French-language Linux reference site: commands, tutorials, guides, glossary, FAQ, scripts, and mini-projects.
Deployed at **https://linux.mouctar.fr** via GitHub Pages.

## Tech stack

- **Framework**: Next.js 16 (App Router) with `output: "export"` (static export)
- **Language**: TypeScript (strict mode, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`)
- **Styling**: Tailwind CSS 3 + `@tailwindcss/typography` prose + `tailwindcss-animate`
- **Content**: MDX files parsed with `next-mdx-remote/rsc` + `gray-matter` frontmatter
- **MDX plugins**: `remark-gfm` (tables, strikethrough) + `rehype-pretty-code` with `shiki` (dual theme syntax highlighting)
- **Theming**: `next-themes` (dark/light toggle, default dark)
- **Fonts**: Inter (body), Quicksand (headings), Ubuntu Mono (code) via `next/font/google`
- **Package manager**: pnpm 9
- **Icons**: `lucide-react` (only Sun/Moon for theme toggle — no emojis elsewhere)

## Commands

```bash
pnpm dev          # Dev server on port 3001
pnpm build        # Static export to out/
pnpm start        # Serve out/ locally
pnpm lint         # ESLint (zero warnings)
pnpm typecheck    # TypeScript check
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, Header, Sidebar, ThemeProvider)
│   ├── page.tsx                # Homepage with stats and category grid
│   ├── globals.css             # Tailwind base + prose overrides + rehype-pretty-code styles
│   ├── commands/[slug]/        # Individual command pages
│   ├── categories/[category]/  # Category listing pages
│   ├── tutorials/              # Tutorial list + [slug] detail pages
│   ├── guides/                 # Guide list + [slug] detail pages
│   ├── introduction/           # Static page
│   ├── glossaire/              # Static page
│   ├── faq/                    # Static page
│   ├── ressources/             # Static page
│   ├── scripts/                # Static page
│   ├── projets/                # Static page
│   └── sitemap.ts              # Dynamic sitemap generation
├── components/
│   ├── header.tsx              # Header + Sidebar (mobile hamburger overlay)
│   ├── theme-toggle.tsx        # Dark/light toggle (Sun/Moon)
│   ├── theme-provider.tsx      # next-themes wrapper
│   ├── search-bar.tsx          # Global search across all content types
│   ├── command-card.tsx        # Command card with colored category dot
│   ├── category-nav.tsx        # Category navigation with colored dots
│   └── content-card.tsx        # Generic card for tutorials/guides
├── content/
│   ├── commands/               # 113 command MDX files
│   ├── tutorials/              # 6 tutorial MDX files
│   ├── guides/                 # 3 guide MDX files
│   └── pages/                  # 6 static page MDX files
└── lib/
    ├── content.ts              # Generic MDX loader (getContentItems, getContentBySlug, getAllSlugsFromDir)
    ├── commands.ts             # Command-specific loader
    ├── tutorials.ts            # Tutorial-specific loader (with difficulty + order)
    ├── guides.ts               # Guide-specific loader (with difficulty + estimatedTime)
    ├── pages.ts                # Static page loader
    ├── categories.ts           # Category definitions (label + Tailwind color)
    ├── search.ts               # Cross-content search (commands, tutorials, guides)
    └── mdx-options.ts          # Shared remark/rehype plugin config
```

## Content authoring

### Commands (`src/content/commands/*.mdx`)

```yaml
---
title: "command-name"
description: "Brief description"
category: "fichiers"  # Must match a key in CATEGORIES
tags: ["tag1", "tag2"]
---
```

### Tutorials (`src/content/tutorials/*.mdx`)

```yaml
---
title: "Tutorial title"
description: "Brief description"
tags: ["tag1", "tag2"]
difficulty: "debutant"  # debutant | intermediaire | avance
order: 1                # Display order in listing
---
```

### Guides (`src/content/guides/*.mdx`)

```yaml
---
title: "Guide title"
description: "Brief description"
tags: ["tag1", "tag2"]
difficulty: "intermediaire"  # debutant | intermediaire | avance
estimatedTime: "45 min"
---
```

### Static pages (`src/content/pages/*.mdx`)

```yaml
---
title: "Page title"
description: "Brief description"
---
```

## Categories

8 categories with Tailwind color classes (no emojis):

| Key | Label | Color |
|-----|-------|-------|
| fichiers | Fichiers & Repertoires | bg-blue-500 |
| recherche | Recherche & Texte | bg-amber-500 |
| reseau | Reseau | bg-green-500 |
| processus | Processus & Services | bg-purple-500 |
| archivage | Archivage & Compression | bg-cyan-500 |
| systeme | System | bg-rose-500 |
| permissions | Permissions & Utilisateurs | bg-orange-500 |
| editeurs | Editeurs & Outils | bg-teal-500 |

## Architecture patterns

- **Content loading**: `src/lib/content.ts` provides a generic `getContentItems(dir, transform)` pattern. Each content type (commands, tutorials, guides, pages) has a thin typed wrapper in its own file.
- **MDX rendering**: All pages using `MDXRemote` must import and pass both `remarkPlugins` and `rehypePlugins` from `src/lib/mdx-options.ts`. Without `remarkPlugins` (remark-gfm), GFM tables render as raw pipes.
- **Static generation**: All dynamic routes use `generateStaticParams()` to pre-render at build time.
- **Design system**: Categories use colored dots (`<span className="h-2 w-2 rounded-full {color}" />`) instead of emojis or icon libraries.
- **Theme**: CSS variables for colors, `dark:` variants via Tailwind class strategy. Default theme is dark.
- **Sidebar**: Desktop = fixed left sidebar, Mobile = hamburger overlay. Navigation links with colored dots and active state via `usePathname()`.

## Deployment

- GitHub Pages via GitHub Actions
- Static export (`output: "export"` in `next.config.mjs`)
- Domain: `linux.mouctar.fr`

## Style guidelines

- Language: French (content and UI labels)
- No emojis in UI — use colored Tailwind dots for visual indicators
- Font hierarchy: Inter (body text), Quicksand (headings h1-h6), Ubuntu Mono (code blocks)
- Base font size: 16.5px
- Prose styles applied via `@tailwindcss/typography` with custom table overflow handling for mobile
