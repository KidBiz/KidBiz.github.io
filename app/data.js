/* ============================================================
   KidFinance — ข้อมูล + สูตรคำนวณ + ระบบสองภาษา
   ตัวเลขตุ๊กตาจาก spec §7 · แก้ตัวเลขที่ไฟล์นี้ไฟล์เดียว
   อิงสเปค 2026-07-27: 2 เป้าหมาย (ไม่มีบันได/เฟส) · เงินกู้จำลอง ·
   นับ "ครั้งที่ฝึกคิด" แทน pause rate · streak รายสัปดาห์
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

  /* --- §7 ค่าใช้จ่ายจริงต่อเดือน ---
     source: parent = พ่อแม่กรอก · loan = ยอดผ่อนจากเงินกู้จำลอง · sub = ค่าบริการต่อเนื่อง
     ทุกตัวรวมกัน ÷ 30 = ต้นทุน/วัน → ตัวที่เพิ่มเข้ามาทีหลังทำให้ "หลุมลึกลง" */
  costItems: [
    { id: "food",  source: "parent", perMonth: 3000, name: { en: "Food",            th: "ค่าอาหาร" } },
    { id: "trans", source: "parent", perMonth: 1500, name: { en: "Getting around",  th: "ค่าเดินทาง" } },
    { id: "stuff", source: "parent", perMonth: 1200, name: { en: "Everyday things", th: "ของใช้ส่วนตัว" } },
    { id: "phone", source: "parent", perMonth: 300,  name: { en: "Phone",           th: "ค่าโทรศัพท์" } }
  ],
  guessedCost: 50,        // เด็กเดาไว้ก่อนเฉลย ← ช่องว่างนี้คือโมเมนต์ "ว้าว"
  startingBalance: 500,

  /* --- ⭐ 2 เป้าหมาย (แทนบันได 5 ขั้นและระบบเฟสเดิมทั้งหมด) ---
     เป้าเล็ก = ค่าใช้จ่าย 1 รายการที่พ่อแม่เลือก (default = ค่าโทร)
     ⚠️ ไม่ใช่การตัดค่าใช้จ่าย ไม่มีเฟส พ่อแม่ยังจ่ายตามปกติ
        เด็กหาเงินมา cover = พ่อแม่เบาลง (กรอบบวก ไม่ใช่ลบ) */
  goalSmallItemId: "phone",

  /* --- รายได้ (เด็กบันทึก · พ่อแม่ยืนยัน) ---
     mode: live = บันทึกตอนนั้น · backfill = กรอกย้อนหลัง (โหมดปกติ ไม่ใช่ความล้มเหลว §0.1) */
  income: [
    { id: 1, amt: 150, lv: 2, hrs: 2.0, ok: true, mode: "backfill", d: { en: "Mon 6 Jul", th: "จ. 6 ก.ค." },
      note: { en: "Washed a neighbour's car",   th: "ล้างรถให้เพื่อนบ้าน" } },
    { id: 2, amt: 100, lv: 1, hrs: 1.5, ok: true, mode: "backfill", d: { en: "Wed 8 Jul", th: "พ. 8 ก.ค." },
      note: { en: "Restocked shelves at the shop", th: "ช่วยร้านป้าจัดของ" } },
    { id: 3, amt: 260, lv: 3, hrs: 4.0, ok: true, mode: "live",     d: { en: "Sat 11 Jul", th: "ส. 11 ก.ค." },
      note: { en: "Sold stickers I drew",       th: "ขายสติกเกอร์ที่วาดเอง" } },
    { id: 4, amt: 120, lv: 2, hrs: 2.0, ok: true, mode: "backfill", d: { en: "Tue 14 Jul", th: "อ. 14 ก.ค." },
      note: { en: "Tutored my younger brother", th: "สอนการบ้านน้อง" } },
    { id: 5, amt: 126, lv: 4, hrs: 3.0, ok: true, mode: "live",     d: { en: "Fri 17 Jul", th: "ศ. 17 ก.ค." },
      note: { en: "Edited a video for a senior", th: "ตัดต่อคลิปให้รุ่นพี่" } },
    { id: 6, amt: 120, lv: 2, hrs: 2.0, ok: false, mode: "backfill", d: { en: "Thu 23 Jul", th: "พฤ. 23 ก.ค." },
      note: { en: "Photographed the school sports day", th: "ถ่ายรูปงานกีฬาสีให้ครู" } }
  ],
  workLevels: [
    { en: "Went beyond what was asked", th: "ทำมากกว่าที่ถูกขอ" },
    { en: "Sold a skill",               th: "ขายทักษะที่มี" },
    { en: "Made something and sold it", th: "ทำของขึ้นมาแล้วขาย" },
    { en: "Earned online",              th: "หารายได้ออนไลน์" }
  ],
  workHints: [
    { en: "Help nobody asked you for",              th: "ช่วยงานที่ไม่มีใครสั่ง" },
    { en: "Tutoring, washing, editing, fixing",     th: "สอน ล้างรถ ตัดต่อ รับจ้างทำ" },
    { en: "Make one thing, sell it many times",     th: "ทำของขึ้นมาแล้วขายได้หลายชิ้น" },
    { en: "Reaches further than you can go yourself", th: "ไปได้ไกลกว่าตัวเองไปถึง" }
  ],

  /* --- ⭐ F7 "จะเกิดอะไรถ้าซื้ออันนี้" — เป็นแบบฝึกหัด ไม่ใช่ด่าน
     cat: need / want / earner (มีโอกาสสร้างรายได้)
     นับเป็น "ครั้งที่ฝึกคิด" ทุกครั้ง ไม่ว่าจะซื้อหรือไม่ซื้อ */
  intents: [
    { id: 1, amt: 590, cat: "want",   recur: 0,   decision: "skip",   mode: "backfill", what: { en: "Bluetooth headphones", th: "หูฟังบลูทูธ" } },
    { id: 2, amt: 199, cat: "want",   recur: 199, decision: "bought", mode: "backfill", what: { en: "Game pass, monthly",   th: "แพ็กเกจเกมรายเดือน" } },
    { id: 3, amt: 250, cat: "earner", recur: 0,   decision: "bought", mode: "live",     what: { en: "Sticker printing paper", th: "กระดาษพิมพ์สติกเกอร์" } },
    { id: 4, amt: 45,  cat: "want",   recur: 0,   decision: "skip",   mode: "backfill", what: { en: "Bubble tea",           th: "ชานมไข่มุก" } },
    { id: 5, amt: 120, cat: "need",   decision: "bought", recur: 0,   mode: "backfill", what: { en: "School shoes repair",  th: "ซ่อมรองเท้านักเรียน" } }
  ],

  /* --- ⭐ F16 เงินกู้จำลอง — ไม่มีเงินจริงเกี่ยวข้อง --- */
  loans: [],

  /* --- กฎแบ่งเงิน + ซอง (§7: 40/30/20/10) --- */
  rule: { need: 40, save: 30, spend: 20, share: 10 },
  ruleHistory: [
    { v: 1, d: { en: "Day 3 of camp", th: "แคมป์วันที่ 3" }, r: "40/30/20/10",
      why: { en: "Set it for the first time", th: "ตั้งครั้งแรก" } }
  ],
  envelopes: [   // ic = ชื่อไอคอนใน icons.js
    { key: "need",  ic: "bag",   inn: 302, out: 210, name: { en: "Needs", th: "จำเป็น" } },
    { key: "save",  ic: "save",  inn: 242, out: 0,   name: { en: "Save",  th: "ออม" } },
    { key: "spend", ic: "cart",  inn: 136, out: 136, name: { en: "Spend", th: "ใช้" } },   // ← หมดพอดี
    { key: "share", ic: "heart", inn: 76,  out: 40,  name: { en: "Share", th: "แบ่งปัน" } }
  ],
  alloc: { followed: 19, total: 26 },   // ทำตามกฎ 73%

  /* --- พฤติกรรม ---
     streak นับเป็น "สัปดาห์" ของพฤติกรรมการเงิน (แบ่งเงินตามกฎ)
     ไม่ใช่ streak ของการ log เพราะ log ย้อนหลังทำให้ streak การ log ไม่มีความหมาย */
  spend: { need: 232, want: 154 },      // 60 : 40
  streak: { weeks: 3, best: 3, kind: { en: "split by my own rule", th: "แบ่งเงินตามกฎตัวเอง" } },
  reflectionsDone: 3, reflectionsDue: 3,

  triggers: [
    { when: "15:00–17:00", n: 6, where: { en: "Outside school",       th: "หน้าโรงเรียน" } },
    { when: "20:00–22:00", n: 5, where: { en: "At home, on my phone", th: "ที่บ้าน ตอนเล่นมือถือ" } },
    { when: "12:00–13:00", n: 3, where: { en: "School canteen",       th: "โรงอาหาร" } },
    { when: { en: "Weekend afternoons", th: "บ่ายวันหยุด" }, n: 3, where: { en: "The mall", th: "ห้าง" } }
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

  /* --- ⭐ C9 เมนูบทเรียนรายวัน --- */
  lessons: [
    { day: 1, done: true, ic: "search",
      t: { en: "See the hole", th: "เห็นหลุม" },
      s: { en: "Before today nobody had told you what you actually cost. Today you find out, and you find out you can earn.",
           th: "ก่อนวันนี้ไม่มีใครเคยบอกว่าจริงๆ แล้วเราใช้เงินเท่าไหร่ วันนี้ได้รู้ และได้รู้ว่าตัวเองหาเงินเองได้" },
      unlocked: { en: "Set your real cost · Log income · Log spending · Catch a want", th: "ตั้งค่าใช้จ่ายจริง · บันทึกรายได้ · บันทึกรายจ่าย · จับโมเมนต์อยากซื้อ" },
      kid:    { en: "Earn once, any amount · Write down what you spent", th: "หารายได้ 1 ครั้ง เท่าไหร่ก็ได้ · จดสิ่งที่ใช้เงินไป" },
      parent: { en: "Fill in what your child really costs · Confirm their first income", th: "กรอกค่าใช้จ่ายจริงของลูก · ยืนยันรายได้ก้อนแรก" },
      why:    { en: "People systematically underestimate their own cost of living. Seeing the real number is what makes everything after it land.",
                th: "คนเราประเมินค่าใช้จ่ายของตัวเองต่ำกว่าความจริงอย่างเป็นระบบ การได้เห็นตัวเลขจริงคือสิ่งที่ทำให้ทุกอย่างหลังจากนั้นมีน้ำหนัก" } },
    { day: 2, done: true, ic: "loan",
      t: { en: "Wanting things, and the borrowing trap", th: "ความอยากได้ กับกับดักเงินกู้" },
      s: { en: "What actually happens when you buy this? And what happens when you borrow to buy it?",
           th: "ถ้าซื้ออันนี้จะเกิดอะไรขึ้นจริงๆ แล้วถ้ากู้มาซื้อล่ะ จะเกิดอะไรขึ้น" },
      unlocked: { en: "What happens if I buy this · Loan simulator · Your small goal", th: "จะเกิดอะไรถ้าซื้ออันนี้ · เงินกู้จำลอง · เป้าเล็กของหนู" },
      kid:    { en: "Try the loan simulator once and watch the hole · Practise on three things you wanted", th: "ลองกู้จำลอง 1 ครั้งแล้วดูหลุม · ฝึกคิดกับของที่อยากได้ 3 อย่าง" },
      parent: { en: "Pick the one expense that becomes their small goal", th: "เลือกค่าใช้จ่าย 1 รายการให้เป็นเป้าเล็กของลูก" },
      why:    { en: "Interest explained as a formula does not change behaviour. Watching your own daily cost rise, and stay risen, does.",
                th: "อธิบายดอกเบี้ยด้วยสูตรไม่เปลี่ยนพฤติกรรม แต่การเห็นต้นทุนรายวันของตัวเองสูงขึ้นแล้วค้างอยู่อย่างนั้น เปลี่ยน" } },
    { day: 3, done: true, ic: "split",
      t: { en: "Out of the hole — saving and growing", th: "พ้นหลุมแล้วไปไหนต่อ — ออมและลงทุน" },
      s: { en: "Money that arrives without a rule leaves without one too. Today you write your own rule.",
           th: "เงินที่เข้ามาโดยไม่มีกฎ ก็ออกไปโดยไม่มีกฎ วันนี้เราเขียนกฎของตัวเอง" },
      unlocked: { en: "Splitting rule · Envelopes · Practice portfolio · Time machine", th: "กฎแบ่งเงิน · ซองเงิน · พอร์ตจำลอง · เครื่องเวลา" },
      kid:    { en: "Set your own split and stick to it for a week", th: "ตั้งกฎแบ่งเงินของตัวเอง แล้วทำตามให้ครบ 1 สัปดาห์" },
      parent: { en: "Don't correct their split, even if you'd choose differently", th: "อย่าไปแก้สัดส่วนของลูก ถึงจะคิดว่าควรเป็นอย่างอื่น" },
      why:    { en: "Automatic allocation at the moment money arrives beats willpower later. The rule has to be theirs or they won't follow it.",
                th: "การแบ่งอัตโนมัติตอนเงินเข้า ได้ผลกว่าการใช้ความตั้งใจทีหลัง และกฎต้องเป็นของเขาเอง ไม่งั้นเขาไม่ทำตาม" } },
    { day: 4, done: false, ic: "lock",
      t: { en: "Protecting what you built", th: "ปกป้องสิ่งที่สร้างมา" },
      s: { en: "Scams, environments that make spending too easy, insurance and tax — and the ceremony.",
           th: "กลโกง สิ่งแวดล้อมที่ทำให้จ่ายง่ายเกินไป ประกันและภาษี — และพิธีมอบรางวัล" },
      unlocked: { en: "Scam radar · Environment audit · Insurance & tax · Before/After · Certificate", th: "เรดาร์กลโกง · ตรวจสิ่งแวดล้อม · ประกันและภาษี · Before/After · ใบประกาศ" },
      kid:    { en: "Bring one offer you've seen that felt too good", th: "เอาข้อเสนอที่เคยเจอแล้วรู้สึกว่าดีเกินจริงมา 1 อัน" },
      parent: { en: "You hand your child their medal, not the instructor", th: "คุณเป็นคนมอบเหรียญให้ลูก ไม่ใช่ผู้สอน" },
      why:    { en: "The reward belongs to the family relationship, not to the classroom. That is why the parent presents it.",
                th: "รางวัลนี้เป็นเรื่องของความสัมพันธ์ในครอบครัว ไม่ใช่ของห้องเรียน เพราะแบบนั้นพ่อแม่จึงควรเป็นคนมอบ" } }
  ],

  /* --- สัปดาห์ที่แล้ว (ใช้ทำลูกศร ↑↓) --- */
  lastWeek: { coverage: 11, saving: 24, practice: 2, needPct: 48, streak: 2 },

  /* --- วันแรก → ตอนนี้ --- */
  before: { coverage: 0, saving: 0, practice: 0, need: 35, streak: 0, score: 21, bailoutFree: 20 },

  badges: [
    { ic: "search",   got: true,  t: { en: "Found my real cost", th: "รู้ค่าใช้จ่ายจริงแล้ว" } },
    { ic: "hand",     got: true,  t: { en: "Practised 5 times",  th: "ฝึกคิด 5 ครั้ง" } },
    { ic: "flame",    got: true,  t: { en: "3 weeks running",    th: "ต่อเนื่อง 3 สัปดาห์" } },
    { ic: "repeat",   got: true,  t: { en: "Saw what recurring costs do", th: "เห็นฤทธิ์ค่าใช้จ่ายต่อเนื่อง" } },
    { ic: "save",     got: false, t: { en: "Saved 4 weeks",      th: "ออมครบ 4 สัปดาห์" } },
    { ic: "mountain", got: false, t: { en: "Covered a full day", th: "ครอบคลุม 1 วันเต็ม" } }
  ],

  proud: {
    en: "I walked past the bubble tea shop three times this week — and I didn't have to talk myself out of it. I just didn't want it.",
    th: "อาทิตย์นี้เดินผ่านร้านชานมได้ 3 ครั้ง โดยไม่ต้องห้ามตัวเองเลย มันไม่อยากเอง"
  },
  reflection: { did: "", missed: "", fix: "" },
  certificateIssued: true    // ทุกคนที่เรียนจบได้ ไม่ผูกกับผลลัพธ์การเงิน
};

