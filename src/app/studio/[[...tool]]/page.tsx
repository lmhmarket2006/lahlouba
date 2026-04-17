import config from "../../../../sanity.config";
import { StudioClient } from "./studio-client";

export const dynamic = "force-static";

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET;

  if (!projectId || !dataset) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-right" dir="rtl">
        <h1 className="text-2xl font-semibold text-plum">تعذر فتح Sanity Studio</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          السبب: متغيرات Sanity غير مضبوطة في بيئة Vercel.
        </p>
        <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-sm leading-7 text-foreground">
          <p className="font-medium">أضيفي المتغيرات التالية ثم أعيدي النشر:</p>
          <ul className="mt-2 list-disc space-y-1 pe-5">
            <li>
              <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>
            </li>
            <li>
              <code>NEXT_PUBLIC_SANITY_DATASET</code>
            </li>
            <li>
              <code>SANITY_PROJECT_ID</code>
            </li>
            <li>
              <code>SANITY_DATASET</code>
            </li>
          </ul>
        </div>
      </main>
    );
  }

  return <StudioClient config={config} />;
}
