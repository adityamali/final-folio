"use client";
import { createContext, useContext, useEffect, useMemo } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext({
  theme: "dark" as Theme,
  toggleTheme: () => {}, // No-op since dark mode is enforced
});

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const value = useMemo(() => ({ theme: "dark" as Theme, toggleTheme: () => {} }), []);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
