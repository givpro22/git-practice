import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, ArrowRight, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react'
import { universities } from '../data/mockData'
import './Verify.css'

export default function Verify({ appState, updateState }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(appState.isVerified ? 3 : 1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [detectedUni, setDetectedUni] = useState(null)

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setError('')

    const domain = email.split('@')[1]
    if (!domain) {
      setError('올바른 이메일 형식을 입력해주세요')
      return
    }

    const uni = universities.find(u => domain.includes(u.domain.split('.')[0]))
    if (!uni) {
      /* For demo purposes, accept any .ac.kr or .edu domain */
      if (!domain.endsWith('.ac.kr') && !domain.endsWith('.edu')) {
        setError('학교 이메일(@xxx.ac.kr 또는 @xxx.edu)을 사용해주세요')
        return
      }
      setDetectedUni({ name: domain.split('.')[0] + '대학교', domain })
    } else {
      setDetectedUni(uni)
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(2)
    }, 1500)
  }

  const handleCodeSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (code.length !== 6) {
      setError('6자리 인증 코드를 입력해주세요')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(3)
      updateState({
        isVerified: true,
        userEmail: email,
        university: detectedUni?.name || '대학교',
      })
    }, 1500)
  }

  const handleContinue = () => {
    navigate('/survey')
  }

  return (
    <div className="verify page" id="verify-page">
      <div className="container">
        <div className="verify-wrapper">
          {/* Progress indicator */}
          <div className="verify-progress" id="verify-progress">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`progress-step ${step >= s ? 'active' : ''} ${step === s ? 'current' : ''}`}>
                <div className="progress-dot">
                  {step > s ? <CheckCircle2 size={16} /> : s}
                </div>
                <span className="progress-label">
                  {s === 1 ? '이메일 입력' : s === 2 ? '코드 인증' : '인증 완료'}
                </span>
              </div>
            ))}
            <div className="progress-line">
              <div className="progress-line-fill" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
            </div>
          </div>

          {/* Step 1: Email */}
          {step === 1 && (
            <div className="verify-card glass animate-scale-in" id="verify-email-step">
              <div className="verify-icon-wrapper">
                <Mail size={32} className="verify-icon" />
              </div>
              <h2 className="verify-title">대학교 이메일 인증</h2>
              <p className="verify-subtitle">
                학교 이메일을 입력하면 인증 코드를 보내드려요
              </p>

              <form onSubmit={handleEmailSubmit} className="verify-form">
                <div className="input-group">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    className="input input-with-icon"
                    placeholder="example@university.ac.kr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email-input"
                    required
                  />
                </div>

                {error && <div className="verify-error" id="verify-error">{error}</div>}

                <button
                  type="submit"
                  className="btn btn-primary btn-lg verify-btn"
                  disabled={loading}
                  id="send-code-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="spin" />
                      발송 중...
                    </>
                  ) : (
                    <>
                      인증 코드 발송
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              <div className="verify-hint">
                <p>지원 대학 예시: 서울대, 연세대, 고려대, KAIST 등</p>
                <p>*.ac.kr, *.edu 도메인을 지원합니다</p>
              </div>
            </div>
          )}

          {/* Step 2: Verification Code */}
          {step === 2 && (
            <div className="verify-card glass animate-scale-in" id="verify-code-step">
              <div className="verify-icon-wrapper success">
                <ShieldCheck size={32} className="verify-icon" />
              </div>
              <h2 className="verify-title">인증 코드 입력</h2>
              <p className="verify-subtitle">
                <strong>{email}</strong>으로 발송된<br />
                6자리 코드를 입력해주세요
              </p>

              {detectedUni && (
                <div className="detected-uni">
                  🏫 {detectedUni.name} 확인됨
                </div>
              )}

              <form onSubmit={handleCodeSubmit} className="verify-form">
                <div className="code-input-group" id="code-input-group">
                  <input
                    type="text"
                    className="input code-input"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                      setCode(val)
                    }}
                    maxLength={6}
                    id="code-input"
                    autoFocus
                  />
                </div>

                {error && <div className="verify-error" id="code-error">{error}</div>}

                <p className="verify-demo-hint">💡 데모: 아무 6자리 숫자를 입력해주세요</p>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg verify-btn"
                  disabled={loading || code.length !== 6}
                  id="verify-code-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="spin" />
                      인증 중...
                    </>
                  ) : (
                    <>
                      인증하기
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              <button className="btn btn-secondary btn-sm" onClick={() => setStep(1)} id="back-btn">
                이메일 다시 입력
              </button>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="verify-card glass animate-scale-in" id="verify-success-step">
              <div className="success-animation">
                <div className="success-circle">
                  <CheckCircle2 size={48} />
                </div>
                <div className="success-ring"></div>
              </div>

              <h2 className="verify-title">인증 완료! 🎉</h2>
              <p className="verify-subtitle">
                <strong>{appState.university || detectedUni?.name}</strong> 학생으로 인증되었습니다
              </p>

              <div className="verified-info glass">
                <div className="verified-row">
                  <span className="verified-label">이메일</span>
                  <span className="verified-value">{appState.userEmail || email}</span>
                </div>
                <div className="verified-row">
                  <span className="verified-label">대학교</span>
                  <span className="verified-value">{appState.university || detectedUni?.name}</span>
                </div>
                <div className="verified-row">
                  <span className="verified-label">인증 상태</span>
                  <span className="verified-badge">✅ 인증됨</span>
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg verify-btn"
                onClick={handleContinue}
                id="continue-btn"
              >
                생활 패턴 설문하기
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
