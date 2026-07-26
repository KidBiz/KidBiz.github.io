/* ============================================================
   KidFinance — ข้อมูล + สูตรคำนวณ + ระบบสองภาษา
   ตัวเลขตุ๊กตาจาก spec §7 · แก้ตัวเลขที่ไฟล์นี้ไฟล์เดียว
   ============================================================ */

const SCREENS = {};   // s1.js … s7.js ลงทะเบียนตัวเองที่นี่ (ต้องประกาศก่อนไฟล์หน้าจอโหลด)

/* ---------- ภาษา (ค่าเริ่มต้น = อังกฤษ) ---------- */
let LANG = "en";
try { LANG = localStorage.getItem("kflang") || "en"; } catch (e) {}

/** ข้อความสองภาษาแบบเขียนติดที่ใช้: L("Covered", "หาเองได้แล้ว") */
function L(en, th) { return LANG === "th" ? th : en; }

/** ข้อมูลสองภาษาที่เก็บเป็นออบเจ็กต์: LT({en:"Food", th:"ค่าอาหาร"}) */
function LT(o) { return (o && typeof o === "object") ? (LANG === "th" ? o.th : o.en) : o; }

function setLang(l) {
  LANG = l;
  try { localStorage.setItem("kflang", l); } catch (e) {}
  document.body.classList.toggle("th", l === "th");
  render();
}

/* ============================================================ */

