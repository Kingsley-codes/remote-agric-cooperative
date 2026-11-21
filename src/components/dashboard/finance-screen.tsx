"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Glyph } from "./dashboard-ui";
import {
  categoryLabels,
  currency,
  financeDate,
  financeRequest,
  statusLabel,
  type Eligibility,
  type FinanceList,
  type FinanceRecord,
  type Summary,
} from "@/lib/finance";
import "./finance.css";

const titles: Record<string, string> = {
  "Long-term Contributions": "Long-term pool",
  "Short-term Contributions": "Short-term savings",
  Transactions: "Transactions",
  Loans: "Loans",
  "Loan Requests": "Loans & applications",
};
const descriptions: Record<string, string> = {
  "Long-term Contributions":
    "Build your stake in a shared agricultural future.",
  "Short-term Contributions":
    "Flexible contributions. A clear view of your savings.",
  Transactions: "Every payment, in one clear record.",
  Loans: "Your borrowing, applications and repayments, together.",
  "Loan Requests":
    "Review applications and follow each loan through repayment.",
};

function Status({ value }: { value: string }) {
  return (
    <span className={`fin-status fin-status-${value}`}>
      <i />
      {statusLabel(value)}
    </span>
  );
}
function Stat({
  label,
  value,
  note,
  icon = "wallet",
}: {
  label: string;
  value: string;
  note: string;
  icon?: string;
}) {
  return (
    <article className="fin-stat">
      <div>
        <span>{label}</span>
        <span className="fin-stat-icon text-brand-content">
          <Glyph name={icon} />
        </span>
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}
function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function FinanceScreen({
  view,
  admin = false,
}: {
  view: string;
  admin?: boolean;
}) {
  const longTerm = view === "Long-term Contributions";
  const contributions = longTerm || view === "Short-term Contributions";
  const loans = view === "Loans" || view === "Loan Requests";
  const prefix = admin ? "/admin/finance" : "/finance";
  const [history, setHistory] = useState("contributions");
  const kind =
    contributions && history === "contributions"
      ? "contributions"
      : loans
        ? "loans"
        : "transactions";
  const type = longTerm ? "long_term" : "short_term";
  const [summary, setSummary] = useState<Summary | null>(null);
  const [list, setList] = useState<FinanceList | null>(null);
  const [eligibility, setEligibility] = useState<Eligibility | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
    from: "",
    to: "",
    reconciliation: "",
    memberId: "",
    page: 1,
  });
  const [refresh, setRefresh] = useState(0);
  const [selection, setSelection] = useState<FinanceRecord | null>(null);
  const [mode, setMode] = useState<
    | "contribute"
    | "apply"
    | "repay"
    | "details"
    | "eligibility"
    | "withdraw"
    | "bank"
    | null
  >(null);
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("6");
  const [purpose, setPurpose] = useState("");
  const [consent, setConsent] = useState(false);
  const [review, setReview] = useState(false);
  const [formError, setFormError] = useState("");
  const [reason, setReason] = useState("");
  const [memberId, setMemberId] = useState("");
  const [investment, setInvestment] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState<{
    enabled: boolean;
    destination: { name: string; last4: string; bankCode: string } | null;
    fee: number;
    timing: string;
  } | null>(null);
  const [banks, setBanks] = useState<{ name: string; code: string }[]>([]);
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const requestKey = useRef("");
  const dialog = useRef<HTMLDialogElement>(null);
  const amountKobo = Math.round(Number(amount) * 100);
  const fee = Math.ceil(
    (amountKobo * (eligibility?.policy.flatFeeBps ?? 0)) / 10000,
  );
  const query = new URLSearchParams(
    Object.entries({
      ...filters,
      ...(contributions && history === "contributions"
        ? { type }
        : contributions
          ? { category: "withdrawal" }
          : {}),
    })
      .filter(([, value]) => value !== "")
      .map(([key, value]) => [key, String(value)]),
  ).toString();

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const [records, totals, eligible, payout] = await Promise.all([
          financeRequest<FinanceList>(`${prefix}/${kind}?${query}`),
          financeRequest<Summary>(`${prefix}/summary`),
          loans && !admin
            ? financeRequest<Eligibility>("/finance/eligibility")
            : Promise.resolve(null),
          !admin && (loans || (contributions && !longTerm))
            ? financeRequest<NonNullable<typeof destination>>(
                "/finance/destination",
              )
            : Promise.resolve(null),
        ]);
        if (active) {
          setList(records);
          setSummary(totals);
          setEligibility(eligible);
          setDestination(payout);
          setError("");
        }
      } catch (err) {
        if (active)
          setError(
            err instanceof Error
              ? err.message
              : "Could not load your financial records.",
          );
      } finally {
        if (active) setLoading(false);
      }
    }, 250);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [prefix, kind, query, refresh, loans, admin, contributions, longTerm]);

  const verify = useCallback(
    async (reference: string) => {
      setBusy(true);
      setError("");
      try {
        const record = await financeRequest<FinanceRecord>(
          `${prefix}/payments/${encodeURIComponent(reference)}/verify`,
          {},
        );
        setNotice(
          record.status === "successful"
            ? "Payment confirmed. Your records have been updated."
            : `Payment ${statusLabel(record.status).toLowerCase()}. Only confirmed payments affect your balance.`,
        );
        setSelection(record);
        setRefresh((value) => value + 1);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not verify payment.",
        );
      } finally {
        setBusy(false);
      }
    },
    [prefix],
  );

  useEffect(() => {
    if (admin) return;
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const reference = params.get("reference") ?? params.get("trxref");
      if (!reference) return;
      params.delete("reference");
      params.delete("trxref");
      params.set("view", "Transactions");
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params}`,
      );
      void verify(reference);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [admin, verify]);

  function open(
    next: NonNullable<typeof mode>,
    record: FinanceRecord | null = null,
  ) {
    setMode(next);
    setSelection(record);
    setReview(false);
    setFormError("");
    setReason("");
    setConsent(false);
    setAmount("");
    setPurpose("");
    setMonths(String(Math.min(6, eligibility?.policy.maxMonths ?? 6)));
    if (next === "eligibility") {
      setMemberId("");
      setInvestment("");
      setSource("");
    }
    requestKey.current = crypto.randomUUID();
    dialog.current?.showModal();
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!review && mode !== "eligibility" && mode !== "bank") {
      setReview(true);
      return;
    }
    setBusy(true);
    setFormError("");
    try {
      if (mode === "bank") {
        await financeRequest("/finance/destination", {
          bankCode,
          accountNumber,
        });
        setNotice("Payout account verified and saved.");
      } else if (mode === "withdraw") {
        const record = await financeRequest<FinanceRecord>(
          "/finance/withdrawals",
          { amount: amountKobo },
          requestKey.current,
        );
        setNotice(
          `Withdrawal ${statusLabel(record.status).toLowerCase()}. Reference: ${record.reference}. Funds remain reserved until confirmation.`,
        );
      } else if (mode === "apply") {
        await financeRequest("/finance/loans", {
          amount: amountKobo,
          months: Number(months),
          purpose,
          consent,
          termsVersion: eligibility?.policy.termsVersion,
        });
        setNotice(
          "Application submitted for review. Approval and disbursement are separate steps.",
        );
      } else if (mode === "eligibility") {
        await financeRequest("/admin/finance/eligibility", {
          memberId,
          investmentValue: Math.round(Number(investment) * 100),
          maximum: amountKobo,
          source,
        });
        setNotice(
          "Investment eligibility verified for 24 hours. The evidence and decision have been recorded.",
        );
      } else {
        const path =
          mode === "repay"
            ? `/finance/loans/${selection?._id}/repay`
            : "/finance/contributions";
        const payment = await financeRequest<{
          checkoutUrl?: string;
          reference: string;
          status: string;
        }>(
          path,
          { amount: amountKobo, ...(mode === "contribute" ? { type } : {}) },
          requestKey.current,
        );
        if (payment.checkoutUrl) {
          window.location.assign(payment.checkoutUrl);
          return;
        }
        setNotice(
          `Payment ${payment.reference}: ${statusLabel(payment.status)}.`,
        );
      }
      dialog.current?.close();
      setRefresh((value) => value + 1);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Unable to submit. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function decide(decision: "approve" | "reject") {
    if (!selection) return;
    if (reason.trim().length < 5) {
      setFormError("Enter a decision reason of at least five characters.");
      return;
    }
    setBusy(true);
    setFormError("");
    try {
      await financeRequest(`${prefix}/loans/${selection._id}/decision`, {
        decision,
        reason,
      });
      dialog.current?.close();
      setNotice(
        decision === "approve"
          ? "Loan approved. Funds have not yet been disbursed."
          : "Application rejected. Your reason has been recorded.",
      );
      setRefresh((value) => value + 1);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Unable to record decision.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function setupBank() {
    setBusy(true);
    setError("");
    try {
      setBanks(
        await financeRequest<{ name: string; code: string }[]>(
          "/finance/banks",
        ),
      );
      open("bank");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load banks.");
    } finally {
      setBusy(false);
    }
  }
  async function disburse() {
    if (!selection) return;
    setBusy(true);
    setFormError("");
    try {
      await financeRequest(`${prefix}/loans/${selection._id}/disburse`, {});
      dialog.current?.close();
      setNotice(
        "Disbursement submitted. It remains pending until Paystack confirms the payout.",
      );
      setRefresh((value) => value + 1);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Could not submit disbursement.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function verifyPayout(reference: string) {
    setBusy(true);
    setError("");
    try {
      const record = await financeRequest<FinanceRecord>(
        `${prefix}/payouts/${encodeURIComponent(reference)}/verify`,
        {},
      );
      setNotice(`Payout ${statusLabel(record.status).toLowerCase()}.`);
      setRefresh((value) => value + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not check payout.");
    } finally {
      setBusy(false);
    }
  }
  async function retryPayout() {
    if (!selection?.reference || reason.trim().length < 5) {
      setFormError("Enter a retry reason of at least five characters.");
      return;
    }
    setBusy(true);
    setFormError("");
    try {
      await financeRequest(`${prefix}/payouts/${selection.reference}/retry`, {
        decision: "approve",
        reason,
      });
      dialog.current?.close();
      setNotice(
        "Payout retried using its original reference. Check its status before taking further action.",
      );
      setRefresh((value) => value + 1);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Could not retry payout.",
      );
    } finally {
      setBusy(false);
    }
  }
  function filter(key: keyof typeof filters, value: string) {
    setLoading(true);
    setFilters((current) => ({ ...current, [key]: value, page: 1 }));
  }
  const total = (status: string) =>
    list?.totals.find((row) => row._id === status)?.amount ?? 0;
  const count = (status: string) =>
    list?.totals.find((row) => row._id === status)?.count ?? 0;
  const value = (n: number | undefined) =>
    summary && !error && !loading ? currency(n ?? 0) : "—";
  const outstanding = summary?.loanOutstanding ?? 0;
  const noData = !list || error !== "" || loading;

  return (
    <main className="dash-content fin-screen">
      <div className="fin-heading">
        <div>
          <p className="fin-eyebrow">
            {admin ? "Cooperative operations" : "Member workspace"}{" "}
            <span>/</span>{" "}
            {contributions ? "Contributions" : loans ? "Borrowing" : "Activity"}
          </p>
          <h1>{titles[view]}</h1>
          <p>
            {admin && contributions
              ? `Manage ${longTerm ? "long-term" : "short-term"} contributions across the cooperative.`
              : descriptions[view]}
          </p>
        </div>
        <div className="fin-heading-actions">
          {!admin && contributions && (
            <button className="fin-primary" onClick={() => open("contribute")}>
              <Glyph name="plus" />
              {longTerm ? "Make a contribution" : "Add funds"}
            </button>
          )}
          {!admin && contributions && !longTerm && (
            <button
              className="fin-secondary"
              disabled={!destination?.enabled || busy}
              onClick={() =>
                destination?.destination ? open("withdraw") : void setupBank()
              }
            >
              Request withdrawal
            </button>
          )}
          {!admin && loans && (
            <button
              className="fin-primary"
              disabled={
                !eligibility?.snapshot || !eligibility.policy.enabled || loading
              }
              onClick={() => open("apply")}
            >
              <Glyph name="plus" />
              Apply for a loan
            </button>
          )}
          {admin && loans && (
            <button
              className="fin-secondary"
              onClick={() => open("eligibility")}
            >
              <Glyph name="check" />
              Verify eligibility
            </button>
          )}
          {!contributions && !loans && (
            <button
              className="fin-secondary"
              disabled={loading || busy}
              onClick={() => {
                setLoading(true);
                setRefresh((value) => value + 1);
              }}
            >
              <Glyph name="document" />
              Refresh records
            </button>
          )}
        </div>
      </div>
      {notice && (
        <div className="fin-notice" role="status">
          <Glyph name="check" />
          <p>{notice}</p>
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            ×
          </button>
        </div>
      )}
      {error && (
        <div className="fin-error" role="alert">
          <p>{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setRefresh((value) => value + 1);
            }}
          >
            Try again
          </button>
        </div>
      )}
      {contributions ? (
        <>
          <div className="fin-stats">
            {admin ? (
              <>
                <Stat
                  icon="check"
                  label="Confirmed contributions"
                  value={value(total("successful"))}
                  note="Successful deposits - selected filters"
                />
                <Stat
                  icon="document"
                  label="Pending contributions"
                  value={value(total("pending"))}
                  note="Awaiting payment confirmation - selected filters"
                />
                <Stat
                  icon="close"
                  label="Failed contributions"
                  value={noData ? "—" : String(count("failed"))}
                  note="Unsuccessful attempts - selected filters"
                />
                <Stat
                  icon="document"
                  label="Reversed contributions"
                  value={value(total("reversed"))}
                  note="Reversed deposits - selected filters"
                />
              </>
            ) : (
              <>
                <Stat
                  icon={longTerm ? "sprout" : "wallet"}
                  label={
                    admin
                      ? "Confirmed contributions"
                      : longTerm
                        ? "My confirmed contributions"
                        : "Available savings"
                  }
                  value={value(
                    admin
                      ? total("successful")
                      : longTerm
                        ? summary?.longTerm
                        : summary?.available,
                  )}
                  note={
                    admin
                      ? "Successful deposits · selected filters"
                      : longTerm
                        ? "Successful deposits into your long-term pool"
                        : "Confirmed funds, less reserved and completed withdrawals"
                  }
                />
                <Stat
                  icon="document"
                  label={
                    longTerm
                      ? "Contributions awaiting payment"
                      : "Pending withdrawals"
                  }
                  value={value(
                    longTerm ? total("pending") : summary?.pendingWithdrawals,
                  )}
                  note={
                    longTerm
                      ? "Not included in confirmed contributions"
                      : "Reserved while payout confirmation is pending"
                  }
                />
                <Stat
                  icon="coins"
                  label={
                    longTerm ? "Estimated share value" : "Total contributed"
                  }
                  value={
                    longTerm
                      ? "Unavailable"
                      : value(admin ? total("successful") : summary?.shortTerm)
                  }
                  note={
                    longTerm
                      ? "An approved allocation is required"
                      : "All confirmed short-term contributions"
                  }
                />
                <Stat
                  icon="document"
                  label={longTerm ? "Minimum lock-in" : "Completed withdrawals"}
                  value={
                    longTerm ? "5 years" : value(summary?.completedWithdrawals)
                  }
                  note={
                    longTerm
                      ? "Start date and release rules follow final terms"
                      : "Payouts confirmed as completed"
                  }
                />
              </>
            )}
          </div>
          <div className="fin-context-grid">
            <section className="fin-context">
              <span className="fin-context-icon text-brand-content">
                <Glyph name={longTerm ? "sprout" : "wallet"} />
              </span>
              <div>
                <h2>
                  {longTerm
                    ? "A longer view. A shared future."
                    : "Savings that follow your pace."}
                </h2>
                <p>
                  {longTerm
                    ? "Your contributions form part of the cooperative’s agricultural pool. Asset values may rise or fall; contributions and investment returns are reported separately."
                    : "Contribute whenever it suits you. Pending payments stay separate from your available savings until they are confirmed."}
                </p>
              </div>
            </section>
            <aside className="fin-terms">
              <span className="fin-eyebrow">
                {longTerm ? "Before you contribute" : "Accessing your savings"}
              </span>
              <h2>
                {longTerm
                  ? "Built for long-term commitment"
                  : "Withdrawals & availability"}
              </h2>
              <p>
                {longTerm
                  ? "Plan for a minimum five-year commitment. Your accepted terms govern lock-in dates and release conditions. There is no guaranteed return."
                  : "Withdrawal requests must pass balance, bank account and liquidity checks. Availability and fees will be shown before confirmation."}
              </p>
              {!longTerm && (
                <>
                  {!destination?.enabled ? (
                    <span className="fin-muted">
                      Withdrawals will be available when payouts are enabled.
                    </span>
                  ) : (
                    <div className="fin-destination">
                      <span>
                        {destination.destination
                          ? `${destination.destination.name} - **** ${destination.destination.last4}`
                          : "Add a verified bank account to receive payouts."}
                      </span>
                      <button disabled={busy} onClick={() => void setupBank()}>
                        {destination.destination
                          ? "Update bank account"
                          : "Set payout account"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </aside>
          </div>
        </>
      ) : loans ? (
        <>
          <div className="fin-stats">
            <Stat
              icon="loan"
              label={
                admin ? "Active outstanding balance" : "Outstanding balance"
              }
              value={
                noData
                  ? "—"
                  : currency(
                      admin
                        ? (list?.totals.find((row) => row._id === "active")
                            ?.outstanding ?? 0)
                        : outstanding,
                    )
              }
              note={
                admin
                  ? "Active loans · selected filters"
                  : "Principal and fees less confirmed repayments"
              }
            />
            <Stat
              icon="document"
              label="Applications in review"
              value={noData ? "—" : String(count("pending_review"))}
              note="Awaiting an administrator’s decision"
            />
            <Stat
              icon="check"
              label={admin ? "Approved principal" : "Amount repaid"}
              value={
                noData
                  ? "—"
                  : currency(
                      admin ? total("approved") : (summary?.loanRepaid ?? 0),
                    )
              }
              note={
                admin
                  ? "Approved, awaiting disbursement"
                  : "Confirmed repayments on your active loan"
              }
            />
            <Stat
              icon="wallet"
              label={admin ? "Repaid loans" : "Maximum eligible request"}
              value={
                noData
                  ? "—"
                  : admin
                    ? String(count("repaid"))
                    : eligibility?.snapshot
                      ? currency(eligibility.snapshot.maximum)
                      : "Unavailable"
              }
              note={
                admin
                  ? "Loans paid in full · selected filters"
                  : "Based on a current verified investment assessment"
              }
            />
          </div>
          {!admin && (
            <section className="fin-eligibility">
              <div>
                <span className="fin-eyebrow">Your eligibility</span>
                <h2>
                  {eligibility?.snapshot && eligibility.policy.enabled
                    ? "Your investment assessment is ready"
                    : "Eligibility must be verified before you apply"}
                </h2>
                <p>
                  {eligibility?.snapshot
                    ? `Verified investment basis: ${currency(eligibility.snapshot.investmentValue)}. Assessment valid until ${financeDate(eligibility.snapshot.expiresAt)}.`
                    : "A current Remote Agric investment assessment determines your request limit. Contact the cooperative to verify your eligibility."}
                </p>
              </div>
              <dl>
                <Detail label="Loan fee">
                  {eligibility?.policy.enabled
                    ? `${eligibility.policy.flatFeeBps / 100}% flat fee`
                    : "Terms not yet published"}
                </Detail>
                <Detail label="Repayment period">
                  {eligibility?.policy.enabled
                    ? `Up to ${eligibility.policy.maxMonths} months`
                    : "Available with published terms"}
                </Detail>
              </dl>
            </section>
          )}
          {!admin && destination?.enabled && (
            <div className="fin-destination">
              <span>
                {destination.destination
                  ? `Payout account: ${destination.destination.name} - **** ${destination.destination.last4}`
                  : "A verified payout account is needed before loan disbursement."}
              </span>
              <button disabled={busy} onClick={() => void setupBank()}>
                {destination.destination
                  ? "Update bank account"
                  : "Set payout account"}
              </button>
            </div>
          )}
          <section className="fin-journey" aria-label="Loan process">
            {[
              "Apply",
              "Admin review",
              "Approval",
              "Disbursement",
              "Repayment",
            ].map((label, index) => (
              <div key={label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {label}
              </div>
            ))}
          </section>
        </>
      ) : (
        <div className="fin-stats">
          <Stat
            label="Successful payment volume"
            value={noData ? "—" : currency(total("successful"))}
            note="Successful ledger entries · selected filters"
            icon="check"
          />
          <Stat
            label="Pending payments"
            value={noData ? "—" : currency(total("pending"))}
            note="Awaiting authoritative confirmation"
            icon="document"
          />
          <Stat
            label="Failed payments"
            value={noData ? "—" : String(count("failed"))}
            note="No funds credited for these payments"
            icon="close"
          />
          <Stat
            label="Records found"
            value={noData ? "—" : String(list.total)}
            note="Across your selected categories and dates"
            icon="document"
          />
        </div>
      )}

      <section className="fin-ledger" aria-busy={loading}>
        <div className="fin-section-heading">
          <div>
            <h2>
              {contributions
                ? history === "withdrawals"
                  ? "Withdrawal history"
                  : "Contribution history"
                : loans
                  ? admin
                    ? "Loan review queue"
                    : "Your loans & applications"
                  : admin
                    ? "Cooperative transaction ledger"
                    : "Your transaction ledger"}
            </h2>
            <p>
              {contributions
                ? history === "withdrawals"
                  ? "Withdrawal requests and confirmed payouts, kept separate from deposits."
                  : "Each contribution, its payment reference and confirmation status."
                : loans
                  ? "Approval is a decision. Disbursement confirms that funds have been sent."
                  : "Search by reference and filter by category, status or date."}
            </p>
          </div>
          <span className="fin-count">{list?.total ?? "—"} records</span>
        </div>
        {contributions && !longTerm && (
          <div className="fin-history-tabs" aria-label="Savings history">
            {["contributions", "withdrawals"].map((tab) => (
              <button
                key={tab}
                aria-pressed={history === tab}
                onClick={() => {
                  setLoading(true);
                  setHistory(tab);
                  setFilters((current) => ({
                    ...current,
                    page: 1,
                    status: "",
                  }));
                }}
              >
                {statusLabel(tab)}
              </button>
            ))}
          </div>
        )}
        <div className="fin-filters">
          <label className="fin-search">
            <span>Search {loans ? "member ID" : "reference"}</span>
            <div>
              <Glyph name="search" />
              <input
                value={filters.search}
                onChange={(e) => filter("search", e.target.value)}
                placeholder={loans ? "Member ID" : "Payment reference…"}
                maxLength={100}
              />
            </div>
          </label>
          <label>
            <span>Status</span>
            <select
              value={filters.status}
              onChange={(e) => filter("status", e.target.value)}
            >
              <option value="">All statuses</option>
              {(loans
                ? [
                    "pending_review",
                    "approved",
                    "rejected",
                    "disbursement_pending",
                    "active",
                    "repaid",
                  ]
                : ["successful", "pending", "failed", "reversed"]
              ).map((status) => (
                <option key={status} value={status}>
                  {statusLabel(status)}
                </option>
              ))}
            </select>
          </label>
          {!loans && !contributions && (
            <label>
              <span>Category</span>
              <select
                value={filters.category}
                onChange={(e) => filter("category", e.target.value)}
              >
                <option value="">All categories</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label>
            <span>From</span>
            <input
              type="date"
              value={filters.from}
              onChange={(e) => filter("from", e.target.value)}
              max={filters.to || undefined}
            />
          </label>
          <label>
            <span>To</span>
            <input
              type="date"
              value={filters.to}
              onChange={(e) => filter("to", e.target.value)}
              min={filters.from || undefined}
            />
          </label>
          {admin && (
            <label>
              <span>Member ID</span>
              <input
                value={filters.memberId}
                onChange={(e) => filter("memberId", e.target.value)}
                placeholder="Exact member ID"
              />
            </label>
          )}
          {admin && !loans && (
            <label>
              <span>Reconciliation</span>
              <select
                value={filters.reconciliation}
                onChange={(e) => filter("reconciliation", e.target.value)}
              >
                <option value="">All records</option>
                {["unmatched", "matched", "needs_review"].map((value) => (
                  <option key={value} value={value}>
                    {statusLabel(value)}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        <div className="fin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>{loans ? "Loan reference" : "Date & reference"}</th>
                {admin && <th>Member</th>}
                <th>
                  {loans
                    ? "Purpose / term"
                    : contributions
                      ? "Plan"
                      : "Category"}
                </th>
                <th className="fin-numeric">
                  {loans ? "Principal" : "Amount"}
                </th>
                <th>Status</th>
                <th>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }, (_, i) => (
                  <tr key={i}>
                    <td colSpan={admin ? 6 : 5}>
                      <div className="fin-skeleton" />
                    </td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={admin ? 6 : 5}>
                    <div className="fin-empty">
                      <Glyph name="document" />
                      <h3>Records could not be loaded</h3>
                      <p>Use “Try again” above to reconnect.</p>
                    </div>
                  </td>
                </tr>
              ) : list?.items.length ? (
                list.items.map((row) => (
                  <tr key={row._id}>
                    <td data-label={loans ? "Loan" : "Date & reference"}>
                      <strong>
                        {loans
                          ? `LOAN-${row._id.slice(-8).toUpperCase()}`
                          : financeDate(row.createdAt)}
                      </strong>
                      <small className="fin-reference">
                        {loans ? financeDate(row.createdAt) : row.reference}
                      </small>
                    </td>
                    {admin && (
                      <td data-label="Member">
                        <span className="fin-reference">{row.memberId}</span>
                      </td>
                    )}
                    <td data-label={loans ? "Purpose" : "Category"}>
                      {loans ? (
                        <>
                          <span className="fin-purpose">{row.purpose}</span>
                          <small>{row.months} monthly installments</small>
                        </>
                      ) : (
                        (categoryLabels[row.type ?? row.category ?? ""] ??
                        "Payment")
                      )}
                    </td>
                    <td data-label="Amount" className="fin-numeric">
                      <strong>{currency(row.amount)}</strong>
                      {loans && (
                        <small>
                          {currency(
                            (row.totalDue ?? 0) - (row.repaidAmount ?? 0),
                          )}{" "}
                          outstanding
                        </small>
                      )}
                    </td>
                    <td data-label="Status">
                      <Status value={row.status} />
                      {row.status === "active" &&
                        row.schedule?.some(
                          (entry, index, all) =>
                            new Date(entry.dueAt).getTime() <
                              new Date(list?.asOf ?? "1970-01-01").getTime() &&
                            all
                              .slice(0, index + 1)
                              .reduce((sum, item) => sum + item.amount, 0) >
                              (row.repaidAmount ?? 0),
                        ) && (
                          <small className="fin-overdue">
                            Repayment overdue
                          </small>
                        )}
                    </td>
                    <td>
                      <button
                        className="fin-row-link"
                        onClick={() => open("details", row)}
                      >
                        {admin && row.status === "pending_review"
                          ? "Review"
                          : "View details"}
                        <Glyph name="arrow" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={admin ? 6 : 5}>
                    <div className="fin-empty">
                      <span className="fin-empty-icon text-brand-content">
                        <Glyph
                          name={
                            contributions
                              ? "sprout"
                              : loans
                                ? "loan"
                                : "document"
                          }
                        />
                      </span>
                      <h3>
                        {Object.values(filters).some(
                          (value) => value !== "" && value !== 1,
                        )
                          ? "No records match these filters"
                          : contributions
                            ? history === "withdrawals"
                              ? "No withdrawal requests yet"
                              : "Your contributions begin here"
                            : loans
                              ? "No loan applications yet"
                              : "A clear record, from your first payment"}
                      </h3>
                      <p>
                        {contributions
                          ? history === "withdrawals"
                            ? "Your withdrawal requests and their payout status will appear here."
                            : "Contributions will appear here when you start a payment. Only successful payments count toward your savings."
                          : loans
                            ? "Applications, decisions and repayment details will appear here."
                            : "Your contributions, withdrawals and loan payments will appear here."}
                      </p>
                      {!admin &&
                        contributions &&
                        history === "contributions" && (
                          <button
                            className="fin-secondary"
                            onClick={() => open("contribute")}
                          >
                            Make your first contribution <Glyph name="plus" />
                          </button>
                        )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="fin-pagination">
          <span>
            {list?.total
              ? `${(filters.page - 1) * 20 + 1}–${Math.min(filters.page * 20, list.total)} of ${list.total}`
              : "0 records"}{" "}
            <span className="fin-muted">· Dates in WAT</span>
          </span>
          <div>
            <button
              disabled={filters.page === 1 || loading}
              onClick={() => {
                setLoading(true);
                setFilters((current) => ({
                  ...current,
                  page: current.page - 1,
                }));
              }}
            >
              Previous
            </button>
            <button
              disabled={!list || filters.page * 20 >= list.total || loading}
              onClick={() => {
                setLoading(true);
                setFilters((current) => ({
                  ...current,
                  page: current.page + 1,
                }));
              }}
            >
              Next
            </button>
          </div>
        </div>
      </section>
      {contributions && longTerm && (
        <section className="fin-pool">
          <div>
            <span className="fin-eyebrow">
              Cooperative-wide · long-term pool
            </span>
            <h2>A shared pool. Transparent reporting.</h2>
            <p>
              Aggregate figures only. Your personal contributions are shown
              above.
            </p>
          </div>
          <dl>
            <Detail label="Confirmed contributed capital">
              {value(summary?.poolCapital)}
            </Detail>
            <Detail label="Latest approved asset value">
              {summary?.valuation
                ? currency(summary.valuation.assetValue)
                : "Not yet reported"}
            </Detail>
            <Detail label="Valuation date">
              {summary?.valuation
                ? financeDate(summary.valuation.valuedAt)
                : "Awaiting approved valuation"}
            </Detail>
          </dl>
        </section>
      )}
      <p className="fin-asof">
        {summary
          ? `Figures updated ${financeDate(summary.asOf)} · WAT`
          : "Figures are shown when the service is available."}{" "}
        ·{" "}
        {admin
          ? "Authorized cooperative records"
          : "Your financial records are private"}
      </p>

      <dialog
        className="fin-dialog"
        ref={dialog}
        onCancel={(event) => {
          if (busy) event.preventDefault();
        }}
        aria-labelledby="fin-dialog-title"
      >
        <div className="fin-dialog-heading">
          <div>
            <span className="fin-eyebrow">
              {mode === "details"
                ? "Record details"
                : review
                  ? "Review & confirm"
                  : "Your next step"}
            </span>
            <h2 id="fin-dialog-title">
              {mode === "details"
                ? loans
                  ? "Loan details"
                  : contributions
                    ? "Contribution details"
                    : "Transaction details"
                : mode === "apply"
                  ? "Apply for a loan"
                  : mode === "repay"
                    ? "Make a repayment"
                    : mode === "eligibility"
                      ? "Verify investment eligibility"
                      : mode === "withdraw"
                        ? "Request a withdrawal"
                        : mode === "bank"
                          ? "Your payout account"
                          : longTerm
                            ? "Contribute to the long-term pool"
                            : "Add to your savings"}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            disabled={busy}
            onClick={() => dialog.current?.close()}
          >
            <Glyph name="close" />
          </button>
        </div>
        {formError && (
          <p className="fin-form-error" role="alert">
            {formError}
          </p>
        )}
        {mode === "details" && selection ? (
          <>
            <div className="fin-detail-amount">
              <strong>{currency(selection.amount)}</strong>
              <Status value={selection.status} />
            </div>
            <dl className="fin-details">
              <Detail label="Reference">
                {selection.reference ??
                  `LOAN-${selection._id.slice(-8).toUpperCase()}`}
              </Detail>
              <Detail label="Created">
                {financeDate(selection.createdAt)}
              </Detail>
              {admin && <Detail label="Member ID">{selection.memberId}</Detail>}
              {loans ? (
                <>
                  <Detail label="Purpose">{selection.purpose}</Detail>
                  <Detail label="Term">{selection.months} months</Detail>
                  <Detail label="Fee">{currency(selection.fee ?? 0)}</Detail>
                  <Detail label="Total repayment">
                    {currency(selection.totalDue ?? 0)}
                  </Detail>
                  <Detail label="Confirmed repaid">
                    {currency(selection.repaidAmount ?? 0)}
                  </Detail>
                  <Detail label="Outstanding">
                    {currency(
                      (selection.totalDue ?? 0) - (selection.repaidAmount ?? 0),
                    )}
                  </Detail>
                  <Detail label="Pending repayment payments">
                    {currency(selection.reservedRepayment ?? 0)}
                  </Detail>
                  <Detail label="Accepted terms">
                    {selection.termsVersion} ·{" "}
                    {financeDate(selection.consentAt)}
                  </Detail>
                  {selection.eligibility && (
                    <>
                      <Detail label="Verified investment value">
                        {currency(selection.eligibility.investmentValue)}
                      </Detail>
                      <Detail label="Assessed request limit">
                        {currency(selection.eligibility.maximum)}
                      </Detail>
                      {admin && (
                        <Detail label="Investment evidence">
                          {selection.eligibility.source}
                        </Detail>
                      )}
                    </>
                  )}
                  {selection.decision && (
                    <Detail label="Decision notes">
                      {selection.decision.reason}
                    </Detail>
                  )}
                </>
              ) : (
                <>
                  <Detail label="Category">
                    {categoryLabels[selection.type ?? selection.category ?? ""]}
                  </Detail>
                  <Detail label="Confirmed on">
                    {financeDate(selection.paidAt)}
                  </Detail>
                  <Detail label="Reconciliation">
                    {statusLabel(
                      selection.reconciliation ??
                        (selection.status === "successful"
                          ? "matched"
                          : "unmatched"),
                    )}
                  </Detail>
                  {selection.linkedId && (
                    <Detail label="Related record">{selection.linkedId}</Detail>
                  )}
                </>
              )}
            </dl>
            <p className="fin-detail-note">
              {selection.status === "pending"
                ? "We are waiting for payment confirmation. This payment has not been credited."
                : selection.status === "approved"
                  ? "Your loan has been approved. Funds have not yet been disbursed."
                  : selection.status === "pending_review"
                    ? "This application is awaiting an administrator’s decision."
                    : selection.status === "failed"
                      ? "This payment did not complete. No funds have been credited."
                      : selection.status === "successful"
                        ? "This payment has been confirmed and recorded."
                        : `Current state: ${statusLabel(selection.status)}.`}
            </p>
            {selection.schedule && (
              <div className="fin-schedule">
                <h3>Repayment schedule</h3>
                {selection.schedule.map((entry, index, all) => {
                  const paid =
                    (selection.repaidAmount ?? 0) >=
                    all
                      .slice(0, index + 1)
                      .reduce((sum, item) => sum + item.amount, 0);
                  return (
                    <div key={entry.dueAt}>
                      <span>{financeDate(entry.dueAt)}</span>
                      <strong>{currency(entry.amount)}</strong>
                      <span>
                        {paid
                          ? "Paid"
                          : new Date(entry.dueAt).getTime() <
                              new Date(list?.asOf ?? "1970-01-01").getTime()
                            ? "Overdue"
                            : "Scheduled"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            {!loans &&
              selection.reference &&
              ["withdrawal", "loan_disbursement"].includes(
                selection.category ?? "",
              ) && (
                <button
                  className="fin-primary"
                  disabled={busy}
                  onClick={() => {
                    dialog.current?.close();
                    void verifyPayout(selection.reference!);
                  }}
                >
                  Check payout status
                </button>
              )}
            {admin &&
              !loans &&
              selection.status === "pending" &&
              ["withdrawal", "loan_disbursement"].includes(
                selection.category ?? "",
              ) && (
                <div className="fin-decision">
                  <label>
                    Retry reason
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      maxLength={1000}
                    />
                  </label>
                  <button
                    className="fin-secondary"
                    disabled={busy}
                    onClick={() => void retryPayout()}
                  >
                    Retry original payout
                  </button>
                  <p>
                    The original provider reference is preserved to prevent a
                    duplicate payout.
                  </p>
                </div>
              )}
            {!loans &&
              selection.status === "pending" &&
              selection.checkoutUrl && (
                <a className="fin-secondary" href={selection.checkoutUrl}>
                  Continue payment on Paystack
                </a>
              )}
            {!loans &&
              selection.status === "pending" &&
              selection.reference &&
              !["withdrawal", "loan_disbursement"].includes(
                selection.category ?? "",
              ) && (
                <button
                  className="fin-primary"
                  disabled={busy}
                  onClick={() => {
                    dialog.current?.close();
                    void verify(selection.reference!);
                  }}
                >
                  {busy ? "Checking…" : "Check payment status"}
                </button>
              )}
            {!admin && loans && selection.status === "active" && (
              <button
                className="fin-primary"
                disabled={
                  (selection.reservedRepayment ?? 0) >=
                  (selection.totalDue ?? 0) - (selection.repaidAmount ?? 0)
                }
                onClick={() => {
                  setMode("repay");
                  setAmount("");
                  setReview(false);
                  requestKey.current = crypto.randomUUID();
                }}
              >
                Make a repayment <Glyph name="arrow" />
              </button>
            )}
            {admin && loans && selection.status === "approved" && (
              <div className="fin-decision">
                <p>
                  Confirm disbursement of {currency(selection.amount)} to the
                  member’s verified bank account. This initiates a real payout.
                </p>
                <label className="fin-checkbox">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />{" "}
                  I have reviewed the approved amount and destination.
                </label>
                <button
                  className="fin-primary"
                  disabled={busy || !consent}
                  onClick={() => void disburse()}
                >
                  {busy ? "Submitting..." : "Confirm disbursement"}
                </button>
              </div>
            )}
            {admin && loans && selection.status === "pending_review" && (
              <div className="fin-decision">
                <label>
                  Decision reason
                  <textarea
                    minLength={5}
                    maxLength={1000}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Record your assessment and decision…"
                  />
                </label>
                <div>
                  <button
                    className="fin-secondary fin-danger"
                    disabled={busy}
                    onClick={() => void decide("reject")}
                  >
                    Reject application
                  </button>
                  <button
                    className="fin-primary"
                    disabled={busy}
                    onClick={() => void decide("approve")}
                  >
                    Approve application
                  </button>
                </div>
                <p>
                  Approving preserves the requested amount and accepted terms.
                  It does not disburse funds.
                </p>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={submit} className="fin-form">
            {review ? (
              <>
                <div className="fin-detail-amount">
                  <strong>{currency(amountKobo)}</strong>
                  <span>
                    {mode === "withdraw"
                      ? "Savings withdrawal"
                      : mode === "apply"
                        ? "Loan requested"
                        : mode === "repay"
                          ? "Loan repayment"
                          : longTerm
                            ? "Long-term contribution"
                            : "Short-term contribution"}
                  </span>
                </div>
                <dl className="fin-details">
                  <Detail label="Currency">Nigerian naira (NGN)</Detail>
                  {mode === "withdraw" ? (
                    <>
                      <Detail label="Destination">
                        {destination?.destination?.name} - ****{" "}
                        {destination?.destination?.last4}
                      </Detail>
                      <Detail label="Withdrawal fee">
                        {currency(destination?.fee ?? 0)}
                      </Detail>
                      <Detail label="Expected timing">
                        {destination?.timing}
                      </Detail>
                    </>
                  ) : mode === "apply" ? (
                    <>
                      <Detail label="Duration">{months} months</Detail>
                      <Detail label="Flat fee">{currency(fee)}</Detail>
                      <Detail label="Total to repay">
                        {currency(amountKobo + fee)}
                      </Detail>
                      <Detail label="Estimated monthly payment">
                        {currency(
                          Math.ceil((amountKobo + fee) / Number(months)),
                        )}
                      </Detail>
                      <Detail label="Repayment dates">
                        Monthly from confirmed disbursement
                      </Detail>
                      <Detail label="Terms version">
                        {eligibility?.policy.termsVersion}
                      </Detail>
                    </>
                  ) : (
                    <>
                      <Detail label="Payment method">
                        Paystack secure checkout
                      </Detail>
                      <Detail label="Cooperative collection fee">
                        {currency(0)}
                      </Detail>
                      <Detail label="Confirmation">
                        After verification by Paystack
                      </Detail>
                    </>
                  )}
                </dl>
                <p className="fin-detail-note">
                  {mode === "withdraw"
                    ? "Your funds will be reserved immediately. A pending payout is not a completed withdrawal. Do not submit a replacement while it is processing."
                    : mode === "apply"
                      ? "You are submitting an application for review. No funds are released at this step. Installments may differ by one kobo due to rounding."
                      : mode === "contribute" && longTerm
                        ? "Your contribution is subject to the long-term lock-in conditions in your accepted terms. Returns are not guaranteed."
                        : "You will continue to Paystack to complete payment. Your balance updates only after confirmation."}
                </p>
              </>
            ) : (
              <>
                {mode === "bank" && (
                  <>
                    <p>
                      Use an account in your membership name. We verify the
                      account with Paystack before saving it.
                    </p>
                    <label>
                      Bank
                      <select
                        required
                        value={bankCode}
                        onChange={(e) => setBankCode(e.target.value)}
                      >
                        <option value="">Select your bank</option>
                        {banks.map((bank) => (
                          <option key={bank.code} value={bank.code}>
                            {bank.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Account number
                      <input
                        required
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </label>
                  </>
                )}
                {mode === "eligibility" && (
                  <>
                    <p>
                      Verify against current Remote Agric investment evidence.
                      This assessment expires after 24 hours and is recorded in
                      the audit log.
                    </p>
                    <label>
                      Member ID
                      <input
                        required
                        pattern="[a-f0-9]{24}"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                      />
                    </label>
                    <label>
                      Verified investment value (NGN)
                      <input
                        required
                        type="number"
                        min="0.01"
                        step="0.01"
                        max="10000000000"
                        value={investment}
                        onChange={(e) => setInvestment(e.target.value)}
                      />
                    </label>
                    <label>
                      Evidence / source reference
                      <textarea
                        required
                        minLength={10}
                        maxLength={500}
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                      />
                    </label>
                  </>
                )}
                {mode !== "bank" && (
                  <label>
                    {mode === "eligibility"
                      ? "Maximum permitted request"
                      : "Amount"}{" "}
                    (NGN)
                    <div className="fin-amount-input">
                      <span>₦</span>
                      <input
                        autoFocus
                        required
                        type="number"
                        min={mode === "contribute" ? 100 : 1}
                        step="0.01"
                        max={
                          mode === "withdraw"
                            ? (summary?.available ?? 0) / 100
                            : mode === "apply"
                              ? (eligibility?.snapshot?.maximum ?? 0) / 100
                              : mode === "repay"
                                ? ((selection?.totalDue ?? 0) -
                                    (selection?.repaidAmount ?? 0) -
                                    (selection?.reservedRepayment ?? 0)) /
                                  100
                                : 10000000
                        }
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    <small>
                      {mode === "contribute"
                        ? "Minimum ₦100.00 · Maximum ₦10,000,000.00"
                        : mode === "repay"
                          ? "Pending repayments are reserved to prevent overpayment."
                          : mode === "withdraw"
                            ? `Available savings: ${currency(summary?.available ?? 0)}`
                            : "Enter an amount within the verified eligibility limit."}
                    </small>
                  </label>
                )}
                {mode === "apply" && (
                  <>
                    <label>
                      Repayment period
                      <select
                        value={months}
                        onChange={(e) => setMonths(e.target.value)}
                      >
                        {Array.from(
                          { length: eligibility?.policy.maxMonths ?? 12 },
                          (_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1} {i === 0 ? "month" : "months"}
                            </option>
                          ),
                        )}
                      </select>
                    </label>
                    <label>
                      Purpose
                      <textarea
                        required
                        minLength={10}
                        maxLength={1000}
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Tell us what the loan will support…"
                      />
                    </label>
                    <a
                      className="fin-row-link"
                      href={eligibility?.policy.termsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read the published loan terms <Glyph name="arrow" />
                    </a>
                    <label className="fin-checkbox">
                      <input
                        required
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                      <span>
                        I accept the published loan terms (
                        {eligibility?.policy.termsVersion}), including the
                        stated fee, repayment obligations and applicable
                        collateral or recovery consent.
                      </span>
                    </label>
                  </>
                )}
              </>
            )}
            <div className="fin-form-actions">
              {review && (
                <button
                  className="fin-secondary"
                  type="button"
                  disabled={busy}
                  onClick={() => setReview(false)}
                >
                  Back to edit
                </button>
              )}
              <button className="fin-primary" type="submit" disabled={busy}>
                {busy
                  ? "Processing…"
                  : mode === "bank"
                    ? "Verify & save account"
                    : mode === "eligibility"
                      ? "Save verified assessment"
                      : !review
                        ? "Review details"
                        : mode === "withdraw"
                          ? "Confirm withdrawal"
                          : mode === "apply"
                            ? "Submit loan application"
                            : "Continue to Paystack"}
                <Glyph name="arrow" />
              </button>
            </div>
          </form>
        )}
      </dialog>
    </main>
  );
}
