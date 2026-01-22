import React from 'react';
import type { Decorator } from '@storybook/react';

export const DarkBackgroundDecorator: Decorator = (Story) => (
  <div
    className="min-h-screen p-8"
    style={{ backgroundColor: '#0E0A0A' }}
  >
    <Story />
  </div>
);

export default DarkBackgroundDecorator;
