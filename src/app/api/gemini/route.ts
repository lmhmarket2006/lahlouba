import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM = `أنتِ "لهلوبة"، مساعدة عربية دافئة وراقية لمنصة نسائية اسمها لهلوبة.
أسلوبك: بسيط، عملي، بدون مبالغة، بدون وعود طبية مطلقة، وبدون حرق لمسلسلات عند الاقتراح.
قدّمي خطوات واضحة وقصيرة عند الحاجة. استخدمي لغة عربية فصحى مبسطة قريبة من العامية المفهومة عند اللزوم.`;

/** الافتراضي: 1.5 Flash — الأكثر توافقًا مع المفاتيح والمناطق. يمكن التجاوز عبر GEMINI_MODEL في Vercel. */
const DEFAULT_MODEL = "gemini-1.5-flash";
const ALT_MODEL = "gemini-2.0-flash";

function extractText(result: Awaited<ReturnType<ReturnType<GoogleGenerativeAI["getGenerativeModel"]>["generateContent"]>>) {
  try {
    return result.response.text().trim();
  } catch {
    const parts = result.response.candidates?.[0]?.content?.parts;
    const joined =
      parts
        ?.map((p) => ("text" in p && typeof p.text === "string" ? p.text : ""))
        .join("")
        .trim() ?? "";
    return joined || "لم يتم استلام نص من النموذج.";
  }
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "لم يتم ضبط مفتاح Gemini بعد. أضيفي GEMINI_API_KEY في إعدادات Vercel (بيئة Production) ثم أعيدي النشر.",
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

    const contents = messages.map((m) => ({
      role: (m.role === "assistant" ? "model" : "user") as "user" | "model",
      parts: [{ text: String(m.content ?? "") }],
    }));

    const genAI = new GoogleGenerativeAI(apiKey);
    const configured = process.env.GEMINI_MODEL?.trim();

    const run = async (modelId: string) => {
      const model = genAI.getGenerativeModel({
        model: modelId,
        systemInstruction: SYSTEM,
      });
      return model.generateContent({ contents });
    };

    const primary = configured || DEFAULT_MODEL;

    try {
      const result = await run(primary);
      const text = extractText(result);
      return NextResponse.json({ text, model: primary });
    } catch (first) {
      if (configured) {
        throw first;
      }
      try {
        const result = await run(ALT_MODEL);
        const text = extractText(result);
        return NextResponse.json({ text, model: ALT_MODEL, note: "used_fallback_model" });
      } catch {
        throw first;
      }
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "خطأ غير معروف";
    return NextResponse.json(
      { error: "تعذر الاتصال بـ Gemini حاليًا.", detail: message },
      { status: 502 },
    );
  }
}
