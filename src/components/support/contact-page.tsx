"use client";

import { useState } from "react";
import { button, Icon } from "@/components/public/site-ui";
import { SupportBadge, SupportCta, supportDetails, SupportHero } from "./support-ui";

const inputClass = "min-h-13 w-full min-w-0 rounded-lg border border-foreground/15 bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted/75 focus:border-brand-content focus:outline-2 focus:outline-offset-2 focus:outline-gold";
const cardClass = "flex min-w-0 items-start gap-4 rounded-xl border border-foreground/10 bg-surface p-5";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [chatNotice, setChatNotice] = useState(false);

  return (
    <>
      <SupportHero page="contact" />
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-9 sm:px-8 lg:grid-cols-[1.05fr_1fr] xl:px-12">
        <section id="contact-form" aria-labelledby="message-title" className="scroll-mt-6 rounded-2xl border border-foreground/5 bg-surface p-5 sm:p-7">
          <h2 id="message-title" className="font-display text-3xl font-semibold tracking-tight">Send Us a Message</h2>
          <p className="mt-2 text-lg leading-relaxed text-muted">Fill out the form below and we’ll get back to you as soon as possible.</p>
          <form className="mt-6 grid gap-5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} onInput={() => setSubmitted(false)}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div><label htmlFor="contact-name" className="mb-2 block text-base text-muted">Full Name <span className="text-red-700">*</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="Enter your full name" required className={inputClass} /></div>
              <div><label htmlFor="contact-email" className="mb-2 block text-base text-muted">Email Address <span className="text-red-700">*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" required className={inputClass} /></div>
              <div><label htmlFor="contact-subject" className="mb-2 block text-base text-muted">Subject <span className="text-red-700">*</span></label><select id="contact-subject" name="subject" required defaultValue="" className={inputClass}><option value="" disabled>Select a subject</option><option>Membership &amp; Eligibility</option><option>Contributions &amp; Savings</option><option>Loans</option><option>Withdrawals &amp; Payments</option><option>Account Support</option><option>General Enquiry</option></select></div>
              <div><label htmlFor="contact-phone" className="mb-2 block text-base text-muted">Phone Number (Optional)</label><div className="flex min-h-13 items-center gap-2 rounded-lg border border-foreground/15 bg-surface px-3 focus-within:border-brand-content focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gold"><span className="h-4 w-6 shrink-0 rounded-xs bg-[linear-gradient(90deg,#00864e_33%,white_33%,white_66%,#00864e_66%)]" role="img" aria-label="Nigeria" /><span className="text-base text-muted">+234</span><input id="contact-phone" name="phone" type="tel" autoComplete="tel-national" placeholder="Your phone number" className="min-h-13 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted/75" /></div></div>
            </div>
            <div><label htmlFor="contact-message" className="mb-2 block text-base text-muted">Message <span className="text-red-700">*</span></label><textarea id="contact-message" name="message" placeholder="Type your message here…" rows={6} required className={`${inputClass} resize-y`} /></div>
            <button type="submit" className={`${button} w-full gap-5 bg-brand text-white hover:bg-brand-hover sm:w-fit`}>Send Message <Icon name="arrow" className="size-5" /></button>
            {submitted && <p role="status" className="rounded-lg border border-foreground/10 bg-soft p-4 text-base leading-relaxed">This form is a preview. Your message has not been sent or saved yet.</p>}
          </form>
        </section>

        <section aria-labelledby="reach-title" className="min-w-0">
          <h2 id="reach-title" className="font-display text-3xl font-semibold tracking-tight">Other Ways to Reach Us</h2>
          <p className="mt-2 text-lg leading-relaxed text-muted">You can also contact us through the following channels:</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className={cardClass}><SupportBadge name="mail" /><div className="min-w-0"><h3 className="font-display text-xl font-semibold">Email Us</h3><a href={`mailto:${supportDetails.email}`} className="mt-1 block break-all text-base text-muted hover:text-brand-content hover:underline">{supportDetails.email}</a><p className="mt-2 text-base leading-relaxed text-muted">We typically respond within 24 hours.</p></div></div>
            <div className={cardClass}><SupportBadge name="phone" /><div><h3 className="font-display text-xl font-semibold">Call Us</h3><a href={supportDetails.phoneHref} className="mt-1 block text-base text-muted hover:text-brand-content hover:underline">{supportDetails.phone}</a><p className="mt-2 text-base leading-relaxed text-muted">{supportDetails.hours}</p></div></div>
            <div className={cardClass}><SupportBadge name="chat" /><div><h3 className="font-display text-xl font-semibold">Live Chat</h3><button type="button" onClick={() => setChatNotice(true)} className="mt-1 min-h-11 cursor-pointer text-left text-base text-muted hover:text-brand-content hover:underline">Chat with our team on the website</button><p className="text-base leading-relaxed text-muted">{supportDetails.hours}</p>{chatNotice && <p role="status" className="mt-3 text-base leading-relaxed">Live chat is coming soon. <a href="#contact-form" className="text-brand-content underline underline-offset-4">Leave us a message</a>.</p>}</div></div>
            <div className={cardClass}><SupportBadge name="pin" /><div><h3 className="font-display text-xl font-semibold">Visit Us</h3><address className="mt-1 text-base leading-relaxed text-muted not-italic">Remote Agric Cooperative<br />{supportDetails.address}</address></div></div>
          </div>
          <div className="relative mt-5 overflow-hidden rounded-xl border border-foreground/10 bg-soft">
            <iframe title="Map of Ibadan, Oyo State, Nigeria" src="https://maps.google.com/maps?q=Ibadan%2C%20Oyo%20State%2C%20Nigeria&z=12&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-64 w-full border-0" />
            <div className="relative m-4 mt-0 flex items-start gap-3 rounded-xl bg-surface p-5 sm:absolute sm:top-4 sm:right-4 sm:bottom-4 sm:m-0 sm:w-60 lg:relative lg:inset-auto lg:m-4 lg:mt-0 lg:w-auto 2xl:absolute 2xl:top-4 2xl:right-4 2xl:bottom-4 2xl:m-0 2xl:w-60"><span className="text-brand-content"><Icon name="target" className="size-6" /></span><div><h3 className="font-display text-xl font-semibold">Our Location</h3><p className="mt-2 text-base leading-relaxed text-muted">Ibadan, Oyo State,<br />Nigeria.</p><a href={supportDetails.mapHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-base font-medium text-brand-content hover:underline">Open in Google Maps <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div></div>
          </div>
        </section>
      </div>
      <SupportCta contact />
    </>
  );
}
