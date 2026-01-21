import React from 'react';
import { CONTENT } from '../constants';
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
    <section ref={setRefs} className="min-h-[60vh] py-24 px-6 md:px-12 max-w-screen-xl mx-auto flex flex-col justify-end relative pb-12">

      {/* Divider - 라이트 모드 */}
      <div
        className="w-full h-[1px] bg-off-black opacity-20 mb-12 origin-left transition-transform duration-1000"
        style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Label - 라이트 모드 */}
        <div className="md:col-span-3">
          <span
            className="font-sans text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-off-black block transition-all duration-700"
            style={{
              opacity: isVisible ? 0.4 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            04 — {CONTENT.outro.label}
          </span>
        </div>

        {/* Content - 라이트 모드 */}
        <div className="md:col-span-9 flex flex-col gap-16">
          <h2
            className="font-serif text-2xl md:text-4xl leading-[1.4] text-off-black transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            {CONTENT.outro.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div
              className="font-sans text-xs uppercase tracking-widest text-off-black transition-all duration-700 delay-200"
              style={{ opacity: isVisible ? 0.2 : 0 }}
            >
              Ralph Waldo Emerson &copy; 1841
            </div>
            <p
              className="font-sans text-base md:text-lg leading-relaxed text-off-black text-right transition-all duration-1000 delay-300"
              style={{
                opacity: isVisible ? 0.7 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              그러면 우리는 그 타인에게서 우리 생각을 받아들여야 하는{' '}
              <span className="font-serif italic text-off-black border-b border-off-black/30 pb-1">
                부끄러운 상태가 된다.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outro;