'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface DoubleTapHeartProps {
  show: boolean;
}

export default function DoubleTapHeart({ show }: DoubleTapHeartProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <Heart
            size={80}
            className="text-white drop-shadow-lg"
            fill="white"
            strokeWidth={0}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
