import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
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
  CheckCircle,
  Trash2,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAppTheme } from '../utils/useAppTheme';

type ViewMode = 'menu' | 'preQuestions' | 'chat' | 'faq';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
}

interface PreQuestion {
  id: number;
  question: string;
  options: string[];
  isTextInput?: boolean;
}

const CHAT_STORAGE_KEY = 'baymoto_support_chat';
const CHAT_STATE_KEY = 'baymoto_support_state';

export function Support() {
  const navigate = useNavigate();
  const theme = useAppTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load persisted state
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const savedState = localStorage.getItem(CHAT_STATE_KEY);
    if (savedState === 'chat') return 'chat';
    return 'menu';
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [message, setMessage] = useState('');
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [
      {
        id: '1',
        text: 'Merhaba! Size nasıl yardımcı olabilirim?',
        sender: 'support',
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  // Persist messages
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Persist chat state
  useEffect(() => {
    if (viewMode === 'chat') {
      localStorage.setItem(CHAT_STATE_KEY, 'chat');
    } else {
      localStorage.removeItem(CHAT_STATE_KEY);
    }
  }, [viewMode]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const preQuestions: PreQuestion[] = [
    {
      id: 1,
      question: 'Sorununuz hangi kategori ile ilgili?',
      options: ['Ödeme Sorunları', 'Navigasyon/Harita', 'Uygulama Hatası', 'Hesap Yönetimi', 'Diğer'],
    },
    {
      id: 2,
      question: 'Sorununuz ne kadar acil?',
      options: ['Çok Acil (Şu an teslimat yapıyorum)', 'Acil', 'Normal', 'Acil Değil'],
    },
    {
      id: 3,
      question: 'Daha önce benzer bir sorun yaşadınız mı?',
      options: ['Evet, sık sık oluyor', 'Evet, ama nadir', 'Hayır, ilk defa'],
    },
    {
      id: 4,
      question: 'Uygulamayı yeniden başlattınız mı?',
      options: ['Evet, çözülmedi', 'Evet, kısmen düzeldi', 'Hayır, denemedim'],
    },
    {
      id: 5,
      question: 'Sorununuzu kısaca açıklayın',
      options: [],
      isTextInput: true,
    },
  ];

  const faqs = [
    {
      question: 'Siparişi nasıl kabul ederim?',
      answer: 'Sipariş bildirimi geldiğinde, belirlenen süre içinde "Kabul Et" butonuna basın.',
    },
    {
      question: 'Siparişi iptal etmem gerekirse ne yapmalıyım?',
      answer: 'Aktif sipariş ekranındaki uyarı simgesine dokunun ve "Siparişi İptal Et"i seçin.',
    },
    {
      question: 'Kazançlarımı nasıl alırım?',
      answer: 'Kazançlarınız her hafta otomatik olarak banka hesabınıza yatırılır.',
    },
    {
      question: 'Kaza durumunda ne yapmalıyım?',
      answer: 'Önce herkesin güvende olduğundan emin olun. Gerekirse acil servisleri arayın.',
    },
    {
      question: 'Puanım nasıl hesaplanır?',
      answer: 'Puanınız müşteri geri bildirimleri, zamanında teslimat ve sipariş doğruluğuna göre hesaplanır.',
    },
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Canlı Destek',
      subtitle: viewMode === 'chat' ? '✅ Aktif sohbet devam ediyor' : 'Destek ekibimizle sohbet edin',
      color: '',
      style: { backgroundColor: theme.primary },
      iconColor: 'text-[#121212]',
      badge: viewMode === 'chat' ? messages.length - 1 : 0,
      action: () => {
        if (viewMode === 'chat') {
          // Resume existing chat
          setViewMode('chat');
        } else {
          setViewMode('preQuestions');
          setCurrentQuestionIndex(0);
          setAnswers({});
        }
      },
    },
    {
      icon: Phone,
      title: 'Destek Hattı',
      subtitle: '7/24 hizmet: 0850 123 45 67',
      color: 'bg-green-100',
      style: {},
      iconColor: 'text-green-600',
      badge: 0,
      action: () => window.open('tel:08501234567'),
    },
    {
      icon: HelpCircle,
      title: 'Sık Sorulanlar',
      subtitle: 'Yaygın sorulara cevap bulun',
      color: 'bg-blue-100',
      style: {},
      iconColor: 'text-blue-600',
      badge: 0,
      action: () => setViewMode('faq'),
    },
    {
      icon: Mail,
      title: 'E-posta Gönderin',
      subtitle: 'destek@baymoto.com',
      color: 'bg-purple-100',
      style: {},
      iconColor: 'text-purple-600',
      badge: 0,
      action: () => window.open('mailto:destek@baymoto.com'),
    },
  ];

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < preQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTextInput('');
    } else {
      const summaryMessage = `📋 Destek Talebi Özeti:\n━━━━━━━━━━━━━━━━\n${Object.entries(newAnswers)
        .map(([index, ans]) => `${preQuestions[parseInt(index)].question}\n→ ${ans}`)
        .join('\n\n')}`.trim();

      const initMessages = [
        {
          id: '1',
          text: 'Sorularınıza verdiğiniz cevapları aldım. Şimdi size yardımcı olacağım!',
          sender: 'support' as const,
          time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        },
        {
          id: '2',
          text: summaryMessage,
          sender: 'user' as const,
          time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        },
        {
          id: '3',
          text: 'Konuyla ilgili bir destek temsilcisi size yardımcı olacak. Lütfen sorununuzu detaylı şekilde anlatın.',
          sender: 'support' as const,
          time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        },
      ];

      // Merge with existing messages if any
      const existingMessages = messages.filter((m) => m.id !== '1');
      setMessages(existingMessages.length > 0 ? [...messages, ...initMessages.slice(1)] : initMessages);
      setViewMode('chat');
    }
  };

  const handleTextInputSubmit = () => {
    if (textInput.trim()) {
      handleAnswerSelect(textInput.trim());
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');

      setTimeout(() => {
        const responses = [
          'Mesajınızı aldım. Konuyu inceliyorum, kısa süre içinde size geri döneceğim.',
          'Anlıyorum, bu konuda yardımcı olmaya çalışıyorum.',
          'Sorunuzu ilgili ekibe ilettim, bekleyin lütfen.',
          'Teşekkür ederim, biraz daha detay verebilir misiniz?',
        ];
        const supportMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'support',
          time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, supportMessage]);
      }, 1500);
    }
  };

  const handleClearChat = () => {
    localStorage.removeItem(CHAT_STORAGE_KEY);
    localStorage.removeItem(CHAT_STATE_KEY);
    setMessages([{
      id: '1',
      text: 'Merhaba! Size nasıl yardımcı olabilirim?',
      sender: 'support',
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    }]);
    setViewMode('menu');
  };

  const handleBackFromChat = () => {
    // Don't clear chat - just go back to menu, chat persists
    setViewMode('menu');
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <div style={{ backgroundColor: theme.primary }} className="px-4 pt-4 pb-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (viewMode === 'chat') {
                handleBackFromChat();
              } else if (viewMode !== 'menu') {
                setViewMode('menu');
                setCurrentQuestionIndex(0);
                setAnswers({});
              } else {
                navigate('/dashboard');
              }
            }}
            className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20"
          >
            <ArrowLeft className="w-5 h-5 text-[#121212]" />
          </Button>
          <h1 className="text-lg font-bold text-[#121212]">Yardım & Destek</h1>
          {viewMode === 'chat' ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-black/10 rounded-full px-2 py-1">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#121212]">Canlı</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearChat}
                title="Sohbeti sil"
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4 text-[#121212]" />
              </Button>
            </div>
          ) : (
            <div className="w-16" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-5 space-y-3 overflow-y-auto h-full"
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#121212] mb-1">Size nasıl yardımcı olabiliriz?</h2>
                <p className="text-gray-500 text-sm">İletişim yöntemini seçin</p>
              </div>

              {supportOptions.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={option.action}
                  className="w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-lg active:scale-98 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center relative ${option.color}`}
                      style={option.style}
                    >
                      <option.icon className={`w-7 h-7 ${option.iconColor}`} />
                      {option.badge > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-[#121212]">{option.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{option.subtitle}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </motion.button>
              ))}

              {/* Emergency Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-5 shadow-xl text-white mt-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-6 h-6" />
                  <h3 className="font-bold text-lg">Acil Durum</h3>
                </div>
                <p className="text-white/90 text-sm mb-3">
                  Acil durumlar için 7/24 ulaşabileceğiniz destek hattımız
                </p>
                <Button
                  onClick={() => window.open('tel:08501234567')}
                  className="w-full bg-white text-red-600 hover:bg-white/90 font-bold"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Acil Destek Hattını Ara
                </Button>
              </motion.div>
            </motion.div>
          )}

          {viewMode === 'preQuestions' && (
            <motion.div
              key="preQuestions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 overflow-y-auto h-full"
            >
              <div className="max-w-2xl mx-auto">
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">
                      Soru {currentQuestionIndex + 1} / {preQuestions.length}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: theme.primary }}>
                      {Math.round(((currentQuestionIndex + 1) / preQuestions.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIndex + 1) / preQuestions.length) * 100}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: theme.primary }}
                    />
                  </div>
                </div>

                {/* Question */}
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 shadow-xl mb-4"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <HelpCircle className="w-6 h-6 text-[#121212]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#121212] leading-tight">
                      {preQuestions[currentQuestionIndex].question}
                    </h2>
                  </div>

                  {preQuestions[currentQuestionIndex].isTextInput ? (
                    <div className="space-y-4">
                      <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Sorununuzu detaylı olarak yazın..."
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none min-h-[130px] resize-none"
                        style={{ borderColor: textInput ? theme.primary : undefined }}
                      />
                      <Button
                        onClick={handleTextInputSubmit}
                        disabled={!textInput.trim()}
                        className="w-full h-14 font-bold text-lg rounded-xl disabled:opacity-50"
                        style={{ backgroundColor: theme.primary, color: theme.secondary }}
                      >
                        <Send className="mr-2 w-5 h-5" />
                        Canlı Desteğe Bağlan
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {preQuestions[currentQuestionIndex].options.map((option, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.08 }}
                          onClick={() => handleAnswerSelect(option)}
                          className="w-full p-4 bg-gray-50 rounded-2xl text-left font-semibold text-[#121212] transition-all active:scale-98"
                          style={{}}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = theme.primary;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = '#f9fafb';
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Answered Questions */}
                {Object.keys(answers).length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Cevaplarınız</h3>
                    {Object.entries(answers).map(([index, answer]) => (
                      <div key={index} className="bg-white rounded-xl p-3 shadow-sm">
                        <p className="text-xs text-gray-400 mb-1">{preQuestions[parseInt(index)].question}</p>
                        <p className="font-semibold text-[#121212] flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {viewMode === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[78%] rounded-2xl p-3 ${
                        msg.sender === 'user'
                          ? 'text-[#121212]'
                          : 'bg-white text-[#121212] shadow-md'
                      }`}
                      style={msg.sender === 'user' ? { backgroundColor: theme.primary } : {}}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === 'user' ? 'text-[#121212]/60' : 'text-gray-400'
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Mesajınızı yazın..."
                    className="flex-1 h-11 rounded-xl"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="h-11 w-11 rounded-xl"
                    style={{ backgroundColor: theme.primary, color: theme.secondary }}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 space-y-3 overflow-y-auto h-full"
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#121212] mb-1">Sık Sorulan Sorular</h2>
                <p className="text-gray-500 text-sm">Yaygın soruların cevapları</p>
              </div>

              {faqs.map((faq, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white rounded-2xl p-5 shadow-md group"
                >
                  <summary className="font-bold text-[#121212] cursor-pointer list-none flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 flex-shrink-0" style={{ color: theme.primary }} />
                      {faq.question}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed text-sm pl-8">{faq.answer}</p>
                </motion.details>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
