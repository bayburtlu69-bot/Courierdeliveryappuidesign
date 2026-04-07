import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download, Award, Target, Gift, Star, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
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
} from 'recharts';
import { useAppTheme } from '../utils/useAppTheme';

type Period = 'daily' | 'weekly' | 'monthly';

const TIER_ICONS = ['🥉', '🥈', '🥇', '💎'];
const TIER_COLORS = [
  { bg: 'from-orange-400 to-orange-600', border: 'border-orange-300' },
  { bg: 'from-gray-400 to-gray-600', border: 'border-gray-300' },
  { bg: 'from-yellow-400 to-yellow-600', border: 'border-yellow-300' },
  { bg: 'from-blue-400 to-blue-600', border: 'border-blue-300' },
];

export function Earnings() {
  const navigate = useNavigate();
  const theme = useAppTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('weekly');

  const dailyData = [
    { name: 'Pzt', earnings: 120 },
    { name: 'Sal', earnings: 150 },
    { name: 'Çar', earnings: 180 },
    { name: 'Per', earnings: 140 },
    { name: 'Cum', earnings: 200 },
    { name: 'Cmt', earnings: 250 },
    { name: 'Paz', earnings: 220 },
  ];

  const weeklyData = [
    { name: 'Hafta 1', earnings: 840 },
    { name: 'Hafta 2', earnings: 920 },
    { name: 'Hafta 3', earnings: 1050 },
    { name: 'Hafta 4', earnings: 1100 },
  ];

  const monthlyData = [
    { name: 'Oca', earnings: 3200 },
    { name: 'Şub', earnings: 3800 },
    { name: 'Mar', earnings: 4200 },
    { name: 'Nis', earnings: 4500 },
    { name: 'May', earnings: 4100 },
    { name: 'Haz', earnings: 4800 },
  ];

  const stats = {
    daily: { total: 220.0, deliveries: 18, bonus: 25.0, average: 12.22 },
    weekly: { total: 1260.0, deliveries: 98, bonus: 150.0, average: 12.86 },
    monthly: { total: 4800.0, deliveries: 385, bonus: 580.0, average: 12.47 },
  };

  const currentStats = stats[selectedPeriod];
  const chartData = selectedPeriod === 'daily' ? dailyData : selectedPeriod === 'weekly' ? weeklyData : monthlyData;

  const handleDownloadPDF = () => {
    const courierName = localStorage.getItem('courierName') || 'Kurye';
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fmt = (d: Date) => d.toLocaleDateString('tr-TR');

    const html = `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"/>
<title>Jetgo Haftalık Kazanç Raporu</title>
<style>
  body{font-family:Arial,sans-serif;padding:32px;color:#121212;background:#fff;}
  .header{background:#121212;color:#FFD600;padding:20px 24px;border-radius:12px;margin-bottom:24px;}
  .header h1{margin:0;font-size:22px;}
  .header p{margin:4px 0 0;font-size:13px;color:#ccc;}
  .card{background:#f9f9f9;border:1px solid #eee;border-radius:10px;padding:16px 20px;margin-bottom:16px;}
  .row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee;}
  .row:last-child{border-bottom:none;}
  .label{color:#666;font-size:14px;}
  .value{font-weight:bold;font-size:14px;}
  .total{font-size:28px;font-weight:900;color:#121212;text-align:center;margin:20px 0;}
  .badge{display:inline-block;background:#FFD600;color:#121212;border-radius:20px;padding:4px 14px;font-weight:bold;font-size:13px;}
  table{width:100%;border-collapse:collapse;margin-top:8px;}
  th{background:#121212;color:#FFD600;padding:8px 12px;text-align:left;font-size:13px;}
  td{padding:8px 12px;font-size:13px;border-bottom:1px solid #eee;}
  tr:nth-child(even) td{background:#f5f5f5;}
  .footer{text-align:center;margin-top:32px;font-size:11px;color:#999;}
</style></head><body>
<div class="header">
  <h1>🛵 Jetgo — Haftalık Kazanç Raporu</h1>
  <p>${courierName} &nbsp;|&nbsp; ${fmt(weekAgo)} – ${fmt(today)}</p>
</div>
<div class="total">₺${stats.weekly.total.toFixed(2)}</div>
<div style="text-align:center;margin-bottom:20px"><span class="badge">Haftalık Toplam</span></div>
<div class="card">
  <div class="row"><span class="label">Toplam Teslimat</span><span class="value">${stats.weekly.deliveries}</span></div>
  <div class="row"><span class="label">Bonus Kazancı</span><span class="value">₺${stats.weekly.bonus}</span></div>
  <div class="row"><span class="label">Teslimat Başı Ortalama</span><span class="value">₺${stats.weekly.average.toFixed(2)}</span></div>
  <div class="row"><span class="label">Puan Ortalaması</span><span class="value">⭐ 4.8 / 5.0</span></div>
</div>
<table>
  <tr><th>Gün</th><th>Kazanç</th></tr>
  ${dailyData.map(d => `<tr><td>${d.name}</td><td>₺${d.earnings}</td></tr>`).join('')}
</table>
<div class="footer">Bu rapor Jetgo sistemi tarafından otomatik oluşturulmuştur. ${fmt(today)}</div>
</body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jetgo-kazanc-${fmt(today).replace(/\./g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Kazanç raporu indirildi! 📄');
  };

  // Bonus tiers from admin settings
  const bonusEnabled = localStorage.getItem('bonusEnabled') !== 'false';
  const bonusTiers: any[] = JSON.parse(localStorage.getItem('bonusTiers') || JSON.stringify([
    { id: 1, deliveries: 30, amount: 150, label: 'Bronz Bonus' },
    { id: 2, deliveries: 50, amount: 300, label: 'Gümüş Bonus' },
    { id: 3, deliveries: 80, amount: 600, label: 'Altın Bonus' },
    { id: 4, deliveries: 100, amount: 1000, label: 'Elmas Bonus' },
  ])).sort((a: any, b: any) => a.deliveries - b.deliveries);

  const currentWeeklyDeliveries = 38;
  const completedTiers = bonusTiers.filter((t) => currentWeeklyDeliveries >= t.deliveries);
  const nextTier = bonusTiers.find((t) => currentWeeklyDeliveries < t.deliveries);
  const progressToNext = nextTier
    ? Math.min((currentWeeklyDeliveries / nextTier.deliveries) * 100, 100)
    : 100;

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="relative z-10 px-4 pt-4 pb-4" style={{ backgroundColor: theme.primary }}>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20"
          >
            <ArrowLeft className="w-5 h-5 text-[#121212]" />
          </Button>
          <h1 className="text-lg font-bold text-[#121212]">Kazançlarım</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownloadPDF}
            className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20"
          >
            <Download className="w-5 h-5 text-[#121212]" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto -mt-2 px-4 space-y-4 pb-6">
        {/* Total Earnings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#121212] to-[#2a2a2a] rounded-2xl p-5 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-2">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 8, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="text-5xl"
              >
                💸
              </motion.div>
            </div>

            <p className="text-[#FFD600] text-center font-semibold text-sm mb-1">
              {selectedPeriod === 'daily' ? 'Günlük' : selectedPeriod === 'weekly' ? 'Haftalık' : 'Aylık'} Toplam
            </p>
            <h2 className="text-4xl font-bold text-white text-center mb-1">
              ₺{currentStats.total.toFixed(2)}
            </h2>
            <p className="text-white/60 text-center text-xs">
              {currentStats.deliveries} teslimat tamamlandı
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { label: 'Bonus', value: `₺${currentStats.bonus}`, icon: Gift },
                { label: 'Teslimat', value: currentStats.deliveries, icon: Target },
                { label: 'Ortalama', value: `₺${currentStats.average.toFixed(0)}`, icon: TrendingUp },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-white/10 rounded-xl p-2 text-center">
                    <Icon className="w-4 h-4 text-[#FFD600] mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{item.value}</p>
                    <p className="text-xs text-white/60">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Period Selector */}
        <div className="bg-white rounded-2xl p-2 flex space-x-2 shadow-sm">
          {(['daily', 'weekly', 'monthly'] as Period[]).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all ${
                selectedPeriod === period
                  ? 'bg-[#FFD600] text-[#121212] shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {period === 'daily' ? 'Günlük' : period === 'weekly' ? 'Haftalık' : 'Aylık'}
            </button>
          ))}
        </div>

        {/* Kazanç Trendi */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[#121212]">Kazanç Trendi</h3>
            <div className="flex items-center space-x-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+12.5%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" fontSize={12} tickLine={false} />
              <YAxis stroke="#999" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`₺${value}`, 'Kazanç']}
              />
              <Line type="monotone" dataKey="earnings" stroke={theme.primary} strokeWidth={3}
                dot={{ fill: theme.primary, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Kazanç Dağılımı */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h3 className="font-bold text-[#121212] mb-4">Kazanç Dağılımı</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" fontSize={12} tickLine={false} />
              <YAxis stroke="#999" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`₺${value}`, 'Kazanç']}
              />
              <Bar dataKey="earnings" fill={theme.primary} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Haftalık Bonus Sistemi */}
        {bonusEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-[#121212] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FFD600]" />
                  Haftalık Bonus Sistemi
                </h3>
                <p className="text-xs text-gray-500 mt-1">Bu haftaki ilerlemeniz</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#121212]">{currentWeeklyDeliveries}</p>
                <p className="text-xs text-gray-500">teslimat</p>
              </div>
            </div>

            {nextTier && (
              <div className="mb-5 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700">
                    <span className="text-[#121212] font-bold">{nextTier.label}</span>'e{' '}
                    {nextTier.deliveries - currentWeeklyDeliveries} teslimat kaldı
                  </p>
                  <span className="text-sm font-bold text-green-600">+₺{nextTier.amount}</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToNext}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(to right, ${theme.primary}, #FFC107)` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {currentWeeklyDeliveries}/{nextTier.deliveries} (%{Math.floor(progressToNext)})
                </p>
              </div>
            )}

            <div className="space-y-3">
              {bonusTiers.map((tier, i) => {
                const isCompleted = currentWeeklyDeliveries >= tier.deliveries;
                const isNext = tier === nextTier;
                const colors = TIER_COLORS[Math.min(i, TIER_COLORS.length - 1)];
                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${
                      isCompleted
                        ? `bg-gradient-to-r ${colors.bg} border-transparent`
                        : isNext
                        ? `bg-yellow-50 ${colors.border}`
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md ${
                      isCompleted ? 'bg-white/30' : 'bg-white'
                    }`}>
                      {TIER_ICONS[Math.min(i, TIER_ICONS.length - 1)]}
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold ${isCompleted ? 'text-white' : 'text-[#121212]'}`}>
                        {tier.label}
                      </p>
                      <p className={`text-sm ${isCompleted ? 'text-white/80' : 'text-gray-500'}`}>
                        {tier.deliveries} teslimat
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${isCompleted ? 'text-white' : 'text-green-600'}`}>
                        ₺{tier.amount}
                      </p>
                      {isCompleted ? (
                        <span className="text-xs bg-white/30 text-white px-2 py-0.5 rounded-full font-bold">
                          ✓ Kazanıldı
                        </span>
                      ) : isNext ? (
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full font-bold">
                          Sıradaki
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Kilitli 🔒</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {completedTiers.length > 0 && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-center">
                <p className="text-sm font-bold text-green-700">
                  🎉 Bu hafta toplam{' '}
                  <span className="text-green-900">
                    ₺{completedTiers.reduce((sum, t) => sum + t.amount, 0)}
                  </span>{' '}
                  bonus kazandınız!
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Performans İstatistikleri */}
        <div className="space-y-3 pb-6">
          <h3 className="font-bold text-gray-600 text-sm uppercase tracking-wide px-1">Performans</h3>

          {[
            { label: 'En Yoğun Saat', value: '18:00 - 21:00', icon: Calendar, color: 'bg-purple-100', iconColor: 'text-purple-600' },
            { label: 'En İyi Gün', value: 'Cumartesi', icon: TrendingUp, color: 'bg-green-100', iconColor: 'text-green-600' },
            { label: 'Puan Ortalaması', value: '4.8 / 5.0 ⭐', icon: Star, color: 'bg-yellow-100', iconColor: 'text-yellow-500' },
            { label: 'Hız Bonusu', value: '₺45.00 kazanıldı', icon: Zap, color: 'bg-blue-100', iconColor: 'text-blue-600' },
            { label: 'Sonraki Ödeme', value: '10 Nisan 2026', icon: DollarSign, color: '', iconColor: 'text-[#121212]', themeColor: true },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-md flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                  <p className="text-lg font-bold text-[#121212]">{item.value}</p>
                </div>
                <div
                  className={`w-12 h-12 ${item.themeColor ? '' : item.color} rounded-xl flex items-center justify-center`}
                  style={item.themeColor ? { backgroundColor: theme.primary } : {}}
                >
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
