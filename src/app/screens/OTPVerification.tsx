import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Shield, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';

export function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || '';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all filled
    if (index === 5 && value && newOtp.every((digit) => digit !== '')) {
      verifyOTP(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOTP = (code: string) => {
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock verification (accept any 6-digit code)
      if (code.length === 6) {
        setIsSuccess(true);
        setTimeout(() => {
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/dashboard');
        }, 1500);
      } else {
        setError('Invalid verification code');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 1000);
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      setError('');
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="p-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/login')}
          className="w-10 h-10 rounded-full"
          disabled={isLoading || isSuccess}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="w-20 h-20 bg-[#FFD600] rounded-3xl flex items-center justify-center mb-8"
          >
            {isSuccess ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                <CheckCircle2 className="w-10 h-10 text-[#121212]" />
              </motion.div>
            ) : (
              <Shield className="w-10 h-10 text-[#121212]" />
            )}
          </motion.div>

          <h1 className="text-3xl font-bold text-[#121212] mb-3">
            {isSuccess ? 'Verified!' : 'Enter Verification Code'}
          </h1>
          <p className="text-gray-600 text-base mb-8">
            {isSuccess
              ? 'Your phone number has been verified successfully'
              : `We sent a code to +1 ${phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}`}
          </p>

          {!isSuccess && (
            <>
              {/* OTP Inputs */}
              <div className="flex justify-center space-x-3 mb-4">
                {otp.map((digit, index) => (
                  <motion.input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all ${
                      digit
                        ? 'border-[#FFD600] bg-[#FFD600]/10'
                        : error
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20`}
                    autoFocus={index === 0}
                    disabled={isLoading || isSuccess}
                  />
                ))}
              </div>

              {/* Error message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center mb-4"
                >
                  {error}
                </motion.p>
              )}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center mb-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 border-3 border-[#FFD600] border-t-transparent rounded-full"
                  />
                </motion.div>
              )}

              {/* Resend code */}
              <div className="text-center mt-8">
                <p className="text-gray-600 text-sm mb-2">
                  Didn't receive the code?
                </p>
                <Button
                  variant="ghost"
                  onClick={handleResend}
                  disabled={timer > 0}
                  className="text-[#121212] font-semibold hover:text-[#121212]/80"
                >
                  {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                </Button>
              </div>
            </>
          )}

          {isSuccess && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
