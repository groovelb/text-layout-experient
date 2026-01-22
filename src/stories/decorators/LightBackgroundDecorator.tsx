import React from 'react';
import type { Decorator } from '@storybook/react';

export const LightBackgroundDecorator: Decorator = (Story) => (
  <div
    className="min-h-screen p-8"
    style={{ backgroundColor: '#FAF8F6' }}
  >
    <Story />
  </div>
);

export default LightBackgroundDecorator;
