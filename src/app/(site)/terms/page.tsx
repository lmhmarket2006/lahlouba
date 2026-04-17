import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "الشروط",
  description: `شروط استخدام منصة ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h1 className="text-2xl font-semibold text-plum md:text-3xl">الشروط</h1>
      <p>باستخدامكِ لـ {SITE_NAME} فأنتِ توافقين على الاستخدام الحسن للمنصة والمحتوى التجريبي المعروض حاليًا.</p>
      <p>المحتوى التعليمي والترفيهي لا يغني عن الاستشارة المتخصصة عند الحاجة (خاصة في المواضيع الصحية).</p>
      <p>روابط الراديو تقدمها أطراف خارجية؛ قد تتغير جودة البث أو توفر المحطات دون إشعار مسبق.</p>
    </div>
  );
}
