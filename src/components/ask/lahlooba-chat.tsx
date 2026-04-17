"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, RefreshCw, Send, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QUICK_AI_PROMPTS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat-store";

type Status = "idle" | "loading" | "error";

async function callGemini(messages: { role: "user" | "assistant"; content: string }[]) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = (await res.json()) as { text?: string; error?: string };
  if (!res.ok) {
    throw new Error(data.error || "تعذر إكمال الطلب.");
  }
  return (data.text || "").trim();
}

export function LahloobaChat() {
  const messages = useChatStore((s) => s.messages);
  const appendUser = useChatStore((s) => s.appendUser);
  const appendAssistant = useChatStore((s) => s.appendAssistant);
  const setMessages = useChatStore((s) => s.setMessages);
  const clear = useChatStore((s) => s.clear);

  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState<string | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && status !== "loading", [input, status]);

  const runModel = async (history: { role: "user" | "assistant"; content: string }[]) => {
    const text = await callGemini(history);
    if (!text) {
      throw new Error("لم يصل رد من المساعد. جرّبي مرة أخرى.");
    }
    appendAssistant(text);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || status === "loading") return;

    setInput("");
    setErrorText(null);
    setStatus("loading");
    appendUser(trimmed);

    try {
      const next = useChatStore.getState().messages.map((m) => ({ role: m.role, content: m.content }));
      await runModel(next);
      setStatus("idle");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ غير متوقع.";
      setErrorText(msg);
      setStatus("error");
    }
  };

  const onRegen = async () => {
    if (status === "loading") return;
    const msgs = [...useChatStore.getState().messages];
    if (!msgs.length) return;
    if (msgs[msgs.length - 1]?.role === "assistant") {
      msgs.pop();
    }
    const lastUser = [...msgs].reverse().find((m) => m.role === "user");
    if (!lastUser) return;

    setMessages(msgs);
    setErrorText(null);
    setStatus("loading");

    try {
      const payload = msgs.map((m) => ({ role: m.role, content: m.content }));
      await runModel(payload);
      setStatus("idle");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ غير متوقع.";
      setErrorText(msg);
      setStatus("error");
    }
  };

  const empty = messages.length === 0;

  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">مساعدتكِ اليومية</p>
          <h1 className="text-2xl font-semibold text-plum md:text-3xl">اسألي {SITE_NAME}</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            اقتراحات عملية للطبخ، العناية، التنظيم، والمزاج — بأسلوب دافئ وبسيط.
          </p>
        </div>
        <Button variant="outline" className="rounded-full" type="button" onClick={() => clear()}>
          مسح المحادثة
        </Button>
      </div>

      <Card className="border-border/70 bg-card/80 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-wrap gap-2">
          {QUICK_AI_PROMPTS.map((p) => (
            <Button
              key={p.id}
              type="button"
              variant="secondary"
              className="h-9 rounded-full px-3 text-xs"
              onClick={() => setInput(p.prompt)}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {p.label}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="min-h-[420px] border-border/70 bg-gradient-to-b from-card to-beige/30 p-4 shadow-sm">
        <div className="flex h-[420px] flex-col gap-3">
          <div className="flex-1 space-y-3 overflow-y-auto pe-1">
            <AnimatePresence initial={false}>
              {empty ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-3xl bg-rose-soft text-plum shadow-inner">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-plum">مرحبًا! أنا {SITE_NAME}</p>
                  <p className="max-w-md text-sm text-muted-foreground">
                    اكتبي سؤالكِ أو اختاري اقتراحًا سريعًا أعلاه. سأبقى بجانبكِ بخطوات واضحة وبلا تعقيد.
                  </p>
                </motion.div>
              ) : (
                messages.map((m) => (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex", m.role === "user" ? "justify-start" : "justify-end")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                        m.role === "user" ? "bg-muted text-foreground" : "bg-rose-soft text-plum",
                      )}
                    >
                      <p className="whitespace-pre-wrap">{m.content}</p>

                      {m.role === "assistant" ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-8 rounded-full px-3 text-xs"
                            onClick={async () => {
                              await navigator.clipboard.writeText(m.content);
                            }}
                          >
                            <Copy className="h-3.5 w-3.5" />
                            نسخ
                          </Button>
                          <Button type="button" size="sm" variant="outline" className="h-8 rounded-full px-3 text-xs" onClick={onRegen}>
                            <RefreshCw className="h-3.5 w-3.5" />
                            إعادة توليد
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {status === "loading" ? (
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-3xl bg-rose-soft px-4 py-3 text-sm text-muted-foreground shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-plum/60" />
                    <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-plum/40 [animation-delay:120ms]" />
                    <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-plum/30 [animation-delay:240ms]" />
                    <span className="text-xs text-plum/80">{SITE_NAME} تكتب…</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {status === "error" && errorText ? (
            <div className="rounded-2xl border border-border bg-card px-3 py-2 text-xs text-plum">{errorText}</div>
          ) : null}

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border/60 pt-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتبي بحرية…"
              className="flex-1"
              disabled={status === "loading"}
            />
            <Button type="submit" className="rounded-full px-4" disabled={!canSend}>
              <Send className="h-4 w-4" />
              إرسال
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
