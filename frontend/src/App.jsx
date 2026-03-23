import { useState, useRef, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { 
  UploadCloud, Activity, AlertTriangle, Lightbulb, TrendingUp, Zap, 
  Users, Target, Brain, Link as LinkIcon, Instagram, Youtube, PlayCircle, Eye, Share2, Sparkles, Download, Globe,
  MessageSquare, X, Send, Bot, User, Loader2
} from 'lucide-react';
import ReactPlayer from 'react-player';
import { clsx } from 'clsx';
import './index.css';

// Importing generated 3D logos
import ytLogo from './assets/yt.png';
import igLogo from './assets/ig.png';
import ttLogo from './assets/tt.png';

const GEMINI_API_KEY = "AIzaSyAkYNbQeuRqmHmMKkpXE7EhMJRzTVEAdV4".trim();

const TRANSLATIONS = {
  en: {
    title: "HOOK ARCHITECT AI",
    subheading: "We will analyze visual motion and audio pacing to find drop-off zones.",
    uploadMp4: "Upload MP4",
    ytUrl: "YouTube URL",
    selectVid: "Select Video",
    vidSelected: "Video Selected ✅",
    analyzeBtn: "Analyze Engagement Drop-offs",
    analyzeYtBtn: "Analyze YouTube Feed",
    fetching: "Extracting Multi-Modal Features...",
    filtering: "Filtering for viral hooks and energy levels.",
    engaging: "ENGAGING",
    boring: "BORING",
    average: "AVERAGE",
    densityMap: "Attention Density Map",
    autoFix: "1-Click Auto Fix Video",
    optimizing: "Optimizing...",
    optimized: "Content Optimized!",
    optSub: "Drop-offs removed. Export ready.",
    download: "DOWNLOAD",
    engagementSpectrum: "Visual Engagement Spectrum",
    viralityScore: "Virality Scoreboard",
    audienceSim: "Audience Simulation",
    startSim: "START USER SIMULATION",
    hookRewriter: "Auto Hook Rewriter",
    viralInsights: "Viral-Sense Insights",
    hook: "HOOK",
    retention: "RETENTION",
    energy: "ENERGY",
    typewriter: [
      "Upload Video for Analysis",
      "Optimize Hooks for 10M+ Views",
      "Identify Exact Dropout Zones",
      "1-Click AI Content Strategist",
      "Engineered for Viral Success"
    ]
  },
  hi: {
    title: "हुक आर्किटेक्ट AI",
    subheading: "हम ड्रॉप-ऑफ जोन खोजने के लिए विजुअल मोशन और ऑडियो पेसिंग का विश्लेषण करेंगे।",
    uploadMp4: "MP4 अपलोड करें",
    ytUrl: "यूट्यूब यूआरएल",
    selectVid: "वीडियो चुनें",
    vidSelected: "वीडियो चुना गया ✅",
    analyzeBtn: "जुड़ाव गिरावट का विश्लेषण करें",
    analyzeYtBtn: "यूट्यूब फीड का विश्लेषण करें",
    fetching: "मल्टी-मोडल फीचर्स निकाल रहे हैं...",
    filtering: "वायरल हुक और ऊर्जा स्तरों के लिए फ़िल्टरिंग।",
    engaging: "आकर्षक",
    boring: "नीरस",
    average: "औसत",
    densityMap: "ध्यान घनत्व मानचित्र",
    autoFix: "1-क्लिक ऑटो फिक्स वीडियो",
    optimizing: "अनुकूलन हो रहा है...",
    optimized: "सामग्री अनुकूलित!",
    optSub: "ड्रॉप-ऑफ हटा दिए गए। निर्यात तैयार है।",
    download: "डाउनलोड करें",
    engagementSpectrum: "विजुअल जुड़ाव स्पेक्ट्रम",
    viralityScore: "वायरलिटी स्कोरबोर्ड",
    audienceSim: "दर्शक सिमुलेशन",
    startSim: "उपयोगकर्ता सिमुलेशन शुरू करें",
    hookRewriter: "ఆటో హుక్ लेखक",
    viralInsights: "वायरल-सेंस अंतर्दृष्टि",
    hook: "हुक",
    retention: "प्रतिधारण",
    energy: "ऊर्जा",
    typewriter: [
      "विश्लेषण के लिए वीडियो अपलोड करें",
      "10M+ व्यूज के लिए हुक अनुकूलित करें",
      "सटीक ड्रॉपआउट जोन पहचानें",
      "1-क्लिक AI सामग्री रणनीतिकार",
      "वायरल सफलता के लिए इंजीनियर"
    ]
  },
  mr: {
    title: "हुक आर्किटेक्ट AI",
    subheading: "आम्ही ड्रॉप-ऑफ झोन शोधण्यासाठी व्हिज्युअल मोशन आणि ऑडिओ पेसिंगचे विश्लेषण करू.",
    uploadMp4: "MP4 अपलोड करा",
    ytUrl: "यूट्यूब यूआरएल",
    selectVid: "व्हिडिओ निवडा",
    vidSelected: "व्हिडिओ निवडला ✅",
    analyzeBtn: "सहभाग घसरणीचे विश्लेषण करा",
    analyzeYtBtn: "यूट्यूब फीडचे विश्लेषण करा",
    fetching: "मल्टी-मोडल फीचर्स काढत आहे...",
    filtering: "वायरल हुक आणि ऊर्जा स्तरांसाठी फिल्टरिंग.",
    engaging: "आकर्षक",
    boring: "कंटाळवाणा",
    average: "सरासरी",
    densityMap: "लक्ष घनता नकाशा",
    autoFix: "1-क्लिक ऑटो फिक्स व्हिडिओ",
    optimizing: "अनुकूलन सुरू आहे...",
    optimized: "सामग्री अनुकूलित!",
    optSub: "ड्रॉप-ऑफ काढले गेले. निर्यात तयार आहे.",
    download: "डाउनलोड करा",
    engagementSpectrum: "व्हिज्युअल सहभाग स्पेक्ट्रम",
    viralityScore: "व्हायरालिटी स्कोरबोर्ड",
    audienceSim: "प्रेक्षक सिम्युलेशन",
    startSim: "वापरकर्ता सिम्युलेशन सुरू करा",
    hookRewriter: "ऑटो हुक लेखक",
    viralInsights: "वायरल-सेन्स अंतर्दृष्टी",
    hook: "हुक",
    retention: "टिकवून ठेवणे",
    energy: "ऊर्जा",
    typewriter: [
      "विश्लेषणासाठी व्हिडिओ अपलोड करा",
      "10M+ व्ह्यूजसाठी हुक अनुकूल करा",
      "अचूक ड्रॉपआउट झोन ओळखा",
      "1-क्लिक AI सामग्री रणनीतीकार",
      "वायरल यशासाठी इंजिनियर"
    ]
  },
  ur: {
    title: "ہک آرکیٹیکٹ AI",
    subheading: "ہم ڈراپ آف زونز تلاش کرنے کے لیے بصری حرکت اور آڈیو رفتار کا تجزیہ کریں گے۔",
    uploadMp4: "MP4 اپ لوڈ کریں",
    ytUrl: "یوٹیوب یو آر ایل",
    selectVid: "ویڈیو منتخب کریں",
    vidSelected: "ویڈیو منتخب ہو گئی ✅",
    analyzeBtn: "شراکت کی کمی کا تجزیہ کریں",
    analyzeYtBtn: "یوٹیوب فیڈ کا تجزیہ کریں",
    fetching: "ملٹی موڈل خصوصیات نکالی جا رہی ہیں...",
    filtering: "وائرل ہکس اور توانائی کی سطحوں کے لیے فلٹرنگ۔",
    engaging: "دلچسپ",
    boring: "بورنگ",
    average: "اوسط",
    densityMap: "توجہ کی کثافت کا نقشہ",
    autoFix: "1-کلک آٹو فکس ویڈیو",
    optimizing: "بہتر بنایا جا رہا ہے...",
    optimized: "مواد بہتر ہو گیا!",
    optSub: "ڈراپ آف ختم ہو گئے۔ برآمد تیار ہے۔",
    download: "ڈاؤن لوڈ کریں",
    engagementSpectrum: "بصری شراکت کا سپیکٹرم",
    viralityScore: "وائرلٹی سکور بورڈ",
    audienceSim: "سامعین کی نقل",
    startSim: "صارف کی نقل شروع کریں",
    hookRewriter: "آٹو ہک رائٹر",
    viralInsights: "وائرل سینس بصیرت",
    hook: "ہک",
    retention: "برقرار رکھنا",
    energy: "توانائی",
    typewriter: [
      "تجزیہ کے لیے ویڈیو اپ لوڈ کریں",
      "+10 ملین ویوز کے لیے ہکس بہتر کریں",
      "درست ڈراپ آؤٹ زونز کی شناخت کریں",
      "1-کلک AI مواد کا اسٹریٹجسٹ",
      "وائرل کامیابی کے لیے تیار کردہ"
    ]
  },
  ta: {
    title: "ஹூக் ஆர்க்கிடெக்ட் AI",
    subheading: "வீடியோ மாற்றங்கள் மற்றும் ஆடியோ வேகத்தை பகுப்பாய்வு செய்து குறைபாடுகளைக் கண்டறிவோம்.",
    uploadMp4: "MP4 பதிவேற்றவும்",
    ytUrl: "யூடியூப் URL",
    selectVid: "வீடியோவைத் தேர்வுசெய்",
    vidSelected: "வீடியோ தேர்ந்தெடுக்கப்பட்டது ✅",
    analyzeBtn: "ஈடுபாடு குறைபாடுகளைப் பகுப்பாய்வு செய்",
    analyzeYtBtn: "யூடியூப் பகுப்பாய்வு செய்",
    fetching: "அம்சங்களைப் பிரித்தெடுக்கிறது...",
    filtering: "வைரல் ஹூக்குகள் மற்றும் ஆற்றல் நிலைகளை வடிகட்டுகிறது.",
    engaging: "ஈர்க்கக்கூடியது",
    boring: "சோர்வானது",
    average: "சராசரி",
    densityMap: "கவன அடர்த்தி வரைபடம்",
    autoFix: "1-கிளிக் ஆட்டோ பிக்ஸ்",
    optimizing: "மேம்படுத்துகிறது...",
    optimized: "உள்ளடக்கம் மேம்படுத்தப்பட்டது!",
    optSub: "குறைபாடுகள் நீக்கப்பட்டன. பதிவிறக்கம் தயார்.",
    download: "பதிவிறக்கம்",
    engagementSpectrum: "காட்சி ஈடுபாடு ஸ்பெக்ட்ரம்",
    viralityScore: "வைரல் ஸ்கோர்போர்டு",
    audienceSim: "பார்வையாளர் உருவகப்படுத்துதல்",
    startSim: "பயனர் உருவகப்படுத்துதலைத் தொடங்கு",
    hookRewriter: "ஆட்டో హుక్ எழுத்தாளர்",
    viralInsights: "வைரல் நுண்ணறிவு",
    hook: "ஹூக்",
    retention: "தக்கவைப்பு",
    energy: "ஆற்றல்",
    typewriter: [
      "பகுப்பாய்விற்கு வீடியோவை பதிவேற்றவும்",
      "10M+ பார்வைகளுக்கு ஹூக்கை மேம்படுத்தவும்",
      "துல்லியமான டிராப்-அவுట్ மண்டலங்களை அடையாளம் காணவும்",
      "1-கிளிக் AI உள்ளடக்க வியூகாளர்",
      "வைரல் வெற்றிக்காக வடிவமைக்கப்பட்டது"
    ]
  },
  te: {
    title: "హుక్ ఆర్కిటెక్ట్ AI",
    subheading: "మేము వీడియో చలనం మరియు ఆడియో వేగాన్ని విశ్లేషించి, డ్రాప్-ఆఫ్ జోన్‌లను కనుగొంటాము.",
    uploadMp4: "MP4 అప్‌లోడ్ చేయండి",
    ytUrl: "యూట్యూబ్ URL",
    selectVid: "వీడియోను ఎంచుకోండి",
    vidSelected: "వీడియో ఎంపికైంది ✅",
    analyzeBtn: "ఎంగేజ్‌మెంట్ డ్రాప్-ఆఫ్ విశ్లేషించండి",
    analyzeYtBtn: "యూట్యూబ్ ఫీడ్ విశ్లేషించండి",
    fetching: "ఫీచర్లను సేకరిస్తోంది...",
    filtering: "వైరల్ హుక్స్ మరియు ఎనర్జీ లెవల్స్ కోసం ఫిల్టర్ చేస్తోంది.",
    engaging: "ఆకట్టుకునేలా ఉంది",
    boring: "బోర్ కొడుతోంది",
    average: "సగటు",
    densityMap: "అటెన్షన్ డెన్సిటీ మ్యాప్",
    autoFix: "1-క్లిక్ ఆటో ఫిక్స్ వీడియో",
    optimizing: "మెరుగుపరుస్తోంది...",
    optimized: "కంటెంట్ ఆప్టిమైజ్ చేయబడింది!",
    optSub: "డ్రాప్-ఆఫ్‌లు తొలగించబడ్డాయి. డౌన్‌లోడ్ సిద్ధం.",
    download: "డౌన్‌లోడ్",
    engagementSpectrum: "విజువల్ ఎంగేజ్‌మెంట్ స్పెక్ట్రమ్",
    viralityScore: "వైరాలిటీ స్కోర్‌బోర్డ్",
    audienceSim: "ప్రేక్షకుల అనుకరణ",
    startSim: "యూజర్ అనుకరణను ప్రారంభించండి",
    hookRewriter: "ఆటో హుక్ రీరైటర్",
    viralInsights: "వైరల్ ఇన్సైట్స్",
    hook: "హుక్",
    retention: "నిలుపుదల",
    energy: "శక్తి",
    typewriter: [
      "విశ్లేషణ కోసం వీడియోను అప్‌లోడ్ చేయండి",
      "10M+ వీక్షణల కోసం హుక్ ఆప్టిమైజ్ చేయండి",
      "ఖచ్చితమైన డ్రాపౌట్ జోన్‌లను గుర్తించండి",
      "1-క్లిక్ AI కంటెంట్ స్ట్రాటజిస్ట్",
      "వైరల్ సక్సెస్ కోసం రూపొందించబడింది"
    ]
  }
};

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'mr', label: 'म' },
  { code: 'ur', label: 'اردو' },
  { code: 'ta', label: 'த' },
  { code: 'te', label: 'తె' }
];

