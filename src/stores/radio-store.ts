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
  queue: RadioStation[];
  queueIndex: number;
  playError: string | null;
  setCurrent: (s: RadioStation | null) => void;
  playStationInQueue: (stations: RadioStation[], index: number) => void;
  setPlaying: (v: boolean) => void;
  setVolume: (v: number) => void;
  toggleFavorite: (uuid: string) => void;
  isFavorite: (uuid: string) => boolean;
  next: () => void;
  prev: () => void;
  clearError: () => void;
};

export const useRadioStore = create<RadioState>()(
  persist(
    (set, get) => ({
      current: null,
      isPlaying: false,
      volume: 0.85,
      favoriteUuids: [],
      lastNonEmpty: null,
      queue: [],
      queueIndex: 0,
      playError: null,
      setCurrent: (s) =>
        set(() => ({
          current: s,
          lastNonEmpty: s ?? get().lastNonEmpty,
          playError: null,
        })),
      playStationInQueue: (stations, index) => {
        const safeIndex = Math.max(0, Math.min(index, stations.length - 1));
        const nextCurrent = stations[safeIndex] ?? null;
        set({
          queue: stations,
          queueIndex: safeIndex,
          current: nextCurrent,
          lastNonEmpty: nextCurrent ?? get().lastNonEmpty,
          isPlaying: !!nextCurrent,
          playError: null,
        });
      },
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
      next: () => {
        const { queue, queueIndex } = get();
        if (!queue.length) return;
        const idx = (queueIndex + 1) % queue.length;
        get().playStationInQueue(queue, idx);
      },
      prev: () => {
        const { queue, queueIndex } = get();
        if (!queue.length) return;
        const idx = (queueIndex - 1 + queue.length) % queue.length;
        get().playStationInQueue(queue, idx);
      },
      clearError: () => set({ playError: null }),
    }),
    { name: "lahlooba-radio" },
  ),
);
