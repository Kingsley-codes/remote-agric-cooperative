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
      <div className="mx-auto grid max-w-[1440px] items-center gap-9 px-5 pt-10 pb-8 sm:px-8 lg:grid-cols-2 lg:gap-7 lg:py-0 xl:px-12">
        <div className="relative z-10 lg:py-12">
          <p className="mb-4 text-base font-semibold tracking-[0.26em]">
            HOW IT WORKS
          </p>
          <h1 id="how-heading" className="font-display text-[clamp(2.6rem,4.15vw,4rem)] leading-[1.12] font-semibold tracking-[-0.045em]">
            A Simple Way to<br className="hidden sm:block" /> Save, Grow and{" "}
            <span className="text-gold">Thrive</span>
          </h1>
          <p className="mt-5 max-w-[650px] text-lg leading-relaxed text-muted xl:text-xl">
            Remote Agric Cooperative makes it easy for e-farmers to build wealth,
            access financing, and create opportunities together.
          </p>
        </div>
        <div className="relative isolate w-full lg:self-stretch">
          <div aria-hidden="true" className="absolute top-[18%] -left-4 -z-10 h-16 w-20 rotate-12 rounded-tr-full rounded-bl-full bg-brand" />
          <div aria-hidden="true" className="absolute bottom-10 -left-8 -z-10 h-48 w-28 -rotate-12 rounded-tr-full rounded-bl-full bg-gold/85" />
          <div aria-hidden="true" className="absolute bottom-0 -left-10 -z-10 h-24 w-36 rotate-12 rounded-tr-full rounded-bl-full bg-[#819449]" />
          <div className="relative h-[390px] overflow-hidden rounded-2xl rounded-tl-[120px] sm:h-[430px] lg:h-full lg:min-h-[430px] lg:rounded-r-none lg:rounded-bl-none lg:rounded-tl-[160px] xl:-mr-12">
            <Image src="/images/farmer.png" alt="A smiling Remote Agric farmer in a straw hat standing in a green field" fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover object-[center_15%] lg:object-[center_20%]" />
          </div>
          <ol aria-label="Membership at a glance" className="relative z-10 mx-4 -mt-12 grid gap-4 rounded-2xl border border-foreground/5 bg-surface p-5 shadow-[0_8px_32px_#092d2910] sm:mx-6 sm:grid-cols-2 sm:p-6 lg:mx-4 lg:-mt-8 xl:absolute xl:top-5 xl:-right-6 xl:bottom-5 xl:m-0 xl:w-[290px] xl:grid-cols-1 xl:gap-3">
            {overview.map(({ icon, text }) => (
              <li key={icon} className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-soft text-brand">
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
