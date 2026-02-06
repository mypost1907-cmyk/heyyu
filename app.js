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
    currentUser: {
        name: 'Gökhan',
        username: '@gokhan',
        bio: 'Ses ile dünyayı değiştiriyorum 🎙️',
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%23667eea' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EG%3C/text%3E%3C/svg%3E",
        stats: {
            posts: 24,
            followers: 1234,
            following: 567,
            likes: 3421
        }
    }
};

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
    // Navigation buttons
    homeBtn: document.getElementById('homeBtn'),
    exploreBtn: document.getElementById('exploreBtn'),
    notificationsBtn: document.getElementById('notificationsBtn'),
    profileBtn: document.getElementById('profileBtn')
};

// ==================== Page Navigation ====================
function showPage(pageName) {
    state.currentPage = pageName;

    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${pageName}Btn`)?.classList.add('active');

    // Render appropriate page
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

function renderHomePage() {
    elements.mainContainer.innerHTML = `
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-section">
                <h3>Popüler Konular</h3>
                <div class="trending-topics">
                    <div class="topic-item">
                        <span class="topic-tag">#teknoloji</span>
                        <span class="topic-count">1.2k ses</span>
                    </div>
                    <div class="topic-item">
                        <span class="topic-tag">#müzik</span>
                        <span class="topic-count">856 ses</span>
                    </div>
                    <div class="topic-item">
                        <span class="topic-tag">#gündem</span>
                        <span class="topic-count">743 ses</span>
                    </div>
                    <div class="topic-item">
                        <span class="topic-tag">#spor</span>
                        <span class="topic-count">621 ses</span>
                    </div>
                </div>
            </div>
            
            <div class="sidebar-section">
                <h3>Önerilen Kullanıcılar</h3>
                <div class="suggested-users">
                    <div class="user-item">
                        <div class="user-avatar">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%23f093fb' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EA%3C/text%3E%3C/svg%3E" alt="User">
                        </div>
                        <div class="user-info">
                            <div class="user-name">Ayşe Yılmaz</div>
                            <div class="user-username">@ayse_y</div>
                        </div>
                        <button class="follow-btn">Takip Et</button>
                    </div>
                    <div class="user-item">
                        <div class="user-avatar">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%234facfe' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EM%3C/text%3E%3C/svg%3E" alt="User">
                        </div>
                        <div class="user-info">
                            <div class="user-name">Mehmet Kaya</div>
                            <div class="user-username">@mehmet_k</div>
                        </div>
                        <button class="follow-btn">Takip Et</button>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Feed -->
        <main class="feed">
            <!-- Record Section -->
            <div class="record-section" id="recordSection">
                <div class="record-header">
                    <h2>Sesinle konuş</h2>
                    <p>12 saniyede dünyaya ulaş</p>
                </div>
                
                <div class="record-container">
                    <div class="record-visualizer">
                        <canvas id="visualizer"></canvas>
                        <div class="transcript-display" id="transcriptDisplay"></div>
                    </div>
                    
                    <div class="record-controls">
                        <button class="record-btn" id="recordBtn">
                            <svg class="mic-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                <line x1="12" y1="19" x2="12" y2="23"></line>
                                <line x1="8" y1="23" x2="16" y2="23"></line>
                            </svg>
                            <span class="record-text">Kayda Başla</span>
                        </button>
                        
                        <div class="timer" id="timer">00:00</div>
                        
                        <div class="voice-effects" id="voiceEffects" style="display: none;">
                            <h4>Ses Efektleri</h4>
                            <div class="effects-grid">
                                <button class="effect-btn active" data-effect="normal">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                    </svg>
                                    Normal
                                </button>
                                <button class="effect-btn" data-effect="robot">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    Robot
                                </button>
                                <button class="effect-btn" data-effect="echo">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 18V5l12-2v13"></path>
                                        <circle cx="6" cy="18" r="3"></circle>
                                        <circle cx="18" cy="16" r="3"></circle>
                                    </svg>
                                    Echo
                                </button>
                                <button class="effect-btn" data-effect="chipmunk">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                                    </svg>
                                    Chipmunk
                                </button>
                                <button class="effect-btn" data-effect="deep">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                    </svg>
                                    Derin
                                </button>
                            </div>
                        </div>
                        
                        <button class="publish-btn" id="publishBtn" style="display: none;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 2L11 13"></path>
                                <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                            </svg>
                            Paylaş
                        </button>
                    </div>
                </div>
            </div>

            <!-- Feed Posts -->
            <div class="posts-container" id="postsContainer">
                <!-- Posts will be dynamically added here -->
            </div>
        </main>

        <!-- Right Sidebar -->
        <aside class="right-sidebar">
            <div class="stats-card">
                <h3>İstatistikleriniz</h3>
                <div class="stat-item">
                    <span class="stat-label">Toplam Ses</span>
                    <span class="stat-value">${state.currentUser.stats.posts}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Takipçi</span>
                    <span class="stat-value">${state.currentUser.stats.followers.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Takip</span>
                    <span class="stat-value">${state.currentUser.stats.following}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Beğeni</span>
                    <span class="stat-value">${state.currentUser.stats.likes.toLocaleString()}</span>
                </div>
            </div>
            
            <div class="premium-card">
                <div class="premium-icon">✨</div>
                <h3>Premium'a Geç</h3>
                <p>Sınırsız ses efekti, özel rozetler ve daha fazlası!</p>
                <button class="premium-btn">Hemen Başla</button>
            </div>
        </aside>
    `;

    // Re-initialize elements
    initializeHomePageElements();
    initVisualizer();
    renderPosts();
}

function renderExplorePage() {
    elements.mainContainer.innerHTML = `
        <main class="feed" style="grid-column: 1 / -1; max-width: 900px; margin: 0 auto;">
            <div class="page-header">
                <h1>🔍 Keşfet</h1>
                <p>Popüler sesler ve trendler</p>
            </div>
            
            <div class="trending-section">
                <h2>🔥 Trending Konular</h2>
                <div class="trending-grid">
                    <div class="trending-card">
                        <span class="trending-number">#1</span>
                        <h3>#teknoloji</h3>
                        <p>1,234 ses</p>
                    </div>
                    <div class="trending-card">
                        <span class="trending-number">#2</span>
                        <h3>#müzik</h3>
                        <p>856 ses</p>
                    </div>
                    <div class="trending-card">
                        <span class="trending-number">#3</span>
                        <h3>#gündem</h3>
                        <p>743 ses</p>
                    </div>
                    <div class="trending-card">
                        <span class="trending-number">#4</span>
                        <h3>#spor</h3>
                        <p>621 ses</p>
                    </div>
                </div>
            </div>
            
            <div class="posts-container" id="postsContainer">
                <!-- Trending posts will be shown here -->
            </div>
        </main>
    `;

    renderPosts();
}

function renderNotificationsPage() {
    const notifications = [
        { type: 'like', user: 'Ayşe Yılmaz', action: 'sesinizi beğendi', time: '2 dakika önce', avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%23f093fb' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EA%3C/text%3E%3C/svg%3E" },
        { type: 'follow', user: 'Mehmet Kaya', action: 'sizi takip etti', time: '1 saat önce', avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%234facfe' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EM%3C/text%3E%3C/svg%3E" },
        { type: 'comment', user: 'Ali Demir', action: 'sesinize yorum yaptı', time: '3 saat önce', avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%2343e97b' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EA%3C/text%3E%3C/svg%3E" },
    ];

    elements.mainContainer.innerHTML = `
        <main class="feed" style="grid-column: 1 / -1; max-width: 700px; margin: 0 auto;">
            <div class="page-header">
                <h1>🔔 Bildirimler</h1>
                <p>Son aktiviteleriniz</p>
            </div>
            
            <div class="notifications-list">
                ${notifications.map(notif => `
                    <div class="notification-item">
                        <div class="notification-icon ${notif.type}">
                            ${notif.type === 'like' ? '❤️' : notif.type === 'follow' ? '👤' : '💬'}
                        </div>
                        <div class="notification-avatar">
                            <img src="${notif.avatar}" alt="${notif.user}">
                        </div>
                        <div class="notification-content">
                            <p><strong>${notif.user}</strong> ${notif.action}</p>
                            <span class="notification-time">${notif.time}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </main>
    `;
}

function renderProfilePage() {
    const userPosts = state.posts.filter(p => p.user.username === state.currentUser.username);

    elements.mainContainer.innerHTML = `
        <main class="feed" style="grid-column: 1 / -1; max-width: 900px; margin: 0 auto;">
            <div class="profile-header">
                <div class="profile-cover"></div>
                <div class="profile-info-container">
                    <div class="profile-avatar-large">
                        <img src="${state.currentUser.avatar}" alt="${state.currentUser.name}">
                    </div>
                    <div class="profile-details">
                        <h1>${state.currentUser.name}</h1>
                        <p class="profile-username">${state.currentUser.username}</p>
                        <p class="profile-bio">${state.currentUser.bio}</p>
                        
                        <div class="profile-stats">
                            <div class="profile-stat">
                                <span class="stat-value">${state.currentUser.stats.posts}</span>
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
                            <div class="profile-stat">
                                <span class="stat-value">${state.currentUser.stats.likes.toLocaleString()}</span>
                                <span class="stat-label">Beğeni</span>
                            </div>
                        </div>
                        
                        <div class="profile-actions">
                            <button class="profile-btn primary">Profili Düzenle</button>
                            <button class="profile-btn">Ayarlar</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="profile-tabs">
                <button class="tab-btn active" data-tab="posts">Sesler</button>
                <button class="tab-btn" data-tab="likes">Beğenilenler</button>
                <button class="tab-btn" data-tab="saved">Kaydedilenler</button>
            </div>
            
            <div class="posts-container" id="postsContainer">
                ${userPosts.length > 0 ? '' : '<div class="empty-state"><p>Henüz ses paylaşmadınız</p></div>'}
            </div>
        </main>
    `;

    renderPosts();
}

function initializeHomePageElements() {
    elements.recordBtn = document.getElementById('recordBtn');
    elements.timer = document.getElementById('timer');
    elements.visualizer = document.getElementById('visualizer');
    elements.transcriptDisplay = document.getElementById('transcriptDisplay');
    elements.voiceEffects = document.getElementById('voiceEffects');
    elements.publishBtn = document.getElementById('publishBtn');
    elements.postsContainer = document.getElementById('postsContainer');
    elements.effectBtns = document.querySelectorAll('.effect-btn');

    // Re-attach event listeners
    if (elements.recordBtn) {
        elements.recordBtn.addEventListener('click', () => {
            if (state.isRecording) {
                stopRecording();
            } else {
                startRecording();
            }
        });
    }

    if (elements.publishBtn) {
        elements.publishBtn.addEventListener('click', publishPost);
    }

    if (elements.effectBtns) {
        elements.effectBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.effectBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.currentEffect = btn.dataset.effect;
            });
        });
    }
}

