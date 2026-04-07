import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Car,
  FileText,
  Settings,
  Star,
  ChevronRight,
  ChevronDown,
  LogOut,
  Camera,
  Bell,
  Volume2,
  Zap,
  Palette,
  Check,
  Edit2,
  Save,
  X,
  Globe,
  Shield,
  Eye,
  Bike,
  Hash,
  Calendar,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { useAppTheme, themes } from '../utils/useAppTheme';

type Section = 'kisisel' | 'arac' | 'belgeler' | 'bolgeler' | 'ayarlar' | null;

export function Profile() {
  const navigate = useNavigate();
  const currentTheme = useAppTheme();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [autoAccept, setAutoAccept] = useState(() => localStorage.getItem('autoAcceptOrders') === 'true');
  const [selectedTheme, setSelectedTheme] = useState(() => localStorage.getItem('appTheme') || 'sarı-siyah');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [expandedSection, setExpandedSection] = useState<Section>(null);

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('courierProfile');
    if (saved) return JSON.parse(saved);
    return {
      name: 'Kurye Kullanıcı',
      phone: '+90 555 123 4567',
      email: 'kurye@jetgo.com',
      vehicleType: 'Motosiklet',
      vehicleNumber: '34 ABC 123',
      vehicleBrand: 'Honda',
      vehicleYear: '2022',
      licenseNumber: 'TR-12345',
      idNumber: '12345678901',
      birthDate: '1990-01-01',
      activeCity: 'İstanbul',
      activeDistricts: ['Kadıköy', 'Beşiktaş', 'Şişli'],
      language: 'Türkçe',
    };
  });
  const [editData, setEditData] = useState({ ...profileData });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('autoAcceptOrders', autoAccept.toString());
  }, [autoAccept]);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    localStorage.setItem('appTheme', themeId);
    const theme = themes.find((t) => t.id === themeId);
    toast.success(`${theme?.name} teması uygulandı! ${theme?.emoji}`);
    setShowThemePicker(false);
  };

  const handleSaveProfile = () => {
    setProfileData({ ...editData });
    localStorage.setItem('courierProfile', JSON.stringify(editData));
    setIsEditing(false);
    toast.success('Profil güncellendi!');
  };

  const toggleSection = (section: Section) => {
    setExpandedSection(expandedSection === section ? null : section);
    setIsEditing(false);
  };

  const themeObj = themes.find((t) => t.id === selectedTheme) || themes[0];

  const districts = [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Üsküdar', 'Maltepe',
    'Ataşehir', 'Fatih', 'Beyoğlu', 'Bağcılar', 'Pendik', 'Kartal',
  ];

  const cities = [
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana',
    'Konya', 'Gaziantep', 'Mersin', 'Diyarbakır', 'Kayseri', 'Eskişehir',
  ];

  const menuItems = [
    { id: 'kisisel' as Section, icon: User, title: 'Kişisel Bilgiler', subtitle: 'Ad, e-posta, telefon', color: 'bg-blue-100', iconColor: 'text-blue-600' },
    { id: 'arac' as Section, icon: Bike, title: 'Araç Detayları', subtitle: 'Tip, plaka, ruhsat', color: 'bg-purple-100', iconColor: 'text-purple-600' },
    { id: 'belgeler' as Section, icon: FileText, title: 'Belgelerim', subtitle: 'Ehliyet, kimlik, araç belgeleri', color: 'bg-green-100', iconColor: 'text-green-600' },
    { id: 'bolgeler' as Section, icon: MapPin, title: 'Aktif Bölgeler', subtitle: 'Teslimat bölgeleri', color: 'bg-orange-100', iconColor: 'text-orange-600' },
    { id: 'ayarlar' as Section, icon: Settings, title: 'Uygulama Ayarları', subtitle: 'Dil, bildirimler, gizlilik', color: 'bg-gray-100', iconColor: 'text-gray-600' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 pb-24" style={{ backgroundColor: currentTheme.primary }}>
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20"
          >
            <ArrowLeft className="w-5 h-5 text-[#121212]" />
          </Button>
          <h1 className="text-lg font-bold text-[#121212]">Profilim</h1>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20"
          >
            <Settings className="w-5 h-5 text-[#121212]" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto -mt-16 pb-6">
        {/* Profile Card */}
        <div className="px-4 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-5 shadow-xl"
          >
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  <User className="w-10 h-10 text-[#121212]" />
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: currentTheme.secondary }}>
                  <Camera className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                </button>
              </div>
              <h2 className="text-xl font-bold text-[#121212] mt-3">{profileData.name}</h2>
              <div className="flex items-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'text-gray-300'}`}
                    style={i < 4 ? { color: currentTheme.primary } : {}} />
                ))}
                <span className="text-sm text-gray-500 ml-1">4.8</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">247 teslimat tamamlandı</p>
            </div>

            <div className="space-y-2 pt-3 border-t border-gray-100">
              {[
                { icon: Phone, value: profileData.phone, color: 'bg-blue-100', iconColor: 'text-blue-600' },
                { icon: Mail, value: profileData.email, color: 'bg-green-100', iconColor: 'text-green-600' },
                { icon: Car, value: `${profileData.vehicleType} • ${profileData.vehicleNumber}`, color: 'bg-purple-100', iconColor: 'text-purple-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className={`w-9 h-9 ${item.color} rounded-xl flex items-center justify-center`}>
                    <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                  </div>
                  <p className="text-sm font-medium text-[#121212]">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* TEMA SEÇİCİ */}
        <div className="px-4 mb-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setShowThemePicker(!showThemePicker)}
            className="w-full bg-white rounded-2xl p-4 shadow-md active:scale-98 transition-transform"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                style={{ backgroundColor: currentTheme.primary }}>
                <Palette className="w-6 h-6 text-[#121212]" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-[#121212]">Tema Seçimi</p>
                <p className="text-sm text-gray-500">{themeObj.emoji} {themeObj.name} - {themeObj.description}</p>
              </div>
              <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showThemePicker ? 'rotate-90' : ''}`} />
            </div>
          </motion.button>

          <AnimatePresence>
            {showThemePicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 bg-white rounded-2xl p-4 shadow-xl">
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 px-1">6 Renk Teması</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {themes.map((theme) => (
                      <motion.button
                        key={theme.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleThemeSelect(theme.id)}
                        className={`relative rounded-2xl p-3 border-2 transition-all ${
                          selectedTheme === theme.id ? 'border-[#121212] shadow-lg' : 'border-transparent'
                        }`}
                      >
                        <div className={`w-full h-12 rounded-xl bg-gradient-to-br ${theme.gradient} mb-2 flex items-center justify-center`}>
                          <span className="text-2xl">{theme.emoji}</span>
                        </div>
                        <p className="text-xs font-bold text-[#121212]">{theme.name}</p>
                        <p className="text-xs text-gray-400">{theme.description}</p>
                        {selectedTheme === theme.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-[#121212] rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Menu Items with Expandable Sections */}
        <div className="px-4 space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleSection(item.id)}
                className="w-full bg-white rounded-2xl p-4 shadow-md active:scale-98 transition-transform"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-[#121212]">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === item.id ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {expandedSection === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white rounded-b-2xl border-t border-gray-100 p-4 -mt-2 shadow-md">
                      {/* KİŞİSEL BİLGİLER */}
                      {item.id === 'kisisel' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-gray-500 uppercase">Kişisel Bilgiler</p>
                            <button
                              onClick={() => { setIsEditing(!isEditing); setEditData({ ...profileData }); }}
                              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg"
                              style={{ backgroundColor: currentTheme.primary, color: currentTheme.secondary }}
                            >
                              {isEditing ? <X className="w-3 h-3" /> : <Edit2 className="w-3 h-3" />}
                              {isEditing ? 'İptal' : 'Düzenle'}
                            </button>
                          </div>
                          {[
                            { label: 'Ad Soyad', key: 'name', icon: User },
                            { label: 'Telefon', key: 'phone', icon: Phone },
                            { label: 'E-posta', key: 'email', icon: Mail },
                            { label: 'Doğum Tarihi', key: 'birthDate', icon: Calendar },
                            { label: 'TC Kimlik No', key: 'idNumber', icon: Hash },
                          ].map((field) => (
                            <div key={field.key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <field.icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-400 mb-1">{field.label}</p>
                                {isEditing ? (
                                  <input
                                    value={editData[field.key as keyof typeof editData] as string}
                                    onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                                    className="w-full text-sm font-semibold bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none"
                                    style={{ borderColor: currentTheme.primary }}
                                  />
                                ) : (
                                  <p className="text-sm font-semibold text-[#121212]">{profileData[field.key as keyof typeof profileData] as string}</p>
                                )}
                              </div>
                            </div>
                          ))}
                          {isEditing && (
                            <button
                              onClick={handleSaveProfile}
                              className="w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                              style={{ backgroundColor: currentTheme.primary, color: currentTheme.secondary }}
                            >
                              <Save className="w-4 h-4" />
                              Kaydet
                            </button>
                          )}
                        </div>
                      )}

                      {/* ARAÇ DETAYLARI */}
                      {item.id === 'arac' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-gray-500 uppercase">Araç Bilgileri</p>
                            <button
                              onClick={() => { setIsEditing(!isEditing); setEditData({ ...profileData }); }}
                              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg"
                              style={{ backgroundColor: currentTheme.primary, color: currentTheme.secondary }}
                            >
                              {isEditing ? <X className="w-3 h-3" /> : <Edit2 className="w-3 h-3" />}
                              {isEditing ? 'İptal' : 'Düzenle'}
                            </button>
                          </div>
                          {[
                            { label: 'Araç Tipi', key: 'vehicleType', icon: Bike },
                            { label: 'Plaka', key: 'vehicleNumber', icon: Hash },
                            { label: 'Marka', key: 'vehicleBrand', icon: Car },
                            { label: 'Model Yılı', key: 'vehicleYear', icon: Calendar },
                          ].map((field) => (
                            <div key={field.key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <field.icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs text-gray-400 mb-1">{field.label}</p>
                                {isEditing ? (
                                  <input
                                    value={editData[field.key as keyof typeof editData] as string}
                                    onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                                    className="w-full text-sm font-semibold bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none"
                                    style={{ borderColor: currentTheme.primary }}
                                  />
                                ) : (
                                  <p className="text-sm font-semibold text-[#121212]">{profileData[field.key as keyof typeof profileData] as string}</p>
                                )}
                              </div>
                            </div>
                          ))}
                          {isEditing && (
                            <button
                              onClick={handleSaveProfile}
                              className="w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                              style={{ backgroundColor: currentTheme.primary, color: currentTheme.secondary }}
                            >
                              <Save className="w-4 h-4" />
                              Kaydet
                            </button>
                          )}
                        </div>
                      )}

                      {/* BELGELERİM */}
                      {item.id === 'belgeler' && (
                        <div className="space-y-3">
                          <p className="text-sm font-bold text-gray-500 uppercase mb-2">Belgelerim</p>
                          {[
                            { name: 'Ehliyet', emoji: '🪪', status: 'onaylı', color: 'bg-green-50 text-green-700 border-green-200' },
                            { name: 'Kimlik Kartı', emoji: '🎫', status: 'onaylı', color: 'bg-green-50 text-green-700 border-green-200' },
                            { name: 'Araç Ruhsatı', emoji: '📋', status: 'bekliyor', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
                            { name: 'Araç Fotoğrafı', emoji: '📷', status: 'yüklenmedi', color: 'bg-gray-50 text-gray-600 border-gray-200' },
                          ].map((doc, i) => (
                            <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${doc.color}`}>
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{doc.emoji}</span>
                                <div>
                                  <p className="font-semibold text-sm text-[#121212]">{doc.name}</p>
                                  <p className="text-xs capitalize">{doc.status}</p>
                                </div>
                              </div>
                              <button
                                className="text-xs font-bold px-3 py-1.5 rounded-lg"
                                style={{ backgroundColor: currentTheme.primary, color: currentTheme.secondary }}
                              >
                                {doc.status === 'yüklenmedi' ? 'Yükle' : 'Görüntüle'}
                              </button>
                            </div>
                          ))}
                          <p className="text-xs text-gray-400 text-center mt-2">
                            Belgelerin onaylanması 1-2 iş günü sürebilir
                          </p>
                        </div>
                      )}

                      {/* AKTİF BÖLGELER */}
                      {item.id === 'bolgeler' && (
                        <div className="space-y-3">
                          <p className="text-sm font-bold text-gray-500 uppercase mb-2">Aktif Bölgeler</p>
                          <div>
                            <p className="text-xs text-gray-500 mb-2">Aktif Şehir</p>
                            <div className="flex flex-wrap gap-2">
                              {cities.slice(0, 6).map((city) => (
                                <button
                                  key={city}
                                  onClick={() => {
                                    const updated = { ...profileData, activeCity: city };
                                    setProfileData(updated);
                                    localStorage.setItem('courierProfile', JSON.stringify(updated));
                                    toast.success(`${city} aktif şehir olarak seçildi`);
                                  }}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${
                                    profileData.activeCity === city ? 'text-[#121212]' : 'border-gray-200 text-gray-500 bg-white'
                                  }`}
                                  style={profileData.activeCity === city ? { backgroundColor: currentTheme.primary, borderColor: currentTheme.primary } : {}}
                                >
                                  {city}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-2">Aktif İlçeler ({profileData.activeDistricts.length}/5)</p>
                            <div className="flex flex-wrap gap-2">
                              {districts.map((district) => {
                                const isActive = profileData.activeDistricts.includes(district);
                                return (
                                  <button
                                    key={district}
                                    onClick={() => {
                                      if (!isActive && profileData.activeDistricts.length >= 5) {
                                        toast.error('En fazla 5 ilçe seçebilirsiniz');
                                        return;
                                      }
                                      const updated = isActive
                                        ? profileData.activeDistricts.filter((d: string) => d !== district)
                                        : [...profileData.activeDistricts, district];
                                      const updatedProfile = { ...profileData, activeDistricts: updated };
                                      setProfileData(updatedProfile);
                                      localStorage.setItem('courierProfile', JSON.stringify(updatedProfile));
                                    }}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 transition-all ${
                                      isActive ? 'text-[#121212]' : 'border-gray-200 text-gray-500 bg-white'
                                    }`}
                                    style={isActive ? { backgroundColor: currentTheme.primary, borderColor: currentTheme.primary } : {}}
                                  >
                                    {district}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* UYGULAMA AYARLARI */}
                      {item.id === 'ayarlar' && (
                        <div className="space-y-3">
                          <p className="text-sm font-bold text-gray-500 uppercase mb-2">Uygulama Ayarları</p>

                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <Globe className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm font-semibold text-[#121212]">Dil</p>
                                <p className="text-xs text-gray-400">Uygulama dili</p>
                              </div>
                            </div>
                            <span className="text-sm font-bold" style={{ color: currentTheme.primary }}>Türkçe</span>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <Shield className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm font-semibold text-[#121212]">Gizlilik</p>
                                <p className="text-xs text-gray-400">Konum paylaşımı</p>
                              </div>
                            </div>
                            <Switch checked={true} onCheckedChange={() => {}} />
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <Eye className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm font-semibold text-[#121212]">Karanlık Mod</p>
                                <p className="text-xs text-gray-400">Ekran görünümü</p>
                              </div>
                            </div>
                            <Switch checked={false} onCheckedChange={() => toast.info('Tema seçiminden değiştirebilirsiniz')} />
                          </div>

                          <div className="pt-1 border-t border-gray-100">
                            <p className="text-xs text-gray-400 text-center">Jetgo Kurye v2.0.0</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Preferences */}
        <div className="px-4 mt-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 px-1">Tercihler</h3>
          <div className="bg-white rounded-2xl shadow-md divide-y divide-gray-100">
            {[
              { icon: Bell, title: 'Anlık Bildirimler', subtitle: 'Sipariş uyarıları', checked: pushNotifications, onChange: setPushNotifications, color: 'bg-blue-100', iconColor: 'text-blue-600' },
              { icon: Volume2, title: 'Ses Uyarıları', subtitle: 'Yeni siparişlerde ses çal', checked: soundAlerts, onChange: setSoundAlerts, color: 'bg-green-100', iconColor: 'text-green-600' },
              { icon: Zap, title: 'Otomatik Kabul', subtitle: 'Siparişleri otomatik kabul et', checked: autoAccept, onChange: setAutoAccept, color: 'bg-orange-100', iconColor: 'text-orange-600' },
            ].map((pref, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${pref.color} rounded-xl flex items-center justify-center`}>
                    <pref.icon className={`w-5 h-5 ${pref.iconColor}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#121212] text-sm">{pref.title}</p>
                    <p className="text-xs text-gray-400">{pref.subtitle}</p>
                  </div>
                </div>
                <Switch checked={pref.checked} onCheckedChange={pref.onChange} />
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 py-5">
          <Button
            onClick={() => { localStorage.removeItem('isLoggedIn'); navigate('/login'); }}
            className="w-full h-13 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-semibold active:scale-95 transition-transform"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Çıkış Yap
          </Button>
        </div>
      </div>
    </div>
  );
}
