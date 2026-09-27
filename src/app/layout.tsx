import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MORISE",
  description: "A world where every Player evolves through their own path.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
