import React, { useEffect, useState } from 'react';
import { CONTENT } from '../constants';
import RandomRevealText from './RandomRevealText';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 600);
  const transformY = scrollY * 0.3;

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="text-center px-4"
        style={{
          opacity,
          transform: `translate3d(0, -${transformY}px, 0)`
        }}
      >
        <h1 className="font-serif text-[clamp(4rem,10vw,12rem)] leading-[1.2] tracking-[-0.05em] text-off-black uppercase [word-spacing:0.2em]">
          <RandomRevealText text={CONTENT.hero.title} delay={500} stagger={50} />
        </h1>
        <p className="mt-8 font-sans text-sm md:text-base tracking-widest text-off-black/60 opacity-0 animate-[fadeIn_1.5s_ease-out_0.5s_forwards]">
          {CONTENT.hero.subtitle}
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
