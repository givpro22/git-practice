import React, { useState } from "react";

export default function MyPage({ myAnswers, onRetakeSurvey, matchHistory, roomsCount }) {
  const [notifyToggle, setNotifyToggle] = useState(true);
  const [soundToggle, setSoundToggle] = useState(false);

  const displayHistory = matchHistory || [];

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div className="match-list-header">
        <h2 className="match-list-title">
          <span>👤</span> 마이페이지
        </h2>
      </div>

      {/* Content */}
      <div className="app-content">
        {/* Profile Card */}
        <div className="mypage-profile-section">
          <div className="mypage-avatar" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>
            🧑‍🎓
          </div>
          <h3 className="mypage-name">나의 프로필</h3>
          <span className="mypage-dept">
            {myAnswers.age ? `${myAnswers.age}세` : "미입력"} · {myAnswers.mbti || "MBTI 미선택"} · {myAnswers.major || "전공 미설정"}
          </span>

          <div className="mypage-stat-row">
            <div className="mypage-stat-col">
              <span className="mypage-stat-val">{displayHistory.length}건</span>
              <span className="mypage-stat-label">매칭 신청</span>
            </div>
            <div style={{ width: "1px", background: "var(--phone-border)" }} />
            <div className="mypage-stat-col">
              <span className="mypage-stat-val">{myAnswers.gender ? "100%" : "0%"}</span>
              <span className="mypage-stat-label">설문 완료도</span>
            </div>
            <div style={{ width: "1px", background: "var(--phone-border)" }} />
            <div className="mypage-stat-col">
              <span className="mypage-stat-val">{roomsCount}개</span>
              <span className="mypage-stat-label">열린 채팅방</span>
            </div>
          </div>
        </div>

        {/* Section: My Information */}
        <span className="mypage-section-title">설문 및 프로필</span>
        <div className="mypage-menu-list">
          <div className="mypage-menu-item" onClick={onRetakeSurvey}>
            <span>📋 내 설문조사 수정 / 다시하기</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        {/* Section: Match Request History */}
        <span className="mypage-section-title">매칭 신청 내역</span>
        <div className="mypage-menu-list">
          {displayHistory.length === 0 ? (
            <div style={{ padding: "16px 20px", fontSize: "12px", color: "var(--phone-text-muted)", textStyle: "italic" }}>
              보낸 매칭 신청이 없습니다.
            </div>
          ) : (
            displayHistory.map((hist, idx) => (
              <div key={idx} className="mypage-menu-item" style={{ cursor: "default" }}>
                <div>
                  <span style={{ fontWeight: "700" }}>{hist.name}</span>
                  <span style={{ fontSize: "11px", color: "var(--phone-text-muted)", marginLeft: "8px" }}>{hist.time}</span>
                </div>
                <span 
                  style={{ 
                    fontSize: "11px", 
                    fontWeight: "800", 
                    color: hist.status === "수락됨" ? "var(--primary-color)" : "var(--accent-orange)",
                    background: hist.status === "수락됨" ? "var(--primary-light)" : "#FEF3C7",
                    padding: "3px 8px",
                    borderRadius: "10px"
                  }}
                >
                  {hist.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Section: App Settings */}
        <span className="mypage-section-title">설정</span>
        <div className="mypage-menu-list">
          <div className="mypage-menu-item">
            <span>🔔 푸시 알림 설정</span>
            <div 
              className={`mypage-toggle ${notifyToggle ? "active" : ""}`}
              onClick={() => setNotifyToggle(!notifyToggle)}
            >
              <div className="mypage-toggle-knob" />
            </div>
          </div>
          <div className="mypage-menu-item">
            <span>🔊 사운드 효과음</span>
            <div 
              className={`mypage-toggle ${soundToggle ? "active" : ""}`}
              onClick={() => setSoundToggle(!soundToggle)}
            >
              <div className="mypage-toggle-knob" />
            </div>
          </div>
          <div className="mypage-menu-item" onClick={() => alert("로그아웃 되었습니다.")}>
            <span style={{ color: "var(--accent-red)" }}>🚪 로그아웃</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        {/* Section: Customer Service */}
        <span className="mypage-section-title">고객센터</span>
        <div className="mypage-menu-list" style={{ marginBottom: "20px" }}>
          <div className="mypage-menu-item" onClick={() => alert("문의사항을 support@roomfit.jnu.ac.kr 로 보내주세요!")}>
            <span>✉️ 1:1 문의하기</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
