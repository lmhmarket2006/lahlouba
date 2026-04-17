"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useRadioStore } from "@/stores/radio-store";

export function RadioMiniPlayer() {
  const current = useRadioStore((s) => s.current);
  const isPlaying = useRadioStore((s) => s.isPlaying);
  const volume = useRadioStore((s) => s.volume);
  const playError = useRadioStore((s) => s.playError);
  const setPlaying = useRadioStore((s) => s.setPlaying);
  const setVolume = useRadioStore((s) => s.setVolume);
  const next = useRadioStore((s) => s.next);
  const prev = useRadioStore((s) => s.prev);
  const toggleFavoriteStation = useRadioStore((s) => s.toggleFavoriteStation);
  const isFavoriteStation = useRadioStore((s) => s.isFavoriteStation);
  const clearError = useRadioStore((s) => s.clearError);
  const [expanded, setExpanded] = useState(false);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsMd(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const meta =
    current &&
    [current.country, current.language, current.tags?.split(",")[0]].filter(Boolean).slice(0, 3).join(" · ");

  const showVolume = isMd || expanded;

  return (
    <motion.div
      layout
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className={cn(
        "fixed z-40 border border-border/80 bg-card/95 shadow-lg backdrop-blur-md",
        "inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-4 md:start-auto md:end-4 md:w-[380px]",
      )}
    >
      <div className="flex items-center gap-3 p-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-plum">{current?.name ?? "استمعي الآن — اختاري محطة"}</p>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 md:hidden"
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-label="إظهار مستوى الصوت"
            >
              <ChevronDown className={cn("h-4 w-4 transition", expanded && "rotate-180")} />
            </Button>
          </div>
          <p className="line-clamp-1 text-[11px] text-muted-foreground">{meta || "راديو حقيقي عبر Radio Browser"}</p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9" type="button" onClick={() => prev()} aria-label="المحطة السابقة">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="h-10 w-10 rounded-full"
            type="button"
            onClick={() => {
              if (!current) return;
              setPlaying(!isPlaying);
            }}
            aria-label={isPlaying ? "إيقاف" : "تشغيل"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ms-0.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" type="button" onClick={() => next()} aria-label="المحطة التالية">
            <SkipForward className="h-4 w-4" />
          </Button>
          {current?.stationuuid ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              type="button"
              aria-label="مفضلة"
              onClick={() => toggleFavoriteStation(current)}
            >
              <Heart className={cn("h-4 w-4", isFavoriteStation(current.stationuuid) && "fill-rose text-rose")} />
            </Button>
          ) : null}
        </div>
      </div>

      {showVolume ? (
        <div className="flex items-center gap-3 border-t border-border/60 px-3 py-3">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            className="flex-1"
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={(v) => setVolume((v[0] ?? 0) / 100)}
          />
        </div>
      ) : null}

      <AnimatePresence>
        {playError ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="border-t border-border/70 bg-rose-soft/40 px-3 py-2 text-xs text-plum"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <p className="leading-relaxed">{playError}</p>
              <div className="flex shrink-0 gap-2">
                <Button size="sm" variant="outline" className="h-8 rounded-full px-3 text-xs" type="button" onClick={clearError}>
                  حسنًا
                </Button>
                <Button size="sm" className="h-8 rounded-full px-3 text-xs" asChild>
                  <Link href="/radio">تغيير المحطة</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
