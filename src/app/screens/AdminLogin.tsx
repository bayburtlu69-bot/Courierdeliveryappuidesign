import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Shield, Lock, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      localStorage.setItem('adminRole', 'admin');
      localStorage.setItem('adminEmail', email);
      toast.success('Hoş geldiniz, Yönetici!');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#121212] via-[#2a2a2a] to-[#121212] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FFD600] to-[#FFC107] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Shield className="w-10 h-10 text-[#121212]" />
          </div>
          <h1 className="text-4xl font-bold text-[#121212] mb-2">Baymoto</h1>
          <h2 className="text-xl font-bold text-gray-700 mb-1">Yönetici Girişi</h2>
          <p className="text-gray-600">Tam sistem erişimi ve yönetim</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" />
              E-posta Adresi
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@baymoto.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4" />
              Şifre
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-[#FFD600] to-[#FFC107] hover:from-[#FFC107] hover:to-[#FFD600] text-[#121212] font-bold rounded-xl shadow-lg"
          >
            Yönetici Olarak Giriş Yap
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/admin-selector')}
            className="text-gray-500 hover:text-[#121212] text-sm transition-colors font-semibold"
          >
            ← Rol seçimine geri dön
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Demo Giriş: admin@admin.com / admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
