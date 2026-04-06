# 🏍️ Baymoto - Profesyonel Kurye Teslimat Sistemi

## 📌 Proje Hakkında

**Baymoto**, profesyonel bir kurye teslimat platformudur. Sarı (#FFD600) ve siyah (#121212) tema renkleri ile tasarlanan sistem, mobil kurye uygulaması ve web tabanlı yönetim panellerini içerir.

## ✨ Özellikler

### 🎯 Kurye Mobil Uygulaması
- ✅ **Splash & Onboarding** - Tamamen Türkçe tanıtım ekranları
- ✅ **Giriş & OTP Doğrulama** - Güvenli kimlik doğrulama
- ✅ **Motorlu Animasyonlu Dashboard** - Hareketli çevrimiçi/çevrimdışı göstergesi
- ✅ **Otomatik Sipariş Kabul** - Profil ayarlarından aktifleştir
- ✅ **Ses ile Bildirim** - Sipariş geldiğinde çan sesi
- ✅ **Gelen Sipariş Bildirimleri** - Gerçek zamanlı popup'lar
- ✅ **Aktif Sipariş Takibi** - Basılı tut mekanizması ile
  - Mağazaya Git
  - Siparişi Al  
  - Müşteriye Teslim Et
  - ✨ Patlama efekti animasyonu
- ✅ **Tam Ekran Harita Navigasyonu** - Hatasız konum yönlendirme
- ✅ **Kazanç Dashboard** - Hareketli para animasyonu ile
- ✅ **Sipariş Geçmişi** - Tüm teslimatlara erişim
- ✅ **Bildirimler Merkezi** - Tüm aktivite kayıtları
- ✅ **Profil & Ayarlar** - Otomatik kabul, ses, bildirim ayarları
- ✅ **Canlı Destek** - 5 soruluk akıllı asistan + canlı bağlantı

### 💼 Yönetici Paneli
- ✅ **Canlı Takip Sekmesi** - Tüm aktif siparişleri görüntüleme
- ✅ **Kurye Başvuru Yönetimi** 
  - Başvuruları onaylama/reddetme
  - Belgeleri tıklayarak görüntüleme (büyük modal)
  - Ehliyet, ruhsat, araç ve kimlik görselleri
- ✅ **Aktif Kuryeler** - Çevrimiçi kurye listesi
- ✅ **Mağaza Yönetimi** - 10+ kategori desteği
- ✅ **Test Sipariş Oluşturma** - Otomatik fiyat hesaplama
- ✅ **Fiyatlandırma Ayarları** - Baz ücret + KM başı ücret
- ✅ **Detaylı Aktivite Logları** - Tüm işlemler kaydediliyor

### 🏪 Dükkan Sahibi Paneli
- ✅ **Siyah-Sarı Tema** - Baymoto kurumsal renkleri
- ✅ **Dashboard** - Ciro ve sipariş istatistikleri
- ✅ **Grafik Analizleri** - Haftalık/aylık trendler
- ✅ **Performans Metrikleri** - Gerçek zamanlı KPI'lar

### 👥 Destek Çalışanı Paneli
- ✅ **Siyah-Sarı Tema** - Baymoto kurumsal renkleri
- ✅ **Başvuru İnceleme** - Detaylı belge kontrolü + görsel önizleme
- ✅ **Akıllı Canlı Destek** 
  - 5 soruluk ön değerlendirme
  - Seçeneklere göre yönlendirme
  - Çalışan ile doğrudan sohbet
  - "Sohbeti Kapat ve Sil" özelliği

## 💰 Ödeme Sistemi

### Desteklenen Ödeme Yöntemleri
1. **💵 Kapıda Nakit Ödeme** - Kurye tarafından tahsil
2. **💳 Kapıda Kart ile Ödeme** - Kart terminali ile
3. **✅ Online Ödendi** - Ön ödemeli siparişler

### Ödeme Takibi
- Her ödeme `paymentLogs` ve `activityLogs`'a kaydediliyor
- Kurye adı, müşteri adı, tutar, zaman damgası
- Admin panelinden tüm ödemeler izlenebilir

## 📍 Konum & Adres Sistemi

- ✅ Tam detaylı müşteri adresi (Mahalle, Cadde, Bina No, Daire)
- ✅ MockMap component ile hatasız navigasyon
- ✅ Mağaza → Müşteri rotası
- ✅ Mesafe ve süre tahmini
- ✅ Telefon araması entegrasyonu

## 🎨 Tasarım & UX

### Renk Paleti
- **Ana Sarı**: #FFD600 (Butonlar, vurgular)
- **Siyah**: #121212 (Header, temel elementler)
- **Baymoto Kimliği**: Profesyonel ve enerjik

### Kullanıcı Deneyimi
- 📱 Mobil öncelikli responsive tasarım
- 👍 Tek elle kullanım optimizasyonu
- 🔘 Büyük, kolay tıklanabilir butonlar
- 🎭 Animasyonlu geçişler (Framer Motion)
- 💫 Patlama efektleri (Basılı tut onayları)
- 🏍️ Motorlu animasyonlar
- 💸 Hareketli para görselleri

## 🚀 Kurulum

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Geliştirme sunucusunu başlat
npm run dev

# 3. Tarayıcıda aç
http://localhost:5173
```

## 📱 Kullanım Senaryoları

### Kurye İçin
1. Uygulamayı aç (Onboarding geç)
2. Giriş yap
3. OTP doğrula (1234)
4. Profil → "Otomatik Sipariş Kabul" aç (opsiyonel)
5. Dashboard'da "Çevrimiçi" ol (motorlu animasyon)
6. Sipariş gelince çan sesi duyulur
7. Otomatik kabul açıksa sipariş direkt atanır
8. **Basılı tut** ile adım adım ilerle
9. Ödeme tahsil et
10. Teslimat sonrası çevrimiçi kal

### Yönetici İçin
1. `/admin-selector` → "Yönetici Girişi"
2. Giriş yap (admin@admin.com / admin123)
3. Başvuruları incele
4. Belgeleri tıklayarak büyüt
5. Onay/red işlemleri
6. Test siparişi oluştur
7. Activity log'ları kontrol et

### Dükkan Sahibi İçin
1. `/admin-selector` → "Dükkan Sahibi"
2. Siyah-sarı temalı dashboard'u gör
3. İstatistikleri ve grafikleri analiz et

### Destek Çalışanı İçin
1. `/admin-selector` → "Destek Çalışanı"
2. Başvuruları incele (belgeler tıklanabilir)
3. Canlı destek taleplerine yanıt ver
4. İşlem bitince "Sohbeti Kapat ve Sil"

## 🔐 Giriş Bilgileri

### Yönetim Panelleri
- **Yönetici**: admin@admin.com / admin123
- **Destek Çalışanı**: employee@admin.com / employee123

### Kurye Uygulaması
- Telefon: Herhangi bir numara
- OTP: `1234`

## 📊 Teknoloji Stack

- **React 18** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** - Animasyonlar
- **React Router** - Navigasyon
- **Recharts** - Grafikler
- **Lucide React** - İkonlar
- **Sonner** - Bildirimler
- **LocalStorage** - Veri persistance

## 🎯 Yeni Özellikler

### Basılı Tut Mekanizması
- Eski "kaydır" yerine "basılı tut"
- %0-100 sarı dolum animasyonu
- 20 parçacık patlama efekti
- Her adımda kullanılıyor

### Otomatik Sipariş Kabul
- Profil ayarlarından aktif/pasif
- localStorage'da saklanıyor
- Açıksa sipariş direkt atanıyor

### Akıllı Canlı Destek
- 5 soruluk ön değerlendirme
- Seçeneklere göre yönlendirme
- Gerekirse çalışan ile bağlantı
- Sohbet kapatma ve silme

### Görsel Belge Sistemi
- Admin ve çalışan panelinde
- Tıklayarak büyük önizleme
- Animasyonlu modal
- 4 belge tipi desteği

## 🐛 Bilinen Sınırlamalar

- Veriler LocalStorage'da (backend yok)
- Gerçek harita yerine MockMap
- Belge görselleri simgesel
- Tek cihaz kullanımı

## 📄 Lisans

Bu proje Baymoto için özel olarak geliştirilmiştir.

---

**Made with ❤️ by Baymoto Team**
**🏍️ Hızlı. Güvenilir. Profesyonel.**
