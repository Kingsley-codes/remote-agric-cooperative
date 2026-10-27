import Image from "next/image";
import { Icon } from "@/components/public/site-ui";

export function AboutHero() {
  return (
    <section aria-labelledby="about-heading" className="overflow-hidden">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 pt-10 pb-8 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:py-0 xl:px-12">
        <div className="relative z-10 lg:py-12">
          <p className="mb-4 text-base font-semibold tracking-[0.26em]">
            ABOUT US
          </p>
          <h1
            id="about-heading"
            className="max-w-[750px] font-display text-[clamp(2.6rem,4.15vw,4rem)] leading-[1.12] font-semibold tracking-[-0.045em]"
          >
            A Stronger Community for a{" "}
            <span className="text-gold">Brighter Tomorrow</span>
          </h1>
          <p className="mt-5 max-w-[670px] text-lg leading-relaxed text-muted xl:text-xl">
            Remote Agric Cooperative is a member-driven financial cooperative
            built for e-farmers, by people who believe in the power of
            agriculture to create lasting wealth and stronger communities.
          </p>
        </div>
        <div className="relative isolate mx-auto w-full max-w-[680px] lg:max-w-none lg:self-stretch">
          <div
            aria-hidden="true"
            className="absolute top-[24%] -left-8 -z-10 h-44 w-32 -rotate-12 rounded-tr-full rounded-bl-full bg-gold/30 lg:-left-14"
          />
          <div
            aria-hidden="true"
            className="absolute top-[8%] left-4 -z-10 h-16 w-20 rotate-12 rounded-tr-full rounded-bl-full bg-brand/85"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 -left-4 -z-10 h-44 w-28 rounded-tr-full rounded-bl-full bg-[#819449]"
          />
          <div className="relative min-h-[430px] overflow-hidden rounded-2xl rounded-tl-[110px] sm:min-h-[460px] lg:h-full lg:min-h-[460px] lg:rounded-r-none lg:rounded-bl-none lg:rounded-tl-[180px] xl:-mr-12">
            <Image
              src="/images/about-farmer.webp"
              alt="A smiling farmer in a straw hat looking across a green farm at sunset"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-[45%_center]"
            />
          </div>
          <figure className="relative z-10 -mt-24 mr-4 ml-auto max-w-[300px] rounded-2xl border border-foreground/5 bg-surface p-5 shadow-[0_8px_32px_#092d2910] sm:mr-6 lg:absolute lg:right-0 lg:bottom-6 lg:m-0 lg:max-w-[265px] xl:-right-6">
            <Icon name="leaf" className="mb-3 size-8 text-brand-content" />
            <blockquote className="text-lg leading-relaxed text-muted">
              “We are more than a financial platform — we are a community
              growing opportunities together.”
            </blockquote>
            <div aria-hidden="true" className="mt-4 h-0.5 w-12 bg-gold" />
          </figure>
        </div>
      </div>
    </section>
  );
}
