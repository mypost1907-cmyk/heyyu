# 🎙️ heyyu - Sesinle Konuş

**12 saniyede dünyaya ulaş!** Modern, çarpıcı ve tam özellikli ses paylaşım platformu.

![heyyu Logo](https://img.shields.io/badge/heyyu-Voice%20Social%20Media-667eea?style=for-the-badge)

## ✨ Özellikler

### 🎤 Ses Kayıt Sistemi
- **12 saniyelik ses kayıt** - Hızlı ve etkili iletişim
- **Gerçek zamanlı görselleştirme** - Ses dalgaları canlı olarak görüntülenir
- **Otomatik zamanlayıcı** - 12 saniye sonunda otomatik durdurma
- **Kolay erişim** - Hem masaüstü hem mobil için optimize edilmiş arayüz

### 🗣️ Speech-to-Text (Konuşmadan Metne)
- **Gerçek zamanlı transkript** - Konuşurken metne dönüşüm
- **Kayan yazı animasyonu** - Uzun metinler için otomatik kaydırma
- **Çoklu dil desteği** - Türkçe ve diğer diller
- **Otomatik dil algılama** - Konuşulan dili otomatik tanır

### 🎭 5 Farklı Ses Efekti
1. **Normal** - Orijinal sesiniz
2. **Robot** - Robotik distortion efekti
3. **Echo** - Yankı/delay efekti
4. **Chipmunk** - Yüksek tonlu, hızlı ses
5. **Deep** - Derin, yavaş ses

### ⚡ Hız Kontrolü
Dinleyiciler sesi istedikleri hızda dinleyebilir:
- **0.75x** - Yavaş
- **1x** - Normal (varsayılan)
- **1.25x** - Hızlı
- **1.5x** - Çok hızlı

### 📱 Tam Sosyal Medya Özellikleri

#### Kullanıcı Profili
- Profil fotoğrafı
- Kullanıcı adı ve isim
- İstatistikler (toplam ses, takipçi, takip, beğeni)

#### Sosyal Etkileşim
- ❤️ **Beğeni** - Sesleri beğen
- 💬 **Yorum** - Sesli yorumlar (yakında)
- 🔄 **Paylaşım** - Sesleri paylaş
- 🔖 **Kaydet** - Favorilere ekle

#### Keşfet & Bağlan
- 🔥 **Popüler Konular** - Trending hashtag'ler
- 👥 **Önerilen Kullanıcılar** - Yeni insanlar keşfet
- 🔔 **Bildirimler** - Gerçek zamanlı güncellemeler
- 🔍 **Arama** - Kullanıcı ve içerik ara

### 🎨 Premium Tasarım

#### Modern UI/UX
- **Dark Mode** - Göz dostu karanlık tema
- **Gradient Renkler** - Canlı mor-mavi gradient paleti
- **Glassmorphism** - Modern cam efekti
- **Smooth Animations** - Akıcı geçişler ve animasyonlar
- **Responsive Design** - Tüm cihazlarda mükemmel görünüm

#### Görsel Öğeler
- **Animasyonlu Logo** - Ses dalgası animasyonu
- **Canlı Arka Plan** - Pulse animasyonlu gradient
- **Glow Effects** - Işıltılı hover efektleri
- **Micro-interactions** - Kullanıcı etkileşimlerinde detaylı animasyonlar

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Modern web tarayıcı (Chrome, Firefox, Safari, Edge)
- Mikrofon erişimi
- HTTP sunucusu (geliştirme için)

### Hızlı Başlangıç

```bash
# Projeyi klonlayın
git clone <repository-url>
cd heyyu

# HTTP sunucusu başlatın (npx ile)
npx http-server -p 8080 -o

# Veya Python ile
python -m http.server 8080

# Veya Node.js ile
npm install -g http-server
http-server -p 8080 -o
```

Tarayıcınızda `http://localhost:8080` adresine gidin.

## 🛠️ Teknoloji Stack

### Frontend
- **HTML5** - Semantik yapı
- **CSS3** - Modern styling
  - CSS Variables
  - Flexbox & Grid
  - Animations & Transitions
  - Responsive Design
- **Vanilla JavaScript** - Sıfır bağımlılık
  - ES6+ Features
  - Async/Await
  - Web APIs

### Web APIs
- **MediaRecorder API** - Ses kayıt
- **Web Audio API** - Ses işleme ve görselleştirme
- **Speech Recognition API** - Konuşmadan metne
- **Canvas API** - Ses dalgası görselleştirme
- **Blob API** - Ses dosyası yönetimi

### Özellikler
- **PWA Ready** - Progressive Web App desteği
- **Offline First** - Çevrimdışı çalışma (yakında)
- **Real-time** - Gerçek zamanlı güncellemeler

## 📱 Platform Desteği

### Web (Şu anda aktif)
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Mobile Web (iOS Safari, Android Chrome)
- ✅ Tablet

### Gelecek Planlar
- 📱 **iOS Native App** - Swift/SwiftUI
- 🤖 **Android Native App** - Kotlin/Jetpack Compose
- 💻 **Desktop App** - Electron

## 🎯 Kullanım Kılavuzu

### Ses Kaydetme
1. Ana sayfadaki **"Kayda Başla"** butonuna tıklayın
2. Mikrofon izni verin
3. Konuşmaya başlayın (maksimum 12 saniye)
4. Kayıt otomatik olarak duracak veya manuel durdurabilirsiniz

### Ses Efekti Ekleme
1. Kaydı tamamladıktan sonra ses efektleri görünür
2. 5 efektten birini seçin (Normal, Robot, Echo, Chipmunk, Deep)
3. Seçilen efekt otomatik olarak uygulanır

### Paylaşma
1. Efekti seçtikten sonra **"Paylaş"** butonuna tıklayın
2. Sesiniz feed'de görünür
3. Diğer kullanıcılar dinleyebilir, beğenebilir, yorumlayabilir

### Dinleme
1. Feed'deki herhangi bir ses kartındaki play butonuna tıklayın
2. Hız kontrolü ile dinleme hızını ayarlayın
3. Transkripti okuyun
4. Beğen, yorum yap veya kaydet

## 🎨 Tasarım Sistemi

### Renk Paleti
```css
Primary Gradient: #667eea → #764ba2
Secondary Gradient: #f093fb → #f5576c
Accent Gradient: #4facfe → #00f2fe
Success Gradient: #43e97b → #38f9d7

Background: #0a0a0f (Dark)
Cards: rgba(26, 26, 36, 0.8) (Glassmorphism)
Text: #ffffff (Primary), #a0a0b8 (Secondary)
```

### Tipografi
- **Display Font**: Outfit (Logo, başlıklar)
- **Body Font**: Inter (Genel metin)
- **Monospace**: Courier New (Zamanlayıcı, süre)

### Spacing System
- XS: 0.25rem (4px)
- SM: 0.5rem (8px)
- MD: 1rem (16px)
- LG: 1.5rem (24px)
- XL: 2rem (32px)
- 2XL: 3rem (48px)

## 🔒 Gizlilik ve Güvenlik

- 🔐 Ses kayıtları tarayıcıda işlenir
- 🚫 Sunucuya otomatik yükleme yok
- ✅ Kullanıcı kontrolünde paylaşım
- 🔒 HTTPS zorunlu (production için)

## 🚧 Gelecek Özellikler

### Yakında
- [ ] Sesli yorumlar
- [ ] Gerçek zamanlı bildirimler
- [ ] Profil düzenleme
- [ ] Takip sistemi
- [ ] DM (Direkt mesaj)
- [ ] Hikayeler (24 saatlik sesler)

### Uzun Vadeli
- [ ] Canlı ses odaları (Clubhouse benzeri)
- [ ] Podcast desteği
- [ ] Monetizasyon (Premium abonelik)
- [ ] Reklam sistemi
- [ ] Analytics dashboard
- [ ] API ve webhook'lar

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen:
1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Geliştiren: **Senior Agile Software Engineer**
- Agile & Scrum metodolojileri
- Modern web teknolojileri
- UX/UI tasarım prensipleri

## 🙏 Teşekkürler

Bu projeyi kullandığınız için teşekkürler! Geri bildirimlerinizi bekliyoruz.

---

**heyyu** - 12 saniyede dünyaya ulaş! 🎙️✨

Made with ❤️ and lots of ☕
