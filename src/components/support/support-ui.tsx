import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { button, Icon } from "@/components/public/site-ui";

export type SupportIconName = "mail" | "phone" | "chat" | "pin" | "headset" | "question";

export function SupportIcon({ name, className = "size-6" }: { name: SupportIconName; className?: string }) {
  const paths: Record<SupportIconName, ReactNode> = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    phone: <path d="m7 3 3 5-3 3a15 15 0 0 0 6 6l3-3 5 3c0 3-2 5-5 4A23 23 0 0 1 3 8C2 5 4 3 7 3Z" />,
    chat: <><path d="M21 11a8 8 0 0 1-8 8H8l-5 3V7a4 4 0 0 1 4-4h6a8 8 0 0 1 8 8Z" /><path d="M7 9h10M7 13h6" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    headset: <><path d="M3 15v-3a9 9 0 0 1 18 0v6a4 4 0 0 1-4 4h-3" /><rect x="2" y="11" width="4" height="8" rx="2" /><rect x="18" y="11" width="4" height="8" rx="2" /><path d="M12 22h3" /></>,
    question: <><path d="M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 4m0 3h.01" /><circle cx="12" cy="12" r="10" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>{paths[name]}</svg>;
}

export function SupportBadge({ name, large = false }: { name: SupportIconName; large?: boolean }) {
  return <span className={`flex shrink-0 items-center justify-center rounded-full bg-soft text-brand-content ${large ? "size-18" : "size-12"}`}><SupportIcon name={name} className={large ? "size-10" : "size-6"} /></span>;
}

// Contact values reproduce the supplied design and should be confirmed before launch.
export const supportDetails = {
  email: "support@remoteagric.coop",
  phone: "+234 812 345 6789",
  phoneHref: "tel:+2348123456789",
  hours: "Mon – Fri, 8:00 AM – 6:00 PM (WAT)",
  address: "123 Cooperative Way, Ibadan, Oyo State, Nigeria.",
  mapHref: "https://www.google.com/maps/search/?api=1&query=Ibadan%2C%20Oyo%20State%2C%20Nigeria",
};

export function SupportHero({ page }: { page: "contact" | "faq" }) {
  const contact = page === "contact";
  return (
    <section aria-labelledby="support-title" className="border-b border-foreground/5">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 pt-10 pb-8 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-7 lg:py-0 xl:px-12">
        <div className="lg:py-12">
          <p className="mb-4 text-base font-semibold tracking-[0.25em] text-brand-content">{contact ? "CONTACT US" : "FAQS"}</p>
          <h1 id="support-title" className="max-w-[650px] font-display text-[clamp(2.6rem,4.15vw,4rem)] leading-[1.12] font-semibold tracking-[-0.045em]">{contact ? <>We’d Love to<br />Hear from <span className="text-gold">You</span></> : <>Frequently Asked<br />Questions</>}</h1>
          <p className="mt-5 max-w-[650px] text-lg leading-relaxed text-muted xl:text-xl">{contact ? "Have a question, need assistance, or want to learn more about Remote Agric Cooperative? Our team is here to help." : "Find answers to common questions about Remote Agric Cooperative, our services, membership, contributions, loans and more."}</p>
        </div>
        <div className="grid items-center gap-5 sm:grid-cols-[minmax(0,1fr)_220px] lg:self-stretch lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-0">
          <div className="relative h-72 overflow-hidden rounded-2xl rounded-tl-[100px] sm:h-80 lg:h-full lg:min-h-80 xl:-mr-4 xl:rounded-r-none">
            <Image src="/images/signup-farmer.png" alt="Smiling woman farmer holding a tablet in a green field" fill priority sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 30vw" className="object-cover object-[78%_55%]" />
          </div>
          <div className="relative rounded-2xl border border-foreground/5 bg-surface p-5 shadow-[0_6px_24px_#092d2908] lg:mb-6 xl:my-8">
            <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-soft text-brand-content">{contact ? <Icon name="people" className="size-7" /> : <SupportIcon name="question" className="size-7" />}</span>
            <h2 className="font-display text-xl leading-snug font-semibold">{contact ? "Support for Farmers, by People Who Care" : "Still have a question?"}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">{contact ? "We’re committed to providing timely and helpful support to all our members." : "We’re here to help. Reach out to our support team."}</p>
            {!contact && <Link href="/contact" className={`${button} mt-4 w-full gap-3 bg-gold text-[#15291d] hover:bg-[#c99a43]`}>Contact Us <Icon name="arrow" className="size-5" /></Link>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SupportCta({ contact = false }: { contact?: boolean }) {
  return (
    <section className={contact ? "bg-soft/70" : "bg-brand text-white"}>
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-7 px-5 py-9 sm:px-8 lg:flex-row lg:items-center xl:px-12">
        <div className="flex items-center gap-6">
          <span className={`hidden size-20 shrink-0 items-center justify-center rounded-full sm:flex ${contact ? "bg-surface" : "bg-white/5"}`}><Icon name="sprout" className="size-12 text-gold" /></span>
          <div>{contact && <p className="mb-2 text-base font-semibold tracking-[.2em]">STILL HAVE QUESTIONS?</p>}<h2 className="font-display text-3xl leading-tight font-semibold">{contact ? "Visit our FAQ or talk to our support team." : "Still have questions?"}</h2><p className={`mt-2 text-lg leading-relaxed ${contact ? "text-muted" : "text-white/80"}`}>{contact ? "Explore common questions or get in touch with us directly." : "We’re here to help you on your cooperative journey."}</p></div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          {contact && <Link href="/faq" className={`${button} border border-brand-content text-brand-content hover:bg-surface`}>View FAQs</Link>}
          <Link href={contact ? "#contact-form" : "/contact"} className={`${button} gap-4 bg-gold text-[#15291d] hover:bg-[#c99a43]`}>{contact ? "Contact Support" : "Contact Us"}<Icon name="arrow" className="size-5" /></Link>
        </div>
      </div>
    </section>
  );
}
