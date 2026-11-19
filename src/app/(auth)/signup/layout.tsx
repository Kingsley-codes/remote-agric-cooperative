import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create Account | Remote Agric Cooperative",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
