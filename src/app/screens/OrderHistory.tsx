import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

type OrderStatus = 'completed' | 'cancelled';
type FilterType = 'all' | 'completed' | 'cancelled';

interface Order {
  id: string;
  date: string;
  time: string;
  restaurant: string;
  customerAddress: string;
  distance: string;
  earnings: number;
  status: OrderStatus;
}

export function OrderHistory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const orders: Order[] = [
    {
      id: 'ORD-12345',
      date: 'Today',
      time: '6:45 PM',
      restaurant: 'Italian Bistro',
      customerAddress: '456 Oak Avenue',
      distance: '2.3 km',
      earnings: 12.5,
      status: 'completed',
    },
    {
      id: 'ORD-12344',
      date: 'Today',
      time: '5:30 PM',
      restaurant: 'Sushi Express',
      customerAddress: '789 Pine Street',
      distance: '1.8 km',
      earnings: 10.0,
      status: 'completed',
    },
    {
      id: 'ORD-12343',
      date: 'Today',
      time: '4:15 PM',
      restaurant: 'Burger Palace',
      customerAddress: '321 Elm Drive',
      distance: '3.1 km',
      earnings: 0,
      status: 'cancelled',
    },
    {
      id: 'ORD-12342',
      date: 'Yesterday',
      time: '8:20 PM',
      restaurant: 'Thai Kitchen',
      customerAddress: '654 Maple Road',
      distance: '2.7 km',
      earnings: 13.75,
      status: 'completed',
    },
    {
      id: 'ORD-12341',
      date: 'Yesterday',
      time: '7:10 PM',
      restaurant: 'Pizza Corner',
      customerAddress: '987 Cedar Lane',
      distance: '1.5 km',
      earnings: 9.5,
      status: 'completed',
    },
    {
      id: 'ORD-12340',
      date: 'Yesterday',
      time: '6:00 PM',
      restaurant: 'Mexican Cantina',
      customerAddress: '147 Birch Street',
      distance: '2.9 km',
      earnings: 14.25,
      status: 'completed',
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: orders.filter((o) => o.status === 'completed').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
    totalEarnings: orders.reduce((sum, o) => sum + o.earnings, 0),
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-[#121212]">Sipariş Geçmişi</h1>
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders..."
            className="pl-12 h-12 rounded-2xl border-2 border-gray-200 focus:border-[#FFD600]"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            onClick={() => setFilter('all')}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-xl transition-all ${
              filter === 'all'
                ? 'bg-[#FFD600] shadow-md'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <p
              className={`text-2xl font-bold ${
                filter === 'all' ? 'text-[#121212]' : 'text-gray-600'
              }`}
            >
              {orders.length}
            </p>
            <p
              className={`text-xs ${
                filter === 'all' ? 'text-[#121212]/70' : 'text-gray-500'
              }`}
            >
              Toplam
            </p>
          </motion.button>

          <motion.button
            onClick={() => setFilter('completed')}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-xl transition-all ${
              filter === 'completed'
                ? 'bg-green-100 shadow-md'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <p
              className={`text-2xl font-bold ${
                filter === 'completed' ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              {stats.total}
            </p>
            <p
              className={`text-xs ${
                filter === 'completed' ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              Tamamlandı
            </p>
          </motion.button>

          <motion.button
            onClick={() => setFilter('cancelled')}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-xl transition-all ${
              filter === 'cancelled'
                ? 'bg-red-100 shadow-md'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <p
              className={`text-2xl font-bold ${
                filter === 'cancelled' ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              {stats.cancelled}
            </p>
            <p
              className={`text-xs ${
                filter === 'cancelled' ? 'text-red-600' : 'text-gray-500'
              }`}
            >
              İptal Edildi
            </p>
          </motion.button>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl p-4 shadow-md active:scale-98 transition-transform cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-bold text-[#121212]">{order.restaurant}</h3>
                  {order.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-xs text-gray-500">Sipariş #{order.id}</p>
              </div>

              {order.status === 'completed' ? (
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    +${order.earnings.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">{order.distance}</p>
                </div>
              ) : (
                <div className="text-right">
                  <p className="text-sm font-semibold text-red-600">İptal Edildi</p>
                  <p className="text-xs text-gray-500">{order.distance}</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <p className="flex-1 truncate">{order.customerAddress}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="w-4 h-4" />
                <span>
                  {order.date} at {order.time}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </motion.div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No orders found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}