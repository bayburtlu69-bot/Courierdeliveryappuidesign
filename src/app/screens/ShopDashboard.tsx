import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  LogOut,
  BarChart3,
  Store,
  ChevronRight,
  Home,
  History,
  Settings,
  Bell,
  User,
  ShoppingBag,
  Plus,
  Filter,
  Star,
  MapPin,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

type ShopTab = 'dashboard' | 'orders' | 'history' | 'settings';

export function ShopDashboard() {
  const navigate = useNavigate();
  const shopName = localStorage.getItem('shopName') || 'Mağazam';
  const [activeTab, setActiveTab] = useState<ShopTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('shopName');
    navigate('/admin-selector');
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Ana Sayfa', color: 'text-[#FFD600]' },
    { id: 'orders', icon: Package, label: 'Aktif Siparişler', color: 'text-blue-400', badge: '7' },
    { id: 'history', icon: History, label: 'Sipariş Geçmişi', color: 'text-green-400' },
    { id: 'settings', icon: Settings, label: 'Mağaza Ayarları', color: 'text-gray-400' },
  ];

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
              <Store className="w-8 h-8 text-[#121212]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#FFD600]">Baymoto</h1>
              <p className="text-xs text-white/50">Mağaza Paneli</p>
            </div>
          </div>
        </div>

        {/* Shop Info */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FFD600] to-[#FFC107] rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#121212]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{shopName}</p>
              <p className="text-xs text-[#FFD600]">Aktif Mağaza</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ShopTab)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#FFD600] text-[#121212] shadow-lg'
                      : 'hover:bg-white/8 text-white/80'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#121212]' : item.color}`} />
                  <span className={`font-semibold text-sm ${isActive ? 'text-[#121212]' : 'text-white'}`}>
                    {item.label}
                  </span>
                  {item.badge && !isActive && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
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
            className="w-full bg-red-600/80 hover:bg-red-600 text-white font-bold h-12 rounded-xl"
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
                {menuItems.find((m) => m.id === activeTab)?.label || 'Panel'}
              </h2>
              <p className="text-sm text-gray-500">{shopName}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD600] to-[#FFC107] rounded-full flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-[#121212]" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <ShopDashboardContent key="dashboard" shopName={shopName} />}
            {activeTab === 'orders' && <ShopOrdersContent key="orders" />}
            {activeTab === 'history' && <ShopHistoryContent key="history" />}
            {activeTab === 'settings' && <ShopSettingsContent key="settings" shopName={shopName} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── SHOP DASHBOARD ───────────────────────────────────────────────
function ShopDashboardContent({ shopName }: { shopName: string }) {
  const stats = {
    todayOrders: 47,
    todayRevenue: 3420,
    weeklyOrders: 312,
    weeklyRevenue: 28150,
    monthlyOrders: 1245,
    monthlyRevenue: 112380,
    avgOrderValue: 90.25,
    completionRate: 98.5,
  };

  const weeklyData = [
    { day: 'Pzt', orders: 38, revenue: 3420 },
    { day: 'Sal', orders: 42, revenue: 3890 },
    { day: 'Çar', orders: 55, revenue: 4920 },
    { day: 'Per', orders: 48, revenue: 4125 },
    { day: 'Cum', orders: 65, revenue: 5890 },
    { day: 'Cmt', orders: 52, revenue: 4680 },
    { day: 'Paz', orders: 45, revenue: 4050 },
  ];

  const orderTypeData = [
    { name: 'Tamamlandı', value: 287, color: '#4CAF50' },
    { name: 'Yolda', value: 18, color: '#FFD600' },
    { name: 'Hazırlanıyor', value: 7, color: '#2196F3' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Package, label: 'Bugünkü Siparişler', value: stats.todayOrders, color: '#FFD600', sub: 'Toplam sipariş' },
          { icon: DollarSign, label: 'Bugünkü Ciro', value: `₺${stats.todayRevenue}`, color: '#4CAF50', sub: 'Günlük gelir' },
          { icon: TrendingUp, label: 'Haftalık Sipariş', value: stats.weeklyOrders, color: '#2196F3', sub: 'Son 7 gün' },
          { icon: CheckCircle, label: 'Tamamlanma Oranı', value: `%${stats.completionRate}`, color: '#9C27B0', sub: 'Başarı yüzdesi' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-md" style={{ backgroundColor: `${s.color}20` }}>
                <Icon className="w-6 h-6" style={{ color: s.color }} />
              </div>
              <h3 className="text-3xl font-bold text-[#121212] mb-1">{s.value}</h3>
              <p className="text-sm font-semibold text-gray-700">{s.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Weekly Revenue */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#121212]">Haftalık Ciro</h3>
              <p className="text-sm text-gray-500 mt-1">Son 7 günlük gelir trendi</p>
            </div>
            <div className="w-10 h-10 bg-[#FFD600] rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[#121212]" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" tick={{ fontSize: 12 }} />
              <YAxis stroke="#666" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#121212', border: 'none', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="revenue" fill="#FFD600" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#121212]">Sipariş Dağılımı</h3>
              <p className="text-sm text-gray-500 mt-1">Bu hafta toplam 312 sipariş</p>
            </div>
            <div className="w-10 h-10 bg-[#121212] rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-[#FFD600]" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={orderTypeData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={5} dataKey="value">
                {orderTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#121212', border: 'none', borderRadius: '12px', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {orderTypeData.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gradient-to-br from-[#121212] to-[#2a2a2a] rounded-2xl p-6 text-white shadow-2xl">
        <h3 className="text-xl font-bold text-[#FFD600] mb-5">Performans Özeti</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Aylık Ciro', value: `₺${stats.monthlyRevenue.toLocaleString()}` },
            { label: 'Aylık Sipariş', value: stats.monthlyOrders },
            { label: 'Ortalama Sepet', value: `₺${stats.avgOrderValue}` },
            { label: 'Başarı Oranı', value: `%${stats.completionRate}` },
          ].map((m, i) => (
            <div key={i} className="text-center bg-white/10 rounded-xl p-4">
              <div className="text-3xl font-bold text-[#FFD600] mb-1">{m.value}</div>
              <div className="text-white/70 text-sm">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── ACTIVE ORDERS ────────────────────────────────────────────────
function ShopOrdersContent() {
  const orders = [
    { id: 'SIP-1001', customer: 'Ahmet Yılmaz', items: 'Margherita Pizza x2', status: 'preparing', time: '5 dk önce', amount: 185 },
    { id: 'SIP-1002', customer: 'Fatma Demir', items: 'Burger Menü x1', status: 'ready', time: '8 dk önce', amount: 95 },
    { id: 'SIP-1003', customer: 'Mehmet Kaya', items: 'Lazanya + Salata', status: 'courier', time: '12 dk önce', amount: 120 },
    { id: 'SIP-1004', customer: 'Ayşe Öz', items: 'Vegan Bowl x2', status: 'preparing', time: '2 dk önce', amount: 160 },
    { id: 'SIP-1005', customer: 'Can Bak', items: 'Steak + Tatlı', status: 'ready', time: '15 dk önce', amount: 250 },
    { id: 'SIP-1006', customer: 'Zeynep Al', items: 'Döner Dürüm x3', status: 'courier', time: '20 dk önce', amount: 135 },
    { id: 'SIP-1007', customer: 'Emre Çelik', items: 'Burger Menü x2', status: 'preparing', time: '1 dk önce', amount: 190 },
  ];

  const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
    preparing: { label: '🍳 Hazırlanıyor', bg: 'bg-blue-100', text: 'text-blue-700' },
    ready: { label: '✅ Hazır', bg: 'bg-green-100', text: 'text-green-700' },
    courier: { label: '🏍️ Kuryede', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Hazırlanıyor', count: orders.filter(o => o.status === 'preparing').length, bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700' },
          { label: 'Hazır', count: orders.filter(o => o.status === 'ready').length, bg: 'bg-green-50 border-green-200', text: 'text-green-700' },
          { label: 'Kuryede', count: orders.filter(o => o.status === 'courier').length, bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border-2 rounded-2xl p-4 text-center`}>
            <p className={`text-4xl font-bold ${s.text} mb-1`}>{s.count}</p>
            <p className="text-sm text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const status = statusConfig[order.status];
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-[#FFD600] rounded-xl flex items-center justify-center flex-shrink-0">
                <Package className="w-7 h-7 text-[#121212]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold text-[#121212]">{order.id}</h4>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{order.customer}</p>
                <p className="text-xs text-gray-400 mt-0.5">{order.items}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600">₺{order.amount}</p>
                <p className="text-xs text-gray-400">{order.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── HISTORY ─────────────────────────────────────────────────────
function ShopHistoryContent() {
  const orders = Array.from({ length: 15 }, (_, i) => ({
    id: `SIP-${900 + i}`,
    customer: ['Ahmet Y.', 'Fatma D.', 'Mehmet K.', 'Ayşe Ö.', 'Can B.'][i % 5],
    amount: 80 + (i * 15),
    date: new Date(Date.now() - i * 3600000).toLocaleDateString('tr-TR'),
    rating: [4, 5, 5, 4, 3][i % 5],
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
      {orders.map((order, i) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
          className="bg-white rounded-2xl p-5 shadow-md flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[#121212]">{order.id} - {order.customer}</p>
            <p className="text-sm text-gray-500">{order.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: order.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-lg font-bold text-green-600">₺{order.amount}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── SETTINGS ────────────────────────────────────────────────────
function ShopSettingsContent({ shopName }: { shopName: string }) {
  const [name, setName] = useState(shopName);
  const [address, setAddress] = useState('Kadıköy Moda Caddesi No:45, İstanbul');
  const [phone, setPhone] = useState('0555 123 4567');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-[#121212] mb-5">Mağaza Bilgileri</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mağaza Adı</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-[#FFD600] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Adres</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-[#FFD600] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-[#FFD600] focus:outline-none" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-[#121212]">Mağaza Durumu</p>
              <p className="text-sm text-gray-500">{isOpen ? 'Şu an siparişe açık' : 'Siparişe kapalı'}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-16 h-8 rounded-full transition-all ${isOpen ? 'bg-[#FFD600]' : 'bg-gray-300'}`}
            >
              <motion.div
                animate={{ x: isOpen ? 32 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-lg ${isOpen ? 'bg-[#121212]' : 'bg-white'}`}
              />
            </button>
          </div>
          <Button className="w-full h-12 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-bold rounded-xl">
            Kaydet
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
