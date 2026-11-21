"use client";

import { useDashboard } from "./dashboard-context";
import { Glyph } from "./dashboard-ui";
import { SidebarAccount } from "./sidebar-account";
import { SidebarHeader } from "./sidebar-header";
import type { SidebarControls } from "./use-sidebar";

const navigation = [
  ["home", "Dashboard"],
  ["coins", "Long-term Contributions"],
  ["wallet", "Short-term Contributions"],
  ["loan", "Loans"],
  ["document", "Transactions"],
];

export function MemberSidebar({ controls }: { controls: SidebarControls }) {
  const { view, navigate } = useDashboard();
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
        {navigation.map(([icon, label]) => (
          <button
            key={label}
            className={view === label ? "is-active" : ""}
            aria-current={view === label ? "page" : undefined}
            aria-label={label}
            title={label}
            onClick={() => navigate(label)}
          >
            <Glyph name={icon} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <SidebarAccount controls={controls} />
    </aside>
  );
}
