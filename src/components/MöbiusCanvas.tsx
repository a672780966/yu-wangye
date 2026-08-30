import React, { useEffect, useRef } from 'react';

interface MöbiusCanvasProps {
  className?: string;
}

export const MöbiusCanvas: React.FC<MöbiusCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initPoints();
    };

    window.addEventListener('resize', handleResize);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetMouseX = x * 0.3;
      targetMouseY = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Background star dust
    interface Star {
      x: number;
      y: number;
      size: number;
      alpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }
    const stars: Star[] = [];
    const starCount = 140;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Parametric Infinity / Lemniscate 3D Point Mesh
    interface Point3D {
      u: number; // parametric position along ribbon (0 to 2*PI)
      v: number; // position across ribbon (-width to +width)
      x0: number;
      y0: number;
      z0: number;
      brightness: number;
      isAnchorNode: boolean;
      size: number;
    }

    let points: Point3D[] = [];
    let connections: [number, number, number][] = []; // [p1_idx, p2_idx, max_dist]

    const initPoints = () => {
      points = [];
      connections = [];
      const uSteps = 96; // points along the loop
      const vSteps = 6;  // points across the tube/strip width

      const scaleX = Math.min(width * 0.44, 480);
      const scaleY = scaleX * 0.46;
      const ribbonWidth = scaleX * 0.12;

      for (let i = 0; i < uSteps; i++) {
        const u = (i / uSteps) * Math.PI * 2;
        // Bernoulli Lemniscate parametric curve
        const denom = 1 + Math.sin(u) * Math.sin(u);
        const cx = (scaleX * Math.cos(u)) / denom;
        const cy = (scaleY * Math.sin(u) * Math.cos(u)) / denom;

        // Tangent & Normal for ribbon width
        const du = 0.001;
        const nextDenom = 1 + Math.sin(u + du) * Math.sin(u + du);
        const ncx = (scaleX * Math.cos(u + du)) / nextDenom;
        const ncy = (scaleY * Math.sin(u + du) * Math.cos(u + du)) / nextDenom;

        const tx = ncx - cx;
        const ty = ncy - cy;
        const tLen = Math.hypot(tx, ty) || 1;
        const nx = -ty / tLen;
        const ny = tx / tLen;

        for (let j = 0; j < vSteps; j++) {
          const v = (j / (vSteps - 1) - 0.5) * 2; // -1 to 1
          // Add twist and 3D depth
          const twist = u * 1.0;
          const zDepth = Math.sin(u * 2) * (scaleX * 0.22) + Math.sin(twist) * v * (ribbonWidth * 0.8);
          
          // Random offset for organic constellation feeling
          const jitterX = (Math.random() - 0.5) * 6;
          const jitterY = (Math.random() - 0.5) * 6;
          const jitterZ = (Math.random() - 0.5) * 6;

          const px = cx + nx * v * ribbonWidth * Math.cos(twist) + jitterX;
          const py = cy + ny * v * ribbonWidth * Math.cos(twist) + Math.sin(twist) * (ribbonWidth * 0.4) + jitterY;
          const pz = zDepth + jitterZ;

          const isAnchor = (i % 8 === 0 && (j === 0 || j === vSteps - 1 || j === Math.floor(vSteps / 2))) || Math.random() < 0.08;

          points.push({
            u,
            v,
            x0: px,
            y0: py,
            z0: pz,
            brightness: Math.random() * 0.5 + 0.5,
            isAnchorNode: isAnchor,
            size: isAnchor ? (Math.random() > 0.7 ? 3.2 : 2.2) : (Math.random() * 1.2 + 0.8),
          });
        }
      }

      // Build structural connections between nearby points
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x0 - points[j].x0;
          const dy = points[i].y0 - points[j].y0;
          const dz = points[i].z0 - points[j].z0;
          const dist = Math.hypot(dx, dy, dz);
          if (dist < scaleX * 0.075) {
            connections.push([i, j, dist]);
          }
        }
      }
    };

    initPoints();

    let time = 0;

    const render = () => {
      time += 0.006;
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

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
      grad.addColorStop(1, '#030407');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render micro-star background
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.twinklePhase += s.twinkleSpeed;
        const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));
        ctx.fillStyle = `rgba(210, 230, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rotation angles with subtle breathing
      const rotY = Math.sin(time * 0.5) * 0.12 + mouseX * 0.6;
      const rotX = Math.cos(time * 0.4) * 0.08 + mouseY * 0.4;
      const rotZ = Math.sin(time * 0.2) * 0.03;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      const centerX = width / 2;
      const centerY = height / 2;
      const cameraZ = 800;

      // Project points to 2D screen
      const projected: { x: number; y: number; z: number; scale: number; alpha: number; isAnchor: boolean; size: number; p: Point3D }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        // Subtle wave perturbation along ribbon
        const wave = Math.sin(p.u * 3 + time * 1.5) * 3;
        let px = p.x0;
        let py = p.y0 + wave;
        let pz = p.z0;

        // Apply 3D Rotations (Y -> X -> Z)
        let x1 = px * cosY + pz * sinY;
        let z1 = -px * sinY + pz * cosY;

        let y2 = py * cosX - z1 * sinX;
        let z2 = py * sinX + z1 * cosX;

        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = x1 * sinZ + y2 * cosZ;
        let z3 = z2;

        const depth = cameraZ / (cameraZ + z3);
        const sx = centerX + x3 * depth;
        const sy = centerY + y3 * depth;
        const alpha = Math.max(0.08, Math.min(0.95, (z3 + 300) / 600));

        projected.push({
          x: sx,
          y: sy,
          z: z3,
          scale: depth,
          alpha,
          isAnchor: p.isAnchorNode,
          size: p.size * depth,
          p,
        });
      }

      // Draw structural wireframe connection lines
      ctx.lineWidth = 0.5;
      for (let k = 0; k < connections.length; k++) {
        const [i, j] = connections[k];
        const p1 = projected[i];
        const p2 = projected[j];
        if (!p1 || !p2) continue;

        const avgAlpha = (p1.alpha + p2.alpha) * 0.5;
        // Fine ice-blue / cold silver structural lines
        ctx.strokeStyle = `rgba(147, 197, 253, ${avgAlpha * 0.22})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw nodes and bright star anchors
      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        const a = pt.alpha;

        if (pt.isAnchor) {
          // Glow halo
          const glowGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.size * 4);
          glowGrad.addColorStop(0, `rgba(224, 242, 254, ${a * 0.9})`);
          glowGrad.addColorStop(0.3, `rgba(56, 189, 248, ${a * 0.4})`);
          glowGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * 4, 0, Math.PI * 2);
          ctx.fill();

          // Core bright star dot
          ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.95})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * 0.9, 0, Math.PI * 2);
          ctx.fill();

          // Subtle 4-point star ray for selected anchor nodes
          if (pt.size > 2.5) {
            ctx.strokeStyle = `rgba(240, 249, 255, ${a * 0.45})`;
            ctx.lineWidth = 0.6;
            const rayLen = pt.size * 3.5;
            ctx.beginPath();
            ctx.moveTo(pt.x - rayLen, pt.y);
            ctx.lineTo(pt.x + rayLen, pt.y);
            ctx.moveTo(pt.x, pt.y - rayLen);
            ctx.lineTo(pt.x, pt.y + rayLen);
            ctx.stroke();
          }
        } else {
          // Standard node dot
          ctx.fillStyle = `rgba(186, 230, 253, ${a * 0.55})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
