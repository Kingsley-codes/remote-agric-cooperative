import type { Metadata } from "next";
import { FaqPage } from "@/components/support/faq-page";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Remote Agric Cooperative",
  description: "Find answers about Remote Agric Cooperative membership, savings, contributions, loans, withdrawals, and your account.",
};

export default function Faq() {
  return <FaqPage />;
}
