"use client";
import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// DARK MODE DISABLED: the site always renders in light theme.
// The previous localStorage / prefers-color-scheme logic is in git history.
const THEME: Theme = "light";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

const noopSubscribe = () => () => {};

export function useTheme() {
  // false during SSR and hydration, true on the client afterwards
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    applyTheme(THEME);
  }, []);

  const setTheme = () => {
    // DARK MODE DISABLED: always force light theme
    applyTheme(THEME);
  };

  const toggleTheme = () => {
    // DARK MODE DISABLED: no-op
  };

  return {
    theme: THEME,
    setTheme,
    toggleTheme,
    mounted,
  };
}
