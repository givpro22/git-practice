import React from 'react';
import { Trash2, ShieldAlert, Cpu, EyeOff, ChevronRight } from 'lucide-react';

export default function StellarCatalog({ bodies, setBodies, activePreviewPath, onCollapse }) {
  // Find the heaviest body in the universe to calculate distance from
  const primeBody = bodies.reduce((heaviest, current) => {
    return (!heaviest || current.mass > heaviest.mass) ? current : heaviest;
  }, null);

  const handleDeleteBody = (id) => {
    setBodies(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="glass-panel w-full lg:w-80 p-6 flex flex-col gap-4 overflow-y-auto max-h-[90vh] lg:max-h-full">
      {/* Catalog Title */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <Cpu className="w-5 h-5 text-purple-400" />
        <h3 className="text-sm font-bold tracking-widest text-white uppercase" style={{ fontFamily: 'var(--font-sci)' }}>
          실시간 천체 텔레메트리
        </h3>
        
        {/* Collapse button */}
        <button 
          onClick={onCollapse}
          className="ml-auto text-gray-400 hover:text-purple-400 p-1.5 rounded-lg border border-white/5 bg-white/5 transition-colors flex items-center justify-center cursor-pointer"
          title="텔레메트리 접기"
        >
          <ChevronRight className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Catalog Grid List */}
      {bodies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
          <EyeOff className="w-8 h-8 text-gray-600" />
          <p className="text-xs text-gray-500 font-mono">연결된 텔레메트리 피드가 없습니다.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {bodies.map(b => {
            // Speed calculation
            const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
            
            // Kinetic energy calculation: Ek = 0.5 * m * v^2
            const kineticEnergy = 0.5 * b.mass * speed * speed;

            // Distance from heaviest body
            let distanceString = '---';
            if (primeBody && primeBody.id !== b.id) {
              const dx = primeBody.x - b.x;
              const dy = primeBody.y - b.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              distanceString = `${Math.round(dist * 10).toLocaleString()} km`;
            } else if (primeBody && primeBody.id === b.id) {
              distanceString = '주요 질량 코어';
            }

            // Translate type for UI display
            const typeTranslations = {
              star: '항성',
              planet: '행성',
              asteroid: '소행성',
              blackhole: '블랙홀'
            };
            const translatedType = typeTranslations[b.type] || b.type;

            return (
              <div 
                key={b.id} 
                className="border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-3 rounded-lg flex flex-col gap-2 transition-all"
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color, boxShadow: `0 0 8px ${b.color}` }} />
                    <span className="font-mono text-xs font-semibold text-gray-200">{b.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <span className="badge-outline text-[8px]" style={{ color: b.color }}>
                      {translatedType}
                    </span>
                    <button 
                      onClick={() => handleDeleteBody(b.id)}
                      className="text-gray-500 hover:text-red-400 p-0.5 rounded transition-colors"
                      title="천체 소멸시키기"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Lore details */}
                <div className="text-[10px] italic text-gray-400 font-mono border-l-2 pl-2" style={{ borderLeftColor: b.color }}>
                  "{b.lore}"
                </div>

                {/* Statistics Table */}
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-3 text-[10px] font-mono border-t border-white/5 pt-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">질량</span>
                    <span className="text-gray-300 font-semibold">{b.mass.toLocaleString()} MT</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">공전 속도</span>
                    <span className="text-gray-300 font-semibold">{speed.toFixed(1)} km/s</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">코어와의 거리</span>
                    <span className={`font-semibold ${primeBody?.id === b.id ? 'text-amber-400' : 'text-gray-300'}`}>
                      {distanceString}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">운동 에너지</span>
                    <span className="text-cyan-400 font-semibold">{Math.round(kineticEnergy).toLocaleString()} TJ</span>
                  </div>
                </div>

                {/* Speed Meter bar */}
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: b.color, 
                      width: `${Math.min(100, (speed / 15) * 100)}%` 
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trajectory simulation path preview size indicator */}
      {activePreviewPath && activePreviewPath.length > 0 && (
        <div className="mt-auto bg-cyan-950/20 border border-cyan-800/40 p-2.5 rounded-lg flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-[10px] font-mono text-cyan-300">
            실시간 {activePreviewPath.length}단계 물리 궤적 시뮬레이션 중...
          </span>
        </div>
      )}
    </div>
  );
}
