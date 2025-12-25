import type { Metadata } from "next";
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import CommandBar from "@/components/ui/CommandBar";
import { Sidebar } from "@/components/layout/Sidebar";
import Footer from "@/components/ui/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Aditya Mali - Full Stack Developer",
    template: "%s | Aditya Mali",
  },
  description:
    "Full Stack Software Developer. Building innovative solutions and creating impactful digital experiences.",
  keywords: ["Full Stack Developer", "Aditya Mali"],
  authors: [{ name: "Aditya Mali", url: "https://adityamali.com" }],
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
import TopSearch from "@/components/layout/TopSearch";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <ThemeProvider>
        <body className="antialiased">
          <TopSearch />
          <Sidebar />
          <div className="md:pl-[280px] min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CommandBar />
        </body>
      </ThemeProvider>
    </html>
  );
}