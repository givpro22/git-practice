import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { surveyQuestions } from '../data/mockData'
import './Survey.css'

export default function Survey({ appState, updateState }) {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [completed, setCompleted] = useState(appState.surveyCompleted)
  const [selectedMulti, setSelectedMulti] = useState([])

  const question = surveyQuestions[currentStep]
  const totalSteps = surveyQuestions.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleSelect = (option) => {
    if (question.type === 'multiSelect') {
      setSelectedMulti(prev =>
        prev.includes(option)
          ? prev.filter(o => o !== option)
          : [...prev, option]
      )
    } else {
      setAnswers(prev => ({ ...prev, [question.id]: option }))
      /* Auto advance after a short delay */
      setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          setCurrentStep(prev => prev + 1)
        }
      }, 400)
    }
  }

  const handleRange = (value) => {
    setAnswers(prev => ({ ...prev, [question.id]: Number(value) }))
  }

  const handleNext = () => {
    if (question.type === 'multiSelect') {
      setAnswers(prev => ({ ...prev, [question.id]: selectedMulti }))
      setSelectedMulti([])
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = () => {
    if (question.type === 'multiSelect') {
      setAnswers(prev => ({ ...prev, [question.id]: selectedMulti }))
    }
    setCompleted(true)
    updateState({
      surveyCompleted: true,
      surveyData: answers,
    })
  }

  if (completed) {
    return (
      <div className="survey page" id="survey-page">
        <div className="container">
          <div className="survey-complete glass animate-scale-in">
            <div className="complete-icon">🎉</div>
            <h2 className="complete-title">설문 완료!</h2>
            <p className="complete-desc">
              생활 패턴 정보가 성공적으로 저장되었어요.<br />
              이제 AI 챗봇과 대화해보세요!
            </p>

            <div className="complete-summary glass">
              <h3 className="summary-title">📊 입력한 정보 요약</h3>
              {surveyQuestions.map((q) => (
                <div key={q.id} className="summary-row">
                  <span className="summary-icon">{q.icon}</span>
                  <span className="summary-label">{q.title}</span>
                  <span className="summary-value">
                    {Array.isArray(answers[q.id])
                      ? answers[q.id]?.join(', ') || '-'
                      : q.unit
                        ? `${answers[q.id] || '-'}${q.unit}`
                        : q.labels
                          ? q.labels[answers[q.id] - 1] || answers[q.id] || '-'
                          : answers[q.id] || '-'
                    }
                  </span>
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/chatbot')}
              id="to-chatbot-btn"
            >
              AI 챗봇과 대화하기
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="survey page" id="survey-page">
      <div className="container">
        <div className="survey-wrapper">
          {/* Progress Bar */}
          <div className="survey-progress" id="survey-progress">
            <div className="survey-progress-bar">
              <div className="survey-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="survey-progress-info">
              <span className="progress-text">{currentStep + 1} / {totalSteps}</span>
              <span className="progress-percent">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Question Card */}
          <div className="survey-card glass animate-fade-in-up" key={currentStep} id="survey-question-card">
            <div className="question-icon">{question.icon}</div>
            <h2 className="question-title">{question.title}</h2>
            <p className="question-subtitle">{question.subtitle}</p>

            {/* Select type */}
            {question.type === 'select' && (
              <div className="options-grid" id="survey-options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    className={`option-btn ${answers[question.id] === option ? 'selected' : ''}`}
                    onClick={() => handleSelect(option)}
                    id={`option-${option}`}
                  >
                    {answers[question.id] === option && <CheckCircle2 size={18} />}
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Multi Select type */}
            {question.type === 'multiSelect' && (
              <div className="options-grid multi" id="survey-multi-options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    className={`option-btn ${selectedMulti.includes(option) || (answers[question.id] || []).includes(option) ? 'selected' : ''}`}
                    onClick={() => handleSelect(option)}
                    id={`multi-${option}`}
                  >
                    {(selectedMulti.includes(option) || (answers[question.id] || []).includes(option)) && <CheckCircle2 size={18} />}
                    {option}
                  </button>
                ))}
                <p className="multi-hint">여러 개 선택 가능해요!</p>
              </div>
            )}

            {/* Range type */}
            {question.type === 'range' && (
              <div className="range-wrapper" id="survey-range">
                <div className="range-value-display">
                  <span className="range-value">
                    {answers[question.id] || question.min}
                    {question.unit || ''}
                  </span>
                  {question.labels && (
                    <span className="range-label-text">
                      {question.labels[(answers[question.id] || question.min) - question.min]}
                    </span>
                  )}
                </div>
                <input
                  type="range"
                  min={question.min}
                  max={question.max}
                  value={answers[question.id] || question.min}
                  onChange={(e) => handleRange(e.target.value)}
                  className="range-input"
                  id="range-slider"
                />
                <div className="range-labels">
                  <span>{question.labels ? question.labels[0] : question.min + (question.unit || '')}</span>
                  <span>{question.labels ? question.labels[question.labels.length - 1] : question.max + (question.unit || '')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="survey-nav" id="survey-nav">
            <button
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentStep === 0}
              id="prev-btn"
            >
              <ArrowLeft size={18} />
              이전
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              id="next-btn"
            >
              {currentStep === totalSteps - 1 ? '완료' : '다음'}
              {currentStep === totalSteps - 1 ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
