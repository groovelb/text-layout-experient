import React from 'react';
import { CONTENT } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';

const SectionLight: React.FC = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <section ref={ref} className="min-h-screen py-32 px-6 md:px-12 max-w-screen-xl mx-auto flex flex-col justify-center relative">
      {/* Decorative Line */}
      <div
        className="w-full h-[1px] bg-mid-light opacity-20 mb-8 origin-left transition-transform duration-1000"
        style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Label Column */}
        <div className="md:col-span-3">
          <span
            className="font-sans text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-mid-light block transition-all duration-700 delay-300"
            style={{
              opacity: isVisible ? 0.6 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            01 — {CONTENT.section1.label}
          </span>
        </div>

        {/* Content Column */}
        <div className="md:col-span-9 flex flex-col gap-12">
          <h2
            className="font-serif text-3xl md:text-5xl leading-[1.3] text-mid-light transition-all duration-700 delay-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            {CONTENT.section1.title}
          </h2>

          <div className="md:w-2/3 ml-auto">
            <p
              className="font-sans text-sm md:text-base leading-relaxed text-mid-light transition-all duration-700 delay-700"
              style={{
                opacity: isVisible ? 0.8 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {CONTENT.section1.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLight;