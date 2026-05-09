import type { MetadataRoute } from "next";
import { getCommands } from "@/lib/commands";
import { CATEGORIES, type Category } from "@/lib/categories";

export const dynamic = "force-static";

const BASE_URL = "https://linux.mouctar.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const commands = getCommands();

  const commandPages = commands.map((cmd) => ({
    url: `${BASE_URL}/commands/${cmd.slug}`,
    lastModified: new Date(),
  }));

  const categoryPages = (Object.keys(CATEGORIES) as Category[]).map((cat) => ({
    url: `${BASE_URL}/categories/${cat}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/commands`, lastModified: new Date() },
    ...categoryPages,
    ...commandPages,
  ];
}
