import type { Metadata } from "next";
import "./globals.css";
import { Anton, DM_Sans, Permanent_Marker } from "next/font/google";
import CommandBar from "@/components/ui/CommandBar";
import { Sidebar } from "@/components/layout/Sidebar";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: "400",
  display: "swap",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${dmSans.variable} ${permanentMarker.variable}`}>
      <body className="antialiased bg-cream text-charcoal selection:bg-orange selection:text-cream overflow-hidden">
        <ThemeProvider>
          <div className="flex h-[calc(100vh-1rem)] md:h-[calc(100vh-2rem)] border-4 md:border-8 border-charcoal m-2 md:m-4 relative shadow-[4px_4px_0px_0px_#2D2D2D] md:shadow-retro-lg text-charcoal bg-cream">
            <Sidebar />
            <div className="flex-1 flex flex-col relative z-10 min-w-0">
              {/* <TopSearch /> */}
              <main className="flex-1 p-2 md:p-8 lg:p-12 overflow-y-auto overflow-x-hidden w-full">
                {children}
                <Footer />
              </main>
            </div>
          </div>
          <CommandBar />
        </ThemeProvider>
      </body>
    </html>
  );
}