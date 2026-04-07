import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Shield, Store, UserCog, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function AdminLoginSelector() {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'admin',
      title: 'Yönetici Girişi',
      description: 'Tam sistem erişimi ve yönetim',
      icon: Shield,
      color: '#FFD600',
      bgColor: 'from-yellow-400 to-yellow-500',
      path: '/admin/login',
    },
    {
      id: 'shop',
      title: 'Dükkan Sahibi',
      description: 'Mağazanızı yönetin ve analitiği görün',
      icon: Store,
      color: '#10B981',
      bgColor: 'from-green-400 to-green-500',
      path: '/shop/login',
    },
    {
      id: 'employee',
      title: 'Destek Çalışanı',
      description: 'Başvuruları inceleyin ve destek sağlayın',
      icon: UserCog,
      color: '#3B82F6',
      bgColor: 'from-blue-400 to-blue-500',
      path: '/employee/login',
    },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-[#121212] mb-3">Jetgo</h1>
            <div className="h-1 w-32 bg-[#FFD600] mx-auto rounded-full" />
          </div>
          <h2 className="text-3xl font-bold text-[#121212] mb-2">Yönetim Portalı</h2>
          <p className="text-gray-600 text-lg">Rolünüzü seçerek devam edin</p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(role.path)}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-gray-200 hover:border-[#FFD600] group"
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-br ${role.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#121212] mb-3">{role.title}</h3>
                <p className="text-gray-600 leading-relaxed">{role.description}</p>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <span className="text-[#FFD600] font-bold text-sm group-hover:text-[#121212] transition-colors">
                    Giriş Yap →
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-gray-600 hover:text-[#121212] font-semibold text-lg"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Kurye Uygulamasına Dön
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
