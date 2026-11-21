"use client";

import { useEffect, useRef, useState } from "react";

export function useSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const sidebar = useRef<HTMLElement>(null);
  const opener = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const sync = () => {
      setMobile(media.matches);
      setOpen(false);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!mobile || !open) return;
    const trigger = opener.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sidebar.current?.querySelector<HTMLButtonElement>(".dash-sidebar-toggle")?.focus();

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (sidebar.current?.querySelector(":popover-open")) return;
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(sidebar.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled)',
      ) ?? []).filter((control) => control.getClientRects().length > 0);
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", trapFocus);
      trigger?.focus();
    };
  }, [mobile, open]);

  return { collapsed, setCollapsed, open, setOpen, mobile, sidebar, opener };
}

export type SidebarControls = ReturnType<typeof useSidebar>;
