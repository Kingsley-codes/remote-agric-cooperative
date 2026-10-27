import type { Metadata } from "next";
import { HowItWorksHero } from "@/components/how-it-works/hero";
import { GettingStarted } from "@/components/how-it-works/getting-started";
import { Services } from "@/components/how-it-works/services";
import { MemberJourney } from "@/components/how-it-works/member-journey";

export const metadata: Metadata = {
  title: "How It Works | Remote Agric Cooperative",
  description:
    "Learn how to join Remote Agric Cooperative, choose long-term contributions or flexible savings, and access eligible member loans.",
};

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero />
      <GettingStarted />
      <Services />
      <MemberJourney />
    </>
  );
}
