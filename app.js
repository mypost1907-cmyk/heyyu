// ==================== State Management ====================
const state = {
    isRecording: false,
    mediaRecorder: null,
    audioChunks: [],
    recordingStartTime: null,
    timerInterval: null,
    currentEffect: 'normal',
    audioContext: null,
    analyser: null,
    animationId: null,
    recordedBlob: null,
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
    { name: 'Cem Yılmaz', username: '@cmylmz', bio: 'Komedyen, Aktör, Karikatürist.', avatarColor: '#E63946' },
    { name: 'Tarkan', username: '@tarkan', bio: 'Megastar', avatarColor: '#1D3557' },
    { name: 'Elon Musk', username: '@elonmusk', bio: 'Mars & Cars 🚀', avatarColor: '#457B9D' },
    { name: 'Sezen Aksu', username: '@sezen', bio: 'Minik Serçe', avatarColor: '#A8DADC' },
    { name: 'Fatih Terim', username: '@imparator', bio: 'Vazgeçtiğimiz an biteriz.', avatarColor: '#F4A261' },
    { name: 'Teknoloji Gündemi', username: '@techtr', bio: 'En yeni teknoloji haberleri.', avatarColor: '#2A9D8F' },
    { name: 'Seda Sayan', username: '@seda', bio: 'Sabahların Sultanı', avatarColor: '#E9C46A' },
    { name: 'Acun Ilıcalı', username: '@acun', bio: 'Survivor 2026 Başlıyor!', avatarColor: '#264653' },
    { name: 'NASA', username: '@nasa', bio: 'Exploring the universe.', avatarColor: '#0B3D91' },
    { name: 'Netflix Türkiye', username: '@netflixtr', bio: 'Tudum.', avatarColor: '#E50914' },
    { name: 'Spotify TR', username: '@spotifytr', bio: 'Müzik seninle.', avatarColor: '#1DB954' },
    { name: 'Yemek Sepeti', username: '@yemeksepeti', bio: 'Acıktın mı?', avatarColor: '#EA001B' }
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

// ==================== Audio Generation (Synth) ====================
// Gerçekçi ses dosyaları yerine, her post için farklı tonda melodi üreten synth
function generateSynthAudio(duration = 2, seed = 1) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    // Basit FM Synthesis benzeri ses üretimi
    const freq = 200 + (seed % 500); // Kullanıcıya özel frekans
    const speed = 5 + (seed % 10);

    for (let i = 0; i < buffer.length; i++) {
        // Ana ses + Modülasyon
        const t = i / sampleRate;
        const wave = Math.sin(2 * Math.PI * freq * t + Math.sin(2 * Math.PI * speed * t));

        // Zarf (Envelope) - Başlangıç ve bitiş yumuşatma
        let envelope = 1;
        if (t < 0.1) envelope = t / 0.1; // Attack
        if (t > duration - 0.5) envelope = (duration - t) / 0.5; // Decay

        data[i] = wave * 0.3 * envelope;
    }

    return audioBufferToBlob(buffer);
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
            effect: ['normal', 'robot', 'echo', 'chipmunk', 'deep'][Math.floor(Math.random() * 5)],
            timestamp: new Date(Date.now() - timeAgo),
            likes: Math.floor(Math.random() * 5000),
            comments: Math.floor(Math.random() * 500),
            shares: Math.floor(Math.random() * 200),
            saved: Math.random() > 0.8,
            liked: Math.random() > 0.7,
            audioBlob: null, // Dinamik oluşturulacak
            audioUrl: null   // Dinamik oluşturulacak
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
    // Hashtag'leri linke çevir
    return text.replace(/#(\w+)/g, '<span class="hashtag" onclick="handleHashtagClick(\'$1\')">#$1</span>');
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
                        
                        <div class="voice-effects" id="voiceEffects" style="display: none;">
                            <div class="effects-grid">
                                <button class="effect-btn active" data-effect="normal">Normal</button>
                                <button class="effect-btn" data-effect="robot">🤖 Robot</button>
                                <button class="effect-btn" data-effect="echo">🎵 Echo</button>
                                <button class="effect-btn" data-effect="chipmunk">🐿️ Tiz</button>
                                <button class="effect-btn" data-effect="deep">🦍 Kalın</button>
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

                    <div class="speed-control">
                         <span style="font-size:0.8rem; opacity:0.7">1.0x</span>
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
                <button class="action-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>${post.comments}</span>
                </button>
                <button class="action-btn">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                        <polyline points="16 6 12 2 8 6"></polyline>
                        <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    <span>${post.shares}</span>
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

function renderPageCurrent() {
    if (state.currentPage === 'home') renderHomePage();
    else if (state.currentPage === 'explore') renderExplorePage();
    else if (state.currentPage === 'profile') renderProfilePage();
}

// Audio Logic for Posts
let currentAudio = null;
let intervalId = null;

window.playPostAudio = (postId) => {
    const post = state.posts.find(p => p.id === postId);
    if (!post) return;

    // Eğer zaten çalıyorsa durdur
    if (currentAudio && !currentAudio.paused && currentAudio.postId === postId) {
        currentAudio.pause();
        clearInterval(intervalId);
        updatePlayIcon(postId, false);
        return;
    }

    // Başka bir şey çalıyorsa durdur
    if (currentAudio) {
        currentAudio.pause();
        updatePlayIcon(currentAudio.postId, false);
        clearInterval(intervalId);
    }

    // Ses yoksa üret (Lazy generation)
    if (!post.audioUrl) {
        if (!post.audioBlob) post.audioBlob = generateSynthAudio(Math.random() * 5 + 3, postId); // 3-8sn rastgele ses
        post.audioUrl = URL.createObjectURL(post.audioBlob);
    }

    currentAudio = new Audio(post.audioUrl);
    currentAudio.postId = postId;
    currentAudio.playbackRate = 1.0;

    updatePlayIcon(postId, true);

    currentAudio.play();

    // Progress loop
    intervalId = setInterval(() => {
        if (!currentAudio) return;
        const pct = (currentAudio.currentTime / currentAudio.duration) * 100;
        const progressEl = document.getElementById(`progress-${postId}`);
        const timeEl = document.getElementById(`time-${postId}`);

        if (progressEl) progressEl.style.width = `${pct}%`;
        if (timeEl) timeEl.textContent = `00:0${Math.floor(currentAudio.currentTime)}`;

        if (currentAudio.ended) {
            clearInterval(intervalId);
            updatePlayIcon(postId, false);
            if (progressEl) progressEl.style.width = '0%';
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
        effect: 'normal',
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
