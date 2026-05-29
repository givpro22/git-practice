'use client';

import React from 'react';

export default function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-shimmer rounded-xl ${className}`} />
  );
}

export function FeedSkeleton() {
  return (
    <div className="space-y-6 px-4">
      {/* 스토리 스켈레톤 */}
      <div className="flex gap-4 overflow-hidden py-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="w-12 h-3" />
          </div>
        ))}
      </div>

      {/* 포스트 스켈레톤 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="w-28 h-3.5" />
              <Skeleton className="w-16 h-2.5" />
            </div>
          </div>
          <Skeleton className="w-full h-[400px] rounded-2xl" />
          <div className="flex gap-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
          <Skeleton className="w-24 h-3" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-2/3 h-3" />
        </div>
      ))}
    </div>
  );
}
