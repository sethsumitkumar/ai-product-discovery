import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "ShopMind — AI Product Discovery",
  description:
    "Find the perfect tech products using natural language. Ask in plain English and let AI match you with exactly what you need.",
  openGraph: {
    title: "ShopMind — AI Product Discovery",
    description: "Ask AI to find the perfect product for you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
