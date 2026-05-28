import React, { useState, useEffect } from "react";
import PhoneFrame from "./components/PhoneFrame";
import Splash from "./components/Splash";
import Verification from "./components/Verification";
import Onboarding from "./components/Onboarding";
import Survey from "./components/Survey";
import MatchList from "./components/MatchList";
import RoommateDetail from "./components/RoommateDetail";
import AIChatbot from "./components/AIChatbot";
import ChatRooms from "./components/ChatRooms";
import MyPage from "./components/MyPage";
import { mockRoommates, calculateMatchPercentage } from "./data/roommateMockData";
import "./App.css";

export default function App() {
  const [view, setView] = useState("splash"); // splash, verify, onboarding, survey, main, detail
  const [tab, setTab] = useState("match_list"); // match_list, ai_chat, messages, mypage
  
  const [myAnswers, setMyAnswers] = useState({
    gender: "",
    age: "",
    mbti: "",
    homeFreq: "",
    soundSensitivity: "",
    sleepHabit: "",
    alarmSensitivity: "",
    nightActivity: "",
    smoking: "",
    cleaning: "",
    showerTime: "",
    indoorEating: "",
    hotSensitivity: "",
    coldSensitivity: "",
    scentSensitivity: ""
  });

  const [roommates, setRoommates] = useState(mockRoommates);
  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const [customPreferences, setCustomPreferences] = useState({});
  const [matchHistory, setMatchHistory] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  // Auto-calculate scores when survey answers or custom preferences change
  const roommatesWithScores = roommates
    .filter((r) => !myAnswers.gender || r.gender === (myAnswers.gender === "여자" ? "female" : "male"))
    .map((r) => {
      let baseScore = calculateMatchPercentage(myAnswers, r.answers);
      
      // Apply custom preferences from AI Chatbot
      Object.keys(customPreferences).forEach((key) => {
        const prefVal = customPreferences[key];
        const mateVal = r.answers[key];
        
        if (prefVal && mateVal) {
          if (prefVal === mateVal) {
            baseScore += 15; // Boost match score by 15% if it fits AI preference
          } else {
            baseScore -= 10; // Penalize if it doesn't
          }
        }
      });
      
      const finalScore = Math.max(30, Math.min(baseScore, 100));
      return { ...r, matchScore: finalScore };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const handleSurveySubmit = (answers) => {
    setMyAnswers(answers);
    setView("main");
    setTab("match_list");
  };

  const handleUpdatePreferences = (newPrefs) => {
    setCustomPreferences((prev) => ({ ...prev, ...newPrefs }));
    // trigger a short toast
    showToast("AI가 매칭 기준을 업데이트했습니다!");
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3500);
  };

  const handleRequestMatch = (mateId) => {
    const mate = roommates.find((r) => r.id === mateId);
    if (!mate) return;

    // Check if already requested
    if (matchHistory.some((h) => h.id === mateId)) {
      setView("main");
      setTab("match_list");
      return;
    }

    // Add to request history
    const newRequest = {
      id: mateId,
      name: mate.name,
      time: "방금 전",
      status: "대기중"
    };
    setMatchHistory((prev) => [newRequest, ...prev]);

    // Go back to main
    setView("main");
    setTab("match_list");

    // Simulate approval after 4 seconds
    setTimeout(() => {
      setMatchHistory((prev) =>
        prev.map((item) => (item.id === mateId ? { ...item, status: "수락됨" } : item))
      );
      
      // Get computed score for the roommate
      const mateScore = roommatesWithScores.find((r) => r.id === mateId)?.matchScore || 85;

      // Add to active chat rooms
      const newChatRoom = {
        id: mateId,
        name: mate.name,
        avatarColor: mate.avatarColor,
        matchScore: mateScore,
        lastMessage: "매칭 신청을 수락했습니다! 대화를 시작해보세요.",
        lastMessageTime: "방금",
        unreadCount: 1,
        messages: [
          {
            id: 101,
            sender: "roommate",
            text: `안녕하세요! 매칭을 수락했어요. 수면 패턴이나 기숙사 생활 규칙에 대해 이야기 나누고 싶습니다. 😊`,
            time: "방금"
          }
        ]
      };
      
      setChatRooms((prev) => [newChatRoom, ...prev]);
      showToast(`🎉 ${mate.name}님이 매칭 신청을 수락했습니다! 대화방이 열렸습니다.`);
    }, 4500);
  };

  const renderActiveView = () => {
    switch (view) {
      case "splash":
        return <Splash onFinish={() => setView("verify")} />;
      case "verify":
        return <Verification onFinish={() => setView("onboarding")} />;
      case "onboarding":
        return <Onboarding onFinish={() => setView("survey")} />;
      case "survey":
        return <Survey onSubmit={handleSurveySubmit} initialAnswers={myAnswers} />;
      case "detail":
        return (
          <RoommateDetail
            roommate={selectedRoommate}
            myAnswers={myAnswers}
            onBack={() => {
              setView("main");
            }}
            onRequestMatch={handleRequestMatch}
          />
        );
      case "main":
        return (
          <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
            {/* Render sub-tabs */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {tab === "match_list" && (
                <MatchList
                  roommatesWithScores={roommatesWithScores}
                  onSelectRoommate={(mate) => {
                    setSelectedRoommate(mate);
                    setView("detail");
                  }}
                />
              )}
              {tab === "ai_chat" && (
                <AIChatbot onUpdatePreferences={handleUpdatePreferences} />
              )}
              {tab === "messages" && (
                <ChatRooms initialRooms={chatRooms} />
              )}
              {tab === "mypage" && (
                <MyPage
                  myAnswers={myAnswers}
                  onRetakeSurvey={() => setView("survey")}
                  matchHistory={matchHistory}
                  roomsCount={chatRooms.length}
                />
              )}
            </div>

            {/* Bottom Nav Bar */}
            <div className="bottom-nav">
              <div className={`nav-item ${tab === "match_list" ? "active" : ""}`} onClick={() => setTab("match_list")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>룸메 매칭</span>
              </div>
              <div className={`nav-item ${tab === "ai_chat" ? "active" : ""}`} onClick={() => setTab("ai_chat")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12a10 10 0 0 1 10-10z" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
                <span>루미 AI</span>
              </div>
              <div className={`nav-item ${tab === "messages" ? "active" : ""}`} onClick={() => setTab("messages")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {chatRooms.some(r => r.unreadCount > 0) && <div className="bell-badge" style={{ position: "absolute", top: "14px", right: "calc(50% - 14px)", width: "6px", height: "6px" }} />}
                <span>1:1 톡</span>
              </div>
              <div className={`nav-item ${tab === "mypage" ? "active" : ""}`} onClick={() => setTab("mypage")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
                <span>마이페이지</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          style={{
            position: "absolute",
            top: "55px",
            zIndex: 9999,
            background: "#1e293b",
            color: "white",
            padding: "10px 16px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "700",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            maxWidth: "320px",
            textAlign: "center",
            lineHeight: "1.4",
            border: "1px solid rgba(255,255,255,0.1)",
            animation: "fadeInUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards"
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Main smartphone body */}
      <PhoneFrame>
        {renderActiveView()}
      </PhoneFrame>
    </div>
  );
}
