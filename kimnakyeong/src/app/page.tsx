'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppShell from '@/components/layout/AppShell';
import StoryCarousel from '@/components/feed/StoryCarousel';
import PostCard from '@/components/feed/PostCard';
import { FeedSkeleton } from '@/components/ui/Skeleton';
import { posts } from '@/data/mockData';
import { Bell, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppShell>
      {/* 상단 헤더 */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 glass px-4 py-3 flex items-center justify-between"
      >
        <h1 className="text-2xl font-bold gradient-text tracking-tight">모아빗</h1>
        <div className="flex items-center gap-1">
          <Link href="/notifications" className="relative p-2 rounded-full hover:bg-bg-subtle/50 transition-colors">
            <Bell size={23} strokeWidth={1.8} className="text-text-primary" />
            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </Link>
          <Link href="/messages" className="relative p-2 rounded-full hover:bg-bg-subtle/50 transition-colors">
            <MessageSquare size={23} strokeWidth={1.8} className="text-text-primary" />
            <div className="absolute top-1 right-0.5 min-w-[18px] h-[18px] gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">3</span>
            </div>
          </Link>
        </div>
      </motion.header>

      {isLoading ? (
        <FeedSkeleton />
      ) : (
        <div>
          {/* 스토리 */}
          <StoryCarousel />

          {/* 구분선 */}
          <div className="h-[0.5px] bg-border-light mx-4" />

          {/* 피드 */}
          <div className="divide-y divide-border-light/50">
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* 추천 섹션 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="px-4 py-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-white text-2xl">✨</span>
            </div>
            <h3 className="font-bold text-lg mb-1">모두 확인했어요!</h3>
            <p className="text-text-secondary text-sm">
              지난 3일간의 새로운 게시물을 모두 확인했습니다
            </p>
          </motion.div>
        </div>
      )}
    </AppShell>
  );
}
