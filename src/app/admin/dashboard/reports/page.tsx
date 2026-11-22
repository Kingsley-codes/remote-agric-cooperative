"use client";

import {
  Glyph,
  money,
  transactions,
} from "@/components/dashboard/dashboard-ui";

export default function ReportsPage() {
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

  return (
    <main className="dash-content">
      <div className="dash-page-heading">
        <div>
          <p className="dash-breadcrumb">Admin / Reports</p>
          <h1>Reports &amp; exports</h1>
          <p className="dash-subtitle">
            Cooperative activity and downloadable reports.
          </p>
        </div>
      </div>
      <section className="dash-panel dash-section-panel">
        <span className="dash-demo-tag">Sample report</span>
        <h2>Cooperative activity report</h2>
        <p>October 2026 · Contributions, withdrawals and loan activity.</p>
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
    </main>
  );
}
