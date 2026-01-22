import type { Meta, StoryObj } from '@storybook/react';
import RandomRevealText from '../../../components/RandomRevealText';
import { LightBackgroundDecorator } from '../decorators/LightBackgroundDecorator';

const meta: Meta<typeof RandomRevealText> = {
  title: 'Custom Component/RandomRevealText',
  component: RandomRevealText,
  decorators: [LightBackgroundDecorator],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '텍스트가 랜덤 순서로 한 글자씩 나타나는 애니메이션 컴포넌트입니다. 각 글자는 블러 효과와 함께 페이드인됩니다.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: '표시할 텍스트',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
    delay: {
      control: { type: 'range', min: 0, max: 2000, step: 100 },
      description: '애니메이션 시작 전 지연 시간 (ms)',
    },
    stagger: {
      control: { type: 'range', min: 20, max: 200, step: 10 },
      description: '각 글자 사이의 지연 시간 (ms)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RandomRevealText>;

export const Default: Story = {
  args: {
    text: 'Self-Reliance',
    className: 'font-serif text-6xl text-off-black',
    delay: 300,
    stagger: 80,
  },
};

export const Korean: Story = {
  args: {
    text: '자기신뢰',
    className: 'font-serif text-4xl text-off-black',
    delay: 500,
    stagger: 120,
  },
};

export const SlowReveal: Story = {
  args: {
    text: 'EMERSON',
    className: 'font-serif text-8xl uppercase tracking-widest text-off-black',
    delay: 1000,
    stagger: 200,
  },
};
