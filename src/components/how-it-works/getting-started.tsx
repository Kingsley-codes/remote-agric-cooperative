import { Icon } from "@/components/public/site-ui";

const steps = [
  { icon: "user", title: "Sign In", text: "Use your existing Remote Agric login details." },
  { icon: "shield", title: "Become a Member", text: "Your active investment on Remote Agric makes you eligible to join." },
  { icon: "coins", title: "Choose a Service", text: "Start contributing for the long or short term, or apply for a loan." },
  { icon: "chart", title: "Track and Grow", text: "Monitor your contributions, withdrawals, loans, and returns in one place." },
] as const;

export function GettingStarted() {
  return (
    <section aria-labelledby="getting-started-heading" className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 xl:px-12">
      <h2 id="getting-started-heading" className="text-base font-semibold tracking-[0.22em]">
        GET STARTED IN FOUR SIMPLE STEPS
      </h2>
      <ol className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-7">
        {steps.map(({ icon, title, text }, index) => (
          <li key={title} className="relative flex items-start gap-4">
            <div className="flex shrink-0 flex-col items-center gap-2">
              <span className={`flex size-14 items-center justify-center rounded-full ${index % 2 ? "bg-gold/10 text-gold" : "bg-soft text-brand"}`}>
                <Icon name={icon} className="size-7" />
              </span>
              <span className="font-display text-2xl font-semibold text-muted" aria-hidden="true">0{index + 1}</span>
            </div>
            <div className="pr-3">
              <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-muted">{text}</p>
            </div>
            {index < steps.length - 1 && <Icon name="chevron" className="absolute top-5 -right-5 hidden size-5 text-muted/60 xl:block" />}
          </li>
        ))}
      </ol>
    </section>
  );
}
