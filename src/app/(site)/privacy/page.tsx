import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: `سياسة الخصوصية الخاصة بمنصة ${SITE_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h1 className="text-2xl font-semibold text-plum md:text-3xl">سياسة الخصوصية</h1>
      <p>
        نحترم خصوصيتكِ. تُخزَّن بعض التفضيلات محليًا على جهازكِ (مثل المفضلة وآخر استماع) ولا تُرسل إلى خوادم {SITE_NAME}{" "}
        ما لم يتم توفير بنية لاحقة لذلك.
      </p>
      <p>
        عند تفعيل المساعد الذكي، تُرسل رسائل المحادثة إلى مزود الذكاء الاصطناعي عبر خادم آمن داخل Vercel باستخدام مفتاح{" "}
        <span className="font-mono text-xs">GEMINI_API_KEY</span> — ولا يُخزَّن المفتاح في الواجهة الأمامية.
      </p>
      <p>قد يستخدم الموقع خدمات طرف ثالث مثل Radio Browser لجلب روابط المحطات.</p>
    </div>
  );
}
