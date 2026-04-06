import { useState, useEffect } from 'react';
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
  ChevronRight,
  CreditCard,
  Wallet,
  Banknote,
  Clock,
  Package,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { MockMap } from '../components/MockMap';
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
  const [slideProgress, setSlideProgress] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);

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
      courierName: 'Kurye Kullanıcı', // Gerçek uygulamada auth'dan gelecek
      customerName: order.customerName,
      status: method === 'online' ? 'completed' : 'collected',
    };

    const logs = JSON.parse(localStorage.getItem('paymentLogs') || '[]');
    logs.unshift(paymentLog);
    localStorage.setItem('paymentLogs', JSON.stringify(logs));

    // Activity log'a da ekle
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

  const handleSlideComplete = () => {
    if (slideProgress < 80) return;

    if (currentStep === 'go-to-restaurant') {
      setCurrentStep('pickup');
      setSlideProgress(0);
      toast.success('Mağazaya vardınız!');
      
      // Log activity
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
      setSlideProgress(0);
      toast.success('Sipariş alındı! Teslimat adresine yönlenin.');
      
      // Log activity
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
        toast.success(`${order.totalPrice.toFixed(2)}₺ nakit tahsil edildi!`);
      } else if (order.paymentMethod === 'card') {
        logPaymentCollection('card', order.totalPrice);
        toast.success(`${order.totalPrice.toFixed(2)}₺ kart ile tahsil edildi!`);
      }

      // Siparişi tamamla
      const activeOrders = JSON.parse(localStorage.getItem('activeOrders') || '[]');
      const updatedOrders = activeOrders.filter((o: any) => o.id !== order.id);
      localStorage.setItem('activeOrders', JSON.stringify(updatedOrders));

      // Tamamlanan siparişlere ekle
      const completedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
      completedOrders.unshift({
        ...order,
        completedAt: new Date().toISOString(),
        courierEarning: order.courierEarning || (order.totalPrice * 0.7),
      });
      localStorage.setItem('completedOrders', JSON.stringify(completedOrders));

      // Log activity
      const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
      logs.unshift({
        id: Date.now(),
        action: 'Teslimat Tamamlandı',
        description: `${order.id} - Sipariş başarıyla teslim edildi. Kazanç: ${(order.courierEarning || (order.totalPrice * 0.7)).toFixed(2)}₺`,
        type: 'success',
        timestamp: new Date().toISOString(),
        user: 'Kurye',
        metadata: order,
      });
      localStorage.setItem('activityLogs', JSON.stringify(logs));

      toast.success('🎉 Teslimat tamamlandı! Harikasınız!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
  };

  const handleNavigateToLocation = () => {
    setShowMap(true);
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

  if (showMap) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col">
        <div className="bg-[#121212] text-white p-4 shadow-lg z-10">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMap(false)}
              className="text-[#FFD600] hover:text-[#FFD600]/80"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="text-center flex-1">
              <p className="font-bold">
                {currentStep === 'deliver' ? 'Müşteri Adresine' : 'Mağazaya'} Navigasyon
              </p>
              <p className="text-xs text-gray-400 truncate">{targetAddress}</p>
            </div>
            <div className="w-10" />
          </div>
        </div>

        <div className="flex-1">
          <MockMap
            restaurantName={order.restaurant || order.shopName}
            restaurantAddress={order.restaurantAddress || order.pickupAddress}
            customerName={order.customerName}
            customerAddress={order.customerAddress || order.deliveryAddress}
            distance={order.distance}
          />
        </div>

        <div className="bg-white p-4 border-t border-gray-200">
          <Button
            onClick={() => setShowMap(false)}
            className="w-full h-14 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-bold rounded-xl"
          >
            Sipariş Ekranına Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#121212] text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="text-[#FFD600] hover:text-[#FFD600]/80"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
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

        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
          <h3 className="font-bold text-[#121212] text-lg mb-4 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-600" />
            Ödeme Bilgileri
          </h3>
          <div className="flex items-center gap-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border-2 border-green-200">
            {getPaymentIcon()}
            <div className="flex-1">
              <p className="font-bold text-[#121212] text-lg">{getPaymentText()}</p>
              {order.paymentMethod === 'cash' && (
                <p className="text-sm text-gray-700 mt-1">
                  💵 Müşteriden <strong className="text-green-700">{order.totalPrice.toFixed(2)}₺</strong> nakit tahsil edilecek
                </p>
              )}
              {order.paymentMethod === 'card' && (
                <p className="text-sm text-gray-700 mt-1">
                  💳 Müşteriden <strong className="text-blue-700">{order.totalPrice.toFixed(2)}₺</strong> kart ile tahsil edilecek
                </p>
              )}
              {order.paymentMethod === 'online' && (
                <p className="text-sm text-green-700 mt-1 font-semibold">
                  ✅ Ödeme alındı - Tahsilat gerekmiyor
                </p>
              )}
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
            <span className="text-2xl font-bold text-[#121212]">{order.totalPrice.toFixed(2)}₺</span>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-gradient-to-r from-[#FFD600] to-[#FFC107] rounded-2xl p-6 shadow-xl border-2 border-yellow-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#121212] font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Senin Kazancın
              </p>
              <p className="text-4xl font-bold text-[#121212]">
                {(order.courierEarning || (order.totalPrice * 0.7)).toFixed(2)}₺
              </p>
              <p className="text-sm text-[#121212] opacity-70 mt-1">
                {order.distance} • Tahmini süre: {Math.ceil(parseFloat(order.distance) * 3)} dakika
              </p>
            </div>
            <div className="w-20 h-20 bg-[#121212] bg-opacity-20 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-12 h-12 text-[#121212]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action - Slide to Confirm */}
      <div className="bg-white border-t-2 border-gray-200 p-6 shadow-2xl">
        <div className="relative bg-gray-200 rounded-2xl h-20 overflow-hidden mb-2">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FFD600] to-[#FFC107] rounded-2xl"
            style={{ width: `${slideProgress}%` }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-bold text-[#121212] text-lg">
              {currentStep === 'deliver'
                ? '← Kaydır ve Teslimatı Tamamla →'
                : currentStep === 'pickup'
                ? '← Kaydır: Siparişi Aldım →'
                : '← Kaydır: Mağazaya Vardım →'}
            </p>
          </div>

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDrag={(_, info) => {
              const maxWidth = window.innerWidth - 80;
              const progress = Math.max(0, Math.min(100, (info.point.x / maxWidth) * 100));
              setSlideProgress(progress);
            }}
            onDragEnd={() => {
              setIsDragging(false);
              if (slideProgress > 80) {
                handleSlideComplete();
              } else {
                setSlideProgress(0);
              }
            }}
            className="absolute left-2 top-2 w-16 h-16 bg-[#121212] rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing shadow-2xl"
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-8 h-8 text-[#FFD600]" />
          </motion.div>
        </div>
        <p className="text-center text-xs text-gray-500">
          Butonu sağa kaydırarak onaylayın
        </p>
      </div>
    </div>
  );
}
