import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { UserCog, Lock, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export function EmployeeLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      localStorage.setItem('adminRole', 'employee');
      localStorage.setItem('adminEmail', email);
      toast.success('Welcome back, Employee!');
      navigate('/employee/dashboard');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserCog className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#121212] mb-2">Employee Login</h1>
          <p className="text-gray-600">Handle applications and support</p>
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
              placeholder="employee@example.com"
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
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl"
          >
            Login as Employee
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
