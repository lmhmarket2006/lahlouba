import type { Metadata } from "next";
import { SearchPanel } from "@/components/search/search-panel";

export const metadata: Metadata = {
  title: "بحث",
  description: "ابحثي في الوصفات والمقالات والمحطات ضمن لهلوبة.",
};

export default function SearchPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-plum md:text-3xl">بحث</h1>
        <p className="mt-2 text-sm text-muted-foreground">نتائج فورية مع تصفية بسيطة حسب النوع.</p>
      </div>
      <SearchPanel />
    </div>
  );
}
