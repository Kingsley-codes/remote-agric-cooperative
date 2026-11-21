"use client";

import { createContext, useContext } from "react";
import type { Identity } from "./dashboard-ui";

type DashboardContextValue = {
  identity: Identity;
  view: string;
  navigate: (view: string) => void;
};

export const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within a dashboard layout");
  return context;
}
