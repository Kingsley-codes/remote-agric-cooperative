import Image from "next/image";
import { Icon } from "@/components/public/site-ui";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto grid max-w-[1440px] scroll-mt-8 items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.12fr_1fr] xl:grid-cols-[1.15fr_1fr_.85fr] xl:px-12"
    >
      <div className="relative h-[300px] overflow-hidden rounded-xl sm:h-[340px]">
        <Image
          src="/images/seedling.png"
          alt="Young green seedling growing from rich soil in the morning sunlight"
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
        <div className="absolute top-6 right-5 flex items-center gap-3 rounded-2xl bg-[#fffdf0]/90 px-5 py-4 text-[#334437]">
          <span className="rounded-full bg-[#f5e6be] p-3 text-[#a77b21]">
            <Icon name="sprout" />
          </span>
          <span className="text-base leading-snug">
            Sustainable
            <br />
            growth
          </span>
        </div>
      </div>
      <div>
        <p className="mb-3 text-base font-semibold tracking-[0.12em] sm:tracking-[0.22em]">
          ABOUT REMOTE AGRIC COOPERATIVE
        </p>
        <h2
          id="about-title"
          className="font-display text-4xl leading-[1.13] font-semibold tracking-[-0.035em] xl:text-[39px]"
        >
          Powered by Agriculture.
          <br />
          Built for People.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Remote Agric Cooperative is a financial cooperative for remote farmers
          — individuals who believe in the power of agriculture and want to
          build long-term wealth together.
        </p>
        <a
          href="#how-it-works"
          className="mt-5 inline-flex min-h-11 items-center gap-3 font-semibold hover:text-gold"
        >
          Discover how we grow <Icon name="arrow" className="size-5" />
        </a>
      </div>
      <div className="grid gap-6 rounded-xl bg-soft p-6 lg:col-span-2 lg:grid-cols-3 xl:col-span-1 xl:grid-cols-1">
        {(
          [
            {
              icon: "leaf",
              title: "Transparent Operations",
              text: "Clear reporting and open communication.",
            },
            {
              icon: "shield",
              title: "Secure and Trusted",
              text: "A commitment to protecting your information.",
            },
            {
              icon: "people",
              title: "Member First",
              text: "Designed to create real value for our community.",
            },
          ] as const
        ).map((item) => (
          <div key={item.title} className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/10">
              <Icon name={item.icon} className="size-6" />
            </span>
            <div>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-1 text-base leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
