import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import StickyContent from '../../../components/StickyContent';
import { DarkBackgroundDecorator } from '../decorators/DarkBackgroundDecorator';

const meta: Meta<typeof StickyContent> = {
  title: 'Section/StickyContent',
  component: StickyContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '메인 콘텐츠를 담는 복합 섹션입니다. 모바일에서는 세로 레이아웃, 데스크톱에서는 그리드 레이아웃으로 전환됩니다. 스티키 라벨이 스크롤에 따라 섹션을 표시합니다.',
      },
    },
  },
  argTypes: {
    outroRef: {
      control: false,
      description: 'Outro 섹션에 대한 ref (GradientOverlay 스크롤 계산용)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StickyContent>;

const StickyContentWrapper = () => {
  const outroRef = useRef<HTMLElement>(null);
  return <StickyContent outroRef={outroRef} />;
};

export const Default: Story = {
  render: () => <StickyContentWrapper />,
  parameters: {
    docs: {
      description: {
        story: 'StickyContent는 Intro, Section1, Section2, Section3, Outro를 포함합니다. 스크롤하여 섹션 전환과 스티키 라벨 효과를 확인할 수 있습니다.',
      },
    },
  },
};
