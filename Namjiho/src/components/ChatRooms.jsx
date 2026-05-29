import React, { useState, useRef, useEffect } from "react";

export default function ChatRooms({ rooms, setRooms }) {
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const activeRoom = rooms.find((r) => r.id === activeRoomId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeRoomId) {
      scrollToBottom();
      // Reset unread badge when entering room
      setRooms((prev) =>
        prev.map((r) => (r.id === activeRoomId ? { ...r, unreadCount: 0 } : r))
      );
    }
  }, [activeRoomId, rooms.find((r) => r.id === activeRoomId)?.messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim() || !activeRoomId) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: inputText,
      time: "방금"
    };

    // Update messages in the current room
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === activeRoomId) {
          return {
            ...r,
            lastMessage: inputText,
            lastMessageTime: "방금",
            messages: [...r.messages, userMessage]
          };
        }
        return r;
      })
    );

    const typedMsg = inputText;
    setInputText("");
    setIsTyping(true);

    // Mock response from roomie
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "아 진짜요? 좋은 생각인 것 같아요! 같이 생활 규칙 조율해 봐요. 😊";
      
      if (typedMsg.includes("안녕")) {
        replyText = `앗 안녕하세요! ${activeRoom.name}입니다. 매칭 분석표 보니까 성향이 되게 잘 맞으시던데 연락하게 되어 기뻐요! 룸메이트 관련해서 조율할 점 같이 이야기해봐요 ㅎㅎ`;
      } else if (typedMsg.includes("담배") || typedMsg.includes("흡연")) {
        replyText = "저는 비흡연자라 기숙사 내부 흡연이나 냄새 밸 걱정은 전혀 안 하셔도 돼요! 안심하셔도 됩니다.";
      } else if (typedMsg.includes("잠") || typedMsg.includes("청소") || typedMsg.includes("시간")) {
        replyText = "저는 생활 패턴이 비교적 규칙적인 편이에요! 보통 밤 12시쯤 불 끄고 스탠드 켜고 작업해요. 청소도 일주일에 2번 정도 같이 구역 나눠서 하면 조을 것 같아요!";
      }

      const replyMessage = {
        id: Date.now() + 1,
        sender: "roommate",
        text: replyText,
        time: "방금"
      };

      setRooms((prev) =>
        prev.map((r) => {
          if (r.id === activeRoomId) {
            return {
              ...r,
              lastMessage: replyText,
              lastMessageTime: "방금",
              messages: [...r.messages, replyMessage]
            };
          }
          return r;
        })
      );
    }, 1500);
  };

  if (activeRoomId && activeRoom) {
    return (
      <div className="chatbot-container animate-fade-in">
        {/* Header */}
        <div className="chat-header">
          <button className="btn-back-link" onClick={() => setActiveRoomId(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div 
            className="room-avatar" 
            style={{ 
              width: "32px", 
              height: "32px", 
              backgroundColor: activeRoom.avatarColor, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: "18px" 
            }}
          >
            👩‍🎓
          </div>
          <div className="chat-header-info">
            <span className="chat-header-name">{activeRoom.name}</span>
            <span style={{ fontSize: "10px", color: "var(--phone-text-muted)" }}>매칭 유사도 {activeRoom.matchScore}%</span>
          </div>
        </div>

        {/* Message area */}
        <div className="chat-messages-area" style={{ background: "#F1F5F9" }}>
          {activeRoom.messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`message-bubble ${msg.sender === "user" ? "user" : "ai"}`}
              style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                background: msg.sender === "user" ? "var(--primary-color)" : "white",
                color: msg.sender === "user" ? "white" : "#1E293B",
                borderTopRightRadius: msg.sender === "user" ? "2px" : "12px",
                borderTopLeftRadius: msg.sender === "user" ? "12px" : "2px"
              }}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="message-bubble ai" style={{ alignSelf: "flex-start", background: "white" }}>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="chat-input-bar">
          <input 
            type="text" 
            placeholder="메시지를 입력하세요..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="chat-input-box"
            disabled={isTyping}
          />
          <button 
            className="btn-chat-send"
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div className="match-list-header">
        <h2 className="match-list-title">
          <span>💬</span> 대화방 목록
        </h2>
      </div>

      <div className="app-content">
        {rooms.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "300px", color: "var(--phone-text-muted)", padding: "20px", textAlign: "center" }}>
            <span style={{ fontSize: "48px", marginBottom: "12px" }}>📬</span>
            <p style={{ fontSize: "14px", fontWeight: "700" }}>참여 중인 대화방이 없습니다.</p>
            <p style={{ fontSize: "12px", opacity: 0.8, marginTop: "4px" }}>마음에 드는 룸메이트 카드에서<br />매칭을 먼저 신청해 보세요!</p>
          </div>
        ) : (
          <div className="rooms-list">
            {rooms.map((room) => (
              <div 
                key={room.id} 
                className="room-item"
                onClick={() => setActiveRoomId(room.id)}
              >
                <div 
                  className="room-avatar"
                  style={{ 
                    backgroundColor: room.avatarColor, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontSize: "24px" 
                  }}
                >
                  👩‍🎓
                </div>
                <div className="room-details">
                  <div className="room-name-row">
                    <span className="room-name">{room.name}</span>
                    <span className="room-time">{room.lastMessageTime}</span>
                  </div>
                  <div className="room-msg-row">
                    <span className="room-last-msg">{room.lastMessage}</span>
                    {room.unreadCount > 0 && (
                      <span className="room-badge">{room.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
