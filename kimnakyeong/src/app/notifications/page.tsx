'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, UserPlus, Tag, Settings, ArrowLeft } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import { notifications } from '@/data/mockData';
import Link from 'next/link';

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);

  const handleMarkAllRead = () => {
    setItems(prev => prev.map(item => ({ ...item, isRead: true })));
  };

  return (
    <AppShell>
      {/* 헤더 */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass px-4 py-3 flex items-center justify-between"
      >
        <Link href="/" className="p-1">
          <ArrowLeft size={24} strokeWidth={1.8} />
        </Link>
        <h1 className="font-bold text-lg">알림</h1>
        <button
          onClick={handleMarkAllRead}
          className="text-xs font-semibold text-violet-primary"
        >
          모두 읽음
        </button>
      </motion.header>

      {/* 리스트 */}
      <div className="px-4 py-2 divide-y divide-border-light/50">
        <AnimatePresence>
          {items.map((item, i) => {
            const isFollow = item.type === 'follow';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center justify-between py-3.5 relative ${
                  !item.isRead ? 'bg-violet-primary/5 -mx-4 px-4' : ''
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* 프로필 이미지 & 타입 배지 */}
                  <div className="relative">
                    <img
                      src={item.user.avatar}
                      alt={item.user.displayName}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 rounded-full gradient-primary flex items-center justify-center border-2 border-white text-white">
                      {item.type === 'like' && <Heart size={10} fill="currentColor" />}
                      {item.type === 'comment' && <MessageCircle size={10} fill="currentColor" />}
                      {item.type === 'follow' && <UserPlus size={10} />}
                      {(item.type === 'tag' || item.type === 'mention') && <Tag size={10} />}
                    </div>
                  </div>

                  {/* 텍스트 */}
                  <div className="flex-1 min-w-0 text-sm">
                    <p className="leading-snug">
                      <span className="font-bold mr-1 text-text-primary">
                        {item.user.username}
                      </span>
                      <span className="text-text-secondary">{item.text}</span>
                    </p>
                    <span className="text-xs text-text-muted mt-1 block">
                      {item.timestamp}
                    </span>
                  </div>
                </div>

                {/* 우측 액션 (게시물 썸네일 or 팔로우 버튼) */}
                <div className="ml-3 flex-shrink-0">
                  {isFollow ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="gradient-primary text-white text-xs font-semibold px-4 py-1.5 rounded-full"
                    >
                      맞팔로우
                    </motion.button>
                  ) : (
                    item.postImage && (
                      <img
                        src={item.postImage}
                        alt="게시물"
                        className="w-11 h-11 rounded-xl object-cover border border-border-light"
                      />
                    )
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-bg-subtle flex items-center justify-center mb-4">
            <Heart size={28} className="text-text-muted" />
          </div>
          <p className="text-text-secondary text-sm">새로운 알림이 없습니다</p>
        </div>
      )}
    </AppShell>
  );
}
