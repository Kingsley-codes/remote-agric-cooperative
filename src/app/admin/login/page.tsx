"use client";
import { apiFetch } from "@/lib/api-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Brand, Icon } from "@/components/public/site-ui";
import "@/components/auth/admin-login.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const values = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const response = await apiFetch("/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.get("email"),
          password: values.get("password"),
        }),
      });
      if (!response.ok) throw new Error((await response.json()).message);
      router.replace("/admin/dashboard");
      router.refresh();
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Unable to sign in. Please try again.",
      );
      setBusy(false);
    }
  }
  return (
    <main className="admin-entry">
      <aside className="admin-entry-story">
        <Brand />
        <div className="admin-story-middle">
          <span className="admin-eyebrow">THE OPERATIONS WORKSPACE</span>
          <h1>
            Good stewardship.
            <br />
            Stronger <em>futures.</em>
          </h1>
          <p>
            A clear view of the cooperative, so you can focus on the people
            behind every contribution.
          </p>
          <div className="admin-story-illustration" aria-hidden="true">
            <div className="admin-orbit" />
            <Icon name="sprout" />
            <span />
            <span />
          </div>
        </div>
        <p className="admin-story-footer">Built on trust. Growing together.</p>
      </aside>
      <section className="admin-entry-form">
        <Link className="admin-back" href="/">
          ← Back to website
        </Link>
        <div className="admin-login-card">
          <span className="admin-security-mark">
            <Icon name="shield" />
          </span>
          <span className="admin-eyebrow">REMOTE AGRIC COOPERATIVE</span>
          <h2>Admin sign in</h2>
          <p>Welcome back. Sign in to your operations workspace.</p>
          <form onSubmit={submit}>
            <label htmlFor="admin-email">Work email</label>
            <div className="admin-input">
              <Icon name="user" />
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="you@company.com"
                maxLength={254}
                required
              />
            </div>
            <label htmlFor="admin-password">Password</label>
            <div className="admin-input">
              <Icon name="lock" />
              <input
                id="admin-password"
                name="password"
                type={visible ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                maxLength={128}
                required
              />
              <button
                type="button"
                aria-label={visible ? "Hide password" : "Show password"}
                aria-pressed={visible}
                onClick={() => setVisible(!visible)}
              >
                <Icon name="eye" />
              </button>
            </div>
            {error && (
              <p role="alert" className="admin-login-error">
                {error}
              </p>
            )}
            <button className="admin-submit" type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Sign in to dashboard"}
              <Icon name="arrow" />
            </button>
          </form>
          <p className="admin-access-note">
            <Icon name="lock" /> Access is limited to authorised cooperative
            administrators. For account assistance, contact your administrator.
          </p>
        </div>
        <p className="admin-entry-footer">
          Remote Agric Cooperative <span>•</span> Admin portal
        </p>
      </section>
    </main>
  );
}
