"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-[#0c0a1d] dark:via-[#1a1632] dark:to-[#0c0a1d]">
      <LoadingSpinner size="lg" />
    </div>
  );
}
