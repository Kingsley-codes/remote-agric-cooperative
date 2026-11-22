"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { useDashboard } from "./dashboard-context";
import { Glyph } from "./dashboard-ui";
import type { SidebarControls } from "./use-sidebar";

export function SidebarAccount({
  admin = false,
  controls,
}: {
  admin?: boolean;
  controls: SidebarControls;
}) {
  const { identity } = useDashboard();
  const { mobile, collapsed, open } = controls;
  const menuId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [position, setPosition] = useState({ left: 16, bottom: 16 });
  const initials = identity.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    menu.current?.hidePopover();
  }, [mobile, collapsed, open]);

  useEffect(() => {
    if (!expanded) return;
    const dismiss = () => menu.current?.hidePopover();
    window.addEventListener("resize", dismiss);
    const container = trigger.current?.closest("aside");
    container?.addEventListener("scroll", dismiss);
    return () => {
      window.removeEventListener("resize", dismiss);
      container?.removeEventListener("scroll", dismiss);
    };
  }, [expanded]);

  function positionMenu() {
    const badge = trigger.current?.getBoundingClientRect();
    if (!badge) return;
    const width = Math.min(264, window.innerWidth - 32);
    setPosition({
      left: Math.max(
        16,
        Math.min(
          !mobile && collapsed ? badge.right + 12 : badge.left,
          window.innerWidth - width - 16,
        ),
      ),
      bottom: Math.max(
        16,
        Math.min(
          window.innerHeight - badge.top + 8,
          window.innerHeight -
            (menu.current?.getBoundingClientRect().height || 224) -
            16,
        ),
      ),
    });
  }

  return (
    <div className="dash-sidebar-bottom">
      <button
        ref={trigger}
        className="dash-account"
        popoverTarget={menuId}
        aria-controls={menuId}
        aria-expanded={expanded}
        aria-label={`Account options for ${identity.name}`}
        title={`${identity.name} · ${identity.email}`}
        onClick={positionMenu}
      >
        <span className="dash-avatar">{initials}</span>
        <span className="dash-account-copy">
          <strong>{identity.name}</strong>
          <span>{identity.email}</span>
        </span>
        <Glyph name="chevrons-vertical" />
      </button>
      <div
        ref={menu}
        id={menuId}
        popover="auto"
        className="dash-account-menu"
        style={position}
        onToggle={(event) => {
          setExpanded(event.newState === "open");
          if (event.newState === "open") positionMenu();
        }}
        aria-label="Account options"
      >
        <div className="dash-account-menu-heading">
          <strong title={identity.name}>{identity.name}</strong>
          <span title={identity.email}>{identity.email}</span>
          <small>
            {admin
              ? "Administrator"
              : identity.reference || "Cooperative member"}
          </small>
        </div>
        <Link
          href={admin ? "/admin/dashboard/settings" : "/dashboard/profile"}
          className="dash-account-menu-item"
          onClick={() => {
            menu.current?.hidePopover();
            controls.setOpen(false);
          }}
        >
          <Glyph name="user" />
          Profile &amp; settings
        </Link>
        <SignOutButton
          admin={admin}
          className="dash-account-menu-item dash-account-menu-sign-out"
        />
      </div>
    </div>
  );
}
