"use client";

import { motion } from "framer-motion";
import { Clock, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { badgeMeta } from "@/lib/badge-label";
import { cn } from "@/lib/utils";
import { useContentFavoritesStore } from "@/stores/content-favorites-store";
import type { ContentItem } from "@/types/content";

const kindLabel: Record<ContentItem["kind"], string> = {
  recipe: "وصفة",
  article: "مقال",
  tip: "نصيحة",
};

export function ContentCard({ item, index = 0 }: { item: ContentItem; index?: number }) {
  const toggle = useContentFavoritesStore((s) => s.toggle);
  const has = useContentFavoritesStore((s) => s.has);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
    >
      <Card className="group overflow-hidden border-border/70">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={item.coverImage}
            alt={item.coverAlt}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-plum/35 via-transparent to-transparent" />
          <div className="absolute start-3 top-3 flex flex-wrap gap-1">
            <Badge variant="outline" className="border-white/40 bg-background/70 text-[10px] text-plum backdrop-blur">
              {kindLabel[item.kind]}
            </Badge>
            {item.badges?.slice(0, 2).map((b) => {
              const m = badgeMeta(b);
              return (
                <Badge key={b} variant={m.variant} className="text-[10px]">
                  {m.label}
                </Badge>
              );
            })}
          </div>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute end-3 top-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur"
            aria-label="مفضلة"
            onClick={(e) => {
              e.preventDefault();
              toggle(item.id);
            }}
          >
            <Heart className={cn("h-4 w-4", has(item.id) && "fill-rose text-rose")} />
          </Button>
        </div>
        <CardContent className="space-y-2 pt-4">
          <Link href={`/post/${item.slug}`} className="block">
            <h3 className="text-base font-semibold leading-snug text-plum transition group-hover:text-accent">{item.title}</h3>
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{item.readMinutes} دقيقة قراءة</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
