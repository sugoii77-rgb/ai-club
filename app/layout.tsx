import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Club — AI를 배우는 사람들의 실험실",
  description:
    "하루 하나의 AI Workflow, 함께 만들고 공유하는 AI 커뮤니티. ChatGPT, Claude, Copilot, Notion, Vercel을 실험하는 동호회.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-night antialiased">{children}</body>
    </html>
  );
}
