"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);

  const navigation = [
    {
      name: "Tasks",
      href: "/dashboard",
      icon: (
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: (
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-screen w-72 
          bg-white/95 dark:bg-[#1a1632]/95 
          backdrop-blur-xl
          shadow-2xl dark:shadow-primary/5
          border-r border-gray-200/50 dark:border-gray-700/50
          transform transition-all duration-300 ease-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="relative p-6 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary via-secondary to-cyan-500 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-white/30">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">TaskFlow</h1>
                  <p className="text-xs text-white/70">Management Dashboard</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* User info */}
          <div className="p-4 mx-4 mt-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/30">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-gray-800 rounded-full shadow-sm"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize flex items-center gap-1">
                  {user?.role === "admin" ? (
                    <>
                      <svg
                        className="w-3 h-3 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Administrator
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3 h-3 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Team Member
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Navigation
            </p>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onClose()}
                className={`
                  group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
                  ${
                    isActive(item.href)
                      ? "bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  }
                `}
              >
                <span
                  className={`${
                    isActive(item.href)
                      ? "text-white"
                      : "text-gray-400 group-hover:text-primary dark:group-hover:text-primary-light"
                  } transition-colors duration-200`}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
                {isActive(item.href) && (
                  <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700/50">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/50">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                © 2025 TaskFlow
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1">
                v2.0.0 • Made with 💜
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
