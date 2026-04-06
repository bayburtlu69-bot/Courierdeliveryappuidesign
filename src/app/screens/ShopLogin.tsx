import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Store, Lock, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export function ShopLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuspendedPopup, setShowSuspendedPopup] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      // Check if this email belongs to a suspended shop
      const shops = JSON.parse(localStorage.getItem('shops') || '[]');
      const suspendedShop = shops.find(
        (s: any) =>
          (s.loginEmail === email || s.email === email) && s.status === 'suspended'
      );

      if (suspendedShop) {
        setShowSuspendedPopup(true);
        return;
      }

      localStorage.setItem('adminRole', 'shop');
      localStorage.setItem('adminEmail', email);
      toast.success('Hoş geldiniz, Dükkan Sahibi!');
      navigate('/shop/dashboard');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-500 via-green-600 to-green-700 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#121212] mb-2">Baymoto</h1>
          <h2 className="text-xl font-bold text-gray-700 mb-1">Dükkan Sahibi Girişi</h2>
          <p className="text-gray-600">Mağazanızı yönetin ve analitiği görün</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" />
              E-posta Adresi
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="dukkan@baymoto.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4" />
              Şifre
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg"
          >
            Dükkan Sahibi Olarak Giriş Yap
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/admin-selector')}
            className="text-gray-500 hover:text-[#121212] text-sm transition-colors font-semibold"
          >
            ← Rol seçimine geri dön
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Sistemdeki herhangi bir mağaza e-postasıyla giriş yapabilirsiniz
          </p>
        </div>
      </motion.div>

      {/* Suspended Account Popup */}
      <AnimatePresence>
        {showSuspendedPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowSuspendedPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center"
            >
              {/* Animated Emojis */}
              <div className="flex justify-center gap-2 mb-4">
                {['🚫', '⚠️', '🔒'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.15, type: 'spring', stiffness: 300 }}
                    className="text-4xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-[#121212] mb-3"
              >
                Hesap Askıya Alındı
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 mb-5"
              >
                <p className="text-orange-800 text-sm leading-relaxed">
                  🏪 <strong>Baymoto</strong> ile iletişime geçerek askıya alınmış dükkanınızı aktif ettirebilirsiniz.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <a
                  href="tel:08501234567"
                  className="flex items-center justify-center gap-2 w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors"
                >
                  📞 Baymoto'yu Ara
                </a>
                <a
                  href="mailto:destek@baymoto.com"
                  className="flex items-center justify-center gap-2 w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-colors"
                >
                  ✉️ E-posta Gönder
                </a>
                <button
                  onClick={() => setShowSuspendedPopup(false)}
                  className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-semibold transition-colors"
                >
                  Kapat
                </button>
              </motion.div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [-20, -60],
                    x: [(i - 3) * 15, (i - 3) * 25],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeOut',
                  }}
                  className="absolute text-xl pointer-events-none"
                  style={{ bottom: '20%', left: '50%' }}
                >
                  {i % 3 === 0 ? '⚠️' : i % 3 === 1 ? '🔴' : '❌'}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
