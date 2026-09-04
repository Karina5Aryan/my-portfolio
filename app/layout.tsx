import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karina Aryan — Full-Stack Developer",
  description:
    "Full-stack developer from Ahmedabad specializing in React, React Native and Next.js.",
  keywords: [
    "Karina Aryan",
    "React developer",
    "Next.js developer",
    "React Native",
    "full-stack developer",
    "Ahmedabad",
  ],
  openGraph: {
    title: "Karina Aryan — Full-Stack Developer",
    description:
      "Full-stack developer from Ahmedabad specializing in React, React Native and Next.js.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
