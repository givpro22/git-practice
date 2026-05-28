'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { stories } from '@/data/mockData';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function StoryViewerInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storyId = searchParams.get('id');

  const [currentStoryIndex, setCurrentStoryIndex] = useState(
    Math.max(0, stories.findIndex(s => s.id === storyId))
  );
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = stories[currentStoryIndex];
  const currentItem = currentStory?.items[currentItemIndex];

  const goNext = useCallback(() => {
    if (currentItemIndex < currentStory.items.length - 1) {
      setCurrentItemIndex(i => i + 1);
      setProgress(0);
    } else if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(i => i + 1);
      setCurrentItemIndex(0);
      setProgress(0);
    } else {
      router.push('/');
    }
  }, [currentItemIndex, currentStory, currentStoryIndex, router]);

  const goPrev = useCallback(() => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(i => i - 1);
      setProgress(0);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex(i => i - 1);
      setCurrentItemIndex(0);
      setProgress(0);
    }
  }, [currentItemIndex, currentStoryIndex]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          goNext();
          return 0;
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPaused, goNext]);

  if (!currentStory || !currentItem) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
    >
      <div className="relative w-full max-w-[430px] h-full">
        {/* 이미지 */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentItem.id}
            src={currentItem.image}
            alt="스토리"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* 상단 오버레이 */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent pt-3 px-3 pb-16">
          {/* 프로그레스 바 */}
          <div className="flex gap-1 mb-4">
            {currentStory.items.map((_, i) => (
              <div key={i} className="flex-1 story-progress-bg">
                <div
                  className="story-progress-fill"
                  style={{
                    width: i < currentItemIndex ? '100%' : i === currentItemIndex ? `${progress}%` : '0%',
                    transitionDuration: i === currentItemIndex ? '100ms' : '0ms',
                  }}
                />
              </div>
            ))}
          </div>

          {/* 사용자 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={currentStory.user.avatar}
                alt={currentStory.user.displayName}
                className="w-9 h-9 rounded-full border-2 border-white/30"
              />
              <div>
                <span className="text-white font-semibold text-sm">{currentStory.user.username}</span>
                <span className="text-white/60 text-xs ml-2">{currentItem.timestamp}</span>
              </div>
            </div>
            <button
              onClick={() => router.push('/')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* 탭 영역 */}
        <div className="absolute inset-0 flex" style={{ top: '100px', bottom: '100px' }}>
          <button
            className="w-1/3 h-full"
            onClick={goPrev}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          />
          <div className="w-1/3 h-full"
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          />
          <button
            className="w-1/3 h-full"
            onClick={goNext}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          />
        </div>

        {/* 하단 입력 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-16">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white/15 rounded-full px-4 py-2.5 border border-white/20">
              <input
                type="text"
                placeholder="메시지 보내기..."
                className="bg-transparent text-white text-sm w-full placeholder:text-white/50"
              />
            </div>
            <button className="p-2">
              <Heart size={26} className="text-white" strokeWidth={1.8} />
            </button>
            <button className="p-2">
              <Send size={24} className="text-white" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* 좌우 네비 화살표 */}
        {currentStoryIndex > 0 && (
          <button
            onClick={() => { setCurrentStoryIndex(i => i - 1); setCurrentItemIndex(0); setProgress(0); }}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
        )}
        {currentStoryIndex < stories.length - 1 && (
          <button
            onClick={() => { setCurrentStoryIndex(i => i + 1); setCurrentItemIndex(0); setProgress(0); }}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"
          >
            <ChevronRight size={18} className="text-white" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function StoriesPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black z-[100]" />}>
      <StoryViewerInner />
    </Suspense>
  );
}
