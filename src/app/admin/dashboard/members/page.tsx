"use client";

import { useState } from "react";
import { Glyph, members } from "@/components/dashboard/dashboard-ui";

export default function MembersPage() {
  const [search, setSearch] = useState("");
  return (
    <main className="dash-content">
      <div className="dash-page-heading">
        <div>
          <p className="dash-breadcrumb">Admin / Members</p>
          <h1>Members</h1>
          <p className="dash-subtitle">The cooperative member directory.</p>
        </div>
      </div>
      <section className="dash-panel dash-section-panel">
        <div className="dash-table-heading">
          <div>
            <h2>Cooperative members</h2>
            <p>Sample member directory</p>
          </div>
          <label className="dash-search">
            <Glyph name="search" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search members"
              aria-label="Search members"
            />
          </label>
        </div>
        <div className="dash-table-scroll">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Farmer ID</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {members
                .filter((member) =>
                  `${member.name} ${member.email}`
                    .toLowerCase()
                    .includes(search.toLowerCase()),
                )
                .map((member) => (
                  <tr key={member.id}>
                    <td>
                      <strong>{member.name}</strong>
                      <small className="dash-cell-subtitle">
                        {member.email}
                      </small>
                    </td>
                    <td>{member.id}</td>
                    <td>{member.joined}</td>
                    <td>
                      <span
                        className={`dash-status ${member.status === "Active" ? "completed" : "processing"}`}
                      >
                        <i />
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
