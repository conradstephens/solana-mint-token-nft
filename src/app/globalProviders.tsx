"use client";

import { ThemeProvider } from "@/components";
import { useEffect } from "react";

export default function GlobalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // need buffer imported if not already imported
    window.Buffer = window.Buffer || require("buffer").Buffer;
  }, []);

  return <ThemeProvider>{children}</ThemeProvider>;
}
