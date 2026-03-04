const LEVEL_DEF = {
  6: { emoji: "🍉", name: "西瓜", color: "#64d66c", radius: 42 },
  5: { emoji: "🍈", name: "哈密瓜", color: "#8fd34f", radius: 36 },
  4: { emoji: "🍎", name: "苹果", color: "#ff5d5d", radius: 30 },
  3: { emoji: "🍊", name: "橘子", color: "#ff9f3f", radius: 24 },
  2: { emoji: "🍇", name: "葡萄", color: "#8553d7", radius: 19 },
  1: { emoji: "🫐", name: "蓝莓", color: "#3f6cff", radius: 14 },
};

const I18N_ZH = {
  title: "水果失控",
  stage: "关卡",
  target: "目标",
  items: "场上",
  unlocked: "已解锁",
  paused: "已暂停",
  pause: "暂停",
  resume: "继续",
  restart: "重开",
  gameOver: "游戏结束",
  reachedStage: "到达关卡",
  stageComplete: "通关",
  nextStage: "下一关",
  sfxOn: "音效：开",
  sfxOff: "音效：关",
  debug: "调试",
  convergence: "收敛",
  levelSuffix: "级",
  secondSuffix: "秒",
  invalid: "无效",
  lv6Count: "6级数量",
  wrongClick: "只能点最小等级！",
};

const TYPE_META = {
  fruit: { icon: "🍉", label: "水果" },
  special: { icon: "💠", label: "特殊物" },
  bomb: { icon: "💣", label: "爆炸果" },
  grower: { icon: "🌱", label: "成长果" },
  timer: { icon: "⏳", label: "倒计时物" },
  mutant: { icon: "🧬", label: "变异果" },
  spawner: { icon: "🏭", label: "复制源" },
  linked: { icon: "🔗", label: "锁链物" },
  storm: { icon: "🌪", label: "风暴" },
};

const BASE_SPECIAL_PARAMS = {
  grower: { growIntervalSec: 7.5, initialLevelRange: [2, 4] },
  timer: {
    countdownSecRange: [8, 11],
    burstCountRange: [3, 5],
    burstLevelWeights: [
      [1, 0.65],
      [2, 0.35],
    ],
  },
  mutant: { mutateChance: 0.25 },
  spawner: {
    spawnIntervalSec: 4.8,
    spawnLevelWeights: [
      [3, 0.6],
      [2, 0.4],
    ],
    autoVanishWhenNoSplittable: true,
  },
  linked: { pairClickWindowSec: 1.2, levelRange: [2, 4] },
  storm: { stormIntervalSec: 4.8, impulse: 85, lifetimeSec: 24 },
};

const GAME_CONFIG = {
  pauseKeyEnabled: true,
  fruitSizeScale: 1.1,
  lv1ExtraScale: 1.1,
  touchHitPaddingPx: 14,
  mouseHitPaddingPx: 3,
  vibrateEnabled: true,
  particleCap: 120,
  particlePoolCap: 180,
  enableBombRangePreview: true,
  sfxEnabledDefault: true,
  sfxMasterGain: 0.6,
  explosionSfxCooldownSec: 0.09,
  maxItems: 100,
  stageTransitionDelayMs: 900,
  splitNearbyOffset: 28,
  lv1ClearThreshold: 3,
  specialFromClearCount: 1,
  specialSplitDelayClearRewardSec: 2.4,
  specialSplitDelayIdlePunishSec: 1.2,
  specialSplitSpawnLv1Count: 2,
  lv1IdleAutoMergeDelaySec: 3.5,
  lv1PreWarnRatio: 0.7,
  lv1MarkedDurationSec: 1.0,
  lv1AutoMergeLv1Needed: 3,
  specialFromIdleMergeCount: 2,
  idlePunishInstantSplitSpecialCount: 1,
  specialSpawnJitterPx: 22,
  specialSpawnRetry: 8,
  specialSpawnExplosionEnabled: true,
  specialExplosionSearchRadiusPx: 220,
  specialExplosionCenterJitterPx: 25,
  specialExplosionFallbackJitterPx: 80,
  specialSpawnExplosionRadiusPx: 105,
  specialSpawnExplosionMaxKills: 14,
  specialSpawnExplosionAffectsTypes: ["fruit", "mutant", "grower", "linked", "bomb", "bombFruit"],
  specialSpawnExplosionDoesNotAffectTypes: ["special", "storm", "spawner", "blackhole"],
  earlySplitByLevel: {
    6: 16.0,
    5: 13.0,
    4: 10.5,
    3: 8.0,
    2: 6.0,
    1: Number.POSITIVE_INFINITY,
  },
  lateSplitByLevel: {
    6: 9.5,
    5: 8.8,
    4: 8.0,
    3: 7.2,
    2: 6.4,
    1: Number.POSITIVE_INFINITY,
  },
  convergenceStartStage: 4,
  convergenceEndStage: 16,
  minSplitIntervalByLevel: {
    6: 6.5,
    5: 6.0,
    4: 5.5,
    3: 4.8,
    2: 3.8,
  },
  bloodlineModifierA: 1.0,
  bloodlineModifierB: 1.12,
  highlightSplitModifier: 1.08,
  bombRadiusPx: 100,
  bombMaxKills: 12,
  bombAlwaysClickable: true,
  bombAffectsTypes: ["fruit", "mutant", "grower", "linked"],
  bombDoesNotAffectTypes: ["storm", "spawner", "special"],
  bloodlineColor: {
    A: "#a8ecff",
    B: "#ff9ca5",
    none: "#d8dce2",
  },
  ageState: {
    fresh: { minSec: 0, maxSec: 12, modifier: 1.0, alpha: 1.0, jitter: 0 },
    ripe: { minSec: 12, maxSec: 24, modifier: 1.08, alpha: 0.9, jitter: 0.5 },
    rotten: { minSec: 24, maxSec: Number.POSITIVE_INFINITY, modifier: 1.18, alpha: 0.78, jitter: 1.0 },
  },
  debugShowLv6SplitTimer: false,
  debugSplit: false,
  blackholeUnlockStage: 12,
  blackholeMinSpawnIntervalSec: 35,
  blackholeMaxPerStage: 1,
  blackholeMaxPerRun: 3,
  blackholeSpawnChance: 0.05,
  unlockedByStage: [
    { stage: 1, type: "fruit" },
    { stage: 4, type: "grower" },
    { stage: 6, type: "timer" },
    { stage: 8, type: "mutant" },
    { stage: 8, type: "bomb" },
    { stage: 8, type: "special" },
    { stage: 10, type: "spawner" },
    { stage: 11, type: "linked" },
    { stage: 12, type: "storm" },
  ],
};

function mergeSpecial(overrides) {
  const output = {};
  for (const key of Object.keys(BASE_SPECIAL_PARAMS)) {
    output[key] = { ...BASE_SPECIAL_PARAMS[key], ...(overrides?.[key] || {}) };
  }
  return output;
}

const STAGE_CONFIG = [
  null,
  {
    stage: 1,
    initialSpawnCount: 9,
    allowedTypes: [["fruit", 1]],
    fruitLevelDistribution: [
      [6, 0.5],
      [5, 0.3],
      [4, 0.15],
      [3, 0.05],
    ],
    bloodlineBProbability: 0.08,
    stageMultiplier: 1.0,
    specialTypeParams: mergeSpecial(),
  },
  {
    stage: 2,
    initialSpawnCount: 10,
    allowedTypes: [["fruit", 1]],
    fruitLevelDistribution: [
      [6, 0.42],
      [5, 0.33],
      [4, 0.2],
      [3, 0.05],
    ],
    bloodlineBProbability: 0.1,
    stageMultiplier: 0.97,
    specialTypeParams: mergeSpecial({ grower: { growIntervalSec: 7.3 } }),
  },
  {
    stage: 3,
    initialSpawnCount: 11,
    allowedTypes: [["fruit", 1]],
    fruitLevelDistribution: [
      [6, 0.36],
      [5, 0.32],
      [4, 0.22],
      [3, 0.1],
    ],
    bloodlineBProbability: 0.12,
    stageMultiplier: 0.95,
    specialTypeParams: mergeSpecial({ grower: { growIntervalSec: 7.1 } }),
  },
  {
    stage: 4,
    initialSpawnCount: 12,
    allowedTypes: [
      ["fruit", 0.88],
      ["grower", 0.12],
    ],
    fruitLevelDistribution: [
      [6, 0.32],
      [5, 0.32],
      [4, 0.25],
      [3, 0.11],
    ],
    bloodlineBProbability: 0.13,
    stageMultiplier: 0.93,
    specialTypeParams: mergeSpecial({ grower: { growIntervalSec: 6.8 } }),
  },
  {
    stage: 5,
    initialSpawnCount: 12,
    allowedTypes: [
      ["fruit", 0.84],
      ["grower", 0.16],
    ],
    fruitLevelDistribution: [
      [6, 0.3],
      [5, 0.32],
      [4, 0.25],
      [3, 0.13],
    ],
    bloodlineBProbability: 0.14,
    stageMultiplier: 0.91,
    specialTypeParams: mergeSpecial(),
  },
  {
    stage: 6,
    initialSpawnCount: 13,
    allowedTypes: [
      ["fruit", 0.78],
      ["grower", 0.12],
      ["timer", 0.1],
    ],
    fruitLevelDistribution: [
      [6, 0.28],
      [5, 0.3],
      [4, 0.26],
      [3, 0.13],
      [2, 0.03],
    ],
    bloodlineBProbability: 0.15,
    stageMultiplier: 0.89,
    specialTypeParams: mergeSpecial({ timer: { countdownSecRange: [7.5, 10.5] } }),
  },
  {
    stage: 7,
    initialSpawnCount: 13,
    allowedTypes: [
      ["fruit", 0.8],
      ["grower", 0.1],
      ["timer", 0.1],
    ],
    fruitLevelDistribution: [
      [6, 0.26],
      [5, 0.3],
      [4, 0.27],
      [3, 0.13],
      [2, 0.04],
    ],
    bloodlineBProbability: 0.16,
    stageMultiplier: 0.87,
    specialTypeParams: mergeSpecial(),
  },
  {
    stage: 8,
    initialSpawnCount: 14,
    allowedTypes: [
      ["fruit", 0.68],
      ["mutant", 0.1],
      ["grower", 0.09],
      ["timer", 0.09],
      ["bomb", 0.04],
    ],
    fruitLevelDistribution: [
      [6, 0.24],
      [5, 0.29],
      [4, 0.28],
      [3, 0.15],
      [2, 0.04],
    ],
    bloodlineBProbability: 0.17,
    stageMultiplier: 0.85,
    specialTypeParams: mergeSpecial({ mutant: { mutateChance: 0.28 } }),
  },
  {
    stage: 9,
    initialSpawnCount: 14,
    allowedTypes: [
      ["fruit", 0.67],
      ["mutant", 0.11],
      ["grower", 0.09],
      ["timer", 0.09],
      ["bomb", 0.04],
    ],
    fruitLevelDistribution: [
      [6, 0.22],
      [5, 0.28],
      [4, 0.3],
      [3, 0.15],
      [2, 0.05],
    ],
    bloodlineBProbability: 0.18,
    stageMultiplier: 0.83,
    specialTypeParams: mergeSpecial(),
  },
  {
    stage: 10,
    initialSpawnCount: 15,
    allowedTypes: [
      ["fruit", 0.61],
      ["mutant", 0.11],
      ["grower", 0.08],
      ["timer", 0.09],
      ["spawner", 0.07],
      ["bomb", 0.04],
    ],
    fruitLevelDistribution: [
      [6, 0.2],
      [5, 0.28],
      [4, 0.3],
      [3, 0.16],
      [2, 0.06],
    ],
    bloodlineBProbability: 0.19,
    stageMultiplier: 0.81,
    specialTypeParams: mergeSpecial({ spawner: { spawnIntervalSec: 4.4 } }),
  },
  {
    stage: 11,
    initialSpawnCount: 15,
    allowedTypes: [
      ["fruit", 0.56],
      ["mutant", 0.11],
      ["grower", 0.08],
      ["timer", 0.08],
      ["spawner", 0.07],
      ["linked", 0.06],
      ["bomb", 0.04],
    ],
    fruitLevelDistribution: [
      [6, 0.18],
      [5, 0.27],
      [4, 0.31],
      [3, 0.18],
      [2, 0.06],
    ],
    bloodlineBProbability: 0.2,
    stageMultiplier: 0.78,
    specialTypeParams: mergeSpecial({ linked: { pairClickWindowSec: 1.2 } }),
  },
  {
    stage: 12,
    initialSpawnCount: 16,
    allowedTypes: [
      ["fruit", 0.49],
      ["mutant", 0.1],
      ["grower", 0.08],
      ["timer", 0.08],
      ["spawner", 0.07],
      ["linked", 0.06],
      ["storm", 0.08],
      ["bomb", 0.04],
    ],
    fruitLevelDistribution: [
      [6, 0.16],
      [5, 0.25],
      [4, 0.32],
      [3, 0.2],
      [2, 0.07],
    ],
    bloodlineBProbability: 0.22,
    stageMultiplier: 0.75,
    specialTypeParams: mergeSpecial({ storm: { stormIntervalSec: 4.2, impulse: 95 } }),
  },
];

