import type { Meta, StoryObj } from '@storybook/react';
import AnimatedSection from '../../../components/AnimatedSection';
import { DarkBackgroundDecorator } from '../decorators/DarkBackgroundDecorator';

const meta: Meta<typeof AnimatedSection> = {
  title: 'Custom Component/AnimatedSection',
  component: AnimatedSection,
  decorators: [DarkBackgroundDecorator],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '스크롤 시 애니메이션과 함께 나타나는 섹션 컴포넌트입니다. 상단 보더, 타이틀, 본문이 순차적으로 애니메이션됩니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '섹션 제목 (세리프 폰트)',
    },
    content: {
      control: 'text',
      description: '섹션 본문 내용',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
    borderColor: {
      control: 'select',
      options: ['bg-mid-light', 'bg-off-white', 'bg-mid-dark'],
      description: '상단 보더 색상 (Tailwind bg-* 클래스)',
    },
    textColor: {
      control: 'select',
      options: ['text-mid-light', 'text-off-white', 'text-off-black'],
      description: '제목 텍스트 색상 (Tailwind text-* 클래스)',
    },
    textColorMuted: {
      control: 'select',
      options: ['text-mid-light', 'text-mid-light/70', 'text-off-white/70'],
      description: '본문 텍스트 색상 (Tailwind text-* 클래스)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedSection>;

export const Default: Story = {
  args: {
    title: '자기 생각을 무시하는 사람들',
    content: '하지만 사람들은 그것이 자기에게서 나왔다는 이유만으로 그 생각을 별로 주목하지 않고 그냥 무시해버린다.',
  },
};

export const WithCustomColors: Story = {
  args: {
    title: '자신의 목소리를 믿어라',
    content: '위대한 예술 작품들이 우리에게 전하는 가장 감동적인 교훈은 이것이다.',
    borderColor: 'bg-off-white',
    textColor: 'text-off-white',
    textColorMuted: 'text-off-white/70',
  },
};
