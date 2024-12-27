'use client';

import { useEffect, useState, useCallback } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const throttledSetPosition = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      setTimeout(() => setIsMoving(false), 100);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', throttledSetPosition);
    return () => {
      window.removeEventListener('mousemove', throttledSetPosition);
    };
  }, [throttledSetPosition]);

  return (
    <>
      {/* Main flashlight effect */}
      <div
        className="flashlight"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${isMoving ? 'scale(1.05)' : 'scale(1)'}`,
          transition: 'transform 0.2s ease-out'
        }}
      />
      {/* Minimal cursor indicator */}
      <div
        className={`custom-cursor ${isMoving ? 'moving' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%)`
        }}
      />
    </>
  );
} 