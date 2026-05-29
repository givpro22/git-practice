import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, X, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { mockProfiles, matchResults } from '../data/mockData'
import './Matching.css'

function CircleScore({ score, size = 100 }) {
  const radius = (size - 10) / 2
  const circumference = 2 * Math.PI * radius
  const [offset, setOffset] = useState(circumference)

  useEffect(() => {
    const timer = setTimeout(() => {
      const progressOffset = circumference - (score / 100) * circumference
      setOffset(progressOffset)
    }, 300)
    return () => clearTimeout(timer)
  }, [score, circumference])

  const getColor = () => {
    if (score >= 90) return '#34d399'
    if (score >= 75) return '#818cf8'
    if (score >= 60) return '#fbbf24'
    return '#fb7185'
  }

  return (
    <div className="circle-score" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div className="circle-score-text">
        <span className="score-number" style={{ color: getColor() }}>{score}</span>
        <span className="score-percent">%</span>
      </div>
    </div>
  )
}

export default function Matching({ appState, updateState }) {
  const navigate = useNavigate()
  const [expandedCard, setExpandedCard] = useState(null)
  const [likedUsers, setLikedUsers] = useState(new Set(appState.likedUsers || []))
  const [passedUsers, setPassedUsers] = useState(new Set())
  const [showAnimation, setShowAnimation] = useState(null)

  const sortedMatches = [...matchResults].sort((a, b) => b.score - a.score)

  const handleLike = (userId) => {
    setShowAnimation({ type: 'like', userId })
    setTimeout(() => {
      setLikedUsers(prev => new Set([...prev, userId]))
      updateState({ likedUsers: new Set([...likedUsers, userId]) })
      setShowAnimation(null)
    }, 500)
  }

  const handlePass = (userId) => {
    setShowAnimation({ type: 'pass', userId })
    setTimeout(() => {
      setPassedUsers(prev => new Set([...prev, userId]))
      setShowAnimation(null)
    }, 500)
  }

  const getProfile = (userId) => mockProfiles.find(p => p.id === userId)

  return (
    <div className="matching page" id="matching-page">
      <div className="container">
        <div className="matching-header animate-fade-in-up">
          <h1 className="matching-title">
            <span className="gradient-text">AI 매칭 추천</span>
          </h1>
          <p className="matching-subtitle">
            당신의 생활 패턴을 분석하여 가장 잘 맞는 룸메이트를 추천해드려요
          </p>
        </div>

        <div className="match-cards" id="match-cards">
          {sortedMatches.map((match, index) => {
            const profile = getProfile(match.userId)
            if (!profile) return null

            const isLiked = likedUsers.has(match.userId)
            const isPassed = passedUsers.has(match.userId)
            const isExpanded = expandedCard === match.userId
            const animating = showAnimation?.userId === match.userId

            if (isPassed && !animating) return null

            return (
              <div
                key={match.userId}
                className={`match-card glass animate-fade-in-up delay-${Math.min(index + 1, 6)} ${
                  animating ? `card-${showAnimation.type}` : ''
                } ${isLiked ? 'liked' : ''}`}
                id={`match-card-${match.userId}`}
              >
                <div className="match-card-main">
                  <div className="match-card-left">
                    <div className="match-avatar">{profile.avatar}</div>
                    <div className="match-info">
                      <h3 className="match-name">{profile.name}</h3>
                      <p className="match-uni">{profile.university} · {profile.department}</p>
                      <div className="match-tags">
                        {profile.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="match-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="match-card-right">
                    <CircleScore score={match.score} size={80} />
                  </div>
                </div>

                {/* Reasons preview */}
                <div className="match-reasons-preview">
                  {match.reasons.slice(0, 2).map((reason, i) => (
                    <span key={i} className="reason-chip">
                      {reason.icon} {reason.text}
                    </span>
                  ))}
                  {match.reasons.length > 2 && (
                    <button
                      className="expand-btn"
                      onClick={() => setExpandedCard(isExpanded ? null : match.userId)}
                      id={`expand-${match.userId}`}
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      {isExpanded ? '접기' : `+${match.reasons.length - 2}개 더보기`}
                    </button>
                  )}
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="match-expanded animate-fade-in">
                    <div className="expanded-reasons">
                      {match.reasons.map((reason, i) => (
                        <div key={i} className="expanded-reason">
                          <span className="reason-icon">{reason.icon}</span>
                          <span className="reason-text">{reason.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="expanded-profile">
                      <h4>프로필 상세</h4>
                      <div className="profile-details-grid">
                        <div className="detail-item">
                          <span className="detail-label">🌙 취침</span>
                          <span className="detail-value">{profile.sleepTime}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">☀️ 기상</span>
                          <span className="detail-value">{profile.wakeTime}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">🧹 청소</span>
                          <span className="detail-value">{profile.cleaningFreq}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">🚬 흡연</span>
                          <span className="detail-value">{profile.smoking ? '흡연' : '비흡연'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">🔊 소음</span>
                          <span className="detail-value">{'🟢'.repeat(profile.noiseSensitivity)}{'⚪'.repeat(5 - profile.noiseSensitivity)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">🌡️ 온도</span>
                          <span className="detail-value">{profile.tempPreference}°C</span>
                        </div>
                      </div>
                      <p className="profile-bio">&ldquo;{profile.bio}&rdquo;</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="match-actions">
                  {isLiked ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate('/chat')}
                      id={`chat-${match.userId}`}
                    >
                      <MessageCircle size={18} />
                      채팅하기
                    </button>
                  ) : (
                    <>
                      <button
                        className="action-btn pass-btn"
                        onClick={() => handlePass(match.userId)}
                        id={`pass-${match.userId}`}
                      >
                        <X size={22} />
                      </button>
                      <button
                        className="action-btn like-btn"
                        onClick={() => handleLike(match.userId)}
                        id={`like-${match.userId}`}
                      >
                        <Heart size={22} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
