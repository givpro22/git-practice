import React, { useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Trash2, 
  Orbit, Sun, Globe, Zap, Grid, Sparkles, AlertCircle, ChevronLeft
} from 'lucide-react';

export default function ControlDeck({
  G, setG,
  dt, setDt,
  isPaused, setIsPaused,
  soundEnabled, setSoundEnabled,
  spawnerType, setSpawnerType,
  spawnMass, setSpawnMass,
  spawnColor, setSpawnColor,
  collisionMode, setCollisionMode,
  trailLength, setTrailLength,
  showGrid, setShowGrid,
  loadPreset,
  clearAll,
  onCollapse
}) {
  
  // Auto-tune mass slider limits when changing spawner types
  useEffect(() => {
    if (spawnerType === 'blackhole') {
      setSpawnMass(60000);
      setSpawnColor('hsl(275, 100%, 65%)'); // hot purple/magenta
    } else if (spawnerType === 'star') {
      setSpawnMass(12000);
      setSpawnColor('hsl(38, 100%, 55%)'); // golden solar amber
    } else if (spawnerType === 'planet') {
      setSpawnMass(150);
      setSpawnColor('hsl(180, 100%, 50%)'); // glowing electric cyan
    } else if (spawnerType === 'asteroid') {
      setSpawnMass(3);
      setSpawnColor('hsl(325, 100%, 60%)'); // neon deep pink
    }
  }, [spawnerType, setSpawnMass, setSpawnColor]);

  // Color options per type
  const colorPalette = [
    'hsl(180, 100%, 50%)', // Cyan
    'hsl(275, 100%, 65%)', // Purple
    'hsl(325, 100%, 60%)', // Pink
    'hsl(38, 100%, 55%)',  // Amber/Gold
    'hsl(145, 100%, 50%)', // Emerald Green
    'hsl(10, 100%, 60%)'   // Solar Red
  ];

  return (
    <div className="glass-panel cosmos-deck p-6">
      {/* App Branding */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="relative">
          <Orbit className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pulse-dot" />
        </div>
        <div>
          <h1 className="sci-fi-title text-xl font-bold tracking-widest">CosmOS</h1>
          <div className="text-[10px] text-gray-400 tracking-wider font-mono">천체 물리학 엔진 v3.5</div>
        </div>
        {/* Collapse button */}
        <button 
          onClick={onCollapse}
          className="ml-auto text-gray-400 hover:text-cyan-400 p-1.5 rounded-lg border border-white/5 bg-white/5 transition-colors flex items-center justify-center cursor-pointer"
          title="조작판 접기"
        >
          <ChevronLeft className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Quick Presets Section */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ fontFamily: 'var(--font-sci)' }}>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 시공간 물리 프리셋
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => loadPreset('solar')} className="btn-cyber text-[11px] py-2 px-2 cyan">태양계 공전</button>
          <button onClick={() => loadPreset('binary')} className="btn-cyber text-[11px] py-2 px-2 purple">이중성계 댄스</button>
          <button onClick={() => loadPreset('blackhole')} className="btn-cyber text-[11px] py-2 px-2 pink">블랙홀 소용돌이</button>
          <button onClick={() => loadPreset('chaos')} className="btn-cyber text-[11px] py-2 px-2">삼중성계 혼돈</button>
        </div>
      </div>

      {/* Physics Time Deck */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-white/5 pb-2" style={{ fontFamily: 'var(--font-sci)' }}>
          시뮬레이션 조작 데크
        </h3>
        
        {/* Play/Pause & Sound & Clear */}
        <div className="flex gap-2">
          <button 
            onClick={() => setIsPaused(!isPaused)} 
            className={`btn-cyber flex-1 gap-2 ${isPaused ? 'purple' : 'cyan active'}`}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            <span className="text-[12px]">{isPaused ? "진행" : "일시정지"}</span>
          </button>
          
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)} 
            className={`btn-cyber px-3 ${soundEnabled ? 'cyan active' : 'purple'}`}
            title={soundEnabled ? "음향 비활성화" : "음향 활성화"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button 
            onClick={clearAll} 
            className="btn-cyber px-3 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400"
            title="화면 비우기"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Time Warp Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>시간 팽창 속도 (dt)</span>
            <span className="font-mono text-cyan-400 font-semibold">{isPaused ? '0.00' : dt.toFixed(2)}x</span>
          </div>
          <input 
            type="range" 
            min="0.1" 
            max="3.0" 
            step="0.05" 
            value={dt} 
            onChange={(e) => {
              setDt(parseFloat(e.target.value));
              if (isPaused) setIsPaused(false);
            }}
            className="slider-custom"
          />
        </div>

        {/* Gravity Strength Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>중력 상수 (G)</span>
            <span className="font-mono text-purple-400 font-semibold">{G.toFixed(2)}</span>
          </div>
          <input 
            type="range" 
            min="0.05" 
            max="4.0" 
            step="0.05" 
            value={G} 
            onChange={(e) => setG(parseFloat(e.target.value))}
            className="slider-custom"
          />
        </div>

        {/* Trail Length Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>궤도 잔상 길이</span>
            <span className="font-mono text-pink-400 font-semibold">{trailLength}단계</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="400" 
            step="10" 
            value={trailLength} 
            onChange={(e) => setTrailLength(parseInt(e.target.value))}
            className="slider-custom"
          />
        </div>

        {/* Grid lines & Collision mode */}
        <div className="flex justify-between items-center text-xs pt-1">
          <button 
            onClick={() => setShowGrid(!showGrid)} 
            className={`btn-cyber text-[11px] py-1.5 px-3 flex items-center gap-1.5 ${showGrid ? 'cyan active' : ''}`}
          >
            <Grid className="w-3.5 h-3.5" /> 시공간 격자
          </button>

          <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/10">
            <button 
              onClick={() => setCollisionMode('merge')} 
              className={`text-[10px] px-2.5 py-1.5 font-semibold rounded-md transition-all ${collisionMode === 'merge' ? 'bg-cyan-500 text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              합병
            </button>
            <button 
              onClick={() => setCollisionMode('bounce')} 
              className={`text-[10px] px-2.5 py-1.5 font-semibold rounded-md transition-all ${collisionMode === 'bounce' ? 'bg-cyan-500 text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              반사
            </button>
          </div>
        </div>
      </div>

      {/* Stellar spawner parameters */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-white/5 pb-2" style={{ fontFamily: 'var(--font-sci)' }}>
          천체 생성 스포너 설정
        </h3>

        {/* Type Palette selector */}
        <div className="grid grid-cols-4 gap-1">
          {[
            { id: 'asteroid', label: '소행성', icon: Zap, color: 'hover:border-pink-500' },
            { id: 'planet', label: '행성', icon: Globe, color: 'hover:border-cyan-400' },
            { id: 'star', label: '항성', icon: Sun, color: 'hover:border-amber-400' },
            { id: 'blackhole', label: '블랙홀', icon: AlertCircle, color: 'hover:border-purple-500' }
          ].map(type => {
            const Icon = type.icon;
            const isSel = spawnerType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSpawnerType(type.id)}
                className={`flex flex-col items-center gap-1.5 py-2.5 rounded-lg border transition-all ${
                  isSel 
                    ? 'bg-white/10 border-white/60 text-white shadow-lg' 
                    : `bg-transparent border-white/5 text-gray-400 ${type.color}`
                }`}
              >
                <Icon className={`w-4 h-4 ${isSel ? 'text-white' : 'text-gray-400'}`} />
                <span className="text-[9px] font-semibold tracking-wider">{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Mass Customizer */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>생성 천체 질량 (MT)</span>
            <span className="font-mono text-cyan-400 font-semibold">{spawnMass.toLocaleString()} MT</span>
          </div>
          <input 
            type="range" 
            min={spawnerType === 'asteroid' ? 1 : spawnerType === 'planet' ? 10 : spawnerType === 'star' ? 1000 : 20000} 
            max={spawnerType === 'asteroid' ? 50 : spawnerType === 'planet' ? 2000 : spawnerType === 'star' ? 30000 : 150000} 
            step={spawnerType === 'asteroid' ? 1 : spawnerType === 'planet' ? 10 : spawnerType === 'star' ? 500 : 2000} 
            value={spawnMass} 
            onChange={(e) => setSpawnMass(parseInt(e.target.value))}
            className="slider-custom"
          />
        </div>

        {/* Color Palette Selector */}
        <div className="space-y-2">
          <label className="text-xs text-gray-400 block">천체 대기 분위기 색상</label>
          <div className="flex gap-2">
            {colorPalette.map(color => (
              <button
                key={color}
                onClick={() => setSpawnColor(color)}
                className={`w-6 h-6 rounded-full border transition-transform ${spawnColor === color ? 'scale-125 border-white ring-2 ring-white/20' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Launch Help Tip */}
      <div className="mt-auto bg-white/5 border border-white/10 p-3 rounded-lg flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-gray-400 leading-relaxed">
          💡 팁: 캔버스 임의의 지점을 누르고 드래그하여 드롭하면 천체를 특정 방향과 속도로 발사할 수 있습니다. 드래그 중 실시간 예상 궤도가 함께 표시됩니다.
        </p>
      </div>
    </div>
  );
}
