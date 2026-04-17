import { createClient } from "@sanity/client";
import groq from "groq";
import { cache } from "react";
import { CONTENT } from "@/data/content";
import type { ContentItem, ContentKind } from "@/types/content";

type SanityContentDoc = {
  _id: string;
  kind?: ContentKind;
  title?: string;
  slug?: string;
  excerpt?: string;
  bodyText?: string;
  category?: ContentItem["category"];
  subcategory?: string;
  readMinutes?: number;
  coverImage?: string;
  coverAlt?: string;
  badges?: ContentItem["badges"];
  publishedAt?: string;
  author?: string;
  ingredients?: string[];
  steps?: string[];
};

const SANITY_QUERY = groq`*[_type in ["article","recipe","tip"] && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  _id,
  "kind": select(_type == "recipe" => "recipe", _type == "tip" => "tip", "article"),
  title,
  "slug": slug.current,
  excerpt,
  "bodyText": pt::text(body),
  category,
  subcategory,
  readMinutes,
  "coverImage": coverImage.asset->url,
  coverAlt,
  badges,
  publishedAt,
  author,
  ingredients,
  steps
}`;

function sanityClient() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  if (!projectId || !dataset) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion: process.env.SANITY_API_VERSION || "2026-01-01",
    useCdn: true,
  });
}

function normalizeSanityDoc(doc: SanityContentDoc): ContentItem | null {
  if (!doc.title || !doc.slug || !doc.category || !doc.kind) return null;
  const fallbackImage =
    "https://images.unsplash.com/photo-1556228578-8c89e33afff7?auto=format&fit=crop&w=1200&q=80";
  const body = doc.bodyText
    ? doc.bodyText
        .split(/\n{2,}/)
        .map((x) => x.trim())
        .filter(Boolean)
    : [doc.excerpt || "محتوى قيد التحديث."];
  return {
    id: doc._id,
    slug: doc.slug,
    kind: doc.kind,
    title: doc.title,
    excerpt: doc.excerpt || "محتوى مختصر قيد التحديث.",
    body,
    category: doc.category,
    subcategory: doc.subcategory,
    readMinutes: Math.max(1, doc.readMinutes || 4),
    coverImage: doc.coverImage || fallbackImage,
    coverAlt: doc.coverAlt || doc.title,
    badges: doc.badges,
    publishedAt: doc.publishedAt || new Date().toISOString().slice(0, 10),
    author: doc.author,
    ingredients: doc.ingredients,
    steps: doc.steps,
  };
}

async function fetchSanityContent(): Promise<ContentItem[] | null> {
  const client = sanityClient();
  if (!client) return null;
  try {
    const docs = await client.fetch<SanityContentDoc[]>(SANITY_QUERY);
    const items = docs.map(normalizeSanityDoc).filter((x): x is ContentItem => !!x);
    return items.length ? items : null;
  } catch {
    return null;
  }
}

export const getContentCatalog = cache(async (): Promise<ContentItem[]> => {
  const remote = await fetchSanityContent();
  return remote ?? CONTENT;
});

export const sanityEnabled = () => !!sanityClient();
