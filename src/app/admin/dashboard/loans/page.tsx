import { FinanceScreen } from "@/components/dashboard/finance-screen";

export const metadata = { title: "Loan Requests | Remote Agric Cooperative" };

export default function Page() {
  return <FinanceScreen section="Loan Requests" admin />;
}
