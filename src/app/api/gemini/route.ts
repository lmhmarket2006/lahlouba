import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM = `أنتِ "لهلوبة"، مساعدة عربية دافئة وراقية لمنصة نسائية اسمها لهلوبة.
أسلوبك: بسيط، عملي، بدون مبالغة، بدون وعود طبية مطلقة، وبدون حرق لمسلسلات عند الاقتراح.
قدّمي خطوات واضحة وقصيرة عند الحاجة. استخدمي لغة عربية فصحى مبسطة قريبة من العامية المفهومة عند اللزوم.`;

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "لم يتم ضبط مفتاح Gemini بعد. أضيفي GEMINI_API_KEY في إعدادات Vercel ثم أعيدي المحاولة.",
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
  if (last.role !== "user") {
    return NextResponse.json({ error: "آخر رسالة يجب أن تكون من المستخدم." }, { status: 400 });
  }

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(last.content);
    const text = result.response.text();
    return NextResponse.json({ text });
  } catch (e) {
    const message = e instanceof Error ? e.message : "خطأ غير معروف";
    return NextResponse.json(
      { error: "تعذر الاتصال بـ Gemini حاليًا.", detail: message },
      { status: 502 },
    );
  }
}
