"use client";

import { Heart, Home, LayoutGrid, Mic, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/radio", label: "راديو", icon: Mic },
  { href: "/categories", label: "أقسام", icon: LayoutGrid },
  { href: "/ask", label: "لهلوبة", icon: Sparkles },
  { href: "/favorites", label: "مفضلة", icon: Heart },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg items-stretch justify-between px-2 py-2">
        {items.map((it) => {
          const active = pathname === it.href || (it.href !== "/" && pathname.startsWith(it.href));
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-1 text-[10px] text-muted-foreground transition",
                active && "bg-muted text-plum",
              )}
            >
              <Icon className={cn("h-5 w-5", active && "text-plum")} />
              <span>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
