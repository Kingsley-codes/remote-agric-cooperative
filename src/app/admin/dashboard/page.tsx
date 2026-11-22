"use client";
import { useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/components/dashboard/dashboard-context";
import {
  ActivityChart,
  Glyph,
  money,
  transactions,
} from "@/components/dashboard/dashboard-ui";

export default function AdminDashboardPage() {
  const { identity } = useDashboard();
  const router = useRouter();
  const admin: boolean = true;
  const [tab, setTab] = useState("My Overview");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{ title: string; body: ReactNode } | null>(
    null,
  );
  const dialog = useRef<HTMLDialogElement>(null);
  const platform = admin || tab === "Platform Overview";
  const firstName = identity.name.split(" ")[0];
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
          label: "/admin/dashboard/long-term",
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

  function show(title: string, body: ReactNode) {
    setModal({ title, body });
    dialog.current?.showModal();
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
              onClick={() => router.push("/admin/dashboard/transactions")}
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

  return (
    <>
      <main className="dash-content">
        <div className="dash-page-heading">
          <div>
            <p className="dash-breadcrumb">{admin ? "Admin" : "Dashboard"}</p>
            <h1>{`Welcome back, ${firstName}`}</h1>
            <p className="dash-subtitle">
              Here is what is happening across your cooperative.
            </p>
          </div>
          <div className="dash-heading-meta">
            <span className="dash-demo-tag">Sample data</span>
            <time dateTime="2026-10-29">Thu, 29 Oct 2026</time>
          </div>
        </div>
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
                      (label === "Platform Overview" && tab === "My Overview")
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
                    ? router.push(
                        admin
                          ? [
                              "/admin/dashboard/members",
                              "/admin/dashboard/reports",
                              "/admin/dashboard/loans",
                              "/admin/dashboard/reports",
                            ][i]
                          : [
                              "/admin/dashboard/profile",
                              "/admin/dashboard/long-term",
                              "/admin/dashboard/loans",
                              "/admin/dashboard/long-term",
                            ][i],
                      )
                    : router.push(
                        [
                          "/admin/dashboard/long-term",
                          "/admin/dashboard/short-term",
                          "/admin/dashboard/loans",
                          "/admin/dashboard/long-term",
                        ][i],
                      )
                }
              >
                <span className={`dash-round-icon ${card.gold ? "gold" : ""}`}>
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
                <button onClick={() => router.push("/admin/dashboard/loans")}>
                  <strong>12</strong>Loan requests awaiting review
                  <Glyph name="arrow" />
                </button>
                <button
                  onClick={() => router.push("/admin/dashboard/transactions")}
                >
                  <strong>4</strong>Withdrawals processing
                  <Glyph name="arrow" />
                </button>
                <button onClick={() => router.push("/admin/dashboard/members")}>
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
                          : router.push(
                              label === "View Members"
                                ? "/admin/dashboard/members"
                                : label === "Review Loan Requests"
                                  ? "/admin/dashboard/loans"
                                  : "/admin/dashboard/transactions",
                            )
                        : label === "View All Transactions"
                          ? router.push("/admin/dashboard/transactions")
                          : router.push(
                              label === "Apply for a Loan"
                                ? "/admin/dashboard/loans"
                                : label === "Request a Withdrawal"
                                  ? "/admin/dashboard/short-term"
                                  : "/admin/dashboard/long-term",
                            )
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
                  Your cooperative account is also your first step into Remote
                  Agric. Discover the people and opportunities behind our
                  agricultural community.
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
        <footer className="dash-footer">
          <span>© 2026 Remote Agric Cooperative</span>
          <span>Growing a stronger future, together.</span>
        </footer>
      </main>
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
    </>
  );
}
