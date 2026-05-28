import React, { useRef, useEffect, useState } from 'react';
import { warpCoordinates, calculateFuturePath } from '../utils/physics';

export default function SandboxCanvas({
  bodies,
  setBodies,
  G,
  dt,
  isPaused,
  spawnerType,
  spawnMass,
  spawnColor,
  collisionMode,
  trailLength,
  showGrid,
  activePreviewPath,
  setActivePreviewPath,
  onCollisionEvent
}) {
  const canvasRef = useRef(null);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [hoveredBody, setHoveredBody] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Monitor mouse movements for hover tooltips
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (dragStart) {
      setDragEnd({ x: mouseX, y: mouseY });
      // Calculate future trajectory path preview
      const spawnRadius = getRadiusForType(spawnerType, spawnMass);
      const previewBody = {
        mass: spawnMass,
        radius: spawnRadius,
        type: spawnerType,
        isStatic: false
      };
      const path = calculateFuturePath(bodies, G, previewBody, dragStart, { x: mouseX, y: mouseY }, dt);
      setActivePreviewPath(path);
      setHoveredBody(null);
    } else {
      // Check if mouse is hovering over any celestial body
      let found = null;
      for (const b of bodies) {
        const dx = b.x - mouseX;
        const dy = b.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= b.radius + 12) {
          found = b;
          break;
        }
      }
      setHoveredBody(found);
      setTooltipPos({ x: e.clientX + 15, y: e.clientY + 15 });
    }
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setDragStart({ x: mouseX, y: mouseY });
    setDragEnd({ x: mouseX, y: mouseY });
  };

  const getRadiusForType = (type, mass) => {
    if (type === 'blackhole') return Math.max(14, Math.min(35, Math.log10(mass) * 8));
    if (type === 'star') return Math.max(18, Math.min(45, Math.log10(mass) * 10));
    if (type === 'planet') return Math.max(6, Math.min(20, Math.log10(mass) * 6));
    return 3; // asteroid
  };

  const handleMouseUp = (e) => {
    if (!dragStart) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Determine launch velocity based on dragging distance
    const dragX = dragStart.x - mouseX;
    const dragY = dragStart.y - mouseY;
    
    // Scale factor for launch velocity
    const velocityScale = 0.12;

    const newRadius = getRadiusForType(spawnerType, spawnMass);
    
    // Custom sci-fi lore messages based on types in Korean
    const loreCatalog = {
      blackhole: ["빛조차 삼키는 지평선", "강력한 중력 왜곡체", "특이점 임계점 도달"],
      star: ["우주의 핵융합 엔진", "고에너지 초신성 핵", "헬륨 플레어 분출 중"],
      planet: ["생물권 거주 가능 구역", "희귀 금속 매장 결정체", "동주기 자전 상태 지표"],
      asteroid: ["탄소 성분 우주 먼지", "성간 혜성 충돌 파편", "고속 이탈 행성 유성우"]
    };
    const randomLore = loreCatalog[spawnerType][Math.floor(Math.random() * loreCatalog[spawnerType].length)];

    // Translate English names to Korean representations
    const nameTranslations = {
      blackhole: '블랙홀',
      star: '항성',
      planet: '행성',
      asteroid: '소행성'
    };
    const krType = nameTranslations[spawnerType] || spawnerType;

    const newBody = {
      id: `${spawnerType}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: `${krType}-${Math.floor(Math.random() * 9000 + 1000)}호`,
      type: spawnerType,
      x: dragStart.x,
      y: dragStart.y,
      vx: dragX * velocityScale,
      vy: dragY * velocityScale,
      mass: spawnMass,
      radius: newRadius,
      color: spawnColor,
      trail: [],
      maxTrailLength: trailLength,
      isStatic: false,
      lore: randomLore
    };

    setBodies(prev => [...prev, newBody]);
    
    // Trigger spawn chime
    if (onCollisionEvent) {
      onCollisionEvent({ type: 'spawn', bodyType: spawnerType });
    }

    // Reset drag states
    setDragStart(null);
    setDragEnd(null);
    setActivePreviewPath([]);
  };

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      // 1. Clear Screen
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Futuristic Grid (Warped by gravity wells)
      if (showGrid) {
        ctx.strokeStyle = 'rgba(180, 100, 255, 0.08)';
        ctx.lineWidth = 1;
        const gridSpacing = 45;

        // Draw horizontal grid lines
        for (let y = 0; y < canvas.height; y += gridSpacing) {
          ctx.beginPath();
          for (let x = 0; x < canvas.width; x += 10) {
            const warped = warpCoordinates(x, y, bodies);
            if (x === 0) {
              ctx.moveTo(warped.x, warped.y);
            } else {
              ctx.lineTo(warped.x, warped.y);
            }
          }
          ctx.stroke();
        }

        // Draw vertical grid lines
        for (let x = 0; x < canvas.width; x += gridSpacing) {
          ctx.beginPath();
          for (let y = 0; y < canvas.height; y += 10) {
            const warped = warpCoordinates(x, y, bodies);
            if (y === 0) {
              ctx.moveTo(warped.x, warped.y);
            } else {
              ctx.lineTo(warped.x, warped.y);
            }
          }
          ctx.stroke();
        }
      }

      // 3. Draw Celestial Body Trails (Orbit history)
      bodies.forEach(b => {
        if (b.trail.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(b.trail[0].x, b.trail[0].y);
        
        for (let i = 1; i < b.trail.length; i++) {
          ctx.lineTo(b.trail[i].x, b.trail[i].y);
        }
        
        ctx.strokeStyle = b.color;
        ctx.lineWidth = Math.min(2.5, b.radius * 0.15);
        ctx.globalAlpha = 0.35; // Semitransparent trail
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      // 4. Draw Trajectory Vector Line (Dragging mouse)
      if (dragStart && dragEnd) {
        // Red launch helper line
        ctx.beginPath();
        ctx.moveTo(dragStart.x, dragStart.y);
        ctx.lineTo(dragEnd.x, dragEnd.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash

        // Draw a glowing spawn spot indicator
        ctx.beginPath();
        ctx.arc(dragStart.x, dragStart.y, getRadiusForType(spawnerType, spawnMass), 0, Math.PI * 2);
        ctx.strokeStyle = spawnColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw launch speed/force vector arrowhead
        const angle = Math.atan2(dragEnd.y - dragStart.y, dragEnd.x - dragStart.x);
        ctx.beginPath();
        ctx.moveTo(dragEnd.x, dragEnd.y);
        ctx.lineTo(
          dragEnd.x - 10 * Math.cos(angle - Math.PI / 6),
          dragEnd.y - 10 * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(dragEnd.x, dragEnd.y);
        ctx.lineTo(
          dragEnd.x - 10 * Math.cos(angle + Math.PI / 6),
          dragEnd.y - 10 * Math.sin(angle + Math.PI / 6)
        );
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.stroke();
      }

      // 5. Draw Projecting Simulated Future Orbit Path
      if (activePreviewPath && activePreviewPath.length > 0) {
        ctx.beginPath();
        ctx.moveTo(activePreviewPath[0].x, activePreviewPath[0].y);
        for (let i = 1; i < activePreviewPath.length; i++) {
          ctx.lineTo(activePreviewPath[i].x, activePreviewPath[i].y);
        }
        ctx.strokeStyle = spawnColor;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1.0;
      }

      // 6. Draw Celestial Bodies
      bodies.forEach(b => {
        ctx.save();

        if (b.type === 'blackhole') {
          // A. Black Hole rendering: Obsidian core + Glowing hot accretion ring
          const grad = ctx.createRadialGradient(b.x, b.y, b.radius * 0.4, b.x, b.y, b.radius * 2.2);
          grad.addColorStop(0.0, 'rgba(0, 0, 0, 1.0)');
          grad.addColorStop(0.2, 'rgba(0, 0, 0, 1.0)');
          grad.addColorStop(0.28, 'rgba(255, 0, 128, 0.95)');  // accretion inner
          grad.addColorStop(0.45, 'rgba(128, 0, 255, 0.6)');  // accretion mid
          grad.addColorStop(0.7, 'rgba(0, 220, 255, 0.15)');  // aura
          grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
          
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // True singularity black core
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = '#000';
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(255, 0, 128, 0.8)';
          ctx.fill();
        } 
        else if (b.type === 'star') {
          // B. Star rendering: Giant nuclear radial glow
          const grad = ctx.createRadialGradient(b.x, b.y, b.radius * 0.1, b.x, b.y, b.radius * 1.5);
          grad.addColorStop(0.0, '#ffffff');
          grad.addColorStop(0.2, b.color);
          grad.addColorStop(0.6, 'rgba(160, 40, 255, 0.3)');
          grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Solid glow core
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * 0.9, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 20;
          ctx.shadowColor = b.color;
          ctx.fill();
        } 
        else if (b.type === 'planet') {
          // C. Planet rendering: Shaded circle + Glow Atmosphere + Rings (if large)
          // Atmosphere Glow
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius + 6, 0, Math.PI * 2);
          ctx.fillStyle = b.color;
          ctx.globalAlpha = 0.15;
          ctx.fill();
          ctx.globalAlpha = 1.0;

          // Planetary base surface with a 3D spherical shadow gradient
          const grad = ctx.createRadialGradient(
            b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.1, 
            b.x, b.y, b.radius
          );
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(0.3, b.color);
          grad.addColorStop(1, '#080512'); // Dark shaded side

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Draw ring
          if (b.radius > 11) {
            ctx.beginPath();
            ctx.ellipse(b.x, b.y, b.radius * 1.9, b.radius * 0.45, Math.PI / 6, 0, Math.PI * 2);
            ctx.strokeStyle = b.color;
            ctx.lineWidth = Math.max(1, b.radius * 0.12);
            ctx.globalAlpha = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        } 
        else {
          // D. Asteroids
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = b.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = b.color;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [bodies, showGrid, dragStart, dragEnd, spawnerType, spawnMass, spawnColor, activePreviewPath]);

  return (
    <div 
      className="relative w-full h-full cursor-crosshair overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setDragStart(null);
        setDragEnd(null);
        setActivePreviewPath([]);
        setHoveredBody(null);
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />

      {/* Futuristic Mouse Hover Live Telemetry Tooltip in Korean */}
      {hoveredBody && (
        <div 
          className="stellar-tooltip glass-panel animate-fade-in"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white tracking-wide" style={{ fontFamily: 'var(--font-sci)' }}>
              {hoveredBody.name}
            </span>
            <span 
              className="badge-outline"
              style={{ color: hoveredBody.color }}
            >
              {hoveredBody.type === 'blackhole' ? '블랙홀' : hoveredBody.type === 'star' ? '항성' : hoveredBody.type === 'planet' ? '행성' : '소행성'}
            </span>
          </div>
          <div className="text-[11px] text-gray-400 space-y-[2px]" style={{ fontFamily: 'monospace' }}>
            <div>🛰️ 질량: <span className="text-gray-200">{hoveredBody.mass.toLocaleString()} MT</span></div>
            <div>⚡ 속도: <span className="text-gray-200">
              {Math.sqrt(hoveredBody.vx * hoveredBody.vx + hoveredBody.vy * hoveredBody.vy).toFixed(2)} km/s
            </span></div>
            <div>🔮 상태: <span className="italic text-gray-300" style={{ color: hoveredBody.color }}>"{hoveredBody.lore}"</span></div>
          </div>
        </div>
      )}

      {/* Guide text Overlay when empty */}
      {bodies.length === 0 && !dragStart && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none">
          <div className="text-2xl font-bold tracking-wider text-gray-400 uppercase mb-2" style={{ fontFamily: 'var(--font-sci)' }}>
            비어있는 시공간
          </div>
          <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
            마우스를 클릭하고 화면상에서 드래그하여 천체를 원하는 추진 속도로 발사하거나, 조작반에서 우주 매개변수를 튜닝해 보세요.
          </p>
        </div>
      )}
    </div>
  );
}
