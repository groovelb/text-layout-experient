import React from 'react';

interface DocumentTitleProps {
  title: string;
  description?: string;
}

export const DocumentTitle: React.FC<DocumentTitleProps> = ({
  title,
  description
}) => (
  <div className="mb-8 border-b border-mid-light/20 pb-6">
    <h1 className="font-serif text-4xl text-mid-light tracking-[-0.03em] mb-2">
      {title}
    </h1>
    {description && (
      <p className="font-sans text-lg text-mid-light/70 leading-relaxed">
        {description}
      </p>
    )}
  </div>
);

export default DocumentTitle;
