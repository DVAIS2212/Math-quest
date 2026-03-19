'use strict';

(function () {

// ================================================================
// CONSTANTS
// ================================================================
const SESSION_SECS   = 450;   // 7.5 minutes

// Hebrew display names (storage keys stay in English)
const HEB_NAME = { Noya: 'נויה', Miya: 'מיה' };

// "Did you know?" facts for the splash screen (age-appropriate for 8-year-olds)
const DID_YOU_KNOW = [
  '🦋 ידעת? פרפרים טועמים אוכל עם הרגליים שלהם!',
  '🐬 ידעת? דולפינים ישנים עם עין אחת פקוחה!',
  '🍯 ידעת? דבש לעולם לא מתקלקל — מצאו דבש בן 3,000 שנה במצרים!',
  '🐙 ידעת? לתמנון שלושה לבבות ודם בצבע כחול!',
  '🐘 ידעת? פילים הם החיות היחידות שלא יכולות לקפץ!',
  '🦄 ידעת? חד-קרן הוא החיה הלאומית של סקוטלנד!',
  '🌈 ידעת? קשת בענן היא עגולה — אנחנו רואים רק חצי ממנה מעל הקרקע!',
  '🐧 ידעת? פינגווינים מגישים אבנים אחד לשני כדי להראות אהבה!',
  '🐝 ידעת? דבורה אחת מייצרת רק כפית דבש אחת בכל חייה!',
  '🦒 ידעת? לג\'ירפה ולבני אדם יש בדיוק אותו מספר חוליות צוואר — 7!',
  '⭐ ידעת? בשמיים יש יותר כוכבים ממגרגרי חול על כל חופות הים בעולם!',
  '☀️ ידעת? השמש כל-כך גדולה שאפשר להכניס בתוכה מיליון כדורי-ארץ!',
  '🌿 ידעת? עצים מתקשרים זה עם זה דרך השורשים מתחת לאדמה!',
  '🐠 ידעת? כל הדגים בנמר המים יכולים לשנות את מינם במשך חייהם!',
  '🌸 ידעת? פרחי הדובדבן ביפן פורחים רק שבוע אחד בשנה ואנשים נוסעים לראות אותם!',
];
const displayName = name => HEB_NAME[name] || name;

const DEFAULT_READING_LEVEL = { Noya: 1, Miya: 2 };

const READING_TEXTS = [
  null, // index 0 unused
  // Level 1 — very simple (Noya starting level)
  [
    "I see a cat.\nThe cat is big.\nI can run.\nI am happy.",
    "I have a dog.\nThe dog runs.\nMy dog is fun.\nI love my dog.",
    "The sun is hot.\nI see a bee.\nThe bee is small.\nI can hop.",
    "A red ball.\nThe ball is big.\nI kick the ball.\nI run fast.",
  ],
  // Level 2 — simple (Miya starting level)
  [
    "The cat is small.\nThe cat is soft.\nThe cat sits in the sun.\nThe sun is warm.\nThe cat is happy.\nThe cat has a ball.\nThe ball is red.\nThe cat plays with the ball.\nThe cat is tired.\nThe cat goes to sleep.",
    "I have a pet fish.\nThe fish is blue.\nThe fish swims all day.\nI give my fish food.\nMy fish is happy.\nI love my pet fish.",
    "The dog runs in the park.\nThe park is big and green.\nA bird sits in a tree.\nThe bird sings a song.\nI walk in the park.\nI see red flowers.\nThe sky is bright and blue.",
  ],
  // Level 3 — more complex sentences
  [
    "My best friend is Anna.\nWe go to school together.\nWe like to draw pictures.\nAnna draws flowers and stars.\nI draw cats and dogs.\nOur teacher says they are great.\nWe feel very proud.",
    "Every morning I wake up early.\nI wash my face and brush my teeth.\nThen I eat a yummy breakfast.\nAfter breakfast I get dressed.\nI say goodbye to my mom.\nI walk to the school bus.",
    "The forest is a magical place.\nTall trees reach up to the sky.\nColorful birds sing in the branches.\nA little fox runs in the leaves.\nSunlight dances through the trees.\nI love to walk in the forest.",
    "Scientists discovered a fossil deep inside the mountain.\nThe fossil was millions of years old.\nIt showed the outline of a creature nobody had ever seen.\nThe team worked carefully to remove it from the stone.\nThey photographed every detail before moving it.\nBack at the lab, experts studied the ancient bones.\nIt turned out to be a brand new species.",
    "The library was filled with thousands of books.\nEach shelf held stories from places near and far.\nMia picked a book about a girl who sailed the ocean.\nShe read for hours without looking up.\nWhen she finally closed the book she felt different somehow.\nShe decided she would travel the world one day.\nBooks had given her the biggest dream of her life.",
  ],
  // Level 4 — longer, richer vocabulary
  [
    "Last summer we went to the beach.\nThe sand was warm between my toes.\nI built a big sandcastle by the water.\nMy sister helped me dig the moat.\nWe collected pretty shells along the shore.\nWe ate ice cream as the sun set.\nIt was the best day of the whole summer.",
    "Sophie loved reading more than anything.\nEvery night before bed she chose a book.\nShe read about dragons and treasure.\nOne night she read so long she fell asleep.\nHer mom found her with the book on her face.\nSophie smiled as her mom turned off the light.\nShe was already dreaming of her next adventure.",
    "My grandmother makes amazing soup.\nShe adds carrots, potatoes, and noodles.\nThe soup simmers all morning on the stove.\nThe whole house smells warm and cozy.\nWhen the soup is ready we all sit together.\nGrandmother ladles it into our bowls.\nThere is nothing better on a cold winter day.",
    "The ancient castle stood on a towering cliff above the valley.\nIts crumbling stone walls had survived hundreds of years of storms.\nNarrow windows looked out over the misty landscape below.\nA curious girl named Ella crept through the enormous wooden gates.\nShe imagined knights in armor and royal banquets long ago.\nEvery dusty corridor seemed to whisper a mysterious story.\nElla decided she would return with her sketchbook tomorrow.",
    "The market was alive with extraordinary colors and delicious smells.\nVendors called out to strangers in cheerful, booming voices.\nPyramids of brilliant fruit gleamed beneath the morning sun.\nAn elderly woman sold delicate handwoven baskets in the corner.\nMia wandered slowly through the narrow aisles, fascinated by everything.\nShe spent her last coins on a small hand-painted vase.\nIt reminded her that the most beautiful things are often simple.",
  ],
  // Level 5 — advanced vocabulary and complex sentences
  [
    "The ocean covers most of our planet Earth.\nBeneath the waves lives an astonishing world of creatures.\nColorful fish dart through magnificent coral reefs.\nOctopuses disguise themselves in dark underwater caves.\nWhales communicate with each other across tremendous distances.\nScientists are still discovering extraordinary new species every year.\nThe ocean holds countless mysteries that remain unexplored.",
    "Rosa loved to paint more than anything else in the world.\nShe spent every afternoon in her sunlit art studio.\nHer paintings were full of bold, unexpected colors and wild shapes.\nOne day her teacher displayed her work throughout the entire school.\nEveryone paused to admire the spectacular paintings on the wall.\nRosa felt a warm glow of pride deep inside her chest.\nShe was more certain than ever that she was born to be an artist.",
    "Zara and her father gazed up at the vast night sky.\nThousands of glittering stars sparkled against the darkness.\nZara asked how far away those distant points of light really were.\nHer father explained that some were so remote their light takes years to arrive.\nZara contemplated the enormous scale of the universe in silence.\nPerhaps on a distant planet another curious girl was looking back at our sun.\nThat breathtaking idea made Zara smile the whole way home.",
    "Bioluminescence is the remarkable ability of living organisms to produce their own light.\nDeep ocean creatures rely on this phenomenon to navigate perpetual darkness.\nScientists believe this extraordinary adaptation evolved independently in hundreds of species.\nFireflies use their astonishing flashes to communicate above summer meadows.\nThe chemical reaction involves a compound called luciferin combining with oxygen.\nResearchers are investigating whether this process could inspire sustainable lighting technologies.\nNature continues to astonish us with its ingenious solutions to complex problems.",
    "Every language in the world shapes the way its speakers perceive reality.\nSome languages have dozens of distinct words to describe different types of snow.\nOthers possess a single precise word for the bittersweet feeling of something ending.\nLinguists who study these differences have made a fascinating and profound discovery.\nThe vocabulary available to us actually influences the thoughts we are capable of thinking.\nThis means that learning a new language is not merely a skill but a transformation.\nEach new word you master becomes a new lens through which to interpret the world.",
  ],
];

const MAX_WEIGHT     = 10.0;
const MIN_WEIGHT     = 0.1;
const RECENT_CAP     = 40;    // keep last 40 equations out of daily rotation
const BUCKET_RESET_DAYS = 7;  // reset history every 7 days

// ================================================================
// TOP-LEVEL STATE
// ================================================================
let currentPlayer    = null;  // player data object (from storage)
let sessionState     = null;  // active session
let sessionTimer     = null;  // setInterval handle
let audioCtx         = null;  // Web Audio context (lazy)
let settingsFrom     = 'splash';
let readingState     = null;
let speechRec        = null;

// Pick the most natural-sounding English TTS voice available
function getBestVoice() {
  const voices   = speechSynthesis.getVoices();
  const preferred = ['Samantha', 'Google US English', 'Microsoft Aria', 'Karen', 'Moira', 'Tessa', 'Alex'];
  for (const name of preferred) {
    const v = voices.find(v => v.name.includes(name));
    if (v) return v;
  }
  return voices.find(v => v.lang === 'en-US') ||
         voices.find(v => v.lang.startsWith('en')) ||
         null;
}

// ================================================================
// STORAGE
// ================================================================
const Store = {
  _key: (type, name) => `mathgame_${type}_${name.toLowerCase()}`,

  getPlayer(name) {
    const raw = localStorage.getItem(this._key('player', name));
    return raw ? JSON.parse(raw) : null;
  },
  savePlayer(name, data) {
    localStorage.setItem(this._key('player', name), JSON.stringify(data));
  },
  newPlayer(name) {
    const p = {
      name,
      totalStars:    0,
      currentStreak: 0,
      longestStreak: 0,
      lastPlayDate:  null,
      totalSessions: 0,
      totalCorrect:  0,
      soundEnabled:  true,
      lastSessionType: 'mixed',
      lastSessionStats: null
    };
    this.savePlayer(name, p);
    return p;
  },

  getWeights(name) {
    const raw = localStorage.getItem(this._key('weights', name));
    return raw ? JSON.parse(raw) : {};
  },
  saveWeights(name, w) {
    localStorage.setItem(this._key('weights', name), JSON.stringify(w));
  },

  getHistory(name) {
    const raw = localStorage.getItem(this._key('history', name));
    if (!raw) return { recent: [], dayBucket: 0, bucketResetDate: null };
    return JSON.parse(raw);
  },
  saveHistory(name, h) {
    localStorage.setItem(this._key('history', name), JSON.stringify(h));
  },

  resetPlayer(name) {
    ['player','weights','history','reading','daily'].forEach(t =>
      localStorage.removeItem(this._key(t, name))
    );
  },

  getDailyCompletion(name) {
    const raw   = localStorage.getItem(this._key('daily', name));
    const today = todayStr();
    if (!raw) return { date: today, math: false, english: false };
    const data = JSON.parse(raw);
    if (data.date !== today) return { date: today, math: false, english: false };
    return data;
  },
  saveDailyCompletion(name, data) {
    localStorage.setItem(this._key('daily', name), JSON.stringify(data));
  },

  getReadingData(name) {
    const raw = localStorage.getItem(this._key('reading', name));
    if (raw) return JSON.parse(raw);
    return { level: DEFAULT_READING_LEVEL[name] || 1, consecutiveGood: 0 };
  },
  saveReadingData(name, data) {
    localStorage.setItem(this._key('reading', name), JSON.stringify(data));
  }
};

// ================================================================
// EQUATION ENGINE
// ================================================================
const Equations = {
  pool: [],

  build() {
    this.pool = [];
    const divSeen = new Set();

    // All 100 multiplication facts (1–10 × 1–10)
    for (let a = 1; a <= 10; a++) {
      for (let b = 1; b <= 10; b++) {
        this.pool.push({
          key: `mul_${a}_${b}`,
          type: 'mul',
          a, b,
          answer: a * b,
          display: `${a} \u00d7 ${b}` // ×
        });

        // Derive unique division facts
        const prod = a * b;
        const dk1 = `div_${prod}_${b}`;  // prod ÷ b = a
        const dk2 = `div_${prod}_${a}`;  // prod ÷ a = b

        if (!divSeen.has(dk1) && b >= 2 && a >= 1) {
          divSeen.add(dk1);
          this.pool.push({
            key: dk1,
            type: 'div',
            dividend: prod, divisor: b, answer: a,
            display: `${prod} \u00f7 ${b}` // ÷
          });
        }
        if (!divSeen.has(dk2) && a >= 2 && b >= 1) {
          divSeen.add(dk2);
          this.pool.push({
            key: dk2,
            type: 'div',
            dividend: prod, divisor: a, answer: b,
            display: `${prod} \u00f7 ${a}` // ÷
          });
        }
      }
    }

    // Addition facts: a+b where 1 ≤ a ≤ b ≤ 10 (55 unique facts, sums 2–20)
    // Subtraction derived: (a+b)−a=b for each pair where a < b (45 facts)
    for (let a = 1; a <= 10; a++) {
      for (let b = a; b <= 10; b++) {
        const sum = a + b;
        this.pool.push({
          key:     `add_${a}_${b}`,
          type:    'add',
          a, b,
          answer:  sum,
          display: `${a} + ${b}`
        });
        if (a < b) {
          // sum − a = b
          this.pool.push({
            key:     `sub_${sum}_${a}`,
            type:    'sub',
            a:       sum, b: a,
            answer:  b,
            display: `${sum} \u2212 ${a}` // −
          });
          // sum − b = a
          this.pool.push({
            key:     `sub_${sum}_${b}`,
            type:    'sub',
            a:       sum, b,
            answer:  a,
            display: `${sum} \u2212 ${b}` // −
          });
        }
      }
    }

    // Round-number addition/subtraction with multiples of 10 (up to 100)
    // Use 't' prefix keys to avoid collision with the 1-10 range above
    const TENS = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    for (const a of TENS) {
      for (const b of TENS) {
        if (a > b) continue; // use a ≤ b only
        const sum = a + b;
        if (sum > 100) continue;
        this.pool.push({ key: `addt_${a}_${b}`, type: 'add', a, b, answer: sum, display: `${a} + ${b}` });
        if (a < b) {
          this.pool.push({ key: `subt_${sum}_${a}`, type: 'sub', a: sum, b: a, answer: b, display: `${sum} \u2212 ${a}` });
          this.pool.push({ key: `subt_${sum}_${b}`, type: 'sub', a: sum, b,    answer: a, display: `${sum} \u2212 ${b}` });
        }
      }
    }
  },

  byKey(key) {
    return this.pool.find(e => e.key === key) || null;
  },

  // Build per-session effective weights, honouring daily rotation
  sessionWeights(weights, history) {
    const today = todayStr();
    let hist = history;

    // Reset bucket every N days
    if (!hist.bucketResetDate ||
        daysBetween(hist.bucketResetDate, today) >= BUCKET_RESET_DAYS) {
      hist.recent = [];
      hist.dayBucket = 0;
      hist.bucketResetDate = today;
    }

    const recentSet = new Set(hist.recent.slice(-RECENT_CAP));

    return this.pool.map(eq => {
      const w = weights[eq.key];
      let weight = w ? w.weight : 1.0;

      // Suppress recently-seen equations for today
      if (recentSet.has(eq.key)) weight *= 0.05;

      return { eq, weight };
    });
  },

  // Weighted random pick, excluding already-shown this session
  pick(effectiveWeights, shown) {
    const eligible = effectiveWeights.filter(({ eq }) => !shown.has(eq.key));
    if (!eligible.length) return null;
    const total = eligible.reduce((s, { weight }) => s + weight, 0);
    let r = Math.random() * total;
    for (const { eq, weight } of eligible) {
      r -= weight;
      if (r <= 0) return eq;
    }
    return eligible[eligible.length - 1].eq;
  },

  // Top-N weakest equations (highest weight)
  weakest(effectiveWeights, n) {
    return [...effectiveWeights]
      .sort((a, b) => b.weight - a.weight)
      .slice(0, n)
      .map(x => x.eq);
  },

  // Generate 3 plausible wrong answers
  wrongAnswers(correct) {
    const wrongs = new Set();
    const strategies = [
      () => correct + 1,
      () => Math.max(1, correct - 1),
      () => correct + 2,
      () => Math.max(1, correct - 2),
      () => correct + (correct > 10 ? 10 : 5),
      () => Math.max(2, correct - (correct > 10 ? 10 : 5)),
      () => Math.round(correct * 1.4),
      () => Math.max(2, Math.round(correct * 0.65)),
      () => correct + Math.floor(Math.random() * 6) + 3,
      () => Math.max(2, correct - Math.floor(Math.random() * 6) - 3),
    ];
    for (const fn of shuffle([...strategies])) {
      if (wrongs.size >= 3) break;
      const v = fn();
      if (v > 0 && v !== correct && !wrongs.has(v)) wrongs.add(v);
    }
    // Fallback: random offset
    let attempts = 0;
    while (wrongs.size < 3 && attempts++ < 50) {
      const off = Math.floor(Math.random() * 20) + 1;
      const v = correct + (Math.random() < 0.5 ? off : -off);
      if (v > 0 && v !== correct && !wrongs.has(v)) wrongs.add(v);
    }
    return Array.from(wrongs);
  }
};

// ================================================================
// SOUND ENGINE  (Web Audio API, no external files)
// ================================================================
const Sound = {
  ctx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { return null; }
    }
    return audioCtx;
  },
  enabled() { return !!(currentPlayer && currentPlayer.soundEnabled); },

  _tone(freq, type, dur, gain, delay = 0) {
    const ctx = this.ctx();
    if (!ctx || !this.enabled()) return;
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.connect(g);
    g.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    g.gain.setValueAtTime(gain, ctx.currentTime + delay);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + dur);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + dur + 0.01);
  },

  correct() {
    this._tone(523, 'sine', 0.12, 0.28, 0.00);
    this._tone(659, 'sine', 0.12, 0.28, 0.11);
    this._tone(784, 'sine', 0.22, 0.28, 0.22);
  },
  wrong() {
    this._tone(220, 'sawtooth', 0.07, 0.12, 0.00);
    this._tone(165, 'sawtooth', 0.07, 0.12, 0.08);
  },
  complete() {
    [523, 659, 784, 1047].forEach((f, i) => this._tone(f, 'sine', 0.14, 0.25, i * 0.13));
    this._tone(1047, 'sine', 0.45, 0.2, 0.60);
  },
  star() {
    this._tone(1047, 'sine', 0.09, 0.18);
  },
  tick() {
    this._tone(440, 'triangle', 0.04, 0.04);
  },
  start() {
    const ctx = this.ctx();
    if (!ctx || !this.enabled()) return;
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.28);
    g.gain.setValueAtTime(0.18, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.30);
  }
};

