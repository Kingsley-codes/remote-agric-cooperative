import type { ReactNode } from "react";
import { Footer } from "@/components/public/footer";
import { MembershipProvider } from "@/components/public/membership-provider";
import { Navbar } from "@/components/public/navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <MembershipProvider>
      <a
        href="#main"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-lg bg-brand p-4 text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </MembershipProvider>
  );
}
