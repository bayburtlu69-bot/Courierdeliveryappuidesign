# Kurye Teslimat Uygulaması - Tam Ekosistem

## 🚀 Genel Bakış
Sarı (#FFD600) ve siyah (#121212) temalı profesyonel mobil kurye teslimat uygulaması ve kapsamlı admin panel sistemi. React, TypeScript, Tailwind CSS ve Framer Motion ile geliştirilmiştir.

## 📱 Özellikler

### Kurye Uygulaması (Mobil - Türkçe)
- **11 Eksiksiz Ekran:**
  - Karşılama ve tanıtım ekranları
  - Giriş ve SMS doğrulama
  - Çevrimiçi/çevrimdışı durumu ile dashboard (modern, küçük buton tasarımı)
  - Geri sayım sayacı ile gelen sipariş bildirimleri
  - Adım adım aktif sipariş takibi
  - **Gömülü harita navigasyonu** (Mock harita - harici uygulama gerektirmez)
  - **Ödeme yöntemi gösterimi** (Kapıda Ödeme, Kart, Online)
  - Grafiklerle kazanç dashboard'u
  - Sipariş geçmişi
  - Bildirim merkezi
  - Profil ve ayarlar
  - Chat UI ile destek

- **Kurye Başvuru Sistemi:**
  - Çok adımlı başvuru formu
  - Kişisel bilgiler, araç detayları, belgeler
  - Ehliyet, ruhsat vb. için görsel yükleme
  - Konum tercihi seçimi

### Admin Paneli (Web - Türkçe)
**3 Katmanlı Giriş Sistemi:**

#### 1. Admin Dashboard
- Tam sistem erişimi
- Kurye başvurularını inceleme ve onaylama/reddetme
- Tüm yüklenen belgeleri görüntüleme
- Aktif kuryeler izleme
- Dükkan ekleme (e-posta, telefon, şifre, kategori)
- **Test siparişleri oluşturma** (test için)
- **Kilometre başına ücret ayarı** (fiyatlandırma kontrolü)
- **Aktivite logları** (tüm işlemlerin kaydı)
- Gerçek zamanlı kurye takibi
- Detaylı istatistikler

#### 2. Dükkan Sahibi Dashboard
- Aylık analitik ve istatistikler
- Sipariş sayısı ve ciro takibi
- Haftalık dağılım grafikleri
- Performans metrikleri
- Başarı oranı izleme
- Gelir dökümü

#### 3. Çalışan Dashboard
- Kurye başvurularını inceleme
- Başvuruları onaylama/reddetme
- **Yüklenen belgeleri görüntüleme** (tüm dökümanlar)
- **Aciliyet bazlı canlı destek sistemi** (Yüksek, Orta, Düşük)
- **Canlı chat ekranı** (gerçek zamanlı mesajlaşma)
- Destek talebi yönetimi
- Ortalama yanıt süresi takibi

## 🎨 Tasarım Sistemi
- **Renkler:** Sarı (#FFD600) & Siyah (#121212)
- **8px Grid Sistemi**
- **Köşe yuvarlatma:** 12-16px
- **Motion animasyonları** her yerde
- **Tek elle kullanım** optimizasyonu
- Pil dostu UI

## 🗺️ Harita Özellikleri
- **Gömülü navigasyon** (harici uygulama yok)
- Gerçek zamanlı rota görselleştirme
- Restoran ve müşteri işaretleyicileri
- Mesafe ve zaman tahminleri
- Animasyonlu mock harita

## 💳 Ödeme Yöntemleri
Kuryeler şunları görebilir:
- **Kapıda Ödeme** - Müşteriden tahsil edilecek
- **Kart ile Ödeme** - POS cihazı gerekli
- **Online Ödendi** - Ödeme alındı işareti

## 💰 Fiyatlandırma Kontrolü
- Admin panelden km başına ücret ayarlama
- Otomatik kazanç hesaplama
- Gerçek zamanlı fiyat güncellemesi
- Aktivite loguna kaydedilir

## 📊 Aktivite & Kontrol
Admin panelde:
- Tüm işlemlerin logları
- Kullanıcı bazlı aktivite takibi
- Zaman damgalı kayıtlar
- Başvuru, onay, red, dükkan ekleme, fiyat değişiklikleri
- 100 son işlem saklanır

## 🔗 Rotalar

### Kurye Uygulaması
- `/` - Karşılama ekranı
- `/onboarding` - Tanıtım slaytları
- `/login` - Telefon girişi
- `/otp` - SMS doğrulama
- `/apply` - Kurye başvuru formu
- `/dashboard` - Ana sayfa
- `/order/:id` - Aktif sipariş takibi
- `/earnings` - Kazanç dashboard'u
- `/history` - Sipariş geçmişi
- `/notifications` - Bildirimler
- `/profile` - Profil ayarları
- `/support` - Destek

### Admin Paneli
- `/admin-selector` - Rol seçimi
- `/admin/login` - Admin girişi
- `/shop/login` - Dükkan girişi
- `/employee/login` - Çalışan girişi
- `/admin/dashboard` - Admin paneli
- `/shop/dashboard` - Dükkan paneli
- `/employee/dashboard` - Çalışan paneli

## 🧪 Test Etme
1. `/admin/login` sayfasını açın ve admin olarak giriş yapın
2. Admin Dashboard'da test siparişi oluşturun
3. Kurye app'te `/dashboard` sayfasına gidin
4. Çevrimiçi olun ve test siparişini alın
5. Siparişi kabul edin ve gömülü haritayı test edin
6. Teslimat akışını tamamlayın
7. Çalışan panelinden canlı destek özelliğini test edin

## 🔒 Mock Veri Depolama
Demo için localStorage kullanılır:
- `courierApplications` - Başvuru verileri
- `activeOrders` - Test siparişler
- `shops` - Kayıtlı dükkanlar
- `pricePerKm` - Km başı ücret
- `activityLogs` - İşlem logları
- `adminRole` - Mevcut admin rolü

## 📦 Ana Bağımlılıklar
- React Router 7 (Data mode)
- Framer Motion / Motion
- Recharts
- Radix UI components
- Lucide React icons
- React Hook Form
- Sonner (toast notifications)

## 🌐 Dil
- **Kurye Uygulaması:** Türkçe
- **Admin Panelleri:** Türkçe
- Tüm UI metinleri yerelleştirilmiş

## 🎯 Sonraki Adımlar Önerileri
- Gerçek backend için Supabase bağlantısı
- WebSocket ile gerçek zamanlı güncellemeler
- Gerçek SMS OTP servisi entegrasyonu
- Ödeme gateway entegrasyonu
- Production deployment

## 💡 Notlar
Bu bir **frontend prototipi** mock veri ile. Production için:
- Kimlik doğrulama için backend API gerekli
- Kalıcı depolama için veritabanı gerekli
- Güvenli dosya yükleme servisi eklenmeli
- Rol bazlı erişim kontrolü (RBAC) uygulanmalı
- Gerçek harita API'si entegre edilmeli (Google Maps / Mapbox)

## 🚀 Öne Çıkan Özellikler
✅ Tamamen Türkçe arayüz  
✅ Modern, küçük buton tasarımı (Dashboard)  
✅ Ödeme yöntemi gösterimi  
✅ Km başı ücret yönetimi  
✅ Detaylı aktivite logları  
✅ Canlı chat desteği  
✅ Belge görüntüleme sistemi  
✅ Mock harita navigasyonu (hata yok!)  
✅ Test sipariş sistemi  
✅ Aciliyet bazlı destek  

## 🛠️ Teknik Detaylar
- **Harita:** Mock harita component (leaflet hatası çözüldü)
- **Animasyonlar:** Motion library ile smooth geçişler
- **State Management:** React hooks & localStorage
- **Responsive:** Mobil-first yaklaşım
- **Performance:** Optimize edilmiş render
