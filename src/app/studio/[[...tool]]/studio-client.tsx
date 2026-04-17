"use client";

import type { Config } from "sanity";
import { NextStudio } from "next-sanity/studio";

export function StudioClient({ config }: { config: Config }) {
  return <NextStudio config={config} />;
}
