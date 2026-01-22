import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DocumentTitle } from '../docs/components/DocumentTitle';
import { PageContainer } from '../docs/components/PageContainer';
import { SectionTitle } from '../docs/components/SectionTitle';

const meta: Meta = {
  title: 'Style/Typography',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const TypographySample = ({
  fontClass,
  label,
  sample
}: {
  fontClass: string;
  label: string;
  sample: string;
}) => (
  <div className="mb-8">
    <p className="font-sans text-xs uppercase tracking-widest text-mid-light/50 mb-2">
      {label}
    </p>
    <p className={`${fontClass} text-mid-light leading-relaxed`}>
      {sample}
    </p>
  </div>
);

export const Default: StoryObj = {
  render: () => (
    <PageContainer background="dark">
      <DocumentTitle
        title="Typography"
        description="Self-Reliance 프로젝트의 타이포그래피 시스템입니다. 클래식한 세리프와 모던한 산세리프의 조화를 추구합니다."
      />

      <SectionTitle title="토큰 구조" />
      <pre className="font-mono text-sm text-mid-light/80 bg-mid-dark/50 p-4 rounded-lg">
{`fontFamily: {
  serif: ['"Playfair Display"', '"RIDIBatang"', 'serif'],
  sans: ['Inter', 'sans-serif'],
}`}
      </pre>

      <SectionTitle title="폰트 패밀리" />
      <TypographySample
        fontClass="font-serif text-3xl"
        label="Serif (Playfair Display + RIDIBatang)"
        sample="Self-Reliance 자기신뢰"
      />
      <TypographySample
        fontClass="font-sans text-xl"
        label="Sans-serif (Inter)"
        sample="Ralph Waldo Emerson, 1841"
      />

      <SectionTitle title="타이포그래피 스케일" />
      <div className="space-y-8">
        <div>
          <p className="font-sans text-xs uppercase tracking-widest text-mid-light/50 mb-2">
            Hero Title — clamp(2.5rem, 10vw, 12rem), tracking: -0.05em
          </p>
          <h1 className="font-serif font-semibold text-6xl md:text-8xl leading-[1.2] tracking-[-0.05em] text-mid-light uppercase">
            Self-Reliance
          </h1>
        </div>

        <div>
          <p className="font-sans text-xs uppercase tracking-widest text-mid-light/50 mb-2">
            Section Title — 3xl → 5xl, tracking: -0.04em
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.3] tracking-[-0.04em] text-mid-light">
            자기 생각을 무시하는 사람들
          </h2>
        </div>

        <div>
          <p className="font-sans text-xs uppercase tracking-widest text-mid-light/50 mb-2">
            Body Text — xl → 2xl, line-height: 1.65
          </p>
          <p className="font-sans text-xl md:text-2xl text-mid-light" style={{ lineHeight: 1.65 }}>
            사람은 마음속 깊은 곳에서 번쩍거리며 지나가는 빛줄기를 발견하고 관찰하는 법을 배워야 한다.
          </p>
        </div>

        <div>
          <p className="font-sans text-xs uppercase tracking-widest text-mid-light/50 mb-2">
            Caption / Label — sm → base, tracking: widest, uppercase
          </p>
          <p className="font-sans text-sm md:text-base tracking-widest text-mid-light/60 uppercase">
            01 — 빛
          </p>
        </div>
      </div>

      <SectionTitle title="Vibe Coding Prompt" />
      <div className="bg-mid-dark/50 p-6 rounded-lg border border-mid-light/10">
        <p className="font-mono text-sm text-mid-light/80 leading-relaxed">
          "Playfair Display는 영문 타이틀에, RIDIBatang은 한글 본문에 사용합니다.
          두 서체 모두 클래식한 세리프로 에머슨 시대의 활자 느낌을 재현합니다.
          Inter는 UI 요소와 메타 정보에 사용하여 현대적 가독성을 제공합니다.
          letter-spacing은 -0.03em ~ -0.05em으로 촘촘하게 설정하여 에디토리얼 느낌을 강조합니다."
        </p>
      </div>
    </PageContainer>
  ),
};
