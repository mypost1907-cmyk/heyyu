# 🎙️ HEYYU - Proje Özeti ve Özellikler

## 📋 Genel Bakış

**heyyu**, 12 saniyelik ses kayıtları ile sosyal etkileşim sağlayan yeni nesil bir sosyal medya platformudur. Twitter'ın hızlı paylaşım konsepti ile Clubhouse'un ses odaklı yaklaşımını birleştirerek benzersiz bir deneyim sunar.

### 🎯 Vizyon
"12 saniyede dünyaya ulaş" - Hızlı, etkili ve yaratıcı ses iletişimi

### 🌟 Misyon
İnsanların seslerini duyurabilecekleri, yaratıcı ses efektleri ile kendilerini ifade edebilecekleri ve anlamlı bağlantılar kurabileceği bir platform oluşturmak.

---

## ✨ Temel Özellikler

### 1️⃣ Ses Kayıt Sistemi

#### Teknik Detaylar
- **Maksimum Süre**: 12 saniye
- **Format**: WebM (Web), AAC/M4A (iOS), AAC (Android)
- **Sample Rate**: 44.1 kHz
- **Bitrate**: 128 kbps
- **Channels**: Stereo (2 kanal)

#### Kullanıcı Deneyimi
- ✅ Tek tıkla kayıt başlatma
- ✅ Gerçek zamanlı görselleştirme (waveform)
- ✅ Otomatik zamanlayıcı (12 saniye)
- ✅ Manuel durdurma seçeneği
- ✅ Mikrofon izin yönetimi
- ✅ Hata durumu yönetimi

#### Görselleştirme
```
┌─────────────────────────────────┐
│   Ses Dalgası Görselleştirme    │
│  ╱╲    ╱╲      ╱╲    ╱╲        │
│ ╱  ╲  ╱  ╲    ╱  ╲  ╱  ╲       │
│╱    ╲╱    ╲  ╱    ╲╱    ╲      │
│           ╲╱            ╲      │
└─────────────────────────────────┘
```

### 2️⃣ Speech-to-Text (Konuşmadan Metne)

#### Teknoloji
- **Web**: Web Speech API
- **iOS**: SFSpeechRecognizer
- **Android**: Android Speech Recognition API

#### Özellikler
- ✅ Gerçek zamanlı transkripsiyon
- ✅ Çoklu dil desteği (Türkçe, İngilizce, vb.)
- ✅ Otomatik dil algılama
- ✅ Kayan yazı animasyonu
- ✅ Düzenleme seçeneği (gelecekte)

#### Desteklenen Diller
1. 🇹🇷 Türkçe (tr-TR)
2. 🇺🇸 İngilizce (en-US)
3. 🇬🇧 İngilizce UK (en-GB)
4. 🇩🇪 Almanca (de-DE)
5. 🇫🇷 Fransızca (fr-FR)
6. 🇪🇸 İspanyolca (es-ES)

### 3️⃣ Ses Efektleri (5 Adet)

#### 1. Normal
- **Açıklama**: Orijinal ses, hiçbir efekt uygulanmaz
- **Kullanım**: Doğal iletişim için
- **Icon**: ⚪ Daire

#### 2. Robot
- **Açıklama**: Robotik distortion efekti
- **Teknik**: WaveShaper + Distortion
- **Kullanım**: Eğlenceli, futuristik içerik
- **Icon**: 🤖 Robot

#### 3. Echo
- **Açıklama**: Yankı/delay efekti
- **Teknik**: Delay Node + Feedback
- **Parametreler**: 
  - Delay Time: 300ms
  - Feedback: 0.4
- **Kullanım**: Dramatik anlatım
- **Icon**: 🎵 Müzik notu

#### 4. Chipmunk
- **Açıklama**: Yüksek tonlu, hızlı ses
- **Teknik**: Pitch Shift (+800 cents)
- **Playback Rate**: 1.5x
- **Kullanım**: Komedi, eğlenceli içerik
- **Icon**: 🔊 Hoparlör

#### 5. Deep (Derin)
- **Açıklama**: Derin, yavaş ses
- **Teknik**: Pitch Shift (-800 cents)
- **Playback Rate**: 0.75x
- **Kullanım**: Ciddi, etkileyici anlatım
- **Icon**: 🔉 Düşük ses

### 4️⃣ Hız Kontrolü

Dinleyiciler sesi farklı hızlarda dinleyebilir:

| Hız | Kullanım Senaryosu |
|-----|-------------------|
| 0.75x | Detaylı dinleme, öğrenme |
| 1.0x | Normal dinleme (varsayılan) |
| 1.25x | Hızlı tüketim |
| 1.5x | Çok hızlı, zaman tasarrufu |

### 5️⃣ Sosyal Özellikler

