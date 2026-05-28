import React, { useState } from "react";

export default function MatchList({ roommatesWithScores, onSelectRoommate }) {
  const [sortBy, setSortBy] = useState("scoreDesc"); // scoreDesc, latest

  const sortedMates = [...roommatesWithScores].sort((a, b) => {
    if (sortBy === "scoreDesc") {
      return b.matchScore - a.matchScore;
    } else {
      // simulate latest by ID descending
      return b.id - a.id;
    }
  });

  const topMate = sortedMates[0];
  const gridMates = sortedMates.slice(1);

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div className="match-list-header">
        <h2 className="match-list-title">
          <span>⚡</span> 매칭 순위
        </h2>
        <button className="bell-icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="bell-badge"></span>
        </button>
      </div>

      {/* Sorting bar */}
      <div className="match-filters-bar">
        <span className="match-count">총 {sortedMates.length}명의 매칭 후보</span>
        <select 
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="scoreDesc">매칭률 높은 순</option>
          <option value="latest">최신 등록 순</option>
        </select>
      </div>

      {/* Scrollable list */}
      <div className="app-content no-nav">
        <div className="match-cards-container">
          {/* Top Rank #1 Banner */}
          {topMate && (
            <div className="top-match-rank-1 animate-pulse" onClick={() => onSelectRoommate(topMate)}>
              <div className="crown-badge">👑</div>
              <div className="top-match-header">
                <div className="top-match-avatar-wrapper">
                  <div className="top-match-avatar" style={{ backgroundColor: topMate.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>
                    👩‍🎓
                  </div>
                  <div className="rank-badge-1">1</div>
                </div>
                <div className="top-match-info">
                  <span className="top-match-name">{topMate.name}님</span>
                  <span className="top-match-details">{topMate.age}세 · {topMate.major}</span>
                </div>
              </div>
              <div className="top-match-score-pill">
                <span>🎯</span> 매칭도 {topMate.matchScore}%
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: "600" }}>
                  <span>추천 지수</span>
                  <span>{topMate.mbti}</span>
                </div>
                <div className="top-match-progress-bar-track">
                  <div className="top-match-progress-bar-fill" style={{ width: `${topMate.matchScore}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Grid for Rank 2-5+ */}
          {gridMates.length > 0 && (
            <div className="match-grid-container">
              {gridMates.map((mate, index) => (
                <div 
                  key={mate.id} 
                  className="match-grid-card"
                  onClick={() => onSelectRoommate(mate)}
                >
                  <span className="match-rank-badge">{index + 2}위</span>
                  <div 
                    className="grid-match-avatar"
                    style={{ backgroundColor: mate.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}
                  >
                    {mate.gender === "female" ? "👩‍🎓" : "👨‍🎓"}
                  </div>
                  <span className="grid-match-name">{mate.name}</span>
                  <span className="grid-match-dept">{mate.major}</span>
                  <span className="grid-match-score">{mate.matchScore}% 일치</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