// ==================== Speech Recognition Setup ====================
function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        state.recognition = new SpeechRecognition();
        state.recognition.continuous = true;
        state.recognition.interimResults = true;
        state.recognition.lang = 'tr-TR';

        state.recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }

            state.transcript = finalTranscript + interimTranscript;
            updateTranscriptDisplay();
        };

        state.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };
    }
}

// ==================== Visualizer ====================
function initVisualizer() {
    const canvas = elements.visualizer || document.getElementById('visualizer');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function drawWaveform() {
        if (!state.analyser) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgba(102, 126, 234, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
            return;
        }

        const bufferLength = state.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        state.analyser.getByteTimeDomainData(dataArray);

        ctx.fillStyle = 'rgba(26, 26, 36, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 3;
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(0.5, '#764ba2');
        gradient.addColorStop(1, '#4facfe');
        ctx.strokeStyle = gradient;

        ctx.beginPath();
        const sliceWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * canvas.height / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        state.animationId = requestAnimationFrame(drawWaveform);
    }

    drawWaveform();
}

// ==================== Recording Functions ====================
async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        state.analyser = state.audioContext.createAnalyser();
        const source = state.audioContext.createMediaStreamSource(stream);
        source.connect(state.analyser);
        state.analyser.fftSize = 2048;

        state.mediaRecorder = new MediaRecorder(stream);
        state.audioChunks = [];

        state.mediaRecorder.ondataavailable = (event) => {
            state.audioChunks.push(event.data);
        };

        state.mediaRecorder.onstop = () => {
            state.recordedBlob = new Blob(state.audioChunks, { type: 'audio/webm' });
            stream.getTracks().forEach(track => track.stop());
        };

        state.mediaRecorder.start();
        state.isRecording = true;
        state.recordingStartTime = Date.now();

        if (state.recognition) {
            state.transcript = '';
            try {
                state.recognition.start();
            } catch (e) {
                console.log('Speech recognition already started or not available');
            }
        }

        elements.recordBtn.classList.add('recording');
        elements.recordBtn.querySelector('.record-text').textContent = 'Kaydediliyor...';
        elements.voiceEffects.style.display = 'none';
        elements.publishBtn.style.display = 'none';

        startTimer();

    } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Mikrofona erişim izni gerekli!');
    }
}

