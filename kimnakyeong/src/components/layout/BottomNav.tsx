'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  Search,
  PlusSquare,
  Heart,
  User,
  Film,
} from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: '홈' },
  { href: '/explore', icon: Search, label: '탐색' },
  { href: '/reels', icon: Film, label: '릴스' },
  { href: '/create', icon: PlusSquare, label: '만들기' },
  { href: '/notifications', icon: Heart, label: '알림' },
  { href: '/profile', icon: User, label: '프로필' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[398px]">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
        className="glass rounded-[28px] px-2 py-2 flex items-center justify-around shadow-lg shadow-black/5"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="relative flex items-center justify-center"
              >
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 gradient-primary rounded-2xl -m-2"
                    style={{ padding: '20px' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {item.href === '/create' ? (
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? '' : 'gradient-primary'}`}>
                    <Icon
                      size={22}
                      className="text-white relative z-10"
                      strokeWidth={isActive ? 2.5 : 1.8}
                    />
                  </div>
                ) : (
                  <Icon
                    size={24}
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-text-secondary'
                    }`}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    fill={isActive && (item.href === '/' || item.href === '/notifications') ? 'currentColor' : 'none'}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
