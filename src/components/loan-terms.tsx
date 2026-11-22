export function LoanTerms() {
  return (
    <div className="space-y-4 text-sm leading-7">
      <section>
        <h3 className="font-semibold">Eligibility and approval</h3>
        <p>
          Applications require active membership, current membership terms and
          verified investment eligibility. Your request must be within your
          assessed limit. Submission does not guarantee approval or release funds;
          applications are reviewed before a separate disbursement step.
        </p>
      </section>
      <section>
        <h3 className="font-semibold">Loan amount and fee</h3>
        <p>
          Your application shows the requested amount, one-time flat fee and total
          to repay in Nigerian naira. Review these figures before submitting.
          The total to repay is the loan amount plus the displayed fee.
        </p>
      </section>
      <section>
        <h3 className="font-semibold">Repayment</h3>
        <p>
          You agree to repay the total over your selected repayment period.
          Monthly installments begin one month after confirmed disbursement.
          Installments may differ by one kobo due to rounding; the schedule
          preserves the exact total owed. Confirmed repayments and the remaining
          balance appear in your loan records.
        </p>
      </section>
      <section>
        <h3 className="font-semibold">Your acceptance</h3>
        <p>
          By accepting and submitting, you confirm that you have reviewed these
          terms and your application details. The accepted terms version and
          acceptance time are recorded with your application. Contact the
          cooperative before submitting if you need clarification.
        </p>
      </section>
    </div>
  );
}
