import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "Task Management Dashboard",
  description:
    "A modern task management dashboard built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