const SEED = {
  app: { name: "KidFinance" },
  child: { name: { en: "Panpan", th: "ปันปัน" }, age: 15,
           grade: { en: "Grade 10", th: "ม.4" }, week: 3, daysElapsed: 21 },

  /* --- §7 ค่าใช้จ่ายจริงต่อเดือน --- */
  costItems: [
    { name: { en: "Food",            th: "ค่าอาหาร" },        perMonth: 3000 },
    { name: { en: "Getting around",  th: "ค่าเดินทาง" },      perMonth: 1500 },
    { name: { en: "Everyday things", th: "ของใช้ส่วนตัว" },   perMonth: 1200 },
    { name: { en: "Phone",           th: "ค่าโทรศัพท์" },     perMonth: 300  }
  ],
  guessedCost: 50,        // เด็กเดาไว้ก่อนเฉลย ← ช่องว่างนี้คือโมเมนต์ "ว้าว"
  startingBalance: 500,

  /* --- รายได้ (เด็กบันทึก · พ่อแม่ยืนยัน) --- */
  income: [
    { id: 1, d: { en: "Mon 6 Jul", th: "จ. 6 ก.ค." },   amt: 150, lv: 2, hrs: 2.0, ok: true,
      note: { en: "Washed a neighbour's car",   th: "ล้างรถให้เพื่อนบ้าน" } },
    { id: 2, d: { en: "Wed 8 Jul", th: "พ. 8 ก.ค." },   amt: 100, lv: 1, hrs: 1.5, ok: true,
      note: { en: "Restocked shelves at the shop", th: "ช่วยร้านป้าจัดของ" } },
    { id: 3, d: { en: "Sat 11 Jul", th: "ส. 11 ก.ค." }, amt: 260, lv: 3, hrs: 4.0, ok: true,
      note: { en: "Sold stickers I drew",       th: "ขายสติกเกอร์ที่วาดเอง" } },
    { id: 4, d: { en: "Tue 14 Jul", th: "อ. 14 ก.ค." }, amt: 120, lv: 2, hrs: 2.0, ok: true,
      note: { en: "Tutored my younger brother", th: "สอนการบ้านน้อง" } },
    { id: 5, d: { en: "Fri 17 Jul", th: "ศ. 17 ก.ค." }, amt: 126, lv: 4, hrs: 3.0, ok: true,
      note: { en: "Edited a video for a senior", th: "ตัดต่อคลิปให้รุ่นพี่" } },
    { id: 6, d: { en: "Thu 23 Jul", th: "พฤ. 23 ก.ค." }, amt: 120, lv: 2, hrs: 2.0, ok: false,
      note: { en: "Photographed the school sports day", th: "ถ่ายรูปงานกีฬาสีให้ครู" } }
  ],
  workLevels: [
    { en: "① Went beyond what was asked", th: "① ทำมากกว่าที่ถูกขอ" },
    { en: "② Sold a skill",               th: "② ขายทักษะที่มี" },
    { en: "③ Made something and sold it", th: "③ ทำของขึ้นมาแล้วขาย" },
    { en: "④ Earned online",              th: "④ หารายได้ออนไลน์" }
  ],
  workHints: [
    { en: "Help nobody asked you for",       th: "ช่วยงานที่ไม่มีใครสั่ง" },
    { en: "Tutoring, washing, editing, fixing", th: "สอน ล้างรถ ตัดต่อ รับจ้างทำ" },
    { en: "Make one thing, sell it many times", th: "ทำของขึ้นมาแล้วขายได้หลายชิ้น" },
    { en: "Reaches further than you can go yourself", th: "ไปได้ไกลกว่าตัวเองไปถึง" }
  ],

  /* --- กฎแบ่งเงิน + ซอง (§7: 40/30/20/10) --- */
  rule: { need: 40, save: 30, spend: 20, share: 10 },
  ruleHistory: [
    { v: 1, d: { en: "1 Jul", th: "1 ก.ค." }, r: "40/30/20/10",
      why: { en: "Set it for the first time on day 2 of camp", th: "ตั้งครั้งแรกในแคมป์วันที่ 2" } }
  ],
  envelopes: [   // ic = ชื่อไอคอนใน icons.js
    { key: "need",  ic: "bag",   inn: 302, out: 210, name: { en: "Needs", th: "จำเป็น" } },
    { key: "save",  ic: "save", inn: 242, out: 0,   name: { en: "Save",  th: "ออม" } },
    { key: "spend", ic: "cart",  inn: 136, out: 136, name: { en: "Spend", th: "ใช้" } },   // ← หมดพอดี
    { key: "share", ic: "heart", inn: 76,  out: 40,  name: { en: "Share", th: "แบ่งปัน" } }
  ],
  alloc: { followed: 19, total: 26 },   // ทำตามกฎ 73%

  /* --- พฤติกรรม --- */
  pause: { stopped: 12, impulse: 5 },   // คิดก่อนซื้อ 71%
  spend: { need: 232, want: 154 },      // 60 : 40
  streak: { now: 12, best: 12 },
  reflectionsDone: 3, reflectionsDue: 3,

  triggers: [
    { when: "15:00–17:00", n: 6, where: { en: "Outside school",     th: "หน้าโรงเรียน" } },
    { when: "20:00–22:00", n: 5, where: { en: "At home, on my phone", th: "ที่บ้าน ตอนเล่นมือถือ" } },
    { when: "12:00–13:00", n: 3, where: { en: "School canteen",     th: "โรงอาหาร" } },
    { when: { en: "Weekend afternoons", th: "บ่ายวันหยุด" }, n: 3, where: { en: "The mall", th: "ห้าง" } }
  ],

  /* --- รับช่วงจ่ายค่าโทรศัพท์ (§7) --- */
  handoff: { name: { en: "Phone bill", th: "ค่าโทรศัพท์" },
             perWeek: 70, phase: 25, runwayLeft: 720, paidOnTime: 3, paidTotal: 3 },

  /* --- บันไดเป้าหมาย --- */
  ladder: [
    { lv: 1, need: 0,   t: { en: "Know what I really cost",  th: "รู้ค่าใช้จ่ายจริงของตัวเอง" } },
    { lv: 2, need: 4,   t: { en: "Cover my phone bill",      th: "จ่ายค่าโทรศัพท์เอง" } },
    { lv: 3, need: 25,  t: { en: "Cover one full day",       th: "ครอบคลุม 1 วันเต็ม" } },
    { lv: 4, need: 50,  t: { en: "Cover one full week",      th: "ครอบคลุม 1 สัปดาห์" } },
    { lv: 5, need: 100, t: { en: "Cover what I cost, daily", th: "ครอบคลุมค่าใช้จ่ายรายวันทั้งหมด" } }
  ],

  /* --- ฝั่งพ่อแม่ --- */
  parent: {
    noBailout: 7, bailoutChances: 9, moneyTalk: 11,
    missions: [
      { done: true,  t: { en: "Open up one chance for them to earn", th: "เปิดโอกาสให้ลูกหาเงิน 1 ครั้ง" } },
      { done: true,  t: { en: "Talk about money twice — without lecturing", th: "คุยเรื่องเงิน 2 ครั้ง แบบไม่สอน" } },
      { done: false, t: { en: "Don't cover for them when they run short", th: "ไม่ช่วยจ่ายเมื่อลูกเงินไม่พอ" } }
    ],
    article: {
      t: { en: "Why this week is about letting them run short",
           th: "ทำไมสัปดาห์นี้ถึงควรปล่อยให้ลูกเจอเงินไม่พอ" },
      s: { en: "Children whose parents step in every time they run out never connect a decision to its result. Across the research, the parent's behaviour predicts a child's money habits more strongly than any course does.",
           th: "เด็กที่พ่อแม่เข้าไปช่วยทุกครั้งที่เงินหมด จะไม่เชื่อมโยงการตัดสินใจเข้ากับผลลัพธ์ งานวิจัยชี้ตรงกันว่าพฤติกรรมของพ่อแม่ทำนายนิสัยการเงินของลูกได้แรงกว่าหลักสูตรใดๆ" }
    }
  },

  /* --- สัปดาห์ที่แล้ว (ใช้ทำลูกศร ↑↓) --- */
  lastWeek: { coverage: 11, saving: 24, pauseRate: 55, needPct: 48, streak: 5 },

  /* --- วันแรก → ตอนนี้ --- */
  before: { coverage: 0, saving: 0, pauseRate: 12, need: 35, streak: 0, score: 21, bailoutFree: 20 },

  badges: [
    { ic: "search",   got: true,  t: { en: "Found my real cost", th: "รู้ค่าใช้จ่ายจริงแล้ว" } },
    { ic: "hand",     got: true,  t: { en: "Paused 10 times",    th: "คิดก่อนซื้อ 10 ครั้ง" } },
    { ic: "flame",    got: true,  t: { en: "12 days running",    th: "ต่อเนื่อง 12 วัน" } },
    { ic: "phone",    got: true,  t: { en: "Paid my own phone",  th: "จ่ายค่าโทรเอง" } },
    { ic: "save",    got: false, t: { en: "Saved 4 weeks",      th: "ออมครบ 4 สัปดาห์" } },
    { ic: "mountain", got: false, t: { en: "Covered a full day", th: "ครอบคลุม 1 วันเต็ม" } }
  ],

  proud: {
    en: "I walked past the bubble tea shop three times this week — and I didn't have to talk myself out of it. I just didn't want it.",
    th: "อาทิตย์นี้เดินผ่านร้านชานมได้ 3 ครั้ง โดยไม่ต้องห้ามตัวเองเลย มันไม่อยากเอง"
  },
  reflection: { did: "", missed: "", fix: "" }
};

