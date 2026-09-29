import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./morise-calm.css";

export const metadata: Metadata = {
  title: "MORISE",
  description: "A calm SYSTEM-first world shaped by every real Player action.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
