"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RadioStation } from "@/types/radio";

type RadioState = {
  current: RadioStation | null;
  isPlaying: boolean;
  volume: number;
  favoriteUuids: string[];
  lastNonEmpty: RadioStation | null;
  setCurrent: (s: RadioStation | null) => void;
  setPlaying: (v: boolean) => void;
  setVolume: (v: number) => void;
  toggleFavorite: (uuid: string) => void;
  isFavorite: (uuid: string) => boolean;
};

export const useRadioStore = create<RadioState>()(
  persist(
    (set, get) => ({
      current: null,
      isPlaying: false,
      volume: 0.85,
      favoriteUuids: [],
      lastNonEmpty: null,
      setCurrent: (s) =>
        set(() => ({
          current: s,
          lastNonEmpty: s ?? get().lastNonEmpty,
        })),
      setPlaying: (v) => set({ isPlaying: v }),
      setVolume: (v) => set({ volume: Math.min(1, Math.max(0, v)) }),
      toggleFavorite: (uuid) =>
        set((state) => {
          const exists = state.favoriteUuids.includes(uuid);
          return {
            favoriteUuids: exists
              ? state.favoriteUuids.filter((x) => x !== uuid)
              : [...state.favoriteUuids, uuid],
          };
        }),
      isFavorite: (uuid) => get().favoriteUuids.includes(uuid),
    }),
    { name: "lahlooba-radio" },
  ),
);