// ================================================================
// ANIMATION CONTROLLER
// ================================================================
const Animate = {
  confetti(cx, cy) {
    const COLORS = ['#818cf8','#fbbf24','#34d399','#f87171','#3b82f6','#ec4899','#a78bfa','#fb923c'];
    const layer  = document.getElementById('confetti-layer');
    const pieces = [];

    for (let i = 0; i < 28; i++) {
      const el    = document.createElement('div');
      const size  = 6 + Math.random() * 9;
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 5;
      pieces.push({
        el,
        px: cx, py: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 7,
        rot: Math.random() * 360,
        rspd: (Math.random() - 0.5) * 18,
        op: 1
      });
      el.style.cssText = [
        'position:fixed',
        `left:${cx}px`,
        `top:${cy}px`,
        `width:${size}px`,
        `height:${size}px`,
        `background:${COLORS[i % COLORS.length]}`,
        `border-radius:${Math.random() > 0.5 ? '50%' : '3px'}`,
        'pointer-events:none',
        'z-index:1001'
      ].join(';');
      layer.appendChild(el);
    }

    let frame = 0;
    const run = () => {
      frame++;
      pieces.forEach(p => {
        p.px += p.vx;
        p.py += p.vy;
        p.vy += 0.38;
        p.vx *= 0.98;
        p.rot += p.rspd;
        p.op = Math.max(0, 1 - frame / 55);
        p.el.style.left      = p.px + 'px';
        p.el.style.top       = p.py + 'px';
        p.el.style.transform = `rotate(${p.rot}deg)`;
        p.el.style.opacity   = p.op;
      });
      if (frame < 65) requestAnimationFrame(run);
      else pieces.forEach(p => p.el.remove());
    };
    requestAnimationFrame(run);
  },

  floatText(text, x, y) {
    const el = document.createElement('div');
    el.textContent = text;
    el.style.cssText = [
      'position:fixed',
      `left:${x}px`,
      `top:${y}px`,
      'transform:translateX(-50%)',
      'font-size:20px',
      'font-weight:900',
      'color:#fbbf24',
      'pointer-events:none',
      'z-index:1002',
      'animation:floatUp 0.85s ease-out forwards'
    ].join(';');
    document.getElementById('float-layer').appendChild(el);
    setTimeout(() => el.remove(), 900);
  },

  pop(el) {
    if (!el) return;
    el.classList.remove('pop-anim');
    void el.offsetWidth;
    el.classList.add('pop-anim');
    setTimeout(() => el.classList.remove('pop-anim'), 350);
  },

  flash(msg, duration = 1400) {
    const el = document.getElementById('flash-msg');
    if (!el) return;
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.style.opacity = '0'; }, duration);
  }
};

