import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Send, 
  Tv, 
  Activity, 
  Video, 
  Smartphone, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Play, 
  ExternalLink, 
  ShieldCheck, 
  Volume2, 
  VolumeX,
  Flame,
  Star,
  Zap,
  Award
} from 'lucide-react';
import { translations } from './translations';

export default function App() {
  // Lang State: 'mm' (Default) or 'en'
  const [lang, setLang] = useState<'mm' | 'en'>('mm');

  // Dark/Light Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Phone simulator active tab: 'live' | 'scores' | 'highlights'
  const [phoneTab, setPhoneTab] = useState<'live' | 'scores' | 'highlights'>('live');
  // Phone simulation states
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [simulatedScore, setSimulatedScore] = useState({ home: 2, away: 1 });
  const [simulatedTime, setSimulatedTime] = useState(82);

  // Helper wrapper for safe localStorage accesses in iframe
  const getSafeLocalStorage = (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  };

  const setSafeLocalStorage = (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // safe fallback
    }
  };

  const t = translations[lang];

  // Initialize theme and system preference on mount
  useEffect(() => {
    const savedTheme = getSafeLocalStorage('onside-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // System default
      let systemPrefersDark = true;
      try {
        systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch (e) {
        // Safe fallback
      }
      const initialTheme = systemPrefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }
  }, []);

  const applyTheme = (newTheme: 'dark' | 'light') => {
    try {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      // safe fallback
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setSafeLocalStorage('onside-theme', nextTheme);
    applyTheme(nextTheme);
  };

  // Simulate scoring tick inside mockup
  useEffect(() => {
    const timer = setInterval(() => {
      // Tick simulated time
      setSimulatedTime((prev) => (prev >= 90 ? 82 : prev + 1));
      
      // Occasionally increase score
      if (Math.random() > 0.85) {
        setSimulatedScore((prev) => {
          const isHome = Math.random() > 0.5;
          return {
            home: isHome ? prev.home + 1 : prev.home,
            away: !isHome ? prev.away + 1 : prev.away
          };
        });
      }
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  // Comments for the simulated Live Stream
  const simulatedChats = [
    { user: 'Ko Zaw 🇲🇲', text: 'မြန်မာအသင်း ကောင်းတယ်ဗျာ!', time: '1s ago' },
    { user: 'Thura_FC', text: 'Onside Live က ကြည့်ရတာ တကယ်ကြည်လင်တယ်', time: '5s ago' },
    { user: 'Aung Kyaw', text: 'Goooallll!!! Goaaal!', time: '12s ago' },
    { user: 'Mandalay_Fan', text: 'ဆာဗာ အရမ်းငြိမ်တယ် လုံးဝမလိုင်းကျဘူး', time: '18s ago' },
    { user: 'FootballLover', text: 'Tonight is an amazing match ⚽🔥', time: '25s ago' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-900 text-slate-50 sporty-grid' 
        : 'bg-slate-50 text-slate-900 sporty-grid'
    }`}>
      
      {/* 2. Top Navigation Bar (Contains Language Switch in Top-Right and Sticky UI Theme controls) */}
      <header className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        theme === 'dark' 
          ? 'bg-slate-900/80 border-slate-850 backdrop-blur-md' 
          : 'bg-white/80 border-slate-200 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo element with interactive pulse */}
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white glow-btn shadow-lg shadow-emerald-500/20">
              <span className="text-xl font-bold font-display">OS</span>
            </div>
            <div>
              <span className="text-xl font-extrabold font-display tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                ONSIDE LIVE
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-emerald-500 font-bold uppercase">
                Fans Portal
              </span>
            </div>
          </div>

          {/* Controls Hub (Language Selection + Theme Switching) */}
          <div className="flex items-center space-x-3">
            
            {/* Language Selection controls */}
            <div className={`flex items-center p-1 rounded-xl border ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <button 
                id="lang-btn-mm"
                onClick={() => setLang('mm')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cubic-bezier transition-all ${
                  lang === 'mm' 
                    ? 'bg-emerald-500 text-white shadow-sm' 
                    : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇲🇲</span>
                <span className="hidden sm:inline">မြန်မာ</span>
              </button>
              
              <button 
                id="lang-btn-en"
                onClick={() => setLang('en')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cubic-bezier transition-all ${
                  lang === 'en' 
                    ? 'bg-emerald-500 text-white shadow-sm' 
                    : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🇺🇸</span>
                <span className="hidden sm:inline">English</span>
              </button>
            </div>

            {/* Dark/Light Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700 hover:text-amber-300' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-sm'
              }`}
            >
              {theme === 'dark' ? (
                <div className="flex items-center space-x-1">
                  <Sun className="w-4 h-4" />
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <Moon className="w-4 h-4" />
                </div>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Main Single Page Layout Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-24">

        {/* 1. HERO SECTION (Includes Live interactive Mockup device next to it!) */}
        <section id="hero-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content Grid */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Live Indicator Promo badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              <span>LIVE MATCHES TODAY</span>
            </div>

            {/* Giant Title (Targeting Burmese/English Fans) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-tight tracking-tight">
              {t.heroTitle}
            </h1>

            {/* Subtext description */}
            <p className={`text-base sm:text-lg max-w-xl mx-auto lg:mx-0 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t.heroSubtitle}
            </p>

            {/* Dynamic bullet items requested in user specifications */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 py-2">
              <div className={`flex items-center space-x-2.5 px-4 py-2 rounded-xl border ${
                theme === 'dark' ? 'bg-slate-800/60 border-slate-700/80 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700'
              }`}>
                <span className="text-lg">⚽</span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide">{t.badgeLive}</span>
              </div>

              <div className={`flex items-center space-x-2.5 px-4 py-2 rounded-xl border ${
                theme === 'dark' ? 'bg-slate-800/60 border-slate-700/80 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700'
              }`}>
                <span className="text-lg">📊</span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide">{t.badgeScores}</span>
              </div>

              <div className={`flex items-center space-x-2.5 px-4 py-2 rounded-xl border ${
                theme === 'dark' ? 'bg-slate-800/60 border-slate-700/80 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700'
              }`}>
                <span className="text-lg">🎥</span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide">{t.badgeHighlights}</span>
              </div>
            </div>

            {/* Action buttons defined in requirement sheet */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4">
              
              {/* Google Drive Download Button */}
              <a 
                id="drive-download-btn"
                href="https://drive.google.com/file/d/17ahlXRXle3Fj3s6QLJiqBXFJbVi4urgQ/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center space-x-3 px-6 py-4.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:transform active:scale-95 text-white font-bold text-base shadow-lg shadow-blue-600/35 transition-all cursor-pointer border border-blue-500/10"
              >
                <Download className="w-5 h-5 animate-bounce" />
                <span>{t.downloadDrive}</span>
              </a>

              {/* Mediafire Download Button */}
              <a 
                id="mediafire-download-btn"
                href="https://www.mediafire.com/file/jhk6sq8erody32l/onside-v2.apk/file"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center space-x-3 px-6 py-4.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:transform active:scale-95 text-white font-bold text-base shadow-lg shadow-emerald-500/35 transition-all cursor-pointer border border-emerald-400/10"
              >
                <Download className="w-5 h-5" />
                <span>{t.downloadMediafire}</span>
              </a>

              {/* Secondary Join Telegram button */}
              <a 
                id="hero-telegram-link"
                href="https://t.me/ballpweapp"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto flex items-center justify-center space-x-2.5 px-6 py-4.5 rounded-2xl font-bold text-base transition-all border ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-slate-50 hover:bg-slate-700/80'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                }`}
              >
                <Send className="w-4.5 h-4.5 text-[#229ED9]" />
                <span>{t.joinTelegram}</span>
              </a>

            </div>

            {/* Live Counter/Social Proof element */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-900 flex flex-wrap justify-between sm:justify-start gap-x-8 gap-y-4 text-center sm:text-left">
              <div>
                <span className="block text-2xl font-extrabold font-display text-emerald-500">500K+</span>
                <span className="text-xs text-slate-400">{t.statsDownloads}</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold font-display text-emerald-500">120K+</span>
                <span className="text-xs text-slate-400">{t.statsActiveUsers}</span>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <span className="block text-2xl font-extrabold font-display text-emerald-500 flex items-center space-x-1">
                  <span>4.9</span>
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse" />
                </span>
                <span className="text-xs text-slate-400">{t.statsRating}</span>
              </div>
            </div>

          </div>

          {/* Hero Right: Highly Polished Interactive CSS App Phone Simulator */}
          <div className="lg:col-span-5 flex justify-center">
            
            <div className={`relative max-w-[310px] w-full aspect-[9/18.5] rounded-[2.8rem] border-8 p-3.5 shadow-2xl transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-slate-950 border-slate-800 shadow-emerald-500/5' 
                : 'bg-slate-900 border-slate-700 shadow-slate-400/20'
            }`}>
              
              {/* Speaker notch */}
              <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-8 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Inner screen content */}
              <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-slate-950 relative flex flex-col pt-4">
                
                {/* Fake Phone Status Bar */}
                <div className="h-6 flex items-center justify-between px-4 text-[10px] font-mono font-medium text-slate-400/95 z-10 select-none">
                  <span>ONSIDE</span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                    <span>09:41</span>
                  </span>
                </div>

                {/* Simulated Header inside Phone mockup */}
                <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">
                      ⚽
                    </div>
                    <span className="text-xs font-black font-display tracking-tight text-white uppercase">
                      Onside Live
                    </span>
                  </div>
                  
                  {/* Glowing signal live now */}
                  <div className="flex items-center space-x-1 bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded text-[8px] font-bold">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce" />
                    <span>{t.mockLiveNow}</span>
                  </div>
                </div>

                {/* Sub-Navigation internal tabs for phone UI preview */}
                <div className="grid grid-cols-3 border-b border-slate-900 p-1 text-[10px] bg-slate-950">
                  <button 
                    onClick={() => setPhoneTab('live')}
                    className={`py-1.5 rounded-lg text-center font-bold tracking-tight transition-all duration-200 ${
                      phoneTab === 'live' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    📺 Live Stream
                  </button>
                  <button 
                    onClick={() => setPhoneTab('scores')}
                    className={`py-1.5 rounded-lg text-center font-bold tracking-tight transition-all duration-200 ${
                      phoneTab === 'scores' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    📊 Live Scores
                  </button>
                  <button 
                    onClick={() => setPhoneTab('highlights')}
                    className={`py-1.5 rounded-lg text-center font-bold tracking-tight transition-all duration-200 ${
                      phoneTab === 'highlights' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🎥 Highlights
                  </button>
                </div>

                {/* Dynamic Content Frame */}
                <div className="flex-1 overflow-y-auto p-2.5 space-y-3.5 select-none text-left">
                  
                  {/* Tab 1: Live Streaming video preview simulator */}
                  {phoneTab === 'live' && (
                    <div className="space-y-3">
                      
                      {/* Video Player Mockup Container */}
                      <div className="relative aspect-video rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-center items-center">
                        
                        {/* Interactive Play Toggle */}
                        {isPlayingDemo ? (
                          <div className="absolute inset-0 flex flex-col justify-between p-2">
                            {/* Score banner inside video layer */}
                            <div className="flex justify-between items-center bg-black/60 backdrop-blur-sm p-1 px-2 rounded text-[10px] text-white">
                              <span className="font-semibold">{t.mockLeague}</span>
                              <span className="font-bold text-red-400 flex items-center space-x-1">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                                <span>{simulatedTime}'</span>
                              </span>
                            </div>

                            {/* Football court visual loop simulation (simple pure CSS animations) */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-green-950 flex flex-col justify-center items-center -z-10 opacity-75">
                              <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                              </div>
                              <div className="text-[9px] text-white/40 mt-1 uppercase font-mono tracking-widest">Active Stream Signal</div>
                            </div>

                            {/* Playback Controls widget overlay */}
                            <div className="flex items-center justify-between mt-auto">
                              <button 
                                onClick={(e) => { e.stopPropagation(); setIsPlayingDemo(false); }}
                                className="p-1 rounded bg-black/40 text-white hover:bg-black/60"
                              >
                                <span className="text-xs">⏸</span>
                              </button>
                              
                              <button 
                                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                                className="p-1 rounded bg-black/40 text-white hover:bg-black/60"
                              >
                                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-300" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-3 space-y-2">
                            <button 
                              onClick={() => { setIsPlayingDemo(true); }}
                              className="w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
                            >
                              <Play className="w-5 h-5 fill-white ml-0.5" />
                            </button>
                            <p className="text-[10px] font-bold text-emerald-400" id="play-demo-text">
                              {lang === 'mm' ? 'တိုက်ရိုက်ပွဲကြည့်ရန် နှိပ်ပါ' : 'Tap to Play Live Demo'}
                            </p>
                            <p className="text-[8px] text-slate-500">Premium HD Stream (No Ads)</p>
                          </div>
                        )}

                        <div className="absolute top-2 right-2 flex space-x-1 bg-black/50 p-1 rounded text-[8px] text-slate-300">
                          <span>17.2K {t.mockViews}</span>
                        </div>
                      </div>

                      {/* Simulated Game Title details */}
                      <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400 font-semibold uppercase">
                          <span>Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                          <span className="text-emerald-400">Match 34</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-100 font-bold">
                          <span>Manchester United</span>
                          <span className="text-[11px] text-slate-400 font-mono">VS</span>
                          <span>Liverpool</span>
                        </div>
                        <div className="pt-1.5 flex items-center justify-between border-t border-slate-800/80">
                          <span className="text-[10px] text-slate-400 font-medium">Server Status: <strong className="text-emerald-400 font-bold">Excellent</strong></span>
                          <span className="text-[10px] text-slate-400 text-xs text-red-400 font-bold animate-pulse">● LIVE</span>
                        </div>
                      </div>

                      {/* Mini Live Chat simulator underneath stream */}
                      <div className="space-y-1.5 pt-0.5">
                        <span className="text-[9px] font-bold tracking-wider text-slate-500 uppercase block">Interactive Fan Chat</span>
                        <div className="space-y-1 bg-slate-900/40 p-1.5 rounded-lg max-h-[100px] overflow-hidden">
                          {simulatedChats.map((chat, idx) => (
                            <div key={idx} className="text-[8.5px] leading-tight flex items-start space-x-1 border-b border-slate-950/20 pb-0.5">
                              <span className="font-extrabold text-[#229ED9] shrink-0">{chat.user}:</span>
                              <span className="text-slate-300 flex-1">{chat.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Tab 2: Live scoreboard view */}
                  {phoneTab === 'scores' && (
                    <div className="space-y-2.5">
                      
                      {/* Active Live Score Card */}
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-805 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-[9px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-black tracking-widest">{t.mockLiveNow}</span>
                          <span className="text-[9px] text-slate-400 font-mono tracking-wider">Myanmar League 🇲🇲</span>
                        </div>
                        <div className="grid grid-cols-7 items-center text-center">
                          <div className="col-span-2 space-y-1">
                            <div className="w-7 h-7 bg-emerald-500/20 rounded-full flex items-center justify-center text-sm mx-auto">🦁</div>
                            <span className="text-[10px] font-bold text-slate-200 block truncate">Yangon Utd</span>
                          </div>
                          
                          <div className="col-span-3 space-y-0.5">
                            <span className="text-lg font-extrabold text-white tracking-widest leading-none">
                              {simulatedScore.home} - {simulatedScore.away}
                            </span>
                            <span className="block text-[8px] bg-emerald-500/10 text-emerald-400 px-1 rounded-full font-bold w-fit mx-auto">
                              Minute {simulatedTime}'
                            </span>
                          </div>

                          <div className="col-span-2 space-y-1">
                            <div className="w-7 h-7 bg-teal-500/20 rounded-full flex items-center justify-center text-sm mx-auto">🐯</div>
                            <span className="text-[10px] font-bold text-slate-200 block truncate">Shan Utd</span>
                          </div>
                        </div>
                      </div>

                      {/* Scheduled or finished scoreboard lists */}
                      <span className="text-[9px] font-bold tracking-wider text-slate-500 uppercase block">Today's Other Fixtures</span>
                      <div className="space-y-1.5">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                          <div className="flex items-center space-x-1 text-[9px]">
                            <span>Chelsea 🔵</span>
                            <span className="text-slate-500">vs</span>
                            <span>Man City 🩵</span>
                          </div>
                          <span className="text-[7.5px] bg-slate-800 text-slate-300 px-1 py-0.5 rounded">FT (2 - 2)</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                          <div className="flex items-center space-x-1 text-[9px]">
                            <span>Real Madrid ⚪</span>
                            <span className="text-slate-500">vs</span>
                            <span>FC Barcelona 🔴</span>
                          </div>
                          <span className="text-[7.5px] bg-slate-800 text-slate-300 px-1 py-0.5 rounded">FT (3 - 1)</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                          <div className="flex items-center space-x-1 text-[9px]">
                            <span>Arsenal 🔴</span>
                            <span className="text-slate-500">vs</span>
                            <span>Tottenham ⚪</span>
                          </div>
                          <span className="text-[7.5px] bg-red-500/10 text-red-400 font-bold px-1 py-0.5 rounded">11:30 PM PM</span>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Tab 3: Match highlights video summaries */}
                  {phoneTab === 'highlights' && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Latest Highlight Clips</span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg bg-slate-900 overflow-hidden border border-slate-800 group cursor-pointer">
                          <div className="aspect-[4/3] relative bg-slate-850 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[8px]">▶</div>
                            <div className="absolute top-1 left-1 bg-black/60 px-1 rounded text-[7px] text-white">4:21</div>
                          </div>
                          <p className="text-[8.5px] font-bold p-1 line-clamp-2 text-slate-200">
                            Man Utd 4 - 3 Liverpool (Extended)
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-900 overflow-hidden border border-slate-800 group cursor-pointer">
                          <div className="aspect-[4/3] relative bg-slate-850 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[8px]">▶</div>
                            <div className="absolute top-1 left-1 bg-black/60 px-1 rounded text-[7px] text-white">3:15</div>
                          </div>
                          <p className="text-[8.5px] font-bold p-1 line-clamp-2 text-slate-200">
                            Myanmar 2 - 1 Thailand (Heroic Goals)
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-900 overflow-hidden border border-slate-800 group cursor-pointer">
                          <div className="aspect-[4/3] relative bg-slate-850 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[8px]">▶</div>
                            <div className="absolute top-1 left-1 bg-black/60 px-1 rounded text-[7px] text-white">8:10</div>
                          </div>
                          <p className="text-[8.5px] font-bold p-1 line-clamp-2 text-slate-200">
                            Chelsea 2 - 2 Man City (All Goals)
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-900 overflow-hidden border border-slate-800 group cursor-pointer">
                          <div className="aspect-[4/3] relative bg-slate-850 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[8px]">▶</div>
                            <div className="absolute top-1 left-1 bg-black/60 px-1 rounded text-[7px] text-white">5:45</div>
                          </div>
                          <p className="text-[8.5px] font-bold p-1 line-clamp-2 text-slate-200">
                            Real Madrid 3 - 1 Barcelona El Clasico
                          </p>
                        </div>
                      </div>

                    </div>
                  )}

                </div>

                {/* Simulated Phone Bottom Home button bar */}
                <div className="mt-auto bg-slate-900 px-3 py-2 flex items-center justify-around border-t border-slate-950/60 rounded-b-[2.1rem]">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <div className="w-16 h-1 bg-slate-700 rounded-full" />
                </div>

              </div>

              {/* Decorative side power buttons */}
              <div className="absolute -left-2.5 top-20 w-1 h-8 bg-slate-800 rounded" />
              <div className="absolute -left-2.5 top-32 w-1.5 h-12 bg-slate-800 rounded" />
              <div className="absolute -right-2.5 top-24 w-1.5 h-14 bg-slate-800 rounded" />
            </div>

          </div>

        </section>

        {/* 4. SIMPLE FEATURES SECTION (Three Cards required with distinct Burmese/English toggle translation schemas) */}
        <section id="features-section" className="space-y-12">
          
          {/* Section heading */}
          <div className="text-center space-y-3.5">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">
              {t.featuresTitle}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              {t.featuresSubtitle}
            </p>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Live Matches */}
            <div className={`p-8 rounded-2xl border transition-all duration-300 hover:transform hover:-translate-y-2 group cursor-pointer flex flex-col items-center text-center ${
              theme === 'dark' 
                ? 'bg-slate-800/80 border-slate-700 hover:border-emerald-500/30' 
                : 'bg-white border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-2xl font-mono mb-6 group-hover:scale-110 transition-transform">
                ⚽
              </div>
              <h3 className="text-xl font-bold font-display tracking-tight mb-3">
                {lang === 'mm' ? 'တိုက်ရိုက်ပွဲစဉ်များ' : 'Live Match'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
                {t.featureLiveDesc}
              </p>
              
              <button 
                onClick={() => setPhoneTab('live')}
                className="mt-6 text-xs text-emerald-400 font-bold group-hover:underline flex items-center space-x-1"
              >
                <span>View Live Demo</span>
                <span>→</span>
              </button>
            </div>

            {/* Card 2: Live Score */}
            <div className={`p-8 rounded-2xl border transition-all duration-300 hover:transform hover:-translate-y-2 group cursor-pointer flex flex-col items-center text-center ${
              theme === 'dark' 
                ? 'bg-slate-800/80 border-slate-700 hover:border-teal-500/30' 
                : 'bg-white border-slate-200 hover:border-teal-300 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center text-2xl font-mono mb-6 group-hover:scale-110 transition-transform">
                📊
              </div>
              <h3 className="text-xl font-bold font-display tracking-tight mb-3">
                {lang === 'mm' ? 'တိုက်ရိုက်ရလဒ်များ' : 'Live Score'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
                {t.featureScoreDesc}
              </p>

              <button 
                onClick={() => setPhoneTab('scores')}
                className="mt-6 text-xs text-teal-400 font-bold group-hover:underline flex items-center space-x-1"
              >
                <span>View Scores Demo</span>
                <span>→</span>
              </button>
            </div>

            {/* Card 3: Highlights */}
            <div className={`p-8 rounded-2xl border transition-all duration-300 hover:transform hover:-translate-y-2 group cursor-pointer flex flex-col items-center text-center ${
              theme === 'dark' 
                ? 'bg-slate-800/80 border-slate-700 hover:border-emerald-500/30' 
                : 'bg-white border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-2xl font-mono mb-6 group-hover:scale-110 transition-transform">
                🎥
              </div>
              <h3 className="text-xl font-bold font-display tracking-tight mb-3">
                {lang === 'mm' ? 'ပွဲအကျဉ်းချုပ်ဗီဒီယိုများ' : 'Highlights'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
                {t.featureHighlightsDesc}
              </p>

              <button 
                onClick={() => setPhoneTab('highlights')}
                className="mt-6 text-xs text-emerald-400 font-bold group-hover:underline flex items-center space-x-1"
              >
                <span>View Videos Demo</span>
                <span>→</span>
              </button>
            </div>

          </div>

        </section>

        {/* 5. DOWNLOAD SECTION (With step-by-step instructions to increase trust and utility) */}
        <section id="download-section" className={`p-8 sm:p-12 rounded-3xl border ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700' 
            : 'bg-gradient-to-br from-emerald-50/40 to-white border-emerald-100 shadow-sm'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                SAFE & SECURE APK (V2.4)
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight">
                {t.downloadTitle}
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {t.downloadDesc}
              </p>

              {/* Security features checklist details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 text-left">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>No Registration / No Ad-ware</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Myanmar Language Content Included</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>VirusTotal 100% Safe Checked</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Ultra-Low Data Mode Enabled</span>
                </div>
              </div>

              {/* Big Green Download button requested in specific specifications */}
              <div className="pt-2 space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  
                  {/* Google Drive Link */}
                  <a 
                    id="direct-drive-download-btn"
                    href="https://drive.google.com/file/d/17ahlXRXle3Fj3s6QLJiqBXFJbVi4urgQ/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-4.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-base shadow-lg shadow-blue-600/35 transition-all cursor-pointer border border-blue-500/10"
                  >
                    <Download className="w-5 h-5 animate-pulse" />
                    <span>{t.downloadDrive}</span>
                  </a>

                  {/* Mediafire Link */}
                  <a 
                    id="direct-mediafire-download-btn"
                    href="https://www.mediafire.com/file/jhk6sq8erody32l/onside-v2.apk/file"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-4.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-base shadow-lg shadow-emerald-500/35 transition-all cursor-pointer border border-emerald-400/10"
                  >
                    <Download className="w-5 h-5" />
                    <span>{t.downloadMediafire}</span>
                  </a>

                </div>
                <span className="block text-[10px] text-slate-500 mt-2 font-mono">
                  File Size: 24.5 MB | MD5 Checked: C32B-983D-48C | Safe Offline Source verified
                </span>
              </div>

            </div>

            {/* APK installation guidance for Burmese users */}
            <div className={`p-6 sm:p-8 rounded-2xl border ${
              theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white/60 border-slate-150'
            }`}>
              <h3 className="text-lg font-bold font-display tracking-tight mb-6 flex items-center space-x-2">
                <span className="text-lg text-emerald-500 font-mono">🔧</span>
                <span>{t.installStepsTitle}</span>
              </h3>

              <div className="space-y-6">
                
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 dark:text-slate-100">{t.step1Title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {t.step1Desc}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 dark:text-slate-100">{t.step2Title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {t.step2Desc}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 dark:text-slate-100">{t.step3Title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {t.step3Desc}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 6. TELEGRAM COMMUNITY (Card with Telegram icon targeting Myanmar Football Fans) */}
        <section id="telegram-community" className="text-center max-w-3xl mx-auto">
          <div className={`p-8 sm:p-12 rounded-3xl border relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
            theme === 'dark' 
              ? 'bg-slate-800/80 border-slate-700 hover:border-blue-500/20' 
              : 'bg-white border-slate-200 shadow-sm hover:shadow-blue-500/5'
          }`}>
            
            {/* Telegram glow layer */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#0088cc]/5 rounded-full filter blur-2xl pointer-events-none" />
            
            <div className="flex flex-col items-center space-y-6">
              
              <div className="w-16 h-16 rounded-full bg-[#0088cc]/10 text-[#0088cc] flex items-center justify-center text-3xl font-mono animate-pulse">
                💬
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-850 dark:text-slate-100">
                  {t.telegramTitle}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
                  {t.telegramDesc}
                </p>
              </div>

              <div>
                <a 
                  id="community-telegram-link"
                  href="https://t.me/ballpweapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 px-10 py-4.5 rounded-2xl bg-[#0088cc] hover:bg-[#0077b5] active:scale-95 text-white font-bold text-base shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <Send className="w-5 h-5 fill-white" />
                  <span>{t.telegramBtn}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <span className="text-xs text-slate-500 font-medium">
                Telegram Link: <strong className="font-bold underline text-slate-400">t.me/ballpweapp</strong>
              </span>

            </div>

          </div>
        </section>

      </main>

      {/* 7. FOOTER */}
      <footer className={`border-t py-12 text-center transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-slate-900 border-slate-850' 
          : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block animate-pulse" />
            <span className="text-sm font-bold font-display tracking-wide uppercase text-slate-300 dark:text-slate-100">
              Onside Live
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-wider font-semibold">
            © 2026 Onside Live • All Rights Reserved.
          </p>
          <p className="text-sm text-emerald-500/90 font-bold tracking-wide mt-2">
            For Myanmar Football Fans ⚽
          </p>
        </div>
      </footer>

    </div>
  );
}
