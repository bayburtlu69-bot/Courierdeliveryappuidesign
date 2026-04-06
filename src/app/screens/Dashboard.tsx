import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Power,
  Bell,
  User,
  TrendingUp,
  Clock,
  Package,
  DollarSign,
  Menu,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { IncomingOrderPopup } from '../components/IncomingOrderPopup';

export function Dashboard() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [showIncomingOrder, setShowIncomingOrder] = useState(false);
  const [stats] = useState({
    todayEarnings: 456.50,
    completedOrders: 12,
    hours: 5.5,
    rating: 4.8,
  });

  // Simulate incoming order after going online
  useEffect(() => {
    if (isOnline) {
      // Check for test orders from admin
      const activeOrders = JSON.parse(localStorage.getItem('activeOrders') || '[]');
      const newOrders = activeOrders.filter((order: any) => order.status === 'new');
      
      if (newOrders.length > 0) {
        const timer = setTimeout(() => {
          setShowIncomingOrder(true);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        // Original simulation
        const timer = setTimeout(() => {
          setShowIncomingOrder(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isOnline]);

  const handleAcceptOrder = (orderId: string) => {
    setShowIncomingOrder(false);
    navigate(`/order/${orderId}`);
  };

  const handleRejectOrder = () => {
    setShowIncomingOrder(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-[#121212]">Ana Sayfa</h1>
              <p className="text-xs text-gray-500">Hoş geldin, Kurye!</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/notifications')}
              className="w-10 h-10 rounded-full relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
              className="w-10 h-10 rounded-full"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Availability Toggle - SMALLER & MODERN */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-md border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#121212] mb-1">
                {isOnline ? 'Çevrimiçisin' : 'Çevrimdışısın'}
              </h2>
              <p className="text-gray-600 text-sm">
                {isOnline
                  ? 'Sipariş almaya hazırsın'
                  : 'Sipariş almak için çevrimiçi ol'}
              </p>
            </div>

            {/* Modern Toggle Button */}
            <motion.button
              onClick={() => setIsOnline(!isOnline)}
              className="relative"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  backgroundColor: isOnline ? '#10B981' : '#6B7280',
                }}
                transition={{ duration: 0.3 }}
                className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <motion.div
                  animate={{ rotate: isOnline ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Power className="w-12 h-12 text-white" strokeWidth={2.5} />
                </motion.div>
              </motion.div>

              {isOnline && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  className="absolute inset-0 rounded-2xl border-3 border-green-500"
                />
              )}
            </motion.button>
          </div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isOnline ? 1 : 0, 
              height: isOnline ? 'auto' : 0 
            }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-3 rounded-xl">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <p className="text-green-700 text-sm font-medium">
                  Sipariş bekleniyor...
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Today's Stats */}
        <div>
          <h3 className="text-lg font-bold text-[#121212] mb-4">
            Bugünün Performansı
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate('/earnings')}
              className="bg-white rounded-2xl p-5 shadow-md cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-[#FFD600] rounded-xl flex items-center justify-center mb-3">
                <DollarSign className="w-6 h-6 text-[#121212]" />
              </div>
              <p className="text-2xl font-bold text-[#121212] mb-1">
                {stats.todayEarnings.toFixed(2)} ₺
              </p>
              <p className="text-sm text-gray-600">Kazanç</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate('/history')}
              className="bg-white rounded-2xl p-5 shadow-md cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-[#121212] mb-1">
                {stats.completedOrders}
              </p>
              <p className="text-sm text-gray-600">Tamamlanan</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-5 shadow-md"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-[#121212] mb-1">
                {stats.hours}
              </p>
              <p className="text-sm text-gray-600">Saat</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-5 shadow-md"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-[#121212] mb-1">
                {stats.rating}
              </p>
              <p className="text-sm text-gray-600">Puan</p>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-bold text-[#121212] mb-4">
            Hızlı Erişim
          </h3>
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/history')}
              variant="outline"
              className="w-full h-14 justify-start text-left rounded-xl border-2"
            >
              <Package className="w-5 h-5 mr-3 text-gray-600" />
              <span className="font-semibold">Sipariş Geçmişi</span>
            </Button>
            <Button
              onClick={() => navigate('/earnings')}
              variant="outline"
              className="w-full h-14 justify-start text-left rounded-xl border-2"
            >
              <DollarSign className="w-5 h-5 mr-3 text-gray-600" />
              <span className="font-semibold">Kazançlarım</span>
            </Button>
            <Button
              onClick={() => navigate('/support')}
              variant="outline"
              className="w-full h-14 justify-start text-left rounded-xl border-2"
            >
              <Bell className="w-5 h-5 mr-3 text-gray-600" />
              <span className="font-semibold">Destek</span>
            </Button>
          </div>
        </div>
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
