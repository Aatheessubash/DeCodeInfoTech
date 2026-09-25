'use client';

import React, { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './ParticleText.module.css';

export interface ParticleTextProps {
  text?: string;
  leadText?: string;
  accentText?: string;
  particleSize?: number;
  density?: number;
  color?: string;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: 'mount' | 'hover' | 'click';
  fontSize?: number | string;
  fontWeight?: number | string;
  fontFamily?: string;
  className?: string;
  style?: CSSProperties;
}

type Rgb = { r: number; g: number; b: number };

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  radius: number;
  phase: number;
  seed: number;
  bucket: number;
};

const hexToRgb = (hex: string): Rgb => {
  const clean = hex.replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return { r: 29, g: 29, b: 31 };
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
};

const mixRgb = (from: Rgb, to: Rgb, amount: number): Rgb => ({
  r: Math.round(from.r + (to.r - from.r) * amount),
  g: Math.round(from.g + (to.g - from.g) * amount),
  b: Math.round(from.b + (to.b - from.b) * amount),
});

const rgbToCss = (rgb: Rgb): string => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

// Theme Accent Gradient: Electric Royal Blue -> Royal Violet -> Vibrant Magenta
// Stop 0 (0.00): #006ae3 (Electric Royal Blue)
// Stop 1 (0.50): #7c3aed (Royal Violet)
// Stop 2 (1.00): #c026d3 (Vibrant Magenta)
const C_BLUE: Rgb = { r: 0, g: 106, b: 227 };
const C_VIOLET: Rgb = { r: 124, g: 58, b: 237 };
const C_MAGENTA: Rgb = { r: 192, g: 38, b: 211 };

const getThemeAccentColor = (t: number): Rgb => {
  if (t <= 0.5) {
    return mixRgb(C_BLUE, C_VIOLET, t / 0.5);
  }
  return mixRgb(C_VIOLET, C_MAGENTA, (t - 0.5) / 0.5);
};

// 32-step precomputed palette for 120fps batch rendering
const PALETTE_STEPS = 32;
const ACCENT_PALETTE: string[] = Array.from({ length: PALETTE_STEPS }, (_, i) => {
  const t = i / (PALETTE_STEPS - 1);
  return rgbToCss(getThemeAccentColor(t));
});

