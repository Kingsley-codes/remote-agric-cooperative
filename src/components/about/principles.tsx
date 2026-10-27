import { Icon } from "@/components/public/site-ui";

const principles = [
  { id: "mission", title: "Our Mission", icon: "target", text: "To empower e-farmers to save, grow, access financing, and build long-term wealth through a transparent and sustainable cooperative model." },
  { id: "vision", title: "Our Vision", icon: "eye", text: "To be Africa’s leading agricultural cooperative, connecting people, capital, and opportunities for a food-secure and prosperous future." },
  { id: "values", title: "Our Values", icon: "people", text: "Community, transparency, trust, inclusion, sustainability, and shared growth." },
] as const;

export function Principles() {
  return (
    <section aria-label="Our mission, vision, and values" className="mx-auto grid max-w-[1440px] gap-5 px-5 py-8 sm:px-8 lg:grid-cols-3 xl:px-12">
      {principles.map(({ id, title, icon, text }) => (
        <article key={id} aria-labelledby={`${id}-title`} className="flex gap-5 rounded-2xl bg-soft/45 p-6 xl:gap-6 xl:p-7">
          <span className={`flex size-14 shrink-0 items-center justify-center rounded-full ${id === "vision" ? "bg-gold/15 text-gold" : "bg-brand/10 text-brand-content"}`}>
            <Icon name={icon} className="size-8" />
          </span>
          <div>
            <h2 id={`${id}-title`} className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 text-lg leading-relaxed text-muted">{text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
