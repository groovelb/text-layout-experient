import React from 'react';
import { CONTENT } from '../constants';
import ScrollRevealText from './ScrollRevealText';

const SectionLight: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12" style={{ minHeight: '150vh' }}>
      <div
        className="max-w-4xl mx-auto grid gap-8 md:gap-16"
        style={{
          gridTemplateColumns: '6rem 1fr',
          minHeight: 'calc(150vh - 16rem)'
        }}
      >
        {/* Left: Sticky Label */}
        <div>
          <div
            style={{
              position: 'sticky',
              top: '50vh',
              transform: 'translateY(-50%)'
            }}
          >
            <span className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-mid-light/50">
              01 — {CONTENT.intro.label}
            </span>
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <ScrollRevealText text={CONTENT.intro.text} />
        </div>
      </div>
    </section>
  );
};

export default SectionLight;
