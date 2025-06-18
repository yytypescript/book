import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | TypeScript入門『サバイバルTypeScript』",
    default: "TypeScript入門『サバイバルTypeScript』",
  },
  description:
    "「TypeScriptを最短ルートで実務で使えるように読者を導く」を目標に、実務で必須な知識に厳選した内容になっています。",
} satisfies Metadata;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
