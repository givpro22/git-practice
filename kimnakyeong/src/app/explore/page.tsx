'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Flame, Sparkles, TrendingUp, Users, Heart, Film } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import { exploreImages, trendingTags, users } from '@/data/mockData';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredImages = searchQuery
    ? exploreImages.filter(() => Math.random() > 0.4) // 데모용 필터링
    : exploreImages;

  return (
    <AppShell>
      {/* 검색 헤더 */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass px-4 py-3 space-y-3"
      >
        <div className="flex items-center gap-2.5 bg-bg-subtle px-3.5 py-2.5 rounded-2xl border border-border-light/30">
          <Search size={18} className="text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어, 태그 또는 크리에이터 입력"
            className="bg-transparent text-sm w-full placeholder:text-text-muted"
          />
        </div>

        {/* 카테고리 칩 */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {[
            { id: 'all', label: '전체', icon: Sparkles },
            { id: 'trending', label: '인기 태그', icon: Flame },
            { id: 'reels', label: '릴스', icon: Film },
            { id: 'creators', label: '추천 크리에이터', icon: Users },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
                  isActive
                    ? 'gradient-primary text-white border-transparent'
                    : 'bg-bg-subtle text-text-secondary border-border-light hover:bg-gray-200'
                }`}
              >
                <Icon size={12} />
                {cat.label}
              </motion.button>
            );
          })}
        </div>
      </motion.header>

      <div className="px-4 py-3">
        <AnimatePresence mode="wait">
          {/* 1. 인기 태그 모드 */}
          {activeCategory === 'trending' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-4 py-2"
            >
              <h2 className="font-bold text-base flex items-center gap-2">
                <TrendingUp size={18} className="text-pink-primary" />
                지금 떠오르는 트렌드
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {trendingTags.map((tagObj, i) => (
                  <motion.div
                    key={tagObj.tag}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="p-4 card-soft flex flex-col justify-between h-24 bg-gradient-to-br from-violet-primary/5 to-pink-primary/5 border border-violet-primary/10 cursor-pointer"
                  >
                    <span className="font-bold text-sm text-violet-primary">{tagObj.tag}</span>
                    <span className="text-xs text-text-muted">게시물 {tagObj.posts}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 2. 크리에이터 모드 */}
          {activeCategory === 'creators' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-4 py-2"
            >
              <h2 className="font-bold text-base flex items-center gap-2">
                <Users size={18} className="text-violet-primary" />
                추천 크리에이터
              </h2>
              <div className="space-y-3">
                {users.map((creator, i) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-3.5 card-soft"
                  >
                    <div className="flex items-center gap-3">
                      <img src={creator.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-sm">{creator.username}</span>
                          {creator.isVerified && (
                            <span className="w-3.5 h-3.5 rounded-full gradient-primary flex items-center justify-center text-white text-[8px] font-bold">✓</span>
                          )}
                        </div>
                        <span className="text-xs text-text-secondary">{creator.displayName}</span>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="gradient-primary text-white text-xs font-semibold px-4 py-2 rounded-full"
                    >
                      팔로우
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 3. 기본 메이슨리 그리드 (전체 & 릴스) */}
          {(activeCategory === 'all' || activeCategory === 'reels') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="masonry-grid"
            >
              {(activeCategory === 'reels' ? filteredImages.filter(img => img.isReel) : filteredImages).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i % 10) * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <img src={item.image} alt="" className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <div className="flex items-center gap-1 text-white text-xs font-semibold">
                      <Heart size={12} fill="currentColor" />
                      {item.likes}
                    </div>
                  </div>
                  {item.isReel && (
                    <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
                      <Film size={12} />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
