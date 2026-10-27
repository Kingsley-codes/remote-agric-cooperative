import Link from "next/link";
import { MembershipButton } from "./membership-provider";
import { links, navigationHref } from "./navigation";
import { Brand } from "./site-ui";

export function Footer() {
  return (
    <footer className="bg-[#0b3327] text-[#f8f7ed]">
      <div className="mx-auto max-w-[1440px] px-5 pt-12 pb-7 sm:px-8 xl:px-12">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <div>
            <Brand footer />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#c3d4c7]">
              A community for remote farmers to save, access financing, and build a
              future powered by agriculture.
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold">Explore</h2>
            <ul className="grid gap-3 text-sm text-[#c3d4c7]">
              {links.filter(([, id]) => id !== "home" && id !== "faq").map(([label, id]) => (
                <li key={id}>
                  <Link
                    href={navigationHref(id)}
                    className="inline-flex min-h-11 items-center hover:text-white hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold">Our community</h2>
            <ul className="grid gap-3 text-sm text-[#c3d4c7]">
              <li>
                <Link
                  href="/#impact"
                  className="inline-flex min-h-11 items-center hover:text-white hover:underline"
                >
                  Our Impact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="inline-flex min-h-11 items-center hover:text-white hover:underline"
                >
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <MembershipButton
                  action="signin"
                  className="inline-flex min-h-11 items-center hover:text-white hover:underline"
                >
                  Member Sign In
                </MembershipButton>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-semibold">Legal</h2>
            <ul className="grid gap-3 text-sm text-[#c3d4c7]">
              {[
                ["Privacy Policy", "/privacy-policy"],
                ["Terms of Service", "/terms-of-service"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-11 items-center hover:text-white hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-xs text-[#c3d4c7] sm:flex-row">
          <p>© 2026 Remote Agric Cooperative.</p>
          <p>Growing value. Building community.</p>
        </div>
      </div>
    </footer>
  );
}
