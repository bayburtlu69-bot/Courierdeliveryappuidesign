import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image as ImageIcon, User, Headphones } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LiveSupportChatProps {
  ticket: {
    id: number;
    courierName: string;
    issue: string;
    severity: string;
  };
  onClose?: () => void;
}

export function LiveSupportChat({ ticket }: LiveSupportChatProps) {
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

      // Simulate courier auto-reply
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'courier',
            text: 'Teşekkürler, anlıyorum.',
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Issue Banner */}
      <div className="bg-orange-50 border-b border-orange-200 px-4 py-2 flex-shrink-0">
        <p className="text-sm text-orange-800">
          <strong>Konu:</strong> {ticket.issue}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${message.sender === 'support' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                message.sender === 'support'
                  ? 'bg-[#FFD600]'
                  : 'bg-gray-300'
              }`}
            >
              {message.sender === 'support' ? (
                <Headphones className="w-4 h-4 text-[#121212]" />
              ) : (
                <User className="w-4 h-4 text-gray-600" />
              )}
            </div>

            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                message.sender === 'support'
                  ? 'bg-[#121212] text-white rounded-br-sm'
                  : 'bg-white text-[#121212] shadow-sm rounded-bl-sm'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'support' ? 'text-white/60' : 'text-gray-400'
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
            <ImageIcon className="w-5 h-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Mesajınızı yazın..."
            className="flex-1 rounded-xl border-2 border-gray-200 focus:border-[#FFD600]"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-[#FFD600] hover:bg-[#FFD600]/90 text-[#121212] rounded-xl font-bold px-4"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}