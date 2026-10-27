import Image from "next/image";
import { MembershipButton } from "@/components/public/membership-provider";
import { button, Icon, type IconName } from "@/components/public/site-ui";

const services: {
  title: string;
  subtitle: string;
  image: string;
  action: string;
  features: { icon: IconName; text: string }[];
}[] = [
  {
    title: "Long-term Contributions",
    subtitle: "Save for bigger opportunities",
    image: "/images/long-term-growth.webp",
    action: "Start Contributing",
    features: [
      { icon: "lock", text: "Minimum 5-year commitment" },
      { icon: "calendar", text: "Contribute daily, weekly, or monthly" },
      { icon: "chart", text: "Pooled funds are invested in diverse opportunities" },
      { icon: "pie", text: "Your share reflects your contribution percentage" },
    ],
  },
  {
    title: "Short-term Contributions",
    subtitle: "Flexible savings, on your terms",
    image: "/images/short-term-savings.webp",
    action: "Start Saving",
    features: [
      { icon: "calendar", text: "Contribute at any interval" },
      { icon: "wallet", text: "Request your available balance when you need it" },
      { icon: "bolt", text: "Designed for flexibility and short-term goals" },
      { icon: "shield", text: "Secure and transparent tracking of your balance" },
    ],
  },
  {
    title: "Loans for Members",
    subtitle: "Get financing with your Remote Agric investment",
    image: "/images/member-loan.webp",
    action: "Apply for a Loan",
    features: [
      { icon: "sprout", text: "For members with an active Remote Agric investment" },
      { icon: "coins", text: "Borrow a percentage of your eligible investment value" },
      { icon: "shield", text: "Backed by your eligible Remote Agric investment" },
      { icon: "clock", text: "Repay on agreed terms, with recovery terms disclosed before you accept" },
    ],
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="mx-auto max-w-[1440px] scroll-mt-8 px-5 pb-10 sm:px-8 xl:px-12">
      <h2 id="services-heading" className="text-base font-semibold tracking-[0.22em]">
        THREE WAYS TO BUILD YOUR FINANCIAL FUTURE
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-muted">
        As a member, you can save for the long term, keep flexible savings, and
        access loans — all in one platform.
      </p>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        {services.map(({ title, subtitle, image, action, features }, index) => (
          <article key={title} className={`flex min-w-0 flex-col rounded-2xl p-6 sm:p-7 ${index === 1 ? "bg-gold/[0.06]" : "bg-soft/55"}`}>
            <div className="flex items-start gap-4">
              <span className={`flex size-14 shrink-0 items-center justify-center rounded-2xl font-display text-3xl font-semibold ${index === 1 ? "bg-gold/10 text-gold" : "bg-brand/10"}`}>0{index + 1}</span>
              <div>
                <h3 className="font-display text-2xl leading-tight font-semibold tracking-[-0.035em]">{title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{subtitle}</p>
              </div>
            </div>
            <div className="my-6 grid flex-1 items-center gap-4 min-[400px]:grid-cols-[.8fr_1.2fr] sm:grid-cols-[.6fr_1.4fr] xl:grid-cols-[.7fr_1.3fr]">
              <div className="relative mx-auto h-52 w-full max-w-[240px] min-[400px]:h-full min-[400px]:min-h-60">
                <Image src={image} alt="" fill sizes="(max-width: 1279px) 240px, 160px" className="object-contain" />
              </div>
              <ul className="grid gap-4">
                {features.map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${index === 1 ? "bg-gold/10 text-gold" : "bg-soft text-foreground"}`}>
                      <Icon name={icon} className="size-5" />
                    </span>
                    <p className="pt-1 text-lg leading-relaxed text-muted">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <MembershipButton action="signin" className={`${button} w-full gap-3 self-start text-white sm:w-auto ${index === 1 ? "bg-[#986b19] hover:bg-[#805812]" : "bg-brand hover:bg-brand-hover"}`}>
              {action}<Icon name="arrow" className="size-5 shrink-0" />
            </MembershipButton>
          </article>
        ))}
      </div>
    </section>
  );
}
