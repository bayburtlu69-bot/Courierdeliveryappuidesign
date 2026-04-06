import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  FileText,
  Store,
  Plus,
  Check,
  X,
  MapPin,
  Phone,
  Mail,
  Car,
  LogOut,
  ShoppingBag,
  TrendingUp,
  Activity,
  Settings,
  History,
  DollarSign,
  Eye,
  Package,
  CreditCard,
  Banknote,
  Navigation,
  Clock,
  User,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

type Tab = 'applications' | 'couriers' | 'shops' | 'testOrders' | 'settings' | 'logs' | 'tracking';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('tracking');
  const [applications, setApplications] = useState(() => {
    return JSON.parse(localStorage.getItem('courierApplications') || '[]');
  });
  const [showAddShop, setShowAddShop] = useState(false);
  const [showTestOrder, setShowTestOrder] = useState(false);
  const [pricePerKm, setPricePerKm] = useState(() => {
    return parseFloat(localStorage.getItem('pricePerKm') || '15');
  });
  const [basePrice, setBasePrice] = useState(() => {
    return parseFloat(localStorage.getItem('basePrice') || '25');
  });

  const handleLogout = () => {
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminEmail');
    navigate('/admin-selector');
  };

  const handleApprove = (id: number) => {
    const app = applications.find((a: any) => a.id === id);
    const updated = applications.map((a: any) =>
      a.id === id ? { ...a, status: 'approved' } : a
    );
    setApplications(updated);
    localStorage.setItem('courierApplications', JSON.stringify(updated));
    
    logActivity('Başvuru Onaylandı', `${app?.fullName} adlı kurye başvurusu onaylandı`, 'success');
    toast.success('Başvuru onaylandı!');
  };

  const handleReject = (id: number) => {
    const app = applications.find((a: any) => a.id === id);
    const updated = applications.map((a: any) =>
      a.id === id ? { ...a, status: 'rejected' } : a
    );
    setApplications(updated);
    localStorage.setItem('courierApplications', JSON.stringify(updated));
    
    logActivity('Başvuru Reddedildi', `${app?.fullName} adlı kurye başvurusu reddedildi`, 'warning');
    toast.error('Başvuru reddedildi');
  };

  const logActivity = (action: string, description: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', metadata?: any) => {
    const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    logs.unshift({
      id: Date.now(),
      action,
      description,
      type,
      timestamp: new Date().toISOString(),
      user: localStorage.getItem('adminEmail') || 'Admin',
      metadata: metadata || {},
    });
    localStorage.setItem('activityLogs', JSON.stringify(logs.slice(0, 500))); // Keep last 500 logs
  };

  const handleSavePricing = () => {
    localStorage.setItem('pricePerKm', pricePerKm.toString());
    localStorage.setItem('basePrice', basePrice.toString());
    logActivity('Fiyatlandırma Güncellendi', `Baz ücret: ${basePrice}₺, Km başı: ${pricePerKm}₺`, 'success');
    toast.success('Fiyatlandırma güncellendi!');
  };

  const approvedCouriers = applications.filter((app: any) => app.status === 'approved');
  const shops = JSON.parse(localStorage.getItem('shops') || '[]');
  const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] text-white p-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Yönetim Paneli</h1>
            <p className="text-gray-300 text-sm mt-1">Tam sistem kontrolü ve analitik</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-[#FFD600] hover:text-[#FFD600]/80 hover:bg-white/10"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-6 gap-4">
            <StatCard
              icon={FileText}
              label="Bekleyen Başvurular"
              value={applications.filter((a: any) => a.status === 'pending').length}
              color="#FFD600"
              trend="+3"
            />
            <StatCard
              icon={Users}
              label="Aktif Kuryeler"
              value={approvedCouriers.length}
              color="#4CAF50"
              trend="+12"
            />
            <StatCard
              icon={Store}
              label="Kayıtlı Mağazalar"
              value={shops.length}
              color="#2196F3"
              trend="+5"
            />
            <StatCard
              icon={Package}
              label="Toplam Siparişler"
              value={allOrders.length || "0"}
              color="#FF5722"
              trend="+28"
            />
            <StatCard
              icon={DollarSign}
              label="Toplam Ciro"
              value={`${(allOrders.reduce((sum: number, o: any) => sum + (o.totalPrice || 0), 0) || 0).toFixed(0)}₺`}
              color="#9C27B0"
              trend="+15%"
            />
            <StatCard
              icon={TrendingUp}
              label="Başarı Oranı"
              value="98.5%"
              color="#00BCD4"
              trend="+2.1%"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex gap-2">
          <TabButton
            active={activeTab === 'tracking'}
            onClick={() => setActiveTab('tracking')}
            icon={Activity}
            label="Canlı Takip"
            badge={allOrders.filter((o: any) => o.status === 'active').length}
          />
          <TabButton
            active={activeTab === 'applications'}
            onClick={() => setActiveTab('applications')}
            icon={FileText}
            label="Başvurular"
            badge={applications.filter((a: any) => a.status === 'pending').length}
          />
          <TabButton
            active={activeTab === 'couriers'}
            onClick={() => setActiveTab('couriers')}
            icon={Users}
            label="Kuryeler"
          />
          <TabButton
            active={activeTab === 'shops'}
            onClick={() => setActiveTab('shops')}
            icon={Store}
            label="Mağazalar"
          />
          <TabButton
            active={activeTab === 'testOrders'}
            onClick={() => setActiveTab('testOrders')}
            icon={ShoppingBag}
            label="Test Siparişleri"
          />
          <TabButton
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
            icon={Settings}
            label="Ayarlar"
          />
          <TabButton
            active={activeTab === 'logs'}
            onClick={() => setActiveTab('logs')}
            icon={History}
            label="Aktivite Logları"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'tracking' && <TrackingTab allOrders={allOrders} couriers={approvedCouriers} />}
            {activeTab === 'applications' && (
              <ApplicationsTab
                applications={applications}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            )}
            {activeTab === 'couriers' && <CouriersTab couriers={approvedCouriers} />}
            {activeTab === 'shops' && (
              <ShopsTab
                shops={shops}
                showAddShop={showAddShop}
                setShowAddShop={setShowAddShop}
                logActivity={logActivity}
              />
            )}
            {activeTab === 'testOrders' && (
              <TestOrdersTab
                showTestOrder={showTestOrder}
                setShowTestOrder={setShowTestOrder}
                logActivity={logActivity}
                pricePerKm={pricePerKm}
                basePrice={basePrice}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsTab
                pricePerKm={pricePerKm}
                setPricePerKm={setPricePerKm}
                basePrice={basePrice}
                setBasePrice={setBasePrice}
                onSave={handleSavePricing}
              />
            )}
            {activeTab === 'logs' && <LogsTab />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, trend }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-gray-200 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        {trend && (
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-gray-600 text-xs mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#121212]">{value}</p>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon: Icon, label, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 py-4 px-4 border-b-3 transition-all ${
        active
          ? 'border-[#FFD600] text-[#121212] font-semibold'
          : 'border-transparent text-gray-500 hover:text-[#121212] hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-semibold">{label}</span>
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

// Canlı Takip Sekmesi
function TrackingTab({ allOrders, couriers }: any) {
  const activeOrders = allOrders.filter((o: any) => o.status === 'active' || o.status === 'new');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#121212]">Canlı Sipariş Takibi</h2>
        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          {activeOrders.length} Aktif Sipariş
        </span>
      </div>

      {activeOrders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Şu anda aktif sipariş bulunmuyor</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {activeOrders.map((order: any) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#121212] mb-1">Sipariş #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString('tr-TR')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === 'new' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status === 'new' ? 'Yeni' : 'Devam Ediyor'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Store className="w-4 h-4 text-gray-600" />
                    <p className="text-xs text-gray-600">Mağaza</p>
                  </div>
                  <p className="font-semibold text-[#121212]">{order.shopName}</p>
                  <p className="text-xs text-gray-600">{order.pickupAddress}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <p className="text-xs text-gray-600">Teslimat</p>
                  </div>
                  <p className="font-semibold text-[#121212]">{order.customerName}</p>
                  <p className="text-xs text-gray-600">{order.deliveryAddress}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    <p className="text-xs text-gray-600">Ödeme</p>
                  </div>
                  <p className="font-semibold text-[#121212]">{order.totalPrice?.toFixed(2) || '0.00'}₺</p>
                  <p className="text-xs text-gray-600">
                    {order.paymentMethod === 'cash' ? 'Kapıda Ödeme' : 
                     order.paymentMethod === 'card' ? 'Kartla' : 'Online Ödendi'}
                  </p>
                </div>
              </div>

              {order.courierName && (
                <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-[#121212]">Kurye: {order.courierName}</p>
                    <p className="text-xs text-gray-600">Teslimat yapıyor</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ApplicationsTab({ applications, onApprove, onReject }: any) {
  const [viewingApp, setViewingApp] = useState<any>(null);
  const pendingApps = applications.filter((app: any) => app.status === 'pending');

  if (pendingApps.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-20"
      >
        <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Bekleyen başvuru bulunmuyor</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-[#121212] mb-6">Kurye Başvuruları</h2>
      
      {pendingApps.map((app: any) => (
        <motion.div
          key={app.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-[#121212]">{app.fullName}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Başvuru tarihi: {new Date(app.submittedAt).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold">
              İnceleme Bekliyor
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <InfoRow icon={Mail} label="E-posta" value={app.email} />
            <InfoRow icon={Phone} label="Telefon" value={app.phone} />
            <InfoRow icon={MapPin} label="Konum" value={app.location} />
            <InfoRow icon={Car} label="Araç" value={`${app.vehicleType} - ${app.licensePlate}`} />
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">📄 Yüklenen Belgeler:</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                <Check className="w-4 h-4" />
                <span>Sürücü Belgesi</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                <Check className="w-4 h-4" />
                <span>Araç Ruhsatı</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                <Check className="w-4 h-4" />
                <span>Araç Fotoğrafı</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                <Check className="w-4 h-4" />
                <span>Kimlik Belgesi</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setViewingApp(app)}
              variant="outline"
              className="flex-1 h-12 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold"
            >
              <Eye className="mr-2 w-5 h-5" />
              Detayları İncele
            </Button>
            <Button
              onClick={() => onApprove(app.id)}
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              <Check className="mr-2 w-5 h-5" />
              Onayla
            </Button>
            <Button
              onClick={() => onReject(app.id)}
              className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              <X className="mr-2 w-5 h-5" />
              Reddet
            </Button>
          </div>
        </motion.div>
      ))}

      {viewingApp && (
        <ApplicationDetailsModal
          application={viewingApp}
          onClose={() => setViewingApp(null)}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}
    </motion.div>
  );
}

function ApplicationDetailsModal({ application, onClose, onApprove, onReject }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{application.fullName}</h2>
              <p className="text-blue-100 text-sm mt-1">Başvuru Detayları</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#121212] mb-4">👤 Kişisel Bilgiler</h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoBox icon={User} label="Ad Soyad" value={application.fullName} />
              <InfoBox icon={Mail} label="E-posta" value={application.email} />
              <InfoBox icon={Phone} label="Telefon" value={application.phone} />
              <InfoBox icon={MapPin} label="Çalışma Bölgesi" value={application.location} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#121212] mb-4">🚗 Araç Bilgileri</h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoBox icon={Car} label="Araç Tipi" value={application.vehicleType} />
              <InfoBox icon={Car} label="Plaka" value={application.licensePlate} />
              <InfoBox icon={FileText} label="Ehliyet No" value={application.licenseNumber} />
              <InfoBox icon={FileText} label="Ruhsat No" value={application.registration} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#121212] mb-4">📎 Yüklenen Belgeler</h3>
            <div className="grid grid-cols-2 gap-4">
              <DocumentCard label="Sürücü Belgesi" filename={application.driverLicenseImage} />
              <DocumentCard label="Araç Ruhsatı" filename={application.vehicleRegistrationImage} />
              <DocumentCard label="Araç Fotoğrafı" filename={application.vehiclePhotoImage} />
              <DocumentCard label="Kimlik Fotoğrafı" filename={application.idPhotoImage} />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t-2 border-gray-200">
            <Button
              onClick={() => {
                onApprove(application.id);
                onClose();
              }}
              className="flex-1 h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-bold"
            >
              <Check className="mr-2 w-6 h-6" />
              Başvuruyu Onayla
            </Button>
            <Button
              onClick={() => {
                onReject(application.id);
                onClose();
              }}
              className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white text-lg font-bold"
            >
              <X className="mr-2 w-6 h-6" />
              Başvuruyu Reddet
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CouriersTab({ couriers }: any) {
  if (couriers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-20"
      >
        <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Henüz aktif kurye bulunmuyor</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-[#121212] mb-6">Aktif Kuryeler</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {couriers.map((courier: any) => (
          <motion.div
            key={courier.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                {courier.fullName.charAt(0)}
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Çevrimiçi
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#121212] mb-1">{courier.fullName}</h3>
            <p className="text-sm text-gray-600 mb-4">{courier.location}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{courier.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Car className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{courier.vehicleType} - {courier.licensePlate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{courier.email}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-gray-600">Teslimat</p>
                  <p className="text-lg font-bold text-[#121212]">0</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Puan</p>
                  <p className="text-lg font-bold text-[#121212]">5.0</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Kazanç</p>
                  <p className="text-lg font-bold text-[#121212]">0₺</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ShopsTab({ shops, showAddShop, setShowAddShop, logActivity }: any) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    category: 'restaurant',
    address: '',
  });

  const handleAddShop = (e: React.FormEvent) => {
    e.preventDefault();
    const newShop = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    const updated = [...shops, newShop];
    localStorage.setItem('shops', JSON.stringify(updated));
    
    logActivity('Mağaza Eklendi', `${formData.name} (${formData.category}) sisteme eklendi`, 'success');
    
    toast.success('Mağaza başarıyla eklendi!');
    setShowAddShop(false);
    setFormData({ name: '', email: '', phone: '', password: '', category: 'restaurant', address: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#121212]">Mağaza Yönetimi</h2>
        <Button
          onClick={() => setShowAddShop(!showAddShop)}
          className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-bold h-12 px-6"
        >
          <Plus className="mr-2 w-5 h-5" />
          Yeni Mağaza Ekle
        </Button>
      </div>

      <AnimatePresence>
        {showAddShop && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddShop}
            className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold mb-4">Yeni Mağaza Bilgileri</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label>Mağaza Adı *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Örn: İtalyan Bistro"
                  required
                  className="h-12"
                />
              </div>
              <div>
                <Label>Kategori *</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-12 px-3 rounded-lg border-2 border-gray-300 bg-white focus:border-[#FFD600] focus:outline-none"
                  required
                >
                  <option value="restaurant">🍽️ Restoran</option>
                  <option value="cafe">☕ Kafe</option>
                  <option value="market">🛒 Market</option>
                  <option value="pharmacy">💊 Eczane</option>
                  <option value="electronics">📱 Elektronik</option>
                  <option value="clothing">👔 Giyim</option>
                  <option value="bakery">🥖 Fırın</option>
                  <option value="butcher">🥩 Kasap</option>
                  <option value="greengrocer">🥬 Manav</option>
                  <option value="other">📦 Diğer</option>
                </select>
              </div>
              <div>
                <Label>E-posta *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="magaza@example.com"
                  required
                  className="h-12"
                />
              </div>
              <div>
                <Label>Telefon *</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+90 5XX XXX XX XX"
                  required
                  className="h-12"
                />
              </div>
              <div>
                <Label>Şifre *</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Güvenli şifre belirleyin"
                  required
                  className="h-12"
                />
              </div>
              <div>
                <Label>Adres *</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Mağaza adresi"
                  required
                  className="h-12"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setShowAddShop(false)}
                variant="outline"
                className="flex-1 h-12"
              >
                İptal
              </Button>
              <Button type="submit" className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-bold">
                Mağazayı Ekle
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {shops.length === 0 ? (
        <div className="text-center py-20">
          <Store className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Henüz kayıtlı mağaza bulunmuyor</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shops.map((shop: any) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                  🏪
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">
                  {shop.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#121212] mb-3">{shop.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{shop.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{shop.phone}</span>
                </div>
                {shop.address && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{shop.address}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function TestOrdersTab({ showTestOrder, setShowTestOrder, logActivity, pricePerKm, basePrice }: any) {
  const [testOrder, setTestOrder] = useState({
    shopName: 'Test Restoranı',
    pickupAddress: 'Kadıköy, İstanbul - Test Mahallesi No:123',
    deliveryAddress: 'Beşiktaş, İstanbul - Örnek Sokak No:45 Daire:5',
    customerName: 'Test Müşteri',
    customerPhone: '+90 555 123 4567',
    items: 'Margherita Pizza x2, Kola x1, Patates Kızartması x1',
    distance: 5.5,
    paymentMethod: 'cash',
  });

  const calculatePrice = () => {
    return basePrice + (testOrder.distance * pricePerKm);
  };

  const handleCreateTestOrder = () => {
    const totalPrice = calculatePrice();
    const order = {
      id: `SIP${Date.now()}`,
      ...testOrder,
      totalPrice,
      courierEarning: (totalPrice * 0.7).toFixed(2),
      status: 'new',
      createdAt: new Date().toISOString(),
      estimatedTime: `${Math.ceil(testOrder.distance * 3)} dk`,
    };
    
    const orders = JSON.parse(localStorage.getItem('activeOrders') || '[]');
    orders.push(order);
    localStorage.setItem('activeOrders', JSON.stringify(orders));

    const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    allOrders.push(order);
    localStorage.setItem('allOrders', JSON.stringify(allOrders));
    
    logActivity('Test Siparişi Oluşturuldu', `${order.id} numaralı test siparişi oluşturuldu - ${totalPrice.toFixed(2)}₺`, 'info', order);
    
    toast.success('Test siparişi oluşturuldu! Kurye uygulamasını kontrol edin.');
    setShowTestOrder(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#121212]">Test Siparişi Oluştur</h2>
        <Button
          onClick={() => setShowTestOrder(!showTestOrder)}
          className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-bold h-12 px-6"
        >
          <Plus className="mr-2 w-5 h-5" />
          Yeni Test Siparişi
        </Button>
      </div>

      <AnimatePresence>
        {showTestOrder && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold mb-6">Test Siparişi Detayları</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label>Mağaza Adı</Label>
                <Input
                  value={testOrder.shopName}
                  onChange={(e) => setTestOrder({ ...testOrder, shopName: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <Label>Alış Adresi</Label>
                <Input
                  value={testOrder.pickupAddress}
                  onChange={(e) => setTestOrder({ ...testOrder, pickupAddress: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <Label>Teslimat Adresi (Detaylı)</Label>
                <Input
                  value={testOrder.deliveryAddress}
                  onChange={(e) => setTestOrder({ ...testOrder, deliveryAddress: e.target.value })}
                  className="h-12"
                  placeholder="Tam adres, mahalle, cadde, bina no, daire no"
                />
              </div>
              <div>
                <Label>Müşteri Adı</Label>
                <Input
                  value={testOrder.customerName}
                  onChange={(e) => setTestOrder({ ...testOrder, customerName: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <Label>Müşteri Telefonu</Label>
                <Input
                  value={testOrder.customerPhone}
                  onChange={(e) => setTestOrder({ ...testOrder, customerPhone: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <Label>Mesafe (km)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={testOrder.distance}
                  onChange={(e) => setTestOrder({ ...testOrder, distance: parseFloat(e.target.value) })}
                  className="h-12"
                />
              </div>
              <div className="col-span-2">
                <Label>Ürünler</Label>
                <Input
                  value={testOrder.items}
                  onChange={(e) => setTestOrder({ ...testOrder, items: e.target.value })}
                  className="h-12"
                  placeholder="Ürün listesi"
                />
              </div>
              <div>
                <Label>Ödeme Yöntemi</Label>
                <select
                  value={testOrder.paymentMethod}
                  onChange={(e) => setTestOrder({ ...testOrder, paymentMethod: e.target.value })}
                  className="w-full h-12 px-3 rounded-lg border-2 border-gray-300 bg-white focus:border-[#FFD600] focus:outline-none"
                >
                  <option value="cash">💵 Kapıda Nakit Ödeme</option>
                  <option value="card">💳 Kapıda Kart ile Ödeme</option>
                  <option value="online">✅ Online Ödendi</option>
                </select>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-[#121212] mb-3">💰 Fiyat Hesaplama:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Baz Ücret:</span>
                  <span className="font-semibold">{basePrice.toFixed(2)}₺</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Mesafe ({testOrder.distance} km × {pricePerKm}₺):</span>
                  <span className="font-semibold">{(testOrder.distance * pricePerKm).toFixed(2)}₺</span>
                </div>
                <div className="border-t-2 border-blue-200 pt-2 flex justify-between">
                  <span className="font-bold text-[#121212]">Toplam Tutar:</span>
                  <span className="font-bold text-[#121212] text-lg">{calculatePrice().toFixed(2)}₺</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Kurye Kazancı (70%):</span>
                  <span className="font-bold">{(calculatePrice() * 0.7).toFixed(2)}₺</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCreateTestOrder}
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-bold"
            >
              <ShoppingBag className="mr-2 w-6 h-6" />
              Test Siparişini Oluştur
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
        <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Test Nasıl Yapılır?
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-yellow-800 text-sm">
          <li>Yukarıdaki formu kullanarak test siparişi oluşturun</li>
          <li>Kurye uygulamasının ana sayfasına gidin ve "Çevrimiçi" olun</li>
          <li>Test siparişi otomatik olarak bildirim olarak gelecektir</li>
          <li>Siparişi kabul edin ve teslimat sürecini test edin</li>
          <li>Konum takibi ve ödeme işlemlerini kontrol edin</li>
        </ol>
      </div>
    </motion.div>
  );
}

function SettingsTab({ pricePerKm, setPricePerKm, basePrice, setBasePrice, onSave }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl"
    >
      <h2 className="text-2xl font-bold text-[#121212] mb-6">Sistem Ayarları</h2>

      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg mb-6">
        <h3 className="text-xl font-bold text-[#121212] mb-6 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" />
          Fiyatlandırma Ayarları
        </h3>
        
        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold mb-3 block">Baz Teslimat Ücreti (₺)</Label>
            <Input
              type="number"
              step="0.01"
              value={basePrice}
              onChange={(e) => setBasePrice(parseFloat(e.target.value))}
              className="h-14 text-xl font-bold"
            />
            <p className="text-sm text-gray-600 mt-2">
              Her teslimat için sabit başlangıç ücreti
            </p>
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">Kilometre Başına Ücret (₺)</Label>
            <Input
              type="number"
              step="0.01"
              value={pricePerKm}
              onChange={(e) => setPricePerKm(parseFloat(e.target.value))}
              className="h-14 text-xl font-bold"
            />
            <p className="text-sm text-gray-600 mt-2">
              Her kilometre için ek ücret
            </p>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
            <h4 className="font-bold text-[#121212] mb-4">📊 Örnek Hesaplamalar:</h4>
            <div className="space-y-3">
              {[2, 5, 10, 15].map((km) => {
                const total = basePrice + (km * pricePerKm);
                const courierEarning = total * 0.7;
                return (
                  <div key={km} className="flex justify-between items-center bg-white rounded-lg p-3">
                    <span className="text-gray-700 font-medium">{km} km teslimat:</span>
                    <div className="text-right">
                      <span className="font-bold text-[#121212] text-lg">{total.toFixed(2)}₺</span>
                      <span className="text-sm text-green-600 ml-2">(Kurye: {courierEarning.toFixed(2)}₺)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            onClick={onSave}
            className="w-full h-14 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] text-lg font-bold"
          >
            <Check className="mr-2 w-6 h-6" />
            Ayarları Kaydet
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <p className="text-sm text-blue-800 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Not:</strong> Fiyat değişiklikleri yalnızca yeni siparişler için geçerli olacaktır. 
            Mevcut siparişler eski fiyatlandırma ile devam eder.
          </span>
        </p>
      </div>
    </motion.div>
  );
}

function LogsTab() {
  const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
  const [filter, setFilter] = useState<string>('all');

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter((log: any) => log.type === filter);

  if (logs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-20"
      >
        <History className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Henüz aktivite logu bulunmuyor</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#121212]">Aktivite Logları</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className="h-10"
          >
            Tümü ({logs.length})
          </Button>
          <Button
            onClick={() => setFilter('success')}
            variant={filter === 'success' ? 'default' : 'outline'}
            className="h-10 text-green-600"
          >
            Başarılı
          </Button>
          <Button
            onClick={() => setFilter('warning')}
            variant={filter === 'warning' ? 'default' : 'outline'}
            className="h-10 text-orange-600"
          >
            Uyarı
          </Button>
          <Button
            onClick={() => setFilter('error')}
            variant={filter === 'error' ? 'default' : 'outline'}
            className="h-10 text-red-600"
          >
            Hata
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredLogs.map((log: any, index: number) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white rounded-xl border-2 p-5 hover:shadow-lg transition-all ${
              log.type === 'success' ? 'border-green-200' :
              log.type === 'warning' ? 'border-orange-200' :
              log.type === 'error' ? 'border-red-200' :
              'border-gray-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                log.type === 'success' ? 'bg-green-100' :
                log.type === 'warning' ? 'bg-orange-100' :
                log.type === 'error' ? 'bg-red-100' :
                'bg-blue-100'
              }`}>
                <Activity className={`w-6 h-6 ${
                  log.type === 'success' ? 'text-green-600' :
                  log.type === 'warning' ? 'text-orange-600' :
                  log.type === 'error' ? 'text-red-600' :
                  'text-blue-600'
                }`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-[#121212] text-lg">{log.action}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(log.timestamp).toLocaleString('tr-TR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{log.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {log.user}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function InfoRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
      <Icon className="w-5 h-5 text-gray-400" />
      <div>
        <p className="text-xs text-gray-600">{label}</p>
        <p className="text-sm font-semibold text-[#121212]">{value}</p>
      </div>
    </div>
  );
}

function InfoBox({ icon: Icon, label, value }: any) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-gray-600" />
        <p className="text-xs text-gray-600 font-semibold">{label}</p>
      </div>
      <p className="text-base font-bold text-[#121212]">{value}</p>
    </div>
  );
}

function DocumentCard({ label, filename }: any) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#121212] mb-1">{label}</p>
          <p className="text-xs text-gray-700 truncate">{filename || 'Belge yüklenmedi'}</p>
          <div className="mt-2">
            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-semibold">
              ✓ Yüklendi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
