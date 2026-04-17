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
  appendUser: (text: string) => string;
  appendAssistant: (id: string, text: string) => void;
  updateAssistant: (id: string, text: string) => void;
  clear: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      appendUser: (text) => {
        const id = crypto.randomUUID();
        set((s) => ({
          messages: [...s.messages, { id, role: "user", content: text, createdAt: Date.now() }],
        }));
        return id;
      },
      appendAssistant: (id, text) =>
        set((s) => ({
          messages: [...s.messages, { id, role: "assistant", content: text, createdAt: Date.now() }],
        })),
      updateAssistant: (id, text) =>
        set((s) => ({
          messages: s.messages.map((m) => (m.id === id ? { ...m, content: text } : m)),
        })),
      clear: () => set({ messages: [] }),
    }),
    { name: "lahlooba-chat" },
  ),
);
