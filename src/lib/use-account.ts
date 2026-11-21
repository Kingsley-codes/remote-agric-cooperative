"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "./api-client";
import type { CurrentAdmin, CurrentUser } from "./auth-types";

type Result<T> = { account: T | null; error: string; retry: () => void };
export function useAccount(mode: "admin"): Result<CurrentAdmin>;
export function useAccount(mode: "member" | "onboarding"): Result<CurrentUser>;
export function useAccount(
  mode: "admin" | "member" | "onboarding",
): Result<CurrentAdmin | CurrentUser> {
  const router = useRouter();
  const [account, setAccount] = useState<CurrentAdmin | CurrentUser | null>(
    null,
  );
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let controller: AbortController | undefined;
    let inFlight = false;
    let hasAccount = false;
    function load() {
      if (inFlight) return;
      inFlight = true;
      controller = new AbortController();
      setError("");
      const { signal } = controller;
      void (async () => {
        try {
          const response = await apiFetch(
            mode === "admin" ? "/admin/auth/me" : "/auth/me",
            { signal },
          );
          if (signal.aborted) return;
          if (response.status === 401 || response.status === 403) {
            router.replace(mode === "admin" ? "/admin/login" : "/login");
            return;
          }
          if (!response.ok) throw new Error("Account service unavailable");
          const data: { admin?: CurrentAdmin; user?: CurrentUser } =
            await response.json();
          if (signal.aborted) return;
          if (mode === "admin") {
            if (!data.admin) throw new Error("Missing admin");
            setAccount(data.admin);
            hasAccount = true;
          } else {
            if (!data.user) throw new Error("Missing account");
            const active = data.user.membershipStatus === "active";
            if (active === (mode === "onboarding")) {
              router.replace(active ? "/dashboard" : "/onboarding");
              return;
            }
            setAccount(data.user);
            hasAccount = true;
          }
        } catch {
          if (!signal.aborted && !hasAccount)
            setError(
              "We could not load your account. Check your connection and try again.",
            );
        } finally {
          inFlight = false;
        }
      })();
    }
    load();
    window.addEventListener("focus", load);
    window.addEventListener("pageshow", load);
    return () => {
      controller?.abort();
      window.removeEventListener("focus", load);
      window.removeEventListener("pageshow", load);
    };
  }, [mode, router, attempt]);
  return { account, error, retry: () => setAttempt((value) => value + 1) };
}
