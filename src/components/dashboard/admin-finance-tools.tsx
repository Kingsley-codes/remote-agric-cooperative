"use client";
import { useEffect, useState, type FormEvent } from "react";
import { financeRequest } from "@/lib/finance";
export function AdminFinanceTools({
  loans,
  onSave,
}: {
  loans: boolean;
  onSave: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("12");
  const [version, setVersion] = useState("");
  const [assetValue, setAssetValue] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (loans)
      financeRequest<{
        flatFeeBps: number;
        maxMonths: number;
        termsVersion: string;
      }>("/admin/finance/policy")
        .then((p) => {
          setRate(String(p.flatFeeBps / 100));
          setMonths(String(p.maxMonths));
          setVersion(p.termsVersion);
        })
        .catch((e) => setMessage(e.message));
  }, [loans]);
  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await financeRequest(
        loans ? "/admin/finance/policy" : "/admin/finance/valuations",
        loans
          ? {
              flatFeeBps: Math.round(Number(rate) * 100),
              maxMonths: Number(months),
              termsVersion: version,
              reason,
            }
          : {
              assetValue: Math.round(Number(assetValue) * 100),
              valuedAt: date,
              note: reason,
            },
      );
      setMessage(
        loans
          ? "Loan policy saved. Existing loan terms are preserved."
          : "Valuation approved. Member share estimates have been updated.",
      );
      onSave();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="fin-admin-tools">
      <div className="fin-section-heading">
        <h2>{loans ? "Loan policy" : "Pool valuation & allocation"}</h2>
        <button
          className="fin-secondary"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded
            ? "Close settings"
            : loans
              ? "Configure loan terms"
              : "Record valuation"}
        </button>
      </div>
      {message && <p role="status">{message}</p>}
      {expanded && (
        <form className="fin-form fin-settings-form" onSubmit={save}>
          {loans ? (
            <>
              <label>
                Flat interest / fee (%)
                <input
                  required
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </label>
              <label>
                Maximum duration (months)
                <input
                  required
                  type="number"
                  min="1"
                  max="60"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
              </label>
              <label>
                Terms version
                <input
                  required
                  maxLength={100}
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                />
              </label>
            </>
          ) : (
            <>
              <label>
                Net pool asset value (NGN)
                <input
                  required
                  type="number"
                  min="0"
                  max="10000000000"
                  step="0.01"
                  value={assetValue}
                  onChange={(e) => setAssetValue(e.target.value)}
                />
              </label>
              <label>
                Valuation date
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label>
                Allocation method
                <select disabled>
                  <option>
                    Proportional to confirmed capital at valuation date
                  </option>
                </select>
              </label>
              <p>
                Enter the net value after expenses and fees. Gain or loss equals
                this value minus confirmed capital. Each member&apos;s estimate
                uses their proportion of confirmed capital on the valuation
                date. This records an estimate; it does not pay out funds.
              </p>
            </>
          )}
          <label>
            {loans ? "Reason for change" : "Valuation source / notes"}
            <textarea
              required
              minLength={5}
              maxLength={1000}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>
          <button disabled={busy} className="fin-primary">
            {busy
              ? "Saving..."
              : loans
                ? "Save loan policy"
                : "Approve valuation"}
          </button>
        </form>
      )}
    </section>
  );
}
