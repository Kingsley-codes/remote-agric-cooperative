import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { Principles } from "@/components/about/principles";
import { OurStory } from "@/components/about/our-story";
import { OurImpact } from "@/components/about/our-impact";

export const metadata: Metadata = {
  title: "About Us | Remote Agric Cooperative",
  description:
    "Discover our mission, our story, and the community helping remote farmers save, grow, and build a stronger agricultural future together.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Principles />
      <OurStory />
      <OurImpact />
    </>
  );
}
