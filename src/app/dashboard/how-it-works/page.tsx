import Link from "next/link";
import "@/components/dashboard/finance.css";
export default function HowItWorksPage() {
  return (
    <main className="dash-content fin-screen">
      <div className="fin-heading">
        <div>
          <p className="fin-eyebrow">Member workspace / Guide</p>
          <h1>How it works</h1>
          <p>Your guide to contributions, savings and borrowing.</p>
        </div>
      </div>
      <div className="fin-guide">
        <section>
          <h2>Long-term contributions</h2>
          <p>
            Your confirmed contributions join the cooperative&apos;s
            agricultural pool. Plan for a minimum five-year commitment; the
            terms you accepted determine the lock-in start and release
            conditions.
          </p>
          <ol>
            <li>
              Open Long-term Contributions and select Make a contribution.
            </li>
            <li>
              Enter an amount, review it and complete payment through Paystack.
            </li>
            <li>
              Your contribution counts toward your capital after payment is
              verified.
            </li>
          </ol>
          <p>
            An approved valuation estimates your share using your confirmed
            capital as a proportion of the pool&apos;s confirmed capital on that
            valuation date. Gains and losses are separate from deposits. Values
            can fall and returns are not guaranteed.
          </p>
          <Link href="/dashboard/long-term" className="fin-secondary">
            Open long-term contributions
          </Link>
        </section>
        <section>
          <h2>Short-term savings</h2>
          <p>
            Add funds whenever you choose. Your available savings equal
            confirmed deposits less completed and pending withdrawals.
          </p>
          <ol>
            <li>Open Short-term Contributions and select Add funds.</li>
            <li>Set a verified bank account in your membership name.</li>
            <li>
              Request a withdrawal within your available balance and confirm the
              amount and destination.
            </li>
          </ol>
          <p>
            Withdrawals process automatically. Pending funds stay reserved until
            the payout is confirmed. Check a pending payout&apos;s status before
            submitting another request.
          </p>
          <Link href="/dashboard/short-term" className="fin-secondary">
            Open short-term savings
          </Link>
        </section>
        <section>
          <h2>Loans and repayments</h2>
          <p>
            The cooperative verifies your Remote Agric investment evidence to
            set a borrowing limit. A current assessment and active membership
            are required before applying.
          </p>
          <ol>
            <li>
              Review the loan fee, maximum duration and your eligibility on the
              Loans page.
            </li>
            <li>
              Enter the amount, duration and purpose. Review the repayment
              estimate and accept the current terms.
            </li>
            <li>
              An administrator reviews your application. Approval and
              disbursement are separate steps.
            </li>
            <li>
              Once funds are disbursed, follow the monthly schedule in your loan
              details. Use Make a repayment to pay through Paystack.
            </li>
          </ol>
          <p>
            Fees and agreed terms are recorded on your application. Later policy
            changes do not change an existing loan. Pending repayments are
            reserved to prevent overpayment.
          </p>
          <Link href="/dashboard/loans" className="fin-secondary">
            Open loans
          </Link>
        </section>
        <section>
          <h2>Track activity and get help</h2>
          <p>
            Every contribution, loan and transaction has its own ID. Select a
            table row or the view icon to inspect its details. Transaction
            details include the related contribution or loan. Use Report
            transaction to submit a problem with a payment.
          </p>
          <Link href="/dashboard/transactions" className="fin-secondary">
            Open transactions
          </Link>
        </section>
      </div>
    </main>
  );
}
