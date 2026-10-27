"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type IconName =
  | "people"
  | "leaf"
  | "chart"
  | "save"
  | "loan"
  | "shield"
  | "arrow"
  | "sun"
  | "moon"
  | "menu"
  | "close"
  | "sprout";
function Icon({
  name,
  className = "size-7",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    people: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3M17 4a3 3 0 0 1 0 6m1 3a5 5 0 0 1 3 5v3" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 3C8 2 3 7 5 14c2 7 13 7 15-11Z" />
        <path d="M3 22c1-7 6-12 12-15" />
      </>
    ),
    chart: <path d="M5 20v-6m7 6V9m7 11V3" strokeWidth="5" />,
    save: (
      <>
        <path d="M19 9a7 7 0 0 0-12-2L3 8v8l3 1 1 4h3l1-3h4l1 3h3l1-6 2-1v-4h-3ZM8 4V2m3 6h4" />
        <circle cx="17" cy="11" r=".7" fill="currentColor" />
      </>
    ),
    loan: (
      <>
        <path d="m2 16 5-4h6a2 2 0 0 1 0 4H9m-7 3 5 3 14-8a2 2 0 0 0-3-3l-3 2" />
        <circle cx="14" cy="5" r="3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6l-9-4Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
      </>
    ),
    moon: <path d="M20 15A9 9 0 0 1 9 4 9 9 0 1 0 20 15Z" />,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    sprout: (
      <>
        <path d="M12 22V9m0 9C4 19 2 14 2 10c7 0 10 3 10 8Zm0-4c0-7 4-10 10-10 0 6-3 10-10 10ZM12 9C8 6 9 3 12 1c3 2 4 5 0 8Z" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const links = [
  ["Home", "home"],
  ["About", "about"],
  ["How It Works", "how-it-works"],
  ["Benefits", "benefits"],
  ["Our Impact", "impact"],
  ["FAQ", "faq"],
];
const benefits: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "save",
    title: "Save and Grow",
    description:
      "Make long-term or short-term contributions and work towards your financial goals.",
  },
  {
    icon: "loan",
    title: "Access Loans",
    description:
      "Access financing for agricultural and personal needs, subject to eligibility and approval.",
  },
  {
    icon: "chart",
    title: "Earn Together",
    description:
      "Our cooperative invests pooled funds in opportunities that support shared growth.",
  },
  {
    icon: "people",
    title: "A Stronger Community",
    description:
      "Join a community of e-farmers building wealth and supporting agriculture.",
  },
];
const button =
  "inline-flex min-h-13 items-center justify-center gap-6 rounded-lg px-7 py-3.5 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      aria-label="Remote Agric Cooperative home"
      className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
    >
      <span
        className={`flex size-10 items-center justify-center rounded-lg sm:size-14 ${footer ? "bg-[#faf8f3]" : ""}`}
      >
        <Image
          src="/logo.png"
          alt=""
          width={46}
          height={61}
          className="h-10 w-7 object-contain sm:h-12 sm:w-9"
        />
      </span>
      <span className="font-display text-[19px] font-bold leading-[1.08] sm:text-[25px]">
        Remote Agric<span className="block text-gold">Cooperative</span>
      </span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [modal, setModal] = useState<"join" | "signin" | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (modal) dialog.current?.showModal();
    else dialog.current?.close();
  }, [modal]);
  useEffect(() => {
    if (!menuOpen && !modal) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, modal]);
  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("navigation-toggle")?.focus();
      }
    }
    const desktop = window.matchMedia("(min-width: 1280px)");
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) setMenuOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
  }
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-lg bg-brand p-4 text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        id="home"
        className="relative z-20 border-b border-foreground/5 bg-surface shadow-[0_3px_18px_#092d2905]"
      >
        <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-2 px-4 sm:min-h-24 sm:gap-4 sm:px-8 xl:px-12">
          <Brand />
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-4 xl:flex"
          >
            {links.map(([label, id], i) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={i === 0 ? "page" : undefined}
                className={`border-b-2 py-3 text-base font-medium transition-colors hover:text-gold focus-visible:outline-gold ${i === 0 ? "border-gold" : "border-transparent"}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1 sm:gap-3 lg:gap-4">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
              className="flex size-11 shrink-0 items-center justify-center rounded-full text-gold transition-colors hover:bg-soft"
            >
              <Icon name={dark ? "moon" : "sun"} className="size-6" />
            </button>
            <button
              onClick={() => setModal("signin")}
              className={`${button} hidden border border-brand md:inline-flex`}
            >
              Sign In
            </button>
            <button
              onClick={() => setModal("join")}
              className={`${button} hidden bg-brand text-white hover:bg-brand-hover lg:inline-flex`}
            >
              Join Cooperative
            </button>
            <button
              id="navigation-toggle"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex size-11 items-center justify-center rounded-lg hover:bg-soft xl:hidden"
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute top-full right-0 left-0 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-b border-foreground/10 bg-surface p-4 shadow-xl sm:max-h-[calc(100dvh-6rem)] xl:hidden"
          >
            <div className="mx-auto grid max-w-xl gap-1">
              {links.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-lg hover:bg-soft"
                >
                  {label}
                </a>
              ))}
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setModal("signin");
                  }}
                  className={`${button} border border-brand`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setModal("join");
                  }}
                  className={`${button} bg-brand text-white`}
                >
                  Join Cooperative
                </button>
              </div>
            </div>
          </nav>
        )}
      </header>
      <main id="main">
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
              Remote Agric Cooperative is a trusted community for e-farmers to
              save, grow, access financing, and build long-term wealth — powered
              by agriculture and driven by people like you.
            </p>
            <div className="mt-7 grid gap-3 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap sm:gap-4">
              <button
                onClick={() => setModal("join")}
                className={`${button} w-full bg-brand sm:min-w-48 sm:w-auto text-white hover:bg-brand-hover`}
              >
                Get Started <Icon name="arrow" className="size-5" />
              </button>
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
            <div className="relative aspect-[4/5] max-h-[540px] w-full overflow-hidden rounded-2xl rounded-tl-[100px] sm:aspect-[5/4] lg:ml-[13%] lg:aspect-auto lg:h-[515px] lg:w-[77%] lg:rounded-tl-[170px] xl:h-[550px]">
              <Image
                src="/images/farmer.png"
                alt="Smiling farmer holding a tablet in a lush green field"
                fill
                priority
                sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 660px, 40vw"
                className="object-cover object-[48%_center]"
              />
            </div>
            <div className="relative mt-4 flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl bg-surface p-5 shadow-[0_12px_40px_#092d2910] lg:absolute lg:top-[15%] lg:left-0 lg:mt-0 lg:block lg:w-[182px]">
              <div className="flex items-center gap-3 lg:mb-3 lg:gap-2">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-soft text-brand">
                  <Icon name="people" className="size-6" />
                </span>
                <span className="text-base leading-snug sm:text-base">
                  A growing community
                </span>
              </div>
              <p className="font-display text-3xl font-semibold sm:text-4xl">
                12,480
              </p>
              <p className="mt-1 text-base text-muted sm:text-base">
                Active members
              </p>
            </div>
            <div
              id="impact"
              className="relative mt-4 grid w-full scroll-mt-8 gap-3 sm:grid-cols-2 lg:absolute lg:top-[18%] lg:-right-1 lg:mt-0 lg:w-[198px] lg:grid-cols-1 xl:w-[228px]"
            >
              {(
                [
                  {
                    icon: "leaf",
                    value: "₦1.8 Billion",
                    label: "Total long-term pool value",
                  },
                  {
                    icon: "chart",
                    value: "₦320 Million",
                    label: "Total returns generated",
                  },
                  {
                    icon: "people",
                    value: "98%",
                    label: "Member satisfaction rate",
                  },
                ] as const
              ).map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-2xl bg-surface/95 px-3 py-4 shadow-[0_12px_40px_#092d2908] sm:px-4"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-soft text-brand">
                    <Icon name={stat.icon} className="size-6" />
                  </span>
                  <div>
                    <p className="font-display text-[20px] leading-tight font-bold sm:text-[22px]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-base leading-snug text-muted sm:text-base">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-4 flex w-full items-center gap-4 rounded-2xl bg-brand p-5 text-white lg:absolute lg:right-0 lg:bottom-2 lg:mt-0 lg:max-w-[300px]">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-black/10 text-[#d2aa51]">
                <Icon name="sprout" className="size-9" />
              </span>
              <p className="text-base leading-snug">
                <span className="mb-1 block text-[#b9dfcc]">
                  More than savings.
                </span>
                A stronger future for Nigerian agriculture.
              </p>
            </div>
          </div>
        </section>
        <section
          id="benefits"
          aria-label="Membership benefits"
          className="scroll-mt-8 border-y border-foreground/[0.03] bg-surface/50"
        >
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-9 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-0 lg:py-10 xl:px-12">
            {benefits.map((b, i) => (
              <article
                key={b.title}
                className={`relative ${i ? "lg:pl-8 xl:pl-9" : ""} ${i !== 3 ? "lg:pr-7 lg:after:absolute lg:after:top-4 lg:after:right-0 lg:after:bottom-3 lg:after:w-px lg:after:bg-foreground/10" : ""}`}
              >
                <span
                  className={`mb-4 flex size-[72px] items-center justify-center rounded-full ${i % 2 ? "bg-[#f6ecd8] text-[#a77b21]" : "bg-soft text-brand"}`}
                >
                  <Icon name={b.icon} className="size-8" />
                </span>
                <h2 className="font-display text-[23px] font-semibold tracking-tight">
                  {b.title}
                </h2>
                <p className="mt-2 text-lg leading-relaxed text-muted">
                  {b.description}
                </p>
              </article>
            ))}
          </div>
        </section>
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
              Remote Agric Cooperative is a financial cooperative for e-farmers
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
        <section
          id="how-it-works"
          aria-labelledby="steps-title"
          className="scroll-mt-8 border-y border-foreground/10 bg-soft/40 px-5 py-14 sm:px-8"
        >
          <div className="mx-auto max-w-[1344px]">
            <p className="text-base font-semibold tracking-[0.22em]">
              GROW AT YOUR OWN PACE
            </p>
            <h2
              id="steps-title"
              className="mt-3 font-display text-4xl font-semibold tracking-tight"
            >
              Your next chapter starts here.
            </h2>
            <div className="mt-9 grid gap-8 md:grid-cols-3">
              {[
                [
                  "01",
                  "Join the community",
                  "Learn about membership, complete your registration, and get verified.",
                ],
                [
                  "02",
                  "Choose your contribution",
                  "Plan for the future with long-term contributions or save for nearer-term needs.",
                ],
                [
                  "03",
                  "Grow together",
                  "Follow cooperative updates, explore eligible financing, and be part of our shared progress.",
                ],
              ].map(([n, title, text]) => (
                <div key={n} className="flex gap-4">
                  <span className="font-display text-3xl text-gold">{n}</span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold">
                      {title}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-muted">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="faq"
          aria-labelledby="faq-title"
          className="mx-auto grid max-w-[1344px] scroll-mt-8 gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[.8fr_1.2fr] xl:px-0"
        >
          <div>
            <p className="text-base font-semibold tracking-[0.22em]">
              A LITTLE MORE CLARITY
            </p>
            <h2
              id="faq-title"
              className="mt-3 font-display text-4xl leading-tight font-semibold"
            >
              Good questions.
              <br />
              Clear answers.
            </h2>
          </div>
          <div>
            {[
              [
                "Who is an e-farmer?",
                "An e-farmer is someone who supports agriculture through the Remote Agric community. You do not need to own or work on a farm to be interested in membership.",
              ],
              [
                "How do contributions work?",
                "The cooperative offers short-term savings and long-term contributions. Review the applicable fees, withdrawal rules, and commitment periods before choosing a plan.",
              ],
              [
                "Are returns guaranteed?",
                "No. Agricultural investments carry risks and returns can vary. Review the cooperative’s investment terms and reporting before contributing.",
              ],
              [
                "Can every member access a loan?",
                "Loan access depends on eligibility, active contributions, and approval. Applicable limits, fees, and repayment terms are provided before a loan is accepted.",
              ],
            ].map(([question, answer]) => (
              <details
                key={question}
                className="group border-b border-foreground/15 py-5 first:pt-0"
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-lg font-semibold marker:content-none">
                  {question}
                  <span
                    className="text-2xl font-normal text-gold transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-7 text-lg leading-relaxed text-muted">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-[#0b3327] text-[#f8f7ed]">
        <div className="mx-auto max-w-[1440px] px-5 pt-12 pb-7 sm:px-8 xl:px-12">
          <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-9 md:flex-row md:items-center">
            <div>
              <p className="font-display text-3xl font-semibold sm:text-4xl">
                A stronger tomorrow starts with us.
              </p>
              <p className="mt-3 text-lg text-[#c3d4c7]">
                Rooted in agriculture. Growing together.
              </p>
            </div>
            <button
              onClick={() => setModal("join")}
              className={`${button} w-full shrink-0 self-start bg-[#f2e7c9] sm:w-auto text-[#0b3327] hover:bg-white md:self-auto`}
            >
              Join Cooperative <Icon name="arrow" className="size-5" />
            </button>
          </div>
          <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr]">
            <div>
              <Brand footer />
              <p className="mt-5 max-w-md text-base leading-relaxed text-[#c3d4c7]">
                A community for e-farmers to save, access financing, and build a
                future powered by agriculture.
              </p>
            </div>
            <div>
              <h2 className="mb-4 text-lg font-semibold">Explore</h2>
              <ul className="grid gap-3 text-base text-[#c3d4c7]">
                {links.slice(1, 4).map(([label, id]) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="inline-flex min-h-11 items-center hover:text-white hover:underline"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-lg font-semibold">Our community</h2>
              <ul className="grid gap-3 text-base text-[#c3d4c7]">
                <li>
                  <a
                    href="#impact"
                    className="inline-flex min-h-11 items-center hover:text-white hover:underline"
                  >
                    Our Impact
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="inline-flex min-h-11 items-center hover:text-white hover:underline"
                  >
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setModal("signin")}
                    className="inline-flex min-h-11 items-center hover:text-white hover:underline"
                  >
                    Member Sign In
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-base text-[#c3d4c7] sm:flex-row">
            <p>© 2026 Remote Agric Cooperative.</p>
            <p>Growing value. Building community.</p>
          </div>
        </div>
      </footer>
      <dialog
        ref={dialog}
        onCancel={() => setModal(null)}
        onClick={(event) => {
          if (event.target === dialog.current) setModal(null);
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-foreground/10 bg-surface p-5 text-foreground shadow-2xl backdrop:bg-black/50 sm:p-9"
        aria-labelledby="dialog-title"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="flex size-14 items-center justify-center rounded-full bg-soft">
            <Icon name={modal === "join" ? "sprout" : "shield"} />
          </span>
          <button
            onClick={() => setModal(null)}
            aria-label="Close dialog"
            className="flex size-11 items-center justify-center rounded-full hover:bg-soft"
          >
            <Icon name="close" className="size-6" />
          </button>
        </div>
        <h2
          id="dialog-title"
          className="mt-5 font-display text-3xl font-semibold"
        >
          {modal === "join" ? "Let’s grow together." : "Member sign in"}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {modal === "join"
            ? "Membership brings you into a community built around agriculture, savings, and shared progress. Online registration is not available yet. Explore how contributions and membership work while we prepare to welcome you."
            : "The member portal is not connected yet. Once it is available, you’ll be able to securely access your contributions, transactions, and membership information here."}
        </p>
        <a
          href={modal === "join" ? "#how-it-works" : "#faq"}
          onClick={() => setModal(null)}
          className={`${button} mt-6 w-full gap-3 bg-brand [&_svg]:shrink-0 text-white hover:bg-brand-hover`}
        >
          {modal === "join"
            ? "Explore membership"
            : "View frequently asked questions"}
          <Icon name="arrow" className="size-5" />
        </a>
      </dialog>
    </>
  );
}
