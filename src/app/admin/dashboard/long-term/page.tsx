import { FinanceScreen } from "@/components/dashboard/finance-screen";

export const metadata = {
  title: "Long-term contributions | Remote Agric Cooperative",
};

export default function Page() {
  return <FinanceScreen section="Long-term Contributions" admin />;
}
