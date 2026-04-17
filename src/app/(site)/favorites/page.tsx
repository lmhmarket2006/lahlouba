import type { Metadata } from "next";
import { FavoritesView } from "@/components/favorites/favorites-view";
import { getContentCatalog } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "المفضلة",
  description: "كل ما حفظتِه من محتوى ومحطات — محليًا على جهازكِ داخل لهلوبة.",
};

export default async function FavoritesPage() {
  const content = await getContentCatalog();
  return <FavoritesView content={content} />;
}
