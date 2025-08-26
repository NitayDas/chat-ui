import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Frontend Assessment – Next.js + TS + shadcn + prompt-kit",
  description: "Single-page demo app showcasing Next.js, TypeScript, TailwindCSS, shadcn/ui, and prompt-kit-style components.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
