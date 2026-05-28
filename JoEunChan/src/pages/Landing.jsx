import { Link } from 'react-router-dom'
import { ShieldCheck, ClipboardList, MessageCircle, Sparkles, MessagesSquare, ArrowRight, Star } from 'lucide-react'
import './Landing.css'

const features = [
  {
    icon: <ShieldCheck size={28} />,
    emoji: '🏫',
    title: '대학 인증',
    desc: '학교 포털/이메일 인증으로\n대학생만 가입 가능',
    color: 'blue',
  },
  {
    icon: <ClipboardList size={28} />,
    emoji: '📋',
    title: '생활 패턴 설문',
    desc: '취침시간, 청소습관, 흡연여부\n등 상세 항목',
    color: 'green',
  },
  {
    icon: <MessageCircle size={28} />,
    emoji: '🤖',
    title: 'AI 챗봇',
    desc: '자유 문장으로 성향·기피사항\n자연어 입력',
    color: 'pink',
  },
  {
    icon: <Sparkles size={28} />,
    emoji: '✨',
    title: 'AI 매칭 추천',
    desc: '궁합 점수 % 표시 +\n추천 이유 설명',
    color: 'purple',
  },
  {
    icon: <MessagesSquare size={28} />,
    emoji: '💬',
    title: '채팅 연결',
    desc: '상호 좋아요 후\n1:1 채팅 시작',
    color: 'yellow',
  },
]

export default function Landing() {
  return (
    <div className="landing page" id="landing-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        <div className="container hero-content">
          <div className="hero-badge animate-fade-in-up">
            <Star size={14} />
            <span>AI 기반 룸메이트 매칭 서비스</span>
          </div>

          <h1 className="hero-title animate-fade-in-up delay-1">
            나와 딱 맞는<br />
            <span className="gradient-text">룸메이트</span>를 찾아보세요
          </h1>

          <p className="hero-subtitle animate-fade-in-up delay-2">
            AI가 생활 패턴을 분석하여 최적의 룸메이트를 추천해드려요.
            <br />
            대학생 전용 서비스로 안전하고 신뢰할 수 있습니다.
          </p>

          <div className="hero-actions animate-fade-in-up delay-3">
            <Link to="/verify" className="btn btn-primary btn-lg" id="cta-start">
              시작하기
              <ArrowRight size={20} />
            </Link>
            <Link to="/matching" className="btn btn-secondary btn-lg" id="cta-explore">
              매칭 둘러보기
            </Link>
          </div>

          <div className="hero-stats animate-fade-in-up delay-4">
            <div className="stat">
              <span className="stat-number">2,847</span>
              <span className="stat-label">가입 대학생</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">1,203</span>
              <span className="stat-label">매칭 성공</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">98%</span>
              <span className="stat-label">만족도</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features-section">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <h2 className="section-title">
              <span className="gradient-text">핵심 기능</span>
            </h2>
            <p className="section-subtitle">
              5가지 핵심 기능으로 완벽한 룸메이트를 찾아보세요
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`feature-card glass animate-fade-in-up delay-${index + 1}`}
                id={`feature-${feature.title}`}
              >
                <div className={`feature-icon-wrapper feature-icon-${feature.color}`}>
                  <span className="feature-emoji">{feature.emoji}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section" id="how-section">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <h2 className="section-title">
              <span className="gradient-text">이용 방법</span>
            </h2>
            <p className="section-subtitle">
              간단한 4단계로 완벽한 룸메이트를 만나보세요
            </p>
          </div>

          <div className="steps-grid">
            {[
              { step: '01', title: '대학 인증', desc: '학교 이메일로 본인 인증', icon: '📧' },
              { step: '02', title: '프로필 작성', desc: '생활 패턴 설문 완료', icon: '📝' },
              { step: '03', title: 'AI 분석', desc: 'AI 챗봇과 대화하며 성향 파악', icon: '🤖' },
              { step: '04', title: '매칭 & 채팅', desc: '추천 룸메이트와 채팅 시작', icon: '🎉' },
            ].map((item, index) => (
              <div
                key={item.step}
                className={`step-card animate-fade-in-up delay-${index + 1}`}
                id={`step-${item.step}`}
              >
                <div className="step-number">{item.step}</div>
                <div className="step-icon">{item.icon}</div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.desc}</p>
                {index < 3 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta-section">
        <div className="container">
          <div className="cta-card glass">
            <h2 className="cta-title">
              지금 바로 <span className="gradient-text">시작</span>하세요
            </h2>
            <p className="cta-desc">
              나와 생활 패턴이 맞는 룸메이트를 AI가 찾아드립니다
            </p>
            <Link to="/verify" className="btn btn-primary btn-lg" id="cta-bottom">
              무료로 시작하기
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
