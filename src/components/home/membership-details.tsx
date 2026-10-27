export function MembershipDetails() {
  return (
    <>
      <section
        id="how-it-works"
        aria-labelledby="steps-title"
        className="scroll-mt-8 border-y border-foreground/10 bg-soft/40 px-5 py-14 sm:px-8"
      >
        <div className="mx-auto max-w-[1344px]">
          <p className="text-base font-semibold tracking-[0.22em]">
            GROW AT YOUR OWN PACE
          </p>
          <h2
            id="steps-title"
            className="mt-3 font-display text-4xl font-semibold tracking-tight"
          >
            Your next chapter starts here.
          </h2>
          <div className="mt-9 grid gap-8 md:grid-cols-3">
            {[
              [
                "01",
                "Join the community",
                "Learn about membership, complete your registration, and get verified.",
              ],
              [
                "02",
                "Choose your contribution",
                "Plan for the future with long-term contributions or save for nearer-term needs.",
              ],
              [
                "03",
                "Grow together",
                "Follow cooperative updates, explore eligible financing, and be part of our shared progress.",
              ],
            ].map(([n, title, text]) => (
              <div key={n} className="flex gap-4">
                <span className="font-display text-3xl text-gold">{n}</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold">
                    {title}
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-muted">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="mx-auto grid max-w-[1344px] scroll-mt-8 gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[.8fr_1.2fr] xl:px-0"
      >
        <div>
          <p className="text-base font-semibold tracking-[0.22em]">
            A LITTLE MORE CLARITY
          </p>
          <h2
            id="faq-title"
            className="mt-3 font-display text-4xl leading-tight font-semibold"
          >
            Good questions.
            <br />
            Clear answers.
          </h2>
        </div>
        <div>
          {[
            [
              "Who is a remote farmer?",
              "A remote farmer is someone who supports agriculture through the Remote Agric community. You do not need to own or work on a farm to be interested in membership.",
            ],
            [
              "How do contributions work?",
              "The cooperative offers short-term savings and long-term contributions. Review the applicable fees, withdrawal rules, and commitment periods before choosing a plan.",
            ],
            [
              "Are returns guaranteed?",
              "No. Agricultural investments carry risks and returns can vary. Review the cooperative’s investment terms and reporting before contributing.",
            ],
            [
              "Can every member access a loan?",
              "Loan access depends on eligibility, active contributions, and approval. Applicable limits, fees, and repayment terms are provided before a loan is accepted.",
            ],
          ].map(([question, answer]) => (
            <details
              key={question}
              className="group border-b border-foreground/15 py-5 first:pt-0"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-lg font-semibold marker:content-none">
                {question}
                <span
                  className="text-2xl font-normal text-gold transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 pr-7 text-lg leading-relaxed text-muted">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

    </>
  );
}
