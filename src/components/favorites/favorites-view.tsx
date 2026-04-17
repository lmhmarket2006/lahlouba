"use client";

import { Headphones, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CONTENT } from "@/data/content";
import { useContentFavoritesStore } from "@/stores/content-favorites-store";
import { useRadioStore } from "@/stores/radio-store";

export function FavoritesView() {
  const ids = useContentFavoritesStore((s) => s.ids);
  const toggle = useContentFavoritesStore((s) => s.toggle);
  const favoriteStations = useRadioStore((s) => s.favoriteStations);
  const toggleFavoriteStation = useRadioStore((s) => s.toggleFavoriteStation);

  const items = CONTENT.filter((c) => ids.includes(c.id));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-plum md:text-3xl">مفضلتكِ</h1>
        <p className="mt-2 text-sm text-muted-foreground">تُحفظ محليًا على جهازكِ — وصفات، مقالات، نصائح، ومحطات.</p>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-plum">المحتوى</h2>
          <Button asChild variant="outline" className="rounded-full" size="sm">
            <Link href="/search">بحث</Link>
          </Button>
        </div>
        {!items.length ? (
          <Card className="border-dashed border-border/80 bg-muted/20 p-10 text-center text-sm text-muted-foreground">
            لا يوجد محتوى محفوظ بعد. اضغطي أيقونة القلب داخل أي بطاقة لإضافتها.
          </Card>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {items.map((c) => (
              <Card key={c.id} className="flex items-center gap-3 border-border/70 p-3">
                <div className="relative h-16 w-24 overflow-hidden rounded-xl">
                  <Image src={c.coverImage} alt={c.coverAlt} fill className="object-cover" sizes="120px" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/post/${c.slug}`} className="line-clamp-2 text-sm font-semibold text-plum hover:underline">
                    {c.title}
                  </Link>
                </div>
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-full" onClick={() => toggle(c.id)}>
                  <Heart className="h-4 w-4 fill-rose text-rose" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-plum">المحطات</h2>
          <Button asChild variant="outline" className="rounded-full" size="sm">
            <Link href="/radio">
              <Headphones className="h-4 w-4" />
              الراديو
            </Link>
          </Button>
        </div>
        {!favoriteStations.length ? (
          <Card className="border-dashed border-border/80 bg-muted/20 p-10 text-center text-sm text-muted-foreground">
            لا توجد محطات مفضلة بعد. أضيفيها من المشغل أو صفحة الراديو.
          </Card>
        ) : (
          <div className="space-y-2">
            {favoriteStations.map((s) => (
              <Card key={s.stationuuid} className="flex items-center justify-between gap-3 border-border/70 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-plum">{s.name}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{[s.country, s.language].filter(Boolean).join(" · ")}</p>
                </div>
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-full" onClick={() => toggleFavoriteStation(s)}>
                  <Heart className="h-4 w-4 fill-rose text-rose" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
