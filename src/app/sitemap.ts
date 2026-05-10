import type { MetadataRoute } from "next";
import { getCommands } from "@/lib/commands";
import { CATEGORIES, type Category } from "@/lib/categories";
import { getTutorials } from "@/lib/tutorials";
import { getGuides } from "@/lib/guides";

export const dynamic = "force-static";

const BASE_URL = "https://linux.mouctar.fr";

const STATIC_PAGES = [
  "/introduction",
  "/glossaire",
  "/faq",
  "/ressources",
  "/scripts",
  "/projets",
  "/tutorials",
  "/guides",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const commands = getCommands();
  const tutorials = getTutorials();
  const guides = getGuides();

  const commandPages = commands.map((cmd) => ({
    url: `${BASE_URL}/commands/${cmd.slug}`,
    lastModified: new Date(),
  }));

  const categoryPages = (Object.keys(CATEGORIES) as Category[]).map((cat) => ({
    url: `${BASE_URL}/categories/${cat}`,
    lastModified: new Date(),
  }));

  const staticPages = STATIC_PAGES.map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: new Date(),
  }));

  const tutorialPages = tutorials.map((t) => ({
    url: `${BASE_URL}/tutorials/${t.slug}`,
    lastModified: new Date(),
  }));

  const guidePages = guides.map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/commands`, lastModified: new Date() },
    ...staticPages,
    ...categoryPages,
    ...commandPages,
    ...tutorialPages,
    ...guidePages,
  ];
}