// ================================================================
// STREAK MANAGER
// ================================================================
const Streak = {
  update(player) {
    const today = todayStr();
    const yest  = yesterdayStr();
    if (player.lastPlayDate === today) {
      return player; // already played today
    }
    if (player.lastPlayDate === yest) {
      player.currentStreak = (player.currentStreak || 0) + 1;
    } else if (!player.lastPlayDate) {
      player.currentStreak = 1;
    } else {
      player.currentStreak = 1; // streak broken
    }
    player.longestStreak = Math.max(player.longestStreak || 0, player.currentStreak);
    player.lastPlayDate  = today;
    return player;
  },

  message(player) {
    const name = displayName(player.name);
    const s    = player.currentStreak || 0;
    if (s === 0) return `${name}, מוכנה למשימה הראשונה שלך? 🚀`;
    if (s === 1) return `ברוכה השבה, ${name}! בואי נמריא! 🚀`;
    if (s <  4)  return `${name}, את על גל! ${s} ימים! 🔥`;
    if (s <  7)  return `מדהים, ${name}! ${s} ימי רצף! ⭐`;
    if (s < 14)  return `${name}, את גיבורת המתמטיקה! ${s} ימים! 🏆`;
    return `${name}, את אגדה! ${s} ימי רצף! 🌟`;
  }
};

