"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { Glyph, type Identity } from "@/components/dashboard/dashboard-ui";
import { DashboardContext } from "@/components/dashboard/dashboard-context";
import { MemberSidebar } from "@/components/dashboard/member-sidebar";
import { useSidebar } from "@/components/dashboard/use-sidebar";
import { useAccount } from "@/lib/use-account";
import "@/components/dashboard/dashboard.css";

const subscribeLocation = (notify: () => void) => {
  window.addEventListener("popstate", notify);
  return () => window.removeEventListener("popstate", notify);
};
const locationSnapshot = () => window.location.search;
const serverLocation = () => "";

export default function MemberDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { account, error, retry } = useAccount("member");
  const locationSearch = useSyncExternalStore(
    subscribeLocation,
    locationSnapshot,
    serverLocation,
  );
  const params = new URLSearchParams(locationSearch);
  const requested =
    params.get("reference") || params.get("trxref")
      ? "Transactions"
      : params.get("view");
  const view =
    requested &&
    [
      "Long-term Contributions",
      "Short-term Contributions",
      "Transactions",
      "Loans",
      "Profile & Settings",
    ].includes(requested)
      ? requested
      : "Dashboard";
  const sidebarControls = useSidebar();
  const { collapsed, open, setOpen, mobile, opener } = sidebarControls;
  const identity: Identity = {
    name: account ? `${account.firstName} ${account.lastName}`.trim() : "",
    email: account?.email ?? "",
    reference: account?.farmerID,
  };
  function navigate(next: string) {
    const url = new URL(window.location.href);
    url.searchParams.set("view", next);
    window.history.pushState(null, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
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
        {mobile && open && (
          <button
            className="dash-mobile-backdrop"
            tabIndex={-1}
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
        )}
        <MemberSidebar controls={sidebarControls} />
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
            <span>Member workspace</span>
          </header>
          {children}
        </div>
      </div>
    </DashboardContext.Provider>
  );
}
