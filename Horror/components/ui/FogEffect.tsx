'use client';

export function FogEffect() {
  return (
    <>
      <div className="fog" />
      <div className="fog" style={{ 
        animationDelay: '-30s',
        opacity: '0.1',
        filter: 'blur(2px)'
      }} />
    </>
  );
} 