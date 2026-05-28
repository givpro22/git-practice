'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import DoubleTapHeart from '@/components/ui/DoubleTapHeart';
import { Post, formatNumber } from '@/data/mockData';

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likes, setLikes] = useState(post.likes);
  const [showHeart, setShowHeart] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const lastTap = useRef(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!isLiked) {
        setIsLiked(true);
        setLikes(l => l + 1);
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
    lastTap.current = now;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(l => isLiked ? l - 1 : l + 1);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pb-4"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar
            src={post.user.avatar}
            alt={post.user.displayName}
            size="sm"
            hasStory={post.user.hasStory}
            isViewed={false}
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm">{post.user.username}</span>
              {post.user.isVerified && (
                <div className="w-4 h-4 rounded-full gradient-primary flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
              )}
            </div>
            {post.location && (
              <span className="text-xs text-text-muted">{post.location}</span>
            )}
          </div>
        </div>
        <button className="p-2 -mr-2 rounded-full hover:bg-bg-subtle transition-colors">
          <MoreHorizontal size={20} className="text-text-secondary" />
        </button>
      </div>

      {/* 이미지 */}
      <div
        className="relative overflow-hidden bg-bg-subtle"
        onClick={handleDoubleTap}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {post.images.map((img, i) => (
            <div key={i} className="w-full flex-shrink-0 aspect-square relative">
              <img
                src={img}
                alt={`게시물 이미지 ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <DoubleTapHeart show={showHeart} />

        {/* 이미지 네비게이션 */}
        {post.images.length > 1 && (
          <>
            {currentImage > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentImage(c => c - 1); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            {currentImage < post.images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentImage(c => c + 1); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass flex items-center justify-center"
              >
                <ChevronRight size={16} />
              </button>
            )}
            {/* 도트 인디케이터 */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {post.images.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === currentImage ? 16 : 6,
                    backgroundColor: i === currentImage ? '#8B5CF6' : 'rgba(255,255,255,0.5)',
                  }}
                  className="h-1.5 rounded-full"
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 액션 버튼 */}
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.75 }}
            onClick={handleLike}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isLiked ? 'liked' : 'not-liked'}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                <Heart
                  size={26}
                  className={isLiked ? 'text-red-500' : 'text-text-primary'}
                  fill={isLiked ? 'currentColor' : 'none'}
                  strokeWidth={1.8}
                />
              </motion.div>
            </AnimatePresence>
          </motion.button>
          <motion.button whileTap={{ scale: 0.85 }} onClick={() => setShowComments(!showComments)}>
            <MessageCircle size={25} className="text-text-primary" strokeWidth={1.8} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.85 }}>
            <Send size={24} className="text-text-primary" strokeWidth={1.8} />
          </motion.button>
        </div>
        <motion.button
          whileTap={{ scale: 0.75 }}
          onClick={() => setIsSaved(!isSaved)}
        >
          <Bookmark
            size={25}
            className={isSaved ? 'text-text-primary' : 'text-text-primary'}
            fill={isSaved ? 'currentColor' : 'none'}
            strokeWidth={1.8}
          />
        </motion.button>
      </div>

      {/* 좋아요 수 */}
      <div className="px-4 pt-2">
        <motion.p
          key={likes}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-bold text-sm"
        >
          좋아요 {formatNumber(likes)}개
        </motion.p>
      </div>

      {/* 캡션 */}
      <div className="px-4 pt-1.5">
        <p className="text-sm leading-relaxed">
          <span className="font-semibold mr-1.5">{post.user.username}</span>
          <span className="text-text-primary whitespace-pre-line">
            {post.caption.split(/(#\S+)/g).map((part, i) =>
              part.startsWith('#') ? (
                <span key={i} className="text-violet-primary font-medium">{part}</span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </span>
        </p>
      </div>

      {/* 댓글 미리보기 */}
      {post.comments.length > 0 && (
        <div className="px-4 pt-2">
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-text-muted text-sm"
          >
            댓글 {post.comments.length}개 모두 보기
          </button>

          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2 py-1.5">
                    <img src={comment.user.avatar} alt="" className="w-6 h-6 rounded-full mt-0.5" />
                    <p className="text-sm flex-1">
                      <span className="font-semibold mr-1">{comment.user.username}</span>
                      {comment.text}
                    </p>
                    <button className="mt-1">
                      <Heart size={12} className="text-text-muted" strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 시간 */}
      <p className="px-4 pt-1.5 text-[11px] text-text-muted">{post.timestamp}</p>
    </motion.article>
  );
}