function stopRecording() {
    if (state.mediaRecorder && state.isRecording) {
        state.mediaRecorder.stop();
        state.isRecording = false;

        if (state.recognition) {
            try {
                state.recognition.stop();
            } catch (e) {
                console.log('Speech recognition already stopped');
            }
        }

        clearInterval(state.timerInterval);

        elements.recordBtn.classList.remove('recording');
        elements.recordBtn.querySelector('.record-text').textContent = 'Kayda Başla';
        elements.voiceEffects.style.display = 'block';
        elements.publishBtn.style.display = 'flex';

        if (state.animationId) {
            cancelAnimationFrame(state.animationId);
        }
        if (state.audioContext) {
            state.audioContext.close();
        }
        state.analyser = null;
    }
}

function startTimer() {
    let seconds = 0;
    const maxSeconds = 12;

    state.timerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        elements.timer.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        if (seconds >= maxSeconds) {
            stopRecording();
        }
    }, 1000);
}

function updateTranscriptDisplay() {
    if (state.transcript && elements.transcriptDisplay) {
        elements.transcriptDisplay.textContent = state.transcript;
        elements.transcriptDisplay.style.display = 'block';
    }
}

// ==================== Voice Effects ====================
async function applyVoiceEffect(audioBlob, effect) {
    if (effect === 'normal') return audioBlob;

    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const offlineContext = new OfflineAudioContext(
            audioBuffer.numberOfChannels,
            audioBuffer.length,
            audioBuffer.sampleRate
        );

        const source = offlineContext.createBufferSource();
        source.buffer = audioBuffer;

        switch (effect) {
            case 'chipmunk':
                source.playbackRate.value = 1.5;
                break;
            case 'deep':
                source.playbackRate.value = 0.75;
                break;
        }

        source.connect(offlineContext.destination);
        source.start();

        const renderedBuffer = await offlineContext.startRendering();
        return audioBufferToBlob(renderedBuffer);
    } catch (error) {
        console.error('Error applying effect:', error);
        return audioBlob;
    }
}

