import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Bell,
  Gift,
  AlertCircle,
  TrendingUp,
  Clock,
  X,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAppTheme } from '../utils/useAppTheme';

type NotificationType = 'order' | 'promo' | 'system' | 'earnings';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export function Notifications() {
  const navigate = useNavigate();
  const theme = useAppTheme();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  // Admin bildirimlerini al
  const adminNotifications = JSON.parse(localStorage.getItem('globalNotifications') || '[]');

  const notifications: Notification[] = [
    // Admin bildirimleri ekle
    ...adminNotifications.map((notif: any) => ({
      id: notif.id.toString(),
      type: 'system' as NotificationType,
      title: notif.title,
      message: notif.message,
      time: new Date(notif.date).toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }),
      isRead: false,
    })),
    {
      id: '1',
      type: 'order',
      title: 'Yeni Sipariş Mevcut',
      message: 'Yakınınızda yeni bir teslimat siparişi sizi bekliyor',
      time: '2 dakika önce',
      isRead: false,
    },
    {
      id: '2',
      type: 'promo',
      title: 'Hafta Sonu Bonusu Aktif!',
      message: 'Bu hafta sonu tüm teslimatlardan 1.5x kazanın. Hemen teslimat yapmaya başlayın!',
      time: '1 saat önce',
      isRead: false,
    },
    {
      id: '3',
      type: 'earnings',
      title: 'Günlük Hedef Başarıldı',
      message: 'Tebrikler! Günlük kazanç hedefiniz olan ₺450\'ye ulaştınız',
      time: '3 saat önce',
      isRead: false,
    },
    {
      id: '4',
      type: 'system',
      title: 'Uygulama Güncellemesi Mevcut',
      message: 'Yeni özellikler ve iyileştirmeler yüklemeye hazır',
      time: '5 saat önce',
      isRead: true,
    },
    {
      id: '5',
      type: 'promo',
      title: 'Yoğun Saat Uyarısı',
      message: '18:00-21:00 arası yüksek talep bekleniyor. Kazancınızı maksimize edin!',
      time: 'Dün',
      isRead: true,
    },
    {
      id: '6',
      type: 'earnings',
      title: 'Haftalık Ödeme İşlendi',
      message: '₺3,780.00 hesabınıza yatırıldı',
      time: '2 gün önce',
      isRead: true,
    },
  ];

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'order':
        return Bell;
      case 'promo':
        return Gift;
      case 'system':
        return AlertCircle;
      case 'earnings':
        return TrendingUp;
    }
  };

  const getIconColor = (type: NotificationType) => {
    switch (type) {
      case 'order':
        return 'bg-[#FFD600]';
      case 'promo':
        return 'bg-purple-100';
      case 'system':
        return 'bg-blue-100';
      case 'earnings':
        return 'bg-green-100';
    }
  };

  const getIconTextColor = (type: NotificationType) => {
    switch (type) {
      case 'order':
        return 'text-[#121212]';
      case 'promo':
        return 'text-purple-600';
      case 'system':
        return 'text-blue-600';
      case 'earnings':
        return 'text-green-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-[#121212]">Notifications</h1>
          <Button
            variant="ghost"
            className="text-sm text-[#121212] font-medium hover:text-[#121212]/80"
          >
            Mark all read
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {/* Unread Section */}
        <div className="p-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">
            New
          </h2>
          <div className="space-y-3">
            {notifications
              .filter((n) => !n.isRead)
              .map((notification, index) => {
                const Icon = getIcon(notification.type);
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedNotification(notification)}
                    className="bg-white rounded-2xl p-4 shadow-md active:scale-98 transition-transform cursor-pointer relative"
                  >
                    {/* Unread indicator */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-[#FFD600] rounded-full" />

                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(
                          notification.type
                        )}`}
                      >
                        <Icon className={`w-6 h-6 ${getIconTextColor(notification.type)}`} />
                      </div>

                      <div className="flex-1 pr-4">
                        <h3 className="font-bold text-[#121212] mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>

        {/* Earlier Section */}
        <div className="p-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">
            Earlier
          </h2>
          <div className="space-y-3">
            {notifications
              .filter((n) => n.isRead)
              .map((notification, index) => {
                const Icon = getIcon(notification.type);
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedNotification(notification)}
                    className="bg-white rounded-2xl p-4 shadow-sm active:scale-98 transition-transform cursor-pointer opacity-70 hover:opacity-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(
                          notification.type
                        )}`}
                      >
                        <Icon className={`w-6 h-6 ${getIconTextColor(notification.type)}`} />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-[#121212] mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNotification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setSelectedNotification(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${getIconColor(selectedNotification.type)}`}>
                  {(() => { const Icon = getIcon(selectedNotification.type); return <Icon className={`w-7 h-7 ${getIconTextColor(selectedNotification.type)}`} />; })()}
                </div>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-[#121212] mb-2">{selectedNotification.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{selectedNotification.message}</p>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Clock className="w-4 h-4" />
                <span>{selectedNotification.time}</span>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="w-full py-3 rounded-2xl font-bold text-[#121212]"
                style={{ backgroundColor: theme.primary }}
              >
                Tamam
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}