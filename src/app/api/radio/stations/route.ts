import { NextRequest, NextResponse } from "next/server";
import { RADIO_USER_AGENT } from "@/lib/constants";
import { FALLBACK_STATIONS } from "@/data/radio-fallback";
import type { RadioStation } from "@/types/radio";

const BASES = [
  "https://de1.api.radio-browser.info",
  "https://fi1.api.radio-browser.info",
  "https://nl1.api.radio-browser.info",
];

async function fetchStations(url: string): Promise<RadioStation[]> {
  const res = await fetch(url, {
    headers: { "User-Agent": RADIO_USER_AGENT },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("radio fetch failed");
  return (await res.json()) as RadioStation[];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const tag = searchParams.get("tag");
  const country = searchParams.get("country");
  const language = searchParams.get("language");
  const limit = searchParams.get("limit") ?? "40";

  const params = new URLSearchParams();
  params.set("hidebroken", "true");
  params.set("order", "votes");
  params.set("reverse", "true");
  params.set("limit", limit);

  if (q) params.set("name", q);
  if (tag) params.set("tag", tag);
  if (country) params.set("countrycode", country);
  if (language) params.set("language", language);

  const path = `/json/stations/search?${params.toString()}`;

  for (const base of BASES) {
    try {
      const data = await fetchStations(`${base}${path}`);
      if (Array.isArray(data) && data.length) {
        return NextResponse.json({ stations: data, source: "live" });
      }
    } catch {
      /* try next mirror */
    }
  }

  return NextResponse.json({ stations: FALLBACK_STATIONS, source: "fallback" });
}
