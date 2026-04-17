"use client";

import {
  BookOpen,
  ChefHat,
  Clapperboard,
  Droplets,
  Flame,
  Heart,
  Lightbulb,
  Moon,
  Sparkles,
  Star,
  Tv,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CATEGORY_META } from "@/data/category-meta";
import { cn } from "@/lib/utils";
import type { ContentItem } from "@/types/content";

const iconMap = {
  ChefHat,
  Sparkles,
  Lightbulb,
  BookOpen,
  Heart,
  Droplets,
  Clapperboard,
  Star,
  Moon,
  Tv,
  Flame,
} as const;

export function CategoriesView({ content }: { content: ContentItem[] }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return CATEGORY_META;
    return CATEGORY_META.filter(
      (c) => c.title.toLowerCase().includes(t) || c.description.toLowerCase().includes(t) || c.subcategories.some((s) => s.title.includes(t)),
    );
  }, [q]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-plum md:text-3xl">التصنيفات</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">كل قسم ببطاقة واسعة، مع وصف مختصر وتفرعات واضحة.</p>
      </div>

      <div className="max-w-xl">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="صفّي التصنيفات بالاسم..." />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((cat) => {
          const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Sparkles;
          const count = content.filter((x) => x.category === cat.id).length;
          return (
            <Card key={cat.id} id={cat.id} className="overflow-hidden border-border/70 transition hover:shadow-md">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-soft text-plum">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">{count} عناصر تجريبية</span>
                </div>
                <div>
                  <CardTitle>{cat.title}</CardTitle>
                  <CardDescription className="mt-2">{cat.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {cat.subcategories.slice(0, 6).map((s) => (
                    <span key={s.id} className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">
                      {s.title}
                    </span>
                  ))}
                </div>
                <Link href="/search" className="inline-flex text-sm font-medium text-plum hover:underline">
                  ابحثي داخل المحتوى
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!filtered.length ? (
        <div className={cn("rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center text-sm text-muted-foreground")}>
          لا توجد نتائج مطابقة.
        </div>
      ) : null}
    </div>
  );
}
