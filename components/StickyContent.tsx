import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CONTENT } from '../constants';
import ScrambleText from './ScrambleText';
import ScrollRevealText from './ScrollRevealText';
import AnimatedSection from './AnimatedSection';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

interface Props {
  outroRef?: React.RefObject<HTMLElement | null>;
}

const SECTIONS = [
  { key: 'intro', num: '01', label: CONTENT.intro.label },
  { key: 'section1', num: '02', label: CONTENT.section1.label },
  { key: 'section2', num: '03', label: CONTENT.section2.label },
  { key: 'section3', num: '04', label: CONTENT.section3.label },
];

const StickyContent: React.FC<Props> = ({ outroRef }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observersRef = useRef<IntersectionObserver[]>([]);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    // 기존 옵저버 정리
    observersRef.current.forEach(obs => obs.disconnect());
    observersRef.current = [];

    // 레이아웃 변경 후 DOM 렌더링 대기
    const timeoutId = setTimeout(() => {
      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          },
          { threshold: 0.3 }
        );

        observer.observe(ref);
        observersRef.current.push(observer);
      });
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      observersRef.current.forEach(obs => obs.disconnect());
      observersRef.current = [];
    };
  }, [isDesktop]);

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  };

  const setOutroRefFn = (el: HTMLElement | null) => {
    if (outroRef) {
      (outroRef as React.MutableRefObject<HTMLElement | null>).current = el;
    }
  };

  const activeSection = SECTIONS[activeIndex];

  return (
    <>
      <section className="px-6 md:px-12">
        {!isDesktop ? (
          /* 모바일: 세로 레이아웃 + 상단 스티키 */
          <>
            <div className="sticky top-4 z-10 mb-8">
              <span className="font-sans text-lg tracking-[0.15em] uppercase text-mid-light">
                <ScrambleText text={`${activeSection.num} — ${activeSection.label}`} />
              </span>
            </div>
            <div className="max-w-4xl mx-auto">
              <div ref={setRef(0)} className="min-h-[150vh] py-24">
                <ScrollRevealText text={CONTENT.intro.text} />
              </div>
              <div ref={setRef(1)} className="min-h-screen py-24">
                <AnimatedSection title={CONTENT.section1.title} content={CONTENT.section1.exp} />
              </div>
              <div ref={setRef(2)} className="min-h-screen py-24">
                <AnimatedSection title={CONTENT.section2.title} content={CONTENT.section2.exp} />
              </div>
              <div ref={setRef(3)} className="min-h-screen pb-24">
                <AnimatedSection title={CONTENT.section3.title} content={CONTENT.section3.exp} />
              </div>
            </div>
          </>
        ) : (
          /* 데스크톱: 그리드 레이아웃 + 좌측 스티키 */
          <div
            className="grid max-w-4xl mx-auto gap-x-16"
            style={{ gridTemplateColumns: '12rem 1fr' }}
          >
            {/* Row 1: Intro ~ Section2 with sticky label */}
            <div>
              <div style={{ position: 'sticky', top: '50vh' }}>
                <span className="font-sans text-2xl tracking-[0.15em] uppercase text-mid-light">
                  <ScrambleText text={`${activeSection.num} — ${activeSection.label}`} />
                </span>
              </div>
            </div>
            <div>
              <div ref={setRef(0)} className="min-h-[150vh] py-32">
                <ScrollRevealText text={CONTENT.intro.text} />
              </div>
              <div ref={setRef(1)} className="min-h-screen py-32">
                <AnimatedSection title={CONTENT.section1.title} content={CONTENT.section1.exp} />
              </div>
              <div ref={setRef(2)} className="min-h-screen pt-32 pb-56">
                <AnimatedSection title={CONTENT.section2.title} content={CONTENT.section2.exp} />
              </div>
            </div>

            {/* Row 2: Section3 - sticky releases */}
            <div>{/* Empty */}</div>
            <div ref={setRef(3)} className="min-h-screen pb-32">
              <AnimatedSection title={CONTENT.section3.title} content={CONTENT.section3.exp} />
            </div>
          </div>
        )}
      </section>

      {/* Outro */}
      <section ref={setOutroRefFn} className="min-h-screen px-6 md:px-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.2] tracking-[-0.03em] text-off-black mb-8">
            {CONTENT.outro.title}
          </h2>
          <p className="font-sans text-sm md:text-base tracking-widest text-off-black/60">
            {CONTENT.outro.credit}
          </p>
        </div>
      </section>
    </>
  );
};

export default StickyContent;
