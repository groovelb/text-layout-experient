import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import GradientOverlay from '../../../components/GradientOverlay';

const meta: Meta<typeof GradientOverlay> = {
  title: 'Custom Component/GradientOverlay',
  component: GradientOverlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Three.js 기반 WebGL 그라데이션 오버레이입니다. Simplex Noise를 사용한 동적 경계선과 필름 그레인 효과를 제공합니다. 스크롤에 따라 밝은 배경에서 어두운 배경으로 전환됩니다.',
      },
    },
  },
  argTypes: {
    outroRef: {
      control: false,
      description: 'Outro 섹션에 대한 ref (스크롤 진행도 계산용)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GradientOverlay>;

const GradientOverlayWrapper = () => {
  const outroRef = useRef<HTMLElement>(null);
  return (
    <div className="relative">
      <GradientOverlay outroRef={outroRef} />

      {/* Hero */}
      <section className="h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <h1 className="font-serif text-6xl text-off-black mb-4">Hero Section</h1>
          <p className="font-sans text-off-black/60">스크롤하여 그라데이션 전환 확인</p>
        </div>
      </section>

      {/* Section 1-3 (Dark) */}
      <section className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <h2 className="font-serif text-4xl text-mid-light mb-4">Section 1</h2>
          <p className="font-sans text-mid-light/60">어두운 배경으로 전환됨</p>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <h2 className="font-serif text-4xl text-mid-light mb-4">Section 2</h2>
          <p className="font-sans text-mid-light/60">어두운 배경 유지</p>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <h2 className="font-serif text-4xl text-mid-light mb-4">Section 3</h2>
          <p className="font-sans text-mid-light/60">Outro로 전환 준비</p>
        </div>
      </section>

      {/* Outro (Light) */}
      <section
        ref={outroRef as React.RefObject<HTMLElement>}
        className="min-h-screen flex items-center justify-center relative z-10"
      >
        <div className="text-center">
          <h2 className="font-serif text-4xl text-off-black mb-4">Outro</h2>
          <p className="font-sans text-off-black/60">밝은 배경으로 복귀 (상단 엣지 유지)</p>
        </div>
      </section>

      {/* Info Panel */}
      <div className="fixed top-4 left-4 z-20 bg-black/50 p-4 rounded-lg text-white font-sans text-sm max-w-xs">
        <h3 className="font-medium text-mid-light mb-2">GradientOverlay</h3>
        <p className="text-mid-light/70 text-xs leading-relaxed">
          스크롤하여 배경 전환을 확인하세요.
        </p>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <GradientOverlayWrapper />,
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 그라데이션입니다. 스토리북에서는 스크롤 컨텍스트가 없어 초기 상태(밝은 배경)로 표시됩니다.',
      },
    },
  },
};

const ShaderInfoPanel = () => (
  <div className="relative w-screen h-screen">
    <GradientOverlay outroRef={useRef<HTMLElement>(null)} />
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="bg-black/70 p-8 rounded-lg text-white font-mono text-sm max-w-2xl">
        <h3 className="font-sans font-medium text-lg text-mid-light mb-4">Shader Features</h3>
        <div className="space-y-4 text-mid-light/80">
          <div>
            <p className="text-mid-light/50 text-xs uppercase tracking-wider mb-1">Simplex Noise Wave</p>
            <code className="text-xs">float wave = snoise(vec2(vUv.x * 0.8, uTime * 0.25)) * 0.04;</code>
          </div>
          <div>
            <p className="text-mid-light/50 text-xs uppercase tracking-wider mb-1">Phase 1: Dark Rising</p>
            <code className="text-xs">Hero → Section1: 어두운색이 아래에서 올라옴</code>
          </div>
          <div>
            <p className="text-mid-light/50 text-xs uppercase tracking-wider mb-1">Phase 2: Light Revealing</p>
            <code className="text-xs">Section3 → Outro: 밝은색이 아래에서 올라옴 (상단 15% 어두운 엣지 유지)</code>
          </div>
          <div>
            <p className="text-mid-light/50 text-xs uppercase tracking-wider mb-1">Film Grain</p>
            <code className="text-xs">float grain = random(vUv * uResolution + uTime) * 0.035;</code>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ShaderInfo: Story = {
  render: () => <ShaderInfoPanel />,
  parameters: {
    docs: {
      description: {
        story: '쉐이더의 주요 기능을 설명합니다. Simplex Noise 웨이브, 2단계 전환, 필름 그레인 효과가 포함되어 있습니다.',
      },
    },
  },
};
