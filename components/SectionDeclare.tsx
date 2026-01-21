import React from 'react';
import { CONTENT } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';

const SectionDeclare: React.FC = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });

  const lines = [
    "다른 무수한 목소리가",
    "반대 의견을 낼지라도,",
    "점잖으면서도 굳건한 자세로",
    "자신의 자발적인 느낌을",
    "더 소중하게 믿고",
    "그 작품들이 웅변하는 소리를",
    "들어야 한다는 것이다."
  ];

  return (
    <section ref={ref} className="min-h-[120vh] py-32 px-6 md:px-12 max-w-screen-xl mx-auto flex flex-col justify-center items-center text-center relative">
      <span
        className="font-sans text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-mid-light mb-24 block transition-all duration-700"
        style={{
          opacity: isVisible ? 0.4 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
        }}
      >
        03 — {CONTENT.section3.label}
      </span>

      <div className="space-y-2 md:space-y-4">
        {lines.map((line, i) => (
          <h2
            key={i}
            className="font-serif text-[clamp(2.5rem,6vw,6.5rem)] leading-[1.1] tracking-tight-editorial text-mid-light word-spacing-wide transition-all duration-1000 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
              transitionDelay: `${i * 100}ms`
            }}
          >
            {line}
          </h2>
        ))}
      </div>

      <p
        className="font-sans text-xs md:text-sm tracking-widest uppercase text-mid-light mt-24 max-w-md mx-auto transition-all duration-1000 delay-1000"
        style={{ opacity: isVisible ? 0.5 : 0 }}
      >
        {CONTENT.section3.caption}
      </p>
    </section>
  );
};

export default SectionDeclare;