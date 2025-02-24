"use client";
import { useEffect, useRef } from "react";

export default function DoodleBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const dotsRef = useRef<SVGCircleElement[]>([]);

  useEffect(() => {
    if (!svgRef.current) return;

    const dots: { x: number; y: number }[] = [];
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    for (let i = 0; i < 2000; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
      });
    }

    dotsRef.current = dots.map(({ x, y }) => {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", x.toString());
      circle.setAttribute("cy", y.toString());
      circle.setAttribute("r", "1.5");
      circle.setAttribute("fill", "currentColor");
      circle.style.opacity = "0.4"; // Reduced base opacity
      svgRef.current?.appendChild(circle);
      return circle;
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;

      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      dotsRef.current.forEach((dot) => {
        const x = parseFloat(dot.getAttribute("cx") || "0");
        const y = parseFloat(dot.getAttribute("cy") || "0");
        const distance = Math.hypot(
          x - mouseRef.current.x,
          y - mouseRef.current.y
        );
        const maxDistance = 180; // Increased radius of effect

        if (distance < maxDistance) {
          const opacity = Math.pow(1 - distance / maxDistance, 2); // Exponential falloff
          const scale = 1 + opacity * 1.5; // Reduced maximum scale
          const color = `rgba(191, 0, 255, ${opacity * 0.7})`; // Adjusted color opacity

          dot.setAttribute("class", "");
          dot.setAttribute("fill", color);
          dot.setAttribute("r", (1.5 * scale).toString());
          dot.style.opacity = (0.4 + opacity * 0.6).toString(); // Smoother opacity transition
        } else {
          dot.setAttribute("class", "text-background dark:text-background");
          dot.setAttribute("fill", "currentColor");
          dot.setAttribute("r", "1.5");
          dot.style.opacity = "0.4"; // Match base opacity
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      dotsRef.current = [];
    };
  }, []);

  return (
    <div className="absolute inset-0 h-screen overflow-hidden pointer-events-none -z-50">
      <svg
        ref={svgRef}
        className="absolute w-full h-full"
        style={{ minHeight: "600px" }}
      />
    </div>
  );
}
