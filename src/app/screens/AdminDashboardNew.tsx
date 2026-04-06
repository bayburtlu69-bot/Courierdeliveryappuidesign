import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  FileText,
  Store,
  Check,
  X,
  MapPin,
  Phone,
  Mail,
  Car,
  LogOut,
  ShoppingBag,
  Settings,
  History,
  DollarSign,
  Eye,
  Package,
  Navigation,
  Clock,
  User,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  XCircle,
  Info,
  Bell,
  Home,
  Plus,
  Trash2,
  PauseCircle,
  PlayCircle,
  Activity,
  Zap,
  Award,
  TrendingUp,
  BarChart3,
  Filter,
  RefreshCw,
  Send,
  Gift,
  Target,
  Star,
  UserCog,
  Headphones,
  Key,
  Building,
  Globe,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

type Tab =
  | 'dashboard'
  | 'tracking'
  | 'applications'
  | 'couriers'
  | 'shops'
  | 'employees'
  | 'testOrders'
  | 'notifications'
  | 'settings'
  | 'logs';

export function AdminDashboardNew() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminEmail');
    navigate('/admin-selector');
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Ana Sayfa', color: 'text-[#FFD600]' },
    { id: 'tracking', icon: MapPin, label: 'Canlı Takip', color: 'text-blue-400' },
    { id: 'applications', icon: FileText, label: 'Başvurular', color: 'text-purple-400', badgeKey: 'applications' },
    { id: 'couriers', icon: Users, label: 'Kuryeler', color: 'text-green-400' },
    { id: 'shops', icon: Store, label: 'Mağazalar', color: 'text-orange-400' },
    { id: 'employees', icon: Headphones, label: 'Çalışanlar', color: 'text-cyan-400' },
    { id: 'testOrders', icon: Package, label: 'Test Siparişi', color: 'text-pink-400' },
    { id: 'notifications', icon: Bell, label: 'Bildirimler', color: 'text-red-400' },
    { id: 'settings', icon: Settings, label: 'Ayarlar & Bonus', color: 'text-gray-400' },
    { id: 'logs', icon: History, label: 'Loglar', color: 'text-indigo-400' },
  ];

  const pendingCount = JSON.parse(localStorage.getItem('courierApplications') || '[]').filter(
    (a: any) => a.status === 'pending'
  ).length;

  return (
    <div className="fixed inset-0 bg-gray-50 flex">
      {/* SIDEBAR */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -260 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-72 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#0a0a0a] text-white shadow-2xl flex flex-col relative z-50 flex-shrink-0"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#FFD600] rounded-2xl flex items-center justify-center shadow-xl">
              <ShoppingBag className="w-8 h-8 text-[#121212]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#FFD600]">Baymoto</h1>
              <p className="text-xs text-white/50">Yönetim Paneli</p>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FFD600] to-[#FFC107] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[#121212]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {localStorage.getItem('adminEmail') || 'admin@baymoto.com'}
              </p>
              <p className="text-xs text-[#FFD600]">Süper Admin</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const badge = item.badgeKey === 'applications' ? pendingCount : 0;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                    isActive ? 'bg-[#FFD600] text-[#121212] shadow-lg' : 'hover:bg-white/8 text-white/80'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#121212]' : item.color}`} />
                  <span className={`font-semibold text-sm ${isActive ? 'text-[#121212]' : 'text-white'}`}>
                    {item.label}
                  </span>
                  {badge > 0 && !isActive && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="ml-auto w-4 h-4 text-[#121212]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600/80 hover:bg-red-600 text-white font-bold h-12 rounded-xl border border-red-500/30"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Çıkış Yap
          </Button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-4 top-8 w-8 h-8 bg-[#FFD600] rounded-full flex items-center justify-center shadow-xl z-50"
        >
          <ChevronRight
            className={`w-4 h-4 text-[#121212] transition-transform ${sidebarOpen ? '' : 'rotate-180'}`}
          />
        </button>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#121212]">
                {menuItems.find((item) => item.id === activeTab)?.label || 'Panel'}
              </h2>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString('tr-TR', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-2 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-green-700">Sistem Aktif</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD600] to-[#FFC107] rounded-full flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-[#121212]" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <DashboardTab key="dashboard" />}
            {activeTab === 'tracking' && <TrackingTab key="tracking" />}
            {activeTab === 'applications' && <ApplicationsTab key="applications" />}
            {activeTab === 'couriers' && <CouriersTab key="couriers" />}
            {activeTab === 'shops' && <ShopsTab key="shops" />}
            {activeTab === 'employees' && <EmployeesTab key="employees" />}
            {activeTab === 'testOrders' && <TestOrdersTab key="testOrders" />}
            {activeTab === 'notifications' && <NotificationsTab key="notifications" />}
            {activeTab === 'settings' && <SettingsTab key="settings" />}
            {activeTab === 'logs' && <LogsTab key="logs" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── TAB: DASHBOARD ───────────────────────────────────────────────
function DashboardTab() {
  const applications = JSON.parse(localStorage.getItem('courierApplications') || '[]');
  const shops = JSON.parse(localStorage.getItem('shops') || '[]');
  const pendingApps = applications.filter((a: any) => a.status === 'pending').length;

  const stats = [
    { label: 'Toplam Kurye', value: '127', icon: Users, gradient: 'from-blue-500 to-blue-700', trend: '+12%' },
    { label: 'Aktif Sipariş', value: '43', icon: Package, gradient: 'from-green-500 to-green-700', trend: '+8%' },
    { label: 'Mağazalar', value: String(shops.length || 89), icon: Store, gradient: 'from-purple-500 to-purple-700', trend: '+5%' },
    { label: 'Günlük Ciro', value: '₺45,678', icon: DollarSign, gradient: 'from-[#FFD600] to-[#FFC107]', trend: '+23%' },
    { label: 'Bekleyen Başvuru', value: String(pendingApps || 3), icon: FileText, gradient: 'from-orange-500 to-orange-700', trend: '+2' },
    { label: 'Başarı Oranı', value: '98.5%', icon: TrendingUp, gradient: 'from-teal-500 to-teal-700', trend: '+1.2%' },
  ];

  const recentActivities = [
    { icon: CheckCircle, text: 'Ahmet Yılmaz başvurusu onaylandı', time: '5 dk önce', color: 'text-green-600' },
    { icon: Package, text: 'Test siparişi #ORD-9821 oluşturuldu', time: '12 dk önce', color: 'text-blue-600' },
    { icon: Store, text: 'Pizza World mağazası eklendi', time: '1 saat önce', color: 'text-orange-600' },
    { icon: Bell, text: 'Haftalık bonus bildirimi gönderildi', time: '2 saat önce', color: 'text-purple-600' },
    { icon: XCircle, text: 'Mehmet Kaya başvurusu reddedildi', time: '3 saat önce', color: 'text-red-600' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-5 text-white shadow-xl`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-7 h-7 opacity-90" />
                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">{stat.trend}</span>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-white/80 text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-[#121212] mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#FFD600]" /> Son Aktiviteler
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <Icon className={`w-5 h-5 ${activity.color} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#121212]">{activity.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-[#121212] mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#FFD600]" /> Performans Özeti
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Ortalama Teslimat Süresi', value: '18 dk', progress: 72 },
              { label: 'Müşteri Memnuniyeti', value: '94%', progress: 94 },
              { label: 'Kurye Doluluk Oranı', value: '78%', progress: 78 },
              { label: 'Sipariş Başarı Oranı', value: '98.5%', progress: 98.5 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-bold text-[#121212]">{item.value}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full bg-gradient-to-r from-[#FFD600] to-[#FFC107] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── TAB: CANLI TAKİP (MOCK MAP) ─────────────────────────────────
function TrackingTab() {
  const [selectedCourier, setSelectedCourier] = useState<number | null>(null);
  const [animTick, setAnimTick] = useState(0);

  const mockCouriers = [
    { id: 1, name: 'Ahmet Y.',  status: 'delivering', x: 15, y: 18, order: '#SIP-1234', eta: '8 dk',  city: 'İstanbul' },
    { id: 2, name: 'Fatma D.',  status: 'online',     x: 38, y: 36, order: null,         eta: null,    city: 'Ankara' },
    { id: 3, name: 'Mehmet K.', status: 'delivering', x: 6,  y: 60, order: '#SIP-1235', eta: '12 dk', city: 'İzmir' },
    { id: 4, name: 'Ayşe Ö.',   status: 'delivering', x: 17, y: 31, order: '#SIP-1236', eta: '5 dk',  city: 'Bursa' },
    { id: 5, name: 'Can B.',    status: 'offline',    x: 27, y: 84, order: null,         eta: null,    city: 'Antalya' },
    { id: 6, name: 'Zeynep A.', status: 'online',     x: 52, y: 82, order: null,         eta: null,    city: 'Adana' },
  ];

  const cityLabels = [
    { name: 'İstanbul',   x: 15, y: 18 },
    { name: 'Ankara',     x: 38, y: 36 },
    { name: 'İzmir',      x:  6, y: 60 },
    { name: 'Bursa',      x: 17, y: 31 },
    { name: 'Antalya',    x: 27, y: 84 },
    { name: 'Adana',      x: 52, y: 82 },
    { name: 'Trabzon',    x: 74, y: 18 },
    { name: 'Kayseri',    x: 50, y: 52 },
    { name: 'Konya',      x: 36, y: 68 },
    { name: 'Diyarbakır', x: 70, y: 66 },
    { name: 'Erzurum',    x: 84, y: 36 },
    { name: 'Samsun',     x: 55, y: 19 },
  ];

  useEffect(() => {
    const interval = setInterval(() => setAnimTick((t) => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Çevrimiçi',  value: mockCouriers.filter((c) => c.status !== 'offline').length,   color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
          { label: 'Teslimatta', value: mockCouriers.filter((c) => c.status === 'delivering').length, color: 'text-blue-600',  bg: 'bg-blue-50 border-blue-200' },
          { label: 'Müsait',     value: mockCouriers.filter((c) => c.status === 'online').length,     color: 'text-[#FFD600]', bg: 'bg-yellow-50 border-yellow-200' },
          { label: 'Çevrimdışı', value: mockCouriers.filter((c) => c.status === 'offline').length,    color: 'text-gray-600',  bg: 'bg-gray-50 border-gray-200' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border-2 rounded-2xl p-4 text-center`}>
            <p className={`text-4xl font-bold ${s.color} mb-1`}>{s.value}</p>
            <p className="text-sm text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Turkey Interactive Map */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-[#121212] flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#FFD600]" />
            Türkiye — Canlı Kurye Takip
          </h3>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-full inline-block" /> Teslimatta</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full inline-block" /> Müsait</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-400 rounded-full inline-block" /> Çevrimdışı</span>
          </div>
        </div>

        {/* Map area */}
        <div className="relative bg-[#b8d8f0] overflow-hidden" style={{ height: 420 }}>
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.35) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          {/* SVG Turkey outline */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 800 420"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="landGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d9ead3" />
                <stop offset="100%" stopColor="#c2dba8" />
              </linearGradient>
            </defs>
            {/* Simplified Turkey polygon */}
            <path
              d="M 95 115 C 108 100, 128 86, 162 78 L 172 60 C 192 50, 234 44, 288 50 L 338 40 C 386 36, 430 42, 470 50 L 530 44 C 572 40, 622 48, 662 64 L 710 54 C 740 48, 762 60, 772 78 L 782 100 C 792 118, 786 136, 774 150 L 758 173 C 746 194, 724 214, 702 226 L 680 246 C 658 260, 632 270, 600 276 L 570 290 C 544 300, 509 306, 478 310 L 438 326 C 398 336, 356 340, 320 338 L 288 344 C 246 348, 204 340, 172 324 L 140 306 C 108 290, 88 266, 74 242 L 60 214 C 46 186, 42 154, 50 130 L 66 116 Z"
              fill="url(#landGrad2)"
              stroke="#9fc5a0"
              strokeWidth="2"
            />
            {/* Sea of Marmara */}
            <ellipse cx="158" cy="150" rx="30" ry="13" fill="#b8d8f0" opacity="0.85" />
            {/* Bosphorus */}
            <line x1="155" y1="136" x2="161" y2="164" stroke="#b8d8f0" strokeWidth="6" opacity="0.9" />
            {/* Van Gölü */}
            <ellipse cx="672" cy="192" rx="15" ry="8" fill="#b8d8f0" opacity="0.7" />
          </svg>

          {/* City dots + labels */}
          {cityLabels.map((city) => (
            <div
              key={city.name}
              className="absolute pointer-events-none"
              style={{ left: `${city.x}%`, top: `${city.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="w-2 h-2 bg-gray-500 rounded-full opacity-50 mx-auto" />
              <p className="text-[9px] text-gray-700 font-medium whitespace-nowrap text-center mt-0.5 opacity-80">
                {city.name}
              </p>
            </div>
          ))}

          {/* Courier markers */}
          {mockCouriers.map((courier) => {
            const dotColor =
              courier.status === 'delivering' ? '#3B82F6' :
              courier.status === 'online'     ? '#10B981' : '#9CA3AF';
            const isSelected = selectedCourier === courier.id;

            return (
              <div
                key={courier.id}
                className="absolute cursor-pointer"
                style={{ left: `${courier.x}%`, top: `${courier.y}%`, transform: 'translate(-50%,-50%)', zIndex: isSelected ? 30 : 10 }}
                onClick={() => setSelectedCourier(isSelected ? null : courier.id)}
              >
                {/* Pulse ring */}
                {courier.status !== 'offline' && (
                  <motion.div
                    key={`pulse-${courier.id}-${animTick}`}
                    initial={{ scale: 0.6, opacity: 0.7 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                    className="absolute rounded-full pointer-events-none"
                    style={{ backgroundColor: dotColor, width: 34, height: 34, top: -8, left: -8 }}
                  />
                )}

                {/* Badge */}
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative z-10 flex items-center justify-center rounded-full border-2 border-white shadow-lg select-none"
                  style={{ width: 34, height: 34, backgroundColor: dotColor }}
                >
                  <span className="text-base leading-none">🛵</span>
                </motion.div>

                {/* Info popup */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute bg-white rounded-2xl p-3 shadow-2xl border border-gray-200 z-20 min-w-[170px]"
                    style={{ bottom: 46, left: '50%', transform: 'translateX(-50%)' }}
                  >
                    <div
                      className="absolute w-3 h-3 bg-white border-r border-b border-gray-200"
                      style={{ bottom: -6, left: '50%', transform: 'translateX(-50%) rotate(45deg)' }}
                    />
                    <p className="font-bold text-[#121212] text-sm">{courier.name}</p>
                    <p className="text-xs text-gray-500">{courier.city}</p>
                    <p
                      className={`text-xs font-semibold mt-1 ${
                        courier.status === 'delivering' ? 'text-blue-600' :
                        courier.status === 'online' ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {courier.status === 'delivering' ? '🚴 Teslimatta' :
                       courier.status === 'online' ? '✅ Müsait' : '⭕ Çevrimdışı'}
                    </p>
                    {courier.order && <p className="text-xs text-blue-600 mt-1">📦 {courier.order}</p>}
                    {courier.eta   && <p className="text-xs text-gray-500">⏱️ ETA: {courier.eta}</p>}
                  </motion.div>
                )}
              </div>
            );
          })}

          {/* Corner label */}
          <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs text-gray-500 shadow-sm">
            Kurye ikonuna tıklayın
          </div>
        </div>
      </div>

      {/* Courier List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-[#121212] mb-4">Kurye Durumları</h3>
        <div className="space-y-3">
          {mockCouriers.map((courier) => (
            <div key={courier.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                  courier.status === 'delivering' ? 'bg-blue-100' :
                  courier.status === 'online'     ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                <User
                  className={`w-6 h-6 ${
                    courier.status === 'delivering' ? 'text-blue-600' :
                    courier.status === 'online'     ? 'text-green-600' : 'text-gray-400'
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[#121212]">{courier.name}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {courier.city}
                  {courier.order && <span className="ml-2 text-blue-600">• {courier.order}</span>}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    courier.status === 'delivering' ? 'bg-blue-100 text-blue-600' :
                    courier.status === 'online'     ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-500'
                  }`}
                >
                  {courier.status === 'delivering' ? 'Teslimatta' :
                   courier.status === 'online'     ? 'Müsait' : 'Çevrimdışı'}
                </span>
                {courier.eta && <p className="text-xs text-gray-400 mt-1">ETA: {courier.eta}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── TAB: BAŞVURULAR ──────────────────────────────────────────────
function ApplicationsTab() {
  const [applications, setApplications] = useState(() =>
    JSON.parse(localStorage.getItem('courierApplications') || '[]')
  );
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [viewingApp, setViewingApp] = useState<any>(null);

  const logActivity = (action: string, desc: string, type: string) => {
    const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    logs.unshift({ id: Date.now(), action, description: desc, type, timestamp: new Date().toISOString(), user: localStorage.getItem('adminEmail') || 'Admin' });
    localStorage.setItem('activityLogs', JSON.stringify(logs.slice(0, 500)));
  };

  const handleApprove = (id: number) => {
    const app = applications.find((a: any) => a.id === id);
    const updated = applications.map((a: any) => a.id === id ? { ...a, status: 'approved' } : a);
    setApplications(updated);
    localStorage.setItem('courierApplications', JSON.stringify(updated));
    logActivity('Başvuru Onaylandı', `${app?.fullName} başvurusu onaylandı`, 'success');
    toast.success('Başvuru onaylandı!');
    setViewingApp(null);
  };

  const handleReject = (id: number) => {
    const app = applications.find((a: any) => a.id === id);
    const updated = applications.map((a: any) => a.id === id ? { ...a, status: 'rejected' } : a);
    setApplications(updated);
    localStorage.setItem('courierApplications', JSON.stringify(updated));
    logActivity('Başvuru Reddedildi', `${app?.fullName} başvurusu reddedildi`, 'warning');
    toast.error('Başvuru reddedildi');
    setViewingApp(null);
  };

  const filtered = filter === 'all' ? applications : applications.filter((a: any) => a.status === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-lg flex gap-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              filter === f ? 'bg-[#FFD600] text-[#121212] shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {f === 'all' ? 'Tümü' : f === 'pending' ? 'Bekleyen' : f === 'approved' ? 'Onaylı' : 'Reddedilen'}
            <span className="ml-1 text-xs">
              ({f === 'all' ? applications.length : applications.filter((a: any) => a.status === f).length})
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-400 mb-2">Başvuru Yok</h3>
          <p className="text-gray-400">Bu kategoride başvuru bulunmuyor</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app: any) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 ${
                app.status === 'approved' ? 'border-green-500' :
                app.status === 'rejected' ? 'border-red-400' : 'border-[#FFD600]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FFD600] to-[#FFC107] rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-7 h-7 text-[#121212]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#121212]">{app.fullName || 'İsimsiz'}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      {app.email && <span className="text-sm text-gray-500 flex items-center gap-1"><Mail className="w-3 h-3" />{app.email}</span>}
                      {app.phone && <span className="text-sm text-gray-500 flex items-center gap-1"><Phone className="w-3 h-3" />{app.phone}</span>}
                      {app.vehicleType && <span className="text-sm text-gray-500 flex items-center gap-1"><Car className="w-3 h-3" />{app.vehicleType}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 rounded-xl text-sm font-bold ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    app.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {app.status === 'pending' ? '⏳ Bekliyor' :
                     app.status === 'approved' ? '✅ Onaylı' : '❌ Reddedildi'}
                  </span>

                  {/* View details for rejected apps */}
                  {app.status === 'rejected' && (
                    <Button
                      onClick={() => setViewingApp(app)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 h-10 rounded-xl"
                    >
                      <Eye className="mr-1 w-4 h-4" /> Detaylar
                    </Button>
                  )}

                  {app.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => handleApprove(app.id)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 h-10 rounded-xl"
                      >
                        <Check className="mr-1 w-4 h-4" /> Onayla
                      </Button>
                      <Button
                        onClick={() => handleReject(app.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 h-10 rounded-xl"
                      >
                        <X className="mr-1 w-4 h-4" /> Reddet
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Show rejection reason if available */}
              {app.status === 'rejected' && app.rejectionReason && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-xs font-semibold text-red-600 mb-1">Red Sebebi:</p>
                  <p className="text-sm text-red-700">{app.rejectionReason}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Rejected App Detail Modal */}
      <AnimatePresence>
        {viewingApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingApp(null)}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#121212]">{viewingApp.fullName}</h3>
                    <p className="text-red-600 font-semibold">❌ Reddedilen Başvuru</p>
                  </div>
                </div>
                <Button onClick={() => setViewingApp(null)} variant="ghost" size="icon" className="rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: Mail, label: 'E-posta', value: viewingApp.email },
                  { icon: Phone, label: 'Telefon', value: viewingApp.phone },
                  { icon: Car, label: 'Araç Tipi', value: viewingApp.vehicleType },
                  { icon: MapPin, label: 'Şehir', value: viewingApp.city },
                ].map((field, i) => (
                  field.value && (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <field.icon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">{field.label}</p>
                        <p className="font-semibold text-[#121212]">{field.value}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>

              {viewingApp.rejectionReason && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl mb-4">
                  <p className="font-bold text-red-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" /> Red Sebebi
                  </p>
                  <p className="text-red-600">{viewingApp.rejectionReason}</p>
                </div>
              )}

              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-[#121212] mb-3">Belgeler</h4>
                <div className="grid grid-cols-4 gap-3">
                  {['Ehliyet', 'Kimlik', 'Araç Ruhsatı', 'Araç Fotoğrafı'].map((doc) => (
                    <div key={doc} className="bg-gray-100 rounded-xl p-3 text-center">
                      <FileText className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs font-bold text-gray-500">{doc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => { handleApprove(viewingApp.id); setViewingApp(null); }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl"
                >
                  <Check className="mr-2 w-5 h-5" /> Yeniden Onayla
                </Button>
                <Button
                  onClick={() => setViewingApp(null)}
                  className="flex-1 bg-gray-100 text-gray-700 font-bold h-12 rounded-xl"
                >
                  Kapat
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── TAB: KURYELER ────────────────────────────────────────────────
function CouriersTab() {
  const applications = JSON.parse(localStorage.getItem('courierApplications') || '[]');
  const approvedCouriers = applications.filter((a: any) => a.status === 'approved');

  const mockCouriers = [
    { id: 1, name: 'Ahmet Yılmaz', phone: '0555 111 1111', vehicle: 'Motosiklet', rating: 4.9, deliveries: 312, online: true },
    { id: 2, name: 'Fatma Demir', phone: '0555 222 2222', vehicle: 'Bisiklet', rating: 4.7, deliveries: 187, online: false },
    { id: 3, name: 'Mehmet Kaya', phone: '0555 333 3333', vehicle: 'Motosiklet', rating: 4.8, deliveries: 245, online: true },
    ...approvedCouriers.map((c: any, i: number) => ({
      id: 100 + i, name: c.fullName, phone: c.phone, vehicle: c.vehicleType, rating: 4.5, deliveries: 0, online: false,
    })),
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#121212]">Toplam {mockCouriers.length} Kurye</h3>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-2 rounded-xl">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-green-700">{mockCouriers.filter((c) => c.online).length} Çevrimiçi</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {mockCouriers.map((courier) => (
          <motion.div
            key={courier.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${courier.online ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <User className={`w-6 h-6 ${courier.online ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h4 className="font-bold text-[#121212]">{courier.name}</h4>
                  <p className="text-xs text-gray-500">{courier.vehicle}</p>
                </div>
              </div>
              <span className={`w-3 h-3 rounded-full mt-1 ${courier.online ? 'bg-green-500' : 'bg-gray-300'}`} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-[#121212]">{courier.deliveries}</p>
                <p className="text-xs text-gray-500">Teslimat</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-[#121212]">⭐{courier.rating}</p>
                <p className="text-xs text-gray-500">Puan</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
              <Phone className="w-4 h-4" />
              <span>{courier.phone}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── TAB: MAĞAZALAR ───────────────────────────────────────────────
function ShopsTab() {
  const [shops, setShops] = useState<any[]>(() => JSON.parse(localStorage.getItem('shops') || '[]'));
  const [showAddShop, setShowAddShop] = useState(false);
  const [newShop, setNewShop] = useState({ name: '', address: '', phone: '', category: '', loginEmail: '' });
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const saveShops = (updated: any[]) => { setShops(updated); localStorage.setItem('shops', JSON.stringify(updated)); };

  const handleAddShop = () => {
    if (!newShop.name || !newShop.address) { toast.error('Mağaza adı ve adresi zorunludur!'); return; }
    const shop = { id: Date.now(), ...newShop, status: 'active', createdAt: new Date().toISOString(), orders: 0, revenue: 0 };
    saveShops([...shops, shop]);
    setNewShop({ name: '', address: '', phone: '', category: '', loginEmail: '' });
    setShowAddShop(false);
    toast.success('Mağaza başarıyla eklendi!');
  };

  const handleToggleSuspend = (id: number) => {
    const updated = shops.map((s) => s.id === id ? { ...s, status: s.status === 'active' ? 'suspended' : 'active' } : s);
    saveShops(updated);
    const shop = shops.find((s) => s.id === id);
    toast.success(shop?.status === 'active' ? 'Mağaza askıya alındı' : 'Mağaza aktifleştirildi');
  };

  const handleDelete = (id: number) => { saveShops(shops.filter((s) => s.id !== id)); setConfirmDelete(null); toast.success('Mağaza silindi!'); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#121212]">{shops.length} Mağaza Kayıtlı</h3>
        <Button onClick={() => setShowAddShop(true)} className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-bold px-5 h-11 rounded-xl shadow-lg">
          <Plus className="mr-2 w-5 h-5" /> Mağaza Ekle
        </Button>
      </div>

      <AnimatePresence>
        {showAddShop && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#FFD600]">
              <h3 className="text-xl font-bold text-[#121212] mb-5">Yeni Mağaza Ekle</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Mağaza Adı *', placeholder: 'Mağaza adı...' },
                  { key: 'category', label: 'Kategori', placeholder: 'Restoran, Market...' },
                  { key: 'address', label: 'Adres *', placeholder: 'Mağaza adresi...' },
                  { key: 'phone', label: 'Telefon', placeholder: '0555 000 0000' },
                  { key: 'loginEmail', label: 'Giriş E-postası', placeholder: 'dukkan@baymoto.com' },
                ].map((field) => (
                  <div key={field.key}>
                    <Label className="mb-2 block font-semibold">{field.label}</Label>
                    <Input value={newShop[field.key as keyof typeof newShop]} onChange={(e) => setNewShop({ ...newShop, [field.key]: e.target.value })} placeholder={field.placeholder} className="h-12" />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <Button onClick={handleAddShop} className="flex-1 h-12 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-bold rounded-xl"><Check className="mr-2 w-5 h-5" /> Kaydet</Button>
                <Button onClick={() => setShowAddShop(false)} className="flex-1 h-12 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl">İptal</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={() => setConfirmDelete(null)}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-xl font-bold text-[#121212] mb-3">Mağazayı Sil</h3>
              <p className="text-gray-600 mb-6">Bu mağazayı kalıcı olarak silmek istediğinizden emin misiniz?</p>
              <div className="flex gap-3">
                <Button onClick={() => handleDelete(confirmDelete)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-11 rounded-xl">Sil</Button>
                <Button onClick={() => setConfirmDelete(null)} className="flex-1 bg-gray-100 text-gray-700 font-bold h-11 rounded-xl">Vazgeç</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {shops.length === 0 ? (
        <div className="text-center py-20">
          <Store className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400 mb-2">Henüz mağaza yok</h3>
          <p className="text-gray-400">İlk mağazayı eklemek için butona tıklayın</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {shops.map((shop) => (
            <motion.div key={shop.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`bg-white rounded-2xl p-5 shadow-lg border-l-4 ${shop.status === 'active' ? 'border-[#FFD600]' : 'border-gray-300 opacity-75'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${shop.status === 'active' ? 'bg-[#FFD600]' : 'bg-gray-200'}`}>
                    <Store className={`w-6 h-6 ${shop.status === 'active' ? 'text-[#121212]' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#121212]">{shop.name}</h4>
                    {shop.category && <p className="text-xs text-gray-500">{shop.category}</p>}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${shop.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {shop.status === 'active' ? 'Aktif' : 'Askıda'}
                </span>
              </div>
              {shop.address && <p className="text-sm text-gray-500 flex items-center gap-1 mb-2"><MapPin className="w-3 h-3" /> {shop.address}</p>}
              {shop.loginEmail && <p className="text-sm text-gray-500 flex items-center gap-1 mb-3"><Mail className="w-3 h-3" /> {shop.loginEmail}</p>}
              <div className="flex gap-2">
                <button onClick={() => handleToggleSuspend(shop.id)} className={`flex-1 h-9 rounded-xl text-sm font-bold flex items-center justify-center gap-1 transition-colors ${shop.status === 'active' ? 'bg-orange-100 hover:bg-orange-200 text-orange-700' : 'bg-green-100 hover:bg-green-200 text-green-700'}`}>
                  {shop.status === 'active' ? <><PauseCircle className="w-4 h-4" /> Askıya Al</> : <><PlayCircle className="w-4 h-4" /> Aktifleştir</>}
                </button>
                <button onClick={() => setConfirmDelete(shop.id)} className="w-9 h-9 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── TAB: ÇALIŞANLAR ──────────────────────────────────────────────
function EmployeesTab() {
  const [employees, setEmployees] = useState<any[]>(() =>
    JSON.parse(localStorage.getItem('supportEmployees') || '[]')
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', password: '', phone: '' });
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const saveEmployees = (updated: any[]) => {
    setEmployees(updated);
    localStorage.setItem('supportEmployees', JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.password) {
      toast.error('Ad, e-posta ve şifre zorunludur!');
      return;
    }
    const emp = {
      id: Date.now(),
      ...newEmployee,
      role: 'support',
      status: 'active',
      createdAt: new Date().toISOString(),
      ticketsHandled: 0,
    };
    saveEmployees([...employees, emp]);
    setNewEmployee({ name: '', email: '', password: '', phone: '' });
    setShowAddForm(false);
    
    // Also save login credentials for EmployeeLogin
    const empLogins = JSON.parse(localStorage.getItem('employeeLogins') || '[]');
    empLogins.push({ email: emp.email, password: emp.password, name: emp.name });
    localStorage.setItem('employeeLogins', JSON.stringify(empLogins));
    
    toast.success('Destek çalışanı eklendi!');
  };

  const handleDelete = (id: number) => {
    const emp = employees.find((e) => e.id === id);
    saveEmployees(employees.filter((e) => e.id !== id));
    
    // Remove from employee logins too
    const empLogins = JSON.parse(localStorage.getItem('employeeLogins') || '[]');
    localStorage.setItem('employeeLogins', JSON.stringify(empLogins.filter((l: any) => l.email !== emp?.email)));
    
    setConfirmDelete(null);
    toast.success('Çalışan silindi!');
  };

  const handleToggleStatus = (id: number) => {
    const updated = employees.map((e) => e.id === id ? { ...e, status: e.status === 'active' ? 'inactive' : 'active' } : e);
    saveEmployees(updated);
    const emp = employees.find((e) => e.id === id);
    toast.success(emp?.status === 'active' ? 'Çalışan devre dışı bırakıldı' : 'Çalışan aktifleştirildi');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#121212]">Destek Çalışanları</h3>
          <p className="text-sm text-gray-500">{employees.length} çalışan kayıtlı</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-bold px-5 h-11 rounded-xl shadow-lg">
          <Plus className="mr-2 w-5 h-5" /> Çalışan Ekle
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#FFD600]">
              <h3 className="text-xl font-bold text-[#121212] mb-5 flex items-center gap-2">
                <UserCog className="w-6 h-6 text-[#FFD600]" /> Yeni Destek Çalışanı Ekle
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block font-semibold">Ad Soyad *</Label>
                  <Input value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} placeholder="Çalışan adı..." className="h-12" />
                </div>
                <div>
                  <Label className="mb-2 block font-semibold">E-posta *</Label>
                  <Input value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} type="email" placeholder="destek@baymoto.com" className="h-12" />
                </div>
                <div>
                  <Label className="mb-2 block font-semibold">Şifre *</Label>
                  <Input value={newEmployee.password} onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })} type="password" placeholder="Güvenli şifre..." className="h-12" />
                </div>
                <div>
                  <Label className="mb-2 block font-semibold">Telefon</Label>
                  <Input value={newEmployee.phone} onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })} placeholder="0555 000 0000" className="h-12" />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button onClick={handleAdd} className="flex-1 h-12 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-bold rounded-xl"><Check className="mr-2 w-5 h-5" /> Ekle</Button>
                <Button onClick={() => setShowAddForm(false)} className="flex-1 h-12 bg-gray-100 text-gray-700 font-bold rounded-xl">İptal</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {employees.length === 0 ? (
        <div className="text-center py-20">
          <Headphones className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400 mb-2">Henüz çalışan yok</h3>
          <p className="text-gray-400">İlk destek çalışanını eklemek için butona tıklayın</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {employees.map((emp) => (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-white rounded-2xl p-5 shadow-lg border-l-4 ${emp.status === 'active' ? 'border-[#FFD600]' : 'border-gray-300'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${emp.status === 'active' ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                    <Headphones className={`w-6 h-6 ${emp.status === 'active' ? 'text-[#FFD600]' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#121212]">{emp.name}</h4>
                    <p className="text-xs text-gray-500">{emp.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${emp.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {emp.status === 'active' ? '● Aktif' : '○ Pasif'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Key className="w-4 h-4" />
                <span>Giriş: {emp.email}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus(emp.id)}
                  className={`flex-1 h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors ${emp.status === 'active' ? 'bg-orange-100 hover:bg-orange-200 text-orange-700' : 'bg-green-100 hover:bg-green-200 text-green-700'}`}
                >
                  {emp.status === 'active' ? <><PauseCircle className="w-4 h-4" /> Devre Dışı</> : <><PlayCircle className="w-4 h-4" /> Aktifleştir</>}
                </button>
                <button onClick={() => setConfirmDelete(emp.id)} className="w-9 h-9 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {confirmDelete !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={() => setConfirmDelete(null)}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-xl font-bold text-[#121212] mb-3">Çalışanı Sil</h3>
              <p className="text-gray-600 mb-6">Bu çalışanı sisteme girişi engellenecek. Emin misiniz?</p>
              <div className="flex gap-3">
                <Button onClick={() => handleDelete(confirmDelete!)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-11 rounded-xl">Sil</Button>
                <Button onClick={() => setConfirmDelete(null)} className="flex-1 bg-gray-100 text-gray-700 font-bold h-11 rounded-xl">Vazgeç</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── TAB: TEST SİPARİŞİ ───────────────────────────────────────────
function TestOrdersTab() {
  const [shopName, setShopName] = useState('Test Restoran');
  const [pickupAddr, setPickupAddr] = useState('Kadıköy Moda Caddesi No:45');
  const [deliveryAddr, setDeliveryAddr] = useState('Beşiktaş Barbaros Bulvarı No:88');
  const [price, setPrice] = useState('85.50');
  const [distance, setDistance] = useState('3.2 km');
  const [createdOrders, setCreatedOrders] = useState<any[]>(() =>
    JSON.parse(localStorage.getItem('activeOrders') || '[]').filter((o: any) => o.source === 'test')
  );

  const handleCreateOrder = () => {
    const order = {
      id: `SIP-${Date.now().toString().slice(-5)}`,
      shopName, pickupAddress: pickupAddr, deliveryAddress: deliveryAddr,
      price: parseFloat(price) || 50, distance, estimatedTime: '20 dk',
      status: 'new', source: 'test', createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem('activeOrders') || '[]');
    localStorage.setItem('activeOrders', JSON.stringify([...existing, order]));
    setCreatedOrders([...createdOrders, order]);
    toast.success(`Test siparişi oluşturuldu: ${order.id}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-[#121212] mb-5 flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#FFD600]" /> Test Siparişi Oluştur
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="mb-2 block font-semibold">Mağaza Adı</Label><Input value={shopName} onChange={(e) => setShopName(e.target.value)} className="h-12" /></div>
            <div><Label className="mb-2 block font-semibold">Sipariş Tutarı (₺)</Label><Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="h-12" /></div>
          </div>
          <div><Label className="mb-2 block font-semibold">Alım Adresi</Label><Input value={pickupAddr} onChange={(e) => setPickupAddr(e.target.value)} className="h-12" /></div>
          <div><Label className="mb-2 block font-semibold">Teslimat Adresi</Label><Input value={deliveryAddr} onChange={(e) => setDeliveryAddr(e.target.value)} className="h-12" /></div>
          <div><Label className="mb-2 block font-semibold">Mesafe</Label><Input value={distance} onChange={(e) => setDistance(e.target.value)} className="h-12" /></div>
          <Button onClick={handleCreateOrder} className="w-full h-14 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-bold text-lg rounded-xl shadow-lg">
            <Package className="mr-2 w-6 h-6" /> Test Siparişi Gönder
          </Button>
        </div>
      </div>

      {createdOrders.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-[#121212] mb-4">Oluşturulan Test Siparişleri</h3>
          <div className="space-y-3">
            {createdOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-bold text-[#121212]">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.shopName} → {order.deliveryAddress}</p>
                </div>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold">₺{order.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── TAB: BİLDİRİMLER ────────────────────────────────────────────
function NotificationsTab() {
  const [notifications, setNotifications] = useState(() => JSON.parse(localStorage.getItem('globalNotifications') || '[]'));
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [notifType, setNotifType] = useState<'info' | 'success' | 'warning'>('info');

  const handleAdd = () => {
    if (!newTitle.trim() || !newMessage.trim()) { toast.error('Başlık ve mesaj boş bırakılamaz!'); return; }
    const notif = { id: Date.now(), title: newTitle, message: newMessage, type: notifType, date: new Date().toISOString() };
    const updated = [notif, ...notifications];
    setNotifications(updated);
    localStorage.setItem('globalNotifications', JSON.stringify(updated));
    setNewTitle(''); setNewMessage('');
    toast.success('Bildirim gönderildi!');
  };

  const handleDelete = (id: number) => {
    const updated = notifications.filter((n: any) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('globalNotifications', JSON.stringify(updated));
    toast.success('Bildirim silindi!');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-[#121212] mb-5 flex items-center gap-2"><Bell className="w-6 h-6 text-[#FFD600]" /> Yeni Bildirim Gönder</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            {(['info', 'success', 'warning'] as const).map((type) => (
              <button key={type} onClick={() => setNotifType(type)} className={`flex-1 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all ${notifType === type ? type === 'info' ? 'border-blue-500 bg-blue-50 text-blue-700' : type === 'success' ? 'border-green-500 bg-green-50 text-green-700' : 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-500'}`}>
                {type === 'info' ? '💡 Bilgi' : type === 'success' ? '✅ Başarı' : '⚠️ Uyarı'}
              </button>
            ))}
          </div>
          <div><Label className="mb-2 block font-semibold">Başlık</Label><Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Bildirim başlığı..." className="h-12" /></div>
          <div><Label className="mb-2 block font-semibold">Mesaj</Label><textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Bildirim mesajı..." rows={4} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FFD600] focus:outline-none text-base resize-none" /></div>
          <Button onClick={handleAdd} className="w-full h-14 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-bold text-lg rounded-xl"><Send className="mr-2 w-5 h-5" /> Bildirimi Gönder</Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-[#121212] mb-5">Gönderilen Bildirimler ({notifications.length})</h3>
        <div className="space-y-3">
          {notifications.map((notif: any) => (
            <motion.div key={notif.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`rounded-xl p-4 flex items-start justify-between border-l-4 ${notif.type === 'success' ? 'bg-green-50 border-green-500' : notif.type === 'warning' ? 'bg-orange-50 border-orange-500' : 'bg-blue-50 border-blue-500'}`}>
              <div className="flex-1">
                <h4 className="font-bold text-[#121212] mb-1">{notif.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                <p className="text-xs text-gray-400">{new Date(notif.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <button onClick={() => handleDelete(notif.id)} className="ml-4 w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
            </motion.div>
          ))}
          {notifications.length === 0 && <div className="text-center py-12 text-gray-400"><Bell className="w-16 h-16 mx-auto mb-3 opacity-50" /><p>Henüz bildirim gönderilmedi</p></div>}
        </div>
      </div>
    </motion.div>
  );
}

// ─── TAB: AYARLAR & BONUS (ACCORDION) ─────────────────────────────
function SettingsTab() {
  const [openSections, setOpenSections] = useState<string[]>(['pricing']);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  const [pricePerKm, setPricePerKm] = useState(() => parseFloat(localStorage.getItem('pricePerKm') || '15'));
  const [basePrice, setBasePrice] = useState(() => parseFloat(localStorage.getItem('basePrice') || '25'));

  const savePricing = () => {
    localStorage.setItem('pricePerKm', pricePerKm.toString());
    localStorage.setItem('basePrice', basePrice.toString());
    toast.success('Fiyatlandırma güncellendi!');
  };

  // Bonus
  const [bonusEnabled, setBonusEnabled] = useState(() => localStorage.getItem('bonusEnabled') !== 'false');
  const [bonusTiers, setBonusTiers] = useState<any[]>(() =>
    JSON.parse(localStorage.getItem('bonusTiers') || JSON.stringify([
      { id: 1, deliveries: 30, amount: 150, label: 'Bronz Bonus' },
      { id: 2, deliveries: 50, amount: 300, label: 'Gümüş Bonus' },
      { id: 3, deliveries: 80, amount: 600, label: 'Altın Bonus' },
      { id: 4, deliveries: 100, amount: 1000, label: 'Elmas Bonus' },
    ]))
  );
  const [editingTier, setEditingTier] = useState<any>(null);
  const [showAddTier, setShowAddTier] = useState(false);
  const [newTier, setNewTier] = useState({ deliveries: '', amount: '', label: '' });

  const saveBonusTiers = (tiers: any[]) => { setBonusTiers(tiers); localStorage.setItem('bonusTiers', JSON.stringify(tiers)); };
  const handleUpdateTier = (id: number, field: string, value: string) => {
    const updated = bonusTiers.map((t) => t.id === id ? { ...t, [field]: field === 'label' ? value : parseFloat(value) || 0 } : t);
    saveBonusTiers(updated);
  };
  const handleDeleteTier = (id: number) => { saveBonusTiers(bonusTiers.filter((t) => t.id !== id)); toast.success('Bonus kademesi silindi!'); };
  const handleAddTier = () => {
    if (!newTier.deliveries || !newTier.amount || !newTier.label) { toast.error('Tüm alanları doldurun!'); return; }
    const tier = { id: Date.now(), deliveries: parseFloat(newTier.deliveries), amount: parseFloat(newTier.amount), label: newTier.label };
    saveBonusTiers([...bonusTiers, tier].sort((a, b) => a.deliveries - b.deliveries));
    setNewTier({ deliveries: '', amount: '', label: '' });
    setShowAddTier(false);
    toast.success('Bonus kademesi eklendi!');
  };
  const handleToggleBonus = () => {
    const newVal = !bonusEnabled; setBonusEnabled(newVal);
    localStorage.setItem('bonusEnabled', newVal.toString());
    toast.success(newVal ? 'Haftalık bonus sistemi aktifleştirildi!' : 'Haftalık bonus sistemi durduruldu!');
  };

  // Cities
  const allCities = [
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana',
    'Konya', 'Gaziantep', 'Mersin', 'Diyarbakır', 'Kayseri', 'Eskişehir',
    'Samsun', 'Denizli', 'Trabzon', 'Malatya', 'Elazığ', 'Erzurum',
    'Van', 'Hatay', 'Kahramanmaraş', 'Şanlıurfa', 'Mardin', 'Ordu',
  ];
  const [activeCities, setActiveCities] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem('activeCities') || JSON.stringify(['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya']))
  );
  const [citySearch, setCitySearch] = useState('');

  const toggleCity = (city: string) => {
    const updated = activeCities.includes(city)
      ? activeCities.filter((c) => c !== city)
      : [...activeCities, city];
    setActiveCities(updated);
    localStorage.setItem('activeCities', JSON.stringify(updated));
    toast.success(`${city} ${updated.includes(city) ? 'aktifleştirildi' : 'devre dışı bırakıldı'}`);
  };

  const filteredCities = allCities.filter((c) => c.toLowerCase().includes(citySearch.toLowerCase()));

  const sections = [
    { key: 'pricing', title: 'Fiyatlandırma Ayarları', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { key: 'bonus', title: 'Haftalık Bonus Sistemi', icon: Gift, color: 'text-[#FFD600]', bg: 'bg-yellow-50' },
    { key: 'cities', title: 'İl Yönetimi', icon: Building, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 max-w-4xl">
      {sections.map((section) => (
        <div key={section.key} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Section Header */}
          <button
            onClick={() => toggleSection(section.key)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${section.bg} rounded-xl flex items-center justify-center`}>
                <section.icon className={`w-5 h-5 ${section.color}`} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-[#121212]">{section.title}</h3>
                {section.key === 'cities' && (
                  <p className="text-xs text-gray-500">{activeCities.length} il aktif</p>
                )}
                {section.key === 'bonus' && (
                  <p className="text-xs text-gray-500">{bonusEnabled ? '✅ Aktif' : '⭕ Devre dışı'}</p>
                )}
                {section.key === 'pricing' && (
                  <p className="text-xs text-gray-500">Baz: ₺{basePrice} • Km: ₺{pricePerKm}</p>
                )}
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSections.includes(section.key) ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {openSections.includes(section.key) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-5 border-t border-gray-100">
                  {/* PRICING */}
                  {section.key === 'pricing' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label className="mb-2 block font-semibold">Km Başı Ücret (₺)</Label>
                          <Input type="number" value={pricePerKm} onChange={(e) => setPricePerKm(parseFloat(e.target.value) || 0)} className="h-12 text-lg" />
                          <p className="text-xs text-gray-500 mt-1">Her km için kurye komisyonu</p>
                        </div>
                        <div>
                          <Label className="mb-2 block font-semibold">Baz Ücret (₺)</Label>
                          <Input type="number" value={basePrice} onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)} className="h-12 text-lg" />
                          <p className="text-xs text-gray-500 mt-1">Minimum sipariş ücreti</p>
                        </div>
                      </div>
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <p className="text-sm text-yellow-800">
                          <strong>Örnek hesaplama:</strong> 3 km mesafeli sipariş için kurye kazancı: ₺{basePrice} + (3 × ₺{pricePerKm}) = <strong>₺{(basePrice + 3 * pricePerKm).toFixed(2)}</strong>
                        </p>
                      </div>
                      <Button onClick={savePricing} className="w-full h-12 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-bold rounded-xl">
                        Fiyatlandırmayı Kaydet
                      </Button>
                    </div>
                  )}

                  {/* BONUS */}
                  {section.key === 'bonus' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">Haftalık bonus sistemi aktif/pasif</p>
                        <button type="button" onClick={handleToggleBonus} className={`relative w-16 h-8 rounded-full transition-all duration-300 shadow-md ${bonusEnabled ? 'bg-[#FFD600]' : 'bg-gray-300'}`}>
                          <motion.div animate={{ x: bonusEnabled ? 32 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-lg ${bonusEnabled ? 'bg-[#121212]' : 'bg-white'}`} />
                        </button>
                      </div>

                      <div className={`${!bonusEnabled ? 'opacity-50 pointer-events-none' : ''} space-y-3`}>
                        {bonusTiers.sort((a, b) => a.deliveries - b.deliveries).map((tier) => (
                          <div key={tier.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-yellow-50 rounded-xl border border-yellow-200">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#FFD600] to-[#FFC107] rounded-xl flex items-center justify-center shadow-md">
                              <Award className="w-6 h-6 text-[#121212]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              {editingTier === tier.id ? (
                                <div className="grid grid-cols-3 gap-2">
                                  <Input defaultValue={tier.label} onBlur={(e) => handleUpdateTier(tier.id, 'label', e.target.value)} placeholder="Kademe adı" className="h-9 text-sm" />
                                  <Input defaultValue={tier.deliveries} onBlur={(e) => handleUpdateTier(tier.id, 'deliveries', e.target.value)} type="number" placeholder="Teslimat" className="h-9 text-sm" />
                                  <Input defaultValue={tier.amount} onBlur={(e) => handleUpdateTier(tier.id, 'amount', e.target.value)} type="number" placeholder="Bonus (₺)" className="h-9 text-sm" />
                                </div>
                              ) : (
                                <>
                                  <p className="font-bold text-[#121212]">{tier.label}</p>
                                  <div className="flex items-center gap-4 mt-1">
                                    <span className="text-sm text-gray-600 flex items-center gap-1"><Target className="w-3 h-3" /> {tier.deliveries} teslimat</span>
                                    <span className="text-sm font-bold text-green-600">+₺{tier.amount} bonus</span>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => setEditingTier(editingTier === tier.id ? null : tier.id)} className="w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg flex items-center justify-center">
                                {editingTier === tier.id ? <Check className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
                              </button>
                              <button onClick={() => handleDeleteTier(tier.id)} className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}

                        <AnimatePresence>
                          {showAddTier && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                                <h4 className="font-bold text-blue-800 mb-3">Yeni Kademe Ekle</h4>
                                <div className="grid grid-cols-3 gap-3">
                                  <div><Label className="mb-1 block text-sm">Kademe Adı</Label><Input value={newTier.label} onChange={(e) => setNewTier({ ...newTier, label: e.target.value })} placeholder="Platin Bonus" className="h-10" /></div>
                                  <div><Label className="mb-1 block text-sm">Teslimat Sayısı</Label><Input value={newTier.deliveries} onChange={(e) => setNewTier({ ...newTier, deliveries: e.target.value })} type="number" placeholder="120" className="h-10" /></div>
                                  <div><Label className="mb-1 block text-sm">Bonus Tutarı (₺)</Label><Input value={newTier.amount} onChange={(e) => setNewTier({ ...newTier, amount: e.target.value })} type="number" placeholder="1500" className="h-10" /></div>
                                </div>
                                <div className="flex gap-2 mt-3">
                                  <Button onClick={handleAddTier} className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 rounded-xl px-5">Ekle</Button>
                                  <Button onClick={() => setShowAddTier(false)} className="bg-gray-100 text-gray-700 font-bold h-10 rounded-xl px-5">İptal</Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <Button onClick={() => setShowAddTier(true)} className="w-full h-11 bg-[#121212] hover:bg-[#2a2a2a] text-[#FFD600] font-bold rounded-xl">
                          <Plus className="mr-2 w-5 h-5" /> Yeni Bonus Kademesi Ekle
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* CITIES */}
                  {section.key === 'cities' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600"><strong>{activeCities.length}</strong> aktif il, <strong>{allCities.length - activeCities.length}</strong> pasif il</p>
                      </div>

                      <Input
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        placeholder="İl ara..."
                        className="h-11"
                      />

                      <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                        {filteredCities.map((city) => {
                          const isActive = activeCities.includes(city);
                          return (
                            <button
                              key={city}
                              onClick={() => toggleCity(city)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                                isActive
                                  ? 'bg-[#FFD600] border-[#FFD600] text-[#121212]'
                                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                              }`}
                            >
                              <span>{city}</span>
                              {isActive && <Check className="w-3.5 h-3.5" />}
                            </button>
                          );
                        })}
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
                        💡 Aktif iller kurye uygulama kayıt sayfasında seçilebilir bölgeler olarak görünür.
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}

// ─── TAB: LOGLAR ──────────────────────────────────────────────────
function LogsTab() {
  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem('activityLogs') || '[]'));
  const [filter, setFilter] = useState<'all' | 'success' | 'warning' | 'error' | 'info'>('all');

  const handleClear = () => { localStorage.setItem('activityLogs', '[]'); setLogs([]); toast.success('Loglar temizlendi!'); };
  const handleRefresh = () => { setLogs(JSON.parse(localStorage.getItem('activityLogs') || '[]')); toast.success('Loglar yenilendi!'); };

  const filtered = filter === 'all' ? logs : logs.filter((l: any) => l.type === filter);

  const typeColors: Record<string, string> = { success: 'border-green-500 bg-green-50', warning: 'border-orange-500 bg-orange-50', error: 'border-red-500 bg-red-50', info: 'border-blue-500 bg-blue-50' };
  const typeIcons: Record<string, any> = { success: CheckCircle, warning: AlertCircle, error: XCircle, info: Info };
  const typeTextColors: Record<string, string> = { success: 'text-green-600', warning: 'text-orange-600', error: 'text-red-600', info: 'text-blue-600' };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 bg-white p-1.5 rounded-xl shadow-md">
          {(['all', 'success', 'warning', 'error', 'info'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filter === f ? 'bg-[#FFD600] text-[#121212] shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
              {f === 'all' ? 'Tümü' : f === 'success' ? '✅' : f === 'warning' ? '⚠️' : f === 'error' ? '❌' : 'ℹ️'}
              {f !== 'all' && ` ${f}`}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold h-10 rounded-xl px-4 shadow-sm"><RefreshCw className="mr-1 w-4 h-4" /> Yenile</Button>
          <Button onClick={handleClear} className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold h-10 rounded-xl px-4"><Trash2 className="mr-1 w-4 h-4" /> Temizle</Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400"><History className="w-16 h-16 mx-auto mb-3 opacity-50" /><p>Henüz log kaydı yok</p></div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((log: any, i: number) => {
              const Icon = typeIcons[log.type] || Info;
              return (
                <motion.div key={log.id || i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: Math.min(i * 0.02, 0.3) }} className={`p-4 flex items-start gap-4 border-l-4 ${typeColors[log.type] || 'border-gray-300 bg-white'}`}>
                  <Icon className={`w-5 h-5 ${typeTextColors[log.type] || 'text-gray-400'} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-[#121212]">{log.action}</p>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{new Date(log.timestamp).toLocaleString('tr-TR')}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">{log.description}</p>
                    {log.user && <p className="text-xs text-gray-400 mt-1">👤 {log.user}</p>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
