"use client";

import { useDashboard } from "@/components/dashboard/dashboard-context";

export default function AdminSettingsPage() {
  const { identity } = useDashboard();
  return (
    <main className="dash-content">
      <div className="dash-page-heading">
        <div>
          <p className="dash-breadcrumb">Admin / Profile &amp; settings</p>
          <h1>Profile &amp; settings</h1>
          <p className="dash-subtitle">Your membership and account details.</p>
        </div>
      </div>
      <section className="dash-panel dash-section-panel">
        <h2>Administrator profile</h2>
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
            <dt>Access</dt>
            <dd>Cooperative administrator</dd>
          </div>
        </dl>
        <p>Profile editing will be available in a future update.</p>
      </section>
    </main>
  );
}
