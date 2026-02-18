import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  Wifi, Image as ImageIcon, Music, Settings, X, Rabbit,
  Waves, Sun, Power, Moon, RotateCcw,
  Flower, Sparkles, StickyNote as MemoIcon, Zap,
  Brush, Folder, Play, Pause, SkipForward, SkipBack,
  Fingerprint, Sliders
} from "lucide-react";

/**
 * ---------------------------------------------------------------------------
 * [1] 定数 & 設定
 * ---------------------------------------------------------------------------
 */

const WALLPAPERS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop"
];

const THEMES = {
  cyan: { hex: "#00d4ff", sumi: "#004455" },
  pink: { hex: "#ff7da8", sumi: "#552233" },
  green: { hex: "#85ffb0", sumi: "#224433" },
  purple: { hex: "#c48dff", sumi: "#332244" },
  cyber: { hex: "#00f2ff", sumi: "#000000", isCyber: true },
};

const RIPPLE_MODES = [
  { id: 'ink', icon: Waves, name: "Ink" },
  { id: 'sumi', icon: Brush, name: "Sumi" },
  { id: 'sparkle', icon: Zap, name: "Sparkle" },
  { id: 'bloomy', icon: Sun, name: "Bloomy" },
];

const PLAYLIST = [
  { url: "https://files.catbox.moe/roxy4t.mp3", title: "LOVE_SIGNALS", artist: "Signal Youth" },
  { url: "https://files.catbox.moe/e2tm1o.mp3", title: "MATCH_AWASE", artist: "Platform Diary" },
  { url: "https://files.catbox.moe/yuqvwh.mp3", title: "IDLE_MODE", artist: "Idle Protocol" },
];

const ASSETS = {
  rabbitIcon: "https://files.catbox.moe/zmwzx5.png",
  cyberRabbit: "https://files.catbox.moe/az2x41.png",
  musicRabbit: "https://files.catbox.moe/4a8bhu.png",
};

/**
 * ---------------------------------------------------------------------------
 * [2] コンポーネント定義
 * ---------------------------------------------------------------------------
 */

const Window = ({ isActive, onClose, onFocus, title, icon: Icon, hex, children }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (!isActive) return null;
  return (
    <div 
      onMouseDown={onFocus}
      className={`fixed flex flex-col overflow-hidden transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) bg-black/70 backdrop-blur-[80px] border border-white/10 shadow-2xl z-[500] 
      ${isMobile ? 'inset-4 bottom-28 rounded-[2.5rem]' : 'w-[800px] h-[580px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[3rem]'}`}>
      <div className="h-14 flex items-center justify-between px-10 bg-white/5 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          {Icon && <Icon size={14} style={{ color: hex }} strokeWidth={1.5} />}
          <div className="text-[10px] uppercase font-mono tracking-[0.4em] opacity-40">{title}</div>
        </div>
        <button onClick={onClose} className="w-4 h-4 rounded-full bg-rose-500/40 hover:bg-rose-500 transition-all focus:outline-none" />
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">{children}</div>
    </div>
  );
};

const StickyNote = ({ id, initialX, initialY, initialText, color, onRemove }) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [text, setText] = useState(initialText);
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const handleStart = (e) => { setIsDragging(true); offset.current = { x: (e.touches ? e.touches[0].clientX : e.clientX) - pos.x, y: (e.touches ? e.touches[0].clientY : e.clientY) - pos.y }; };

  useEffect(() => {
    if (!isDragging) return;
    const move = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setPos({ x: clientX - offset.current.x, y: clientY - offset.current.y });
    };
    const stop = () => setIsDragging(false);
    window.addEventListener('mousemove', move); window.addEventListener('mouseup', stop);
    window.addEventListener('touchmove', move); window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', move); window.removeEventListener('touchend', stop);
    };
  }, [isDragging]);

  return (
    <div className={`fixed p-6 w-52 h-52 ${color} backdrop-blur-xl border border-white/20 shadow-2xl select-none transition-transform ${isDragging ? 'z-[600] scale-105' : 'z-[100] rotate-1 hover:rotate-0'}`} style={{ left: pos.x, top: pos.y, touchAction: 'none' }}>
      <button onClick={onRemove} className="absolute top-2 right-2 opacity-20 hover:opacity-100 p-1 z-20 text-black focus:outline-none"><X size={16}/></button>
      <div onMouseDown={handleStart} onTouchStart={handleStart} className="flex items-center gap-2 mb-3 opacity-30 cursor-move text-black">
        <MemoIcon size={12}/><span className="text-[9px] font-mono italic font-bold">note</span>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()} className="w-full h-full bg-transparent border-none outline-none resize-none text-[13px] font-sans text-black/90 scrollbar-hide" placeholder="..." />
    </div>
  );
};

