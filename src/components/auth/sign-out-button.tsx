"use client";
import { apiFetch } from "@/lib/api-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function SignOutButton({ admin = false, className = "inline-flex items-center justify-center gap-2 rounded border px-4 py-2", iconOnly = false }: { admin?: boolean; className?: string; iconOnly?: boolean }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  return <><button className={className} disabled={busy} aria-label={busy ? "Signing out" : "Sign out"} title="Sign out" aria-busy={busy} onClick={async () => {
    setBusy(true);
    setMessage("");
    try {
      const response = await apiFetch(admin ? "/admin/auth/logout" : "/auth/logout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      if (!response.ok) throw new Error();
      router.replace(admin ? "/admin/login" : "/login");
      router.refresh();
    } catch { setMessage("Unable to sign out. Please try again."); setBusy(false); }
  }}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 4H4v16h5M9 12h12m-5-5 5 5-5 5" /></svg><span className={iconOnly ? "sr-only" : undefined}>{busy ? "Signing out…" : "Sign out"}</span></button>{message && <p role="alert">{message}</p>}</>;
}
