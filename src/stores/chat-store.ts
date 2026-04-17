"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
};

type ChatState = {
  messages: ChatMessage[];
  appendUser: (text: string) => void;
  appendAssistant: (text: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
  clear: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      appendUser: (text) =>
        set((s) => ({
          messages: [
            ...s.messages,
            { id: crypto.randomUUID(), role: "user", content: text, createdAt: Date.now() },
          ],
        })),
      appendAssistant: (text) =>
        set((s) => ({
          messages: [
            ...s.messages,
            { id: crypto.randomUUID(), role: "assistant", content: text, createdAt: Date.now() },
          ],
        })),
      setMessages: (messages) => set({ messages }),
      clear: () => set({ messages: [] }),
    }),
    { name: "lahlooba-chat" },
  ),
);
