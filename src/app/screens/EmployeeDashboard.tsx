import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  UserCog,
  FileText,
  MessageSquare,
  Check,
  X,
  LogOut,
  AlertCircle,
  Clock,
  Eye,
  Mail,
  Phone,
  Car,
  MapPin,
  User,
  XCircle,
  ChevronRight,
  Home,
  Headphones,
  Send,
  Trash2,
  TriangleAlert,
  CircleMinus,
  Search,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { LiveSupportChat } from '../components/LiveSupportChat';
import { toast } from 'sonner';

type EmpTab = 'overview' | 'applications' | 'support' | 'couriers';

interface CloseChatOptions {
  ticketId: number;
  courierName: string;
}

export function EmployeeDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<EmpTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [applications, setApplications] = useState(() =>
    JSON.parse(localStorage.getItem('courierApplications') || '[]')
  );
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [viewingDocument, setViewingDocument] = useState<{ type: string; url: string } | null>(null);
  const [closeChatOptions, setCloseChatOptions] = useState<CloseChatOptions | null>(null);
  const [rejectModal, setRejectModal] = useState<{ id: number; name: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [minimizedChats, setMinimizedChats] = useState<any[]>([]);
  const [showMaxTickets, setShowMaxTickets] = useState(5);

  const pendingApplications = applications.filter((app: any) => app.status === 'pending');

  // Support tickets - sorted newest first
  const supportTickets = [
    { id: 5, courierName: 'Emre Şahin', issue: 'Müşteri ödemeyi reddetti ne yapmalıyım?', severity: 'high', time: '2 dk önce', status: 'open', timestamp: Date.now() - 120000 },
    { id: 1, courierName: 'Ahmet Yılmaz', issue: 'Ödeme alınamıyor, müşteri kartı reddetti', severity: 'high', time: '5 dk önce', status: 'open', timestamp: Date.now() - 300000 },
    { id: 2, courierName: 'Ayşe Demir', issue: 'Uygulama navigasyon sorunu yaşıyorum', severity: 'medium', time: '15 dk önce', status: 'open', timestamp: Date.now() - 900000 },
    { id: 3, courierName: 'Mehmet Kaya', issue: 'Teslimat adresini nasıl değiştirebilirim?', severity: 'low', time: '1 saat önce', status: 'open', timestamp: Date.now() - 3600000 },
    { id: 4, courierName: 'Fatma Öz', issue: 'Kazancım hesabıma ne zaman yansıyacak?', severity: 'medium', time: '2 saat önce', status: 'open', timestamp: Date.now() - 7200000 },
    { id: 6, courierName: 'Selin Çelik', issue: 'Uygulama çöküyor tekrar açılmıyor', severity: 'high', time: '3 saat önce', status: 'open', timestamp: Date.now() - 10800000 },
    { id: 7, courierName: 'Burak Arslan', issue: 'Bonus hesaplaması yanlış görünüyor', severity: 'low', time: '4 saat önce', status: 'open', timestamp: Date.now() - 14400000 },
  ];

  const menuItems = [
    { id: 'overview', icon: Home, label: 'Genel Bakış', color: 'text-[#FFD600]' },
    { id: 'applications', icon: FileText, label: 'Başvurular', color: 'text-purple-400', badge: pendingApplications.length },
    { id: 'support', icon: MessageSquare, label: 'Canlı Destek', color: 'text-blue-400', badge: supportTickets.length },
    { id: 'couriers', icon: User, label: 'Kuryeler', color: 'text-green-400' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminEmail');
    navigate('/admin-selector');
  };

  const logActivity = (action: string, desc: string, type: string) => {
    const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    logs.unshift({
      id: Date.now(), action, description: desc, type,
      timestamp: new Date().toISOString(),
      user: localStorage.getItem('adminEmail') || 'Destek Çalışanı',
    });
    localStorage.setItem('activityLogs', JSON.stringify(logs.slice(0, 500)));
  };

  const handleApprove = (id: number) => {
    const app = applications.find((a: any) => a.id === id);
    const updated = applications.map((a: any) => a.id === id ? { ...a, status: 'approved' } : a);
    setApplications(updated);
    localStorage.setItem('courierApplications', JSON.stringify(updated));
    // Gerçek sistem: kurye hesabı oluştur
    import('../utils/auth').then(({ courierAuth }) => courierAuth.approveApplication(id));
    logActivity('Başvuru Onaylandı', `${app?.fullName} başvurusu onaylandı ve kurye hesabı oluşturuldu`, 'success');
    toast.success(`${app?.fullName} onaylandı! Kurye hesabı aktif edildi. 🎉`);
  };

  const handleRejectWithReason = (id: number, reason: string) => {
    const app = applications.find((a: any) => a.id === id);
    const updated = applications.map((a: any) =>
      a.id === id ? { ...a, status: 'rejected', rejectionReason: reason } : a
    );
    setApplications(updated);
    localStorage.setItem('courierApplications', JSON.stringify(updated));
    logActivity('Başvuru Reddedildi', `${app?.fullName} başvurusu reddedildi. Sebep: ${reason}`, 'warning');
    toast.error('Başvuru reddedildi');
    setRejectModal(null);
    setRejectReason('');
  };

  const handleCloseChatRequest = (ticketId: number, courierName: string) => {
    setCloseChatOptions({ ticketId, courierName });
  };

  const handleDeleteChat = (ticketId: number) => {
    // Send farewell message (in a real app, this would go to the courier's chat)
    const farewellMsg = {
      id: Date.now().toString(),
      text: '🌟 Jetgo Destek ekibinden mesaj: Sorununuz çözüldü. Kendinize çok iyi bakın, iyi çalışmalar dileriz! Herhangi bir konuda tekrar yardımcı olmaktan memnuniyet duyarız. 🙏',
      sender: 'support',
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      farewell: true,
    };

    // Save farewell to courier's chat storage
    const chatKey = `jetgo_support_chat`;
    const existingMsgs = JSON.parse(localStorage.getItem(chatKey) || '[]');
    existingMsgs.push(farewellMsg);
    localStorage.setItem(chatKey, JSON.stringify(existingMsgs));
    // Clear courier's chat state so it doesn't auto-resume
    localStorage.removeItem('jetgo_support_state');

    logActivity('Sohbet Silindi', `Destek Talebi #${ticketId} komple silindi ve kurye bilgilendirildi`, 'info');
    setSelectedTicket(null);
    setCloseChatOptions(null);
    setMinimizedChats((prev) => prev.filter((c) => c.id !== ticketId));
    toast.success('Sohbet silindi ve kurye bilgilendirildi!');
  };

  const handleMinimizeChat = (ticketId: number) => {
    const ticket = supportTickets.find((t) => t.id === ticketId);
    if (ticket && !minimizedChats.find((c) => c.id === ticketId)) {
      setMinimizedChats((prev) => [...prev, ticket]);
    }
    setSelectedTicket(null);
    setCloseChatOptions(null);
    toast.success('Sohbet alta çekildi!');
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex">
      {/* SIDEBAR */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -260 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-72 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#0a0a0a] text-white shadow-2xl flex flex-col relative z-50 flex-shrink-0"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#FFD600] rounded-2xl flex items-center justify-center shadow-xl">
              <UserCog className="w-8 h-8 text-[#121212]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#FFD600]">Jetgo</h1>
              <p className="text-xs text-white/50">Destek Paneli</p>
            </div>
          </div>
        </div>

        {/* Employee Info */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FFD600] to-[#FFC107] rounded-full flex items-center justify-center">
              <Headphones className="w-5 h-5 text-[#121212]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {localStorage.getItem('adminEmail') || 'destek@jetgo.com'}
              </p>
              <p className="text-xs text-[#FFD600]">Destek Çalışanı</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as EmpTab)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                    isActive ? 'bg-[#FFD600] text-[#121212] shadow-lg' : 'hover:bg-white/8 text-white/80'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#121212]' : item.color}`} />
                  <span className={`font-semibold text-sm ${isActive ? 'text-[#121212]' : 'text-white'}`}>
                    {item.label}
                  </span>
                  {(item as any).badge > 0 && !isActive && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {(item as any).badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="ml-auto w-4 h-4 text-[#121212]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600/80 hover:bg-red-600 text-white font-bold h-12 rounded-xl"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Çıkış Yap
          </Button>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-4 top-8 w-8 h-8 bg-[#FFD600] rounded-full flex items-center justify-center shadow-xl z-50"
        >
          <ChevronRight
            className={`w-4 h-4 text-[#121212] transition-transform ${sidebarOpen ? '' : 'rotate-180'}`}
          />
        </button>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#121212]">
                {menuItems.find((m) => m.id === activeTab)?.label || 'Panel'}
              </h2>
              <p className="text-sm text-gray-500">Destek Çalışanı Paneli</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">{supportTickets.length} Aktif Talep</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <OverviewContent
                key="overview"
                pendingCount={pendingApplications.length}
                ticketCount={supportTickets.length}
              />
            )}
            {activeTab === 'applications' && (
              <ApplicationsContent
                key="applications"
                applications={pendingApplications}
                onApprove={handleApprove}
                onRejectRequest={(id, name) => setRejectModal({ id, name })}
                viewingDocument={viewingDocument}
                setViewingDocument={setViewingDocument}
              />
            )}
            {activeTab === 'support' && (
              <SupportContent
                key="support"
                tickets={supportTickets}
                selectedTicket={selectedTicket}
                setSelectedTicket={setSelectedTicket}
                onCloseChatRequest={handleCloseChatRequest}
                showMaxTickets={showMaxTickets}
                setShowMaxTickets={setShowMaxTickets}
              />
            )}
            {activeTab === 'couriers' && (
              <EmpCouriersContent key="couriers" />
            )}
          </AnimatePresence>
        </div>

        {/* Minimized Chats Bar */}
        {minimizedChats.length > 0 && (
          <div className="bg-[#121212] border-t border-white/10 px-4 py-2 flex items-center gap-3 flex-shrink-0">
            <span className="text-xs text-white/50 font-semibold">MİNİMİZE SOHBETLER:</span>
            {minimizedChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setSelectedTicket(chat);
                  setMinimizedChats((prev) => prev.filter((c) => c.id !== chat.id));
                  setActiveTab('support');
                }}
                className="flex items-center gap-2 bg-[#FFD600] text-[#121212] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#FFD600]/80 transition-colors"
              >
                <MessageSquare className="w-3 h-3" />
                {chat.courierName}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMinimizedChats((prev) => prev.filter((c) => c.id !== chat.id));
                  }}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Chat Close Options Modal */}
      <AnimatePresence>
        {closeChatOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
            onClick={() => setCloseChatOptions(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full"
            >
              <div className="text-center mb-5">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <TriangleAlert className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-[#121212] mb-1">Sohbeti Kapat</h3>
                <p className="text-sm text-gray-500">
                  <strong>{closeChatOptions.courierName}</strong> ile sohbeti ne yapmak istersiniz?
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleDeleteChat(closeChatOptions.ticketId)}
                  className="w-full p-4 bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-2xl text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 group-hover:bg-red-200 rounded-xl flex items-center justify-center">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-red-700">Sohbeti Komple Sil</p>
                      <p className="text-xs text-red-500">Kuryeye veda mesajı gönderilir ve sohbet silinir</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleMinimizeChat(closeChatOptions.ticketId)}
                  className="w-full p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-2xl text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center">
                      <CircleMinus className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-blue-700">Sohbeti Alta Çek</p>
                      <p className="text-xs text-blue-500">Alt çubukta küçültülmüş olarak devam eder</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setCloseChatOptions(null)}
                  className="w-full h-11 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl font-semibold text-sm transition-colors"
                >
                  Vazgeç
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reject Reason Modal */}
      <AnimatePresence>
        {rejectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
            onClick={() => { setRejectModal(null); setRejectReason(''); }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#121212]">Başvuruyu Reddet</h3>
                  <p className="text-sm text-gray-500">{rejectModal.name}</p>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Red Sebebi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Başvuruyu reddetme sebebini yazın... (Kurye bilgilendirilecek)"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none resize-none min-h-[120px] text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">Bu mesaj kurye adayına iletilecektir.</p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => handleRejectWithReason(rejectModal.id, rejectReason)}
                  disabled={!rejectReason.trim()}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-xl disabled:opacity-50"
                >
                  <XCircle className="mr-2 w-4 h-4" /> Reddet
                </Button>
                <Button
                  onClick={() => { setRejectModal(null); setRejectReason(''); }}
                  className="flex-1 bg-gray-100 text-gray-700 font-bold h-12 rounded-xl"
                >
                  Vazgeç
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── KURYELER (ÇALIŞAN) ───────────────────────────────────────────
function EmpCouriersContent() {
  const [search, setSearch] = useState('');
  const [reassignModal, setReassignModal] = useState<any>(null);
  const [reassignTarget, setReassignTarget] = useState<number | null>(null);

  const couriers = [
    { id: 1, courierId: 'KRY-001', name: 'Ahmet Yılmaz', phone: '0555 111 1111', vehicle: 'Motosiklet', rating: 4.9, deliveries: 312, status: 'delivering', activeOrder: '#SIP-1234', city: 'İstanbul' },
    { id: 2, courierId: 'KRY-002', name: 'Fatma Demir',  phone: '0555 222 2222', vehicle: 'Bisiklet',   rating: 4.7, deliveries: 187, status: 'offline',    activeOrder: null,       city: 'Ankara' },
    { id: 3, courierId: 'KRY-003', name: 'Mehmet Kaya',  phone: '0555 333 3333', vehicle: 'Motosiklet', rating: 4.8, deliveries: 245, status: 'delivering', activeOrder: '#SIP-1235', city: 'İzmir' },
    { id: 4, courierId: 'KRY-004', name: 'Ayşe Öz',      phone: '0555 444 4444', vehicle: 'Motosiklet', rating: 4.6, deliveries: 198, status: 'online',     activeOrder: null,       city: 'Bursa' },
    { id: 5, courierId: 'KRY-005', name: 'Can Bak',      phone: '0555 555 5555', vehicle: 'Bisiklet',   rating: 4.5, deliveries: 120, status: 'offline',    activeOrder: null,       city: 'Antalya' },
    { id: 6, courierId: 'KRY-006', name: 'Zeynep Ak',    phone: '0555 666 6666', vehicle: 'Motosiklet', rating: 4.4, deliveries: 88,  status: 'online',     activeOrder: null,       city: 'Adana' },
    { id: 7, courierId: 'KRY-007', name: 'Burak Ar',     phone: '0555 777 7777', vehicle: 'Bisiklet',   rating: 4.3, deliveries: 55,  status: 'offline',    activeOrder: null,       city: 'Trabzon' },
  ];

  const filtered = couriers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.courierId.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const availableCouriers = couriers.filter((c) => c.status === 'online' && !c.activeOrder);

  const handleReassign = () => {
    if (!reassignTarget) { toast.error('Lütfen bir kurye seçin'); return; }
    const to = couriers.find((c) => c.id === reassignTarget);
    toast.success(`${reassignModal.activeOrder} siparişi ${to?.name}'e atandı! 🎯`);
    setReassignModal(null);
    setReassignTarget(null);
  };

  const statusColor = (s: string) =>
    s === 'delivering' ? 'text-blue-600 bg-blue-50' :
    s === 'online'     ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-100';
  const statusLabel = (s: string) =>
    s === 'delivering' ? '🚴 Teslimatta' : s === 'online' ? '✅ Müsait' : '⭕ Çevrimdışı';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ID, isim veya telefon ara..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
          />
        </div>
        <div className="bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl whitespace-nowrap text-sm font-semibold text-blue-700">
          {couriers.filter((c) => c.status === 'delivering').length} teslimatta
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((courier, i) => (
          <motion.div
            key={courier.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white rounded-2xl p-4 shadow-md border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                courier.status === 'delivering' ? 'bg-blue-100' :
                courier.status === 'online' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <User className={`w-6 h-6 ${
                  courier.status === 'delivering' ? 'text-blue-600' :
                  courier.status === 'online' ? 'text-green-600' : 'text-gray-400'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[#121212]">{courier.name}</h4>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{courier.courierId}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{courier.vehicle} · {courier.city} · ⭐{courier.rating}</p>
                {courier.activeOrder && (
                  <p className="text-xs text-blue-600 font-semibold mt-0.5">📦 {courier.activeOrder}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor(courier.status)}`}>
                  {statusLabel(courier.status)}
                </span>
                {courier.activeOrder && (
                  <button
                    onClick={() => { setReassignModal(courier); setReassignTarget(null); }}
                    className="text-xs bg-[#FFD600] text-[#121212] font-bold px-3 py-1 rounded-lg hover:bg-yellow-400 transition-colors"
                  >
                    Yeniden Ata
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <User className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>Kurye bulunamadı</p>
          </div>
        )}
      </div>

      {/* Reassign Modal */}
      <AnimatePresence>
        {reassignModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setReassignModal(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="font-bold text-lg text-[#121212] mb-1">Siparişi Yeniden Ata</h3>
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-semibold text-blue-600">{reassignModal.activeOrder}</span> — en yakın müsait kuryeye aktar
              </p>
              <div className="space-y-2 max-h-52 overflow-y-auto mb-4">
                {availableCouriers.filter((c) => c.id !== reassignModal.id).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setReassignTarget(c.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      reassignTarget === c.id ? 'border-[#FFD600] bg-yellow-50' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-sm text-[#121212]">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.city} · {c.courierId}</p>
                    </div>
                    <span className="text-xs text-green-600 font-bold">Müsait</span>
                    {reassignTarget === c.id && <span className="text-[#FFD600] font-bold ml-1">✓</span>}
                  </button>
                ))}
                {availableCouriers.filter((c) => c.id !== reassignModal.id).length === 0 && (
                  <p className="text-center text-sm text-gray-400 py-6">Müsait kurye bulunamadı</p>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setReassignModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold">İptal</button>
                <button onClick={handleReassign} className="flex-1 py-2.5 rounded-xl bg-[#FFD600] text-[#121212] text-sm font-bold">Ata</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── OVERVIEW ─────────────────────────────────────────────────────
function OverviewContent({ pendingCount, ticketCount }: { pendingCount: number; ticketCount: number }) {
  // Puan sistemi - localStorage'dan oku, yoksa mock data kullan
  const [courierPoints, setCourierPoints] = useState<any[]>(() => {
    const saved = localStorage.getItem('courierPointsBoard');
    if (saved) return JSON.parse(saved);
    const defaults = [
      { id: 1, name: 'Ahmet Y.',   points: 1240, deliveries: 98,  rating: 4.9, badge: '🥇' },
      { id: 2, name: 'Fatma D.',   points: 1105, deliveries: 87,  rating: 4.8, badge: '🥈' },
      { id: 3, name: 'Mehmet K.',  points: 980,  deliveries: 76,  rating: 4.7, badge: '🥉' },
      { id: 4, name: 'Ayşe Ö.',    points: 870,  deliveries: 68,  rating: 4.6, badge: '🎖️' },
      { id: 5, name: 'Can B.',     points: 740,  deliveries: 58,  rating: 4.5, badge: '⭐' },
      { id: 6, name: 'Zeynep A.', points: 620,  deliveries: 49,  rating: 4.4, badge: '⭐' },
    ];
    localStorage.setItem('courierPointsBoard', JSON.stringify(defaults));
    return defaults;
  });

  const handleAddPoints = (id: number, delta: number) => {
    const updated = courierPoints.map((c) =>
      c.id === id ? { ...c, points: Math.max(0, c.points + delta) } : c
    ).sort((a, b) => b.points - a.points)
     .map((c, i) => ({ ...c, badge: ['🥇','🥈','🥉','🎖️','⭐','⭐'][i] ?? '⭐' }));
    setCourierPoints(updated);
    localStorage.setItem('courierPointsBoard', JSON.stringify(updated));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="grid grid-cols-3 gap-5">
        {[
          { icon: AlertCircle, label: 'Bekleyen Başvuru', value: pendingCount, bg: 'from-yellow-400 to-yellow-600' },
          { icon: MessageSquare, label: 'Aktif Destek Talebi', value: ticketCount, bg: 'from-blue-400 to-blue-600' },
          { icon: Check, label: 'Bugün Çözülen', value: 12, bg: 'from-green-400 to-green-600' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${s.bg} rounded-2xl p-6 text-white shadow-xl`}
            >
              <Icon className="w-8 h-8 mb-3 opacity-90" />
              <p className="text-4xl font-bold mb-1">{s.value}</p>
              <p className="text-white/80 text-sm">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* 🏆 Puan Sıralaması */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-[#121212] flex items-center gap-2">
            🏆 Kurye Puan Sıralaması
          </h3>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Bu Hafta</span>
        </div>
        <div className="space-y-3">
          {courierPoints.map((courier, i) => (
            <motion.div
              key={courier.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-xl ${i === 0 ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-gray-50'}`}
            >
              <span className="text-2xl w-8 text-center">{courier.badge}</span>
              <div className="flex-1">
                <p className="font-bold text-[#121212] text-sm">{courier.name}</p>
                <p className="text-xs text-gray-400">{courier.deliveries} teslimat · ⭐ {courier.rating}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddPoints(courier.id, -10)}
                  className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold hover:bg-red-200 flex items-center justify-center"
                >−</button>
                <span className="text-sm font-bold text-[#121212] min-w-[48px] text-center">{courier.points} pt</span>
                <button
                  onClick={() => handleAddPoints(courier.id, 10)}
                  className="w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs font-bold hover:bg-green-200 flex items-center justify-center"
                >+</button>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">+/− butonlarıyla manuel puan ekleyebilirsiniz</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-[#121212] mb-4">Son İşlemler</h3>
        <div className="space-y-3">
          {[
            { text: 'Ahmet Yılmaz destek talebi yanıtlandı', time: '10 dk önce', type: 'support' },
            { text: 'Fatma Demir başvurusu onaylandı', time: '25 dk önce', type: 'approval' },
            { text: 'Mehmet Kaya navigasyon sorunu çözüldü', time: '1 saat önce', type: 'support' },
            { text: 'Ayşe Öz başvurusu inceleniyor', time: '2 saat önce', type: 'pending' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.type === 'support' ? 'bg-blue-100' : item.type === 'approval' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {item.type === 'support' ? <MessageSquare className="w-4 h-4 text-blue-600" /> :
                 item.type === 'approval' ? <Check className="w-4 h-4 text-green-600" /> :
                 <Clock className="w-4 h-4 text-yellow-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#121212]">{item.text}</p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


// ─── APPLICATIONS ─────────────────────────────────────────────────
function ApplicationsContent({ applications, onApprove, onRejectRequest, viewingDocument, setViewingDocument }: any) {
  if (applications.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20">
        <Check className="w-20 h-20 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-400 mb-2">Harika! Tüm başvurular incelendi</h3>
        <p className="text-gray-400">Şu anda bekleyen başvuru bulunmuyor</p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      {applications.map((app: any) => (
        <motion.div
          key={app.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#FFD600]"
        >
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFD600] to-[#FFC107] rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-[#121212]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#121212]">{app.fullName}</h3>
                <p className="text-gray-400 text-sm mt-1">Başvuru ID: #{app.id}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => onApprove(app.id)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 h-11 rounded-xl shadow-lg"
              >
                <Check className="mr-2 w-4 h-4" /> Onayla
              </Button>
              <Button
                onClick={() => onRejectRequest(app.id, app.fullName)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 h-11 rounded-xl shadow-lg"
              >
                <X className="mr-2 w-4 h-4" /> Reddet
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            {app.email && <InfoItem icon={Mail} label="E-posta" value={app.email} />}
            {app.phone && <InfoItem icon={Phone} label="Telefon" value={app.phone} />}
            {app.vehicleType && <InfoItem icon={Car} label="Araç" value={app.vehicleType} />}
            {app.city && <InfoItem icon={MapPin} label="Şehir" value={app.city} />}
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h4 className="font-bold text-[#121212] mb-3">Belgeler</h4>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Ehliyet', field: 'driverLicenseImage' },
                { label: 'Kimlik', field: 'idPhotoImage' },
                { label: 'Araç Ruhsatı', field: 'vehicleRegistrationImage' },
                { label: 'Araç Fotoğrafı', field: 'vehiclePhotoImage' },
              ].map(({ label, field }) => (
                <button
                  key={label}
                  onClick={() => setViewingDocument({ type: label, url: app[field] || null })}
                  className={`rounded-xl p-3 text-center hover:shadow-lg transition-all border-2 ${
                    app[field] ? 'bg-gradient-to-br from-[#FFD600] to-[#FFC107] border-yellow-300' : 'bg-gray-100 border-gray-200 opacity-50'
                  }`}
                >
                  {app[field]
                    ? <img src={app[field]} alt={label} className="w-full h-12 object-cover rounded-lg mb-1" />
                    : <Eye className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                  }
                  <p className="text-xs font-bold text-[#121212]">{label}</p>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Document Modal */}
      <AnimatePresence>
        {viewingDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingDocument(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-[#121212]">{viewingDocument.type}</h3>
                <Button onClick={() => setViewingDocument(null)} variant="ghost" size="icon" className="w-9 h-9 rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              {viewingDocument.url ? (
                <img
                  src={viewingDocument.url}
                  alt={viewingDocument.type}
                  className="w-full max-h-[70vh] object-contain bg-gray-50"
                />
              ) : (
                <div className="p-16 flex flex-col items-center justify-center text-center bg-gray-50">
                  <FileText className="w-20 h-20 text-gray-200 mb-4" />
                  <p className="text-gray-400 font-semibold">Görsel yüklenmemiş</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── SUPPORT CHAT ─────────────────────────────────────────────────
function SupportContent({ tickets, selectedTicket, setSelectedTicket, onCloseChatRequest, showMaxTickets, setShowMaxTickets }: any) {
  const visibleTickets = tickets.slice(0, showMaxTickets);
  const hasMore = tickets.length > showMaxTickets;

  // Kurye sohbet silme bildirimleri
  const [chatNotifs, setChatNotifs] = useState<any[]>(() =>
    JSON.parse(localStorage.getItem('empChatNotifications') || '[]')
  );
  const dismissNotif = (id: number) => {
    const updated = chatNotifs.filter((n) => n.id !== id);
    setChatNotifs(updated);
    localStorage.setItem('empChatNotifications', JSON.stringify(updated));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-3 gap-5"
      style={{ height: 'calc(100vh - 200px)' }}
    >
      {/* Ticket List */}
      <div className="col-span-1 flex flex-col min-h-0">
        <h3 className="text-lg font-bold text-[#121212] mb-3 flex-shrink-0">
          Destek Talepleri ({tickets.length})
          <span className="ml-2 text-xs text-gray-400 font-normal">Yeniden eskiye</span>
        </h3>

        {/* Chat kapatma bildirimleri */}
        {chatNotifs.length > 0 && (
          <div className="mb-3 space-y-2 flex-shrink-0">
            {chatNotifs.map((n: any) => (
              <div key={n.id} className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2">
                <span className="text-sm flex-1 text-orange-700">🔔 {n.text}</span>
                <button onClick={() => dismissNotif(n.id)} className="text-orange-400 hover:text-orange-600 text-xs font-bold">✕</button>
              </div>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-2">
          {visibleTickets.map((ticket: any, index: number) => (
            <motion.button
              key={ticket.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedTicket(ticket)}
              whileHover={{ scale: 1.01 }}
              className={`w-full text-left p-4 rounded-2xl transition-all shadow-md ${
                selectedTicket?.id === ticket.id
                  ? 'bg-[#FFD600] shadow-xl'
                  : 'bg-white hover:shadow-lg'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-[#121212] text-sm">{ticket.courierName}</h4>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0 ${
                  ticket.severity === 'high' ? 'bg-red-100 text-red-600' :
                  ticket.severity === 'medium' ? 'bg-orange-100 text-orange-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {ticket.severity === 'high' ? '🔴 Acil' : ticket.severity === 'medium' ? '🟡 Orta' : '🔵 Normal'}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{ticket.issue}</p>
              <div className="flex items-center text-xs text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                {ticket.time}
              </div>
            </motion.button>
          ))}

          {hasMore && (
            <button
              onClick={() => setShowMaxTickets((prev: number) => prev + 5)}
              className="w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold text-gray-600 transition-colors"
            >
              + {tickets.length - showMaxTickets} daha göster
            </button>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="col-span-2 flex flex-col min-h-0">
        {selectedTicket ? (
          <div className="bg-white rounded-2xl shadow-xl flex flex-col h-full overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-[#121212] to-[#2a2a2a] rounded-t-2xl flex-shrink-0">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedTicket.courierName}</h3>
                <p className="text-[#FFD600] text-sm mt-0.5 line-clamp-1">{selectedTicket.issue}</p>
              </div>
              <Button
                onClick={() => onCloseChatRequest(selectedTicket.id, selectedTicket.courierName)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg h-10 rounded-xl px-4"
              >
                <XCircle className="mr-2 w-4 h-4" />
                Sohbeti Kapat
              </Button>
            </div>
            {/* Live Chat */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <LiveSupportChat ticket={selectedTicket} />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl h-full flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-20 h-20 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-semibold">Bir destek talebi seçin</p>
              <p className="text-gray-300 text-sm mt-2">Soldaki listeden bir talebi seçin</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function InfoItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
      <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
        <Icon className="w-5 h-5 text-gray-500" />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-semibold text-[#121212] text-sm">{value}</p>
      </div>
    </div>
  );
}