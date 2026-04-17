"use client";

import { create } from "zustand";

type SearchUi = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export const useSearchUiStore = create<SearchUi>((set) => ({
  open: false,
  setOpen: (v) => set({ open: v }),
}));
