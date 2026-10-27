import Image from "next/image";
import { Icon } from "@/components/public/site-ui";

export function OurStory() {
  return (
    <section aria-labelledby="story-heading" className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 pb-10 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-10 xl:px-12">
      <div className="relative min-h-[330px] self-stretch overflow-hidden rounded-2xl sm:min-h-[360px]">
        <Image src="/images/about-seedling.webp" alt="A young green seedling growing from rich soil in warm morning sunlight" fill sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover" />
        <div className="absolute bottom-0 left-0 flex max-w-[calc(100%-1rem)] items-center gap-4 rounded-tr-2xl bg-brand px-6 py-5 text-white sm:gap-5 sm:px-7">
          <Icon name="sprout" className="size-11 shrink-0 text-[#d2aa51]" />
          <p className="text-lg leading-relaxed">Rooted in agriculture.<br />Driven by people.</p>
        </div>
      </div>
      <div className="py-2">
        <p className="mb-3 text-base font-semibold tracking-[0.26em]">OUR STORY</p>
        <h2 id="story-heading" className="font-display text-4xl leading-[1.15] font-semibold tracking-[-0.035em] xl:text-[44px]">From Farms to Financial Freedom</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">Remote Agric Cooperative was created to extend the impact of Remote Agric, giving e-farmers a way to do more with their commitment to agriculture. While Remote Agric focuses on farm investments and production, the cooperative provides a space for members to save, grow, access loans, and build long-term wealth together.</p>
        <p className="mt-3 text-lg leading-relaxed text-muted">We believe that when people come together, we can create greater opportunities, support one another, and build a more resilient agricultural future for our communities.</p>
      </div>
    </section>
  );
}
