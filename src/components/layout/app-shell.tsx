import { RadioAudioEngine } from "@/components/radio/radio-audio-engine";
import { RadioMiniPlayer } from "@/components/radio/radio-mini-player";
import { SearchModal } from "@/components/search/search-modal";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 pb-40 md:pb-28">{children}</main>
      <SiteFooter />
      <MobileBottomNav />
      <RadioMiniPlayer />
      <RadioAudioEngine />
      <SearchModal />
    </>
  );
}
