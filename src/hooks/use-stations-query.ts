"use client";

import { useQuery } from "@tanstack/react-query";
import type { RadioStation } from "@/types/radio";

export type StationsResponse = {
  stations: RadioStation[];
  source: "live" | "fallback" | string;
};

export function stationsQueryKey(opts: {
  q?: string;
  tag?: string;
  language?: string;
  country?: string;
}) {
  return ["stations", opts.q ?? "", opts.tag ?? "", opts.language ?? "", opts.country ?? ""] as const;
}

export function useStationsQuery(opts: {
  q?: string;
  tag?: string;
  language?: string;
  country?: string;
}) {
  return useQuery({
    queryKey: stationsQueryKey(opts),
    queryFn: async (): Promise<StationsResponse> => {
      const p = new URLSearchParams();
      if (opts.q) p.set("q", opts.q);
      if (opts.tag) p.set("tag", opts.tag);
      if (opts.language) p.set("language", opts.language);
      if (opts.country) p.set("country", opts.country);
      const res = await fetch(`/api/radio/stations?${p.toString()}`);
      if (!res.ok) throw new Error("stations");
      return (await res.json()) as StationsResponse;
    },
    staleTime: 1000 * 60 * 10,
  });
}
