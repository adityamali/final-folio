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
  title: {
    default: "Aditya Mali - Full Stack Developer",
    template: "%s | Aditya Mali",
  },
  description:
    "Full Stack Software Developer. Building innovative solutions and creating impactful digital experiences.",
  keywords: ["Full Stack Developer", "Aditya Mali"],
  authors: [{ name: "Aditya Mali" }],
  creator: "Aditya Mali",
  publisher: "Aditya Mali",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityamali.com",
    siteName: "Aditya Mali",
    title: "Aditya Mali - Full Stack Software Developer",
    description:
      "Full Stack Software Developer. Building innovative solutions and creating impactful digital experiences.",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    apple: {
      url: "/icon512.png",
      type: "image/png",
    },
  },
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${futura.variable}`}>
      <ThemeProvider>
        <body>
          <CursorProvider>
            <Header />
            <main className="pt-20">{children}</main>
            <Footer />
            <CommandBar />
          </CursorProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
