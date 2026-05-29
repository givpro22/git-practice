'use client';

import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  hasStory?: boolean;
  isViewed?: boolean;
  isOnline?: boolean;
  onClick?: () => void;
}

const sizeMap = {
  xs: 'w-8 h-8',
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-24 h-24',
};

const ringMap = {
  xs: 'w-10 h-10',
  sm: 'w-12 h-12',
  md: 'w-[66px] h-[66px]',
  lg: 'w-[88px] h-[88px]',
  xl: 'w-[104px] h-[104px]',
};

const onlineDotMap = {
  xs: 'w-2.5 h-2.5 border',
  sm: 'w-3 h-3 border-2',
  md: 'w-3.5 h-3.5 border-2',
  lg: 'w-4 h-4 border-2',
  xl: 'w-5 h-5 border-[3px]',
};

export default function Avatar({
  src,
  alt,
  size = 'md',
  hasStory = false,
  isViewed = false,
  isOnline = false,
  onClick,
}: AvatarProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex-shrink-0 flex items-center justify-center"
      type="button"
    >
      {hasStory ? (
        <div
          className={`${ringMap[size]} rounded-full p-[2.5px] ${
            isViewed ? 'bg-gray-300' : 'gradient-story-ring'
          }`}
        >
          <div className="w-full h-full rounded-full bg-white p-[2px]">
            <img
              src={src}
              alt={alt}
              className={`w-full h-full rounded-full object-cover`}
            />
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${sizeMap[size]} rounded-full object-cover`}
        />
      )}
      {isOnline && (
        <div
          className={`absolute bottom-0 right-0 ${onlineDotMap[size]} bg-emerald-400 rounded-full border-white`}
        />
      )}
    </button>
  );
}
