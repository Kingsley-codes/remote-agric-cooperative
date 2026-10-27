import Image from "next/image";
import { Icon } from "@/components/public/site-ui";

const overview = [
  { icon: "user", text: "Join with your existing Remote Agric account" },
  { icon: "wallet", text: "Contribute and grow your savings" },
  { icon: "loan", text: "Access loans when you need them" },
  { icon: "sprout", text: "Build a stronger future together" },
] as const;

export function HowItWorksHero() {
  return (
    <section aria-labelledby="how-heading" className="overflow-hidden">
      <div className="mx-auto grid max-w-[1440px] items-center gap-9 px-5 pt-10 pb-8 sm:px-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-7 lg:py-0 xl:px-12">
        <div className="relative z-10 lg:py-12">
          <p className="mb-4 text-base font-semibold tracking-[0.26em]">
            HOW IT WORKS
          </p>
          <h1 id="how-heading" className="font-display text-[clamp(2.5rem,3.5vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.045em]">
            A Simple Way to<br className="hidden sm:block" /> Save, Grow and{" "}
            <span className="text-gold">Thrive</span>
          </h1>
          <p className="mt-5 max-w-[560px] text-lg leading-relaxed text-muted">
            Remote Agric Cooperative makes it easy for e-farmers to build wealth,
            access financing, and create opportunities together.
          </p>
        </div>
        <div className="relative isolate w-full lg:self-stretch xl:grid xl:grid-cols-[minmax(0,1fr)_260px] xl:items-center">
          <div aria-hidden="true" className="absolute top-[18%] -left-4 -z-10 h-16 w-20 rotate-12 rounded-tr-full rounded-bl-full bg-brand" />
          <div aria-hidden="true" className="absolute bottom-10 -left-8 -z-10 h-48 w-28 -rotate-12 rounded-tr-full rounded-bl-full bg-gold/85" />
          <div aria-hidden="true" className="absolute bottom-0 -left-10 -z-10 h-24 w-36 rotate-12 rounded-tr-full rounded-bl-full bg-[#819449]" />
          <div className="relative h-[390px] overflow-hidden rounded-2xl rounded-tl-[100px] sm:h-[430px] lg:min-h-[430px] lg:rounded-tl-[120px] xl:-mr-5 xl:h-full xl:rounded-r-none">
            <Image src="/images/farmer.png" alt="A smiling Remote Agric farmer in a straw hat standing in a green field" fill priority sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 55vw, 420px" className="object-cover object-top" />
          </div>
          <ol aria-label="Membership at a glance" className="relative z-10 mx-4 -mt-12 grid gap-4 rounded-2xl border border-foreground/5 bg-surface p-5 shadow-[0_8px_32px_#092d2910] sm:mx-6 sm:grid-cols-2 sm:p-6 lg:mx-4 lg:-mt-8 xl:mx-0 xl:my-5 xl:grid-cols-1 xl:gap-5 xl:p-5">
            {overview.map(({ icon, text }) => (
              <li key={icon} className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-soft text-brand-content">
                  <Icon name={icon} className="size-6" />
                </span>
                <p className="text-base leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
