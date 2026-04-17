import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostSaveButton } from "@/components/post/post-actions";
import { ShareRow } from "@/components/post/share-row";
import { ContentCard } from "@/components/content/content-card";
import { Button } from "@/components/ui/button";
import { CONTENT, getContentBySlug } from "@/data/content";
import { SITE_NAME } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";
import { badgeMeta } from "@/lib/badge-label";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CONTENT.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug(slug);
  if (!item) return { title: "غير موجود" };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [{ url: item.coverImage, alt: item.coverAlt }],
      locale: "ar_AR",
      type: "article",
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug(slug);
  if (!item) notFound();

  const related = CONTENT.filter((c) => c.category === item.category && c.id !== item.id).slice(0, 3);
  const url = `${getSiteUrl()}/post/${item.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": item.kind === "recipe" ? "Recipe" : "Article",
    headline: item.title,
    description: item.excerpt,
    inLanguage: "ar",
    image: [item.coverImage],
    datePublished: item.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: url,
  };

  const kindLabel = item.kind === "recipe" ? "وصفة" : item.kind === "article" ? "مقال" : "نصيحة";

  return (
    <article className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="overflow-hidden rounded-[1.4rem] border border-border/70 bg-card shadow-sm">
        <div className="relative aspect-[16/9] w-full">
          <Image src={item.coverImage} alt={item.coverAlt} fill priority className="object-cover" sizes="(max-width:768px) 100vw, 900px" />
          <div className="absolute inset-0 bg-gradient-to-t from-plum/45 via-transparent to-transparent" />
          <div className="absolute bottom-4 start-4 end-4 space-y-2">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-background/80 px-3 py-1 text-[11px] text-plum backdrop-blur">{kindLabel}</span>
              {item.badges?.map((b) => {
                const m = badgeMeta(b);
                return (
                  <span key={b} className="rounded-full bg-rose-soft/90 px-3 py-1 text-[11px] text-plum">
                    {m.label}
                  </span>
                );
              })}
            </div>
            <h1 className="text-2xl font-semibold text-white md:text-4xl">{item.title}</h1>
            <p className="text-xs text-white/85 md:text-sm">
              {item.readMinutes} دقيقة قراءة · {item.publishedAt}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-b border-border/70 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{item.excerpt}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <PostSaveButton id={item.id} />
          <ShareRow title={item.title} path={`/post/${item.slug}`} />
        </div>
      </div>

      <div className="max-w-3xl space-y-4 text-base leading-relaxed">
        {item.body.map((p, idx) => (
          <p key={idx} className="text-muted-foreground">
            {p}
          </p>
        ))}

        {item.kind === "recipe" && item.ingredients?.length ? (
          <div className="my-8 rounded-[1.2rem] border border-border/70 bg-muted/30 p-6">
            <h2 className="text-lg font-semibold text-plum">المكونات</h2>
            <ul className="mt-3 list-disc space-y-2 ps-5 text-sm text-muted-foreground">
              {item.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {item.kind === "recipe" && item.steps?.length ? (
          <div className="my-8 rounded-[1.2rem] border border-border/70 bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-plum">الخطوات</h2>
            <ol className="mt-3 list-decimal space-y-2 ps-5 text-sm text-muted-foreground">
              {item.steps.map((st) => (
                <li key={st}>{st}</li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="secondary" className="rounded-full">
          <Link href="/categories">عودة للتصنيفات</Link>
        </Button>
        <Button asChild className="rounded-full">
          <Link href="/picks">اكتشفي المزيد</Link>
        </Button>
      </div>

      {related.length ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-plum">قد يعجبكِ أيضًا</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((r, index) => (
              <ContentCard key={r.id} item={r} index={index} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
