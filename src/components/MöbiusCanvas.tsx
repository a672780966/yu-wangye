import React, { useEffect, useRef } from 'react';

interface MöbiusCanvasProps {
  className?: string;
}

// 3D vector helper utilities
interface Vec3 {
  x: number;
  y: number;
  z: number;
}

const normalize = (v: Vec3): Vec3 => {
  const len = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / len, y: v.y / len, z: v.z / len };
};

const dot = (a: Vec3, b: Vec3): number => a.x * b.x + a.y * b.y + a.z * b.z;

const cross = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});

// Fixed Environmental Lighting vectors in world space
const KEY_LIGHT_DIR = normalize({ x: -0.6, y: -0.6, z: 0.52 });
const FILL_LIGHT_DIR = normalize({ x: 0.6, y: 0.6, z: -0.52 });
const CAM_DIR: Vec3 = { x: 0, y: 0, z: 1 };

// Deterministic Background Spatial Reference Points (16 points)
const BACKGROUND_POINTS: { xRatio: number; yRatio: number; alpha: number }[] = [
  { xRatio: 0.12, yRatio: 0.18, alpha: 0.14 },
  { xRatio: 0.88, yRatio: 0.22, alpha: 0.16 },
  { xRatio: 0.18, yRatio: 0.82, alpha: 0.12 },
  { xRatio: 0.82, yRatio: 0.78, alpha: 0.15 },
  { xRatio: 0.28, yRatio: 0.35, alpha: 0.13 },
  { xRatio: 0.72, yRatio: 0.32, alpha: 0.15 },
  { xRatio: 0.15, yRatio: 0.48, alpha: 0.14 },
  { xRatio: 0.85, yRatio: 0.55, alpha: 0.13 },
  { xRatio: 0.38, yRatio: 0.15, alpha: 0.16 },
  { xRatio: 0.62, yRatio: 0.85, alpha: 0.12 },
  { xRatio: 0.48, yRatio: 0.25, alpha: 0.14 },
  { xRatio: 0.52, yRatio: 0.75, alpha: 0.15 },
  { xRatio: 0.22, yRatio: 0.65, alpha: 0.12 },
  { xRatio: 0.78, yRatio: 0.42, alpha: 0.14 },
  { xRatio: 0.32, yRatio: 0.88, alpha: 0.13 },
  { xRatio: 0.68, yRatio: 0.12, alpha: 0.15 },
];

