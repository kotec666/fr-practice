import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { preconnect, prefetchDNS } from "react-dom";
import { env } from "@/consts/env";

const inter = Inter({
  subsets: ["latin"],
  style: "normal",
});

export const metadata: Metadata = {
  title: {
    default: "Practice",
    template: "%s | Practice",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect(env.api || "");
  prefetchDNS(env.api || "");
  return (
    <html lang="ru" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
