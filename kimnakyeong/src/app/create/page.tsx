'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  X,
  MapPin,
  Hash,
  Sparkles,
  ChevronDown,
  Camera,
  ArrowLeft,
} from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import { currentUser } from '@/data/mockData';
import Link from 'next/link';

const hashtagSuggestions = [
  '#일상', '#감성', '#모아빗', '#오늘', '#소확행',
  '#카페투어', '#먹스타그램', '#여행', '#셀카', '#OOTD',
];

const aiCaptions = [
  '오늘도 빛나는 하루 ✨ 소중한 순간을 모아빗에 담아요',
  '일상의 작은 행복, 여기서 만나요 🌸',
  '이 순간을 영원히 기억하고 싶어 💜',
];

export default function CreatePage() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [showHashtags, setShowHashtags] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // 시뮬레이션: 더미 이미지 추가
    setSelectedImages(prev => [
      ...prev,
      `https://picsum.photos/seed/upload${Date.now()}/800/800`,
    ]);
  }, []);

  const addDemoImage = () => {
    setSelectedImages(prev => [
      ...prev,
      `https://picsum.photos/seed/upload${Date.now()}/800/800`,
    ]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AppShell>
      {/* 헤더 */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass px-4 py-3 flex items-center justify-between"
      >
        <Link href="/" className="p-1">
          <ArrowLeft size={24} strokeWidth={1.8} />
        </Link>
        <h1 className="font-bold text-lg">새 게시물</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="gradient-primary text-white font-semibold text-sm px-5 py-2 rounded-full"
          onClick={() => alert('게시물이 공유되었습니다! 🎉')}
          disabled={selectedImages.length === 0}
        >
          공유
        </motion.button>
      </motion.header>

      <div className="px-4 py-4 space-y-5">
        {/* 이미지 업로드 영역 */}
        {selectedImages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={addDemoImage}
            className={`relative aspect-square rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-violet-primary bg-violet-primary/5 scale-[1.02]'
                : 'border-border-light bg-bg-subtle hover:border-violet-light hover:bg-violet-primary/5'
            }`}
          >
            <motion.div
              animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
              className="w-20 h-20 rounded-full gradient-primary/10 bg-violet-primary/10 flex items-center justify-center"
            >
              <Camera size={36} className="text-violet-primary" strokeWidth={1.5} />
            </motion.div>
            <div className="text-center">
              <p className="font-semibold text-text-primary">사진을 선택하거나 드래그하세요</p>
              <p className="text-sm text-text-muted mt-1">클릭하면 데모 이미지가 추가됩니다</p>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-2 rounded-full bg-violet-primary/10 text-violet-primary text-sm font-medium">
                <ImageIcon size={14} className="inline mr-1.5" />
                사진
              </div>
              <div className="px-4 py-2 rounded-full bg-pink-primary/10 text-pink-primary text-sm font-medium">
                📹 동영상
              </div>
            </div>
          </motion.div>
        ) : (
          <div>
            {/* 선택된 이미지 미리보기 */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
              {selectedImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative flex-shrink-0 w-60 aspect-square rounded-2xl overflow-hidden"
                >
                  <img src={img} alt={`업로드 ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center"
                  >
                    <X size={14} className="text-white" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-xs font-medium">
                    {i + 1}/{selectedImages.length}
                  </div>
                </motion.div>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={addDemoImage}
                className="flex-shrink-0 w-20 aspect-square rounded-2xl border-2 border-dashed border-border-light flex items-center justify-center"
              >
                <ImageIcon size={24} className="text-text-muted" />
              </motion.button>
            </div>
          </div>
        )}

        {/* 캡션 입력 */}
        <div className="card-soft p-4">
          <div className="flex items-start gap-3">
            <img src={currentUser.avatar} alt="나" className="w-9 h-9 rounded-full" />
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="문구를 작성하세요..."
              rows={4}
              className="flex-1 bg-transparent text-sm resize-none placeholder:text-text-muted leading-relaxed"
            />
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-light">
            <span className="text-xs text-text-muted">{caption.length}/2,200</span>
          </div>
        </div>

        {/* 위치 추가 */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowLocationInput(!showLocationInput)}
          className="w-full card-soft p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-violet-primary" />
            <span className="text-sm font-medium">
              {location || '위치 추가'}
            </span>
          </div>
          <ChevronDown size={18} className={`text-text-muted transition-transform ${showLocationInput ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {showLocationInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden -mt-3"
            >
              <div className="card-soft p-4 rounded-t-none">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="위치를 검색하세요..."
                  className="w-full bg-bg-subtle rounded-xl px-4 py-2.5 text-sm"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {['서울 연남동', '서울 성수동', '제주도', '부산 해운대', '카페'].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { setLocation(loc); setShowLocationInput(false); }}
                      className="px-3 py-1.5 bg-bg-subtle rounded-full text-xs font-medium text-text-secondary hover:bg-violet-primary/10 hover:text-violet-primary transition-colors"
                    >
                      📍 {loc}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 해시태그 추천 */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowHashtags(!showHashtags)}
          className="w-full card-soft p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Hash size={20} className="text-pink-primary" />
            <span className="text-sm font-medium">해시태그 추천</span>
          </div>
          <ChevronDown size={18} className={`text-text-muted transition-transform ${showHashtags ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {showHashtags && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden -mt-3"
            >
              <div className="card-soft p-4 rounded-t-none">
                <div className="flex flex-wrap gap-2">
                  {hashtagSuggestions.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setCaption(prev => prev + ' ' + tag)}
                      className="px-3 py-1.5 bg-violet-primary/10 rounded-full text-xs font-medium text-violet-primary hover:bg-violet-primary/20 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI 캡션 추천 */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAI(!showAI)}
          className="w-full card-soft p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-amber-primary" />
            <span className="text-sm font-medium">AI 캡션 추천</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold gradient-primary text-white">NEW</span>
          </div>
          <ChevronDown size={18} className={`text-text-muted transition-transform ${showAI ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {showAI && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden -mt-3"
            >
              <div className="card-soft p-4 rounded-t-none space-y-2">
                {aiCaptions.map((cap, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCaption(cap)}
                    className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-violet-primary/5 to-pink-primary/5 hover:from-violet-primary/10 hover:to-pink-primary/10 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles size={14} className="text-amber-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-text-primary">{cap}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
