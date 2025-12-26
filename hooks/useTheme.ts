"use client";

import { useEffect, useState, useCallback } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const html = document.documentElement;

    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const detectedTheme = prefersDark ? "dark" : "light";
      setTheme(detectedTheme);
      if (prefersDark) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    // Use functional update to get the current theme value
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);

      // Force a reflow before adding/removing class for smooth transition
      if (newTheme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
      return newTheme;
    });
  }, []);

  return { theme, toggleTheme, mounted };
}
