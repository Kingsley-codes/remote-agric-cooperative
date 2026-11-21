"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Glyph, type Identity } from "@/components/dashboard/dashboard-ui";
import { DashboardContext } from "@/components/dashboard/dashboard-context";
import { useSidebar } from "@/components/dashboard/use-sidebar";
import { useAccount } from "@/lib/use-account";
import "@/components/dashboard/dashboard.css";

export default function MemberDashboardLayout({ children }: { children: ReactNode }) {
  const { account, error, retry } = useAccount("member");
  const [view, setView] = useState("Dashboard");
  const { collapsed, setCollapsed, open, setOpen, mobile, sidebar, opener } = useSidebar();
  const identity: Identity = {
    name: account ? `${account.firstName} ${account.lastName}`.trim() : "",
    email: account?.email ?? "",
    reference: account?.farmerID,
  };
  const initials = identity.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  const nav = [
    ["home", "Dashboard"],
    ["coins", "Long-term Contributions"],
    ["wallet", "Short-term Contributions"],
    ["loan", "Loans"],
    ["document", "Transactions"],
    ["user", "Profile & Settings"],
  ];

  function navigate(next: string) {
    setView(next);
    setOpen(false);
  }

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
    <DashboardContext.Provider value={{ identity, view, navigate }}>
      <div className={`dash-shell  ${collapsed ? "is-collapsed" : ""}`}>
        {mobile && open && <button className="dash-mobile-backdrop" tabIndex={-1} aria-label="Close navigation" onClick={() => setOpen(false)} />}
        <aside ref={sidebar} id="dashboard-navigation" className={`dash-sidebar ${open ? "is-open" : ""}`} inert={mobile && !open} role={mobile && open ? "dialog" : undefined} aria-modal={mobile && open ? true : undefined} aria-label="Member navigation">
          <div className="dash-sidebar-heading">
            <Link href="/dashboard" className="dash-brand" aria-label="Remote Agric Cooperative dashboard" title="Remote Agric Cooperative" onClick={() => setOpen(false)}>
              <Image src="/logo.png" width={35} height={47} alt="" />
              <span>Remote Agric<br />Cooperative</span>
            </Link>
            <button className="dash-sidebar-toggle" aria-label={mobile ? "Close navigation" : collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-expanded={mobile ? open : !collapsed} aria-controls="dashboard-navigation" onClick={() => mobile ? setOpen(false) : setCollapsed(!collapsed)}>
              <Glyph name={mobile ? "close" : "menu"} />
            </button>
          </div>
          <nav aria-label="Dashboard pages">
            {nav.map(([icon, label]) => (
              <button key={label} className={view === label ? "is-active" : ""} aria-current={view === label ? "page" : undefined} aria-label={label} title={label} onClick={() => navigate(label)}>
                <Glyph name={icon} /><span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="dash-sidebar-bottom">
            <button className="dash-account" onClick={() => navigate("Profile & Settings")} title={`${identity.name} · ${identity.email}`} aria-label={`View profile for ${identity.name}`}>
              <span className="dash-avatar">{initials}</span>
              <span className="dash-account-copy"><strong>{identity.name}</strong><span>{identity.email}</span><small>{identity.reference || "Cooperative member"}</small></span>
              <Glyph name="chevron" />
            </button>
            <SignOutButton className="dash-sign-out" iconOnly={!mobile && collapsed} />
          </div>
        </aside>
        <div className="dash-main" inert={mobile && open}>
          <header className="dash-mobile-bar">
            <button ref={opener} className="dash-menu-toggle" aria-label="Open navigation" aria-controls="dashboard-navigation" aria-expanded={open} onClick={() => setOpen(true)}><Glyph name="menu" /></button>
            <span>Member workspace</span>
          </header>
          {children}
        </div>
      </div>
    </DashboardContext.Provider>
  );
}
