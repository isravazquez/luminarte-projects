import { absolutizeUrl, contentFetch } from "./client";

// ---------------------------------------------------------------------------
// Strapi media types – covers v4 flat, v4 nested and v5 response shapes
// ---------------------------------------------------------------------------

/** A single media object as returned by Strapi (any version). */
export type StrapiMediaItem = {
  url?: string;
  data?: { url?: string; attributes?: { url?: string } } | null;
  attributes?: { url?: string };
};

/**
 * A media field value in a Strapi response.
 * Can be a single item, an array, or wrapped in a `data` envelope.
 */
export type StrapiMediaField =
  | StrapiMediaItem
  | StrapiMediaItem[]
  | { data: StrapiMediaItem | StrapiMediaItem[] | null }
  | null
  | undefined;

// ---------------------------------------------------------------------------
// Domain types
// ---------------------------------------------------------------------------

export type ProjectDoc = {
  documentId: string;
  slug: string;
  name?: string;
  description?: string;
  model?: StrapiMediaField;
  images?: StrapiMediaField;
  videos?: StrapiMediaField;
};

type ListResponse<T> = { data: T[]; meta?: Record<string, unknown> };

// ---------------------------------------------------------------------------
// Media URL helpers
// ---------------------------------------------------------------------------

export function getMediaUrl(media: StrapiMediaField): string | null {
  if (!media) return null;

  // Narrow: arrays and `data`-envelope are not a single item
  const item = media as StrapiMediaItem;

  const url =
    item?.url ??
    item?.data?.url ??
    item?.data?.attributes?.url ??
    item?.attributes?.url ??
    null;

  if (!url || typeof url !== "string") return null;
  return absolutizeUrl(url);
}

export function getMediaUrlsFromGallery(images: StrapiMediaField): string[] {
  if (!images) return [];

  const directSingle = getMediaUrl(images);
  if (directSingle) return [directSingle];

  const asRecord = images as { data?: unknown };
  const dataSingle = getMediaUrl(asRecord?.data as StrapiMediaField);
  if (dataSingle) return [dataSingle];

  const arr: StrapiMediaItem[] = Array.isArray(images)
    ? images
    : Array.isArray(asRecord?.data)
      ? (asRecord.data as StrapiMediaItem[])
      : [];

  return arr
    .map((img) => getMediaUrl(img))
    .filter((u): u is string => typeof u === "string" && u.length > 0);
}


export async function getProjectBySlug(slug: string): Promise<ProjectDoc | null> {
  const qs = new URLSearchParams();
  qs.set("filters[slug][$eq]", slug);
  qs.set("populate", "*");

  const json = await contentFetch<ListResponse<ProjectDoc>>(`/api/projects?${qs.toString()}`);
  return json.data?.[0] ?? null;
}