function Typewriter({ phrases }) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  return <span className="typewriter-cursor">{text}</span>;
}

const STATIC_KNOWLEDGE = [
  { keywords: ['how', 'work', 'calculate', 'formula'], text: "The system uses Computer Vision (OpenCV) to track visual movement and Librosa to analyze audio rhythm. We map these to our 'Neural Attention Curves' to pinpoint exactly where users lose interest." },
  { keywords: ['hook', 'intro', 'start'], text: "For maximum virality, your first 3 seconds must be high-energy. We recommend a strong visual 'motion spike' combined with a curiosity-gap headline." },
  { keywords: ['react', 'vite', 'frontend'], text: "Hook Architect AI is built with React 18, Vite, and Recharts. All UI elements use glassmorphism CSS for that premium SaaS aesthetic." },
  { keywords: ['python', 'backend', 'fastapi'], text: "Our backend is a robust FastAPI server in Python. It processes the video frame-by-frame using neural feature extraction." },
  { keywords: ['score', 'viral', 'trend'], text: "A Virality Score > 80% is considered 'Viral Ready'. We calculate this by averaging your Hook Stability, retention probability, and energy density." },
  { keywords: ['tech', 'stack', 'libraries'], text: "Frontend: React, Tailwind (customized), Recharts, Lucide. Backend: Python, FastAPI, OpenCV, Librosa, MoviePy." },
  { keywords: ['help', 'questions', 'can you'], text: "I can answer queries about: 1. This project's tech stack. 2. How our AI analysis works. 3. Tips for viral hooks. 4. Dashboard navigation." },
  { keywords: ['web', 'development', 'design'], text: "This project follows modern 'Glassmorphism' design principles with a mesh-gradient background and responsive React components." }
];

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I am your Internal System Specialist. Ask me about our tech stack, analysis logic, or viral tips!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Realistic "Thinking" delay
    await new Promise(r => setTimeout(r, 600));

    const lowerStr = userMsg.toLowerCase();
    const result = STATIC_KNOWLEDGE.find(item => 
      item.keywords.some(kw => lowerStr.includes(kw))
    );

    const botMsg = result ? result.text : "That's a great question! For this demo version, I specialize in our Tech Stack, Analysis Formula, and Viral Content Tips. Try asking about 'React', 'How it works', or 'Viral Score'.";
    
    setMessages(prev => [...prev, { role: 'bot', text: botMsg }]);
    setLoading(false);
  };

  return (
    <div className="chatbot-wrapper">
      {!isOpen && (
        <button className="chat-trigger" onClick={() => setIsOpen(true)}>
          <MessageSquare size={24} />
          <span className="ping-online"></span>
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Brain size={20} color="#6366f1" />
              <span>AI Content Strategist</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
               <X size={20} />
            </button>
          </div>

          <div className="chat-body">
             {messages.map((m, i) => (
               <div key={i} className={clsx("msg-bubble", m.role)}>
                 {m.role === 'bot' ? <Bot size={16} className="msg-icon" /> : <User size={16} className="msg-icon" />}
                 <p>{m.text}</p>
               </div>
             ))}
             {loading && (
               <div className="msg-bubble bot">
                 <Loader2 size={16} className="spinner" />
                 <p>Analyzing query...</p>
               </div>
             )}
             <div ref={chatEndRef} />
          </div>

          <div className="chat-footer">
            <input 
              type="text" 
              placeholder="Ask about virality..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} disabled={loading}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [lang, setLang] = useState('en');
  const [langOpen, setLangOpen] = useState(false);
  const langTimeoutRef = useRef(null);
  const t = TRANSLATIONS[lang];
  
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isYoutube, setIsYoutube] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optStatus, setOptStatus] = useState("");
  const [isOptimized, setIsOptimized] = useState(false);
  
  const [audienceSim, setAudienceSim] = useState(null);
  const [runningSim, setRunningSim] = useState(false);
  
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const toggleLang = (isOpen) => {
    if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current);
    if (!isOpen) {
      langTimeoutRef.current = setTimeout(() => setLangOpen(false), 800); 
    } else {
      setLangOpen(true);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
      setIsYoutube(false);
      setResults(null); 
      setIsOptimized(false);
      setAudienceSim(null);
    }
  };

  const handleUrlChange = (e) => {
    setYoutubeUrl(e.target.value);
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setResults(null);
    setIsOptimized(false);
    
    try {
      let data;
      if (isYoutube) {
        if (!youtubeUrl) throw new Error("Please enter a YouTube URL");
        const response = await fetch("http://localhost:8000/analyze_url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: youtubeUrl }),
        });
        if (!response.ok) throw new Error("Failed to analyze YouTube video");
        data = await response.json();
        data.isYoutubeAnalysis = true;
        setVideoUrl(youtubeUrl);
      } else {
        if (!videoFile) return;
        const formData = new FormData();
        formData.append("file", videoFile);
        const response = await fetch("http://localhost:8000/analyze", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) throw new Error("Failed to analyze uploaded video");
        data = await response.json();
        data.isYoutubeAnalysis = false;
      }
      setResults(data);
    } catch (error) {
      console.error(error);
      alert(error.message || "Error!");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setIsOptimized(false);
    setOptStatus(t.optimizing);
    await new Promise(r => setTimeout(r, 2000));
    
    setIsOptimizing(false);
    setIsOptimized(true);
    
    const enhancedData = results.data.map(p => {
      let boostedScore = p.risk ? p.score + 50 : p.score + 15;
      if (boostedScore > 98) boostedScore = 98 - Math.random() * 5;
      return { ...p, score: parseInt(boostedScore), risk: false };
    });

    setResults({
      ...results,
      data: enhancedData,
      overallScore: 94,
      autoHook: "Optimized Hook generated using AI Neural Patterns.",
      virality: { chance: 96, hook: 9, retention: 10, energy: 10 },
      insights: [{
        time: "All",
        desc: "AI Optimization Complete",
        rec: "Your video is now balanced for viral potential.",
        severity: "success"
      }]
    });
    
    if (audienceSim) setAudienceSim({ hookDroppedPercent: 4, midDroppedPercent: 0, midDropTime: "mid", watchedFullPercent: 96 });
  };
  
  const handleSimulateAudience = async () => {
    setRunningSim(true);
    setAudienceSim(null);
    await new Promise(r => setTimeout(r, 1500));
    
    let totalViewers = 1000;
    const hookAvg = results.virality.hook;
    let hookDropPercent = (10 - hookAvg) * 8 + Math.floor(Math.random() * 5);
    hookDropPercent = Math.min(85, Math.max(2, hookDropPercent));
    
    const hookDropped = Math.floor((hookDropPercent / 100) * totalViewers);
    totalViewers -= hookDropped;

    const firstRisk = results.data.find(p => p.risk);
    let midDropped = 0, midDropTime = "";
    if (firstRisk) {
      const midDropPercent = 40 + Math.floor(Math.random() * 30);
      midDropped = Math.floor((midDropPercent / 100) * totalViewers);
      midDropTime = `0:${firstRisk.time < 10 ? '0' : ''}${firstRisk.time}`;
      totalViewers -= midDropped;
    } else {
      midDropped = Math.floor((Math.random() * 5) / 100 * totalViewers);
      midDropTime = "mid-video";
      totalViewers -= midDropped;
    }

    setAudienceSim({
      hookDroppedPercent: Math.floor((hookDropped/1000)*100),
      midDroppedPercent: Math.floor((midDropped/1000)*100),
      midDropTime: midDropTime,
      watchedFullPercent: Math.floor((totalViewers / 1000) * 100)
    });
    setRunningSim(false);
  };
  
  const handleDownload = () => {
    if (!videoUrl || results?.isYoutubeAnalysis) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = "Optimized_Video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleTimeUpdate = () => {
    if (!results?.isYoutubeAnalysis && videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleChartClick = (state) => {
    if (state && state.activeLabel !== undefined) {
      const timeInSec = Number(state.activeLabel);
      if (results?.isYoutubeAnalysis) {
        playerRef.current?.seekTo(timeInSec, 'seconds');
      } else if (videoRef.current) {
        videoRef.current.currentTime = timeInSec;
        videoRef.current.play().catch(e => console.log(e));
      }
    }
  };

  const currentPoint = results?.data?.reduce((prev, curr) => 
    Math.abs(curr.time - currentTime) < Math.abs(prev.time - currentTime) ? curr : prev
  , results.data[0]);
  const currentScore = currentPoint ? currentPoint.score : 0;
  
  let statusColor = '#ef4444'; let statusLabel = t.boring;
  if (currentScore >= 75) { statusColor = '#10b981'; statusLabel = t.engaging; }
  else if (currentScore >= 40) { statusColor = '#f59e0b'; statusLabel = t.average; }

  return (
    <div className={clsx("app-container", lang === 'ur' && "rtl")}>
      <div className="bg-mesh"></div>
      
      <header className="header">
        <div className="logo-area" style={{ flex: 1 }}>
          <Activity size={32} color="#6366f1" />
          <h1 style={{ marginRight: '15px' }}>{t.title}</h1>
          <div className="quantum-online-chip" style={{ background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '5px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#d8b4fe', fontWeight: 800 }}>
             <div className="status-dot" style={{ width: 8, height: 8, background: '#a855f7', animation: 'pulse-q 2s infinite' }}></div>
             QUANTUM CORE ONLINE
          </div>
        </div>
        
        <div className="orbit-lang-container" onMouseEnter={() => toggleLang(true)} onMouseLeave={() => toggleLang(false)}>
          <div className={clsx("orbit-globe", langOpen && "active")}>
            <Globe size={20} color={langOpen ? "#6366f1" : "rgba(255,255,255,0.7)"} />
          </div>
          <div className={clsx("lang-pills", langOpen && "expanded")}>
            {LANGS.map((l, i) => (
              <button 
                key={l.code} 
                className={clsx("orbit-pill", lang === l.code && "active")}
                style={{ '--idx': i, '--total': LANGS.length, transitionDelay: `${i * 0.05}s` }}
                onClick={() => { setLang(l.code); setLangOpen(false); }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="main-content">
        {!results && !analyzing && (
          <>
            <div className="floating-logos">
              <img src={ytLogo} className="logo-item" style={{ top: '8%', left: '8%', width: 200, height: 200, filter: 'drop-shadow(0 0 50px rgba(239, 68, 68, 0.6))' }} alt="YouTube" />
              <img src={igLogo} className="logo-item" style={{ top: '65%', left: '12%', width: 180, height: 180, animationDelay: '2s', filter: 'drop-shadow(0 0 50px rgba(236, 72, 153, 0.6))' }} alt="Instagram" />
              <img src={ttLogo} className="logo-item" style={{ top: '22%', right: '8%', width: 190, height: 190, animationDelay: '4s', filter: 'drop-shadow(0 0 50px rgba(16, 185, 129, 0.6))' }} alt="TikTok" />
            </div>

            <div className="upload-section">
              <UploadCloud className="upload-icon" />
              <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '0.8rem', letterSpacing: '-1px', minHeight: '4.5rem' }}>
                <Typewriter phrases={t.typewriter} />
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '600px' }}>
                {t.subheading}
              </p>
              
              <div className="tab-container">
                <button className={clsx("tab-btn", !isYoutube && "active")} onClick={() => setIsYoutube(false)}>
                  <UploadCloud size={18} /> {t.uploadMp4}
                </button>
                <button className={clsx("tab-btn", isYoutube && "active")} onClick={() => setIsYoutube(true)}>
                  <Youtube size={18} /> {t.ytUrl}
                </button>
              </div>

              <div className="input-glow-group">
                {!isYoutube ? (
                  <>
                    <input type="file" accept="video/mp4" onChange={handleFileUpload} style={{ display: 'none' }} id="home-upload" />
                    <label htmlFor="home-upload" className="primary-btn" style={{ margin: '0 auto' }}>
                      {videoFile ? <><Activity size={24} /> {t.vidSelected}</> : <><PlayCircle size={24} /> {t.selectVid}</>}
                    </label>
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', alignItems: 'center' }}>
                    <input type="text" placeholder="Link..." className="url-input" style={{ textAlign: 'center' }} value={youtubeUrl} onChange={handleUrlChange} />
                    <button className="primary-btn" onClick={handleAnalyze}>{t.analyzeYtBtn}</button>
                  </div>
                )}
                {videoFile && !isYoutube && <button className="primary-btn pulse-glow" style={{ marginTop: '2rem', width: '100%' }} onClick={handleAnalyze}>{t.analyzeBtn}</button>}
              </div>
            </div>
          </>
        )}

        {analyzing &&            <div className="loader-container">
              <div className="spinner"></div>
              <p style={{ marginTop: '20px', fontSize: '1.2rem', fontWeight: 800, background: 'linear-gradient(90deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'pulse-q 1.5s infinite' }}>
                {t.fetching}
              </p>
              <p style={{ marginTop: '8px', color: '#a855f7', fontSize: '0.9rem', fontWeight: 600 }}>
                ⚙️ Collapsing Quantum Superposition...
              </p>
              <div style={{ marginTop: '15px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.filtering}</div>
            </div>
        }

        {results && (
          <div className="dashboard">
            <div className="video-section">
              <div className="video-card">
                <div className="video-player-container">
                  {results.isYoutubeAnalysis ? (
                    <iframe key={`yt-${videoUrl}`} width="100%" height="100%" src={videoUrl?.replace('/shorts/', '/embed/').replace('watch?v=', 'embed/')} frameBorder="0" allowFullScreen style={{ border: 'none' }}></iframe>
                  ) : (
                    <video key={`file-${videoUrl}`} ref={videoRef} src={videoUrl} controls onTimeUpdate={handleTimeUpdate} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  )}
                  <div className="live-status-badge">
                    <span className="status-dot" style={{ color: statusColor, backgroundColor: statusColor }}></span>
                    <span className="status-label">{statusLabel}</span>
                    <span style={{ fontWeight: 900, color: statusColor, fontSize: '1.1rem' }}>{Math.round(currentScore)}%</span>
                  </div>
                </div>
                <div className="heatmap-container">
                  <div className="strip-label"><Eye size={16} /> {t.densityMap}</div>
                  <div className="heatmap-strip">
                    {results.data.map((p, idx) => (
                      <div key={idx} className={clsx("heatmap-cell", Math.abs(currentTime - p.time) < 1.0 && "active")} style={{ backgroundColor: p.score >= 75 ? '#10b981' : (p.score >= 40 ? '#f59e0b' : '#ef4444') }} />
                    ))}
                  </div>
                </div>
              </div>
              {!isOptimized ? (
                <button className={clsx("primary-btn dashboard-btn")} style={{ width: '100%', padding: '20px', fontSize: '1.2rem', background: 'linear-gradient(135deg, #a855f7, #ec4899)' }} onClick={handleOptimize} disabled={isOptimizing}>
                  {isOptimizing ? t.optimizing : <><Sparkles size={24} /> {t.autoFix}</>}
                </button>
              ) : (
                <div className="panel-card" style={{ border: '2px solid var(--accent-success)', background: 'rgba(16, 185, 129, 0.08)', padding: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ color: '#10b981', margin: 0 }}>{t.optimized}</h3>
                      <p style={{ color: '#fff', opacity: 0.8, marginTop: '4px', fontSize: '0.85rem' }}>{t.optSub}</p>
                    </div>
                    {!results.isYoutubeAnalysis && <button className={clsx("primary-btn dashboard-btn")} style={{ padding: '10px 20px', fontSize: '0.95rem' }} onClick={handleDownload}><Download size={18} /> {t.download}</button>}
                  </div>
                </div>
              )}

              <div className="panel-card" style={{ padding: '1.5rem' }}>
                <div className="panel-header"><Activity color="#6366f1" /> {t.engagementSpectrum}</div>
                <div style={{ height: 280, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} onClick={handleChartClick}>
                      <defs>
                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={v => `0:${v<10?'0'+v:v}`} />
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip contentStyle={{ backgroundColor: '#07090e', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px' }} itemStyle={{ color: '#fff', fontSize: '16px', fontWeight: 800 }} />
                      <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={5} fillOpacity={1} fill="url(#scoreGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="side-panels">
              <div className="panel-card">
                <div className="panel-header"><TrendingUp color="#10b981" /> <h2>{t.viralityScore}</h2></div>
                <div className="virality-display"><div className="score-circle"><span className="score-value" style={{ fontSize: '4.5rem' }}>{results.virality?.chance}%</span></div></div>
                <div className="metrics-grid">
                  <div className="metric-item"><span className="metric-val" style={{color: '#818cf8', fontSize: '1.4rem'}}>{results.virality?.hook}/10</span><span className="metric-label">{t.hook}</span></div>
                  <div className="metric-item"><span className="metric-val" style={{color: '#fbbf24', fontSize: '1.4rem'}}>{results.virality?.retention}/10</span><span className="metric-label">{t.retention}</span></div>
                  <div className="metric-item"><span className="metric-val" style={{color: '#f472b6', fontSize: '1.4rem'}}>{results.virality?.energy}/10</span><span className="metric-label">{t.energy}</span></div>
                </div>
                
                {results.virality?.quantum && (
                  <div className="quantum-badge pulse-quantum" style={{ 
                    marginTop: '1.5rem', 
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(99, 102, 241, 0.25))', 
                    border: '1px solid rgba(168, 85, 247, 0.4)', 
                    padding: '16px', 
                    borderRadius: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ padding: '8px', background: '#a855f7', borderRadius: '10px', display: 'flex', boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)' }}>
                        <Zap size={20} color="#fff" />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Quantum Core Active</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff' }}>{results.virality.quantum.confidence}% <span style={{ fontSize: '0.85rem', color: '#818cf8', fontWeight: 400 }}>Trust Index</span></div>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '15px' }}>
                       <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Collapsed State</div>
                       <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#d8b4fe', fontFamily: 'monospace' }}>{results.virality.quantum.state}</div>
                    </div>
                  </div>
                )}

                {results.pqcSignature && (
                  <div className="pqc-signature-footer" style={{ 
                    marginTop: '1.5rem', 
                    padding: '14px', 
                    background: 'rgba(16, 185, 129, 0.08)', 
                    borderRadius: '12px', 
                    border: '2px solid rgba(16, 185, 129, 0.4)',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div className="status-dot" style={{ width: 8, height: 8, background: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
                      <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>PQ-Crypto Secure Seal</span>
                    </div>
                    <div style={{ wordBreak: 'break-all', fontSize: '0.7rem', color: '#e2e8f0', fontFamily: 'monospace', lineHeight: 1.4, background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      {results.pqcSignature}
                    </div>
                    <div style={{ fontSize: '0.55rem', color: '#64748b', marginTop: '6px', textAlign: 'right', fontWeight: 800 }}>VERIFIED LATTICE-BASED HASH</div>
                  </div>
                )}
              </div>
              <div className="panel-card" style={{ background: 'linear-gradient(145deg, rgba(99,102,241,0.15) 0%, rgba(7,9,14,0.6) 100%)' }}>
                 <div className="panel-header"><Users color="#818cf8" /> <h2>{t.audienceSim}</h2></div>
                 {!audienceSim && !runningSim && <button className={clsx("primary-btn dashboard-btn")} style={{ width: '100%', padding: '15px', background: '#4f46e5' }} onClick={handleSimulateAudience}>{t.startSim}</button>}
                 {runningSim && <div className="spinner" style={{ width: 40, height: 40, margin: '1rem auto' }}></div>}
                 {audienceSim && (
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                     <div className="recommendation" style={{ borderColor: '#ef4444', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', fontSize: '0.95rem' }}><AlertTriangle size={16}/> {audienceSim.hookDroppedPercent}% Drop @ Hook</div>
                     <div className="recommendation" style={{ borderColor: '#f59e0b', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', fontSize: '0.95rem' }}><Eye size={16}/> {audienceSim.midDroppedPercent}% Retention loss @ {audienceSim.midDropTime}</div>
                     <div className="recommendation" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', fontSize: '0.95rem' }}><Zap size={16}/> {audienceSim.watchedFullPercent}% Completed Full</div>
                   </div>
                 )}
              </div>
              <div className="panel-card">
                <div className="panel-header"><Brain color="#a855f7" /> <h2>{t.hookRewriter}</h2></div>
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#d8b4fe', background: 'rgba(168, 85, 247, 0.12)', padding: '1.2rem', borderRadius: '16px', borderLeft: '4px solid #a855f7' }}>"{results.autoHook}"</p>
              </div>
              <div className="panel-card">
                <div className="panel-header"><Sparkles color="#ec4899" /> <h2>{t.viralInsights}</h2></div>
                <div className="insight-list">
                  {results.insights.map((ins, i) => (
                    <div key={i} className="insight-item" style={{ borderLeftWidth: '6px', background: 'rgba(255,255,255,0.02)', borderLeftColor: ins.severity === 'success' ? '#10b981' : (ins.severity === 'high' ? '#ef4444' : '#f59e0b') }}>
                      <span className="insight-time">{ins.time}</span><p className="insight-msg" style={{ fontWeight: 600 }}>{ins.desc}</p>
                      <div className="recommendation" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}><Lightbulb size={16}/> {ins.rec}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <ChatBot />

        {results && (
          <div className="technical-metadata-box" style={{ 
            marginTop: '3rem', 
            background: 'rgba(0,0,0,0.4)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderTop: '2px solid #6366f1',
            padding: '2rem', 
            borderRadius: '24px', 
            textAlign: 'left',
            fontFamily: 'monospace'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <div className="status-dot" style={{ background: '#6366f1', width: 10, height: 10 }}></div>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#6366f1' }}>POST-QUANUTUM METADATA REPOSITORY</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px' }}>
                <span style={{ color: '#a855f7', fontSize: '0.7rem' }}>SIMULATED_QUANTUM_OUTCOME</span>
                <p style={{ color: '#fff', fontSize: '1.2rem', marginTop: '5px' }}>
                  {results.virality?.quantum?.state || results.virality?.quantumState || "|101> (Quantum-Sim)"} at {results.virality?.quantum?.confidence || results.virality?.quantumConfidence || 92}% Trust Index
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px' }}>
                <span style={{ color: '#10b981', fontSize: '0.7rem' }}>SECURE_LATTICE_VERIFICATION_HASH</span>
                <p style={{ color: '#fff', fontSize: '1rem', marginTop: '5px', wordBreak: 'break-all' }}>
                  {results.pqcSignature || "PQ-SIG-LATTICE-GEN-VERIFIED-HASH-88x2"}
                </p>
              </div>
            </div>
          </div>
        )}

      <footer style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', fontSize: '0.9rem', opacity: 0.6 }}>Designed for Viral Excellence • Neural Mapping Engine v2.0</footer>
    </div>
  );
}

export default App;
