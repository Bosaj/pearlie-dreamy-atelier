import React, { useEffect, useRef } from 'react';

export type PearlSpectrum = 'nacre' | 'ruby' | 'noir' | 'mint' | 'amber';

interface PearlFieldCanvasProps {
  spectrum: PearlSpectrum;
  lightMode: boolean;
}

interface PearlNode {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  tintIndex: number;
}

const SPECTRUM_PALETTES: Record<
  PearlSpectrum,
  { core: string; mid: string; rim: string; glow: string; line: string }[]
> = {
  nacre: [
    { core: '#FFFFFF', mid: '#F3E5F8', rim: '#C8A2D6', glow: 'rgba(216,180,226,0.35)', line: 'rgba(216,180,226,0.12)' },
    { core: '#FFFDF9', mid: '#F9D5E5', rim: '#D4AF37', glow: 'rgba(249,213,229,0.3)', line: 'rgba(216,180,226,0.12)' },
    { core: '#F8FBFF', mid: '#DDF7EE', rim: '#A3D9C9', glow: 'rgba(201,240,228,0.28)', line: 'rgba(216,180,226,0.12)' },
  ],
  ruby: [
    { core: '#FFD6DE', mid: '#C81D32', rim: '#590512', glow: 'rgba(224,30,55,0.4)', line: 'rgba(224,30,55,0.14)' },
    { core: '#FFF3D6', mid: '#D4AF37', rim: '#7A5908', glow: 'rgba(212,175,55,0.32)', line: 'rgba(224,30,55,0.14)' },
  ],
  noir: [
    { core: '#E5E7EB', mid: '#2B2838', rim: '#07060B', glow: 'rgba(212,175,55,0.3)', line: 'rgba(212,175,55,0.12)' },
    { core: '#FFF8DC', mid: '#D4AF37', rim: '#6B5310', glow: 'rgba(212,175,55,0.38)', line: 'rgba(212,175,55,0.12)' },
  ],
  mint: [
    { core: '#FFFFFF', mid: '#BFF2E2', rim: '#4EB89D', glow: 'rgba(127,209,185,0.38)', line: 'rgba(127,209,185,0.14)' },
    { core: '#FFFDF9', mid: '#EFE6F7', rim: '#C9B3DF', glow: 'rgba(230,215,234,0.32)', line: 'rgba(127,209,185,0.14)' },
  ],
  amber: [
    { core: '#FFF4D9', mid: '#E39D52', rim: '#7C3F0E', glow: 'rgba(227,157,82,0.38)', line: 'rgba(227,157,82,0.14)' },
    { core: '#FFFFFF', mid: '#F3E5AB', rim: '#B8860B', glow: 'rgba(243,229,171,0.3)', line: 'rgba(227,157,82,0.14)' },
  ],
};

export const PearlFieldCanvas: React.FC<PearlFieldCanvasProps> = ({ spectrum, lightMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const count = Math.min(34, Math.max(18, Math.floor(width / 55)));
    const pearls: PearlNode[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: 0.35 + Math.random() * 0.65,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      radius: 5 + Math.random() * 15,
      phase: Math.random() * Math.PI * 2,
      tintIndex: i,
    }));

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const palette = SPECTRUM_PALETTES[spectrum] || SPECTRUM_PALETTES.nacre;

      // Draw subtle constellation lines between nearby pearls
      for (let i = 0; i < pearls.length; i++) {
        for (let j = i + 1; j < pearls.length; j++) {
          const dx = pearls[i].x - pearls[j].x;
          const dy = pearls[i].y - pearls[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 165) {
            const alpha = (1 - dist / 165) * (lightMode ? 0.14 : 0.18);
            ctx.strokeStyle = lightMode
              ? `rgba(145, 98, 175, ${alpha})`
              : `rgba(225, 198, 240, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(pearls[i].x, pearls[i].y);
            ctx.lineTo(pearls[j].x, pearls[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & draw 3D shaded pearls
      for (let i = 0; i < pearls.length; i++) {
        const p = pearls[i];
        p.x += p.vx * p.z;
        p.y += p.vy * p.z + Math.sin(time + p.phase) * 0.15;

        // Gentle spring repulsion from cursor
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 1) {
          const force = (140 - dist) / 140;
          p.x += (dx / dist) * force * 1.8;
          p.y += (dy / dist) * force * 1.8;
        }

        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        const r = p.radius * p.z;
        const tint = palette[p.tintIndex % palette.length];

        // Outer ambient halo
        const halo = ctx.createRadialGradient(p.x, p.y, r * 0.2, p.x, p.y, r * 2.4);
        halo.addColorStop(0, tint.glow);
        halo.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.4, 0, Math.PI * 2);
        ctx.fill();

        // 3D Nacre Sphere Gradient
        const hlX = p.x - r * 0.32;
        const hlY = p.y - r * 0.32;
        const sphereGrad = ctx.createRadialGradient(hlX, hlY, r * 0.08, p.x, p.y, r);
        sphereGrad.addColorStop(0, tint.core);
        sphereGrad.addColorStop(0.55, tint.mid);
        sphereGrad.addColorStop(1, tint.rim);

        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Specular micro-glint
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.beginPath();
        ctx.arc(p.x - r * 0.35, p.y - r * 0.35, Math.max(1.2, r * 0.16), 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, [spectrum, lightMode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
    />
  );
};
