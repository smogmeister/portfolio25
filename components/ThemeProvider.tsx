"use client";
import { useEffect } from "react";
import { useTheme } from "../hooks/use-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, mounted } = useTheme();

  useEffect(() => {
    // Theme is already applied by useTheme hook, but ensure it's set on mount
    if (mounted) {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme, mounted]);

  return <>{children}</>;
}
