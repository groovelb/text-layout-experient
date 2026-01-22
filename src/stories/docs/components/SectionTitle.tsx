import React from 'react';

interface SectionTitleProps {
  title: string;
  description?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  description
}) => (
  <div className="mt-12 mb-6">
    <h2 className="font-sans text-sm uppercase tracking-widest text-mid-light/50 mb-2">
      {title}
    </h2>
    {description && (
      <p className="font-sans text-base text-mid-light/70">
        {description}
      </p>
    )}
    <div className="w-full h-px bg-mid-light/20 mt-4" />
  </div>
);

export default SectionTitle;
