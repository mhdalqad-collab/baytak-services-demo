import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const themeOptions = [
  { value: "light", labelKey: "theme.light" },
  { value: "dark", labelKey: "theme.dark" },
  { value: "gray", labelKey: "theme.gray" },
  { value: "ocean", labelKey: "theme.ocean" },
  { value: "warm", labelKey: "theme.warm" }
];

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("baytak-theme") || "light");

  useEffect(() => {
    localStorage.setItem("baytak-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo(() => ({ setTheme, theme, themeOptions }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
