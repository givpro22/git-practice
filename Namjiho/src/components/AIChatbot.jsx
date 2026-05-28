import React, { useState, useRef, useEffect } from "react";

export default function AIChatbot({ onUpdatePreferences }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "안녕하세요! 룸핏 AI 비서 루미(Roomie)입니다. 🤖✨\n\n원하시는 룸메이트의 특별한 성향이나 기피 사항(예: '담배 안 피우는 사람', '코 안 고는 사람', '청소 자주 하는 조용한 사람')을 자유로운 문장으로 말씀해 주시면, 매칭 목록에 즉시 반영해 드립니다!"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputText
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Parse the input text for keywords
    const text = inputText.toLowerCase();
    let detectedPreference = {};
    let responseText = "";

    // Keyword detection rules
    if (text.includes("담배") || text.includes("흡연") || text.includes("비흡연")) {
      if (text.includes("안") || text.includes("싫") || text.includes("비") || text.includes("금연")) {
        detectedPreference = { smoking: "아니오" };
        responseText = "비흡연 룸메이트를 선호하시는군요! 흡연하지 않는 메이트들의 매칭 가중치를 극대화하여 매칭 목록을 업데이트했습니다. 🚭";
      } else {
        detectedPreference = { smoking: "예" };
        responseText = "흡연이 가능하거나 괜찮은 메이트를 찾으시는군요. 해당 조건에 맞추어 목록을 조정했습니다. 🚬";
      }
    } else if (text.includes("코골") || text.includes("코 고는")) {
      detectedPreference = { sleepHabit: "없음" }; // filter out snorers
      responseText = "수면에 아주 중요하죠! 코를 골지 않는 조용한 잠버릇을 가진 메이트들을 매칭 상위권으로 재정렬했습니다. 💤";
    } else if (text.includes("잠버릇") || text.includes("이갈이") || text.includes("잠꼬대")) {
      detectedPreference = { sleepHabit: "없음" };
      responseText = "잠꼬대나 이갈이 등 수면 잠버릇이 아예 없는 깔끔한 메이트 위주로 추천 목록 가중치를 높였습니다! 🛌";
    } else if (text.includes("청소") || text.includes("깨끗") || text.includes("깔끔")) {
      detectedPreference = { cleaning: "자주" };
      responseText = "깨끗하고 위생적인 생활을 선호하시는군요! 청소를 '자주' 하는 부지런한 스타일의 메이트 매칭률을 높였습니다. 🧼";
    } else if (text.includes("조용") || text.includes("잠귀") || text.includes("예민")) {
      detectedPreference = { soundSensitivity: "어두움" }; // deep sleep preferred, or just quiet
      responseText = "잠귀가 밝거나 소음에 민감하시군요. 주변 환경에 신경을 많이 쓰고 수면 패턴이 조용한 메이트들을 강력 추천해 드릴게요. 🔇";
    } else if (text.includes("먹") || text.includes("취식") || text.includes("배달")) {
      if (text.includes("안") || text.includes("싫")) {
        detectedPreference = { indoorEating: "아니오" };
        responseText = "방 안에서 음식물 섭취(배달음식 등)를 꺼리시는군요! 실내 취식을 하지 않는 깔끔한 메이트 위주로 점수를 상향했습니다. 🍎";
      } else {
        detectedPreference = { indoorEating: "예" };
        responseText = "실내에서 야식이나 음식을 함께 나눠 먹을 수 있는 털털한 메이트 매칭 가중치를 높였습니다! 🍕";
      }
    } else {
      responseText = "말씀하신 의견을 접수했습니다. 요청하신 성향을 기반으로 최적의 룸메이트 유사도 알고리즘에 가중치를 적용하여 순위를 재조정했습니다! 🤖";
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "ai",
          text: responseText
        }
      ]);
      if (Object.keys(detectedPreference).length > 0) {
        onUpdatePreferences(detectedPreference);
      }
    }, 1500);
  };

  return (
    <div className="chatbot-container animate-fade-in">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-avatar-ai">🤖</div>
        <div className="chat-header-info">
          <span className="chat-header-name">루미 AI 비서</span>
          <span className="chat-header-status">● 온라인 / 매칭 조건 갱신 가능</span>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages-area">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message-bubble ${msg.sender}`}
            style={{ whiteSpace: "pre-line" }}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="message-bubble ai">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="chat-input-bar">
        <input 
          type="text" 
          placeholder="성향이나 조건을 입력해 보세요..." 
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
