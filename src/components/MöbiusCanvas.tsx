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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    // Highly damped mouse parallax (max 4-8px)
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let rawMouseX = -1000;
    let rawMouseY = -1000;
    let lastUserActivity = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      lastUserActivity = Date.now();
      const rect = canvas.getBoundingClientRect();
      rawMouseX = e.clientX - rect.left;
      rawMouseY = e.clientY - rect.top;
      const x = (rawMouseX / width) - 0.5;
      const y = (rawMouseY / height) - 0.5;
      targetMouseX = x * 0.08; // Damped parallax
      targetMouseY = y * 0.08;
    };

    const handleMouseLeave = () => {
      rawMouseX = -1000;
      rawMouseY = -1000;
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

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
    const starCount = 120;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.5 + 0.15,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Parametric Infinity / Lemniscate 3D Point Mesh
    interface Point3D {
      u: number;
      v: number;
      x0: number;
      y0: number;
      z0: number;
      brightness: number;
      proximityBoost: number;
      isAnchorNode: boolean;
      size: number;
    }

    let points: Point3D[] = [];
    let connections: [number, number, number][] = [];

    const initPoints = () => {
      points = [];
      connections = [];
      const uSteps = 96;
      const vSteps = 6;

      const scaleX = Math.min(width * 0.44, 480);
      const scaleY = scaleX * 0.46;
      const ribbonWidth = scaleX * 0.12;

      for (let i = 0; i < uSteps; i++) {
        const u = (i / uSteps) * Math.PI * 2;
        const denom = 1 + Math.sin(u) * Math.sin(u);
        const cx = (scaleX * Math.cos(u)) / denom;
        const cy = (scaleY * Math.sin(u) * Math.cos(u)) / denom;

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
          const v = (j / (vSteps - 1) - 0.5) * 2;
          const twist = u * 1.0;
          const zDepth = Math.sin(u * 2) * (scaleX * 0.22) + Math.sin(twist) * v * (ribbonWidth * 0.8);
          
          const jitterX = (Math.random() - 0.5) * 5;
          const jitterY = (Math.random() - 0.5) * 5;
          const jitterZ = (Math.random() - 0.5) * 5;

          const px = cx + nx * v * ribbonWidth * Math.cos(twist) + jitterX;
          const py = cy + ny * v * ribbonWidth * Math.cos(twist) + Math.sin(twist) * (ribbonWidth * 0.4) + jitterY;
          const pz = zDepth + jitterZ;

          const isAnchor = (i % 8 === 0 && (j === 0 || j === vSteps - 1 || j === Math.floor(vSteps / 2))) || Math.random() < 0.07;

          points.push({
            u,
            v,
            x0: px,
            y0: py,
            z0: pz,
            brightness: Math.random() * 0.4 + 0.6,
            proximityBoost: 0,
            isAnchorNode: isAnchor,
            size: isAnchor ? (Math.random() > 0.7 ? 3.0 : 2.0) : (Math.random() * 1.0 + 0.7),
          });
        }
      }

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
      const isIdle = Date.now() - lastUserActivity > 1800;
      const speed = prefersReducedMotion ? 0.0005 : (isIdle ? 0.002 : 0.005);
      time += speed;

      // Smooth damped parallax
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

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

      // Render micro-star background
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!prefersReducedMotion) {
          s.twinklePhase += s.twinkleSpeed;
        }
        const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));
        ctx.fillStyle = `rgba(210, 230, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rotation angles
      const rotY = Math.sin(time * 0.5) * 0.10 + mouseX * 0.4;
      const rotX = Math.cos(time * 0.4) * 0.06 + mouseY * 0.3;
      const rotZ = Math.sin(time * 0.2) * 0.02;

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
        const wave = Math.sin(p.u * 3 + time * 1.5) * 2.5;
        let px = p.x0;
        let py = p.y0 + wave;
        let pz = p.z0;

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

        // Proximity detection to mouse
        if (rawMouseX > 0 && rawMouseY > 0) {
          const distToMouse = Math.hypot(sx - rawMouseX, sy - rawMouseY);
          if (distToMouse < 130) {
            const boost = (1 - distToMouse / 130) * 0.6;
            p.proximityBoost = Math.max(p.proximityBoost, boost);
          }
        }
        p.proximityBoost *= 0.94; // Decay slowly

        const baseAlpha = Math.max(0.08, Math.min(0.92, (z3 + 300) / 600));
        const alpha = Math.min(1.0, baseAlpha + p.proximityBoost);

        projected.push({
          x: sx,
          y: sy,
          z: z3,
          scale: depth,
          alpha,
          isAnchor: p.isAnchorNode,
          size: (p.size + p.proximityBoost * 1.2) * depth,
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
        const hasBoost = (p1.p.proximityBoost + p2.p.proximityBoost) > 0.15;
        
        if (hasBoost) {
          ctx.strokeStyle = `rgba(148, 187, 201, ${avgAlpha * 0.45})`;
          ctx.lineWidth = 0.8;
        } else {
          ctx.strokeStyle = `rgba(147, 197, 253, ${avgAlpha * 0.18})`;
          ctx.lineWidth = 0.5;
        }
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
          const glowGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.size * 3.5);
          glowGrad.addColorStop(0, `rgba(224, 242, 254, ${a * 0.85})`);
          glowGrad.addColorStop(0.3, `rgba(56, 189, 248, ${a * 0.35})`);
          glowGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.95})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * 0.85, 0, Math.PI * 2);
          ctx.fill();

          if (pt.size > 2.2) {
            ctx.strokeStyle = `rgba(240, 249, 255, ${a * 0.4})`;
            ctx.lineWidth = 0.5;
            const rayLen = pt.size * 3;
            ctx.beginPath();
            ctx.moveTo(pt.x - rayLen, pt.y);
            ctx.lineTo(pt.x + rayLen, pt.y);
            ctx.moveTo(pt.x, pt.y - rayLen);
            ctx.lineTo(pt.x, pt.y + rayLen);
            ctx.stroke();
          }
        } else {
          ctx.fillStyle = `rgba(186, 230, 253, ${a * 0.5})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * 0.65, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

