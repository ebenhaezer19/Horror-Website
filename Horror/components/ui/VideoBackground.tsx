'use client';

export function VideoBackground() {
  return (
    <>
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="horror-video"
        >
          <source src="/videos/horror-background-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="video-overlay" />
    </>
  );
} 