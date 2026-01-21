import React, { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  className?: string;
}

const ScrollRevealText: React.FC<Props> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 섹션이 화면에 들어오면 시작, 화면 중앙을 지나면 완료
      const start = windowHeight * 0.8;
      const end = -rect.height * 0.3;
      const current = rect.top;

      let newProgress = (start - current) / (start - end);
      newProgress = Math.max(0, Math.min(1, newProgress));

      setProgress(newProgress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 문장 단위로 분리하여 개행
  const sentences = text.split('. ').map((s, i, arr) =>
    i < arr.length - 1 ? s + '.' : s
  );

  const allChars: { char: string; globalIndex: number }[] = [];
  let globalIndex = 0;

  sentences.forEach((sentence) => {
    for (const char of sentence) {
      allChars.push({ char, globalIndex });
      globalIndex++;
    }
    // 문장 사이 개행을 위한 마커
    allChars.push({ char: '\n', globalIndex: -1 });
  });

  const totalChars = allChars.filter(c => c.globalIndex >= 0).length;
  const revealedCount = Math.floor(totalChars * progress);

  let charCounter = 0;

  return (
    <div ref={containerRef} className={className}>
      {sentences.map((sentence, sIdx) => (
        <p
          key={sIdx}
          className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.9] mb-8 md:mb-12"
        >
          {sentence.split('').map((char, cIdx) => {
            const isRevealed = charCounter < revealedCount;
            charCounter++;
            return (
              <span
                key={cIdx}
                style={{
                  color: isRevealed ? '#E8E8E6' : 'rgba(232, 232, 230, 0.12)',
                  transition: 'color 0.15s ease-out',
                  lineHeight: '1.45',
                  wordBreak: 'keep-all',
                }}
              >
                {char}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
};

export default ScrollRevealText;
