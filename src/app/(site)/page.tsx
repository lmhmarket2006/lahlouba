import type { Metadata } from "next";
import { HomeView } from "@/components/home/home-view";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { getContentCatalog } from "@/lib/sanity";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_TAGLINE,
};

export default async function HomePage() {
  const content = await getContentCatalog();
  return <HomeView content={content} />;
}
