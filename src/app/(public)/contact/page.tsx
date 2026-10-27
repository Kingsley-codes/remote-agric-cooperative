import type { Metadata } from "next";
import { ContactPage } from "@/components/support/contact-page";

export const metadata: Metadata = {
  title: "Contact Us | Remote Agric Cooperative",
  description: "Get in touch with the Remote Agric Cooperative team for help with membership, contributions, and more.",
};

export default function Contact() {
  return <ContactPage />;
}
