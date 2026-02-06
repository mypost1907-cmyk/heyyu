// ==================== State Management ====================
const state = {
    isRecording: false,
    mediaRecorder: null,
    audioChunks: [],
    recordingStartTime: null,
    timerInterval: null,
    currentEffect: 'normal',
    currentAudio: null, // Audio management moved to state
    audioInterval: null, // Interval management moved to state
    recognition: null,
    transcript: '',
    posts: [],
    currentPage: 'home',
    activeProfileTab: 'posts', // posts, likes, saved
    currentFilter: null, // hashtag filtresi için
    currentUser: {
        id: 'user_1',
        name: 'Gökhan',
        username: '@gokhan',
        bio: 'Sesinle dünyayı değiştir! 🎙️ Kurucu @heyyu',
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23667eea' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='40' font-family='Arial'%3EG%3C/text%3E%3C/svg%3E",
        cover: "linear-gradient(to right, #667eea, #764ba2)",
        stats: {
            posts: 0,
            followers: 1234,
            following: 567,
            likes: 3421
        }
    }
};

// ==================== Mock Data Generation ====================
const mockUsers = [
    { name: 'Cem Yılmaz', username: '@cmylmz', bio: 'Komedyen, Aktör, Karikatürist.', avatarColor: '#E63946', gender: 'male' },
    { name: 'Tarkan', username: '@tarkan', bio: 'Megastar', avatarColor: '#1D3557', gender: 'male' },
    { name: 'Elon Musk', username: '@elonmusk', bio: 'Mars & Cars 🚀', avatarColor: '#457B9D', gender: 'male' },
    { name: 'Sezen Aksu', username: '@sezen', bio: 'Minik Serçe', avatarColor: '#A8DADC', gender: 'female' },
    { name: 'Fatih Terim', username: '@imparator', bio: 'Vazgeçtiğimiz an biteriz.', avatarColor: '#F4A261', gender: 'male' },
    { name: 'Teknoloji Gündemi', username: '@techtr', bio: 'En yeni teknoloji haberleri.', avatarColor: '#2A9D8F', gender: 'male' },
    { name: 'Seda Sayan', username: '@seda', bio: 'Sabahların Sultanı', avatarColor: '#E9C46A', gender: 'female' },
    { name: 'Acun Ilıcalı', username: '@acun', bio: 'Survivor 2026 Başlıyor!', avatarColor: '#264653', gender: 'male' },
    { name: 'NASA', username: '@nasa', bio: 'Exploring the universe.', avatarColor: '#0B3D91', gender: 'male' },
    { name: 'Netflix Türkiye', username: '@netflixtr', bio: 'Tudum.', avatarColor: '#E50914', gender: 'female' },
    { name: 'Spotify TR', username: '@spotifytr', bio: 'Müzik seninle.', avatarColor: '#1DB954', gender: 'female' },
    { name: 'Yemek Sepeti', username: '@yemeksepeti', bio: 'Acıktın mı?', avatarColor: '#EA001B', gender: 'male' }
];

const conversations = [
    "Bugün hava gerçekten harika, #güneş'in tadını çıkarın! ☀️",
    "Yeni film projemiz üzerine çalışıyoruz, çok yakında #sinema'larda!",
    "Mars'a gitmek için biletler satışta! 🚀 #space #mars",
    "Bu akşam harika bir konser vardı, enerjiniz müthişti! #müzik #konser",
    "Yapay zeka dünyayı değiştiriyor, buna hazır mısınız? #ai #teknoloji",
    "Kahve içmeden güne başlayamayanlar burada mı? ☕ #kahve #sabah",
    "Galatasaray bu sene şampiyon olacak mı? Yorumları alalım! #futbol #gs",
    "Yeni çıkan şarkımı dinlediniz mi? Link biyoda! 🎵 #yenişarkı",
    "Yazılım öğrenmek isteyenlere tavsiyem: Pes etmeyin! 💻 #yazılım #kodlama",
    "Bugün yediğim en güzel pizzaydı, tarifini isteyen? 🍕 #yemek #lezzet",
    "trafik yine kilit, İstanbul bitmiş... 🚗 #istanbul #trafik",
    "Kripto paralar yükselişte, boğa sezonu geldi mi? 📈 #bist #kripto",
    "Spora başlamak için pazartesiyi beklemeyin! 💪 #spor #motivasyon",
    "Son okuduğum kitap beni çok etkiledi. Mutlaka okuyun. 📚 #kitap",
    "Netflix'te bu hafta sonu ne izlesem? Öneriler? 📺 #dizi #film",
    "Kedim bugün yine çok yaramaz 🐱 #kedi #patilidostlar",
    "Yaz tatili planları yapıldı mı? Nereye gidiyoruz? 🏖️ #tatil",
    "Girişimcilik zor ama keyifli bir yolculuk. 🚀 #startup #iş",
    "Akşam yemeğinde ne yesek? Kararsızım. 🤔",
    "Her şey çok güzel olacak! İnanın. ✨ #umut"
];

const trendingTags = ['#teknoloji', '#müzik', '#futbol', '#sinema', '#tatil', '#yemek', '#yapayzeka', '#motivasyon'];

