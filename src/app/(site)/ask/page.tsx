import type { Metadata } from "next";
import { LahloobaChat } from "@/components/ask/lahlooba-chat";

export const metadata: Metadata = {
  title: "اسألي لهلوبة",
  description: "مساعدة ذكية عربية للوصفات، العناية، التنظيم، والمزاج — عبر Gemini من الخادم.",
};

export default function AskPage() {
  return <LahloobaChat />;
}
