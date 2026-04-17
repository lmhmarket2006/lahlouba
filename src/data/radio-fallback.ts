import type { RadioStation } from "@/types/radio";

export const FALLBACK_STATIONS: RadioStation[] = [
  {
    stationuuid: "fallback-monte-carlo",
    name: "Radio Monte Carlo Doualiya",
    url: "https://montecarlodoualiya128k.ice.infomaniak.ch/mc-doualiya-128.mp3",
    url_resolved: "https://montecarlodoualiya128k.ice.infomaniak.ch/mc-doualiya-128.mp3",
    country: "France",
    countrycode: "FR",
    language: "arabic",
    tags: "news,culture",
  },
  {
    stationuuid: "fallback-bbc-arabic",
    name: "BBC Arabic",
    url: "https://stream.live.vc.bbcmedia.co.uk/bbc_arabic_radio",
    url_resolved: "https://stream.live.vc.bbcmedia.co.uk/bbc_arabic_radio",
    country: "United Kingdom",
    countrycode: "GB",
    language: "arabic",
    tags: "news,talk",
  },
  {
    stationuuid: "fallback-quran-cairo",
    name: "إذاعة القرآن الكريم من القاهرة",
    url: "https://stream.radiojar.com/8s5u5tpdtwzuv",
    url_resolved: "https://stream.radiojar.com/8s5u5tpdtwzuv",
    country: "Egypt",
    countrycode: "EG",
    language: "arabic",
    tags: "quran",
  },
];
