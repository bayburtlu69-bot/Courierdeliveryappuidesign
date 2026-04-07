import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Phone,
  Store,
  MapPin,
  Navigation,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  CreditCard,
  Wallet,
  Banknote,
  Clock,
  Package,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { MockMap } from '../components/MockMap';
import { ThankYouPopup } from '../components/ThankYouPopup';
import { toast } from 'sonner';

type OrderStep = 'go-to-restaurant' | 'pickup' | 'deliver';
type PaymentMethod = 'cash' | 'card' | 'online';

interface PaymentLog {
  orderId: string;
  amount: number;
  method: PaymentMethod;
  timestamp: string;
  courierName: string;
  customerName: string;
  status: 'collected' | 'completed';
}

export function ActiveOrder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState<OrderStep>('go-to-restaurant');
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const holdIntervalRef = useRef<any>(null);

  useEffect(() => {
    // Siparişi localStorage'dan al
    const activeOrders = JSON.parse(localStorage.getItem('activeOrders') || '[]');
    const foundOrder = activeOrders.find((o: any) => o.id === id);
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // Mock order data
      setOrder({
        id: id || 'SIP-12345',
        restaurant: 'İtalyan Bistro',
        restaurantAddress: 'Kadıköy Moda Caddesi No:45, İstanbul',
        restaurantPhone: '+90 555 123 4567',
        customerName: 'Ahmet Yılmaz',
        customerAddress: 'Beşiktaş Barbaros Bulvarı No:88 Daire:5B, İstanbul',
        customerPhone: '+90 555 987 6543',
        distance: '2.3 km',
        totalPrice: 125.50,
        courierEarning: 45.50,
        paymentMethod: 'cash' as PaymentMethod,
        items: [
          { name: 'Margherita Pizza', quantity: 1, price: 85 },
          { name: 'Sezar Salata', quantity: 2, price: 30 },
          { name: 'Tiramisu', quantity: 1, price: 25 },
        ],
        notes: 'Lütfen zili çalın. Temassız teslimat tercih ediyorum. 5B dairesi.',
        shopName: 'İtalyan Bistro',
        pickupAddress: 'Kadıköy Moda Caddesi No:45, İstanbul',
        deliveryAddress: 'Beşiktaş Barbaros Bulvarı No:88 Daire:5B, İstanbul',
      });
    }
  }, [id]);

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
      }
    };
  }, []);

  if (!order) {
    return <div>Yükleniyor...</div>;
  }

  const steps = [
    {
      id: 'go-to-restaurant' as OrderStep,
      title: 'Mağazaya Git',
      description: 'Alış noktasına yönlen',
      icon: Store,
      color: 'blue',
    },
    {
      id: 'pickup' as OrderStep,
      title: 'Siparişi Al',
      description: 'Mağazadan ürünleri topla',
      icon: CheckCircle2,
      color: 'yellow',
    },
    {
      id: 'deliver' as OrderStep,
      title: 'Müşteriye Teslim Et',
      description: 'Teslimatı tamamla',
      icon: MapPin,
      color: 'green',
    },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const CurrentStepIcon = steps[currentStepIndex].icon;

  const logPaymentCollection = (method: PaymentMethod, amount: number) => {
    const paymentLog: PaymentLog = {
      orderId: order.id,
      amount,
      method,
      timestamp: new Date().toISOString(),
      courierName: 'Kurye Kullanıcı',
      customerName: order.customerName,
      status: method === 'online' ? 'completed' : 'collected',
    };

    const logs = JSON.parse(localStorage.getItem('paymentLogs') || '[]');
    logs.unshift(paymentLog);
    localStorage.setItem('paymentLogs', JSON.stringify(logs));

    const activityLogs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    activityLogs.unshift({
      id: Date.now(),
      action: 'Ödeme Alındı',
      description: `${order.id} numaralı sipariş için ${amount.toFixed(2)}₺ ${
        method === 'cash' ? 'nakit' : method === 'card' ? 'kart ile' : 'online'
      } tahsil edildi`,
      type: 'success',
      timestamp: new Date().toISOString(),
      user: 'Kurye',
      metadata: paymentLog,
    });
    localStorage.setItem('activityLogs', JSON.stringify(activityLogs.slice(0, 500)));
  };

  const handleHoldStart = () => {
    setIsHolding(true);
    let progress = 0;
    
    holdIntervalRef.current = setInterval(() => {
      progress += 2;
      setHoldProgress(progress);
      
      if (progress >= 100) {
        clearInterval(holdIntervalRef.current);
        handleStepComplete();
      }
    }, 30); // 1.5 saniye (30ms * 50 = 1500ms)
  };

  const handleHoldEnd = () => {
    setIsHolding(false);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    
    if (holdProgress < 100) {
      // Reset progress with animation
      setHoldProgress(0);
    }
  };

  const handleStepComplete = () => {
    setShowExplosion(true);
    setHoldProgress(0);
    setIsHolding(false);

    setTimeout(() => {
      setShowExplosion(false);

      if (currentStep === 'go-to-restaurant') {
        setCurrentStep('pickup');
        
        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        logs.unshift({
          id: Date.now(),
          action: 'Mağazaya Varış',
          description: `${order.id} - ${order.restaurant} mağazasına varıldı`,
          type: 'info',
          timestamp: new Date().toISOString(),
          user: 'Kurye',
        });
        localStorage.setItem('activityLogs', JSON.stringify(logs));
        
      } else if (currentStep === 'pickup') {
        setCurrentStep('deliver');
        
        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        logs.unshift({
          id: Date.now(),
          action: 'Sipariş Alındı',
          description: `${order.id} - Sipariş mağazadan alındı, teslimat başlıyor`,
          type: 'info',
          timestamp: new Date().toISOString(),
          user: 'Kurye',
        });
        localStorage.setItem('activityLogs', JSON.stringify(logs));
        
      } else {
        // Ödeme işle
        if (order.paymentMethod === 'cash') {
          logPaymentCollection('cash', order.totalPrice);
        } else if (order.paymentMethod === 'card') {
          logPaymentCollection('card', order.totalPrice);
        }

        // Siparişi tamamla
        const activeOrders = JSON.parse(localStorage.getItem('activeOrders') || '[]');
        const updatedOrders = activeOrders.filter((o: any) => o.id !== order.id);
        localStorage.setItem('activeOrders', JSON.stringify(updatedOrders));

        const completedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
        completedOrders.unshift({
          ...order,
          completedAt: new Date().toISOString(),
          courierEarning: order.courierEarning || (order.totalPrice * 0.7),
        });
        localStorage.setItem('completedOrders', JSON.stringify(completedOrders));

        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        logs.unshift({
          id: Date.now(),
          action: 'Teslimat Tamamlandı',
          description: `${order.id} - Sipariş başarıyla teslim edildi. Kazanç: ${((order.courierEarning || (parseFloat(order.totalPrice) || 0) * 0.7) || 0).toFixed(2)}₺`,
          type: 'success',
          timestamp: new Date().toISOString(),
          user: 'Kurye',
          metadata: order,
        });
        localStorage.setItem('activityLogs', JSON.stringify(logs));

        // Çevrimiçi durumunu koru
        localStorage.setItem('isOnline', 'true');

        setTimeout(() => {
          setShowThankYou(true);
        }, 800);
      }
    }, 600);
  };

  const handleNavigateToLocation = () => {
    // Gerçek Google Maps navigasyonu
    const destination = encodeURIComponent(targetAddress);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}&travelmode=driving`;
          window.open(url, '_blank');
        },
        () => {
          // Konum alınamazsa sadece hedefle aç
          const url = `https://www.google.com/maps/search/?api=1&query=${destination}`;
          window.open(url, '_blank');
        }
      );
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${destination}`;
      window.open(url, '_blank');
    }
  };

  const targetAddress = currentStep === 'go-to-restaurant' || currentStep === 'pickup'
    ? order.restaurantAddress || order.pickupAddress
    : order.customerAddress || order.deliveryAddress;

  const getPaymentIcon = () => {
    switch (order.paymentMethod) {
      case 'cash':
        return <Banknote className="w-6 h-6 text-green-600" />;
      case 'card':
        return <CreditCard className="w-6 h-6 text-blue-600" />;
      case 'online':
        return <Wallet className="w-6 h-6 text-purple-600" />;
    }
  };

  const getPaymentText = () => {
    switch (order.paymentMethod) {
      case 'cash':
        return 'Kapıda Nakit Ödeme';
      case 'card':
        return 'Kapıda Kart ile Ödeme';
      case 'online':
        return 'Online Ödendi';
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 'go-to-restaurant':
        return 'Mağazaya Vardım';
      case 'pickup':
        return 'Siparişi Aldım';
      case 'deliver':
        return 'Teslim Ettim';
    }
  };

  if (false) { /* showMap removed — using real Google Maps */ }

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Explosion Effect */}
      <AnimatePresence>
        {showExplosion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50vw',
                  y: '80vh',
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}vw`,
                  y: `${80 + (Math.random() - 0.5) * 100}vh`,
                  scale: Math.random() * 2 + 1,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                className="absolute w-4 h-4 bg-[#FFD600] rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-[#121212] text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10" />
          <div className="text-center flex-1">
            <p className="text-sm text-gray-400">Sipariş No</p>
            <p className="font-bold text-lg">{order.id}</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <div key={step.id} className="flex flex-col items-center z-10 flex-1">
                <motion.div
                  animate={{
                    backgroundColor: isCompleted
                      ? '#10B981'
                      : isActive
                      ? '#FFD600'
                      : '#374151',
                    scale: isActive ? 1.1 : 1,
                  }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 shadow-lg"
                >
                  <StepIcon
                    className={`w-7 h-7 ${
                      isActive || isCompleted ? 'text-[#121212]' : 'text-gray-400'
                    }`}
                  />
                </motion.div>
                <p
                  className={`text-xs ${
                    isActive ? 'text-[#FFD600] font-bold' : 'text-gray-400'
                  }`}
                >
                  Adım {index + 1}
                </p>
              </div>
            );
          })}

          <div className="absolute top-7 left-0 right-0 h-1 bg-gray-700 -z-0" />
          <motion.div
            animate={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
            className="absolute top-7 left-0 h-1 bg-[#FFD600] -z-0"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Current Step Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-[#FFD600] rounded-2xl flex items-center justify-center flex-shrink-0">
              {CurrentStepIcon && (
                <CurrentStepIcon className="w-8 h-8 text-[#121212]" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#121212] mb-2">
                {steps[currentStepIndex].title}
              </h2>
              <p className="text-gray-600">
                {steps[currentStepIndex].description}
              </p>
            </div>
          </div>

          <Button
            onClick={handleNavigateToLocation}
            className="w-full h-16 bg-gradient-to-r from-[#121212] to-[#2a2a2a] hover:from-[#2a2a2a] hover:to-[#121212] text-[#FFD600] font-bold rounded-2xl text-lg mb-4 shadow-lg"
          >
            <Navigation className="mr-3 w-6 h-6" />
            {currentStep === 'deliver' ? 'Müşteri Adresine' : 'Mağazaya'} Yönlen
          </Button>

          {currentStep !== 'pickup' && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#FFD600] mt-1" />
                <div className="flex-1">
                  <p className="font-bold text-[#121212] text-lg mb-2">
                    {currentStep === 'deliver' ? order.customerName : (order.restaurant || order.shopName)}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {currentStep === 'deliver' 
                      ? (order.customerAddress || order.deliveryAddress)
                      : (order.restaurantAddress || order.pickupAddress)}
                  </p>
                  <Button
                    onClick={() => {
                      const phone = currentStep === 'deliver' ? order.customerPhone : order.restaurantPhone;
                      window.location.href = `tel:${phone}`;
                    }}
                    variant="outline"
                    className="w-full h-12 border-2 border-[#FFD600] text-[#121212] hover:bg-[#FFD600] font-semibold"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    Ara: {currentStep === 'deliver' ? order.customerPhone : order.restaurantPhone}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Earnings - Moved up to avoid overlap */}
        <div className="bg-gradient-to-r from-[#FFD600] to-[#FFC107] rounded-2xl p-6 shadow-xl border-2 border-yellow-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#121212] font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Senin Kazancın
              </p>
              <p className="text-4xl font-bold text-[#121212]">
                {(parseFloat(order.courierEarning) || (parseFloat(order.totalPrice) || 0) * 0.7 || 0).toFixed(2)}₺
              </p>
              <p className="text-sm text-[#121212] opacity-70 mt-1">
                {order.distance} • Tahmini süre: {Math.ceil(parseFloat(order.distance) * 3)} dakika
              </p>
            </div>
            <div className="w-20 h-20 bg-[#121212] rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* Animasyonlu para işaretleri */}
              <motion.div
                animate={{
                  y: ['-100%', '200%'],
                  x: ['-10px', '10px', '-10px'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute text-4xl"
              >
                💰
              </motion.div>
              <motion.div
                animate={{
                  y: ['-100%', '200%'],
                  x: ['10px', '-10px', '10px'],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 1,
                }}
                className="absolute text-3xl"
              >
                💸
              </motion.div>
              <motion.div
                animate={{
                  y: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.5,
                }}
                className="absolute text-3xl"
              >
                💵
              </motion.div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200">
          <h3 className="text-lg font-bold text-[#121212] mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[#FFD600]" />
            Ödeme Yöntemi
          </h3>
          <div className={`flex items-center gap-4 p-4 rounded-xl ${
            order.paymentMethod === 'cash' ? 'bg-green-50 border-2 border-green-200' :
            order.paymentMethod === 'card' ? 'bg-blue-50 border-2 border-blue-200' :
            'bg-purple-50 border-2 border-purple-200'
          }`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              order.paymentMethod === 'cash' ? 'bg-green-100' :
              order.paymentMethod === 'card' ? 'bg-blue-100' :
              'bg-purple-100'
            }`}>
              {order.paymentMethod === 'cash' ? (
                <Banknote className={`w-7 h-7 text-green-600`} />
              ) : order.paymentMethod === 'card' ? (
                <CreditCard className={`w-7 h-7 text-blue-600`} />
              ) : (
                <CheckCircle className={`w-7 h-7 text-purple-600`} />
              )}
            </div>
            <div>
              <p className="font-bold text-[#121212] text-lg">
                {order.paymentMethod === 'cash' ? '💵 Kapıda Nakit' :
                 order.paymentMethod === 'card' ? '💳 Kapıda Kart' :
                 '✅ Online Ödendi'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {order.paymentMethod === 'online' ? 
                  'Ödeme zaten tamamlandı' : 
                  `${(parseFloat(order.totalPrice) || 0).toFixed(2)}₺ tahsil edilecek`}
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
          <h3 className="font-bold text-[#121212] text-lg mb-4 flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" />
            Sipariş İçeriği
          </h3>
          <div className="space-y-3">
            {order.items && order.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
                <span className="text-gray-800 font-medium">
                  <strong className="text-[#121212]">{item.quantity}x</strong> {item.name}
                </span>
                {item.price && (
                  <span className="font-bold text-[#121212]">{item.price}₺</span>
                )}
              </div>
            ))}
          </div>

          {order.notes && (
            <div className="mt-5 pt-5 border-t-2 border-gray-200">
              <div className="flex items-start gap-3 bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-orange-900 mb-1">
                    📝 Teslimat Notları
                  </p>
                  <p className="text-sm text-orange-800">{order.notes}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-5 pt-5 border-t-2 border-gray-200 flex justify-between items-center">
            <span className="text-gray-700 font-semibold text-lg">Toplam Tutar:</span>
            <span className="text-2xl font-bold text-[#121212]">{(parseFloat(order.totalPrice) || 0).toFixed(2)}₺</span>
          </div>
        </div>

        {/* Extra space for bottom button */}
        <div className="h-32" />
      </div>

      {/* Bottom Action - Hold to Confirm */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-6 shadow-2xl">
        <div className="relative">
          <motion.button
            onPointerDown={handleHoldStart}
            onPointerUp={handleHoldEnd}
            onPointerLeave={handleHoldEnd}
            animate={{
              scale: isHolding ? 0.95 : 1,
            }}
            className="relative w-full h-20 bg-gray-200 rounded-2xl overflow-hidden cursor-pointer select-none"
          >
            {/* Progress Background */}
            <motion.div
              animate={{
                width: `${holdProgress}%`,
              }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FFD600] to-[#FFC107] rounded-2xl"
              transition={{ duration: 0.05 }}
            />

            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-bold text-[#121212] text-lg z-10">
                {isHolding ? '⏱️ Basılı Tut...' : `👆 Basılı Tut: ${getButtonText()}`}
              </p>
            </div>
          </motion.button>

          <p className="text-center text-xs text-gray-500 mt-3">
            Butonu {holdProgress > 0 ? `%${Math.floor(holdProgress)}` : 'basılı tutarak'} onaylayın
          </p>

          {/* Canlı Destek */}
          <button
            onClick={() => navigate('/support')}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-gray-200 bg-white hover:border-[#FFD600] hover:bg-yellow-50 transition-all"
          >
            <MessageCircle className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-semibold text-gray-600">Canlı Destek</span>
          </button>
        </div>
      </div>

      {/* Thank You Popup */}
      {showThankYou && (
        <ThankYouPopup
          onClose={() => {
            setShowThankYou(false);
            navigate('/dashboard');
          }}
        />
      )}
    </div>
  );
}