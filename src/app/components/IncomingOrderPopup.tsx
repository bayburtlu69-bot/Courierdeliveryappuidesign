import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Store, MapPin, DollarSign, Clock, X, Navigation } from 'lucide-react';
import { Button } from './ui/button';

interface IncomingOrderPopupProps {
  onAccept: (orderId: string) => void;
  onReject: () => void;
}

export function IncomingOrderPopup({ onAccept, onReject }: IncomingOrderPopupProps) {
  const [timeLeft, setTimeLeft] = useState(15);

  // Check for test orders from admin panel
  const activeOrders = JSON.parse(localStorage.getItem('activeOrders') || '[]');
  const newOrder = activeOrders.find((order: any) => order.status === 'new');

  // Use test order if available, otherwise use mock data
  const order = newOrder || {
    id: 'ORD-12345',
    restaurant: 'Italian Bistro',
    restaurantAddress: '123 Main St',
    customerAddress: '456 Oak Avenue',
    distance: '2.3 km',
    estimatedEarnings: 12.50,
    estimatedTime: '15 min',
    shopName: 'Italian Bistro',
    pickupAddress: '123 Main St',
    deliveryAddress: '456 Oak Avenue',
  };

  // Map test order fields to component format
  const displayOrder = {
    id: order.id,
    restaurant: order.shopName || order.restaurant,
    restaurantAddress: order.pickupAddress || order.restaurantAddress,
    customerAddress: order.deliveryAddress || order.customerAddress,
    distance: order.distance || '2.3 km',
    estimatedEarnings: order.price || order.estimatedEarnings,
    estimatedTime: order.estimatedTime || '15 min',
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onReject();
    }
  }, [timeLeft, onReject]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        {/* Header with countdown */}
        <div className="bg-[#FFD600] p-6 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onReject}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20"
          >
            <X className="w-4 h-4 text-[#121212]" />
          </Button>

          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{
                scale: timeLeft <= 5 ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full bg-[#121212] flex items-center justify-center">
                <p className="text-3xl font-bold text-[#FFD600]">{timeLeft}</p>
              </div>
              <svg className="absolute inset-0 w-20 h-20 -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#121212"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={226}
                  strokeDashoffset={226 * (1 - timeLeft / 15)}
                  className="transition-all duration-1000"
                />
              </svg>
            </motion.div>
          </div>

          <h2 className="text-2xl font-bold text-[#121212] text-center">
            Yeni Sipariş Talebi!
          </h2>
          <p className="text-sm text-[#121212]/70 text-center mt-1">
            Teslimatı başlatmak için kabul et
          </p>
        </div>

        {/* Order details */}
        <div className="p-6 space-y-5">
          {/* Earnings highlight */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-green-50 border-2 border-green-500 rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-green-700 font-medium">Kazanacaksın</p>
                <p className="text-2xl font-bold text-green-700">
                  {displayOrder.estimatedEarnings.toFixed(2)} ₺
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-green-700">Tahmini süre</p>
              <p className="text-lg font-bold text-green-700">{displayOrder.estimatedTime}</p>
            </div>
          </motion.div>

          {/* Restaurant info */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-[#FFD600] rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <Store className="w-5 h-5 text-[#121212]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">ALIM YERİ</p>
                <p className="font-bold text-[#121212]">{displayOrder.restaurant}</p>
                <p className="text-sm text-gray-600">{displayOrder.restaurantAddress}</p>
              </div>
            </div>

            {/* Dotted line */}
            <div className="flex items-center space-x-3">
              <div className="w-10 flex justify-center">
                <div className="w-px h-8 border-l-2 border-dashed border-gray-300" />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">TESLİMAT ADRESİ</p>
                <p className="font-bold text-[#121212]">Müşteri</p>
                <p className="text-sm text-gray-600">{displayOrder.customerAddress}</p>
              </div>
            </div>
          </div>

          {/* Distance */}
          <div className="flex items-center justify-center space-x-2 py-2">
            <Navigation className="w-4 h-4 text-gray-500" />
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-[#121212]">{displayOrder.distance}</span> toplam mesafe
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="p-6 pt-0 flex space-x-3">
          <Button
            onClick={onReject}
            className="flex-1 h-14 bg-gray-200 hover:bg-gray-300 text-[#121212] rounded-2xl font-semibold text-base active:scale-95 transition-transform"
          >
            Reddet
          </Button>
          <Button
            onClick={() => onAccept(displayOrder.id)}
            className="flex-1 h-14 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] rounded-2xl font-semibold text-base active:scale-95 transition-transform shadow-lg"
          >
            Kabul Et
          </Button>
        </div>
      </motion.div>

      {/* Pulse animation around popup */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-[#FFD600] rounded-3xl -z-10 blur-3xl"
        style={{ width: '90%', height: '80%', margin: 'auto' }}
      />
    </motion.div>
  );
}