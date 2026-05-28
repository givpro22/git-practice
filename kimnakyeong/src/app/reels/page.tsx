'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Share2,
  Music,
  Bookmark,
  MoreVertical,
} from 'lucide-react';
import { reels, formatNumber } from '@/data/mockData';

export default function ReelsPage() {
  const [currentReel, setCurrentReel] = useState(0);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>(
    Object.fromEntries(reels.map(r => [r.id, r.isLiked]))
  );
  const [reelLikes, setReelLikes] = useState<Record<string, number>>(
    Object.fromEntries(reels.map(r => [r.id, r.likes]))
  );

  const handleLike = (reelId: string) => {
    setLikedReels(prev => ({ ...prev, [reelId]: !prev[reelId] }));
    setReelLikes(prev => ({
      ...prev,
      [reelId]: prev[reelId] + (likedReels[reelId] ? -1 : 1),
    }));
  };

  return (
    <div className="h-screen snap-y-mandatory overflow-y-scroll hide-scrollbar bg-black">
      {reels.map((reel, index) => (
        <div key={reel.id} className="h-screen snap-start relative flex-shrink-0">
          {/* 배경 이미지 */}
          <img
            src={reel.videoThumbnail}
            alt={reel.caption}
            className="w-full h-full object-cover"
          />

          {/* 플레이 버튼 오버레이 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center"
            >
              <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[24px] border-l-white border-b-[14px] border-b-transparent ml-2" />
            </motion.div>
          </div>

          {/* 우측 액션 버튼 */}
          <div className="absolute right-3 bottom-28 flex flex-col items-center gap-6">
            {/* 프로필 */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <img
                src={reel.user.avatar}
                alt={reel.user.displayName}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold border-2 border-black">
                +
              </div>
            </motion.div>

            {/* 좋아요 */}
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handleLike(reel.id)}
              className="flex flex-col items-center gap-1"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={likedReels[reel.id] ? 'liked' : 'not'}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.5 }}
                >
                  <Heart
                    size={30}
                    className={likedReels[reel.id] ? 'text-red-500' : 'text-white'}
                    fill={likedReels[reel.id] ? 'currentColor' : 'none'}
                    strokeWidth={2}
                  />
                </motion.div>
              </AnimatePresence>
              <motion.span
                key={reelLikes[reel.id]}
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white text-xs font-semibold"
              >
                {formatNumber(reelLikes[reel.id])}
              </motion.span>
            </motion.button>

            {/* 댓글 */}
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileTap={{ scale: 0.8 }}
              className="flex flex-col items-center gap-1"
            >
              <MessageCircle size={28} className="text-white" strokeWidth={2} />
              <span className="text-white text-xs font-semibold">{formatNumber(reel.comments)}</span>
            </motion.button>

            {/* 공유 */}
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              whileTap={{ scale: 0.8 }}
              className="flex flex-col items-center gap-1"
            >
              <Share2 size={26} className="text-white" strokeWidth={2} />
              <span className="text-white text-xs font-semibold">{formatNumber(reel.shares)}</span>
            </motion.button>

            {/* 저장 */}
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileTap={{ scale: 0.8 }}
            >
              <Bookmark size={26} className="text-white" strokeWidth={2} />
            </motion.button>

            {/* 더보기 */}
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              whileTap={{ scale: 0.8 }}
            >
              <MoreVertical size={24} className="text-white" strokeWidth={2} />
            </motion.button>
          </div>

          {/* 하단 정보 */}
          <div className="absolute bottom-6 left-4 right-20">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white font-bold text-sm">@{reel.user.username}</span>
                {reel.user.isVerified && (
                  <div className="w-4 h-4 rounded-full gradient-primary flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-white text-sm mb-3 line-clamp-2 leading-relaxed">{reel.caption}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Music size={12} className="text-white" />
                  <span className="text-white text-xs font-medium">{reel.music}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 상단 헤더 */}
          {index === 0 && (
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/40 to-transparent pt-14 px-4 pb-8">
              <h1 className="text-white text-xl font-bold">릴스</h1>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
