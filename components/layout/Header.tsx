"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/slices/authSlice";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { theme, toggleTheme, mounted } = useTheme();

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-10 bg-white/95 dark:bg-[#1a1632]/95 backdrop-blur-xl border-b border-gray-200 dark:border-[#3b3561] shadow-sm dark:shadow-primary/5 transition-all duration-300">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 rounded-xl text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light bg-gray-50 dark:bg-[#241f42] hover:bg-primary/10 dark:hover:bg-primary/20 border border-gray-200 dark:border-transparent transition-all duration-300"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:block w-1 h-8 bg-linear-to-b from-primary via-secondary to-cyan-400 rounded-full"></div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Welcome back,
              </p>
              <h2 className="text-lg font-bold text-gradient">{user?.name}</h2>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Theme toggle - Beautiful animated switch */}
          <button
            onClick={toggleTheme}
            className="relative flex items-center w-20 h-10 rounded-full bg-linear-to-r from-blue-100 to-blue-200 dark:from-indigo-900 dark:to-purple-900 p-1 transition-all duration-500 hover:shadow-lg hover:shadow-primary/25 dark:hover:shadow-primary/40 border border-gray-200 dark:border-primary/30 group"
            aria-label="Toggle theme"
          >
            {/* Background icons */}
            <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
              {/* Sun icon */}
              <svg
                className={`w-5 h-5 transition-all duration-500 ${
                  mounted && theme === "dark"
                    ? "text-gray-500 opacity-50"
                    : "text-yellow-500 opacity-100"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
              {/* Moon icon */}
              <svg
                className={`w-5 h-5 transition-all duration-500 ${
                  mounted && theme === "dark"
                    ? "text-yellow-300 opacity-100"
                    : "text-gray-400 opacity-50"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </div>
            {/* Sliding circle */}
            <div
              className={`relative w-8 h-8 rounded-full bg-white dark:bg-linear-to-br dark:from-indigo-400 dark:to-purple-500 shadow-md transform transition-all duration-500 ease-out flex items-center justify-center ${
                mounted && theme === "dark" ? "translate-x-10" : "translate-x-0"
              } group-hover:scale-110`}
            >
              {/* Icon inside the circle */}
              {mounted && theme === "dark" ? (
                <svg
                  className="w-4 h-4 text-white animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-primary/5 to-secondary/5 dark:from-primary/20 dark:to-secondary/20"></div>
          </button>

          {/* Logout button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="hidden sm:flex"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </Button>

          {/* Mobile logout button */}
          <button
            onClick={handleLogout}
            className="sm:hidden p-3 rounded-xl text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 bg-gray-50 dark:bg-[#241f42] hover:bg-red-50 dark:hover:bg-red-900/20 border border-gray-200 dark:border-transparent transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
