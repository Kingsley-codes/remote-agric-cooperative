"use client";

import { type ReactNode } from "react";
import { Icon, type IconName } from "@/components/public/site-ui";

export type Identity = { name: string; email: string; reference?: string };
export function Glyph({ name }: { name: string }) {
  const custom: Record<string, ReactNode> = {
    eye: (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    flag: (
      <>
        <path d="M5 22V3m0 1c5-5 9 5 14 0v10c-5 5-9-5-14 0" />
      </>
    ),
    "panel-collapse": (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M9 4v16m7-11-3 3 3 3" />
      </>
    ),
    "panel-expand": (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M9 4v16m4-11 3 3-3 3" />
      </>
    ),
    "chevrons-vertical": <path d="m9 8 3-3 3 3m-6 8 3 3 3-3" />,
    home: (
      <>
        <path d="m3 10 9-7 9 7v11h-6v-7H9v7H3Z" />
        <path d="M1 11 12 2l11 9" />
      </>
    ),
    document: (
      <>
        <path d="M5 2h10l4 4v16H5Z" />
        <path d="M14 2v5h5M8 11h8m-8 4h8m-8 4h5" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M9 21h6" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V2m-5 5 5-5 5 5M3 13v8h18v-8" />
      </>
    ),
    plus: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 7v10M7 12h10" />
      </>
    ),
    search: (
      <>
        <circle cx="10" cy="10" r="7" />
        <path d="m15 15 7 7" />
      </>
    ),
  };
  if (!custom[name]) return <Icon name={name as IconName} />;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {custom[name]}
    </svg>
  );
}
