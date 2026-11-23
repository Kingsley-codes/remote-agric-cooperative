"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Glyph } from "./dashboard-ui";
import { SidebarAccount } from "./sidebar-account";
import { SidebarHeader } from "./sidebar-header";
import type { SidebarControls } from "./use-sidebar";

const navigation = [
  ["home", "Dashboard", "/dashboard"],
  ["coins", "Long-term Contributions", "/dashboard/long-term"],
  ["wallet", "Short-term Contributions", "/dashboard/short-term"],
  ["loan", "Loans", "/dashboard/loans"],
  ["document", "Transactions", "/dashboard/transactions"],
  ["document", "How it works", "/dashboard/how-it-works"],
];

export function MemberSidebar({ controls }: { controls: SidebarControls }) {
  const pathname = usePathname();
  const { sidebar, mobile, open } = controls;

  return (
    <aside
      ref={sidebar}
      id="dashboard-navigation"
      className={`dash-sidebar ${open ? "is-open" : ""}`}
      inert={mobile && !open}
      role={mobile && open ? "dialog" : undefined}
      aria-modal={mobile && open ? true : undefined}
      aria-label="Member navigation"
    >
      <SidebarHeader controls={controls} />
      <nav aria-label="Dashboard pages">
        {navigation.map(([icon, label, href]) => (
          <Link
            href={href}
            key={label}
            className={pathname === href ? "is-active" : ""}
            aria-current={pathname === href ? "page" : undefined}
            aria-label={label}
            title={label}
            onClick={() => controls.setOpen(false)}
          >
            <Glyph name={icon} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <SidebarAccount controls={controls} />
    </aside>
  );
}