// ==================== DOM Elements ====================
const elements = {
    recordBtn: document.getElementById('recordBtn'),
    timer: document.getElementById('timer'),
    visualizer: document.getElementById('visualizer'),
    transcriptDisplay: document.getElementById('transcriptDisplay'),
    voiceEffects: document.getElementById('voiceEffects'),
    publishBtn: document.getElementById('publishBtn'),
    postsContainer: document.getElementById('postsContainer'),
    floatingRecordBtn: document.getElementById('floatingRecordBtn'),
    effectBtns: document.querySelectorAll('.effect-btn'),
    mainContainer: document.querySelector('.main-container'),
    homeBtn: document.getElementById('homeBtn'),
    exploreBtn: document.getElementById('exploreBtn'),
    notificationsBtn: document.getElementById('notificationsBtn'),
    profileBtn: document.getElementById('profileBtn')
};

// ==================== Audio Generation (Speech Synthesis) ====================
// Mock postlar için gerçekçi insan sesi (Web Speech API) kullanan sistem
function playSpeech(post) {
    if (!window.speechSynthesis) {
        alert("Tarayıcınız ses sentezini desteklemiyor.");
        return;
    }

    // Mevcut konuşmaları durdur ve intervalleri temizle
    window.speechSynthesis.cancel();
    if (state.audioInterval) clearInterval(state.audioInterval);
    if (state.currentAudio && !state.currentAudio.isSpeech) {
        state.currentAudio.pause();
    }

    const utterance = new SpeechSynthesisUtterance(post.transcript);
    utterance.lang = 'tr-TR';

    // Effect ayarları (Restore effects for playback)
    switch (post.effect) {
        case 'robot':
            utterance.pitch = 0.5; // Lower pitch for robot + monotonic (browser limits)
            utterance.rate = 0.9;
            break;
        case 'chipmunk':
            utterance.pitch = 1.8; // High pitch
            utterance.rate = 1.3;
            break;
        case 'deep':
            utterance.pitch = 0.4; // Low pitch
            utterance.rate = 0.8;
            break;
        case 'echo':
            // Echo simulation: Slower rate and slightly lower pitch to distinguish
            utterance.pitch = 0.8;
            utterance.rate = 0.6;
            break;
        default:
            utterance.pitch = 1.0;
            utterance.rate = 1.0;
    }

    // Speed Control Override (User preference wins over effect rate)
    if (post.playbackRate) {
        utterance.rate = post.playbackRate;
    }

    // Ses seçimi (Cinsiyete göre ve Türkçe)
    const voices = window.speechSynthesis.getVoices();
    let trVoices = voices.filter(v => v.lang.includes('tr'));
    let selectedVoice = null;

    if (post.user.gender === 'female') {
        selectedVoice = trVoices.find(v => v.name.includes('Female') || v.name.includes('Kadın') || v.name.includes('Zira') || v.name.includes('Emel'));
    } else {
        selectedVoice = trVoices.find(v => v.name.includes('Male') || v.name.includes('Erkek') || v.name.includes('Tolga') || v.name.includes('David'));
    }

    if (!selectedVoice) selectedVoice = trVoices[0]; // Fallback
    if (selectedVoice) utterance.voice = selectedVoice;

    // Scrolling Text Logic
    utterance.onboundary = (event) => {
        if (event.name === 'word') {
            const charIndex = event.charIndex;
            highlightWordInTranscript(post.id, charIndex);
        }
    };

    // UI Güncelleme
    updatePlayIcon(post.id, true);

    utterance.onend = () => {
        updatePlayIcon(post.id, false);
        resetTranscriptHighlight(post.id);
        currentAudio = null;
    };

    utterance.onerror = () => {
        updatePlayIcon(post.id, false);
        resetTranscriptHighlight(post.id);
    };

    // State yönetimi
    state.currentAudio = {
        postId: post.id,
        isSpeech: true,
        pause: () => {
            window.speechSynthesis.cancel();
            resetTranscriptHighlight(post.id);
        }
    };

    window.speechSynthesis.speak(utterance);
}

