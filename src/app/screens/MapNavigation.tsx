import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Phone,
  Navigation,
  AlertCircle,
  MapPinned,
  X,
} from 'lucide-react';
import { Button } from '../components/ui/button';

export function MapNavigation() {
  const navigate = useNavigate();
  const { orderId: id } = useParams();
  const [showActions, setShowActions] = useState(true);

  return (
    <div className="fixed inset-0 bg-gray-100">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-gray-100">
        {/* Grid pattern to simulate map */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            d="M 100 400 Q 200 300, 300 200"
            stroke="#FFD600"
            strokeWidth="6"
            fill="none"
            strokeDasharray="10 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </svg>

        {/* Restaurant marker */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            <div className="w-12 h-12 bg-[#FFD600] rounded-full shadow-lg flex items-center justify-center border-4 border-white">
              <MapPinned className="w-6 h-6 text-[#121212]" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-[#FFD600] rounded-full opacity-30"
            />
          </div>
        </motion.div>

        {/* Customer marker */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: 'spring' }}
          className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2"
        >
          <div className="relative">
            <div className="w-12 h-12 bg-red-500 rounded-full shadow-lg flex items-center justify-center border-4 border-white">
              <MapPinned className="w-6 h-6 text-white" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 bg-red-500 rounded-full opacity-30"
            />
          </div>
        </motion.div>

        {/* Your location (animated) */}
        <motion.div
          animate={{
            top: ['60%', '45%'],
            left: ['25%', '40%'],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute"
        >
          <div className="relative">
            <div className="w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center border-4 border-white">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-blue-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/order/${id}`)}
            className="w-10 h-10 rounded-full bg-white shadow-lg hover:bg-white/90"
          >
            <ArrowLeft className="w-5 h-5 text-[#121212]" />
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl px-4 py-2 shadow-lg"
          >
            <p className="text-xs text-gray-500">Estimated Time</p>
            <p className="text-lg font-bold text-[#121212]">12 min</p>
          </motion.div>

          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-white shadow-lg hover:bg-white/90"
          >
            <AlertCircle className="w-5 h-5 text-[#121212]" />
          </Button>
        </div>
      </div>

      {/* Navigation Info Card */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-20 left-4 right-4"
      >
        <div className="bg-white rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">NEXT TURN</p>
              <p className="text-lg font-bold text-[#121212] mb-1">
                Turn right on Main Street
              </p>
              <p className="text-sm text-gray-600">in 400 meters</p>
            </div>
            <div className="w-16 h-16 bg-[#FFD600] rounded-2xl flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#121212]"
              >
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Action Buttons */}
      {showActions && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute right-4 bottom-32 space-y-3"
        >
          <Button
            size="icon"
            className="w-14 h-14 rounded-full bg-white hover:bg-white/90 shadow-xl"
            onClick={() => window.open('tel:+15551234567')}
          >
            <Phone className="w-6 h-6 text-[#121212]" />
          </Button>

          <Button
            size="icon"
            className="w-14 h-14 rounded-full bg-white hover:bg-white/90 shadow-xl"
          >
            <AlertCircle className="w-6 h-6 text-[#121212]" />
          </Button>

          <Button
            size="icon"
            onClick={() => setShowActions(false)}
            className="w-14 h-14 rounded-full bg-gray-800 hover:bg-gray-900 shadow-xl"
          >
            <X className="w-5 h-5 text-white" />
          </Button>
        </motion.div>
      )}

      {/* Bottom Card */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">CURRENT DESTINATION</p>
              <p className="text-lg font-bold text-[#121212]">Italian Bistro</p>
              <p className="text-sm text-gray-600">123 Main St</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">DISTANCE</p>
              <p className="text-2xl font-bold text-[#FFD600]">1.2 km</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => navigate(`/order/${id}`)}
              className="flex-1 h-12 bg-gray-200 hover:bg-gray-300 text-[#121212] rounded-xl font-semibold"
            >
              View Order
            </Button>
            <Button
              className="flex-1 h-12 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] rounded-xl font-semibold"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Zoom Controls */}
      <div className="absolute left-4 bottom-32 space-y-2">
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-white hover:bg-white/90 shadow-lg"
        >
          <span className="text-xl font-bold text-[#121212]">+</span>
        </Button>
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-white hover:bg-white/90 shadow-lg"
        >
          <span className="text-xl font-bold text-[#121212]">−</span>
        </Button>
      </div>
    </div>
  );
}