// ================================================================
// SESSION
// ================================================================

// Weighted pick: 30% add/sub, 70% mul/div (biased 70% mul / 30% div within that)
function pickWithTypeBias(effectiveWeights, shown) {
  if (Math.random() < 0.30) {
    // 30% addition / subtraction
    const addSub = effectiveWeights.filter(({ eq }) => eq.type === 'add' || eq.type === 'sub');
    const picked = Equations.pick(addSub, shown);
    if (picked) return picked;
  }
  // 70% mul/div (or fallback if no add/sub available)
  const preferType = Math.random() < 0.7 ? 'mul' : 'div';
  const typed = effectiveWeights.filter(({ eq }) => eq.type === preferType);
  return Equations.pick(typed, shown) || Equations.pick(effectiveWeights, shown);
}

function createSession(player, weights, history) {
  const ew   = Equations.sessionWeights(weights, history);
  const weak = Equations.weakest(ew, 2);

  return {
    effectiveWeights:  ew,
    weakQueue:         [...weak],   // prefill with 2 weakest
    repeatQueue:       [],          // wrong answers come back here
    shown:             new Set(),
    qIndex:            0,           // question count this session
    elapsed:           0,           // seconds elapsed
    correct:           0,
    total:             0,
    sessionStars:      0,
    ansStreak:         0,
    bestStreak:        0,
    milestones:        [false, false, false],
    masteredKeys:      [],
    wrongKeys:         [],
    currentEq:         null,
    qStartTime:        null
  };
}

function nextEquation(state) {
  let eq = null;

  // ~30% chance to serve a failed repeat (after first 2 warm-up questions)
  if (state.repeatQueue.length && state.qIndex >= 2 && Math.random() < 0.30) {
    eq = state.repeatQueue.shift();
  }
  // Weak starters for the first 2 questions
  else if (state.weakQueue.length && state.qIndex < 2) {
    const cand = state.weakQueue.shift();
    eq = state.shown.has(cand.key)
      ? pickWithTypeBias(state.effectiveWeights, state.shown)
      : cand;
  }
  // 70% mul / 30% div weighted random
  else {
    eq = pickWithTypeBias(state.effectiveWeights, state.shown);
  }

  // Safety: if all shown, reset and try again
  if (!eq) {
    state.shown.clear();
    eq = pickWithTypeBias(state.effectiveWeights, state.shown);
  }
  if (!eq) eq = Equations.pool[0]; // absolute fallback

  state.shown.add(eq.key);
  state.currentEq   = eq;
  state.qStartTime  = Date.now();
  state.qIndex++;
  return eq;
}

// ================================================================
// UI / SCREENS
// ================================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(`screen-${id}`);
  if (el) el.classList.add('active');
}

function updateSplash() {
  ['Noya','Miya'].forEach(name => {
    const p  = Store.getPlayer(name);
    const el = document.getElementById(`stats-${name.toLowerCase()}`);
    if (!el) return;
    if (p) {
      const st = p.currentStreak > 0 ? ` · 🔥${p.currentStreak}` : '';
      el.textContent = `⭐ ${p.totalStars}${st}`;
    } else {
      el.textContent = '!חוקרת חדשה';
    }
  });

  // Pick a random "did you know?" fact
  const dykEl = document.getElementById('did-you-know');
  if (dykEl) {
    dykEl.textContent = DID_YOU_KNOW[Math.floor(Math.random() * DID_YOU_KNOW.length)];
  }
}

function showHome(player) {
  document.getElementById('home-player-name').textContent = displayName(player.name);
  document.getElementById('home-stars').textContent       = player.totalStars || 0;
  document.getElementById('home-streak').textContent      = player.currentStreak || 0;
  document.getElementById('home-message').textContent     = Streak.message(player);

  const badge = document.getElementById('streak-badge');
  badge.style.display = (player.currentStreak > 0) ? 'block' : 'none';

  const last = document.getElementById('home-last-stats');
  if (player.lastSessionStats) {
    const s = player.lastSessionStats;
    last.textContent = `פגישה אחרונה: ${s.correct}/${s.total} נכון · ${Math.round(s.accuracy * 100)}% דיוק`;
  } else {
    last.textContent = '!עדיין אין פגישות — התחילי את המשימה הראשונה';
  }

  showScreen('home');
}

