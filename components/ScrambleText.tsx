import React, { useEffect, useState, useRef } from 'react';

interface Props {
  text: string;
  className?: string;
  duration?: number;
  trigger?: boolean;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ가나다라마바사아자차카타파하';

const ScrambleText: React.FC<Props> = ({
  text,
  className = '',
  duration = 800,
  trigger = true
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevTextRef = useRef(text);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger || text === prevTextRef.current) return;

    setIsAnimating(true);
    const startTime = performance.now();
    const targetText = text;
    const maxLength = Math.max(prevTextRef.current.length, targetText.length);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 각 글자가 순차적으로 확정됨
      const settledCount = Math.floor(progress * targetText.length);

      let result = '';
      for (let i = 0; i < maxLength; i++) {
        if (i < settledCount) {
          // 확정된 글자
          result += targetText[i] || '';
        } else if (i < targetText.length) {
          // 스크램블 중인 글자
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(targetText);
        setIsAnimating(false);
        prevTextRef.current = targetText;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, trigger, duration]);

  // 초기 렌더링 시 텍스트 설정
  useEffect(() => {
    if (!isAnimating) {
      setDisplayText(text);
      prevTextRef.current = text;
    }
  }, []);

  return (
    <span className={className}>
      {displayText}
    </span>
  );
};

export default ScrambleText;
