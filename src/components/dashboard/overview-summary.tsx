import Link from "next/link";
import { currency, type Summary } from "@/lib/finance";
export function OverviewSummary({
  admin,
  summary,
}: {
  admin: boolean;
  summary: Summary | null;
}) {
  const prefix = admin ? "/admin/dashboard" : "/dashboard";
  const cards = admin
    ? ([
        ["Loan requests awaiting review", summary?.operations?.pendingLoans],
        ["Payment exceptions", summary?.operations?.paymentExceptions],
        ["Pending withdrawals", summary?.pendingWithdrawals],
        ["Active loan outstanding", summary?.loanOutstanding],
      ] as const)
    : ([
        ["My long-term contributions", summary?.longTerm],
        ["Available savings", summary?.available],
        ["Loan outstanding", summary?.loanOutstanding],
        ["Estimated pool share", summary?.estimatedShare],
      ] as const);
  return (
    <>
      <div className="fin-stats">
        {cards.map(([label, amount]) => (
          <article className="fin-stat" key={label}>
            <span>{label}</span>
            <strong>
              {amount == null
                ? "Unavailable"
                : admin &&
                    (label === "Loan requests awaiting review" ||
                      label === "Payment exceptions")
                  ? String(amount)
                  : currency(amount)}
            </strong>
            <small>As of latest confirmed records</small>
          </article>
        ))}
      </div>
      <nav
        className="fin-quick-actions"
        aria-label={admin ? "Admin operations" : "Quick actions"}
      >
        {(admin
          ? [
              ["Review loans", "loans"],
              ["Manage members", "members"],
              ["Value long-term pool", "long-term"],
              ["Monitor withdrawals", "short-term"],
            ]
          : [
              ["Contribute long-term", "long-term"],
              ["Add funds / withdraw", "short-term"],
              ["Apply for a loan", "loans"],
              ["How it works", "how-it-works"],
            ]
        ).map(([label, path]) => (
          <Link className="fin-secondary" href={`${prefix}/${path}`} key={path}>
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
