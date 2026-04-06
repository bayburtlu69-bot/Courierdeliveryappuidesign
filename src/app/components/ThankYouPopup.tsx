import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Star, ThumbsUp, Heart, Sparkles } from 'lucide-react';

interface ThankYouPopupProps {
  onClose: () => void;
}

const thankYouMessages = [
  { text: 'Harika bir teslimat! Süpersin! 🎉', emoji: '🚀', color: 'from-blue-400 to-blue-600' },
  { text: 'Mükemmel! Bir yıldızsın! ⭐', emoji: '⭐', color: 'from-yellow-400 to-yellow-600' },
  { text: 'Bravo! Muhteşem bir iş çıkardın! 👏', emoji: '💪', color: 'from-green-400 to-green-600' },
  { text: 'Çok iyisin! Böyle devam! 🔥', emoji: '🔥', color: 'from-red-400 to-red-600' },
  { text: 'Süper teslimat! Harikasın! 🌟', emoji: '🌟', color: 'from-purple-400 to-purple-600' },
  { text: 'Mükemmel bir kurye! Teşekkürler! 💛', emoji: '💛', color: 'from-orange-400 to-orange-600' },
  { text: 'Profesyonel teslimat! Aferin! 🎯', emoji: '🎯', color: 'from-pink-400 to-pink-600' },
  { text: 'Harika iş! Devam böyle! 🚴', emoji: '🏍️', color: 'from-indigo-400 to-indigo-600' },
  { text: 'Muhteşem performans! Tebrikler! 🏆', emoji: '🏆', color: 'from-yellow-500 to-yellow-700' },
  { text: 'Tam zamanında! Süpersin! ⚡', emoji: '⚡', color: 'from-cyan-400 to-cyan-600' },
  { text: 'Harika bir hizmet! Efsanesin! 💎', emoji: '💎', color: 'from-teal-400 to-teal-600' },
  { text: 'Çok başarılı! Gurur duyuyoruz! 🎖️', emoji: '🎖️', color: 'from-green-500 to-green-700' },
  { text: 'Olağanüstü teslimat! Bravo! 🌠', emoji: '🌠', color: 'from-violet-400 to-violet-600' },
  { text: 'Harika bir iş çıkardın! Teşekkürler! ❤️', emoji: '❤️', color: 'from-rose-400 to-rose-600' },
  { text: 'Süper hızlı! Mükemmelsin! 💫', emoji: '💫', color: 'from-amber-400 to-amber-600' },
];

export function ThankYouPopup({ onClose }: ThankYouPopupProps) {
  // Rastgele bir mesaj seç
  const randomMessage = thankYouMessages[Math.floor(Math.random() * thankYouMessages.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className={`bg-gradient-to-br ${randomMessage.color} rounded-3xl p-8 shadow-2xl max-w-sm w-full relative overflow-hidden`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full translate-y-20 -translate-x-20"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Big Emoji Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 10, 
              stiffness: 200,
              delay: 0.2 
            }}
            className="text-8xl mb-6"
          >
            {randomMessage.emoji}
          </motion.div>

          {/* Floating Stars */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0, 1, 0], 
                y: [-20, -60, -100],
                x: [(i - 2) * 15, (i - 2) * 25, (i - 2) * 35]
              }}
              transition={{ 
                duration: 2, 
                delay: 0.3 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute top-20 left-1/2"
              style={{ marginLeft: `${(i - 2) * 20}px` }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          ))}

          {/* Message */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-white mb-3 drop-shadow-lg"
          >
            Tebrikler!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-white/95 mb-8 font-semibold"
          >
            {randomMessage.text}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/20 backdrop-blur-md rounded-2xl p-4 mb-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Heart className="w-4 h-4 text-white" />
                  <span className="text-2xl font-bold text-white">+5</span>
                </div>
                <p className="text-xs text-white/80">Puan</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <ThumbsUp className="w-4 h-4 text-white" />
                  <span className="text-2xl font-bold text-white">+1</span>
                </div>
                <p className="text-xs text-white/80">Başarı</p>
              </div>
            </div>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={onClose}
              className="w-full h-14 bg-white hover:bg-white/90 text-gray-900 font-bold text-lg rounded-2xl shadow-xl"
            >
              Rica Ederim! 🚀
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
