import type { Metadata } from "next";
import { CategoriesView } from "@/components/categories/categories-view";
import { getContentCatalog } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "التصنيفات",
  description: "تصفحي أقسام لهلوبة بوضوح: وصفات، عناية، تنظيم، ترفيه، وترند — بدون تعقيد.",
};

export default async function CategoriesPage() {
  const content = await getContentCatalog();
  return <CategoriesView content={content} />;
}
