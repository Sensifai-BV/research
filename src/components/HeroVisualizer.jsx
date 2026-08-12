import React, { useEffect, useRef, useState } from 'react';

export function HeroVisualizer() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Iconic World Math Graph Nodes organically distributed across canvas
    const GRAPH_NODES = [
      { id: 0, title: 'Euler Identity', formula: 'eⁱᵖⁱ + 1 = 0', color: '#6366f1', x: 0.5, y: 0.38 },
      { id: 1, title: 'Relativity', formula: 'E = mc²', color: '#ef4444', x: 0.18, y: 0.25 },
      { id: 2, title: 'Quantum', formula: 'iℏ ∂Ψ/∂t = ĤΨ', color: '#10b981', x: 0.76, y: 0.22 },
      { id: 3, title: 'Fourier', formula: 'F(ω) = ∫ f(t) e⁻ⁱʷᵗ dt', color: '#0284c7', x: 0.32, y: 0.62 },
      { id: 4, title: 'Bayes', formula: 'P(A|B) = P(B|A)P(A)/P(B)', color: '#84cc16', x: 0.64, y: 0.72 },
      { id: 5, title: 'Maxwell', formula: '∇ × E = -∂B/∂t', color: '#ec4899', x: 0.12, y: 0.65 },
      { id: 6, title: 'Entropy', formula: 'H(X) = -Σ P(x) log P(x)', color: '#f59e0b', x: 0.82, y: 0.58 },
      { id: 7, title: 'Deep Learning', formula: 'y = σ(Wx + b)', color: '#a855f7', x: 0.48, y: 0.85 },
      { id: 8, title: 'Calculus', formula: 'df/dx = lim Δx→0', color: '#38bdf8', x: 0.35, y: 0.14 },
      { id: 9, title: 'Eigenvalues', formula: 'det(A - λI) = 0', color: '#14b8a6', x: 0.65, y: 0.12 }
    ];

    const LINKS = [
      [0, 1], [0, 2], [0, 8], [0, 9],
      [1, 5], [1, 2],
      [2, 3], [2, 6],
      [3, 4], [3, 7], [3, 5],
      [4, 6], [4, 7],
      [7, 9], [7, 0],
      [8, 1], [8, 5], [9, 2]
    ];

    // Background floating ambient particles
    const bgParticles = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      color: Math.random() > 0.5 ? 'rgba(99, 102, 241, 0.25)' : 'rgba(52, 211, 153, 0.25)'
    }));

    const nodes = GRAPH_NODES.map((item) => ({
      ...item,
      px: item.x * width,
      py: item.y * height,
      baseX: item.x * width,
      baseY: item.y * height,
      radius: 5.5,
      hover: false,
    }));

    const pulses = LINKS.map(([from, to]) => ({
      from,
      to,
      progress: Math.random(),
      speed: Math.random() * 0.006 + 0.003,
    }));

    let mouseX = -1000;
    let mouseY = -1000;
    let hoveredNode = null;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      hoveredNode = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 0. Render Ambient Background Particles
      bgParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // 1. Organic Physics Oscillation & Mouse Interaction
      hoveredNode = null;
      nodes.forEach((node) => {
        const targetX = node.baseX + Math.sin(time + node.id) * 9;
        const targetY = node.baseY + Math.cos(time * 0.8 + node.id) * 8;

        node.px += (targetX - node.px) * 0.04;
        node.py += (targetY - node.py) * 0.04;

        const dist = Math.hypot(mouseX - node.px, mouseY - node.py);
        if (dist < 32) {
          hoveredNode = node;
          node.hover = true;
        } else {
          node.hover = false;
        }

        if (dist < 110) {
          node.px += (mouseX - node.px) * 0.015;
          node.py += (mouseY - node.py) * 0.015;
        }
      });

      // 2. Sleek Graph Edge Links
      LINKS.forEach(([fromIdx, toIdx]) => {
        const n1 = nodes[fromIdx];
        const n2 = nodes[toIdx];

        const isHighlighted = (hoveredNode && (hoveredNode.id === n1.id || hoveredNode.id === n2.id));

        ctx.beginPath();
        ctx.moveTo(n1.px, n1.py);
        ctx.lineTo(n2.px, n2.py);
        ctx.strokeStyle = isHighlighted ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.12)';
        ctx.lineWidth = isHighlighted ? 1.6 : 0.85;
        ctx.stroke();
      });

      // 3. Energy Dots Travelling Along Graph Edges
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) pulse.progress = 0;

        const n1 = nodes[pulse.from];
        const n2 = nodes[pulse.to];

        const px = n1.px + (n2.px - n1.px) * pulse.progress;
        const py = n1.py + (n2.py - n1.py) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = n1.color;
        ctx.fill();
      });

      // 4. Compact Micro Nodes & Smart Directional Formula Labels
      nodes.forEach((node) => {
        const isHovered = node.hover;
        const r = isHovered ? 7.5 : node.radius;

        // Soft Radial Aura
        ctx.beginPath();
        ctx.arc(node.px, node.py, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}25`;
        ctx.fill();

        // Node Circle Core
        ctx.beginPath();
        ctx.arc(node.px, node.py, r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Smart Text Alignment: Flow inward from left/right edges to avoid clipping!
        const isRightSide = node.px > width * 0.55;
        ctx.textAlign = isRightSide ? 'right' : 'left';
        const textX = isRightSide ? node.px - r - 7 : node.px + r + 7;

        // Compact Formula Text Label
        ctx.font = `${isHovered ? 'bold' : '500'} ${isHovered ? '12px' : '11px'} 'KaTeX_Math', 'Inter', system-ui, sans-serif`;
        ctx.fillStyle = isHovered ? '#090d16' : '#334155';
        ctx.fillText(node.formula, textX, node.py + 3.5);

        // Domain Tag on Hover
        if (isHovered) {
          ctx.font = 'bold 10px sans-serif';
          ctx.fillStyle = node.color;
          ctx.fillText(node.title.toUpperCase(), textX, node.py - 9);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="relative w-full h-[380px] sm:h-[420px] lg:h-[450px] overflow-visible bg-transparent">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-pointer" />
    </div>
  );
}
