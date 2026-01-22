import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  background?: 'dark' | 'light';
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  background = 'dark'
}) => (
  <div
    className={`min-h-screen p-8 md:p-12 ${
      background === 'dark'
        ? 'bg-off-black text-mid-light'
        : 'bg-off-white text-off-black'
    }`}
  >
    <div className="max-w-4xl mx-auto">
      {children}
    </div>
  </div>
);

export default PageContainer;
