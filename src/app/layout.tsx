import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import { Footer } from "@/components/footer";
import Navbar from "@/components/nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Auto-Step | Professional Digital Solutions",
  description: "Your partner in digital excellence.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icon.png',
    apple: '/icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <Toaster position="top-center" richColors theme="dark" />
        <div className="min-h-screen flex flex-col">
          {/* Global Navbar only for public pages - but checking paths in component or letting it render is fine for atomic push */}
          {children}
        </div>
      </body>
    </html>
  );
}
