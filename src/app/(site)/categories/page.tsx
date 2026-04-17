import type { Metadata } from "next";
import { CategoriesView } from "@/components/categories/categories-view";

export const metadata: Metadata = {
  title: "التصنيفات",
  description: "تصفحي أقسام لهلوبة بوضوح: وصفات، عناية، تنظيم، ترفيه، وترند — بدون تعقيد.",
};

export default function CategoriesPage() {
  return <CategoriesView />;
}
