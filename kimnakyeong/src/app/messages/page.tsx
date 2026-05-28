'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Phone,
  Video,
  Send,
  Image as ImageIcon,
  Mic,
  Smile,
  Info,
} from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import { messages, chatMessages, currentUser } from '@/data/mockData';
import Link from 'next/link';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatList, setChatList] = useState(messages);
  const [currentChatMsgs, setCurrentChatMsgs] = useState(chatMessages);
  const [inputMsg, setInputMsg] = useState('');

  const activeChat = chatList.find(c => c.id === selectedChat);

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text: inputMsg,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      type: 'text' as const,
    };

    setCurrentChatMsgs(prev => [...prev, newMsg]);
    setInputMsg('');

    // 마지막 메시지 업데이트
    if (selectedChat) {
      setChatList(prev =>
        prev.map(c =>
          c.id === selectedChat
            ? { ...c, lastMessage: inputMsg, timestamp: '방금', unread: 0 }
            : c
        )
      );
    }
  };

  return (
    <AppShell>
      <div className="relative h-screen overflow-hidden bg-bg-warm flex flex-col">
        <AnimatePresence mode="wait">
          {!selectedChat ? (
            /* 1. 채팅방 목록 */
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* 헤더 */}
              <header className="glass px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                <Link href="/" className="p-1">
                  <ArrowLeft size={24} strokeWidth={1.8} />
                </Link>
                <h1 className="font-bold text-lg">메시지</h1>
                <div className="w-8" />
              </header>

              {/* 검색바 */}
              <div className="px-4 py-2">
                <div className="flex items-center gap-2.5 bg-bg-subtle px-3.5 py-2.5 rounded-2xl">
                  <Search size={18} className="text-text-muted" />
                  <input
                    type="text"
                    placeholder="검색"
                    className="bg-transparent text-sm w-full placeholder:text-text-muted"
                  />
                </div>
              </div>

              {/* 채팅 목록 */}
              <div className="flex-1 overflow-y-auto divide-y divide-border-light/50 px-4">
                {chatList.map((chat) => (
                  <motion.div
                    key={chat.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedChat(chat.id);
                      // 읽음 처리
                      setChatList(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
                    }}
                    className="flex items-center gap-3.5 py-3.5 cursor-pointer first:pt-2"
                  >
                    {/* 아바타 */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={chat.user.avatar}
                        alt={chat.user.displayName}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      {chat.user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
                      )}
                    </div>

                    {/* 텍스트 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-text-primary">
                          {chat.user.username}
                        </span>
                        <span className="text-xs text-text-muted">{chat.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${chat.unread > 0 ? 'text-text-primary font-semibold' : 'text-text-secondary'}`}>
                          {chat.isTyping ? (
                            <span className="text-violet-primary font-medium animate-pulse">입력 중...</span>
                          ) : (
                            chat.lastMessage
                          )}
                        </p>
                        {chat.unread > 0 && (
                          <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center text-white text-[10px] font-bold">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* 2. 개별 채팅창 */
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 flex flex-col h-full bg-bg-warm"
            >
              {/* 채팅창 헤더 */}
              <header className="glass px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSelectedChat(null)} className="p-1 -ml-1">
                    <ArrowLeft size={24} strokeWidth={1.8} />
                  </button>
                  <img
                    src={activeChat?.user.avatar}
                    alt={activeChat?.user.displayName}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-bold text-sm text-text-primary leading-tight">
                      {activeChat?.user.username}
                    </h2>
                    <span className="text-[11px] text-emerald-500 font-medium">온라인</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-bg-subtle/50 rounded-full transition-colors">
                    <Phone size={20} className="text-text-primary" />
                  </button>
                  <button className="p-2 hover:bg-bg-subtle/50 rounded-full transition-colors">
                    <Video size={20} className="text-text-primary" />
                  </button>
                  <button className="p-2 hover:bg-bg-subtle/50 rounded-full transition-colors">
                    <Info size={20} className="text-text-primary" />
                  </button>
                </div>
              </header>

              {/* 메시지 리스트 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center py-6">
                  <img
                    src={activeChat?.user.avatar}
                    alt=""
                    className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-white shadow-md"
                  />
                  <h3 className="font-bold text-base mt-2">{activeChat?.user.displayName}</h3>
                  <p className="text-xs text-text-muted mt-1">@{activeChat?.user.username} • Instagram</p>
                  <button className="mt-3 px-4 py-1.5 bg-bg-subtle rounded-full text-xs font-semibold text-text-primary">
                    프로필 보기
                  </button>
                </div>

                {currentChatMsgs.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-[70%] space-y-1">
                      {msg.type === 'text' && (
                        <div className={`px-4 py-2.5 text-sm ${msg.isMe ? 'chat-bubble-me' : 'chat-bubble-other'}`}>
                          {msg.text}
                        </div>
                      )}
                      {msg.type === 'image' && (
                        <div className="rounded-2xl overflow-hidden shadow-sm border border-border-light bg-bg-subtle">
                          <img src={msg.image} alt="전송 이미지" className="max-w-full h-auto object-cover" />
                        </div>
                      )}
                      <span className={`text-[10px] text-text-muted block ${msg.isMe ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 메시지 입력창 */}
              <div className="p-4 bg-bg-warm border-t border-border-light">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-text-secondary hover:text-text-primary">
                    <ImageIcon size={22} />
                  </button>
                  <div className="flex-1 bg-bg-subtle rounded-3xl px-4 py-2.5 flex items-center gap-2 border border-border-light">
                    <input
                      type="text"
                      placeholder="메시지 보내기..."
                      value={inputMsg}
                      onChange={(e) => setInputMsg(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="bg-transparent text-sm flex-1 placeholder:text-text-muted"
                    />
                    <button className="text-text-secondary hover:text-text-primary">
                      <Smile size={20} />
                    </button>
                  </div>
                  {inputMsg.trim() ? (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSendMessage}
                      className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white"
                    >
                      <Send size={16} strokeWidth={2.5} />
                    </motion.button>
                  ) : (
                    <button className="p-2 text-text-secondary hover:text-text-primary">
                      <Mic size={22} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
