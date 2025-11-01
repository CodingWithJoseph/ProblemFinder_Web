import { Metadata } from "next";
import ClientLayout from "./layout.client";
import { ThemeProvider } from "@/context/ThemeProvider";
import React from "react";

export const metadata: Metadata = {
  title: "BlueLabs",
  description: "Build fast. Build often.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ClientLayout>{children}</ClientLayout>
    </ThemeProvider>
  );
}
