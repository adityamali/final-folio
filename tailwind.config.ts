import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        accent: ["var(--font-accent)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--color-cream)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--color-cream)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--color-charcoal)",
        },
        border: "var(--border)",
        sidebar: {
          DEFAULT: "var(--sidebar-bg)",
          foreground: "var(--sidebar-fg)",
          border: "var(--sidebar-border)",
        },
        // Mid-Century Palette
        cream: "var(--color-cream)",
        charcoal: "var(--color-charcoal)",
        mustard: "var(--color-mustard)",
        orange: "var(--color-orange)",
        teal: "var(--color-teal)",
        olive: "var(--color-olive)",
        brick: "var(--color-brick)",
      },
      boxShadow: {
        retro: "4px 4px 0px 0px currentColor",
        "retro-lg": "8px 8px 0px 0px currentColor",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
} satisfies Config;
