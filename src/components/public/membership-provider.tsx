"use client";

import Link from "next/link";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { button, Icon } from "./site-ui";

type MembershipAction = "join" | "signin";
const MembershipContext = createContext<{
  modal: MembershipAction | null;
  openModal: (action: MembershipAction) => void;
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
  const { openModal } = useMembership();
  return (
    <button type="button" {...props} onClick={() => openModal(action)}>
      {children}
    </button>
  );
}

export function MembershipProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<MembershipAction | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modal) dialog.current?.showModal();
    else dialog.current?.close();
  }, [modal]);

  return (
    <MembershipContext.Provider value={{ modal, openModal: setModal }}>
      {children}
      <dialog
        ref={dialog}
        onCancel={() => setModal(null)}
        onClick={(event) => {
          if (event.target === dialog.current) setModal(null);
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-foreground/10 bg-surface p-5 text-foreground shadow-2xl backdrop:bg-black/50 sm:p-9"
        aria-labelledby="dialog-title"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="flex size-14 items-center justify-center rounded-full bg-soft">
            <Icon name={modal === "join" ? "sprout" : "shield"} />
          </span>
          <button
            onClick={() => setModal(null)}
            aria-label="Close dialog"
            className="flex size-11 items-center justify-center rounded-full hover:bg-soft"
          >
            <Icon name="close" className="size-6" />
          </button>
        </div>
        <h2
          id="dialog-title"
          className="mt-5 font-display text-3xl font-semibold"
        >
          {modal === "join" ? "Let’s grow together." : "Member sign in"}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {modal === "join"
            ? "Membership brings you into a community built around agriculture, savings, and shared progress. Online registration is not available yet. Explore how contributions and membership work while we prepare to welcome you."
            : "The member portal is not connected yet. Once it is available, you’ll be able to securely access your contributions, transactions, and membership information here."}
        </p>
        <Link
          href={modal === "join" ? "/#how-it-works" : "/#faq"}
          onClick={() => setModal(null)}
          className={`${button} mt-6 w-full gap-3 bg-brand [&_svg]:shrink-0 text-white hover:bg-brand-hover`}
        >
          {modal === "join"
            ? "Explore membership"
            : "View frequently asked questions"}
          <Icon name="arrow" className="size-5" />
        </Link>
      </dialog>
    </MembershipContext.Provider>
  );
}