export const MöbiusCanvas: React.FC<MöbiusCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;
    let animationFrameId: number;

    const resize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    // Pause rendering when Hero is scrolled out of view or tab is hidden
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Constants for Deterministic Engineered Geometry
    const STATIONS = 72; // 72 stations along the loop
    const RAILS = 5; // 5 longitudinal rails: Rail 0 (Outer), 1 (Sec), 2 (Center Spine), 3 (Sec), 4 (Outer)
    const RAIL_OFFSETS = [-1.0, -0.5, 0.0, 0.5, 1.0];

    // Emissive Signal Nodes (Strictly 4 across the entire Möbius)
    const EMISSIVE_SIGNALS = [
      { station: 12, rail: 1, label: 'SIG_01' }, // ~17% phase
      { station: 30, rail: 4, label: 'SIG_02' }, // ~41% phase
      { station: 49, rail: 0, label: 'SIG_03' }, // ~68% phase
      { station: 62, rail: 3, label: 'SIG_04' }, // ~86% phase
    ];

    // Deterministic Anchor Nodes (12 structural anchors at key curvature & spine stations)
    const ANCHOR_STATIONS = [0, 6, 18, 24, 36, 42, 54, 60];

    // Render loop
    const render = (now: number) => {
      if (!isVisible || width <= 0 || height <= 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Deep space subtle gradient background
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      grad.addColorStop(0, '#090D15');
      grad.addColorStop(0.5, '#06080E');
      grad.addColorStop(1, '#0A0B0B');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render static, very dim background reference points
      ctx.fillStyle = 'rgba(210, 230, 250, 0.16)';
      for (let i = 0; i < BACKGROUND_POINTS.length; i++) {
        const bp = BACKGROUND_POINTS[i];
        ctx.globalAlpha = bp.alpha;
        ctx.beginPath();
        ctx.arc(bp.xRatio * width, bp.yRatio * height, 0.65, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Scale dimensions
      const scaleX = Math.min(width * 0.42, 450);
      const scaleY = scaleX * 0.44;
      const ribbonWidth = scaleX * 0.115;
      const zCrossingOffset = scaleX * 0.22; // Explicit front/back crossing Z-separation (delta ~120px)

      // Autonomous Multi-Frequency Harmonic Orientation (Decoupled, Rigid Body)
      const t = prefersReducedMotion ? 0 : now;
      const rotY = prefersReducedMotion ? 0.04 : Math.sin((t * 2 * Math.PI) / 32000) * 0.10; // ±5.7°, 32s period
      const rotX = prefersReducedMotion ? 0.02 : Math.cos((t * 2 * Math.PI) / 42000) * 0.045; // ±2.6°, 42s period
      const rotZ = prefersReducedMotion ? 0 : Math.sin((t * 2 * Math.PI) / 72000) * 0.022; // ±1.3°, 72s period

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      // 3D Point transformation & projection helper
      const transformPoint = (p: Vec3): { sx: number; sy: number; sz: number; depthScale: number } => {
        // Rotate Y
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        // Rotate Z
        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = x1 * sinZ + y2 * cosZ;
        const z3 = z2;

        const cameraZ = 850;
        const depthScale = cameraZ / (cameraZ + z3);
        const sx = width / 2 + x3 * depthScale;
        const sy = height / 2 + y3 * depthScale;

        return { sx, sy, sz: z3, depthScale };
      };

      // 3D Vector transformation (for lighting normals)
      const transformVector = (v: Vec3): Vec3 => {
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;
        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = x1 * sinZ + y2 * cosZ;
        return normalize({ x: x3, y: y3, z: z2 });
      };

      // Precalculate Station Geometry along the Lemniscate
      interface StationData {
        center: Vec3;
        tangent: Vec3;
        ribbonCross: Vec3;
        surfaceNormal: Vec3;
        rotNormal: Vec3;
        lightIntensity: number;
        points: Vec3[]; // 5 rails
        projPoints: { sx: number; sy: number; sz: number; depthScale: number }[];
      }

      const stations: StationData[] = [];

      for (let i = 0; i < STATIONS; i++) {
        const u = (i / STATIONS) * Math.PI * 2;
        const denom = 1 + Math.sin(u) * Math.sin(u);
        const cx = (scaleX * Math.cos(u)) / denom;
        const cy = (scaleY * Math.sin(u) * Math.cos(u)) / denom;
        // Explicit Front / Back Z-depth at infinity center crossing
        const cz = Math.sin(u) * zCrossingOffset;

        // Tangent approximation
        const du = 0.001;
        const nextDenom = 1 + Math.sin(u + du) * Math.sin(u + du);
        const ncx = (scaleX * Math.cos(u + du)) / nextDenom;
        const ncy = (scaleY * Math.sin(u + du) * Math.cos(u + du)) / nextDenom;
        const ncz = Math.sin(u + du) * zCrossingOffset;

        const tangent = normalize({ x: ncx - cx, y: ncy - cy, z: ncz - cz });

        // Reference frame for ribbon
        const up: Vec3 = { x: 0, y: 0, z: 1 };
        let inPlaneNormal = cross(up, tangent);
        if (Math.hypot(inPlaneNormal.x, inPlaneNormal.y, inPlaneNormal.z) < 0.01) {
          inPlaneNormal = { x: 0, y: 1, z: 0 };
        }
        inPlaneNormal = normalize(inPlaneNormal);
        const binormal = normalize(cross(tangent, inPlaneNormal));

        // True 180° Half Twist (twist = u / 2)
        const halfTwist = u / 2;
        const cosT = Math.cos(halfTwist);
        const sinT = Math.sin(halfTwist);

        const ribbonCross = normalize({
          x: inPlaneNormal.x * cosT + binormal.x * sinT,
          y: inPlaneNormal.y * cosT + binormal.y * sinT,
          z: inPlaneNormal.z * cosT + binormal.z * sinT,
        });

        const surfaceNormal = normalize({
          x: -inPlaneNormal.x * sinT + binormal.x * cosT,
          y: -inPlaneNormal.y * sinT + binormal.y * cosT,
          z: -inPlaneNormal.z * sinT + binormal.z * cosT,
        });

        // Compute 5 rail points
        const railPoints: Vec3[] = [];
        const projPoints: { sx: number; sy: number; sz: number; depthScale: number }[] = [];

        for (let k = 0; k < RAILS; k++) {
          const v = RAIL_OFFSETS[k] * ribbonWidth;
          const p: Vec3 = {
            x: cx + ribbonCross.x * v,
            y: cy + ribbonCross.y * v,
            z: cz + ribbonCross.z * v,
          };
          railPoints.push(p);
          projPoints.push(transformPoint(p));
        }

        const rotNormal = transformVector(surfaceNormal);

        // Fixed environmental lighting calculation
        const dotKey = Math.max(0, dot(rotNormal, KEY_LIGHT_DIR));
        const dotFill = Math.max(0, dot(rotNormal, FILL_LIGHT_DIR));
        const diffuse = dotKey * 0.8 + dotFill * 0.2;

        // Subtle specular highlight
        const refKey = normalize({
          x: 2 * dotKey * rotNormal.x - KEY_LIGHT_DIR.x,
          y: 2 * dotKey * rotNormal.y - KEY_LIGHT_DIR.y,
          z: 2 * dotKey * rotNormal.z - KEY_LIGHT_DIR.z,
        });
        const spec = Math.pow(Math.max(0, dot(refKey, CAM_DIR)), 12) * 0.35;
        const lightIntensity = Math.min(1.0, 0.22 + diffuse * 0.62 + spec);

        stations.push({
          center: { x: cx, y: cy, z: cz },
          tangent,
          ribbonCross,
          surfaceNormal,
          rotNormal,
          lightIntensity,
          points: railPoints,
          projPoints,
        });
      }

      // Drawing Element Items with Depth Sorting (Back to Front)
      interface RenderItem {
        zDepth: number;
        draw: () => void;
      }
      const renderItems: RenderItem[] = [];

      // 1. Longitudinal Rails (5 structural rails)
      for (let k = 0; k < RAILS; k++) {
        const isCenterSpine = k === 2;
        const isOuter = k === 0 || k === 4;

        for (let i = 0; i < STATIONS; i++) {
          const nextI = (i + 1) % STATIONS;
          // When closing seam at i = STATIONS - 1, connect to half-twist mapped rail (RAILS - 1 - k)
          const targetRail = i === STATIONS - 1 ? RAILS - 1 - k : k;

          const p1 = stations[i].projPoints[k];
          const p2 = stations[nextI].projPoints[targetRail];
          const avgZ = (p1.sz + p2.sz) * 0.5;
          const avgLight = (stations[i].lightIntensity + stations[nextI].lightIntensity) * 0.5;
          const depthAlpha = Math.max(0.2, Math.min(0.95, (avgZ + 160) / 320));

          // Base line width & color per rail tier
          let baseWidth = isCenterSpine ? 0.8 : isOuter ? 0.65 : 0.48;
          baseWidth *= p1.depthScale;

          renderItems.push({
            zDepth: avgZ,
            draw: () => {
              // Front occlusion understroke to cleanly separate crossing layers
              if (avgZ > 0) {
                ctx.strokeStyle = 'rgba(10, 11, 11, 0.9)';
                ctx.lineWidth = baseWidth + 1.2;
                ctx.beginPath();
                ctx.moveTo(p1.sx, p1.sy);
                ctx.lineTo(p2.sx, p2.sy);
                ctx.stroke();
              }

              // Silver/Graphite Rail stroke
              const r = Math.round(155 + avgLight * 75);
              const g = Math.round(180 + avgLight * 65);
              const b = Math.round(205 + avgLight * 50);
              const alpha = depthAlpha * (0.35 + avgLight * 0.65);

              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
              ctx.lineWidth = baseWidth;
              ctx.beginPath();
              ctx.moveTo(p1.sx, p1.sy);
              ctx.lineTo(p2.sx, p2.sy);
              ctx.stroke();
            },
          });
        }
      }

      // 2. Transverse Ribs (24 groups, every 3 stations)
      for (let i = 0; i < STATIONS; i += 3) {
        const st = stations[i];
        const avgZ = st.projPoints[2].sz;
        const depthAlpha = Math.max(0.18, Math.min(0.85, (avgZ + 160) / 320));
        const light = st.lightIntensity;

        renderItems.push({
          zDepth: avgZ - 0.5,
          draw: () => {
            const r = Math.round(135 + light * 70);
            const g = Math.round(160 + light * 60);
            const b = Math.round(185 + light * 50);
            const alpha = depthAlpha * (0.22 + light * 0.48);

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 0.45 * st.projPoints[2].depthScale;

            // Connect Rail 0 -> 1 -> 2 -> 3 -> 4
            ctx.beginPath();
            ctx.moveTo(st.projPoints[0].sx, st.projPoints[0].sy);
            for (let k = 1; k < RAILS; k++) {
              ctx.lineTo(st.projPoints[k].sx, st.projPoints[k].sy);
            }
            ctx.stroke();
          },
        });
      }

      // 3. Diagonal Braces (12 deterministic structural truss braces in alternating rhythm)
      for (let m = 0; m < 12; m++) {
        const i1 = (m * 6) % STATIONS;
        const i2 = (i1 + 3) % STATIONS;
        const isLeftLean = m % 2 === 0;

        const railStart1 = isLeftLean ? 0 : 4;
        const railEnd1 = 2;
        const railStart2 = 2;
        const railEnd2 = isLeftLean ? 4 : 0;

        const pA1 = stations[i1].projPoints[railStart1];
        const pA2 = stations[i2].projPoints[railEnd1];
        const pB1 = stations[i1].projPoints[railStart2];
        const pB2 = stations[i2].projPoints[railEnd2];

        const avgZ = (pA1.sz + pA2.sz + pB1.sz + pB2.sz) * 0.25;
        const depthAlpha = Math.max(0.12, Math.min(0.65, (avgZ + 160) / 320));

        renderItems.push({
          zDepth: avgZ - 1.0,
          draw: () => {
            ctx.strokeStyle = `rgba(148, 175, 195, ${depthAlpha * 0.28})`;
            ctx.lineWidth = 0.35 * pA1.depthScale;

            ctx.beginPath();
            ctx.moveTo(pA1.sx, pA1.sy);
            ctx.lineTo(pA2.sx, pA2.sy);
            ctx.moveTo(pB1.sx, pB1.sy);
            ctx.lineTo(pB2.sx, pB2.sy);
            ctx.stroke();
          },
        });
      }

      // 4. Micro Structural Joints (35-45 tiny joints at transverse intersections)
      for (let i = 0; i < STATIONS; i += 3) {
        const st = stations[i];
        // Draw micro joint on rails 1, 2, 3
        for (let k = 1; k <= 3; k++) {
          const pt = st.projPoints[k];
          const depthAlpha = Math.max(0.15, Math.min(0.8, (pt.sz + 160) / 320));

          renderItems.push({
            zDepth: pt.sz + 1.0,
            draw: () => {
              ctx.fillStyle = `rgba(165, 185, 205, ${depthAlpha * 0.5})`;
              ctx.beginPath();
              ctx.arc(pt.sx, pt.sy, 0.65 * pt.depthScale, 0, Math.PI * 2);
              ctx.fill();
            },
          });
        }
      }

      // 5. Deterministic Anchor Nodes (12 structural anchors at key stations)
      for (let idx = 0; idx < ANCHOR_STATIONS.length; idx++) {
        const stIdx = ANCHOR_STATIONS[idx];
        const st = stations[stIdx];
        const pt = st.projPoints[2]; // Center rail spine
        const depthAlpha = Math.max(0.25, Math.min(0.95, (pt.sz + 160) / 320));
        const light = st.lightIntensity;

        renderItems.push({
          zDepth: pt.sz + 2.0,
          draw: () => {
            // Anchor receiving environmental light (no heavy glow)
            const r = Math.round(180 + light * 75);
            const g = Math.round(200 + light * 55);
            const b = Math.round(220 + light * 35);

            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${depthAlpha * (0.5 + light * 0.5)})`;
            ctx.beginPath();
            ctx.arc(pt.sx, pt.sy, 1.25 * pt.depthScale, 0, Math.PI * 2);
            ctx.fill();
          },
        });
      }

      // 6. Emissive Signal Nodes (Strictly 4 across the whole structure)
      for (let s = 0; s < EMISSIVE_SIGNALS.length; s++) {
        const sig = EMISSIVE_SIGNALS[s];
        const st = stations[sig.station];
        const pt = st.projPoints[sig.rail];
        const depthAlpha = Math.max(0.3, Math.min(1.0, (pt.sz + 160) / 320));

        renderItems.push({
          zDepth: pt.sz + 5.0,
          draw: () => {
            const baseSize = 1.6 * pt.depthScale;
            // Delicate cold halo
            const glow = ctx.createRadialGradient(
              pt.sx,
              pt.sy,
              0,
              pt.sx,
              pt.sy,
              baseSize * 4.2
            );
            glow.addColorStop(0, `rgba(224, 242, 254, ${depthAlpha * 0.65})`);
            glow.addColorStop(0.35, `rgba(147, 197, 253, ${depthAlpha * 0.22})`);
            glow.addColorStop(1, 'rgba(147, 197, 253, 0)');

            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(pt.sx, pt.sy, baseSize * 4.2, 0, Math.PI * 2);
            ctx.fill();

            // Core bright white dot
            ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.95})`;
            ctx.beginPath();
            ctx.arc(pt.sx, pt.sy, baseSize * 0.9, 0, Math.PI * 2);
            ctx.fill();

            // Fine reticle micro-crosshair
            ctx.strokeStyle = `rgba(224, 242, 254, ${depthAlpha * 0.45})`;
            ctx.lineWidth = 0.5;
            const arm = baseSize * 2.8;
            ctx.beginPath();
            ctx.moveTo(pt.sx - arm, pt.sy);
            ctx.lineTo(pt.sx + arm, pt.sy);
            ctx.moveTo(pt.sx, pt.sy - arm);
            ctx.lineTo(pt.sx, pt.sy + arm);
            ctx.stroke();
          },
        });
      }

      // Sort all items Back-to-Front
      renderItems.sort((a, b) => a.zDepth - b.zDepth);

      // Execute ordered draw calls
      for (let i = 0; i < renderItems.length; i++) {
        renderItems[i].draw();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