const CarrotBattery = ({ themeColor, onClick }) => {
  const currentHex = THEMES[themeColor]?.hex || "#00d4ff";
  return (
    <button onClick={onClick} className="relative flex items-center gap-1.5 translate-y-[1px] group active:scale-90 transition-transform focus:outline-none">
      <div className="relative w-9 h-5">
        <svg viewBox="0 0 40 20" className="w-full h-full overflow-visible">
          <path d="M38,10 C38,10 35,3 10,5 C5,10 5,10 10,15 C35,17 38,10 38,10 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path d="M36,10 C36,10 33,5 12,6.5 C9,10 9,10 12,13.5 C33,15 36,10 36,10 Z" fill={currentHex} className="transition-colors duration-1000" style={{ clipPath: 'inset(0 15% 0 0)' }} />
          <path d="M8,8 C6,3 2,4 4,9 C1,10 2,14 7,12" fill="#4ade80" stroke="#22c55e" strokeWidth="0.5" />
          <path d="M20,7 L20,13 M28,8 L28,12" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </div>
      <span className="text-[10px] font-mono opacity-30 tracking-tighter group-hover:opacity-60 transition-opacity">85%</span>
    </button>
  );
};

const ShootingStar = ({ delay }) => (
  <div className="absolute pointer-events-none animate-os-comet" 
    style={{ top: `${Math.random()*40}%`, left: `${Math.random()*80}%`, animationDelay: `${delay}s`, transform: `rotate(35deg)` }}>
    <div className="relative flex items-center justify-end">
      <div className="w-[300px] h-[0.5px] bg-gradient-to-l from-white/60 via-transparent to-transparent" />
      <div className="absolute right-0 w-1 h-1 bg-white rounded-full shadow-[0_0_15px_white]" />
    </div>
  </div>
);

