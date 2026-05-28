import React, { useEffect } from "react";

export default function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container">
      <div className="splash-logo-container animate-fade-in">
        <div className="splash-logo-circle animate-pulse">
          {/* CNU Logo representation */}
          <svg className="cnu-logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#00C781" strokeWidth="3" />
            <circle cx="50" cy="50" r="38" stroke="#00C781" strokeWidth="1" strokeDasharray="3 3" />
            {/* CNU Emblem graphic */}
            <path d="M50 22C34.5 22 22 34.5 22 50C22 65.5 34.5 78 50 78C65.5 78 78 65.5 78 50C78 34.5 65.5 22 50 22ZM50 72C37.8 72 28 62.2 28 50C28 37.8 37.8 28 50 28C62.2 28 72 37.8 72 50C72 62.2 62.2 72 50 72Z" fill="#00C781" />
            <path d="M50 34C41.2 34 34 41.2 34 50C34 58.8 41.2 66 50 66C58.8 66 66 58.8 66 50C66 41.2 58.8 34 50 34ZM44 54V46H56V54H44Z" fill="#00C781" />
            <path d="M42 42H58V44H42V42ZM42 56H58V58H42V56Z" fill="#00C781" />
          </svg>
        </div>
        
        <h1 className="splash-title">룸핏</h1>
        <p className="splash-subtitle">전남대학교 룸메이트 매칭 서비스</p>
      </div>
    </div>
  );
}
