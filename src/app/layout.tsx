import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import localFont from "next/font/local";

import CommandBar from "@/components/ui/CommandBar";
import Header from "@/components/ui/Header";
import CursorProvider from "@/components/providers/CursorProvider";
import Footer from "@/components/ui/Footer";

const futura = localFont({
  src: "../../public/fonts/futura.ttf",
  variable: "--font-futura",
});

export const metadata: Metadata = {
  title: "Aditya Mali - Full Stack Developer",
  description: "Portfolio website of Aditya Mali",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={futura.variable}>
      <body>
        <CursorProvider>
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
          <CommandBar />
        </CursorProvider>
      </body>
    </html>
  );
}
