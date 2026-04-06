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
    
    // Mock login - in real app would verify credentials
    if (email && password) {
      localStorage.setItem('adminRole', 'admin');
      localStorage.setItem('adminEmail', email);
      toast.success('Welcome back, Admin!');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#FFD600] to-[#FFC107] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#121212] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-[#FFD600]" />
          </div>
          <h1 className="text-3xl font-bold text-[#121212] mb-2">Admin Login</h1>
          <p className="text-gray-600">Full system access and management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-[#121212] hover:bg-[#121212]/90 text-[#FFD600] font-semibold rounded-xl"
          >
            Login as Admin
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/admin-selector')}
            className="text-gray-500 hover:text-[#121212] text-sm transition-colors"
          >
            ← Back to role selection
          </button>
        </div>
      </motion.div>
    </div>
  );
}
