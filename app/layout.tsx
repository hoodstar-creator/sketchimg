import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sketch | 캐리커처 사진",
  description: "QR로 캐리커처 사진을 전달합니다.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