function renderQuestion(eq, state) {
  document.getElementById('q-text').textContent   = eq.display + ' = ?';
  document.getElementById('s-stars-count').textContent = state.sessionStars;
  document.getElementById('q-counter').textContent = `שאלה ${state.qIndex}`;

  const wrongs  = Equations.wrongAnswers(eq.answer);
  const options = shuffle([eq.answer, ...wrongs]);

  document.querySelectorAll('.ans-btn').forEach((btn, i) => {
    btn.textContent = options[i];
    btn.dataset.val = options[i];
    btn.disabled    = false;
    btn.className   = 'ans-btn';
    btn.style.animationDelay = `${i * 55}ms`;
    btn.classList.add('ans-enter');
    // Remove class after animation so it doesn't interfere
    const delay = 350 + i * 55;
    setTimeout(() => btn.classList.remove('ans-enter'), delay);
  });
}

function updateProgress(elapsed) {
  const pct = Math.min(elapsed / SESSION_SECS, 1);
  document.getElementById('progress-fill').style.width = (pct * 100) + '%';

  const rocket = document.getElementById('p-rocket');
  rocket.style.left = Math.min(pct * 90, 90) + '%';

  const rem  = Math.max(0, SESSION_SECS - elapsed);
  const mins = Math.floor(rem / 60);
  const secs = rem % 60;
  const timerEl = document.getElementById('timer');
  timerEl.textContent = `${mins}:${String(secs).padStart(2,'0')}`;
  timerEl.classList.toggle('urgent', rem <= 30);
  if (rem <= 30 && rem % 2 === 0) Sound.tick();

  // Milestones at 113s (25%), 225s (50%), 338s (75%)
  [113, 225, 338].forEach((threshold, i) => {
    if (elapsed >= threshold && !sessionState.milestones[i]) {
      sessionState.milestones[i] = true;
      const ms = document.getElementById(`ms-${i + 1}`);
      ms.classList.add('collected');
      Sound.star();
      const r = ms.getBoundingClientRect();
      Animate.confetti(r.left + r.width / 2, r.top + r.height / 2);
    }
  });
}

function showResult(state, player) {
  const accuracy = state.total > 0 ? state.correct / state.total : 0;

  let title = '💪 המשיכי להתאמן!';
  if (accuracy >= 0.9) title = '🌟 משימה מושלמת!';
  else if (accuracy >= 0.7) title = `🎉 כל הכבוד, ${displayName(player.name)}!`;
  else if (accuracy >= 0.5) title = '🚀 המשימה הושלמה!';

  document.getElementById('result-title').textContent    = title;
  document.getElementById('result-stars').textContent    = `+${state.sessionStars} ⭐`;
  document.getElementById('r-correct').textContent       = `${state.correct}/${state.total}`;
  document.getElementById('r-accuracy').textContent      = `${Math.round(accuracy * 100)}%`;
  document.getElementById('r-streak').textContent        = state.bestStreak;

  // Mastered list
  const mastEl  = document.getElementById('r-mastered');
  const unique  = [...new Set(state.masteredKeys)];
  mastEl.innerHTML = unique.length
    ? unique.map(k => { const e = Equations.byKey(k); return e ? `<span class="eq-tag mastered">${e.display}</span>` : ''; }).join('')
    : '<span class="no-items">המשיכי להתאמן כדי לשלוט בחשבונות!</span>';

  // Practice list
  const practEl    = document.getElementById('r-practice');
  const wrongUniq  = [...new Set(state.wrongKeys)];
  practEl.innerHTML = wrongUniq.length
    ? wrongUniq.map(k => { const e = Equations.byKey(k); return e ? `<span class="eq-tag practice">${e.display}</span>` : ''; }).join('')
    : '<span class="no-items">!אין טעויות! מדהים 🌟</span>';

  showScreen('result');

  if (accuracy >= 0.75) {
    Sound.complete();
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        Animate.confetti(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight * 0.6
        );
      }, i * 180);
    }
  }
}

function updateSettings(player) {
  if (!player) return;
  const btn = document.getElementById('toggle-sound');
  btn.textContent = player.soundEnabled ? 'פועל' : 'כבוי';
  btn.classList.toggle('active', !!player.soundEnabled);
}

// ================================================================
// MODE SELECT
// ================================================================
function showModeSelect(player) {
  document.getElementById('mode-player-name').textContent = `👩‍🚀 ${displayName(player.name)}`;

  // Daily completion badges
  const daily   = Store.getDailyCompletion(player.name);
  const mathBtn = document.getElementById('btn-mode-math');
  const engBtn  = document.getElementById('btn-mode-english');
  const mathChk = document.getElementById('check-math');
  const engChk  = document.getElementById('check-english');
  const mathDesc = document.getElementById('desc-math');
  const engDesc  = document.getElementById('desc-english');

  if (mathChk)  mathChk.textContent  = daily.math    ? '✓' : '';
  if (engChk)   engChk.textContent   = daily.english ? '✓' : '';
  if (mathDesc) mathDesc.textContent  = daily.math    ? 'הושלם היום ✓' : 'כפל וחילוק';
  if (engDesc)  engDesc.textContent   = daily.english ? 'הושלם היום ✓' : 'קריאה בקול';
  if (mathBtn)  mathBtn.classList.toggle('mode-completed', !!daily.math);
  if (engBtn)   engBtn.classList.toggle('mode-completed', !!daily.english);

  showScreen('mode');
}

