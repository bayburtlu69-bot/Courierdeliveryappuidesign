import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Shield, Store, UserCog } from 'lucide-react';

export function AdminLoginSelector() {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'admin',
      title: 'Admin Login',
      description: 'Full system access and management',
      icon: Shield,
      color: '#FFD600',
      path: '/admin/login',
    },
    {
      id: 'shop',
      title: 'Shop Owner Login',
      description: 'Manage your shop and view analytics',
      icon: Store,
      color: '#4CAF50',
      path: '/shop/login',
    },
    {
      id: 'employee',
      title: 'Employee Login',
      description: 'Handle applications and support',
      icon: UserCog,
      color: '#2196F3',
      path: '/employee/login',
    },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#121212] mb-3">Admin Portal</h1>
          <p className="text-gray-600 text-lg">Select your role to continue</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, index) => {
            const RoleIcon = role.icon;
            return (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(role.path)}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${role.color}20` }}
                >
                  <RoleIcon className="w-10 h-10" style={{ color: role.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#121212] mb-2">{role.title}</h3>
                <p className="text-gray-600 text-sm">{role.description}</p>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate('/login')}
            className="text-gray-500 hover:text-[#121212] transition-colors"
          >
            ← Back to Courier App
          </button>
        </motion.div>
      </div>
    </div>
  );
}
