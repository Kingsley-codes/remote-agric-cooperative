"use client";
import { apiFetch } from "@/lib/api-client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Brand, Icon } from "@/components/public/site-ui";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { useAccount } from "@/lib/use-account";
import "@/components/auth/membership-onboarding.css";

export default function OnboardingPage() {
  const { account, error: accountError, retry } = useAccount("onboarding");
  const firstName = account?.firstName ?? "";
  const email = account?.email ?? "";
  const termsVersion = account?.currentTermsVersion ?? "";
  const suspended = account?.membershipStatus === "suspended";
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accepted || busy || suspended) return;
    setBusy(true);
    setError("");
    try {
      const response = await apiFetch("/auth/accept-terms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ acceptTerms: true, termsVersion }),
      });
      if (response.status === 401) {
        router.replace("/login");
        router.refresh();
        return;
      }
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.message ??
            "We could not save your acceptance. Please try again.",
        );
      router.replace("/dashboard");
      router.refresh();
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Check your connection and try again.",
      );
      setBusy(false);
    }
  }

  if (accountError)
    return (
      <div className="p-8" role="alert">
        <p>{accountError}</p>
        <button onClick={retry}>Try again</button>
      </div>
    );
  if (!account)
    return (
      <p className="p-8" role="status">
        Loading your membership...
      </p>
    );
  return (
    <div className="membership-page">
      <header className="membership-header">
        <Brand />
        <SignOutButton />
      </header>
      <div className="membership-layout">
        <aside className="membership-intro">
          <p className="membership-eyebrow">YOUR COOPERATIVE JOURNEY</p>
          <h1>
            {suspended ? (
              "Let’s get your membership back on track."
            ) : (
              <>
                A little clarity.
                <br />A stronger start.
              </>
            )}
          </h1>
          <p>
            Welcome, {firstName}.{" "}
            {suspended
              ? "Contact our team for help with your membership."
              : "Review the membership information below before you join the cooperative."}
          </p>
          <ol className="membership-steps" aria-label="Membership progress">
            <li>
              <span>
                <Icon name="user" className="size-5" />
              </span>
              <div>
                <strong>Account verified</strong>
                <p>{email}</p>
              </div>
            </li>
            <li aria-current="step">
              <span>
                <Icon name="shield" className="size-5" />
              </span>
              <div>
                <strong>Review membership terms</strong>
                <p>Your next step</p>
              </div>
            </li>
            <li>
              <span>
                <Icon name="grid" className="size-5" />
              </span>
              <div>
                <strong>Explore your dashboard</strong>
                <p>Your cooperative, in one place</p>
              </div>
            </li>
          </ol>
          <div className="membership-help">
            <Icon name="people" className="size-7" />
            <p>
              Need a hand? <Link href="/contact">Talk to our team</Link>
            </p>
          </div>
        </aside>
        <section className="membership-card" aria-labelledby="membership-title">
          {suspended ? (
            <>
              <p className="membership-eyebrow">MEMBERSHIP PAUSED</p>
              <h2 id="membership-title">Please contact support</h2>
              <p>
                Your cooperative membership is suspended. Accepting terms cannot
                reactivate it. Our team can help you understand the next steps.
              </p>
              <Link className="auth-primary" href="/contact">
                Contact support <Icon name="arrow" className="size-5" />
              </Link>
            </>
          ) : (
            <>
              <div className="membership-card-heading">
                <span className="membership-badge">
                  <Icon name="shield" className="size-6" />
                </span>
                <span>STEP 2 OF 3</span>
              </div>
              <h2 id="membership-title">Before we grow together</h2>
              <p className="membership-card-description">
                Please review how your cooperative account works.
              </p>
              <div
                className="membership-document"
                aria-label="Membership terms and privacy information"
              >
                <p className="membership-version">
                  MEMBERSHIP TERMS · VERSION {termsVersion}
                </p>
                <section>
                  <h3>One identity, your own membership</h3>
                  <p>
                    You use your Remote Agric account to sign in. The
                    cooperative keeps a separate membership profile linked to
                    that account. Completing this step activates your
                    cooperative membership.
                  </p>
                </section>
                <section>
                  <h3>Understand each service before you use it</h3>
                  <p>
                    Contributions, withdrawals, and loans have separate
                    eligibility requirements and terms. Review those terms
                    before using a financial service. Membership does not
                    guarantee a loan or investment returns.
                  </p>
                </section>
                <section>
                  <h3>Your information and privacy</h3>
                  <p>
                    The cooperative stores your basic profile, membership
                    status, and a record of the terms you accept. Remote Agric
                    manages your password and sign-in. Authorized staff can
                    access cooperative records for support and operations.
                  </p>
                </section>
                <p className="membership-pilot">
                  This is pilot membership information. Full cooperative terms
                  and the privacy policy are pending publication before
                  financial services launch.
                </p>
              </div>
              <form className="membership-form" onSubmit={submit}>
                <label className="membership-consent">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(event) => setAccepted(event.target.checked)}
                    disabled={busy}
                    required
                  />
                  <span>
                    I have read and accept the membership terms and privacy
                    information above.
                  </span>
                </label>
                {error && (
                  <p className="membership-error" role="alert">
                    {error}
                  </p>
                )}
                <button
                  className="auth-primary"
                  type="submit"
                  disabled={!accepted || busy}
                >
                  {busy ? "Saving your acceptance..." : "Accept and continue"}
                  <Icon name="arrow" className="size-5" />
                </button>
                <p className="membership-footnote">
                  We record the terms version and acceptance date with your
                  membership.
                </p>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
