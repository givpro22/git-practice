import { useState, useRef, useEffect } from 'react'
import { Send, Phone, Video, MoreVertical, ArrowLeft, Circle } from 'lucide-react'
import { mockProfiles, demoChatMessages, matchResults } from '../data/mockData'
import './Chat.css'

export default function Chat({ appState }) {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState(demoChatMessages)
  const [input, setInput] = useState('')
  const [showSidebar, setShowSidebar] = useState(true)
  const chatEndRef = useRef(null)

  /* Get matched profiles (top 3 as "mutual likes") */
  const matchedProfiles = matchResults
    .slice(0, 3)
    .map(m => ({
      ...mockProfiles.find(p => p.id === m.userId),
      score: m.score,
      lastMessage: demoChatMessages[demoChatMessages.length - 1]?.text || '',
      lastTime: demoChatMessages[demoChatMessages.length - 1]?.time || '',
      online: Math.random() > 0.4,
      unread: Math.floor(Math.random() * 4),
    }))
    .filter(Boolean)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const now = new Date()
    const timeStr = `${now.getHours() > 12 ? '오후' : '오전'} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        senderId: 'me',
        text: input.trim(),
        time: timeStr,
      },
    ])
    setInput('')

    /* Simulate reply */
    setTimeout(() => {
      const replies = [
        '좋은 생각이에요! 😊',
        '저도 그렇게 생각해요 ㅎㅎ',
        '네, 맞아요! 언제 시간 되세요?',
        '오 정말요? 저도요!',
        '그거 좋네요! 👍',
      ]
      const randomReply = replies[Math.floor(Math.random() * replies.length)]
      const replyTime = new Date()
      const replyTimeStr = `${replyTime.getHours() > 12 ? '오후' : '오전'} ${replyTime.getHours() % 12 || 12}:${String(replyTime.getMinutes()).padStart(2, '0')}`

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          senderId: 'other',
          text: randomReply,
          time: replyTimeStr,
        },
      ])
    }, 1000 + Math.random() * 2000)
  }

  const handleSelectChat = (profile) => {
    setSelectedChat(profile)
    setShowSidebar(false)
  }

  return (
    <div className="chat page" id="chat-page">
      <div className="chat-layout">
        {/* Sidebar - Chat List */}
        <aside className={`chat-sidebar ${showSidebar ? 'show' : ''}`} id="chat-sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">채팅</h2>
            <span className="chat-count">{matchedProfiles.length}</span>
          </div>

          <div className="chat-list" id="chat-list">
            {matchedProfiles.length === 0 ? (
              <div className="empty-chats">
                <p className="empty-icon">💬</p>
                <p className="empty-text">아직 매칭된 채팅이 없어요</p>
                <p className="empty-hint">매칭 페이지에서 좋아요를 눌러보세요!</p>
              </div>
            ) : (
              matchedProfiles.map((profile) => (
                <button
                  key={profile.id}
                  className={`chat-list-item ${selectedChat?.id === profile.id ? 'active' : ''}`}
                  onClick={() => handleSelectChat(profile)}
                  id={`chat-item-${profile.id}`}
                >
                  <div className="chat-item-avatar">
                    <span>{profile.avatar}</span>
                    {profile.online && <span className="online-dot"></span>}
                  </div>
                  <div className="chat-item-info">
                    <div className="chat-item-top">
                      <span className="chat-item-name">{profile.name}</span>
                      <span className="chat-item-time">{profile.lastTime}</span>
                    </div>
                    <div className="chat-item-bottom">
                      <span className="chat-item-message">{profile.lastMessage}</span>
                      {profile.unread > 0 && (
                        <span className="chat-item-badge">{profile.unread}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className={`chat-main ${!showSidebar ? 'show' : ''}`} id="chat-main">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="chat-header" id="chat-header">
                <button
                  className="back-btn-mobile"
                  onClick={() => setShowSidebar(true)}
                  id="chat-back-btn"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="chat-header-user">
                  <div className="chat-header-avatar">
                    <span>{selectedChat.avatar}</span>
                    {selectedChat.online && <span className="online-dot"></span>}
                  </div>
                  <div className="chat-header-info">
                    <h3 className="chat-header-name">{selectedChat.name}</h3>
                    <p className="chat-header-status">
                      {selectedChat.online ? (
                        <><Circle size={8} fill="#34d399" stroke="#34d399" /> 온라인</>
                      ) : '오프라인'}
                    </p>
                  </div>
                </div>
                <div className="chat-header-actions">
                  <button className="header-action-btn" id="call-btn"><Phone size={18} /></button>
                  <button className="header-action-btn" id="video-btn"><Video size={18} /></button>
                  <button className="header-action-btn" id="more-btn"><MoreVertical size={18} /></button>
                </div>
              </div>

              {/* Messages */}
              <div className="chat-messages" id="chat-messages">
                <div className="chat-date-divider">
                  <span>오늘</span>
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chat-msg ${msg.senderId === 'me' ? 'msg-me' : 'msg-other'}`}
                  >
                    {msg.senderId === 'other' && (
                      <div className="msg-avatar">{selectedChat.avatar}</div>
                    )}
                    <div className="msg-content">
                      <div className={`msg-bubble ${msg.senderId}`}>
                        {msg.text}
                      </div>
                      <span className="msg-time">{msg.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <form className="chat-input-bar" onSubmit={handleSend} id="chat-input-bar">
                <input
                  type="text"
                  className="chat-text-input"
                  placeholder="메시지를 입력하세요..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  id="chat-text-input"
                />
                <button
                  type="submit"
                  className="chat-send-btn"
                  disabled={!input.trim()}
                  id="chat-send-btn"
                >
                  <Send size={20} />
                </button>
              </form>
            </>
          ) : (
            <div className="chat-empty" id="chat-empty">
              <div className="chat-empty-icon">💬</div>
              <h3>채팅을 시작해보세요</h3>
              <p>왼쪽에서 대화할 상대를 선택하세요</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
