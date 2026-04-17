import type { Metadata } from "next";
import { RadioExplore } from "@/components/radio/radio-explore";

export const metadata: Metadata = {
  title: "الراديو",
  description: "محطات حقيقية، تصفية سريعة، وتجربة استماع أنيقة عبر لهلوبة.",
};

export default function RadioPage() {
  return <RadioExplore />;
}