function audioBufferToBlob(audioBuffer) {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numberOfChannels * 2;
    const buffer = new ArrayBuffer(44 + length);
    const view = new DataView(buffer);
    const channels = [];
    let offset = 0;
    let pos = 0;

    function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
    }

    function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
    }

    setUint32(0x46464952);
    setUint32(36 + length);
    setUint32(0x45564157);
    setUint32(0x20746d66);
    setUint32(16);
    setUint16(1);
    setUint16(numberOfChannels);
    setUint32(audioBuffer.sampleRate);
    setUint32(audioBuffer.sampleRate * 2 * numberOfChannels);
    setUint16(numberOfChannels * 2);
    setUint16(16);
    setUint32(0x61746164);
    setUint32(length);

    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
        channels.push(audioBuffer.getChannelData(i));
    }

    pos = 0;
    while (pos < audioBuffer.length) {
        for (let i = 0; i < numberOfChannels; i++) {
            let sample = Math.max(-1, Math.min(1, channels[i][pos]));
            sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
            view.setInt16(44 + offset, sample, true);
            offset += 2;
        }
        pos++;
    }

    return new Blob([buffer], { type: 'audio/wav' });
}

// ==================== Post Creation ====================
async function publishPost() {
    if (!state.recordedBlob) return;

    let finalBlob = state.recordedBlob;
    if (state.currentEffect !== 'normal') {
        finalBlob = await applyVoiceEffect(state.recordedBlob, state.currentEffect);
    }

    const post = {
        id: Date.now(),
        user: state.currentUser,
        audioBlob: finalBlob,
        audioUrl: URL.createObjectURL(finalBlob),
        transcript: state.transcript || 'Ses kaydı',
        effect: state.currentEffect,
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        shares: 0,
        saved: false,
        liked: false
    };

    state.posts.unshift(post);
    state.currentUser.stats.posts++;
    renderPosts();

    state.recordedBlob = null;
    state.transcript = '';
    state.currentEffect = 'normal';
    elements.timer.textContent = '00:00';
    if (elements.transcriptDisplay) {
        elements.transcriptDisplay.textContent = '';
        elements.transcriptDisplay.style.display = 'none';
    }
    elements.voiceEffects.style.display = 'none';
    elements.publishBtn.style.display = 'none';

    document.querySelectorAll('.effect-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.effect-btn[data-effect="normal"]')?.classList.add('active');
}

