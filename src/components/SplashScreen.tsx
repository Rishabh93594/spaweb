import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Hide scrollbar during splash screen
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: onComplete,
        delay: 0.5,
      });

      // Professional Horizontal Split Sequence
      tl.to(logoRef.current, {
        scale: 1.1,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "power2.inOut",
      })
        .to(topHalfRef.current, {
          xPercent: 100,
          duration: 1.2,
          ease: "expo.inOut",
        }, "-=0.4")
        .to(bottomHalfRef.current, {
          xPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
        }, "<");
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center"
    >
      {/* Background Panels */}
      <div
        ref={topHalfRef}
        className="absolute top-0 left-0 w-full h-[51%] bg-gradient-to-br from-[#070b0a] to-[#12241e] z-0"
      />
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 w-full h-[51%] bg-gradient-to-tr from-[#070b0a] to-[#201816] z-0"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div ref={logoRef} className="relative flex flex-col items-center">
          <div className="relative mb-12">
            <div className="absolute inset-x-0 bottom-0 h-20 w-full bg-primary/20 blur-[100px] rounded-full" />
            <img
              src="/lgo.png"
              alt="Forever Young NYC Logo"
              className="h-44 w-auto relative z-10"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>

          <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mb-4">
            <div
              ref={progressRef}
              className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
              style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            />
          </div>

          <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-light">
            Sanctuary Loading
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
