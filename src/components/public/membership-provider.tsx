"use client";

import { createContext, useContext } from "react";
import type { ComponentProps, ReactNode } from "react";
import { useRouter } from "next/navigation";

type MembershipAction = "join" | "signin";
const MembershipContext = createContext<{
  openMembership: (action: MembershipAction) => void;
} | null>(null);

export function useMembership() {
  const context = useContext(MembershipContext);
  if (!context) throw new Error("Membership actions require MembershipProvider.");
  return context;
}

export function MembershipButton({
  action = "join",
  children,
  ...props
}: Omit<ComponentProps<"button">, "onClick"> & { action?: MembershipAction }) {
  const { openMembership } = useMembership();
  return (
    <button type="button" {...props} onClick={() => openMembership(action)}>
      {children}
    </button>
  );
}

export function MembershipProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <MembershipContext.Provider value={{ openMembership: (action) => router.push(action === "join" ? "/signup" : "/login") }}>
      {children}
    </MembershipContext.Provider>
  );
}