const DreamingOverlay = ({ active, time }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 z-[5000] bg-black flex flex-col items-center justify-center pointer-events-none animate-os-fade-in overflow-hidden">
      <div className="absolute inset-0 bg-[#02020a]" />
      <div className="absolute inset-0 opacity-40 animate-os-nebula" 
        style={{ background: `radial-gradient(circle at 40% 40%, rgba(0, 242, 255, 0.08), transparent 60%), radial-gradient(circle at 60% 60%, rgba(255, 0, 225, 0.08), transparent 60%)` }} />
      {[...Array(50)].map((_, i) => (
          <div key={i} className="absolute rounded-full animate-os-twinkle" 
            style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, width: 1.2, height: 1.2, background: 'white', boxShadow: `0 0 8px white`, animationDelay: `${Math.random()*5}s` }} />
      ))}
      <ShootingStar delay={0.5} />
      <ShootingStar delay={7.5} />
      <div className="relative text-center animate-os-scale">
        <div className="text-[60px] sm:text-[90px] font-thin tracking-[-0.05em] text-white/70 font-mono">
          {time.getHours().toString().padStart(2, '0')}
          <span className="opacity-10 animate-pulse mx-4">:</span>
          {time.getMinutes().toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

/**
 * ---------------------------------------------------------------------------
 * [3] 視覚エンジン & 物理
 * ---------------------------------------------------------------------------
 */

const VisualEngine = ({ themeColor, rippleMode, stardustMode, isSakura }) => {
  const canvasRef = useRef(null);
  const data = useRef({ effects: [], paws: [], stardust: [], hearts: [], mouse: { x: 0, y: 0, lastX: 0 }, strokeDist: 0, isHolding: false });

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let frameId;

    const resize = () => {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      if (data.current.stardust.length === 0) {
        for(let i=0; i<150; i++) data.current.stardust.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random()-0.5) * 0.3, vy: (Math.random()-0.5) * 0.3, size: Math.random() * 1.5 + 0.3, phase: Math.random() * Math.PI * 2, phaseSpeed: 0.005 + Math.random() * 0.01, rotation: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.05 });
      }
    };
    window.addEventListener('resize', resize); resize();

    const handlePointerDown = (e) => {
      if (!e.target || !e.target.closest || e.target.closest('button') || e.target.closest('textarea') || e.target.closest('.z-ui-layer')) return;
      const x = e.clientX; const y = e.clientY;
      data.current.mouse = { x, y, lastX: x }; data.current.isHolding = true;

      const theme = THEMES[themeColor] || THEMES.cyan;
      if (rippleMode === 'bloomy') {
        for(let i=0; i<8; i++) data.current.effects.push({ x, y, vx: Math.cos(i) * 5, vy: Math.sin(i) * 5, r: Math.random() * 7 + 2, a: 1.0, mode: 'bloomy', color: theme.hex, decay: 0.02 });
      } else if (rippleMode === 'sumi') {
        data.current.effects.push({ x, y, r: 0, maxR: 150, a: 0.9, mode: 'sumi', color: theme.sumi, decay: 0.005, layers: Array.from({length: 3}, (_, i) => ({ ox: (Math.random()-0.5)*15, oy: (Math.random()-0.5)*15, rMult: 0.5 + i * 0.25, blur: 6 + i * 6 })) });
      } else if (rippleMode === 'sparkle') {
        for(let i=0; i<8; i++) data.current.effects.push({ x, y, vx: (Math.random()-0.5)*11, vy: (Math.random()-0.5)*11, r: Math.random()*3 + 1, a: 1.0, mode: 'sparkle', color: '#FFFFFF', decay: 0.04 });
      } else {
        const inkColor = themeColor === 'cyber' ? '#111111' : theme.hex;
        data.current.effects.push({ x, y, r: 0, maxR: 120, a: 0.8, mode: 'ink', color: inkColor, decay: 0.004 });
      }
      if (Math.random() > 0.5) data.current.paws.push({ x, y, a: 1.0, size: 25 + Math.random() * 15 });
    };

    const handlePointerMove = (e) => {
      const dx = Math.abs(e.clientX - data.current.mouse.lastX);
      data.current.strokeDist += dx;
      if (data.current.strokeDist > 140) {
        data.current.hearts.push({ x: e.clientX, y: e.clientY, vx: (Math.random()-0.5)*2, vy: -1.5, a: 1.0, size: 8 + Math.random()*10 });
        data.current.strokeDist = 0;
      }
      data.current.mouse = { x: e.clientX, y: e.clientY, lastX: e.clientX };
    };

    const handlePointerUp = () => { data.current.isHolding = false; };
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      data.current.effects.forEach(eff => {
        ctx.save();
        if (eff.mode === 'bloomy' || eff.mode === 'sparkle') {
          eff.x += eff.vx; eff.y += eff.vy; eff.vx *= 0.96; eff.vy *= 0.96; eff.a -= eff.decay;
          ctx.fillStyle = eff.color + Math.floor(Math.max(0, eff.a) * 255).toString(16).padStart(2, '0');
          ctx.beginPath(); ctx.arc(eff.x, eff.y, eff.r, 0, Math.PI * 2); ctx.fill();
        } else if (eff.mode === 'sumi') {
          eff.r += (eff.maxR - eff.r) * 0.015; eff.a -= eff.decay;
          eff.layers.forEach((l) => { ctx.beginPath(); ctx.filter = `blur(${l.blur}px)`; ctx.fillStyle = eff.color + Math.floor(Math.max(0, eff.a) * 160).toString(16).padStart(2, '0'); ctx.arc(eff.x + l.ox, eff.y + l.oy, eff.r * l.rMult, 0, Math.PI * 2); ctx.fill(); });
        } else {
          eff.r += (eff.maxR - eff.r) * 0.015; eff.a -= eff.decay;
          const grad = ctx.createRadialGradient(eff.x, eff.y, 0, eff.x, eff.y, eff.r);
          const op = Math.floor(Math.max(0, eff.a) * 255).toString(16).padStart(2, '0');
          grad.addColorStop(0, eff.color + op); grad.addColorStop(0.7, eff.color + '00');
          ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(eff.x, eff.y, eff.r, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      });
      data.current.effects = data.current.effects.filter(e => e.a > 0);
      data.current.hearts.forEach(h => { h.x += h.vx; h.y += h.vy; h.a -= 0.012; ctx.save(); ctx.globalAlpha = Math.max(0, h.a * 0.5); ctx.fillStyle = '#ffb3c1'; ctx.font = `${h.size}px serif`; ctx.textAlign = 'center'; ctx.fillText('❤', h.x, h.y); ctx.restore(); });
      data.current.hearts = data.current.hearts.filter(h => h.a > 0);
      data.current.paws.forEach(p => { p.a -= 0.005; ctx.save(); ctx.globalAlpha = Math.max(0, p.a); ctx.fillStyle = '#FFFFFF'; ctx.font = `${p.size}px serif`; ctx.textAlign = 'center'; ctx.fillText('🐾', p.x, p.y); ctx.restore(); });
      data.current.paws = data.current.paws.filter(p => p.a > 0);
      data.current.stardust.forEach(s => {
        if (stardustMode && data.current.isHolding) { const dx = data.current.mouse.x - s.x; const dy = data.current.mouse.y - s.y; const dist = Math.sqrt(dx*dx + dy*dy) || 1; s.vx += dx / dist * 0.55; s.vy += dy / dist * 0.55; s.vx *= 0.92; s.vy *= 0.92; }
        else { s.phase += s.phaseSpeed; s.vx += Math.sin(s.phase) * 0.02; s.vy += Math.cos(s.phase * 0.8) * 0.02; s.vx *= 0.985; s.vy *= 0.985; s.rotation += s.rotSpeed; }
        s.x += s.vx; s.y += s.vy;
        if (isSakura) { ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.rotation); ctx.fillStyle = 'rgba(255, 183, 197, 0.8)'; ctx.beginPath(); ctx.moveTo(0,0); ctx.bezierCurveTo(-s.size*5, -s.size*7, s.size*5, -s.size*7, 0,0); ctx.fill(); ctx.restore(); }
        else { ctx.fillStyle = themeColor === 'cyber' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(255, 255, 255, 0.2)'; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill(); }
        if (s.x < -40) s.x = canvas.width + 40; else if (s.x > canvas.width + 40) s.x = -40;
        if (s.y < -40) s.y = canvas.height + 40; else if (s.y > canvas.height + 40) s.y = -40;
      });
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(frameId); window.removeEventListener('resize', resize); window.removeEventListener('pointerdown', handlePointerDown); window.removeEventListener('pointerup', handlePointerUp); window.removeEventListener('pointermove', handlePointerMove); };
  }, [themeColor, rippleMode, stardustMode, isSakura]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[50]" />;
};

