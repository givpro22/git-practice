import React, { useState } from "react";

export default function Onboarding({ onFinish }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "나와 딱 맞는 룸메이트,\nAI가 24시간 생활 패턴을 분석해 연결",
      desc: "잠귀, 잠버릇, 청소 주기, 샤워 시간까지 상세한 설문 답변을 AI 분석하여 나에게 최고의 하모니를 자랑하는 메이트를 선호도 점수로 표시합니다.",
      emoji: "🤖💬"
    },
    {
      title: "단 몇 초면 매칭 완료!\n1:1 대화로 더 자세히 소통하기",
      desc: "마음에 드는 메이트에게 매칭을 신청해 보세요. 상대방이 수락하면 안심하고 1:1 대화를 바로 나눌 수 있습니다. AI 챗봇에게 자연어로 원하는 룸메를 요청할 수도 있어요!",
      emoji: "⚡🤝"
    }
  ];

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="onboard-container animate-fade-in">
      <div className="onboard-slide">
        {/* Simple Skip Link */}
        <div style={{ textAlign: "right" }}>
          <button 
            onClick={onFinish} 
            style={{ background: "none", border: "none", color: "white", opacity: 0.7, cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
          >
            건너뛰기
          </button>
        </div>

        {/* Dynamic graphics */}
        <div className="onboard-illustration">
          <div className="onboard-graphic">
            <span style={{ fontSize: "56px" }}>{slides[slide].emoji}</span>
          </div>
        </div>

        <div className="onboard-text-box">
          <h2 className="onboard-headline" style={{ whiteSpace: "pre-line" }}>
            {slides[slide].title}
          </h2>
          <p className="onboard-desc">
            {slides[slide].desc}
          </p>
        </div>

        <div className="onboard-footer">
          <div className="onboard-dots">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`onboard-dot ${idx === slide ? "active" : ""}`}
              />
            ))}
          </div>

          <button className="btn-onboard-next" onClick={handleNext}>
            {slide === slides.length - 1 ? "시작하기" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
