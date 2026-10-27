import { Icon, type IconName } from "@/components/public/site-ui";

const benefits: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "save",
    title: "Save and Grow",
    description:
      "Make long-term or short-term contributions and work towards your financial goals.",
  },
  {
    icon: "loan",
    title: "Access Loans",
    description:
      "Access financing for agricultural and personal needs, subject to eligibility and approval.",
  },
  {
    icon: "chart",
    title: "Earn Together",
    description:
      "Our cooperative invests pooled funds in opportunities that support shared growth.",
  },
  {
    icon: "people",
    title: "A Stronger Community",
    description:
      "Join a community of remote farmers building wealth and supporting agriculture.",
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      aria-label="Membership benefits"
      className="scroll-mt-8 border-y border-foreground/[0.03] bg-surface/50"
    >
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-9 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-0 lg:py-10 xl:px-12">
        {benefits.map((b, i) => (
          <article
            key={b.title}
            className={`relative ${i ? "lg:pl-8 xl:pl-9" : ""} ${i !== 3 ? "lg:pr-7 lg:after:absolute lg:after:top-4 lg:after:right-0 lg:after:bottom-3 lg:after:w-px lg:after:bg-foreground/10" : ""}`}
          >
            <span
              className={`mb-4 flex size-[72px] items-center justify-center rounded-full ${i % 2 ? "bg-[#f6ecd8] text-[#a77b21]" : "bg-soft text-brand-content"}`}
            >
              <Icon name={b.icon} className="size-8" />
            </span>
            <h2 className="font-display text-[23px] font-semibold tracking-tight">
              {b.title}
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-muted">
              {b.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
