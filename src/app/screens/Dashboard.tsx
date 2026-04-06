import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  User,
  Clock,
  Package,
  DollarSign,
  MessageCircle,
  Settings,
  History,
  Star,
  Target,
  Award,
  MapPin,
  Bike,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { IncomingOrderPopup } from '../components/IncomingOrderPopup';
import { useAppTheme } from '../utils/useAppTheme';

export function Dashboard() {
  const navigate = useNavigate();
  const theme = useAppTheme();
  const [isOnline, setIsOnline] = useState(() => {
    return localStorage.getItem('isOnline') === 'true';
  });
  const [showIncomingOrder, setShowIncomingOrder] = useState(false);
  const [stats] = useState({
    todayEarnings: 456.50,
    completedOrders: 12,
    hours: 5.5,
    rating: 4.8,
  });

  const playNotificationSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Bell sound: sequence of tones
      const playTone = (freq: number, startTime: number, duration: number, gain: number) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.frequency.setValueAtTime(freq, startTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };
      const now = audioCtx.currentTime;
      playTone(880, now, 0.3, 0.6);
      playTone(1100, now + 0.15, 0.3, 0.5);
      playTone(1320, now + 0.3, 0.5, 0.7);
    } catch {
      // Fallback: no sound if audio context unavailable
    }
  };

  const checkAutoAccept = () => {
    return localStorage.getItem('autoAcceptOrders') === 'true';
  };

  useEffect(() => {
    localStorage.setItem('isOnline', isOnline.toString());
  }, [isOnline]);

  useEffect(() => {
    if (isOnline) {
      const activeOrders = JSON.parse(localStorage.getItem('activeOrders') || '[]');
      const newOrders = activeOrders.filter((order: any) => order.status === 'new');

      if (newOrders.length > 0) {
        const timer = setTimeout(() => {
          playNotificationSound();
          if (checkAutoAccept()) {
            const order = newOrders[0];
            const updatedOrders = activeOrders.map((o: any) =>
              o.id === order.id ? { ...o, status: 'accepted' } : o
            );
            localStorage.setItem('activeOrders', JSON.stringify(updatedOrders));
            navigate(`/order/${order.id}`);
          } else {
            setShowIncomingOrder(true);
          }
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          playNotificationSound();
          if (!checkAutoAccept()) {
            setShowIncomingOrder(true);
          }
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [isOnline, navigate]);

  const handleAcceptOrder = (orderId: string) => {
    setShowIncomingOrder(false);
    navigate(`/order/${orderId}`);
  };

  const handleRejectOrder = () => {
    setShowIncomingOrder(false);
  };

  const quickActions = [
    {
      icon: DollarSign,
      label: 'Kazançlarım',
      color: 'from-green-400 to-green-600',
      action: () => navigate('/earnings'),
    },
    {
      icon: History,
      label: 'Geçmiş',
      color: 'from-blue-400 to-blue-600',
      action: () => navigate('/history'),
    },
    {
      icon: MessageCircle,
      label: 'Destek',
      color: 'from-purple-400 to-purple-600',
      action: () => navigate('/support'),
    },
    {
      icon: Settings,
      label: 'Ayarlar',
      color: 'from-gray-400 to-gray-600',
      action: () => navigate('/profile'),
    },
  ];

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: `linear-gradient(to bottom, #f9fafb, #f3f4f6)` }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: theme.primary }}
            >
              <Package className="w-5 h-5" style={{ color: theme.secondary }} />
            </div>
            <div>
              <h1 className="text-lg font-bold" style={{ color: theme.secondary }}>Ana Sayfa</h1>
              <p className="text-xs text-gray-500">Hoş geldin, Kurye!</p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/notifications')}
              className="w-9 h-9 rounded-full relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
              className="w-9 h-9 rounded-full"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Online Status Card - MOBILE OPTIMIZED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl shadow-2xl transition-all duration-500 relative overflow-hidden ${
            isOnline
              ? 'bg-gradient-to-br from-green-400 via-green-500 to-green-600'
              : 'bg-gradient-to-br from-gray-400 to-gray-500'
          }`}
        >
          {/* Background Pattern */}
          {isOnline && (
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
          )}

          <div className="relative z-10 p-5">
            {/* Top Row: Icon + Status + Toggle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Animated Delivery Icon */}
                <AnimatePresence mode="wait">
                  {isOnline ? (
                    <motion.div
                      key="icon-on"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0, y: [0, -8, 0] }}
                      exit={{ scale: 0 }}
                      transition={{
                        scale: { duration: 0.4 },
                        rotate: { duration: 0.4 },
                        y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                      }}
                      className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                    >
                      <Bike className="w-8 h-8 text-green-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon-off"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-14 h-14 bg-white/30 rounded-2xl flex items-center justify-center flex-shrink-0"
                    >
                      <Bike className="w-8 h-8 text-white/60" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}
                  </h2>
                  <p className="text-white/80 text-sm">
                    {isOnline ? 'Sipariş kabul ediyorsun' : 'Sipariş almak için aç'}
                  </p>
                </div>
              </div>

              {/* Toggle Button - compact for mobile */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsOnline(!isOnline)}
                  className={`relative w-16 h-8 rounded-full transition-all duration-300 shadow-lg ${
                    isOnline ? 'bg-white' : 'bg-gray-500'
                  }`}
                >
                  <motion.div
                    animate={{ x: isOnline ? 32 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-lg flex items-center justify-center pointer-events-none ${
                      isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  >
                    <span className="text-white text-xs font-bold pointer-events-none">
                      {isOnline ? '✓' : '×'}
                    </span>
                  </motion.div>
                </button>
                <span className="text-xs text-white/80 font-bold uppercase tracking-wide">
                  {isOnline ? 'AKTİF' : 'KAPALI'}
                </span>
              </div>
            </div>

            {/* Status Indicator */}
            {isOnline && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-white/20 rounded-2xl p-3 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                  <span className="text-white font-semibold text-sm">
                    Yeni siparişler için hazırsın
                  </span>
                </div>
                <MapPin className="w-5 h-5 text-white animate-pulse" />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Today's Stats */}
        <div>
          <h3 className="text-sm font-bold text-gray-600 uppercase mb-3 tracking-wide px-1">
            Bugünün Özeti
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: DollarSign, value: `₺${stats.todayEarnings}`, label: 'Günlük kazanç', color: 'from-green-100 to-green-200', iconColor: 'text-green-600' },
              { icon: Package, value: stats.completedOrders, label: 'Tamamlanan', color: 'from-blue-100 to-blue-200', iconColor: 'text-blue-600' },
              { icon: Clock, value: `${stats.hours}h`, label: 'Çalışma saati', color: 'from-purple-100 to-purple-200', iconColor: 'text-purple-600' },
              { icon: Star, value: stats.rating, label: 'Puan ortalaması', color: 'from-yellow-100 to-yellow-200', iconColor: 'text-yellow-600' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-md"
              >
                <div className={`w-11 h-11 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-0.5">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Weekly Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-5 shadow-xl text-white"
          style={{ background: `linear-gradient(to right, ${theme.secondary}, #2a2a2a)` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: theme.primary }}>
                <Award className="w-6 h-6" style={{ color: theme.secondary }} />
              </div>
              <div>
                <h3 className="font-bold" style={{ color: theme.primary }}>Haftalık Hedef</h3>
                <p className="text-xs text-white/70">50 teslimat yap, bonus kazan!</p>
              </div>
            </div>
            <Target className="w-7 h-7 text-white/50" />
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-full rounded-full"
              style={{ backgroundColor: theme.primary }}
            />
          </div>
          <p className="text-right text-xs mt-1.5 font-semibold text-white/80">30 / 50 Teslimat</p>
        </motion.div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-bold text-gray-600 uppercase mb-3 tracking-wide px-1">
            Hızlı Erişim
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={action.action}
                className={`h-24 bg-gradient-to-br ${action.color} rounded-2xl shadow-md active:scale-95 transition-all text-white font-bold flex flex-col items-center justify-center gap-2`}
              >
                <action.icon className="w-7 h-7" />
                <span className="text-sm">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 mb-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: theme.primary }}
            >
              <MessageCircle className="w-6 h-6" style={{ color: theme.secondary }} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold" style={{ color: theme.secondary }}>Yardıma mı ihtiyacın var?</h3>
              <p className="text-xs text-gray-500">7/24 destek ekibimiz burada</p>
            </div>
          </div>
          <Button
            onClick={() => navigate('/support')}
            className="w-full h-12 font-bold rounded-xl text-sm shadow-md"
            style={{ backgroundColor: theme.secondary, color: theme.primary }}
          >
            <MessageCircle className="mr-2 w-4 h-4" />
            Canlı Desteğe Bağlan
          </Button>
        </motion.div>
      </div>

      {/* Incoming Order Popup */}
      <AnimatePresence>
        {showIncomingOrder && (
          <IncomingOrderPopup
            onAccept={handleAcceptOrder}
            onReject={handleRejectOrder}
          />
        )}
      </AnimatePresence>
    </div>
  );
}