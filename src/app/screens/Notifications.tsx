import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Bell,
  Gift,
  AlertCircle,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { Button } from '../components/ui/button';

type NotificationType = 'order' | 'promo' | 'system' | 'earnings';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export function Notifications() {
  const navigate = useNavigate();

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'order',
      title: 'New Order Available',
      message: 'A new delivery order is waiting for you nearby',
      time: '2 min ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'promo',
      title: '🎉 Weekend Bonus Active!',
      message: 'Earn 1.5x on all deliveries this weekend. Start delivering now!',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'earnings',
      title: 'Daily Target Achieved',
      message: "Congratulations! You've reached your daily earnings goal of $150",
      time: '3 hours ago',
      isRead: false,
    },
    {
      id: '4',
      type: 'system',
      title: 'App Update Available',
      message: 'New features and improvements are ready to install',
      time: '5 hours ago',
      isRead: true,
    },
    {
      id: '5',
      type: 'promo',
      title: 'Peak Hours Alert',
      message: 'High demand expected between 6-9 PM. Maximize your earnings!',
      time: 'Yesterday',
      isRead: true,
    },
    {
      id: '6',
      type: 'earnings',
      title: 'Weekly Payout Processed',
      message: '$1,260.00 has been deposited to your account',
      time: '2 days ago',
      isRead: true,
    },
  ];

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'order':
        return Bell;
      case 'promo':
        return Gift;
      case 'system':
        return AlertCircle;
      case 'earnings':
        return TrendingUp;
    }
  };

  const getIconColor = (type: NotificationType) => {
    switch (type) {
      case 'order':
        return 'bg-[#FFD600]';
      case 'promo':
        return 'bg-purple-100';
      case 'system':
        return 'bg-blue-100';
      case 'earnings':
        return 'bg-green-100';
    }
  };

  const getIconTextColor = (type: NotificationType) => {
    switch (type) {
      case 'order':
        return 'text-[#121212]';
      case 'promo':
        return 'text-purple-600';
      case 'system':
        return 'text-blue-600';
      case 'earnings':
        return 'text-green-600';
    }
  };

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
          <h1 className="text-lg font-bold text-[#121212]">Notifications</h1>
          <Button
            variant="ghost"
            className="text-sm text-[#121212] font-medium hover:text-[#121212]/80"
          >
            Mark all read
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {/* Unread Section */}
        <div className="p-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">
            New
          </h2>
          <div className="space-y-3">
            {notifications
              .filter((n) => !n.isRead)
              .map((notification, index) => {
                const Icon = getIcon(notification.type);
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-4 shadow-md active:scale-98 transition-transform cursor-pointer relative"
                  >
                    {/* Unread indicator */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-[#FFD600] rounded-full" />

                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(
                          notification.type
                        )}`}
                      >
                        <Icon className={`w-6 h-6 ${getIconTextColor(notification.type)}`} />
                      </div>

                      <div className="flex-1 pr-4">
                        <h3 className="font-bold text-[#121212] mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>

        {/* Earlier Section */}
        <div className="p-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">
            Earlier
          </h2>
          <div className="space-y-3">
            {notifications
              .filter((n) => n.isRead)
              .map((notification, index) => {
                const Icon = getIcon(notification.type);
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-4 shadow-sm active:scale-98 transition-transform cursor-pointer opacity-70 hover:opacity-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(
                          notification.type
                        )}`}
                      >
                        <Icon className={`w-6 h-6 ${getIconTextColor(notification.type)}`} />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-[#121212] mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
