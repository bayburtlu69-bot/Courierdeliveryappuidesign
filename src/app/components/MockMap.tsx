import { motion } from 'motion/react';
import { MapPin, Navigation2 } from 'lucide-react';

interface MockMapProps {
  restaurantName: string;
  restaurantAddress: string;
  customerName: string;
  customerAddress: string;
  distance: string;
}

export function MockMap({
  restaurantName,
  restaurantAddress,
  customerName,
  customerAddress,
  distance,
}: MockMapProps) {
  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(#e5e7eb 1px, transparent 1px),
            linear-gradient(90deg, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Route line */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 80 120 Q 200 80, 280 300"
          stroke="#FFD600"
          strokeWidth="4"
          fill="none"
          strokeDasharray="10 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>

      {/* Restaurant marker */}
      <motion.div
        initial={{ scale: 0, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute left-20 top-28 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div className="w-12 h-12 bg-[#FFD600] rounded-full shadow-lg flex items-center justify-center border-4 border-white">
            <MapPin className="w-6 h-6 text-[#121212]" fill="#121212" />
          </div>
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 w-12 h-12 bg-[#FFD600] rounded-full"
          />
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            <p className="text-xs font-bold text-[#121212]">{restaurantName}</p>
            <p className="text-xs text-gray-600">{restaurantAddress}</p>
          </div>
        </div>
      </motion.div>

      {/* Customer marker */}
      <motion.div
        initial={{ scale: 0, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute right-20 bottom-32 transform translate-x-1/2 translate-y-1/2"
      >
        <div className="relative">
          <div className="w-12 h-12 bg-red-500 rounded-full shadow-lg flex items-center justify-center border-4 border-white">
            <MapPin className="w-6 h-6 text-white" fill="white" />
          </div>
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-0 w-12 h-12 bg-red-500 rounded-full"
          />
          <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            <p className="text-xs font-bold text-[#121212]">{customerName}</p>
            <p className="text-xs text-gray-600">{customerAddress}</p>
          </div>
        </div>
      </motion.div>

      {/* Current location (courier) */}
      <motion.div
        animate={{
          x: [80, 120, 180, 240, 280],
          y: [120, 100, 150, 250, 300],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute"
      >
        <div className="w-8 h-8 bg-blue-500 rounded-full shadow-lg flex items-center justify-center border-2 border-white">
          <Navigation2 className="w-4 h-4 text-white" />
        </div>
      </motion.div>

      {/* Distance overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-4 left-4 right-4 bg-white rounded-xl p-3 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600">Mesafe</p>
            <p className="text-lg font-bold text-[#121212]">{distance}</p>
          </div>
          <div className="flex items-center gap-2">
            <Navigation2 className="w-4 h-4 text-[#FFD600]" />
            <span className="text-sm font-semibold text-[#121212]">~8 dk</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
