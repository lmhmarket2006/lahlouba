import type { ContentBadge } from "@/types/content";

const map: Record<ContentBadge, { label: string; variant: "default" | "gold" | "outline" | "new" }> = {
  new: { label: "جديد", variant: "new" },
  hot: { label: "رائج الآن", variant: "gold" },
  editor: { label: "مختار لكِ", variant: "default" },
  trending: { label: "الأكثر متابعة", variant: "outline" },
};

export function badgeMeta(badge: ContentBadge) {
  return map[badge];
}
