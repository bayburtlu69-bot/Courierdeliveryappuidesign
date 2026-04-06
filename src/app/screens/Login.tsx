import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Phone, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigate('/otp', { state: { phoneNumber } });
      }, 1000);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    setPhoneNumber(cleaned);
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="p-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/onboarding')}
          className="w-10 h-10 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="w-20 h-20 bg-[#FFD600] rounded-3xl flex items-center justify-center mb-8"
          >
            <Phone className="w-10 h-10 text-[#121212]" />
          </motion.div>

          <h1 className="text-3xl font-bold text-[#121212] mb-3">
            Telefon Numaranı Gir
          </h1>
          <p className="text-gray-600 text-base mb-8">
            Numaranı doğrulamak için sana bir kod göndereceğiz
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Telefon Numarası
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
                  <span className="text-gray-600 font-medium">+90</span>
                  <div className="w-px h-6 bg-gray-300 ml-3" />
                </div>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => formatPhoneNumber(e.target.value)}
                  placeholder="5XX XXX XX XX"
                  className="pl-16 h-14 rounded-2xl border-2 border-gray-200 focus:border-[#FFD600] text-lg"
                  maxLength={10}
                  autoFocus
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={phoneNumber.length < 10 || isLoading}
              className="w-full h-14 bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-semibold rounded-2xl text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-6 h-6 border-3 border-[#121212] border-t-transparent rounded-full"
                />
              ) : (
                "Devam Et"
              )}
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-6 space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3">
            Platformumuza yeni misin?
          </p>
          <Button
            onClick={() => navigate('/apply')}
            variant="outline"
            className="w-full h-12 border-2 border-[#FFD600] text-[#121212] font-semibold rounded-xl hover:bg-[#FFD600]/10"
          >
            Kurye Olarak Başvur
          </Button>
        </div>

        <div className="text-center">
          <Button
            onClick={() => navigate('/admin-selector')}
            variant="ghost"
            className="text-gray-500 hover:text-[#121212] text-sm"
          >
            Admin Paneli →
          </Button>
        </div>

        <p className="text-sm text-gray-500 text-center">
          Devam ederek{' '}
          <a href="#" className="text-[#121212] font-medium underline">
            Hizmet Şartlarımızı
          </a>{' '}
          ve{' '}
          <a href="#" className="text-[#121212] font-medium underline">
            Gizlilik Politikamızı
          </a>{' '}
          kabul etmiş olursunuz
        </p>
      </div>
    </div>
  );
}