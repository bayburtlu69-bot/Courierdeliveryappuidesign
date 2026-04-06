import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, DollarSign, Clock, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

const slides = [
  {
    icon: DollarSign,
    title: 'Earn Money on Your Terms',
    description: 'Make great money delivering orders in your city. Work when you want, earn what you deserve.',
    color: '#FFD600',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Choose your own hours. Go online whenever you want and maximize your earnings.',
    color: '#FFD600',
  },
  {
    icon: Zap,
    title: 'Fast & Easy Deliveries',
    description: 'Simple pickup and delivery process. Get paid instantly after each completed order.',
    color: '#FFD600',
  },
];

export function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem('hasSeenOnboarding', 'true');
      navigate('/login');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    navigate('/login');
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Skip button */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="text-gray-400 hover:text-gray-600"
        >
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-32 h-32 bg-[#FFD600] rounded-full flex items-center justify-center mb-8 shadow-lg"
            >
              {CurrentIcon && (
                <CurrentIcon className="w-16 h-16 text-[#121212]" strokeWidth={2} />
              )}
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold text-[#121212] mb-4"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-600 text-lg leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom section */}
      <div className="p-6 space-y-6">
        {/* Progress dots */}
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: currentSlide === index ? 32 : 8,
                backgroundColor: currentSlide === index ? '#FFD600' : '#E5E7EB',
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>

        {/* Next button */}
        <Button
          onClick={handleNext}
          className="w-full h-12 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-semibold rounded-xl text-base shadow-lg active:scale-95 transition-transform"
        >
          {currentSlide < slides.length - 1 ? (
            <>
              Next
              <ChevronRight className="ml-2 w-5 h-5" />
            </>
          ) : (
            "Get Started"
          )}
        </Button>
      </div>
    </div>
  );
}