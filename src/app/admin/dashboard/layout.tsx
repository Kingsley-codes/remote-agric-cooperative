"use client";

import { type ReactNode } from "react";
import { Glyph, type Identity } from "@/components/dashboard/dashboard-ui";
import { DashboardContext } from "@/components/dashboard/dashboard-context";
import { AdminSidebar } from "@/components/dashboard/admin-sidebar";
import { useSidebar } from "@/components/dashboard/use-sidebar";
import { useAccount } from "@/lib/use-account";
import "@/components/dashboard/dashboard.css";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { account, error, retry } = useAccount("admin");
  const sidebarControls = useSidebar();
  const { collapsed, open, setOpen, mobile, opener } = sidebarControls;
  const identity: Identity = {
    name: account?.name ?? "",
    email: account?.email ?? "",
  };

  if (error)
    return (
      <div className="p-8" role="alert">
        <p>{error}</p>
        <button onClick={retry}>Try again</button>
      </div>
    );
  if (!account)
    return (
      <p className="p-8" role="status">
        Loading your account...
      </p>
    );

  return (
    <DashboardContext.Provider value={{ identity }}>
      <div
        className={`dash-shell dash-admin ${collapsed ? "is-collapsed" : ""}`}
      >
        {mobile && open && (
          <button
            className="dash-mobile-backdrop"
            tabIndex={-1}
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
        )}
        <AdminSidebar controls={sidebarControls} />
        <div className="dash-main" inert={mobile && open}>
          <header className="dash-mobile-bar">
            <button
              ref={opener}
              className="dash-menu-toggle"
              aria-label="Open navigation"
              aria-controls="dashboard-navigation"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Glyph name="menu" />
            </button>
            <span>Admin workspace</span>
          </header>
          {children}
        </div>
      </div>
    </DashboardContext.Provider>
  );
}
