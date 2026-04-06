import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  TrendingUp,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  LogOut,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  LineChart,
  Line,
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
} from 'recharts';

export function ShopDashboard() {
  const navigate = useNavigate();
  const shopName = localStorage.getItem('shopName') || 'Mağazam';

  const handleLogout = () => {
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('shopName');
    navigate('/admin-selector');
  };

  // Mock data - gerçek uygulamada API'den gelecek
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
    { name: 'Yolda', value: 18, color: '#FFC107' },
    { name: 'Hazırlanıyor', value: 7, color: '#2196F3' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{shopName}</h1>
            <p className="text-purple-100 text-sm mt-1">Mağaza Yönetim Paneli</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard
              icon={Package}
              label="Bugünkü Siparişler"
              value={stats.todayOrders}
              color="#2196F3"
              subtitle="Toplam sipariş sayısı"
            />
            <StatCard
              icon={DollarSign}
              label="Bugünkü Ciro"
              value={`${stats.todayRevenue}₺`}
              color="#4CAF50"
              subtitle="Günlük gelir"
            />
            <StatCard
              icon={TrendingUp}
              label="Haftalık Siparişler"
              value={stats.weeklyOrders}
              color="#FF9800"
              subtitle="+12% artış"
            />
            <StatCard
              icon={CheckCircle}
              label="Tamamlanma Oranı"
              value={`${stats.completionRate}%`}
              color="#9C27B0"
              subtitle="Başarı oranı"
            />
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
            <h3 className="text-xl font-bold text-[#121212] mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              Aylık Performans Özeti
            </h3>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-3">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-[#121212] mb-1">{stats.monthlyOrders}</p>
                <p className="text-sm text-gray-600">Toplam Sipariş</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-2xl flex items-center justify-center mb-3">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-[#121212] mb-1">{stats.monthlyRevenue}₺</p>
                <p className="text-sm text-gray-600">Toplam Ciro</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-2xl flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-[#121212] mb-1">{stats.avgOrderValue}₺</p>
                <p className="text-sm text-gray-600">Ort. Sipariş Tutarı</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center mb-3">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-[#121212] mb-1">18 dk</p>
                <p className="text-sm text-gray-600">Ort. Hazırlık Süresi</p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6">
            {/* Weekly Orders Chart */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-[#121212] mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Haftalık Sipariş Dağılımı
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px' 
                    }}
                  />
                  <Bar dataKey="orders" fill="#2196F3" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly Revenue Chart */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-[#121212] mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Haftalık Ciro Trendi
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px' 
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4CAF50" 
                    strokeWidth={3}
                    dot={{ fill: '#4CAF50', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Status Pie */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-[#121212] mb-4">Sipariş Durum Dağılımı</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
              <h4 className="font-bold text-blue-900 mb-2">📊 En Çok Satan Ürün</h4>
              <p className="text-2xl font-bold text-blue-900">Margherita Pizza</p>
              <p className="text-sm text-blue-700 mt-1">Bu ay 287 adet satıldı</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
              <h4 className="font-bold text-green-900 mb-2">⭐ Müşteri Puanı</h4>
              <p className="text-2xl font-bold text-green-900">4.8 / 5.0</p>
              <p className="text-sm text-green-700 mt-1">542 değerlendirme</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6">
              <h4 className="font-bold text-orange-900 mb-2">🚀 En Yoğun Saat</h4>
              <p className="text-2xl font-bold text-orange-900">19:00 - 21:00</p>
              <p className="text-sm text-orange-700 mt-1">Günlük siparişlerin %35'i</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, subtitle }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-2">{label}</p>
      <p className="text-3xl font-bold text-[#121212] mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </motion.div>
  );
}
