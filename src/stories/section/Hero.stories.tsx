import type { Meta, StoryObj } from '@storybook/react';
import Hero from '../../../components/Hero';
import { LightBackgroundDecorator } from '../decorators/LightBackgroundDecorator';

const meta: Meta<typeof Hero> = {
  title: 'Section/Hero',
  component: Hero,
  decorators: [LightBackgroundDecorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '페이지 최상단의 히어로 섹션입니다. RandomRevealText를 사용한 타이틀 애니메이션과 스크롤에 따른 페이드아웃 효과를 제공합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hero 섹션은 CONTENT.hero 상수에서 타이틀과 서브타이틀을 가져옵니다. 스크롤 시 패럴랙스 효과가 적용됩니다.',
      },
    },
  },
};
