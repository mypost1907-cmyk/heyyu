# 📱 heyyu - Native Mobile Development Plan

## iOS Native App (Swift/SwiftUI)

### Teknoloji Stack
- **Language**: Swift 5.9+
- **UI Framework**: SwiftUI
- **Architecture**: MVVM + Combine
- **Audio**: AVFoundation
- **Speech**: Speech Framework
- **Storage**: Core Data + CloudKit
- **Networking**: URLSession + Async/Await

### Özellikler

#### Ses Kayıt (AVAudioRecorder)
```swift
import AVFoundation

class AudioRecorder: ObservableObject {
    var audioRecorder: AVAudioRecorder?
    var audioEngine: AVAudioEngine?
    
    func startRecording() {
        let session = AVAudioSession.sharedInstance()
        try? session.setCategory(.record, mode: .default)
        try? session.setActive(true)
        
        let settings = [
            AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
            AVSampleRateKey: 44100,
            AVNumberOfChannelsKey: 2,
            AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
        ]
        
        audioRecorder = try? AVAudioRecorder(url: getAudioURL(), settings: settings)
        audioRecorder?.record(forDuration: 12.0)
    }
}
```

#### Speech-to-Text (SFSpeechRecognizer)
```swift
import Speech

class SpeechRecognizer: ObservableObject {
    private let speechRecognizer = SFSpeechRecognizer(locale: Locale(identifier: "tr-TR"))
    @Published var transcript = ""
    
    func startTranscribing(audioURL: URL) {
        let request = SFSpeechURLRecognitionRequest(url: audioURL)
        
        speechRecognizer?.recognitionTask(with: request) { result, error in
            guard let result = result else { return }
            self.transcript = result.bestTranscription.formattedString
        }
    }
}
```

#### Ses Efektleri (AVAudioEngine)
```swift
class AudioEffects {
    let audioEngine = AVAudioEngine()
    let pitchEffect = AVAudioUnitTimePitch()
    let reverbEffect = AVAudioUnitReverb()
    let distortionEffect = AVAudioUnitDistortion()
    
    func applyEffect(_ effect: VoiceEffect, to audioFile: AVAudioFile) {
        switch effect {
        case .robot:
            distortionEffect.loadFactoryPreset(.multiDistortedCubed)
        case .echo:
            reverbEffect.loadFactoryPreset(.largeHall)
        case .chipmunk:
            pitchEffect.pitch = 800
        case .deep:
            pitchEffect.pitch = -800
        }
    }
}
```

### UI Components (SwiftUI)

#### Ana Kayıt Ekranı
```swift
struct RecordView: View {
    @StateObject var recorder = AudioRecorder()
    @State private var isRecording = false
    
    var body: some View {
        VStack(spacing: 30) {
            // Visualizer
            WaveformView(audioLevel: recorder.audioLevel)
                .frame(height: 200)
            
            // Timer
            Text(recorder.formattedTime)
                .font(.system(size: 48, weight: .bold, design: .monospaced))
            
            // Record Button
            Button(action: toggleRecording) {
                Circle()
                    .fill(isRecording ? Color.red : Color.purple)
                    .frame(width: 120, height: 120)
                    .overlay(
                        Image(systemName: "mic.fill")
                            .font(.system(size: 40))
                            .foregroundColor(.white)
                    )
            }
            .scaleEffect(isRecording ? 1.1 : 1.0)
            .animation(.easeInOut(duration: 0.5).repeatForever(), value: isRecording)
        }
    }
}
```

#### Feed Ekranı
```swift
struct FeedView: View {
    @StateObject var viewModel = FeedViewModel()
    
    var body: some View {
        ScrollView {
            LazyVStack(spacing: 20) {
                ForEach(viewModel.posts) { post in
                    PostCard(post: post)
                }
            }
        }
        .refreshable {
            await viewModel.refresh()
        }
    }
}
```

### Gerekli Permissions (Info.plist)
```xml
<key>NSMicrophoneUsageDescription</key>
<string>Ses kaydı için mikrofon erişimi gerekli</string>

<key>NSSpeechRecognitionUsageDescription</key>
<string>Konuşmayı metne çevirmek için gerekli</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Profil fotoğrafı için galeri erişimi</string>
```

---

