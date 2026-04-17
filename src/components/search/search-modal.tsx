"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SearchPanel } from "@/components/search/search-panel";
import { useSearchUiStore } from "@/stores/search-ui-store";

export function SearchModal() {
  const open = useSearchUiStore((s) => s.open);
  const setOpen = useSearchUiStore((s) => s.setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[min(94vw,720px)] gap-3 p-5">
        <DialogHeader>
          <DialogTitle>بحث</DialogTitle>
        </DialogHeader>
        <SearchPanel autoFocus onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