export const ParticleText = ({
  text,
  leadText,
  accentText = 'Digital Innovation.',
  particleSize,
  density = 4,
  color = '#1d1d1f',
  pointerRepel = 11,
  repelRadius = 110,
  idleDrift = 0.45,
  trigger = 'hover',
  fontSize,
  fontWeight,
  fontFamily,
  className = '',
  style,
}: ParticleTextProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  // If text or accentText is provided without leadText, we operate in Single Accent Mode (Digital Innovation only)
  const isSingleMode = !leadText;
  const singleText = text || accentText;
  const fullText = isSingleMode ? singleText : `${leadText} ${accentText}`.trim();

  const leadRgb = hexToRgb(color);
  const leadCssColor = rgbToCss(leadRgb);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return undefined;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let particles: Particle[] = [];
    let buckets: Particle[][] = Array.from({ length: PALETTE_STEPS + 1 }, () => []);
    let animationFrame: number | null = null;
    let resizeFrame: number | null = null;
    let isVisible = true;
    let currentWidth = 0;
    let currentHeight = 0;
    let dpr = 1;

    const pointer = {
      active: false,
      x: -9999,
      y: -9999,
    };

    const drawParticles = (now: number): void => {
      ctx.clearRect(0, 0, currentWidth, currentHeight);

      const hasPointer = pointer.active;
      const px = pointer.x;
      const py = pointer.y;
      const repelSq = repelRadius * repelRadius;
      const driftTime = now * 0.0016;

      // 1. Update Physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor Repulsion
        if (hasPointer) {
          const dx = p.x - px;
          const dy = p.y - py;
          const distSq = dx * dx + dy * dy;

          if (distSq < repelSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const force = Math.pow(1 - dist / repelRadius, 2) * pointerRepel;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Spring force returning to resting position
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * 0.082;
        p.vy += homeDy * 0.082;

        // Friction damping
        p.vx *= 0.81;
        p.vy *= 0.81;

        p.x += p.vx;
        p.y += p.vy;
      }

      // 2. Batch Draw Lead Particles (Bucket 0) if present
      const leadGroup = buckets[0];
      if (leadGroup && leadGroup.length > 0) {
        ctx.fillStyle = leadCssColor;
        ctx.beginPath();
        for (let i = 0; i < leadGroup.length; i++) {
          const p = leadGroup[i];
          let drawX = p.x;
          let drawY = p.y;

          if (idleDrift > 0 && Math.abs(p.originX - p.x) < 2) {
            drawX += Math.sin(driftTime + p.phase) * idleDrift;
            drawY += Math.cos(driftTime * 0.85 + p.phase) * idleDrift;
          }

          ctx.moveTo(drawX + p.radius, drawY);
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // 3. Batch Draw Accent Particles (Buckets 1..32) in smooth linear gradient
      for (let b = 1; b <= PALETTE_STEPS; b++) {
        const group = buckets[b];
        if (!group || group.length === 0) continue;

        ctx.fillStyle = ACCENT_PALETTE[b - 1];
        ctx.beginPath();
        for (let i = 0; i < group.length; i++) {
          const p = group[i];
          let drawX = p.x;
          let drawY = p.y;

          if (idleDrift > 0 && Math.abs(p.originX - p.x) < 2) {
            drawX += Math.sin(driftTime + p.phase) * idleDrift;
            drawY += Math.cos(driftTime * 0.85 + p.phase) * idleDrift;
          }

          ctx.moveTo(drawX + p.radius, drawY);
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      if (isVisible) {
        animationFrame = window.requestAnimationFrame(drawParticles);
      }
    };

    const ensureRenderLoop = (): void => {
      if (animationFrame === null && isVisible) {
        animationFrame = window.requestAnimationFrame(drawParticles);
      }
    };

    const explodeFrom = (clientX: number, clientY: number, power = 38): void => {
      const rect = canvas.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.hypot(dx, dy) || 1;
        const angle = Math.atan2(dy, dx) + (p.seed - 0.5) * 0.75;
        const blast = Math.max(8, power * (1 - Math.min(dist / 380, 1))) + p.seed * 10;

        p.vx += Math.cos(angle) * blast;
        p.vy += Math.sin(angle) * blast;
      }
      ensureRenderLoop();
    };

    const sampleText = (): void => {
      const rect = container?.getBoundingClientRect();
      let width = rect ? Math.floor(rect.width) : 0;
      if (width <= 0) {
        width = Math.min(window.innerWidth - 32, 1040);
      }
      if (width <= 0) return;

      currentWidth = width;
      const isMobile = width <= 768;

      // Inherit typography styles dynamically from parent CSS headline
      const computed = window.getComputedStyle(container);
      const parentFontSize = parseFloat(computed.fontSize) || 64;
      const parentFontWeight = computed.fontWeight || '800';
      const parentFontFamily =
        computed.fontFamily ||
        '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';
      const parentTextAlign = computed.textAlign || 'left';
      const isCentered = parentTextAlign === 'center' || isMobile;

      let resolvedSize: number;
      if (fontSize) {
        resolvedSize = typeof fontSize === 'number' ? fontSize : parseFloat(String(fontSize));
      } else {
        resolvedSize = parentFontSize;
      }

      const resolvedWeight = fontWeight ? String(fontWeight) : parentFontWeight;
      const resolvedFamily = fontFamily || parentFontFamily;

      let lineItems: { text: string; isAccent: boolean }[];
      if (isSingleMode) {
        lineItems = [{ text: singleText, isAccent: true }];
      } else if (text) {
        const parts = text.split('\n');
        lineItems = parts.map((t, idx) => ({ text: t.trim(), isAccent: idx === parts.length - 1 }));
      } else {
        lineItems = [
          { text: leadText || '', isAccent: false },
          ...(accentText ? [{ text: accentText, isAccent: true }] : []),
        ];
      }

      lineItems = lineItems.filter((item) => Boolean(item.text && item.text.trim()));

      // Offscreen canvas for typography measurement & rasterization
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = Math.max(300, lineItems.length * resolvedSize * 3);
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.font = `${resolvedWeight} ${resolvedSize}px ${resolvedFamily}`;
      if ('letterSpacing' in offCtx) {
        (offCtx as unknown as { letterSpacing: string }).letterSpacing = '-0.035em';
      }

      // Check if text exceeds container width, scale font size proportionally so it never clips
      let maxLineWidth = 0;
      lineItems.forEach((item) => {
        const w = offCtx.measureText(item.text).width;
        if (w > maxLineWidth) maxLineWidth = w;
      });

      const maxAllowedWidth = width - (isMobile ? 8 : 16);
      if (maxLineWidth > maxAllowedWidth && maxLineWidth > 0) {
        const scale = maxAllowedWidth / maxLineWidth;
        resolvedSize = Math.max(22, Math.floor(resolvedSize * scale));
        offCtx.font = `${resolvedWeight} ${resolvedSize}px ${resolvedFamily}`;
      }

      const lineHeight = Math.round(resolvedSize * 1.05);
      const paddingY = Math.max(10, Math.round(resolvedSize * 0.22));
      const computedHeight = lineItems.length * lineHeight + paddingY * 2;
      currentHeight = computedHeight;

      // In single line mode, container height reflects exact text line height,
      // while canvas expands vertically with paddingY to allow particles to scatter freely without clipping.
      if (isSingleMode) {
        container.style.height = `${lineHeight}px`;
        container.style.minHeight = `${lineHeight}px`;
        canvas.style.position = 'absolute';
        canvas.style.top = `-${paddingY}px`;
        canvas.style.left = '0';
      } else {
        container.style.minHeight = `${computedHeight}px`;
        canvas.style.position = 'relative';
        canvas.style.top = '0';
        canvas.style.left = '0';
      }

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(computedHeight * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${computedHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rasterize on offscreen canvas
      offscreen.width = width;
      offscreen.height = computedHeight;
      offCtx.font = `${resolvedWeight} ${resolvedSize}px ${resolvedFamily}`;
      if ('letterSpacing' in offCtx) {
        (offCtx as unknown as { letterSpacing: string }).letterSpacing = '-0.035em';
      }
      offCtx.textBaseline = 'top';
      offCtx.textAlign = isCentered ? 'center' : 'left';
      const textStartX = isCentered ? width / 2 : 0;

      lineItems.forEach((item, idx) => {
        const lineY = paddingY + idx * lineHeight;
        offCtx.fillStyle = '#ffffff';
        offCtx.fillText(item.text, textStartX, lineY);
      });

      const imageData = offCtx.getImageData(0, 0, width, computedHeight);
      const step = Math.max(1.5, density);
      const baseRadius = particleSize || Math.max(1.2, step * 0.44);

      type RawTarget = {
        x: number;
        y: number;
        alpha: number;
        isAccent: boolean;
      };

      const rawTargets: RawTarget[] = [];
      let accentMinX = Infinity;
      let accentMaxX = -Infinity;

      for (let y = 0; y < computedHeight; y += step) {
        const lineIndex = Math.min(
          lineItems.length - 1,
          Math.max(0, Math.floor((y - paddingY) / lineHeight)),
        );
        const isAccent = lineItems[lineIndex]?.isAccent ?? false;
        const rowStart = Math.floor(y) * width * 4;

        for (let x = 0; x < width; x += step) {
          const px = Math.floor(x);
          const alpha = imageData.data[rowStart + px * 4 + 3];

          if (alpha > 42) {
            rawTargets.push({
              x,
              y,
              alpha: alpha / 255,
              isAccent,
            });

            if (isAccent) {
              if (x < accentMinX) accentMinX = x;
              if (x > accentMaxX) accentMaxX = x;
            }
          }
        }
      }

      const accentSpan = Math.max(1, accentMaxX - accentMinX);
      const newBuckets: Particle[][] = Array.from({ length: PALETTE_STEPS + 1 }, () => []);
      const newParticles: Particle[] = [];

      for (let i = 0; i < rawTargets.length; i++) {
        const target = rawTargets[i];
        const seed = ((i * 9301 + 49297) % 233280) / 233280;
        const phase = seed * Math.PI * 2;
        const radius = Math.max(1.0, baseRadius * (0.86 + target.alpha * 0.24));

        let bucketIndex = 0;
        if (target.isAccent) {
          const t = clamp((target.x - accentMinX) / accentSpan, 0, 1);
          bucketIndex = Math.min(PALETTE_STEPS - 1, Math.floor(t * PALETTE_STEPS)) + 1;
        }

        const p: Particle = {
          x: target.x,
          y: target.y,
          vx: 0,
          vy: 0,
          originX: target.x,
          originY: target.y,
          radius,
          phase,
          seed,
          bucket: bucketIndex,
        };

        newParticles.push(p);
        newBuckets[bucketIndex].push(p);
      }

      particles = newParticles;
      buckets = newBuckets;

      ensureRenderLoop();
    };

    const queueSample = (): void => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        sampleText();
      });
    };

    // Event Listeners for Hover, Move, Click & Touch
    const handlePointerMove = (e: PointerEvent): void => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      ensureRenderLoop();
    };

    const handlePointerLeave = (): void => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const handleClick = (e: MouseEvent): void => {
      explodeFrom(e.clientX, e.clientY, 36);
    };

    const handleTouchStart = (e: TouchEvent): void => {
      if (e.touches[0]) {
        const t = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        pointer.x = t.clientX - rect.left;
        pointer.y = t.clientY - rect.top;
        pointer.active = true;
        explodeFrom(t.clientX, t.clientY, 28);
      }
    };

    const handleTouchMove = (e: TouchEvent): void => {
      if (e.touches[0]) {
        const t = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        pointer.x = t.clientX - rect.left;
        pointer.y = t.clientY - rect.top;
        pointer.active = true;
        ensureRenderLoop();
      }
    };

    const handleTouchEnd = (): void => {
      handlePointerLeave();
    };

    canvas.addEventListener('pointerenter', handlePointerMove);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

    // ResizeObserver
    let lastObservedWidth = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = Math.floor(entry.contentRect.width);
        if (newWidth > 0 && Math.abs(newWidth - lastObservedWidth) > 3) {
          lastObservedWidth = newWidth;
          queueSample();
        }
      }
    });
    resizeObserver.observe(container);

    // IntersectionObserver to pause loop when off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            ensureRenderLoop();
          } else if (animationFrame !== null) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = null;
          }
        }
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    sampleText();

    void document?.fonts?.ready?.then(() => {
      queueSample();
    });

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener('pointerenter', handlePointerMove);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);

      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
    };
  }, [
    isClient,
    text,
    leadText,
    accentText,
    particleSize,
    density,
    color,
    leadCssColor,
    pointerRepel,
    repelRadius,
    idleDrift,
    trigger,
    fontSize,
    fontWeight,
    fontFamily,
    isSingleMode,
    singleText,
  ]);

  return (
    <div
      ref={containerRef}
      className={`${styles.particleText} ${className}`}
      style={style}
      aria-label={fullText}
    >
      {/* Semantic Accessible Heading for SEO & Screen Readers */}
      <span className={styles.particleTextSr}>{fullText}</span>

      {/* Fallback for SSR before client hydration */}
      {!isClient && (
        <>
          {isSingleMode ? (
            <span className={styles.staticAccent}>{singleText}</span>
          ) : (
            <div className={styles.staticHeadline}>
              <span className={styles.headlineLead}>{leadText}</span>{' '}
              <span className={styles.headlineAccent}>{accentText}</span>
            </div>
          )}
        </>
      )}

      {/* Interactive High-Performance Particle Canvas */}
      {isClient && (
        <canvas
          ref={canvasRef}
          className={styles.particleTextCanvas}
          title="Interactive particle text — hover or click to scatter"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ParticleText;
