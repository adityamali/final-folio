"use client";
import { ReactNode, useEffect, useState } from "react";
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import { IpadCursorConfig } from "ipad-cursor";

export default function CursorProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent hydration mismatch
  useIPadCursor(); // Hook is now called unconditionally

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const config: IpadCursorConfig = {
    blockPadding: "auto",
    blockStyle: {
      radius: "auto",
    },
    enableAutoTextCursor: true,
  };

  // Render provider only if not mobile, but keep hooks outside conditions
  return isMobile ? (
    <>{children}</>
  ) : (
    <IPadCursorProvider config={config}>{children}</IPadCursorProvider>
  );
}
