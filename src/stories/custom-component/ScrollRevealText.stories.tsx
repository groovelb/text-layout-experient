import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import ScrollRevealText from '../../../components/ScrollRevealText';
import { DarkBackgroundDecorator } from '../decorators/DarkBackgroundDecorator';

const meta: Meta<typeof ScrollRevealText> = {
  title: 'Custom Component/ScrollRevealText',
  component: ScrollRevealText,
  decorators: [DarkBackgroundDecorator],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '스크롤 위치에 따라 텍스트가 글자 단위로 밝아지는 컴포넌트입니다. 스크롤 진행에 맞춰 읽기 경험을 제공합니다.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: '표시할 텍스트 (마침표 기준으로 문장 분리)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollRevealText>;

export const Default: Story = {
  args: {
    text: '사람은 마음속 깊은 곳에서 번쩍거리며 지나가는 빛줄기를 발견하고 관찰하는 법을 배워야 한다. 각 개인에게는 음유시인이나 현자들에게서 나오는 하늘을 가로지르는 불빛보다 자기 마음속에서 샘솟는 한 줄기 빛이 더 중요하다.',
  },
  parameters: {
    docs: {
      description: {
        story: '스토리북에서는 스크롤 컨텍스트가 없어 전체 텍스트가 보입니다. 실제 앱에서는 스크롤에 따라 텍스트가 점진적으로 밝아집니다.',
      },
    },
  },
};

const ManualProgressDemo = () => {
  const [progress, setProgress] = useState(0);
  const text = '사람은 마음속 깊은 곳에서 번쩍거리며 지나가는 빛줄기를 발견하고 관찰하는 법을 배워야 한다.';

  const sentences = text.split('. ').map((s, i, arr) =>
    i < arr.length - 1 ? s + '.' : s
  );

  let totalChars = 0;
  sentences.forEach(sentence => {
    for (const char of sentence) {
      if (char !== ' ') totalChars++;
    }
  });

  const revealedCount = Math.floor(totalChars * progress);
  let charCounter = 0;

  return (
    <div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={progress}
        onChange={(e) => setProgress(parseFloat(e.target.value))}
        className="w-full mb-8"
      />
      <p className="font-sans text-sm text-mid-light/50 mb-4">
        Progress: {Math.round(progress * 100)}%
      </p>
      <div>
        {sentences.map((sentence, sIdx) => (
          <p
            key={sIdx}
            className="font-serif text-2xl md:text-4xl leading-[1.9] mb-8"
          >
            {sentence.split('').map((char, cIdx) => {
              const isSpace = char === ' ';
              const isRevealed = isSpace || charCounter < revealedCount;
              if (!isSpace) charCounter++;
              return (
                <span
                  key={cIdx}
                  style={{
                    color: isRevealed ? '#E8E8E6' : 'rgba(232, 232, 230, 0.12)',
                    transition: 'color 0.15s ease-out',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </div>
  );
};

export const InteractiveProgress: Story = {
  render: () => <ManualProgressDemo />,
  parameters: {
    docs: {
      description: {
        story: '슬라이더로 스크롤 진행도를 시뮬레이션할 수 있습니다.',
      },
    },
  },
};
