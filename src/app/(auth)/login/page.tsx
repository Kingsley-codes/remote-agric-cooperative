import type { Metadata } from "next";
import { AuthScreen } from "@/components/auth/auth-screen";

export const metadata: Metadata = { title: "Sign In | Remote Agric Cooperative" };

export default function LoginPage() {
  return <AuthScreen mode="login" />;
}