const RabbitFollower = ({ isCyber }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState([]);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  useEffect(() => {
    const move = (e) => { const x = e.touches ? e.touches[0].clientX : e.clientX; const y = e.touches ? e.touches[0].clientY : e.clientY; target.current = { x, y }; };
    window.addEventListener("mousemove", move); window.addEventListener("touchmove", move, { passive: true });
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      setPos({ x: current.current.x, y: current.current.y });
      if (Math.random() > 0.8) { const id = Math.random(); const color = isCyber ? "#00f2ff" : "#ffffff"; setParticles(p => [...p.slice(-10), { id, x: current.current.x, y: current.current.y, color }]); setTimeout(() => setParticles(p => p.filter(x => x.id !== id)), 800); }
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("touchmove", move); cancelAnimationFrame(raf); };
  }, [isCyber]);
  return (
    <>
      {particles.map(p => <div key={p.id} className="fixed pointer-events-none z-[9998] animate-os-stardust" style={{ left: p.x, top: p.y, background: p.color, boxShadow: `0 0 10px ${p.color}` }} />)}
      <div className="fixed pointer-events-none z-[9999]" style={{ transform: `translate(${pos.x - 18}px, ${pos.y - 18}px)` }}>
        <img src={isCyber ? ASSETS.cyberRabbit : ASSETS.rabbitIcon} className="w-9 h-9 filter drop-shadow-[0_0_15px_rgba(168,234,255,0.4)] animate-os-rabbit-vibe" />
      </div>
    </>
  );
};

/**
 * ---------------------------------------------------------------------------
 * [4] メインデスクトップ
 * ---------------------------------------------------------------------------
 */

