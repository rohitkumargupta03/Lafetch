"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, mounted, router]);

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
