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
    // eslint-disable-next-line
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
// ------------------------------------------------
// 🌸🌸🎮 07.Game (OS_USAGI ARCADE) — REBUILT v2
// - Lobby CTA is ALWAYS visible (sticky bottom)
// - Play layout never overlaps with OS dock
// - Pointer-first input (no ghost click / no double fire)
// - Premium neon/glass, beat-synced FX, addictive loop
// ------------------------------------------------
const BeatSyncApp = () => {
  // ---------------------------------------------------------------------------
  // ASSETS (catbox)  ※ユーザー提示URLそのまま
  // ---------------------------------------------------------------------------
  const ASSET = React.useMemo(
    () => ({
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
      bunny: {
        front: "https://files.catbox.moe/cdsn2q.jpg",
        idle: "https://files.catbox.moe/3revxm.png",
        runR: "https://files.catbox.moe/p45obb.png",
        yayR: "https://files.catbox.moe/mkceap.png",
        dizzy: "https://files.catbox.moe/gxng27.png",
        flop: "https://files.catbox.moe/dwiqep.png",
        starR: "https://files.catbox.moe/5zvxy0.png",
      },
      tracks: [
        { id: "overhaul", title: "Overhaul", url: "https://files.catbox.moe/po0sn4.mp3", bpm: 124 },
        { id: "dawning", title: "The Dawning", url: "https://files.catbox.moe/p17dic.mp3", bpm: 120 },
        { id: "mirage", title: "mirage", url: "https://files.catbox.moe/ttlaul.mp3", bpm: 132 },
        { id: "phantasma", title: "廻る世界とファンタズマ", url: "https://files.catbox.moe/ns5til.mp3", bpm: 150 },
        { id: "immitation", title: "Immitation Girl", url: "https://files.catbox.moe/7lccok.mp3", bpm: 128 },
        { id: "checkmate", title: "checkmate", url: "https://files.catbox.moe/3dutdo.mp3", bpm: 140 },
        { id: "lockon", title: "ロックオン", url: "https://files.catbox.moe/o667wd.mp3", bpm: 160 },
      ],
    }),
    []
  );

  // ---------------------------------------------------------------------------
  // TOKENS (Network/Galleryより「高級ネオン」に振り切る)
  // ---------------------------------------------------------------------------
  const TOK = React.useMemo(
    () => ({
      bg: "#05060a",
      panel: "rgba(0,0,0,0.46)",
      panel2: "rgba(255,255,255,0.06)",
      line: "rgba(255,255,255,0.14)",
      line2: "rgba(255,255,255,0.10)",

      // premium neon accents
      cyan: "rgba(120,220,255,0.55)",
      cyan2: "rgba(120,220,255,0.22)",
      lav: "rgba(195,160,255,0.48)",
      lav2: "rgba(195,160,255,0.20)",
      pink: "rgba(255,150,220,0.36)",
      pink2: "rgba(255,150,220,0.16)",
      mint: "rgba(170,255,210,0.26)",
      gold: "rgba(255,220,150,0.18)",

      // lanes (stronger)
      lane0: "rgba(195,160,255,0.72)", // left
      lane1: "rgba(120,220,255,0.72)", // down
      lane2: "rgba(255,150,220,0.60)", // up
      lane3: "rgba(170,255,210,0.58)", // right
    }),
    []
  );

  // ---------------------------------------------------------------------------
  // HELPERS
  // ---------------------------------------------------------------------------
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmtMMSS = (sec) => {
    if (!isFinite(sec) || sec < 0) return "--:--";
    const s = Math.floor(sec);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  };

  // ---------------------------------------------------------------------------
  // INPUT (Pointer-first / capture / no ghost click)
  // ---------------------------------------------------------------------------
  const pointerLockRef = React.useRef(new Set());
  const press = React.useCallback((fn) => {
    const onPointerDown = (e) => {
      try {
        if (e?.pointerId != null) {
          if (pointerLockRef.current.has(e.pointerId)) return;
          pointerLockRef.current.add(e.pointerId);
          e.currentTarget?.setPointerCapture?.(e.pointerId);
        }
      } catch {}
      try {
        e.preventDefault?.();
        e.stopPropagation?.();
      } catch {}
      fn?.();
    };
    const onPointerUp = (e) => {
      try {
        if (e?.pointerId != null) pointerLockRef.current.delete(e.pointerId);
      } catch {}
    };
    const onPointerCancel = (e) => {
      try {
        if (e?.pointerId != null) pointerLockRef.current.delete(e.pointerId);
      } catch {}
    };
    return {
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      // クリック由来の二重発火を避ける（ブラウザによってはclickが後追いで来る）
      onClick: (e) => {
        try {
          e.preventDefault?.();
          e.stopPropagation?.();
        } catch {}
      },
    };
  }, []);

  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  const [trackId, setTrackId] = React.useState("overhaul");
  const [difficulty, setDifficulty] = React.useState("EASY"); // EASY/NORMAL/HARD
  const [status, setStatus] = React.useState("idle"); // idle/ready/playing/paused/result
  const [loaded, setLoaded] = React.useState(false);

  const [score, setScore] = React.useState(0);
  const [combo, setCombo] = React.useState(0);
  const [maxCombo, setMaxCombo] = React.useState(0);
  const [counts, setCounts] = React.useState({ perfect: 0, good: 0, miss: 0 });
  const [accuracy, setAccuracy] = React.useState(0);

  const [judgeFx, setJudgeFx] = React.useState(null); // {type, at, seed}
  const [particles, setParticles] = React.useState([]);

  const [musicVol, setMusicVol] = React.useState(0.86);
  const [sfxVol, setSfxVol] = React.useState(0.55);
  const [muted, setMuted] = React.useState(false);
  const [sfxOn, setSfxOn] = React.useState(true);

  const [latencyMs, setLatencyMs] = React.useState(0);
  const [speed, setSpeed] = React.useState(980);

  const [showConfig, setShowConfig] = React.useState(false);
  const [frame, setFrame] = React.useState(0);

  // ---------------------------------------------------------------------------
  // REFS
  // ---------------------------------------------------------------------------
  const audioRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const playTRef = React.useRef(0);

  const notesRef = React.useRef([]);
  const cursorRef = React.useRef(0);
  const durationRef = React.useRef(0);
  const lastNoteTRef = React.useRef(0);

  const rootRef = React.useRef(null);
  const fieldRef = React.useRef(null);
  const [rootW, setRootW] = React.useState(360);
  const [rootH, setRootH] = React.useState(640);
  const [fieldW, setFieldW] = React.useState(360);
  const [fieldH, setFieldH] = React.useState(420);

  // WebAudio (SFX)
  const actxRef = React.useRef(null);
  const sfxGainRef = React.useRef(null);

  // ---------------------------------------------------------------------------
  // TRACK
  // ---------------------------------------------------------------------------
  const currentTrack = React.useMemo(
    () => ASSET.tracks.find((t) => t.id === trackId) || ASSET.tracks[0],
    [ASSET.tracks, trackId]
  );

  // ---------------------------------------------------------------------------
  // RESPONSIVE
  // ---------------------------------------------------------------------------
  React.useEffect(() => {
    if (!rootRef.current) return;
    const el = rootRef.current;

    const apply = () => {
      const r = el.getBoundingClientRect?.();
      if (!r) return;
      setRootW(Math.max(320, Math.floor(r.width)));
      setRootH(Math.max(520, Math.floor(r.height)));
    };
    apply();

    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => apply());
      ro.observe(el);
    } else {
      window.addEventListener("resize", apply);
    }
    return () => {
      ro?.disconnect?.();
      window.removeEventListener("resize", apply);
    };
  }, []);

  React.useEffect(() => {
    if (!fieldRef.current) return;
    const el = fieldRef.current;

    const apply = () => {
      const r = el.getBoundingClientRect?.();
      if (!r) return;
      setFieldW(Math.max(320, Math.floor(r.width)));
      setFieldH(Math.max(260, Math.floor(r.height)));
    };
    apply();

    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => apply());
      ro.observe(el);
    } else {
      window.addEventListener("resize", apply);
    }
    return () => {
      ro?.disconnect?.();
      window.removeEventListener("resize", apply);
    };
  }, []);

  const isMobile = rootW < 560;

  // OS下ドックが被る前提：ゲーム側で“固定パッドぶん”確保（重なり事故を絶対に起こさない）
  // ※ここは「ロビーCTAも必ず見える」設計に合わせて少し強め
  const dockSafePad = React.useMemo(() => (isMobile ? 122 : 86), [isMobile]);

  // ---------------------------------------------------------------------------
  // AUDIO
  // ---------------------------------------------------------------------------
  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = muted ? 0 : clamp(musicVol, 0, 1);
  }, [musicVol, muted]);

  const ensureAudioContext = React.useCallback(() => {
    if (actxRef.current) return actxRef.current;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    const actx = new AC();
    const g = actx.createGain();
    g.gain.value = 0.8;
    g.connect(actx.destination);
    actxRef.current = actx;
    sfxGainRef.current = g;
    return actx;
  }, []);

  React.useEffect(() => {
    const g = sfxGainRef.current;
    if (!g) return;
    g.gain.value = muted || !sfxOn ? 0 : clamp(sfxVol, 0, 1);
  }, [muted, sfxOn, sfxVol]);

  const playSfx = React.useCallback(
    (kind, intensity = 1) => {
      if (muted || !sfxOn) return;
      const actx = ensureAudioContext();
      if (!actx) return;
      if (actx.state === "suspended") actx.resume?.().catch(() => {});
      const out = sfxGainRef.current;
      if (!out) return;

      const t0 = actx.currentTime;
      const dur = kind === "miss" ? 0.08 : kind === "good" ? 0.10 : 0.12;

      // tone
      const o1 = actx.createOscillator();
      const g1 = actx.createGain();
      o1.type = "triangle";
      o1.frequency.value = kind === "perfect" ? 820 : kind === "good" ? 540 : 150;
      g1.gain.setValueAtTime(0.0001, t0);
      g1.gain.exponentialRampToValueAtTime(0.22 * intensity, t0 + 0.008);
      g1.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o1.connect(g1);
      g1.connect(out);
      o1.start(t0);
      o1.stop(t0 + dur);

      // sparkle for perfect
      if (kind === "perfect" && intensity > 0.9) {
        const o2 = actx.createOscillator();
        const g2 = actx.createGain();
        o2.type = "sine";
        o2.frequency.value = 1320;
        g2.gain.setValueAtTime(0.0001, t0);
        g2.gain.exponentialRampToValueAtTime(0.14, t0 + 0.01);
        g2.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.09);
        o2.connect(g2);
        g2.connect(out);
        o2.start(t0);
        o2.stop(t0 + 0.10);
      }

      // noise tick for non-miss
      if (kind !== "miss") {
        const nDur = 0.05;
        const buffer = actx.createBuffer(1, Math.floor(actx.sampleRate * nDur), actx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.35;

        const src = actx.createBufferSource();
        src.buffer = buffer;

        const f = actx.createBiquadFilter();
        f.type = "highpass";
        f.frequency.value = kind === "perfect" ? 1700 : 1200;

        const gn = actx.createGain();
        gn.gain.setValueAtTime(0.0001, t0);
        gn.gain.exponentialRampToValueAtTime(0.12 * intensity, t0 + 0.008);
        gn.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.06);

        src.connect(f);
        f.connect(gn);
        gn.connect(out);

        src.start(t0);
        src.stop(t0 + 0.06);
      }
    },
    [ensureAudioContext, muted, sfxOn, sfxVol]
  );

  // ---------------------------------------------------------------------------
  // ACCURACY
  // ---------------------------------------------------------------------------
  React.useEffect(() => {
    const total = counts.perfect + counts.good + counts.miss;
    if (!total) return setAccuracy(0);
    const acc = (counts.perfect * 1 + counts.good * 0.66) / total;
    setAccuracy(clamp(acc, 0, 1) * 100);
  }, [counts]);

  // ---------------------------------------------------------------------------
  // GAME CONSTANTS
  // ---------------------------------------------------------------------------
  const LANES = 4;
  const LANE_ICON = ["left", "down", "up", "right"];

  // 判定幅：難易度で少し締める（中毒性：気持ちいい→悔しいの往復）
  const BASE_WINDOW = React.useMemo(() => ({ perfect: 0.060, good: 0.112, miss: 0.178 }), []);
  const windowByDiff = React.useMemo(() => {
    if (difficulty === "HARD") return { perfect: 0.88, good: 0.90, miss: 0.92 };
    if (difficulty === "NORMAL") return { perfect: 0.95, good: 0.95, miss: 0.96 };
    return { perfect: 1.03, good: 1.02, miss: 1.00 };
  }, [difficulty]);

  const win = React.useMemo(() => ({
    perfect: BASE_WINDOW.perfect * windowByDiff.perfect,
    good: BASE_WINDOW.good * windowByDiff.good,
    miss: BASE_WINDOW.miss * windowByDiff.miss,
  }), [BASE_WINDOW, windowByDiff]);

  const laneColor = React.useCallback(
    (lane) => (lane === 0 ? TOK.lane0 : lane === 1 ? TOK.lane1 : lane === 2 ? TOK.lane2 : TOK.lane3),
    [TOK.lane0, TOK.lane1, TOK.lane2, TOK.lane3]
  );

  // ---------------------------------------------------------------------------
  // FIXED CHARTS (track × difficulty) - 維持
  // ---------------------------------------------------------------------------
  const CHART_PACK = React.useMemo(() => {
    const mapTok = (t) => {
      if (!t || t === ".") return null;
      const m = { L: 0, D: 1, U: 2, R: 3 };
      if (t.includes("|")) {
        const parts = t.split("|").map((x) => x.trim()).filter(Boolean);
        const lanes = parts.map((p) => m[p]).filter((v) => v !== undefined);
        return lanes.length ? lanes : null;
      }
      return m[t] !== undefined ? [m[t]] : null;
    };

    const compile = ({ bpm, offsetSec, subdiv, motifs }) => {
      const beat = 60 / (bpm || 120);
      const stepSec = beat * (4 / subdiv);
      const notes = [];
      let t = offsetSec ?? 1.2;
      let id = 0;

      for (const block of motifs) {
        const rep = block.r || 1;
        for (let rr = 0; rr < rep; rr++) {
          const tokens = block.toks;
          for (let i = 0; i < tokens.length; i++) {
            const lanes = mapTok(tokens[i]);
            if (lanes) {
              for (const lane of lanes) {
                notes.push({ id: `n${id++}`, t: +t.toFixed(4), lane, judged: false, hit: false });
              }
            }
            t += stepSec;
          }
        }
      }
      notes.sort((a, b) => a.t - b.t);
      return notes;
    };

    const MR = (s, r) => ({ toks: s.split(" ").map((x) => x.trim()), r });

    const pack = {
      overhaul: {
        EASY: { subdiv: 8, offsetSec: 1.15, motifs: [MR("L . D . U . R .", 8), MR("L . . R . U . .", 6), MR("L . U . D . R .", 6)] },
        NORMAL:{ subdiv:16, offsetSec: 1.10, motifs: [MR("L . D . U . R . L . U . D . R .", 6), MR("L . . R U . . D L . . R U . . D", 6), MR("L D . U . R . D L . U . R . D .", 5)] },
        HARD:  { subdiv:16, offsetSec: 1.05, motifs: [MR("L D U R . U . D L . U . R D . .", 6), MR("L . U . R . D . L|U . R . D . U .", 5), MR("L D . R U . D . L . U . R . D U", 5)] },
      },
      dawning: {
        EASY:  { subdiv: 8, offsetSec: 1.20, motifs: [MR("L . . D . . U .", 8), MR("L . U . . D . .", 6), MR("L . D . U . . R", 6)] },
        NORMAL:{ subdiv:16, offsetSec: 1.12, motifs: [MR("L . D . . U . . R . U . . D . .", 7), MR("L . . D U . . R L . . D U . . R", 5)] },
        HARD:  { subdiv:16, offsetSec: 1.08, motifs: [MR("L D . U . R . D . U . R L . D .", 6), MR("L|U . R . D . U . L . D . R . U .", 5), MR("L . U R . D U . L . U . R . D .", 5)] },
      },
      mirage: {
        EASY:  { subdiv: 8, offsetSec: 1.10, motifs: [MR("L . U . R . U .", 8), MR("L . . R . U . .", 6), MR("L . D . U . R .", 6)] },
        NORMAL:{ subdiv:16, offsetSec: 1.05, motifs: [MR("L . U . R . U . L . D . U . R .", 6), MR("L . . R U . . D L . . R U . . D", 6), MR("L D . U . R . U L . D . U . R .", 4)] },
        HARD:  { subdiv:16, offsetSec: 1.02, motifs: [MR("L . U R . U . D L . U . R D . .", 6), MR("L|U . R . U . D . L . U . R . D U", 5), MR("L D U . R . U . D . L . U R . .", 5)] },
      },
      phantasma: {
        EASY:  { subdiv: 8, offsetSec: 1.05, motifs: [MR("L . D . U . R .", 8), MR("L . D . . R . U", 6), MR("L . U . D . R .", 6)] },
        NORMAL:{ subdiv:16, offsetSec: 1.00, motifs: [MR("L . D . U . R . L . D . U . R .", 6), MR("L D . R U . D . L D . R U . D .", 5), MR("L . U . R . D . L . U . R . D .", 4)] },
        HARD:  { subdiv:16, offsetSec: 0.98, motifs: [MR("L D U R L . U . D . R . U . D .", 5), MR("L|U . R . D . U . L . R . D U . .", 5), MR("L D . U R . D . L . U . R D U .", 5)] },
      },
      immitation: {
        EASY:  { subdiv: 8, offsetSec: 1.15, motifs: [MR("L . U . D . U .", 8), MR("L . . R . U . .", 6), MR("L . D . U . R .", 6)] },
        NORMAL:{ subdiv:16, offsetSec: 1.10, motifs: [MR("L . U . D . U . L . D . U . R .", 6), MR("L . . D U . . R L . . D U . . R", 6), MR("L D . U . R . D L . U . R . D .", 4)] },
        HARD:  { subdiv:16, offsetSec: 1.06, motifs: [MR("L . U R . U . D L . U . R D . .", 6), MR("L|U . R . U . D . L . U . R . D U", 5), MR("L D U . R . D . L . U . R D U .", 5)] },
      },
      checkmate: {
        EASY:  { subdiv: 8, offsetSec: 1.10, motifs: [MR("L . D . U . R .", 8), MR("L . . R . U . .", 6), MR("L . U . D . R .", 6)] },
        NORMAL:{ subdiv:16, offsetSec: 1.04, motifs: [MR("L . D . U . R . L . U . D . R .", 6), MR("L D . R U . D . L D . R U . D .", 5), MR("L . U . R . D . L . U . R . D .", 4)] },
        HARD:  { subdiv:16, offsetSec: 1.00, motifs: [MR("L D U R . U . D L . U . R D . .", 6), MR("L|U . R . D . U . L . R . D U . .", 5), MR("L D . U . R . D L . U . R . D U", 5)] },
      },
      lockon: {
        EASY:  { subdiv: 8, offsetSec: 1.00, motifs: [MR("L . U . R . U .", 8), MR("L . D . U . R .", 6), MR("L . U . D . R .", 6)] },
        NORMAL:{ subdiv:16, offsetSec: 0.98, motifs: [MR("L . U . R . U . L . D . U . R .", 6), MR("L D . R U . D . L D . R U . D .", 5), MR("L . U R . D U . L . U . R . D .", 4)] },
        HARD:  { subdiv:16, offsetSec: 0.96, motifs: [MR("L D U R L . U . D . R . U . D .", 5), MR("L|U . R . U . D . L . U . R D . .", 5), MR("L D . U R . D . L . U . R D U .", 5)] },
      },
    };

    return { pack, compile };
  }, []);

  const buildFixedChart = React.useCallback(
    (durationSec, diff) => {
      const def =
        CHART_PACK.pack?.[currentTrack.id]?.[diff] ||
        CHART_PACK.pack?.[ASSET.tracks[0].id]?.[diff];

      const bpm = currentTrack.bpm || 120;
      const notes = CHART_PACK.compile({
        bpm,
        offsetSec: def?.offsetSec ?? 1.2,
        subdiv: def?.subdiv ?? 8,
        motifs: def?.motifs ?? [],
      });

      const endAt = Math.max(12, Math.min((durationSec || 180) - 0.9, durationSec || 180));
      const trimmed = notes.filter((n) => n.t < endAt);
      trimmed.sort((a, b) => a.t - b.t);
      return trimmed;
    },
    [ASSET.tracks, CHART_PACK, currentTrack.bpm, currentTrack.id]
  );

  // ---------------------------------------------------------------------------
  // STOP/RESET/CLEANUP
  // ---------------------------------------------------------------------------
  const stopPlayback = React.useCallback(() => {
    const a = audioRef.current;
    if (!a) return;

    a.pause();
    a.currentTime = 0;

    playTRef.current = 0;
    cursorRef.current = 0;
    notesRef.current = [];
    lastNoteTRef.current = 0;

    setCombo(0);
    setJudgeFx(null);
    setParticles([]);
    setStatus(loaded ? "ready" : "idle");
    setFrame((f) => f + 1);
  }, [loaded]);

  const hardReset = React.useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCounts({ perfect: 0, good: 0, miss: 0 });
    setJudgeFx(null);
    setParticles([]);
    setAccuracy(0);

    playTRef.current = 0;
    cursorRef.current = 0;
    notesRef.current = [];
    lastNoteTRef.current = 0;

    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }

    setStatus(loaded ? "ready" : "idle");
    setFrame((f) => f + 1);
  }, [loaded]);

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  const finishRun = React.useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    const a = audioRef.current;
    if (a) a.pause();
    setStatus("result");
  }, []);

  // ---------------------------------------------------------------------------
  // LOOP
  // ---------------------------------------------------------------------------
  const tick = React.useCallback(() => {
    const a = audioRef.current;
    if (!a) return;

    const now = performance.now();
    const t = a.currentTime || 0;
    playTRef.current = t;

    const missLine = t - (win.miss + 0.02) - latencyMs / 1000;

    let i = cursorRef.current;
    const notes = notesRef.current;

    let missed = 0;
    while (i < notes.length) {
      const n = notes[i];
      if (n.judged) {
        i++;
        continue;
      }
      if (n.t <= missLine) {
        n.judged = true;
        n.hit = false;
        missed++;
        i++;
        continue;
      }
      break;
    }

    if (missed > 0) {
      cursorRef.current = i;
      setCounts((c) => ({ ...c, miss: c.miss + missed }));
      setCombo(0);
      setJudgeFx({ type: "miss", at: now, seed: (now * 1000) | 0 });
      setParticles((p) => p.slice(-12));
      navigator.vibrate?.(10);
      playSfx("miss", 0.8);
    }

    const dur = durationRef.current || a.duration || 0;
    const lastNoteT = lastNoteTRef.current || 0;
    const doneByNotes = notes.length ? t > lastNoteT + 0.95 : t > 1.5;

    if ((dur && t >= dur - 0.02) || doneByNotes) {
      finishRun();
      return;
    }

    setFrame((f) => f + 1);
    rafRef.current = requestAnimationFrame(tick);
  }, [finishRun, latencyMs, playSfx, win.miss]);

  // ---------------------------------------------------------------------------
  // START/PAUSE/RESUME/RESTART
  // ---------------------------------------------------------------------------
  const startRun = React.useCallback(async () => {
    const a = audioRef.current;
    if (!a || !loaded) return;

    const dur = a.duration || durationRef.current || 0;
    durationRef.current = dur;

    const notes = buildFixedChart(dur || 180, difficulty);
    notesRef.current = notes;
    cursorRef.current = 0;
    lastNoteTRef.current = notes.length ? notes[notes.length - 1].t : 0;

    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCounts({ perfect: 0, good: 0, miss: 0 });
    setJudgeFx(null);
    setParticles([]);

    a.currentTime = 0;
    playTRef.current = 0;

    try {
      ensureAudioContext();
      await a.play();
    } catch {
      setStatus("ready");
      return;
    }

    setStatus("playing");
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [buildFixedChart, difficulty, ensureAudioContext, loaded, tick]);

  const pauseRun = React.useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setStatus("paused");
  }, []);

  const resumeRun = React.useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      ensureAudioContext();
      await a.play();
    } catch {
      return;
    }
    setStatus("playing");
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [ensureAudioContext, tick]);

  const restartRun = React.useCallback(async () => {
    const a = audioRef.current;
    if (!a || !loaded) return;

    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setCounts({ perfect: 0, good: 0, miss: 0 });
    setJudgeFx(null);
    setParticles([]);

    const dur = a.duration || durationRef.current || 0;
    durationRef.current = dur;

    const notes = buildFixedChart(dur || 180, difficulty);
    notesRef.current = notes;
    cursorRef.current = 0;
    lastNoteTRef.current = notes.length ? notes[notes.length - 1].t : 0;

    a.pause();
    a.currentTime = 0;
    playTRef.current = 0;

    try {
      ensureAudioContext();
      await a.play();
    } catch {
      setStatus("ready");
      return;
    }

    setStatus("playing");
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [buildFixedChart, difficulty, ensureAudioContext, loaded, tick]);

  // ---------------------------------------------------------------------------
  // JUDGE + FX
  // ---------------------------------------------------------------------------
  const spawnParticles = React.useCallback((seed, intensity) => {
    const count = intensity >= 1 ? 16 : 11;
    const next = [];
    for (let i = 0; i < count; i++) {
      const r1 = Math.sin((seed + i * 97) * 0.0007) * 0.5 + 0.5;
      const r2 = Math.sin((seed + i * 131) * 0.0009) * 0.5 + 0.5;
      const r3 = Math.sin((seed + i * 173) * 0.0011) * 0.5 + 0.5;
      const ang = r1 * Math.PI * 2;
      const dist = 18 + r2 * 62;
      next.push({
        id: `${seed}_${i}`,
        x: Math.cos(ang) * dist,
        y: Math.sin(ang) * dist * 0.66,
        s: 0.78 + r3 * 0.72,
        o: 0.18 + r2 * 0.42,
      });
    }
    setParticles((p) => [...p.slice(-30), ...next]);
  }, []);

  const applyJudge = React.useCallback(
    (type) => {
      const now = performance.now();
      const seed = (now * 1000) | 0;

      setJudgeFx({ type, at: now, seed });

      if (type === "perfect") {
        setCounts((c) => ({ ...c, perfect: c.perfect + 1 }));
        setScore((s) => s + 1000 + combo * 9);
        setCombo((c) => {
          const next = c + 1;
          setMaxCombo((m) => Math.max(m, next));
          return next;
        });
        navigator.vibrate?.(combo >= 14 ? 10 : 6);
        spawnParticles(seed, 1);
        playSfx("perfect", combo >= 26 ? 1.08 : 1.0);
      } else if (type === "good") {
        setCounts((c) => ({ ...c, good: c.good + 1 }));
        setScore((s) => s + 620 + combo * 4);
        setCombo((c) => {
          const next = c + 1;
          setMaxCombo((m) => Math.max(m, next));
          return next;
        });
        navigator.vibrate?.(5);
        spawnParticles(seed, 0.75);
        playSfx("good", 0.94);
      } else {
        setCounts((c) => ({ ...c, miss: c.miss + 1 }));
        setCombo(0);
        navigator.vibrate?.(12);
        playSfx("miss", 0.82);
      }
    },
    [combo, playSfx, spawnParticles]
  );

  const hitLane = React.useCallback(
    (lane) => {
      if (status === "ready") return startRun();
      if (status === "paused") return resumeRun();
      if (status !== "playing") return;

      const t = playTRef.current || 0;
      const adjT = t + latencyMs / 1000;
      const notes = notesRef.current;

      const startIdx = cursorRef.current;
      const endIdx = Math.min(startIdx + 34, notes.length);

      let bestIdx = -1;
      let bestAbs = Infinity;

      for (let k = startIdx; k < endIdx; k++) {
        const n = notes[k];
        if (n.judged) continue;

        const dt = n.t - adjT;
        if (dt < -win.miss) continue;
        if (dt > win.miss) break;
        if (n.lane !== lane) continue;

        const abs = Math.abs(dt);
        if (abs < bestAbs) {
          bestAbs = abs;
          bestIdx = k;
        }
      }

      if (bestIdx === -1) {
        applyJudge("miss");
        return;
      }

      const n = notes[bestIdx];
      const dt = Math.abs(n.t - adjT);

      n.judged = true;
      n.hit = true;

      while (cursorRef.current < notes.length && notes[cursorRef.current].judged) cursorRef.current++;

      if (dt <= win.perfect) applyJudge("perfect");
      else if (dt <= win.good) applyJudge("good");
      else applyJudge("miss");
    },
    [applyJudge, latencyMs, resumeRun, startRun, status, win.good, win.miss, win.perfect]
  );

  // ---------------------------------------------------------------------------
  // LOAD AUDIO
  // ---------------------------------------------------------------------------
  React.useEffect(() => {
    setLoaded(false);
    setStatus("idle");
    setJudgeFx(null);
    setParticles([]);

    const a = audioRef.current;
    if (!a) return;

    a.pause();
    a.currentTime = 0;

    const onMeta = () => {
      durationRef.current = a.duration || 0;
      setLoaded(true);
      setStatus("ready");
    };
    const onEnded = () => finishRun();

    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnded);

    return () => {
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnded);
    };
  }, [currentTrack.url, finishRun]);

  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.src = currentTrack.url;
    a.crossOrigin = "anonymous";
    a.load();
  }, [currentTrack.url]);

  // ---------------------------------------------------------------------------
  // KEYBOARD (desktop)
  // ---------------------------------------------------------------------------
  React.useEffect(() => {
    const onKey = (e) => {
      if (showConfig) return;
      const k = e.key;
      if (k === "ArrowLeft") hitLane(0);
      if (k === "ArrowDown") hitLane(1);
      if (k === "ArrowUp") hitLane(2);
      if (k === "ArrowRight") hitLane(3);
      if (k === " " || k === "Enter") {
        if (status === "playing") pauseRun();
        else if (status === "paused") resumeRun();
        else if (status === "ready") startRun();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hitLane, pauseRun, resumeRun, showConfig, startRun, status]);

  // ---------------------------------------------------------------------------
  // VISUAL CALC
  // ---------------------------------------------------------------------------
  const ui = React.useMemo(() => {
    const t = playTRef.current || 0;
    const dur = durationRef.current || 0;
    const remain = dur ? Math.max(0, dur - t) : NaN;

    // receptor line (lower, but not too low)
    const receptorY = clamp(Math.floor(fieldH * 0.84), 210, Math.max(240, fieldH - 54));

    // visible range
    const margin = 220;
    const spawnAhead = (receptorY + margin) / speed;
    const past = (fieldH - receptorY + margin) / speed;
    const minT = t - past - 0.06;
    const maxT = t + spawnAhead + 0.06;

    const notes = notesRef.current;
    let i = cursorRef.current;
    while (i > 0 && notes[i - 1] && notes[i - 1].t >= minT) i--;

    const list = [];
    for (let k = i; k < notes.length; k++) {
      const n = notes[k];
      if (n.t < minT) continue;
      if (n.t > maxT) break;
      if (!n.judged) list.push(n);
      if (list.length > 96) break;
    }

    const fxAlive = judgeFx && performance.now() - judgeFx.at < 520;
    const fxAge = fxAlive ? performance.now() - judgeFx.at : 9999;

    // beat pulse
    const bpm = currentTrack.bpm || 120;
    const beat = 60 / bpm;
    const phase = beat > 0 ? (t % beat) / beat : 0;
    const pulse = 0.62 + Math.sin(phase * Math.PI * 2) * 0.38; // 0.24..1.0
    const pulseSoft = 0.78 + Math.sin(phase * Math.PI * 2) * 0.22;

    const fever = combo >= 18 ? clamp((combo - 18) / 24, 0, 1) : 0;

    return { t, dur, remain, receptorY, list, fxAlive, fxAge, pulse, pulseSoft, fever };
  }, [combo, currentTrack.bpm, fieldH, frame, judgeFx, speed]);

  const remainText = fmtMMSS(ui.remain);

  const bunnyMood = React.useMemo(() => {
    if (status === "result") return ASSET.bunny.flop;
    if (combo >= 42) return ASSET.bunny.starR;
    if (combo >= 16) return ASSET.bunny.yayR;
    if (judgeFx?.type === "miss") return ASSET.bunny.dizzy;
    if (status === "playing") return ASSET.bunny.runR;
    return ASSET.bunny.idle;
  }, [ASSET.bunny, combo, judgeFx, status]);

  const setTrackSafe = (id) => {
    setTrackId(id);
    stopPlayback();
    setShowConfig(false);
  };

  // ---------------------------------------------------------------------------
  // UI PARTS
  // ---------------------------------------------------------------------------
  const Chip = ({ active, children, onPress, glow }) => (
    <button
      className={`h-11 rounded-2xl border px-4 active:scale-[0.99] ${active ? "bg-white/10" : "bg-white/5"}`}
      {...press(onPress)}
      style={{
        borderColor: active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)",
        boxShadow: active
          ? `0 0 0 1px ${glow} inset, 0 0 46px rgba(255,255,255,0.06), 0 0 60px ${glow}`
          : "0 18px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div className="text-[11px] tracking-[0.26em] uppercase text-white/92">{children}</div>
    </button>
  );

  const Pad = ({ lane, label }) => {
    const glow = laneColor(lane);
    const icon = ASSET.arrows[LANE_ICON[lane]];
    const activePulse = status === "playing" ? ui.pulse : 0.6;

    return (
      <button
        className="relative rounded-[28px] border overflow-hidden active:scale-[0.99]"
        {...press(() => hitLane(lane))}
        aria-label={`lane-${lane}`}
        style={{
          borderColor: "rgba(255,255,255,0.16)",
          background: "rgba(255,255,255,0.05)",
          boxShadow:
            `0 28px 90px rgba(0,0,0,0.72),` +
            `inset 0 1px 0 rgba(255,255,255,0.10),` +
            `0 0 0 1px ${glow} inset,` +
            `0 0 ${18 + activePulse * 22}px rgba(255,255,255,0.06),` +
            `0 0 ${30 + activePulse * 48}px ${glow}`,
          touchAction: "none", // ←スクロール/ズーム由来のタップ不発を潰す
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {/* neon flow */}
        <div
          className="absolute inset-0 opacity-95"
          style={{
            background:
              `radial-gradient(260px 180px at 28% 18%, ${glow}, transparent 62%),` +
              `radial-gradient(260px 180px at 70% 90%, rgba(255,255,255,0.12), transparent 64%)`,
            filter: "blur(10px)",
            transform: `scale(${1.03 + activePulse * 0.03})`,
          }}
        />
        {/* scan */}
        <div
          className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 8px)",
          }}
        />
        <div className="relative h-full w-full flex flex-col items-center justify-center gap-2 py-3">
          <img
            src={icon}
            alt={label}
            className="h-9 w-9 opacity-95"
            draggable={false}
            style={{
              filter: `drop-shadow(0 0 ${16 + activePulse * 14}px ${glow}) drop-shadow(0 0 26px rgba(255,255,255,0.10))`,
            }}
          />
          <div className="text-[10px] tracking-[0.34em] uppercase text-white/60">{label}</div>
        </div>
      </button>
    );
  };

  // ---------------------------------------------------------------------------
  // LOBBY (CTA ALWAYS VISIBLE)
  // ---------------------------------------------------------------------------
  const Lobby = () => {
    const glow = ui.fever > 0.01 ? `rgba(255,150,220,${0.22 + ui.fever * 0.25})` : "rgba(120,220,255,0.20)";

    return (
      <div className="absolute inset-0 z-40">
        {/* backdrop */}
        <div className="absolute inset-0 bg-black/55 backdrop-blur-2xl" />

        {/* panel shell (scroll + sticky CTA) */}
        <div className="relative h-full w-full flex flex-col min-h-0">
          {/* top header */}
          <div className="px-4 pt-4 pb-2">
            <div
              className="rounded-[34px] border overflow-hidden"
              style={{
                borderColor: TOK.line,
                background: "rgba(0,0,0,0.55)",
                boxShadow: "0 34px 120px rgba(0,0,0,0.82), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-12 w-12 rounded-2xl border border-white/12 bg-white/5 overflow-hidden">
                    <img src={ASSET.bunny.front} alt="os_bunny" className="h-full w-full object-cover opacity-90" draggable={false} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-[0.34em] uppercase text-white/55">
                      OS_USAGI <span className="text-white/90">ARCADE</span>
                    </div>
                    <div className="text-[13px] text-white/92 font-semibold truncate">{currentTrack.title}</div>
                    <div className="mt-1 text-[10px] tracking-[0.28em] uppercase text-white/45">
                      BPM {currentTrack.bpm} · {difficulty} · SPEED {speed}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    className="h-12 w-12 rounded-2xl border border-white/12 bg-white/5 active:scale-[0.99]"
                    {...press(() => setShowConfig(true))}
                    style={{ boxShadow: "0 18px 60px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.08)" }}
                    aria-label="config"
                    title="Config"
                  >
                    <span className="text-white/88 text-[16px] leading-none">⚙︎</span>
                  </button>
                  <button
                    className="h-12 w-12 rounded-2xl border border-white/12 bg-white/5 active:scale-[0.99]"
                    {...press(hardReset)}
                    style={{ boxShadow: "0 18px 60px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.08)" }}
                    aria-label="reset"
                    title="Reset"
                  >
                    <span className="text-white/80 text-[16px] leading-none">✕</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* scroll area */}
          <div className="flex-1 min-h-0 overflow-auto px-4 pb-6">
            {/* difficulty */}
            <div className="mt-2">
              <div className="text-[10px] tracking-[0.34em] uppercase text-white/45 mb-2">DIFFICULTY</div>
              <div className="grid grid-cols-3 gap-2">
                <Chip active={difficulty === "EASY"} glow={TOK.cyan2} onPress={() => { setDifficulty("EASY"); if (status !== "playing") stopPlayback(); }}>
                  EASY
                </Chip>
                <Chip active={difficulty === "NORMAL"} glow={TOK.lav2} onPress={() => { setDifficulty("NORMAL"); if (status !== "playing") stopPlayback(); }}>
                  NORMAL
                </Chip>
                <Chip active={difficulty === "HARD"} glow={TOK.pink2} onPress={() => { setDifficulty("HARD"); if (status !== "playing") stopPlayback(); }}>
                  HARD
                </Chip>
              </div>
            </div>

            {/* track list */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <div className="text-[10px] tracking-[0.34em] uppercase text-white/45">TRACKS</div>
                <div className="text-[10px] tracking-[0.34em] uppercase text-white/35">TAP TO LOAD</div>
              </div>

              <div
                className="mt-2 rounded-[30px] border overflow-hidden"
                style={{
                  borderColor: TOK.line2,
                  background: "rgba(0,0,0,0.42)",
                  boxShadow: "0 26px 90px rgba(0,0,0,0.70), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <div className="max-h-[46vh] overflow-auto p-3 space-y-2">
                  {ASSET.tracks.map((t) => {
                    const active = t.id === trackId;
                    const g = active ? "rgba(195,160,255,0.22)" : "rgba(120,220,255,0.14)";
                    return (
                      <button
                        key={t.id}
                        className={`w-full text-left rounded-[22px] border px-4 py-3 active:scale-[0.995] ${
                          active ? "border-white/18 bg-white/10" : "border-white/12 bg-white/5"
                        }`}
                        {...press(() => setTrackSafe(t.id))}
                        style={{
                          boxShadow: active
                            ? `0 0 0 1px ${g} inset, 0 0 50px ${g}`
                            : "0 18px 60px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.06)",
                        }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-[13px] text-white/92 font-semibold truncate">{t.title}</div>
                            <div className="mt-1 text-[10px] tracking-[0.28em] uppercase text-white/45">BPM {t.bpm}</div>
                          </div>
                          <div className="shrink-0 text-[10px] tracking-[0.34em] uppercase text-white/60">
                            {active ? "LOADED" : "LOAD"}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* mini tutorial (not boring) */}
            <div className="mt-5">
              <div
                className="rounded-[30px] border p-4"
                style={{
                  borderColor: TOK.line2,
                  background: "rgba(0,0,0,0.35)",
                  boxShadow: "0 22px 70px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <div className="text-[10px] tracking-[0.34em] uppercase text-white/45">HOW TO</div>
                <div className="mt-2 text-[12px] text-white/85 leading-relaxed">
                  判定ラインに合わせて <span className="text-white/95 font-semibold">同じ矢印</span> をタップ。
                  <br />
                  <span className="text-white/90">PERFECT</span> で光が深く、<span className="text-white/90">COMBO</span> が伸びるほど世界が加速する。
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[
                    ["LEFT", 0, TOK.lav2],
                    ["DOWN", 1, TOK.cyan2],
                    ["UP", 2, TOK.pink2],
                    ["RIGHT", 3, TOK.mint],
                  ].map(([label, lane, g]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/5 py-2 text-center"
                      style={{ boxShadow: `0 0 0 1px ${g} inset` }}
                    >
                      <div className="text-[10px] tracking-[0.32em] uppercase text-white/60">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-8" />
          </div>

          {/* sticky CTA (ALWAYS VISIBLE) */}
          <div
            className="sticky bottom-0 px-4 pb-[env(safe-area-inset-bottom)] pt-3"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.72), rgba(0,0,0,0.00))",
            }}
          >
            <div
              className="rounded-[30px] border p-3"
              style={{
                borderColor: TOK.line,
                background: "rgba(0,0,0,0.58)",
                boxShadow: `0 30px 110px rgba(0,0,0,0.82), 0 0 60px ${glow}`,
              }}
            >
              <div className="flex gap-2">
                <button
                  className="flex-1 h-14 rounded-[24px] border border-white/14 bg-white/10 text-white/92 active:scale-[0.99] disabled:opacity-50"
                  disabled={!loaded}
                  {...press(() => startRun())}
                  style={{
                    boxShadow:
                      "0 26px 90px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.10), 0 0 70px rgba(120,220,255,0.14)",
                  }}
                >
                  <div className="text-[11px] tracking-[0.34em] uppercase">
                    {loaded ? "START — TAP ANY PAD" : "LOADING…"}
                  </div>
                </button>

                <button
                  className="h-14 px-5 rounded-[24px] border border-white/12 bg-white/5 text-white/80 active:scale-[0.99] disabled:opacity-50"
                  disabled={!loaded}
                  {...press(() => {
                    ensureAudioContext();
                    playSfx("perfect", 1.0);
                    navigator.vibrate?.(6);
                  })}
                  style={{
                    boxShadow: "0 26px 90px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.10)",
                  }}
                  title="SFX test"
                >
                  <div className="text-[11px] tracking-[0.26em] uppercase">SFX</div>
                </button>
              </div>

              <div className="mt-2 text-center text-[10px] tracking-[0.34em] uppercase text-white/40">
                {loaded ? "READY" : "LOADING AUDIO…"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // MAIN RENDER
  // ---------------------------------------------------------------------------
  const feverGlow = ui.fever > 0 ? `rgba(255,150,220,${0.18 + ui.fever * 0.22})` : "rgba(120,220,255,0.12)";

  return (
    <div
      ref={rootRef}
      className="relative h-full w-full overflow-hidden select-none"
      style={{
        background: TOK.bg,
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      {/* BACKGROUND — premium neon */}
      <div className="absolute inset-0 pointer-events-none">
        {/* deep haze */}
        <div
          className="absolute -inset-36 opacity-95"
          style={{
            background:
              `radial-gradient(980px 620px at 14% 10%, ${TOK.cyan2}, transparent 60%),` +
              `radial-gradient(920px 600px at 88% 14%, ${TOK.lav2}, transparent 62%),` +
              `radial-gradient(980px 680px at 52% 94%, ${TOK.pink2}, transparent 64%),` +
              `radial-gradient(900px 620px at 60% 44%, ${TOK.mint}, transparent 62%)`,
            filter: "blur(14px)",
            animation: "osbArcadeHaze 9s ease-in-out infinite alternate",
          }}
        />
        {/* beat bloom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              `radial-gradient(560px 320px at 50% 18%, rgba(120,220,255,0.12), transparent 62%),` +
              `radial-gradient(620px 360px at 50% 92%, ${feverGlow}, transparent 62%)`,
            filter: "blur(18px)",
            opacity: status === "playing" ? 0.95 : 0.60,
            transform: `scale(${1 + ui.pulseSoft * 0.012})`,
          }}
        />
        {/* premium scanlines */}
        <div
          className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 7px)",
          }}
        />
        {/* diagonal shimmer */}
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.06),transparent)] [background-size:220%_220%] osb-shimmer" />
      </div>

      {/* CONTENT — strict 3-stack: HUD / FIELD / PADS (no overlap) */}
      <div
        className="relative z-10 flex h-full flex-col min-h-0"
        style={{
          paddingTop: "max(10px, env(safe-area-inset-top))",
          paddingBottom: `calc(env(safe-area-inset-bottom) + ${dockSafePad}px)`,
        }}
      >
        {/* HUD */}
        <div className="px-3">
          <div
            className="mx-auto max-w-[980px] rounded-[30px] border backdrop-blur-2xl overflow-hidden"
            style={{
              borderColor: TOK.line,
              background: TOK.panel,
              boxShadow: "0 18px 90px rgba(0,0,0,0.70), inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
          >
            <div className="px-3 py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-10 w-10 rounded-2xl border border-white/12 bg-white/5 overflow-hidden">
                  <img src={bunnyMood} alt="bunny" className="h-full w-full object-cover opacity-90" draggable={false} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] tracking-[0.34em] uppercase text-white/55">
                    OS_USAGI <span className="text-white/90">SYNC</span>
                  </div>
                  <div className="text-[12px] text-white/92 font-semibold truncate">{currentTrack.title}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <span className="text-[10px] tracking-[0.28em] uppercase text-white/45">SCORE</span>
                    <span className="ml-2 text-[12px] text-white/92 tabular-nums">{score.toLocaleString()}</span>
                  </div>
                  <div
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                    style={{
                      boxShadow:
                        combo >= 12 ? "0 0 0 1px rgba(120,220,255,0.18) inset, 0 0 40px rgba(120,220,255,0.14)" : "none",
                    }}
                  >
                    <span className="text-[10px] tracking-[0.28em] uppercase text-white/45">COMBO</span>
                    <span className="ml-2 text-[12px] text-white/90 tabular-nums">{combo}</span>
                  </div>
                </div>

                <button
                  className="h-10 w-10 rounded-2xl border border-white/12 bg-white/5 active:scale-[0.99]"
                  {...press(() => setShowConfig(true))}
                  aria-label="config"
                  style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.66), inset 0 1px 0 rgba(255,255,255,0.10)" }}
                  title="Config"
                >
                  <span className="text-white/88 text-[16px] leading-none">⚙︎</span>
                </button>

                <button
                  className="h-10 w-10 rounded-2xl border border-white/12 bg-white/5 active:scale-[0.99]"
                  {...press(hardReset)}
                  aria-label="reset"
                  style={{ boxShadow: "0 18px 70px rgba(0,0,0,0.66), inset 0 1px 0 rgba(255,255,255,0.10)" }}
                  title="Reset"
                >
                  <span className="text-white/80 text-[16px] leading-none">✕</span>
                </button>
              </div>
            </div>

            <div className="px-3 pb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap sm:hidden">
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <span className="text-[10px] tracking-[0.28em] uppercase text-white/45">SCORE</span>
                  <span className="ml-2 text-[12px] text-white/92 tabular-nums">{score.toLocaleString()}</span>
                </div>
                <div
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                  style={{
                    boxShadow:
                      combo >= 12 ? "0 0 0 1px rgba(120,220,255,0.18) inset, 0 0 40px rgba(120,220,255,0.14)" : "none",
                  }}
                >
                  <span className="text-[10px] tracking-[0.28em] uppercase text-white/45">COMBO</span>
                  <span className="ml-2 text-[12px] text-white/90 tabular-nums">{combo}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <span className="text-[10px] tracking-[0.28em] uppercase text-white/45">REMAIN</span>
                  <span className="ml-2 text-[12px] text-white/90 tabular-nums">{remainText}</span>
                </div>
              </div>

              <div className="text-[10px] tracking-[0.28em] uppercase text-white/40 text-right">
                <div>{difficulty} · SPEED {speed}</div>
                <div className="tabular-nums text-white/60">{status === "playing" ? "SYNC" : status.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* PLAYFIELD */}
        <div className="mt-3 px-3 flex-1 min-h-0">
          <div
            className="mx-auto max-w-[980px] h-full rounded-[34px] border overflow-hidden relative"
            style={{
              borderColor: TOK.line2,
              background: "rgba(0,0,0,0.26)",
              backdropFilter: "blur(24px)",
              boxShadow:
                `0 30px 120px rgba(0,0,0,0.78), inset 0 1px 0 rgba(255,255,255,0.10), 0 0 90px ${feverGlow}`,
            }}
          >
            {/* inner frame */}
            <div
              className="absolute inset-[10px] rounded-[28px] border overflow-hidden"
              style={{
                borderColor: "rgba(255,255,255,0.10)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.10))",
              }}
            >
              <div ref={fieldRef} className="absolute inset-0">
                {/* perspective lanes */}
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: "perspective(900px) rotateX(18deg)",
                      transformOrigin: "50% 92%",
                      opacity: 0.96,
                    }}
                  >
                    <div className="absolute inset-0 grid grid-cols-4">
                      {[0, 1, 2, 3].map((lane) => (
                        <div key={lane} className="relative">
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(180deg, ${laneColor(lane)} 0%, transparent 58%)`,
                              opacity: 0.16 + ui.fever * 0.10,
                            }}
                          />
                          <div className="absolute inset-y-0 right-0 w-px bg-white/10" />
                        </div>
                      ))}
                    </div>

                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(880px 420px at 50% 20%, rgba(255,255,255,0.12), transparent 62%)",
                        opacity: 0.28,
                        filter: "blur(6px)",
                      }}
                    />
                  </div>
                </div>

                {/* judgement line */}
                <div className="absolute inset-x-0 z-20 pointer-events-none" style={{ top: ui.receptorY - 2 }}>
                  <div className="mx-auto max-w-[760px] px-3">
                    <div
                      className="h-[5px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(120,220,255,0.70), rgba(195,160,255,0.60), rgba(255,150,220,0.40), transparent)",
                        boxShadow:
                          `0 0 ${24 + ui.pulse * 20}px rgba(120,220,255,0.20), ` +
                          `0 0 ${34 + ui.pulse * 26}px rgba(195,160,255,0.16), ` +
                          `0 0 ${38 + ui.fever * 42}px ${feverGlow}`,
                        opacity: status === "playing" ? 0.98 : 0.70,
                        transform: `scaleX(${1.0 + ui.pulseSoft * 0.018})`,
                      }}
                    />
                    <div
                      className="mt-2 h-[1px] opacity-55"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.26), transparent)",
                      }}
                    />
                  </div>
                </div>

                {/* NOTES */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  {ui.list.map((n) => {
                    const t = playTRef.current || 0;
                    const adjT = t + latencyMs / 1000;
                    const dt = n.t - adjT;
                    const y = ui.receptorY - dt * speed;

                    const xPct = ((n.lane + 0.5) / LANES) * 100;
                    const glow = laneColor(n.lane);

                    const depth = clamp(y / (fieldH || 1), 0, 1);
                    const sc = 0.76 + depth * 0.34;
                    const op = clamp(0.30 + depth * 0.78, 0, 1);

                    const size = isMobile ? 56 : 60;

                    return (
                      <div
                        key={n.id}
                        className="absolute"
                        style={{
                          left: `calc(${xPct}% - ${size / 2}px)`,
                          top: `${y - size / 2}px`,
                          width: size,
                          height: size,
                          transform: `translate3d(0,0,0) scale(${sc})`,
                          opacity: op,
                          willChange: "transform, top, opacity",
                        }}
                      >
                        <div
                          className="h-full w-full rounded-2xl border border-white/12 bg-black/45 backdrop-blur-xl flex items-center justify-center"
                          style={{
                            boxShadow:
                              `0 22px 74px rgba(0,0,0,0.68),` +
                              `0 0 0 1px ${glow} inset,` +
                              `0 0 ${18 + depth * 20}px ${glow},` +
                              `0 0 ${22 + ui.fever * 32}px ${feverGlow}`,
                          }}
                        >
                          <img
                            src={ASSET.arrows[LANE_ICON[n.lane]]}
                            alt="note"
                            className="h-8 w-8 opacity-95"
                            draggable={false}
                            style={{
                              filter:
                                `drop-shadow(0 0 ${14 + depth * 12}px ${glow}) drop-shadow(0 0 22px rgba(255,255,255,0.10))`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Lobby overlay (idle/ready) */}
                {(status === "idle" || status === "ready") && <Lobby />}

                {/* JUDGE FX */}
                {ui.fxAlive && (
                  <div className="absolute inset-x-0 top-[40%] -translate-y-1/2 flex justify-center pointer-events-none z-50">
                    <div className="relative">
                      <div className="absolute inset-0" style={{ filter: "blur(14px)", opacity: 0.22, transform: "translateY(10px) scale(1.06)" }}>
                        <img
                          src={judgeFx.type === "perfect" ? ASSET.judge.perfect : judgeFx.type === "good" ? ASSET.judge.good : ASSET.judge.miss}
                          alt="ghost"
                          className="h-14"
                          draggable={false}
                        />
                      </div>
                      <img
                        src={judgeFx.type === "perfect" ? ASSET.judge.perfect : judgeFx.type === "good" ? ASSET.judge.good : ASSET.judge.miss}
                        alt={judgeFx.type}
                        className="h-14 opacity-95"
                        draggable={false}
                        style={{
                          filter:
                            "drop-shadow(0 0 28px rgba(120,220,255,0.20)) drop-shadow(0 0 34px rgba(195,160,255,0.18)) drop-shadow(0 0 38px rgba(255,150,220,0.12))",
                          animation: "osbJudge 520ms cubic-bezier(0.22,1,0.36,1) both",
                        }}
                      />

                      <div className="absolute left-1/2 top-1/2">
                        {particles.slice(-18).map((p) => (
                          <div
                            key={p.id}
                            className="absolute rounded-full"
                            style={{
                              width: 4,
                              height: 4,
                              transform: `translate(${p.x}px, ${p.y}px) scale(${p.s})`,
                              background: "rgba(255,255,255,0.92)",
                              opacity: p.o,
                              filter:
                                "drop-shadow(0 0 16px rgba(120,220,255,0.30)) drop-shadow(0 0 14px rgba(195,160,255,0.22)) drop-shadow(0 0 14px rgba(255,150,220,0.18))",
                              animation: "osbParticle 560ms cubic-bezier(0.22,1,0.36,1) both",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* RESULT */}
                {status === "result" && (
                  <div className="absolute inset-0 flex items-center justify-center p-4 z-[60]">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" />
                    <div
                      className="relative w-full max-w-[520px] rounded-[34px] border p-5"
                      style={{
                        borderColor: TOK.line,
                        background: "rgba(0,0,0,0.58)",
                        boxShadow: `0 42px 150px rgba(0,0,0,0.88), inset 0 1px 0 rgba(255,255,255,0.10), 0 0 100px ${feverGlow}`,
                      }}
                    >
                      <div className="text-[10px] tracking-[0.34em] uppercase text-white/45">RESULT</div>
                      <div className="mt-1 text-[22px] font-semibold text-white/92">SYNC COMPLETE</div>

                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {[
                          ["Perfect", counts.perfect],
                          ["Good", counts.good],
                          ["Miss", counts.miss],
                        ].map(([label, val]) => (
                          <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                            <div className="text-[10px] tracking-[0.28em] uppercase text-white/45">{label}</div>
                            <div className="mt-1 text-[18px] text-white/92 tabular-nums">{val}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                          <div className="text-[10px] tracking-[0.28em] uppercase text-white/45">Max Combo</div>
                          <div className="mt-1 text-[18px] text-white/92 tabular-nums">{maxCombo}</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                          <div className="text-[10px] tracking-[0.28em] uppercase text-white/45">Accuracy</div>
                          <div className="mt-1 text-[18px] text-white/92 tabular-nums">{accuracy.toFixed(1)}%</div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <button
                          className="h-12 rounded-2xl border border-white/12 bg-white/10 text-white/92 active:scale-[0.99]"
                          {...press(restartRun)}
                          style={{ boxShadow: "0 22px 70px rgba(0,0,0,0.70), inset 0 1px 0 rgba(255,255,255,0.10)" }}
                        >
                          <span className="text-[11px] tracking-[0.22em] uppercase">RESTART</span>
                        </button>
                        <button
                          className="h-12 rounded-2xl border border-white/10 bg-white/5 text-white/80 active:scale-[0.99]"
                          {...press(() => {
                            setStatus("ready");
                            stopPlayback();
                          })}
                          style={{ boxShadow: "0 22px 70px rgba(0,0,0,0.66), inset 0 1px 0 rgba(255,255,255,0.10)" }}
                        >
                          <span className="text-[11px] tracking-[0.22em] uppercase">BACK</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <audio ref={audioRef} preload="metadata" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLLER — fixed area (never overlap, never scroll steal) */}
        <div className="px-3 mt-3">
          <div className="mx-auto max-w-[980px]">
            <div className="flex items-center justify-between gap-2">
              <div className="text-[10px] tracking-[0.34em] uppercase text-white/50">
                {!loaded ? "LOADING…" : status === "ready" ? "LOBBY" : status === "paused" ? "PAUSED" : status === "playing" ? "SYNC" : status.toUpperCase()}
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="h-11 px-4 rounded-2xl border border-white/12 bg-white/10 text-white/90 active:scale-[0.99] disabled:opacity-50"
                  disabled={!loaded}
                  {...press(() => {
                    if (status === "playing") pauseRun();
                    else if (status === "paused") resumeRun();
                    else if (status === "ready") startRun();
                  })}
                  style={{ boxShadow: "0 22px 70px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.10)" }}
                >
                  <span className="text-[11px] tracking-[0.26em] uppercase">
                    {status === "playing" ? "PAUSE" : "PLAY"}
                  </span>
                </button>

                <button
                  className="h-11 px-4 rounded-2xl border border-white/12 bg-white/5 text-white/80 active:scale-[0.99] disabled:opacity-50"
                  disabled={!loaded}
                  {...press(stopPlayback)}
                  style={{ boxShadow: "0 22px 70px rgba(0,0,0,0.66), inset 0 1px 0 rgba(255,255,255,0.10)" }}
                >
                  <span className="text-[11px] tracking-[0.26em] uppercase">STOP</span>
                </button>

                <button
                  className="h-11 px-4 rounded-2xl border border-white/12 bg-white/5 text-white/80 active:scale-[0.99] disabled:opacity-50"
                  disabled={!loaded}
                  {...press(restartRun)}
                  style={{ boxShadow: "0 22px 70px rgba(0,0,0,0.66), inset 0 1px 0 rgba(255,255,255,0.10)" }}
                >
                  <span className="text-[11px] tracking-[0.26em] uppercase">RESTART</span>
                </button>
              </div>
            </div>

            <div className={`mt-2 grid grid-cols-4 ${isMobile ? "gap-2" : "gap-3"}`}>
              <div className={isMobile ? "h-[96px]" : "h-[104px]"}><Pad lane={0} label="LEFT" /></div>
              <div className={isMobile ? "h-[96px]" : "h-[104px]"}><Pad lane={1} label="DOWN" /></div>
              <div className={isMobile ? "h-[96px]" : "h-[104px]"}><Pad lane={2} label="UP" /></div>
              <div className={isMobile ? "h-[96px]" : "h-[104px]"}><Pad lane={3} label="RIGHT" /></div>
            </div>

            <div className="mt-2 text-center text-[10px] tracking-[0.34em] uppercase text-white/40">
              {status === "ready" ? "TAP ANY PAD TO START" : "KEEP THE SYNC"}
            </div>
          </div>
        </div>
      </div>

      {/* CONFIG */}
      {showConfig && (
        <div className="fixed inset-0 z-[9999]" style={{ touchAction: "manipulation" }}>
          <div className="absolute inset-0 bg-black/75 backdrop-blur-2xl" {...press(() => setShowConfig(false))} />
          <div className="absolute inset-x-0 bottom-0 pb-[env(safe-area-inset-bottom)]">
            <div
              className="mx-auto max-w-[980px] rounded-t-[34px] border bg-black/62 backdrop-blur-2xl p-4"
              style={{
                borderColor: TOK.line,
                boxShadow: "0 -28px 120px rgba(0,0,0,0.86), inset 0 1px 0 rgba(255,255,255,0.10)",
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="text-[10px] tracking-[0.34em] uppercase text-white/45">CONFIG</div>
                <button className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 active:scale-[0.99]" {...press(() => setShowConfig(false))}>
                  <span className="text-white/85 text-[16px] leading-none">✕</span>
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] tracking-[0.34em] uppercase text-white/45 mb-2">TRACK</div>
                  <select
                    className="w-full h-11 rounded-2xl bg-white/5 border border-white/10 text-white/85 px-3 text-[13px] outline-none"
                    value={trackId}
                    onChange={(e) => setTrackSafe(e.target.value)}
                  >
                    {ASSET.tracks.map((t) => (
                      <option key={t.id} value={t.id} className="bg-black">
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] tracking-[0.34em] uppercase text-white/45 mb-2">DIFFICULTY</div>
                  <div className="grid grid-cols-3 gap-2">
                    {["EASY", "NORMAL", "HARD"].map((d) => {
                      const active = d === difficulty;
                      return (
                        <button
                          key={d}
                          className={`h-11 rounded-2xl border active:scale-[0.99] ${
                            active ? "border-white/18 bg-white/10 text-white/92" : "border-white/10 bg-white/5 text-white/70"
                          }`}
                          {...press(() => {
                            setDifficulty(d);
                            if (status !== "playing") stopPlayback();
                          })}
                        >
                          <span className="text-[11px] tracking-[0.22em] uppercase">{d}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] tracking-[0.34em] uppercase text-white/45 mb-2">TUNING</div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-white/60">
                        <span className="tracking-[0.22em] uppercase">Latency</span>
                        <span className="tabular-nums text-white/75">{latencyMs} ms</span>
                      </div>
                      <input
                        type="range"
                        min={-120}
                        max={180}
                        value={latencyMs}
                        onChange={(e) => setLatencyMs(parseInt(e.target.value, 10))}
                        className="w-full accent-white/70"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-white/60">
                        <span className="tracking-[0.22em] uppercase">Speed</span>
                        <span className="tabular-nums text-white/75">{speed} px/s</span>
                      </div>
                      <input
                        type="range"
                        min={720}
                        max={1240}
                        value={speed}
                        onChange={(e) => setSpeed(parseInt(e.target.value, 10))}
                        className="w-full accent-white/70"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] tracking-[0.34em] uppercase text-white/45 mb-2">AUDIO</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <button className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 active:scale-[0.99]" {...press(() => setMuted((m) => !m))}>
                        <span className="text-white/85 text-[12px] tracking-[0.22em] uppercase">{muted ? "MUTE" : "ON"}</span>
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-[11px] text-white/60 mb-1">
                          <span className="tracking-[0.22em] uppercase">Music</span>
                          <span className="tabular-nums text-white/75">{Math.round(musicVol * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={musicVol}
                          onChange={(e) => setMusicVol(parseFloat(e.target.value))}
                          className="w-full accent-white/70"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 active:scale-[0.99]" {...press(() => setSfxOn((v) => !v))}>
                        <span className="text-white/85 text-[12px] tracking-[0.22em] uppercase">{sfxOn ? "SFX" : "OFF"}</span>
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-[11px] text-white/60 mb-1">
                          <span className="tracking-[0.22em] uppercase">SFX</span>
                          <span className="tabular-nums text-white/75">{Math.round(sfxVol * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={sfxVol}
                          onChange={(e) => setSfxVol(parseFloat(e.target.value))}
                          className="w-full accent-white/70"
                        />
                      </div>

                      <button
                        className="h-11 px-4 rounded-2xl border border-white/10 bg-white/5 text-white/80 active:scale-[0.99]"
                        {...press(() => {
                          ensureAudioContext();
                          playSfx("perfect", 1.0);
                          navigator.vibrate?.(6);
                        })}
                      >
                        <span className="text-[11px] tracking-[0.22em] uppercase">TEST</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-[10px] tracking-[0.34em] uppercase text-white/35">
                  ARCADE UI · CTA SAFE · POINTER INPUT
                </div>
                <button className="h-11 px-4 rounded-2xl border border-white/12 bg-white/10 text-white/92 active:scale-[0.99]" {...press(() => setShowConfig(false))}>
                  <span className="text-[11px] tracking-[0.22em] uppercase">DONE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .osb-shimmer { animation: osbShimmer 10s ease-in-out infinite; }
        @keyframes osbShimmer {
          0%   { background-position: 0% 50%; opacity: .10; }
          50%  { background-position: 100% 50%; opacity: .14; }
          100% { background-position: 0% 50%; opacity: .10; }
        }
        @keyframes osbJudge {
          0%   { transform: translateY(14px) scale(.95); opacity: 0; }
          38%  { transform: translateY(0px)  scale(1.06); opacity: 1; }
          100% { transform: translateY(-12px) scale(1.00); opacity: 0; }
        }
        @keyframes osbParticle {
          0%   { opacity: 0; transform: translate3d(var(--x,0), var(--y,0), 0) scale(0.8); }
          18%  { opacity: 1; }
          100% { opacity: 0; transform: translate3d(var(--x,0), calc(var(--y,0) - 12px), 0) scale(1.0); }
        }
        @keyframes osbArcadeHaze {
          0%   { transform: translate3d(-10px,-6px,0) scale(1.02); filter: blur(14px); opacity: .88; }
          100% { transform: translate3d(10px,8px,0) scale(1.06); filter: blur(18px); opacity: .98; }
        }
        button { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
};



// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
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
