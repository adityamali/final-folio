"use client";
import { ReactNode } from "react";
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import { IpadCursorConfig } from "ipad-cursor";

export default function CursorProvider({ children }: { children: ReactNode }) {
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