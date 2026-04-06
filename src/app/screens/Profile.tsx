import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Car,
  FileText,
  Settings,
  Star,
  ChevronRight,
  LogOut,
  Camera,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';

export function Profile() {
  const navigate = useNavigate();

  const profile = {
    name: 'John Driver',
    phone: '+1 (555) 123-4567',
    email: 'john.driver@email.com',
    rating: 4.8,
    totalDeliveries: 1247,
    vehicleType: 'Motorcycle',
    vehicleNumber: 'ABC-1234',
  };

  const menuItems = [
    {
      icon: User,
      title: 'Personal Information',
      subtitle: 'Name, email, phone',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Car,
      title: 'Vehicle Details',
      subtitle: 'Type, registration, insurance',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: FileText,
      title: 'Documents',
      subtitle: "License, ID, vehicle documents",
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: MapPin,
      title: 'Active Zones',
      subtitle: 'Preferred delivery areas',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Settings,
      title: 'App Settings',
      subtitle: 'Language, notifications, privacy',
      color: 'bg-gray-100 text-gray-600',
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#FFD600] px-4 pt-4 pb-24">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full bg-[#121212]/10 hover:bg-[#121212]/20"
          >
            <ArrowLeft className="w-5 h-5 text-[#121212]" />
          </Button>
          <h1 className="text-lg font-bold text-[#121212]">Profile</h1>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-[#121212]/10 hover:bg-[#121212]/20"
          >
            <Settings className="w-5 h-5 text-[#121212]" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto -mt-16">
        {/* Profile Card */}
        <div className="px-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-xl"
          >
            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[#FFD600] to-[#FFC700] rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-[#121212]" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#121212] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                  <Camera className="w-4 h-4 text-[#FFD600]" />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-[#121212] mt-4">
                {profile.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(profile.rating)
                          ? 'text-[#FFD600] fill-[#FFD600]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  {profile.rating}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {profile.totalDeliveries} deliveries completed
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-[#121212]">{profile.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-[#121212]">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Car className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Vehicle</p>
                  <p className="text-sm font-medium text-[#121212]">
                    {profile.vehicleType} • {profile.vehicleNumber}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Menu Items */}
        <div className="px-4 space-y-3">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full bg-white rounded-2xl p-4 shadow-md active:scale-98 transition-transform"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-[#121212]">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Preferences */}
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 px-2">
            Preferences
          </h3>
          <div className="bg-white rounded-2xl shadow-md divide-y divide-gray-100">
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#121212]">Push Notifications</p>
                <p className="text-sm text-gray-500">Receive order alerts</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#121212]">Sound Alerts</p>
                <p className="text-sm text-gray-500">Audio for new orders</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#121212]">Auto Accept Orders</p>
                <p className="text-sm text-gray-500">Accept orders automatically</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 py-6">
          <Button
            onClick={() => {
              localStorage.removeItem('isLoggedIn');
              navigate('/login');
            }}
            className="w-full h-14 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-semibold active:scale-95 transition-transform"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
