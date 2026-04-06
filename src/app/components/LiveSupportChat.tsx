import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Send, Paperclip, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LiveSupportChatProps {
  ticket: {
    id: number;
    courierName: string;
    issue: string;
    severity: string;
  };
  onClose: () => void;
}

export function LiveSupportChat({ ticket, onClose }: LiveSupportChatProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'courier',
      text: ticket.issue,
      time: '14:32',
    },
    {
      id: 2,
      sender: 'support',
      text: 'Merhaba! Size nasıl yardımcı olabilirim?',
      time: '14:33',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'support',
          text: newMessage,
          time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{ticket.courierName}</h3>
            <p className="text-sm text-blue-100">Canlı Destek</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Issue Banner */}
        <div className="bg-orange-50 border-b border-orange-200 p-3">
          <p className="text-sm text-orange-800">
            <strong>Konu:</strong> {ticket.issue}
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'support' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.sender === 'support'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-[#121212] shadow-sm'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'support' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <ImageIcon className="w-5 h-5" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Mesajınızı yazın..."
              className="flex-1 rounded-xl"
            />
            <Button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
