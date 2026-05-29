'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Avatar from '@/components/ui/Avatar';
import { stories, currentUser } from '@/data/mockData';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function StoryCarousel() {
  return (
    <div className="px-4 py-3">
      <div className="flex gap-3 overflow-x-auto hide-scrollbar">
        {/* 내 스토리 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-1.5 flex-shrink-0"
        >
          <div className="relative">
            <Avatar
              src={currentUser.avatar}
              alt="내 스토리"
              size="md"
              hasStory={false}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full gradient-primary flex items-center justify-center border-2 border-white">
              <Plus size={14} className="text-white" strokeWidth={3} />
            </div>
          </div>
          <span className="text-[11px] text-text-secondary font-medium">내 스토리</span>
        </motion.div>

        {/* 다른 사용자 스토리 */}
        {stories.filter(s => s.user.id !== 'me').map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: (i + 1) * 0.05 }}
          >
            <Link
              href={`/stories?id=${story.id}`}
              className="flex flex-col items-center gap-1.5 flex-shrink-0"
            >
              <Avatar
                src={story.user.avatar}
                alt={story.user.displayName}
                size="md"
                hasStory={true}
                isViewed={story.isViewed}
              />
              <span className="text-[11px] text-text-secondary font-medium w-16 text-center truncate">
                {story.user.username.split('_')[0]}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