## Android Native App (Kotlin/Jetpack Compose)

### Teknoloji Stack
- **Language**: Kotlin 1.9+
- **UI Framework**: Jetpack Compose
- **Architecture**: MVVM + Flow
- **Audio**: MediaRecorder + AudioRecord
- **Speech**: Android Speech Recognition API
- **Storage**: Room + DataStore
- **Networking**: Retrofit + OkHttp

### Özellikler

#### Ses Kayıt (MediaRecorder)
```kotlin
class AudioRecorder(private val context: Context) {
    private var mediaRecorder: MediaRecorder? = null
    private val audioFile = File(context.cacheDir, "recording.m4a")
    
    fun startRecording() {
        mediaRecorder = MediaRecorder().apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
            setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
            setAudioSamplingRate(44100)
            setAudioEncodingBitRate(128000)
            setMaxDuration(12000) // 12 seconds
            setOutputFile(audioFile.absolutePath)
            
            prepare()
            start()
        }
    }
    
    fun stopRecording(): File {
        mediaRecorder?.apply {
            stop()
            release()
        }
        mediaRecorder = null
        return audioFile
    }
}
```

#### Speech-to-Text (SpeechRecognizer)
```kotlin
class SpeechRecognizer(private val context: Context) {
    private val recognizer = SpeechRecognizer.createSpeechRecognizer(context)
    private val _transcript = MutableStateFlow("")
    val transcript: StateFlow<String> = _transcript
    
    fun startListening() {
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, "tr-TR")
            putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
        }
        
        recognizer.setRecognitionListener(object : RecognitionListener {
            override fun onResults(results: Bundle) {
                val matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                _transcript.value = matches?.firstOrNull() ?: ""
            }
            
            override fun onPartialResults(partialResults: Bundle) {
                val matches = partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                _transcript.value = matches?.firstOrNull() ?: ""
            }
        })
        
        recognizer.startListening(intent)
    }
}
```

#### Ses Efektleri (AudioEffect)
```kotlin
class VoiceEffectProcessor {
    fun applyEffect(audioFile: File, effect: VoiceEffect): File {
        val outputFile = File(audioFile.parent, "processed_${audioFile.name}")
        
        when (effect) {
            VoiceEffect.ROBOT -> applyRobotEffect(audioFile, outputFile)
            VoiceEffect.ECHO -> applyEchoEffect(audioFile, outputFile)
            VoiceEffect.CHIPMUNK -> applyPitchShift(audioFile, outputFile, 1.5f)
            VoiceEffect.DEEP -> applyPitchShift(audioFile, outputFile, 0.75f)
            else -> audioFile.copyTo(outputFile, overwrite = true)
        }
        
        return outputFile
    }
    
    private fun applyPitchShift(input: File, output: File, pitch: Float) {
        // Use Sonic library or FFmpeg for pitch shifting
        val sonic = Sonic(44100, 1)
        sonic.setPitch(pitch)
        // Process audio...
    }
}
```

### UI Components (Jetpack Compose)

#### Ana Kayıt Ekranı
```kotlin
@Composable
fun RecordScreen(viewModel: RecordViewModel = viewModel()) {
    val isRecording by viewModel.isRecording.collectAsState()
    val timer by viewModel.timer.collectAsState()
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // Visualizer
        WaveformVisualizer(
            audioLevel = viewModel.audioLevel.collectAsState().value,
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp)
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        // Timer
        Text(
            text = timer,
            style = MaterialTheme.typography.displayLarge.copy(
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Bold
            )
        )
        
        Spacer(modifier = Modifier.height(48.dp))
        
        // Record Button
        FloatingActionButton(
            onClick = { viewModel.toggleRecording() },
            modifier = Modifier.size(120.dp),
            containerColor = if (isRecording) Color.Red else Color(0xFF667EEA)
        ) {
            Icon(
                imageVector = Icons.Default.Mic,
                contentDescription = "Record",
                modifier = Modifier.size(48.dp),
                tint = Color.White
            )
        }
    }
}
```

#### Feed Ekranı
```kotlin
@Composable
fun FeedScreen(viewModel: FeedViewModel = viewModel()) {
    val posts by viewModel.posts.collectAsState()
    
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        items(posts) { post ->
            PostCard(
                post = post,
                onLike = { viewModel.likePost(post.id) },
                onComment = { viewModel.commentOnPost(post.id) },
                onShare = { viewModel.sharePost(post.id) },
                onSave = { viewModel.savePost(post.id) }
            )
        }
    }
}
```

