"use client";
import { useEffect, useRef, useState } from "react";

type CodeNode = {
  el: SVGTextElement;
  x: number; // left x
  y: number; // baseline y
  w: number; // approximate width in px
};

export default function DoodleBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<CodeNode[]>([]);
  const groupRef = useRef<SVGGElement | null>(null);
  const parallaxRef = useRef<number>(0);
  const [docHeight, setDocHeight] = useState<number>(0);
  const heroRectRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Measure full document height so the background spans the entire page
    const width = document.documentElement.clientWidth || svg.clientWidth;
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body?.scrollHeight || 0,
      document.documentElement.clientHeight
    );

    setDocHeight(height);

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.style.opacity = "0";

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svg.appendChild(g);
  groupRef.current = g;

    // Single-line snippets only (short and generic)
    const codeSnippets: string[] = [
      "const sum = (a,b) => a + b;",
      "let i = 0; while(i < n) i++;",
      "for (const x of xs) process(x);",
      "if (!node) throw new Error('missing');",
      "const clamp = (v,min,max)=> Math.min(max, Math.max(min,v));",
      "type Id = string | number;",
      "const memo = new Map();",
      "export const delay = ms => new Promise(r=>setTimeout(r,ms));",
      "try { await fn(); } catch(e) { console.error(e); }",
      "const ok = cond ? 'yes' : 'no';",
      "requestAnimationFrame(tick);",
      "interface Point { x: number; y: number }",
      "const uniq = a => [...new Set(a)];",
      "const by = k => (a,b)=> a[k] > b[k] ? 1 : -1;",
      "function pipe(...f){ return (x)=> f.reduce((v,fn)=>fn(v),x) }",
      "const range = (n)=> Array.from({length:n},(_,i)=>i);",
    ];

    // Grid configuration (wider cells to avoid overlap)
    // Flex-like rows of single-line text
  const ROW_H = 20; // row height in px
    const marginX = 12;
    const marginY = 16;
    const rows = Math.max(6, Math.floor((height - marginY * 2) / ROW_H));
    const FONT_SIZE = 11;
    const CHAR_W = 6; // approx monospace width px
    const GAP_X = 16; // gap between snippets
    const MIN_CHARS = 16;
    const MAX_CHARS = 48;

    const makeLine = (x: number, y: number, content: string) => {
      const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      t.textContent = content;
      t.setAttribute("font-size", String(FONT_SIZE));
      t.setAttribute(
        "font-family",
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
      );
      t.setAttribute("fill", "currentColor");
      t.style.opacity = "0";
      t.style.transition = "opacity .25s ease";
      t.setAttribute("transform", `translate(${x} ${y})`);
      return t;
    };

    const nodes: CodeNode[] = [];
    // Build rows: for each row, place snippets left-to-right until width
  for (let r = 0; r < rows; r++) {
      let cursorX = marginX;
      const baselineY = marginY + r * ROW_H;
      let idx = r * 7; // deterministic variation
      while (cursorX < width - marginX - MIN_CHARS * CHAR_W) {
        const snippetRaw = codeSnippets[idx % codeSnippets.length];
        idx++;
        // randomly clip or extend with harmless tokens to vary width
        const desiredChars = Math.min(
          MAX_CHARS,
          Math.max(MIN_CHARS, Math.floor((snippetRaw.length + (r + idx) % 12)))
        );
  const text = snippetRaw.slice(0, desiredChars);
        const w = text.length * CHAR_W;
        if (cursorX + w > width - marginX) break; // stop if too wide
        const t = makeLine(cursorX, baselineY, text);
        g.appendChild(t);
  nodes.push({ el: t, x: cursorX, y: baselineY, w });
        cursorX += w + GAP_X;
      }
    }

    nodesRef.current = nodes;

  const maxDistance = 150; // tuned for single-line rows

    // Measure hero region (document coordinates)
    const measureHero = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        const r = hero.getBoundingClientRect();
        heroRectRef.current = { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
      } else {
        heroRectRef.current = null;
      }
    };
    measureHero();

    // Parallax: translate the whole group slightly on scroll
    const PARALLAX = 0.30; // smaller = subtler
    const handleScroll = () => {
      const offset = window.scrollY * PARALLAX;
      parallaxRef.current = offset;
      if (groupRef.current) {
        groupRef.current.setAttribute("transform", `translate(0 ${offset})`);
      }
      // hero position relative to document can change with scroll
      measureHero();
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measureHero);

    const showSvg = () => {
      if (!svg) return;
      svg.style.transition = "opacity .25s ease";
      svg.style.opacity = "1";
    };

    const handleMouseMove = (e: MouseEvent) => {
  const rect = svg.getBoundingClientRect();
      const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

      showSvg();

  const maxOpacity = 0.40; // subtle appearance for snippets
      for (const n of nodesRef.current) {
        const cx = n.x + n.w / 2;
        const cy = n.y + parallaxRef.current - ROW_H / 2; // adjust for parallax shift
        const d = Math.hypot(cx - mx, cy - my);
        if (d < maxDistance) {
          const t = 1 - d / maxDistance; // 0..1
          let op = maxOpacity * Math.pow(t, 1.6);
          // Dim when under hero left copy (left ~55% of hero width)
          const hr = heroRectRef.current;
          if (hr) {
            const inY = cy >= hr.y && cy <= hr.y + hr.h;
            const inLeft = cx >= hr.x && cx <= hr.x + hr.w * 0.55;
            if (inY && inLeft) {
              op *= 0.35; // soften visibility beneath hero copy
            }
          }
          n.el.style.opacity = String(op);
        } else {
          n.el.style.opacity = "0";
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", showSvg);
    const handleMouseLeave = () => {
      if (svg) svg.style.opacity = "0";
      for (const n of nodesRef.current) n.el.style.opacity = "0";
    };
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", showSvg);
      window.removeEventListener("mouseleave", handleMouseLeave);
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", measureHero);
      nodesRef.current = [];
      while (svg.firstChild) svg.removeChild(svg.firstChild);
    };
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none -z-50"
      aria-hidden
      style={{ height: docHeight ? `${docHeight}px` : undefined }}
    >
      <svg ref={svgRef} className="absolute w-full h-full" />
    </div>
  );
}
