export type ListeningHighlight = {
  stationName: string;
  country: string;
  tag: string;
  playsLabel: string;
};

export const LISTENING_HIGHLIGHTS: ListeningHighlight[] = [
  { stationName: "إذاعة القرآن الكريم من القاهرة", country: "مصر", tag: "قرآن", playsLabel: "الأكثر استماعًا هذا الأسبوع" },
  { stationName: "Radio Monte Carlo Doualiya", country: "فرنسا", tag: "أخبار", playsLabel: "رائج بين المستمعات" },
  { stationName: "Relax FM", country: "ألمانيا", tag: "موسيقى هادئة", playsLabel: "مساءً" },
  { stationName: "BBC Arabic", country: "المملكة المتحدة", tag: "ثقافة", playsLabel: "صباحًا" },
];
