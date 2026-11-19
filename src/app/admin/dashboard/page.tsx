"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import {
  ActivityChart,
  Glyph,
  money,
  transactions,
  members,
  type Identity,
} from "@/components/dashboard/dashboard-ui";
import { useAccount } from "@/lib/use-account";
import "@/components/dashboard/dashboard.css";

export default function AdminDashboardPage() {
  const { account, error, retry } = useAccount("admin");
  const admin: boolean = true;
  const identity: Identity = {
    name: account?.name ?? "",
    email: account?.email ?? "",
  };
  const [view, setView] = useState("Dashboard");
  const [tab, setTab] = useState("My Overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [profile, setProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{ title: string; body: ReactNode } | null>(
    null,
  );
  const dialog = useRef<HTMLDialogElement>(null);
  const platform = admin || tab === "Platform Overview";
  const firstName = identity.name.split(" ")[0];
  const initials = identity.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const nav = admin
    ? [
        ["home", "Dashboard"],
        ["people", "Members"],
        ["document", "Transactions"],
        ["loan", "Loan Requests"],
        ["chart", "Reports"],
        ["shield", "Settings"],
      ]
    : [
        ["home", "Dashboard"],
        ["coins", "Long-term Contributions"],
        ["wallet", "Short-term Contributions"],
        ["loan", "Loans"],
        ["document", "Transactions"],
        ["user", "Profile & Settings"],
      ];
  const cards = platform
    ? [
        {
          icon: "people",
          label: "Total Members",
          value: "1,248",
          note: "Across the cooperative",
          gold: false,
        },
        {
          icon: "sprout",
          label: "Total Contributions",
          value: money(48500000),
          note: "Long-term and short-term",
          gold: false,
        },
        {
          icon: "loan",
          label: admin ? "Pending Loan Requests" : "Active Loans",
          value: admin ? "12" : money(12500000),
          note: admin ? "Awaiting review" : "Across the cooperative",
          gold: true,
        },
        {
          icon: "chart",
          label: "Reported Pool Value",
          value: money(52340000),
          note: "Sample valuation · Oct 2026",
          gold: true,
        },
      ]
    : [
        {
          icon: "sprout",
          label: "Long-term Contributions",
          value: money(1250000),
          note: "Total contributed",
          gold: false,
        },
        {
          icon: "wallet",
          label: "Short-term Balance",
          value: money(320000),
          note: "Available balance",
          gold: false,
        },
        {
          icon: "loan",
          label: "Active Loans",
          value: money(500000),
          note: "1 active loan",
          gold: true,
        },
        {
          icon: "chart",
          label: "Total Returns",
          value: money(85400),
          note: "Across your investments",
          gold: true,
        },
      ];

  function navigate(next: string) {
    setView(next);
    setMenuOpen(false);
    setSearch("");
  }
  function show(title: string, body: ReactNode) {
    setModal({ title, body });
    dialog.current?.showModal();
  }
  function previewAction(title: string) {
    show(
      title,
      <>
        <span className="dash-demo-tag">Preview</span>
        <p>
          This is a preview of your cooperative workspace. Contributions,
          withdrawals and loan applications will be available when these
          services launch.
        </p>
        <p>No money will move and no application will be submitted.</p>
        <button
          className="dash-green-button"
          onClick={() => dialog.current?.close()}
        >
          Got it
        </button>
      </>,
    );
  }
  function exportReport() {
    const lines = [
      ["Date", "Description", "Type", "Amount (NGN)", "Status", "Reference"],
      ...transactions.map((row) => [
        row.date,
        row.description,
        row.type,
        String(row.amount),
        row.status,
        row.reference,
      ]),
    ];
    const url = URL.createObjectURL(
      new Blob(
        [
          "Sample data only\r\n" +
            lines
              .map((row) =>
                row
                  .map((value) => `"${value.replaceAll('"', '""')}"`)
                  .join(","),
              )
              .join("\r\n"),
        ],
        { type: "text/csv;charset=utf-8" },
      ),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "cooperative-sample-transactions.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }
  const filteredTransactions = transactions.filter((row) =>
    `${row.description} ${row.reference} ${row.type}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const overview = view === "Dashboard";

  function transactionTable(full = false) {
    return (
      <section className="dash-panel dash-transactions">
        <div className="dash-table-heading">
          <div>
            <h2>{full ? "All Transactions" : "Recent Transactions"}</h2>
            <p>
              {admin
                ? "A snapshot of contributions, withdrawals and loan activity across the cooperative."
                : "Your latest contributions, withdrawals, loan activity and other transactions."}
            </p>
          </div>
          {full ? (
            <label className="dash-search">
              <Glyph name="search" />
              <input
                aria-label="Search transactions"
                placeholder="Search transactions"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          ) : (
            <button
              className="dash-text-link"
              onClick={() => navigate("Transactions")}
            >
              View All Transactions <Glyph name="arrow" />
            </button>
          )}
        </div>
        <div className="dash-table-scroll">
          <table>
            <thead>
              <tr>
                {[
                  "Date",
                  "Description",
                  "Type",
                  "Amount",
                  "Status",
                  "Reference",
                  "Action",
                ].map((label) => (
                  <th key={label}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((row) => (
                <tr key={row.reference}>
                  <td>{row.date}</td>
                  <td>{row.description}</td>
                  <td>
                    <span className={`dash-type ${row.type.toLowerCase()}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="dash-amount">{money(row.amount)}</td>
                  <td>
                    <span className={`dash-status ${row.status.toLowerCase()}`}>
                      <i />
                      {row.status}
                    </span>
                  </td>
                  <td>{row.reference}</td>
                  <td>
                    <button
                      className="dash-row-action"
                      aria-label={`View transaction ${row.reference}`}
                      onClick={() =>
                        show(
                          "Transaction details",
                          <dl className="dash-details">
                            {Object.entries(row).map(([key, value]) => (
                              <div key={key}>
                                <dt>{key}</dt>
                                <dd>
                                  {key === "amount"
                                    ? money(Number(value))
                                    : value}
                                </dd>
                              </div>
                            ))}
                            <p>
                              Sample transaction. No payment has been processed.
                            </p>
                          </dl>,
                        )
                      }
                    >
                      •••
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={7}>No sample transactions match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
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
    <div className={`dash-shell ${admin ? "dash-admin" : ""}`}>
      {menuOpen && (
        <button
          className="dash-mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside
        className={`dash-sidebar ${menuOpen ? "is-open" : ""}`}
        aria-label={admin ? "Admin navigation" : "Member navigation"}
      >
        <Link
          href={admin ? "/admin/dashboard" : "/dashboard"}
          className="dash-brand"
        >
          <Image src="/logo.png" width={35} height={47} alt="" />
          <span>
            Remote Agric
            <br />
            Cooperative
          </span>
        </Link>
        {admin && <span className="dash-workspace-tag">ADMIN WORKSPACE</span>}
        <nav>
          {nav.map(([icon, label]) => (
            <button
              key={label}
              className={view === label ? "is-active" : ""}
              aria-current={view === label ? "page" : undefined}
              onClick={() => navigate(label)}
            >
              <Glyph name={icon} />
              <span>{label}</span>
              {admin && label === "Loan Requests" && <small>12</small>}
            </button>
          ))}
        </nav>
        <div className="dash-sidebar-bottom">
          <div className="dash-help">
            <span className="dash-help-icon">
              <Glyph name={admin ? "shield" : "sprout"} />
            </span>
            <strong>
              {admin ? "Here to make a difference." : "Growing, together."}
            </strong>
            <p>
              {admin
                ? "Every detail supports a stronger cooperative."
                : "Small contributions. Shared possibilities."}
            </p>
          </div>
          <SignOutButton admin={admin} />
        </div>
      </aside>
      <div className="dash-main">
        <header className="dash-topbar">
          <button
            className="dash-menu-toggle"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
          >
            <Glyph name="menu" />
          </button>
          <span className="dash-topbar-context">
            {admin ? "Operations workspace" : ""}
          </span>
          <div className="dash-topbar-actions">
            <div className="dash-popover-wrap">
              <button
                className="dash-notification"
                aria-label="Notifications"
                aria-expanded={notifications}
                onClick={() => {
                  setNotifications(!notifications);
                  setProfile(false);
                }}
              >
                <Glyph name="bell" />
                <i />
              </button>
              {notifications && (
                <div className="dash-popover">
                  <strong>You’re all caught up</strong>
                  <p>
                    Live notifications will appear here when available. This
                    dashboard currently shows sample data.
                  </p>
                </div>
              )}
            </div>
            <span className="dash-topbar-divider" />
            <div className="dash-popover-wrap">
              <button
                className="dash-profile-toggle"
                aria-expanded={profile}
                onClick={() => {
                  setProfile(!profile);
                  setNotifications(false);
                }}
              >
                <span className="dash-avatar">{initials}</span>
                <span>{identity.name}</span>
                <span className="dash-down">⌄</span>
              </button>
              {profile && (
                <div className="dash-popover">
                  <strong>{identity.name}</strong>
                  <p>{identity.email}</p>
                  <button
                    className="dash-text-link"
                    onClick={() => {
                      navigate(admin ? "Settings" : "Profile & Settings");
                      setProfile(false);
                    }}
                  >
                    View profile <Glyph name="arrow" />
                  </button>
                  <SignOutButton admin={admin} />
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="dash-content">
          <div className="dash-page-heading">
            <div>
              <p className="dash-breadcrumb">
                {admin ? "Admin" : "Dashboard"}
                {!overview && ` / ${view}`}
              </p>
              <h1>{overview ? `Welcome back, ${firstName}` : view}</h1>
              <p className="dash-subtitle">
                {overview
                  ? admin
                    ? "Here is what’s happening across your cooperative."
                    : "Here is a summary of your cooperative activity."
                  : "A clear view of your cooperative workspace."}
              </p>
            </div>
            <div className="dash-heading-meta">
              <span className="dash-demo-tag">Sample data</span>
              <time dateTime="2026-10-29">Thu, 29 Oct 2026</time>
            </div>
          </div>
          {overview && (
            <>
              <div
                className="dash-tabs"
                role="tablist"
                aria-label="Dashboard overview"
              >
                {(admin
                  ? ["Platform Overview", "Operations"]
                  : ["My Overview", "Platform Overview"]
                ).map((label) => (
                  <button
                    role="tab"
                    aria-selected={
                      admin
                        ? tab === label ||
                          (label === "Platform Overview" &&
                            tab === "My Overview")
                        : tab === label
                    }
                    key={label}
                    className={
                      (admin &&
                        tab === "My Overview" &&
                        label === "Platform Overview") ||
                      tab === label
                        ? "is-active"
                        : ""
                    }
                    onClick={() => setTab(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="dash-stat-grid">
                {cards.map((card, i) => (
                  <button
                    className="dash-stat"
                    key={card.label}
                    onClick={() =>
                      platform
                        ? navigate(
                            admin
                              ? [
                                  "Members",
                                  "Reports",
                                  "Loan Requests",
                                  "Reports",
                                ][i]
                              : [
                                  "Profile & Settings",
                                  "Long-term Contributions",
                                  "Loans",
                                  "Long-term Contributions",
                                ][i],
                          )
                        : navigate(
                            [
                              "Long-term Contributions",
                              "Short-term Contributions",
                              "Loans",
                              "Long-term Contributions",
                            ][i],
                          )
                    }
                  >
                    <span
                      className={`dash-round-icon ${card.gold ? "gold" : ""}`}
                    >
                      <Glyph name={card.icon} />
                    </span>
                    <span className="dash-stat-copy">
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                      <small>{card.note}</small>
                    </span>
                    <Glyph name="chevron" />
                  </button>
                ))}
              </div>
              {admin && tab === "Operations" ? (
                <section className="dash-panel dash-operations">
                  <h2>Operations at a glance</h2>
                  <p>Sample queues for the operations team.</p>
                  <div>
                    <button onClick={() => navigate("Loan Requests")}>
                      <strong>12</strong>Loan requests awaiting review
                      <Glyph name="arrow" />
                    </button>
                    <button onClick={() => navigate("Transactions")}>
                      <strong>4</strong>Withdrawals processing
                      <Glyph name="arrow" />
                    </button>
                    <button onClick={() => navigate("Members")}>
                      <strong>28</strong>New members this month
                      <Glyph name="arrow" />
                    </button>
                  </div>
                </section>
              ) : (
                <div className="dash-middle-grid">
                  <ActivityChart platform={platform} />
                  <section className="dash-panel dash-quick-actions">
                    <h2>Quick Actions</h2>
                    {(admin
                      ? [
                          ["people", "View Members"],
                          ["loan", "Review Loan Requests"],
                          ["document", "View All Transactions"],
                          ["upload", "Export Report"],
                        ]
                      : [
                          ["plus", "Make a Contribution"],
                          ["upload", "Request a Withdrawal"],
                          ["loan", "Apply for a Loan"],
                          ["document", "View All Transactions"],
                        ]
                    ).map(([icon, label], i) => (
                      <button
                        key={label}
                        className={i === 0 ? "is-primary" : ""}
                        onClick={() =>
                          admin
                            ? label === "Export Report"
                              ? exportReport()
                              : navigate(
                                  label === "View Members"
                                    ? "Members"
                                    : label === "Review Loan Requests"
                                      ? "Loan Requests"
                                      : "Transactions",
                                )
                            : label === "View All Transactions"
                              ? navigate("Transactions")
                              : previewAction(label)
                        }
                      >
                        <Glyph name={icon} />
                        <span>{label}</span>
                        <Glyph name="arrow" />
                      </button>
                    ))}
                  </section>
                </div>
              )}
              {transactionTable()}
              {!admin && (
                <section className="dash-discover">
                  <span className="dash-round-icon">
                    <Glyph name="sprout" />
                  </span>
                  <div>
                    <h2>Meet Remote Agric</h2>
                    <p>
                      Your cooperative account is also your first step into
                      Remote Agric. Discover the people and opportunities behind
                      our agricultural community.
                    </p>
                  </div>
                  <a
                    href="https://remoteagricng.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore Remote Agric <Glyph name="arrow" />
                  </a>
                </section>
              )}
            </>
          )}
          {view === "Transactions" && transactionTable(true)}
          {view === "Members" && (
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
          )}
          {(view === "Profile & Settings" || view === "Settings") && (
            <section className="dash-panel dash-section-panel">
              <h2>{admin ? "Administrator profile" : "Your profile"}</h2>
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
                  <dt>{admin ? "Access" : "Farmer ID"}</dt>
                  <dd>
                    {admin
                      ? "Cooperative administrator"
                      : identity.reference || "Not available"}
                  </dd>
                </div>
              </dl>
              <p>Profile editing will be available in a future update.</p>
            </section>
          )}
          {view === "Reports" && (
            <section className="dash-panel dash-section-panel">
              <span className="dash-demo-tag">Sample report</span>
              <h2>Cooperative activity report</h2>
              <p>
                October 2026 · Contributions, withdrawals and loan activity.
              </p>
              <div className="dash-report-grid">
                <div>
                  <span>Transactions shown</span>
                  <strong>5</strong>
                </div>
                <div>
                  <span>Contribution volume</span>
                  <strong>{money(250000)}</strong>
                </div>
                <div>
                  <span>Processing withdrawals</span>
                  <strong>{money(80000)}</strong>
                </div>
              </div>
              <button className="dash-green-button" onClick={exportReport}>
                Download sample CSV <Glyph name="upload" />
              </button>
            </section>
          )}
          {(view === "Loans" || view === "Loan Requests") && (
            <section className="dash-panel dash-section-panel">
              <div className="dash-table-heading">
                <div>
                  <h2>{admin ? "Loan review queue" : "Your loans"}</h2>
                  <p>
                    {admin
                      ? "Illustrative requests awaiting review. No live decisions can be made."
                      : "An overview of your sample loan activity."}
                  </p>
                </div>
                {!admin && (
                  <button
                    className="dash-green-button"
                    onClick={() => previewAction("Apply for a Loan")}
                  >
                    Apply for a loan <Glyph name="arrow" />
                  </button>
                )}
              </div>
              <div className="dash-table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>{admin ? "Member" : "Reference"}</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>{admin ? "Requested" : "Next repayment"}</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{admin ? "Amina Yusuf" : "LOAN-000124"}</td>
                      <td className="dash-amount">{money(500000)}</td>
                      <td>
                        <span className="dash-status processing">
                          <i />
                          {admin ? "Awaiting review" : "Active"}
                        </span>
                      </td>
                      <td>{admin ? "Oct 20, 2026" : "Nov 05, 2026"}</td>
                      <td>
                        <button
                          className="dash-text-link"
                          onClick={() =>
                            show(
                              "Sample loan",
                              <>
                                <p>Amount: {money(500000)}</p>
                                <p>
                                  {admin
                                    ? "This sample request is for layout review. Approval, rejection and disbursement are not connected."
                                    : "This sample loan does not represent an actual loan on your account."}
                                </p>
                              </>,
                            )
                          }
                        >
                          View details <Glyph name="arrow" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}
          {(view === "Long-term Contributions" ||
            view === "Short-term Contributions") && (
            <>
              <div className="dash-contribution-banner">
                <div>
                  <span>
                    {view === "Long-term Contributions"
                      ? "Total contributed"
                      : "Available balance"}
                  </span>
                  <h2>
                    {money(
                      view === "Long-term Contributions" ? 1250000 : 320000,
                    )}
                  </h2>
                  <p>
                    Sample balance · financial services are not connected yet.
                  </p>
                </div>
                <button
                  className="dash-green-button"
                  onClick={() => previewAction("Make a Contribution")}
                >
                  Make a contribution <Glyph name="plus" />
                </button>
              </div>
              <ActivityChart platform={false} />
              {transactionTable()}
            </>
          )}
          <footer className="dash-footer">
            <span>© 2026 Remote Agric Cooperative</span>
            <span>Growing a stronger future, together.</span>
          </footer>
        </main>
      </div>
      <dialog
        className="dash-dialog"
        ref={dialog}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
        aria-labelledby="dash-dialog-title"
      >
        <button
          className="dash-dialog-close"
          aria-label="Close dialog"
          onClick={() => dialog.current?.close()}
        >
          <Glyph name="close" />
        </button>
        <h2 id="dash-dialog-title">{modal?.title}</h2>
        <div>{modal?.body}</div>
      </dialog>
    </div>
  );
}
