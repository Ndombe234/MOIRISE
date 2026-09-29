import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MORISE",
  description: "A calm, adaptive social experience for Otaku.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
