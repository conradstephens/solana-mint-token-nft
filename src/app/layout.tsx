import "../styles/globals.css";
import GlobalProviders from "./globalProviders";
import type { Metadata } from "next";

const title = "Website Starter";
const description =
  "A starter template using NextJS, Tailwind CSS and Redux Toolkit";

const url = process.env.NEXTAUTH_URL ?? "https://website-starter.dev";

declare global {
  interface Window {
    KUTE: any;
  }
}

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(url),
  openGraph: {
    title,
    description,
    url,
    type: "website",
  },
  twitter: {
    card: "summary",
    creator: "@conradastephens",
    title,
    description,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  // icons: {
  //   icon: [
  //     {
  //       url: "your icon url",
  //     },
  //     new URL(
  //       "your icon url",
  //     ),
  //   ],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