// ================================================================
// READING
// ================================================================
function startReadingSession() {
  const data   = Store.getReadingData(currentPlayer.name);
  const level  = Math.min(data.level, READING_TEXTS.length - 1);
  const pool   = READING_TEXTS[level];
  const text   = pool[Math.floor(Math.random() * pool.length)];

  // Build word objects: {raw, clean}
  const wordObjects = text.replace(/\n/g, ' ').split(/\s+/).filter(Boolean).map(w => ({
    raw:   w,
    clean: w.toLowerCase().replace(/[^a-z']/g, '')
  })).filter(w => w.clean.length > 0);

  readingState = {
    level, text, wordObjects,
    transcript: '',
    recording:  false,
    intentionalStop: false
  };

  // Populate UI
  document.getElementById('reading-level-badge').textContent = `רמה ${level}`;
  document.getElementById('reading-text').innerHTML =
    text.split('\n').map(l => `<span>${l}</span>`).join('<br>');

  // Reset to reading phase
  document.getElementById('reading-phase').hidden  = false;
  document.getElementById('results-phase').hidden  = true;
  document.getElementById('recording-status').textContent = '';
  const btn = document.getElementById('btn-record');
  btn.classList.remove('recording');
  btn.disabled = false;
  document.getElementById('record-icon').textContent  = '🎤';
  document.getElementById('record-label').textContent = 'התחילי לקרוא';

  showScreen('reading');
}

function handleRecordBtn() {
  if (!readingState) return;
  if (readingState.recording) {
    stopReading();
  } else {
    startReading();
  }
}

function startReading() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    document.getElementById('recording-status').textContent =
      'זיהוי קול לא נתמך. נסי ב-Safari עם iOS 14.5 ומעלה.';
    return;
  }

  const rec = new SR();
  speechRec = rec;
  rec.lang = 'en-US';
  rec.continuous = true;
  rec.interimResults = false;

  let accumulated = '';

  rec.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) accumulated += event.results[i][0].transcript + ' ';
    }
    readingState.transcript = accumulated;
    document.getElementById('recording-status').textContent = accumulated.trim().slice(-70);
  };

  rec.onerror = (e) => {
    if (e.error === 'not-allowed') {
      document.getElementById('recording-status').textContent = 'נדרשת הרשאה למיקרופון';
    } else if (e.error !== 'aborted') {
      document.getElementById('recording-status').textContent = 'שגיאה: ' + e.error;
    }
    readingState.recording = false;
    const btn = document.getElementById('btn-record');
    if (btn) { btn.classList.remove('recording'); btn.disabled = false; }
  };

  rec.onend = () => {
    if (readingState && readingState.recording && speechRec === rec) {
      setTimeout(() => {
        if (readingState && readingState.recording && speechRec === rec) {
          try { rec.start(); } catch(e) {}
        }
      }, 150);
    }
  };

  try {
    rec.start();
  } catch(e) {
    document.getElementById('recording-status').textContent = 'לא ניתן להפעיל מיקרופון';
    return;
  }

  readingState.recording = true;
  const btn = document.getElementById('btn-record');
  btn.classList.add('recording');
  document.getElementById('record-icon').textContent  = '⏹';
  document.getElementById('record-label').textContent = 'סיימתי';
  document.getElementById('recording-status').textContent = '...מקשיבה — קראי בקול רם';
}

function stopReading() {
  readingState.recording = false;
  const rec = speechRec;
  speechRec = null;
  if (rec) { try { rec.stop(); } catch(e) {} }

  const btn = document.getElementById('btn-record');
  if (btn) { btn.classList.remove('recording'); btn.disabled = true; }
  document.getElementById('record-icon').textContent  = '⏳';
  document.getElementById('record-label').textContent = '...מעבדת';
  document.getElementById('recording-status').textContent = '';

  setTimeout(processReadingResults, 500);
}

function wordClose(a, b) {
  if (!a || !b || a === b) return a === b;
  if (Math.abs(a.length - b.length) > 2) return false;
  // Allow 1 edit distance for words longer than 3 chars
  const longer = a.length >= b.length ? a : b;
  const shorter = a.length >= b.length ? b : a;
  let diffs = longer.length - shorter.length;
  for (let i = 0; i < shorter.length; i++) {
    if (shorter[i] !== longer[i]) diffs++;
    if (diffs > 1) return false;
  }
  return diffs <= 1;
}

function alignWords(expected, spoken) {
  const n = expected.length, m = spoken.length;
  // LCS-based alignment
  const dp = Array.from({length: n + 1}, () => new Uint16Array(m + 1));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (expected[i-1] === spoken[j-1] || wordClose(expected[i-1], spoken[j-1])) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  // Backtrack
  const matched = new Array(n).fill(false);
  let i = n, j = m;
  while (i > 0 && j > 0) {
    if (expected[i-1] === spoken[j-1] || wordClose(expected[i-1], spoken[j-1])) {
      matched[i-1] = true; i--; j--;
    } else if (dp[i-1][j] >= dp[i][j-1]) { i--; } else { j--; }
  }
  return expected.map((word, idx) => ({ word, correct: matched[idx] }));
}