#### Profil Sistemi
```
┌─────────────────────────────┐
│  👤 Profil Fotoğrafı        │
│  📝 İsim & Kullanıcı Adı    │
│  📊 Biyografi               │
│  📈 İstatistikler:          │
│     • Toplam Ses: 24        │
│     • Takipçi: 1,234        │
│     • Takip: 567            │
│     • Beğeni: 3,421         │
└─────────────────────────────┘
```

#### Etkileşim Türleri

**1. Beğeni (Like) ❤️**
- Tek tıkla beğeni
- Beğeni sayısı görünür
- Animasyonlu kalp efekti
- Geri alma özelliği

**2. Yorum (Comment) 💬**
- Sesli yorumlar (yakında)
- Metin yorumlar (gelecekte)
- Yorum sayısı görünür
- Thread desteği

**3. Paylaşım (Share) 🔄**
- Kendi feed'inde paylaş
- Dış platformlara paylaş
- Link kopyalama
- QR kod (gelecekte)

**4. Kaydet (Save) 🔖**
- Favorilere ekle
- Koleksiyonlar (gelecekte)
- Çevrimdışı dinleme (gelecekte)

#### Keşfet Özellikleri

**Popüler Konular (Trending)**
```
#teknoloji     1.2k ses
#müzik         856 ses
#gündem        743 ses
#spor          621 ses
```

**Önerilen Kullanıcılar**
- Algoritma bazlı öneriler
- İlgi alanlarına göre
- Takip edilen kişilerin takipçileri
- Popüler içerik üreticileri

**Bildirimler**
- Yeni takipçi
- Beğeni aldığında
- Yorum aldığında
- Paylaşıldığında
- Mention (@) edildiğinde

---

## 🎨 Tasarım Sistemi

### Renk Paleti

#### Ana Renkler
```css
Primary:   #667eea → #764ba2 (Mor-Mavi Gradient)
Secondary: #f093fb → #f5576c (Pembe-Kırmızı Gradient)
Accent:    #4facfe → #00f2fe (Mavi-Cyan Gradient)
Success:   #43e97b → #38f9d7 (Yeşil Gradient)
```

#### Arka Plan
```css
Primary:   #0a0a0f (Koyu Siyah)
Secondary: #13131a (Orta Koyu)
Tertiary:  #1a1a24 (Açık Koyu)
Card:      rgba(26, 26, 36, 0.8) (Glassmorphism)
```

#### Metin
```css
Primary:   #ffffff (Beyaz)
Secondary: #a0a0b8 (Açık Gri)
Tertiary:  #6b6b85 (Koyu Gri)
```

### Tipografi

**Display Font: Outfit**
- Logo
- Başlıklar (h1, h2)
- Önemli CTA'lar

**Body Font: Inter**
- Genel metin
- Paragraflar
- Butonlar
- Form elemanları

**Monospace: Courier New**
- Zamanlayıcı
- Süre göstergeleri
- Kod blokları

### Spacing Sistemi

```
XS:  4px   (0.25rem)
SM:  8px   (0.5rem)
MD:  16px  (1rem)
LG:  24px  (1.5rem)
XL:  32px  (2rem)
2XL: 48px  (3rem)
```

### Border Radius

```
SM:   8px   (Küçük elemanlar)
MD:   12px  (Butonlar, inputlar)
LG:   16px  (Kartlar)
XL:   24px  (Büyük kartlar)
FULL: 9999px (Yuvarlak butonlar)
```

---

## 🚀 Performans Optimizasyonları

### Web Vitals Hedefleri

| Metrik | Hedef | Açıklama |
|--------|-------|----------|
| LCP | < 2.5s | Largest Contentful Paint |
| FID | < 100ms | First Input Delay |
| CLS | < 0.1 | Cumulative Layout Shift |
| FCP | < 1.8s | First Contentful Paint |
| TTI | < 3.8s | Time to Interactive |

### Optimizasyon Teknikleri

1. **Lazy Loading**
   - Görseller
   - Ses dosyaları
   - Bileşenler

2. **Code Splitting**
   - Route bazlı
   - Component bazlı

3. **Caching**
   - Service Worker
   - LocalStorage
   - IndexedDB

4. **Compression**
   - Gzip/Brotli
   - Image optimization
   - Audio compression

---

## 📱 Platform Desteği

### Web (✅ Aktif)

**Tarayıcılar**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Cihazlar**
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Mobile (iOS 14+, Android 8+)
- ✅ Tablet

### iOS (🚧 Planlı)

**Gereksinimler**
- iOS 15.0+
- iPhone 8 ve üzeri
- iPad (tüm modeller)

**Özellikler**
- Native UI (SwiftUI)
- Offline mode
- Background playback
- Widgets
- Siri shortcuts

### Android (🚧 Planlı)

**Gereksinimler**
- Android 8.0+ (API 26+)
- 2GB+ RAM
- Mikrofon

**Özellikler**
- Material Design 3
- Offline mode
- Background playback
- Widgets
- Quick tiles

---

## 🔒 Güvenlik ve Gizlilik

### Veri Koruma

