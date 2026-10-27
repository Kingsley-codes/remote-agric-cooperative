import Image from "next/image";
import { MembershipButton } from "@/components/public/membership-provider";
import { button, Icon } from "@/components/public/site-ui";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 pt-10 pb-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-5 lg:pt-6 lg:pb-8 xl:px-12"
    >
      <div className="relative z-10 py-2 lg:py-10">
        <p className="mb-5 text-base font-semibold tracking-[0.14em] sm:tracking-[0.26em]">
          BUILDING WEALTH TOGETHER
        </p>
        <h1
          id="hero-title"
          className="max-w-[690px] font-display text-[clamp(2.6rem,4.15vw,4rem)] leading-[1.12] font-semibold tracking-[-0.045em]"
        >
          A Stronger Tomorrow for Farmers and Investors Alike{" "}
          <span className="text-gold">Together.</span>
        </h1>
        <p className="mt-5 max-w-[630px] text-lg leading-relaxed text-muted xl:text-[20px]">
          Remote Agric Cooperative is a trusted community for remote farmers to
          save, grow, access financing, and build long-term wealth — powered
          by agriculture and driven by people like you.
        </p>
        <div className="mt-7 grid gap-3 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap sm:gap-4">
          <MembershipButton
            className={`${button} w-full bg-brand sm:min-w-48 sm:w-auto text-white hover:bg-brand-hover`}
          >
            Get Started <Icon name="arrow" className="size-5" />
          </MembershipButton>
          <a
            href="#about"
            className={`${button} w-full border sm:min-w-40 sm:w-auto border-brand hover:bg-soft`}
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-[660px] lg:py-2">
        <div
          aria-hidden="true"
          className="absolute top-[39%] left-[1%] hidden h-56 lg:block w-[44%] rounded-full bg-gold/85"
        />
        <div
          aria-hidden="true"
          className="absolute top-2 left-[20%] hidden h-16 lg:block w-28 rotate-[-15deg] rounded-tl-full rounded-br-full bg-[#426b42]"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-4 left-[1%] hidden h-20 lg:block w-36 rotate-12 rounded-tr-full rounded-bl-full bg-[#92a24b]"
        />
        <div className="relative aspect-[3/4] min-h-[440px] max-h-[540px] w-full overflow-hidden rounded-2xl rounded-tl-[72px] sm:aspect-[5/4] sm:rounded-tl-[100px] lg:ml-[13%] lg:aspect-auto lg:h-[515px] lg:w-[77%] lg:rounded-tl-[170px] xl:h-[550px]">
          <Image
            src="/images/farmer.png"
            alt="Smiling farmer holding a tablet in a lush green field"
            fill
            priority
            sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 660px, 40vw"
            className="object-cover object-[48%_center]"
          />
        </div>
        <div className="absolute top-5 left-3 w-[148px] rounded-2xl border border-foreground/5 bg-surface/95 p-3 shadow-[0_12px_40px_#092d2920] backdrop-blur-sm sm:top-6 sm:left-5 sm:w-[172px] sm:p-4 lg:top-[15%] lg:left-0 lg:w-[182px] lg:border-0 lg:bg-surface lg:p-5">
          <div className="mb-2 flex items-center gap-2 lg:mb-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-soft text-brand-content sm:size-8 lg:size-10">
              <Icon name="people" className="size-4 sm:size-5 lg:size-6" />
            </span>
            <span className="text-[11px] leading-snug sm:text-xs lg:text-base">
              A growing community
            </span>
          </div>
          <p className="font-display text-2xl leading-none font-semibold sm:text-3xl lg:text-4xl">
            12,480
          </p>
          <p className="mt-1 text-[11px] text-muted sm:text-xs lg:text-base">
            Active members
          </p>
        </div>
        <div
          id="impact"
          className="absolute right-3 bottom-[92px] left-3 grid scroll-mt-8 grid-cols-3 gap-1.5 sm:right-5 sm:bottom-[104px] sm:left-5 sm:gap-3 lg:top-[18%] lg:-right-1 lg:bottom-auto lg:left-auto lg:w-[198px] lg:grid-cols-1 xl:w-[228px]"
        >
          {(
            [
              {
                icon: "leaf",
                value: "₦1.8 Billion",
                compactValue: "₦1.8B",
                label: "Total long-term pool value",
              },
              {
                icon: "chart",
                value: "₦320 Million",
                compactValue: "₦320M",
                label: "Total returns generated",
              },
              {
                icon: "people",
                value: "98%",
                compactValue: "98%",
                label: "Member satisfaction rate",
              },
            ] as const
          ).map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-0 flex-col items-start gap-2 rounded-xl border border-foreground/5 bg-surface/95 px-2 py-3 shadow-[0_8px_24px_#092d2918] backdrop-blur-sm sm:px-3 sm:py-4 lg:flex-row lg:items-center lg:gap-3 lg:rounded-2xl lg:border-0 lg:px-4"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-soft text-brand-content sm:size-9 lg:size-12">
                <Icon name={stat.icon} className="size-4 sm:size-5 lg:size-6" />
              </span>
              <div>
                <p className="font-display text-base leading-tight font-bold sm:text-lg lg:text-[22px]">
                  <span className="sm:hidden">{stat.compactValue}</span>
                  <span className="hidden sm:inline">{stat.value}</span>
                </p>
                <p className="mt-1 text-[11px] leading-snug text-muted sm:text-xs lg:text-base">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute right-3 bottom-3 left-3 flex items-center gap-3 rounded-xl bg-brand p-3 text-white shadow-[0_8px_24px_#092d2920] sm:right-5 sm:bottom-5 sm:left-5 sm:rounded-2xl sm:p-4 lg:right-0 lg:bottom-2 lg:left-auto lg:w-full lg:max-w-[300px] lg:gap-4 lg:p-5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black/10 text-[#d2aa51] lg:size-12">
            <Icon name="sprout" className="size-6 lg:size-9" />
          </span>
          <p className="text-xs leading-snug sm:text-sm lg:text-base">
            <span className="mb-0.5 block text-[#b9dfcc] lg:mb-1">
              More than savings.
            </span>
            A stronger future for Nigerian agriculture.
          </p>
        </div>
      </div>
    </section>
  );
}
