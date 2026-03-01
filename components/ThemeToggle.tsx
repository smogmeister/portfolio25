"use client";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-accent/50 focus:outline-none focus-visible:outline-none cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, scale: 0 }}
            animate={{ 
              rotate: 0, 
              scale: [0, 1.3, 1]
            }}
            exit={{ rotate: 180, scale: 0 }}
            transition={{ 
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {theme === "light" ? (
              <Moon className="w-6 h-6 text-muted-foreground" />
            ) : (
              <Sun className="w-6 h-6 text-muted-foreground" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