1. **Ses Kayıtları**
   - Tarayıcıda işlenir
   - Kullanıcı onayı ile yüklenir
   - Şifreli iletim (HTTPS)
   - Şifreli depolama

2. **Kişisel Bilgiler**
   - GDPR uyumlu
   - KVKK uyumlu
   - Minimal veri toplama
   - Kullanıcı kontrolü

3. **Kimlik Doğrulama**
   - JWT tokens
   - OAuth2 (Google, Apple)
   - 2FA (gelecekte)

### İzinler

**Web**
- 🎤 Mikrofon erişimi
- 🔔 Bildirimler (opsiyonel)
- 📍 Konum (opsiyonel)

**iOS/Android**
- 🎤 Mikrofon
- 📷 Kamera (profil fotoğrafı)
- 📁 Depolama
- 🔔 Bildirimler

---

## 📊 Analitik ve Metrikler

### Kullanıcı Metrikleri

1. **Engagement**
   - Günlük aktif kullanıcı (DAU)
   - Aylık aktif kullanıcı (MAU)
   - Oturum süresi
   - Oturum sayısı

2. **Content**
   - Kayıt sayısı
   - Ortalama kayıt süresi
   - Efekt kullanım oranı
   - Paylaşım oranı

3. **Social**
   - Beğeni oranı
   - Yorum oranı
   - Takip oranı
   - Retention rate

### Başarı KPI'ları

**İlk 3 Ay**
- 1,000+ kayıtlı kullanıcı
- 100+ günlük aktif kullanıcı
- 5,000+ ses kaydı
- 4.0+ yıldız rating

**İlk 6 Ay**
- 10,000+ kayıtlı kullanıcı
- 1,000+ günlük aktif kullanıcı
- 50,000+ ses kaydı
- 4.5+ yıldız rating

**İlk Yıl**
- 100,000+ kayıtlı kullanıcı
- 10,000+ günlük aktif kullanıcı
- 500,000+ ses kaydı
- Monetizasyon başlangıcı

---

## 💰 Monetizasyon Stratejisi

### Premium Abonelik (heyyu+)

**Fiyat**: ₺29.99/ay veya ₺299/yıl

**Özellikler**
- ✨ Sınırsız ses efekti
- 🎨 Özel profil temaları
- 📊 Detaylı analitik
- 🚫 Reklamsız deneyim
- ⬇️ Ses indirme
- 🎙️ Daha uzun kayıtlar (30 saniye)
- 🏆 Premium rozet
- 🎯 Öncelikli destek

### Reklam Modeli

1. **Native Ads**
   - Feed içi reklamlar
   - Sponsorlu içerik
   - 5 post'ta 1 reklam

2. **Audio Ads**
   - Ses kayıtları arası
   - Atlanabilir (5 saniye sonra)
   - Premium kullanıcılara gösterilmez

### Diğer Gelir Kaynakları

- 💎 Sanal hediyeler
- 🎤 Canlı etkinlikler (bilet satışı)
- 🏢 Kurumsal hesaplar
- 📢 Promoted posts

---

## 🛣️ Yol Haritası

### Q1 2026 (✅ Tamamlandı)
- ✅ Web MVP
- ✅ Temel özellikler
- ✅ Ses kayıt ve efektler
- ✅ Speech-to-text
- ✅ Sosyal özellikler

### Q2 2026
- [ ] Backend API
- [ ] Kullanıcı kimlik doğrulama
- [ ] Database entegrasyonu
- [ ] iOS beta
- [ ] Android beta

### Q3 2026
- [ ] iOS App Store launch
- [ ] Android Play Store launch
- [ ] Sesli yorumlar
- [ ] DM sistemi
- [ ] Bildirimler

### Q4 2026
- [ ] Premium abonelik
- [ ] Canlı ses odaları
- [ ] Podcast desteği
- [ ] Analitik dashboard
- [ ] Monetizasyon

### 2027
- [ ] Desktop uygulamaları
- [ ] API açılımı
- [ ] Kurumsal çözümler
- [ ] Uluslararası genişleme
- [ ] AI özellikler

---

## 🤝 Topluluk ve Destek

### İletişim Kanalları

- 📧 Email: support@heyyu.app
- 🐦 Twitter: @heyyuapp
- 📱 Instagram: @heyyu
- 💬 Discord: discord.gg/heyyu

### Dokümantasyon

- 📖 Kullanıcı Kılavuzu
- 👨‍💻 API Dokümantasyonu
- 🎨 Tasarım Sistemi
- 🔧 Geliştirici Rehberi

### Katkıda Bulunma

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

## 📄 Lisans ve Yasal

- **Lisans**: MIT License
- **Telif Hakkı**: © 2026 heyyu
- **Gizlilik Politikası**: heyyu.app/privacy
- **Kullanım Koşulları**: heyyu.app/terms

---

**heyyu** - 12 saniyede dünyaya ulaş! 🎙️✨

*Sesinle konuş, dünyayı değiştir.*
