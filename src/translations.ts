export interface Translation {
  heroTitle: string;
  heroSubtitle: string;
  badgeLive: string;
  badgeScores: string;
  badgeHighlights: string;
  downloadApk: string;
  joinTelegram: string;
  featuresTitle: string;
  featuresSubtitle: string;
  featureLiveTitle: string;
  featureLiveDesc: string;
  featureScoreTitle: string;
  featureScoreDesc: string;
  featureHighlightsTitle: string;
  featureHighlightsDesc: string;
  downloadTitle: string;
  downloadDesc: string;
  installStepsTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  telegramTitle: string;
  telegramDesc: string;
  telegramBtn: string;
  statsActiveUsers: string;
  statsDownloads: string;
  statsRating: string;
  toastDownloading: string;
  toastCompleted: string;
  mockLiveNow: string;
  mockViews: string;
  mockLeague: string;
}

export const translations: Record<'mm' | 'en', Translation> = {
  mm: {
    heroTitle: "ဘောလုံးပွဲ အမြဲကြည့်ဖို့ Onside Live",
    heroSubtitle: "ဘောလုံးပွဲများကို အချိန်မရွေး၊ နေရာမရွေး ကြည့်ရှုနိုင်ပါသည်။",
    badgeLive: "Watch Football Live",
    badgeScores: "Live Scores",
    badgeHighlights: "Match Highlights",
    downloadApk: "Download APK",
    joinTelegram: "Join Telegram",
    featuresTitle: " Onside Live ၏ ထူးခြားချက်များ",
    featuresSubtitle: "အရည်အသွေးမြင့်မားပြီး အသုံးပြုရလွယ်ကူသည့် အကောင်းဆုံးသော ဘောလုံးပွဲကြည့်အက်ပ်",
    featureLiveTitle: "⚽ တိုက်ရိုက်ပွဲစဉ်များ",
    featureLiveDesc: "ဘောလုံးပွဲများကို တိုက်ရိုက်ကြည့်ရှုနိုင်ပါသည်။ HD Quality ဖြင့် အခမဲ့ကြည့်ပါ။",
    featureScoreTitle: "📊 တိုက်ရိုက်ရလဒ်များ",
    featureScoreDesc: "ရလဒ်များကို အချိန်နှင့်တပြေးညီ ကြည့်ရှုနိုင်ပါသည်။ ဂိုးသွင်းသံသတိပေးချက်များပါဝင်သည်။",
    featureHighlightsTitle: "🎥 ပွဲအကျဉ်းချုပ်ဗီဒီယိုများ",
    featureHighlightsDesc: "ပွဲအကျဉ်းချုပ်ဗီဒီယိုများ ကြည့်ရှုနိုင်ပါသည်။ လွတ်သွားသော ဂိုးများကို ပြန်ကြည့်ပါ။",
    downloadTitle: "Onside Live App ကို ရယူပါ",
    downloadDesc: "Onside Live ၏ နောက်ဆုံးဗားရှင်း APK ကို စက္ကန့်ပိုင်းအတွင်း အခမဲ့ ဒေါင်းလုဒ်ရယူလိုက်ပါ။",
    installStepsTitle: "အက်ပ်ထည့်သွင်းနည်း လမ်းညွှန်",
    step1Title: "၁။ APK ဒေါင်းလုဒ်လုပ်ပါ",
    step1Desc: "အပေါ်ရှိ 'Download APK' ခလုတ်ကို နှိပ်ပြီး ဖိုင်ကိုသိမ်းဆည်းပါ။",
    step2Title: "၂။ အခြားရင်းမြစ်များ ခွင့်ပြုပါ",
    step2Desc: "ဖုန်း Settings > Security တွင် 'Unknown Sources' ကို ဖွင့်ပေးပါ။",
    step3Title: "၃။ ထည့်သွင်းပြီး ကစားပါ",
    step3Desc: "ဒေါင်းလုဒ်ဖိုင်ကို ကလစ်နှိပ်ပြီး Install လုပ်ပါ။ ပွဲစဉ်များကို ပျော်ရွှင်စွာ ကြည့်ရှုပါ။",
    telegramTitle: "Telegram Channel သို့ ဝင်ရောက်ပါ",
    telegramDesc: "ပွဲစဉ်အချိန်ဇယားများ၊ လင့်များ၊ ဘောလုံးသတင်းများကို နေ့စဉ်သိရှိနိုင်ရန် ကျွန်ုပ်တို့၏ Telegram Channel သို့ ဆက်သွယ်လိုက်ပါ။",
    telegramBtn: "Join Telegram",
    statsActiveUsers: "နေ့စဉ်အသုံးပြုသူ",
    statsDownloads: "ဒေါင်းလုဒ်ပေါင်း",
    statsRating: "အသုံးပြုသူအဆင့်သတ်မှတ်ချက်",
    toastDownloading: "APK စတင်ဒေါင်းလုဒ်နေပါပြီ...",
    toastCompleted: "ဒေါင်းလုဒ်လုပ်ခြင်း ပြီးဆုံးပါပြီ။ Onside_Live_v2.4.apk ကို ဖုန်းတွင် ထည့်သွင်းလိုက်ပါ။",
    mockLiveNow: "တိုက်ရိုက်လွှင့်နေသည်",
    mockViews: "ကြည့်ရှုသူ",
    mockLeague: "ပရီးမီးယားလိဂ်"
  },
  en: {
    heroTitle: "Watch Football Anytime, Anywhere",
    heroSubtitle: "Enjoy football live streaming, live scores, and high-quality highlights directly on your phone.",
    badgeLive: "Watch Football Live",
    badgeScores: "Live Scores",
    badgeHighlights: "Match Highlights",
    downloadApk: "Download APK",
    joinTelegram: "Join Telegram",
    featuresTitle: "Amazing Features",
    featuresSubtitle: "Everything a Burmese football enthusiast needs, combined in one lightweight application.",
    featureLiveTitle: "⚽ Live Match",
    featureLiveDesc: "Watch football matches live in crystal clear HD quality without any interruptions.",
    featureScoreTitle: "📊 Live Score",
    featureScoreDesc: "Real-time score updates, detailed match stats, and instant goal notifications.",
    featureHighlightsTitle: "🎥 Highlights",
    featureHighlightsDesc: "Watch match highlights anytime. Catch up on spectacular goals and key moments.",
    downloadTitle: "Download Onside Live",
    downloadDesc: "Get the latest official version of Onside Live APK safe and secure in just one click.",
    installStepsTitle: "How to Install Onside Live APK",
    step1Title: "1. Download APK",
    step1Desc: "Click the 'Download APK' button above or below to save the APK file.",
    step2Title: "2. Allow Unknown Sources",
    step2Desc: "Go to Admin / Security settings on your device and check 'Unknown Sources'.",
    step3Title: "3. Complete Installation",
    step3Desc: "Open the downloaded .apk file and tap 'Install' to start enjoying live matches!",
    telegramTitle: "Join Telegram Community",
    telegramDesc: "Get daily match schedules, direct backup links, live chats, and quick support in Myanmar's largest football fan group.",
    telegramBtn: "Join Telegram",
    statsActiveUsers: "Daily Active Fans",
    statsDownloads: "Total Downloads",
    statsRating: "User Rating",
    toastDownloading: "Starting Onside Live APK download...",
    toastCompleted: "Download finished! Locate Onside_Live_v2.4.apk on your device and tap to install.",
    mockLiveNow: "LIVE NOW",
    mockViews: "watching",
    mockLeague: "Premier League"
  }
};