let canvas;
let ctx;
let stageEl;
let targetEl;
let countEl;
let unlockedEl;
let labelStageEl;
let labelTargetEl;
let labelCountEl;
let labelUnlockedEl;
let sfxBtnEl;
let pauseBtnEl;
let pausedOverlayEl;
let overlayEl;
let finalStageEl;
let stageBannerEl;

const game = {
  items: [],
  particles: [],
  particlePool: [],
  shockwaves: [],
  running: false,
  isPaused: false,
  over: false,
  stage: 1,
  nextItemId: 1,
  nextPairId: 1,
  elapsedMs: 0,
  lastFrameTs: 0,
  transitionUntilMs: 0,
  linkedPending: null,
  lv1ClearedByPlayerCount: 0,
  lv1ClearedBloodlines: [],
  lastSuccessfulClickPos: null,
  idleLv1Timer: 0,
  lv1AutoMergeState: null,
  screenShakeMs: 0,
  pointerDown: false,
  pointerType: "mouse",
  hoveredItemId: null,
  pressedItemId: null,
  flashMs: 0,
  blackholeSpawnedThisStage: 0,
  blackholeSpawnedThisRun: 0,
  lastBlackholeSpawnTimeSec: -99999,
};

class AudioManager {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = GAME_CONFIG.sfxEnabledDefault;
    this.ready = false;
    this.lastExplosionAt = -999;
  }

  ensure() {
    if (this.ready) {
      if (this.ctx.state === "suspended") this.ctx.resume();
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.enabled ? GAME_CONFIG.sfxMasterGain : 0;
    this.master.connect(this.ctx.destination);
    this.ready = true;
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.master) return;
    this.master.gain.setValueAtTime(this.enabled ? GAME_CONFIG.sfxMasterGain : 0, this.ctx.currentTime);
  }

  play(name, intensity = 1) {
    if (!this.enabled) return;
    this.ensure();
    if (!this.ready) return;
    const now = this.ctx.currentTime;
    const amp = clamp(intensity, 0.4, 1.8);
    if ((name === "bomb_click" || name === "special_spawn_explosion") && now - this.lastExplosionAt < GAME_CONFIG.explosionSfxCooldownSec) {
      return;
    }
    if (name === "bomb_click" || name === "special_spawn_explosion") {
      this.lastExplosionAt = now;
    }

    switch (name) {
      case "click_ok_lv":
        this.tone("triangle", 320 * amp, 0.05, 0.11 * amp);
        break;
      case "click_wrong":
        this.tone("sawtooth", 110, 0.08, 0.1);
        break;
      case "split":
        this.tone("triangle", 450, 0.025, 0.05);
        break;
      case "special_spawn":
        this.chime(660, 880, 0.08);
        break;
      case "special_split":
        this.tone("triangle", 520, 0.05, 0.09);
        break;
      case "special_spawn_explosion":
        this.boom(0.16, 0.36 * amp);
        this.whoosh(0.14, 0.2 * amp);
        break;
      case "bomb_click":
        this.boom(0.21, 0.45 * amp);
        this.whoosh(0.16, 0.24 * amp);
        break;
      case "chain_clear":
        this.tone("triangle", 500 + 40 * amp, 0.03, 0.06);
        break;
      case "punish_preWarn":
        this.noiseSweep(0.06, 900, 420, 0.06);
        break;
      case "punish_marked":
        this.tone("square", 240, 0.06, 0.08);
        break;
      case "stage_complete":
        this.chime(520, 780, 0.16);
        break;
      case "game_over":
        this.tone("sawtooth", 170, 0.22, 0.16);
        this.tone("triangle", 98, 0.24, 0.11);
        break;
      default:
        break;
    }
  }

  tone(type, freq, dur, gain) {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  chime(a, b, dur) {
    this.tone("sine", a, dur, 0.12);
    this.tone("sine", b, dur * 0.9, 0.1);
  }

  boom(dur, gain) {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(130, t);
    osc.frequency.exponentialRampToValueAtTime(55, t + dur);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
    this.noiseSweep(dur, 220, 70, gain * 0.65);
  }

  whoosh(dur, gain) {
    this.noiseSweep(dur, 1400, 380, gain);
  }

  noiseSweep(dur, startHz, endHz, gain) {
    const t = this.ctx.currentTime;
    const buffer = this.ctx.createBuffer(1, Math.max(1, Math.floor(this.ctx.sampleRate * dur)), this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(startHz, t);
    filter.frequency.exponentialRampToValueAtTime(Math.max(10, endHz), t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filter).connect(g).connect(this.master);
    src.start(t);
    src.stop(t + dur + 0.01);
  }
}

const audio = new AudioManager();

function getStageConfig(stage) {
  return STAGE_CONFIG[Math.min(stage, STAGE_CONFIG.length - 1)];
}

function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  stageEl = document.getElementById("stage");
  targetEl = document.getElementById("target");
  countEl = document.getElementById("count");
  unlockedEl = document.getElementById("unlocked");
  labelStageEl = document.getElementById("labelStage");
  labelTargetEl = document.getElementById("labelTarget");
  labelCountEl = document.getElementById("labelCount");
  labelUnlockedEl = document.getElementById("labelUnlocked");
  sfxBtnEl = document.getElementById("sfxBtn");
  pauseBtnEl = document.getElementById("pauseBtn");
  pausedOverlayEl = document.getElementById("pausedOverlay");
  overlayEl = document.getElementById("overlay");
  finalStageEl = document.getElementById("finalStage");
  stageBannerEl = document.getElementById("stageBanner");
  applyI18nText();

  sfxBtnEl.addEventListener("click", () => {
    audio.toggle();
    audio.ensure();
    updateSfxUi();
  });
  pauseBtnEl.addEventListener("click", togglePause);
  document.getElementById("restartBtn").addEventListener("click", restartGame);
  document.getElementById("overlayRestartBtn").addEventListener("click", restartGame);

  canvas.addEventListener("pointerdown", onPointerDown, { passive: false });
  canvas.addEventListener("pointermove", onPointerMove, { passive: true });
  canvas.addEventListener("pointerup", onPointerUp, { passive: true });
  canvas.addEventListener("pointercancel", onPointerUp, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { passive: true });
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("keydown", onKeyDown);

  resizeCanvas();
  restartGame();
  requestAnimationFrame(loop);
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function restartGame() {
  game.items = [];
  game.particles = [];
  game.particlePool = [];
  game.shockwaves = [];
  game.running = true;
  game.isPaused = false;
  game.over = false;
  game.stage = 1;
  game.nextItemId = 1;
  game.nextPairId = 1;
  game.elapsedMs = 0;
  game.lastFrameTs = 0;
  game.transitionUntilMs = 0;
  game.linkedPending = null;
  game.lv1ClearedByPlayerCount = 0;
  game.lv1ClearedBloodlines = [];
  game.lastSuccessfulClickPos = null;
  game.idleLv1Timer = 0;
  game.lv1AutoMergeState = null;
  game.screenShakeMs = 0;
  game.pointerDown = false;
  game.hoveredItemId = null;
  game.pressedItemId = null;
  game.flashMs = 0;
  game.blackholeSpawnedThisStage = 0;
  game.blackholeSpawnedThisRun = 0;
  game.lastBlackholeSpawnTimeSec = -99999;

  spawnStage(game.stage);

  overlayEl.classList.add("hidden");
  hideBanner();
  updatePauseUi();
  updateSfxUi();
  syncHud();
}

function loop(ts) {
  if (!game.lastFrameTs) game.lastFrameTs = ts;
  const dtMs = Math.min(50, ts - game.lastFrameTs);
  game.lastFrameTs = ts;

  if (game.running) update(dtMs);
  render();
  requestAnimationFrame(loop);
}

function onKeyDown(event) {
  if (!GAME_CONFIG.pauseKeyEnabled) return;
  if (event.code === "KeyP" || event.code === "Space") {
    event.preventDefault();
    togglePause();
  }
}

function togglePause() {
  if (game.over) return;
  game.isPaused = !game.isPaused;
  updatePauseUi();
}

function updatePauseUi() {
  if (!pauseBtnEl || !pausedOverlayEl) return;
  pauseBtnEl.textContent = game.isPaused ? I18N_ZH.resume : I18N_ZH.pause;
  pausedOverlayEl.classList.toggle("hidden", !game.isPaused);
}

function updateSfxUi() {
  if (!sfxBtnEl) return;
  sfxBtnEl.textContent = audio.enabled ? I18N_ZH.sfxOn : I18N_ZH.sfxOff;
}

function applyI18nText() {
  document.title = I18N_ZH.title;
  if (labelStageEl) labelStageEl.textContent = I18N_ZH.stage;
  if (labelTargetEl) labelTargetEl.textContent = I18N_ZH.target;
  if (labelCountEl) labelCountEl.textContent = I18N_ZH.items;
  if (labelUnlockedEl) labelUnlockedEl.textContent = I18N_ZH.unlocked;
  const paused = document.getElementById("pausedOverlay");
  if (paused) paused.textContent = I18N_ZH.paused;
  const title = document.getElementById("gameOverTitle");
  if (title) title.textContent = I18N_ZH.gameOver;
  const restartA = document.getElementById("restartBtn");
  if (restartA) restartA.textContent = I18N_ZH.restart;
  const restartB = document.getElementById("overlayRestartBtn");
  if (restartB) restartB.textContent = I18N_ZH.restart;
}

function onPointerMove(event) {
  if (!game.running || game.over) return;
  game.pointerType = event.pointerType || "mouse";
  const p = getPointerPos(event);
  const hit = getItemAt(p.x, p.y);
  game.hoveredItemId = hit ? hit.id : null;
}

function onPointerUp() {
  game.pointerDown = false;
  game.pressedItemId = null;
}

function update(dtMs) {
  if (game.isPaused) {
    return;
  }

  game.elapsedMs += dtMs;
  const dtSec = dtMs / 1000;

  updateParticles(dtSec);
  updateShockwaves(dtSec);
  if (game.screenShakeMs > 0) {
    game.screenShakeMs = Math.max(0, game.screenShakeMs - dtMs);
  }
  if (game.flashMs > 0) {
    game.flashMs = Math.max(0, game.flashMs - dtMs);
  }

  if (game.linkedPending && game.elapsedMs > game.linkedPending.expiresAtMs) {
    game.linkedPending = null;
  }

  if (game.transitionUntilMs > 0) {
    if (game.elapsedMs >= game.transitionUntilMs) {
      game.transitionUntilMs = 0;
      spawnStage(game.stage);
      hideBanner();
    }
    syncHud();
    return;
  }

  maybeSpawnBlackhole(dtSec);

  const toRemove = new Set();
  const toSpawn = [];

  for (const item of game.items) {
    if (isSplittableFruitType(item) && item.level > 1) {
      const splitTimer = getSplitTimer(item);
      if ((!Number.isFinite(splitTimer) || Number.isNaN(splitTimer) || splitTimer <= 0) && !item.pendingSplit) {
        initSplitTimer(item);
      }
    }
    updateItemCommon(item, dtSec);
    if (updateBombFade(item, dtSec, toRemove)) {
      continue;
    }
    const behavior = ITEM_BEHAVIORS[item.type] || ITEM_BEHAVIORS.fruit;
    behavior.update(item, dtSec, toSpawn, toRemove);
  }

  for (const id of toRemove) {
    removeItemById(id);
  }
  for (const spawnInfo of toSpawn) {
    if (game.items.length >= GAME_CONFIG.maxItems) break;
    game.items.push(spawnInfo);
  }
  updateLv1IdleAndAutoMerge(dtSec);

  if (game.items.length >= GAME_CONFIG.maxItems) {
    gameOver();
    return;
  }

  if (game.items.length === 0) {
    emitFxEvent("onStageComplete");
    game.stage += 1;
    showBanner(`${I18N_ZH.stage} ${game.stage - 1} ${I18N_ZH.stageComplete}  ->  ${I18N_ZH.nextStage} ${game.stage}`);
    game.transitionUntilMs = game.elapsedMs + GAME_CONFIG.stageTransitionDelayMs;
  }

  syncHud();
}

function spawnStage(stage) {
  const cfg = getStageConfig(stage);
  game.items = [];
  game.linkedPending = null;
  game.lv1ClearedByPlayerCount = 0;
  game.lv1ClearedBloodlines = [];
  game.lastSuccessfulClickPos = null;
  game.idleLv1Timer = 0;
  game.lv1AutoMergeState = null;
  game.blackholeSpawnedThisStage = 0;

  for (let i = 0; i < cfg.initialSpawnCount; i += 1) {
    if (game.items.length >= GAME_CONFIG.maxItems) break;
    const type = weightedPick(cfg.allowedTypes);

    if (type === "linked") {
      spawnLinkedPair(cfg);
      continue;
    }

    const item = createItemByType(type, cfg);
    if (item) {
      game.items.push(item);
    }
  }

  spawnBurstParticles(canvas.clientWidth * 0.5, canvas.clientHeight * 0.2, "#8fd8ff", 32);
}

function maybeSpawnBlackhole(dtSec) {
  const stageCfg = getStageConfig(game.stage);
  if (game.stage < GAME_CONFIG.blackholeUnlockStage) return;
  if (game.blackholeSpawnedThisStage >= GAME_CONFIG.blackholeMaxPerStage) return;
  if (game.blackholeSpawnedThisRun >= GAME_CONFIG.blackholeMaxPerRun) return;
  if (!stageCfg.allowedTypes.some(([type]) => type === "blackhole")) return;

  const elapsedSec = game.elapsedMs / 1000;
  if (elapsedSec - game.lastBlackholeSpawnTimeSec < GAME_CONFIG.blackholeMinSpawnIntervalSec) return;

  if (Math.random() > GAME_CONFIG.blackholeSpawnChance * dtSec) return;
  const item = createItemByType("blackhole", stageCfg);
  if (!item) return;

  game.items.push(item);
  game.blackholeSpawnedThisStage += 1;
  game.blackholeSpawnedThisRun += 1;
  game.lastBlackholeSpawnTimeSec = elapsedSec;
}

function spawnLinkedPair(stageCfg) {
  if (game.items.length >= GAME_CONFIG.maxItems - 1) return;

  const pairId = game.nextPairId++;
  const params = stageCfg.specialTypeParams.linked;
  const [minLv, maxLv] = params.levelRange;
  const level = Math.round(randomRange(minLv, maxLv));
  const bloodline = pickBloodline(stageCfg);
  const base = createBaseItem("linked", {
    level,
    bloodline,
    clickable: true,
    canSplit: false,
    pairId,
    splitInterval: Number.POSITIVE_INFINITY,
    timers: { armed: false },
  });

  const offset = 24;
  const a = { ...base, id: game.nextItemId++, pos: randomSpawnPos(levelDefRadius(level)) };
  const b = {
    ...base,
    id: game.nextItemId++,
    pos: clampPos({ x: a.pos.x + randomRange(-offset, offset), y: a.pos.y + randomRange(-offset, offset) }, levelDefRadius(level)),
  };
  game.items.push(a, b);
}

function createItemByType(type, stageCfg) {
  switch (type) {
    case "fruit":
      return createFruitLike("fruit", stageCfg);
    case "special":
      return createSpecialItem(pickBloodline(stageCfg));
    case "bomb":
      return createBombItem(pickBloodline(stageCfg));
    case "mutant":
      return createFruitLike("mutant", stageCfg);
    case "grower": {
      const p = stageCfg.specialTypeParams.grower;
      const level = Math.round(randomRange(p.initialLevelRange[0], p.initialLevelRange[1]));
      return createBaseItem("grower", {
        level,
        bloodline: pickBloodline(stageCfg),
        clickable: true,
        canSplit: false,
        splitInterval: Number.POSITIVE_INFINITY,
        timers: { growElapsed: 0 },
      });
    }
    case "timer": {
      const p = stageCfg.specialTypeParams.timer;
      return createBaseItem("timer", {
        level: weightedPick([
          [2, 0.2],
          [3, 0.45],
          [4, 0.35],
        ]),
        bloodline: pickBloodline(stageCfg),
        clickable: true,
        canSplit: false,
        splitInterval: Number.POSITIVE_INFINITY,
        timers: { countdownSec: randomRange(p.countdownSecRange[0], p.countdownSecRange[1]) },
      });
    }
    case "blackhole":
      return null;
    case "spawner": {
      return createBaseItem("spawner", {
        level: 0,
        bloodline: pickBloodline(stageCfg),
        clickable: false,
        canSplit: false,
        splitInterval: Number.POSITIVE_INFINITY,
        timers: { spawnElapsed: 0 },
      });
    }
    case "storm":
      return createBaseItem("storm", {
        level: 0,
        bloodline: null,
        clickable: false,
        canSplit: false,
        splitInterval: Number.POSITIVE_INFINITY,
        timers: { stormElapsed: 0, lifeSec: 0 },
      });
    default:
      return createFruitLike("fruit", stageCfg);
  }
}

function createFruitLike(type, stageCfg) {
  const item = createBaseItem(type, {
    level: weightedPick(stageCfg.fruitLevelDistribution),
    bloodline: pickBloodline(stageCfg),
    clickable: true,
    canSplit: true,
    splitInterval: GAME_CONFIG.earlySplitByLevel,
    timers: { splitTimer: 0 },
  });
  initializeSplitTimer(item);
  return item;
}

function createSpecialItem(bloodline, anchorPos, source = "idlePunish") {
  const splitDelaySec =
    source === "clearReward" ? GAME_CONFIG.specialSplitDelayClearRewardSec : GAME_CONFIG.specialSplitDelayIdlePunishSec;
  const item = createBaseItem("special", {
    level: 0,
    bloodline: bloodline || "A",
    clickable: true,
    alwaysClickable: true,
    canSplit: false,
    splitInterval: Number.POSITIVE_INFINITY,
    timers: { specialElapsed: 0, specialSplitDelaySec: splitDelaySec },
    radius: 18,
  });
  item.specialSource = source;
  item.pos = findNonOverlappingPos(item.radius, anchorPos, GAME_CONFIG.specialSpawnJitterPx, GAME_CONFIG.specialSpawnRetry);
  return item;
}

function createBombItem(bloodline, anchorPos) {
  const item = createBaseItem("bomb", {
    level: 0,
    bloodline: bloodline || "A",
    clickable: true,
    alwaysClickable: GAME_CONFIG.bombAlwaysClickable,
    canSplit: false,
    splitInterval: Number.POSITIVE_INFINITY,
    timers: {},
    radius: 19,
  });
  item.pos = findNonOverlappingPos(item.radius, anchorPos);
  return item;
}

function createBaseItem(type, overrides) {
  const level = overrides.level ?? 0;
  const radius = overrides.radius ?? defaultRadiusByType(type, level);
  return {
    id: game.nextItemId++,
    type,
    level,
    bloodline: overrides.bloodline ?? null,
    ageSec: 0,
    pos: randomSpawnPos(radius),
    vel: { x: randomRange(-12, 12), y: randomRange(-12, 12) },
    clickable: overrides.clickable ?? false,
    alwaysClickable: overrides.alwaysClickable ?? false,
    ignoreTargetRule: overrides.ignoreTargetRule ?? false,
    canSplit: overrides.canSplit ?? false,
    splitInterval: overrides.splitInterval ?? Number.POSITIVE_INFINITY,
    timers: overrides.timers || {},
    splitTimer: overrides.timers?.splitTimer,
    radius,
    pairId: overrides.pairId || null,
    pendingSplit: false,
  };
}

function defaultRadiusByType(type, level) {
  if (level >= 1) return levelDefRadius(level);
  const map = {
    special: 18,
    bomb: 19,
    spawner: 22,
    storm: 26,
    timer: 20,
    grower: 22,
    linked: 20,
  };
  return map[type] || 20;
}

function levelDefRadius(level) {
  const base = LEVEL_DEF[level]?.radius || 20;
  const lv1Scale = level === 1 ? GAME_CONFIG.lv1ExtraScale : 1;
  return base * GAME_CONFIG.fruitSizeScale * lv1Scale;
}

function pickBloodline(stageCfg) {
  return Math.random() < stageCfg.bloodlineBProbability ? "B" : "A";
}

function updateItemCommon(item, dtSec) {
  if (item.level > 0) {
    item.ageSec += dtSec;
  }

  item.pos.x += item.vel.x * dtSec;
  item.pos.y += item.vel.y * dtSec;
  item.vel.x *= 0.97;
  item.vel.y *= 0.97;

  const r = item.radius;
  if (item.pos.x < r) {
    item.pos.x = r;
    item.vel.x *= -0.5;
  }
  if (item.pos.x > canvas.clientWidth - r) {
    item.pos.x = canvas.clientWidth - r;
    item.vel.x *= -0.5;
  }
  if (item.pos.y < r) {
    item.pos.y = r;
    item.vel.y *= -0.5;
  }
  if (item.pos.y > canvas.clientHeight - r) {
    item.pos.y = canvas.clientHeight - r;
    item.vel.y *= -0.5;
  }
}

function updateBombFade(item, dtSec, toRemove) {
  if (!item.timers.bombFadeSec) return false;
  item.timers.bombFadeSec -= dtSec;
  const t = Math.max(0, item.timers.bombFadeSec / item.timers.bombFadeMaxSec);
  item.radius = Math.max(2, item.timers.bombFadeStartRadius * t);
  if (item.timers.bombFadeSec <= 0) {
    toRemove.add(item.id);
  }
  return true;
}

const ITEM_BEHAVIORS = {
  fruit: {
    update(item, dtSec, toSpawn, toRemove) {
      updateSplitItem(item, dtSec, toSpawn, toRemove, false);
    },
  },
  special: {
    update(item, dtSec, toSpawn, toRemove) {
      item.timers.specialElapsed += dtSec;
      if (item.timers.specialElapsed < (item.timers.specialSplitDelaySec || GAME_CONFIG.specialSplitDelayIdlePunishSec)) return;
      splitSpecialToLv1(item, toSpawn, toRemove);
    },
  },
  bomb: {
    update() {},
  },
  mutant: {
    update(item, dtSec, toSpawn, toRemove) {
      updateSplitItem(item, dtSec, toSpawn, toRemove, true);
    },
  },
  grower: {
    update(item, dtSec) {
      const stageCfg = getStageConfig(game.stage);
      const params = stageCfg.specialTypeParams.grower;
      item.timers.growElapsed += dtSec;
      if (item.timers.growElapsed >= params.growIntervalSec && item.level < 6) {
        const prevLevel = item.level;
        item.level += 1;
        item.radius = levelDefRadius(item.level);
        item.timers.growElapsed = 0;
        onItemLevelChanged(item, prevLevel);
      }
    },
  },
  timer: {
    update(item, dtSec, toSpawn, toRemove) {
      const stageCfg = getStageConfig(game.stage);
      const params = stageCfg.specialTypeParams.timer;
      item.timers.countdownSec -= dtSec;
      if (item.timers.countdownSec > 0) return;

      const burstCount = Math.round(randomRange(params.burstCountRange[0], params.burstCountRange[1]));
      for (let i = 0; i < burstCount; i += 1) {
        const lvl = weightedPick(params.burstLevelWeights);
        const child = createBaseItem("fruit", {
          level: lvl,
          bloodline: Math.random() < 0.5 ? "A" : "B",
          clickable: true,
          canSplit: lvl > 1,
          splitInterval: GAME_CONFIG.earlySplitByLevel,
          timers: { splitTimer: 0 },
        });
        initializeSplitTimer(child);
        child.pos = clampPos({ x: item.pos.x + randomRange(-20, 20), y: item.pos.y + randomRange(-20, 20) }, child.radius);
        child.vel = { x: randomRange(-70, 70), y: randomRange(-70, 70) };
        toSpawn.push(child);
      }
      spawnBurstParticles(item.pos.x, item.pos.y, "#ffd7a8", 20);
      toRemove.add(item.id);
    },
  },
  spawner: {
    update(item, dtSec, toSpawn, toRemove) {
      const stageCfg = getStageConfig(game.stage);
      const params = stageCfg.specialTypeParams.spawner;

      if (params.autoVanishWhenNoSplittable && countSplittableItemsExcluding(item.id) === 0) {
        toRemove.add(item.id);
        return;
      }

      item.timers.spawnElapsed += dtSec;
      if (item.timers.spawnElapsed < params.spawnIntervalSec) return;
      item.timers.spawnElapsed = 0;

      const level = weightedPick(params.spawnLevelWeights);
      const child = createBaseItem("fruit", {
        level,
        bloodline: item.bloodline || pickBloodline(stageCfg),
        clickable: true,
        canSplit: level > 1,
        splitInterval: GAME_CONFIG.earlySplitByLevel,
        timers: { splitTimer: 0 },
      });
      initializeSplitTimer(child);
      child.pos = clampPos({ x: item.pos.x + randomRange(-18, 18), y: item.pos.y + randomRange(-18, 18) }, child.radius);
      toSpawn.push(child);
    },
  },
  linked: {
    update() {},
  },
  storm: {
    update(item, dtSec, _toSpawn, toRemove) {
      const stageCfg = getStageConfig(game.stage);
      const params = stageCfg.specialTypeParams.storm;
      item.timers.lifeSec += dtSec;
      item.timers.stormElapsed += dtSec;

      if (item.timers.lifeSec >= params.lifetimeSec) {
        toRemove.add(item.id);
        return;
      }
      if (getCurrentTargetLevel() === null) {
        toRemove.add(item.id);
        return;
      }

      if (item.timers.stormElapsed < params.stormIntervalSec) return;
      item.timers.stormElapsed = 0;

      for (const other of game.items) {
        if (other.id === item.id) continue;
        other.vel.x += randomRange(-params.impulse, params.impulse);
        other.vel.y += randomRange(-params.impulse, params.impulse);
      }
      spawnBurstParticles(item.pos.x, item.pos.y, "#bde8ff", 14);
    },
  },
};

function updateSplitItem(item, dtSec, toSpawn, toRemove, isMutant) {
  if (item.level <= 1) return;

  let splitTimer = getSplitTimer(item);
  if (!Number.isFinite(splitTimer) || Number.isNaN(splitTimer)) {
    initSplitTimer(item);
    splitTimer = getSplitTimer(item);
  }
  splitTimer -= dtSec;
  setSplitTimer(item, splitTimer);
  if (splitTimer > 0) return;
  item.pendingSplit = true;

  const nextLevel = item.level - 1;
  const angle = Math.random() * Math.PI * 2;
  const dx = Math.cos(angle) * (GAME_CONFIG.splitNearbyOffset + levelDefRadius(nextLevel) * 0.8);
  const dy = Math.sin(angle) * (GAME_CONFIG.splitNearbyOffset + levelDefRadius(nextLevel) * 0.8);

  const children = [
    createSplitChild(item, nextLevel, item.pos.x + dx, item.pos.y + dy, isMutant),
    createSplitChild(item, nextLevel, item.pos.x - dx, item.pos.y - dy, isMutant),
  ];

  toSpawn.push(...children);
  toRemove.add(item.id);
  item.pendingSplit = false;
  emitFxEvent("onFruitSplit", { pos: item.pos, item });
}

function createSplitChild(parent, level, x, y, isMutant) {
  const stageCfg = getStageConfig(game.stage);
  let bloodline = parent.bloodline;
  if (isMutant) {
    const chance = stageCfg.specialTypeParams.mutant.mutateChance;
    if (Math.random() < chance) {
      bloodline = Math.random() < 0.5 ? (bloodline === "A" ? "B" : "A") : "B";
    }
  }

  const childType = parent.type;
  const child = createBaseItem(childType, {
    level,
    bloodline,
    clickable: true,
    canSplit: level > 1,
    splitInterval: GAME_CONFIG.earlySplitByLevel,
    timers: { splitTimer: 0 },
  });
  initializeSplitTimer(child);
  child.pos = clampPos({ x, y }, child.radius);
  child.vel = { x: randomRange(-60, 60), y: randomRange(-60, 60) };
  return child;
}

function splitSpecialToLv1(item, toSpawn, toRemove) {
  const count = GAME_CONFIG.specialSplitSpawnLv1Count;
  for (let i = 0; i < count; i += 1) {
    const lv1 = createFruitItemWithPlacement(1, item.bloodline || "A", item.pos);
    if (!lv1) break;
    toSpawn.push(lv1);
  }
  emitFxEvent("onSpecialSplit", { pos: item.pos, source: item.specialSource });
  toRemove.add(item.id);
}

function getSplitTimer(item) {
  if (Number.isFinite(item.splitTimer)) return item.splitTimer;
  if (Number.isFinite(item?.timers?.splitTimer)) return item.timers.splitTimer;
  return Number.NaN;
}

function setSplitTimer(item, value) {
  if (!item.timers) item.timers = {};
  item.splitTimer = value;
  item.timers.splitTimer = value;
}

function getSplitBaseForLevel(level, table) {
  if (Number.isFinite(table[level])) return table[level];
  for (let lv = level + 1; lv <= 6; lv += 1) {
    if (Number.isFinite(table[lv])) return table[lv];
  }
  for (let lv = level - 1; lv >= 2; lv -= 1) {
    if (Number.isFinite(table[lv])) return table[lv];
  }
  return 8;
}

function computeSplitTime(item) {
  const level = item.level;
  if (!Number.isFinite(level) || level <= 1) return Number.POSITIVE_INFINITY;

  const c = getConvergenceRatio(game.stage);
  const early = getSplitBaseForLevel(level, GAME_CONFIG.earlySplitByLevel);
  const late = getSplitBaseForLevel(level, GAME_CONFIG.lateSplitByLevel);
  const base = lerp(early, late, c);
  const bloodlineModifier = item.bloodline === "B" ? GAME_CONFIG.bloodlineModifierB : GAME_CONFIG.bloodlineModifierA;
  const ageModifier = getAgeState(item.ageSec).modifier;
  const floor = Number.isFinite(GAME_CONFIG.minSplitIntervalByLevel[level])
    ? GAME_CONFIG.minSplitIntervalByLevel[level]
    : Math.max(2.5, getSplitBaseForLevel(level, GAME_CONFIG.minSplitIntervalByLevel));

  let computed = base / bloodlineModifier / ageModifier;
  if (item.isHighlighted) {
    computed /= GAME_CONFIG.highlightSplitModifier;
  }
  if (!Number.isFinite(computed) || Number.isNaN(computed)) {
    computed = base;
  }
  return Math.max(floor, computed);
}

function initSplitTimer(item) {
  if (!item || item.level <= 1 || !item.canSplit) return;
  setSplitTimer(item, computeSplitTime(item));
}

function initializeSplitTimer(item) {
  initSplitTimer(item);
}

function onItemLevelChanged(item, prevLevel) {
  if (!item || item.level === prevLevel) return;
  if (!isSplittableFruitType(item) || item.level <= 1) return;
  initializeSplitTimer(item);
}

function getConvergenceRatio(stage) {
  const start = GAME_CONFIG.convergenceStartStage;
  const end = GAME_CONFIG.convergenceEndStage;
  return clamp01((stage - start) / (end - start));
}

function emitFxEvent(name, payload = {}) {
  switch (name) {
    case "onFruitClickedSuccess": {
      const pos = payload.pos || payload.item?.pos;
      if (pos) spawnBurstParticles(pos.x, pos.y, payload.color || "#a4e7ff", 10);
      audio.play("click_ok_lv", payload.intensity || 1);
      break;
    }
    case "onFruitClickedWrong": {
      const pos = payload.pos;
      if (pos) spawnBurstParticles(pos.x, pos.y, "#ff9a9a", 8);
      game.screenShakeMs = Math.max(game.screenShakeMs, 40);
      audio.play("click_wrong", 1);
      break;
    }
    case "onFruitSplit":
      audio.play("split", 0.8);
      break;
    case "onSpecialSpawn": {
      const pos = payload.pos;
      if (pos) {
        spawnBurstParticles(pos.x, pos.y, payload.source === "clearReward" ? "#a6efff" : "#c6a2ff", 11);
      }
      audio.play("special_spawn", 1);
      break;
    }
    case "onSpecialSplit": {
      const pos = payload.pos;
      if (pos) spawnBurstParticles(pos.x, pos.y, "#8df6ff", 14);
      audio.play("special_split", 1);
      break;
    }
    case "onSpecialSpawnExplosion": {
      const center = payload.center;
      if (center) {
        spawnShockwave(center.x, center.y, payload.radius || GAME_CONFIG.specialSpawnExplosionRadiusPx, "#ffdca6");
        spawnBurstParticles(center.x, center.y, "#ffd4a3", 18);
      }
      game.flashMs = Math.max(game.flashMs, 70);
      game.screenShakeMs = Math.max(game.screenShakeMs, 70);
      audio.play("special_spawn_explosion", 1);
      maybeVibrate(12);
      break;
    }
    case "onBombExplode": {
      const center = payload.pos;
      if (center) {
        spawnShockwave(center.x, center.y, payload.radius || GAME_CONFIG.bombRadiusPx, "#ffce9f");
        spawnBurstParticles(center.x, center.y, "#ffd4a3", 26);
      }
      game.flashMs = Math.max(game.flashMs, 90);
      game.screenShakeMs = Math.max(game.screenShakeMs, 95);
      audio.play("bomb_click", payload.intensity || 1);
      maybeVibrate(18);
      break;
    }
    case "onChainClear": {
      const from = payload.from;
      const to = payload.to;
      if (from && to) {
        game.shockwaves.push({
          type: "beam",
          x1: from.x,
          y1: from.y,
          x2: to.x,
          y2: to.y,
          lifeSec: 0.08,
          maxLifeSec: 0.08,
          color: "#bff6ff",
        });
      }
      audio.play("chain_clear", payload.intensity || 1);
      break;
    }
    case "onLv1PreWarn": {
      audio.play("punish_preWarn", 1);
      break;
    }
    case "onLv1Marked": {
      audio.play("punish_marked", 1);
      break;
    }
    case "onLv1Cancel": {
      const pos = payload.pos;
      if (pos) {
        spawnBurstParticles(pos.x, pos.y, "#cfd3da", 12);
      }
      break;
    }
    case "onStageComplete":
      audio.play("stage_complete", 1);
      maybeVibrate(16);
      break;
    case "onGameOver":
      audio.play("game_over", 1);
      maybeVibrate([25, 20, 25]);
      break;
    default:
      break;
  }
}

function maybeVibrate(pattern) {
  if (!GAME_CONFIG.vibrateEnabled) return;
  if (!navigator.vibrate) return;
  if (game.pointerType !== "touch") return;
  navigator.vibrate(pattern);
}

function onPointerDown(event) {
  if (!game.running || game.over || game.isPaused || game.transitionUntilMs > 0) return;
  event.preventDefault();
  audio.ensure();
  game.pointerDown = true;
  game.pointerType = event.pointerType || "mouse";

  const p = getPointerPos(event);
  const hit = getItemAt(p.x, p.y);
  game.pressedItemId = hit ? hit.id : null;
  if (!hit) return;

  if (!isItemClickableNow(hit)) {
    emitFxEvent("onFruitClickedWrong", { pos: p });
    return;
  }

  if (hit.type === "linked") {
    handleLinkedClick(hit);
    return;
  }
  if (hit.type === "bomb") {
    detonateBomb(hit);
    return;
  }
  if (hit.type === "special") {
    removeItemById(hit.id);
    emitFxEvent("onFruitClickedSuccess", { pos: hit.pos, color: "#8df6ff", intensity: 1.05 });
    return;
  }

  if (isLv1FruitMaterial(hit)) {
    onPlayerClearLv1(hit, getCurrentTargetLevel());
    if (game.lv1AutoMergeState?.itemIds?.includes(hit.id)) {
      clearLv1AutoMergeState();
    }
  }
  removeItemById(hit.id);
  emitFxEvent("onFruitClickedSuccess", { item: hit, pos: hit.pos, color: getItemBaseColor(hit), intensity: 1 });
}

function onPlayerClearLv1(fruit, currentTargetLevel) {
  if (currentTargetLevel !== 1) return;
  if (!isLv1FruitMaterial(fruit)) return;
  game.idleLv1Timer = 0;
  game.lastSuccessfulClickPos = { x: fruit.pos.x, y: fruit.pos.y };
  game.lv1ClearedByPlayerCount += 1;
  game.lv1ClearedBloodlines.push(fruit.bloodline || "A");

  while (currentTargetLevel === 1 && game.lv1ClearedByPlayerCount >= GAME_CONFIG.lv1ClearThreshold) {
    game.lv1ClearedByPlayerCount -= GAME_CONFIG.lv1ClearThreshold;
    const donors = game.lv1ClearedBloodlines.splice(0, GAME_CONFIG.lv1ClearThreshold);
    for (let i = 0; i < GAME_CONFIG.specialFromClearCount; i += 1) {
      const bloodline = pickBloodlineFromDonors(donors);
      const special = createSpecialItem(bloodline, game.lastSuccessfulClickPos || fruit.pos, "clearReward");
      if (!special) break;
      game.items.push(special);
      emitFxEvent("onSpecialSpawn", { pos: special.pos, source: "clearReward" });
      if (GAME_CONFIG.specialSpawnExplosionEnabled) {
        const center = pickExplosionCenterForClearRewardSpecial(special.pos);
        explodeAt(
          center,
          GAME_CONFIG.specialSpawnExplosionRadiusPx,
          GAME_CONFIG.specialSpawnExplosionMaxKills,
          GAME_CONFIG.specialSpawnExplosionAffectsTypes,
          GAME_CONFIG.specialSpawnExplosionDoesNotAffectTypes,
          special.id
        );
      }
    }
  }
}

function updateLv1IdleAndAutoMerge(dtSec) {
  if (game.transitionUntilMs > 0) return;

  const target = getCurrentTargetLevel();
  if (target !== 1) {
    game.lv1ClearedByPlayerCount = 0;
    game.lv1ClearedBloodlines = [];
    game.idleLv1Timer = 0;
    clearLv1AutoMergeState();
    return;
  }
  game.idleLv1Timer += dtSec;

  if (game.lv1AutoMergeState?.active) {
    if (!areLv1AutoMergeCandidatesAlive()) {
      clearLv1AutoMergeState();
      return;
    }
    if (game.lv1AutoMergeState.phase === "marked" && game.elapsedMs >= game.lv1AutoMergeState.resolveAtMs) {
      resolveMarkedAutoMerge();
      return;
    }
    if (game.lv1AutoMergeState.phase === "prewarn" && game.idleLv1Timer >= GAME_CONFIG.lv1IdleAutoMergeDelaySec) {
      upgradePreWarnToMarked();
    }
    return;
  }
  if (game.idleLv1Timer >= GAME_CONFIG.lv1IdleAutoMergeDelaySec * GAME_CONFIG.lv1PreWarnRatio) {
    beginMarkLv1ForAutoMerge();
  }
}

function beginMarkLv1ForAutoMerge() {
  if (game.lv1AutoMergeState?.active) return;

  const candidates = game.items.filter((it) => isLv1FruitMaterial(it));
  if (candidates.length < GAME_CONFIG.lv1AutoMergeLv1Needed) return;

  const selected = pickRandomItems(candidates, GAME_CONFIG.lv1AutoMergeLv1Needed);

  for (const item of selected) {
    item.timers.lv1PreWarn = true;
  }

  game.lv1AutoMergeState = {
    active: true,
    phase: "prewarn",
    itemIds: selected.map((x) => x.id),
  };
  spawnBurstParticles(selected[0].pos.x, selected[0].pos.y, "#646464", 10);
  emitFxEvent("onLv1PreWarn", { pos: selected[0].pos });
}

function upgradePreWarnToMarked() {
  if (!game.lv1AutoMergeState?.active || game.lv1AutoMergeState.phase !== "prewarn") return;
  const resolveAtMs = game.elapsedMs + GAME_CONFIG.lv1MarkedDurationSec * 1000;
  for (const id of game.lv1AutoMergeState.itemIds) {
    const item = game.items.find((it) => it.id === id);
    if (!item) continue;
    item.timers.lv1PreWarn = false;
    item.timers.lv1Marked = true;
  }
  game.lv1AutoMergeState.phase = "marked";
  game.lv1AutoMergeState.resolveAtMs = resolveAtMs;
  game.idleLv1Timer = 0;
  spawnBurstParticles(canvas.clientWidth * 0.5, 80, "#ff7b7b", 14);
  emitFxEvent("onLv1Marked", {});
}

function resolveMarkedAutoMerge() {
  const mark = game.lv1AutoMergeState;
  if (!mark?.active || mark.phase !== "marked") return;

  const marked = mark.itemIds
    .map((id) => game.items.find((it) => it.id === id))
    .filter(Boolean);

  for (const item of marked) {
    item.timers.lv1Marked = false;
  }

  const allStillExist = marked.length === GAME_CONFIG.lv1AutoMergeLv1Needed;
  game.lv1AutoMergeState = null;

  if (!allStillExist) return;

  const bloodlines = marked.map((x) => x.bloodline || "A");
  const center = averagePos(marked);

  for (const item of marked) {
    removeItemById(item.id);
  }

  const specials = [];
  for (let i = 0; i < GAME_CONFIG.specialFromIdleMergeCount; i += 1) {
    const bloodline = pickBloodlineFromDonors(bloodlines);
    const special = createSpecialItem(bloodline, center, "idlePunish");
    if (!special) continue;
    specials.push(special);
  }
  for (let i = 0; i < specials.length; i += 1) {
    const special = specials[i];
    if (i < GAME_CONFIG.idlePunishInstantSplitSpecialCount) {
      emitFxEvent("onSpecialSpawn", { pos: special.pos, source: "idlePunish" });
      const tempSpawn = [];
      const tempRemove = new Set();
      splitSpecialToLv1(special, tempSpawn, tempRemove);
      for (const spawn of tempSpawn) {
        if (game.items.length >= GAME_CONFIG.maxItems) break;
        game.items.push(spawn);
      }
    } else if (game.items.length < GAME_CONFIG.maxItems) {
      game.items.push(special);
      emitFxEvent("onSpecialSpawn", { pos: special.pos, source: "idlePunish" });
    }
  }
  spawnBurstParticles(center.x, center.y, "#ff6f6f", 24);
}

function areLv1AutoMergeCandidatesAlive() {
  if (!game.lv1AutoMergeState?.active) return false;
  return game.lv1AutoMergeState.itemIds.every((id) => game.items.some((it) => it.id === id));
}

function clearLv1AutoMergeState() {
  if (!game.lv1AutoMergeState?.active) return;
  const first = game.items.find((it) => it.id === game.lv1AutoMergeState.itemIds[0]);
  for (const id of game.lv1AutoMergeState.itemIds) {
    const item = game.items.find((it) => it.id === id);
    if (!item) continue;
    item.timers.lv1PreWarn = false;
    item.timers.lv1Marked = false;
  }
  game.lv1AutoMergeState = null;
  game.idleLv1Timer = 0;
  if (first) emitFxEvent("onLv1Cancel", { pos: first.pos });
}

function detonateBomb(bomb) {
  removeItemById(bomb.id);
  emitFxEvent("onBombExplode", { pos: bomb.pos, radius: GAME_CONFIG.bombRadiusPx, intensity: 1.2 });

  const allow = new Set(GAME_CONFIG.bombAffectsTypes);
  const deny = new Set(GAME_CONFIG.bombDoesNotAffectTypes);
  const victims = [];

  for (const item of game.items) {
    if (deny.has(item.type)) continue;
    if (!allow.has(item.type)) continue;
    const dx = item.pos.x - bomb.pos.x;
    const dy = item.pos.y - bomb.pos.y;
    if (dx * dx + dy * dy > GAME_CONFIG.bombRadiusPx * GAME_CONFIG.bombRadiusPx) continue;
    victims.push(item);
  }

  victims.sort((a, b) => {
    const da = (a.pos.x - bomb.pos.x) ** 2 + (a.pos.y - bomb.pos.y) ** 2;
    const db = (b.pos.x - bomb.pos.x) ** 2 + (b.pos.y - bomb.pos.y) ** 2;
    return da - db;
  });

  const maxKills = GAME_CONFIG.bombMaxKills == null ? victims.length : GAME_CONFIG.bombMaxKills;
  for (let i = 0; i < Math.min(maxKills, victims.length); i += 1) {
    const item = victims[i];
    emitFxEvent("onChainClear", { from: bomb.pos, to: item.pos, intensity: 0.9 + i * 0.03 });
    item.clickable = false;
    item.canSplit = false;
    item.timers.bombFadeSec = 0.12;
    item.timers.bombFadeMaxSec = 0.12;
    item.timers.bombFadeStartRadius = item.radius;
    spawnBurstParticles(item.pos.x, item.pos.y, getItemBaseColor(item), 6);
  }
}

function explodeAt(centerPos, radiusPx, maxKills, affectsTypes, doesNotAffectTypes, excludeId) {
  emitFxEvent("onSpecialSpawnExplosion", { center: centerPos, radius: radiusPx });
  const allow = new Set(affectsTypes);
  const deny = new Set(doesNotAffectTypes);
  const victims = [];

  for (const item of game.items) {
    if (item.id === excludeId) continue;
    if (deny.has(item.type)) continue;
    if (!allow.has(item.type)) continue;
    const dx = item.pos.x - centerPos.x;
    const dy = item.pos.y - centerPos.y;
    if (dx * dx + dy * dy > radiusPx * radiusPx) continue;
    victims.push(item);
  }

  victims.sort((a, b) => {
    const da = (a.pos.x - centerPos.x) ** 2 + (a.pos.y - centerPos.y) ** 2;
    const db = (b.pos.x - centerPos.x) ** 2 + (b.pos.y - centerPos.y) ** 2;
    return da - db;
  });

  const limit = maxKills == null ? victims.length : maxKills;
  for (let i = 0; i < Math.min(limit, victims.length); i += 1) {
    const item = victims[i];
    emitFxEvent("onChainClear", { from: centerPos, to: item.pos, intensity: 0.8 + i * 0.03 });
    item.clickable = false;
    item.canSplit = false;
    item.timers.bombFadeSec = 0.12;
    item.timers.bombFadeMaxSec = 0.12;
    item.timers.bombFadeStartRadius = item.radius;
  }
}

function pickExplosionCenterForClearRewardSpecial(specialPos) {
  const searchR = GAME_CONFIG.specialExplosionSearchRadiusPx;
  const affects = new Set(GAME_CONFIG.specialSpawnExplosionAffectsTypes);
  const denies = new Set(GAME_CONFIG.specialSpawnExplosionDoesNotAffectTypes);
  const candidates = [];

  for (const item of game.items) {
    if (denies.has(item.type)) continue;
    if (!affects.has(item.type)) continue;
    const dx = item.pos.x - specialPos.x;
    const dy = item.pos.y - specialPos.y;
    if (dx * dx + dy * dy <= searchR * searchR) {
      candidates.push(item);
    }
  }

  if (candidates.length > 0) {
    const target = candidates[Math.floor(Math.random() * candidates.length)];
    return clampPos(
      {
        x: target.pos.x + randomRange(-GAME_CONFIG.specialExplosionCenterJitterPx, GAME_CONFIG.specialExplosionCenterJitterPx),
        y: target.pos.y + randomRange(-GAME_CONFIG.specialExplosionCenterJitterPx, GAME_CONFIG.specialExplosionCenterJitterPx),
      },
      2
    );
  }

  return clampPos(
    {
      x: specialPos.x + randomRange(-GAME_CONFIG.specialExplosionFallbackJitterPx, GAME_CONFIG.specialExplosionFallbackJitterPx),
      y: specialPos.y + randomRange(-GAME_CONFIG.specialExplosionFallbackJitterPx, GAME_CONFIG.specialExplosionFallbackJitterPx),
    },
    2
  );
}

function handleLinkedClick(item) {
  const stageCfg = getStageConfig(game.stage);
  const windowMs = stageCfg.specialTypeParams.linked.pairClickWindowSec * 1000;

  if (!game.linkedPending || game.linkedPending.pairId !== item.pairId) {
    game.linkedPending = {
      pairId: item.pairId,
      firstItemId: item.id,
      expiresAtMs: game.elapsedMs + windowMs,
    };
    spawnBurstParticles(item.pos.x, item.pos.y, "#9dd8ff", 8);
    return;
  }

  if (game.elapsedMs > game.linkedPending.expiresAtMs || game.linkedPending.firstItemId === item.id) {
    game.linkedPending = {
      pairId: item.pairId,
      firstItemId: item.id,
      expiresAtMs: game.elapsedMs + windowMs,
    };
    return;
  }

  const firstId = game.linkedPending.firstItemId;
  game.linkedPending = null;
  removeItemById(firstId);
  removeItemById(item.id);
  spawnBurstParticles(item.pos.x, item.pos.y, "#9ff4ff", 16);
}

function isItemClickableNow(item) {
  if (item.alwaysClickable) return true;
  if (!item.clickable) return false;
  if (item.ignoreTargetRule) return true;
  if (item.level <= 0) return false;

  const target = getCurrentTargetLevel();
  if (target == null) return false;
  return item.level === target;
}

function getCurrentTargetLevel() {
  let min = null;
  for (const item of game.items) {
    if (!item.clickable || item.ignoreTargetRule || item.level <= 0) continue;
    if (min == null || item.level < min) min = item.level;
  }
  return min;
}

function removeItemById(id) {
  const idx = game.items.findIndex((it) => it.id === id);
  if (idx >= 0) game.items.splice(idx, 1);
}

function isLv1FruitMaterial(item) {
  return item.level === 1 && (item.type === "fruit" || item.type === "mutant");
}

function isSplittableFruitType(item) {
  return (item.type === "fruit" || item.type === "mutant" || item.type === "grower") && item.canSplit;
}

function createFruitItemWithPlacement(level, bloodline, anchorPos) {
  if (game.items.length >= GAME_CONFIG.maxItems) return null;
  const item = createBaseItem("fruit", {
    level,
    bloodline: bloodline || "A",
    clickable: true,
    canSplit: level > 1,
    splitInterval: GAME_CONFIG.earlySplitByLevel,
    timers: { splitTimer: 0 },
  });
  initializeSplitTimer(item);
  item.pos = findNonOverlappingPos(item.radius, anchorPos);
  item.vel = { x: randomRange(-42, 42), y: randomRange(-42, 42) };
  return item;
}

function findNonOverlappingPos(radius, anchorPos, jitterPx = 42, tries = 10) {
  for (let i = 0; i < tries; i += 1) {
    const pos =
      i < 5 && anchorPos
        ? clampPos({ x: anchorPos.x + randomRange(-jitterPx, jitterPx), y: anchorPos.y + randomRange(-jitterPx, jitterPx) }, radius)
        : randomSpawnPos(radius);
    if (!isOverlappingExisting(pos, radius)) return pos;
  }
  return anchorPos ? clampPos(anchorPos, radius) : randomSpawnPos(radius);
}

function isOverlappingExisting(pos, radius) {
  for (const other of game.items) {
    const minDist = radius + other.radius + 2;
    const dx = pos.x - other.pos.x;
    const dy = pos.y - other.pos.y;
    if (dx * dx + dy * dy < minDist * minDist) return true;
  }
  return false;
}

function pickRandomItems(arr, count) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function averagePos(items) {
  let x = 0;
  let y = 0;
  for (const it of items) {
    x += it.pos.x;
    y += it.pos.y;
  }
  return { x: x / items.length, y: y / items.length };
}

function pickBloodlineFromDonors(donors) {
  if (!donors || donors.length === 0) return "A";
  const countA = donors.filter((b) => b === "A").length;
  const countB = donors.length - countA;
  if (countA === countB) return donors[Math.floor(Math.random() * donors.length)];
  return countB > countA ? "B" : "A";
}

function countSplittableItemsExcluding(skipId) {
  let n = 0;
  for (const item of game.items) {
    if (item.id === skipId) continue;
    if (item.canSplit && item.level > 1) n += 1;
  }
  return n;
}

function getPointerPos(event) {
  const rect = canvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function getItemAt(x, y) {
  const hitPadding = game.pointerType === "touch" ? GAME_CONFIG.touchHitPaddingPx : GAME_CONFIG.mouseHitPaddingPx;
  for (let i = game.items.length - 1; i >= 0; i -= 1) {
    const it = game.items[i];
    const drawPos = getDrawPos(it);
    const dx = x - drawPos.x;
    const dy = y - drawPos.y;
    const hr = it.radius + hitPadding;
    if (dx * dx + dy * dy <= hr * hr) return it;
  }
  return null;
}

function render() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  ctx.save();
  if (game.screenShakeMs > 0) {
    const s = 1.6;
    ctx.translate((Math.random() - 0.5) * s, (Math.random() - 0.5) * s);
  }
  ctx.clearRect(0, 0, w, h);
  drawGrid(w, h);

  for (const item of game.items) {
    drawItem(item);
  }

  drawShockwaves();
  drawParticles();
  if (game.flashMs > 0) {
    const a = clamp(game.flashMs / 90, 0, 1) * 0.22;
    ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.restore();
  drawCanvasHint();
}

function drawGrid(w, h) {
  ctx.save();
  ctx.strokeStyle = "#ffffff0f";
  ctx.lineWidth = 1;
  const step = 36;
  for (let x = 0; x <= w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawItem(item) {
  const p = getDrawPos(item);
  const age = getAgeState(item.ageSec);
  const baseColor = getItemBaseColor(item);
  const isBombHovered = item.type === "bomb" && (game.hoveredItemId === item.id || game.pressedItemId === item.id);
  const highlightPulse = item.isHighlighted ? 1 + Math.sin((game.elapsedMs + item.id * 12) / 180) * 0.05 : 1;
  const localRadius = item.radius * (isBombHovered ? 1.08 : 1) * highlightPulse;

  ctx.save();
  let alpha = item.level > 0 ? age.alpha : 0.92;
  if (item.timers.bombFadeSec) {
    alpha *= Math.max(0, item.timers.bombFadeSec / item.timers.bombFadeMaxSec);
  }
  ctx.globalAlpha = alpha;
  if (item.timers.lv1PreWarn) {
    ctx.fillStyle = "#00000033";
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + localRadius * 0.96, localRadius * 1.15, localRadius * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (item.type === "special") {
    drawSpecial(item, p.x, p.y, localRadius);
  } else if (item.type === "bomb") {
    drawBomb(item, p.x, p.y, localRadius, isBombHovered);
  } else if (item.type === "storm") {
    drawStorm(item, p.x, p.y, localRadius);
  } else if (item.type === "spawner") {
    drawSpawner(item, p.x, p.y, localRadius);
  } else {
    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.shadowBlur = 7;
    const grad = ctx.createRadialGradient(p.x - localRadius * 0.28, p.y - localRadius * 0.28, localRadius * 0.1, p.x, p.y, localRadius);
    grad.addColorStop(0, "#ffffffc5");
    grad.addColorStop(0.25, baseColor);
    grad.addColorStop(1, shadeColor(baseColor, -30));

    ctx.beginPath();
    ctx.arc(p.x, p.y, localRadius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = shadeColor(baseColor, -38);
    ctx.lineWidth = 1.3;
    ctx.stroke();

    ctx.fillStyle = "#ffffffaa";
    ctx.beginPath();
    ctx.arc(p.x + localRadius * 0.32, p.y - localRadius * 0.34, Math.max(2, localRadius * 0.14), 0, Math.PI * 2);
    ctx.fill();

    if (item.level > 0 && age.jitter > 0) {
      const speckles = age === GAME_CONFIG.ageState.rotten ? 5 : 3;
      ctx.fillStyle = "rgba(20,20,20,0.2)";
      for (let i = 0; i < speckles; i += 1) {
        const a = (Math.PI * 2 * ((item.id * 13 + i * 17) % 37)) / 37;
        const rr = localRadius * randomNoiseFromSeed(item.id * 53 + i, game.elapsedMs * 0.001) * 0.72;
        ctx.beginPath();
        ctx.arc(p.x + Math.cos(a) * rr, p.y + Math.sin(a) * rr, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const bloodlineStroke = item.bloodline === "B" ? "#ff6868" : GAME_CONFIG.bloodlineColor[item.bloodline || "none"];
  ctx.lineWidth = 3;
  ctx.strokeStyle = bloodlineStroke;
  ctx.beginPath();
  ctx.arc(p.x, p.y, localRadius, 0, Math.PI * 2);
  ctx.stroke();
  if (item.bloodline === "B") {
    ctx.fillStyle = "#ff5f67";
    ctx.beginPath();
    ctx.arc(p.x + localRadius * 0.52, p.y - localRadius * 0.52, 4.2, 0, Math.PI * 2);
    ctx.fill();
  }

  if (item.isHighlighted) {
    const glowA = 0.35 + Math.sin((game.elapsedMs + item.id * 18) / 160) * 0.12;
    ctx.strokeStyle = `rgba(120,238,255,${clamp(glowA, 0.1, 0.52).toFixed(3)})`;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(p.x, p.y, localRadius + 5, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawItemText(item, p.x, p.y, localRadius);

  if (game.linkedPending && item.type === "linked" && item.pairId === game.linkedPending.pairId) {
    ctx.strokeStyle = "#9cf8ff";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.arc(p.x, p.y, localRadius + 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  if (item.timers.lv1PreWarn) {
    ctx.strokeStyle = "#303030";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(p.x, p.y, localRadius + 4, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (item.timers.lv1Marked) {
    const blink = 0.55 + 0.45 * Math.sin((game.elapsedMs + item.id * 37) / 90);
    ctx.strokeStyle = `rgba(255,84,84,${clamp(blink, 0.35, 1).toFixed(3)})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(p.x, p.y, localRadius + 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#ffd9d9";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("⚠", p.x, p.y - localRadius - 10);
  }

  if (item.type === "bomb" && isBombHovered && GAME_CONFIG.enableBombRangePreview) {
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = "#ffc181";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.arc(p.x, p.y, GAME_CONFIG.bombRadiusPx, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.restore();
}

function drawSpecial(item, x, y, drawRadius) {
  const r = drawRadius;
  const source = item.specialSource || "idlePunish";
  const main = source === "clearReward" ? "#a6f6ff" : "#cfa8ff";
  const glow = source === "clearReward" ? "#71e8ff" : "#a67dff";
  ctx.beginPath();
  for (let i = 0; i < 6; i += 1) {
    const a = (Math.PI * 2 * i) / 6 + Math.PI / 6;
    const rr = i % 2 === 0 ? r : r * 0.54;
    const px = x + Math.cos(a) * rr;
    const py = y + Math.sin(a) * rr;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = main;
  ctx.shadowColor = glow;
  ctx.shadowBlur = 14;
  ctx.fill();
  ctx.shadowBlur = 0;

  const delay = item.timers.specialSplitDelaySec || GAME_CONFIG.specialSplitDelayIdlePunishSec;
  const progress = clamp((item.timers.specialElapsed || 0) / Math.max(0.01, delay), 0, 1);
  ctx.strokeStyle = source === "clearReward" ? "#d9feff" : "#ffe2ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, r + 4, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
  ctx.stroke();
}

function drawBomb(item, x, y, drawRadius, hovered) {
  const r = drawRadius;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "#3b3b3b";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + r * 0.35, y - r * 0.35, r * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff85";
  ctx.fill();
  ctx.strokeStyle = hovered ? "#ffbf7c" : "#ff9c7a";
  ctx.lineWidth = hovered ? 3 : 2;
  ctx.beginPath();
  ctx.moveTo(x + r * 0.1, y - r * 0.82);
  ctx.quadraticCurveTo(x + r * 0.56, y - r * 1.25, x + r * 0.72, y - r * 0.5);
  ctx.stroke();
  ctx.fillStyle = hovered ? "#ffe07d" : "#ffd256";
  ctx.beginPath();
  ctx.arc(x + r * 0.75, y - r * 0.48, 2.6, 0, Math.PI * 2);
  ctx.fill();
}

function drawStorm(item, x, y, drawRadius) {
  const r = drawRadius;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "#9fb4c4";
  ctx.fill();
}

function drawSpawner(item, x, y, drawRadius) {
  const r = drawRadius;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.lineTo(x + r, y);
  ctx.lineTo(x, y + r);
  ctx.lineTo(x - r, y);
  ctx.closePath();
  ctx.fillStyle = "#ffde9c";
  ctx.fill();
}

function drawItemText(item, x, y, drawRadius) {
  const typeIcon = TYPE_META[item.type]?.icon || "?";
  let main = typeIcon;
  if (item.level > 0 && (item.type === "fruit" || item.type === "mutant" || item.type === "grower" || item.type === "timer" || item.type === "linked")) {
    main = LEVEL_DEF[item.level].emoji;
  }

  ctx.fillStyle = "#00000075";
  ctx.font = `${Math.max(12, Math.floor(drawRadius * 0.85))}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(main, x, y - 2);

  const tag = item.level > 0 ? `Lv${item.level}` : item.type.toUpperCase();
  ctx.fillStyle = "#ffffffee";
  ctx.font = `${Math.max(9, Math.floor(drawRadius * 0.34))}px sans-serif`;
  ctx.fillText(tag, x, y + drawRadius * 0.6);
}

function drawCanvasHint() {
  const target = getCurrentTargetLevel();
  const targetText = target == null ? "-" : `${LEVEL_DEF[target].emoji} ${target}${I18N_ZH.levelSuffix}`;
  const c = getConvergenceRatio(game.stage);

  ctx.save();
  ctx.fillStyle = "#00000084";
  ctx.fillRect(10, 10, 360, 36);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(`${I18N_ZH.stage} ${game.stage} | ${I18N_ZH.target} ${targetText} | ${I18N_ZH.convergence} ${(c * 100).toFixed(0)}%`, 18, 28);
  if (GAME_CONFIG.debugShowLv6SplitTimer) {
    const lv6 = game.items.find((it) => it.level === 6 && it.canSplit);
    const st = lv6 ? getSplitTimer(lv6) : Number.NaN;
    const t = lv6 ? (Number.isFinite(st) ? st.toFixed(2) : I18N_ZH.invalid) : "-";
    ctx.fillText(`6级计时：${t}${Number.isFinite(st) ? I18N_ZH.secondSuffix : ""}`, 18, 48);
  }
  ctx.restore();

  if (GAME_CONFIG.debugSplit) {
    drawSplitDebugOverlay();
  }
}

function drawSplitDebugOverlay() {
  const lv6List = game.items.filter((it) => isSplittableFruitType(it) && it.level === 6);
  const lines = [`${I18N_ZH.lv6Count}：${lv6List.length}`];
  for (const it of lv6List) {
    const st = getSplitTimer(it);
    const bad = !Number.isFinite(st) || Number.isNaN(st);
    lines.push(`#${it.id} ${bad ? I18N_ZH.invalid : `${st.toFixed(2)}${I18N_ZH.secondSuffix}`}`);
  }

  const pad = 8;
  const lineH = 16;
  const w = 240;
  const h = pad * 2 + Math.max(1, lines.length) * lineH;
  const x = canvas.clientWidth - w - 10;
  const y = 10;

  ctx.save();
  ctx.fillStyle = "#0b1320d6";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#ffffff2e";
  ctx.strokeRect(x, y, w, h);
  ctx.font = "12px monospace";
  ctx.textBaseline = "top";
  for (let i = 0; i < lines.length; i += 1) {
    const isBad = lines[i].includes(I18N_ZH.invalid);
    ctx.fillStyle = isBad ? "#ff6b6b" : "#e8f1ff";
    ctx.fillText(lines[i], x + pad, y + pad + i * lineH);
  }
  ctx.restore();
}

function syncHud() {
  stageEl.textContent = String(game.stage);
  const target = getCurrentTargetLevel();
  targetEl.textContent = target == null ? "-" : `${target}${I18N_ZH.levelSuffix}`;
  countEl.textContent = `${game.items.length}/${GAME_CONFIG.maxItems}`;
  unlockedEl.textContent = getUnlockedTypes(game.stage)
    .map((t) => TYPE_META[t].icon)
    .join(" ");
}

function getUnlockedTypes(stage) {
  return GAME_CONFIG.unlockedByStage.filter((x) => x.stage <= stage).map((x) => x.type);
}

function getAgeState(ageSec) {
  if (ageSec >= GAME_CONFIG.ageState.rotten.minSec) return GAME_CONFIG.ageState.rotten;
  if (ageSec >= GAME_CONFIG.ageState.ripe.minSec) return GAME_CONFIG.ageState.ripe;
  return GAME_CONFIG.ageState.fresh;
}

function getDrawPos(item) {
  const age = getAgeState(item.ageSec);
  const jitter = age.jitter * (item.bloodline === "B" ? 1.2 : 1.0);
  return {
    x: item.pos.x + (jitter ? Math.sin((game.elapsedMs + item.id * 9) / 100) * jitter : 0),
    y: item.pos.y + (jitter ? Math.cos((game.elapsedMs + item.id * 7) / 110) * jitter : 0),
  };
}

function getItemBaseColor(item) {
  if (item.level > 0 && LEVEL_DEF[item.level]) return LEVEL_DEF[item.level].color;
  const map = {
    special: "#9af7ff",
    bomb: "#3b3b3b",
    grower: "#7ddf7a",
    timer: "#ffd188",
    mutant: "#a86dff",
    spawner: "#ffde9c",
    linked: "#81d5ff",
    storm: "#a8b9cf",
  };
  return map[item.type] || "#cccccc";
}

function gameOver() {
  game.over = true;
  game.running = false;
  emitFxEvent("onGameOver");
  finalStageEl.textContent = `${I18N_ZH.reachedStage}：${game.stage}`;
  overlayEl.classList.remove("hidden");
}

function showBanner(text) {
  stageBannerEl.textContent = text;
  stageBannerEl.classList.remove("hidden");
}

function hideBanner() {
  stageBannerEl.classList.add("hidden");
}

function spawnBurstParticles(x, y, color, count) {
  if (game.particles.length >= GAME_CONFIG.particleCap) return;
  const remain = Math.max(0, GAME_CONFIG.particleCap - game.particles.length);
  const spawnCount = Math.min(count, remain);
  for (let i = 0; i < spawnCount; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = randomRange(28, 140);
    const p = game.particlePool.pop() || {};
    p.x = x;
    p.y = y;
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed;
    p.lifeSec = randomRange(0.18, 0.55);
    p.maxLifeSec = 0.55;
    p.size = randomRange(1.2, 3.8);
    p.color = color;
    p.shape = Math.random() < 0.2 ? "triangle" : "circle";
    game.particles.push(p);
  }
}

function updateParticles(dtSec) {
  if (game.particles.length === 0) return;

  const next = [];
  for (const p of game.particles) {
    p.lifeSec -= dtSec;
    if (p.lifeSec <= 0) {
      if (game.particlePool.length < GAME_CONFIG.particlePoolCap) game.particlePool.push(p);
      continue;
    }
    p.x += p.vx * dtSec;
    p.y += p.vy * dtSec;
    p.vy += 35 * dtSec;
    next.push(p);
  }
  game.particles = next;
}

function spawnShockwave(x, y, radiusMax, color = "#ffdca6") {
  game.shockwaves.push({
    type: "ring",
    x,
    y,
    radius: 0,
    maxRadius: radiusMax,
    lifeSec: 0.22,
    maxLifeSec: 0.22,
    color,
  });
}

function updateShockwaves(dtSec) {
  if (game.shockwaves.length === 0) return;
  const next = [];
  for (const w of game.shockwaves) {
    w.lifeSec -= dtSec;
    if (w.lifeSec <= 0) continue;
    if (w.type === "ring") {
      const t = 1 - w.lifeSec / w.maxLifeSec;
      w.radius = w.maxRadius * t;
    }
    next.push(w);
  }
  game.shockwaves = next;
}

function drawShockwaves() {
  for (const w of game.shockwaves) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, w.lifeSec / w.maxLifeSec);
    if (w.type === "beam") {
      ctx.strokeStyle = w.color || "#c8f8ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w.x1, w.y1);
      ctx.lineTo(w.x2, w.y2);
      ctx.stroke();
    } else {
      ctx.strokeStyle = w.color || "#ffdca6";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawParticles() {
  for (const p of game.particles) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.lifeSec / p.maxLifeSec);
    ctx.fillStyle = p.color;
    if (p.shape === "triangle") {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - p.size);
      ctx.lineTo(p.x + p.size, p.y + p.size * 0.9);
      ctx.lineTo(p.x - p.size, p.y + p.size * 0.9);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function randomSpawnPos(radius) {
  return {
    x: randomRange(radius + 6, canvas.clientWidth - radius - 6),
    y: randomRange(radius + 6, canvas.clientHeight - radius - 6),
  };
}

function clampPos(pos, radius) {
  return {
    x: clamp(pos.x, radius + 2, canvas.clientWidth - radius - 2),
    y: clamp(pos.y, radius + 2, canvas.clientHeight - radius - 2),
  };
}

function weightedPick(pairs) {
  const r = Math.random();
  let acc = 0;
  for (const [value, weight] of pairs) {
    acc += weight;
    if (r <= acc) return value;
  }
  return pairs[pairs.length - 1][0];
}

function randomRange(min, max) {
  if (max <= min) return min;
  return min + Math.random() * (max - min);
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function clamp01(v) {
  return clamp(v, 0, 1);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function randomNoiseFromSeed(seed, t) {
  const x = Math.sin(seed * 12.9898 + t * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function shadeColor(hexColor, percent) {
  const c = hexColor.replace("#", "");
  const num = Number.parseInt(c, 16);
  const amt = Math.round(2.55 * percent);
  const r = clamp((num >> 16) + amt, 0, 255);
  const g = clamp(((num >> 8) & 0x00ff) + amt, 0, 255);
  const b = clamp((num & 0x0000ff) + amt, 0, 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

window.addEventListener("DOMContentLoaded", init);
