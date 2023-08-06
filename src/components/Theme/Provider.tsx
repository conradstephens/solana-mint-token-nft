"use client";

import { useState, useEffect } from "react";
import { useTheme, ThemeProvider } from "next-themes";

interface ParentProps {
  children?: any;
}

function ThemeSelector({ children }: ParentProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // necessary to avoid hydration error between ssr and client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div data-theme={resolvedTheme === "light" ? "cmyk" : "night"}>
      {children}
    </div>
  );
}

export default function Provider({ children }: ParentProps) {
  return (
    <ThemeProvider attribute="class" enableColorScheme>
      <ThemeSelector>{children}</ThemeSelector>
    </ThemeProvider>
  );
}
