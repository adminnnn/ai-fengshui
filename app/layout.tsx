import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "../components/Footer";
import 'swiper/css';
import 'swiper/css/pagination';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI 八字算命 - 智能命理分析平台",
  description: "基于人工智能的现代化八字算命平台，提供专业的命理分析服务",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 