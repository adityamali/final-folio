"use client";
import { Command } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes("mac"));
  }, []);

  const openCommandBar = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: isMac,
      ctrlKey: !isMac,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <div className="top-0 left-0 right-0 z-50">
      <header className="relative bg-background dark:bg-background dark:bg-foreground/10/80">
        <div className="w-full mx-auto md:px-16 px-6 py-4">
          <nav className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-primar">
              AM
            </a>

            <button
              onClick={openCommandBar}
              className="flex items-center gap-2 px-4 py-2 text-sm text-foreground bg-background/50 dark:bg-background-700/50 hover:bg-background-300/50 dark:hover:bg-background-600/50 rounded-full border border-border transition-colors duration"
            >
              <Command className="w-4 h-4" />
              <span>Search...</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-foreground-400 bg-background-300/50 dark:bg-background-600/50 rounded border border-border">
                <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>K
              </kbd>
            </button>
          </nav>
        </div>
      </header>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-background-/80 to-transparent dark:from-background-800/80 pointer-events-none"></div>
    </div>
  );
}
