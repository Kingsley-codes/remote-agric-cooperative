"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Glyph } from "./dashboard-ui";
import { SidebarAccount } from "./sidebar-account";
import { SidebarHeader } from "./sidebar-header";
import type { SidebarControls } from "./use-sidebar";

const navigation = [
  ["home", "Dashboard", "/admin/dashboard"],
  ["people", "Members", "/admin/dashboard/members"],
  ["coins", "Long-term Contributions", "/admin/dashboard/long-term"],
  ["wallet", "Short-term Contributions", "/admin/dashboard/short-term"],
  ["document", "Transactions", "/admin/dashboard/transactions"],
  ["loan", "Loan Requests", "/admin/dashboard/loans"],
  ["chart", "Reports", "/admin/dashboard/reports"],
];

export function AdminSidebar({ controls }: { controls: SidebarControls }) {
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
      aria-label="Admin navigation"
    >
      <SidebarHeader admin controls={controls} />
      <span className="dash-workspace-tag">ADMIN WORKSPACE</span>
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
      <SidebarAccount admin controls={controls} />
    </aside>
  );
}
