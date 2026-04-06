import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Store, MapPin, DollarSign, Clock, Navigation, Package, Banknote, CreditCard, Wallet, Hash } from 'lucide-react';
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
    id: 'SIP-12345',
    restaurant: 'İtalyan Bistro',
    restaurantAddress: 'Kadıköy Moda Caddesi No:45',
    customerAddress: 'Beşiktaş Barbaros Bulvarı No:88',
    distance: '2.3 km',
    estimatedEarnings: 18.50,
    estimatedTime: '15 dk',
    shopName: 'İtalyan Bistro',
    pickupAddress: 'Kadıköy Moda Caddesi No:45',
    deliveryAddress: 'Beşiktaş Barbaros Bulvarı No:88',
    totalPrice: 125.50,
    courierEarning: 18.50,
    paymentMethod: 'cash',
  };

  // Map test order fields to component format
  const rawEarning = order.courierEarning || order.estimatedEarnings;
  const rawTotalPrice = order.totalPrice || order.price;

  const displayOrder = {
    id: order.id,
    restaurant: order.shopName || order.restaurant,
    restaurantAddress: order.pickupAddress || order.restaurantAddress,
    customerAddress: order.deliveryAddress || order.customerAddress,
    distance: order.distance || '2.3 km',
    estimatedEarnings: parseFloat(rawEarning) || 18.50,
    estimatedTime: order.estimatedTime || '15 dk',
    totalPrice: parseFloat(rawTotalPrice) || 125.50,
    paymentMethod: order.paymentMethod || 'cash',
  };

  // Pricing from settings
  const basePrice = parseFloat(localStorage.getItem('basePrice') || '25');
  const pricePerKm = parseFloat(localStorage.getItem('pricePerKm') || '15');
  const distanceNum = parseFloat(displayOrder.distance) || 2.3;
  const calculatedEarning = displayOrder.estimatedEarnings || (basePrice + distanceNum * pricePerKm);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onReject();
    }
  }, [timeLeft, onReject]);

  const getPaymentIcon = () => {
    switch (displayOrder.paymentMethod) {
      case 'cash': return <Banknote className="w-4 h-4 text-green-600" />;
      case 'card': return <CreditCard className="w-4 h-4 text-blue-600" />;
      default: return <Wallet className="w-4 h-4 text-purple-600" />;
    }
  };

  const getPaymentLabel = () => {
    switch (displayOrder.paymentMethod) {
      case 'cash': return 'Nakit Tahsil Edilecek';
      case 'card': return 'Kart ile Ödeme';
      default: return 'Online Ödendi';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        {/* Header with countdown */}
        <div className="bg-[#FFD600] p-5 relative">
          <div className="flex items-center justify-between mb-3">
            {/* Countdown */}
            <motion.div
              animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
              className="relative w-16 h-16"
            >
              <div className="w-16 h-16 rounded-full bg-[#121212] flex items-center justify-center">
                <p className="text-2xl font-bold text-[#FFD600]">{timeLeft}</p>
              </div>
              <svg className="absolute inset-0 w-16 h-16 -rotate-90">
                <circle
                  cx="32" cy="32" r="28"
                  stroke="#121212" strokeWidth="3" fill="none"
                  strokeDasharray={175.9}
                  strokeDashoffset={175.9 * (1 - timeLeft / 15)}
                  className="transition-all duration-1000"
                />
              </svg>
            </motion.div>

            <div className="flex-1 text-center">
              <h2 className="text-xl font-bold text-[#121212]">🔔 Yeni Sipariş!</h2>
              <p className="text-xs text-[#121212]/70">Teslimatı kabul et</p>
            </div>

            <div className="w-16 flex justify-end">
              <div className="w-12 h-12 bg-[#121212] rounded-2xl flex items-center justify-center">
                <Package className="w-6 h-6 text-[#FFD600]" />
              </div>
            </div>
          </div>
        </div>

        {/* Order details */}
        <div className="p-4 space-y-3">
          {/* Key Info Grid */}
          <div className="grid grid-cols-3 gap-2">
            {/* Order Number */}
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <Hash className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Sipariş No</p>
              <p className="font-bold text-[#121212] text-xs">{displayOrder.id}</p>
            </div>
            {/* Distance */}
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <Navigation className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Mesafe</p>
              <p className="font-bold text-blue-600">{displayOrder.distance}</p>
            </div>
            {/* Time */}
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <Clock className="w-4 h-4 text-purple-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Süre</p>
              <p className="font-bold text-purple-600">{displayOrder.estimatedTime}</p>
            </div>
          </div>

          {/* Earnings highlight */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-green-50 border-2 border-green-500 rounded-2xl p-3 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-green-700 font-medium">Kurye Kazancın</p>
                <p className="text-2xl font-bold text-green-700">
                  ₺{calculatedEarning.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-green-600 font-medium">Km Başı</p>
              <p className="text-sm font-bold text-green-700">₺{pricePerKm}/km</p>
            </div>
          </motion.div>

          {/* Payment collection */}
          {(displayOrder.paymentMethod === 'cash' || displayOrder.paymentMethod === 'card') && (
            <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-xl">
              {getPaymentIcon()}
              <div>
                <p className="text-xs text-orange-600">{getPaymentLabel()}</p>
                <p className="font-bold text-orange-700">₺{displayOrder.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          )}

          {/* Route */}
          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#FFD600] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Store className="w-4 h-4 text-[#121212]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">ALIM</p>
                <p className="font-bold text-[#121212] text-sm">{displayOrder.restaurant}</p>
                <p className="text-xs text-gray-500 truncate">{displayOrder.restaurantAddress}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 flex justify-center">
                <div className="w-px h-6 border-l-2 border-dashed border-gray-300" />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">TESLİMAT</p>
                <p className="font-bold text-[#121212] text-sm">Müşteri</p>
                <p className="text-xs text-gray-500 truncate">{displayOrder.customerAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-4 pb-5 flex space-x-3">
          <Button
            onClick={onReject}
            className="flex-1 h-13 bg-gray-100 hover:bg-gray-200 text-[#121212] rounded-2xl font-semibold text-base active:scale-95 transition-transform"
          >
            Reddet
          </Button>
          <Button
            onClick={() => onAccept(displayOrder.id)}
            className="flex-2 h-13 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] rounded-2xl font-bold text-base active:scale-95 transition-transform shadow-lg px-8"
          >
            ✓ Kabul Et
          </Button>
        </div>
      </motion.div>

      {/* Pulse animation */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[#FFD600] rounded-3xl -z-10 blur-3xl"
        style={{ width: '90%', height: '80%', margin: 'auto' }}
      />
    </motion.div>
  );
}
