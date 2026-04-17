import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "تواصل",
  description: `تواصلي مع فريق ${SITE_NAME} لاقتراحاتكم أو الشراكات.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-plum md:text-3xl">تواصل</h1>
        <p className="mt-2 text-sm text-muted-foreground">يسعدنا سماعكِ — اتركي رسالة عبر البريد التالي:</p>
      </div>
      <Card className="border-border/70 bg-card p-6 text-sm text-muted-foreground">
        <p className="font-semibold text-plum">hello@lahlooba.app</p>
        <p className="mt-3">هذا بريد تجريبي للعرض. عند النشر، استبدليه ببريدكم الفعلي من إعدادات المشروع.</p>
        <p className="mt-3 text-xs">— فريق {SITE_NAME}</p>
      </Card>
    </div>
  );
}
