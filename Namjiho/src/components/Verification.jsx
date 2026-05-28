import React, { useState, useEffect } from "react";

export default function Verification({ onFinish }) {
  const [method, setMethod] = useState(null); // 'portal' or 'hq'
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [timer, setTimer] = useState(180); // 3 mins
  const [isVerified, setIsVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let interval = null;
    if (isSent && timer > 0 && !isVerified) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isSent, timer, isVerified]);

  const handleSendCode = () => {
    if (!email.includes("@")) {
      setErrorMsg("올바른 이메일 형식을 입력해 주세요.");
      return;
    }
    setIsSent(true);
    setTimer(180);
    setErrorMsg("");
    alert("인증번호가 발송되었습니다! (테스트 인증번호: 1234)");
  };

  const handleVerifyCode = () => {
    if (code === "1234") {
      setIsVerified(true);
      setErrorMsg("");
    } else {
      setErrorMsg("인증번호가 일치하지 않습니다. (1234를 입력해 보세요)");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="verify-container animate-fade-in">
      <div className="verify-header">
        <div className="verify-logo-box">
          <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="#00C781" strokeWidth="4" />
            <path d="M50 25C36.2 25 25 36.2 25 50C25 63.8 36.2 75 50 75C63.8 75 75 63.8 75 50C75 36.2 63.8 25 50 25ZM50 67C40.6 67 33 59.4 33 50C33 40.6 40.6 33 50 33C59.4 33 67 40.6 67 50C67 59.4 59.4 67 50 67Z" fill="#00C781" />
          </svg>
        </div>
        <h2 className="verify-title">대학생 인증</h2>
        <p className="verify-subtitle">전남대학교 학생 전용 매칭 서비스입니다.<br />인증 방식을 선택해 주세요.</p>
      </div>

      {!method ? (
        <div className="verify-button-group">
          <button className="btn-verify" onClick={() => setMethod("portal")}>
            <span>🏫</span> 포털 사이트 인증
          </button>
          <button className="btn-verify" onClick={() => setMethod("hq")}>
            <span>🏢</span> 대학 본부 학생 인증
          </button>
        </div>
      ) : (
        <div className="verify-form">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary-color)" }}>
              {method === "portal" ? "포털 사이트 인증" : "대학 본부 학생 인증"}
            </span>
            <button 
              onClick={() => { setMethod(null); setIsSent(false); setCode(""); setEmail(""); }}
              style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: "11px", fontWeight: "600" }}
            >
              이전으로
            </button>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <input 
              type="email" 
              placeholder={method === "portal" ? "포털 이메일 (@jnu.ac.kr)" : "학생 이메일 (@chonnam.ac.kr)"} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSent}
              className="input-field"
            />
            {!isSent && (
              <button 
                onClick={handleSendCode}
                style={{
                  whiteSpace: "nowrap",
                  padding: "0 16px",
                  background: "var(--primary-color)",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                전송
              </button>
            )}
          </div>

          {isSent && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ position: "relative" }}>
                <input 
                  type="text" 
                  placeholder="인증번호 4자리 입력" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={isVerified}
                  className="input-field"
                  maxLength="4"
                />
                {!isVerified && (
                  <span style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", color: "var(--accent-red)", fontWeight: "600" }}>
                    {formatTime(timer)}
                  </span>
                )}
              </div>

              {errorMsg && <p style={{ fontSize: "11px", color: "var(--accent-red)", fontWeight: "600", margin: "2px 4px" }}>{errorMsg}</p>}
              {isVerified && <p style={{ fontSize: "11px", color: "var(--primary-color)", fontWeight: "600", margin: "2px 4px" }}>✓ 인증이 성공적으로 완료되었습니다!</p>}

              {!isVerified ? (
                <button className="btn-submit" onClick={handleVerifyCode} style={{ background: "#475569" }}>
                  인증 확인
                </button>
              ) : (
                <button className="btn-submit" onClick={onFinish} style={{ background: "var(--primary-color)" }}>
                  시작하기
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
