'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideNav = pathname.startsWith('/stories') || pathname.startsWith('/reels');

  return (
    <div className="relative min-h-screen">
      <main className={hideNav ? '' : 'pb-safe'}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
