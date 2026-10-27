"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMembership } from "./membership-provider";
import { isNavigationActive, links, navigationHref } from "./navigation";
import { Brand, button, Icon } from "./site-ui";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const { openMembership } = useMembership();
  const pathname = usePathname();
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);
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
          {links.map(([label, id]) => (
            <Link
              key={id}
              href={navigationHref(id)}
              aria-current={isNavigationActive(pathname, id) ? "page" : undefined}
              className={`border-b-2 py-3 text-base font-medium transition-colors hover:text-gold focus-visible:outline-gold ${isNavigationActive(pathname, id) ? "border-gold" : "border-transparent"}`}
            >
              {label}
            </Link>
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
          <div className="hidden items-center gap-4 xl:flex">
            <button
              onClick={() => openMembership("signin")}
              className={`${button} border border-brand`}
            >
              Sign In
            </button>
            <button
              onClick={() => openMembership("join")}
              className={`${button} bg-brand text-white hover:bg-brand-hover`}
            >
              Join Cooperative
            </button>
          </div>
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
              <Link
                key={id}
                href={navigationHref(id)}
                aria-current={isNavigationActive(pathname, id) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-lg hover:bg-soft ${isNavigationActive(pathname, id) ? "bg-soft font-semibold" : ""}`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openMembership("signin");
                }}
                className={`${button} border border-brand`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openMembership("join");
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
  );
}