// ==================== Render Posts ====================
function renderPosts() {
    const container = document.getElementById('postsContainer');
    if (!container) return;

    container.innerHTML = state.posts.map(post => `
        <div class="post-card" data-post-id="${post.id}">
            <div class="post-header">
                <div class="post-avatar">
                    <img src="${post.user.avatar}" alt="${post.user.name}">
                </div>
                <div class="post-user-info">
                    <div class="post-user-name">${post.user.name}</div>
                    <div class="post-user-username">${post.user.username}</div>
                </div>
                <div class="post-time">${getTimeAgo(post.timestamp)}</div>
            </div>
            
            <div class="post-audio-player">
                <canvas class="audio-waveform" id="waveform-${post.id}"></canvas>
                <div class="audio-controls">
                    <button class="play-btn" data-post-id="${post.id}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </button>
                    <div class="audio-progress" data-post-id="${post.id}">
                        <div class="audio-progress-bar" id="progress-${post.id}"></div>
                    </div>
                    <div class="audio-time">
                        <span id="current-time-${post.id}">00:00</span> / 
                        <span id="duration-${post.id}">00:00</span>
                    </div>
                    <div class="speed-control">
                        <button class="speed-btn" data-speed="0.75" data-post-id="${post.id}">0.75x</button>
                        <button class="speed-btn active" data-speed="1" data-post-id="${post.id}">1x</button>
                        <button class="speed-btn" data-speed="1.25" data-post-id="${post.id}">1.25x</button>
                        <button class="speed-btn" data-speed="1.5" data-post-id="${post.id}">1.5x</button>
                    </div>
                </div>
            </div>
            
            <div class="post-transcript">
                "${post.transcript}"
            </div>
            
            <div class="post-actions">
                <button class="action-btn ${post.liked ? 'liked' : ''}" data-action="like" data-post-id="${post.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${post.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>${post.likes}</span>
                </button>
                <button class="action-btn" data-action="comment" data-post-id="${post.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>${post.comments}</span>
                </button>
                <button class="action-btn" data-action="share" data-post-id="${post.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <span>${post.shares}</span>
                </button>
                <button class="action-btn ${post.saved ? 'saved' : ''}" data-action="save" data-post-id="${post.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${post.saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    state.posts.forEach(post => {
        if (post.audioUrl) {
            setupAudioPlayer(post);
        }
    });
}

// ==================== Audio Player ====================
function setupAudioPlayer(post) {
    const audio = new Audio(post.audioUrl);
    const playBtn = document.querySelector(`.play-btn[data-post-id="${post.id}"]`);
    const progressBar = document.getElementById(`progress-${post.id}`);
    const currentTimeEl = document.getElementById(`current-time-${post.id}`);
    const durationEl = document.getElementById(`duration-${post.id}`);
    const speedBtns = document.querySelectorAll(`.speed-btn[data-post-id="${post.id}"]`);

    if (!playBtn) return;

    audio.addEventListener('loadedmetadata', () => {
        if (durationEl) durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
        playBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
        `;
    });

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
            `;
        } else {
            audio.pause();
            playBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            `;
        }
    });

    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const speed = parseFloat(btn.dataset.speed);
            audio.playbackRate = speed;
            speedBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// ==================== Helper Functions ====================
