"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Headphones, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ContentCard } from "@/components/content/content-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LISTENING_HIGHLIGHTS } from "@/data/listening-mock";
import { SITE_NAME } from "@/lib/constants";
import type { ContentCategory, ContentItem } from "@/types/content";

const SECTIONS: { id: ContentCategory; title: string; subtitle: string }[] = [
  { id: "recipes", title: "أحدث الوصفات", subtitle: "لمسة مطبخ هادئة ومريحة" },
  { id: "personal-care", title: "العناية الشخصية", subtitle: "تفاصيل صغيرة بفرق كبير" },
  { id: "skincare", title: "العناية بالبشرة", subtitle: "أساسيات واضحة" },
  { id: "organize", title: "تنظيم وتنظيف", subtitle: "بيت أخف بدون ضغط" },
  { id: "hacks", title: "أفكار وحيل", subtitle: "حلول سريعة لليوم" },
  { id: "growth", title: "تعليم وتطوير", subtitle: "وقتكِ يستحق خطوات لطيفة" },
  { id: "entertainment", title: "ترفيه وثقافة", subtitle: "لمسات مسائية" },
  { id: "celebrities", title: "أخبار النجوم", subtitle: "مختارات هادئة" },
  { id: "horoscope", title: "الأبراج", subtitle: "قراءة خفيفة" },
  { id: "series", title: "أخبار المسلسلات", subtitle: "جديد الدراما باختصار" },
  { id: "trend", title: "الترند الآن", subtitle: "ما يتداول بسرعة" },
];

function pickCategoryItems(content: ContentItem[], id: ContentCategory, limit = 3) {
  return content.filter((c) => c.category === id).slice(0, limit);
}

