import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { courierAuth, generateCode, sendVerificationEmail } from '../utils/auth';

type LoginStep = 'credentials' | 'otp';

export function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<LoginStep>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [otp, setOtp] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [pendingCourier, setPendingCourier] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('E-posta ve şifre gereklidir'); return; }
    setLoading(true);

    const courier = courierAuth.login(email, password);
    if (!courier) {
      setLoading(false);
      toast.error('E-posta veya şifre hatalı, ya da hesabınız henüz onaylanmamış');
      return;
    }

    // Doğrulama kodu gönder
    const code = generateCode();
    setSentCode(code);
    setPendingCourier(courier);
    const ok = await sendVerificationEmail(courier.email, code, courier.name);
    setLoading(false);

    if (ok) {
      toast.success(`Doğrulama kodu ${courier.email} adresine gönderildi`);
    } else {
      toast.info(`Geliştirme modu: Kod konsola basıldı (${code})`);
    }
    setStep('otp');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === sentCode) {
      courierAuth.setSession(pendingCourier!);
      toast.success(`Hoş geldin, ${pendingCourier!.name}! 🎉`);
      navigate('/dashboard');
    } else {
      toast.error('Doğrulama kodu hatalı');
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      <div className="p-6">
        <Button variant="ghost" size="icon" onClick={() => step === 'otp' ? setStep('credentials') : navigate('/onboarding')} className="w-10 h-10 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 px-6 pt-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 bg-[#FFD600] rounded-3xl flex items-center justify-center mb-6 shadow-lg">
            {step === 'otp' ? <Mail className="w-10 h-10 text-[#121212]" /> : <Lock className="w-10 h-10 text-[#121212]" />}
          </div>

          {step === 'credentials' ? (
            <>
              <h1 className="text-3xl font-bold text-[#121212] mb-2">Giriş Yap</h1>
              <p className="text-gray-500 mb-8">E-posta ve şifrenizi girin</p>
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">E-posta</label>
                  <Input type="email" placeholder="ornek@email.com" value={email}
                    onChange={(e) => setEmail(e.target.value)} className="h-12" required />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Şifre</label>
                  <div className="relative">
                    <Input type={showPass ? 'text' : 'password'} placeholder="••••••••"
                      value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 pr-12" required />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" disabled={loading}
                  className="w-full h-14 bg-[#121212] text-white text-lg font-bold rounded-2xl">
                  {loading ? 'Kontrol ediliyor...' : 'Giriş Yap'}
                </Button>
                <p className="text-center text-gray-500 text-sm">
                  Hesabın yok mu?{' '}
                  <button type="button" onClick={() => navigate('/apply')} className="text-[#121212] font-bold underline">
                    Kurye Ol
                  </button>
                </p>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-[#121212] mb-2">Doğrulama Kodu</h1>
              <p className="text-gray-500 mb-8">
                <span className="font-semibold text-[#121212]">{email}</span> adresine gönderilen 6 haneli kodu girin
              </p>
              <form onSubmit={handleVerify} className="space-y-5">
                <Input type="text" placeholder="000000" maxLength={6} value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g,''))}
                  className="h-14 text-center text-2xl font-bold tracking-widest" />
                <Button type="submit" className="w-full h-14 bg-[#FFD600] text-[#121212] text-lg font-bold rounded-2xl">
                  Doğrula ve Giriş Yap
                </Button>
                <button type="button" onClick={() => { const c = generateCode(); setSentCode(c); sendVerificationEmail(email, c, pendingCourier?.name||''); toast.success('Yeni kod gönderildi'); }}
                  className="w-full text-center text-sm text-gray-500 underline">
                  Kodu tekrar gönder
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
