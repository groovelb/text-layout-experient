import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DocumentTitle } from '../docs/components/DocumentTitle';
import { PageContainer } from '../docs/components/PageContainer';
import { SectionTitle } from '../docs/components/SectionTitle';

const meta: Meta = {
  title: 'Style/Colors',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const ColorSwatch = ({
  name,
  value,
  textOnDark = true
}: {
  name: string;
  value: string;
  textOnDark?: boolean;
}) => (
  <div className="flex items-center gap-4 mb-4">
    <div
      className="w-20 h-20 rounded-lg border border-white/10"
      style={{ backgroundColor: value }}
    />
    <div>
      <p className={`font-sans font-medium ${textOnDark ? 'text-mid-light' : 'text-off-black'}`}>
        {name}
      </p>
      <p className="font-mono text-sm text-mid-light/60">{value}</p>
    </div>
  </div>
);

export const Default: StoryObj = {
  render: () => (
    <PageContainer background="dark">
      <DocumentTitle
        title="Colors"
        description="Self-Reliance 프로젝트의 컬러 시스템입니다. 에디토리얼 톤을 위한 오프화이트와 오프블랙 기반의 미니멀 팔레트를 사용합니다."
      />

      <SectionTitle
        title="토큰 구조"
        description="배경색과 텍스트색이 쌍으로 매칭됩니다."
      />
      <pre className="font-mono text-sm text-mid-light/80 bg-mid-dark/50 p-4 rounded-lg overflow-x-auto">
{`COLORS = {
  bgLight: '#FAF8F6',   // 밝은 배경 (Hero, Outro)
  bgDark: '#0E0A0A',    // 어두운 배경 (Section 1-3)
  textLight: '#FAF8F6', // 밝은 텍스트 (어두운 배경용)
  textDark: '#0E0A0A',  // 어두운 텍스트 (밝은 배경용)
}`}
      </pre>

      <SectionTitle title="토큰 값" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-sans text-xs uppercase tracking-widest text-mid-light/50 mb-4">
            배경색
          </h4>
          <ColorSwatch name="off-white" value="#FAFAF8" />
          <ColorSwatch name="off-black" value="#0A0A0C" />
        </div>
        <div>
          <h4 className="font-sans text-xs uppercase tracking-widest text-mid-light/50 mb-4">
            중간톤
          </h4>
          <ColorSwatch name="mid-light" value="#E8E8E6" />
          <ColorSwatch name="mid-dark" value="#18181A" />
        </div>
      </div>

      <SectionTitle title="사용 예시" />
      <div className="space-y-4">
        <div className="bg-off-white p-6 rounded-lg">
          <p className="text-off-black font-serif text-xl">
            밝은 배경에서의 텍스트 (Hero, Outro)
          </p>
        </div>
        <div className="bg-mid-dark p-6 rounded-lg">
          <p className="text-mid-light font-serif text-xl">
            어두운 배경에서의 텍스트 (Section 1-3)
          </p>
        </div>
      </div>

      <SectionTitle title="Vibe Coding Prompt" />
      <div className="bg-mid-dark/50 p-6 rounded-lg border border-mid-light/10">
        <p className="font-mono text-sm text-mid-light/80 leading-relaxed">
          "이 프로젝트는 에머슨의 '자기신뢰' 에세이를 시각화합니다.
          컬러는 19세기 에세이의 잉크와 종이 느낌을 현대적으로 재해석한
          오프화이트(#FAF8F6)와 오프블랙(#0E0A0A)을 기본으로 합니다.
          밝음에서 어두움으로의 전환은 내면으로의 여정을 상징합니다."
        </p>
      </div>
    </PageContainer>
  ),
};
