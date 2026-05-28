import React, { useState } from "react";

export default function Survey({ onSubmit, initialAnswers }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(
    initialAnswers || {
      gender: "",
      age: "",
      mbti: "",
      homeFreq: "",
      soundSensitivity: "",
      sleepHabit: "",
      alarmSensitivity: "",
      nightActivity: "",
      smoking: "",
      cleaning: "",
      showerTime: "",
      indoorEating: "",
      hotSensitivity: "",
      coldSensitivity: "",
      scentSensitivity: ""
    }
  );

  const updateAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!answers.gender || !answers.age || !answers.mbti || !answers.homeFreq) {
        alert("기본 프로필 항목을 모두 입력/선택해 주세요!");
        return;
      }
      if (isNaN(Number(answers.age)) || Number(answers.age) <= 0) {
        alert("올바른 나이를 입력해 주세요!");
        return;
      }
    }
    if (step === 2) {
      if (!answers.soundSensitivity || !answers.sleepHabit || !answers.alarmSensitivity || !answers.nightActivity) {
        alert("수면 환경 항목을 모두 선택해 주세요!");
        return;
      }
    }
    if (step === 3) {
      if (!answers.smoking || !answers.cleaning || !answers.showerTime || !answers.indoorEating) {
        alert("생활 습관 항목을 모두 선택해 주세요!");
        return;
      }
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      if (!answers.hotSensitivity || !answers.coldSensitivity || !answers.scentSensitivity) {
        alert("온도 및 감각 항목을 모두 선택해 주세요!");
        return;
      }
      onSubmit(answers);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="survey-card-title">Step 1. 기본 프로필</h2>
            <div className="survey-scrollable">
              {/* Gender */}
              <div className="survey-group">
                <label className="survey-label">성별</label>
                <div className="survey-options-row">
                  {["여자", "남자"].map((g) => (
                    <button
                      key={g}
                      className={`survey-btn-option ${answers.gender === g ? "selected" : ""}`}
                      onClick={() => updateAnswer("gender", g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div className="survey-group">
                <label className="survey-label">나이</label>
                <input
                  type="number"
                  placeholder="나이를 입력하세요"
                  value={answers.age}
                  onChange={(e) => updateAnswer("age", e.target.value)}
                  className="input-field"
                />
              </div>

              {/* MBTI */}
              <div className="survey-group">
                <label className="survey-label">MBTI</label>
                <input
                  type="text"
                  placeholder="MBTI를 입력하세요 (예: INFJ)"
                  value={answers.mbti}
                  onChange={(e) => updateAnswer("mbti", e.target.value.toUpperCase())}
                  className="input-field"
                  maxLength="4"
                />
              </div>

              {/* Home Freq */}
              <div className="survey-group">
                <label className="survey-label">본가 가는 주기</label>
                <div className="survey-grid-options">
                  {["매주", "격주", "월1회", "방학만"].map((f) => (
                    <button
                      key={f}
                      className={`survey-btn-option ${answers.homeFreq === f ? "selected" : ""}`}
                      onClick={() => updateAnswer("homeFreq", f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="survey-card-title">Step 2. 수면 환경</h2>
            <div className="survey-scrollable">
              {/* Sound sensitivity */}
              <div className="survey-group">
                <label className="survey-label">잠귀</label>
                <div className="survey-options-row">
                  {["어두움", "중간", "밝음"].map((s) => (
                    <button
                      key={s}
                      className={`survey-btn-option ${answers.soundSensitivity === s ? "selected" : ""}`}
                      onClick={() => updateAnswer("soundSensitivity", s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sleep habits */}
              <div className="survey-group">
                <label className="survey-label">잠버릇</label>
                <div className="survey-grid-options">
                  {["코골이", "이갈이", "잠꼬대", "없음"].map((sh) => (
                    <button
                      key={sh}
                      className={`survey-btn-option ${answers.sleepHabit === sh ? "selected" : ""}`}
                      onClick={() => updateAnswer("sleepHabit", sh)}
                    >
                      {sh}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alarm */}
              <div className="survey-group">
                <label className="survey-label">알람</label>
                <div className="survey-options-row">
                  {["잘 들음", "중간", "못 들음"].map((a) => (
                    <button
                      key={a}
                      className={`survey-btn-option ${answers.alarmSensitivity === a ? "selected" : ""}`}
                      onClick={() => updateAnswer("alarmSensitivity", a)}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Night brightness */}
              <div className="survey-group">
                <label className="survey-label">밤 활동 여부 (방 밝기)</label>
                <div className="survey-options-row">
                  {["불 켜기", "불 끄고 스탠드"].map((na) => (
                    <button
                      key={na}
                      className={`survey-btn-option ${answers.nightActivity === na ? "selected" : ""}`}
                      onClick={() => updateAnswer("nightActivity", na)}
                    >
                      {na}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="survey-card-title">Step 3. 생활 습관</h2>
            <div className="survey-scrollable">
              {/* Smoking */}
              <div className="survey-group">
                <label className="survey-label">흡연 여부</label>
                <div className="survey-options-row">
                  {["예", "아니오"].map((sm) => (
                    <button
                      key={sm}
                      className={`survey-btn-option ${answers.smoking === sm ? "selected" : ""}`}
                      onClick={() => updateAnswer("smoking", sm)}
                    >
                      {sm}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cleaning */}
              <div className="survey-group">
                <label className="survey-label">청소 성향</label>
                <div className="survey-options-row">
                  {["자주", "중간", "한 번에"].map((c) => (
                    <button
                      key={c}
                      className={`survey-btn-option ${answers.cleaning === c ? "selected" : ""}`}
                      onClick={() => updateAnswer("cleaning", c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shower time */}
              <div className="survey-group">
                <label className="survey-label">샤워 시간</label>
                <div className="survey-options-row">
                  {["10분 이내", "20분 이내", "그 이상"].map((st) => (
                    <button
                      key={st}
                      className={`survey-btn-option ${answers.showerTime === st ? "selected" : ""}`}
                      onClick={() => updateAnswer("showerTime", st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Food in room */}
              <div className="survey-group">
                <label className="survey-label">실내 취식 여부</label>
                <div className="survey-options-row">
                  {["예", "아니오"].map((ie) => (
                    <button
                      key={ie}
                      className={`survey-btn-option ${answers.indoorEating === ie ? "selected" : ""}`}
                      onClick={() => updateAnswer("indoorEating", ie)}
                    >
                      {ie}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="survey-card-title">Step 4. 온도 및 감각</h2>
            <div className="survey-scrollable">
              {/* Hot sensitivity */}
              <div className="survey-group">
                <label className="survey-label">더위 민감도</label>
                <div className="survey-options-row">
                  {["많이 탐", "중간", "적게 탐"].map((h) => (
                    <button
                      key={h}
                      className={`survey-btn-option ${answers.hotSensitivity === h ? "selected" : ""}`}
                      onClick={() => updateAnswer("hotSensitivity", h)}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cold sensitivity */}
              <div className="survey-group">
                <label className="survey-label">추위 민감도</label>
                <div className="survey-options-row">
                  {["많이 탐", "중간", "적게 탐"].map((c) => (
                    <button
                      key={c}
                      className={`survey-btn-option ${answers.coldSensitivity === c ? "selected" : ""}`}
                      onClick={() => updateAnswer("coldSensitivity", c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scent sensitivity */}
              <div className="survey-group">
                <label className="survey-label">향 민감도</label>
                <div className="survey-options-row">
                  {["민감함", "둔감함"].map((sc) => (
                    <button
                      key={sc}
                      className={`survey-btn-option ${answers.scentSensitivity === sc ? "selected" : ""}`}
                      onClick={() => updateAnswer("scentSensitivity", sc)}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const progressPercent = (step / 4) * 100;

  return (
    <div className="survey-container animate-fade-in">
      <div className="survey-progress-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="survey-step-num">Step {step} of 4</span>
          {step > 1 && (
            <button
              onClick={handlePrev}
              style={{
                background: "none",
                border: "none",
                color: "var(--phone-text-muted)",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              이전단계
            </button>
          )}
        </div>
        <div className="survey-progress-track">
          <div className="survey-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {renderStep()}

      <div className="survey-footer">
        <button className="btn-survey-action animate-pulse" onClick={handleNext}>
          {step === 4 ? "매칭 시작하기 ⚡" : "다음"}
        </button>
      </div>
    </div>
  );
}
