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

  const BS_fmtTime = (sec) => {
    if (!Number.isFinite(sec)) return "—:—";
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, "0")}`;
  };

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
  const preloadPromiseRef = useRef(Promise.resolve());
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    const urls = [
      ...Object.values(BS_ASSETS.judge),
      ...Object.values(BS_ASSETS.arrows),
      ...Object.values(BS_ASSETS.bunnies),
    ];
    const { promise, cancel } = BS_preloadImages(urls);
    preloadPromiseRef.current = promise;
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
    // HTMLAudio warm-up (avoid disrupting currently-playing BGM)
    try {
      const a = musicRef.current;
      // Only warm-up if the element is paused; never touch a playing track.
      if (a && a.paused) {
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

  // --- Chart & game state (ref-based) ---
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const fallbackTimerRef = useRef(0); // backup timer for iOS Safari when rAF stalls
  const lastFrameMsRef = useRef(0);
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
  const [timeLeft, setTimeLeft] = useState(0); // seconds remaining (HUD)
  const lastTimeLeftUpdateRef = useRef(0);
  const lastHudCommitRef = useRef(0);
  const hudDirtyRef = useRef(false);
  const commitHud = useCallback((force = false) => {
    const t = performance.now();
    if (!force && t - lastHudCommitRef.current < 80) return;
    lastHudCommitRef.current = t;
    const st = statsRef.current;
    setHud({ score: st.score, combo: st.combo });
    hudDirtyRef.current = false;
  }, []);

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
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = 0;
    }
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
      if (playingRef.current) return; // don't interrupt active gameplay
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
    a.crossOrigin = "anonymous";
    a.volume = BS_clamp(settings.musicVol, 0, 1);
    musicRef.current = a;

    const onCanPlay = () => setMusicReady(true);
    const onMeta = () => {
      const d = Number(a.duration);
      if (isFinite(d)) setMusicDur(d);
    };
    const onEnded = () => {
      // Keep the run length consistent (90s): if a track ends mid-play, try to restart it
      // instead of finishing early. (Timeline uses performance.now for gameplay.)
      if (!playingRef.current) return;
      try {
        a.currentTime = 0;
        const p = a.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch {}
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

  // whenever selected track changes, load + preview
  useEffect(() => {
    if (!musicRef.current) return;
    setTrack(selectedIdx, { preview: view === "select" });
  }, [selectedIdx, setTrack]);

  // ensure preview stops when leaving select
  useEffect(() => {
    if (view === "select") {
      startPreview();
      return;
    }
    // Do NOT stop music when entering play; keep BGM running.
    if (view === "result") stopMusic();
  }, [view, stopMusic, startPreview]);

  const getDiffParams = useCallback((diff) => {
    const base = {
      EASY: {
        speed: 360, // px/sec (slower fall)
        step: 0.95, // sec (more space)
        pairP: 0.0,
        bonusP: 0.07,
        perfectW: 0.11,
        goodW: 0.22,
      },
      NORMAL: {
        speed: 520,
        step: 0.62,
        pairP: 0.08,
        bonusP: 0.10,
        perfectW: 0.075,
        goodW: 0.14,
      },
      HARD: {
        speed: 650,
        step: 0.50,
        pairP: 0.14,
        bonusP: 0.12,
        perfectW: 0.06,
        goodW: 0.11,
      },
    };
    return base[diff] || base.EASY;
  }, []);

  const buildChart = useCallback(
    (diff, durSec) => {
      const p = getDiffParams(diff);
      const length = BS_clamp(durSec || BS_SESSION_SEC, 35, 300);
      const notes = [];
      let t = 1.9; // lead-in
      let lane = Math.floor(Math.random() * 4);

      while (t < length - 0.8) {
        // lane choice (EASY = predictable, HARD = jumpy)
        const r = Math.random();
        if (diff === "EASY") {
          if (r < 0.62) lane = lane;
          else if (r < 0.86) lane = (lane + 1) % 4;
          else lane = (lane + 3) % 4;
        } else if (diff === "NORMAL") {
          if (r < 0.34) lane = lane;
          else if (r < 0.67) lane = (lane + 1) % 4;
          else if (r < 0.92) lane = (lane + 3) % 4;
          else lane = (lane + 2) % 4;
        } else {
          // HARD
          if (r < 0.28) lane = (lane + 1) % 4;
          else if (r < 0.56) lane = (lane + 3) % 4;
          else lane = (lane + 2) % 4;
        }

        notes.push({
          t,
          lane,
          kind: Math.random() < p.bonusP ? "bonus" : "arrow",
        });

        // pairs (disabled on EASY; restrained on NORMAL)
        if (diff !== "EASY" && Math.random() < p.pairP) {
          const lane2 = diff === "NORMAL" ? (lane + (Math.random() < 0.5 ? 1 : 3)) % 4 : (lane + 2) % 4;
          notes.push({ t, lane: lane2, kind: "arrow" });
        }

        // step / spacing
        const wobble = (Math.random() - 0.5) * (diff === "EASY" ? 0.04 : 0.08);
        let step = p.step + wobble;
        if (diff === "EASY" && Math.random() < 0.22) step += 0.35; // breathe
        if (diff === "NORMAL" && Math.random() < 0.14) step += 0.18;
        if (diff === "HARD" && Math.random() < 0.10) step = Math.max(0.26, step - 0.10);
        t += Math.max(diff === "EASY" ? 0.46 : diff === "NORMAL" ? 0.30 : 0.24, step);
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
      judgeTimerRef.current = setTimeout(() => setJudge(null), 320);
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

      const now = (performance.now() - startedAtRef.current) / 1000;
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

      // update HUD (throttled to avoid Safari flicker)
      hudDirtyRef.current = true;
      commitHud(true);

      // advance nextIdxRef
      while (nextIdxRef.current < notes.length && (notes[nextIdxRef.current].hit || notes[nextIdxRef.current].t < now - 0.25)) {
        nextIdxRef.current += 1;
      }
    },
    [BS_sfx, addRipple, commitHud, getDiffParams, showJudge, vibrate]
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

    // unlock audio on explicit start (do not await; keep within user gesture)
    BS_unlockAudio();
    applyVolumes();

    // stop any previous RAF loop before starting a new run
    stopLoop();

    // stop preview and start music for play
    stopMusic();
    const a = musicRef.current;
    if (!a) return;

    // reset stats / HUD
    statsRef.current = { score: 0, combo: 0, maxCombo: 0, perfect: 0, good: 0, miss: 0, total: 0 };
    setHud({ score: 0, combo: 0 });
    setTimeLeft(BS_SESSION_SEC);
    lastTimeLeftUpdateRef.current = 0;
    lastHudCommitRef.current = 0;
    hudDirtyRef.current = false;
    setJudge(null);

    // build chart for a fixed run length so notes never stop mid-run (mobile-first)
    const durForChart = BS_SESSION_SEC + 1.2;
    chartRef.current = buildChart(effectiveDiffRef.current, durForChart);
    nextIdxRef.current = 0;

    // start play
    try {
      a.loop = false;
      a.currentTime = 0;
      const p = a.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } catch {}

    startedAtRef.current = performance.now();
    playingRef.current = true;

    BS_sfx("start");
    setView("play");

    // start RAF
    const tick = () => {
      if (!playingRef.current) return;
      renderFrame();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // rAF fallback (iOS Safari can stall rAF under UI/scroll pressure)
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = 0;
    }
    lastFrameMsRef.current = 0;
    fallbackTimerRef.current = window.setInterval(() => {
      if (!playingRef.current) return;
      const t = performance.now();
      if (!lastFrameMsRef.current || t - lastFrameMsRef.current > 140) {
        renderFrame();
      }
    }, 120);
  }, [BS_sfx, BS_unlockAudio, applyVolumes, buildChart, difficulty, renderFrame, stopLoop, stopMusic]);

  const retry = useCallback(() => {
    BS_sfx("click");
    setView("select");
    // will restart preview automatically
  }, [BS_sfx]);

  const backToSelect = useCallback(() => {
    BS_sfx("back");
    setView("select");
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

    // Mobile first: prevent page scroll / bounce during play so taps always register.
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyTouchAction = document.body.style.touchAction;
    const prevHtmlOverscroll = document.documentElement.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.overscrollBehavior = "none";

    resizeCanvas();
    let ro;
    try {
      ro = new ResizeObserver(() => resizeCanvas());
      if (canvasRef.current) ro.observe(canvasRef.current);
    } catch {}
    const onWin = () => resizeCanvas();
    window.addEventListener("resize", onWin);
    return () => {
      // restore scroll settings
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.touchAction = prevBodyTouchAction;
      document.documentElement.style.overscrollBehavior = prevHtmlOverscroll;

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
    lastFrameMsRef.current = performance.now();

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

    // OS Bunny glass micro-waves (very light, non-gameplay)
    if (settings.motion) {
      const tt = performance.now() * 0.001;
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 1 * dpr;
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      const baseY = h * 0.18;
      const amp = 5.5 * dpr;
      for (let k = 0; k < 3; k++) {
        const y0 = baseY + k * h * 0.09;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 12 * dpr) {
          const y =
            y0 +
            Math.sin(x / (120 * dpr) + tt * (1.15 + k * 0.12) + k) *
              amp *
              (0.72 - k * 0.16);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    // lanes geometry
    const laneW = w / 4;
    const padArea = Math.min(h * 0.30, 220 * dpr);
    const hitY = Math.max(h * 0.56, h - padArea - 28 * dpr);

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
    // timeline (gameplay uses performance clock — stable on iOS, independent of audio metadata)
    const now = Math.max(0, (performance.now() - startedAtRef.current) / 1000);
    const notes = chartRef.current;

    const durTotal = BS_SESSION_SEC;
    // update time-left at ~8fps (avoid rerender each frame)
    const tNow = performance.now();
    if (tNow - lastTimeLeftUpdateRef.current > 120) {
      lastTimeLeftUpdateRef.current = tNow;
      setTimeLeft(Math.max(0, durTotal - now));
    }
    const diff = effectiveDiffRef.current;
    const p = getDiffParams(diff);
    const speed = p.speed * dpr;

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

    // finish (fixed run length)
    if (now >= durTotal - 0.01) {
      finishGame();
      return;
    }

    // miss notes behind window (use difficulty window to avoid "random" misses on EASY)
    const missAfter = p.goodW + 0.08;
    let missedAny = false;
    while (nextIdxRef.current < notes.length && notes[nextIdxRef.current].t < now - missAfter) {
      const n = notes[nextIdxRef.current];
      if (n && !n.hit) {
        const st = statsRef.current;
        st.miss += 1;
        st.total += 1;
        st.combo = 0;
        missedAny = true;
      }
      nextIdxRef.current += 1;
    }
    if (missedAny) {
      hudDirtyRef.current = true;
    }
    if (hudDirtyRef.current) commitHud(false);
  }, [accent, commitHud, finishGame, getDiffParams, settings.motion]);

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
        onClick={(e) => {
          e.stopPropagation();
          BS_sfx("click");
          // Unlock audio without touching currently-playing BGM
          BS_unlockAudio();
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
        className="fixed z-[60] rounded-3xl bg-white/[0.06] border border-white/[0.14] backdrop-blur-xl overflow-hidden"
        style={{
          top: `calc(56px + env(safe-area-inset-top, 0px))`,
          right: `max(12px, env(safe-area-inset-right, 0px))`,
          width: `min(420px, calc(100vw - 24px - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)))`,
          maxHeight: `min(calc(100dvh - 92px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px)), 560px)`,
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

        <div className="p-4 space-y-4 overflow-y-auto" style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))" }}>
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
              className="bsRange w-full"
              style={{ "--bsAccent": accent, "--bsFill": `${Math.round(settings.sfxVol * 100)}%` }}
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
              className="bsRange w-full"
              style={{ "--bsAccent": accent, "--bsFill": `${Math.round(settings.musicVol * 100)}%` }}
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
              {" "}
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

          <div className="text-white/40 text-[11px] leading-relaxed">
            {" "}
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

  const safeBottom = "calc(env(safe-area-inset-bottom) + 112px)"; // avoid OS Dock overlap

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
      <div
        className={`relative z-[10] flex-1 min-h-0 px-4 ${view === "play" ? "overflow-hidden pb-0" : "overflow-y-auto pb-4"}`}
        style={{ paddingBottom: view === "play" ? 0 : safeBottom }}
      >
        {view === "select" && (
          <div className="flex flex-col gap-4">
            {/* music bar */}
            <div
              className="px-4 py-3 rounded-3xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl"
              style={{ boxShadow: `0 0 22px rgba(0,0,0,0.25), 0 0 16px ${accent}` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl overflow-hidden bg-black/30 border border-white/[0.12] shrink-0">
                  <img src={coverUrl} alt="cover" className="w-full h-full object-contain" draggable={false} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-white/85 text-[13px] tracking-[0.06em] truncate">
                    {selectedTrack.title}
                  </div>
                  <div className="text-white/45 text-[11px] tracking-[0.14em] mt-0.5 truncate">
                    {musicReady ? "PREVIEW" : "LOADING…"} · {imagesReady ? "UI READY" : "ASSETS…"}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    BS_sfx("click");
                    setAudioPanelOpen(true);
                  }}
                  className="px-3 py-2 rounded-2xl bg-white/[0.06] border border-white/[0.10] text-white/70 text-[12px] tracking-[0.14em] hover:bg-white/[0.08]"
                >
                  SETTINGS
                </button>
              </div>
            </div>

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
                    className={`snap-center shrink-0 w-[min(260px,78vw)] rounded-3xl bg-white/[0.05] border ${
                      isSel ? "border-white/[0.26]" : "border-white/[0.12]"
                    } overflow-hidden text-left active:scale-[0.995]`}
                    style={{
                      boxShadow: isSel ? `0 0 24px ${accent}` : "none",
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
                        <div className="text-white/40 text-[11px] tracking-[0.14em] mt-1 truncate">
                          {' '}
                        </div>
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
              <div className="text-white/35 text-[11px] tracking-[0.12em] mt-2 text-center">
                {" "}
              </div>
            </div>
          </div>
        )}

        {view === "play" && (
          <div className="flex flex-col gap-3 min-h-0 flex-1">
            {/* play HUD */}
            <div className="px-4 py-3 rounded-3xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-white/80 text-[12px] tracking-[0.16em] truncate">{selectedTrack.title}</div>
                <div className="text-white/45 text-[11px] tracking-[0.14em] mt-0.5">
                  {effectiveDiffRef.current} · SCORE {hud.score} · COMBO {hud.combo} · LEFT {BS_fmtTime(timeLeft)}
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-black/30 border border-white/[0.12] shrink-0">
                <img src={BS_ASSETS.bunnies[castKey]} alt="cast" className="w-full h-full object-contain" draggable={false} />
              </div>
            </div>

            {/* stage */}
            <div className="relative flex-1 min-h-0 rounded-3xl bg-white/[0.04] border border-white/[0.10] overflow-hidden bsStage">
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bsCanvas" />

              {/* subtle OS wash (GPU-friendly; can be disabled) */}
              {settings.motion && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    opacity: 0.16,
                    background:
                      "radial-gradient(120% 70% at 30% 20%, rgba(190,235,255,0.55) 0%, rgba(0,0,0,0) 55%), radial-gradient(120% 80% at 70% 85%, rgba(190,200,255,0.28) 0%, rgba(0,0,0,0) 58%)",
                    transform: "translateZ(0)",
                  }}
                />
              )}

              {/* judge overlay (always visible; avoid canvas-load timing issues) */}
              {judge && (
                <div
                  key={`${judge}-${judgeBump}`}
                  className="absolute left-1/2 top-[22%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    filter: "drop-shadow(0 18px 34px rgba(0,0,0,0.42))",
                  }}
                >
                  <div
                    className="px-4 py-2 rounded-2xl border border-white/[0.12] bg-black/35 backdrop-blur-xl"
                    style={{
                      animation: "bsPop 220ms ease-out",
                    }}
                  >
                    <div className="text-[11px] tracking-[0.32em] text-white/55">JUDGE</div>
                    <div className="text-[28px] font-semibold text-white/92 leading-none">{judge}</div>
                  </div>
                </div>
              )}

              {/* pads (absolute — no scroll, no phantom bottom space) */}
              <div
                className="absolute left-0 right-0 bottom-0 pointer-events-none"
                style={{ paddingBottom: safeBottom + 10 }}
              >
                <div className="mx-3 mb-3 rounded-3xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.38)] pointer-events-auto">
                  <div className="grid grid-cols-4 gap-2 p-2">
                    {PAD_LANES.map((lane) => {
                      const isDown = activePadsRef.current.has(lane);
                      return (
                        <button
                          key={lane}
                          onPointerDown={(e) => {
                            e.preventDefault();
                            try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
                            onPadDown(lane);
                          }}
                          onPointerUp={(e) => {
                            e.preventDefault();
                            try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
                            onPadUp(lane);
                          }}
                          onPointerCancel={(e) => {
                            e.preventDefault();
                            try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
                            onPadUp(lane);
                          }}
                          className="relative h-[64px] rounded-2xl border border-white/[0.12] bg-black/35 overflow-hidden select-none"
                          style={{
                            touchAction: "none",
                            transform: isDown ? "translateY(1px)" : "translateY(0)",
                            boxShadow: isDown
                              ? "inset 0 0 0 1px rgba(255,255,255,0.10), 0 10px 30px rgba(0,0,0,0.35)"
                              : "inset 0 0 0 1px rgba(255,255,255,0.06), 0 18px 50px rgba(0,0,0,0.38)",
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
                                  background:
                                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.38), rgba(255,255,255,0) 68%)",
                                  animation: "bsRipple 520ms ease-out forwards",
                                }}
                              />
                            ))}

                          <div className="absolute inset-0 pointer-events-none" style={{
                            background:
                              isDown ? accent.bloom : "radial-gradient(140% 120% at 50% 20%, rgba(255,255,255,0.10), rgba(0,0,0,0) 60%)",
                            opacity: isDown ? 0.72 : 0.42,
                          }} />

                          <div className="absolute inset-x-0 bottom-0 h-[2px]" style={{
                            background: accent.glow,
                            opacity: isDown ? 0.72 : 0.34,
                          }} />

                          <div className="relative h-full flex items-center justify-center">
                            <div className="text-white/80 text-[18px] font-semibold" style={{
                              textShadow: "0 10px 26px rgba(0,0,0,0.45)",
                            }}>
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

        {view === "result" && (
          <div className="flex flex-col gap-4">
            {(() => {
              const st = statsRef.current;
              const acc = st.total ? (st.perfect + st.good * 0.6) / st.total : 0;
              const accPct = Math.round(acc * 1000) / 10;
              const rank =
                acc >= 0.95 ? "S" : acc >= 0.9 ? "A" : acc >= 0.82 ? "B" : acc >= 0.7 ? "C" : "D";
              const poseKey =
                rank === "S" ? "yayR" : rank === "A" ? "standR" : st.miss > st.good + st.perfect ? "dizzy" : "flop";
              const pose = BS_ASSETS[poseKey] || BS_ASSETS.standR;
              return (
                <>
              <div className="rounded-3xl bg-white/[0.05] border border-white/[0.12] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-white/55 text-[11px] tracking-[0.36em]">RESULT</div>
                    <div className="mt-1 text-white/92 text-[18px] font-semibold truncate">{selectedTrack.title}</div>
                    <div className="mt-1 text-white/55 text-[12px]">
                      {effectiveDiffRef.current} · ACC {accPct.toFixed(1)}% · MAX {st.maxCombo}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="px-3 py-2 rounded-2xl bg-white/[0.06] border border-white/[0.12]">
                      <div className="text-white/45 text-[10px] tracking-[0.34em]">FINAL</div>
                      <div className="text-white/92 text-[22px] font-semibold leading-none">{rank}</div>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-black/30 border border-white/[0.12] overflow-hidden">
                      <img src={pose} alt="pose" className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-black/30 border border-white/[0.10] p-3">
                    <div className="text-white/50 text-[11px] tracking-[0.28em]">SCORE</div>
                    <div className="mt-1 text-white/92 text-[22px] font-semibold">{st.score.toLocaleString()}</div>
                  </div>
                  <div className="rounded-2xl bg-black/30 border border-white/[0.10] p-3">
                    <div className="text-white/50 text-[11px] tracking-[0.28em]">MAX COMBO</div>
                    <div className="mt-1 text-white/92 text-[22px] font-semibold">{st.maxCombo}</div>
                  </div>
                  <div className="col-span-2 rounded-2xl bg-black/30 border border-white/[0.10] p-3">
                    <div className="text-white/50 text-[11px] tracking-[0.28em]">ACCURACY</div>
                    <div className="mt-1 flex items-end justify-between gap-2">
                      <div className="text-white/92 text-[22px] font-semibold">{accPct.toFixed(1)}%</div>
                      <div className="text-white/45 text-[12px]">({st.perfect}P / {st.good}G / {st.miss}M)</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="rounded-2xl bg-black/30 border border-white/[0.10] p-3">
                    <div className="text-white/50 text-[11px] tracking-[0.26em]">PERFECT</div>
                    <div className="mt-1 text-white/92 text-[20px] font-semibold">{st.perfect}</div>
                  </div>
                  <div className="rounded-2xl bg-black/30 border border-white/[0.10] p-3">
                    <div className="text-white/50 text-[11px] tracking-[0.26em]">GOOD</div>
                    <div className="mt-1 text-white/92 text-[20px] font-semibold">{st.good}</div>
                  </div>
                  <div className="rounded-2xl bg-black/30 border border-white/[0.10] p-3">
                    <div className="text-white/50 text-[11px] tracking-[0.26em]">MISS</div>
                    <div className="mt-1 text-white/92 text-[20px] font-semibold">{st.miss}</div>
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
