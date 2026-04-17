import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM = `أنتِ "لهلوبة"، مساعدة عربية دافئة وراقية لمنصة نسائية اسمها لهلوبة.
أسلوبك: بسيط، عملي، بدون مبالغة، بدون وعود طبية مطلقة، وبدون حرق لمسلسلات عند الاقتراح.
قدّمي خطوات واضحة وقصيرة عند الحاجة. استخدمي لغة عربية فصحى مبسطة قريبة من العامية المفهومة عند اللزوم.`;

const DEFAULT_MODEL = "google/gemini-1.5-flash";
const ALT_MODEL = "google/gemini-2.0-flash-001";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "لم يتم ضبط مفتاح OpenRouter بعد. أضيفي OPENROUTER_API_KEY في إعدادات Vercel (بيئة Production) ثم أعيدي النشر.",
        },
        { status: 503 },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
    }

    const messages = (body as { messages?: { role: string; content: string }[] }).messages;
    if (!messages?.length) {
      return NextResponse.json({ error: "الرسائل مطلوبة." }, { status: 400 });
    }

    const last = messages[messages.length - 1];
    if (!last || last.role !== "user") {
      return NextResponse.json({ error: "آخر رسالة يجب أن تكون من المستخدم." }, { status: 400 });
    }

    const configured = process.env.OPENROUTER_MODEL?.trim();

    const run = async (modelId: string) => {
      const payload = {
        model: modelId,
        temperature: 0.6,
        messages: [
          { role: "system", content: SYSTEM },
          ...messages.map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: String(m.content ?? ""),
          })),
        ],
      };

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://lahlouba.vercel.app",
          "X-Title": "Lahlouba",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        choices?: { message?: { content?: string } }[];
        error?: { message?: string };
      };

      if (!response.ok) {
        const detail = data?.error?.message || `OpenRouter HTTP ${response.status}`;
        throw new Error(detail);
      }

      const text = data?.choices?.[0]?.message?.content?.trim();
      if (!text) {
        throw new Error("لم يتم استلام نص من OpenRouter.");
      }

      return text;
    };

    const primary = configured || DEFAULT_MODEL;

    try {
      const text = await run(primary);
      return NextResponse.json({ text, model: primary });
    } catch (first) {
      if (configured) {
        throw first;
      }
      try {
        const text = await run(ALT_MODEL);
        return NextResponse.json({ text, model: ALT_MODEL, note: "used_fallback_model" });
      } catch {
        throw first;
      }
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "خطأ غير معروف";
    return NextResponse.json(
      { error: "تعذر الاتصال بـ OpenRouter حاليًا.", detail: message },
      { status: 502 },
    );
  }
}
