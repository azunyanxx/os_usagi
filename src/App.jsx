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
      cancelAnimationFrame(raf// ==============================
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
        const img = new Image();        img.onload = () => resolve([u, img]);
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

const BeatSyncApp = () => {
  const rootRef = useRef(null);

  // views: select -> play -> result
  const [view, setView] = useState("select");

  // selection
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [difficulty, setDifficulty] = useState("EASY"); // EASY | NORMAL | HARD (UI)
  const difficultyLocked = view === "play";

  // cast (also background)
  const [castKey, setCastKey] = useState("standL");

  // audio panel
  const [audioPanelOpen, setAudioPanelOpen] = useState(false);
  const [needsAudioUnlock, setNeedsAudioUnlock] = useState(true);

  // settings
  const [settings, setSettings] = useState(() => ({
    sfxOn: true,
    sfxVol: 0.75,
    musicVol: 0.75,
    motion: true,
    haptics: true,
  }));

  const setSettingsPatch = (patch) =>
    setSettings((p) => ({ ...p, ...patch }));

  // preload images
  const imgMapRef = useRef({});
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    const urls = [
      ...Object.values(BS_ASSETS.judge),
      ...Object.values(BS_ASSETS.arrows),
      ...Object.values(BS_ASSETS.bunnies),
    ];
    const { promise, cancel } = BS_preloadImages(urls);
    promise.then((m) => {
      imgMapRef.current = m || {};
      setImagesReady(true);
    });
    return () => cancel();
  }, []);

  // music (preview + play)
  const musicRef = useRef(null);
  const [musicReady, setMusicReady] = useState(false);
  const [musicDur, setMusicDur] = useState(0);
  const runDurRef = useRef(60);

  // SFX engine
  const sfxRef = useRef(null);
  if (!sfxRef.current && typeof window !== "undefined") {
    sfxRef.current = BS_makeSfx();
  }

  const applyVolumes = useCallback(() => {
    // music volume
    const a = musicRef.current;
    if (a) a.volume = BS_clamp(settings.musicVol, 0, 1);
    // sfx volume
    if (sfxRef.current) {
      const v = settings.sfxOn ? settings.sfxVol : 0;
      sfxRef.current.setVolume(v);
    }
  }, [settings.musicVol, settings.sfxOn, settings.sfxVol]);

  useEffect(() => {
    applyVolumes();
  }, [applyVolumes]);

  const BS_unlockAudio = useCallback(async () => {
    let ok = true;
    // WebAudio
    try {
      ok = (await sfxRef.current?.resume?.()) !== false;
    } catch {
      ok = false;
    }
    // HTMLAudio warm-up
    try {
      const a = musicRef.current;
      if (a) {
        const prevVol = a.volume;
        a.volume = 0;
        const p = a.play();
        if (p && typeof p.then === "function") await p;
        a.pause();
        a.currentTime = 0;
        a.volume = prevVol;
      }
    } catch {
      ok = false;
    }
    setNeedsAudioUnlock(!ok);
    return ok;
  }, []);

  const BS_sfx = useCallback(
    (kind) => {
      if (!settings.sfxOn) return;
      try {
        sfxRef.current?.beep?.(kind, settings.sfxVol);
      } catch {}
    },
    [settings.sfxOn, settings.sfxVol]
  );

  // keep castKey valid
  useEffect(() => {
    if (!BS_ASSETS.bunnies[castKey]) setCastKey("standL");
  }, [castKey]);

  // accent
  const accent = BS_ACCENTS[selectedIdx % BS_ACCENTS.length];

  const BS_fmtMMSS = useCallback((sec) => {
    const s = Math.max(0, Math.floor(Number(sec) || 0));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, "0")}`;
  }, []);

  // --- Chart & game state (ref-based) ---
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const startedAtRef = useRef(0);
  const playingRef = useRef(false);
  const effectiveDiffRef = useRef("EASY");

  const chartRef = useRef([]); // notes: {t, lane, kind}
  const nextIdxRef = useRef(0);

  const statsRef = useRef({
    score: 0,
    combo: 0,
    maxCombo: 0,
    perfect: 0,
    good: 0,
    miss: 0,
    total: 0,
  });

  const [hud, setHud] = useState({ score: 0, combo: 0 });
  const [leftSec, setLeftSec] = useState(null);
  const leftTickRef = useRef(0);

  const [judge, setJudge] = useState(null); // 'perfect' | 'good' | 'miss'
  const [judgeBump, setJudgeBump] = useState(0); // re-trigger anim
  const judgeTimerRef = useRef(0);

  // ripples for tactile feel (DOM overlay)
  const [ripples, setRipples] = useState([]);
  const addRipple = (laneIdx) => {
    const id = Math.random().toString(36).slice(2);
    setRipples((r) => [...r, { id, laneIdx, t: Date.now() }]);
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 280);
  };

  const stopLoop = useCallback(() => {
    playingRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  const stopMusic = useCallback(() => {
    try {
      const a = musicRef.current;
      if (a) {
        a.pause();
        a.currentTime = 0;
      }
    } catch {}
  }, []);

  const startPreview = useCallback(async () => {
    const a = musicRef.current;
    if (!a) return;
    try {
      a.loop = true;
      a.currentTime = 0;
      const p = a.play();
      if (p && typeof p.catch === "function") {
        await p.catch(() => {});
      }
    } catch {}
  }, []);

  const setTrack = useCallback(
    async (idx, { preview = true } = {}) => {
      const a = musicRef.current;
      if (!a) return;
      stopMusic();
      setMusicReady(false);
      setMusicDur(0);
      a.src = BS_ASSETS.tracks[idx]?.url || "";
      a.load();
      if (preview) {
        // don't auto-open audio panel; just try play (will be blocked on iOS until unlock)
        await startPreview();
      }
    },
    [startPreview, stopMusic]
  );

  // init audio element once
  useEffect(() => {
    const a = new Audio();
    a.preload = "auto";
    a.volume = BS_clamp(settings.musicVol, 0, 1);
    musicRef.current = a;

    const onCanPlay = () => setMusicReady(true);
    const onMeta = () => {
      const d = Number(a.duration);
      if (isFinite(d)) setMusicDur(d);
    };
    const onEnded = () => {
      // play ended -> finish (avoid stale-closure view)
      if (playingRef.current) finishGame();
    };

    a.addEventListener("canplay", onCanPlay);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnded);

    // load initial track
    setTrack(0, { preview: true });

    return () => {
      try {
        a.pause();
      } catch {}
      a.removeEventListener("canplay", onCanPlay);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnded);
    };
  }, []);

  // whenever selected track changes (only on select), load + preview
  useEffect(() => {
    if (!musicRef.current) return;
    if (view !== "select") return;
    setTrack(selectedIdx, { preview: true });
  }, [selectedIdx, setTrack, view]);

// preview behavior: only auto-preview on select; never stop music on play
  useEffect(() => {
    if (view === "select") {
      startPreview();
    } else if (view === "result") {
      stopMusic();
    }
  }, [view, stopMusic, startPreview]);

  const getDiffParams = useCallback((diff) => {
    const base = {
      EASY: {
        speed: 340, // px/sec (mobile-friendly)
        step: 0.85, // sec (more breathing room)
        pairP: 0.05,
        bonusP: 0.09,
        perfectW: 0.09,
        goodW: 0.16,
      },
      NORMAL: {
        speed: 450,
        step: 0.70,
        pairP: 0.08,
        bonusP: 0.10,
        perfectW: 0.075,
        goodW: 0.135,
      },
      HARD: {
        speed: 570,
        step: 0.58,
        pairP: 0.11,
        bonusP: 0.12,
        perfectW: 0.06,
        goodW: 0.115,
      },
    };
    return base[diff] || base.EASY;
  }, []);

  const buildChart = useCallback(
    (diff, durSec) => {
      const p = getDiffParams(diff);
      const length = BS_clamp(durSec || 60, 35, 120);
      const notes = [];
      let t = 2.2; // intro lead-in
      let lane = 0;
      while (t < length - 1.0) {
        // choose lane
        lane = (lane + (Math.random() < 0.45 ? 1 : 3) + (Math.random() < 0.22 ? 1 : 0)) % 4;
        notes.push({
          t,
          lane,
          kind: Math.random() < p.bonusP ? "bonus" : "arrow",
        });
        // rare pair (not on EASY much)
        if (Math.random() < p.pairP) {
          const lane2 = (lane + 2) % 4;
          notes.push({ t, lane: lane2, kind: "arrow" });
        }
        // slightly varied step
        const wobble = (Math.random() - 0.5) * 0.08;
        t += Math.max(0.28, p.step + wobble);
      }
      notes.sort((a, b) => a.t - b.t);
      return notes;
    },
    [getDiffParams]
  );

  const showJudge = useCallback(
    (k) => {
      setJudge(k);
      setJudgeBump((x) => x + 1);
      if (judgeTimerRef.current) clearTimeout(judgeTimerRef.current);
      judgeTimerRef.current = setTimeout(() => setJudge(null), 240);
    },
    []
  );

  const vibrate = useCallback(
    (ms) => {
      if (!settings.haptics) return;
      try {
        if (navigator.vibrate) navigator.vibrate(ms);
      } catch {}
    },
    [settings.haptics]
  );

  const hitLane = useCallback(
    (laneIdx) => {
      if (!playingRef.current) return;

      const aNow = musicRef.current;
    const now =
      aNow && !aNow.paused && isFinite(aNow.currentTime)
        ? aNow.currentTime
        : (performance.now() - startedAtRef.current) / 1000;

    // HUD: remaining time (throttled; avoid re-render per frame)
    const durHud = (musicDur && isFinite(musicDur) && musicDur > 1) ? musicDur : runDurRef.current;
    const left = Math.max(0, durHud - now);
    const tNow = performance.now();
    if (tNow - leftTickRef.current > 240) {
      leftTickRef.current = tNow;
      setLeftSec(left);
    }
      const diff = effectiveDiffRef.current;
      const p = getDiffParams(diff);

      // find closest note in this lane from nextIdxRef backward a bit
      const notes = chartRef.current;
      const startSearch = Math.max(0, nextIdxRef.current - 6);
      let best = -1;
      let bestDt = 999;

      for (let i = startSearch; i < Math.min(notes.length, nextIdxRef.current + 16); i++) {
        const n = notes[i];
        if (!n || n.hit || n.lane !== laneIdx) continue;
        const dt = n.t - now;
        const adt = Math.abs(dt);
        if (adt < bestDt) {
          bestDt = adt;
          best = i;
        }
      }

      const st = statsRef.current;
      st.total += 1;

      if (best >= 0) {
        const n = notes[best];
        const dt = Math.abs(n.t - now);
        if (dt <= p.perfectW) {
          n.hit = true;
          st.perfect += 1;
          st.combo += 1;
          st.maxCombo = Math.max(st.maxCombo, st.combo);
          st.score += n.kind === "bonus" ? 320 : 200;
          showJudge("perfect");
          BS_sfx(n.kind === "bonus" ? "bonus" : "perfect");
          addRipple(laneIdx);
          vibrate(10);
        } else if (dt <= p.goodW) {
          n.hit = true;
          st.good += 1;
          st.combo += 1;
          st.maxCombo = Math.max(st.maxCombo, st.combo);
          st.score += n.kind === "bonus" ? 220 : 120;
          showJudge("good");
          BS_sfx("good");
          addRipple(laneIdx);
          vibrate(6);
        } else {
          // miss (no note)
          st.miss += 1;
          st.combo = 0;
          showJudge("miss");
          BS_sfx("miss");
          addRipple(laneIdx);
          vibrate(12);
        }
      } else {
        st.miss += 1;
        st.combo = 0;
        showJudge("miss");
        BS_sfx("miss");
        addRipple(laneIdx);
        vibrate(12);
      }

      // update HUD (throttle)
      setHud({ score: st.score, combo: st.combo });

      // advance nextIdxRef
      while (nextIdxRef.current < notes.length && (notes[nextIdxRef.current].hit || notes[nextIdxRef.current].t < now - 0.25)) {
        nextIdxRef.current += 1;
      }
    },
    [BS_sfx, addRipple, getDiffParams, showJudge, vibrate]
  );

  const finishGame = useCallback(() => {
    stopLoop();
    stopMusic();
    playingRef.current = false;
    BS_sfx("result");
    setView("result");
  }, [BS_sfx, stopLoop, stopMusic]);

  const startGame = useCallback(async () => {
    // lock in difficulty for this run
    effectiveDiffRef.current = difficulty;

    // unlock audio on explicit start
    await BS_unlockAudio();
    applyVolumes();

    // stop preview and start music for play
    stopMusic();
    const a = musicRef.current;
    if (!a) return;

    // reset stats
    statsRef.current = { score: 0, combo: 0, maxCombo: 0, perfect: 0, good: 0, miss: 0, total: 0 };
    setHud({ score: 0, combo: 0 });
    setLeftSec(runDurRef.current);
    setJudge(null);

    // build chart using duration (fallback if metadata missing)
    const dur = (musicDur && isFinite(musicDur) && musicDur > 1) ? musicDur : 60;
    runDurRef.current = dur;
    chartRef.current = buildChart(effectiveDiffRef.current, dur);
    nextIdxRef.current = 0;

    // start play
    try {
      a.loop = false;
      a.currentTime = 0;
      const p = a.play();
      if (p && typeof p.catch === "function") await p.catch(() => {});
    } catch {}

    startedAtRef.current = performance.now();
    playingRef.current = true;

    BS_sfx("start");
    setView("play");

    // start RAF
    stopLoop();
    const tick = () => {
      if (!playingRef.current) return;
      renderFrame();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [
    BS_sfx,
    BS_unlockAudio,
    applyVolumes,
    buildChart,
    difficulty,
    musicDur,
    stopLoop,
    stopMusic,
  ]);

  const retry = useCallback(() => {
    BS_sfx("click");
    setView("select");
    setLeftSec(null);
    // will restart preview automatically
  }, [BS_sfx]);

  const backToSelect = useCallback(() => {
    BS_sfx("back");
    setView("select");
    setLeftSec(null);
  }, [BS_sfx]);

  // --- Canvas sizing: base on canvas element rect (fix stretch / touch mismatch) ---
  const resizeCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const w = Math.max(2, Math.floor(rect.width * dpr));
    const h = Math.max(2, Math.floor(rect.height * dpr));
    if (c.width !== w || c.height !== h) {
      c.width = w;
      c.height = h;
    }
  }, []);

  useEffect(() => {
    if (view !== "play") return;
    resizeCanvas();
    let ro;
    try {
      ro = new ResizeObserver(() => resizeCanvas());
      if (canvasRef.current) ro.observe(canvasRef.current);
    } catch {}
    const onWin = () => resizeCanvas();
    window.addEventListener("resize", onWin);
    return () => {
      window.removeEventListener("resize", onWin);
      try {
        ro?.disconnect?.();
      } catch {}
    };
  }, [resizeCanvas, view]);

  const renderFrame = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const w = c.width;
    const h = c.height;

    // background
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, w, h);

    // subtle vertical gradient wash
    const grd = ctx.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, "rgba(255,255,255,0.03)");
    grd.addColorStop(1, "rgba(255,255,255,0.00)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    // lanes geometry
    const laneW = w / 4;
    const hitY = h * 0.82;

    // lane guidance: glowing lines (no boxes)
    const t = (performance.now() * 0.001) % 10;
    for (let i = 0; i < 4; i++) {
      const x = i * laneW + laneW / 2;
      const pulse = 0.35 + 0.15 * Math.sin(t * 2.2 + i);
      ctx.save();
      ctx.strokeStyle = accent.replace("0.55", String(0.22 + pulse * 0.12)).replace("0.50", String(0.22 + pulse * 0.12)).replace("0.45", String(0.20 + pulse * 0.10)).replace("0.40", String(0.18 + pulse * 0.10));
      ctx.lineWidth = 1.2 * dpr;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 10 * dpr * (settings.motion ? 1 : 0.6);
      ctx.beginPath();
      ctx.moveTo(x, h * 0.10);
      ctx.lineTo(x, hitY + 10 * dpr);
      ctx.stroke();
      ctx.restore();
    }

    // hit line (soft glow)
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 1.2 * dpr;
    ctx.shadowColor = accent;
    ctx.shadowBlur = 14 * dpr;
    ctx.beginPath();
    ctx.moveTo(0, hitY);
    ctx.lineTo(w, hitY);
    ctx.stroke();
    ctx.restore();

    // notes
    const aNow = musicRef.current;
    const now =
      aNow && !aNow.paused && isFinite(aNow.currentTime)
        ? aNow.currentTime
        : (performance.now() - startedAtRef.current) / 1000;

    // HUD: remaining time (throttled; avoid re-render per frame)
    const durHud = (musicDur && isFinite(musicDur) && musicDur > 1) ? musicDur : runDurRef.current;
    const left = Math.max(0, durHud - now);
    const tNow = performance.now();
    if (tNow - leftTickRef.current > 240) {
      leftTickRef.current = tNow;
      setLeftSec(left);
    }
    const diff = effectiveDiffRef.current;
    const p = getDiffParams(diff);
    const speed = p.speed * dpr;

    const notes = chartRef.current;
    const noteSize = Math.max(22, Math.min(42, laneW * 0.22)) * dpr;

    const drawContain = (img, cx, cy, box) => {
      if (!img) return;
      const iw = img.naturalWidth || img.width || 1;
      const ih = img.naturalHeight || img.height || 1;
      const s = Math.min(box / iw, box / ih);
      const dw = iw * s;
      const dh = ih * s;
      ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
    };

    for (let i = nextIdxRef.current; i < notes.length; i++) {
      const n = notes[i];
      if (!n || n.hit) continue;
      const dt = n.t - now;
      const y = hitY - dt * speed;
      if (y < -noteSize) continue;
      if (y > h + noteSize) break;

      const cx = n.lane * laneW + laneW / 2;
      ctx.save();
      // soft glow per note
      ctx.shadowColor = accent;
      ctx.shadowBlur = 18 * dpr;
      if (n.kind === "bonus") {
        drawContain(imgMapRef.current[BS_ASSETS.bunnies.button], cx, y, noteSize * 1.15);
      } else {
        const dir = BS_laneArrowByIdx[n.lane];
        drawContain(imgMapRef.current[BS_ASSETS.arrows[dir]], cx, y, noteSize);
      }
      ctx.restore();
    }

    // finish if near end
    const endDur = (musicDur && isFinite(musicDur) && musicDur > 1) ? musicDur : runDurRef.current;
    if (endDur > 0 && now >= endDur - 0.08) {
      finishGame();
    }

    // miss notes behind window
    while (nextIdxRef.current < notes.length && notes[nextIdxRef.current].t < now - 0.22) {
      const n = notes[nextIdxRef.current];
      if (n && !n.hit) {
        // count as miss
        const st = statsRef.current;
        st.miss += 1;
        st.total += 1;
        st.combo = 0;
        setHud({ score: st.score, combo: st.combo });
      }
      nextIdxRef.current += 1;
    }
  }, [accent, finishGame, getDiffParams, musicDur, settings.motion]);

  // cleanup timers
  useEffect(() => {
    return () => {
      try {
        if (judgeTimerRef.current) clearTimeout(judgeTimerRef.current);
      } catch {}
      stopLoop();
      stopMusic();
    };
  }, [stopLoop, stopMusic]);

  // --- UI helpers ---
  const AudioBunnyButton = () => {
    const bunny = imgMapRef.current[BS_ASSETS.bunnies.button];
    return (
      <button
        onClick={async (e) => {
          e.stopPropagation();
          BS_sfx("click");
          await BS_unlockAudio();
          setAudioPanelOpen((v) => !v);
        }}
        className="relative px-3 py-2 rounded-full bg-white/[0.08] border border-white/[0.12] hover:bg-white/[0.10] active:scale-[0.99] select-none"
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 0 24px ${accent}`,
        }}
        aria-label="Audio settings"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-black/30 border border-white/[0.10]">
            {bunny ? (
              <img
                src={BS_ASSETS.bunnies.button}
                alt="audio"
                className="w-full h-full object-contain"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full" />
            )}
          </div>
          <div className="text-white/80 text-[12px] tracking-[0.14em]">AUDIO</div>
        </div>

        {needsAudioUnlock && (
          <div
            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
            style={{
              background: accent,
              boxShadow: `0 0 10px ${accent}`,
            }}
          />
        )}
      </button>
    );
  };

  const AudioPanel = () => {
    if (!audioPanelOpen) return null;
    return (
      <div
        className="fixed z-[60] left-3 right-3 mx-auto top-[calc(env(safe-area-inset-top)+56px)] rounded-3xl bg-black/55 border border-white/[0.14] backdrop-blur-xl overflow-hidden"
        style={{
          width: "min(420px, calc(100vw - 24px))",
          maxHeight: "min(70dvh, 520px)",
          boxShadow: `0 10px 40px rgba(0,0,0,0.55), 0 0 30px ${accent}`,
        }}
      >
        <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.10]">
          <div className="text-white/80 text-[12px] tracking-[0.16em]">AUDIO / PLAY</div>
          <button
            className="px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.10] text-white/70 text-[11px] tracking-[0.14em] hover:bg-white/[0.08]"
            onClick={(e) => {
              e.stopPropagation();
              BS_sfx("click");
              setAudioPanelOpen(false);
            }}
          >
            CLOSE
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto">
          {needsAudioUnlock && (
            <button
              className="w-full px-3 py-2 rounded-2xl bg-white/[0.10] border border-white/[0.16] text-white/85 text-[12px] tracking-[0.14em] hover:bg-white/[0.12]"
              style={{ boxShadow: `0 0 18px ${accent}` }}
              onClick={async (e) => {
                e.stopPropagation();
                BS_sfx("start");
                await BS_unlockAudio();
              }}
            >
              ENABLE AUDIO
            </button>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-white/70 text-[12px] tracking-[0.14em]">SFX</div>
              <button
                className="px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.10] text-white/70 text-[11px] tracking-[0.14em] hover:bg-white/[0.08]"
                onClick={(e) => {
                  e.stopPropagation();
                  BS_sfx("click");
                  setSettingsPatch({ sfxOn: !settings.sfxOn });
                }}
              >
                {settings.sfxOn ? "ON" : "OFF"}
              </button>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(settings.sfxVol * 100)}
              onChange={(e) => {
                const v = Number(e.target.value) / 100;
                setSettingsPatch({ sfxVol: v });
              }}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-white/70 text-[12px] tracking-[0.14em]">MUSIC</div>
              <div className="text-white/40 text-[11px] tracking-[0.14em]">{Math.round(settings.musicVol * 100)}</div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(settings.musicVol * 100)}
              onChange={(e) => {
                const v = Number(e.target.value) / 100;
                setSettingsPatch({ musicVol: v });
              }}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              className="px-3 py-2 rounded-2xl bg-white/[0.06] border border-white/[0.10] text-white/70 text-[12px] tracking-[0.12em] hover:bg-white/[0.08]"
              onClick={(e) => {
                e.stopPropagation();
                BS_sfx("click");
                setSettingsPatch({ haptics: !settings.haptics });
              }}
            >
              HAPTICS {settings.haptics ? "ON" : "OFF"}
            </button>
            <button
              className="px-3 py-2 rounded-2xl bg-white/[0.06] border border-white/[0.10] text-white/70 text-[12px] tracking-[0.12em] hover:bg-white/[0.08]"
              onClick={(e) => {
                e.stopPropagation();
                BS_sfx("click");
                setSettingsPatch({ motion: !settings.motion });
              }}
            >
              MOTION {settings.motion ? "ON" : "OFF"}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-white/70 text-[12px] tracking-[0.14em]">CAST</div>
              <div className="text-white/45 text-[11px] tracking-[0.14em]">brings a buddy</div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {Object.entries(BS_ASSETS.bunnies)
                .filter(([k]) => k !== "button")
                .map(([k, url]) => (
                  <button
                    key={k}
                    onClick={(e) => {
                      e.stopPropagation();
                      BS_sfx("select");
                      setCastKey(k);
                    }}
                    className={`shrink-0 w-11 h-11 rounded-2xl border overflow-hidden bg-black/30 ${
                      castKey === k ? "border-white/[0.35]" : "border-white/[0.12]"
                    }`}
                    style={{
                      boxShadow: castKey === k ? `0 0 18px ${accent}` : "none",
                    }}
                    title={k}
                  >
                    <img src={url} alt={k} className="w-full h-full object-contain" draggable={false} />
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- background bunny (casts changes) ---
  const BgBunny = () => {
    const bgUrl = BS_ASSETS.bunnies[castKey] || BS_ASSETS.bunnies.standL;
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 420px at 35% 20%, rgba(255,255,255,0.06), rgba(0,0,0,0) 60%), radial-gradient(520px 420px at 70% 25%, rgba(255,255,255,0.045), rgba(0,0,0,0) 62%)",
          }}
        />
        <img
          src={bgUrl}
          alt="bg"
          draggable={false}
          className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 opacity-[0.18] blur-[0.1px]"
          style={{
            width: "min(520px, 82vw)",
            filter: `drop-shadow(0 0 26px ${accent})`,
            transform: "translate3d(-50%, -50%, 0)",
          }}
        />
        {/* gentle bloom */}
        <div
          className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "min(540px, 86vw)",
            height: "min(540px, 86vw)",
            background: `radial-gradient(circle at 50% 45%, ${accent}, rgba(0,0,0,0) 62%)`,
            opacity: settings.motion ? 0.16 : 0.12,
            filter: "blur(18px)",
          }}
        />
      </div>
    );
  };

  // --- UI: track carousel centering (no scrollIntoView) ---
  const carouselRef = useRef(null);
  const centerCard = useCallback((idx) => {
    const el = carouselRef.current;
    if (!el) return;
    const child = el.querySelector(`[data-track-idx="${idx}"]`);
    if (!child) return;
    const elRect = el.getBoundingClientRect();
    const cRect = child.getBoundingClientRect();
    const delta = (cRect.left + cRect.width / 2) - (elRect.left + elRect.width / 2);
    el.scrollTo({ left: el.scrollLeft + delta, behavior: "smooth" });
  }, []);

  // --- render ---
  const selectedTrack = BS_ASSETS.tracks[selectedIdx] || BS_ASSETS.tracks[0];
  const coverKey = BS_COVERS[selectedIdx % BS_COVERS.length];
  const coverUrl = BS_ASSETS.bunnies[coverKey];

  const diffChip = (k) => {
    const active = difficulty === k;
    return (
      <button
        key={k}
        disabled={difficultyLocked}
        onClick={(e) => {
          e.stopPropagation();
          if (difficultyLocked) return;
          BS_sfx("select");
          setDifficulty(k);
        }}
        className={`px-2.5 py-1.5 rounded-full text-[12px] tracking-[0.12em] border ${
          active ? "bg-white/[0.12] border-white/[0.22] text-white/90" : "bg-white/[0.05] border-white/[0.10] text-white/65"
        } ${difficultyLocked ? "opacity-40 pointer-events-none" : "hover:bg-white/[0.08]"}`}
        style={active ? { boxShadow: `0 0 18px ${accent}` } : undefined}
      >
        {k}
      </button>
    );
  };

  const safeBottom = "calc(env(safe-area-inset-bottom) + 92px)"; // avoid OS Dock overlap

  return (
    <div
      ref={rootRef}
      className="relative w-full h-full flex flex-col overflow-hidden rounded-3xl"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02) 28%, rgba(0,0,0,0.00) 100%)",
      }}
      onPointerDown={() => {
        // any user gesture can unlock audio; don't force panel open
        BS_unlockAudio();
      }}
    >
      <BgBunny />

      {/* header */}
      <div className="relative z-[20] px-4 pt-4 pb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-white/80 text-[12px] tracking-[0.18em]">OS BUNNY / SAFARI</div>
          <div className="mt-1 flex items-center gap-2">
            <div className="text-white/92 text-[18px] font-semibold tracking-[0.06em]">BEAT SYNC</div>
            <div
              className="h-[1px] w-10"
              style={{
                background: `linear-gradient(90deg, rgba(255,255,255,0.00), ${accent}, rgba(255,255,255,0.00))`,
              }}
            />
          </div>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {["EASY", "NORMAL", "HARD"].map(diffChip)}
            {difficultyLocked && (
              <div className="text-white/35 text-[11px] tracking-[0.14em] ml-1">LOCKED</div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <AudioBunnyButton />
          {view !== "select" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                BS_sfx("back");
                stopLoop();
                stopMusic();
                setView("select");
              }}
              className="px-3 py-2 rounded-full bg-white/[0.06] border border-white/[0.10] text-white/70 text-[12px] tracking-[0.14em] hover:bg-white/[0.08]"
            >
              BACK
            </button>
          )}
        </div>
      </div>

      <AudioPanel />

      {/* main */}
      <div className="relative z-[10] flex-1 min-h-0 overflow-y-auto px-4 pb-4" style={{ paddingBottom: safeBottom }}>
        {view === "select" && (
          <div className="flex flex-col gap-4">
            {/* carousel */}
            <div
              ref={carouselRef}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2"
              style={{
                scrollPaddingLeft: 16,
                scrollPaddingRight: 16,
                WebkitOverflowScrolling: "touch",
              }}
              onPointerDownCapture={(e) => {
                // prevent parent drag/scroll fights
                e.stopPropagation();
              }}
            >
              {BS_ASSETS.tracks.map((t, idx) => {
                const isSel = idx === selectedIdx;
                const ck = BS_COVERS[idx % BS_COVERS.length];
                const cu = BS_ASSETS.bunnies[ck];
                return (
                  <button
                    key={t.url}
                    data-track-idx={idx}
                    className={`snap-center shrink-0 w-[min(260px,78vw)] rounded-3xl border overflow-hidden text-left transition-[transform,filter,background] duration-200 active:scale-[0.995] ${
                      isSel ? "bg-white/[0.10] border-white/[0.22]" : "bg-white/[0.035] border-white/[0.10]"
                    }`}
                    style={{
                      boxShadow: isSel
                        ? `0 0 0 1px rgba(255,255,255,0.10) inset, 0 24px 60px rgba(0,0,0,0.55), 0 0 18px ${accent}`
                        : "0 20px 50px rgba(0,0,0,0.40)",
                      filter: isSel ? "brightness(1.08)" : "brightness(0.98)",
                    }}
                    onClick={async (e) => {
                      e.stopPropagation();
                      BS_sfx("select");
                      setSelectedIdx(idx);
                      centerCard(idx);
                      // preview will auto switch on effect
                    }}
                  >
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-black/30 border border-white/[0.10]">
                        <img src={cu} alt="" className="w-full h-full object-contain" draggable={false} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-white/90 text-[14px] tracking-[0.06em] truncate">{t.title}</div>
                      </div>
                    </div>
                    <div
                      className="h-[1px] w-full"
                      style={{
                        background: `linear-gradient(90deg, rgba(255,255,255,0.00), ${accent}, rgba(255,255,255,0.00))`,
                        opacity: isSel ? 1 : 0.4,
                      }}
                    />
                    <div className="px-4 py-3 text-white/45 text-[11px] tracking-[0.14em] flex items-center justify-between">
                      <span>{isSel ? "SELECTED" : " "}</span>
                      <span>{difficulty}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* start */}
            <div className="sticky" style={{ bottom: "calc(env(safe-area-inset-bottom) + 14px)" }}>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  await startGame();
                }}
                className="w-full px-4 py-4 rounded-3xl bg-white/[0.10] border border-white/[0.18] text-white/90 font-semibold tracking-[0.16em] hover:bg-white/[0.12] active:scale-[0.995]"
                style={{
                  boxShadow: `0 0 30px ${accent}`,
                }}
              >
                START
              </button>
            </div>
          </div>
        )}

        {view === "play" && (
          <div className="flex flex-col gap-4">
            {/* play HUD */}
            <div className="px-4 py-3 rounded-3xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-white/80 text-[12px] tracking-[0.16em] truncate">{selectedTrack.title}</div>
                <div className="text-white/45 text-[11px] tracking-[0.14em] mt-0.5">
                  {effectiveDiffRef.current} · SCORE {hud.score} · COMBO {hud.combo} · LEFT {leftSec == null ? "--:--" : BS_fmtMMSS(leftSec)}
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-black/30 border border-white/[0.12] shrink-0">
                <img src={BS_ASSETS.bunnies[castKey]} alt="cast" className="w-full h-full object-contain" draggable={false} />
              </div>
            </div>

            {/* stage */}
            <div className="relative rounded-3xl bg-white/[0.04] border border-white/[0.10] overflow-hidden" style={{ height: "min(56dvh, 520px)" }}>
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
              {/* judge overlay (always visible; avoid canvas-load timing issues) */}
              {judge && (
                <div
                  key={`${judge}-${judgeBump}`}
                  className="absolute left-1/2 top-[18%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    animation: settings.motion ? "bsPop 240ms ease-out both" : "none",
                    filter: `drop-shadow(0 0 22px ${accent})`,
                  }}
                >
                  <img
                    src={BS_ASSETS.judge[judge]}
                    alt={judge}
                    className="w-[min(220px,62vw)] h-auto"
                    draggable={false}
                  />
                </div>
              )}

              {/* subtle ripple sheen overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: settings.motion
                    ? `radial-gradient(600px 220px at 50% 14%, ${accent}, rgba(0,0,0,0) 60%)`
                    : "none",
                  opacity: 0.08,
                  filter: "blur(16px)",
                }}
              />
            </div>

            {/* pads */}
            <div
              className="relative sticky bottom-[calc(env(safe-area-inset-bottom)+12px)] rounded-3xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl overflow-hidden"
              style={{
                paddingBottom: "calc(env(safe-area-inset-bottom) + 10px)",
              }}
            >
              {/* lane glow guides (no box) */}
              <div className="absolute inset-0 pointer-events-none opacity-70">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0"
                    style={{
                      left: `${(i * 25) + 12.5}%`,
                      width: "1px",
                      background: `linear-gradient(180deg, rgba(255,255,255,0.00), ${accent}, rgba(255,255,255,0.00))`,
                      boxShadow: `0 0 18px ${accent}`,
                      transform: "translateX(-0.5px)",
                      opacity: 0.55,
                    }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-4 gap-0 px-3 py-3">
                {[0, 1, 2, 3].map((i) => {
                  const dir = BS_laneArrowByIdx[i];
                  return (
                    <button
                      key={i}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        hitLane(i);
                      }}
                      className="relative h-20 select-none overflow-hidden active:scale-[0.99]"
                      style={{
                        touchAction: "manipulation",
                      }}
                      aria-label={`lane-${i}`}
>
                      {/* hit guide (no box) */}
                      <div
                        className="absolute left-0 right-0"
                        style={{
                          top: "52%",
                          height: "1px",
                          background: `linear-gradient(90deg, rgba(255,255,255,0.00), ${accent}, rgba(255,255,255,0.00))`,
                          boxShadow: `0 0 16px ${accent}`,
                          opacity: 0.85,
                        }}
                      />
                      {/* icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={BS_ASSETS.arrows[dir]}
                          alt={dir}
                          className="w-8 h-8 object-contain opacity-90"
                          draggable={false}
                        />
                      </div>

                      {/* tactile ripple */}
                      {ripples
                        .filter((r) => r.laneIdx === i)
                        .map((r) => (
                          <div
                            key={r.id}
                            className="absolute inset-0"
                            style={{
                              background: `radial-gradient(circle at 50% 50%, ${accent}, rgba(0,0,0,0) 60%)`,
                              opacity: 0.35,
                              filter: "blur(10px)",
                              animation: settings.motion ? "bsRipple 280ms ease-out both" : "none",
                            }}
                          />
                        ))}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {view === "result" && (
          <div className="flex flex-col gap-4">
            {(() => {
              const st = statsRef.current;
              const acc = st.total ? (st.perfect + st.good * 0.6) / st.total : 0;
              const pose =
                acc > 0.88 ? "yayR" : acc > 0.72 ? "standR" : st.miss > st.good + st.perfect ? "dizzy" : "flop";
              return (
                <>
                  <div className="px-4 py-4 rounded-3xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-white/70 text-[12px] tracking-[0.16em]">RESULT</div>
                        <div className="mt-1 text-white/92 text-[20px] font-semibold tracking-[0.06em]">
                          {selectedTrack.title}
                        </div>
                        <div className="text-white/45 text-[12px] tracking-[0.14em] mt-1">
                          ACC {BS_fmtPct(acc)} · MAX COMBO {st.maxCombo}
                        </div>
                      </div>
                      <div className="w-16 h-16 rounded-3xl overflow-hidden bg-black/30 border border-white/[0.12] shrink-0">
                        <img
                          src={BS_ASSETS.bunnies[pose]}
                          alt="pose"
                          className="w-full h-full object-contain"
                          draggable={false}
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/[0.05] border border-white/[0.10] p-3">
                        <div className="text-white/45 text-[11px] tracking-[0.16em]">SCORE</div>
                        <div className="mt-1 text-white/90 text-[18px] font-semibold tracking-[0.06em]">
                          {st.score}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-white/[0.05] border border-white/[0.10] p-3">
                        <div className="text-white/45 text-[11px] tracking-[0.16em]">BREAKDOWN</div>
                        <div className="mt-1 text-white/70 text-[12px] tracking-[0.10em] leading-relaxed">
                          PERFECT {st.perfect} / GOOD {st.good} / MISS {st.miss}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        retry();
                      }}
                      className="px-4 py-4 rounded-3xl bg-white/[0.08] border border-white/[0.16] text-white/85 font-semibold tracking-[0.16em] hover:bg-white/[0.10]"
                      style={{ boxShadow: `0 0 22px ${accent}` }}
                    >
                      RETRY
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        backToSelect();
                      }}
                      className="px-4 py-4 rounded-3xl bg-white/[0.05] border border-white/[0.10] text-white/70 font-semibold tracking-[0.16em] hover:bg-white/[0.08]"
                    >
                      BACK
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* local keyframes (scoped) */}
      <style>{`
        @keyframes bsPop {
          0% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.0; }
          35% { opacity: 1.0; }
          100% { transform: translate(-50%, -50%) scale(1.0); opacity: 0.0; }
        }
        @keyframes bsRipple {
          0% { transform: scale(0.92); opacity: 0.0; }
          35% { opacity: 0.42; }
          100% { transform: scale(1.08); opacity: 0.0; }
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
