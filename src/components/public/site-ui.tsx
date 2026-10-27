import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export type IconName =
  | "user"
  | "wallet"
  | "lock"
  | "calendar"
  | "pie"
  | "bolt"
  | "clock"
  | "grid"
  | "chevron"
  | "target"
  | "eye"
  | "coins"
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
export function Icon({
  name,
  className = "size-7",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    user: <><circle cx="12" cy="7" r="4" /><path d="M4 22v-3a8 8 0 0 1 16 0v3Z" /></>,
    wallet: <><path d="M20 8V5H6a3 3 0 0 0 0 6h15v10H6a3 3 0 0 1-3-3V8m18 5h-5v5h5" /><path d="M6 5V3h11v2" /></>,
    lock: <><rect x="5" y="10" width="14" height="12" rx="2" /><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v3" /></>,
    calendar: <><rect x="3" y="5" width="18" height="17" rx="2" /><path d="M7 2v6m10-6v6M3 11h18m-14 4h1m4 0h1m4 0h1M7 18h1m4 0h1" /></>,
    pie: <><path d="M11 2a10 10 0 1 0 11 11H11Z" /><path d="M15 2v7h7a9 9 0 0 0-7-7Z" /></>,
    bolt: <path d="m14 2-9 12h6l-1 8 9-12h-6Z" />,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    chevron: <path d="m9 4 8 8-8 8" />,
    target: <><circle cx="11" cy="13" r="9" /><circle cx="11" cy="13" r="5" /><path d="m11 13 10-10m-1-2v4h4" /></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    coins: <><ellipse cx="9" cy="5" rx="7" ry="3" /><path d="M2 5v4c0 1.7 3.1 3 7 3m7-7v4M2 9v4c0 1.7 3.1 3 7 3m-7-3v4c0 1.7 3.1 3 7 3" /><ellipse cx="16" cy="13" rx="6" ry="3" /><path d="M10 13v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" /></>,
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

export const button =
  "inline-flex min-h-13 items-center justify-center gap-6 rounded-lg px-7 py-3.5 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/#home"
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
    </Link>
  );
}
