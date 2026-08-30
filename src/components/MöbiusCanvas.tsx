import React, { useEffect, useRef } from 'react';

interface MöbiusCanvasProps {
  className?: string;
}

// 3D Vector Math Helpers
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

// Deterministic 2D Pseudo-Hash for micro structural refinement (no Math.random)
const pseudoNoise = (i: number, j: number): number => {
  const n = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

// Fixed Environmental Lighting Direction (World Coordinates)
const KEY_LIGHT_DIR = normalize({ x: -0.65, y: -0.65, z: 0.55 });
const FILL_LIGHT_DIR = normalize({ x: 0.65, y: 0.65, z: -0.55 });
const CAM_DIR: Vec3 = { x: 0, y: 0, z: 1 };

// Static dim background reference points (14 points)
const BACKGROUND_POINTS = [
  { xRatio: 0.12, yRatio: 0.18, alpha: 0.12 },
  { xRatio: 0.88, yRatio: 0.22, alpha: 0.14 },
  { xRatio: 0.18, yRatio: 0.82, alpha: 0.10 },
  { xRatio: 0.82, yRatio: 0.78, alpha: 0.13 },
  { xRatio: 0.28, yRatio: 0.35, alpha: 0.11 },
  { xRatio: 0.72, yRatio: 0.32, alpha: 0.13 },
  { xRatio: 0.15, yRatio: 0.48, alpha: 0.12 },
  { xRatio: 0.85, yRatio: 0.55, alpha: 0.11 },
  { xRatio: 0.38, yRatio: 0.15, alpha: 0.14 },
  { xRatio: 0.62, yRatio: 0.85, alpha: 0.10 },
  { xRatio: 0.48, yRatio: 0.25, alpha: 0.12 },
  { xRatio: 0.52, yRatio: 0.75, alpha: 0.13 },
  { xRatio: 0.22, yRatio: 0.65, alpha: 0.11 },
  { xRatio: 0.78, yRatio: 0.42, alpha: 0.12 },
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

    // Continuous Triangulated Ribbon Mesh Parameters
    const STATIONS = 96; // 96 stations along the infinity curve
    const LANES = 9; // 9 continuous lanes across ribbon width (0..8)
    const LANE_OFFSETS = [-1.0, -0.75, -0.5, -0.25, 0.0, 0.25, 0.5, 0.75, 1.0];

    // 14 Deterministic Communication Anchors
    const ANCHOR_DEFINITIONS = [
      { station: 0, lane: 4, id: 'ANC_00' },
      { station: 7, lane: 2, id: 'ANC_01' },
      { station: 14, lane: 6, id: 'ANC_02' },
      { station: 21, lane: 4, id: 'ANC_03' },
      { station: 28, lane: 1, id: 'ANC_04' },
      { station: 35, lane: 7, id: 'ANC_05' },
      { station: 42, lane: 4, id: 'ANC_06' },
      { station: 48, lane: 4, id: 'ANC_07' }, // Center crossing region
      { station: 55, lane: 6, id: 'ANC_08' },
      { station: 62, lane: 2, id: 'ANC_09' },
      { station: 69, lane: 4, id: 'ANC_10' },
      { station: 76, lane: 7, id: 'ANC_11' },
      { station: 83, lane: 1, id: 'ANC_12' },
      { station: 90, lane: 4, id: 'ANC_13' },
    ];

    // Predefined 5 Closed Communication Routes
    // Each route defines a sequence of lane indices along the 96 stations
    const ROUTE_LANES: number[][] = [
      // Route 0: Main central lane (Lane 4)
      Array.from({ length: STATIONS }, () => 4),
      // Route 1: Outer perimeter loop (Lane 8, crosses to Lane 0 across twist)
      Array.from({ length: STATIONS }, (_, i) => (i < STATIONS / 2 ? 8 : 7)),
      // Route 2: Inner ribbon loop (Lane 2 / 6)
      Array.from({ length: STATIONS }, (_, i) => (i % 2 === 0 ? 2 : 3)),
      // Route 3: Diagonal weaving ribbon route
      Array.from({ length: STATIONS }, (_, i) => {
        const wave = Math.sin((i / STATIONS) * Math.PI * 4);
        return Math.min(7, Math.max(1, Math.round(4 + wave * 2.8)));
      }),
      // Route 4: Secondary route on lane 5
      Array.from({ length: STATIONS }, () => 5),
    ];

    // Signal Configurations: staggered speeds, lengths & phase offsets
    const SIGNALS = [
      { routeIdx: 0, duration: 11500, lengthFraction: 0.045, phaseOffset: 0.12, intensity: 1.0 },
      { routeIdx: 1, duration: 14800, lengthFraction: 0.038, phaseOffset: 0.48, intensity: 0.9 },
      { routeIdx: 2, duration: 17600, lengthFraction: 0.032, phaseOffset: 0.76, intensity: 0.8 },
      { routeIdx: 3, duration: 21200, lengthFraction: 0.040, phaseOffset: 0.28, intensity: 0.75 },
      { routeIdx: 4, duration: 26000, lengthFraction: 0.030, phaseOffset: 0.62, intensity: 0.55 },
    ];

    // Main Render Loop
    const render = (now: number) => {
      if (!isVisible || width <= 0 || height <= 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Deep, serene background gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.72
      );
      bgGrad.addColorStop(0, '#090D15');
      bgGrad.addColorStop(0.55, '#06080E');
      bgGrad.addColorStop(1, '#0A0B0B');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Static, faint spatial reference points
      ctx.fillStyle = 'rgba(210, 230, 250, 0.16)';
      for (let i = 0; i < BACKGROUND_POINTS.length; i++) {
        const bp = BACKGROUND_POINTS[i];
        ctx.globalAlpha = bp.alpha;
        ctx.beginPath();
        ctx.arc(bp.xRatio * width, bp.yRatio * height, 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Scale dimensions
      const scaleX = Math.min(width * 0.43, 460);
      const scaleY = scaleX * 0.44;
      const ribbonWidth = scaleX * 0.118;
      const zCrossingOffset = scaleX * 0.22; // Distinct Z front/back crossing

      // Structure Stays: Extremely subtle precession (±0.8° over 70s) to keep it physically alive without obvious rotation
      const t = prefersReducedMotion ? 0 : now;
      const rotY = prefersReducedMotion ? 0.02 : Math.sin((t * 2 * Math.PI) / 64000) * 0.015; // ±0.8°
      const rotX = prefersReducedMotion ? 0.01 : Math.cos((t * 2 * Math.PI) / 78000) * 0.012; // ±0.68°
      const rotZ = 0;

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

      // Grazing Light Sweep: very slow, broad specular light field (34s loop)
      const sweepPeriod = 34000;
      const sweepPhase = prefersReducedMotion ? 0.35 : ((t % sweepPeriod) / sweepPeriod);

      // Precalculate Station Geometry & Mesh Vertices
      interface VertexData {
        worldPos: Vec3;
        proj: { sx: number; sy: number; sz: number; depthScale: number };
        normal: Vec3;
        rotNormal: Vec3;
        lightIntensity: number;
        specularSpark: boolean;
      }

      interface StationData {
        center: Vec3;
        tangent: Vec3;
        ribbonCross: Vec3;
        surfaceNormal: Vec3;
        vertices: VertexData[]; // LANES vertices
      }

      const stations: StationData[] = [];

      for (let i = 0; i < STATIONS; i++) {
        const u = (i / STATIONS) * Math.PI * 2;
        const denom = 1 + Math.sin(u) * Math.sin(u);
        const cx = (scaleX * Math.cos(u)) / denom;
        const cy = (scaleY * Math.sin(u) * Math.cos(u)) / denom;
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

        // True 180° Half-Twist: twist = u / 2
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

        const rotNormal = transformVector(surfaceNormal);

        // Grazing sweep proximity factor for this station (wide Gaussian envelope ~16% width)
        const stationPhase = i / STATIONS;
        let phaseDist = Math.abs(stationPhase - sweepPhase);
        if (phaseDist > 0.5) phaseDist = 1.0 - phaseDist;
        const sweepFactor = Math.exp(-Math.pow(phaseDist / 0.09, 2));

        // Vertices across the ribbon width
        const vertices: VertexData[] = [];
        for (let l = 0; l < LANES; l++) {
          const v = LANE_OFFSETS[l] * ribbonWidth;
          // Micro deterministic hash offset (max ±0.6px) for organic elegance
          const nVal = (pseudoNoise(i, l) - 0.5) * 1.2;

          const p: Vec3 = {
            x: cx + ribbonCross.x * v + surfaceNormal.x * nVal,
            y: cy + ribbonCross.y * v + surfaceNormal.y * nVal,
            z: cz + ribbonCross.z * v + surfaceNormal.z * nVal,
          };

          const proj = transformPoint(p);

          // Environmental Lighting Calculation: Key (80%) + Fill (20%) + Ambient
          const dotKey = Math.max(0, dot(rotNormal, KEY_LIGHT_DIR));
          const dotFill = Math.max(0, dot(rotNormal, FILL_LIGHT_DIR));
          const baseDiffuse = dotKey * 0.78 + dotFill * 0.22;

          // Specular reflection with camera
          const refKey = normalize({
            x: 2 * dotKey * rotNormal.x - KEY_LIGHT_DIR.x,
            y: 2 * dotKey * rotNormal.y - KEY_LIGHT_DIR.y,
            z: 2 * dotKey * rotNormal.z - KEY_LIGHT_DIR.z,
          });
          const spec = Math.pow(Math.max(0, dot(refKey, CAM_DIR)), 14);

          // Combined Per-Vertex Light Intensity with Grazing Sweep boost
          const sweepBoost = sweepFactor * (0.35 + spec * 0.65);
          const lightIntensity = Math.min(1.0, 0.20 + baseDiffuse * 0.55 + sweepBoost * 0.45);

          // Occasional Specular Spark (rare optical highlight event when peak specular + sweep meet)
          const specularSpark = sweepFactor > 0.82 && spec > 0.65 && (i % 8 === 0) && (l === 4 || l === 0);

          vertices.push({
            worldPos: p,
            proj,
            normal: surfaceNormal,
            rotNormal,
            lightIntensity,
            specularSpark,
          });
        }

        stations.push({
          center: { x: cx, y: cy, z: cz },
          tangent,
          ribbonCross,
          surfaceNormal,
          vertices,
        });
      }

      // Precompute Cumulative 3D Arc-Length for Closed Signal Routes
      interface RouteArcData {
        cumulativeLengths: number[];
        totalLength: number;
      }

      const routeArcLengths: RouteArcData[] = ROUTE_LANES.map((laneSeq) => {
        const lengths = [0];
        let total = 0;
        for (let i = 0; i < STATIONS; i++) {
          const nextI = (i + 1) % STATIONS;
          const curLane = laneSeq[i];
          const nextLane = nextI === 0 ? LANES - 1 - laneSeq[0] : laneSeq[nextI];
          const p1 = stations[i].vertices[curLane].worldPos;
          const p2 = stations[nextI].vertices[nextLane].worldPos;
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
          total += dist;
          lengths.push(total);
        }
        return { cumulativeLengths: lengths, totalLength: total };
      });

      // Render Items with Depth Sorting (Back to Front)
      interface RenderItem {
        zDepth: number;
        draw: () => void;
      }
      const renderItems: RenderItem[] = [];

      // 1. Continuous Triangulated Ribbon Mesh Edges
      for (let i = 0; i < STATIONS; i++) {
        const nextI = (i + 1) % STATIONS;

        for (let l = 0; l < LANES; l++) {
          const targetLane = nextI === 0 ? LANES - 1 - l : l;
          const v1 = stations[i].vertices[l];
          const v2 = stations[nextI].vertices[targetLane];

          const p1 = v1.proj;
          const p2 = v2.proj;
          const avgZ = (p1.sz + p2.sz) * 0.5;
          const depthAlpha = Math.max(0.18, Math.min(0.92, (avgZ + 160) / 320));
          const isOuter = l === 0 || l === LANES - 1;

          // (A) Longitudinal Mesh Edge
          renderItems.push({
            zDepth: avgZ,
            draw: () => {
              // Subtle occlusion understroke ONLY near central intersection (front pass)
              if (avgZ > 25 && Math.abs(p1.sx - width / 2) < 45 && Math.abs(p1.sy - height / 2) < 35) {
                ctx.strokeStyle = 'rgba(10, 11, 11, 0.95)';
                ctx.lineWidth = (isOuter ? 0.65 : 0.4) * p1.depthScale + 1.2;
                ctx.beginPath();
                ctx.moveTo(p1.sx, p1.sy);
                ctx.lineTo(p2.sx, p2.sy);
                ctx.stroke();
              }

              // Base Edge with gradient light interpolation
              const grad = ctx.createLinearGradient(p1.sx, p1.sy, p2.sx, p2.sy);
              const light1 = v1.lightIntensity;
              const light2 = v2.lightIntensity;

              const r1 = Math.round(135 + light1 * 95);
              const g1 = Math.round(155 + light1 * 85);
              const b1 = Math.round(180 + light1 * 70);
              const a1 = depthAlpha * (isOuter ? 0.45 + light1 * 0.5 : 0.22 + light1 * 0.42);

              const r2 = Math.round(135 + light2 * 95);
              const g2 = Math.round(155 + light2 * 85);
              const b2 = Math.round(180 + light2 * 70);
              const a2 = depthAlpha * (isOuter ? 0.45 + light2 * 0.5 : 0.22 + light2 * 0.42);

              grad.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, ${a1})`);
              grad.addColorStop(1, `rgba(${r2}, ${g2}, ${b2}, ${a2})`);

              ctx.strokeStyle = grad;
              ctx.lineWidth = (isOuter ? 0.58 : 0.35) * p1.depthScale;
              ctx.beginPath();
              ctx.moveTo(p1.sx, p1.sy);
              ctx.lineTo(p2.sx, p2.sy);
              ctx.stroke();
            },
          });

          // (B) Transverse Mesh Edge (connect lane l to lane l+1)
          if (l < LANES - 1) {
            const vNextLane = stations[i].vertices[l + 1];
            const pNext = vNextLane.proj;
            const avgTransZ = (p1.sz + pNext.sz) * 0.5;

            renderItems.push({
              zDepth: avgTransZ - 0.2,
              draw: () => {
                const light = (v1.lightIntensity + vNextLane.lightIntensity) * 0.5;
                const r = Math.round(120 + light * 80);
                const g = Math.round(145 + light * 75);
                const b = Math.round(170 + light * 65);
                const alpha = depthAlpha * (0.16 + light * 0.32);

                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.lineWidth = 0.28 * p1.depthScale;
                ctx.beginPath();
                ctx.moveTo(p1.sx, p1.sy);
                ctx.lineTo(pNext.sx, pNext.sy);
                ctx.stroke();
              },
            });

            // (C) Triangulated Diagonal Edge with controlled alternating rhythm
            // Skip every 6th diagonal for controlled geometric rhythm
            const shouldDrawDiagonal = (i + l) % 6 !== 0;
            if (shouldDrawDiagonal) {
              const isSlash = (i + l) % 2 === 0;
              const targetDiagLane = nextI === 0 ? LANES - 1 - (isSlash ? l + 1 : l) : (isSlash ? l + 1 : l);
              const pDiagStart = isSlash ? p1 : stations[i].vertices[l + 1].proj;
              const pDiagEnd = stations[nextI].vertices[targetDiagLane].proj;

              const avgDiagZ = (pDiagStart.sz + pDiagEnd.sz) * 0.5;

              renderItems.push({
                zDepth: avgDiagZ - 0.4,
                draw: () => {
                  const light = (v1.lightIntensity + v2.lightIntensity) * 0.5;
                  const r = Math.round(110 + light * 75);
                  const g = Math.round(135 + light * 70);
                  const b = Math.round(160 + light * 60);
                  const alpha = depthAlpha * (0.12 + light * 0.25);

                  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                  ctx.lineWidth = 0.22 * p1.depthScale;
                  ctx.beginPath();
                  ctx.moveTo(pDiagStart.sx, pDiagStart.sy);
                  ctx.lineTo(pDiagEnd.sx, pDiagEnd.sy);
                  ctx.stroke();
                },
              });
            }
          }
        }
      }

      // 2. Micro Structural Joints (45 tiny joints at mesh intersections)
      for (let i = 0; i < STATIONS; i += 2) {
        for (let l = 1; l < LANES - 1; l += 2) {
          const v = stations[i].vertices[l];
          const pt = v.proj;
          const depthAlpha = Math.max(0.15, Math.min(0.85, (pt.sz + 160) / 320));

          renderItems.push({
            zDepth: pt.sz + 0.8,
            draw: () => {
              ctx.fillStyle = `rgba(160, 180, 205, ${depthAlpha * (0.28 + v.lightIntensity * 0.35)})`;
              ctx.beginPath();
              ctx.arc(pt.sx, pt.sy, 0.55 * pt.depthScale, 0, Math.PI * 2);
              ctx.fill();
            },
          });
        }
      }

      // 3. Autonomous Signal Flow along Closed Topological Routes (Arc-Length Propagation)
      // Check which signal is near which anchor to trigger anchor flare
      const anchorFlares: number[] = new Array(ANCHOR_DEFINITIONS.length).fill(0);

      SIGNALS.forEach((sig) => {
        const routeData = routeArcLengths[sig.routeIdx];
        const laneSeq = ROUTE_LANES[sig.routeIdx];
        const loopDuration = sig.duration;

        // Current distance along route based on absolute time + phase offset
        const rawProgress = (t / loopDuration + sig.phaseOffset) % 1.0;
        const headDist = rawProgress * routeData.totalLength;
        const segLength = sig.lengthFraction * routeData.totalLength;

        // Find segments covered by [headDist - segLength, headDist]
        const segmentsToDraw: {
          p1: { sx: number; sy: number; sz: number; depthScale: number };
          p2: { sx: number; sy: number; sz: number; depthScale: number };
          avgZ: number;
          relativeIntensity: number; // 0..1 across the head-to-tail gradient
        }[] = [];

        for (let i = 0; i < STATIONS; i++) {
          const nextI = (i + 1) % STATIONS;
          const sStart = routeData.cumulativeLengths[i];
          const sEnd = routeData.cumulativeLengths[i + 1];

          // Calculate distance of this station from signal head
          let distFromHead = (headDist - sStart + routeData.totalLength) % routeData.totalLength;
          if (distFromHead <= segLength) {
            // Signal segment is present on this edge
            const ratio = 1.0 - distFromHead / segLength; // 1 at head, 0 at tail
            // Profile: 0 -> 0.4 -> 1.0 -> 0.65 -> 0
            const curve = Math.sin(ratio * Math.PI);
            const intensity = Math.pow(curve, 1.4) * sig.intensity;

            const curLane = laneSeq[i];
            const nextLane = nextI === 0 ? LANES - 1 - laneSeq[0] : laneSeq[nextI];
            const pt1 = stations[i].vertices[curLane].proj;
            const pt2 = stations[nextI].vertices[nextLane].proj;
            const avgZ = (pt1.sz + pt2.sz) * 0.5;

            segmentsToDraw.push({
              p1: pt1,
              p2: pt2,
              avgZ,
              relativeIntensity: intensity,
            });

            // Check proximity to any anchor on this station/lane
            ANCHOR_DEFINITIONS.forEach((anc, aIdx) => {
              if (Math.abs(anc.station - i) <= 1 && Math.abs(anc.lane - curLane) <= 1) {
                anchorFlares[aIdx] = Math.max(anchorFlares[aIdx], intensity);
              }
            });
          }
        }

        // Add signal segments to render queue with depth-attenuated luminosity
        segmentsToDraw.forEach((seg) => {
          // Depth factor: 100% on front, drops smoothly to 40% when in back layer
          const depthFactor = Math.max(0.42, Math.min(1.0, (seg.avgZ + 120) / 240));

          renderItems.push({
            zDepth: seg.avgZ + 3.0,
            draw: () => {
              const lum = seg.relativeIntensity * depthFactor;
              if (lum < 0.05) return;

              // Soft Luminous Glow around signal
              ctx.strokeStyle = `rgba(186, 230, 253, ${lum * 0.28})`;
              ctx.lineWidth = 2.4 * seg.p1.depthScale;
              ctx.beginPath();
              ctx.moveTo(seg.p1.sx, seg.p1.sy);
              ctx.lineTo(seg.p2.sx, seg.p2.sy);
              ctx.stroke();

              // Bright Core Segment (Cold White Peak to Pale Ice Blue)
              const r = Math.round(220 + lum * 35);
              const g = Math.round(235 + lum * 20);
              const b = 255;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(1.0, lum * 0.95)})`;
              ctx.lineWidth = 0.95 * seg.p1.depthScale;
              ctx.beginPath();
              ctx.moveTo(seg.p1.sx, seg.p1.sy);
              ctx.lineTo(seg.p2.sx, seg.p2.sy);
              ctx.stroke();
            },
          });
        });
      });

      // 4. Communication Anchors (14 Deterministic Junctions with Reactive Flares)
      ANCHOR_DEFINITIONS.forEach((anc, idx) => {
        const v = stations[anc.station].vertices[anc.lane];
        const pt = v.proj;
        const flare = anchorFlares[idx]; // 0..1 pulse boost when signal passes
        const depthAlpha = Math.max(0.22, Math.min(0.95, (pt.sz + 160) / 320));
        const light = v.lightIntensity;

        renderItems.push({
          zDepth: pt.sz + 4.0,
          draw: () => {
            const baseRadius = 1.1 * pt.depthScale;

            // Transient Flare Halo when signal traverses this anchor
            if (flare > 0.08) {
              const flareRadius = baseRadius * (2.8 + flare * 2.2);
              const glow = ctx.createRadialGradient(
                pt.sx,
                pt.sy,
                0,
                pt.sx,
                pt.sy,
                flareRadius
              );
              glow.addColorStop(0, `rgba(224, 242, 254, ${depthAlpha * flare * 0.7})`);
              glow.addColorStop(0.4, `rgba(147, 197, 253, ${depthAlpha * flare * 0.25})`);
              glow.addColorStop(1, 'rgba(147, 197, 253, 0)');

              ctx.fillStyle = glow;
              ctx.beginPath();
              ctx.arc(pt.sx, pt.sy, flareRadius, 0, Math.PI * 2);
              ctx.fill();

              // Reticle Micro-crosshair
              ctx.strokeStyle = `rgba(224, 242, 254, ${depthAlpha * flare * 0.6})`;
              ctx.lineWidth = 0.5;
              const arm = baseRadius * (2.0 + flare * 1.5);
              ctx.beginPath();
              ctx.moveTo(pt.sx - arm, pt.sy);
              ctx.lineTo(pt.sx + arm, pt.sy);
              ctx.moveTo(pt.sx, pt.sy - arm);
              ctx.lineTo(pt.sx, pt.sy + arm);
              ctx.stroke();
            }

            // Anchor Body
            const r = Math.round(180 + (light + flare) * 75);
            const g = Math.round(200 + (light + flare) * 55);
            const b = Math.round(225 + (light + flare) * 30);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${depthAlpha * (0.55 + light * 0.45 + flare * 0.4)})`;
            ctx.beginPath();
            ctx.arc(pt.sx, pt.sy, baseRadius * (1.0 + flare * 0.3), 0, Math.PI * 2);
            ctx.fill();
          },
        });
      });

      // 5. Rare Optical Specular Sparks (1-2 glints only when peak specular angle meets grazing sweep)
      for (let i = 0; i < STATIONS; i++) {
        for (let l = 0; l < LANES; l++) {
          const v = stations[i].vertices[l];
          if (v.specularSpark) {
            const pt = v.proj;
            const depthAlpha = Math.max(0.3, Math.min(1.0, (pt.sz + 160) / 320));

            renderItems.push({
              zDepth: pt.sz + 6.0,
              draw: () => {
                // Faint diamond cross-spark
                ctx.strokeStyle = `rgba(240, 249, 255, ${depthAlpha * 0.85})`;
                ctx.lineWidth = 0.6;
                const sparkArm = 3.5 * pt.depthScale;
                ctx.beginPath();
                ctx.moveTo(pt.sx - sparkArm, pt.sy);
                ctx.lineTo(pt.sx + sparkArm, pt.sy);
                ctx.moveTo(pt.sx, pt.sy - sparkArm);
                ctx.lineTo(pt.sx, pt.sy + sparkArm);
                ctx.stroke();

                // Spark bright core
                ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.95})`;
                ctx.beginPath();
                ctx.arc(pt.sx, pt.sy, 0.8 * pt.depthScale, 0, Math.PI * 2);
                ctx.fill();
              },
            });
          }
        }
      }

      // Sort all render items strictly Back-to-Front
      renderItems.sort((a, b) => a.zDepth - b.zDepth);

      // Execute Depth-Sorted Draw Calls
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
