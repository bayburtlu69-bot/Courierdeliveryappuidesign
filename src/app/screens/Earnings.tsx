import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
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
} from 'recharts';

type Period = 'daily' | 'weekly' | 'monthly';

export function Earnings() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('weekly');

  const dailyData = [
    { name: 'Mon', earnings: 120 },
    { name: 'Tue', earnings: 150 },
    { name: 'Wed', earnings: 180 },
    { name: 'Thu', earnings: 140 },
    { name: 'Fri', earnings: 200 },
    { name: 'Sat', earnings: 250 },
    { name: 'Sun', earnings: 220 },
  ];

  const weeklyData = [
    { name: 'Week 1', earnings: 840 },
    { name: 'Week 2', earnings: 920 },
    { name: 'Week 3', earnings: 1050 },
    { name: 'Week 4', earnings: 1100 },
  ];

  const monthlyData = [
    { name: 'Jan', earnings: 3200 },
    { name: 'Feb', earnings: 3800 },
    { name: 'Mar', earnings: 4200 },
    { name: 'Apr', earnings: 4500 },
    { name: 'May', earnings: 4100 },
    { name: 'Jun', earnings: 4800 },
  ];

  const stats = {
    daily: {
      total: 220.0,
      deliveries: 18,
      bonus: 25.0,
      average: 12.22,
    },
    weekly: {
      total: 1260.0,
      deliveries: 98,
      bonus: 150.0,
      average: 12.86,
    },
    monthly: {
      total: 4800.0,
      deliveries: 385,
      bonus: 580.0,
      average: 12.47,
    },
  };

  const currentStats = stats[selectedPeriod];
  const chartData =
    selectedPeriod === 'daily'
      ? dailyData
      : selectedPeriod === 'weekly'
      ? weeklyData
      : monthlyData;

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-[#121212]">Earnings</h1>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full"
          >
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Period Selector */}
        <div className="p-4">
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
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Total Earnings Card */}
        <motion.div
          key={selectedPeriod}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="px-4 pb-4"
        >
          <div className="bg-gradient-to-br from-[#FFD600] to-[#FFC700] rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[#121212]/70 text-sm font-medium mb-1">
                  Total Earnings
                </p>
                <p className="text-4xl font-bold text-[#121212]">
                  ${currentStats.total.toFixed(2)}
                </p>
              </div>
              <div className="w-16 h-16 bg-[#121212] rounded-2xl flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-[#FFD600]" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs text-[#121212]/70 mb-1">Deliveries</p>
                <p className="text-xl font-bold text-[#121212]">
                  {currentStats.deliveries}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs text-[#121212]/70 mb-1">Bonus</p>
                <p className="text-xl font-bold text-[#121212]">
                  ${currentStats.bonus}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs text-[#121212]/70 mb-1">Avg/Order</p>
                <p className="text-xl font-bold text-[#121212]">
                  ${currentStats.average}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chart */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-[#121212]">Earnings Trend</h3>
              <div className="flex items-center space-x-2 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">+12.5%</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  stroke="#999"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#999" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#FFD600"
                  strokeWidth={3}
                  dot={{ fill: '#FFD600', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h3 className="font-bold text-[#121212] mb-4">Earnings Breakdown</h3>

            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  stroke="#999"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#999" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar dataKey="earnings" fill="#FFD600" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-4 pb-6 space-y-3">
          <div className="bg-white rounded-2xl p-5 shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Peak Hours</p>
              <p className="text-lg font-bold text-[#121212]">6:00 PM - 9:00 PM</p>
            </div>
            <Calendar className="w-6 h-6 text-gray-400" />
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Best Day</p>
              <p className="text-lg font-bold text-[#121212]">Saturday</p>
            </div>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Next Payout</p>
              <p className="text-lg font-bold text-[#121212]">April 10, 2026</p>
            </div>
            <DollarSign className="w-6 h-6 text-[#FFD600]" />
          </div>
        </div>
      </div>
    </div>
  );
}
