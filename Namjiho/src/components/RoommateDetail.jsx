import React, { useState } from "react";

export default function RoommateDetail({ roommate, myAnswers, onBack, onRequestMatch }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Compare answers to find matches/mismatches
  const traits = [
    { key: "smoking", label: "흡연 여부" },
    { key: "sleepHabit", label: "잠버릇" },
    { key: "soundSensitivity", label: "잠귀" },
    { key: "alarmSensitivity", label: "알람" },
    { key: "nightActivity", label: "밤 활동" },
    { key: "cleaning", label: "청소 성향" },
    { key: "showerTime", label: "샤워 시간" },
    { key: "indoorEating", label: "실내 취식" },
    { key: "homeFreq", label: "본가 주기" },
    { key: "hotSensitivity", label: "더위 민감도" },
    { key: "coldSensitivity", label: "추위 민감도" },
    { key: "scentSensitivity", label: "향 민감도" }
  ];

  const matches = traits.filter(t => roommate.answers[t.key] === myAnswers[t.key]);
  const mismatches = traits.filter(t => roommate.answers[t.key] !== myAnswers[t.key]);

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onRequestMatch(roommate.id);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
      {/* Header */}
      <div className="detail-header">
        <button className="btn-back-link" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="detail-title">프로필 상세</span>
        <div style={{ width: "30px" }}></div> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="app-content" style={{ paddingBottom: "90px" }}>
        <div className="detail-scrollable">
          {/* Profile Card */}
          <div className="detail-profile-card">
            <div 
              className="detail-avatar"
              style={{ backgroundColor: roommate.avatarColor, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontSize: "38px" }}
            >
              {roommate.gender === "female" ? "👩‍🎓" : "👨‍🎓"}
            </div>
            <h3 className="detail-name">{roommate.name}</h3>
            <div className="detail-badge-row">
              <span className="detail-badge">{roommate.age}세</span>
              <span className="detail-badge">{roommate.mbti}</span>
              <span className="detail-badge">{roommate.major}</span>
            </div>
            
            <p style={{ fontSize: "13px", lineHeight: "1.5", color: "#475569", textAlign: "center", padding: "0 10px", wordBreak: "keep-all" }}>
              "{roommate.intro}"
            </p>

            <div className="detail-match-ring-box">
              <span className="detail-match-score-large">{roommate.matchScore}%</span>
              <span className="detail-match-label">나와의 매칭도</span>
            </div>
          </div>

          {/* Core Matching Highlights */}
          <div className="detail-traits-grid">
            <div className="trait-card best">
              <span className="trait-card-title">💡 잘 맞는 점</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {matches.slice(0, 2).map(m => (
                  <span key={m.key} className="trait-pill">✓ {m.label} ({roommate.answers[m.key]})</span>
                ))}
                {matches.length === 0 && <span style={{ fontSize: "11px" }}>일치 사항 없음</span>}
              </div>
            </div>

            <div className="trait-card worst">
              <span className="trait-card-title">⚠️ 안 맞는 점</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {mismatches.slice(0, 2).map(m => (
                  <span key={m.key} className="trait-pill">✗ {m.label}</span>
                ))}
                {mismatches.length === 0 && <span style={{ fontSize: "11px" }}>불일치 사항 없음</span>}
              </div>
            </div>
          </div>

          {/* AI Recommendation Reason */}
          <div className="comparison-section" style={{ background: "#F0FDF4", borderColor: "#BBF7D0" }}>
            <h4 className="comparison-section-title" style={{ color: "var(--primary-dark)" }}>
              <span>✨</span> AI 매칭 추천 한마디
            </h4>
            <p style={{ fontSize: "12px", lineHeight: "1.5", color: "#166534", wordBreak: "keep-all" }}>
              {roommate.aiDescription}
            </p>
          </div>

          {/* Comparison Table */}
          <div className="comparison-section">
            <h4 className="comparison-section-title">
              <span>📋</span> 상세 생활 패턴 비교
            </h4>
            <table className="comparison-table">
              <thead className="comp-header">
                <tr>
                  <th style={{ textAlign: "left" }}>비교 항목</th>
                  <th>상대방 값</th>
                  <th>나의 값</th>
                </tr>
              </thead>
              <tbody>
                {traits.map((trait) => {
                  const mateVal = roommate.answers[trait.key];
                  const myVal = myAnswers[trait.key];
                  const isMatch = mateVal === myVal;
                  return (
                    <tr key={trait.key} className="comp-row">
                      <td className="comp-label-cell">{trait.label}</td>
                      <td className={`comp-value-cell ${isMatch ? "match" : "mismatch"}`}>
                        {mateVal}
                      </td>
                      <td className={`comp-value-cell ${isMatch ? "match" : "mismatch"}`}>
                        {myVal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating Request Button */}
      <div className="detail-footer-btn-box">
        <button className="btn-detail-request animate-pulse" onClick={() => setShowConfirmModal(true)}>
          {roommate.name}님에게 매칭 신청하기
        </button>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-emoji">💌</div>
            <h4 className="modal-title">{roommate.name}님에게 매칭을 신청할까요?</h4>
            <p className="modal-desc">
              상대방이 수락하면 1:1 채팅방이 열리고 대화를 시작할 수 있습니다.
            </p>
            <div className="modal-btn-row">
              <button className="btn-modal cancel" onClick={() => setShowConfirmModal(false)}>아니오</button>
              <button className="btn-modal confirm" onClick={handleConfirm}>예</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-emoji">🎉</div>
            <h4 className="modal-title">매칭 신청 완료!</h4>
            <p className="modal-desc">
              {roommate.name}님에게 매칭 메시지가 정상 전송되었습니다.<br />
              상대방의 수락 대기 중입니다.
            </p>
            <button className="btn-modal confirm" style={{ width: "100%" }} onClick={handleSuccessClose}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
