import React from 'react';
import { CONTENT } from '../constants';
import Section from './Section';
import { useOnScreen } from '../hooks/useOnScreen';

interface Props {
  sectionRef?: React.RefObject<HTMLElement | null>;
}

const Outro: React.FC<Props> = ({ sectionRef }) => {
  const [inViewRef, isVisible] = useOnScreen({ threshold: 0.3 });

  const setRefs = (node: HTMLElement | null) => {
    (inViewRef as React.MutableRefObject<HTMLElement | null>).current = node;
    if (sectionRef && 'current' in sectionRef) {
      sectionRef.current = node;
    }
  };

  return (
    <Section sectionRef={setRefs} className="bg-transparent">
      <div className="w-full h-[1px] bg-off-black/30 mb-16 md:mb-24" />

      <h2
        className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.3] tracking-[-0.02em] text-off-black mb-10 md:mb-12 transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          wordSpacing: '0.1em'
        }}
      >
        {CONTENT.outro.title}
      </h2>

      <p
        className="font-sans text-xl md:text-2xl leading-[2] text-off-black/70 transition-all duration-700 delay-200"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
        }}
      >
        {CONTENT.outro.exp}
      </p>

      <div
        className="mt-24 font-sans text-xs uppercase tracking-widest text-off-black/40 transition-all duration-700 delay-400"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        Ralph Waldo Emerson, 1841
      </div>
    </Section>
  );
};

export default Outro;
