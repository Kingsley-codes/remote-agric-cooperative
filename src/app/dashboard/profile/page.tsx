"use client";

import { useDashboard } from "@/components/dashboard/dashboard-context";

export default function MemberProfilePage() {
  const { identity } = useDashboard();
  return (
    <main className="dash-content">
      <div className="dash-page-heading">
        <div>
          <p className="dash-breadcrumb">Dashboard / Profile &amp; settings</p>
          <h1>Profile &amp; settings</h1>
          <p className="dash-subtitle">Your membership and account details.</p>
        </div>
      </div>
      <section className="dash-panel dash-section-panel">
        <h2>Your profile</h2>
        <p>Your signed-in account details.</p>
        <dl className="dash-details">
          <div>
            <dt>Name</dt>
            <dd>{identity.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{identity.email}</dd>
          </div>
          <div>
            <dt>Farmer ID</dt>
            <dd>{identity.reference || "Not available"}</dd>
          </div>
        </dl>
        <p>Profile editing will be available in a future update.</p>
      </section>
    </main>
  );
}
