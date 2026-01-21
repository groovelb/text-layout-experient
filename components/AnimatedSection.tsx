import React from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  title: string;
  content: string;
  className?: string;
  borderColor?: string;
  textColor?: string;
  textColorMuted?: string;
}

const AnimatedSection: React.FC<Props> = ({
  title,
  content,
  className = '',
  borderColor = 'bg-mid-light',
  textColor = 'text-mid-light',
  textColorMuted = 'text-mid-light'
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <div ref={ref} className={className}>
      {/* 상단 Border - 그려지는 효과 */}
      <motion.div
        className={`h-[1px] ${borderColor} mb-[3.25rem] md:mb-[4.5rem]`}
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* 타이틀 - 아래에서 위로 */}
      <motion.h2
        className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.3] tracking-[-0.04em] ${textColor} mb-[3.25rem] md:mb-[4.5rem]`}
        style={{ wordSpacing: '0.1em', wordBreak: 'keep-all' }}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {title}
      </motion.h2>

      {/* 본문 - 아래에서 위로 */}
      <motion.p
        className={`font-sans text-xl md:text-2xl ${textColorMuted}`}
        style={{ lineHeight: 1.65 }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {content}
      </motion.p>
    </div>
  );
};

export default AnimatedSection;
