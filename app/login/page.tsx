"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { login, clearError } from "@/store/slices/authSlice";
import { LoginCredentials } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [showCredentials, setShowCredentials] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    dispatch(clearError());
    const result = await dispatch(login(data));

    if (login.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-[#0c0a1d] dark:via-[#1a1632] dark:to-[#0c0a1d] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-br from-cyan-400/20 to-primary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 animate-fade-in relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[linear-gradient(90deg,var(--primary),var(--secondary))] rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 transform hover:scale-110 hover:rotate-3 transition-all duration-300">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gradient">TaskFlow</h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-white/80 dark:bg-[#1a1632]/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl dark:shadow-primary/5 border border-gray-200/50 dark:border-gray-700/30">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email address"
              type="email"
              placeholder="admin@test.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                <p className="text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowCredentials(!showCredentials)}
              className="text-sm text-primary hover:text-secondary underline hover:no-underline transition-all duration-200 font-medium"
            >
              {showCredentials ? "Hide" : "Show"} test credentials
            </button>

            {showCredentials && (
              <div className="mt-4 p-5 bg-linear-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl border border-primary/20 dark:border-primary/30 animate-scale-in">
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Test Credentials:
                </p>
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <div className="bg-white/80 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    <strong className="text-primary">Admin:</strong>
                    <br />
                    <span className="font-mono text-xs">
                      Email: admin@test.com
                    </span>
                    <br />
                    <span className="font-mono text-xs">
                      Password: admin123
                    </span>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    <strong className="text-secondary">User:</strong>
                    <br />
                    <span className="font-mono text-xs">
                      Email: user@test.com
                    </span>
                    <br />
                    <span className="font-mono text-xs">Password: user123</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
