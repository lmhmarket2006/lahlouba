export type RadioFilterPreset = {
  id: string;
  label: string;
  tag?: string;
  language?: string;
  country?: string;
};

export const RADIO_FILTER_PRESETS: RadioFilterPreset[] = [
  { id: "popular", label: "الأشهر" },
  { id: "arabic", label: "عربي", language: "arabic" },
  { id: "quran", label: "قرآن", tag: "quran" },
  { id: "calm", label: "موسيقى هادئة", tag: "relax" },
  { id: "lifestyle", label: "لايف ستايل", tag: "lifestyle" },
  { id: "news", label: "أخبار", tag: "news" },
  { id: "culture", label: "ثقافة", tag: "culture" },
  { id: "education", label: "تعليم", tag: "education" },
  { id: "kids", label: "أطفال", tag: "kids" },
  { id: "fun", label: "ترفيه", tag: "pop" },
  { id: "egypt", label: "مصر", country: "EG" },
  { id: "saudi", label: "السعودية", country: "SA" },
  { id: "morocco", label: "المغرب", country: "MA" },
];
