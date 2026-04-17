import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

const cols = [
  {
    title: "استكشفي",
    links: [
      { href: "/categories", label: "التصنيفات" },
      { href: "/picks", label: "اختيارات لهلوبة" },
      { href: "/radio", label: "الراديو" },
      { href: "/search", label: "بحث" },
    ],
  },
  {
    title: "للهلوبة",
    links: [
      { href: "/ask", label: "اسألي لهلوبة" },
      { href: "/favorites", label: "مفضلتكِ" },
      { href: "/about", label: "من نحن" },
      { href: "/contact", label: "تواصل" },
    ],
  },
  {
    title: "قانوني",
    links: [
      { href: "/privacy", label: "سياسة الخصوصية" },
      { href: "/terms", label: "الشروط" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-beige/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-plum">{SITE_NAME}</p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{SITE_TAGLINE}</p>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="space-y-3">
            <p className="text-sm font-semibold text-plum">{c.title}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
