"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useContentFavoritesStore } from "@/stores/content-favorites-store";

export function PostSaveButton({ id }: { id: string }) {
  const toggle = useContentFavoritesStore((s) => s.toggle);
  const has = useContentFavoritesStore((s) => s.has);

  return (
    <Button type="button" variant="outline" className="rounded-full" onClick={() => toggle(id)}>
      <Heart className={cn("h-4 w-4", has(id) && "fill-rose text-rose")} />
      {has(id) ? "محفوظ" : "حفظ"}
    </Button>
  );
}