/* ============================================================ */

const KB = {
  s: null,

  boot() {
    try {
      const raw = localStorage.getItem("kfapp2");
      this.s = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(SEED));
    } catch (e) { this.s = JSON.parse(JSON.stringify(SEED)); }
  },
  save()  { try { localStorage.setItem("kfapp2", JSON.stringify(this.s)); } catch (e) {} },
  reset() { this.s = JSON.parse(JSON.stringify(SEED)); this.save(); },

  /* ---------- ค่าใช้จ่าย ---------- */
  monthlyCost() { return this.s.costItems.reduce((a, c) => a + c.perMonth, 0); },
  dailyCost()   { return Math.round(this.monthlyCost() / 30); },          // 200 (+ ยอดผ่อนถ้ามีเงินกู้)
  cumCost()     { return this.dailyCost() * this.s.child.daysElapsed; },  // 4,200
  baseDailyCost() {                                                      // ต้นทุนก่อนมีหนี้/ค่าต่อเนื่อง
    return Math.round(this.s.costItems.filter(c => c.source === "parent")
      .reduce((a, c) => a + c.perMonth, 0) / 30);
  },
  addedDailyCost() { return this.dailyCost() - this.baseDailyCost(); },

  /* ---------- รายได้ ---------- */
  verified() { return this.s.income.filter(i => i.ok); },
  pending()  { return this.s.income.filter(i => !i.ok); },
  incomeTotal()  { return this.verified().reduce((a, i) => a + i.amt, 0); },   // 756
  pendingTotal() { return this.pending().reduce((a, i) => a + i.amt, 0); },
  hoursTotal()   { return this.verified().reduce((a, i) => a + i.hrs, 0); },
  hourly()       { const h = this.hoursTotal(); return h ? this.incomeTotal() / h : 0; },  // ~60฿/ชม

  /* ---------- ⭐ 2 เป้าหมาย ---------- */
  goalSmallItem() { return this.s.costItems.find(c => c.id === this.s.goalSmallItemId) || this.s.costItems[3]; },
  goalSmallPerDay() { return this.goalSmallItem().perMonth / 30; },                 // 10 ฿/วัน
  /** cover ได้กี่ % ของรายการนั้น (คิดเป็นเดือน) — เกิน 100 = ถึงเป้าแล้ว */
  goalSmallPct()  { return Math.min(100, this.pct(this.incomeTotal(), this.goalSmallItem().perMonth)); },
  /** "จ่ายค่ามือถือได้กี่วัน" — หน่วยที่ทำให้เงินก้อนเล็กมีความหมาย (C10) */
  goalSmallDays() { const d = this.goalSmallPerDay(); return d ? Math.floor(this.incomeTotal() / d) : 0; },
  goalSmallDone() { return this.incomeTotal() >= this.goalSmallItem().perMonth; },

  goalBigPct()  { return this.coverage(); },
  goalBigDays() { const d = this.dailyCost(); return d ? this.incomeTotal() / d : 0; },
  goalBigDone() { return this.coverage() >= 100; },

  /** เงินก้อนเดียวแปลงเป็นจำนวนวัน — ใช้ในหน้าฉลอง S3b */
  daysOf(amt) {
    return { small: Math.floor(amt / this.goalSmallPerDay()), big: amt / this.dailyCost() };
  },

  /* ---------- Metrics (§4) ---------- */
  coverage()        { return this.pct(this.incomeTotal(), this.cumCost()); },              // 18%
  coveragePending() { return this.pct(this.incomeTotal() + this.pendingTotal(), this.cumCost()); },
  savingRate()      { return this.pct(this.env("save").inn, this.envInAll()); },           // 32%
  adherence()       { return this.pct(this.s.alloc.followed, this.s.alloc.total); },       // 73%
  needPct()         { const s = this.s.spend; return this.pct(s.need, s.need + s.want); }, // 60%

  /** ⭐ นับ "ครั้งที่ฝึกคิด" แทน pause rate % — เพราะตัวหารของ pause rate
      ต้องรู้จำนวนครั้งที่อยากซื้อทั้งหมด ซึ่งเก็บจริงไม่ได้ (§4.1) */
  practiceCount() { return this.s.intents.length; },                                       // 5

  /* 🏆 Money Habit Score — ถ่วงน้ำหนักตามสเปค 2026-07-27
     coverage 30 + adherence 30 + ฝึกคิด 15 + streak 15 + reflection 10
     เกณฑ์เต็มของ 2 ตัวกลาง: ฝึกคิด 5 ครั้ง/สัปดาห์ · streak 4 สัปดาห์ (= จบโปรแกรม) */
  scoreParts() {
    return [
      { k: L("Covered", "หาเองได้"),                v: Math.min(100, this.coverage()), w: .30 },
      { k: L("Followed own rule", "ทำตามกฎตัวเอง"),  v: this.adherence(),               w: .30 },
      { k: L("Practised thinking", "ฝึกคิดก่อนซื้อ"), v: Math.min(100, this.practiceCount() / 5 * 100), w: .15 },
      { k: L("Kept it up", "ทำต่อเนื่อง"),            v: Math.min(100, this.s.streak.weeks / 4 * 100),  w: .15 },
      { k: L("Reflected", "สะท้อนตัวเอง"),            v: this.pct(this.s.reflectionsDone, this.s.reflectionsDue), w: .10 }
    ];
  },
  score() { return Math.round(this.scoreParts().reduce((a, p) => a + p.v * p.w, 0)); },   // 64

  /* ---------- ซองเงิน ---------- */
  env(k)      { return this.s.envelopes.find(e => e.key === k); },
  envBal(e)   { return Math.max(0, e.inn - e.out); },
  envFill(e)  { return e.inn ? this.pct(this.envBal(e), e.inn) : 0; },
  envInAll()  { return this.s.envelopes.reduce((a, e) => a + e.inn, 0); },
  emptyEnvs() { return this.s.envelopes.filter(e => this.envBal(e) === 0 && e.inn > 0); },

  /* ---------- พ่อแม่ ---------- */
  bailoutFree() { const p = this.s.parent; return this.pct(p.noBailout, p.bailoutChances); },  // 78%

  /* ---------- ⭐ เงินกู้จำลอง ---------- */
  activeLoans() { return this.s.loans.filter(l => l.open); },
  loanWeekly()  { return this.activeLoans().reduce((a, l) => a + l.perWeek, 0); },
  takeLoan(amt, weeks) {
    const perWeek = Math.round(amt / weeks);
    const id = "loan" + Date.now();
    this.s.loans.push({ id, amt, perWeek, weeks, left: amt, open: true, takenWeek: this.s.child.week });
    this.s.costItems.push({
      id, source: "loan", perMonth: Math.round(perWeek * 52 / 12),
      name: { en: "Loan repayment", th: "ยอดผ่อนเงินกู้" }
    });
    this.save();
    return id;
  },
  closeLoan(id) {
    const l = this.s.loans.find(x => x.id === id); if (l) { l.open = false; l.left = 0; }
    this.s.costItems = this.s.costItems.filter(c => c.id !== id);
    this.save();
  },
  /** ต้นทุน/วัน จะเป็นเท่าไหร่ถ้ากู้ก้อนนี้ — ใช้โชว์ "ก่อน-หลัง" ก่อนกดยืนยัน */
  previewDailyCost(perWeek) {
    return Math.round((this.monthlyCost() + perWeek * 52 / 12) / 30);
  },

  /* ---------- Actions ---------- */
  addIncome(amt, lv, hrs, note, mode, dayLabel) {
    this.s.income.push({ id: Date.now(), amt, lv, hrs, ok: false, mode: mode || "live",
                         d: dayLabel || { en: "Today", th: "วันนี้" }, note: { en: note, th: note } });
    const r = this.s.rule;
    this.s.envelopes.forEach(e => { e.inn += Math.round(amt * r[e.key] / 100); });
    this.s.alloc.followed++; this.s.alloc.total++;
    this.save();
  },
  verifyIncome(id, ok) {
    if (ok) { const i = this.s.income.find(x => x.id === id); if (i) i.ok = true; }
    else    { this.s.income = this.s.income.filter(x => x.id !== id); }
    this.save();
  },
  addExpense(amt, kind, envKey) {
    const e = this.env(envKey); if (e) e.out += amt;
    this.s.spend[kind] += amt;
    this.save();
  },
  /** ทุกครั้งที่ฝึกคิด นับเท่ากัน ไม่ว่าจะลงเอยด้วยซื้อหรือไม่ซื้อ */
  addIntent(amt, cat, recur, decision, what, mode) {
    this.s.intents.push({ id: Date.now(), amt, cat, recur, decision, mode: mode || "live",
                          what: { en: what, th: what } });
    if (recur > 0 && decision === "bought") {
      this.s.costItems.push({ id: "sub" + Date.now(), source: "sub", perMonth: recur,
                              name: { en: what, th: what } });
    }
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
