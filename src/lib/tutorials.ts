import path from "node:path";
import {
  getContentItems,
  getContentBySlug,
  getAllSlugsFromDir,
} from "./content";
import type { ContentMeta, ContentItem } from "./content";

export interface TutorialMeta extends ContentMeta {
  difficulty: "debutant" | "intermediaire" | "avance";
  order: number;
}

const TUTORIALS_DIR = path.join(process.cwd(), "src/content/tutorials");

function transform(slug: string, data: Record<string, unknown>): TutorialMeta {
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    tags: data.tags as string[],
    difficulty: (data.difficulty ?? "debutant") as TutorialMeta["difficulty"],
    order: (data.order ?? 0) as number,
  };
}

export function getTutorials(): TutorialMeta[] {
  return getContentItems(TUTORIALS_DIR, transform).sort(
    (a, b) => a.order - b.order,
  );
}

export function getTutorialBySlug(
  slug: string,
): ContentItem<TutorialMeta> | undefined {
  return getContentBySlug(TUTORIALS_DIR, slug, transform);
}

export function getAllTutorialSlugs(): string[] {
  return getAllSlugsFromDir(TUTORIALS_DIR);
}
