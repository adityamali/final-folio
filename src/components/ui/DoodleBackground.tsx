// "use client";
// import { useEffect, useRef } from "react";

// export default function DoodleBackground() {
//   const svgRef = useRef<SVGSVGElement>(null);
//   const mouseRef = useRef({ x: 0, y: 0 });
//   const dotsRef = useRef<SVGCircleElement[]>([]);

//   useEffect(() => {
//     if (!svgRef.current) return;

//     // Increased number of dots and adjusted spacing
//     const dots: { x: number; y: number }[] = [];
//     const width = svgRef.current.clientWidth;
//     const height = svgRef.current.clientHeight;

//     // Increased from 50 to 200 dots
//     for (let i = 0; i < 2000; i++) {
//       dots.push({
//         x: Math.random() * width,
//         y: Math.random() * height,
//       });
//     }

//     // Create SVG elements with smaller initial size
//     dotsRef.current = dots.map(({ x, y }) => {
//       const circle = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "circle"
//       );
//       circle.setAttribute("cx", x.toString());
//       circle.setAttribute("cy", y.toString());
//       circle.setAttribute("r", "1.5");
//       circle.setAttribute("fill", "currentColor");
//       svgRef.current?.appendChild(circle);
//       return circle;
//     });

//     const handleMouseMove = (e: MouseEvent) => {
//       const rect = svgRef.current?.getBoundingClientRect();
//       if (!rect) return;

//       mouseRef.current = {
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top,
//       };

//       dotsRef.current.forEach((dot, i) => {
//         const x = parseFloat(dot.getAttribute("cx") || "0");
//         const y = parseFloat(dot.getAttribute("cy") || "0");
//         const distance = Math.hypot(
//           x - mouseRef.current.x,
//           y - mouseRef.current.y
//         );
//         const maxDistance = 120;

//         if (distance < maxDistance) {
//           const opacity = 1 - distance / maxDistance;
//           dot.setAttribute("class", "");
//           dot.setAttribute("fill", "#bf00ff");
//           dot.setAttribute("r", (1.5 + opacity * 2).toString());
//           dot.style.opacity = (opacity * 0.8).toString();
//         } else {
//           dot.setAttribute("class", "text-background dark:text-background");
//           dot.setAttribute("fill", "currentColor");
//           dot.setAttribute("r", "1.5");
//           dot.style.opacity = "0.6";
//         }
//       });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       dotsRef.current = [];
//     };
//   }, []);

//   return (
//     <div className="absolute inset-0 h-screen overflow-hidden pointer-events-none -z-50">
//       <svg
//         ref={svgRef}
//         className="absolute w-full h-full"
//         style={{ minHeight: "600px" }}
//       />
//     </div>
//   );
// }
