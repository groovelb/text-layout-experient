import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import ScrambleText from '../../../components/ScrambleText';
import { DarkBackgroundDecorator } from '../decorators/DarkBackgroundDecorator';

const meta: Meta<typeof ScrambleText> = {
  title: 'Custom Component/ScrambleText',
  component: ScrambleText,
  decorators: [DarkBackgroundDecorator],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '텍스트가 변경될 때 스크램블(글리치) 효과와 함께 전환되는 컴포넌트입니다. 섹션 레이블 전환에 사용됩니다.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: '표시할 텍스트 (변경 시 스크램블 효과 발생)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
    duration: {
      control: { type: 'range', min: 200, max: 2000, step: 100 },
      description: '스크램블 애니메이션 지속 시간 (ms)',
    },
    trigger: {
      control: 'boolean',
      description: '애니메이션 트리거 (false일 때 애니메이션 비활성화)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrambleText>;

export const Default: Story = {
  args: {
    text: '01 — 빛',
    className: 'font-sans text-2xl tracking-[0.15em] uppercase text-mid-light',
    duration: 800,
    trigger: true,
  },
};

const CyclingDemo = () => {
  const labels = ['01 — 빛', '02 — 무시', '03 — 선언', '04 — 경고'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % labels.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrambleText
      text={labels[index]}
      className="font-sans text-2xl tracking-[0.15em] uppercase text-mid-light"
      duration={800}
    />
  );
};

export const Cycling: Story = {
  render: () => <CyclingDemo />,
  parameters: {
    docs: {
      description: {
        story: '섹션 간 전환을 시뮬레이션합니다. 2.5초마다 자동으로 다음 레이블로 전환됩니다.',
      },
    },
  },
};
