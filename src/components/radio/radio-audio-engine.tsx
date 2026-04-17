"use client";

import { useEffect, useRef } from "react";
import { useRadioStore } from "@/stores/radio-store";

export function RadioAudioEngine() {
  const ref = useRef<HTMLAudioElement>(null);
  const current = useRadioStore((s) => s.current);
  const isPlaying = useRadioStore((s) => s.isPlaying);
  const volume = useRadioStore((s) => s.volume);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.volume = volume;
  }, [volume]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!current) {
      el.pause();
      el.removeAttribute("src");
      el.load();
      return;
    }

    const src = current.url_resolved || current.url;
    try {
      if (!src) {
        useRadioStore.setState({ playError: "لا يوجد رابط تشغيل متاح لهذه المحطة." });
        return;
      }
      if (el.src !== src) {
        el.src = src;
        el.load();
      }
    } catch {
      useRadioStore.setState({ playError: "تعذر تحميل رابط التشغيل." });
    }
  }, [current]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !current) return;
    if (isPlaying) {
      void el.play().catch(() => {
        useRadioStore.setState({
          playError: "تعذر التشغيل. جرّبي محطة أخرى أو تحققي من الاتصال.",
          isPlaying: false,
        });
      });
    } else {
      el.pause();
    }
  }, [isPlaying, current]);

  return (
    <audio
      ref={ref}
      className="hidden"
      preload="none"
      onError={() => {
        useRadioStore.setState({
          playError: "حدثت مشكلة أثناء التشغيل. يمكنكِ اختيار محطة أخرى.",
          isPlaying: false,
        });
      }}
    />
  );
}
