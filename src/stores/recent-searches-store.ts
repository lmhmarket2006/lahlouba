"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX = 8;

type Recent = {
  items: string[];
  push: (q: string) => void;
  clear: () => void;
};

export const useRecentSearchesStore = create<Recent>()(
  persist(
    (set) => ({
      items: [],
      push: (q) => {
        const t = q.trim();
        if (!t) return;
        set((s) => ({
          items: [t, ...s.items.filter((x) => x !== t)].slice(0, MAX),
        }));
      },
      clear: () => set({ items: [] }),
    }),
    { name: "lahlooba-recent-search" },
  ),
);
