import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  sectionRef?: React.Ref<HTMLElement>;
}

const Section: React.FC<SectionProps> = ({ children, className = '', sectionRef }) => {
  return (
    <section ref={sectionRef} className={`min-h-screen py-24 md:py-32 px-6 md:px-12 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default Section;
