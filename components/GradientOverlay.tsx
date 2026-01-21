import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { COLORS } from '../constants';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uResolution;
  uniform vec3 uColorTop;
  uniform vec3 uColorBottom;

  varying vec2 vUv;

  // Simplex Noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Film Grain
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    // 1. 노이즈 - 아주 완만한 곡선 (거의 수평선)
    float noise = snoise(vec2(vUv.x * 0.5, vUv.y * 0.5 + uTime * 0.03));

    // 2. 왜곡 - 직선에 가깝지만 유기적인 움직임
    float distortedY = vUv.y + noise * 0.04;

    // 3. 스크롤 진행도
    float progress = uScroll * 1.6 - 0.3;

    // 4. Smoothstep 마스킹 - 부드러운 그라데이션 경계
    float mask = smoothstep(progress - 0.3, progress + 0.3, distortedY);

    // 5. 컬러 믹싱
    vec3 color = mix(uColorBottom, uColorTop, mask);

    // 6. 미세한 필름 그레인
    float grain = random(vUv * uResolution + uTime) * 0.035;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// Hex to RGB (0-1 range)
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255
    ];
  }
  return [0, 0, 0];
}

const GradientOverlay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const uniformsRef = useRef<any>(null);
  const animationIdRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Colors
    const colorTop = hexToRgb(COLORS.bgLight);
    const colorBottom = hexToRgb(COLORS.bgDark);

    // Uniforms
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uColorTop: { value: new THREE.Color(...colorTop) },
      uColorBottom: { value: new THREE.Color(...colorBottom) }
    };
    uniformsRef.current = uniforms;

    // Material & Mesh
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Scroll handling
    let targetScroll = 0;
    let currentScroll = 0;

    const updateScrollTarget = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // 히어로 높이(100vh) 기준으로 progress 계산
      targetScroll = Math.min(scrollY / windowHeight, 1);
    };

    // Resize handling
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.06;

      uniforms.uTime.value = elapsedTime;
      uniforms.uScroll.value = currentScroll;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default GradientOverlay;