export function HomeView({ content }: { content: ContentItem[] }) {
  const featured = useMemo(
    () =>
      content
        .filter((c) => c.badges?.includes("hot") || c.badges?.includes("new"))
        .slice(0, 5),
    [content],
  );
  const picks = useMemo(() => content.filter((c) => c.badges?.includes("editor")).slice(0, 6), [content]);
  const reads = useMemo(() => [...content].sort((a, b) => b.readMinutes - a.readMinutes).slice(0, 4), [content]);
  const [newsletter, setNewsletter] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="relative overflow-hidden rounded-[1.6rem] border border-border/70 bg-gradient-to-b from-rose-soft/60 via-card to-beige/40 p-8 shadow-sm md:p-12">
        <div className="pointer-events-none absolute -start-24 -top-24 h-64 w-64 rounded-full bg-lavender-gray/40 blur-3xl" />
        <div className="pointer-events-none absolute -end-16 bottom-0 h-56 w-56 rounded-full bg-rose/25 blur-3xl" />

        <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">منصة نسائية عربية</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-plum md:text-5xl">
              {SITE_NAME}
              <span className="block text-2xl font-medium text-foreground/80 md:text-3xl">يومكِ أجمل — بهدوء</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              راديو حقيقي، محتوى مفيد، ومساعدة ذكية باسم {SITE_NAME}. كل شيء بسيط، أنيق، وقريب من احتياجكِ اليومي.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <Link href="/radio">
                  <Headphones className="h-4 w-4" />
                  استمعي الآن
                </Link>
              </Button>
              <Button asChild variant="secondary" className="rounded-full px-6">
                <Link href="/ask">
                  <Sparkles className="h-4 w-4" />
                  اسألي {SITE_NAME}
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.45 }}>
            <Card className="border-border/70 bg-card/80 p-5 shadow-md backdrop-blur">
              <p className="text-sm font-semibold text-plum">مختارات سريعة</p>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-muted/60 px-3 py-2">
                  <span>راديو عربي</span>
                  <span className="text-xs text-plum">جاهز</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-muted/60 px-3 py-2">
                  <span>وصفات خفيفة</span>
                  <span className="text-xs text-plum">محدث</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-muted/60 px-3 py-2">
                  <span>مساعدة ذكية</span>
                  <span className="text-xs text-plum">دافئة</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-plum md:text-2xl">مميز اليوم</h2>
            <p className="text-sm text-muted-foreground">بطاقات مختارة بعناية — بدون ازدحام</p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/picks">اختيارات لهلوبة</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((item, index) => (
            <ContentCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/70 bg-gradient-to-b from-card to-rose-soft/30 p-6">
          <p className="text-xs font-semibold text-muted-foreground">استمعي الآن</p>
          <h3 className="mt-2 text-lg font-semibold text-plum">راديو حقيقي داخل الموقع</h3>
          <p className="mt-2 text-sm text-muted-foreground">شغّلي محطتكِ من أي صفحة — مع مشغل ثابت أنيق.</p>
          <Button asChild className="mt-4 rounded-full">
            <Link href="/radio">اذهبي إلى الراديو</Link>
          </Button>
        </Card>
        <Card className="border-border/70 bg-gradient-to-b from-card to-beige/40 p-6">
          <p className="text-xs font-semibold text-muted-foreground">اسألي لهلوبة</p>
          <h3 className="mt-2 text-lg font-semibold text-plum">مساعدة ذكية بحرارة وبساطة</h3>
          <p className="mt-2 text-sm text-muted-foreground">وصفات، عناية، تنظيم، ومشاهدة — بأسلوب عملي.</p>
          <Button asChild variant="secondary" className="mt-4 rounded-full">
            <Link href="/ask">ابدئي محادثة</Link>
          </Button>
        </Card>
      </section>

      {SECTIONS.map((sec, idx) => {
        const items = pickCategoryItems(content, sec.id, 3);
        if (!items.length) return null;
        return (
          <section key={sec.id} className="space-y-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-plum md:text-2xl">{sec.title}</h2>
                <p className="text-sm text-muted-foreground">{sec.subtitle}</p>
              </div>
              <Button asChild variant="ghost" className="rounded-full text-sm text-plum">
                <Link href={`/categories#${sec.id}`} className="inline-flex items-center gap-1">
                  استكشفي
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {items.map((item, index) => (
                <ContentCard key={item.id} item={item} index={index + idx} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-plum">الأكثر قراءة</h2>
          <div className="space-y-2">
            {reads.map((c) => (
              <Link
                key={c.id}
                href={`/post/${c.slug}`}
                className="block rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm transition hover:bg-muted"
              >
                <p className="font-medium text-plum">{c.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{c.readMinutes} دقيقة</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-plum">الأكثر استماعًا</h2>
          <div className="space-y-2">
            {LISTENING_HIGHLIGHTS.map((h) => (
              <div key={h.stationName} className="rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm">
                <p className="font-medium text-plum">{h.stationName}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {h.country} · {h.tag}
                </p>
                <p className="mt-2 text-[11px] text-plum/80">{h.playsLabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.4rem] border border-border/70 bg-gradient-to-l from-rose-soft/40 via-card to-beige/30 p-8 shadow-sm md:p-10">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-plum">اختيارات لهلوبة</h2>
            <p className="mt-2 text-sm text-muted-foreground">محتوى يومي مختار بذوق هادئ — وصفات، نصائح، ولمسات دافئة.</p>
            <Button asChild className="mt-4 rounded-full">
              <Link href="/picks">عرض الاختيارات</Link>
            </Button>
          </div>
          <div className="space-y-2">
            {picks.slice(0, 3).map((c) => (
              <Link key={c.id} href={`/post/${c.slug}`} className="block rounded-2xl bg-card/80 px-4 py-3 text-sm shadow-sm transition hover:bg-muted">
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.4rem] border border-border/70 bg-card p-8 shadow-sm md:p-10">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-xl font-semibold text-plum">اشتركي بالنشرة</h2>
          <p className="mt-2 text-sm text-muted-foreground">تلخيص أسبوعي هادئ — بدون إزعاج.</p>
          {!sent ? (
            <form
              className="mt-5 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <Input
                type="email"
                required
                value={newsletter}
                onChange={(e) => setNewsletter(e.target.value)}
                placeholder="بريدكِ الإلكتروني"
                className="sm:flex-1"
              />
              <Button type="submit" className="rounded-full sm:w-auto">
                اشتراك
              </Button>
            </form>
          ) : (
            <p className="mt-5 text-sm text-plum">شكرًا! سنرسل لكِ أول رسالة قريبًا بإذن الله.</p>
          )}
        </div>
      </section>
    </div>
  );
}