function processReadingResults() {
  const wordObjects = readingState.wordObjects;
  const expected    = wordObjects.map(w => w.clean);
  const raw         = readingState.transcript.trim().toLowerCase().replace(/[^a-z\s']/g, '');
  const spoken      = raw.split(/\s+/).filter(Boolean);

  const results  = alignWords(expected, spoken);
  const correct  = results.filter(r => r.correct).length;
  const total    = results.length;
  const accuracy = total > 0 ? correct / total : 0;

  // Save reading progress
  const rd = Store.getReadingData(currentPlayer.name);
  if (accuracy >= 0.8) {
    rd.consecutiveGood = (rd.consecutiveGood || 0) + 1;
    if (rd.consecutiveGood >= 3 && READING_TEXTS[rd.level + 1]) {
      rd.level++;
      rd.consecutiveGood = 0;
    }
  } else {
    rd.consecutiveGood = 0;
  }
  Store.saveReadingData(currentPlayer.name, rd);

  // Mark English as completed for today
  const daily = Store.getDailyCompletion(currentPlayer.name);
  daily.english = true;
  Store.saveDailyCompletion(currentPlayer.name, daily);

  showReadingResult(results, wordObjects, correct, total, accuracy);
}

function showReadingResult(results, wordObjects, correct, total, accuracy) {
  document.getElementById('reading-phase').hidden = true;
  document.getElementById('results-phase').hidden = false;

  const pct = Math.round(accuracy * 100);
  document.getElementById('results-score').textContent =
    `${correct}/${total} מילים נכון · ${pct}%`;

  // Build colored word display (preserving newlines)
  const wordsEl = document.getElementById('results-words');
  let html = '';
  let wi = 0;
  const lines = readingState.text.split('\n');
  for (let li = 0; li < lines.length; li++) {
    const lineWords = lines[li].split(/\s+/).filter(Boolean);
    for (const rawW of lineWords) {
      const r = results[wi++];
      if (!r) continue;
      const cleanW = r.word;
      if (r.correct) {
        html += `<span class="word-correct">${rawW}</span> `;
      } else {
        html += `<span class="word-wrong" data-word="${cleanW}">${rawW}</span> `;
      }
    }
    if (li < lines.length - 1) html += '<br>';
  }
  wordsEl.innerHTML = html;

  // Tap wrong word to hear it spoken clearly
  wordsEl.querySelectorAll('.word-wrong').forEach(el => {
    el.addEventListener('click', () => {
      const utt = new SpeechSynthesisUtterance(el.dataset.word);
      utt.lang  = 'en-US';
      utt.rate  = 0.72;
      utt.pitch = 1.05;
      const voice = getBestVoice();
      if (voice) utt.voice = voice;
      speechSynthesis.cancel();
      speechSynthesis.speak(utt);
    });
  });

  const name = displayName(currentPlayer.name);
  let msg = '';
  if (total === 0) msg = `${name}, לא זיהיתי קריאה. נסי שוב! 🎤`;
  else if (accuracy >= 0.9) msg = `🌟 מדהים, ${name}! קראת נפלא!`;
  else if (accuracy >= 0.75) msg = `👏 כל הכבוד, ${name}! המשיכי להתאמן!`;
  else if (accuracy >= 0.5)  msg = `💪 יפה, ${name}! נסי שוב לשפר!`;
  else                        msg = `🚀 ${name}, תרגלי שוב — את יכולה!`;
  document.getElementById('results-message').textContent = msg;
}

// ================================================================
// GAME FLOW
// ================================================================
function selectPlayer(name) {
  // Lazy-init AudioContext on first user gesture (required by browser policy)
  Sound.ctx();

  let player = Store.getPlayer(name);
  if (!player) player = Store.newPlayer(name);
  player = Streak.update(player);
  Store.savePlayer(name, player);
  currentPlayer = player;

  // Apply player colour theme to body
  document.body.className = `player-${name}`;

  showModeSelect(player);
}

function startSession() {
  if (!currentPlayer) return;

  const weights = Store.getWeights(currentPlayer.name);
  const history = Store.getHistory(currentPlayer.name);

  sessionState = createSession(currentPlayer, weights, history);

  Sound.start();
  showScreen('question');

  // Reset progress bar & timer UI
  document.getElementById('progress-fill').style.width = '0%';
  document.getElementById('p-rocket').style.left = '0%';
  document.getElementById('timer').classList.remove('urgent');
  document.getElementById('timer').textContent = '7:30';
  document.getElementById('s-stars-count').textContent = '0';
  document.querySelectorAll('.milestone').forEach(m => m.classList.remove('collected'));
  document.getElementById('flash-msg').textContent = '';

  if (sessionTimer) clearInterval(sessionTimer);
  sessionTimer = setInterval(tick, 1000);

  showNextQuestion();
}

function tick() {
  sessionState.elapsed++;
  updateProgress(sessionState.elapsed);
  if (sessionState.elapsed >= SESSION_SECS) endSession();
}

function showNextQuestion() {
  const eq = nextEquation(sessionState);
  renderQuestion(eq, sessionState);
}

function handleAnswer(selectedVal, btnEl) {
  if (!sessionState || !sessionState.currentEq) return;

  const eq      = sessionState.currentEq;
  const correct = eq.answer;
  const isRight = parseInt(selectedVal, 10) === correct;
  const rtime   = (Date.now() - sessionState.qStartTime) / 1000; // seconds

  // Lock all buttons while processing
  document.querySelectorAll('.ans-btn').forEach(b => { b.disabled = true; });

  // --- Weight update ---
  const weights = Store.getWeights(currentPlayer.name);
  const wd      = weights[eq.key] || { weight: 1.0, correctStreak: 0, totalAttempts: 0, mastered: false };
  wd.totalAttempts++;

  if (isRight) {
    btnEl.classList.add('correct');
    Sound.correct();

    // Float text at button center
    const r = btnEl.getBoundingClientRect();
    Animate.confetti(r.left + r.width / 2, r.top + r.height / 2);
    Animate.floatText('+1 ⭐', r.left + r.width / 2, r.top);

    // Session counters
    sessionState.correct++;
    sessionState.total++;
    sessionState.sessionStars++;
    sessionState.ansStreak++;
    sessionState.bestStreak = Math.max(sessionState.bestStreak, sessionState.ansStreak);

    // Streak flash messages
    if (sessionState.ansStreak === 5)  Animate.flash('!5 ברצף 🔥');
    if (sessionState.ansStreak === 10) Animate.flash('!10 ברצף 🌟');

    // Weight: reduce (moving toward mastery)
    if (rtime < 4)       wd.weight = Math.max(MIN_WEIGHT, wd.weight * 0.60);
    else if (rtime < 10) wd.weight = Math.max(MIN_WEIGHT, wd.weight * 0.80);
    else                 wd.weight = Math.max(MIN_WEIGHT, wd.weight * 0.92); // slow but correct

    wd.correctStreak = (wd.correctStreak || 0) + 1;

    // Mastery: 3 correct in a row + weight low enough
    if (!wd.mastered && wd.correctStreak >= 3 && wd.weight < 0.35) {
      wd.mastered = true;
      if (!sessionState.masteredKeys.includes(eq.key)) {
        sessionState.masteredKeys.push(eq.key);
        Animate.flash(`!שלטת ב־${eq.display} ⭐`);
      }
    }

    // Update star display with pop animation
    document.getElementById('s-stars-count').textContent = sessionState.sessionStars;
    Animate.pop(document.querySelector('.s-stars'));

  } else {
    btnEl.classList.add('wrong');
    Sound.wrong();

    // Highlight correct answer
    document.querySelectorAll('.ans-btn').forEach(b => {
      if (parseInt(b.dataset.val, 10) === correct) b.classList.add('correct-reveal');
    });

    // Session counters
    sessionState.total++;
    sessionState.ansStreak = 0;
    sessionState.wrongKeys.push(eq.key);

    // Weight: boost (needs more practice)
    wd.weight = Math.min(MAX_WEIGHT, wd.weight * 2.5);
    wd.correctStreak = 0;
    wd.mastered = false;

    // Queue for repeat (interleaved every 3rd question)
    sessionState.repeatQueue.push(eq);
  }

  weights[eq.key] = wd;
  Store.saveWeights(currentPlayer.name, weights);

  // Update daily history
  const history = Store.getHistory(currentPlayer.name);
  history.recent.push(eq.key);
  if (history.recent.length > RECENT_CAP) history.recent.shift();
  Store.saveHistory(currentPlayer.name, history);

  // Schedule next question
  setTimeout(() => {
    document.querySelectorAll('.ans-btn').forEach(b => {
      b.disabled = false;
      b.className = 'ans-btn';
      b.blur();
    });
    showNextQuestion();
  }, isRight ? 750 : 1150);
}

function endSession() {
  if (sessionTimer) { clearInterval(sessionTimer); sessionTimer = null; }

  // Persist session results to player profile
  const accuracy = sessionState.total > 0 ? sessionState.correct / sessionState.total : 0;
  currentPlayer.totalStars    = (currentPlayer.totalStars    || 0) + sessionState.sessionStars;
  currentPlayer.totalSessions = (currentPlayer.totalSessions || 0) + 1;
  currentPlayer.totalCorrect  = (currentPlayer.totalCorrect  || 0) + sessionState.correct;
  currentPlayer.lastSessionStats = {
    correct:  sessionState.correct,
    total:    sessionState.total,
    accuracy
  };
  Store.savePlayer(currentPlayer.name, currentPlayer);

  // Bump day bucket
  const history = Store.getHistory(currentPlayer.name);
  history.dayBucket = (history.dayBucket || 0) + 1;
  Store.saveHistory(currentPlayer.name, history);

  // Mark math as completed for today (if played at least 5 questions)
  if (sessionState.total >= 5) {
    const daily = Store.getDailyCompletion(currentPlayer.name);
    daily.math = true;
    Store.saveDailyCompletion(currentPlayer.name, daily);
  }

  showResult(sessionState, currentPlayer);
}

// ================================================================
// UTILITIES
// ================================================================
function todayStr()     { return new Date().toISOString().slice(0, 10); }
function yesterdayStr() { return new Date(Date.now() - 86400000).toISOString().slice(0, 10); }

function daysBetween(a, b) {
  const d1 = new Date(a), d2 = new Date(b);
  return Math.round(Math.abs((d2 - d1) / 86400000));
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ================================================================
// BACKGROUND STARS
// ================================================================
function buildStars() {
  const container = document.getElementById('bg-stars');
  for (let i = 0; i < 60; i++) {
    const el   = document.createElement('span');
    el.className = 'bg-star';
    const size = 1 + Math.random() * 2.5;
    const op   = 0.2 + Math.random() * 0.75;
    el.style.cssText = [
      `left:${Math.random() * 100}%`,
      `top:${Math.random() * 100}%`,
      `width:${size}px`,
      `height:${size}px`,
      `--base-op:${op}`,
      `--dur:${3 + Math.random() * 5}s`,
      `animation-delay:-${Math.random() * 8}s`
    ].join(';');
    container.appendChild(el);
  }
}

// ================================================================
// INIT & EVENT WIRING
// ================================================================
function buildMulTable(wrapId) {
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  let html = '<table class="mul-table"><thead><tr><th>×</th>';
  for (let c = 1; c <= 10; c++) html += `<th>${c}</th>`;
  html += '</tr></thead><tbody>';
  for (let r = 1; r <= 10; r++) {
    html += `<tr><th>${r}</th>`;
    for (let c = 1; c <= 10; c++) html += `<td>${r * c}</td>`;
    html += '</tr>';
  }
  html += '</tbody></table>';
  wrap.innerHTML = html;
}

function init() {
  Equations.build();
  buildStars();
  buildMulTable('mul-table-wrap');
  buildMulTable('splash-mul-table-wrap');
  updateSplash();
  showScreen('splash');

  // Pre-load TTS voices (async on some browsers/iOS)
  if (window.speechSynthesis) {
    speechSynthesis.getVoices();
    speechSynthesis.addEventListener('voiceschanged', () => { speechSynthesis.getVoices(); });
  }

  // Mode select
  document.getElementById('btn-mode-back').addEventListener('click', () => {
    updateSplash();
    document.body.className = '';
    showScreen('splash');
  });
  document.getElementById('btn-mode-math').addEventListener('click', () => {
    showHome(currentPlayer);
  });
  document.getElementById('btn-mode-english').addEventListener('click', startReadingSession);
  document.getElementById('btn-mode-home').addEventListener('click', () => {
    showHome(currentPlayer);
  });

  // Reading screen
  document.getElementById('btn-reading-back').addEventListener('click', () => {
    if (speechRec) { try { speechRec.stop(); } catch(e) {} speechRec = null; }
    if (readingState) readingState.recording = false;
    showModeSelect(currentPlayer);
  });
  document.getElementById('btn-record').addEventListener('click', handleRecordBtn);
  document.getElementById('btn-listen-text').addEventListener('click', () => {
    if (!readingState) return;
    const utt = new SpeechSynthesisUtterance(readingState.text.replace(/\n/g, ' '));
    utt.lang = 'en-US';
    utt.rate = 0.82;
    utt.pitch = 1.05;
    const voice = getBestVoice();
    if (voice) utt.voice = voice;
    speechSynthesis.cancel();
    speechSynthesis.speak(utt);
  });
  document.getElementById('btn-reading-again').addEventListener('click', startReadingSession);
  document.getElementById('btn-reading-home').addEventListener('click', () => {
    showModeSelect(currentPlayer);
  });

  // Player selection
  document.getElementById('btn-noya').addEventListener('click', () => selectPlayer('Noya'));
  document.getElementById('btn-miya').addEventListener('click', () => selectPlayer('Miya'));

  // Settings from splash
  document.getElementById('btn-splash-settings').addEventListener('click', () => {
    settingsFrom = 'splash';
    updateSettings(currentPlayer || Store.getPlayer('Noya') || { soundEnabled: true });
    showScreen('settings');
  });

  // Home → start
  document.getElementById('btn-start').addEventListener('click', startSession);

  // Multiplication table toggles (home + splash)
  [['btn-table-toggle', 'mul-table-wrap'], ['btn-splash-table-toggle', 'splash-mul-table-wrap']].forEach(([btnId, wrapId]) => {
    document.getElementById(btnId).addEventListener('click', function () {
      const wrap = document.getElementById(wrapId);
      const opening = wrap.hidden;
      wrap.hidden = !opening;
      this.querySelector('.table-arrow').textContent = opening ? '▲' : '▼';
    });
  });

  // Home → back to mode select
  document.getElementById('btn-home-back').addEventListener('click', () => {
    showModeSelect(currentPlayer);
  });

  // Home → settings
  document.getElementById('btn-home-settings').addEventListener('click', () => {
    settingsFrom = 'home';
    updateSettings(currentPlayer);
    showScreen('settings');
  });

  // Exit session mid-game
  document.getElementById('btn-exit-session').addEventListener('click', () => {
    if (confirm('לצאת מהמשימה? ההתקדמות עד כה תישמר.')) {
      endSession();
    }
  });

  // Answer buttons
  document.querySelectorAll('.ans-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.disabled) return;
      handleAnswer(this.dataset.val, this);
    });
  });

  // Result → play again
  document.getElementById('btn-play-again').addEventListener('click', startSession);

  // Result → mode select (so player can see completion checkmarks and pick next subject)
  document.getElementById('btn-result-home').addEventListener('click', () => {
    currentPlayer = Store.getPlayer(currentPlayer.name);
    showModeSelect(currentPlayer);
  });

  // Settings → back
  document.getElementById('btn-settings-back').addEventListener('click', () => {
    if (settingsFrom === 'home' && currentPlayer) {
      showHome(currentPlayer);
    } else {
      updateSplash();
      showScreen('splash');
    }
  });

  // Sound toggle
  document.getElementById('toggle-sound').addEventListener('click', () => {
    if (!currentPlayer) return;
    currentPlayer.soundEnabled = !currentPlayer.soundEnabled;
    Store.savePlayer(currentPlayer.name, currentPlayer);
    updateSettings(currentPlayer);
  });

  // Reset buttons
  document.getElementById('btn-reset-noya').addEventListener('click', () => {
    if (confirm('לאפס את כל ההתקדמות של נויה? לא ניתן לבטל.')) {
      Store.resetPlayer('Noya');
      if (currentPlayer && currentPlayer.name === 'Noya') currentPlayer = null;
      updateSplash();
      alert('ההתקדמות של נויה אופסה.');
    }
  });
  document.getElementById('btn-reset-miya').addEventListener('click', () => {
    if (confirm('לאפס את כל ההתקדמות של מיה? לא ניתן לבטל.')) {
      Store.resetPlayer('Miya');
      if (currentPlayer && currentPlayer.name === 'Miya') currentPlayer = null;
      updateSplash();
      alert('ההתקדמות של מיה אופסה.');
    }
  });
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})(); // end IIFE
