import React from 'react';
import { CONTENT } from '../constants';
import Section from './Section';
import { useOnScreen } from '../hooks/useOnScreen';

const SectionDeclare: React.FC = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.3 });

  return (
    <Section sectionRef={ref}>
      <div className="w-full h-[1px] bg-mid-light/40 mb-16 md:mb-24" />

      <h2
        className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.3] tracking-[-0.02em] text-mid-light mb-10 md:mb-12 transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          wordSpacing: '0.1em'
        }}
      >
        {CONTENT.section2.title}
      </h2>

      <p
        className="font-sans text-xl md:text-2xl leading-[2] text-mid-light/70 transition-all duration-700 delay-200"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
        }}
      >
        {CONTENT.section2.exp}
      </p>
    </Section>
  );
};

export default SectionDeclare;
