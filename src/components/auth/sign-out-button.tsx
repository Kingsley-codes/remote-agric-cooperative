"use client";
import { apiFetch } from "@/lib/api-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function SignOutButton({ admin = false }: { admin?: boolean }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  return <><button className="rounded border px-4 py-2" disabled={busy} onClick={async () => {
    setBusy(true);
    try {
      const response = await apiFetch(admin ? "/admin/auth/logout" : "/auth/logout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      if (!response.ok) throw new Error();
      router.replace(admin ? "/admin/login" : "/login");
      router.refresh();
    } catch { setMessage("Unable to sign out. Please try again."); setBusy(false); }
  }}>{busy ? "Signing out…" : "Sign out"}</button>{message && <p role="alert">{message}</p>}</>;
}