function highlightWordInTranscript(postId, charIndex) {
    const container = document.querySelector(`.post-card[data-post-id="${postId}"] .post-transcript`);
    if (!container) return;

    // Basit kelime eşleştirme (span'lara data-index eklemiş olacağız)
    // Ancak TTS charIndex kelimenin başını verir.
    // Biz render ederken her kelimenin başlangıç indexini saklayacağız.
    const spans = container.querySelectorAll('span.word');

    // Find closest span to charIndex
    let targetSpan = null;
    spans.forEach(span => {
        const spanIndex = parseInt(span.dataset.index);
        if (spanIndex <= charIndex + 2) { // Tolerans
            targetSpan = span;
        }
    });

    if (targetSpan) {
        // Remove previous highlights
        spans.forEach(s => s.classList.remove('active-word'));
        targetSpan.classList.add('active-word');

        // Scroll to view
        targetSpan.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
}

function resetTranscriptHighlight(postId) {
    const container = document.querySelector(`.post-card[data-post-id="${postId}"] .post-transcript`);
    if (!container) return;
    const spans = container.querySelectorAll('span.word');
    spans.forEach(s => s.classList.remove('active-word'));
    if (spans.length > 0) container.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== Data Init ====================
function initDemoData() {
    // 100+ Post oluştur
    for (let i = 0; i < 110; i++) {
        const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        const textTemplate = conversations[Math.floor(Math.random() * conversations.length)];

        // Rastgele varyasyonlar ekle
        let text = textTemplate;
        if (Math.random() > 0.7) text += ` ${trendingTags[Math.floor(Math.random() * trendingTags.length)]}`;

        // Rastgele zaman (son 24 saat içinde)
        const timeAgo = Math.floor(Math.random() * 86400000);

        const post = {
            id: Date.now() - timeAgo - i,
            user: {
                name: user.name,
                username: user.username,
                avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='${user.avatarColor.replace('#', '%23')}' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3E${user.name[0]}%3C/text%3E%3C/svg%3E`
            },
            transcript: text,
            effect: 'normal', // Hepsini normal insan sesi yap
            timestamp: new Date(Date.now() - timeAgo),
            likes: Math.floor(Math.random() * 5000),
            comments: Math.floor(Math.random() * 500),
            shares: Math.floor(Math.random() * 200),
            saved: Math.random() > 0.8,
            liked: Math.random() > 0.7,
            audioBlob: null,
            audioUrl: null,
            isMock: true // Mock data olduğunu belirt
        };

        state.posts.push(post);
    }

    // Sort by date newly
    state.posts.sort((a, b) => b.timestamp - a.timestamp);

    // Kullanıcının kendi istatistiklerini güncelle
    state.currentUser.stats.posts = state.posts.filter(p => p.user.username === state.currentUser.username).length;
}

// ==================== Helper: Parse Hashtags ====================
function parseText(text) {
    if (!text) return '';
    // Hashtag'leri linke çevir (basit regex)
    // Scrolling text için her kelimeyi span içine al ve offset index ekle

    let currentIndex = 0;

    // Geçici olarak HTML taglerini temizleyelim veya basitçe boşluklardan bölelim
    // Daha sağlam bir çözüm için text node traverse gerekir ama bu demo için split yeterli

    return text.replace(/#(\w+)/g, '<span class="hashtag" onclick="handleHashtagClick(\'$1\')">#$1</span>')
        .split(' ').map(word => {
            const span = `<span class="word" data-index="${text.indexOf(word, currentIndex)}">${word}</span>`;
            currentIndex = text.indexOf(word, currentIndex) + word.length;
            return span;
        }).join(' ');
}

window.handleHashtagClick = (tag) => {
    state.currentFilter = tag; // Başındaki # olmadan gelir genelde ama regex'e göre değişir
    showPage('explore'); // Explore sayfasında filtreli göster

    // Explore sayfasını güncelle
    const header = document.querySelector('.page-header h1');
    const sub = document.querySelector('.page-header p');
    if (header) header.textContent = `#${tag}`;
    if (sub) sub.textContent = 'Etiketiyle paylaşılan sesler';
};

// ==================== Page Navigation ====================
function showPage(pageName) {
    state.currentPage = pageName;

    // Reset filters if not exploring
    if (pageName !== 'explore') state.currentFilter = null;

    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${pageName}Btn`)?.classList.add('active');

    // Render appropriate page
    const container = elements.mainContainer;

    switch (pageName) {
        case 'home':
            renderHomePage();
            break;
        case 'explore':
            renderExplorePage();
            break;
        case 'notifications':
            renderNotificationsPage();
            break;
        case 'profile':
            renderProfilePage();
            break;
    }
}

// ==================== Render Functions ====================

function renderHomePage() {
    elements.mainContainer.innerHTML = `
        <aside class="sidebar">
            <div class="sidebar-section">
                <h3>🔥 Trendler</h3>
                <div class="trending-topics">
                    ${trendingTags.map(tag => `
                        <div class="topic-item" onclick="handleHashtagClick('${tag.replace('#', '')}')">
                            <span class="topic-tag">${tag}</span>
                            <span class="topic-count">${Math.floor(Math.random() * 2000)} ses</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </aside>

        <main class="feed">
             <!-- Record Section (Aynı Kalıyor) -->
            <div class="record-section" id="recordSection">
                <style>
                    .record-section {
                        background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
                        border-bottom: 1px solid var(--border-color);
                        padding: 24px;
                        margin-bottom: 20px;
                        border-radius: 0 0 20px 20px;
                    }
                </style>
                <div class="record-header">
                    <h2 style="font-size: 1.5rem; margin-bottom:0.5rem">Sesini Duyur 🎙️</h2>
                </div>
                
                <div class="record-container">
                    <div class="record-visualizer">
                        <canvas id="visualizer"></canvas>
                        <div class="transcript-display" id="transcriptDisplay"></div>
                    </div>
                    
                    <div class="record-controls">
                        <button class="record-btn" id="recordBtn">
                            <div class="mic-icon-wrapper">🎤</div>
                            <span class="record-text">Kayda Başla</span>
                        </button>
                        
                        <div class="timer" id="timer">00:00</div>
                        
                        <div class="voice-effects" id="voiceEffects">
                            <div class="effects-grid">
                                <button class="effect-btn ${state.currentEffect === 'normal' ? 'active' : ''}" onclick="setEffect('normal', this)" data-effect="normal">Normal</button>
                                <button class="effect-btn ${state.currentEffect === 'robot' ? 'active' : ''}" onclick="setEffect('robot', this)" data-effect="robot">🤖 Robot</button>
                                <button class="effect-btn ${state.currentEffect === 'echo' ? 'active' : ''}" onclick="setEffect('echo', this)" data-effect="echo">🎵 Echo</button>
                                <button class="effect-btn ${state.currentEffect === 'chipmunk' ? 'active' : ''}" onclick="setEffect('chipmunk', this)" data-effect="chipmunk">🐿️ Tiz</button>
                                <button class="effect-btn ${state.currentEffect === 'deep' ? 'active' : ''}" onclick="setEffect('deep', this)" data-effect="deep">🦍 Kalın</button>
                            </div>
                        </div>
                        
                        <button class="publish-btn" id="publishBtn" style="display: none;">Paylaş ✨</button>
                    </div>
                </div>
            </div>

            <div class="posts-container" id="postsContainer"></div>
        </main>

        <aside class="right-sidebar">
            <div class="stats-card">
                 <div class="user-mini-profile">
                    <img src="${state.currentUser.avatar}" class="mini-avatar">
                    <div>
                        <div style="font-weight:bold">${state.currentUser.name}</div>
                        <div style="color:var(--text-secondary); font-size:0.9rem">${state.currentUser.username}</div>
                    </div>
                </div>
                <div style="margin-top:15px; display:flex; justify-content:space-between">
                    <div style="text-align:center">
                        <div style="font-weight:bold; font-size:1.2rem">${state.posts.filter(p => p.user.username === state.currentUser.username).length}</div>
                        <div style="font-size:0.8rem; color:var(--text-secondary)">Ses</div>
                    </div>
                    <div style="text-align:center">
                        <div style="font-weight:bold; font-size:1.2rem">${state.currentUser.stats.followers.toLocaleString()}</div>
                        <div style="font-size:0.8rem; color:var(--text-secondary)">Takipçi</div>
                    </div>
                </div>
            </div>
            
            <div class="premium-card">
                <h3>💎 heyyu+</h3>
                <p>Ünlüler arasına katıl. Mavi tik al.</p>
                <button class="premium-btn">Premium'a Geç</button>
            </div>
        </aside>
    `;

    initializeHomePageElements();
    initVisualizer();
    renderPosts(state.posts.slice(0, 50)); // İlk 50 postu göster (performans için)
}

function renderExplorePage() {
    // Filtreleme mantığı
    let displayedPosts = state.posts;
    let title = "🔍 Keşfet";
    let sub = "Gündemdeki sesler";

    if (state.currentFilter) {
        displayedPosts = state.posts.filter(p => p.transcript.toLowerCase().includes(state.currentFilter.toLowerCase()));
        title = `#${state.currentFilter}`;
        sub = "Etiketiyle paylaşılanlar";
    }

    elements.mainContainer.innerHTML = `
        <main class="feed" style="grid-column: 1 / -1; max-width: 800px; margin: 0 auto;">
            <div class="page-header">
                <h1>${title}</h1>
                <p>${sub}</p>
            </div>
            
            ${!state.currentFilter ? `
            <div class="trending-section">
                <div class="trending-grid">
                    ${trendingTags.map((tag, i) => `
                        <div class="trending-card" onclick="handleHashtagClick('${tag.replace('#', '')}')">
                            <span class="trending-number">#${i + 1}</span>
                            <h3>${tag}</h3>
                            <p>${Math.floor(Math.random() * 5000)} ses</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="posts-container" id="postsContainer"></div>
        </main>
    `;

    renderPosts(displayedPosts.slice(0, 50));
}

function renderProfilePage() {
    // Kullanıcı postlarını filtrele
    let filteredPosts = [];
    if (state.activeProfileTab === 'posts') {
        filteredPosts = state.posts.filter(p => p.user.username === state.currentUser.username);
    } else if (state.activeProfileTab === 'likes') {
        filteredPosts = state.posts.filter(p => p.liked);
    } else if (state.activeProfileTab === 'saved') {
        filteredPosts = state.posts.filter(p => p.saved);
    }

    elements.mainContainer.innerHTML = `
        <main class="feed" style="grid-column: 1 / -1; max-width: 800px; margin: 0 auto;">
            <div class="profile-header">
                <div class="profile-cover" style="background: ${state.currentUser.cover}"></div>
                <div class="profile-info-container">
                    <div class="profile-avatar-large">
                        <img src="${state.currentUser.avatar}" alt="${state.currentUser.name}">
                    </div>
                    <div class="profile-details">
                        <h1>${state.currentUser.name} <span style="color:#1DA1F2; font-size:1.2rem">✓</span></h1>
                        <p class="profile-username">${state.currentUser.username}</p>
                        <p class="profile-bio">${state.currentUser.bio}</p>
                        
                        <div class="profile-stats">
                            <div class="profile-stat">
                                <span class="stat-value">${state.posts.filter(p => p.user.username === state.currentUser.username).length}</span>
                                <span class="stat-label">Ses</span>
                            </div>
                            <div class="profile-stat">
                                <span class="stat-value">${state.currentUser.stats.followers.toLocaleString()}</span>
                                <span class="stat-label">Takipçi</span>
                            </div>
                            <div class="profile-stat">
                                <span class="stat-value">${state.currentUser.stats.following}</span>
                                <span class="stat-label">Takip</span>
                            </div>
                        </div>
                        
                        <div class="profile-actions">
                            <button class="profile-btn primary" onclick="editProfile()">Profili Düzenle</button>
                            <button class="profile-btn" onclick="toggleSettings()">⚙️ Ayarlar</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="profile-tabs">
                <button class="tab-btn ${state.activeProfileTab === 'posts' ? 'active' : ''}" onclick="switchProfileTab('posts')">Sesler</button>
                <button class="tab-btn ${state.activeProfileTab === 'likes' ? 'active' : ''}" onclick="switchProfileTab('likes')">Beğenilenler</button>
                <button class="tab-btn ${state.activeProfileTab === 'saved' ? 'active' : ''}" onclick="switchProfileTab('saved')">Kaydedilenler</button>
            </div>
            
            <div class="posts-container" id="postsContainer">
                ${filteredPosts.length === 0 ? `
                    <div class="empty-state">
                        <div style="font-size:3rem; margin-bottom:1rem">🕳️</div>
                        <p>Burada henüz bir şey yok.</p>
                    </div>
                ` : ''}
            </div>
        </main>
    `;

    renderPosts(filteredPosts);
}

// Global functions for HTML interaction
window.switchProfileTab = (tab) => {
    state.activeProfileTab = tab;
    renderProfilePage();
};

window.editProfile = () => {
    const newName = prompt("Yeni isminizi girin:", state.currentUser.name);
    if (newName) {
        state.currentUser.name = newName;
        state.currentUser.bio = prompt("Biyo güncellemesi:", state.currentUser.bio) || state.currentUser.bio;
        renderProfilePage();
    }
};

window.toggleSettings = () => {
    alert("Ayarlar menüsü: \n- Bildirimler: Açık\n- Gizlilik: Herkese Açık\n- Tema: Koyu Mod\n(Bu bir demo menü)");
};

function renderNotificationsPage() {
    // Rastgele bildirimler üret
    const notifs = [];
    for (let i = 0; i < 15; i++) {
        const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        const types = ['like', 'follow', 'comment', 'mention'];
        const type = types[Math.floor(Math.random() * types.length)];
        const messages = {
            'like': 'sesini beğendi ❤️',
            'follow': 'seni takip etmeye başladı 👤',
            'comment': 'sesine yorum yaptı 💬',
            'mention': 'senden bahsetti 📣'
        };
        notifs.push({ user, type, msg: messages[type], time: Math.floor(Math.random() * 24) + ' saat önce' });
    }

    elements.mainContainer.innerHTML = `
        <main class="feed" style="grid-column: 1 / -1; max-width: 600px; margin: 0 auto;">
             <div class="page-header">
                <h1>🔔 Bildirimler</h1>
            </div>
            
            <div class="notifications-list">
                ${notifs.map(n => `
                    <div class="notification-item">
                        <div class="notification-avatar">
                             <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='${n.user.avatarColor.replace('#', '%23')}' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3E${n.user.name[0]}%3C/text%3E%3C/svg%3E">
                        </div>
                        <div class="notification-content">
                            <p><strong>${n.user.name}</strong> ${n.msg}</p>
                            <span class="notification-time">${n.time}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </main>
    `;
}

// ==================== Post Rendering & Audio ====================
function renderPosts(postsToRender) {
    const container = document.getElementById('postsContainer');
    if (!container) return;

    if (postsToRender.length === 0 && state.currentPage !== 'profile') {
        container.innerHTML = '<div class="empty-state">Gösterilecek ses yok.</div>';
        return;
    }

    container.innerHTML = postsToRender.map(post => `
         <div class="post-card fade-in" data-post-id="${post.id}">
            <div class="post-header">
                <div class="post-avatar">
                    <img src="${post.user.avatar}" alt="${post.user.name}">
                </div>
                <div class="post-user-info">
                    <div class="post-user-name">${post.user.name} 
                        ${['Cem Yılmaz', 'Tarkan', 'Elon Musk', 'Gökhan'].includes(post.user.name) ? '<span style="color:#1DA1F2; font-size:0.9rem">✓</span>' : ''}
                    </div>
                    <div class="post-user-username">${post.user.username}</div>
                </div>
                <div class="post-time">${getTimeAgo(post.timestamp)}</div>
            </div>
            
            <div class="post-audio-player">
                <canvas class="audio-waveform" id="waveform-${post.id}" width="300" height="50"></canvas>
                
                <div class="audio-controls">
                    <button class="play-btn" onclick="playPostAudio(${post.id})">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                             <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </button>
                    
                    <div class="audio-info-bar">
                        <div class="audio-progress-track">
                             <div class="audio-progress-fill" id="progress-${post.id}"></div>
                        </div>
                        <div class="audio-time-display">
                            <span id="time-${post.id}">00:00</span>
                        </div>
                    </div>

                    <div class="speed-control" onclick="toggleSpeed(${post.id})">
                         <span class="speed-badge" id="speed-${post.id}">${post.playbackRate || 1.0}x</span>
                    </div>
                </div>
            </div>
            
            <div class="post-transcript">
                ${parseText(post.transcript)}
            </div>
            
            <div class="post-actions">
                <button class="action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${post.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>${post.likes}</span>
                </button>
                <button class="action-btn" onclick="startCommentRecording(${post.id})" id="comment-btn-${post.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                    <span>Sesli Yorum</span>
                </button>
                    <span>${post.comments}</span>
                </button>
                <button class="action-btn" onclick="toggleShare(${post.id})">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                        <polyline points="16 6 12 2 8 6"></polyline>
                        <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    <span id="share-count-${post.id}">${post.shares}</span>
                </button>
                 <button class="action-btn ${post.saved ? 'saved' : ''}" onclick="toggleSave(${post.id})" style="margin-left:auto">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${post.saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                         <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    // Draw dummy waveforms
    postsToRender.forEach(p => drawDummyWaveform(p.id));
}

// Global Actions
window.toggleLike = (id) => {
    const post = state.posts.find(p => p.id === id);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        // Re-render only buttons would be better, but full render is easier for now
        renderPageCurrent();
    }
};

window.toggleSave = (id) => {
    const post = state.posts.find(p => p.id === id);
    if (post) {
        post.saved = !post.saved;
        renderPageCurrent();
    }
}

window.toggleShare = (id) => {
    const post = state.posts.find(p => p.id === id);
    if (post) {
        post.shares++;
        const shareCountEl = document.getElementById(`share-count-${id}`);
        if (shareCountEl) shareCountEl.textContent = post.shares;
        alert("Ses paylaşıldı! 🚀");
    }
}
window.toggleSpeed = (id) => {
    const post = state.posts.find(p => p.id === id);
    if (!post) return;

    // Cycle: 1.0 -> 1.5 -> 2.0 -> 0.75 -> 1.0
    const current = post.playbackRate || 1.0;
    let next = 1.0;

    if (current === 1.0) next = 1.5;
    else if (current === 1.5) next = 2.0;
    else if (current === 2.0) next = 0.75;
    else next = 1.0;

    post.playbackRate = next;

    // Update UI
    const badge = document.getElementById(`speed-${id}`);
    if (badge) badge.textContent = `${next}x`;

    // If playing, update immediately
    if (window.speechSynthesis.speaking && state.currentAudio && state.currentAudio.postId === id) {
        // SpeechSynthesis cannot update rate mid-speech easily without restart.
        // We will just cancel and restart at current position? Too complex for MVP.
        // Just restart.
        window.speechSynthesis.cancel();
        playSpeech(post);
    }
}

// Effect selection for recording
window.setEffect = (effect, btn) => {
    state.currentEffect = effect;
    document.querySelectorAll('.effect-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// 6 Saniyelik Sesli Yorum Mantığı
let commentRecorder = null;
let commentChunks = [];
let commentTimer = null;

window.startCommentRecording = async (postId) => {
    const btn = document.getElementById(`comment-btn-${postId}`);
    if (!btn) return;

    // Eğer zaten kaydediyorsa durdur
    if (btn.classList.contains('recording')) {
        // Durdur ve "Gönderildi" de
        stopCommentRecording(postId);
        return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        commentRecorder = new MediaRecorder(stream);
        commentChunks = [];

        commentRecorder.ondataavailable = e => commentChunks.push(e.data);
        commentRecorder.onstop = () => {
            // Fake sending
            alert("Sesli yorumunuz 6 saniye olarak kaydedildi ve gönderildi! 🚀");
            stream.getTracks().forEach(t => t.stop());
        };

        commentRecorder.start();
        btn.classList.add('recording');
        btn.innerHTML = `<span style="color:red">● 6sn</span> Kaydediyor...`;

        // 6 Saniye Limit
        let timeLeft = 6;
        commentTimer = setInterval(() => {
            timeLeft--;
            btn.innerHTML = `<span style="color:red">● ${timeLeft}sn</span> Kaydediyor...`;
            if (timeLeft <= 0) {
                stopCommentRecording(postId);
            }
        }, 1000);

    } catch (err) {
        alert("Mikrofon izni gerekli!");
    }
};

function stopCommentRecording(postId) {
    if (commentRecorder && commentRecorder.state === 'recording') {
        commentRecorder.stop();
    }
    const btn = document.getElementById(`comment-btn-${postId}`);
    if (btn) {
        btn.classList.remove('recording');
        clearInterval(commentTimer);
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Sesli Yorum</span>
        `;
    }

    // Update State & UI
    const post = state.posts.find(p => p.id === postId);
    if (post) {
        post.comments++;
        // Find comment count in DOM (sibling of button) - Bit hacky structure dependent
        // Better: renderPosts adds ID to comment count span, but let's re-render or traverse
        // Re-render might interrupt playback. Let's traverse.
        // Structure: button -> span (text) ... span (count) is next sibling in renderPosts?
        // Wait, renderPosts structure: button (comment) ... span (count)

        // Actually looking at renderPosts line 664: <span>${post.comments}</span> is AFTER the button.
        const btn = document.getElementById(`comment-btn-${postId}`);
        if (btn && btn.nextElementSibling) {
            btn.nextElementSibling.textContent = post.comments;
        }
    }
}

function renderPageCurrent() {
    if (state.currentPage === 'home') renderHomePage();
    else if (state.currentPage === 'explore') renderExplorePage();
    else if (state.currentPage === 'profile') renderProfilePage();
}

// Audio Logic for Posts
// Audio Logic for Posts (Globals moved to state)
window.playPostAudio = (postId) => {
    const post = state.posts.find(p => p.id === postId);
    if (!post) return;

    // Eğer zaten çalıyorsa durdur
    if (state.currentAudio && state.currentAudio.postId === postId) {
        if (state.currentAudio.isSpeech) {
            window.speechSynthesis.cancel();
        } else {
            state.currentAudio.pause();
        }
        clearInterval(state.audioInterval);
        updatePlayIcon(postId, false);
        state.currentAudio = null;
        return;
    }

    // Başka bir şey çalıyorsa durdur
    if (state.currentAudio) {
        if (state.currentAudio.isSpeech) {
            window.speechSynthesis.cancel();
        } else {
            state.currentAudio.pause();
        }
        updatePlayIcon(state.currentAudio.postId, false);
        clearInterval(state.audioInterval);
    }

    // Mock post ise Speech Synthesis kullan
    if (post.isMock) {
        playSpeech(post);
        return;
    }

    // Ses yoksa (Kullanıcı kaydı ise ama url yoksa - normalde olmaz ama güvenlik için)
    if (!post.audioUrl && post.audioBlob) {
        post.audioUrl = URL.createObjectURL(post.audioBlob);
    }

    if (!post.audioUrl) return;

    state.currentAudio = new Audio(post.audioUrl);
    state.currentAudio.postId = postId;
    state.currentAudio.playbackRate = 1.0;

    updatePlayIcon(postId, true);

    state.currentAudio.play();

    // Progress loop
    state.audioInterval = setInterval(() => {
        if (!state.currentAudio || state.currentAudio.isSpeech) return;
        const pct = (state.currentAudio.currentTime / state.currentAudio.duration) * 100;
        const progressEl = document.getElementById(`progress-${postId}`);
        const timeEl = document.getElementById(`time-${postId}`);

        if (progressEl) progressEl.style.width = `${pct}%`;
        if (timeEl) timeEl.textContent = `00:0${Math.floor(state.currentAudio.currentTime)}`;

        if (state.currentAudio.ended) {
            clearInterval(state.audioInterval);
            updatePlayIcon(postId, false);
            if (progressEl) progressEl.style.width = '0%';
            state.currentAudio = null;
        }
    }, 100);
};

function updatePlayIcon(id, isPlaying) {
    const btn = document.querySelector(`button[onclick="playPostAudio(${id})"]`);
    if (!btn) return;

    if (isPlaying) {
        btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
        btn.classList.add('playing');
    } else {
        btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
        btn.classList.remove('playing');
    }
}

function drawDummyWaveform(id) {
    const canvas = document.getElementById(`waveform-${id}`);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';

    const bars = 40;
    const barWidth = width / bars;

    for (let i = 0; i < bars; i++) {
        // Pseudo-random height based on ID + index
        const h = Math.abs(Math.sin(id + i)) * height * 0.8 + height * 0.1;
        const x = i * barWidth;
        const y = (height - h) / 2;

        // Gradient color based on index
        ctx.fillStyle = i % 2 === 0 ? '#667eea' : '#764ba2';
        ctx.fillRect(x, y, barWidth - 2, h);
    }
}

// ==================== Recording Logic (Keep mostly same but simplified) ====================
// ... (Burada mevcut kayıt mantığı korunarak entegre edilecek, özet geçiyorum)
// [Existing recording logic for new posts] ...

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        state.analyser = state.audioContext.createAnalyser();
        const source = state.audioContext.createMediaStreamSource(stream);
        source.connect(state.analyser);

        state.mediaRecorder = new MediaRecorder(stream);
        state.audioChunks = [];

        state.mediaRecorder.ondataavailable = e => state.audioChunks.push(e.data);
        state.mediaRecorder.onstop = () => {
            state.recordedBlob = new Blob(state.audioChunks, { type: 'audio/webm' });
            stream.getTracks().forEach(t => t.stop());
        };

        state.mediaRecorder.start();
        state.isRecording = true;

        // UI Updates
        elements.recordBtn.classList.add('recording');
        elements.recordBtn.querySelector('.record-text').textContent = 'Kaydediliyor...';
        elements.publishBtn.style.display = 'none';
        if (elements.voiceEffects) elements.voiceEffects.style.display = 'none';

        // Timer
        let secs = 0;
        state.timerInterval = setInterval(() => {
            secs++;
            elements.timer.textContent = `00:${secs.toString().padStart(2, '0')}`;
            if (secs >= 12) stopRecording();
        }, 1000);

        initVisualizer(); // Re-start visualizer loop

    } catch (err) {
        alert("Mikrofon hatası!" + err);
    }
}

function stopRecording() {
    if (!state.isRecording) return;
    state.mediaRecorder.stop();
    state.isRecording = false;
    clearInterval(state.timerInterval);
    elements.recordBtn.classList.remove('recording');
    elements.recordBtn.querySelector('.record-text').textContent = "Tekrar Dene";
    elements.publishBtn.style.display = 'block';
    if (elements.voiceEffects) elements.voiceEffects.style.display = 'block';

    // Show Publish Button with animation
    elements.publishBtn.style.animation = "float 2s infinite ease-in-out";
}

document.getElementById('publishBtn').addEventListener('click', () => {
    if (!state.recordedBlob) return;

    // Create new post
    const newPost = {
        id: Date.now(),
        user: state.currentUser,
        transcript: "Yeni ses kaydı 🎙️ #heyyu",
        audioBlob: state.recordedBlob,
        audioUrl: URL.createObjectURL(state.recordedBlob),
        effect: state.currentEffect, // Save selected effect
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        shares: 0,
        saved: false,
        liked: false
    };

    state.posts.unshift(newPost);

    // Eğer home'da değilsek home'a git
    if (state.currentPage !== 'home') showPage('home');
    else renderHomePage();

    // Reset UI
    elements.timer.textContent = "00:00";
    elements.recordBtn.querySelector('.record-text').textContent = "Kayda Başla";
    elements.publishBtn.style.display = "none";
    if (elements.voiceEffects) elements.voiceEffects.style.display = "none";
    state.recordedBlob = null;
});

// Event Listeners for Nav
elements.homeBtn?.addEventListener('click', () => showPage('home'));
elements.exploreBtn?.addEventListener('click', () => showPage('explore'));
elements.notificationsBtn?.addEventListener('click', () => showPage('notifications'));
elements.profileBtn?.addEventListener('click', () => showPage('profile'));
elements.recordBtn?.addEventListener('click', () => state.isRecording ? stopRecording() : startRecording());

function initializeHomePageElements() {
    // Re-bind elements after innerHTML refresh
    elements.recordBtn = document.getElementById('recordBtn');
    elements.timer = document.getElementById('timer');
    elements.publishBtn = document.getElementById('publishBtn');
    // ... re-add listeners if needed, mostly handled by onclick in HTML attributes for this scale
    // Complex listeners:
    if (elements.recordBtn) {
        elements.recordBtn.onclick = () => state.isRecording ? stopRecording() : startRecording();
    }
    if (elements.publishBtn) {
        elements.publishBtn.onclick = () => {
            // Logic repeated here or extracted
            if (!state.recordedBlob) return;
            const newPost = {
                id: Date.now(),
                user: state.currentUser,
                transcript: state.transcript || "Yeni ses kaydı 🎙️ #heyyu",
                audioBlob: state.recordedBlob,
                audioUrl: URL.createObjectURL(state.recordedBlob),
                effect: 'normal',
                timestamp: new Date(),
                likes: 0, comments: 0, shares: 0, saved: false, liked: false
            };
            state.posts.unshift(newPost);
            state.currentUser.stats.posts++;
            renderHomePage();
            elements.publishBtn.style.display = "none";
            elements.timer.textContent = "00:00";
            elements.recordBtn.querySelector('.record-text').textContent = "Kayda Başla";
        };
    }
}

// Visualizer (Reuse)
function initVisualizer() {
    // ... [Same visualizer code roughly]
    const canvas = document.getElementById('visualizer');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function draw() {
        if (!state.isRecording && !state.analyser) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.fillRect(0, canvas.height / 2, canvas.width, 2);
            return;
        }
        requestAnimationFrame(draw);
        if (!state.analyser) return;

        const bufferLength = state.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        state.analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] / 2;
            ctx.fillStyle = `rgb(${barHeight + 100}, 50, 200)`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }
    }
    draw();
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Az önce';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}dk`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}sa`;
    return `${Math.floor(seconds / 86400)}g`;
}

function audioBufferToBlob(audioBuffer) {
    // ... [WAV conversion helper, same as before] -> Simplified here for brevity, assume valid WAV
    // In production, full WAV encoder needed. For now returning empty blob if complicated
    // But since we need sound, we assume the previous implementation or similar.
    // Re-implementing simplified WAV writer:
    const numOfChan = 1;
    const length = audioBuffer.length * 2;
    const buffer = new ArrayBuffer(44 + length);
    const view = new DataView(buffer);
    const channels = [audioBuffer.getChannelData(0)];
    let pos = 0;

    // Header
    const setUint16 = (d) => { view.setUint16(pos, d, true); pos += 2; };
    const setUint32 = (d) => { view.setUint32(pos, d, true); pos += 4; };

    setUint32(0x46464952); // RIFF
    setUint32(36 + length);
    setUint32(0x45564157); // WAVE
    setUint32(0x20746d66); // fmt 
    setUint32(16);
    setUint16(1);
    setUint16(numOfChan);
    setUint32(audioBuffer.sampleRate);
    setUint32(audioBuffer.sampleRate * 2);
    setUint16(2);
    setUint16(16);
    setUint32(0x61746164); // data
    setUint32(length);

    let offset = 44;
    for (let i = 0; i < audioBuffer.length; i++) {
        const s = Math.max(-1, Math.min(1, channels[0][i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        offset += 2;
    }

    return new Blob([buffer], { type: 'audio/wav' });
}

// Init
initDemoData();
renderHomePage();
console.log("Heyyu 2.0 Loaded with 100+ items");
