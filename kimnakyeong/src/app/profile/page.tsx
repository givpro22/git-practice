'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Grid3x3,
  Bookmark,
  UserSquare2,
  ChevronLeft,
  MoreHorizontal,
  Plus,
  MapPin,
  Link as LinkIcon,
  ExternalLink,
} from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import { currentUser, posts, formatNumber } from '@/data/mockData';
import Link from 'next/link';

const tabs = [
  { id: 'posts', icon: Grid3x3, label: '게시물' },
  { id: 'saved', icon: Bookmark, label: '저장됨' },
  { id: 'tagged', icon: UserSquare2, label: '태그됨' },
];

// 프로필 하이라이트
const highlights = [
  { id: 'h1', name: '일상', image: 'https://picsum.photos/seed/high1/200/200', emoji: '🌸' },
  { id: 'h2', name: '여행', image: 'https://picsum.photos/seed/high2/200/200', emoji: '✈️' },
  { id: 'h3', name: '맛집', image: 'https://picsum.photos/seed/high3/200/200', emoji: '🍽️' },
  { id: 'h4', name: '카페', image: 'https://picsum.photos/seed/high4/200/200', emoji: '☕' },
  { id: 'h5', name: '운동', image: 'https://picsum.photos/seed/high5/200/200', emoji: '💪' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <AppShell>
      {/* 헤더 */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass px-4 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{currentUser.username}</span>
          <svg className="w-4 h-4 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/create" className="p-2 rounded-full hover:bg-bg-subtle/50 transition-colors">
            <Plus size={24} strokeWidth={2} />
          </Link>
          <Link href="/settings" className="p-2 rounded-full hover:bg-bg-subtle/50 transition-colors">
            <Settings size={22} strokeWidth={1.8} />
          </Link>
        </div>
      </motion.header>

      <div className="px-4">
        {/* 프로필 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pt-4"
        >
          <div className="flex items-start justify-between">
            {/* 아바타 */}
            <div className="relative">
              <div className="w-[88px] h-[88px] rounded-full p-[3px] gradient-story-ring">
                <div className="w-full h-full rounded-full bg-white p-[2px]">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.displayName}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full gradient-primary flex items-center justify-center border-[3px] border-white">
                <Plus size={16} className="text-white" strokeWidth={3} />
              </div>
            </div>

            {/* 스탯 */}
            <div className="flex items-center gap-6 pt-3">
              {[
                { label: '게시물', value: currentUser.posts },
                { label: '팔로워', value: currentUser.followers },
                { label: '팔로잉', value: currentUser.following },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <span className="font-bold text-lg">
                    {formatNumber(stat.value)}
                  </span>
                  <span className="text-text-secondary text-xs">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 바이오 */}
          <div className="mt-4">
            <h2 className="font-bold text-base">{currentUser.displayName}</h2>
            <p className="text-sm mt-1 leading-relaxed whitespace-pre-line text-text-primary">
              {currentUser.bio.split(/(#\S+)/g).map((part, i) =>
                part.startsWith('#') ? (
                  <span key={i} className="text-violet-primary font-medium">{part}</span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </p>
            <div className="flex items-center gap-1 mt-1.5 text-text-secondary text-sm">
              <LinkIcon size={12} />
              <a href="#" className="text-violet-primary font-medium">moabit.link/user</a>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 mt-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-2.5 rounded-xl bg-bg-subtle font-semibold text-sm text-text-primary transition-colors hover:bg-gray-200"
            >
              프로필 편집
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-2.5 rounded-xl bg-bg-subtle font-semibold text-sm text-text-primary transition-colors hover:bg-gray-200"
            >
              프로필 공유
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="py-2.5 px-3 rounded-xl bg-bg-subtle transition-colors hover:bg-gray-200"
            >
              <UserSquare2 size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* 하이라이트 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-5"
        >
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {highlights.map((hl, i) => (
              <motion.div
                key={hl.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-full bg-bg-subtle border-2 border-border-light flex items-center justify-center text-2xl">
                  {hl.emoji}
                </div>
                <span className="text-[11px] text-text-secondary font-medium">{hl.name}</span>
              </motion.div>
            ))}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-border-light flex items-center justify-center">
                <Plus size={22} className="text-text-muted" />
              </div>
              <span className="text-[11px] text-text-muted font-medium">새 항목</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 탭 */}
      <div className="sticky top-[52px] z-30 bg-bg-warm border-b border-border-light mt-4">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center py-3 relative"
            >
              <tab.icon
                size={22}
                className={activeTab === tab.id ? 'text-text-primary' : 'text-text-muted'}
                strokeWidth={activeTab === tab.id ? 2 : 1.5}
              />
              {activeTab === tab.id && (
                <motion.div
                  layoutId="profileTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] gradient-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 게시물 그리드 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'posts' && (
            <div className="grid grid-cols-3 gap-[2px]">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="aspect-square relative group cursor-pointer"
                >
                  <img
                    src={post.images[0]}
                    alt={`게시물 ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {post.images.length > 1 && (
                    <div className="absolute top-2 right-2">
                      <Grid3x3 size={16} className="text-white drop-shadow-lg" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-bg-subtle flex items-center justify-center mb-4">
                <Bookmark size={36} className="text-text-muted" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-lg mb-2">저장한 항목</h3>
              <p className="text-text-secondary text-sm">
                저장한 게시물은 회원님만 볼 수 있습니다
              </p>
            </div>
          )}

          {activeTab === 'tagged' && (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-bg-subtle flex items-center justify-center mb-4">
                <UserSquare2 size={36} className="text-text-muted" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-lg mb-2">내가 나온 사진</h3>
              <p className="text-text-secondary text-sm">
                다른 사람이 회원님을 태그하면 여기에 표시됩니다
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
