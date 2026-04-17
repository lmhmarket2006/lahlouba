"use client";

import { Menu, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { RadioHeaderPicker } from "@/components/radio/radio-header-picker";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SITE_NAME } from "@/lib/constants";
import { useSearchUiStore } from "@/stores/search-ui-store";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/radio", label: "الراديو" },
  { href: "/categories", label: "التصنيفات" },
  { href: "/picks", label: "اختيارات لهلوبة" },
  { href: "/ask", label: "اسألي لهلوبة" },
  { href: "/favorites", label: "المفضلة" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل" },
];

export function SiteHeader() {
  const setSearchOpen = useSearchUiStore((s) => s.setOpen);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:py-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="القائمة">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(92vw,360px)]">
              <SheetHeader>
                <SheetTitle className="text-start text-plum">{SITE_NAME}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm text-foreground transition hover:bg-muted"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/privacy"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted"
                >
                  سياسة الخصوصية
                </Link>
                <Link
                  href="/terms"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted"
                >
                  الشروط
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex min-w-0 items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-rose-soft text-sm font-bold text-plum shadow-sm">
              ل
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-plum md:text-base">{SITE_NAME}</p>
              <p className="hidden truncate text-[11px] text-muted-foreground md:block">يومكِ أجمل — بهدوء وفخامة بسيطة</p>
            </div>
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            {links.slice(0, 5).map((l) => (
              <Link key={l.href} href={l.href} className="rounded-full px-3 py-2 transition hover:bg-muted hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <RadioHeaderPicker />
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="بحث" onClick={() => setSearchOpen(true)}>
            <Search className="h-5 w-5" />
          </Button>
          <Button asChild variant="gold" className="hidden rounded-full px-4 md:inline-flex">
            <Link href="/ask" className="gap-2">
              <Sparkles className="h-4 w-4" />
              لهلوبة
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
