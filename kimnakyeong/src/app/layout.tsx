import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "모아빗 — 소중한 순간을 모으다",
  description: "2026년형 프리미엄 소셜 미디어 앱. 일상의 소중한 순간들을 아름답게 모아보세요.",
  keywords: ["소셜미디어", "모아빗", "Moabit", "사진", "영상", "커뮤니티"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-bg-warm text-text-primary min-h-screen">
        <div className="mx-auto max-w-[430px] min-h-screen relative bg-bg-warm shadow-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
