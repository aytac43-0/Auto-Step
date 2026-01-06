import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });

export const metadata: Metadata = {
  title: "Auto Step | Professional Automation Studio",
  description: "Bespoke automation systems for scalable business operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${interTight.variable} font-sans bg-[#0A0F1A] text-gray-100 min-h-screen flex flex-col`}>
        {/* Subtle Background Elements */}
        <div className="fixed inset-0 grid-subtle pointer-events-none z-0" />
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-900/5 to-transparent pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
