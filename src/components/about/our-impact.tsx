import { Icon } from "@/components/public/site-ui";

const statistics = [
  { icon: "people", value: "12,480+", label: "Active Members", detail: "E-farmers growing together" },
  { icon: "coins", value: "₦1.8 Billion+", label: "Total Contributions", detail: "Building long-term value" },
  { icon: "chart", value: "₦320 Million+", label: "Returns Generated", detail: "Creating real opportunities" },
  { icon: "sprout", value: "98%", label: "Member Satisfaction", detail: "A growing and supportive community" },
] as const;

export function OurImpact() {
  return (
    <section id="impact" aria-labelledby="impact-heading" className="scroll-mt-8 bg-soft/60">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-10 sm:px-8 xl:grid-cols-[1fr_1.7fr] xl:items-center xl:gap-8 xl:px-12">
        <div>
          <p className="mb-3 text-base font-semibold tracking-[0.26em]">OUR IMPACT</p>
          <h2 id="impact-heading" className="max-w-xl font-display text-4xl leading-[1.15] font-semibold tracking-[-0.035em]">Growing People, Communities and Opportunities</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">Together, we are building a stronger agricultural ecosystem through savings, investments, and access to financing.</p>
          <div aria-hidden="true" className="mt-5 h-0.5 w-12 bg-gold" />
        </div>
        <dl className="grid grid-cols-1 gap-y-8 min-[360px]:grid-cols-2 md:grid-cols-4">
          {statistics.map(({ icon, value, label, detail }, index) => (
            <div key={label} className="relative flex min-w-0 flex-col items-center px-3 text-center md:not-first:border-l md:border-foreground/10">
              <span className={`mb-4 flex size-16 items-center justify-center rounded-full ${index === 1 ? "bg-gold/15 text-gold" : "bg-brand/10 text-brand"}`}><Icon name={icon} className="size-8" /></span>
              <dt className="order-2 mt-2 text-base font-medium">{label}</dt>
              <dd className="order-1 font-display text-[27px] leading-tight font-semibold tracking-[-0.045em]">{value}</dd>
              <dd className="order-3 mt-2 max-w-[180px] text-base leading-relaxed text-muted">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
