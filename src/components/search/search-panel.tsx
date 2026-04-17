"use client";

import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CONTENT } from "@/data/content";
import { useStationsQuery } from "@/hooks/use-stations-query";
import { useRecentSearchesStore } from "@/stores/recent-searches-store";
import type { ContentItem } from "@/types/content";

type Tab = "all" | "recipes" | "articles" | "tips" | "stations" | "trend";

function filterContent(tab: Tab, q: string): ContentItem[] {
  const t = q.trim().toLowerCase();
  const base = CONTENT.filter((c) => {
    if (!t) return true;
    return (
      c.title.toLowerCase().includes(t) ||
      c.excerpt.toLowerCase().includes(t) ||
      (c.subcategory?.toLowerCase().includes(t) ?? false)
    );
  });
  if (tab === "all" || tab === "trend") {
    if (tab === "trend") return base.filter((c) => c.category === "trend" || c.badges?.includes("hot"));
    return base;
  }
  if (tab === "recipes") return base.filter((c) => c.kind === "recipe");
  if (tab === "articles") return base.filter((c) => c.kind === "article");
  if (tab === "tips") return base.filter((c) => c.kind === "tip");
  return base;
}

export function SearchPanel({
  onClose,
  autoFocus,
}: {
  onClose?: () => void;
  autoFocus?: boolean;
}) {
  const [tab, setTab] = useState<Tab>("all");
  const [q, setQ] = useState("");
  const pushRecent = useRecentSearchesStore((s) => s.push);
  const recent = useRecentSearchesStore((s) => s.items);

  const contentResults = useMemo(() => filterContent(tab, q), [tab, q]);

  const stationQuery = q.trim().length >= 2 ? q.trim() : "relax";
  const { data: stationsData, isFetching } = useStationsQuery({ q: stationQuery }, tab === "stations");

  const suggested = useMemo(() => CONTENT.filter((c) => c.badges?.includes("editor")).slice(0, 4), []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحثي عن وصفة، نصيحة، محطة..."
          className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              pushRecent(q);
            }
          }}
        />
        <Button
          type="button"
          size="sm"
          className="rounded-full px-4"
          onClick={() => {
            pushRecent(q);
          }}
        >
          بحث
        </Button>
      </div>

      {recent.length ? (
        <div className="flex flex-wrap gap-2">
          <span className="w-full text-[11px] text-muted-foreground">عمليات بحث أخيرة</span>
          {recent.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setQ(r)}
              className="rounded-full bg-muted px-3 py-1 text-xs text-foreground transition hover:bg-rose-soft/60"
            >
              {r}
            </button>
          ))}
        </div>
      ) : null}

      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="recipes">وصفات</TabsTrigger>
          <TabsTrigger value="articles">مقالات</TabsTrigger>
          <TabsTrigger value="tips">نصائح</TabsTrigger>
          <TabsTrigger value="stations">محطات</TabsTrigger>
          <TabsTrigger value="trend">ترند</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4 max-h-[50vh] overflow-y-auto pe-1">
          {tab === "stations" ? (
            <div className="space-y-2">
              {isFetching ? (
                <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري جلب المحطات...
                </div>
              ) : (
                (stationsData?.stations ?? []).slice(0, 30).map((s) => (
                  <Link
                    key={s.stationuuid}
                    href="/radio"
                    onClick={onClose}
                    className="block rounded-xl border border-border/60 bg-card px-3 py-2 text-sm transition hover:bg-muted"
                  >
                    <p className="font-medium text-plum">{s.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {[s.country, s.language].filter(Boolean).join(" · ")}
                    </p>
                  </Link>
                ))
              )}
              <p className="text-[11px] text-muted-foreground">للتحكم الكامل بالتشغيل، افتحي صفحة الراديو.</p>
            </div>
          ) : contentResults.length ? (
            <div className="space-y-2">
              {contentResults.slice(0, 24).map((c) => (
                <Link
                  key={c.id}
                  href={`/post/${c.slug}`}
                  onClick={onClose}
                  className="block rounded-xl border border-border/60 bg-card px-3 py-2 text-sm transition hover:bg-muted"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-plum">{c.title}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.excerpt}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0 text-[10px]">
                      {c.kind === "recipe" ? "وصفة" : c.kind === "article" ? "مقال" : "نصيحة"}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4 py-6">
              <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center">
                <p className="text-sm font-medium text-plum">لا توجد نتائج بعد</p>
                <p className="mt-2 text-sm text-muted-foreground">جرّبي كلمات أوسع، أو تصفحي اختيارات لهلوبة.</p>
                <Button asChild className="mt-4 rounded-full" variant="secondary">
                  <Link href="/picks" onClick={onClose}>
                    اختيارات لهلوبة
                  </Link>
                </Button>
              </div>
              <div>
                <p className="mb-2 text-xs text-muted-foreground">مقترحات</p>
                <div className="space-y-2">
                  {suggested.map((c) => (
                    <Link
                      key={c.id}
                      href={`/post/${c.slug}`}
                      onClick={onClose}
                      className="block rounded-xl border border-border/60 bg-card px-3 py-2 text-sm transition hover:bg-muted"
                    >
                      {c.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
