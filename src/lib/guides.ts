import path from "node:path";
import {
  getContentItems,
  getContentBySlug,
  getAllSlugsFromDir,
} from "./content";
import type { ContentMeta, ContentItem } from "./content";

export interface GuideMeta extends ContentMeta {
  difficulty: "debutant" | "intermediaire" | "avance";
  estimatedTime: string;
  order: number;
}

const GUIDES_DIR = path.join(process.cwd(), "src/content/guides");

function transform(slug: string, data: Record<string, unknown>): GuideMeta {
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    tags: data.tags as string[],
    difficulty: (data.difficulty ?? "debutant") as GuideMeta["difficulty"],
    estimatedTime: (data.estimatedTime ?? "") as string,
    order: (data.order ?? 0) as number,
  };
}

export function getGuides(): GuideMeta[] {
  return getContentItems(GUIDES_DIR, transform).sort(
    (a, b) => a.order - b.order,
  );
}

export function getGuideBySlug(
  slug: string,
): ContentItem<GuideMeta> | undefined {
  return getContentBySlug(GUIDES_DIR, slug, transform);
}

export function getAllGuideSlugs(): string[] {
  return getAllSlugsFromDir(GUIDES_DIR);
}
