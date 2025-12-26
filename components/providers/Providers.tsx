"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount - runs only once on client
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const html = document.documentElement;

    if (savedTheme === "dark") {
      html.classList.add("dark");
    } else if (savedTheme === "light") {
      html.classList.remove("dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, []);

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <Provider store={store}>
        <div style={{ visibility: "hidden" }}>{children}</div>
      </Provider>
    );
  }

  return <Provider store={store}>{children}</Provider>;
}
