import { apiFetch } from "./api-client";

export const currency = (kobo: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(kobo / 100);
export const financeDate = (value?: string) =>
  value
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Africa/Lagos",
      }).format(new Date(value))
    : "—";
export const categoryLabels: Record<string, string> = {
  long_term: "Long-term contribution",
  short_term: "Short-term contribution",
  loan_repayment: "Loan repayment",
  loan_disbursement: "Loan disbursement",
  withdrawal: "Withdrawal",
};
export const statusLabel = (value: string) =>
  value.replaceAll("_", " ").replace(/^./, (c) => c.toUpperCase());
export async function financeRequest<T>(
  path: string,
  body?: unknown,
  key?: string,
): Promise<T> {
  const response = await apiFetch(path, {
    method: body === undefined ? "GET" : "POST",
    ...(body === undefined
      ? {}
      : {
          headers: {
            "Content-Type": "application/json",
            ...(key ? { "Idempotency-Key": key } : {}),
          },
          body: JSON.stringify(body),
        }),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      typeof data.message === "string"
        ? data.message
        : "Unable to complete this request. Please review your details and try again.",
    );
  return data;
}
export interface FinanceRecord {
  _id: string;
  id: string;
  member?: { name: string; email: string; phone?: string } | null;
  linked?: FinanceRecord | null;
  reports?: { reason: string; status: string; createdAt: string }[];
  memberId: string;
  reference?: string;
  amount: number;
  currency?: string;
  createdAt: string;
  paidAt?: string;
  destination?: string;
  providerId?: string;
  status: string;
  type?: string;
  category?: string;
  reconciliation?: string;
  contributionid?: string;
  loanid?: string;
  months?: number;
  fee?: number;
  totalDue?: number;
  repaidAmount?: number;
  reservedRepayment?: number;
  purpose?: string;
  termsVersion?: string;
  consentAt?: string;
  disbursedAt?: string;
  decision?: { reason: string; at: string };
  eligibility?: {
    investmentValue: number;
    maximum: number;
    source: string;
    verifiedAt: string;
  };
  schedule?: { dueAt: string; amount: number }[];
}
export interface FinanceList {
  items: FinanceRecord[];
  total: number;
  page: number;
  pageSize: number;
  totals: { _id: string; amount: number; outstanding: number; count: number }[];
  asOf: string;
}
export interface Summary {
  operations?: { pendingLoans: number; paymentExceptions: number };
  estimatedShare: number | null;
  allocatedGain: number | null;
  loanOutstanding: number;
  loanRepaid: number;
  longTerm: number;
  shortTerm: number;
  available: number;
  pendingWithdrawals: number;
  completedWithdrawals: number;
  poolCapital: number;
  valuation: { assetValue: number; valuedAt: string; note?: string } | null;
  asOf: string;
}
export interface Eligibility {
  policy: {
    enabled: boolean;
    flatFeeBps: number;
    maxMonths: number;
    termsVersion: string;
  };
  snapshot: {
    investmentValue: number;
    maximum: number;
    expiresAt: string;
  } | null;
}
