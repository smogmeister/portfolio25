"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // DARK MODE DISABLED: Always use light theme
    // Get theme from localStorage or system preference
    // const storedTheme = localStorage.getItem("theme") as Theme | null;
    // const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");
    const initialTheme = "light"; // Force light theme
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    
    // Listen for system preference changes (only if no stored preference)
    // DISABLED: Dark mode is disabled
    // if (!storedTheme) {
    //   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    //   const handleChange = (e: MediaQueryListEvent) => {
    //     const newTheme = e.matches ? "dark" : "light";
    //     setThemeState(newTheme);
    //     applyTheme(newTheme);
    //   };
      
    //   mediaQuery.addEventListener("change", handleChange);
    //   return () => mediaQuery.removeEventListener("change", handleChange);
    // }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const setTheme = (newTheme: Theme) => {
    // DARK MODE DISABLED: Always force light theme
    const forcedTheme = "light";
    setThemeState(forcedTheme);
    // localStorage.setItem("theme", newTheme);
    applyTheme(forcedTheme);
  };

  const toggleTheme = () => {
    // DARK MODE DISABLED: No-op function
    // const newTheme = theme === "light" ? "dark" : "light";
    // setTheme(newTheme);
    return; // Disabled
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted,
  };
}
