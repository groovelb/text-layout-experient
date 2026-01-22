import type { Meta, StoryObj } from '@storybook/react';
import App from '../../../App';

const meta: Meta<typeof App> = {
  title: 'Page/FullEditorial',
  component: App,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Self-Reliance 프로젝트의 전체 페이지입니다. Hero, StickyContent, GradientOverlay를 포함한 완전한 경험을 제공합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof App>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '전체 페이지를 볼 수 있습니다. Lenis smooth scroll과 WebGL 그라데이션 효과가 적용됩니다.',
      },
    },
  },
};
