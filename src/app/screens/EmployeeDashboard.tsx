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
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { LiveSupportChat } from '../components/LiveSupportChat';
import { toast } from 'sonner';

type Tab = 'applications' | 'support';

export function EmployeeDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('applications');
  const [applications, setApplications] = useState(() => {
    return JSON.parse(localStorage.getItem('courierApplications') || '[]');
  });
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [viewingApplication, setViewingApplication] = useState<any>(null);

  const handleLogout = () => {
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminEmail');
    navigate('/admin-selector');
  };

  const handleApprove = (id: number) => {
    const app = applications.find((a: any) => a.id === id);
    const updated = applications.map((app: any) =>
      app.id === id ? { ...app, status: 'approved' } : app
    );
    setApplications(updated);
    localStorage.setItem('courierApplications', JSON.stringify(updated));
    
    // Log activity
    const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    logs.unshift({
      id: Date.now(),
      action: 'Başvuru Onaylandı (Çalışan)',
      description: `${app?.fullName} adlı kurye başvurusu çalışan tarafından onaylandı`,
      type: 'success',
      timestamp: new Date().toISOString(),
      user: localStorage.getItem('adminEmail') || 'Çalışan',
    });
    localStorage.setItem('activityLogs', JSON.stringify(logs));
    
    toast.success('Başvuru onaylandı!');
    setViewingApplication(null);
  };

  const handleReject = (id: number) => {
    const app = applications.find((a: any) => a.id === id);
    const updated = applications.map((app: any) =>
      app.id === id ? { ...app, status: 'rejected' } : app
    );
    setApplications(updated);
    localStorage.setItem('courierApplications', JSON.stringify(updated));
    
    // Log activity
    const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    logs.unshift({
      id: Date.now(),
      action: 'Başvuru Reddedildi (Çalışan)',
      description: `${app?.fullName} adlı kurye başvurusu çalışan tarafından reddedildi`,
      type: 'warning',
      timestamp: new Date().toISOString(),
      user: localStorage.getItem('adminEmail') || 'Çalışan',
    });
    localStorage.setItem('activityLogs', JSON.stringify(logs));
    
    toast.error('Başvuru reddedildi');
    setViewingApplication(null);
  };

  const pendingApplications = applications.filter((app: any) => app.status === 'pending');

  // Mock support tickets
  const supportTickets = [
    {
      id: 1,
      courierName: 'Ahmet Yılmaz',
      issue: 'Ödeme alınamıyor, müşteri kartı reddetti',
      severity: 'high',
      time: '5 dk önce',
      status: 'open',
    },
    {
      id: 2,
      courierName: 'Ayşe Demir',
      issue: 'Uygulama navigasyon sorunu yaşıyorum',
      severity: 'medium',
      time: '15 dk önce',
      status: 'open',
    },
    {
      id: 3,
      courierName: 'Mehmet Kaya',
      issue: 'Teslimat adresini nasıl değiştirebilirim?',
      severity: 'low',
      time: '1 saat önce',
      status: 'open',
    },
    {
      id: 4,
      courierName: 'Fatma Öz',
      issue: 'Kazancım hesabıma ne zaman yansıyacak?',
      severity: 'medium',
      time: '2 saat önce',
      status: 'open',
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Çalışan Paneli</h1>
            <p className="text-blue-100 text-sm mt-1">Başvuru inceleme & destek yönetimi</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-white hover:text-white/80 hover:bg-white/10"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Çıkış Yap
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
          <StatCard
            icon={FileText}
            label="Bekleyen Başvurular"
            value={pendingApplications.length}
            color="#2196F3"
          />
          <StatCard
            icon={MessageSquare}
            label="Açık Destek Talepleri"
            value={supportTickets.length}
            color="#FF9800"
          />
          <StatCard
            icon={Clock}
            label="Ort. Yanıt Süresi"
            value="8 dk"
            color="#4CAF50"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex gap-6">
          <TabButton
            active={activeTab === 'applications'}
            onClick={() => setActiveTab('applications')}
            icon={FileText}
            label="Kurye Başvuruları"
            badge={pendingApplications.length}
          />
          <TabButton
            active={activeTab === 'support'}
            onClick={() => setActiveTab('support')}
            icon={MessageSquare}
            label="Canlı Destek"
            badge={supportTickets.length}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'applications' && (
              <ApplicationsTab
                applications={pendingApplications}
                onApprove={handleApprove}
                onReject={handleReject}
                onViewDetails={setViewingApplication}
              />
            )}
            {activeTab === 'support' && (
              <SupportTab 
                tickets={supportTickets} 
                onConnect={setSelectedTicket}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Application Details Modal */}
      <AnimatePresence>
        {viewingApplication && (
          <ApplicationDetailsModal
            application={viewingApplication}
            onClose={() => setViewingApplication(null)}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </AnimatePresence>

      {/* Live Support Chat */}
      <AnimatePresence>
        {selectedTicket && (
          <LiveSupportChat
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-[#121212]">{value}</p>
        </div>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>
      </div>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon: Icon, label, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 py-4 px-3 border-b-3 transition-all ${
        active
          ? 'border-blue-600 text-[#121212] font-semibold'
          : 'border-transparent text-gray-500 hover:text-[#121212] hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-semibold">{label}</span>
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

function ApplicationsTab({ applications, onApprove, onReject, onViewDetails }: any) {
  if (applications.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-20"
      >
        <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">İncelenecek başvuru bulunmuyor</p>
        <p className="text-gray-400 text-sm mt-2">Yeni başvurular geldiğinde burada görünecektir</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-[#121212] mb-6">Bekleyen Başvurular</h2>
      
      {applications.map((app: any) => (
        <motion.div
          key={app.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-xl transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {app.fullName.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#121212]">{app.fullName}</h3>
                <p className="text-sm text-gray-600">
                  {app.email} • {app.phone}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  📍 {app.location}
                </p>
              </div>
            </div>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold">
              İnceleme Bekliyor
            </span>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 mb-4 border-2 border-gray-200">
            <p className="text-sm font-bold text-gray-700 mb-3">🚗 Araç Bilgileri:</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700"><strong>Tip:</strong> {app.vehicleType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700"><strong>Plaka:</strong> {app.licensePlate}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700"><strong>Ehliyet:</strong> {app.licenseNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700"><strong>Ruhsat:</strong> {app.registration}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-sm font-bold text-blue-900 mb-2">📎 Yüklenen Belgeler:</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm text-blue-800 bg-white px-3 py-2 rounded-lg">
                <Check className="w-4 h-4 text-green-600" />
                <span>Sürücü Belgesi</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-800 bg-white px-3 py-2 rounded-lg">
                <Check className="w-4 h-4 text-green-600" />
                <span>Araç Ruhsatı</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-800 bg-white px-3 py-2 rounded-lg">
                <Check className="w-4 h-4 text-green-600" />
                <span>Araç Fotoğrafı</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-800 bg-white px-3 py-2 rounded-lg">
                <Check className="w-4 h-4 text-green-600" />
                <span>Kimlik Belgesi</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => onViewDetails(app)}
              variant="outline"
              className="flex-1 h-12 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold"
            >
              <Eye className="mr-2 w-5 h-5" />
              Detayları Gör ve Belgeleri İncele
            </Button>
            <Button
              onClick={() => onApprove(app.id)}
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              <Check className="mr-2 w-5 h-5" />
              Onayla
            </Button>
            <Button
              onClick={() => onReject(app.id)}
              className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              <X className="mr-2 w-5 h-5" />
              Reddet
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ApplicationDetailsModal({ application, onClose, onApprove, onReject }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{application.fullName}</h2>
              <p className="text-blue-100 text-sm mt-1">Başvuru Detayları ve Belgeler</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#121212] mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" />
              Kişisel Bilgiler
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoBox icon={User} label="Ad Soyad" value={application.fullName} />
              <InfoBox icon={Mail} label="E-posta" value={application.email} />
              <InfoBox icon={Phone} label="Telefon" value={application.phone} />
              <InfoBox icon={MapPin} label="Çalışma Bölgesi" value={application.location} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#121212] mb-4 flex items-center gap-2">
              <Car className="w-6 h-6 text-green-600" />
              Araç Bilgileri
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoBox icon={Car} label="Araç Tipi" value={application.vehicleType} />
              <InfoBox icon={Car} label="Plaka" value={application.licensePlate} />
              <InfoBox icon={FileText} label="Ehliyet No" value={application.licenseNumber} />
              <InfoBox icon={FileText} label="Ruhsat No" value={application.registration} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#121212] mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-orange-600" />
              Yüklenen Belgeler
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <DocumentCard label="Sürücü Belgesi" filename={application.driverLicenseImage} />
              <DocumentCard label="Araç Ruhsatı" filename={application.vehicleRegistrationImage} />
              <DocumentCard label="Araç Fotoğrafı" filename={application.vehiclePhotoImage} />
              <DocumentCard label="Kimlik Fotoğrafı" filename={application.idPhotoImage} />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t-2 border-gray-200">
            <Button
              onClick={() => {
                onApprove(application.id);
                onClose();
              }}
              className="flex-1 h-14 bg-green-600 hover:bg-green-700 text-white text-lg font-bold"
            >
              <Check className="mr-2 w-6 h-6" />
              Başvuruyu Onayla
            </Button>
            <Button
              onClick={() => {
                onReject(application.id);
                onClose();
              }}
              className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white text-lg font-bold"
            >
              <X className="mr-2 w-6 h-6" />
              Başvuruyu Reddet
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SupportTab({ tickets, onConnect }: any) {
  const sortedTickets = [...tickets].sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 };
    return severityOrder[a.severity as keyof typeof severityOrder] - 
           severityOrder[b.severity as keyof typeof severityOrder];
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-orange-600 mt-0.5" />
          <div>
            <h4 className="font-bold text-orange-900 mb-2">⚡ Öncelik Sistemi</h4>
            <p className="text-sm text-orange-800">
              Talepler aciliyet durumuna göre otomatik olarak sıralanır. <strong>Yüksek öncelikli</strong> sorunlar en üstte görünür ve hızlı yanıt gerektirir.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#121212] mb-6">Canlı Destek Talepleri</h2>

      {sortedTickets.map((ticket: any) => (
        <motion.div
          key={ticket.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-xl border-2 p-6 hover:shadow-xl transition-all ${
            ticket.severity === 'high' ? 'border-red-300 bg-red-50' :
            ticket.severity === 'medium' ? 'border-orange-300 bg-orange-50' :
            'border-blue-300 bg-blue-50'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-lg font-bold">
                  {ticket.courierName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#121212]">{ticket.courierName}</h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      ticket.severity === 'high'
                        ? 'bg-red-500 text-white'
                        : ticket.severity === 'medium'
                        ? 'bg-orange-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {ticket.severity === 'high' ? '🔴 YÜKSEK ÖNCELİK' : 
                     ticket.severity === 'medium' ? '🟡 ORTA ÖNCELİK' : '🟢 DÜŞÜK ÖNCELİK'}
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border-2 border-gray-200 mb-3">
                <p className="text-gray-800 font-medium">{ticket.issue}</p>
              </div>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {ticket.time}
              </p>
            </div>
          </div>

          <Button
            onClick={() => onConnect(ticket)}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-bold"
          >
            <MessageSquare className="mr-2 w-6 h-6" />
            Sohbete Bağlan ve Yardım Et
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}

function InfoBox({ icon: Icon, label, value }: any) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-gray-600" />
        <p className="text-xs text-gray-600 font-bold uppercase">{label}</p>
      </div>
      <p className="text-base font-bold text-[#121212]">{value}</p>
    </div>
  );
}

function DocumentCard({ label, filename }: any) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#121212] mb-2">{label}</p>
          <p className="text-xs text-gray-700 truncate mb-3">{filename || 'Belge yüklenmedi'}</p>
          <div>
            <span className="inline-block text-xs bg-green-500 text-white px-3 py-1 rounded-full font-bold">
              ✓ Yüklendi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
