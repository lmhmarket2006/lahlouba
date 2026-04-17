import type { Metadata } from "next";
import { HomeView } from "@/components/home/home-view";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_TAGLINE,
};

export default function HomePage() {
  return <HomeView />;
}
