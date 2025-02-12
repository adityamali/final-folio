import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedCursor from "react-animated-cursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aditya Mali",
  description: "Made With ❤️ Using NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatedCursor
            style={{
                zIndex: 10000,
            }}
            trailingSpeed={6}
            innerSize={0}
            outerSize={20}
            color='0, 0, 0'
            outerAlpha={0.2}
            innerScale={0.7}
            outerScale={3}
            clickables={[
                'a',
                'input[type="text"]',
                'input[type="email"]',
                'input[type="number"]',
                'input[type="submit"]',
                'input[type="image"]',
                'label[for]',
                'select',
                'textarea',
                'button',
                '.link'
            ]}
        />
        {children}
      </body>
    </html>
  );
}
