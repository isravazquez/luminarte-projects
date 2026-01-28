const CMS_URL = import.meta.env.CMS_URL as string;
const CMS_TOKEN = (import.meta.env.CMS_TOKEN as string) || "";

if (!CMS_URL) throw new Error("Falta CMS_URL");

export function absolutizeUrl(maybeRelative: string) {
  if (maybeRelative.startsWith("http")) return maybeRelative;
  return new URL(maybeRelative, CMS_URL).toString();
}

export async function contentFetch<T>(path: string): Promise<T> {
  const url = new URL(path, CMS_URL);

  const headers: HeadersInit = { Accept: "application/json" };
  if (CMS_TOKEN) (headers as any).Authorization = `Bearer ${CMS_TOKEN}`;

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
  return (await res.json()) as T;
}
