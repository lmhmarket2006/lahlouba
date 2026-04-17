"use client";

import { Heart, Loader2, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStationsQuery } from "@/hooks/use-stations-query";
import { RADIO_FILTER_PRESETS } from "@/lib/radio-presets";
import { cn } from "@/lib/utils";
import { useRadioStore } from "@/stores/radio-store";
import type { RadioStation } from "@/types/radio";

function StationRow({
  station,
  active,
  onPlay,
  favorited,
  onToggleFav,
}: {
  station: RadioStation;
  active: boolean;
  onPlay: () => void;
  favorited: boolean;
  onToggleFav: () => void;
}) {
  const meta = [station.country, station.language, station.tags?.split(",")[0]].filter(Boolean).slice(0, 3).join(" · ");
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3 transition hover:bg-muted",
        active && "border-plum/40 bg-muted",
      )}
    >
      <button type="button" onClick={onPlay} className="min-w-0 flex-1 text-start">
        <p className="truncate text-sm font-semibold text-plum">{station.name}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{meta}</p>
      </button>
      <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-full" onClick={onToggleFav} aria-label="مفضلة">
        <Heart className={cn("h-4 w-4", favorited && "fill-rose text-rose")} />
      </Button>
    </div>
  );
}

export function RadioExplore() {
  const [preset, setPreset] = useState<(typeof RADIO_FILTER_PRESETS)[number]>(RADIO_FILTER_PRESETS[0]!);
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q.trim());

  const queryOpts = useMemo(() => {
    if (dq.length >= 2) return { q: dq };
    return { tag: preset.tag, language: preset.language, country: preset.country };
  }, [dq, preset]);

  const { data, isLoading, isFetching } = useStationsQuery(queryOpts);
  const stations = data?.stations ?? [];

  const current = useRadioStore((s) => s.current);
  const playStationInQueue = useRadioStore((s) => s.playStationInQueue);
  const setPlaying = useRadioStore((s) => s.setPlaying);
  const toggleFavoriteStation = useRadioStore((s) => s.toggleFavoriteStation);
  const isFavoriteStation = useRadioStore((s) => s.isFavoriteStation);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-plum md:text-3xl">راديو لهلوبة</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          محطات حقيقية عبر Radio Browser. اختاري تبويبًا سريعًا أو ابحثي باسم المحطة.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-[1.2rem] border border-border/70 bg-card p-4 shadow-sm md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحثي عن محطة..."
            className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>
        {data?.source === "fallback" ? (
          <p className="text-xs text-plum md:max-w-xs">تعمل الآن محطات احتياطية بسبب تعذر الاتصال بمزود المحطات.</p>
        ) : null}
      </div>

      <Tabs value={preset.id} onValueChange={(id) => setPreset(RADIO_FILTER_PRESETS.find((p) => p.id === id) ?? preset)}>
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {RADIO_FILTER_PRESETS.map((p) => (
            <TabsTrigger key={p.id} value={p.id} className="rounded-full px-3 py-1 text-[11px]">
              {p.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {isLoading || isFetching ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            جاري جلب المحطات...
          </div>
        ) : stations.length ? (
          stations.map((s, idx) => (
            <StationRow
              key={s.stationuuid + idx}
              station={s}
              active={current?.stationuuid === s.stationuuid}
              favorited={isFavoriteStation(s.stationuuid)}
              onToggleFav={() => toggleFavoriteStation(s)}
              onPlay={() => {
                playStationInQueue(stations, idx);
                setPlaying(true);
              }}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center text-sm text-muted-foreground">
            لا توجد نتائج — جرّبي بحثًا آخر أو تبويبًا مختلفًا.
          </div>
        )}
      </div>
    </div>
  );
}
