"use client";

import { Headphones, Loader2, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  onPick,
}: {
  station: RadioStation;
  active: boolean;
  onPick: () => void;
}) {
  const meta = [station.country, station.language].filter(Boolean).join(" · ");
  return (
    <button
      type="button"
      onClick={onPick}
      className={cn(
        "flex w-full flex-col gap-0.5 rounded-xl px-3 py-2 text-start text-sm transition hover:bg-muted",
        active && "bg-muted",
      )}
    >
      <span className="font-medium text-plum">{station.name}</span>
      <span className="text-[11px] text-muted-foreground">{meta}</span>
    </button>
  );
}

export function RadioHeaderPicker() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<(typeof RADIO_FILTER_PRESETS)[number]>(RADIO_FILTER_PRESETS[0]!);
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q.trim());

  const queryOpts = useMemo(() => {
    if (dq.length >= 2) {
      return { q: dq };
    }
    return {
      tag: preset.tag,
      language: preset.language,
      country: preset.country,
    };
  }, [dq, preset]);

  const { data, isLoading, isFetching } = useStationsQuery(queryOpts);
  const stations = data?.stations ?? [];

  const current = useRadioStore((s) => s.current);
  const playStationInQueue = useRadioStore((s) => s.playStationInQueue);
  const setPlaying = useRadioStore((s) => s.setPlaying);

  const onPick = (station: RadioStation, index: number) => {
    playStationInQueue(stations.length ? stations : [station], index);
    setPlaying(true);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 gap-2 rounded-full border-border/80 bg-card/80 px-3 text-xs md:text-sm">
          <Headphones className="h-4 w-4 text-plum" />
          <span className="hidden max-w-[140px] truncate sm:inline">{current?.name ?? "محطات الراديو"}</span>
          <span className="sm:hidden">راديو</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[min(92vw,420px)] p-3">
        <DropdownMenuLabel className="text-xs text-muted-foreground">اختيار سريع — Radio Browser</DropdownMenuLabel>
        <div className="mt-2 flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-2 py-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحثي عن محطة..."
            className="h-9 border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="mt-3">
          <Tabs value={preset.id} onValueChange={(id) => setPreset(RADIO_FILTER_PRESETS.find((p) => p.id === id) ?? preset)}>
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
              {RADIO_FILTER_PRESETS.map((p) => (
                <TabsTrigger key={p.id} value={p.id} className="rounded-full px-3 py-1 text-[11px]">
                  {p.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <DropdownMenuSeparator className="my-3" />

        <div className="max-h-[320px] space-y-1 overflow-y-auto pe-1">
          {isLoading || isFetching ? (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              جاري جلب المحطات...
            </div>
          ) : stations.length ? (
            stations.map((s, idx) => (
              <StationRow
                key={s.stationuuid + idx}
                station={s}
                active={current?.stationuuid === s.stationuuid}
                onPick={() => onPick(s, idx)}
              />
            ))
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">لا توجد نتائج — جرّبي كلمات أخرى.</p>
          )}
        </div>

        {data?.source === "fallback" ? (
          <p className="mt-2 rounded-xl bg-rose-soft/50 px-3 py-2 text-[11px] text-plum">
            يتم استخدام محطات احتياطية بسبب تعذر الاتصال بمزود المحطات مؤقتًا.
          </p>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
