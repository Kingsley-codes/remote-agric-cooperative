import type { Metadata } from "next";
import Link from "next/link";
import { LoanTerms } from "@/components/loan-terms";

export const metadata: Metadata = {
  title: "Loan Terms | Remote Agric Cooperative",
  description: "Review loan application, fee and repayment terms before applying.",
};

export default function LoanTermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-content">
        Member borrowing
      </p>
      <h1 className="mb-6 font-display text-4xl sm:text-5xl">Loan terms</h1>
      <p className="mb-8 leading-7 text-muted">
        Read these terms alongside the amount, fee, repayment period and terms
        version shown in your loan application. Your application review displays
        the figures specific to your request before you submit.
      </p>
      <LoanTerms />
      <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-brand-content">
        <Link href="/dashboard?view=Loans">Go to my loans &rarr;</Link>
        <Link href="/contact">Contact the cooperative &rarr;</Link>
      </div>
    </article>
  );
}
