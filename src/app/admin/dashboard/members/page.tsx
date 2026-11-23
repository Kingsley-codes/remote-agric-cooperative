"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { financeRequest, financeDate, statusLabel } from "@/lib/finance";
import { Glyph } from "@/components/dashboard/dashboard-ui";
import {
  PeriodFilter,
  periodDates,
} from "@/components/dashboard/period-filter";
import "@/components/dashboard/finance.css";
type Member = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  membershipStatus: string;
  createdAt: string;
  termsVersion?: string;
};
export default function MembersPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    page: 1,
    ...periodDates("this_week"),
  });
  const [period, setPeriod] = useState("this_week");
  const [list, setList] = useState<{ items: Member[]; total: number } | null>(
    null,
  );
  const [selection, setSelection] = useState<Member | null>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const query = new URLSearchParams(
    Object.entries(filters).map(([key, value]) => [key, String(value)]),
  ).toString();
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      financeRequest<{ items: Member[]; total: number }>(
        `/admin/finance/members?${query}`,
      )
        .then((data) => {
          if (active) {
            setList(data);
            setError("");
          }
        })
        .catch((e) => {
          if (active) setError(e.message);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 200);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, refresh]);
  function open(member: Member) {
    setSelection(member);
    setReason("");
    setError("");
    dialog.current?.showModal();
  }
  async function changeStatus(event: FormEvent) {
    event.preventDefault();
    if (!selection) return;
    setBusy(true);
    setError("");
    try {
      await financeRequest(`/admin/finance/members/${selection._id}/status`, {
        status:
          selection.membershipStatus === "suspended" ? "active" : "suspended",
        reason,
      });
      dialog.current?.close();
      setRefresh((n) => n + 1);
      setLoading(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update membership.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="dash-content fin-screen">
      <div className="fin-heading">
        <div>
          <p className="fin-eyebrow">Cooperative operations / Members</p>
          <h1>Member management</h1>
          <p>Manage access to the cooperative.</p>
        </div>
      </div>
      {error && (
        <p className="fin-error" role="alert">
          {error}
        </p>
      )}
      <section className="fin-ledger">
        <div className="fin-filters">
          <label>
            <span>Search members</span>
            <input
              placeholder="Name or email"
              value={filters.search}
              maxLength={100}
              onChange={(e) => {
                setLoading(true);
                setFilters({ ...filters, search: e.target.value, page: 1 });
              }}
            />
          </label>
          <label>
            <span>Membership status</span>
            <select
              value={filters.status}
              onChange={(e) => {
                setLoading(true);
                setFilters({ ...filters, status: e.target.value, page: 1 });
              }}
            >
              <option value="">All statuses</option>
              {["active", "suspended", "pending"].map((status) => (
                <option key={status} value={status}>
                  {statusLabel(status)}
                </option>
              ))}
            </select>
          </label>
          <PeriodFilter
            value={period}
            from={filters.from}
            to={filters.to}
            onChange={(next, dates) => {
              setPeriod(next);
              setLoading(true);
              setFilters({ ...filters, ...dates, page: 1 });
            }}
          />
        </div>
        <div className="fin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Phone</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>Loading members...</td>
                </tr>
              ) : list?.items.length ? (
                list.items.map((member) => (
                  <tr
                    className="fin-clickable-row"
                    key={member._id}
                    onClick={() => open(member)}
                  >
                    <td>
                      <strong>
                        {member.firstName} {member.lastName}
                      </strong>
                      <small>{member.email}</small>
                    </td>
                    <td>{member.phone || "Unavailable"}</td>
                    <td>{financeDate(member.createdAt)}</td>
                    <td>{statusLabel(member.membershipStatus)}</td>
                    <td>
                      <button
                        className="fin-row-link"
                        aria-label={`View ${member.firstName}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          open(member);
                        }}
                      >
                        <Glyph name="eye" />
                      </button>
                      <button
                        className="fin-row-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          open(member);
                        }}
                      >
                        {member.membershipStatus === "suspended"
                          ? "Activate"
                          : "Suspend"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    {error
                      ? "Members could not be loaded."
                      : "No members match these filters."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="fin-pagination">
          <span>{list?.total ?? 0} members - 20 per page</span>
          <div>
            <button
              disabled={loading || filters.page === 1}
              onClick={() => {
                setLoading(true);
                setFilters({ ...filters, page: filters.page - 1 });
              }}
            >
              Previous
            </button>
            <button
              disabled={loading || !list || filters.page * 20 >= list.total}
              onClick={() => {
                setLoading(true);
                setFilters({ ...filters, page: filters.page + 1 });
              }}
            >
              Next
            </button>
          </div>
        </div>
      </section>
      <dialog
        className="fin-dialog"
        ref={dialog}
        aria-labelledby="member-dialog-title"
        onCancel={(event) => {
          if (busy) event.preventDefault();
        }}
      >
        <div className="fin-dialog-heading">
          <h2 id="member-dialog-title">Member details</h2>
          <button
            aria-label="Close dialog"
            disabled={busy}
            onClick={() => dialog.current?.close()}
          >
            <Glyph name="close" />
          </button>
        </div>
        {selection && (
          <>
            <dl className="fin-details">
              <div>
                <dt>Name</dt>
                <dd>
                  {selection.firstName} {selection.lastName}
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{selection.email}</dd>
              </div>
              {selection.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd>{selection.phone}</dd>
                </div>
              )}
              <div>
                <dt>Status</dt>
                <dd>{statusLabel(selection.membershipStatus)}</dd>
              </div>
              <div>
                <dt>Accepted terms</dt>
                <dd>{selection.termsVersion ?? "Not accepted"}</dd>
              </div>
            </dl>
            <form onSubmit={changeStatus} className="fin-form">
              <p>
                Suspension blocks access to this cooperative only. The
                member&apos;s Remote Agric account remains active.
              </p>
              <label>
                Reason
                <textarea
                  required
                  minLength={5}
                  maxLength={1000}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </label>
              {error && (
                <p role="alert" className="fin-form-error">
                  {error}
                </p>
              )}
              <button className="fin-primary" disabled={busy}>
                {busy
                  ? "Saving..."
                  : selection.membershipStatus === "suspended"
                    ? "Activate membership"
                    : "Suspend membership"}
              </button>
            </form>
          </>
        )}
      </dialog>
    </main>
  );
}
