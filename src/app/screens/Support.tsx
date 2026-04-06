import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MessageCircle,
  HelpCircle,
  Phone,
  Mail,
  Send,
  ChevronRight,
  AlertCircle,
  BookOpen,
  Shield,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

type ViewMode = 'menu' | 'chat' | 'faq';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
}

export function Support() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('menu');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm here to help. How can I assist you today?",
      sender: 'support',
      time: '10:30 AM',
    },
  ]);

  const faqs = [
    {
      question: 'How do I accept an order?',
      answer:
        'When an order notification appears, tap the "Accept" button within the time limit. The order details will show the pickup location, delivery address, and earnings.',
    },
    {
      question: 'What if I need to cancel an order?',
      answer:
        'Tap the alert icon on the active order screen and select "Cancel Order". Note that frequent cancellations may affect your account status.',
    },
    {
      question: 'How do I get paid?',
      answer:
        'Earnings are automatically deposited to your bank account every week. You can view your earnings and payout schedule in the Earnings section.',
    },
    {
      question: 'What should I do if I have an accident?',
      answer:
        'First, ensure everyone is safe. Then, contact emergency services if needed. Report the incident to our support team immediately through the app or emergency hotline.',
    },
    {
      question: 'How is my rating calculated?',
      answer:
        'Your rating is based on customer feedback, on-time deliveries, and order accuracy. Maintain a high rating by being professional, timely, and following delivery instructions.',
    },
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      color: 'bg-[#FFD600]',
      iconColor: 'text-[#121212]',
      action: () => setViewMode('chat'),
    },
    {
      icon: Phone,
      title: 'Call Support',
      subtitle: '24/7 hotline: +1 (800) 123-4567',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      action: () => window.open('tel:+18001234567'),
    },
    {
      icon: HelpCircle,
      title: 'FAQ',
      subtitle: 'Find answers to common questions',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      action: () => setViewMode('faq'),
    },
    {
      icon: Mail,
      title: 'Email Us',
      subtitle: 'support@flashcourier.com',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      action: () => window.open('mailto:support@flashcourier.com'),
    },
  ];

  const emergencyOptions = [
    {
      icon: AlertCircle,
      title: 'Report Issue',
      subtitle: 'Order problems, app issues',
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      icon: Shield,
      title: 'Safety & Security',
      subtitle: 'Emergency assistance',
      color: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
      };

      setMessages([...messages, newMessage]);
      setMessage('');

      // Simulate support response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message. Our team will get back to you shortly!",
          sender: 'support',
          time: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          }),
        };
        setMessages((prev) => [...prev, response]);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (viewMode !== 'menu') {
                setViewMode('menu');
              } else {
                navigate('/dashboard');
              }
            }}
            className="w-10 h-10 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-[#121212]">
            {viewMode === 'menu' && 'Help & Support'}
            {viewMode === 'chat' && 'Live Chat'}
            {viewMode === 'faq' && 'FAQ'}
          </h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      {/* Menu View */}
      {viewMode === 'menu' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#FFD600] to-[#FFC700] rounded-3xl p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#121212] rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-[#FFD600]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#121212] mb-1">
                  How can we help?
                </h2>
                <p className="text-sm text-[#121212]/70">
                  We're here 24/7 to assist you
                </p>
              </div>
            </div>
          </motion.div>

          {/* Support Options */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 px-2">
              Contact Support
            </h3>
            <div className="space-y-3">
              {supportOptions.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={option.action}
                  className="w-full bg-white rounded-2xl p-4 shadow-md active:scale-98 transition-transform"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${option.color}`}
                    >
                      <option.icon className={`w-6 h-6 ${option.iconColor}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-[#121212]">{option.title}</p>
                      <p className="text-sm text-gray-500">{option.subtitle}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 px-2">
              Emergency
            </h3>
            <div className="space-y-3">
              {emergencyOptions.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (supportOptions.length + index) * 0.05 }}
                  className="w-full bg-white rounded-2xl p-4 shadow-md active:scale-98 transition-transform"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${option.color}`}
                    >
                      <option.icon className={`w-6 h-6 ${option.iconColor}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-[#121212]">{option.title}</p>
                      <p className="text-sm text-gray-500">{option.subtitle}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat View */}
      {viewMode === 'chat' && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl p-4 ${
                    msg.sender === 'user'
                      ? 'bg-[#FFD600] text-[#121212]'
                      : 'bg-white text-[#121212] shadow-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-[#121212]/60' : 'text-gray-500'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 h-12 rounded-2xl border-2 border-gray-200 focus:border-[#FFD600]"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="w-12 h-12 rounded-2xl bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] disabled:opacity-50 active:scale-95 transition-transform"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* FAQ View */}
      {viewMode === 'faq' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-md"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[#FFD600] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <BookOpen className="w-4 h-4 text-[#121212]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#121212] mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="text-center py-6">
            <p className="text-sm text-gray-500 mb-3">Didn't find what you need?</p>
            <Button
              onClick={() => setViewMode('chat')}
              className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] font-semibold rounded-2xl h-12 px-6"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with Support
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
