import React from 'react';
import { CONTENT } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';

const SectionIgnore: React.FC = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <section ref={ref} className="min-h-screen py-32 px-6 md:px-12 max-w-screen-xl mx-auto flex flex-col justify-center relative">
      {/* Top Divider */}
      <div className="w-full h-[1px] bg-mid-light opacity-20 mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Meta */}
        <div className="md:col-span-3 flex flex-col justify-between h-full">
          <span
            className="font-sans text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-mid-light transition-all duration-700"
            style={{
              opacity: isVisible ? 0.6 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            02 — {CONTENT.section2.label}
          </span>
        </div>

        {/* Right Content */}
        <div className="md:col-span-9">
          <h2
            className="font-serif text-2xl md:text-4xl leading-[1.4] text-mid-light mb-16 max-w-3xl transition-all duration-700 delay-200"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            {CONTENT.section2.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <p
              className="font-sans text-sm md:text-base leading-relaxed text-mid-light transition-all duration-700 delay-400"
              style={{
                opacity: isVisible ? 0.8 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {CONTENT.section2.subtitleLeft}
            </p>
            <p
              className="font-serif italic text-lg md:text-xl leading-relaxed text-mid-light transition-all duration-700 delay-500"
              style={{
                opacity: isVisible ? 0.9 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {CONTENT.section2.subtitleRight}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="w-full h-[1px] bg-mid-light opacity-20 mt-24" />
    </section>
  );
};

export default SectionIgnore;