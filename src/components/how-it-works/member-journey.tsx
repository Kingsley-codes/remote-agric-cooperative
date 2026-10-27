import { Icon } from "@/components/public/site-ui";

const journey = [
  { icon: "user", title: "Sign in", text: "Use your Remote Agric account." },
  { icon: "people", title: "Join the cooperative", text: "Confirm your eligibility and accept the membership terms." },
  { icon: "grid", title: "Choose a service", text: "Start saving or apply for a loan." },
  { icon: "pie", title: "Track your progress", text: "View your balances, transactions, and returns." },
  { icon: "sprout", title: "Grow together", text: "Build a stronger financial future with the community." },
] as const;

export function MemberJourney() {
  return (
    <section aria-labelledby="journey-heading" className="bg-soft/35">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 xl:px-12">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-baseline lg:gap-5">
          <h2 id="journey-heading" className="text-lg font-semibold">THE MEMBER JOURNEY</h2>
          <p className="text-lg leading-relaxed text-muted">From joining to growing your wealth, here’s what the experience looks like.</p>
        </div>
        <ol className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {journey.map(({ icon, title, text }, index) => (
            <li key={title} className="relative flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-soft text-brand"><Icon name={icon} className="size-6" /></span>
              <div>
                <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{text}</p>
              </div>
              {index < journey.length - 1 && <Icon name="chevron" className="absolute top-4 -right-6 hidden size-5 text-muted/60 xl:block" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
