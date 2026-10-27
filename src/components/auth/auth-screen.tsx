"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { FormEvent, InputHTMLAttributes, ReactNode } from "react";
import { Brand, Icon, type IconName } from "@/components/public/site-ui";

function FieldIcon({ name }: { name: IconName | "mail" | "link" | "phone" }) {
  if (name !== "mail" && name !== "link" && name !== "phone") return <Icon name={name} className="auth-icon" />;
  return (
    <svg className="auth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === "mail" ? <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></> : name === "link" ? <><path d="m10 13 4-4m-6 2-3 3a4 4 0 0 0 6 6l3-3m-4-10 3-3a4 4 0 0 1 6 6l-3 3" /></> : <path d="m7 3 3 5-3 3a15 15 0 0 0 6 6l3-3 5 3c0 3-2 5-5 4A23 23 0 0 1 3 8C2 5 4 3 7 3Z" />}
    </svg>
  );
}

function Field({ label, icon, id, required, type = "text", hint, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; icon: Parameters<typeof FieldIcon>[0]["name"]; id: string; hint?: string }) {
  const [visible, setVisible] = useState(false);
  const password = type === "password";
  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}{required && <span className="auth-required"> *</span>}</label>
      <div className="auth-input-wrap">
        <FieldIcon name={icon} />
        <input {...props} id={id} name={props.name ?? id} required={required} type={password && visible ? "text" : type} aria-describedby={hint ? `${id}-hint` : undefined} />
        {password && <button className="auth-eye" type="button" onClick={() => setVisible(!visible)} aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`} aria-pressed={visible}>
          <Icon name="eye" className="auth-icon" />{!visible && <span className="auth-eye-slash" />}
        </button>}
      </div>
      {hint && <p id={`${id}-hint`} className="auth-hint">{hint}</p>}
    </div>
  );
}

const benefits: { title: string; description: string; icon: IconName }[] = [
  { title: "Save", description: "Contribute for short-term and long-term goals.", icon: "coins" },
  { title: "Grow", description: "Earn returns through pooled agricultural investments.", icon: "chart" },
  { title: "Access Financing", description: "Get loans backed by your agricultural investment.", icon: "loan" },
  { title: "Build Together", description: "Be part of a community of forward-thinking e-farmers.", icon: "people" },
];

export function AuthScreen({ mode }: { mode: "login" | "signup" }) {
  const signup = mode === "signup";
  const [notice, setNotice] = useState("");
  const [dialogContent, setDialogContent] = useState<{ title: string; body: ReactNode } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [recoveryNotice, setRecoveryNotice] = useState("");

  function openInfo(title: string, body: ReactNode) {
    setRecoveryNotice("");
    setDialogContent({ title, body });
    dialog.current?.showModal();
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(signup ? "This is a preview. Account creation is not connected yet, and your details have not been saved." : "This is a preview. Sign in is not connected yet, and your details have not been sent.");
  }

  return (
    <div className={`auth-shell ${signup ? "auth-signup" : "auth-login"}`}>
      <a href="#auth-form" className="auth-skip">Skip to form</a>
      <aside className="auth-story" aria-label="About Remote Agric Cooperative">
        <Image src={signup ? "/images/signup-farmer.png" : "/images/login-farmer.webp"} alt="" fill priority sizes="(max-width: 1023px) 100vw, 55vw" className="auth-photo" />
        <div className="auth-photo-wash" />
        <div className="auth-story-content">
          <div className="auth-brand"><Brand /></div>
          <div className="auth-intro">
            <p className="auth-eyebrow">{signup ? "JOIN OUR COMMUNITY" : "SAVE · GROW · ACCESS · BUILD TOGETHER"}</p>
            <h2>{signup ? <>Grow More{" "}<br /><span>Together</span></> : <>Your{" "}<br />Financial Partner{" "}<br />in <span>Agriculture</span></>}</h2>
            <p className="auth-description">{signup ? "Create your cooperative account and start your journey to saving, growing, and accessing financing — all backed by the power of agriculture." : "Remote Agric Cooperative helps e-farmers save, grow, access financing, and build long-term wealth together."}</p>
          </div>
          <ul className="auth-benefits">
            {benefits.map((benefit, index) => <li key={benefit.title}>
              <span className={`auth-benefit-icon ${index % 2 ? "auth-gold" : "text-brand-content"}`}><Icon name={signup && index === 0 ? "save" : benefit.icon} className="size-7" /></span>
              <div><h3>{benefit.title}</h3><p>{benefit.description}</p></div>
            </li>)}
          </ul>
          <div className="auth-story-note">
            <Icon name="sprout" className="auth-note-sprout" />
            <div>{signup ? <><p>Already have a Remote Agric account?</p><small>You’ll need an existing and active Remote Agric investment to join the cooperative.</small><Link href="/how-it-works">Learn more about eligibility <Icon name="arrow" className="size-5" /></Link></> : <p>“Empowering e-farmers today<br />for a more prosperous tomorrow.”</p>}</div>
          </div>
        </div>
      </aside>

      <section className="auth-form-side" aria-labelledby="auth-title">
        <div className="auth-card" id="auth-form" tabIndex={-1}>
          <header><h1 id="auth-title">{signup ? "Create Your Account" : "Welcome Back"}</h1><p>{signup ? "Join Remote Agric Cooperative and be part of a growing community of e-farmers." : "Sign in to your Remote Agric Cooperative account to continue your journey."}</p></header>
          {signup && <div className="auth-eligibility"><span className="auth-benefit-icon text-brand-content"><Icon name="sprout" className="size-7" /></span><div><h2>Eligibility Requirement</h2><p>You must have an existing and active Remote Agric investment to join the cooperative.</p><Link href="/how-it-works">Learn more <Icon name="arrow" className="size-4" /></Link></div></div>}

          <form onSubmit={submit} className="auth-form" onInput={(event) => {
            if (!signup) return;
            const fields = event.currentTarget.elements;
            const password = fields.namedItem("password") as HTMLInputElement;
            const confirmation = fields.namedItem("confirm-password") as HTMLInputElement;
            confirmation.setCustomValidity(confirmation.value && confirmation.value !== password.value ? "Passwords must match." : "");
          }}>
            {signup ? <>
              <div className="auth-field-row"><Field id="full-name" label="Full Name" icon="user" placeholder="Enter your full name" autoComplete="name" required /><Field id="email" label="Email Address" icon="mail" type="email" placeholder="Enter your email address" autoComplete="email" required /></div>
              <div className="auth-field"><label htmlFor="phone">Phone Number<span className="auth-required"> *</span></label><div className="auth-input-wrap auth-phone"><FieldIcon name="phone" /><span className="auth-country"><span aria-label="Nigeria" className="auth-flag" />+234</span><input id="phone" name="phone" type="tel" autoComplete="tel-national" placeholder="Enter your phone number" required /></div></div>
              <Field id="remote-agric-email" label="Remote Agric Account Email" icon="link" type="email" placeholder="Enter the email you use for your Remote Agric account" autoComplete="off" required hint="We will verify your Remote Agric account to confirm your eligibility." />
              <div className="auth-field-row"><Field id="password" label="Password" icon="lock" type="password" placeholder="Create a password" autoComplete="new-password" minLength={8} required /><Field id="confirm-password" label="Confirm Password" icon="lock" type="password" placeholder="Confirm your password" autoComplete="new-password" minLength={8} required /></div>
              <label className="auth-consent"><input type="checkbox" name="terms" required /><span>I agree to the <button type="button" onClick={() => openInfo("Terms of Service", "The cooperative’s Terms of Service will be available before registration opens. Account creation is currently a static preview.")}>Terms of Service</button> and <button type="button" onClick={() => openInfo("Privacy Policy", "The cooperative’s Privacy Policy will be available before registration opens. This preview does not save or send your form details.")}>Privacy Policy</button></span></label>
            </> : <>
              <Field id="email" label="Email Address" icon="mail" type="email" placeholder="Enter your email address" autoComplete="email" required />
              <Field id="password" label="Password" icon="lock" type="password" placeholder="Enter your password" autoComplete="current-password" required />
              <button type="button" className="auth-forgot" onClick={() => openInfo("Forgot your password?", <form className="auth-recovery" onSubmit={(event) => { event.preventDefault(); setRecoveryNotice("Password reset is not connected yet. No reset email has been sent."); }}><p>Enter the email address associated with your cooperative account.</p><Field id="recovery-email" label="Email Address" icon="mail" type="email" placeholder="Enter your email address" autoComplete="email" required /><button className="auth-primary" type="submit">Send reset link <Icon name="arrow" className="size-5" /></button></form>)}>Forgot password?</button>
            </>}
            <button type="submit" className="auth-primary">{signup ? "Create Account" : "Sign In"}<Icon name="arrow" className="size-5" /></button>
            {notice && <p className="auth-notice" role="status">{notice}</p>}
          </form>

          {!signup && <div className="auth-alternative"><div className="auth-divider"><span />OR<span /></div><button type="button" className="auth-remote" onClick={() => setNotice("Remote Agric sign in is not connected yet. This page is a static preview.")}><Image src="/logo.png" alt="" width={22} height={30} />Continue with Remote Agric</button><p>Sign in using your existing Remote Agric account.</p></div>}
          <p className="auth-switch">{signup ? "Already have a cooperative account?" : "Don’t have a cooperative account yet?"}<Link href={signup ? "/login" : "/signup"}>{signup ? "Sign In" : "Join Now"}<Icon name="arrow" className="size-5" /></Link></p>
        </div>
      </section>

      <dialog ref={dialog} className="auth-dialog" aria-labelledby="auth-dialog-title" onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}>
        <button type="button" className="auth-dialog-close" aria-label="Close dialog" onClick={() => dialog.current?.close()}><Icon name="close" className="size-6" /></button><h2 id="auth-dialog-title">{dialogContent?.title}</h2><div>{dialogContent?.body}</div>{recoveryNotice && <p className="auth-notice" role="status">{recoveryNotice}</p>}
      </dialog>
    </div>
  );
}

