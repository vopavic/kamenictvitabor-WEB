import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kamenictví Kámen Tábor | Tradiční řemeslo",
  description: "Rodinné kamenictví s 80letou tradicí v Táboře. Hroby, kuchyňské desky, renovace a zakázková výroba.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${playfair.variable} ${manrope.variable} antialiased bg-background text-foreground font-body flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