const Desktop = ({ bgm }) => {
  const [theme, setTheme] = useState("cyan");
  const [rippleMode, setRippleMode] = useState("ink");
  const [stardustMode, setStardustMode] = useState(false);
  const [isSakura, setIsSakura] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [openApps, setOpenApps] = useState([]);
  const [activeApp, setActiveApp] = useState(null);
  const [userName, setUserName] = useState("NONE");
  const [isRenaming, setIsRenaming] = useState(false);
  const [tempName, setTempName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [memos, setMemos] = useState([{ id: 1, initialX: 50, initialY: 350, initialText: "にんじん3本", color: "bg-yellow-200/30" }]);
  const [time, setTime] = useState(new Date());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDreaming, setIsDreaming] = useState(false);
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const dreamTimer = useRef();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isCyber = theme === 'cyber';

  const resetDreamTimer = useCallback(() => { setIsDreaming(false); clearTimeout(dreamTimer.current); dreamTimer.current = setTimeout(() => setIsDreaming(true), 60000); }, []);

  useEffect(() => {
    ["mousemove", "keydown", "touchstart", "mousedown"].forEach(e => window.addEventListener(e, resetDreamTimer));
    resetDreamTimer();
    const itv = setInterval(() => setTime(new Date()), 1000);
    const getTimeGreeting = () => { const h = new Date().getHours(); if (h >= 5 && h < 11) return "起きた"; if (h >= 11 && h < 18) return "おかえり！"; if (h >= 18 && h < 22) return "おつかれさま"; return "まったり〜"; };
    setTimeout(() => addNotify(getTimeGreeting()), 1200);
    return () => { ["mousemove", "keydown", "touchstart", "mousedown"].forEach(e => window.removeEventListener(e, resetDreamTimer)); clearInterval(itv); };
  }, [resetDreamTimer]);

  const addNotify = (msg) => { const id = Date.now(); setNotifications(p => [...p, { id, msg }]); setTimeout(() => setNotifications(p => p.filter(n => n.id !== id)), 3000); };
  const toggleApp = (id) => { if (openApps.includes(id)) { if (activeApp === id) setActiveApp(null); else setActiveApp(id); } else { setOpenApps([...openApps, id]); setActiveApp(id); } };

  if (isOff) return <div className="fixed inset-0 bg-black flex items-center justify-center text-white/10 font-mono text-[10px] tracking-[1em] uppercase animate-pulse">Disconnected</div>;

  return (
    <div className={`h-[100dvh] w-full relative flex flex-col bg-black overflow-hidden font-sans select-none transition-all duration-1000 ${isRestarting ? 'opacity-0 scale-95 blur-xl' : 'opacity-100 scale-100 blur-0'}`}>
      <VisualEngine themeColor={theme} rippleMode={rippleMode} stardustMode={stardustMode} isSakura={isSakura} />
      <RabbitFollower isCyber={isCyber} />
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105" style={{ backgroundImage: `url(${WALLPAPERS[bgIndex]})`, filter: `brightness(${isCyber ? 0.35 : 0.5}) saturate(1.2) blur(${openApps.length > 0 ? '12px' : '0px'})` }} />
      <DreamingOverlay active={isDreaming} time={time} />

      {/* 通知 */}
      <div className="fixed top-8 left-0 right-0 z-[6000] flex flex-col items-center gap-3 pointer-events-none px-6">
        {notifications.map(n => (
          <div key={n.id} className="flex items-center gap-4 px-6 py-3 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl animate-os-fade-in text-white pointer-events-auto">
            <Rabbit size={16} className="opacity-50" />
            <div className="text-[12px] font-light tracking-widest">{n.msg}</div>
          </div>
        ))}
      </div>

      {memos.map(m => <StickyNote key={m.id} id={m.id} initialX={m.initialX} initialY={m.initialY} initialText={m.initialText} color={m.color} onRemove={() => setMemos(p => p.filter(note => note.id !== m.id))} />)}

      <div className="flex flex-col h-full relative z-[100]">
        <div className="h-12 w-full px-8 flex items-center justify-between bg-black/10 backdrop-blur-3xl border-b border-white/5 shrink-0">
          <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.4em] opacity-40">
             <Rabbit size={14} />
             <span className="hidden sm:inline">OS_USAGI : UNIFIED</span>
          </div>
          <div className="flex gap-6 items-center">
            <Wifi size={14} className="opacity-30" />
            <CarrotBattery themeColor={theme} onClick={() => addNotify("にんじんだよ🥕")} />
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden">
          <div className={`absolute transition-all duration-1000 ${isMobile ? "top-8 left-6" : "top-10 left-12"} ${openApps.length > 0 ? 'opacity-10 scale-90' : 'opacity-100'}`}>
            <div className="text-4xl font-extralight tracking-tighter text-white/50 bg-black/10 backdrop-blur-xl px-5 py-1.5 rounded-2xl border border-white/5 shadow-2xl">
               {time.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="mt-4 ml-2 text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">ID: {userName}</div>
          </div>

          <Window isActive={activeApp === 'music'} onClose={() => toggleApp('music')} onFocus={() => setActiveApp('music')} title="SONIC" icon={Music} hex="#ff7da8">
             <div className="h-full flex flex-col items-center justify-center relative">
                {bgm.isPlaying && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-[60%] aspect-square rounded-full border-[0.5px] border-cyan-400 animate-os-pulse" /><div className="w-[85%] aspect-square rounded-full border-[0.5px] border-pink-400 animate-os-pulse-slow [animation-delay:0.2s]" /></div>}
                <div className={`relative w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-white/10 p-1 shadow-2xl transition-all duration-1000 ${bgm.isPlaying ? 'scale-100' : 'scale-90 opacity-40'}`}>
                   <img src={ASSETS.musicRabbit} className={`w-full h-full rounded-full grayscale brightness-125 object-cover ${bgm.isPlaying ? 'animate-os-spin' : ''}`} />
                </div>
                <div className="mt-10 text-center space-y-1">
                  <div className="text-lg font-light tracking-widest text-white/90 uppercase truncate w-64">{bgm.currentSong?.title}</div>
                  <div className="text-[10px] font-mono text-white/30 uppercase">{bgm.currentSong?.artist}</div>
                </div>
                <div className="flex items-center gap-10 mt-12 py-4 px-8 bg-white/5 rounded-full border border-white/5">
                   <button onClick={bgm.prev} className="text-white/20 hover:text-white"><SkipBack size={20} /></button>
                   <button onClick={bgm.toggle} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5">{bgm.isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}</button>
                   <button onClick={bgm.next} className="text-white/20 hover:text-white"><SkipForward size={20} /></button>
                </div>
             </div>
          </Window>

          <Window isActive={activeApp === 'config'} onClose={() => toggleApp('config')} onFocus={() => setActiveApp('config')} title="IDENTITY" icon={Fingerprint} hex="#c48dff">
             <div className="h-full flex flex-col items-center justify-center space-y-10 text-center">
                <div className="opacity-30 text-[10px] tracking-[0.5em] uppercase italic">Authorize_Profile</div>
                <button onClick={() => setIsRenaming(true)} className="w-28 h-28 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all hover:bg-white/10 active:scale-90 group"><Fingerprint size={40} className="text-white/40 group-hover:text-white transition-all" strokeWidth={0.5} /></button>
                <div className="text-xl font-thin tracking-[0.3em] text-white/80 uppercase">NAME : {userName}</div>
             </div>
          </Window>

          <Window isActive={activeApp === 'files'} onClose={() => toggleApp('files')} onFocus={() => setActiveApp('files')} title="ARCHIVE" icon={Folder} hex="#85ffb0">
            <div className="grid grid-cols-2 gap-4"> {["USER_LOG", "CORE_DUMP", "NEBULA", "MEMO"].map(f => <div key={f} className="aspect-square bg-white/5 border border-white/5 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-white/10 cursor-pointer"><Folder size={24} className="text-white/20" strokeWidth={1} /><span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">{f}</span></div>)} </div>
          </Window>
        </div>

        <div className="h-24 w-full flex items-center justify-center shrink-0 z-[600] pb-6">
          <div className="flex items-center gap-3 px-5 py-2.5 bg-black/20 backdrop-blur-[100px] border border-white/10 rounded-full shadow-2xl">
            {[{ id: 'music', icon: Music }, { id: 'files', icon: Folder }, { id: 'config', icon: Settings }].map(app => (
              <button key={app.id} onClick={() => toggleApp(app.id)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all relative group ${activeApp === app.id ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}><app.icon size={20} strokeWidth={1.2} />{openApps.includes(app.id) && <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />}</button>
            ))}
            <div className="w-[1px] h-6 bg-white/10 mx-1" />
            <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isSettingsOpen ? 'bg-white/10 text-white' : 'text-white/30'}`}><Sliders size={20} /></button>
            <button onClick={() => setIsPowerMenuOpen(true)} className="w-12 h-12 rounded-full flex items-center justify-center text-rose-500/40 hover:text-rose-500 transition-all"><Power size={20} /></button>
          </div>
        </div>
      </div>

      {/* 設定パネル (スクロール対応) */}
      <div className={`fixed right-6 top-[15%] bottom-[20%] w-16 z-[2000] flex flex-col gap-5 p-3 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full transition-all duration-700 overflow-y-auto scrollbar-hide ${isSettingsOpen ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0 pointer-events-none'}`}>
         <div className="flex flex-col gap-4 py-2"> {Object.keys(THEMES).map(k => <button key={k} onClick={() => { setTheme(k); addNotify(`${k.toUpperCase()}_MODE`); }} className={`w-5 h-5 rounded-full mx-auto transition-all ${theme === k ? 'scale-150 ring-4 ring-white/10' : 'opacity-20 hover:opacity-100'}`} style={{ background: THEMES[k].hex }} />)} </div>
         <div className="h-[1.5px] bg-white/10 shrink-0" />
         <div className="flex flex-col gap-4 py-2"> {RIPPLE_MODES.map(m => <button key={m.id} onClick={() => { setRippleMode(m.id); addNotify(`RIPPLE: ${m.name}`); }} className={`p-2 rounded-full mx-auto transition-all ${rippleMode === m.id ? 'bg-white/15 text-white' : 'text-white/20 hover:text-white/40'}`}><m.icon size={20} strokeWidth={1} /></button>)} </div>
         <div className="h-[1.5px] bg-white/10 shrink-0" />
         <button onClick={() => { setIsSakura(!isSakura); addNotify(isSakura ? "散った" : "咲いた"); }} className={`p-2 rounded-full mx-auto transition-all ${isSakura ? 'bg-pink-500/20 text-pink-400' : 'text-white/20'}`}><Flower size={20} /></button>
         <button onClick={() => { setStardustMode(!stardustMode); addNotify(stardustMode ? "Vacuum: OFF" : "Vacuum: ON"); }} className={`p-2 rounded-full mx-auto transition-all ${stardustMode ? 'bg-white/20 text-white' : 'text-white/20'}`}><Sparkles size={20} /></button>
         <div className="h-[1.5px] bg-white/10 shrink-0" />
         <button onClick={() => { setBgIndex((bgIndex + 1) % WALLPAPERS.length); addNotify("ころもがえ"); }} className="p-2 rounded-full mx-auto text-white/20 hover:text-white/60"><ImageIcon size={20} /></button>
         <button onClick={() => { setMemos(p => [...p, { id: Date.now(), initialX: 80, initialY: 300, initialText: "", color: "bg-cyan-200/30" }]); addNotify("Note added"); }} className="p-2 rounded-full mx-auto text-white/20 hover:text-white/60"><MemoIcon size={20} /></button>
      </div>

      {/* ID変更モーダル */}
      {isRenaming && (
        <div className="fixed inset-0 z-[7000] bg-black/70 backdrop-blur-xl flex items-center justify-center p-8 animate-os-fade-in">
           <div className="w-full max-w-xs bg-black/60 border border-white/10 p-10 rounded-[3rem] text-center shadow-2xl">
              <input autoFocus placeholder="New ID..." className="w-full bg-transparent border-b border-white/10 py-4 text-white text-2xl font-thin tracking-widest text-center focus:outline-none uppercase" value={tempName} onChange={e => setTempName(e.target.value)} onKeyDown={e => { if(e.key === 'Enter') { setUserName(tempName.toUpperCase() || "NONE"); setIsRenaming(false); AudioEngine.playTink(); } }} />
              <button onClick={() => { setUserName(tempName.toUpperCase() || "NONE"); setIsRenaming(false); AudioEngine.playTink(); }} className="mt-8 px-8 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono tracking-widest text-white/50 hover:text-white uppercase transition-all">Sync</button>
           </div>
        </div>
      )}

      {/* 電源メニュー */}
      {isPowerMenuOpen && (
        <div className="fixed inset-0 z-[8000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6 animate-os-fade-in">
           <div className="flex flex-col items-center gap-16">
              <Rabbit size={60} className="text-white/10 animate-os-rabbit-vibe" />
              <div className="flex gap-20">
                 <button onClick={() => { setIsRestarting(true); setTimeout(()=>window.location.reload(), 2000); }} className="flex flex-col items-center gap-4 text-white/30 hover:text-white transition-all group">
                    <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 shadow-2xl"><RotateCcw size={32} strokeWidth={1} /></div>
                    <span className="text-[10px] font-mono tracking-widest uppercase">Restart</span>
                 </button>
                 <button onClick={() => { setIsOff(true); }} className="flex flex-col items-center gap-4 text-rose-500/30 hover:text-rose-500 transition-all group">
                    <div className="w-20 h-20 rounded-full border border-rose-500/10 flex items-center justify-center group-hover:bg-rose-500/10 shadow-2xl"><Moon size={32} strokeWidth={1} /></div>
                    <span className="text-[10px] font-mono tracking-widest uppercase">Sleep</span>
                 </button>
              </div>
              <button onClick={() => setIsPowerMenuOpen(false)} className="text-[10px] font-mono tracking-widest text-white/20 hover:text-white underline underline-offset-8 transition-all">Cancel</button>
           </div>
        </div>
      )}

      <style>{`
        @keyframes os-fade-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes os-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes os-rabbit-vibe { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes os-stardust { 0% { transform: scale(2.5); opacity: 1; } 100% { transform: scale(0); opacity: 0; } }
        @keyframes os-pulse { 0% { transform: scale(0.9); opacity: 0.8; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes os-pulse-slow { 0% { transform: scale(0.9); opacity: 0.4; } 100% { transform: scale(2.4); opacity: 0; } }
        @keyframes os-nebula { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.3); opacity: 0.5; } }
        @keyframes os-comet { 0% { transform: translateX(0) translateY(0) rotate(35deg); opacity: 0; } 10% { opacity: 1; } 40% { transform: translateX(1200px) translateY(800px) rotate(35deg); opacity: 0; } 100% { opacity: 0; } }
        @keyframes os-twinkle { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
        @keyframes os-scale { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-os-fade-in { animation: os-fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-os-spin { animation: os-spin 35s linear infinite; }
        .animate-os-rabbit-vibe { animation: os-rabbit-vibe 4s ease-in-out infinite; }
        .animate-os-stardust { animation: os-stardust 1s forwards; width: 3px; height: 3px; border-radius: 50%; filter: blur(1px); }
        .animate-os-pulse { animation: os-pulse 1.5s cubic-bezier(0,0,0.2,1) infinite; }
        .animate-os-pulse-slow { animation: os-pulse-slow 4s cubic-bezier(0,0,0.2,1) infinite; }
        .animate-os-nebula { animation: os-nebula 20s ease-in-out infinite; }
        .animate-os-comet { animation: os-comet 10s linear infinite; }
        .animate-os-twinkle { animation: os-twinkle 4s ease-in-out infinite; }
        .animate-os-scale { animation: os-scale 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

/**
 * ---------------------------------------------------------------------------
 * [5] オーディオ プロバイダー
 * ---------------------------------------------------------------------------
 */

const AudioBGMProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);
  useEffect(() => {
    const audio = new Audio(PLAYLIST[0].url);
    audio.loop = true; audio.volume = 0.3; audio.crossOrigin = "anonymous";
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);
  const toggle = async () => { if (!audioRef.current) return; if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); } else { try { await audioRef.current.play(); setIsPlaying(true); } catch(e) { setIsPlaying(false); } } };
  const next = async () => { const n = (currentIndex + 1) % PLAYLIST.length; setCurrentIndex(n); audioRef.current.src = PLAYLIST[n].url; if (isPlaying) await audioRef.current.play(); };
  const prev = async () => { const p = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length; setCurrentIndex(p); audioRef.current.src = PLAYLIST[p].url; if (isPlaying) await audioRef.current.play(); };
  return children({ isPlaying, currentSong: PLAYLIST[currentIndex], toggle, next, prev });
};

const AudioEngine = {
  ctx: null,
  init() { try { if (!this.ctx && typeof window !== 'undefined') { const AC = window.AudioContext || window.webkitAudioContext; if (AC) this.ctx = new AC(); } } catch(e) {} return this.ctx; },
  playTink() { const ctx = this.init(); if (!ctx) return; try { const t = ctx.currentTime; const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'sine'; osc.frequency.setValueAtTime(2400, t); osc.frequency.exponentialRampToValueAtTime(1200, t + 0.1); gain.gain.setValueAtTime(0.01, t); gain.gain.linearRampToValueAtTime(0, t + 0.1); osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(t + 0.1); } catch(e) {} }
};

export default function App() { return <AudioBGMProvider>{(bgm) => <Desktop bgm={bgm} />}</AudioBGMProvider>; }
