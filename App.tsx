import React, { useRef, useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import StickyContent from './components/StickyContent';
import GradientOverlay from './components/GradientOverlay';

const App: React.FC = () => {
  const outroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative w-full">
      <GradientOverlay outroRef={outroRef} />

      <div className="relative" style={{ zIndex: 2 }}>
        <Hero />
        <StickyContent outroRef={outroRef} />
      </div>
    </main>
  );
};

export default App;
