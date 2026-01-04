import React, {
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

const BeatSyncApp = () => {
  const rootRef = useRef(null);

  const BS_fmtTime = (sec) => {
    const s = Math.max(0, Math.floor(sec || 0));
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
  const stageRef = useRef(null);
  const rafRef = useRef(0);
  const renderFrameRef = useRef(null);
  const startedAtRef = useRef(0);
  const playingRef = useRef(false);
  const effectiveDiffRef = useRef("EASY");
  const internalClockRef = useRef({ started: false, mode: "internal", internalBaseMs: 0, internalOffsetSec: 0, lastAudioSec: NaN, lastAudioCheckMs: 0, audioStallMs: 0, lastNowSec: 0 });

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

  // --- Time source (audio.currentTime w/ iOS-safe fallback to internal clock) ---
  const resetClock = useCallback((startAtSec = 0) => {
    const nowMs = performance.now();
    internalClockRef.current = {
      started: true,
      mode: "audio",
      internalBaseMs: nowMs,
      internalOffsetSec: startAtSec,
      lastAudioSec: NaN,
      lastAudioCheckMs: nowMs,
      audioStallMs: 0,
      lastNowSec: startAtSec,
    };
  }, []);

  const getNowSec = useCallback(() => {
    const nowMs = performance.now();
    const c = internalClockRef.current;
    if (!c.started) {
      internalClockRef.current = {
        started: true,
        mode: "internal",
        internalBaseMs: nowMs,
        internalOffsetSec: 0,
        lastAudioSec: NaN,
        lastAudioCheckMs: nowMs,
        audioStallMs: 0,
        lastNowSec: 0,
      };
      return 0;
    }

    const a = musicRef.current;
    const internalSec = (nowMs - c.internalBaseMs) / 1000 + c.internalOffsetSec;

    let audioSec = NaN;
    let audioUsable = false;
    if (a) {
      audioSec = Number(a.currentTime);
      const audioFinite = Number.isFinite(audioSec) && audioSec >= 0;
      if (audioFinite) {
        const prevMs = c.lastAudioCheckMs || nowMs;
        const dtMs = nowMs - prevMs;
        if (dtMs > 0) {
          const prevA = Number.isFinite(c.lastAudioSec) ? c.lastAudioSec : audioSec;
          const dtA = audioSec - prevA;
          // consider "stalled" if currentTime barely changes for a while (common on iOS)
          if (!a.paused && !a.ended && dtA > 0.006) c.audioStallMs = 0;
          else c.audioStallMs = Math.min(2000, (c.audioStallMs || 0) + dtMs);
          c.lastAudioSec = audioSec;
          c.lastAudioCheckMs = nowMs;
        }
        audioUsable = !a.paused && !a.ended && c.audioStallMs < 420;
      } else {
        c.audioStallMs = Math.min(2000, (c.audioStallMs || 0) + 120);
      }
    }

    if (audioUsable && Number.isFinite(audioSec)) {
      c.mode = "audio";
      c.lastNowSec = audioSec;
      return audioSec;
    }

    // fallback to internal clock (always advances) — keep continuity when switching
    if (c.mode !== "internal") {
      c.mode = "internal";
      c.internalBaseMs = nowMs;
      c.internalOffsetSec = c.lastNowSec;
    }
    const out = (nowMs - c.internalBaseMs) / 1000 + c.internalOffsetSec;
    c.lastNowSec = out;
    return out;
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
    a.crossOrigin = "anonymous";
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

  // whenever selected track changes, load + preview
  useEffect(() => {
    if (!musicRef.current) return;
    setTrack(selectedIdx, { preview: view === "select" });
  }, [selectedIdx, setTrack, view]);

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
        speed: 440, // px/sec
        step: 0.65, // sec
        pairP: 0.06,
        bonusP: 0.08,
        perfectW: 0.075,
        goodW: 0.13,
      },
      NORMAL: {
        speed: 560,
        step: 0.52,
        pairP: 0.10,
        bonusP: 0.10,
        perfectW: 0.06,
        goodW: 0.11,
      },
      HARD: {
        speed: 700,
        step: 0.42,
        pairP: 0.14,
        bonusP: 0.12,
        perfectW: 0.05,
        goodW: 0.095,
      },
    };
    return base[diff] || base.EASY;
  }, []);

  const buildChart = useCallback(
    (diff, durSec) => {
      const p = getDiffParams(diff);
      const length = BS_clamp(durSec || 60, 35, 120);
      const notes = [];
      // Ensure notes appear immediately after START (especially on mobile)
      const warm = diff === "EASY" ? [0.65, 0.98, 1.32] : diff === "NORMAL" ? [0.55, 0.86, 1.18] : [0.50, 0.78, 1.06];
      let lane = Math.floor(Math.random() * 4);
      for (let wi = 0; wi < warm.length; wi++) {
        lane = (lane + (wi % 2 ? 1 : 3)) % 4;
        notes.push({ t: warm[wi], lane, kind: "arrow" });
      }
      let t = Math.max(warm[warm.length - 1] + 0.45, 1.6);
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

      const now = getNowSec();
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

    // unlock audio on explicit start (do not await; keep within user gesture)
    BS_unlockAudio();
    applyVolumes();

    // ensure RAF is fully stopped before starting a new run (prevents multi-RAF + stalled play on mobile)
    stopLoop();

    // stop preview and start music for play
    stopMusic();
    const a = musicRef.current;
    if (!a) return;

    // reset stats
    statsRef.current = { score: 0, combo: 0, maxCombo: 0, perfect: 0, good: 0, miss: 0, total: 0 };
    setHud({ score: 0, combo: 0 });
    setJudge(null);

    // build chart using duration if available
    const dur = musicDur || 60;
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
    resetClock(0);
    playingRef.current = true;

    BS_sfx("start");
    setView("play");

    // start RAF (single instance)
    const tick = () => {
      if (!playingRef.current) return;
      if (renderFrameRef.current) renderFrameRef.current();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [
    BS_sfx,
    BS_unlockAudio,
    applyVolumes,
    resetClock,
    buildChart,
    difficulty,
    musicDur,
    stopLoop,
    stopMusic,
  ]);


  const resetRun = useCallback(
    (toView = "select") => {
      // stop everything deterministically (RAF + audio) and reset per-run state
      stopLoop();
      stopMusic();
      resetClock(0);

      statsRef.current = { score: 0, combo: 0, maxCombo: 0, perfect: 0, good: 0, miss: 0, total: 0 };
      chartRef.current = [];
      nextIdxRef.current = 0;
      setHud({ score: 0, combo: 0 });
      setJudge(null);
      setTimeLeft(0);

      setView(toView);
      // preview will restart automatically via the view effect
    },
    [resetClock, stopLoop, stopMusic]
  );

  const retry = useCallback(() => {
    BS_sfx("click");
    resetRun("select");
  }, [BS_sfx, resetRun]);

  const backToSelect = useCallback(() => {
    BS_sfx("back");
    resetRun("select");
  }, [BS_sfx, resetRun]);

  const resizeCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;

    // Prefer the stage rect (stable) over canvas rect (can be 0 on some mobile layouts)
    const stageEl = stageRef.current;
    let rect = stageEl ? stageEl.getBoundingClientRect() : c.getBoundingClientRect();

    // fall back to parent if needed
    if ((!rect || rect.width < 10 || rect.height < 10) && c.parentElement) {
      rect = c.parentElement.getBoundingClientRect();
    }

    // last-resort fallback (avoid 0x0 canvas)
    const cssW = Math.max(16, rect?.width || 0, window.innerWidth ? window.innerWidth - 32 : 360);
    const cssH = Math.max(16, rect?.height || 0, window.innerHeight ? Math.floor(window.innerHeight * 0.56) : 360);

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const w = Math.max(2, Math.floor(cssW * dpr));
    const h = Math.max(2, Math.floor(cssH * dpr));

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
      if (stageRef.current) ro.observe(stageRef.current); else if (canvasRef.current) ro.observe(canvasRef.current);
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
    const now = getNowSec();
    const notes = chartRef.current;
    const lastT = notes && notes.length ? notes[notes.length - 1].t : 0;
    const durGuess = musicDur > 0 ? musicDur : (musicRef.current && Number.isFinite(musicRef.current.duration) ? Number(musicRef.current.duration) : (lastT ? lastT + 1.2 : 60));
    // update time-left at ~5fps (avoid rerender each frame)
    const tNow = performance.now();
    if (tNow - lastTimeLeftUpdateRef.current > 200) {
      lastTimeLeftUpdateRef.current = tNow;
      setTimeLeft(Math.max(0, durGuess - now));
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

    // finish if near end
    if (durGuess > 0 && now >= durGuess - 0.05) {
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

  // keep RAF render function always fresh (avoid stale closures)
  renderFrameRef.current = renderFrame;

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
        className={`relative z-[10] flex-1 min-h-0 px-4 pb-4 ${view === "play" ? "overflow-hidden" : "overflow-y-auto"}`}
        style={{
          paddingBottom: safeBottom,
          overscrollBehavior: view === "play" ? "contain" : undefined,
          touchAction: view === "play" ? "manipulation" : "auto",
        }}
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
          <div className="flex flex-col gap-4">
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
            <div
              ref={stageRef}
              className="relative rounded-3xl bg-white/[0.04] border border-white/[0.10] overflow-hidden"
              style={{ height: "min(56dvh, 520px)", minHeight: 320 }}
            >
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
              {/* judge overlay (always visible; avoid canvas-load timing issues) */}
              {judge && (
                <div
                  key={`${judge}-${judgeBump}`}
                  className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    animation: settings.motion ? "bsPop 320ms ease-out both" : "none",
                    filter: `drop-shadow(0 0 22px ${accent})`,
                  }}
                >
                  <img
                    src={BS_ASSETS.judge[judge]}
                    alt={judge}
                    className="w-[min(200px,56vw)] h-auto"
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
              className="relative rounded-3xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl overflow-hidden"
              style={{
                paddingBottom: "calc(env(safe-area-inset-bottom) + 18px)",
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

              <div className="grid grid-cols-4 gap-2 p-3">
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
                      className="relative h-16 rounded-2xl bg-black/20 border border-white/[0.10] active:scale-[0.99] select-none overflow-hidden"
                      style={{
                        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 20px rgba(0,0,0,0.25)`,
                        touchAction: "none",
                      }}
                      aria-label={`lane-${i}`}
                    >
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

              {/* avoid OS Dock overlap explicitly */}
              <div style={{ height: safeBottom }} />
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

                /* Finder-like slider (SFX/MUSIC) */
                .bsRange {
                  -webkit-appearance: none;
                  appearance: none;
                  height: 14px;
                  border-radius: 9999px;
                  border: 1px solid rgba(255,255,255,0.14);
                  background: rgba(255,255,255,0.06);
                  backdrop-filter: blur(18px);
                  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.30);
                  outline: none;
                  cursor: pointer;
                }
                .bsRange {
                  background-image: linear-gradient(90deg,
                    var(--bsAccent, rgba(140,200,255,0.9)) 0%,
                    var(--bsAccent, rgba(140,200,255,0.9)) var(--bsFill, 50%),
                    rgba(255,255,255,0.10) var(--bsFill, 50%),
                    rgba(255,255,255,0.06) 100%);
                }
                .bsRange:focus { filter: brightness(1.08); }
                .bsRange:active { filter: brightness(1.14); }
                .bsRange::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 22px;
                  height: 22px;
                  border-radius: 9999px;
                  border: 1px solid rgba(255,255,255,0.22);
                  background: rgba(0,0,0,0.25);
                  box-shadow: 0 0 18px var(--bsAccent, rgba(140,200,255,0.9)), inset 0 0 0 1px rgba(255,255,255,0.06);
                }
                .bsRange::-moz-range-thumb {
                  width: 22px;
                  height: 22px;
                  border-radius: 9999px;
                  border: 1px solid rgba(255,255,255,0.22);
                  background: rgba(0,0,0,0.25);
                  box-shadow: 0 0 18px var(--bsAccent, rgba(140,200,255,0.9)), inset 0 0 0 1px rgba(255,255,255,0.06);
                }
                .bsRange::-moz-range-track {
                  background: transparent;
                }

      `}</style>
    </div>
  );
};// ==============================
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
