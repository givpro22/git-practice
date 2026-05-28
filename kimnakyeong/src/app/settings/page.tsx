'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Moon,
  Sun,
  User,
  Lock,
  Bell,
  Eye,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import Link from 'next/link';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // 마운트 시 바디 클래스 확인
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const sections = [
    {
      title: '계정 설정',
      items: [
        { icon: User, label: '개인정보 설정', desc: '이메일, 전화번호 수정' },
        { icon: Lock, label: '비밀번호 및 보안', desc: '비밀번호 변경, 2단계 인증' },
      ],
    },
    {
      title: '알림 및 표시',
      items: [
        { icon: Bell, label: '푸시 알림', desc: '알림 수신 방법 설정' },
      ],
    },
    {
      title: '개인정보 보호 및 보안',
      items: [
        { icon: Eye, label: '계정 공개 범위', desc: '비공개 계정 설정' },
        { icon: ShieldCheck, label: '차단된 계정', desc: '차단 목록 및 차단 해제' },
      ],
    },
    {
      title: '지원',
      items: [
        { icon: HelpCircle, label: '고객 센터 및 도움말', desc: '자주 묻는 질문, 문의하기' },
      ],
    },
  ];

  return (
    <AppShell>
      {/* 헤더 */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass px-4 py-3 flex items-center justify-between"
      >
        <Link href="/profile" className="p-1">
          <ArrowLeft size={24} strokeWidth={1.8} />
        </Link>
        <h1 className="font-bold text-lg">설정</h1>
        <div className="w-8" />
      </motion.header>

      <div className="px-4 py-4 space-y-6">
        {/* 다크모드 컨트롤 카드 */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={toggleDarkMode}
          className="card-soft p-4 flex items-center justify-between cursor-pointer border border-border-light/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary/10 bg-violet-primary/10 flex items-center justify-center text-violet-primary">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </div>
            <div>
              <span className="font-semibold text-sm block">다크 모드</span>
              <span className="text-xs text-text-muted">어두운 테마로 눈 보호</span>
            </div>
          </div>
          <div className="w-12 h-7 bg-bg-subtle rounded-full p-1 relative flex items-center border border-border-light">
            <motion.div
              layout
              className="w-5 h-5 rounded-full gradient-primary"
              animate={{ x: darkMode ? 20 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        </motion.div>

        {/* 섹션 리스트 */}
        {sections.map((section, sIdx) => (
          <div key={section.title} className="space-y-2.5">
            <h2 className="text-xs font-bold text-text-muted px-1.5 uppercase tracking-wider">
              {section.title}
            </h2>
            <div className="card-soft divide-y divide-border-light/50 overflow-hidden">
              {section.items.map((item, iIdx) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-bg-subtle/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-text-secondary">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                      <div>
                        <span className="font-semibold text-sm block text-text-primary">
                          {item.label}
                        </span>
                        <span className="text-xs text-text-muted">{item.desc}</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-text-muted" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {/* 로그아웃 버튼 */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => alert('로그아웃 되었습니다.')}
          className="w-full card-soft p-4 flex items-center justify-center gap-2 text-red-500 font-semibold text-sm border border-red-500/10 hover:bg-red-500/5 transition-colors"
        >
          <LogOut size={18} />
          로그아웃
        </motion.button>
      </div>
    </AppShell>
  );
}
