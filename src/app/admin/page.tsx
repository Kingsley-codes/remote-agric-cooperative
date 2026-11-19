"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function AdminPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/admin/dashboard"); }, [router]);
  return <p className="p-8" role="status">Loading admin workspace...</p>;
}
