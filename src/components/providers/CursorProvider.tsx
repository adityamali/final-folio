"use client";
import { ReactNode, useEffect, useState } from "react";
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import { IpadCursorConfig } from "ipad-cursor";

export default function CursorProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  const config: IpadCursorConfig = {
    blockPadding: "auto",
    blockStyle: {
      radius: "auto",
    },
    enableAutoTextCursor: true,
  };
  useIPadCursor();

  return <IPadCursorProvider config={config}>{children}</IPadCursorProvider>;
}