### Gerekli Permissions (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.VIBRATE" />
```

---

## Backend API (Node.js + Express)

### Teknoloji Stack
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Database**: PostgreSQL + Redis
- **Storage**: AWS S3 / Google Cloud Storage
- **Auth**: JWT + OAuth2
- **Real-time**: Socket.io

### API Endpoints

```javascript
// User endpoints
POST   /api/auth/register
POST   /api/auth/login
GET    /api/users/:id
PUT    /api/users/:id
GET    /api/users/:id/followers
GET    /api/users/:id/following

// Post endpoints
POST   /api/posts
GET    /api/posts
GET    /api/posts/:id
DELETE /api/posts/:id
POST   /api/posts/:id/like
POST   /api/posts/:id/comment
POST   /api/posts/:id/share

// Feed endpoints
GET    /api/feed
GET    /api/feed/explore
GET    /api/feed/trending

// Upload endpoints
POST   /api/upload/audio
POST   /api/upload/image
```

### Database Schema (PostgreSQL)

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    audio_url TEXT NOT NULL,
    transcript TEXT,
    effect VARCHAR(20),
    duration INTEGER,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Likes table
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, post_id)
);

-- Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id),
    audio_url TEXT NOT NULL,
    transcript TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Followers table
CREATE TABLE followers (
    id SERIAL PRIMARY KEY,
    follower_id INTEGER REFERENCES users(id),
    following_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(follower_id, following_id)
);
```

---

## Deployment Plan

### Web App
- **Hosting**: Vercel / Netlify
- **CDN**: Cloudflare
- **Domain**: heyyu.app

### iOS App
- **Distribution**: App Store
- **TestFlight**: Beta testing
- **Requirements**: iOS 15.0+

### Android App
- **Distribution**: Google Play Store
- **Beta**: Google Play Beta
- **Requirements**: Android 8.0+ (API 26+)

### Backend
- **Hosting**: AWS / Google Cloud / DigitalOcean
- **Database**: Managed PostgreSQL
- **Cache**: Redis Cloud
- **Storage**: S3 / Cloud Storage

---

## Timeline

### Phase 1: Web MVP (✅ Tamamlandı)
- ✅ Core recording functionality
- ✅ Speech-to-text
- ✅ Voice effects
- ✅ Basic social features
- ✅ Responsive design

### Phase 2: Backend Development (2-3 hafta)
- [ ] API development
- [ ] Database setup
- [ ] Authentication
- [ ] File storage
- [ ] Real-time features

### Phase 3: iOS Development (4-6 hafta)
- [ ] UI implementation
- [ ] Audio recording
- [ ] Speech recognition
- [ ] Social features
- [ ] App Store submission

### Phase 4: Android Development (4-6 hafta)
- [ ] UI implementation
- [ ] Audio recording
- [ ] Speech recognition
- [ ] Social features
- [ ] Play Store submission

### Phase 5: Launch & Marketing (2 hafta)
- [ ] Beta testing
- [ ] Bug fixes
- [ ] Marketing campaign
- [ ] Public launch

---

## Maliyet Tahmini

### Geliştirme
- Backend Development: 40-60 saat
- iOS Development: 80-120 saat
- Android Development: 80-120 saat
- Testing & QA: 40-60 saat

### Altyapı (Aylık)
- Hosting: $50-100
- Database: $30-50
- Storage: $20-50
- CDN: $10-30
- **Toplam**: ~$110-230/ay

### App Store Fees
- Apple Developer: $99/yıl
- Google Play: $25 (tek seferlik)

---

## Başarı Metrikleri

### KPIs
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Recording Rate (kayıt/kullanıcı)
- Engagement Rate (beğeni, yorum, paylaşım)
- Retention Rate (7-day, 30-day)
- Average Session Duration

### Hedefler (İlk 6 Ay)
- 10,000+ downloads
- 1,000+ DAU
- 50,000+ recordings
- 4.5+ star rating

---

**heyyu** - Sesinle dünyayı değiştir! 🎙️🚀
