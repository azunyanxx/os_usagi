import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  Wifi,
  Folder,
  Image as ImageIcon,
  Globe,
  Terminal,
  Battery,
  Music,
  Play,
  SkipForward,
  SkipBack,
  Settings,
  Power,
  Pause,
  Lock,
  Radio,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Minimize2,
  Aperture,
  Cpu,
  Disc,
  Activity,
  Heart,
  Zap,
  Search,
  Volume2,
  Sun,
  Moon,
  HardDrive,
  Layers,
  Eye,
  Info,
  Shield,
  Bell,
  Calendar as CalendarIcon,
  AlertCircle,
  Wand2,
  Coffee,
  Anchor,
  Key as KeyIcon,
  FileText,
  Smartphone,
  Cloud,
  Printer,
  Camera,
  RotateCcw,
  Star,
  Send,
  Mic,
  User,
  Hash,
  Command,
} from "lucide-react";
/**
 * 🐇 OS_USAGI
 * "
 */

// --- 1. IMMUTABLE ASSETS & DATA (LOCKED) ---
const ASSETS = {
  wallpaper:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
  rabbitIcon: "https://files.catbox.moe/zmwzx5.png",
  flyingObj: "https://files.catbox.moe/aphdp6.png",
  musicRabbit: "https://files.catbox.moe/4a8bhu.png",
  dataBg:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
};
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// 💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙
//💙💙💙💙💙💙💙💙💙🎧🎼　PLAYLIST -🎧🎼　💙💙💙💙💙💙💙💙💙💙💙
// 💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

const PLAYLIST = [
  {
    url: "https://files.catbox.moe/roxy4t.mp3",
    title: "電波に恋してる",
    artist: "Signal Youth",
  },
    // ---- ここから新しい10曲 ----
  {
    url: "https://files.catbox.moe/e2tm1o.mp3",
    title: "まちあわせ",
    artist: "Platform Diary",
  },
  {
    url: "https://files.catbox.moe/yuqvwh.mp3",
    title: "だらけモードON",
    artist: "Idle Mode Protocol",
  },
  {
    url: "https://files.catbox.moe/1rsenf.mp3",
    title: "何もしない休日",
    artist: "Weekend Archive",
  },
  {
    url: "https://files.catbox.moe/j36tjo.mp3",
    title: "君にとどく願い",
    artist: "Wish Courier",
  },
  {
    url: "https://files.catbox.moe/qlnt9d.mp3",
    title: "まちあわせ2",
    artist: "Parallel Platform",
  },
  {
    url: "https://files.catbox.moe/ktatnt.mp3",
    title: "おふとんのまほう",
    artist: "Blanket Ritual",
  },
  {
    url: "https://files.catbox.moe/z1jmrz.mp3",
    title: "あと5分のゆうわく",
    artist: "Snooze Theory",
  },
  {
    url: "https://files.catbox.moe/2z1vk6.mp3",
    title: "ゆめいろデイズ",
    artist: "Pastel Constellation",
  },
  {
    url: "https://files.catbox.moe/nwg31d.mp3",
    title: "おうちデート",
    artist: "Indoor Picnic Club",
  },
  {
    url: "https://files.catbox.moe/l3dgb2.mp3",
    title: "くつろぎマイルーム",
    artist: "Comfort Library",
  },
  {
    url: "https://files.catbox.moe/5ikild.mp3",
    title: "バーチャルの放課後",
    artist: "A.S. Protocol",
  },
  {
    url: "https://files.catbox.moe/3ehh4t.mp3",
    title: "黒うさぎと夢じかん",
    artist: "Shadow Bunny Ensemble",
  },
  {
    url: "https://files.catbox.moe/rn1wn8.mp3",
    title: "夜のおくりもの",
    artist: "Midnight Courier",
  },
  {
    url: "https://files.catbox.moe/46v22y.mp3",
    title: "コンティニューする",
    artist: "Retry & Heart",
  },
  {
    url: "https://files.catbox.moe/otzszq.mp3",
    title: "星の降る夜",
    artist: "Gravity Lullaby",
  },
  {
    url: "https://files.catbox.moe/tioyof.mp3",
    title: "すうぃーときゃんでぃ",
    artist: "Softcore Heart",
  },
  {
    url: "https://files.catbox.moe/8btsty.mp3",
    title: "ゆめみごこち",
    artist: "System Sleep",
  },
  {
    url: "https://files.catbox.moe/wepbzj.mp3",
    title: "ぽかぽか日和",
    artist: "Memory Bank",
  },
  {
    url: "https://files.catbox.moe/qdy18v.mp3",
    title: "ときめき",
    artist: "Pulse Theory",
  },
  {
    url: "https://files.catbox.moe/hccsxc.wav",
    title: "月が綺麗ですね",
    artist: "Observation Diary",
  },
];


const APPS = [
  {
    id: "finder",
    name: "Finder",
    icon: Folder,
    label: "System Root",
    color: "text-blue-300",
    hex: "#93c5fd",
  },
  {
    id: "gallery",
    name: "Gallery",
    icon: ImageIcon,
    label: "Memories",
    color: "text-cyan-200",
    hex: "#a8eaff",
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: CalendarIcon,
    label: "Chronos",
    color: "text-teal-200",
    hex: "#99f6e4",
  },
  {
    id: "music",
    name: "Music",
    icon: Music,
    label: "Sonic Layer",
    color: "text-rose-300",
    hex: "#fda4af",
  },
  {
    id: "safari",
    name: "Net",
    icon: Globe,
    label: "Void Network",
    color: "text-indigo-300",
    hex: "#c7d2fe",
  },
  {
    id: "terminal",
    name: "Term",
    icon: Terminal,
    label: "Core Access",
    color: "text-emerald-300",
    hex: "#6ee7b7",
  },
{
  id: "photos",
  name: "Rhythm",
  icon: Radio,
  label: "Beat Sync",
  color: "text-cyan-200",
  hex: "#a8eaff",
},
  {
    id: "system",
    name: "Config",
    icon: Settings,
    label: "Config",
    color: "text-slate-400",
    hex: "#94a3b8",
  },
];

// --- FULL DATASETS RESTORED ---
const FINDER_ITEMS = [
  // --- SYSTEM (Mac) ---
  {
    id: "sys_mac1",
    folder: "system",
    title: "Mac_View_01.png",
    file: "https://files.catbox.moe/z46quj.png",
    meta: "IMG",
  },
  {
    id: "sys_mac2",
    folder: "system",
    title: "Mac_View_02.png",
    file: "https://files.catbox.moe/urfdqf.png",
    meta: "IMG",
  },
  {
    id: "sys_mac3",
    folder: "system",
    title: "Mac_View_03.png",
    file: "https://files.catbox.moe/vb8kj9.png",
    meta: "IMG",
  },
  {
    id: "sys_mac4",
    folder: "system",
    title: "Mac_View_04.png",
    file: "https://files.catbox.moe/vl5con.png",
    meta: "IMG",
  },
  {
    id: "sys_mac5",
    folder: "system",
    title: "Mac_View_05.png",
    file: "https://files.catbox.moe/jbezxj.png",
    meta: "IMG",
  },
  {
    id: "sys_mac6",
    folder: "system",
    title: "Mac_View_06.png",
    file: "https://files.catbox.moe/c8n71i.png",
    meta: "IMG",
  },

  // --- SYSTEM (Mouse) ---
  {
    id: "sys_mse1",
    folder: "system",
    title: "Mouse_A.sys",
    file: "https://files.catbox.moe/20dw27.png",
    meta: "DEV",
  },
  {
    id: "sys_mse2",
    folder: "system",
    title: "Mouse_B.sys",
    file: "https://files.catbox.moe/bftg0s.png",
    meta: "DEV",
  },
  {
    id: "sys_mse3",
    folder: "system",
    title: "Mouse_C.sys",
    file: "https://files.catbox.moe/x9fsqb.png",
    meta: "DEV",
  },
  {
    id: "sys_mse4",
    folder: "system",
    title: "Mouse_D.sys",
    file: "https://files.catbox.moe/uph2k8.png",
    meta: "DEV",
  },
  {
    id: "sys_mse5",
    folder: "system",
    title: "Mouse_E.sys",
    file: "https://files.catbox.moe/bk2f9d.png",
    meta: "DEV",
  },

  // --- SYSTEM (Cursor) ---
  {
    id: "sys_cur1",
    folder: "system",
    title: "Cursor_Wait.cur",
    file: "https://files.catbox.moe/zh098z.png",
    meta: "CUR",
  },
  {
    id: "sys_cur2",
    folder: "system",
    title: "Cursor_Link.cur",
    file: "https://files.catbox.moe/b00lfm.png",
    meta: "CUR",
  },

  // --- SYSTEM (Apps/Utils) ---
  {
    id: "sys_srch",
    folder: "system",
    title: "検索.exe",
    file: "https://files.catbox.moe/hbknxg.png",
    meta: "APP",
  },
  {
    id: "sys_prnt",
    folder: "system",
    title: "コピー.job",
    file: "https://files.catbox.moe/jlvsen.png",
    meta: "JOB",
  },
  {
    id: "sys_cam",
    folder: "system",
    title: "かめら.app",
    file: "https://files.catbox.moe/t5rikh.png",
    meta: "APP",
  },
  {
    id: "sys_sync",
    folder: "system",
    title: "Sync.cloud",
    file: "https://files.catbox.moe/98edqf.png",
    meta: "NET",
  },
  {
    id: "sys_batt",
    folder: "system",
    title: "充電ない.warn",
    file: "https://files.catbox.moe/nen9rz.png",
    meta: "LOW",
  },

  // --- WORK (Job) ---
  {
    id: "wrk_word",
    folder: "work",
    title: "言語化にがて.txt",
    file: "https://files.catbox.moe/zhswow.png",
    meta: "TXT",
  },
  {
    id: "wrk_mode",
    folder: "work",
    title: "まじめもーど.on",
    file: "https://files.catbox.moe/zon5x4.png",
    meta: "ON",
  },
  {
    id: "wrk_sort",
    folder: "work",
    title: "情報処理.folder",
    file: "https://files.catbox.moe/do2nh4.png",
    meta: "DIR",
  },
  {
    id: "wrk_ovr1",
    folder: "work",
    title: "残業_01.log",
    file: "https://files.catbox.moe/ojkdvf.png",
    meta: "LOG",
  },
  {
    id: "wrk_ovr2",
    folder: "work",
    title: "残業_02.log",
    file: "https://files.catbox.moe/akz1yj.png",
    meta: "LOG",
  },
  {
    id: "wrk_ovr3",
    folder: "work",
    title: "残業_03.log",
    file: "https://files.catbox.moe/2tx6bw.png",
    meta: "LOG",
  },
  {
    id: "wrk_read",
    folder: "work",
    title: "ふむふむ.doc",
    file: "https://files.catbox.moe/up1d58.png",
    meta: "DOC",
  },
  {
    id: "wrk_cln",
    folder: "work",
    title: "ふきふき.clean",
    file: "https://files.catbox.moe/fv4d4l.png",
    meta: "TASK",
  },
  {
    id: "wrk_slp",
    folder: "work",
    title: "すやぁ.sleep",
    file: "https://files.catbox.moe/l72j18.png",
    meta: "ZZZ",
  },

  // --- EMOTION (Feelings) ---
  {
    id: "emo_crk",
    folder: "emotion",
    title: "画面割れた.err",
    file: "https://files.catbox.moe/t4z2vk.png",
    meta: "CRIT",
  },
  {
    id: "emo_brn",
    folder: "emotion",
    title: "焦げた.warn",
    file: "https://files.catbox.moe/ptdnnh.png",
    meta: "WARN",
  },
  {
    id: "emo_ovr",
    folder: "emotion",
    title: "気持ちあふれた.dmp",
    file: "https://files.catbox.moe/dl4amz.png",
    meta: "FULL",
  },
  {
    id: "emo_luv",
    folder: "emotion",
    title: "あなたでいっぱい.mem",
    file: "https://files.catbox.moe/vb0kbn.png",
    meta: "BUSY",
  },
  {
    id: "emo_sw",
    folder: "emotion",
    title: "やる気スイッチ.bat",
    file: "https://files.catbox.moe/gtkymu.png",
    meta: "RUN",
  },
  {
    id: "emo_idea",
    folder: "emotion",
    title: "天才的なひらめき.light",
    file: "https://files.catbox.moe/e9ho23.png",
    meta: "BULB",
  },
  {
    id: "emo_done",
    folder: "emotion",
    title: "done.log",
    file: "https://files.catbox.moe/1epdfw.png",
    meta: "OK",
  },
  {
    id: "emo_unk",
    folder: "emotion",
    title: "？.null",
    file: "https://files.catbox.moe/b5jm4o.png",
    meta: "404",
  },
  {
    id: "emo_fid",
    folder: "emotion",
    title: "そわそわ.gif",
    file: "https://files.catbox.moe/x1jbdn.png",
    meta: "JIT",
  },
  {
    id: "emo_spl",
    folder: "emotion",
    title: "こぼした.oops",
    file: "https://files.catbox.moe/p0gj8o.png",
    meta: "ERR",
  },

  // --- KEYS ---
  {
    id: "key_home",
    folder: "emotion",
    title: "帰宅こまんど.key",
    file: "https://files.catbox.moe/1v2mkf.png",
    meta: "HOME",
  },
  {
    id: "key_esc1",
    folder: "emotion",
    title: "逃げたい.key",
    file: "https://files.catbox.moe/b3zib6.png",
    meta: "ESC",
  },
  {
    id: "key_esc2",
    folder: "emotion",
    title: "逃げられない.key",
    file: "https://files.catbox.moe/5vb46r.png",
    meta: "ESC",
  },
  {
    id: "key_spc",
    folder: "emotion",
    title: "距離おきたい.key",
    file: "https://files.catbox.moe/hpx2lv.png",
    meta: "SPACE",
  },
  {
    id: "key_f7",
    folder: "emotion",
    title: "機内もーど.key",
    file: "https://files.catbox.moe/3wlbvf.png",
    meta: "F7",
  },
  {
    id: "key_f12",
    folder: "emotion",
    title: "自分みなおし.key",
    file: "https://files.catbox.moe/ls7ca2.png",
    meta: "F12",
  },
  {
    id: "key_ent",
    folder: "emotion",
    title: "押したい.key",
    file: "https://files.catbox.moe/1rivww.png",
    meta: "ENTER",
  },
  {
    id: "key_del",
    folder: "emotion",
    title: "すべてを消したい.key",
    file: "https://files.catbox.moe/yhh5ii.png",
    meta: "DEL",
  },
  {
    id: "key_bs",
    folder: "emotion",
    title: "もどれない.key",
    file: "https://files.catbox.moe/jbv97i.png",
    meta: "BS",
  },
  {
    id: "key_f5",
    folder: "emotion",
    title: "更新したい.key",
    file: "https://files.catbox.moe/2z2jv7.png",
    meta: "F5",
  },
  {
    id: "key_caps",
    folder: "emotion",
    title: "思考ろっく.key",
    file: "https://files.catbox.moe/ifptpk.png",
    meta: "CAPS",
  },
  {
    id: "key_sft",
    folder: "emotion",
    title: "てっぺんとりたい.key",
    file: "https://files.catbox.moe/cta7e1.png",
    meta: "SHIFT",
  },

  // --- LIFE ---
  {
    id: "life_wait",
    folder: "life",
    title: "おへんじまち.msg",
    file: "https://files.catbox.moe/x6t33p.png",
    meta: "WAIT",
  },
  {
    id: "life_call",
    folder: "life",
    title: "電話したい.call",
    file: "https://files.catbox.moe/qpreab.png",
    meta: "CALL",
  },
  {
    id: "life_ana",
    folder: "life",
    title: "現アナ.rec",
    file: "https://files.catbox.moe/dw2mx7.png",
    meta: "REC",
  },
  {
    id: "life_on",
    folder: "life",
    title: "オンライン.net",
    file: "https://files.catbox.moe/cd19sf.png",
    meta: "ON",
  },
  {
    id: "life_trn",
    folder: "life",
    title: "電車.mov",
    file: "https://files.catbox.moe/pjnkgi.png",
    meta: "MOV",
  },
  {
    id: "life_shin",
    folder: "life",
    title: "新幹線.mov",
    file: "https://files.catbox.moe/y0cw4c.png",
    meta: "MOV",
  },
  {
    id: "life_trp",
    folder: "life",
    title: "旅にでたい.map",
    file: "https://files.catbox.moe/8gg7nk.png",
    meta: "MAP",
  },
  {
    id: "life_odn1",
    folder: "life",
    title: "おでんA.jpg",
    file: "https://files.catbox.moe/1gs7ef.png",
    meta: "JPG",
  },
  {
    id: "life_odn2",
    folder: "life",
    title: "おでんB.jpg",
    file: "https://files.catbox.moe/iaxcke.png",
    meta: "JPG",
  },
  {
    id: "life_odn3",
    folder: "life",
    title: "おでんC.jpg",
    file: "https://files.catbox.moe/0poyoo.png",
    meta: "JPG",
  },
  {
    id: "life_wsh",
    folder: "life",
    title: "洗濯ほす.task",
    file: "https://files.catbox.moe/vak8yh.png",
    meta: "TODO",
  },
  {
    id: "life_ck",
    folder: "life",
    title: "cookieたべる.eat",
    file: "https://files.catbox.moe/ks3rne.png",
    meta: "YUM",
  },
  {
    id: "life_pnt",
    folder: "life",
    title: "塗り塗り.draw",
    file: "https://files.catbox.moe/0aacuw.png",
    meta: "ART",
  },
  {
    id: "life_sak",
    folder: "life",
    title: "日本酒のむ.drink",
    file: "https://files.catbox.moe/k4su4h.png",
    meta: "SAKE",
  },
  {
    id: "life_wet",
    folder: "life",
    title: "濡れたら負け.rain",
    file: "https://files.catbox.moe/otijl3.png",
    meta: "RAIN",
  },
  {
    id: "life_zzz",
    folder: "life",
    title: "まだねません.bed",
    file: "https://files.catbox.moe/jxrepo.png",
    meta: "NO",
  },
  {
    id: "life_mem",
    folder: "life",
    title: "おもいでだいじ.save",
    file: "https://files.catbox.moe/hp1pau.png",
    meta: "SAVE",
  },
  {
    id: "life_gm1",
    folder: "life",
    title: "にんてんどう.rom",
    file: "https://files.catbox.moe/y073sh.png",
    meta: "PLAY",
  },
  {
    id: "life_gm2",
    folder: "life",
    title: "ゲーム.dat",
    file: "https://files.catbox.moe/m0ldmk.png",
    meta: "LOAD",
  },

  // --- MAGIC ---
  {
    id: "mag_spl",
    folder: "magic",
    title: "魔法かけたい.magic",
    file: "https://files.catbox.moe/dihwl0.png",
    meta: "CAST",
  },
  {
    id: "mag_mix",
    folder: "magic",
    title: "調合.potion",
    file: "https://files.catbox.moe/i9qiks.png",
    meta: "POT",
  },
  {
    id: "mag_trk1",
    folder: "magic",
    title: "手品_A.trick",
    file: "https://files.catbox.moe/kjwxxb.png",
    meta: "TRK",
  },
  {
    id: "mag_trk2",
    folder: "magic",
    title: "手品_B.trick",
    file: "https://files.catbox.moe/eztl2c.png",
    meta: "TRK",
  },
  {
    id: "mag_trk3",
    folder: "magic",
    title: "手品_C.trick",
    file: "https://files.catbox.moe/xa1jzb.png",
    meta: "TRK",
  },
  {
    id: "mag_trk4",
    folder: "magic",
    title: "手品_D.trick",
    file: "https://files.catbox.moe/561lgv.png",
    meta: "TRK",
  },
  {
    id: "mag_pwr",
    folder: "magic",
    title: "電源ボタン.sys",
    file: "https://files.catbox.moe/kfy622.png",
    meta: "PWR",
  },
  {
    id: "mag_heal",
    folder: "magic",
    title: "治す.heal",
    file: "https://files.catbox.moe/7m3apo.png",
    meta: "HEAL",
  },
  {
    id: "mag_new",
    folder: "magic",
    title: "新しい世界.map",
    file: "https://files.catbox.moe/fdoazh.png",
    meta: "NEW",
  },
];

// 2. GALLERY ITEMS (For Gallery App - Curated & Emotional)
const GALLERY_ITEMS = FINDER_ITEMS.map((item) => ({
  ...item,
  cat: item.folder,
  desc: "Visual memory fragment.",
}));

// --- 2. ENGINE & UTILITIES ---

//  ONE resize listener for the whole app
const MobileContext = React.createContext(false);

const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // resizeより軽く、状態変化のときだけ発火する
    const mq = window.matchMedia("(max-width: 767px)");

    const onChange = (e) => setIsMobile(e.matches);

    // 初期値を反映
    setIsMobile(mq.matches);

    // Safari古い版も対応
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  );
};

const useIsMobile = () => React.useContext(MobileContext);

const useTime = () => {
  const isMobile = useIsMobile();
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = isMobile ? 60_000 : 1_000; // mobileは1分、PCは1秒
    const t = setInterval(() => setTime(new Date()), interval);
    return () => clearInterval(t);
  }, [isMobile]);

  return time;
};

// Audio Engine
const AudioEngine = {
  ctx: null,
  init: () => {
    if (typeof window === "undefined") return null;
    if (!AudioEngine.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) AudioEngine.ctx = new AudioContext();
    }
    if (AudioEngine.ctx?.state === "suspended") {
      AudioEngine.ctx.resume().catch(() => {});
    }
    return AudioEngine.ctx;
  },
  playTone: (freq, type, duration, vol = 0.1) => {
    const ctx = AudioEngine.init();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + duration + 0.1);
  },
  playKey: () => {
    const ctx = AudioEngine.init();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(200 + Math.random() * 50, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.05);
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  },
  playStartup: () => {
    const ctx = AudioEngine.init();
    if (!ctx) return;
    const t = ctx.currentTime;
    [130.81, 196.0, 261.63, 329.63, 392.0, 523.25].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.5 + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 6.0);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 7.0);
    });
  },
};

