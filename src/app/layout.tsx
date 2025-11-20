import type { Metadata } from "next";

import "./globals.css";

import localFont from "next/font/local";

import CommandBar from "@/components/ui/CommandBar";
import { Sidebar } from "@/components/layout/Sidebar";
import Footer from "@/components/ui/Footer";
import DoodleBackground from "@/components/ui/DoodleBackground";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${futura.variable} dark`}>
      <ThemeProvider>
        <body>
          {/* <DoodleBackground /> Removed for cleaner theme */}
          <Sidebar />
          <div className="md:pl-[280px] min-h-screen flex flex-col transition-all duration-300">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CommandBar />
        </body>
      </ThemeProvider>
    </html>
  );
}