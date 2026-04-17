export type ContentKind = "recipe" | "article" | "tip";

export type ContentCategory =
  | "recipes"
  | "organize"
  | "hacks"
  | "growth"
  | "personal-care"
  | "skincare"
  | "entertainment"
  | "celebrities"
  | "horoscope"
  | "series"
  | "trend";

export type ContentBadge = "new" | "hot" | "editor" | "trending";

export type ContentItem = {
  id: string;
  slug: string;
  kind: ContentKind;
  title: string;
  excerpt: string;
  body: string[];
  category: ContentCategory;
  subcategory?: string;
  readMinutes: number;
  coverImage: string;
  coverAlt: string;
  badges?: ContentBadge[];
  publishedAt: string;
  author?: string;
  ingredients?: string[];
  steps?: string[];
};

export type CategoryMeta = {
  id: ContentCategory;
  title: string;
  description: string;
  icon: string;
  subcategories: { id: string; title: string }[];
};
