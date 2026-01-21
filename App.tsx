import React, { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import SectionLight from './components/SectionLight';
import SectionIgnore from './components/SectionIgnore';
import SectionDeclare from './components/SectionDeclare';
import Outro from './components/Outro';
import GradientOverlay from './components/GradientOverlay';
import { COLORS } from './constants';

const App: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const outroRef = useRef<HTMLElement>(null);
  const lightOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      // 아웃트로 섹션 라이트 모드 전환
      if (outroRef.current && lightOverlayRef.current) {
        const windowHeight = window.innerHeight;
        const outroRect = outroRef.current.getBoundingClientRect();
        let outroProgress = (windowHeight - outroRect.top) / windowHeight;
        outroProgress = Math.max(0, Math.min(1, outroProgress));
        lightOverlayRef.current.style.opacity = outroProgress.toString();
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative w-full">
      {/* 밝은 배경 레이어 */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 0,
          backgroundColor: COLORS.bgLight
        }}
      />

      {/* 그라데이션 + grain 오버레이 */}
      <GradientOverlay />

      {/* 아웃트로용 밝은 배경 오버레이 */}
      <div
        ref={lightOverlayRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 2,
          backgroundColor: COLORS.bgLight,
          opacity: 0
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative" style={{ zIndex: 3 }}>
        <Hero sectionRef={heroRef} />
        <SectionLight />
        <SectionIgnore />
        <SectionDeclare />
        <Outro sectionRef={outroRef} />
      </div>
    </main>
  );
};

export default App;