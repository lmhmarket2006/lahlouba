import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "من نحن",
  description: `تعرّفي على رؤية ${SITE_NAME} وفريق العمل الهادئ خلف المنصة.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5 text-sm leading-relaxed text-muted-foreground">
      <h1 className="text-2xl font-semibold text-plum md:text-3xl">من نحن</h1>
      <p>
        {SITE_NAME} منصة عربية نسائية تهدف إلى تبسيط اليوم: راديو حقيقي، محتوى مفيد، ومساعدة ذكية دافئة — دون ضجيج
        وبأسلوب راقٍ.
      </p>
      <p>نؤمن أن الجمال في التفاصيل الصغيرة: خطوة مطبخ هادئة، تنظيم خفيف، أو لحظة استماع مريحة.</p>
      <p>هذه النسخة الأولى قابلة للتوسع لاحقًا بمحتوى حقيقي وقاعدة بيانات — أما اليوم فهي جاهزة لتجربة استخدام كاملة.</p>
    </div>
  );
}
