import React, { useState, useEffect } from 'react';
import SandboxCanvas from './components/SandboxCanvas';
import ControlDeck from './components/ControlDeck';
import StellarCatalog from './components/StellarCatalog';
import { updatePhysics } from './utils/physics';
import { spaceSynth } from './utils/synth';
import { Orbit, Activity, ShieldAlert, Sliders, Cpu } from 'lucide-react';

export default function App() {
  const [bodies, setBodies] = useState([]);
  const [G, setG] = useState(0.6);
  const [dt, setDt] = useState(1.0);
  const [isPaused, setIsPaused] = useState(true); // Start paused for the startup overlay gesture
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  
  // Spawner states
  const [spawnerType, setSpawnerType] = useState('planet');
  const [spawnMass, setSpawnMass] = useState(150);
  const [spawnColor, setSpawnColor] = useState('hsl(180, 100%, 50%)');
  const [collisionMode, setCollisionMode] = useState('merge');
  const [trailLength, setTrailLength] = useState(150);
  const [activePreviewPath, setActivePreviewPath] = useState([]);
  
  // Welcome page overlay state
  const [welcomeActive, setWelcomeActive] = useState(true);

  // Sidebars toggle states to avoid covering up the simulation canvas
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  // Play initial audio synthesis and unlock AudioContext
  const handleSystemStart = () => {
    setWelcomeActive(false);
    setIsPaused(false);
    spaceSynth.enable();
    
    // Play warm welcome spawn chime
    setTimeout(() => {
      spaceSynth.playCollisionSound(0.8);
      loadPreset('solar'); // load default solar system preset
    }, 300);
  };

  // Sound manager toggles
  useEffect(() => {
    if (soundEnabled) {
      spaceSynth.enable();
    } else {
      spaceSynth.disable();
    }
  }, [soundEnabled]);

  // Main physics loop (calculates step increments at ~60fps)
  useEffect(() => {
    if (isPaused) return;

    const physicsInterval = setInterval(() => {
      setBodies(prev => {
        return updatePhysics(prev, G, dt, collisionMode, (event) => {
          if (!soundEnabled) return;
          if (event.type === 'collision') {
            spaceSynth.playCollisionSound(event.intensity);
          } else if (event.type === 'absorption') {
            spaceSynth.playAbsorptionSound(event.mass);
          }
        });
      });
    }, 16);

    return () => clearInterval(physicsInterval);
  }, [isPaused, G, dt, collisionMode, soundEnabled]);

  // Handle spawn chimes
  const handleSpawnSound = (event) => {
    if (!soundEnabled) return;
    if (event.type === 'spawn') {
      spaceSynth.playSpawnSound(event.bodyType);
    }
  };

  // Pre-configured celestial presets in Korean
  const loadPreset = (type) => {
    // Determine screen center relative to viewport sizes
    const cx = window.innerWidth ? window.innerWidth / 2 : 600;
    const cy = window.innerHeight ? window.innerHeight / 2 : 400;
    
    // Clear existing environment
    setBodies([]);
    spaceSynth.playCollisionSound(1.2);

    if (type === 'solar') {
      // 1. Solar System Preset
      const sun = {
        id: `star-${Date.now()}-1`,
        name: '태양 (SOL-PRIME)',
        type: 'star',
        x: cx,
        y: cy,
        vx: 0,
        vy: 0,
        mass: 14000,
        radius: 30,
        color: 'hsl(38, 100%, 55%)',
        trail: [],
        maxTrailLength: trailLength,
        isStatic: true,
        lore: '핵융합 중심 항성'
      };

      const mercury = {
        id: `planet-${Date.now()}-2`,
        name: '헤르메스-V',
        type: 'planet',
        x: cx,
        y: cy - 90,
        vx: 9.6, // Circular orbit speed: sqrt(G * M / r)
        vy: 0,
        mass: 80,
        radius: 8,
        color: 'hsl(10, 100%, 60%)',
        trail: [],
        maxTrailLength: trailLength,
        isStatic: false,
        lore: '고온의 티타늄 외각'
      };

      const earth = {
        id: `planet-${Date.now()}-3`,
        name: '가이아-블루',
        type: 'planet',
        x: cx,
        y: cy - 180,
        vx: 6.8,
        vy: 0,
        mass: 220,
        radius: 13,
        color: 'hsl(180, 100%, 50%)',
        trail: [],
        maxTrailLength: trailLength,
        isStatic: false,
        lore: '풍부한 액체 상태 수권'
      };

      const outerRing = {
        id: `planet-${Date.now()}-4`,
        name: '크로노스-IX',
        type: 'planet',
        x: cx,
        y: cy - 280,
        vx: 5.5,
        vy: 0,
        mass: 450,
        radius: 17,
        color: 'hsl(275, 100%, 65%)',
        trail: [],
        maxTrailLength: trailLength,
        isStatic: false,
        lore: '신비한 고리 대기 허브'
      };

      setBodies([sun, mercury, earth, outerRing]);
    } 
    else if (type === 'binary') {
      // 2. Binary Stars Preset
      const starA = {
        id: `star-${Date.now()}-1`,
        name: '펄서-알파',
        type: 'star',
        x: cx - 120,
        y: cy,
        vx: 0,
        vy: 4.2,
        mass: 9000,
        radius: 22,
        color: 'hsl(180, 100%, 50%)',
        trail: [],
        maxTrailLength: trailLength,
        isStatic: false,
        lore: '고밀도 에너지 코어'
      };

      const starB = {
        id: `star-${Date.now()}-2`,
        name: '펄서-베타',
        type: 'star',
        x: cx + 120,
        y: cy,
        vx: 0,
        vy: -4.2,
        mass: 9000,
        radius: 22,
        color: 'hsl(325, 100%, 60%)',
        trail: [],
        maxTrailLength: trailLength,
        isStatic: false,
        lore: '붕괴 중인 백색왜성'
      };

      // Tiny wandering asteroid caught in the binary gravity well
      const rogue = {
        id: `asteroid-${Date.now()}-3`,
        name: '방랑자-X',
        type: 'asteroid',
        x: cx,
        y: cy - 140,
        vx: 5.8,
        vy: 0.5,
        mass: 4,
        radius: 4,
        color: 'hsl(145, 100%, 50%)',
        trail: [],
        maxTrailLength: trailLength,
        isStatic: false,
        lore: '카이퍼 벨트 탈출 조각'
      };

      setBodies([starA, starB, rogue]);
    } 
    else if (type === 'blackhole') {
      // 3. Black Hole Vortex Preset
      const bh = {
        id: `bh-${Date.now()}-1`,
        name: '보이드-900',
        type: 'blackhole',
        x: cx,
        y: cy,
        vx: 0,
        vy: 0,
        mass: 90000,
        radius: 26,
        color: 'hsl(275, 100%, 65%)',
        trail: [],
        maxTrailLength: trailLength,
        isStatic: true,
        lore: '무한한 중력 특이점'
      };

      // Spawning a beautiful spiral disc of asteroids orbiting the black hole!
      const discAsteroids = [];
      const asteroidCount = 14;
      
      for (let i = 0; i < asteroidCount; i++) {
        // Distribute asteroids spirally from r = 100 to r = 280
        const radius = 100 + i * 14;
        const angle = (i * Math.PI * 2) / 6; // spiral angle offsets
        
        const ax = cx + radius * Math.cos(angle);
        const ay = cy + radius * Math.sin(angle);
        
        // Tangential velocity: orbital velocity vector = [-sin(a), cos(a)] * v
        const orbSpeed = Math.sqrt((G * bh.mass) / radius) * 0.95; // slightly slower for decay
        const vx = -Math.sin(angle) * orbSpeed;
        const vy = Math.cos(angle) * orbSpeed;

        discAsteroids.push({
          id: `asteroid-${Date.now()}-a${i}`,
          name: `성간파편-${200 + i}`,
          type: 'asteroid',
          x: ax,
          y: ay,
          vx: vx,
          vy: vy,
          mass: 3 + (i % 3),
          radius: 3 + (i % 2),
          color: i % 2 === 0 ? 'hsl(325, 100%, 60%)' : 'hsl(180, 100%, 50%)',
          trail: [],
          maxTrailLength: 60, // shorter trails for neat particle orbits
          isStatic: false,
          lore: '블랙홀 가스 원반 소속'
        });
      }

      setBodies([bh, ...discAsteroids]);
    } 
    else if (type === 'chaos') {
      // 4. Chaotic 3-Body System
      const star1 = {
        id: `star-${Date.now()}-1`,
        name: '삼중성-A',
        type: 'star',
        x: cx - 130,
        y: cy - 70,
        vx: 1.5,
        vy: -2.0,
        mass: 11000,
        radius: 23,
        color: 'hsl(38, 100%, 55%)',
        trail: [],
        maxTrailLength: trailLength,
        isStatic: false,
        lore: '불안정한 고온 핵반응'
      };

      const star2 = {
        id: `star-${Date.now()}-2`,
        name: '삼중성-B',
        type: 'star',
        x: cx + 130,
        y: cy - 70,
        vx: -1.5,
        vy: -2.0,
        mass: 11000,
        radius: 23,
        color: 'hsl(145, 100%, 50%)',
        trail: [],
        maxTrailLength: trailLength,
        isStatic: false,
        lore: '방사능 초록성 외각'
      };

      const planet = {
        id: `planet-${Date.now()}-3`,
        name: '카오스-프라임',
        type: 'planet',
        x: cx,
        y: cy + 130,
        vx: 0,
        vy: 4.5,
        mass: 300,
        radius: 14,
        color: 'hsl(180, 100%, 50%)',
        trail: [],
        maxTrailLength: trailLength,
        isStatic: false,
        lore: '불규칙 인력에 잡힌 행성'
      };

      setBodies([star1, star2, planet]);
    }
  };

  const clearAll = () => {
    setBodies([]);
    spaceSynth.playCollisionSound(0.4);
  };

  return (
    <div className="cosmos-app select-none">
      
      {/* Tweaking twinkling overlay stars in background */}
      <div className="stars-overlay" />

      {/* Main Physics Interactive Canvas Screen */}
      <div className="cosmos-canvas-container">
        <SandboxCanvas
          bodies={bodies}
          setBodies={setBodies}
          G={G}
          dt={dt}
          isPaused={isPaused}
          spawnerType={spawnerType}
          spawnMass={spawnMass}
          spawnColor={spawnColor}
          collisionMode={collisionMode}
          trailLength={trailLength}
          showGrid={showGrid}
          activePreviewPath={activePreviewPath}
          setActivePreviewPath={setActivePreviewPath}
          onCollisionEvent={handleSpawnSound}
        />

        {/* Floating Top Info Overlay Bar */}
        <div className="absolute top-4 left-4 right-4 pointer-events-none flex items-center justify-between z-10">
          <div className="glass-panel py-2.5 px-4 flex items-center gap-3 pointer-events-auto">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <div className="text-xs font-mono text-gray-300">
              우주 물리 레이다: <span className="text-white font-semibold">{isPaused ? '정지됨' : '작동 중'}</span>
            </div>
            <span className="text-gray-600">|</span>
            <div className="text-[10px] font-mono text-gray-400">
              중력 상수 (G) = {G.toFixed(2)}
            </div>
          </div>

          <div className="glass-panel py-2 px-3 flex items-center gap-2 pointer-events-auto text-[10px] font-mono text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>코어 엔진 수신 상태 양호</span>
          </div>
        </div>

        {/* Floating Toggle Buttons when Sidebars are Collapsed */}
        {!leftOpen && (
          <button 
            onClick={() => setLeftOpen(true)}
            className="absolute top-20 left-4 z-20 btn-cyber cyan py-2.5 px-4 flex items-center gap-2 shadow-lg glass-panel cursor-pointer"
            style={{ fontFamily: 'var(--font-sci)' }}
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="text-xs tracking-wider font-semibold">조작 패널 열기</span>
          </button>
        )}

        {!rightOpen && (
          <button 
            onClick={() => setRightOpen(true)}
            className="absolute top-20 right-4 z-20 btn-cyber purple py-2.5 px-4 flex items-center gap-2 shadow-lg glass-panel cursor-pointer"
            style={{ fontFamily: 'var(--font-sci)' }}
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="text-xs tracking-wider font-semibold">텔레메트리 열기</span>
          </button>
        )}
      </div>

      {/* Control Panel Widget Sidebar */}
      {leftOpen && (
        <div className="cosmos-sidebar-left-wrap">
          <ControlDeck
            G={G} setG={setG}
            dt={dt} setDt={setDt}
            isPaused={isPaused} setIsPaused={setIsPaused}
            soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled}
            spawnerType={spawnerType} setSpawnerType={setSpawnerType}
            spawnMass={spawnMass} setSpawnMass={setSpawnMass}
            spawnColor={spawnColor} setSpawnColor={setSpawnColor}
            collisionMode={collisionMode} setCollisionMode={setCollisionMode}
            trailLength={trailLength} setTrailLength={setTrailLength}
            showGrid={showGrid} setShowGrid={setShowGrid}
            loadPreset={loadPreset}
            clearAll={clearAll}
            onCollapse={() => setLeftOpen(false)}
          />
        </div>
      )}

      {/* Telemetry Catalog Sidebar */}
      {rightOpen && (
        <div className="cosmos-sidebar-right-wrap">
          <StellarCatalog
            bodies={bodies}
            setBodies={setBodies}
            activePreviewPath={activePreviewPath}
            onCollapse={() => setRightOpen(false)}
          />
        </div>
      )}

      {/* Fullscreen Sci-Fi Console Welcome Gate / Autoplay Bypass */}
      {welcomeActive && (
        <div className="absolute inset-0 bg-black/95 z-50 flex items-center justify-center p-6 transition-all duration-700">
          <div className="glass-panel max-w-lg p-8 flex flex-col items-center text-center gap-6 border-white/10 shadow-2xl relative overflow-hidden">
            
            {/* Spinning decorative radar circles */}
            <div className="absolute w-[300px] h-[300px] rounded-full border border-white/5 animate-spin pointer-events-none" style={{ animationDuration: '30s' }} />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-white/5 animate-spin pointer-events-none" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

            <div className="relative">
              <Orbit className="w-16 h-16 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pulse-dot scale-150" />
            </div>

            <div className="space-y-2">
              <h2 className="sci-fi-title text-3xl font-extrabold tracking-widest text-white">COSMOS CORE</h2>
              <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">중력 특이점 및 궤도 물리학 시뮬레이터</p>
            </div>

            <div className="text-xs text-gray-400 font-mono space-y-3 border-y border-white/10 py-5 max-w-sm leading-relaxed text-center" style={{ textAlign: 'center' }}>
              <p>🧬 표준 중력 벡터 방정식을 활성화하고 Web Audio 공간 입체 음향을 탑재합니다.</p>
              <p>🎛️ 경고: 높은 질량의 고밀도 블랙홀 스폰 시, 국소 캔버스 시공간 격자가 왜곡될 수 있습니다.</p>
            </div>

            <button 
              onClick={handleSystemStart}
              className="btn-cyber w-full cyan py-3 text-sm font-bold tracking-widest text-white transition-all shadow-lg animate-pulse"
              style={{ fontFamily: 'var(--font-sci)' }}
            >
              우주 물리 엔진 시스템 초기화
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