function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return 'Az önce';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} dakika önce`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} saat önce`;
    return `${Math.floor(seconds / 86400)} gün önce`;
}

// ==================== Event Listeners ====================
// Navigation
if (elements.homeBtn) {
    elements.homeBtn.addEventListener('click', () => showPage('home'));
}
if (elements.exploreBtn) {
    elements.exploreBtn.addEventListener('click', () => showPage('explore'));
}
if (elements.notificationsBtn) {
    elements.notificationsBtn.addEventListener('click', () => showPage('notifications'));
}
if (elements.profileBtn) {
    elements.profileBtn.addEventListener('click', () => showPage('profile'));
}

// Floating button
if (elements.floatingRecordBtn) {
    elements.floatingRecordBtn.addEventListener('click', () => {
        if (state.currentPage !== 'home') {
            showPage('home');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            if (!state.isRecording && elements.recordBtn) {
                startRecording();
            }
        }, 500);
    });
}

// Post actions
document.addEventListener('click', (e) => {
    const actionBtn = e.target.closest('.action-btn');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const postId = parseInt(actionBtn.dataset.postId);
    const post = state.posts.find(p => p.id === postId);

    if (!post) return;

    switch (action) {
        case 'like':
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            renderPosts();
            break;
        case 'save':
            post.saved = !post.saved;
            renderPosts();
            break;
        case 'comment':
            alert('Yorum özelliği yakında eklenecek!');
            break;
        case 'share':
            alert('Paylaşım özelliği yakında eklenecek!');
            break;
    }
});

// ==================== Create Demo Audio ====================
function createDemoAudio() {
    // Create a simple beep sound for demo
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const duration = 2;
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
        data[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.3;
    }

    return audioBufferToBlob(buffer);
}

// ==================== Initialize ====================
initSpeechRecognition();

// Add demo posts with working audio
setTimeout(() => {
    const demoAudio = createDemoAudio();
    const demoUrl = URL.createObjectURL(demoAudio);

    const demoPosts = [
        {
            id: Date.now() - 1000,
            user: {
                name: 'Ayşe Yılmaz',
                username: '@ayse_y',
                avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%23f093fb' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EA%3C/text%3E%3C/svg%3E"
            },
            audioUrl: demoUrl,
            audioBlob: demoAudio,
            transcript: 'Merhaba herkese! Bugün harika bir gün geçirdim. Yeni projemle ilgili çok heyecanlıyım!',
            effect: 'normal',
            timestamp: new Date(Date.now() - 3600000),
            likes: 42,
            comments: 8,
            shares: 3,
            saved: false,
            liked: false
        },
        {
            id: Date.now() - 2000,
            user: {
                name: 'Mehmet Kaya',
                username: '@mehmet_k',
                avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%234facfe' width='40' height='40'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EM%3C/text%3E%3C/svg%3E"
            },
            audioUrl: demoUrl,
            audioBlob: demoAudio,
            transcript: 'Teknoloji dünyasındaki son gelişmeler gerçekten inanılmaz. Yapay zeka her geçen gün daha da gelişiyor.',
            effect: 'robot',
            timestamp: new Date(Date.now() - 7200000),
            likes: 128,
            comments: 24,
            shares: 15,
            saved: true,
            liked: true
        }
    ];

    state.posts.push(...demoPosts);
    renderHomePage();
}, 500);

console.log('🎙️ heyyu initialized successfully!');
