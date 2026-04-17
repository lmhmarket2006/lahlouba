import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { lahloobaPicks } from "@/data/content";

export const metadata: Metadata = {
  title: "اختيارات لهلوبة",
  description: "أفضل الوصفات والنصائح واللمسات التي ننصح بها اليوم — بذوق هادئ.",
};

export default function PicksPage() {
  const picks = lahloobaPicks();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-plum md:text-3xl">اختيارات لهلوبة</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">توصيات يومية بعناية — بدون إفراط، وبتركيز على الفائدة والمتعة.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {picks.map((item, index) => (
          <ContentCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
