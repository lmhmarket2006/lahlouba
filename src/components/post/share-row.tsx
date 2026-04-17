"use client";

import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/site-url";

export function ShareRow({ title, path }: { title: string; path: string }) {
  const url = `${getSiteUrl()}${path}`;
  const text = encodeURIComponent(title);
  const link = encodeURIComponent(url);

  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild variant="outline" className="rounded-full" size="sm">
        <a href={`https://twitter.com/intent/tweet?text=${text}&url=${link}`} target="_blank" rel="noreferrer">
          مشاركة
        </a>
      </Button>
      <Button asChild variant="outline" className="rounded-full" size="sm">
        <a href={`https://wa.me/?text=${text}%20${link}`} target="_blank" rel="noreferrer">
          واتساب
        </a>
      </Button>
      <Button
        type="button"
        variant="outline"
        className="rounded-full"
        size="sm"
        onClick={async () => {
          await navigator.clipboard.writeText(url);
        }}
      >
        <Link2 className="h-4 w-4" />
        نسخ الرابط
      </Button>
    </div>
  );
}
