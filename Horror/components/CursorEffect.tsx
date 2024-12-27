"use client";

import { useEffect, useState } from "react";

export function CursorEffect() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed w-64 h-64 pointer-events-none blur-3xl opacity-20 bg-red-900 rounded-full"
      style={{
        left: cursorPosition.x - 128,
        top: cursorPosition.y - 128,
        transition: 'all 0.1s ease-out',
      }}
    />
  );
}