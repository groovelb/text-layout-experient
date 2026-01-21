import React, { useEffect, useState, useMemo } from 'react';

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

const RandomRevealText: React.FC<Props> = ({
  text,
  className = '',
  delay = 300,
  stagger = 80
}) => {
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  // 랜덤 순서 생성 (공백 제외)
  const randomOrder = useMemo(() => {
    const indices = text
      .split('')
      .map((char, i) => (char !== ' ' ? i : -1))
      .filter(i => i !== -1);

    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [text]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    randomOrder.forEach((charIndex, orderIndex) => {
      const timeout = setTimeout(() => {
        setRevealedIndices(prev => new Set([...prev, charIndex]));
      }, delay + orderIndex * stagger);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [randomOrder, delay, stagger]);

  return (
    <span className={className}>
      {text.split('').map((char, index) => {
        const isRevealed = char === ' ' || revealedIndices.has(index);
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              opacity: isRevealed ? 1 : 0,
              filter: isRevealed ? 'blur(0px)' : 'blur(12px)',
              transition: 'opacity 1.2s ease-out, filter 1.2s ease-out',
              minWidth: char === ' ' ? '0.3em' : undefined
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

export default RandomRevealText;
