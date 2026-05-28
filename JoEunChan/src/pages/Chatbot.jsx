import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, Sparkles, ArrowRight } from 'lucide-react'
import { chatbotFlow } from '../data/mockData'
import './Chatbot.css'

export default function Chatbot({ appState, updateState }) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [currentFlowIndex, setCurrentFlowIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(appState.chatbotCompleted)
  const chatEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!isComplete && messages.length === 0) {
      addBotMessage(0)
    }
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const addBotMessage = (flowIndex) => {
    const flow = chatbotFlow[flowIndex]
    if (!flow) return

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: flow.bot,
          suggestions: flow.suggestions || [],
        },
      ])

      if (flow.id === 'done') {
        setIsComplete(true)
        updateState({ chatbotCompleted: true })
      }

      if (flow.nextId) {
        setCurrentFlowIndex(chatbotFlow.findIndex(f => f.id === flow.nextId))
      }
    }, flow.delay || 1000)
  }

  const handleSend = (text) => {
    const messageText = text || input.trim()
    if (!messageText) return

    /* Add user message */
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: messageText,
      },
    ])
    setInput('')

    /* Trigger next bot response */
    setTimeout(() => {
      addBotMessage(currentFlowIndex)
    }, 500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSend()
  }

  const handleSuggestion = (suggestion) => {
    handleSend(suggestion)
  }

  return (
    <div className="chatbot page" id="chatbot-page">
      <div className="container">
        <div className="chatbot-wrapper">
          {/* Header */}
          <div className="chatbot-header glass" id="chatbot-header">
            <div className="chatbot-avatar">
              <Sparkles size={24} />
            </div>
            <div className="chatbot-info">
              <h2 className="chatbot-name">RoomieMatch AI</h2>
              <p className="chatbot-status">
                {isTyping ? '입력 중...' : '온라인'}
              </p>
            </div>
            {isComplete && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate('/matching')}
                id="to-matching-btn"
              >
                매칭 보기
                <ArrowRight size={16} />
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="chatbot-messages" id="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === 'bot' ? 'message-bot' : 'message-user'} animate-fade-in-up`}
              >
                {msg.sender === 'bot' && (
                  <div className="message-avatar bot-avatar">
                    <Sparkles size={16} />
                  </div>
                )}
                <div className={`message-bubble ${msg.sender}`}>
                  <p className="message-text">{msg.text}</p>
                </div>
              </div>
            ))}

            {/* Suggestions */}
            {messages.length > 0 && messages[messages.length - 1]?.suggestions?.length > 0 && !isTyping && (
              <div className="suggestions animate-fade-in-up" id="suggestions">
                {messages[messages.length - 1].suggestions.map((s, i) => (
                  <button
                    key={i}
                    className="suggestion-btn"
                    onClick={() => handleSuggestion(s)}
                    id={`suggestion-${i}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div className="message message-bot animate-fade-in">
                <div className="message-avatar bot-avatar">
                  <Sparkles size={16} />
                </div>
                <div className="message-bubble bot">
                  <div className="typing-indicator" id="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          {!isComplete ? (
            <form className="chatbot-input-bar glass" onSubmit={handleSubmit} id="chatbot-input">
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder="메시지를 입력하세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                id="chatbot-text-input"
              />
              <button
                type="submit"
                className="send-btn"
                disabled={!input.trim() || isTyping}
                id="chatbot-send-btn"
              >
                <Send size={20} />
              </button>
            </form>
          ) : (
            <div className="chatbot-complete glass" id="chatbot-complete">
              <p>✅ AI 분석이 완료되었습니다!</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/matching')}
                id="go-matching-btn"
              >
                AI 매칭 결과 보기
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
