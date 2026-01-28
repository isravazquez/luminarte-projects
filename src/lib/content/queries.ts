import { absolutizeUrl, contentFetch } from "./client";

export type ProjectDoc = {
  documentId: string;
  slug: string;
  name?: string;
  description?: string;
  model?: any;
  images?: any;
};

type ListResponse<T> = { data: T[]; meta?: any };

export function getMediaUrl(media: any): string | null {
  const url =
    media?.url ??
    media?.data?.url ??
    media?.data?.attributes?.url ??
    media?.attributes?.url ??
    null;

  if (!url || typeof url !== "string") return null;
  return absolutizeUrl(url);
}

export function getMediaUrlsFromGallery(images: any): string[] {
  const arr = Array.isArray(images) ? images : (images?.data ?? []);
  if (!Array.isArray(arr)) return [];

  return arr
    .map((img: any) => getMediaUrl(img))
    .filter((u: any): u is string => typeof u === "string" && u.length > 0);
}


export async function getProjectBySlug(slug: string): Promise<ProjectDoc | null> {
  const qs = new URLSearchParams();
  qs.set("filters[slug][$eq]", slug);
  qs.set("populate", "*");

  const json = await contentFetch<ListResponse<ProjectDoc>>(`/api/projects?${qs.toString()}`);
  return json.data?.[0] ?? null;
}