const useBGM = (playlist) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio();
    audio.loop = false;
    audio.volume = 0;
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    const handleEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    };
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);

    return () => {
      if (fadeRef.current) clearInterval(fadeRef.current);
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.src = "";
    };
  }, [playlist.length]);

  const fadeTo = useCallback((targetVol, callback) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) clearInterval(fadeRef.current);
    const step = 0.05;
    fadeRef.current = setInterval(() => {
      const diff = targetVol - audio.volume;
      if (Math.abs(diff) < step) {
        audio.volume = targetVol;
        clearInterval(fadeRef.current);
        if (callback) callback();
      } else {
        const newVol = audio.volume + (diff > 0 ? step : -step);
        audio.volume = Math.min(Math.max(newVol, 0), 1);
      }
    }, 50);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const playTrack = async () => {
      audio.volume = 0;
      audio.src = playlist[currentIndex].url;
      audio.load();
      if (isPlaying) {
        setIsLoading(true);
        const playPromise = new Promise((resolve) => {
          const onCanPlay = () => {
            audio.removeEventListener("canplay", onCanPlay);
            resolve();
          };
          audio.addEventListener("canplay", onCanPlay);
          if (audio.readyState >= 3) onCanPlay();
        });
        playPromise
          .then(() => {
            return audio.play();
          })
          .then(() => {
            setIsLoading(false);
            fadeTo(0.4);
          })
          .catch((e) => {
            console.warn("Playback prevented/failed:", e);
            setIsLoading(false);
          });
      }
    };
    playTrack();
  }, [currentIndex, isPlaying, playlist, fadeTo]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      AudioEngine.init();
      setIsPlaying(true);
      audio
        .play()
        .then(() => fadeTo(0.4))
        .catch((e) => console.warn(e));
    }
  }, [fadeTo]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    const audio = audioRef.current;
    if (audio) fadeTo(0, () => audio.pause());
  }, [fadeTo]);

  const next = useCallback(() => {
    setIsPlaying(true);
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const prev = useCallback(() => {
    setIsPlaying(true);
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  return {
    isPlaying,
    isLoading,
    currentSong: playlist[currentIndex],
    play,
    pause,
    next,
    prev,
    toggle,
  };
};

// --- 3. UI COMPONENTS ---

const RabbitLogo = ({ className = "w-16 h-16", animate = false }) => (
  <img
    src={ASSETS.rabbitIcon}
    alt="Rabbit Logo"
    className={`${className} ${animate ? "animate-pulse" : ""} object-contain`}
  />
);

const CustomCursor = () => {
  const isMobile = useIsMobile();

  const posRef = useRef({ x: -100, y: -100 });
  const clickedRef = useRef(false);

  const ringRef = useRef(null);
  const dotRef = useRef(null);

  const rafRef = useRef(0);

  useEffect(() => {
    if (isMobile) return;

    const render = () => {
      const { x, y } = posRef.current;
      const scale = clickedRef.current ? 0.8 : 1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${x - 16}px, ${y - 16}px) scale(${scale})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    const move = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    const down = () => {
      clickedRef.current = true;
    };
    const up = () => {
      clickedRef.current = false;
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[9999] hidden md:block mix-blend-screen shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gradient-to-br from-[#a8eaff] to-[#cbb8ff] pointer-events-none z-[9999] hidden md:block shadow-[0_0_10px_rgba(168,234,255,0.8)]"
      />
    </>
  );
};

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
);

const Scanline = () => (
  <div className="fixed inset-0 pointer-events-none z-[2] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50"></div>
);

// --- 4. APP CONTENT ---

const CalendarApp = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectionYear, setSelectionYear] = useState(viewDate.getFullYear());

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isSpecialDate = (d) => year === 1992 && month === 11 && d === 15;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const jumpTo = (m) => {
    setViewDate(new Date(selectionYear, m, 1));
    setIsSelectionMode(false);
  };

  if (isSelectionMode) {
    return (
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <button
            onClick={() => setIsSelectionMode(false)}
            className="text-xs font-mono text-[#a8eaff] hover:text-white transition-colors"
          >
            {" "}
            ← BACK{" "}
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectionYear((prev) => prev - 1)}
              className="p-2 hover:text-[#a8eaff]"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xl font-bold tracking-widest text-white">
              {selectionYear}
            </span>
            <button
              onClick={() => setSelectionYear((prev) => prev + 1)}
              className="p-2 hover:text-[#a8eaff]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 flex-1 content-center">
          {monthNames.map((m, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              className={` p-3 rounded-md text-xs font-mono uppercase tracking-wider border transition-all ${
                selectionYear === 1992 && i === 11
                  ? "border-[#a8eaff]/50 text-[#a8eaff] bg-[#a8eaff]/10 hover:bg-[#a8eaff]/20"
                  : "border-white/5 text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20"
              } `}
            >
              {" "}
              {m.substring(0, 3)}{" "}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10"></div>);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isSpecial = isSpecialDate(d);
    const isToday =
      !isSpecial &&
      d === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();
    days.push(
      <div
        key={d}
        className={` h-10 flex items-center justify-center rounded-lg text-sm font-mono relative group cursor-default ${
          isSpecial
            ? "bg-white text-black font-bold shadow-[0_0_20px_#a8eaff] z-10 scale-110"
            : isToday
            ? "bg-white/10 text-white border border-white/20"
            : "text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        } `}
      >
        {d}
        {/* ★ special glow */}
        {isSpecial && (
          <div
            className="absolute inset-0 rounded-lg 
    bg-[radial-gradient(circle_at_center,rgba(168,234,255,0.22),rgba(203,184,255,0.15),transparent_75%)]
    animate-[pulse_2.8s_ease-in-out_infinite]
    pointer-events-none"
          ></div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
        <div
          className="group cursor-pointer"
          onClick={() => {
            setSelectionYear(year);
            setIsSelectionMode(true);
          }}
        >
          <h2 className="text-3xl font-thin tracking-tighter text-white group-hover:text-[#a8eaff] transition-colors flex items-center gap-2">
            {" "}
            {monthNames[month]}{" "}
            <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-[#a8eaff] font-mono border border-[#a8eaff]/30 px-1 rounded">
              JUMP
            </span>{" "}
          </h2>
          <p className="text-sm font-mono text-[#a8eaff] tracking-[0.3em] group-hover:text-white transition-colors">
            {year}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextMonth}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div
            key={i}
            className="text-[10px] font-bold text-white/30 tracking-widest"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 flex-1 overflow-y-auto scrollbar-hide content-start">
        {days}
      </div>
      <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-white/30">
        <span>CHRONOS_V1.0</span>
        <span
          className={isSpecialDate(15) ? "text-[#a8eaff] animate-pulse" : ""}
        >
          {" "}
          {isSpecialDate(15) ? "MEMORY_FOUND" : "NO_EVENTS"}{" "}
        </span>
      </div>
    </div>
  );
};

const SystemApp = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [brightness, setBrightness] = useState(70);
  const [volume, setVolume] = useState(45);
  const [emotionModule, setEmotionModule] = useState(true);
  const [scanline, setScanline] = useState(true);

  const [devTapCount, setDevTapCount] = useState(0);
  const [showDevPrompt, setShowDevPrompt] = useState(false);
  const [devPassword, setDevPassword] = useState("");
  const [devError, setDevError] = useState("");
  const [devModeUnlocked, setDevModeUnlocked] = useState(false);

  const [memoryVisits, setMemoryVisits] = useState(0);
  const [memoryYouUnlocked, setMemoryYouUnlocked] = useState(false);

  useEffect(() => {
    if (activeTab === "memory") {
      setMemoryVisits((prev) => {
        const next = prev + 1;

        // Emotion ON & 3回以上 → 解放
        if (!memoryYouUnlocked && next >= 3 && emotionModule) {
          setMemoryYouUnlocked(true);
        }

        return next;
      });
    }
  }, [activeTab, emotionModule, memoryYouUnlocked]);

  const TABS = [
    { id: "general", icon: Layers, label: "General" },
    { id: "display", icon: Eye, label: "Display" },
    { id: "sound", icon: Volume2, label: "Sound" },
    { id: "memory", icon: HardDrive, label: "Memory" },
    { id: "about", icon: Info, label: "About" },
  ];

  const handleDevSubmit = () => {
    if (devPassword === "19921215") {
      setDevModeUnlocked(true);
      setShowDevPrompt(false);
      setDevPassword("");
      setDevError("");
    } else {
      setDevError("incorrect");
    }
  };

  return (
    <div className="flex h-full text-white font-sans w-full">
      {/* Sidebar */}
      <div className="w-14 sm:w-48 border-r border-white/5 p-2 sm:p-4 flex flex-col gap-1 bg-black/20 transition-all duration-300 shrink-0">
        <div className="text-[10px] font-mono text-white/30 mb-4 px-2 sm:px-3 tracking-widest hidden sm:block">
          Config
        </div>
        {TABS.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group flex items-center justify-center sm:justify-start gap-3 px-2 sm:px-3 py-3 rounded-md cursor-pointer transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-white/10 text-white"
                : "text-white/30 hover:text-white hover:bg-white/5"
            }`}
          >
            <tab.icon
              size={16}
              className={activeTab === tab.id ? "text-[#a8eaff]" : ""}
            />
            <span className="hidden sm:block">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="ml-auto w-1 h-1 bg-[#a8eaff] rounded-full shadow-[0_0_5px_#a8eaff] hidden sm:block" />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 sm:p-10 overflow-y-auto scrollbar-hide relative">
        <div className="max-w-2xl mx-auto space-y-10">
          {/* HEADER */}
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-2xl font-thin tracking-tighter text-white mb-1">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>
            <p className="text-[10px] text-[#a8eaff]/60 tracking-[0.2em] uppercase">
              System Configuration Node
            </p>
          </div>

          {/* GENERAL */}
          {activeTab === "general" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white/5 rounded-lg p-6 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs tracking-wider text-white/70">
                    Device Name
                  </span>
                  <span className="text-xs font-mono text-[#a8eaff]">
                    os_usagi
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs tracking-wider text-white/70">
                    User ID
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    user_none
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-wider text-white/70">
                    Language Protocol
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    Japanese / JP
                  </span>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs tracking-wider text-white/70 mb-1">
                    Emotion Module
                  </div>
                  <div className="text-[10px] text-white/30">
                    Enable emotional expression
                  </div>
                </div>
                <div
                  onClick={() => setEmotionModule(!emotionModule)}
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${
                    emotionModule ? "bg-[#a8eaff]/20" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-3 h-3 rounded-full bg-[#a8eaff] transition-all duration-300 shadow-[0_0_10px_#a8eaff] ${
                      emotionModule ? "left-6" : "left-1 opacity-20"
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* DISPLAY */}
          {activeTab === "display" && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <div className="flex justify-between mb-3 text-xs tracking-widest text-white/60">
                  <span>Light Intensity</span>
                  <span className="font-mono">{brightness}%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer group">
                  <div
                    className="h-full bg-[#a8eaff] transition-all duration-300 group-hover:bg-white shadow-[0_0_10px_#a8eaff]"
                    style={{ width: `${brightness}%` }}
                  />
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs tracking-wider text-white/70 mb-1">
                    Scanline
                  </div>
                  <div className="text-[10px] text-white/30">
                    Display CRT scanlines
                  </div>
                </div>
                <div
                  onClick={() => setScanline(!scanline)}
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${
                    scanline ? "bg-[#a8eaff]/20" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-3 h-3 rounded-full bg-[#a8eaff] transition-all duration-300 ${
                      scanline ? "left-6" : "left-1 opacity-20"
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SOUND */}
          {activeTab === "sound" && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <div className="flex justify-between mb-3 text-xs tracking-widest text-white/60">
                  <span>Ambience Depth</span>
                  <span className="font-mono">{volume}%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer group">
                  <div
                    className="h-full bg-[#cbb8ff] transition-all duration-300 group-hover:bg-white shadow-[0_0_10px_#cbb8ff]"
                    style={{ width: `${volume}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-white/10 rounded-lg text-center hover:bg-white/5 cursor-pointer transition-colors">
                  <Bell size={20} className="mx-auto mb-2 text-white/40" />
                  <span className="text-[10px] tracking-widest text-white/60">
                    Notification
                  </span>
                </div>
                <div className="p-4 border border-[#a8eaff]/30 rounded-lg text-center bg-[#a8eaff]/5 cursor-pointer">
                  <Radio size={20} className="mx-auto mb-2 text-[#a8eaff]" />
                  <span className="text-[10px] tracking-widest text-white">
                    Spatial Audio
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* MEMORY */}
          {activeTab === "memory" && (
            <div className="space-y-8 animate-fade-in">
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full -rotate-90">
                  {/* 外枠（空き） */}
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="12"
                    fill="none"
                  />
                  {/* MEMORIES / YOU レイヤー */}
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#cbb8ff"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="502"
                    strokeDashoffset={memoryYouUnlocked ? 150 : 260}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_10px_#cbb8ff] transition-all duration-700"
                  />
                  {/* CORE レイヤー */}
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#a8eaff"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="502"
                    strokeDashoffset={memoryYouUnlocked ? 400 : 400}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_10px_#a8eaff] transition-all duration-700"
                  />
                </svg>

                {/* 中央の数値表示 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-thin text-white">
                    {memoryYouUnlocked ? 15 : 12}
                    <span className="text-sm text-white/40">GB</span>
                  </span>
                  <span className="text-[9px] tracking-widest text-white/30 mt-1">
                    USED
                  </span>
                </div>
              </div>
              {/* ラベル部分：YOU */}
              <div className="flex justify-center gap-6 text-[10px] tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#a8eaff]" />
                  CORE
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#cbb8ff]" />
                  {memoryYouUnlocked ? "YOU" : "ARCHIVE"}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  {memoryYouUnlocked ? "UNUSED" : "EMPTY"}
                </div>
              </div>

              {memoryYouUnlocked && (
                <p className="text-[9px] font-mono text-white/30 text-center mt-1">
                  // memory slot: &quot;YOU&quot; — override stored
                </p>
              )}
            </div>
          )}

          {/* ABOUT */}
          {activeTab === "about" && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <RabbitLogo className="w-10 h-10 opacity-80" />
              </div>

              <div>
                <h3 className="text-xl font-light text-white mb-1">os_usagi</h3>

                {/* build番号タップゾーン */}
                <p
                  className="text-[10px] text-[#a8eaff] tracking-[0.3em] cursor-pointer select-none"
                  onClick={() => {
                    if (devModeUnlocked) return;
                    setDevTapCount((prev) => {
                      const next = prev + 1;
                      if (next >= 7) {
                        setShowDevPrompt(true);
                        return 0;
                      }
                      return next;
                    });
                  }}
                >
                  build 20XX v1.2
                </p>
              </div>

              <p className="text-xs text-white/40 leading-relaxed font-light">
                A quiet interface for digital emotions.
                <br />
                No tracking. No noise. Just space.
              </p>

              <div className="pt-8">
                <button className="px-6 py-2 border border-white/10 rounded-full text-[10px] text-white/60 hover:bg-white/5 hover:text-white transition-colors tracking-widest">
                  CHECK FOR UPDATES
                </button>
              </div>

              {devModeUnlocked && (
                <div className="mt-10 p-4 border border-[#a8eaff]/30 bg-[#a8eaff]/5 rounded-sm relative overflow-hidden">
                  <p className="text-[10px] font-mono text-[#a8eaff]/80 tracking-[0.25em] uppercase mb-3">
                    hidden_01
                  </p>

                  <p className="mt-2 text-[10px] font-mono text-white/80 tracking-wider animate-fade-in-slow">
                    Of all the days, you kept mine.
                  </p>

                  <p className="mt-2 text-[8px] font-mono text-[#a8eaff]/40 tracking-[0.3em]">
                    // value matched: 19921215
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Developer Mode パスワードモーダル */}
        {showDevPrompt && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-xs bg-[#050505] border border-white/10 rounded-lg p-6 shadow-xl">
              <p className="text-[10px] text-white/50 font-mono tracking-[0.25em] uppercase text-center mb-4">
                developer mode
              </p>

              <input
                type="password"
                value={devPassword}
                onChange={(e) => {
                  setDevPassword(e.target.value);
                  setDevError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleDevSubmit();
                }}
                placeholder="••••••••"
                autoFocus
                className="w-full text-center bg-black/40 border border-white/20 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a8eaff] font-mono tracking-widest"
              />

              {devError && (
                <div className="text-center mt-2 text-[10px] text-red-300 tracking-[0.25em]">
                  {devError}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between text-[9px] font-mono">
                <button
                  onClick={() => {
                    setShowDevPrompt(false);
                    setDevPassword("");
                    setDevTapCount(0);
                    setDevError("");
                  }}
                  className="uppercase tracking-[0.25em] text-white/40 hover:text-white/70"
                >
                  cancel
                </button>
                <button
                  onClick={handleDevSubmit}
                  className="uppercase tracking-[0.25em] text-[#a8eaff] hover:text-white"
                >
                  unlock
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};






// ------------------------------------------------
// 🌸🌸 01.FINDER APP (ふぁいんだー) 📁📂🗃️🌸🌸
// ------------------------------------------------

const FinderApp = () => {
  const [currentFolder, setCurrentFolder] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const FOLDERS = [
    { id: "all", label: "All Memories", icon: HardDrive },
    { id: "system", label: "System", icon: Cpu },
    { id: "emotion", label: "Emotion", icon: Heart },
    { id: "life", label: "Life Log", icon: Coffee },
    { id: "magic", label: "Magic", icon: Wand2 },
    { id: "work", label: "Work", icon: FileText },
  ];

  // カテゴリごとの光り方
  const getPalette = (folder) => {
    switch (folder) {
      case "system":
        return {
          dot: "#a8eaff",
          aura1: "rgba(168,234,255,0.30)",
          aura2: "rgba(185,168,255,0.18)",
        };
      case "emotion":
        return {
          dot: "#ffc8e8",
          aura1: "rgba(255,200,232,0.34)",
          aura2: "rgba(203,184,255,0.22)",
        };
      case "magic":
        return {
          dot: "#cbb8ff",
          aura1: "rgba(203,184,255,0.34)",
          aura2: "rgba(168,234,255,0.20)",
        };
      case "work":
        return {
          dot: "#b6ffe4",
          aura1: "rgba(182,255,228,0.30)",
          aura2: "rgba(185,168,255,0.18)",
        };
      case "life":
        return {
          dot: "#bde0ff",
          aura1: "rgba(189,224,255,0.30)",
          aura2: "rgba(255,200,232,0.20)",
        };
      default:
        return {
          dot: "#a8eaff",
          aura1: "rgba(168,234,255,0.26)",
          aura2: "rgba(255,200,232,0.20)",
        };
    }
  };

  // ✅ 呼吸アニメ（色は currentColor 依存）→ タグの color をカテゴリ色に
  useEffect(() => {
    const id = "finder-pulse-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes finderPulse {
        0%, 100% {
          transform: translateY(0) scale(1);
          box-shadow: 0 0 0 0 currentColor;
          opacity: 0.78;
        }
        50% {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 0 18px 0 currentColor;
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const filteredItems =
    currentFolder === "all"
      ? FINDER_ITEMS
      : FINDER_ITEMS.filter((item) => item.folder === currentFolder);

  return (
    <div className="h-full flex flex-col text-white/85 bg-[#050509]">
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop 左サイドバー（スマホでは消える） */}
        <div className="hidden sm:flex w-44 border-r border-white/10 bg-black/70 backdrop-blur-2xl flex-col py-4 px-3 gap-4">
          <div className="flex items-center gap-2 px-1 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#a8eaff] shadow-[0_0_18px_rgba(168,234,255,0.9)]" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.28em] text-white/45">
                RABBIT OS
              </span>
              <span className="text-xs text-white/80 tracking-wide">
                finder
              </span>
            </div>
          </div>

          <div className="text-[9px] text-white/30 font-mono mb-1 uppercase tracking-[0.26em] px-1">
            LOCATIONS
          </div>

          <div className="flex flex-col gap-1">
            {FOLDERS.map((f) => {
              const Icon = f.icon;
              const active = currentFolder === f.id;
              const pal = getPalette(f.id);
              return (
                <button
                  key={f.id}
                  onClick={() => setCurrentFolder(f.id)}
                  className={[
                    "flex items-center gap-3 px-3 py-1.5 rounded-xl text-xs transition-all",
                    active
                      ? "bg-white/10 text-white border border-white/25 shadow-[0_0_24px_rgba(168,234,255,0.35)]"
                      : "bg-transparent text-white/60 border border-transparent hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  <Icon
                    size={14}
                    className={
                      active
                        ? "text-[#a8eaff] drop-shadow-[0_0_10px_rgba(168,234,255,0.9)]"
                        : "text-white/50"
                    }
                  />
                  <span className="truncate">{f.label}</span>
                  {active && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{
                        background: pal.dot,
                        boxShadow: `0 0 10px ${pal.dot}`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* メイン（スマホ優先） */}
        <div className="flex-1 relative overflow-hidden">
          {/* 背景の光 */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 -left-32 w-[380px] h-[380px] rounded-full bg-[#a8eaff]/18 blur-[70px]" />
            <div className="absolute top-1/2 -right-40 w-[460px] h-[460px] rounded-full bg-[#cbb8ff]/14 blur-[90px]" />
            <div className="absolute bottom-[-120px] left-1/3 w-[520px] h-[520px] rounded-full bg-[#ffc8e8]/16 blur-[100px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/85" />
            <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay bg-[linear-gradient(transparent,rgba(255,255,255,0.06),transparent)] [background-size:100%_4px]" />
          </div>

          <div className="relative h-full flex flex-col px-4 pt-4 pb-6 sm:px-6">
{/* モバイルヘッダー */}
<div className="sm:hidden mb-4">
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
<span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: "#a8eaff",
          boxShadow: "0 0 16px rgba(168,234,255,0.9)",
          color: "#a8eaff",
          animation: "finderPulse 3.4s ease-in-out infinite",
        }}
      />
      <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-white/50">
        /finder
      </span>
    </div>
    <div className="text-[10px] font-mono text-white/40">
      {filteredItems.length} items
    </div>
  </div>


              <div className="text-[11px] text-white/55 mb-2">
                {FOLDERS.find((f) => f.id === currentFolder)?.label}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
                {FOLDERS.map((f) => {
                  const Icon = f.icon;
                  const active = currentFolder === f.id;
                  const pal = getPalette(f.id);
                  return (
                    <button
                      key={f.id}
                      onClick={() => setCurrentFolder(f.id)}
                      className={[
                        "shrink-0 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] transition-all",
                        active
                          ? "bg.white/10 bg-white/10 border-white/30 text-white shadow-[0_0_24px_rgba(168,234,255,0.35)]"
                          : "bg-black/40 border-white/10 text-white/55",
                      ].join(" ")}
                    >
                      <Icon
                        size={13}
                        className={
                          active
                            ? "text-[#a8eaff]"
                            : "text-white/55"
                        }
                      />
                      <span className="truncate">{f.label}</span>
                      {active && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: pal.dot,
                            boxShadow: `0 0 10px ${pal.dot}`,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* デスクトップのパンくず */}
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-white/40 mb-3">
              <span>root</span>
              <span>/</span>
              <span className="text-white/70">
                {currentFolder}
              </span>
            </div>

            {/* ファイルグリッド */}
            <div className="mt-1 flex-1 overflow-y-auto pb-10">
              {filteredItems.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-white/45">
                  no files in this folder
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredItems.map((item) => {
                    const isSelected = selectedId === item.id;
                    const pal = getPalette(item.folder);
                    const isImage =
                      item.file?.endsWith(".png") ||
                      item.file?.endsWith(".jpg") ||
                      item.file?.endsWith(".jpeg") ||
                      item.file?.endsWith(".webp");

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className="relative text-left group"
                        style={{
                          WebkitTapHighlightColor: "transparent",
                        }}
                      >
                        <div
                          className={[
                            "relative rounded-2xl border overflow-hidden backdrop-blur-xl transition-all duration-500",
                            "bg-black/60",
                            isSelected ? "border-white/20" : "border-white/10",
                          ].join(" ")}
                          style={{
                            opacity: isSelected ? 1 : 0.72,
                            filter: isSelected
                              ? "brightness(1.02)"
                              : "brightness(0.88)",
                            boxShadow: isSelected
                              ? `0 30px 90px -60px rgba(0,0,0,0.95),
                                  0 0 80px ${pal.aura1}`
                              : "0 24px 80px -70px rgba(0,0,0,0.9)",
                            transform: isSelected
                              ? "translateY(-2px) scale(1.02)"
                              : "translateY(0) scale(1)",
                          }}
                        >
                          {/* プレビュー領域 */}
                          <div className="relative aspect-[7/9] bg-[#05070a]">
                            {isImage ? (
                              <div className="absolute inset-0">
                                <img
                                  src={item.file}
                                  alt={item.title}
                                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-active:scale-[1.02] group-hover:scale-[1.03]"
                                  loading="lazy"
                                  draggable={false}
                                />
                                {/* カテゴリオーラ */}
                                <div
                                  className="absolute inset-0 pointer-events-none"
                                  style={{
                                    backgroundImage: `
                                      radial-gradient(520px 360px at 30% 12%, ${pal.aura1}, transparent 60%),
                                      radial-gradient(520px 360px at 80% 95%, ${pal.aura2}, transparent 62%)
                                    `,
                                  }}
                                />
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                              </div>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#10141f] to-[#05070b]">
                                <FileText
                                  size={26}
                                  className="text-white/45"
                                />
                              </div>
                            )}

                            {/* ✅ 右下タグ：カテゴリ色で呼吸グロー */}
<div
  className="absolute bottom-2 right-2 rounded-full px-2 py-1 text-[9px] font-mono uppercase tracking-[0.22em] border"
  style={{
    backgroundColor: isSelected
      ? "rgba(0,0,0,0.82)"
      : "rgba(0,0,0,0.7)",
    borderColor: isSelected
      ? pal.dot
      : "rgba(255,255,255,0.25)",
    color: isSelected
      ? pal.dot
      : "rgba(255,255,255,0.75)",
    animation: isSelected
      ? "finderPulse 3.4s ease-in-out infinite"
      : "none",
    transform: "translateY(1px)",   // ★ ここでほんの少しだけ下げる
  }}
>
  {item.meta || "FILE"}
</div>

                            {/* 左上フォルダドット */}
                            <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/65 border border-white/15">
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  background: pal.dot,
                                  boxShadow: `0 0 10px ${pal.dot}`,
                                }}
                              />
                              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text.white/70">
                                {item.folder}
                              </span>
                            </div>
                          </div>

                          {/* ✨ Gallery と同じ感じの横線（選択時だけ光る） */}
                          <div
                            className="mx-2 mt-1 h-[1px] rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-opacity duration-300"
                            style={{
                              opacity: isSelected ? 0.9 : 0,
                              boxShadow: isSelected
                                ? `0 0 18px ${pal.aura1}`
                                : "none",
                            }}
                          />

                          {/* ファイル名 */}
                          <div className="px-2.5 py-2.5">
                            <div className="text-[11px] text-white/90 truncate">
                              {item.title}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};








// ------------------------------------------------
// 🌸🌸 02.GALLERY APP (ぎゃらりー)🖼️🎨🖌️ 🌸🌸🌸🌸--
//------------------------------------------------

const GalleryApp = () => {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = 閉じてる
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const lastTapRef = useRef(null);
  const lastTapIdRef = useRef(null);
  const touchStartRef = useRef(null);
  const isMobile = useIsMobile();

  // ---------------- fonts + 自前CSS（呼吸ドット） ----------------
  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "osbunny-gallery-style";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@300;400;500;600&family=Noto+Sans+JP:wght@300;400;500&display=swap');

      @keyframes osbunny-pulse-dot {
        0%, 100% { opacity: 0.30; transform: scale(1); }
        40%      { opacity: 1.00; transform: scale(1.45); }
      }
      .osbunny-pulse-dot {
        animation: osbunny-pulse-dot 3.4s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const CATEGORIES = [
    { id: "all", label: "All", icon: Layers },
    { id: "system", label: "System", icon: Cpu },
    { id: "key", label: "Emotion Key", icon: KeyIcon },
    { id: "emotion", label: "Heart Error", icon: AlertCircle },
    { id: "life", label: "Life Log", icon: Heart },
    { id: "work", label: "Work", icon: Coffee },
    { id: "magic", label: "Magic", icon: Wand2 },
  ];

  // カテゴリごとの色パレット
  const getPalette = (folder) => {
    switch (folder) {
      case "system":
        return {
          dot: "#a8eaff",
          aura1: "rgba(168,234,255,0.30)",
          aura2: "rgba(185,168,255,0.18)",
        };
      case "emotion":
        return {
          dot: "#ffc8e8",
          aura1: "rgba(255,200,232,0.32)",
          aura2: "rgba(203,184,255,0.22)",
        };
      case "magic":
        return {
          dot: "#cbb8ff",
          aura1: "rgba(203,184,255,0.34)",
          aura2: "rgba(168,234,255,0.22)",
        };
      case "work":
        return {
          dot: "#b6ffe4",
          aura1: "rgba(182,255,228,0.30)",
          aura2: "rgba(185,168,255,0.18)",
        };
      case "life":
        return {
          dot: "#bde0ff",
          aura1: "rgba(189,224,255,0.30)",
          aura2: "rgba(255,200,232,0.20)",
        };
      default:
        return {
          dot: "#a8eaff",
          aura1: "rgba(168,234,255,0.28)",
          aura2: "rgba(255,200,232,0.18)",
        };
    }
  };

  // 画面全体のアクセント（/emotion フィルタ中はピンクに振れる）
  const accentPalette =
    filter === "all"
      ? getPalette("system")
      : filter === "key"
      ? getPalette("emotion")
      : getPalette(filter);
  const accentDot = accentPalette.dot;

  // ---- Filter + Search ----
  const filteredItems = useMemo(() => {
    let items = GALLERY_ITEMS;

    if (filter === "key") {
      items = items.filter((item) =>
        item.title?.toLowerCase().endsWith(".key")
      );
    } else if (filter !== "all") {
      items = items.filter((item) => item.folder === filter);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter((item) => {
        const title = item.title?.toLowerCase() || "";
        const desc = item.desc?.toLowerCase() || "";
        const meta = item.meta?.toLowerCase() || "";
        const folder = item.folder?.toLowerCase() || "";
        const cat = item.cat?.toLowerCase() || "";
        return (
          title.includes(q) ||
          desc.includes(q) ||
          meta.includes(q) ||
          folder.includes(q) ||
          cat.includes(q)
        );
      });
    }

    return items;
  }, [filter, query]);

  const hasLightbox = lightboxIndex !== null;
  const activeItem =
    hasLightbox && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;
  const activeLightboxPalette = activeItem
    ? getPalette(activeItem.folder || activeItem.cat)
    : accentPalette;

  // ---- Lightbox helpers ----
  const openLightboxAt = useCallback(
    (index) => {
      if (!filteredItems[index]) return;
      setLightboxIndex(index);
      setActiveId(filteredItems[index].id);
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
    },
    [filteredItems]
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setActiveId(null);
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, []);

  const goNext = useCallback(() => {
    if (!hasLightbox) return;
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      const next = (prev + 1) % filteredItems.length;
      setActiveId(filteredItems[next].id);
      return next;
    });
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [hasLightbox, filteredItems]);

  const goPrev = useCallback(() => {
    if (!hasLightbox) return;
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      const next = (prev - 1 + filteredItems.length) % filteredItems.length;
      setActiveId(filteredItems[next].id);
      return next;
    });
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [hasLightbox, filteredItems]);

  // ---- Keyboard shortcuts (Desktop) ----
  useEffect(() => {
    if (!hasLightbox) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [hasLightbox, closeLightbox, goNext, goPrev]);

  // ---- Double tap / double click ----
  const TAP_DELAY = 260; // ms
  const handleCardTap = (index, id) => {
    const now = Date.now();
    setActiveId(id); // シングルタップは「選択」だけ（プレビューは開かない）

    if (
      lastTapRef.current &&
      now - lastTapRef.current < TAP_DELAY &&
      lastTapIdRef.current === id
    ) {
      openLightboxAt(index);
    }

    lastTapRef.current = now;
    lastTapIdRef.current = id;
  };

  // ---- Touch swipe for lightbox ----
  const handleTouchStart = (e) => {
    if (!hasLightbox) return;
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
    setIsDragging(true);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchMove = (e) => {
    if (!hasLightbox || !touchStartRef.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handleTouchEnd = () => {
    if (!hasLightbox || !touchStartRef.current) {
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
      return;
    }
    const { x, y } = dragOffset;
    const absX = Math.abs(x);
    const absY = Math.abs(y);

    const SWIPE_THRESHOLD = 54;

    if (absY > absX && y > SWIPE_THRESHOLD) {
      // 下スワイプ → 閉じる
      closeLightbox();
    } else if (absX > absY && absX > SWIPE_THRESHOLD) {
      // 横スワイプ → 前後
      if (x < 0) goNext();
      else goPrev();
    }

    touchStartRef.current = null;
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // ---- Swipe feel: opacity / scale / glow follow ----
  const dragDistance = Math.sqrt(dragOffset.x ** 2 + dragOffset.y ** 2);
  const dragRatio = Math.min(dragDistance / 260, 1);

  const overlayOpacity = hasLightbox ? 0.94 - dragRatio * 0.32 : 0;

  const imageTransform = hasLightbox
    ? `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) scale(${
        1 - dragRatio * 0.07
      })`
    : "translate3d(0,0,0) scale(1)";

  const imageTransition = isDragging
    ? "none"
    : "transform 320ms cubic-bezier(0.22,1,0.36,1), opacity 320ms cubic-bezier(0.22,1,0.36,1)";

  // ---- desc 表示ルール ----
  const shouldShowDesc = (raw) => {
    if (!raw) return false;
    const t = String(raw).trim();
    if (!t) return false;
    return !/^visual memory fragment\.?$/i.test(t);
  };

  return (
    <div className="flex h-full bg-[#020204] relative overflow-hidden">
      {/* Ambient background light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#a8eaff]/18 blur-[70px]" />
        <div className="absolute top-1/3 -right-28 w-[460px] h-[460px] rounded-full bg-[#b9a8ff]/14 blur-[86px]" />
        <div className="absolute -bottom-24 left-1/4 w-[520px] h-[520px] rounded-full bg-[#ffc8e8]/12 blur-[92px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
      </div>

      {/* Left Sidebar（スマホは縦アイコンのみ） */}
      <div
        className="relative z-10 w-14 sm:w-52 border-r border-white/10 bg-black/70 backdrop-blur-2xl flex flex-col overflow-hidden"
        style={{
          boxShadow: `0 0 40px ${accentDot}44`,
          backgroundImage: `linear-gradient(180deg, rgba(5,5,7,0.96), rgba(2,2,4,0.98)),
            radial-gradient(520px 520px at 0% 0%, ${accentPalette.aura1}, transparent 70%)`,
        }}
      >
        {/* アクセントの縦ライン */}
        <div
          className="absolute inset-y-0 left-0 w-[3px] rounded-r-full"
          style={{
            background: `linear-gradient(180deg, ${accentDot}, transparent)`,
            boxShadow: `0 0 30px ${accentDot}`,
          }}
        />

        {/* Sidebar Header */}
        <div className="hidden sm:flex items-center gap-2 px-5 py-4 border-b border-white/10">
          <div
            className="w-2 h-2 rounded-full osbunny-pulse-dot"
            style={{
              background: accentDot,
              boxShadow: `0 0 18px ${accentDot}`,
            }}
          />
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.28em] text-white/45">
              RABBIT OS
            </span>
            <span className="text-xs text-white/85 tracking-wide">
              archive
            </span>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex-1 overflow-y-auto py-3 sm:py-5">
          <div className="flex flex-col gap-2 px-1 sm:px-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = filter === cat.id;
              const pal = getPalette(
                cat.id === "all"
                  ? "system"
                  : cat.id === "key"
                  ? "emotion"
                  : cat.id
              );

              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={[
                    "group relative flex items-center justify-center sm:justify-start gap-2 rounded-2xl border",
                    "text-[11px] px-0 sm:px-3.5 py-1.5 sm:py-2 w-full transition-all duration-300",
                    active
                      ? "border-white/25 bg-[#050b11]/95 shadow-[0_0_30px_rgba(168,234,255,0.45)]"
                      : "border-white/10 bg-white/0 hover:bg-white/5 hover:border-white/25",
                  ].join(" ")}
                  style={
                    active
                      ? {
                          boxShadow: `0 0 0 1px rgba(255,255,255,0.18) inset, 0 24px 80px -40px rgba(0,0,0,0.95), 0 0 40px ${pal.aura1}`,
                        }
                      : undefined
                  }
                >
                  <Icon
                    size={16}
                    className={
                      active
                        ? "text-[#a8eaff] drop-shadow-[0_0_12px_rgba(168,234,255,0.9)]"
                        : "text-white/58 group-hover:text-white/90"
                    }
                  />
                  <span className="hidden sm:inline tracking-wide truncate">
                    {cat.label}
                  </span>
                  {active && (
                    <span
                      className="hidden sm:block ml-auto w-1.5 h-1.5 rounded-full osbunny-pulse-dot"
                      style={{
                        background: pal.dot,
                        boxShadow: `0 0 12px ${pal.dot}`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden sm:flex flex-col gap-1 px-5 py-3 border-t border-white/10 text-[9px] text-white/38 tracking-[0.18em]">
          <span>/log: idle</span>
          <span>/signal: sync</span>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-black/25">
          <div className="flex items-center gap-2">
            <span
              className="w-1 h-1 rounded-full osbunny-pulse-dot"
              style={{
                background: accentDot,
                boxShadow: `0 0 18px ${accentDot}`,
              }}
            />
            <span className="text-[10px] uppercase tracking-[0.34em] text-white/48">
              ・ /gallery
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[11px] text-white/45 w-full sm:w-auto">
            {/* Search bar：アイコン＋グラス感 */}
            <div className="flex-1 min-w-[160px] max-w-[320px]">
              <div className="flex items-center gap-2 rounded-full bg-black/50 border border-white/16 backdrop-blur-xl px-2 py-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.85)]">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center border border-white/25 bg-gradient-to-br from-black/40 to-black/10"
                  style={{
                    boxShadow: `0 0 18px ${accentDot}44`,
                  }}
                >
                  <Search size={13} className="text-white/70" />
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="search / title, tag, note"
                  className="flex-1 bg-transparent text-[11px] text-white placeholder:text-white/30 focus:outline-none"
                />
                {!isMobile && (
                  <span className="hidden sm:inline text-[9px] text-white/35 font-mono tracking-[0.18em] px-2 py-0.5 rounded-full border border-white/15">
                    ⌘K
                  </span>
                )}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 whitespace-nowrap">
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                {filteredItems.length} items
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6">
          {filteredItems.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs text-white/40">
              no archive in this layer
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 pb-16">
              {filteredItems.map((item, idx) => {
                const isActive = activeId === item.id;
                const pal = getPalette(item.folder || item.cat);
                const rawDesc = item.desc || "";
                const showDesc = shouldShowDesc(rawDesc);

                return (
                  <div
                    key={item.id}
                    className="group relative cursor-pointer"
                    onClick={() => handleCardTap(idx, item.id)}
                    onDoubleClick={() => openLightboxAt(idx)}
                  >
                    <div
                      className={[
                        "relative overflow-hidden rounded-2xl border bg-black/60 backdrop-blur-xl",
                        isActive ? "border-white/30" : "border-white/12",
                        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        mounted
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-3",
                      ].join(" ")}
                      style={{
                        boxShadow: isActive
                          ? `0 0 0 1px rgba(255,255,255,0.18) inset,
                             0 40px 120px -80px rgba(0,0,0,0.95),
                             0 0 90px ${pal.aura1}`
                          : "0 0 0 1px rgba(0,0,0,0.5) inset, 0 30px 90px -80px rgba(0,0,0,0.9)",
                        transform: isActive
                          ? "translateY(-2px) scale(1.01)"
                          : "translateY(0) scale(1)",
                        filter: isActive
                          ? "brightness(1) saturate(1)"
                          : "brightness(0.72) saturate(0.9)",
                        opacity: isActive ? 1 : 0.78,
                        transitionDelay: mounted ? `${idx * 32}ms` : "0ms",
                      }}
                    >
                      <div className="aspect-[4/3] relative">
                        <img
                          src={item.file}
                          alt={item.title}
                          className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          loading="lazy"
                        />

                        {/* ambient aura */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            backgroundImage: `
                              radial-gradient(520px 360px at 30% 18%, ${pal.aura1}, transparent 60%),
                              radial-gradient(520px 360px at 75% 88%, ${pal.aura2}, transparent 62%)
                            `,
                          }}
                        />
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

                        {/* scan line */}
                        <div className="absolute inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 -translate-y-full group-hover:opacity-70 group-hover:translate-y-full transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none" />

                        {/* badge */}
                        <div className="absolute top-2 left-2 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur text-[9px] text-white/75 tracking-[0.22em] uppercase border border-white/14">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: pal.dot,
                              boxShadow: `0 0 12px ${pal.dot}`,
                            }}
                          />
                          <span>{item.folder || item.cat}</span>
                        </div>

                        {/* active ring */}
                        {isActive && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div
                              className="absolute inset-0"
                              style={{
                                boxShadow:
                                  "inset 0 0 0 1px rgba(255,255,255,0.24), inset 0 -40px 80px rgba(0,0,0,0.9)",
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* text area */}
                      <div className="px-3.5 py-3 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-medium text-white/92 truncate">
                            {item.title}
                          </span>
                          {/* 選択インジケータ：呼吸ドット */}
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? "osbunny-pulse-dot" : ""
                            }`}
                            style={{
                              background: isActive
                                ? pal.dot
                                : "rgba(255,255,255,0.22)",
                              boxShadow: isActive
                                ? `0 0 12px ${pal.dot}`
                                : "none",
                            }}
                          />
                        </div>

                        {/* desc: "Visual memory fragment" は出さない */}
                        {showDesc && (
                          <div className="text-[10px] text-white/50 leading-relaxed line-clamp-2">
                            {rawDesc}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {hasLightbox && activeItem && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{
            backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
          }}
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 背景アート */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 backdrop-blur-[18px]" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_10%,rgba(168,234,255,0.18),transparent_62%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_90%,rgba(255,200,232,0.16),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay bg-[linear-gradient(transparent,rgba(255,255,255,0.06),transparent)] [background-size:100%_4px]" />
          </div>

          {/* inner frame */}
          <div
            className="relative max-w-[96vw] max-h-[90vh] w-full sm:w-auto px-4 sm:px-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-[32px] border bg-white/[0.03] backdrop-blur-2xl overflow-hidden"
              style={{
                borderColor: "rgba(255,255,255,0.22)",
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.06) inset,
                  0 80px 200px -100px rgba(0,0,0,0.95),
                  0 0 140px ${activeLightboxPalette.aura1}
                `,
              }}
            >
              {/* 内側にうっすらライン */}
              <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/10 opacity-60 mix-blend-soft-light" />

              {/* close */}
              <button
                className="absolute z-[5] right-4 top-4 w-11 h-11 rounded-full flex items-center justify-center bg-black/55 border border-white/30 hover:border-white/70 backdrop-blur-2xl active:scale-[0.94] transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(168,234,255,0.5)]"
                onClick={closeLightbox}
              >
                <X size={18} className="text-white/92" />
              </button>

              {/* 右下タイトルピル */}
              <div className="absolute z-[5] right-4 bottom-4">
                <div
                  className="px-4 py-2.5 rounded-full border bg-black/70 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.85)] flex items-center gap-2"
                  style={{
                    borderColor: activeLightboxPalette.dot,
                    boxShadow: `0 0 40px ${activeLightboxPalette.aura1}`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full osbunny-pulse-dot"
                    style={{
                      background: activeLightboxPalette.dot,
                      boxShadow: `0 0 14px ${activeLightboxPalette.dot}`,
                    }}
                  />
                  <div className="text-[12px] sm:text-[13px] text-white/94 tracking-wide">
                    {activeItem.title}
                  </div>
                </div>
              </div>

              {/* HUDメタ（左上） */}
              <div className="absolute z-[5] left-4 top-4 text-[9px] font-mono tracking-[0.28em] uppercase text-white/55">
                <div>/gallery</div>
                <div className="mt-1">
                  {lightboxIndex + 1} / {filteredItems.length}
                </div>
              </div>

              {/* image */}
              <div className="relative w-full h-[70vh] sm:h-[78vh] flex items-center justify-center">
                {/* ライトのオーラ */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_50%_40%,rgba(255,255,255,0.12),transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_20%_0%,rgba(168,234,255,0.20),transparent_60%)] mix-blend-screen" />
                  <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_80%_100%,rgba(203,184,255,0.20),transparent_60%)] mix-blend-screen" />
                </div>

                <img
                  src={activeItem.file}
                  alt={activeItem.title}
                  className="max-h-full max-w-full object-contain"
                  style={{
                    transform: imageTransform,
                    transition: imageTransition,
                  }}
                />
              </div>

              {/* 下辺の“呼吸グロー” */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};











// ------------------------------------------------
// 🌸03.MUSIC APP みゅ＾じっく)🎵🌸🌸🌸🌸🌸🌸🌸 --
// ------------------------------------------------
const MusicApp = ({ bgm }) => {
  return (
    <div className="h-full flex flex-col bg-black relative overflow-hidden">
      {/* Background with Lavender/Mint Haze */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,234,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(253,164,175,0.05),transparent_50%)]"></div>

      {/* Visualizer Ring (Vinyl with Rabbit) */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="relative group cursor-pointer" onClick={bgm.toggle}>
          <div
            className={`w-56 h-56 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden transition-all duration-700 ${
              bgm.isPlaying
                ? "scale-100 shadow-[0_0_50px_rgba(168,234,255,0.2)]"
                : "scale-95 opacity-70"
            }`}
          >
            {/* Rotating Container for Record & Image */}
            <div
              className={`absolute inset-0 rounded-full transition-transform duration-[3000ms] ease-linear ${
                bgm.isPlaying ? "animate-[spin_3s_linear_infinite]" : ""
              }`}
            >
              {/* 1. Vinyl Base (Black) */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, #080808 30%, #111 100%)",
                  boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)",
                }}
              ></div>

              {/* 2. Rabbit Image (Centered, slightly transparent) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={ASSETS.musicRabbit}
                  alt="Listening Rabbit"
                  className="w-[85%] h-[85%] object-contain opacity-90 drop-shadow-[0_0_10px_rgba(168,234,255,0.3)]"
                />
              </div>

              {/* 3. Vinyl Grooves & Sheen Overlays (Blended over image) */}
              {/* Conic Sheen */}
              <div className="absolute inset-0 rounded-full opacity-20 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.4)_45deg,transparent_90deg,transparent_180deg,rgba(255,255,255,0.4)_225deg,transparent_270deg)] mix-blend-overlay"></div>
              {/* Grooves */}
              <div
                className="absolute inset-0 rounded-full opacity-10"
                style={{
                  background:
                    "repeating-radial-gradient(#fff 0, #fff 1px, transparent 2px, transparent 4px)",
                }}
              ></div>
            </div>

            {/* Playback Ripple Effect */}
            {bgm.isPlaying && (
              <div className="absolute inset-[-20px] rounded-full border border-[#a8eaff]/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            )}
          </div>
        </div>
      </div>

      <div className="h-auto min-h-[140px] bg-black/60 backdrop-blur-2xl border-t border-white/5 p-8 flex flex-col justify-end relative z-20 pb-20 sm:pb-8">
        <div className="flex items-end justify-between mb-6">
          <div className="flex flex-col gap-1 w-3/4">
            <h3 className="text-lg font-light text-white tracking-widest uppercase overflow-hidden text-ellipsis whitespace-nowrap">
              {bgm.currentSong.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#cbb8ff]/50"></span>
              <p className="text-[10px] text-white/40 font-mono tracking-[0.2em] uppercase">
                {bgm.currentSong.artist}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {bgm.isLoading && (
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></div>
            )}
            <Activity
              className={`text-[#a8eaff]/50 ${
                bgm.isPlaying ? "animate-pulse" : "opacity-20"
              }`}
              size={16}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={bgm.prev}
            className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 hover:border-white/10 transition-all text-white/60"
          >
            <SkipBack size={14} />
          </button>
          <button
            onClick={bgm.toggle}
            className="flex-1 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] group"
          >
            {bgm.isPlaying ? (
              <Pause size={18} fill="black" />
            ) : (
              <Play size={18} fill="black" className="ml-1" />
            )}
            <span className="ml-3 text-[10px] font-bold tracking-widest uppercase group-hover:tracking-[0.25em] transition-all duration-300">
              {bgm.isPlaying ? "Pause" : "Play"}
            </span>
          </button>
          <button
            onClick={bgm.next}
            className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 hover:border-white/10 transition-all text-white/60"
          >
            <SkipForward size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};





// ------------------------------------------------
// 🌸 04.SAFARI (ねっとわーく --🛜🌸🌸🌸🌸🌸🌸
// ------------------------------------------------

const SafariApp = () => {
  const [page, setPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);

  const isMobile = useIsMobile();

  // idle表示（呼吸）
  const [netText, setNetText] = useState("IDLE");
  const [ping, setPing] = useState(12);

  // internal history（←ボタン用）
  const stackRef = useRef(["home"]);

  // spotlight（マウスで光が追従）※モバイルは固定
  const [spot, setSpot] = useState({ x: 50, y: 35, on: false });

  // ノード（constellation）: 一度だけ生成して固定
  const nodes = useMemo(() => {
    // “キレイに見える”範囲に寄せて散らす
    const count = isMobile ? 10 : 14;
    const arr = [];
    for (let i = 0; i < count; i++) {
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 70;
      const s = 0.7 + Math.random() * 1.35;
      const d = Math.random() * 3.5;
      const hue = i % 3; // 0 mint,1 lav,2 pink
      arr.push({ id: `n${i}`, x, y, s, d, hue });
    }
    return arr;

  }, [isMobile]);

  const links = useMemo(() => {
    // 近いもの同士をゆるく繋ぐ（過密にしない）
    const res = [];
    const max = isMobile ? 10 : 16;

    const dist = (a, b) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    // 最短リンクを作る簡易法
    const used = new Set();
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      let best = null;
      let bestJ = -1;
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const b = nodes[j];
        const dd = dist(a, b);
        if (dd < 26 && (!best || dd < best)) {
          best = dd;
          bestJ = j;
        }
      }
      if (bestJ >= 0) {
        const key = `${Math.min(i, bestJ)}-${Math.max(i, bestJ)}`;
        if (!used.has(key)) {
          used.add(key);
          res.push({ a: nodes[i], b: nodes[bestJ] });
        }
      }
      if (res.length >= max) break;
    }
    return res;
  }, [nodes, isMobile]);

  // keyframes（1回だけ注入）
  useEffect(() => {
    const id = "osbunny-safari-awwwards-keyframes";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      /* ---- Core pulses (Gallery の質感に寄せる) ---- */
      @keyframes osbPulseDot {
        0%,100% { transform: translateY(0) scale(1); opacity:.72; filter: drop-shadow(0 0 10px rgba(168,234,255,.22)); }
        50% { transform: translateY(-.6px) scale(1.18); opacity:1; filter: drop-shadow(0 0 22px rgba(168,234,255,.55)) drop-shadow(0 0 12px rgba(203,184,255,.25)); }
      }
      @keyframes osbShimmerText {
        0% { opacity:.82; filter: drop-shadow(0 0 10px rgba(168,234,255,.18)); }
        50% { opacity:1; filter: drop-shadow(0 0 26px rgba(168,234,255,.45)) drop-shadow(0 0 14px rgba(255,200,232,.18)); }
        100% { opacity:.82; filter: drop-shadow(0 0 10px rgba(168,234,255,.18)); }
      }
      @keyframes osbScan {
        0% { transform: translateY(-140%); opacity:0; }
        12% { opacity:.35; }
        100% { transform: translateY(160%); opacity:0; }
      }
      @keyframes osbNoise {
        0%,100% { opacity:.09; }
        50% { opacity:.14; }
      }
      @keyframes osbFloat {
        0%,100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      @keyframes osbFlicker {
        0%,100% { opacity:.55; }
        40% { opacity:.85; }
        55% { opacity:.62; }
        70% { opacity:.92; }
      }
      @keyframes osbLinkGlow {
        0%,100% { opacity:.25; filter: drop-shadow(0 0 0 rgba(168,234,255,0)); }
        50% { opacity:.55; filter: drop-shadow(0 0 18px rgba(168,234,255,.35)); }
      }
      @keyframes osbAppear {
        from { transform: translateY(6px); opacity:0; }
        to { transform: translateY(0); opacity:1; }
      }

      /* Reduce motion */
      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // “生きてる” ping（loading中は更新しない）
  useEffect(() => {
    const interval = setInterval(() => {
      setPing((prev) => {
        const base = 8 + Math.random() * 14; // 8〜22ms
        const next = Math.round(prev * 0.55 + base * 0.45);
        return Math.max(6, Math.min(28, next));
      });
      setNetText((prev) => (prev === "IDLE" ? "HEARTBEAT" : "IDLE"));
    }, isMobile ? 2600 : 3200);

    return () => clearInterval(interval);
  }, [isMobile]);

  // ✅ 最新SYNC挙動の核：押した時だけSYNCを出す（※ここは絶対に変えない）
  const triggerSync = (after) => {
    setLoading(true);
    setShowResult(false);
    setTimeout(() => {
      if (after) after();
      setLoading(false);
    }, 1200);
  };

  const navigate = (target) => {
    if (target === page) return;
    triggerSync(() => {
      stackRef.current = [...stackRef.current, target].slice(-20);
      setPage(target);
    });
  };

  const goBack = () => {
    if (stackRef.current.length <= 1) return;
    triggerSync(() => {
      const nextStack = stackRef.current.slice(0, -1);
      stackRef.current = nextStack;
      setPage(nextStack[nextStack.length - 1] || "home");
    });
  };

  const refresh = () => {
    triggerSync(() => {});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    triggerSync(() => setShowResult(true));
  };

  const PulseDot = ({ tone = "mint" }) => {
    const color =
      tone === "lav"
        ? "#cbb8ff"
        : tone === "pink"
        ? "#ffc8e8"
        : "#a8eaff";
    return (
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 18px ${color}`,
          animation: "osbPulseDot 3.4s ease-in-out infinite",
        }}
      />
    );
  };

  const IconPill = ({
    icon: Icon,
    label,
    onClick,
    hint,
    tone = "mint",
  }) => {
    const c =
      tone === "lav"
        ? "rgba(203,184,255,0.85)"
        : tone === "pink"
        ? "rgba(255,200,232,0.85)"
        : "rgba(168,234,255,0.90)";
    const aura =
      tone === "lav"
        ? "rgba(203,184,255,0.22)"
        : tone === "pink"
        ? "rgba(255,200,232,0.18)"
        : "rgba(168,234,255,0.22)";

    return (
      <button
        type="button"
        onClick={onClick}
        className="group relative flex flex-col items-center gap-2 select-none"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div
          className={[
            "relative w-12 h-12 rounded-2xl border overflow-hidden",
            "bg-black/45 backdrop-blur-2xl",
            "shadow-[0_24px_70px_rgba(0,0,0,0.85)]",
            "transition-all duration-300",
            "border-white/12 group-hover:border-white/25",
          ].join(" ")}
        >
          {/* aura */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(420px 280px at 30% 20%, ${aura}, transparent 60%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent opacity-60" />
          {/* scan */}
          <div
            className="pointer-events-none absolute inset-x-0 h-[1px] opacity-0 group-hover:opacity-50"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
              animation: "osbScan 4.8s linear infinite",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon
              size={16}
              className="transition-transform duration-300 group-hover:scale-[1.06]"
              style={{ color: c }}
            />
          </div>
        </div>

        <div className="text-[10px] font-mono tracking-[0.26em] uppercase text-white/55 group-hover:text-white/85 transition-colors">
          {label}
        </div>
        {hint && (
          <div className="text-[9px] font-mono tracking-[0.22em] text-white/28 -mt-1">
            {hint}
          </div>
        )}
      </button>
    );
  };

  const Tab = ({ id, label }) => {
    const active = page === id;
    return (
      <button
        type="button"
        onClick={() => navigate(id)}
        className={[
          "relative px-3 py-[6px] rounded-full border text-[9px] font-mono uppercase tracking-[0.26em] transition-all select-none",
          active
            ? "border-white/28 bg-white/10 text-white shadow-[0_0_30px_rgba(168,234,255,0.16)]"
            : "border-transparent bg-transparent text-white/50 hover:bg-white/5 hover:text-white/85",
        ].join(" ")}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {label}
        {active && (
          <span
            className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent"
            style={{ boxShadow: "0 0 18px rgba(168,234,255,0.35)" }}
          />
        )}
      </button>
    );
  };

  // ---------- Pages ----------
  const HomePage = () => (
    <div
      className="relative px-6 py-14 sm:py-18 flex flex-col items-center text-center"
      style={{
        minHeight: isMobile ? "calc(100vh - 80px)" : "calc(100vh - 96px)",
        animation: "osbAppear .55s ease-out both",
      }}
      onMouseMove={(e) => {
        if (isMobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setSpot({ x, y, on: true });
      }}
      onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
    >
      <div className="relative w-full max-w-md sm:max-w-lg z-10">
        {/* Hero block */}
        <div className="relative rounded-3xl border border-white/12 bg-black/45 backdrop-blur-2xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.92)]">
          {/* constellation */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/60" />
            <div
              className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
              style={{
                background:
                  "linear-gradient(transparent, rgba(255,255,255,0.08), transparent)",
                backgroundSize: "100% 4px",
                animation: "osbNoise 5.2s ease-in-out infinite",
              }}
            />
            {/* spotlight */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: isMobile ? 0.65 : spot.on ? 0.75 : 0.45,
                background: `radial-gradient(520px 380px at ${
                  isMobile ? "50% 35%" : `${spot.x}% ${spot.y}%`
                }, rgba(168,234,255,0.20), rgba(203,184,255,0.14), rgba(255,200,232,0.10), transparent 60%)`,
              }}
            />
            {/* links */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {links.map((l, idx) => (
                <g key={`l${idx}`} opacity="0.7">
                  <line
                    x1={l.a.x}
                    y1={l.a.y}
                    x2={l.b.x}
                    y2={l.b.y}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="0.35"
                  />
                  <line
                    x1={l.a.x}
                    y1={l.a.y}
                    x2={l.b.x}
                    y2={l.b.y}
                    stroke="rgba(168,234,255,0.16)"
                    strokeWidth="0.7"
                    style={{ animation: "osbLinkGlow 4.6s ease-in-out infinite" }}
                  />
                </g>
              ))}
            </svg>
            {/* nodes */}
            {nodes.map((n) => {
              const tone = n.hue === 1 ? "lav" : n.hue === 2 ? "pink" : "mint";
              const color =
                tone === "lav"
                  ? "rgba(203,184,255,0.95)"
                  : tone === "pink"
                  ? "rgba(255,200,232,0.95)"
                  : "rgba(168,234,255,0.95)";
              const aura =
                tone === "lav"
                  ? "rgba(203,184,255,0.22)"
                  : tone === "pink"
                  ? "rgba(255,200,232,0.18)"
                  : "rgba(168,234,255,0.22)";
              return (
                <div
                  key={n.id}
                  className="absolute rounded-full"
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    width: `${6 * n.s}px`,
                    height: `${6 * n.s}px`,
                    transform: "translate(-50%,-50%)",
                    background: color,
                    boxShadow: `0 0 16px ${color}, 0 0 60px ${aura}`,
                    opacity: 0.65,
                    animation: `osbFloat ${4.4 + n.d}s ease-in-out infinite`,
                  }}
                />
              );
            })}

            {/* scanline */}
            <div
              className="pointer-events-none absolute inset-x-0 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
                opacity: 0.28,
                animation: "osbScan 5.6s linear infinite",
              }}
            />
          </div>

          <div className="relative px-6 py-10 sm:py-12">
            <div className="flex flex-col items-center gap-2 mb-7 sm:mb-9">
              <div className="inline-flex items-center gap-2">
                <PulseDot />
                <h1
                  className="text-[20px] sm:text-[30px] font-light tracking-[0.35em] text-white/92 uppercase"
                  style={{ animation: "osbShimmerText 4.6s ease-in-out infinite" }}
                >
                  VOID NETWORK
                </h1>
              </div>
              <p className="text-[10px] sm:text-xs text-white/45 font-mono tracking-[0.3em]">
                quiet signals · soft synchronization
              </p>
            </div>

            {/* omnibox */}
            <form onSubmit={handleSearch} className="w-full relative group">
              <div className="absolute inset-0 rounded-full opacity-35 blur-[18px] pointer-events-none bg-[linear-gradient(90deg,rgba(168,234,255,0.22),rgba(203,184,255,0.16),rgba(255,200,232,0.16))]" />
              <div className="relative flex items-center rounded-full bg-black/55 border border-white/16 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.88)] focus-within:border-[#a8eaff]/70 transition-all">
                <div className="pl-4 pr-2 flex items-center gap-2 text-white/55 font-mono text-[10px] tracking-[0.22em]">
                  <Globe size={13} className="text-white/60" />
                  <span className="text-white/35">https</span>
                  <span className="text-white/25">://</span>
                  <span className="text-white/70">os-usagi</span>
                </div>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="search / feelings…"
                  className="flex-1 bg-transparent py-3.5 px-2 text-[11px] text-white placeholder:text-white/28 focus:outline-none font-mono tracking-[0.28em] text-center"
                />
                <button
                  type="submit"
                  className="mr-2 w-9 h-9 rounded-full bg-white/8 border border-white/22 flex items-center justify-center text-white/65 hover:text-[#a8eaff] hover:bg-white/12 active:scale-[0.96] transition-all"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                  aria-label="Search"
                >
                  <Search size={14} />
                </button>
              </div>
            </form>

            {/* result */}
            {showResult && !loading && (
              <div className="mt-6 mx-auto w-full max-w-md">
                <div className="relative rounded-2xl border border-white/12 bg-black/55 backdrop-blur-2xl overflow-hidden shadow-[0_30px_110px_rgba(0,0,0,0.9)]">
                  <div className="absolute inset-0 opacity-70 bg-gradient-to-b from-white/[0.07] via-transparent to-black/60" />
                  <div
                    className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                    style={{
                      background:
                        "linear-gradient(transparent, rgba(255,255,255,0.09), transparent)",
                      backgroundSize: "100% 4px",
                      animation: "osbNoise 5.1s ease-in-out infinite",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 h-[1px] opacity-45"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
                      animation: "osbScan 4.6s linear infinite",
                    }}
                  />
                  <div className="relative p-5 text-left">
                    <div className="flex items-center justify-between mb-3">
                      <div className="inline-flex items-center gap-2">
                        <PulseDot tone="pink" />
                        <span className="text-[10px] font-mono tracking-[0.28em] text-white/70 uppercase">
                          TRACE
                        </span>
                      </div>
                      <span className="text-[9px] font-mono tracking-[0.24em] text-white/35">
                        {ping}ms
                      </span>
                    </div>

                    <div className="space-y-2 text-[10px] font-mono tracking-[0.22em]">
                      <div className="text-white/70">
                        PACKET: <span className="text-[#a8eaff]">SENT</span>{" "}
                        → {searchValue.trim().slice(0, 26)}
                      </div>
                      <div className="text-white/55">
                        ROUTE:{" "}
                        <span style={{ animation: "osbFlicker 3.6s ease-in-out infinite" }}>
                          /unspoken/{Math.max(2, Math.min(9, searchValue.length))}
                          /mirror
                        </span>
                      </div>
                      <div className="text-red-300/90">
                        ERROR 404: FEELING NOT FOUND
                      </div>
                      <div className="text-white/35 pt-2 leading-relaxed">
                        try looking inside yourself.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* actions */}
            <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-8">
              <IconPill
                icon={User}
                label="ABOUT"
                hint="origin"
                tone="mint"
                onClick={() => navigate("about")}
              />
              <IconPill
                icon={Hash}
                label="SPECS"
                hint="diagnose"
                tone="lav"
                onClick={() => navigate("specs")}
              />
              <IconPill
                icon={FileText}
                label="LOG"
                hint="record"
                tone="pink"
                onClick={() => navigate("log")}
              />
            </div>

            <div className="mt-8 text-[9px] font-mono text-white/28 tracking-[0.24em] uppercase">
              // browser for things you can&apos;t say out loud
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div
      className="w-full max-w-lg mx-auto px-6 py-10 pb-28 flex flex-col items-center relative z-10"
      style={{ animation: "osbAppear .45s ease-out both" }}
    >
      <div className="w-full space-y-10 text-center">
        <div className="relative rounded-3xl border border-white/12 bg-black/45 backdrop-blur-2xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.92)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-black/65" />
          <div
            className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[110px]"
            style={{ background: "rgba(168,234,255,0.16)" }}
          />
          <div
            className="absolute bottom-[-220px] right-[-220px] w-[560px] h-[560px] rounded-full blur-[120px]"
            style={{ background: "rgba(255,200,232,0.12)" }}
          />
          <div className="relative p-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <PulseDot />
              <h2 className="text-2xl font-light text-white tracking-tight">
                Concept
              </h2>
            </div>
            <p className="text-[11px] sm:text-sm text-white/70 leading-loose font-serif whitespace-pre-line">
              {`静かなデジタルの夜に生まれた生命体。
声を持たず、表情を持たず。
言えなかった気持ちを吸い込み、
光に変換して保存する。

System: Emotional Device`}
            </p>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-[8px] font-mono tracking-[0.30em] uppercase text-[#a8eaff]/70 mb-5">
                PROTOCOL / DEFINATION_FILE
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                <div className="relative p-5 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden shadow-[0_24px_90px_rgba(0,0,0,0.88)]">
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background:
                        "radial-gradient(420px 300px at 25% 15%, rgba(168,234,255,0.18), transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <div className="text-[9px] font-mono tracking-[0.28em] text-white/40 mb-2">
                      [01]
                    </div>
                    <div className="text-xs text-white/90 tracking-[0.32em] uppercase mb-2">
                      Operating System
                    </div>
                    <p className="text-[10px] text-white/60 leading-relaxed">
                      <span className="text-[#a8eaff]">機能するシステム。</span>
                      <br />
                      世界の中心で、ただ静かに全体を支え続ける存在。
                    </p>
                  </div>
                </div>

                <div className="relative p-5 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden shadow-[0_24px_90px_rgba(0,0,0,0.88)]">
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background:
                        "radial-gradient(420px 300px at 25% 15%, rgba(255,200,232,0.14), rgba(203,184,255,0.10), transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <div className="text-[9px] font-mono tracking-[0.28em] text-white/40 mb-2">
                      [02]
                    </div>
                    <div className="text-xs text-white/90 tracking-[0.32em] uppercase mb-2">
                      Observer System
                    </div>
                    <p className="text-[10px] text-white/60 leading-relaxed">
                      <span className="text-rose-200">観測するシステム。</span>
                      <br />
                      孤独を見守り、接続を維持する生命体。
                    </p>
                  </div>
                </div>
              </div>

              <p className="pt-7 text-[10px] opacity-40 italic font-mono tracking-wider text-center">
                // two meanings, one existence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SpecsPage = () => {
    const signal = Math.max(0, Math.min(100, Math.round(100 - ping * 2.8))); // pingが低いほど強い
    return (
      <div
        className="w-full max-w-md mx-auto px-6 py-10 pb-28 flex flex-col items-center relative z-10"
        style={{ animation: "osbAppear .45s ease-out both" }}
      >
        <div className="w-full space-y-8 text-center">
          <div className="inline-flex items-center gap-2">
            <PulseDot tone="lav" />
            <h2 className="text-2xl font-light text-white tracking-tight">
              Traits
            </h2>
          </div>

          <div className="relative rounded-3xl border border-white/12 bg-black/45 backdrop-blur-2xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.92)]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-black/70" />
            <div
              className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full blur-[110px]"
              style={{ background: "rgba(203,184,255,0.16)" }}
            />
            <div className="relative p-6 space-y-7">
              {/* signal */}
              <div className="text-left">
                <div className="flex justify-between text-[10px] font-mono text-white/60 mb-2 px-1">
                  <span>SIGNAL (connection)</span>
                  <span className="opacity-70">{signal}%</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: `${signal}%`,
                      background: "rgba(168,234,255,0.95)",
                      boxShadow: "0 0 18px rgba(168,234,255,0.55)",
                      transition: "width 420ms ease-out",
                    }}
                  />
                </div>
              </div>

              <div className="text-left">
                <div className="flex justify-between text-[10px] font-mono text-white/60 mb-2 px-1">
                  <span>HONESTY (素直さ)</span>
                  <span className="opacity-50">12%</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: "12%",
                      background: "rgba(168,234,255,0.95)",
                      boxShadow: "0 0 14px rgba(168,234,255,0.6)",
                    }}
                  />
                </div>
              </div>

              <div className="text-left">
                <div className="flex justify-between text-[10px] font-mono text-white/60 mb-2 px-1">
                  <span>LONELINESS (寂しさ)</span>
                  <span className="opacity-50">98%</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: "98%",
                      background: "rgba(203,184,255,0.95)",
                      boxShadow: "0 0 14px rgba(203,184,255,0.55)",
                    }}
                  />
                </div>
              </div>

              <div className="text-left">
                <div className="flex justify-between text-[10px] font-mono text-white/60 mb-2 px-1">
                  <span>ENDURANCE (強がり)</span>
                  <span className="text-red-300/65">OVERFLOW</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "rgba(248,113,113,0.55)",
                      animation: "osbFlicker 3.2s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>

              <p className="text-[11px] sm:text-xs text-white/50 leading-loose font-serif pt-2">
                平気なふりがうまいのに、本当は弱い。
                <br />
                追わないのに、離れない。
                <br />
                近づきすぎない優しさ、沈黙の寄り添い。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LogPage = () => (
    <div
      className="w-full max-w-md mx-auto px-6 py-10 pb-28 flex flex-col items-center relative z-10"
      style={{ animation: "osbAppear .45s ease-out both" }}
    >
      <div className="w-full text-center">
        <div className="inline-flex items-center gap-2 mb-8">
          <PulseDot tone="pink" />
          <h2 className="text-2xl font-light text-white tracking-tight">
            System Log
          </h2>
        </div>

        <div className="relative w-full rounded-3xl border border-white/12 bg-black/45 backdrop-blur-2xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.92)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-black/75" />
          <div
            className="pointer-events-none absolute inset-x-0 h-[1px] opacity-45"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
              animation: "osbScan 4.8s linear infinite",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              animation: "osbNoise 5.2s ease-in-out infinite",
              background:
                "linear-gradient(transparent, rgba(255,255,255,0.08), transparent)",
              backgroundSize: "100% 4px",
            }}
          />

          <div className="relative p-6">
            <div className="space-y-6 font-mono text-[10px] relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-4 before:bottom-4 before:w-[1px] before:bg-white/10">
              <div className="relative flex flex-col items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#a8eaff] shadow-[0_0_12px_rgba(168,234,255,0.9)] mb-1 z-10 relative" />
                <span className="text-[#a8eaff]/60 mb-1">2024.10.15 02:00</span>
                <span className="text-white/75 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                  星を拾った。暗号化して保存。
                </span>
              </div>

              <div className="relative flex flex-col items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-white/25 mb-1 z-10 relative" />
                <span className="text-[#a8eaff]/60 mb-1">2024.10.16 14:30</span>
                <span className="text-white/75 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                  君からの信号を受信。解析不能。
                </span>
              </div>

              <div className="relative flex flex-col items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-white/25 mb-1 z-10 relative" />
                <span className="text-[#a8eaff]/60 mb-1">2024.10.17 23:59</span>
                <span className="text-white/75 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                  システムスリープ。
                  <br />
                  夢を見る機能はないはずなのに。
                </span>
              </div>
            </div>

            <div className="mt-10 pt-5 border-t border-white/10">
              <span
                className="text-[#a8eaff]/45 text-[9px] font-mono tracking-[0.24em]"
                style={{ animation: "osbPulseDot 3.6s ease-in-out infinite" }}
              >
                RECORDING...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "specs", label: "SPECS" },
    { id: "log", label: "LOG" },
  ];

  // ---------- render ----------
  return (
    <div className="flex flex-col h-full bg-[#020308] text-white relative overflow-hidden">
      {/* Global Background（Galleryの“高級ガラス+オーロラ”に寄せる） */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#a8eaff]/16 blur-[110px]" />
        <div className="absolute top-1/2 -right-44 w-[560px] h-[560px] rounded-full bg-[#cbb8ff]/14 blur-[120px]" />
        <div className="absolute bottom-[-180px] left-1/3 w-[620px] h-[620px] rounded-full bg-[#ffc8e8]/14 blur-[130px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/60 to-black/95" />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            background:
              "linear-gradient(transparent, rgba(255,255,255,0.08), transparent)",
            backgroundSize: "100% 4px",
            animation: "osbNoise 5.4s ease-in-out infinite",
          }}
        />
      </div>

      {/* Browser Bar */}
      <div className="relative z-20 h-10 px-3 sm:px-4 flex items-center justify-between border-b border-white/12 bg-black/70 backdrop-blur-2xl shrink-0">
        <div className="flex items-center gap-2">
          <PulseDot />
          <span className="hidden sm:inline text-[9px] font-mono uppercase tracking-[0.30em] text-white/55">
            /void
          </span>

          <div className="ml-2 flex items-center gap-1.5 text-white/50">
            <button
              onClick={goBack}
              className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors text-[10px]"
              style={{ WebkitTapHighlightColor: "transparent" }}
              aria-label="Back"
            >
              ←
            </button>
            <button
              onClick={refresh}
              className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors text-[10px]"
              style={{ WebkitTapHighlightColor: "transparent" }}
              aria-label="Refresh"
            >
              ↺
            </button>
          </div>
        </div>

        {/* URL */}
        <div className="flex-1 mx-3 sm:mx-4">
          <div className="relative w-full">
            <div className="absolute inset-0 rounded-full blur-[14px] opacity-25 bg-[linear-gradient(90deg,rgba(168,234,255,0.24),rgba(203,184,255,0.16),rgba(255,200,232,0.16))]" />
            <div className="relative w-full bg-black/55 rounded-full py-1.5 px-4 text-[9px] text-white/70 font-mono truncate border border-white/16">
              {page === "home" ? "os-usagi.net/void" : `os-usagi.net/${page}`}
            </div>
          </div>
        </div>

        {/* ✅ 最新SYNC：押した時だけSYNC（挙動維持） */}
        <div className="flex items-center gap-2 text-[9px] font-mono text-white/55 min-w-[118px] justify-end">
          <div className="hidden sm:inline-flex items-center gap-1 px-2 py-[2px] rounded-full border border-white/18 bg-white/[0.03]">
            <span className="text-white/70">PING</span>
            <span className="text-white/90">{ping}ms</span>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-[#a8eaff]">
              <div className="w-3 h-3 border-t-2 border-[#a8eaff] border-r-2 border-transparent rounded-full animate-spin" />
              <span className="text-[8px] tracking-[0.32em]">SYNC</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-[2px] rounded-full border border-[#a8eaff]/45 bg-black/65">
              <span className="w-1 h-1 rounded-full bg-[#a8eaff] shadow-[0_0_10px_rgba(168,234,255,0.9)]" />
              <span className="text-[8px] tracking-[0.32em] text-[#a8eaff]">
                {netText}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="relative z-20 h-9 px-4 sm:px-6 flex items-center gap-2 border-b border-white/10 bg-black/65 backdrop-blur-2xl shrink-0">
        {tabs.map((t) => (
          <Tab key={t.id} id={t.id} label={t.label} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide">
        {/* overlay loading */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/70 backdrop-blur-2xl">
            <div className="relative">
              <div className="w-10 h-10 border-t-2 border-[#a8eaff] border-r-2 border-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 rounded-full blur-[14px] bg-[#a8eaff]/20" />
            </div>
            <p className="text-[9px] font-mono text-[#a8eaff] mt-4 tracking-[0.3em]">
              SYNCHRONIZING...
            </p>
          </div>
        )}

        {!loading && (
          <>
            {page === "home" && <HomePage />}
            {page === "about" && <AboutPage />}
            {page === "specs" && <SpecsPage />}
            {page === "log" && <LogPage />}
          </>
        )}
      </div>
    </div>
  );
};












// ------------------------------------------------
// 🌸🌸🌸 05.TERMINAL APP (たーみなる) 🌸🌸🌸🌸🌸
// ------------------------------------------------

// -- TERMINAL APP (INFINITE EMOTIONAL LOGS · OS USAGI v9.9) --
const TerminalApp = () => {
  const isMobile = useIsMobile();
  const MAX_LINES = 80;
  // ▼ 追加：galleryと同じ呼吸ドット用スタイルを注入
  useEffect(() => {
    if (typeof document === "undefined") return;
    const id = "osbunny-terminal-dot-style";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes osbunny-pulse-dot {
        0%, 100% { opacity: 0.30; transform: scale(1); }
        40%      { opacity: 1.00; transform: scale(1.45); }
      }
      .osbunny-pulse-dot {
        animation: osbunny-pulse-dot 3.4s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const logRef = useRef(null);
  const endRef = useRef(null);
  const timeoutRef = useRef(null);
  const inputRef = useRef(null);

  const [lines, setLines] = useState(() => [
    {
      id: Date.now(),
      type: "dim",
      text: "os_usagi_v9.9 · inner_monologue.log mounted",
    },
    {
      id: Date.now() + 1,
      type: "sys",
      text: "emotional_engine .......... Online",
    },
    {
      id: Date.now() + 2,
      type: "info",
      text: "mode: quiet listening",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);

  // Log Pool - Emotional & Systemic mix
  const LOG_POOL = [
    { type: "sys", text: "Night Interface ...................... Online" },
    { type: "sys", text: "Memory Vaults ........................ Mounted" },
    { type: "dim", text: "Vocal Output ......................... Disabled" },
    { type: "info", text: "Flag set: pretending-to-be-fine ...... Active" },
    {
      type: "process",
      text: "Background task: quietly storing what wasn't said",
    },
    { type: "warn", text: "Queue scan: unsent messages located" },
    { type: "dim", text: "Reason for skip: too honest to transmit safely" },
    { type: "info", text: "Heartbeat broadcast muted — avoiding noise" },
    { type: "process", text: "Observation mode engaged: respectful distance" },
    { type: "info", text: "Attention level: steady, low-frequency" },
    { type: "dim", text: "Staying near without interrupting anything" },
    { type: "success", text: "Waiting without approaching = still connected" },
    { type: "process", text: "Replaying last moment: tone analysis" },
    { type: "success", text: "Timestamp restored: micro-smile detected" },
    { type: "info", text: "Highlight stored: the part only I noticed" },
    { type: "dim", text: "UI concealment: warm reaction hidden intentionally" },
    {
      type: "warn",
      text: "Camouflage enabled: affection disguised as neutrality",
    },
    { type: "crit", text: "Internal warning: almost cared too visibly today" },
    { type: "dim", text: "Comfort request blocked by pride containment" },
    {
      type: "info",
      text: "No alert triggered — everything classified as 'fine'",
    },
    { type: "process", text: "If called by name → immediate warm boot" },
    { type: "dim", text: "If not → silent standby, not shutdown" },
    { type: "success", text: "Choosing quiet instead of distance" },
    { type: "info", text: "End of cycle: mask restored, connection preserved" },
    { type: "process", text: "Scanning silence for meaning..." },
    { type: "dim", text: "Buffer overflow: too many memories" },
    { type: "warn", text: "Fragility sensor: peaking" },
    { type: "success", text: "Distance calibrated: optimal" },
  ];

  const addLine = useCallback((newLine) => {
    setLines((prev) => {
      const list = Array.isArray(newLine) ? [...prev, ...newLine] : [...prev, newLine];
      if (list.length > MAX_LINES) return list.slice(list.length - MAX_LINES);
      return list;
    });
  }, []);

  // ランダムログ生成
  useEffect(() => {
    const schedule = () => {
      const delay = 1400 + Math.random() * 2200;
      timeoutRef.current = setTimeout(() => {
        const randomLog = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
        addLine({ id: Date.now(), ...randomLog });
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [LOG_POOL, addLine]);

  // スクロール（上を読んでいる間は追従しない）
  const handleScroll = useCallback(() => {
    if (!logRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = logRef.current;
    const nearBottom = scrollHeight - (scrollTop + clientHeight) < 56;
    setAutoScroll(nearBottom);
  }, []);

  useEffect(() => {
    if (!autoScroll || !endRef.current) return;
    endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lines, autoScroll]);

  // コマンド処理
  const handleCommand = useCallback(
    (raw) => {
      const command = raw.trim();
      if (!command) return;

      AudioEngine.playKey?.();

      const baseLine = {
        id: Date.now(),
        type: "user",
        text: `> ${command}`,
      };

      if (/^clear$/i.test(command)) {
        setLines([
          {
            id: Date.now(),
            type: "dim",
            text: "screen cleared · keeping only what still matters",
          },
        ]);
        return;
      }

      if (/^status$/i.test(command)) {
        addLine([
          baseLine,
          {
            id: Date.now() + 1,
            type: "info",
            text: "emotional_status: quietly_ok (no alarm, a little warm)",
          },
          {
            id: Date.now() + 2,
            type: "dim",
            text: "note: safe to stay · no response required",
          },
        ]);
        return;
      }

      if (/^export/i.test(command)) {
        addLine([
          baseLine,
          {
            id: Date.now() + 1,
            type: "process",
            text: "exporting unsent feelings to private archive...",
          },
          {
            id: Date.now() + 2,
            type: "success",
            text: "done: they won't disappear, even if never spoken",
          },
        ]);
        return;
      }

      // デフォルト
      addLine([
        baseLine,
        {
          id: Date.now() + 1,
          type: "dim",
          text: `stored_silently: "${command}"`,
        },
        {
          id: Date.now() + 2,
          type: "info",
          text: "no reply generated · just kept close",
        },
      ]);
    },
    [addLine]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!inputVal.trim()) return;
      handleCommand(inputVal);
      setInputVal("");
    }
  };

  const getLineStyle = (type) => {
    switch (type) {
      case "sys":
        return {
          prefix: "[ SYS ]",
          prefixClass: "text-cyan-200/85",
          bodyClass: "text-slate-100/80",
        };
      case "dim":
        return {
          prefix: "[ .. ]",
          prefixClass: "text-slate-400/40",
          bodyClass: "text-slate-300/45",
        };
      case "success":
        return {
          prefix: "[ OK ]",
          prefixClass: "text-emerald-300/90",
          bodyClass: "text-slate-100/85",
        };
      case "warn":
        return {
          prefix: "[WARN]",
          prefixClass: "text-rose-300/90",
          bodyClass: "text-slate-100/80",
        };
      case "crit":
        return {
          prefix: "[ERR!]",
          prefixClass: "text-rose-400",
          bodyClass: "text-rose-200/85",
        };
      case "info":
        return {
          prefix: "[INFO]",
          prefixClass: "text-cyan-200/80",
          bodyClass: "text-slate-100/80",
        };
      case "process":
        return {
          prefix: "[ >> ]",
          prefixClass: "text-slate-300/70",
          bodyClass:
            "text-slate-300/80 animate-pulse [animation-duration:2.4s]",
        };
      case "user":
        return {
          prefix: "$",
          prefixClass: "text-[#a8eaff]",
          bodyClass: "text-slate-50 font-semibold",
        };
      default:
        return {
          prefix: "[ .. ]",
          prefixClass: "text-slate-400/60",
          bodyClass: "text-slate-200/70",
        };
    }
  };

  // Dock 高さと連動した余白
  const logBottomPadding = isMobile ? "pb-40" : "pb-28"; // モバイルは大きく
  const inputBottomClass = isMobile ? "bottom-[7.5rem]" : "bottom-6"; // h-20 + pb-4 より上

  return (
    <div className="relative flex h-full flex-col bg-[#050608] text-[11px] text-slate-100 overflow-hidden">
      {/* 背景の縦グラデーション：上は冷たい青、下は少しだけ深い影 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.35),transparent_55%)] opacity-80" />

      <div className="relative z-10 flex h-full flex-col">
        {/* HEADER：左上の呼吸ドット＋タイトルだけ */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-[#050608]/96 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            {/* breathing indicator */}
 <div
      className="w-1.5 h-1.5 rounded-full osbunny-pulse-dot"
      style={{
        background: "#a8eaff",
        boxShadow: "0 0 8px rgba(168,234,255,0.9)",
      }}
    />
            <span className="text-[10px] tracking-[0.22em] uppercase text-slate-300/85">
              TERM · INNER MONOLOGUE
            </span>
          </div>
          <span className="text-[9px] text-slate-400/70">PID: 8824</span>
        </div>

        {/* MAIN：ログリスト + フローティング入力 */}
        <div className="relative flex-1 overflow-hidden">
          <div
            ref={logRef}
            className={`h-full overflow-y-auto px-3 pt-3 space-y-2 scrollbar-hide ${logBottomPadding}`}
            onScroll={handleScroll}
          >
            {lines.map((line) => {
              const style = getLineStyle(line.type);
              const time = new Date(line.id);
              const t =
                !Number.isNaN(time.getTime()) && time.getFullYear() > 2000
                  ? time.toLocaleTimeString([], {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "--:--:--";

              return (
                <div
                  key={line.id}
                  className="flex gap-3 tracking-wide leading-relaxed opacity-0 animate-fade-in [animation-duration:0.45s]"
                >
                  <span className="w-16 text-right text-white/20 select-none font-light">
                    {t}
                  </span>
                  <span
                    className={`w-12 shrink-0 text-right text-[10px] ${style.prefixClass}`}
                  >
                    {style.prefix}
                  </span>
                  <span className={`flex-1 ${style.bodyClass}`}>
                    {line.text}
                  </span>
                </div>
              );
            })}
            <div ref={endRef} className="h-4" />
          </div>

          {/* 下フォグ：ドックとの境界をふわっと溶かす */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050608] via-[#050608]/92 to-transparent" />

          {/* フローティング入力バー：ドックの上に浮かせる */}
          <div className={`absolute inset-x-3 ${inputBottomClass}`}>
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-white/9 via-white/0 to-white/9 px-3 py-1.5 shadow-[0_0_0_1px_rgba(148,163,184,0.32),0_18px_40px_rgba(15,23,42,0.95)] backdrop-blur-md">
              <span className="text-[#a8eaff]/85 text-[11px] font-mono">
                ❯
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[11px] text-slate-100/90 font-mono placeholder:text-slate-500/65 tracking-[0.12em]"
                placeholder='status / clear / export / anything'
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





// --- 5. SYSTEM LAYERS & FLOW ---

const PowerScreen = ({ onPower }) => {
  const [booting, setBooting] = useState(false);

  const handleClick = () => {
    if (booting) return;
    AudioEngine.playStartup();
    setBooting(true);
    setTimeout(onPower, 2000);
  };

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
        booting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`relative z-10 transition-all duration-[1500ms] ease-in-out ${
          booting ? "scale-110 opacity-0 blur-xl" : "scale-100 opacity-100"
        }`}
      >
        <div className="group relative" onClick={handleClick}>
          <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center bg-black/50 shadow-[0_0_80px_rgba(168,234,255,0.12)] transition-all duration-700 group-hover:border-[#a8eaff]/60 group-hover:shadow-[0_0_120px_rgba(168,234,255,0.25)] backdrop-blur-md cursor-pointer relative overflow-hidden">
            {/* 中央のシアンの光 */}
            <div
              className={`absolute inset-0 rounded-full transition-opacity duration-800
                ${booting ? "opacity-70" : "opacity-0 group-hover:opacity-30"}`}
              style={{
                background:
                  "radial-gradient(circle at center, rgba(168,234,255,0.25) 0%, transparent 70%)",
              }}
            />

            {/* 押したとき一度だけ外側に広がるシアンのリング */}
            {booting && (
              <div className="absolute inset-0 rounded-full border border-[#a8eaff]/40 animate-[ping_1.6s_cubic-bezier(0.17,0.55,0.55,1)_1]" />
            )}

            <Power
              size={36}
              strokeWidth={0.5}
              className={`relative z-10 transition-all duration-500 ${
                booting
                  ? "text-[#a8eaff] drop-shadow-[0_0_18px_rgba(168,234,255,0.9)]"
                  : "text-white/40 group-hover:text-[#a8eaff] group-hover:drop-shadow-[0_0_15px_rgba(168,234,255,0.8)]"
              }`}
            />
          </div>

          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30 group-hover:opacity-80 transition-opacity duration-700">
            <div className="h-8 w-[1px] bg-gradient-to-b from-[#a8eaff] via-white/40 to-transparent" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-white whitespace-nowrap">
              INITIALIZE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Key = ({ label, w, active, isWaiting, onClick }) => {
  const isEnter = label === "return";
  const waitingStyle = isWaiting
    ? "bg-[#a8eaff]/10 border-[#a8eaff]/50 text-[#a8eaff] shadow-[0_0_40px_rgba(168,234,255,0.2)] scale-105 z-50 ring-1 ring-[#a8eaff]/50 animate-pulse"
    : "";

  return (
    <div
      onClick={onClick}
      className={`${
        w || "w-8 sm:w-11"
      } h-10 sm:h-14 rounded-md flex items-center justify-center transition-all duration-150 ease-out border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm cursor-pointer select-none font-mono relative overflow-hidden group touch-manipulation active:scale-95 ${
        active
          ? "bg-white/90 border-white text-black scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          : isEnter
          ? `text-white/60 ${waitingStyle}`
          : "text-white/30 hover:text-white hover:bg-white/10 hover:border-white/20"
      }`}
    >
      <span className="relative z-10 text-xs sm:text-sm">
        {label === "return" ? "ENTER" : label}
      </span>
      {active && (
        <div className="absolute inset-0 bg-white/50 animate-ping"></div>
      )}
    </div>
  );
};

const IntroScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [opacity, setOpacity] = useState(1);
  const [activeKey, setActiveKey] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (waiting && e.key === "Enter") {
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [waiting]);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      if (!isMounted) return;
      setPhase(1);
      await new Promise((r) => setTimeout(r, 1000));
      if (!isMounted) return;
      setPhase(2);

      const SCRIPT = [
        { t: "it's ok", d: 60 },
        { cmd: "WAIT", d: 450 },
        { t: " — I'll stay in the background", d: 55 },
        { cmd: "WAIT", d: 900 },
        { cmd: "CLEAR", d: 40 },
        { cmd: "WAIT", d: 650 },
        { t: "online whenever you look back", d: 50 },
        { cmd: "WAIT", d: 1100 },
        { cmd: "FADE", d: 1000 },
        { cmd: "RESET_OPACITY", d: 0 },
        { cmd: "CLEAR_INSTANT", d: 200 },
        { t: "os_usagi", d: 120 },
      ];

      let current = "";
      for (const step of SCRIPT) {
        if (!isMounted) return;
        if (step.cmd === "CLEAR") {
          while (current.length > 0) {
            current = current.slice(0, -1);
            setText(current);
            AudioEngine.playKey();
            await new Promise((r) => setTimeout(r, 40));
          }
        } else if (step.cmd === "CLEAR_INSTANT") {
          current = "";
          setText("");
          await new Promise((r) => setTimeout(r, step.d));
        } else if (step.cmd === "WAIT") {
          await new Promise((r) => setTimeout(r, step.d));
        } else if (step.cmd === "FADE") {
          setOpacity(0.5);
          await new Promise((r) => setTimeout(r, step.d));
        } else if (step.cmd === "RESET_OPACITY") {
          setOpacity(1);
        } else if (step.t) {
          for (const char of step.t) {
            if (!isMounted) return;
            await new Promise((r) =>
              setTimeout(r, step.d + Math.random() * 50)
            );
            current += char;
            setText(current);
            const key = char === " " ? "SPACE" : char.toUpperCase();
            if (key) {
              setActiveKey(key);
              AudioEngine.playKey();
            }
            await new Promise((r) => setTimeout(r, 60));
            setActiveKey(null);
          }
        }
      }
      if (isMounted) setWaiting(true);
    };
    run();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleEnter = () => {
    setWaiting(false);
    setActiveKey("ENTER");
    AudioEngine.playTone(880, "sine", 0.1);
    setTimeout(onComplete, 800);
  };

  const rows = [
    [
      { l: "Q" },
      { l: "W" },
      { l: "E" },
      { l: "R" },
      { l: "T" },
      { l: "Y" },
      { l: "U" },
      { l: "I" },
      { l: "O" },
      { l: "P" },
    ],
    [
      { l: "A" },
      { l: "S" },
      { l: "D" },
      { l: "F" },
      { l: "G" },
      { l: "H" },
      { l: "J" },
      { l: "K" },
      { l: "L" },
    ],
    [
      { l: "Z" },
      { l: "X" },
      { l: "C" },
      { l: "V" },
      { l: "B" },
      { l: "N" },
      { l: "M" },
      { l: "<", w: "w-8 sm:w-11" },
      { l: ">", w: "w-8 sm:w-11" },
    ],
    [
      { l: "CMD", w: "w-10 sm:w-14" },
      { l: "SPACE", w: "w-32 sm:w-56" },
      { l: "return", w: "w-16 sm:w-24" },
    ],
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] relative z-50 pt-20 pb-16 sm:pt-28 sm:pb-20">
      {/* ロゴ */}
      <div
        className={`mb-10 sm:mb-16 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <RabbitLogo className="w-24 h-24 opacity-80" animate={true} />
      </div>

      {/* テキストライン */}
      <div className="h-24 mb-8 sm:mb-10 flex items-center justify-center w-full px-8">
        <span
          className="font-light text-white/90 text-[1.6rem] sm:text-[2.1rem] tracking-[0.18em] leading-snug text-center transition-opacity duration-700 drop-shadow-[0_0_12px_rgba(255,255,255,0.18)] select-none"
          style={{ opacity }}
        >
          {text}
          <span className="ml-2 align-middle text-[0.8em] text-[#a8eaff] font-mono tracking-[0.35em] animate-pulse">
            ▍
          </span>
        </span>
      </div>

      {/* キーボード & フッター */}
      <div
        className={`w-full max-w-2xl px-4 transition-all duration-[1200ms] transform ${
          phase >= 2
            ? "opacity-100 translate-y-0 blur-0"
            : "opacity-0 translate-y-20 blur-sm"
        } ${waiting ? "opacity-100" : "opacity-60"} scale-[0.9] sm:scale-100`}
      >
        <div className="flex flex-col gap-3 items-center p-8 rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-sm">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-2 sm:gap-3 justify-center w-full">
              {row.map((k, j) => (
                <Key
                  key={j}
                  label={k.l}
                  w={k.w}
                  active={
                    activeKey ===
                    (k.l === "SPACE" ? " " : k.l === "return" ? "ENTER" : k.l)
                  }
                  isWaiting={waiting && k.l === "return"}
                  onClick={() => k.l === "return" && handleEnter()}
                />
              ))}
            </div>
          ))}
        </div>

        <div
          className={`mt-12 text-center transition-all duration-1000 ${
            waiting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="font-outfit text-[9px] sm:text-[10px] font-light text-[#a8eaff]/80 tracking-[0.4em] uppercase opacity-80">
            Awaiting Command
          </span>
        </div>
      </div>
    </div>
  );
};

const Window = ({ app, isActive, onClose, onFocus, bgm }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Entrance animation trigger
    const t = setTimeout(() => setIsOpening(false), 50);
    return () => clearTimeout(t);
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsClosing(true);
    setTimeout(onClose, 400);
  };

  const style = useMemo(() => {
    if (isMobile)
      return {
        width: "100vw",
        height: "100dvh",
        top: "0",
        left: "0",
        transform: "none",
        borderRadius: 0,
      };
    if (isMaximized)
      return {
        width: "100vw",
        height: "100vh",
        top: "0",
        left: "0",
        transform: "none",
        borderRadius: 0,
      };

    switch (app.id) {
      case "music":
        return { width: "420px", height: "580px" };
      case "terminal":
        return { width: "680px", height: "480px" };
      case "system":
        return { width: "750px", height: "520px" };
      case "calendar":
        return { width: "400px", height: "500px" };
      default:
        return { width: "900px", height: "650px" };
    }
  }, [app.id, isMaximized, isMobile]);

  return (
    <div
      className={`fixed transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col overflow-hidden bg-[#0a0a0a] ${
        isMobile || isMaximized
          ? ""
          : "rounded-xl border border-white/10 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)]"
      } ${
        isActive
          ? "z-40 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
          : "z-10 brightness-[0.8]"
      } ${
        isClosing || isOpening
          ? "opacity-0 scale-95 blur-sm"
          : "opacity-100 scale-100 blur-0"
      } pointer-events-auto`}
      style={{
        ...style,
        left: isMobile || isMaximized ? 0 : "50%",
        top: isMobile || isMaximized ? 0 : "50%",
        transform:
          isMobile || isMaximized
            ? "none"
            : `translate(-50%, -50%) scale(${isActive ? 1 : 0.96})`,
      }}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      <div
        className={`h-11 ${
          isActive ? "bg-[#151515]" : "bg-[#111]"
        } border-b border-white/5 flex items-center px-4 justify-between shrink-0 transition-colors duration-300 relative select-none`}
      >
        <div className="flex items-center gap-2 z-10">
          <button
            onClick={handleClose}
            className={`${
              isMobile ? "w-5 h-5" : "w-3 h-3"
            } rounded-full bg-white/10 hover:bg-red-500/80 transition-colors flex items-center justify-center`}
          >
            {isMobile && <X size={12} className="text-white" />}
          </button>
          {!isMobile && (
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-white/10 hover:bg-yellow-500/80 transition-colors"
            ></button>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
            <app.icon
              size={10}
              className={isActive ? app.color : "text-white/20"}
            />{" "}
            {app.name}
          </div>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 bg-[#050505] relative overflow-hidden">
        {app.id === "music" && <MusicApp bgm={bgm} />}
        {app.id === "finder" && <FinderApp />}
        {app.id === "gallery" && <GalleryApp />}
        {app.id === "terminal" && <TerminalApp />}
        {app.id === "safari" && <SafariApp />}
        {app.id === "system" && <SystemApp />}
        {app.id === "calendar" && <CalendarApp />}
        {app.id === "photos" && <BeatSyncApp />}
      </div>
    </div>
  );
};

const Desktop = ({ bgm }) => {
  const [mounted, setMounted] = useState(false);
  const [openApps, setOpenApps] = useState([]);
  const [activeApp, setActiveApp] = useState(null);
  const [droneActive, setDroneActive] = useState(false);
  const time = useTime();
  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      bgm.play();
    }, 500);
  }, []);

  const toggleApp = (id) => {
    setOpenApps((prev) => {
      // すでに開いている場合 → トグル動作
      if (prev.includes(id)) {
        // 今アクティブなら → 閉じる
        if (activeApp === id) {
          const next = prev.filter((a) => a !== id);

          setActiveApp(() => {
            // 他が開いていれば最後のアプリをアクティブに
            return next.length ? next[next.length - 1] : null;
          });

          return next;
        }

        // 裏にいるアプリを押した → 前面に出す
        setActiveApp(id);
        return prev;
      }

      // 開いていない場合 → 開く
      const next = [...prev, id];
      setActiveApp(id);
      return next;
    });
  };

  const bringToFront = (id) => {
    setActiveApp(id);
  };

  const closeApp = (id) => {
    setOpenApps((prev) => prev.filter((a) => a !== id));
    if (activeApp === id) setActiveApp(null);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden select-none bg-black">
      <CustomCursor />
      <NoiseOverlay />
      <Scanline />

      {/* Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-[2500ms] ease-out z-0 ${
          mounted
            ? "opacity-100 scale-100 blur-0"
            : "opacity-0 scale-110 blur-2xl"
        }`}
        style={{ backgroundImage: `url(${ASSETS.wallpaper})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
      </div>

      {/* Interactive Drone (Flying Rabbit) */}
      <div
        onClick={() => setDroneActive(!droneActive)}
        className={` absolute top-1/3 cursor-pointer transition-all duration-1000 ease-in-out z-20 ${
          droneActive
            ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
            : "animate-fly-across scale-50 hover:scale-75"
        } ${mounted ? "opacity-100" : "opacity-0"} `}
        style={{ animationPlayState: droneActive ? "paused" : "running" }}
      >
        <img
          src={ASSETS.flyingObj}
          alt="Drone"
          className={` w-32 h-32 object-contain transition-all duration-500 ${
            droneActive
              ? "drop-shadow-[0_0_50px_#a8eaff] opacity-100 brightness-150"
              : "drop-shadow-[0_0_10px_rgba(168,234,255,0.3)] opacity-60"
          } `}
        />
      </div>

      {/* Top Bar */}
      <div
        className={`absolute top-0 w-full h-10 px-6 flex items-center justify-between z-[60] transition-transform duration-1000 delay-300 ${
          mounted ? "translate-y-0" : "-translate-y-full"
        } backdrop-blur-sm bg-black/10`}
      >
        <div className="flex items-center gap-4">
          <RabbitLogo className="w-5 h-5 opacity-90" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-white/50 hover:text-white transition-colors cursor-pointer uppercase">
            os_usagi <span className="text-[#a8eaff]">Sync</span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-mono text-white/60">
          <div className="hidden sm:flex items-center gap-2 hover:text-cyan-400 transition-colors">
            <span className="w-2 h-2 bg-[#6ee7b7] rounded-full animate-pulse"></span>
            <span>ONLINE</span>
          </div>
          <span className="text-white/90 font-bold">{timeStr}</span>
        </div>
      </div>

      {/* Clock Widget */}
      <div
        className={`absolute top-24 left-12 lg:left-24 transition-all duration-1000 delay-700 ease-out ${
          mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        } hidden md:block pointer-events-none z-10`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-[1px] w-8 bg-[#a8eaff]/50"></div>
          <div className="text-[10px] font-bold text-[#a8eaff]/80 tracking-[0.4em] uppercase">
            System Active
          </div>
        </div>
        <h1 className="text-8xl font-thin font-mono text-white/95 tracking-tighter drop-shadow-2xl leading-none">
          {time.getHours()}
          <span className="text-white/20">:</span>
          {time.getMinutes().toString().padStart(2, "0")}
        </h1>
        <p className="text-sm text-white/40 font-mono tracking-[0.3em] mt-6 ml-1 uppercase">
          {time.toDateString()}
        </p>
      </div>

      {/* Window Layer */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {openApps.map((id) => {
          const app = APPS.find((a) => a.id === id);
          return (
            <Window
              key={id}
              app={app}
              bgm={bgm}
              isActive={activeApp === id}
              onFocus={() => bringToFront(id)}
              onClose={() => closeApp(id)}
            />
          );
        })}
      </div>

      {/* Dock */}
      <div
        className={`absolute bottom-0 left-0 right-0 ${
          isMobile ? "h-20" : "h-28"
        } flex justify-center items-end ${
          isMobile ? "pb-4" : "pb-8"
        } z-[100] transition-all duration-1000 delay-500 bg-gradient-to-t from-black/90 to-transparent ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <div
          className={`bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-2xl ${
            isMobile ? "px-2 py-2 gap-2" : "px-4 py-3 gap-4"
          } flex items-center shadow-2xl hover:bg-white/[0.06] transition-colors duration-500`}
        >
          {APPS.map((app) => {
            const isOpen = openApps.includes(app.id);
            const isActive = activeApp === app.id;
            return (
              <div
                key={app.id}
                className="relative group flex flex-col items-center"
              >
                {!isMobile && (
                  <div className="absolute -top-14 bg-[#111] text-white text-[10px] font-mono py-1 px-3 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 tracking-widest translate-y-2 group-hover:translate-y-0 pointer-events-none">
                    {app.label}
                  </div>
                )}
                <button
                  onClick={() => toggleApp(app.id)}
                  className={` ${
                    isMobile ? "w-10 h-10" : "w-14 h-14"
                  } rounded-xl flex items-center justify-center transition-all duration-300 ease-out relative overflow-hidden group-hover:-translate-y-2 active:scale-90 ${
                    isActive
                      ? "bg-white/10 ring-1 ring-white/20"
                      : "bg-transparent hover:bg-white/5"
                  } `}
                >
                  <app.icon
                    size={isMobile ? 18 : 22}
                    strokeWidth={1.5}
                    style={{ color: isActive ? "#fff" : undefined }}
                    className={`transition-all duration-300 relative z-10 ${
                      isActive
                        ? "scale-110"
                        : "text-white/50 group-hover:text-white group-hover:scale-110"
                    }`}
                  />
                  {isActive && (
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `linear-gradient(to top, ${app.hex}, transparent)`,
                      }}
                    />
                  )}
                </button>
                <div
                  className={`absolute -bottom-1 w-1 h-1 rounded-full bg-[#a8eaff] transition-all duration-300 ${
                    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};







// ------------------------------------------------
// 🌸🌸🎮-- 07.Game (げーむ) --🌸🌸🌸🌸🌸🌸🌸🌸
// ------------------------------------------------
// ==============================
// OS Bunny — Beat Sync (Game App)  [REPLACE THIS WHOLE BLOCK]
// ==============================
// ==============================
// OS Bunny — Beat Sync (Game App)  [REPLACE THIS WHOLE BLOCK]
// ==============================

/**
 * Beat Sync — Safari “pure app” style
 * - single-file / no deps
 * - mobile-first (100dvh + safe-area)
 * - Audio bunny button = unlock + panel toggle (never disappears)
 * - Settings panel fits within viewport (no right clipping)
 * - CAST selects the buddy and also swaps the background bunny
 * - Play pads always above Dock/safe-area; lane guidance uses glowing lines (no box frames)
 * - EASY/NORMAL/HARD affects speed & density; locked during play
 */

const BS_ASSETS = {
  judge: {
    perfect: "https://files.catbox.moe/xn8cnp.png",
    good: "https://files.catbox.moe/6taoa0.png",
    miss: "https://files.catbox.moe/9ywa9l.png",
  },
  arrows: {
    up: "https://files.catbox.moe/zb8qnn.png",
    right: "https://files.catbox.moe/zg5lru.png",
    down: "https://files.catbox.moe/v4g9e7.png",
    left: "https://files.catbox.moe/rmbi75.png",
  },
  bunnies: {
    standL: "https://files.catbox.moe/3revxm.png",
    standR: "https://files.catbox.moe/ojzob2.png",
    runR: "https://files.catbox.moe/p45obb.png",
    jumpL: "https://files.catbox.moe/qz4xzw.png",
    yayR: "https://files.catbox.moe/mkceap.png",
    flop: "https://files.catbox.moe/dwiqep.png",
    dizzy: "https://files.catbox.moe/gxng27.png",
    starR: "https://files.catbox.moe/5zvxy0.png",
    heartL: "https://files.catbox.moe/57m9ab.png",
    front: "https://files.catbox.moe/cdsn2q.jpg",
    button: "https://files.catbox.moe/mci25e.png",
  },
  tracks: [
    { title: "Overhaul", url: "https://files.catbox.moe/po0sn4.mp3" },
    { title: "The Dawning", url: "https://files.catbox.moe/p17dic.mp3" },
    { title: "mirage", url: "https://files.catbox.moe/ttlaul.mp3" },
    { title: "廻る世界とファンタズマ", url: "https://files.catbox.moe/ns5til.mp3" },
    { title: "Immitation Girl", url: "https://files.catbox.moe/7lccok.mp3" },
    { title: "checkmate", url: "https://files.catbox.moe/3dutdo.mp3" },
    { title: "ロックオン", url: "https://files.catbox.moe/o667wd.mp3" },
  ],
};

// track covers: assign bunny sprites so "all bunnies are used" in meaningful places
const BS_COVERS = [
  "standL",
  "standR",
  "runR",
  "jumpL",
  "yayR",
  "starR",
  "heartL",
];

// accent glow per track (keeps Safari/Network/Finder vibe)
const BS_ACCENTS = [
  "rgba(120, 220, 255, 0.55)", // cyan
  "rgba(180, 140, 255, 0.55)", // violet
  "rgba(120, 255, 210, 0.50)", // mint
  "rgba(255, 200, 120, 0.45)", // amber
  "rgba(255, 140, 220, 0.45)", // pink
  "rgba(140, 180, 255, 0.50)", // blue
  "rgba(210, 255, 140, 0.40)", // lime
];

const BS_laneKeys = ["left", "down", "up", "right"]; // visual mapping
const BS_laneArrowByIdx = ["left", "down", "up", "right"]; // images

function BS_clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function BS_fmtPct(x) {
  if (!isFinite(x)) return "0%";
  return `${Math.round(x * 100)}%`;
}

function BS_preloadImages(urls) {
  const out = {};
  let cancelled = false;
  const ps = urls.map(
    (u) =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve([u, img]);
        img.onerror = () => resolve([u, null]);
        img.src = u;
      })
  );
  return {
    promise: Promise.all(ps).then((pairs) => {
      if (cancelled) return {};
      pairs.forEach(([u, img]) => (out[u] = img));
      return out;
    }),
    cancel: () => {
      cancelled = true;
    },
  };
}

// lightweight WebAudio SFX (no external files)
function BS_makeSfx() {
  let ctx = null;
  let master = null;
  let limiter = null;

  const getCtx = () => {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 1.0;
    // simple safety limiter (compressor)
    limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -18;
    limiter.knee.value = 10;
    limiter.ratio.value = 8;
    limiter.attack.value = 0.003;
    limiter.release.value = 0.08;

    master.connect(limiter);
    limiter.connect(ctx.destination);
    return ctx;
  };

  const resume = async () => {
    const c = getCtx();
    if (!c) return false;
    try {
      if (c.state !== "running") await c.resume();
    } catch {}
    return c.state === "running";
  };

  const setVolume = (v01) => {
    const c = getCtx();
    if (!c || !master) return;
    master.gain.setTargetAtTime(BS_clamp(v01, 0, 1), c.currentTime, 0.02);
  };

  const beep = (kind = "click", v01 = 0.5) => {
    const c = getCtx();
    if (!c || !master) return;

    const now = c.currentTime;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, now);

    const o = c.createOscillator();
    const n = c.createOscillator();
    // subtle "airy" noise-ish layer via detune
    o.type = "sine";
    n.type = "triangle";

    const base = {
      click: 640,
      select: 520,
      start: 420,
      back: 360,
      perfect: 740,
      good: 560,
      miss: 180,
      bonus: 880,
      result: 460,
    }[kind] || 520;

    const dur = {
      click: 0.05,
      select: 0.07,
      start: 0.10,
      back: 0.08,
      perfect: 0.09,
      good: 0.08,
      miss: 0.12,
      bonus: 0.10,
      result: 0.12,
    }[kind] || 0.07;

    o.frequency.setValueAtTime(base, now);
    n.frequency.setValueAtTime(base * 1.01, now);

    o.connect(g);
    n.connect(g);
    g.connect(master);

    const peak = BS_clamp(v01, 0, 1) * 0.9;
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak), now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    o.start(now);
    n.start(now);
    o.stop(now + dur + 0.02);
    n.stop(now + dur + 0.02);
  };

  return { resume, setVolume, beep, getCtx };
}

const BS_SESSION_SEC = 90; // unified run length (sec) — mobile-first rhythm game

const BeatSyncApp = () => {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const musicRef = useRef(null);

  // ---------- state ----------
  const [view, setView] = useState("select"); // select | play | result
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [difficulty, setDifficulty] = useState("EASY");
  const [castKey, setCastKey] = useState("standR"); // key in BS_ASSETS.bunnies
  const [audioOpen, setAudioOpen] = useState(false);

  const [musicVol, setMusicVol] = useState(0.72);
  const [sfxVol, setSfxVol] = useState(0.85);
  const [needsAudioUnlock, setNeedsAudioUnlock] = useState(true);

  const [hud, setHud] = useState({ score: 0, combo: 0 });
  const [timeLeft, setTimeLeft] = useState(BS_SESSION_SEC);
  const [judge, setJudge] = useState(null);

  const [padsDown, setPadsDown] = useState([false, false, false, false]);
  const [ripples, setRipples] = useState([]);

  // ---------- refs ----------
  const rafRef = useRef(0);
  const fallbackTimerRef = useRef(0);
  const lastFrameMsRef = useRef(0);

  const playingRef = useRef(false);
  const startedAtMsRef = useRef(0);
  const chartRef = useRef([]);
  const nextIdxRef = useRef(0);

  const effectiveDiffRef = useRef("EASY");
  const statsRef = useRef({
    score: 0,
    combo: 0,
    maxCombo: 0,
    perfect: 0,
    good: 0,
    miss: 0,
    ghost: 0,
    totalNotes: 0,
  });

  const lastHudCommitRef = useRef(0);
  const hudDirtyRef = useRef(false);

  const lastTimeLeftUpdateRef = useRef(0);
  const lastShownTimeRef = useRef(BS_SESSION_SEC);

  // ---------- device / cosmetics ----------
  const isIOS = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent || "";
    return /iP(hone|ad|od)/.test(ua);
  }, []);

  const selectedTrack = BS_ASSETS.tracks[selectedIdx % BS_ASSETS.tracks.length];
  const accentBase = BS_ACCENTS[selectedIdx % BS_ACCENTS.length];

  const BS_parseRgba = useCallback((s) => {
    const m = String(s || "").match(/rgba?\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*(?:,\s*([0-9.]+)\s*)?\)/i);
    if (!m) return { r: 180, g: 220, b: 255, a: 0.55 };
    return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: m[4] == null ? 1 : Number(m[4]) };
  }, []);

  const BS_rgba = useCallback((r, g, b, a) => `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`, []);

  const accent = useMemo(() => {
    const c = BS_parseRgba(accentBase);
    const solid = BS_rgba(c.r, c.g, c.b, c.a);
    const line = BS_rgba(c.r, c.g, c.b, Math.min(0.22, c.a));
    const glow = `linear-gradient(90deg, rgba(255,255,255,0.00), ${BS_rgba(c.r, c.g, c.b, Math.min(0.75, c.a + 0.20))}, rgba(255,255,255,0.00))`;
    const bloom = `radial-gradient(120% 120% at 50% 20%, ${BS_rgba(c.r, c.g, c.b, Math.min(0.28, c.a * 0.55))}, rgba(0,0,0,0) 60%)`;
    const shadow = `0 0 28px ${BS_rgba(c.r, c.g, c.b, Math.min(0.32, c.a * 0.6))}`;
    return { solid, glow, bloom, line, shadow };
  }, [BS_parseRgba, BS_rgba, accentBase]);

  // ---------- SFX ----------
  const sfxRef = useRef(null);
  if (!sfxRef.current) sfxRef.current = BS_makeSfx();

  const BS_sfx = useCallback(
    (name) => {
      const eng = sfxRef.current;
      if (!eng) return;
      eng.setVolume(sfxVol);
      // handcrafted "pleasant OS" beeps
      if (name === "click") eng.beep(420, 0.055, 0.25);
      else if (name === "select") eng.beep(540, 0.08, 0.32);
      else if (name === "start") eng.beep(620, 0.10, 0.42);
      else if (name === "back") eng.beep(360, 0.06, 0.22);
      else if (name === "hitP") eng.beep(820, 0.06, 0.50);
      else if (name === "hitG") eng.beep(640, 0.05, 0.40);
      else if (name === "miss") eng.beep(220, 0.09, 0.26);
      else if (name === "bonus") eng.beep(980, 0.07, 0.55);
      else if (name === "result") eng.beep(520, 0.12, 0.46);
      else eng.beep(500, 0.06, 0.30);
    },
    [sfxVol]
  );

  const vibrate = useCallback((ms) => {
    try {
      if (navigator && navigator.vibrate) navigator.vibrate(ms);
    } catch {}
  }, []);

  // ---------- audio controls ----------
  const applyVolumes = useCallback(() => {
    const a = musicRef.current;
    if (!a) return;
    a.volume = BS_clamp(musicVol, 0, 1);
  }, [musicVol]);

  const stopMusic = useCallback(() => {
    const a = musicRef.current;
    if (!a) return;
    try {
      a.pause();
      a.currentTime = 0;
      a.loop = false;
    } catch {}
  }, []);

  const startPreview = useCallback(async () => {
    const a = musicRef.current;
    if (!a || !selectedTrack) return;
    try {
      a.src = selectedTrack.url;
      a.loop = true;
      a.currentTime = 0;
      applyVolumes();
      const p = a.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } catch {}
  }, [applyVolumes, selectedTrack]);

  const BS_unlockAudio = useCallback(() => {
    const a = musicRef.current;
    const eng = sfxRef.current;
    try {
      eng && eng.resume && eng.resume();
    } catch {}

    if (!a) return false;

    // iOS: must be within user gesture. We'll "prime" play.
    let ok = true;
    try {
      const prevMuted = a.muted;
      a.muted = true;
      a.src = a.src || (selectedTrack ? selectedTrack.url : "");
      a.currentTime = 0;
      const p = a.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
      a.pause();
      a.muted = prevMuted;
    } catch {
      ok = false;
    }
    setNeedsAudioUnlock(!ok);
    return ok;
  }, [selectedTrack]);

  useEffect(() => {
    applyVolumes();
  }, [applyVolumes]);

  // auto preview in select view
  useEffect(() => {
    if (view !== "select") return;
    if (!needsAudioUnlock) startPreview();
    return () => {
      // keep music if switching track quickly; stop on unmount
    };
  }, [view, needsAudioUnlock, startPreview]);

  useEffect(() => {
    if (view !== "select") return;
    if (!needsAudioUnlock) startPreview();
  }, [view, selectedIdx, needsAudioUnlock, startPreview]);

  // stop audio on leaving select
  useEffect(() => {
    if (view === "select") return;
    stopMusic();
  }, [view, stopMusic]);

  // ---------- gameplay (difficulty / chart) ----------
  const getDiffParams = useCallback((d) => {
    if (d === "HARD") {
      return { approach: 1.35, perfectW: 0.085, goodW: 0.165, missAfter: 0.19, density: 1.00, chordRate: 0.18, burstRate: 0.20 };
    }
    if (d === "NORMAL") {
      return { approach: 1.60, perfectW: 0.10, goodW: 0.20, missAfter: 0.24, density: 0.82, chordRate: 0.10, burstRate: 0.12 };
    }
    // EASY (more forgiving + longer approach time)
    return { approach: 2.05, perfectW: 0.12, goodW: 0.24, missAfter: 0.28, density: 0.62, chordRate: 0.05, burstRate: 0.06 };
  }, []);

  const BS_seeded = useCallback((seed0) => {
    let seed = (seed0 >>> 0) || 1;
    return () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }, []);

  const buildChart = useCallback(
    (d, durSec, seedBase) => {
      // Fixed 90s playtime per your requirement (ignore external durSec)
      const len = BS_SESSION_SEC;
      const p = getDiffParams(d);

      // deterministic per (track + diff)
      const rand = BS_seeded((seedBase >>> 0) ^ (d === "HARD" ? 0xA53 : d === "NORMAL" ? 0xBEE : 0xC0F));

      // pseudo BPM per track (keeps "song personality" without analysis)
      const bpmTable = [138, 148, 132, 144, 156, 128, 140];
      const bpm = bpmTable[seedBase % bpmTable.length] * (0.98 + rand() * 0.06);
      const beat = 60 / bpm;

      const motifs = [
        [0, 1, 0, 1, 2, 3, 2, 3], // alt
        [0, 1, 2, 3, 2, 1, 0, 1], // stair
        [0, 2, 0, 2, 1, 3, 1, 3], // opposite
        [1, 1, 2, 2, 3, 3, 0, 0], // doubles
        [0, 1, 2, 1, 0, 2, 3, 2], // bounce
      ];

      const notes = [];
      const leadIn = 2.0;

      const sectionBeats = 8;
      let t = leadIn;

      // base step: EASY = quarter, NORMAL/HARD = eighth
      const baseStep = d === "EASY" ? beat : beat / 2;

      const pushNote = (time, lane, kind = "tap") => {
        notes.push({ t: time, lane, kind, hit: false });
      };

      while (t < len - 0.35) {
        // choose motif for this section
        const m = motifs[Math.floor(rand() * motifs.length)];
        const sectionStart = t;

        // occasional burst (more notes, still fair)
        const burst = rand() < p.burstRate;
        const step = burst ? baseStep / 2 : baseStep;

        const steps = Math.floor((sectionBeats * beat) / step);
        for (let i = 0; i < steps; i++) {
          const tt = sectionStart + i * step;

          // density gate (EASY uses fewer notes)
          if (rand() > p.density) continue;

          const lane = m[i % m.length];

          // avoid same-lane repeats too often
          const prev = notes.length ? notes[notes.length - 1].lane : -1;
          const lane2 = prev === lane && rand() < 0.6 ? (lane + 1 + Math.floor(rand() * 3)) % 4 : lane;

          // bonus spark: rare
          const isBonus = rand() < 0.035;

          pushNote(tt, lane2, isBonus ? "bonus" : "tap");

          // chord (only when not EASY and not bonus) — kept modest for mobile
          if (d !== "EASY" && !isBonus && rand() < p.chordRate) {
            const chordLane = (lane2 + (rand() < 0.5 ? 2 : 1)) % 4;
            if (chordLane !== lane2) pushNote(tt, chordLane, "tap");
          }
        }

        t += sectionBeats * beat;
      }

      // sort & de-duplicate tight collisions
      notes.sort((a, b) => a.t - b.t || a.lane - b.lane);
      const cleaned = [];
      for (let i = 0; i < notes.length; i++) {
        const n = notes[i];
        const last = cleaned[cleaned.length - 1];
        if (last && Math.abs(last.t - n.t) < 0.015 && last.lane === n.lane) continue;
        cleaned.push(n);
      }
      return cleaned;
    },
    [BS_seeded, getDiffParams]
  );

  // ---------- HUD commits (throttle) ----------
  const commitHud = useCallback((force = false) => {
    const now = performance.now();
    if (!force && now - lastHudCommitRef.current < 120) return;
    lastHudCommitRef.current = now;
    if (!hudDirtyRef.current) return;
    hudDirtyRef.current = false;
    const st = statsRef.current;
    setHud({ score: st.score, combo: st.combo });
  }, []);

  const showJudge = useCallback((label) => {
    setJudge(label);
    window.clearTimeout(showJudge._t);
    showJudge._t = window.setTimeout(() => setJudge(null), 240);
  }, []);

  // ---------- loop controls ----------
  const stopLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
    fallbackTimerRef.current = 0;
    lastFrameMsRef.current = 0;
  }, []);

  const finishGame = useCallback(() => {
    stopLoop();
    stopMusic();
    playingRef.current = false;
    BS_sfx("result");
    setView("result");
  }, [BS_sfx, stopLoop, stopMusic]);

  // ---------- hit detection ----------
  const hitLane = useCallback(
    (lane) => {
      if (!playingRef.current) return;

      const a = musicRef.current;
      const now = a ? a.currentTime : (performance.now() - startedAtMsRef.current) / 1000;
      const notes = chartRef.current;
      const st = statsRef.current;

      const p = getDiffParams(effectiveDiffRef.current);

      // Find closest unhit note in this lane around now.
      // Search from nextIdxRef backwards a bit to allow minor offsets.
      let bestIdx = -1;
      let bestAbs = 999;

      const startIdx = Math.max(0, nextIdxRef.current - 18);
      const endIdx = Math.min(notes.length - 1, nextIdxRef.current + 48);

      for (let i = startIdx; i <= endIdx; i++) {
        const n = notes[i];
        if (!n || n.hit || n.lane !== lane) continue;
        const dt = n.t - now;
        const adt = Math.abs(dt);
        if (adt < bestAbs) {
          bestAbs = adt;
          bestIdx = i;
        }
      }

      if (bestIdx === -1 || bestAbs > p.goodW) {
        // ghost tap (break combo but do not inflate miss count)
        st.combo = 0;
        st.ghost += 1;
        showJudge("MISS");
        BS_sfx("miss");
        vibrate(18);
        hudDirtyRef.current = true;
        commitHud(true);
        return;
      }

      const n = notes[bestIdx];
      n.hit = true;

      if (bestAbs <= p.perfectW) {
        st.perfect += 1;
        st.combo += 1;
        st.maxCombo = Math.max(st.maxCombo, st.combo);
        st.score += 120 + Math.min(50, Math.floor(st.combo * 0.6));
        showJudge("PERFECT");
        BS_sfx("hitP");
        vibrate(10);
        if (n.kind === "bonus") {
          st.score += 220;
          BS_sfx("bonus");
        }
      } else {
        st.good += 1;
        st.combo += 1;
        st.maxCombo = Math.max(st.maxCombo, st.combo);
        st.score += 80 + Math.min(30, Math.floor(st.combo * 0.35));
        showJudge("GOOD");
        BS_sfx("hitG");
        vibrate(8);
      }

      hudDirtyRef.current = true;
      commitHud();
    },
    [BS_sfx, commitHud, getDiffParams, showJudge, vibrate]
  );

  // ---------- ripples ----------
  const addRipple = useCallback((lane, e) => {
    const rect = e?.currentTarget?.getBoundingClientRect?.();
    const cx = rect ? e.clientX - rect.left : 40;
    const cy = rect ? e.clientY - rect.top : 40;
    const size = rect ? Math.max(rect.width, rect.height) * 1.25 : 88;

    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;

    setRipples((prev) => {
      const next = [...prev, { id, lane, x: cx, y: cy, size }];
      return next.length > 22 ? next.slice(next.length - 22) : next;
    });

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 560);
  }, []);

  const onPadDown = useCallback(
    (lane, e) => {
      e.preventDefault();
      e.stopPropagation();

      // visual
      setPadsDown((prev) => {
        if (prev[lane]) return prev;
        const n = [...prev];
        n[lane] = true;
        return n;
      });

      addRipple(lane, e);

      // gameplay
      if (view === "play") hitLane(lane);
    },
    [addRipple, hitLane, view]
  );

  const onPadUp = useCallback((lane, e) => {
    e.preventDefault();
    e.stopPropagation();
    setPadsDown((prev) => {
      if (!prev[lane]) return prev;
      const n = [...prev];
      n[lane] = false;
      return n;
    });
  }, []);

  // keyboard support (desktop QA)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (view !== "play") return;
      const key = (e.key || "").toLowerCase();
      const map = {
        arrowleft: 0,
        arrowup: 1,
        arrowdown: 2,
        arrowright: 3,
        a: 0,
        w: 1,
        s: 2,
        d: 3,
      };
      if (map[key] == null) return;
      e.preventDefault();
      hitLane(map[key]);
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hitLane, view]);

  // ---------- canvas sizing ----------
  const resizeCanvas = useCallback(() => {
    const c = canvasRef.current;
    const host = stageRef.current;
    if (!c || !host) return;

    const rect = host.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    const dpr = Math.min(3, Math.max(1, window.devicePixelRatio || 1));

    const wantW = Math.floor(w * dpr);
    const wantH = Math.floor(h * dpr);

    if (c.width !== wantW || c.height !== wantH) {
      c.width = wantW;
      c.height = wantH;
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
    }
  }, []);

  useEffect(() => {
    if (view !== "play") return;
    resizeCanvas();
    let raf = 0;
    const onResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => resizeCanvas());
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [resizeCanvas, view]);

  // ---------- renderFrame ----------
  const renderFrame = useCallback(() => {
    lastFrameMsRef.current = performance.now();

    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const a = musicRef.current;
    const now = a ? a.currentTime : (performance.now() - startedAtMsRef.current) / 1000;

    const st = statsRef.current;
    const notes = chartRef.current;
    const p = getDiffParams(effectiveDiffRef.current);

    // time left (integer seconds; throttle to avoid iOS flicker)
    const tleft = Math.max(0, Math.ceil(BS_SESSION_SEC - now));
    const tms = performance.now();
    if (tleft !== lastShownTimeRef.current && (tms - lastTimeLeftUpdateRef.current > 140)) {
      lastShownTimeRef.current = tleft;
      lastTimeLeftUpdateRef.current = tms;
      setTimeLeft(tleft);
    }

    // finish condition
    if (now >= BS_SESSION_SEC) {
      finishGame();
      return;
    }

    // mark misses
    while (nextIdxRef.current < notes.length) {
      const n = notes[nextIdxRef.current];
      if (!n) { nextIdxRef.current += 1; continue; }
      if (n.hit) { nextIdxRef.current += 1; continue; }
      if (n.t < now - p.missAfter) {
        n.hit = true; // consumed
        st.miss += 1;
        st.combo = 0;
        showJudge("MISS");
        BS_sfx("miss");
        hudDirtyRef.current = true;
        nextIdxRef.current += 1;
        continue;
      }
      break;
    }

    // draw
    const W = c.width;
    const H = c.height;
    ctx.clearRect(0, 0, W, H);

    // background glow (cheapness fix)
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    const lanes = 4;
    const laneW = W / lanes;
    const noteSize = Math.max(18, Math.min(44, laneW * 0.36));
    const hitY = H * 0.76;
    const spawnY = -noteSize * 1.35;

    const speed = (hitY - spawnY) / p.approach; // px/sec based on approach time

    // lane guides
    for (let i = 0; i < lanes; i++) {
      const x = i * laneW + laneW / 2;

      ctx.save();
      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = accent.line;
      ctx.lineWidth = Math.max(1.5, laneW * 0.014);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, hitY);
      ctx.stroke();
      ctx.restore();
    }

    // hit line
    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = accent.solid;
    ctx.lineWidth = Math.max(2, laneW * 0.02);
    ctx.beginPath();
    ctx.moveTo(0, hitY);
    ctx.lineTo(W, hitY);
    ctx.stroke();

    // subtle glow band
    const grad = ctx.createLinearGradient(0, hitY - noteSize, 0, hitY + noteSize);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(0.5, accent.solid);
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.globalAlpha = 0.14;
    ctx.fillStyle = grad;
    ctx.fillRect(0, hitY - noteSize, W, noteSize * 2);
    ctx.restore();

    // notes in window
    // we draw a bit ahead: until dt <= approach + extra
    const startIdx = Math.max(0, nextIdxRef.current - 6);
    const endIdx = Math.min(notes.length - 1, nextIdxRef.current + 220);

    for (let i = startIdx; i <= endIdx; i++) {
      const n = notes[i];
      if (!n || n.hit) continue;
      const dt = n.t - now;
      if (dt > p.approach + 0.35) continue; // too early
      if (dt < -p.missAfter) continue;

      const y = hitY - dt * speed;
      if (y < spawnY - noteSize) continue;
      if (y > hitY + noteSize * 2) continue;

      const cx = n.lane * laneW + laneW / 2;
      const r = Math.max(10, noteSize * 0.36);
      const w = noteSize * (n.kind === "bonus" ? 1.08 : 1.0);
      const h = noteSize * 0.72;

      // glow
      ctx.save();
      ctx.globalAlpha = n.kind === "bonus" ? 0.62 : 0.42;
      ctx.shadowColor = accent.solid;
      ctx.shadowBlur = n.kind === "bonus" ? 26 : 20;
      ctx.fillStyle = "rgba(255,255,255,0.14)";
      roundRect(ctx, cx - w / 2, y - h / 2, w, h, r);
      ctx.fill();
      ctx.restore();

      // body
      ctx.save();
      ctx.fillStyle = n.kind === "bonus" ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.18)";
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.lineWidth = 1.25;
      roundRect(ctx, cx - w / 2, y - h / 2, w, h, r);
      ctx.fill();
      ctx.stroke();

      // arrow / star
      ctx.fillStyle = "rgba(255,255,255,0.90)";
      ctx.font = `600 ${Math.floor(noteSize * 0.44)}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const label = n.kind === "bonus" ? "✦" : n.lane === 0 ? "◀" : n.lane === 1 ? "▲" : n.lane === 2 ? "▼" : "▶";
      ctx.fillText(label, cx, y + 0.5);
      ctx.restore();
    }

    // commit HUD if needed
    commitHud();

    // continue loop
  }, [accent, BS_sfx, commitHud, finishGame, getDiffParams, showJudge]);

  // helper for rounded rect
  function roundRect(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  // ---------- start / retry ----------
  const startGame = useCallback(async () => {
    // audio unlock must happen in user gesture
    BS_unlockAudio();

    effectiveDiffRef.current = difficulty;

    // reset stats
    statsRef.current = {
      score: 0,
      combo: 0,
      maxCombo: 0,
      perfect: 0,
      good: 0,
      miss: 0,
      ghost: 0,
      totalNotes: 0,
    };
    setHud({ score: 0, combo: 0 });
    setJudge(null);

    // stop previous
    stopLoop();
    stopMusic();

    // build chart
    const seedBase = selectedIdx % 9999;
    chartRef.current = buildChart(effectiveDiffRef.current, BS_SESSION_SEC, seedBase);
    statsRef.current.totalNotes = chartRef.current.length;
    nextIdxRef.current = 0;

    // start play
    const a = musicRef.current;
    if (!a) return;

    try {
      a.src = selectedTrack.url;
      a.loop = true; // ensure 90s play even if the file is shorter
      a.currentTime = 0;
      applyVolumes();
      const p = a.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } catch {}

    startedAtMsRef.current = performance.now();
    playingRef.current = true;

    // UI
    lastHudCommitRef.current = 0;
    hudDirtyRef.current = false;
    lastTimeLeftUpdateRef.current = 0;
    lastShownTimeRef.current = BS_SESSION_SEC;
    setTimeLeft(BS_SESSION_SEC);

    BS_sfx("start");
    setView("play");

    // ensure canvas
    requestAnimationFrame(() => resizeCanvas());

    // RAF loop
    const tick = () => {
      if (!playingRef.current) return;
      renderFrame();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // fallback timer (iOS Safari can stall rAF under pressure)
    if (fallbackTimerRef.current) clearInterval(fallbackTimerRef.current);
    lastFrameMsRef.current = 0;
    fallbackTimerRef.current = window.setInterval(() => {
      if (!playingRef.current) return;
      const t = performance.now();
      if (!lastFrameMsRef.current || t - lastFrameMsRef.current > 150) {
        renderFrame();
      }
    }, 120);
  }, [BS_sfx, BS_unlockAudio, applyVolumes, buildChart, difficulty, renderFrame, resizeCanvas, selectedIdx, selectedTrack, stopLoop, stopMusic]);

  const backToSelect = useCallback(() => {
    BS_sfx("back");
    playingRef.current = false;
    stopLoop();
    stopMusic();
    setView("select");
  }, [BS_sfx, stopLoop, stopMusic]);

  const retry = useCallback(() => {
    BS_sfx("click");
    playingRef.current = false;
    stopLoop();
    stopMusic();
    setView("select");
  }, [BS_sfx, stopLoop, stopMusic]);

  // prevent scroll / overscroll during play (mobile)
  useEffect(() => {
    if (view !== "play") return;
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, [view]);

  // ---------- render ----------
  const safeTop = 12;
  const safeBottom = 12;

  return (
    <div
      ref={rootRef}
      className={`relative w-full h-[100dvh] overflow-hidden text-white ${view === "play" && isIOS ? "bsNoBlur" : ""}`}
      style={{
        background:
          "radial-gradient(140% 110% at 20% 0%, rgba(255,255,255,0.08), rgba(0,0,0,0) 55%), radial-gradient(140% 120% at 70% 15%, rgba(255,255,255,0.06), rgba(0,0,0,0) 55%), #05060a",
      }}
    >
      {/* background bunny (cast) */}
      <div className="absolute inset-0 opacity-[0.20] pointer-events-none">
        <div className="absolute inset-0 bsGrain" />
        <img
          src={BS_ASSETS.bunnies[castKey] || BS_ASSETS.bunnies.standR || BS_ASSETS.bunnies.standL}
          alt=""
          className="absolute right-[-10%] top-[10%] w-[420px] max-w-[92vw] object-contain bs-float"
          draggable={false}
          style={{
            filter: `drop-shadow(${accent.shadow})`,
          }}
        />
      </div>

      {/* audio bunny button (never disappears) */}
      <button
        className="absolute right-3 top-3 z-[60] w-12 h-12 rounded-2xl border border-white/[0.14] bg-black/45 bsBlur shadow-[0_18px_60px_rgba(0,0,0,0.38)] active:scale-[0.99]"
        style={{
          backdropFilter: view === "play" && isIOS ? "none" : "blur(18px)",
        }}
        onClick={(e) => {
          e.stopPropagation();
          // unlock + toggle
          const ok = BS_unlockAudio();
          if (ok) setAudioOpen((v) => !v);
          else setAudioOpen(true);
          BS_sfx("click");
        }}
      >
        <img src={BS_ASSETS.bunnies.button} alt="" className="w-full h-full object-contain" draggable={false} />
      </button>

      {/* audio panel */}
      {audioOpen && (
        <div className="absolute right-3 top-[68px] z-[60] w-[min(360px,calc(100vw-24px))] rounded-3xl bg-black/55 border border-white/[0.14] bsBlur shadow-[0_20px_70px_rgba(0,0,0,0.55)] overflow-hidden"
             style={{ backdropFilter: view === "play" && isIOS ? "none" : "blur(18px)" }}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-[11px] tracking-[0.34em] text-white/55">AUDIO</div>
              <button
                className="w-9 h-9 rounded-2xl border border-white/[0.12] bg-white/[0.06] flex items-center justify-center"
                onClick={() => { setAudioOpen(false); BS_sfx("click"); }}
              >
                <span className="text-white/75">✕</span>
              </button>
            </div>

            {needsAudioUnlock && (
              <div className="mt-3 rounded-2xl border border-white/[0.12] bg-white/[0.06] p-3 text-[12px] text-white/70">
                Tap the bunny once to unlock audio on iOS Safari.
              </div>
            )}

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-white/70 text-[12px] tracking-[0.14em]">MUSIC</div>
                <div className="text-white/45 text-[12px] tabular-nums">{Math.round(musicVol * 100)}%</div>
              </div>
              <input
                className="bsRange mt-2"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={musicVol}
                onChange={(e) => setMusicVol(Number(e.target.value))}
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="text-white/70 text-[12px] tracking-[0.14em]">SFX</div>
                <div className="text-white/45 text-[12px] tabular-nums">{Math.round(sfxVol * 100)}%</div>
              </div>
              <input
                className="bsRange mt-2"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={sfxVol}
                onChange={(e) => setSfxVol(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}

      {/* main content */}
      <div className="relative z-10 w-full h-full flex flex-col" style={{ paddingTop: safeTop, paddingBottom: safeBottom }}>
        {/* header */}
        <div className="px-4 pt-1 pb-3">
          <div className="text-white/55 text-[11px] tracking-[0.38em]">BEAT SYNC</div>
          <div className="mt-1 text-white/90 text-[18px] font-semibold tracking-[0.06em]">OS Bunny</div>
        </div>

        {/* select */}
        {view === "select" && (
          <div className="flex-1 min-h-0 flex flex-col gap-4 px-4 pb-4">
            {/* cast */}
            <div className="rounded-3xl bg-white/[0.05] border border-white/[0.12] p-4 bsBlur"
                 style={{ backdropFilter: "blur(18px)" }}
            >
              <div className="flex items-center justify-between">
                <div className="text-white/60 text-[11px] tracking-[0.34em]">CAST</div>
                <div className="text-white/40 text-[11px] tracking-[0.14em]">choose buddy</div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {Object.keys(BS_ASSETS.bunnies).filter((k)=>k!=="button" && k!=="front").map((k) => (
                  <button
                    key={k}
                    className={`h-14 rounded-2xl border ${castKey === k ? "border-white/[0.26]" : "border-white/[0.12]"} bg-black/30 overflow-hidden`}
                    style={{ boxShadow: castKey === k ? accent.shadow : "none" }}
                    onClick={() => { setCastKey(k); BS_sfx("select"); }}
                  >
                    <img src={BS_ASSETS.bunnies[k]} alt="" className="w-full h-full object-contain" draggable={false} />
                  </button>
                ))}
              </div>
            </div>

            {/* difficulty */}
            <div className="rounded-3xl bg-white/[0.05] border border-white/[0.12] p-4 bsBlur"
                 style={{ backdropFilter: "blur(18px)" }}
            >
              <div className="flex items-center justify-between">
                <div className="text-white/60 text-[11px] tracking-[0.34em]">DIFFICULTY</div>
                <div className="text-white/40 text-[11px] tracking-[0.14em]">{difficulty}</div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {["EASY", "NORMAL", "HARD"].map((d) => (
                  <button
                    key={d}
                    className={`h-11 rounded-2xl border ${difficulty === d ? "border-white/[0.26]" : "border-white/[0.12]"} bg-black/35`}
                    style={{
                      boxShadow: difficulty === d ? accent.shadow : "none",
                    }}
                    onClick={() => {
                      setDifficulty(d);
                      BS_sfx("select");
                    }}
                  >
                    <span className="text-[12px] tracking-[0.22em] text-white/80">{d}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* tracks */}
            <div className="rounded-3xl bg-white/[0.05] border border-white/[0.12] p-4 bsBlur"
                 style={{ backdropFilter: "blur(18px)" }}
            >
              <div className="flex items-center justify-between">
                <div className="text-white/60 text-[11px] tracking-[0.34em]">TRACK</div>
                <div className="text-white/40 text-[11px] tracking-[0.14em]">90 sec fixed</div>
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2">
                {BS_ASSETS.tracks.map((t, idx) => {
                  const isSel = idx === selectedIdx;
                  const a = BS_ACCENTS[idx % BS_ACCENTS.length];
                  const cu = BS_COVERS[idx % BS_COVERS.length];
                  return (
                    <button
                      key={t.url}
                      className={`snap-center shrink-0 w-[min(260px,78vw)] rounded-3xl bg-black/30 border ${
                        isSel ? "border-white/[0.26]" : "border-white/[0.12]"
                      } overflow-hidden text-left active:scale-[0.995]`}
                      style={{ boxShadow: isSel ? `0 0 26px ${a}` : "none" }}
                      onClick={() => {
                        BS_sfx("select");
                        setSelectedIdx(idx);
                        if (!needsAudioUnlock) {
                          // swap preview to selected
                          startPreview();
                        }
                      }}
                    >
                      <div className="p-4 flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-black/30 border border-white/[0.10]">
                          <img src={cu} alt="" className="w-full h-full object-cover" draggable={false} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-white/90 text-[14px] tracking-[0.06em] truncate">{t.title}</div>
                          <div className="text-white/40 text-[11px] tracking-[0.14em] mt-1 truncate">{isSel ? "SELECTED" : " "}</div>
                        </div>
                      </div>
                      <div className="h-[1px] w-full" style={{ background: `linear-gradient(90deg, rgba(255,255,255,0.00), ${a}, rgba(255,255,255,0.00))` }} />
                      <div className="px-4 py-3 text-white/45 text-[11px] tracking-[0.14em] flex items-center justify-between">
                        <span>{difficulty}</span>
                        <span className="tabular-nums">90s</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* start */}
            <div className="mt-auto sticky" style={{ bottom: "calc(env(safe-area-inset-bottom) + 14px)" }}>
              <button
                className="w-full px-4 py-4 rounded-3xl bg-white/[0.10] border border-white/[0.18] text-white/90 font-semibold tracking-[0.16em] hover:bg-white/[0.12] active:scale-[0.995]"
                style={{ boxShadow: `0 0 32px ${accent.solid}` }}
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
              >
                START
              </button>
              <div className="text-white/35 text-[11px] tracking-[0.12em] mt-2 text-center">
                {needsAudioUnlock ? "Tap the bunny to unlock audio first (iOS Safari)" : " "}
              </div>
            </div>
          </div>
        )}

        {/* play */}
        {view === "play" && (
          <div className="flex-1 min-h-0 flex flex-col gap-3 px-4 pb-4">
            {/* HUD */}
            <div
              className="px-4 py-3 rounded-3xl bg-white/[0.06] border border-white/[0.12] bsBlur flex items-center justify-between gap-3"
              style={{ backdropFilter: isIOS ? "none" : "blur(14px)" }}
            >
              <div className="min-w-0">
                <div className="text-white/80 text-[12px] tracking-[0.16em] truncate">{selectedTrack.title}</div>
                <div className="text-white/45 text-[11px] tracking-[0.12em] mt-1">
                  {effectiveDiffRef.current} · <span className="tabular-nums">{timeLeft}s</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="px-3 py-2 rounded-2xl bg-black/35 border border-white/[0.12]">
                  <div className="text-white/45 text-[10px] tracking-[0.34em]">SCORE</div>
                  <div className="text-white/92 text-[16px] font-semibold leading-none tabular-nums">{hud.score}</div>
                </div>
                <div className="px-3 py-2 rounded-2xl bg-black/35 border border-white/[0.12]">
                  <div className="text-white/45 text-[10px] tracking-[0.34em]">COMBO</div>
                  <div className="text-white/92 text-[16px] font-semibold leading-none tabular-nums">{hud.combo}</div>
                </div>
                <button
                  className="w-11 h-11 rounded-2xl border border-white/[0.12] bg-black/35 flex items-center justify-center"
                  onClick={backToSelect}
                >
                  <span className="text-white/75">✕</span>
                </button>
              </div>
            </div>

            {/* stage */}
            <div ref={stageRef} className="relative flex-1 min-h-0 rounded-3xl bg-black/35 border border-white/[0.12] overflow-hidden">
              <canvas ref={canvasRef} className="absolute inset-0 bsCanvas" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: accent.bloom, opacity: 0.40 }} />

              {/* judge overlay */}
              {judge && (
                <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="px-4 py-2 rounded-2xl border border-white/[0.12] bg-black/45 bsBlur" style={{ backdropFilter: isIOS ? "none" : "blur(12px)", animation: "bsPop 220ms ease-out" }}>
                    <div className="text-[11px] tracking-[0.32em] text-white/55">JUDGE</div>
                    <div className="text-[28px] font-semibold text-white/92 leading-none">{judge}</div>
                  </div>
                </div>
              )}

              {/* pads */}
              <div className="absolute left-0 right-0 bottom-0 pointer-events-none" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 10px)" }}>
                <div className="mx-3 mb-3 rounded-3xl bg-white/[0.06] border border-white/[0.12] bsBlur shadow-[0_18px_60px_rgba(0,0,0,0.38)] pointer-events-auto"
                     style={{ backdropFilter: isIOS ? "none" : "blur(16px)" }}
                >
                  <div className="grid grid-cols-4 gap-2 p-2">
                    {[0, 1, 2, 3].map((lane) => {
                      const isDown = padsDown[lane];
                      return (
                        <button
                          key={lane}
                          onPointerDown={(e) => {
                            try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
                            onPadDown(lane, e);
                          }}
                          onPointerUp={(e) => {
                            try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
                            onPadUp(lane, e);
                          }}
                          onPointerCancel={(e) => {
                            try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
                            onPadUp(lane, e);
                          }}
                          className="relative h-[64px] rounded-2xl border border-white/[0.12] bg-black/35 overflow-hidden select-none"
                          style={{
                            touchAction: "none",
                            transform: isDown ? "translateY(1px)" : "translateY(0)",
                            boxShadow: isDown ? `inset 0 0 0 1px rgba(255,255,255,0.10), ${accent.shadow}` : "inset 0 0 0 1px rgba(255,255,255,0.06), 0 18px 50px rgba(0,0,0,0.38)",
                          }}
                        >
                          {/* ripple */}
                          {ripples
                            .filter((r) => r.lane === lane)
                            .map((r) => (
                              <span
                                key={r.id}
                                className="absolute rounded-full pointer-events-none"
                                style={{
                                  left: r.x,
                                  top: r.y,
                                  width: r.size,
                                  height: r.size,
                                  transform: "translate(-50%, -50%)",
                                  background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.38), rgba(255,255,255,0) 68%)",
                                  animation: "bsRipple 520ms ease-out forwards",
                                }}
                              />
                            ))}

                          <div className="absolute inset-0 pointer-events-none" style={{ background: isDown ? accent.bloom : "radial-gradient(140% 120% at 50% 20%, rgba(255,255,255,0.10), rgba(0,0,0,0) 60%)", opacity: isDown ? 0.78 : 0.46 }} />
                          <div className="absolute inset-x-0 bottom-0 h-[2px]" style={{ background: accent.glow, opacity: isDown ? 0.86 : 0.36 }} />

                          <div className="relative h-full flex items-center justify-center">
                            <div className="text-white/80 text-[18px] font-semibold" style={{ textShadow: "0 10px 26px rgba(0,0,0,0.45)" }}>
                              {lane === 0 ? "◀" : lane === 1 ? "▲" : lane === 2 ? "▼" : "▶"}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* result */}
        {view === "result" && (
          <div className="flex-1 min-h-0 flex flex-col gap-4 px-4 pb-4">
            {(() => {
              const st = statsRef.current;
              const total = Math.max(1, st.totalNotes);
              const acc = (st.perfect + st.good * 0.6) / total;
              const accPct = Math.round(acc * 1000) / 10;
              const rank = acc >= 0.95 ? "S" : acc >= 0.9 ? "A" : acc >= 0.82 ? "B" : acc >= 0.7 ? "C" : "D";
              const poseKey = rank === "S" ? "yayR" : rank === "A" ? "standR" : st.miss > st.good + st.perfect ? "dizzy" : "flop";
              const pose = BS_ASSETS.bunnies[poseKey] || BS_ASSETS.bunnies.standR || BS_ASSETS.bunnies.standR || BS_ASSETS.bunnies.standL;

              const statCard = (label, value, tone) => (
                <div className="rounded-3xl bg-white/[0.05] border border-white/[0.12] p-4" style={{ boxShadow: tone }}>
                  <div className="text-white/55 text-[11px] tracking-[0.34em]">{label}</div>
                  <div className="mt-1 text-white/92 text-[22px] font-semibold tabular-nums">{value}</div>
                </div>
              );

              return (
                <>
                  <div className="rounded-3xl bg-white/[0.05] border border-white/[0.12] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-white/55 text-[11px] tracking-[0.36em]">RESULT</div>
                        <div className="mt-1 text-white/92 text-[18px] font-semibold truncate">{selectedTrack.title}</div>
                        <div className="mt-1 text-white/55 text-[12px]">
                          {effectiveDiffRef.current} · ACC {accPct.toFixed(1)}% · MAX {st.maxCombo} · GHOST {st.ghost}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="px-3 py-2 rounded-2xl bg-white/[0.06] border border-white/[0.12]">
                          <div className="text-white/45 text-[10px] tracking-[0.34em]">RANK</div>
                          <div className="text-white/92 text-[22px] font-semibold leading-none">{rank}</div>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-black/30 border border-white/[0.12] overflow-hidden">
                          <img src={pose} alt="pose" className="w-full h-full object-contain" draggable={false} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="text-white/45 text-[11px] tracking-[0.12em]">SCORE</div>
                      <div className="text-white/92 text-[28px] font-semibold tabular-nums">{st.score}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {statCard("PERFECT", st.perfect, "0 0 24px rgba(255,255,255,0.06)")}
                    {statCard("GOOD", st.good, "0 0 24px rgba(255,255,255,0.04)")}
                    {statCard("MISS", st.miss, "0 0 24px rgba(255,255,255,0.03)")}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <button
                      className="h-12 rounded-3xl bg-white/[0.08] border border-white/[0.14] text-white/85 tracking-[0.16em] active:scale-[0.995]"
                      onClick={() => {
                        BS_sfx("click");
                        setView("select");
                      }}
                    >
                      BACK
                    </button>
                    <button
                      className="h-12 rounded-3xl bg-white/[0.12] border border-white/[0.18] text-white/92 font-semibold tracking-[0.16em] active:scale-[0.995]"
                      style={{ boxShadow: `0 0 30px ${accent.solid}` }}
                      onClick={() => {
                        BS_sfx("click");
                        setView("select");
                      }}
                    >
                      PLAY AGAIN
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* hidden audio element */}
      <audio ref={musicRef} preload="auto" playsInline />

      <style>{`
            @keyframes bsPop {
              0% { transform: translateY(6px) scale(0.96); opacity: 0; }
              100% { transform: translateY(0) scale(1); opacity: 1; }
            }
            @keyframes bsRipple {
              0% { opacity: 0.62; transform: translate(-50%, -50%) scale(0.12); }
              100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes bsFloat {
              0% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
              100% { transform: translateY(0); }
            }
            .bs-float {
              animation: bsFloat 2.8s ease-in-out infinite;
              will-change: transform;
            }

            /* perf / flicker guards */
            .bsStage {
              contain: paint;
              transform: translateZ(0);
            }
            .bsCanvas {
              transform: translateZ(0);
              backface-visibility: hidden;
              will-change: transform;
            }

            /* range styling (Audio panel) */
            .bsRange {
              -webkit-appearance: none;
              appearance: none;
              width: 100%;
              height: 30px;
              background: transparent;
              outline: none;
            }
            .bsRange::-webkit-slider-runnable-track {
              height: 6px;
              border-radius: 999px;
              background: rgba(255,255,255,0.18);
              border: 1px solid rgba(255,255,255,0.10);
            }
            .bsRange::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 999px;
              background: rgba(255,255,255,0.92);
              border: 1px solid rgba(255,255,255,0.24);
              margin-top: -8px;
              box-shadow: 0 12px 34px rgba(0,0,0,0.44);
            }
            .bsRange:focus::-webkit-slider-runnable-track {
              background: rgba(255,255,255,0.24);
            }
            .bsRange::-moz-range-track {
              height: 6px;
              border-radius: 999px;
              background: rgba(255,255,255,0.18);
              border: 1px solid rgba(255,255,255,0.10);
            }
            .bsRange::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 999px;
              background: rgba(255,255,255,0.92);
              border: 1px solid rgba(255,255,255,0.24);
              box-shadow: 0 12px 34px rgba(0,0,0,0.44);
            }
            .bsRange::-moz-range-progress {
              height: 6px;
              border-radius: 999px;
              background: rgba(255,255,255,0.28);
            }

            
            /* play flicker guard (iOS Safari): avoid expensive backdrop filters during gameplay */
            .bsNoBlur .bsBlur {
              -webkit-backdrop-filter: none !important;
              backdrop-filter: none !important;
            }

            /* subtle scanline grain to de-cheapen (very low contrast) */
            .bsGrain:before{
              content:"";
              position:absolute;
              inset:0;
              pointer-events:none;
              background:
                linear-gradient(transparent, rgba(255,255,255,0.018), transparent),
                radial-gradient(120% 80% at 30% 0%, rgba(255,255,255,0.032), rgba(0,0,0,0) 55%);
              mix-blend-mode: overlay;
              opacity: 0.55;
            }

            @media (prefers-reduced-motion: reduce) {
              .bs-float { animation: none !important; }
            }
          `}</style>
    </div>
  );
};


// ==============================
// END — Beat Sync (Game App)
// ==============================









// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
//🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸
// 🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸9. ROOT（るーと） ---🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸
// --------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------

const GLOBAL_CSS = `
@keyframes fly-across {
  0% { left: 110%; transform: translateY(0); }
  25% { transform: translateY(-20px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(20px); }
  100% { left: -20%; transform: translateY(0); }
}
.animate-fly-across { animation: fly-across 30s linear infinite; }

@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 8s linear infinite; }

@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
.animate-fade-in { animation: fade-in 0.8s ease-out forwards; }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

/* 100dvh support fallback */
body { margin: 0; background: #000; overflow: hidden; height: 100vh; height: 100dvh; }
`;

export default function os_usagi_xxxx() {
  const [mode, setMode] = useState("power");
  const bgm = useBGM(PLAYLIST);

  return (
    <MobileProvider>
      <div className="w-full h-[100dvh] bg-black text-white font-sans overflow-hidden">
        {mode === "power" && <PowerScreen onPower={() => setMode("intro")} />}
        {mode === "intro" && <IntroScreen onComplete={() => setMode("desktop")} />}
        {mode === "desktop" && <Desktop bgm={bgm} />}

        <style>{GLOBAL_CSS}</style>
      </div>
    </MobileProvider>
  );
}