/* ============================================================ */

const KB = {
  s: null,

  boot() {
    try {
      const raw = localStorage.getItem("kfapp");
      this.s = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(SEED));
    } catch (e) { this.s = JSON.parse(JSON.stringify(SEED)); }
  },
  save()  { try { localStorage.setItem("kfapp", JSON.stringify(this.s)); } catch (e) {} },
  reset() { this.s = JSON.parse(JSON.stringify(SEED)); this.save(); },

  /* ---------- ค่าใช้จ่าย ---------- */
  monthlyCost() { return this.s.costItems.reduce((a, c) => a + c.perMonth, 0); },
  dailyCost()   { return Math.round(this.monthlyCost() / 30); },          // 200
  cumCost()     { return this.dailyCost() * this.s.child.daysElapsed; },  // 4,200

  /* ---------- รายได้ ---------- */
  verified() { return this.s.income.filter(i => i.ok); },
  pending()  { return this.s.income.filter(i => !i.ok); },
  incomeTotal()  { return this.verified().reduce((a, i) => a + i.amt, 0); },   // 756
  pendingTotal() { return this.pending().reduce((a, i) => a + i.amt, 0); },
  hoursTotal()   { return this.verified().reduce((a, i) => a + i.hrs, 0); },
  hourly()       { const h = this.hoursTotal(); return h ? this.incomeTotal() / h : 0; },  // ~60฿/ชม

  /* ---------- Metrics (§4) ---------- */
  coverage()        { return this.pct(this.incomeTotal(), this.cumCost()); },              // 18%
  coveragePending() { return this.pct(this.incomeTotal() + this.pendingTotal(), this.cumCost()); },
  savingRate()      { return this.pct(this.env("save").inn, this.envInAll()); },           // 32%
  adherence()       { return this.pct(this.s.alloc.followed, this.s.alloc.total); },       // 73%
  pauseRate()       { const p = this.s.pause; return this.pct(p.stopped, p.stopped + p.impulse); }, // 71%
  needPct()         { const s = this.s.spend; return this.pct(s.need, s.need + s.want); }, // 60%

  /* 🏆 Money Habit Score — สูตรถ่วงน้ำหนัก (spec §8: ยังเป็นตุ๊กตา ปรับได้) */
  scoreParts() {
    return [
      { k: L("Covered", "หาเองได้"),           v: Math.min(100, this.coverage()), w: .25 },
      { k: L("Followed own rule", "ทำตามกฎตัวเอง"), v: this.adherence(),          w: .25 },
      { k: L("Paused first", "คิดก่อนซื้อ"),     v: this.pauseRate(),              w: .20 },
      { k: L("Kept it up", "ทำต่อเนื่อง"),       v: Math.min(100, this.s.streak.now / 14 * 100), w: .20 },
      { k: L("Reflected", "สะท้อนตัวเอง"),       v: this.pct(this.s.reflectionsDone, this.s.reflectionsDue), w: .10 }
    ];
  },
  score() { return Math.round(this.scoreParts().reduce((a, p) => a + p.v * p.w, 0)); },   // 64

  /* ---------- ซองเงิน ---------- */
  env(k)      { return this.s.envelopes.find(e => e.key === k); },
  envBal(e)   { return Math.max(0, e.inn - e.out); },
  envFill(e)  { return e.inn ? this.pct(this.envBal(e), e.inn) : 0; },
  envInAll()  { return this.s.envelopes.reduce((a, e) => a + e.inn, 0); },
  emptyEnvs() { return this.s.envelopes.filter(e => this.envBal(e) === 0 && e.inn > 0); },

  /* ---------- บันไดเป้าหมาย ---------- */
  ladderNow() {
    const c = this.coverage();
    let cur = this.s.ladder[0];
    this.s.ladder.forEach(l => { if (c >= l.need) cur = l; });
    return cur;
  },
  ladderNext() { return this.s.ladder.find(l => l.lv === this.ladderNow().lv + 1) || null; },

  /* ---------- พ่อแม่ ---------- */
  bailoutFree() { const p = this.s.parent; return this.pct(p.noBailout, p.bailoutChances); },  // 78%

  /* ---------- Actions ---------- */
  addIncome(amt, lv, hrs, note) {
    this.s.income.push({ id: Date.now(), d: { en: "Today", th: "วันนี้" }, amt, lv, hrs,
                         note: { en: note, th: note }, ok: false });
    const r = this.s.rule;
    this.env("need").inn  += Math.round(amt * r.need  / 100);
    this.env("save").inn  += Math.round(amt * r.save  / 100);
    this.env("spend").inn += Math.round(amt * r.spend / 100);
    this.env("share").inn += Math.round(amt * r.share / 100);
    this.s.alloc.followed++; this.s.alloc.total++;
    this.save();
  },
  verifyIncome(id, ok) {
    if (ok) { const i = this.s.income.find(x => x.id === id); if (i) i.ok = true; }
    else    { this.s.income = this.s.income.filter(x => x.id !== id); }
    this.save();
  },
  addExpense(amt, kind, envKey, hadPause) {
    const e = this.env(envKey); if (e) e.out += amt;
    this.s.spend[kind] += amt;
    if (hadPause) this.s.pause.stopped++; else this.s.pause.impulse++;
    this.save();
  },
  splitOf(amt) {
    const r = this.s.rule;
    return this.s.envelopes.map(e => ({
      key: e.key, name: LT(e.name), p: r[e.key], amt: Math.round(amt * r[e.key] / 100)
    }));
  },

  /* ---------- util ---------- */
  pct(a, b) { return b ? Math.round(a / b * 100) : 0; },
  baht(n)   { return "฿" + Math.round(n).toLocaleString("en-US"); }
};
