'use client';

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div
      className="hidden md:block fixed w-32 h-32 pointer-events-none z-50"
      style={{
        left: position.x - 64,
        top: position.y - 64,
        background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)",
        transform: "translate(0, 0)",
        transition: "transform 0.1s ease-out, opacity 0.2s ease-out",
      }}
    />
  );
} 