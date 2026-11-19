"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiUrl, authRequest } from "@/lib/api-client";
import { Brand, Icon } from "@/components/public/site-ui";
import {
  Field,
  FieldIcon,
  PasswordRecovery,
  benefits,
} from "@/components/auth/auth-fields";

export default function LoginPage() {
  const signup: boolean = false;
  const router = useRouter();
  const query = useSearchParams();
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const initialNotice = query.has("error")
    ? "Google sign in could not be completed. Try again, or sign in with your password."
    : query.has("verified")
      ? "Your email is verified. Sign in to continue."
      : "";
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    body: ReactNode;
  } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  function openInfo(title: string, body: ReactNode) {
    setDialogContent({ title, body });
    dialog.current?.showModal();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const values = new FormData(event.currentTarget);
    setBusy(true);
    setNotice("");
    try {
      if (verificationEmail) {
        await authRequest("verify-email", {
          email: verificationEmail,
          otp: values.get("otp"),
        });
        router.push("/login?verified=1");
        return;
      }
      const email = String(values.get("email")).trim().toLowerCase();
      const password = String(values.get("password"));
      if (signup) {
        const name = String(values.get("full-name")).trim().split(/\s+/);
        if (name.length < 2) throw new Error("Enter your first and last name.");
        let phone = String(values.get("phone")).replace(/[\s().-]/g, "");
        if (phone.startsWith("0")) phone = "+234" + phone.slice(1);
        else if (/^234/.test(phone)) phone = "+" + phone;
        else if (!phone.startsWith("+")) phone = "+234" + phone;
        await authRequest("signup", {
          firstName: name.shift(),
          lastName: name.join(" "),
          email,
          phone,
          password,
          confirmPassword: values.get("confirm-password"),
          acceptTerms: acceptedTerms,
        });
        setVerificationEmail(email);
        setNotice(
          "We sent a six-digit verification code to your email. Enter it below to finish creating your account.",
        );
      } else {
        const data = await authRequest("login", { email, password });
        router.push(
          data.user?.membershipStatus === "active"
            ? "/dashboard"
            : "/onboarding",
        );
        router.refresh();
      }
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "Unable to continue. Try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`auth-shell ${signup ? "auth-signup" : "auth-login"}`}>
      <a href="#auth-form" className="auth-skip">
        Skip to form
      </a>
      <aside className="auth-story" aria-label="About Remote Agric Cooperative">
        <Image
          src={
            signup ? "/images/signup-farmer.png" : "/images/login-farmer.webp"
          }
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 55vw"
          className="auth-photo"
        />
        <div className="auth-photo-wash" />
        <div className="auth-story-content">
          <div className="auth-brand">
            <Brand />
          </div>
          <div className="auth-intro">
            <p className="auth-eyebrow">
              {signup
                ? "JOIN OUR COMMUNITY"
                : "SAVE · GROW · ACCESS · BUILD TOGETHER"}
            </p>
            <h2>
              {signup ? (
                <>
                  Grow More <br />
                  <span>Together</span>
                </>
              ) : (
                <>
                  Your <br />
                  Financial Partner <br />
                  in <span>Agriculture</span>
                </>
              )}
            </h2>
            <p className="auth-description">
              {signup
                ? "Create your cooperative account and start your journey to saving, growing, and accessing financing — all backed by the power of agriculture."
                : "Remote Agric Cooperative helps remote farmers save, grow, access financing, and build long-term wealth together."}
            </p>
          </div>
          <ul className="auth-benefits">
            {benefits.map((benefit, index) => (
              <li key={benefit.title}>
                <span
                  className={`auth-benefit-icon ${index % 2 ? "auth-gold" : "text-brand-content"}`}
                >
                  <Icon
                    name={signup && index === 0 ? "save" : benefit.icon}
                    className="size-7"
                  />
                </span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="auth-story-note">
            <Icon name="sprout" className="auth-note-sprout" />
            <div>
              {signup ? (
                <>
                  <p>Everyone is welcome</p>
                  <small>
                    Create an account here to join our community. Your account
                    also gets you started on Remote Agric.
                  </small>
                  <Link href="/how-it-works">
                    Learn how it works <Icon name="arrow" className="size-5" />
                  </Link>
                </>
              ) : (
                <p>
                  “Empowering remote farmers today
                  <br />
                  for a more prosperous tomorrow.”
                </p>
              )}
            </div>
          </div>
        </div>
      </aside>

      <section className="auth-form-side" aria-labelledby="auth-title">
        <div className="auth-card" id="auth-form" tabIndex={-1}>
          <header>
            <h1 id="auth-title">
              {signup ? "Create Your Account" : "Welcome Back"}
            </h1>
            <p>
              {signup
                ? "Join Remote Agric Cooperative and be part of a growing community of remote farmers."
                : "Sign in to your Remote Agric Cooperative account to continue your journey."}
            </p>
          </header>

          <form
            onSubmit={submit}
            className="auth-form"
            onInput={(event) => {
              if (!signup || verificationEmail) return;
              const fields = event.currentTarget.elements;
              const password = fields.namedItem("password") as HTMLInputElement;
              const confirmation = fields.namedItem(
                "confirm-password",
              ) as HTMLInputElement;
              confirmation.setCustomValidity(
                confirmation.value && confirmation.value !== password.value
                  ? "Passwords must match."
                  : "",
              );
            }}
          >
            {verificationEmail ? (
              <>
                <p>Verify {verificationEmail}</p>
                <Field
                  id="otp"
                  label="Verification Code"
                  icon="mail"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  minLength={6}
                  maxLength={6}
                  required
                />
                <button
                  type="button"
                  className="auth-forgot"
                  onClick={() => {
                    setVerificationEmail("");
                    setNotice("");
                  }}
                >
                  Change details or request a new code
                </button>
              </>
            ) : signup ? (
              <>
                <div className="auth-field-row">
                  <Field
                    id="full-name"
                    label="Full Name"
                    icon="user"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                  <Field
                    id="email"
                    label="Email Address"
                    icon="mail"
                    type="email"
                    placeholder="Enter your email address"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="auth-field">
                  <label htmlFor="phone">
                    Phone Number<span className="auth-required"> *</span>
                  </label>
                  <div className="auth-input-wrap auth-phone">
                    <FieldIcon name="phone" />
                    <span className="auth-country">
                      <span aria-label="Nigeria" className="auth-flag" />
                      +234
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel-national"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                <div className="auth-field-row">
                  <Field
                    id="password"
                    label="Password"
                    icon="lock"
                    type="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={72}
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,72}"
                    hint="Use 8-72 characters, including uppercase, lowercase, a number, and a symbol."
                    required
                  />
                  <Field
                    id="confirm-password"
                    label="Confirm Password"
                    icon="lock"
                    type="password"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                </div>
                <label className="auth-consent">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    required
                  />
                  <span>
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() =>
                        openInfo(
                          "Terms of Service",
                          "Registration creates an account shared with Remote Agric. Financial services have separate eligibility requirements and terms. Full cooperative membership and financial-service terms are pending publication.",
                        )
                      }
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={() =>
                        openInfo(
                          "Privacy Policy",
                          "Your name, email, phone number and securely hashed password are processed by Remote Agric to create and secure your account. Google sign in shares your basic profile and verified email. The full cooperative Privacy Policy is pending publication.",
                        )
                      }
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>
              </>
            ) : (
              <>
                <Field
                  id="email"
                  label="Email Address"
                  icon="mail"
                  type="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                />
                <Field
                  id="password"
                  label="Password"
                  icon="lock"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="auth-forgot"
                  onClick={() =>
                    openInfo("Forgot your password?", <PasswordRecovery />)
                  }
                >
                  Forgot password?
                </button>
              </>
            )}
            <button type="submit" className="auth-primary" disabled={busy}>
              {busy
                ? "Please wait…"
                : verificationEmail
                  ? "Verify Email"
                  : signup
                    ? "Create Account"
                    : "Sign In"}
              <Icon name="arrow" className="size-5" />
            </button>
            {(notice || initialNotice) && (
              <p className="auth-notice" role="status">
                {notice || initialNotice}
              </p>
            )}
          </form>

          {!verificationEmail && (
            <div className="auth-alternative">
              <div className="auth-divider">
                <span />
                OR
                <span />
              </div>
              {/* OAuth needs a full document navigation to a redirecting API route. */}
              <a
                href={apiUrl("/auth/google")}
                className="auth-remote"
                aria-disabled={busy}
                onClick={(event) => {
                  if (busy) {
                    event.preventDefault();
                    return;
                  }
                  if (signup && !acceptedTerms) {
                    event.preventDefault();
                    setNotice(
                      "Please review and accept the terms and privacy information before continuing with Google.",
                    );
                  }
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 22c2.7 0 4.96-.9 6.61-2.41l-3.24-2.51c-.9.6-2.06.97-3.37.97-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.41 13.93a6 6 0 0 1 0-3.86V7.48H3.07a10 10 0 0 0 0 9.04l3.34-2.59Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.95c1.47 0 2.79.51 3.82 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.48l3.34 2.59C7.2 7.71 9.4 5.95 12 5.95Z"
                  />
                </svg>
                {signup ? "Sign up with Google" : "Sign in with Google"}
              </a>
              <p>
                {signup
                  ? "Your account also gets you started on Remote Agric."
                  : "Use your Google account to continue."}
              </p>
            </div>
          )}
          <p className="auth-switch">
            {signup
              ? "Already have a cooperative account?"
              : "Don’t have a cooperative account yet?"}
            <Link href={signup ? "/login" : "/signup"}>
              {signup ? "Sign In" : "Join Now"}
              <Icon name="arrow" className="size-5" />
            </Link>
          </p>
        </div>
      </section>

      <dialog
        ref={dialog}
        className="auth-dialog"
        aria-labelledby="auth-dialog-title"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <button
          type="button"
          className="auth-dialog-close"
          aria-label="Close dialog"
          onClick={() => dialog.current?.close()}
        >
          <Icon name="close" className="size-6" />
        </button>
        <h2 id="auth-dialog-title">{dialogContent?.title}</h2>
        <div>{dialogContent?.body}</div>
      </dialog>
    </div>
  );
}
