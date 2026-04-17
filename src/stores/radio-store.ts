"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RadioStation } from "@/types/radio";

type RadioState = {
  current: RadioStation | null;
  isPlaying: boolean;
  volume: number;
  favoriteStations: RadioStation[];
  lastNonEmpty: RadioStation | null;
  queue: RadioStation[];
  queueIndex: number;
  playError: string | null;
  setCurrent: (s: RadioStation | null) => void;
  playStationInQueue: (stations: RadioStation[], index: number) => void;
  setPlaying: (v: boolean) => void;
  setVolume: (v: number) => void;
  toggleFavoriteStation: (station: RadioStation) => void;
  isFavoriteStation: (uuid: string) => boolean;
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
      favoriteStations: [],
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
      toggleFavoriteStation: (station) =>
        set((state) => {
          const exists = state.favoriteStations.some((s) => s.stationuuid === station.stationuuid);
          return {
            favoriteStations: exists
              ? state.favoriteStations.filter((s) => s.stationuuid !== station.stationuuid)
              : [...state.favoriteStations, station],
          };
        }),
      isFavoriteStation: (uuid) => get().favoriteStations.some((s) => s.stationuuid === uuid),
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
