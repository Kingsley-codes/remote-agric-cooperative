"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/public/site-ui";
import { faqCategories } from "./faq-data";
import { SupportBadge, SupportCta, supportDetails, SupportHero } from "./support-ui";

export function FaqPage() {
  const [selectedId, setSelectedId] = useState(faqCategories[0].id);
  const selected = faqCategories.find((category) => category.id === selectedId)!;

  return (
    <>
      <SupportHero page="faq" />
      <div className="mx-auto grid max-w-[1440px] items-start gap-7 px-5 py-9 sm:px-8 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)_280px] xl:px-12">
        <nav aria-label="FAQ categories" className="grid gap-1 rounded-2xl border border-foreground/5 bg-surface p-2 sm:grid-cols-2 lg:grid-cols-1">
          {faqCategories.map(({ id, label, icon }) => <button key={id} type="button" aria-pressed={selectedId === id} aria-controls="faq-questions" onClick={() => setSelectedId(id)} className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-left text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${selectedId === id ? "bg-brand text-white" : "text-muted hover:bg-soft"}`}>
            <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${selectedId === id ? "bg-white/10 text-white" : "bg-soft text-brand-content"}`}><Icon name={icon} className="size-5" /></span><span className="flex-1">{label}</span><Icon name={selectedId === id ? "arrow" : "chevron"} className={`size-4 shrink-0 ${selectedId === id ? "text-[#e8c068]" : "text-muted/60"}`} />
          </button>)}
        </nav>

        <section id="faq-questions" aria-labelledby="category-title" className="min-w-0 scroll-mt-6">
          <p className="mb-2 text-base font-semibold tracking-[.2em] text-brand-content">{selected.label.toUpperCase()}</p>
          <h2 id="category-title" className="mb-5 font-display text-3xl leading-tight font-semibold tracking-tight" aria-live="polite">{selected.label}</h2>
          <div key={selected.id} className="grid gap-3">
            {selected.questions.map(({ question, answer }, index) => <details key={question} name={`faq-${selected.id}`} open={index === 0} className="group rounded-xl border border-foreground/10 bg-surface open:bg-soft/60">
              <summary className="flex min-h-17 cursor-pointer list-none items-start gap-4 rounded-xl p-4 marker:content-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/15 font-display text-xl text-foreground group-open:bg-soft group-open:text-brand-content">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="flex-1 self-center text-lg leading-snug font-semibold">{question}</h3>
                <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-2xl font-normal text-foreground group-open:bg-brand group-open:text-white"><span className="group-open:hidden">+</span><span className="hidden group-open:block">−</span></span>
              </summary>
              <p className="px-4 pb-5 text-lg leading-relaxed text-muted sm:pl-17">{answer}</p>
            </details>)}
          </div>
        </section>

        <aside aria-labelledby="faq-support-title" className="rounded-2xl bg-soft/70 p-6 lg:col-start-2 xl:col-start-auto">
          <div className="flex items-start gap-4 xl:flex-col"><SupportBadge name="headset" large /><div><h2 id="faq-support-title" className="font-display text-2xl leading-snug font-semibold">Can’t find what you’re looking for?</h2><p className="mt-3 text-lg leading-relaxed text-muted">Our support team is here to help you.</p></div></div>
          <div className="mt-6 divide-y divide-foreground/10">
            <div className="flex gap-3 py-5"><SupportBadge name="mail" /><div className="min-w-0"><h3 className="text-base font-semibold">Email us</h3><a href={`mailto:${supportDetails.email}`} className="mt-1 block break-all text-base leading-relaxed text-muted hover:text-brand-content hover:underline">{supportDetails.email}</a></div></div>
            <div className="flex gap-3 py-5"><SupportBadge name="phone" /><div><h3 className="text-base font-semibold">Call us</h3><a href={supportDetails.phoneHref} className="mt-1 block text-base text-muted hover:text-brand-content hover:underline">{supportDetails.phone}</a><p className="mt-1 text-base leading-relaxed text-muted">{supportDetails.hours}</p></div></div>
            <div className="flex gap-3 py-5"><SupportBadge name="chat" /><div><h3 className="text-base font-semibold">Live chat</h3><Link href="/contact#contact-form" className="mt-1 block min-h-11 text-base leading-relaxed text-muted hover:text-brand-content hover:underline">Get in touch with our team</Link></div></div>
            <div className="flex gap-3 pt-5"><SupportBadge name="pin" /><div><h3 className="text-base font-semibold">Visit us</h3><address className="mt-1 text-base leading-relaxed text-muted not-italic">Remote Agric Cooperative<br />{supportDetails.address}</address></div></div>
          </div>
        </aside>
      </div>
      <SupportCta />
    </>
  );
}
