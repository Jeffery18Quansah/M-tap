import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "M-Tap — A simpler way to pay",
  description: "Make everyday payments simpler with M-Tap. Link your tag to mobile money, then tap and confirm on your phone.",
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/Minimal%20M-Tap%20Yellow%20Ribbon%20Logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFCC00",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface-page text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
