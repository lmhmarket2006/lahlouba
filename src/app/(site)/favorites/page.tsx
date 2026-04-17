import type { Metadata } from "next";
import { FavoritesView } from "@/components/favorites/favorites-view";

export const metadata: Metadata = {
  title: "المفضلة",
  description: "كل ما حفظتِه من محتوى ومحطات — محليًا على جهازكِ داخل لهلوبة.",
};

export default function FavoritesPage() {
  return <FavoritesView />;
}
