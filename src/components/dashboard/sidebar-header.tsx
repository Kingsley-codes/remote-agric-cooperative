"use client";

import Image from "next/image";
import Link from "next/link";
import { Glyph } from "./dashboard-ui";
import type { SidebarControls } from "./use-sidebar";

export function SidebarHeader({ admin = false, controls }: {
  admin?: boolean;
  controls: SidebarControls;
}) {
  const { mobile, open, collapsed, setOpen, setCollapsed } = controls;
  const label = mobile ? "Close navigation" : collapsed ? "Expand sidebar" : "Collapse sidebar";

  return (
    <div className="dash-sidebar-heading">
      <Link
        href={admin ? "/admin/dashboard" : "/dashboard"}
        className="dash-brand"
        aria-label="Remote Agric Cooperative dashboard"
        title="Remote Agric Cooperative"
        onClick={() => setOpen(false)}
      >
        <Image src="/logo.png" width={35} height={47} alt="" />
        <span>Remote Agric<br />Cooperative</span>
      </Link>
      <button
        className="dash-sidebar-toggle"
        aria-label={label}
        title={label}
        aria-expanded={mobile ? open : !collapsed}
        aria-controls="dashboard-navigation"
        onClick={() => mobile ? setOpen(false) : setCollapsed(!collapsed)}
      >
        <Glyph name={mobile ? "close" : collapsed ? "panel-expand" : "panel-collapse"} />
      </button>
    </div>
  );
}
