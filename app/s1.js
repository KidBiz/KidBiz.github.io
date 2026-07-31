/* ============================================================
   S1 — หน้าแรก: ค่าใช้จ่ายของฉัน  ⭐ หน้าที่สำคัญที่สุด
   N1 เริ่มจากยังไม่ครอบคลุม · Coverage % = พระเอก
   ⭐ loop รายเดือน · เป้าหมายเป็นชั้น เติมชั้นล่างเต็มก่อนแล้วล้นขึ้นชั้นถัดไป
      จำนวนชั้นตั้งได้ที่ data.js (goalTiers) — ชั้นบนสุดคือค่าใช้จ่ายทั้งเดือนเสมอ
      เกินทั้งเดือน = เงินส่วนเกิน แสดงคนละสีเหนือเส้น 100%
   ============================================================ */

const S1_DAYS = 30;

const S1_MONTHS = [
  { en: "January", th: "มกราคม" },  { en: "February", th: "กุมภาพันธ์" }, { en: "March",     th: "มีนาคม" },
  { en: "April",   th: "เมษายน" },  { en: "May",      th: "พฤษภาคม" },   { en: "June",      th: "มิถุนายน" },
  { en: "July",    th: "กรกฎาคม" }, { en: "August",   th: "สิงหาคม" },   { en: "September", th: "กันยายน" },
  { en: "October", th: "ตุลาคม" },  { en: "November", th: "พฤศจิกายน" },  { en: "December",  th: "ธันวาคม" }
];

/* ป้ายเดือนถัดไปนับจากเดือนปัจจุบัน — วนข้ามปีเองได้ */
function S1_LABEL(offset) {
  const i = S1_MONTHS.findIndex(m => m.en === KB.s.monthLabel.en);
  return S1_MONTHS[((i < 0 ? 6 : i) + offset) % 12];
}

/** กระจายรายได้ก้อนเดียวข้ามหลายเดือน
    เดือนหนึ่งรับได้ไม่เกินค่าใช้จ่ายของเดือนนั้น ที่เหลือไหลไปเติมเดือนถัดไปเอง
    ในเดือนหนึ่งเติมชั้นล่างสุดจนเต็มก่อนเสมอ — เป้าเล็ก → เป้าถัดไป → ส่วนที่เหลือของเดือน
    คืนอย่างน้อย 3 เดือน ถึงเดือนหน้าจะยังว่าง เพราะต้องเห็นว่าเลื่อนดูข้างหน้าได้ */
function S1_SPREAD(income, monthCost, tiers, all) {
  const span = Math.max(3, Math.min(12, Math.ceil(income / monthCost) + 1));
  let left = income;
  const out = [];
  for (let m = 0; m < span; m++) {
    const take = Math.max(0, Math.min(left, monthCost));
    left -= take;
    let base = 0;
    const rows = tiers.map(t => {
      const filled = Math.max(0, Math.min(take - base, t.cost));
      base += t.cost;
      return { name: t.name, cost: t.cost, perDay: t.cost / S1_DAYS, filled, i: t.i };
    });
    rows.push({ name: all.name, cost: monthCost, perDay: monthCost / S1_DAYS,
                filled: take, i: tiers.length, isTotal: true });
    out.push({ label: S1_LABEL(m), take, rows, now: m === 0 });
  }
  return out;
}

/** ทางเลือกสำหรับเงินที่เกินค่าใช้จ่ายทั้งเดือน
    ลำดับตั้งใจ: สำรองฉุกเฉิน → ประกัน → ลงทุน เพราะสองอันหลังพังได้ถ้าไม่มีอันแรกรอง
    ประกันกับลงทุนเป็นคำอธิบายเท่านั้น — เนื้อหาเต็มอยู่ในวันเรียนที่ 3 กับ 4 และ
    ยังไม่มีระบบรองรับในแอป จึงไม่มีตัวเลขผลตอบแทนและไม่เอ่ยชื่อผลิตภัณฑ์จริง */
function OVERFLOW_OPTIONS() {
  const free = KB.surplusFree();
  const bufferShort = KB.env("buffer").inn < KB.bufferTarget();
  const firstNote = L(
    `Your emergency money isn't full yet (${KB.bufferPct()}% of ${KB.baht(KB.bufferTarget())}). This one still works better first — read on if you want, but fill that up before you commit money here.`,
    `เงินสำรองฉุกเฉินยังไม่เต็ม (${KB.bufferPct()}% ของ ${KB.baht(KB.bufferTarget())}) อันนั้นควรมาก่อน — อ่านต่อได้เลย แต่เก็บให้พอก่อนค่อยเอาเงินมาลงตรงนี้`);

  return [
    { key: "buffer", rec: true,
      title: L("Emergency money", "เงินสำรองฉุกเฉิน"),
      concept: L(`Money set aside for things nobody plans for, so that when one happens you don't have to borrow. A common target is three months of what you cost — for you that's ${KB.baht(KB.bufferTarget())}, and you're at ${KB.bufferPct()}%.`,
                 `เงินที่กันไว้สำหรับเรื่องที่ไม่มีใครวางแผนไว้ เพื่อว่าพอเกิดขึ้นจริงจะได้ไม่ต้องไปกู้ เป้าที่คนใช้กันคือค่าใช้จ่าย 3 เดือน — ของหนูคือ ${KB.baht(KB.bufferTarget())} ตอนนี้อยู่ที่ ${KB.bufferPct()}%`),
      items: [L("Something breaks — a dropped phone, shoes that split", "ของพังกะทันหัน — โทรศัพท์ตก รองเท้าขาด"),
              L("Doctor and medicine", "ค่าหมอ ค่ายา"),
              L("A month where you earn nothing at all", "เดือนที่หารายได้ไม่ได้เลย"),
              L("Anything that would otherwise turn into a loan", "อะไรก็ตามที่ถ้าไม่มีเงินก้อนนี้จะกลายเป็นหนี้")],
      action: L(`Put ${KB.baht(free)} in the emergency envelope`, `เก็บ ${KB.baht(free)} เข้าซองสำรองฉุกเฉิน`) },

    { key: "insure", first: bufferShort ? firstNote : "",
      title: L("Insurance", "ประกัน"),
      concept: L("Paying a small amount regularly so that you don't have to pay a huge amount on the day something goes wrong. You are buying away one specific risk, not growing money.",
                 "จ่ายเงินก้อนเล็กอย่างสม่ำเสมอ เพื่อจะได้ไม่ต้องจ่ายก้อนใหญ่ในวันที่เกิดเรื่อง เป็นการซื้อความเสี่ยงออกไปหนึ่งเรื่อง ไม่ใช่การทำให้เงินโต"),
      items: [L("Health and accident", "สุขภาพและอุบัติเหตุ"),
              L("Life", "ชีวิต"),
              L("Things — a vehicle, a home, a phone", "ทรัพย์สิน — รถ บ้าน โทรศัพท์"),
              L("Each one only pays for what the contract says, which is why reading it matters", "แต่ละอันจ่ายเฉพาะเรื่องที่เขียนไว้ในสัญญา เพราะแบบนี้การอ่านสัญญาถึงสำคัญ")],
      later: L("The full lesson is on day 3.", "รายละเอียดเต็มอยู่ในวันเรียนที่ 3") },

    { key: "invest", first: bufferShort ? firstNote : "",
      title: L("Investing", "ลงทุน"),
      concept: L("Letting money work instead of sitting still, in exchange for its value going up and down along the way. The swing is the price, not a mistake — which is why it needs money you won't need back next week.",
                 "ให้เงินทำงานแทนที่จะอยู่เฉยๆ แลกกับการที่มูลค่าจะขึ้นๆ ลงๆ ระหว่างทาง ความผันผวนคือราคาที่ต้องจ่าย ไม่ใช่ความผิดพลาด เพราะแบบนี้จึงต้องใช้เงินที่ไม่ต้องรีบเอาคืนสัปดาห์หน้า"),
      items: [L("Low risk, slow — a fixed deposit or savings lottery", "เสี่ยงต่ำ โตช้า — ฝากประจำ สลากออมทรัพย์"),
              L("Spread across many things at once — a mutual fund", "กระจายไปหลายอย่างพร้อมกัน — กองทุนรวม"),
              L("A share of one company — more swing", "หุ้นของบริษัทเดียว — เหวี่ยงกว่า"),
              L("Crypto and forex — the highest swing, and where most of the scams live", "คริปโตกับฟอเร็กซ์ — เหวี่ยงที่สุด และเป็นที่ที่กลโกงอยู่เยอะที่สุด")],
      later: L("The full lesson is on day 4, with a practice portfolio that isn't built yet.",
               "รายละเอียดเต็มอยู่ในวันเรียนที่ 4 พร้อมพอร์ตจำลองที่ยังไม่ได้สร้าง") }
  ];
}

SCREENS.s1 = {
title: () => L("Cost Covered", "ค่าใช้จ่ายของฉัน"),
sub: () => `${LT(KB.s.monthLabel)} · ${LT(KB.s.child.name)}`,
notes: () => [
  [L("A day is the unit, not a percentage", "หน่วยคือวัน ไม่ใช่เปอร์เซ็นต์"), L("One square is one day. A percentage is an abstraction a teenager has to translate; 'this pays for four days of food' needs no translation at all.",
      "หนึ่งช่องคือหนึ่งวัน เปอร์เซ็นต์เป็นของนามธรรมที่เด็กต้องแปลอีกที แต่ 'เงินนี้จ่ายค่าอาหารได้ 4 วัน' ไม่ต้องแปลเลย")],
  [L("Layers, filled bottom up", "เป็นชั้น เติมจากล่างขึ้นบน"), L("Money fills the cheapest goal for the whole month first and only then flows into the next. A teenager gets to finish something real in week one instead of staring at a number that takes a year.",
      "เงินเติมเป้าที่ถูกที่สุดให้เต็มทั้งเดือนก่อน แล้วค่อยไหลไปชั้นถัดไป เด็กจะได้จบอะไรที่จับต้องได้ตั้งแต่สัปดาห์แรก แทนที่จะมองตัวเลขที่ต้องใช้เวลาเป็นปี")],
  [L("The months are a runway", "เดือนถัดไปคือระยะที่ยืนได้"), L("Earn past this month and the extra does not vanish into a 'surplus' number — it fills the months ahead, so the question becomes how long you could keep yourself going.",
      "ถ้าหาได้เกินเดือนนี้ ส่วนเกินจะไม่หายไปเป็นแค่ตัวเลข 'เงินส่วนเกิน' แต่ไปเติมเดือนถัดไปให้เห็น คำถามจึงกลายเป็นว่าตอนนี้เลี้ยงตัวเองไปได้อีกนานแค่ไหน")]
],

css: `
.s1hero { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-lg);
  padding: 18px 18px 17px; box-shadow: var(--shadow); margin-bottom: 13px; }
/* --- ตารางรายวัน · แถว = เป้าหมาย · คอลัมน์ = 30 วันของเดือน ---
   หนึ่งช่อง = หนึ่งวัน เติมจากล่างขึ้นบน · วันที่เงินไม่พอทั้งวันจะเห็นเป็นช่องเติมไม่เต็ม
   เลื่อนแนวนอน = เดือนถัดไป · เงินที่เกินเดือนนี้ไหลไปเติมเดือนหน้าให้เห็นเป็นแถบจริงๆ */
.s1scroll { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory;
  margin: 0 -18px; padding: 0 18px 6px; scrollbar-width: none; }
.s1scroll::-webkit-scrollbar { display: none; }
.s1mon { flex: 0 0 100%; scroll-snap-align: center; }
.s1mtop { display: flex; align-items: baseline; gap: 8px; margin-bottom: 13px; }
.s1mtop b { font-size: var(--fs-md); font-weight: 700; }
.s1mtop .now { font-size: var(--fs-xs); font-weight: 700; color: var(--c-fill-ink);
  background: var(--c-fill-soft); padding: 3px 9px; border-radius: var(--r-pill); }
.s1mtop .pc { margin-left: auto; font-size: var(--fs-md); font-weight: 700; font-variant-numeric: tabular-nums; }
.s1mtop .pc.zero { color: var(--c-ink-3); font-size: var(--fs-xs); font-weight: 600; }

/* กราฟเดียว 3 ชั้นซ้อน · Goal 1 อยู่ล่างสุด (ถูกที่สุด ถึงก่อน)
   แต่ละชั้นเติมจากซ้ายไปขวาตามจำนวน "วัน" ของชั้นตัวเอง เส้น grid รายวันลากผ่านทุกชั้น */
.s1chart { position: relative; border: 1px solid var(--c-line); border-radius: var(--r-sm); overflow: hidden; }
.s1band { position: relative; height: 58px; background: var(--c-surface-2);
  border-bottom: 1px solid var(--c-line); display: flex; align-items: center; }
.s1band:last-child { border-bottom: 0; }
.s1band > i { position: absolute; left: 0; top: 0; bottom: 0; background: var(--dot); display: block;
  transition: width .7s cubic-bezier(.2,.9,.25,1); }
/* ป้ายมีพื้นขาวจางรองเสมอ — อ่านออกทั้งตอนทับสีเต็มและตอนอยู่บนพื้นเปล่า */
.s1band .lb { position: relative; margin-left: 9px; font-size: var(--fs-sm); font-weight: 700;
  background: rgba(255,255,255,.9); color: var(--c-ink); padding: 4px 10px; border-radius: var(--r-pill);
  min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
/* ป้ายวันห้ามหด — ชื่อเป้ายาวๆ ให้ตัดด้วย … แทนที่จะดันตัวเลขวันตกขอบ */
.s1band .dy { flex: none; position: relative; margin-left: auto; margin-right: 9px; font-size: var(--fs-xs); font-weight: 700;
  background: rgba(255,255,255,.9); color: var(--c-ink-2); padding: 4px 9px; border-radius: var(--r-pill);
  font-variant-numeric: tabular-nums; }
/* เส้นรายวัน 30 เส้น + เส้นเข้มทุก 10 วัน วาดทับทั้งกราฟทีเดียว */
.s1lines { position: absolute; inset: 0; pointer-events: none; background:
  repeating-linear-gradient(to right, transparent 0 calc(100% / 30 - 1px), rgba(24,24,27,.10) calc(100% / 30 - 1px) calc(100% / 30)),
  repeating-linear-gradient(to right, transparent 0 calc(100% / 3 - 1px),  rgba(24,24,27,.28) calc(100% / 3 - 1px)  calc(100% / 3)); }
.s1ruler { display: flex; justify-content: space-between; font-size: var(--fs-xs);
  color: var(--c-ink-3); font-weight: 600; margin-top: 5px; }

.s1nav { display: flex; align-items: center; gap: 9px; margin-top: 15px; }
.s1nav button { font-family: var(--font); font-size: var(--fs-sm); font-weight: 700; cursor: pointer;
  background: var(--c-surface-2); color: var(--c-ink); border: 0; border-radius: var(--r-pill);
  padding: 10px 14px; display: inline-flex; align-items: center; }
.s1nav button:disabled { opacity: .3; cursor: default; }
.s1nav .run { margin-left: auto; font-size: var(--fs-sm); font-weight: 700; color: var(--c-ink-2); text-align: right; }

/* แถบเติมรายได้ · ปิดอยู่เป็นค่าเริ่มต้น กดแล้วกางฟอร์มในหน้าแรกเลย ไม่ต้องเปิด sheet
   เพราะการกรอกย้อนหลังคือโหมดปกติของผู้ใช้เรา ยิ่งกดน้อยขั้นยิ่งได้ข้อมูล */
.s1add { margin-bottom: 13px; }
.s1add .tg { width: 100%; display: flex; align-items: center; gap: 9px; cursor: pointer;
  font-family: var(--font); font-size: var(--fs-md); font-weight: 700; text-align: left;
  background: var(--brand-amber-soft); color: var(--brand-amber-d);
  border: 1.5px solid var(--brand-amber); border-radius: var(--r-sm); padding: 13px 15px; }
.s1add .tg .cv { margin-left: auto; transition: transform .2s; }
.s1add.open .tg { border-radius: var(--r-sm) var(--r-sm) 0 0; }
.s1add.open .tg .cv { transform: rotate(180deg); }
.s1add .bd { display: none; border: 1.5px solid var(--brand-amber); border-top: 0;
  border-radius: 0 0 var(--r-sm) var(--r-sm); padding: 15px; }
.s1add.open .bd { display: block; }
.s1add .fl { display: block; font-size: var(--fs-xs); font-weight: 700; color: var(--c-ink-3); margin-bottom: 6px; }
.s1add .row { margin-bottom: 13px; }
.s1add .chips { display: flex; flex-wrap: wrap; gap: 7px; }
.s1add .chips button { font-family: var(--font); font-size: var(--fs-sm); font-weight: 700; cursor: pointer;
  background: var(--c-surface-2); color: var(--c-ink); border: 1.5px solid var(--c-line);
  border-radius: var(--r-pill); padding: 9px 13px; }
.s1add .chips button.on { border-color: var(--c-fill); background: var(--c-fill-soft); color: var(--c-fill-ink); }
.s1add .more { display: block; width: 100%; margin-top: 10px; background: none; border: 0; cursor: pointer;
  font-family: var(--font); font-size: var(--fs-sm); font-weight: 700; color: var(--c-ink-3); text-decoration: underline; }

/* --- โหลเต็มแล้ว: เงินส่วนเกินมีคำถามติดมา ---
   ขึ้นเฉพาะตอน Goal 3 เต็ม 100% เพราะก่อนหน้านั้นเงินยังมีที่ไปอยู่แล้ว (ไหลขึ้นชั้นถัดไป)
   ไม่ใช่การ์ดเฉลิมฉลอง แต่เป็นทางแยก — เด็กเป็นคนเลือก แอปแค่บอกว่าแต่ละทางแปลว่าอะไร */
.s1over { margin-bottom: 13px; border-radius: var(--r-sm); overflow: hidden;
  border: 1.5px solid var(--c-fill); background: var(--c-fill-soft); }
.s1over .tg { width: 100%; display: flex; align-items: center; gap: 10px; cursor: pointer;
  font-family: var(--font); font-size: var(--fs-md); font-weight: 700; text-align: left;
  background: none; border: 0; color: var(--c-fill-ink); padding: 14px 15px; line-height: 1.45; }
.s1over .tg .cv { margin-left: auto; flex: none; transition: transform .2s; }
.s1over.open .tg .cv { transform: rotate(180deg); }
.s1over .bd { display: none; padding: 0 15px 15px; }
.s1over.open .bd { display: block; }

.s1opt { background: var(--c-surface); border: 1.5px solid var(--c-line); border-radius: var(--r-sm);
  margin-bottom: 9px; overflow: hidden; }
.s1opt:last-child { margin-bottom: 0; }
.s1opt .oh { width: 100%; display: flex; align-items: center; gap: 10px; cursor: pointer;
  font-family: var(--font); text-align: left; background: none; border: 0; padding: 13px 14px; }
.s1opt .oh .n { width: 27px; height: 27px; border-radius: 9px; flex: none; display: grid; place-items: center;
  background: var(--c-surface-2); color: var(--c-ink-2); font-size: var(--fs-sm); font-weight: 700; }
.s1opt.on .oh .n { background: var(--c-fill); color: #fff; }
.s1opt .oh b { font-size: var(--fs-md); font-weight: 700; }
.s1opt .oh .rec { font-size: var(--fs-xs); font-weight: 700; color: var(--c-fill-ink);
  background: var(--c-fill-soft); padding: 3px 8px; border-radius: var(--r-pill); margin-left: 6px; }
.s1opt .oh .cv { margin-left: auto; flex: none; color: var(--c-ink-3); transition: transform .2s; }
.s1opt.on .oh .cv { transform: rotate(180deg); }
.s1opt .ob { display: none; padding: 0 14px 14px; }
.s1opt.on .ob { display: block; }
.s1opt .cc { font-size: var(--fs-sm); line-height: 1.65; color: var(--c-ink-2); margin-bottom: 11px; }
.s1opt ul { list-style: none; margin-bottom: 11px; }
.s1opt li { display: flex; gap: 9px; font-size: var(--fs-sm); line-height: 1.6; padding: 5px 0; }
.s1opt li:before { content: ""; width: 6px; height: 6px; border-radius: 50%; flex: none;
  background: var(--c-ink-3); margin-top: 9px; }
/* คำเตือนก่อนเข้าเนื้อหาข้อ 2-3 — ไม่ปิดกั้น แต่ต้องอ่านผ่านตาก่อน */
.s1first { display: flex; gap: 9px; background: var(--brand-amber-soft); color: var(--brand-amber-d);
  border-radius: var(--r-sm); padding: 12px 13px; font-size: var(--fs-sm); font-weight: 600;
  line-height: 1.6; margin-bottom: 11px; }
.s1later { font-size: var(--fs-xs); color: var(--c-ink-3); line-height: 1.6; }
.s1parked { display: flex; gap: 9px; align-items: flex-start; font-size: var(--fs-sm);
  color: var(--c-fill-ink); font-weight: 700; line-height: 1.6; padding: 14px 15px; }

.s1sum { margin-top: 12px; background: var(--c-fill-soft); color: var(--c-fill-ink);
  border-radius: var(--r-sm); padding: 15px; }
.s1sum .hd { display: flex; gap: 10px; align-items: flex-start; font-size: var(--fs-md); line-height: 1.6; }
.s1sum b { font-weight: 700; font-variant-numeric: tabular-nums; }
.s1sum .gl { margin-top: 13px; padding-top: 13px; border-top: 1px solid rgba(24,24,27,.10); }
.s1sum .g { display: flex; align-items: center; gap: 9px; font-size: var(--fs-sm); line-height: 1.5; margin-bottom: 8px; }
.s1sum .g:last-child { margin-bottom: 0; }
.s1sum .g .sw { width: 12px; height: 12px; border-radius: 3px; background: var(--dot); flex: none; }
.s1sum .g .rt { margin-left: auto; font-weight: 700; font-variant-numeric: tabular-nums; }
.s1sum .g.done .rt { color: var(--c-fill-ink); }

.nextup { display: flex; align-items: center; gap: 9px; background: var(--c-surface-2); border-radius: var(--r-sm);
  padding: 12px 14px; font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.5; margin-top: 12px; }
.nextup b { color: var(--c-ink); }

/* --- เป้าหมายเป็นชั้น --- */
.goal { padding: 15px 0; border-bottom: 1px solid var(--c-line); }
.goal:last-child { border: 0; padding-bottom: 2px; }
.goal.total { border-top: 2px solid var(--c-line); margin-top: 4px; padding-top: 16px; }
.goal .hd { display: flex; align-items: baseline; gap: 8px; margin-bottom: 3px; }
.goal .nm { font-size: var(--fs-md); font-weight: 700; }
.goal .amt { margin-left: auto; font-size: var(--fs-lg); font-weight: 700; font-variant-numeric: tabular-nums; }
.goal .amt em { font-style: normal; font-size: var(--fs-sm); color: var(--c-ink-3); font-weight: 600; }
.goal .sub { font-size: var(--fs-xs); color: var(--c-ink-3); margin-bottom: 9px; line-height: 1.5; }
.goal .bar > i { background: var(--dot); }
.goal .bar { height: 13px; }
.goal .foot { display: inline-flex; align-items: center; gap: 6px; margin-top: 9px; font-size: var(--fs-sm); font-weight: 700;
  padding: 8px 13px; border-radius: var(--r-pill); background: var(--c-surface-2); color: var(--c-ink-2); }
.goal.done .foot { background: var(--c-fill-soft); color: var(--c-fill-ink); }
.goal.active .foot { background: var(--brand-amber-soft); color: var(--brand-amber-d); }

/* --- เดือนที่ผ่านมา --- */
.cost-line { display: flex; justify-content: space-between; align-items: center; gap: 10px;
  font-size: var(--fs-md); padding: 9px 0; border-bottom: 1px dashed var(--c-line); }
.cost-line:last-child { border: 0; }
.cost-line b { font-variant-numeric: tabular-nums; font-weight: 700; }
.cost-line .tag { font-size: var(--fs-xs); font-weight: 700; color: var(--brand-amber-d);
  background: var(--brand-amber-soft); padding: 3px 8px; border-radius: var(--r-pill); }
.guess { background: var(--c-fill-soft); border-radius: var(--r-sm); padding: 13px 14px;
  font-size: var(--fs-sm); margin-top: 12px; line-height: 1.6; color: var(--c-fill-ink);
  display: flex; gap: 9px; align-items: flex-start; }
.guess .ic { margin-top: 2px; }
.guess b { font-weight: 700; }

.acts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
.acts .btn { padding: 18px 8px; font-size: var(--fs-md);
  display: flex; align-items: center; justify-content: center; gap: 8px; }
.acts .wide { grid-column: 1 / -1; }
`,

render() {
  const s = KB.s;
  const monthCost = KB.monthCost(), income = KB.monthIncome();
  const surplus = KB.surplus(), added = KB.addedDailyCost();
  const goals = KB.goals(), total = goals[goals.length - 1], tiers = goals.slice(0, -1);
  const active = KB.activeGoal();
  const colourOf = i => (i === 0 ? "var(--c-tier1)" : i === 1 ? "var(--c-tier2)" : "var(--c-tier3)");

  const months = S1_SPREAD(income, monthCost, tiers, total);
  const perDay = KB.dailyCost();
  const runDays = perDay ? Math.floor(income / perDay) : 0;
  const runMonths = Math.floor(income / monthCost);

  return `
  <div class="s1hero">
    <div class="s1add" id="s1add">
      <button class="tg">${I("plus", 19)} ${L("Add income?", "เติมรายได้ไหม")}
        <span class="cv">${I("arrowDown", 17)}</span></button>
      <div class="bd">
        <div class="row">
          <label class="fl" for="s1amt">${L("How much came in?", "ได้มาเท่าไหร่")}</label>
          <input class="inp" id="s1amt" type="number" inputmode="numeric" min="1" placeholder="0">
        </div>
        <div class="row">
          <span class="fl">${L("What kind of work?", "งานแบบไหน")}</span>
          <div class="chips" id="s1lv">
            ${KB.s.workLevels.map((w, i) => `
              <button data-lv="${i + 1}" class="${i === 1 ? "on" : ""}">${LT(w)}</button>`).join("")}
          </div>
        </div>
        <div class="row">
          <span class="fl">${L("Which day?", "วันไหน")}</span>
          <div class="chips" id="s1day">
            <button data-day="0" class="on">${L("Today", "วันนี้")}</button>
            <button data-day="1">${L("Yesterday", "เมื่อวาน")}</button>
            <button data-day="2">${L("Earlier this week", "ต้นสัปดาห์")}</button>
          </div>
        </div>
        <button class="btn fill" id="s1save">${L("Save it", "บันทึก")}</button>
        <button class="more" id="s1full">${L("Add hours and a note instead", "กรอกแบบละเอียด (ชั่วโมง + โน้ต)")}</button>
      </div>
    </div>

    ${KB.goalBigDone() ? (KB.surplusFree()
      ? `<div class="s1over" id="s1over">
      <button class="tg">${I("sparkle", 19)}
        <span>${L(`This month is covered, and ${KB.baht(KB.surplusFree())} is left over. What should it do next?`,
                  `เดือนนี้เต็มแล้ว และเหลืออีก ${KB.baht(KB.surplusFree())} — เอาไปทำอะไรดี?`)}</span>
        <span class="cv">${I("arrowDown", 17)}</span></button>
      <div class="bd">${OVERFLOW_OPTIONS().map((o, i) => `
        <div class="s1opt" data-opt="${o.key}">
          <button class="oh"><span class="n">${i + 1}</span>
            <b>${o.title}</b>${o.rec ? `<span class="rec">${L("recommended", "แนะนำ")}</span>` : ""}
            <span class="cv">${I("arrowDown", 16)}</span></button>
          <div class="ob">
            ${o.first ? `<div class="s1first">${I("bulb", 17)}<div>${o.first}</div></div>` : ""}
            <div class="cc">${o.concept}</div>
            <ul>${o.items.map(t => `<li><span>${t}</span></li>`).join("")}</ul>
            ${o.action
              ? `<button class="btn fill sm" data-park="${o.key}" style="width:100%">${o.action}</button>`
              : `<div class="s1later">${o.later}</div>`}
          </div>
        </div>`).join("")}
      </div>
    </div>`
      : `<div class="s1over"><div class="s1parked">${I("check", 18)}<div>${L(
          `All ${KB.baht(KB.s.surplusParked)} of this month's leftover has somewhere to be.`,
          `เงินเหลือของเดือนนี้ ${KB.baht(KB.s.surplusParked)} มีที่ไปครบแล้ว`)}</div></div></div>`) : ""}

    <div class="s1scroll">
      ${months.map(m => `
      <div class="s1mon">
        <div class="s1mtop">
          <b>${LT(m.label)}</b>
          ${m.now ? `<span class="now">${L("this month", "เดือนนี้")}</span>` : ""}
          ${m.take
            ? `<span class="pc">${Math.round(m.take / monthCost * 100)}%</span>`
            : `<span class="pc zero">${L("nothing reaches here yet", "เงินยังมาไม่ถึงเดือนนี้")}</span>`}
        </div>
        <div class="s1chart">
          ${m.rows.slice().reverse().map(r => {
            const days = r.perDay ? r.filled / r.perDay : 0;
            return `
            <div class="s1band" style="--dot:${colourOf(r.i)}">
              <i style="width:${Math.min(100, days / S1_DAYS * 100)}%"></i>
              <span class="lb">${L(`Goal ${r.i + 1}`, `Goal ${r.i + 1}`)} : ${LT(r.name)}</span>
              <span class="dy">${Math.floor(days)}/${S1_DAYS} ${L("days", "วัน")}</span>
            </div>`;
          }).join("")}
          <div class="s1lines"></div>
        </div>
        <div class="s1ruler"><span>${L("day 1", "วันที่ 1")}</span><span>10</span><span>20</span><span>30</span></div>
      </div>`).join("")}
    </div>

    <div class="s1nav">
      <button data-mon="prev" aria-label="${L("Previous month", "เดือนก่อนหน้า")}">←</button>
      <button data-mon="next" aria-label="${L("Next month", "เดือนถัดไป")}">→</button>
      <span class="run">${runMonths
        ? L(`Covers ${runMonths} month${runMonths > 1 ? "s" : ""} ahead`, `ครอบคลุมไปข้างหน้าได้ ${runMonths} เดือน`)
        : L("Still filling this month", "กำลังเติมเดือนนี้อยู่")}</span>
    </div>

    <div class="s1sum">
      <div class="hd">${I("calendarDays", 19)}<div>${L(
        `You've earned <b>${KB.baht(income)}</b> so far — that pays for <b>${runDays} more days</b> of what you cost.`,
        `ตอนนี้รายได้ทั้งหมด <b>${KB.baht(income)}</b> จะใช้ได้อีก <b>${runDays} วัน</b>`)}</div></div>
      <div class="gl">
        ${months[0].rows.map(r => {
          const left = Math.max(0, r.cost - r.filled);
          return `<div class="g ${left ? "" : "done"}" style="--dot:${colourOf(r.i)}"><span class="sw"></span>
            <span>Goal ${r.i + 1} · ${LT(r.name)}</span>
            <span class="rt">${left
              ? L(`${KB.baht(left)} to go`, `ขาดอีก ${KB.baht(left)}`)
              : L("done", "สำเร็จแล้ว")}</span></div>`;
        }).join("")}
      </div>
    </div>

    ${active && !active.isTotal ? `<div class="nextup">${I("lift", 17)}<div>${L(
      `Next baht you earn goes into <b>${LT(active.name).toLowerCase()}</b> — ${KB.baht(active.cost - active.filled)} left to fill it.`,
      `บาทถัดไปที่หาได้จะไปลง <b>${LT(active.name)}</b> — เหลืออีก ${KB.baht(active.cost - active.filled)} จะเต็มชั้นนี้`)}</div></div>` : ""}
  </div>

  <div class="acts">
    <button class="btn fill"  data-sheet="s3">${I("plus", 19)} ${L("I earned", "ได้เงินมา")}</button>
    <button class="btn ghost" data-act="spend">${I("minus", 19)} ${L("I spent", "ใช้เงินไป")}</button>
    <button class="btn pause wide" data-sheet="s2">${I("eye", 19)} ${L("What happens if I buy this?", "จะเกิดอะไรถ้าซื้ออันนี้?")}</button>
    <button class="btn ghost wide" data-sheet="s2b">${I("loan", 19)} ${L("Borrow (sim)", "ขอกู้ (จำลอง)")}</button>
  </div>


  <div class="card">
    <div class="card-t">${I("receipt", 18)} ${L("What my life costs", "ค่าใช้จ่ายของฉัน")}
      <span class="r">${KB.baht(monthCost)}/${L("mo", "เดือน")}</span></div>
    ${s.costItems.map(c => `<div class="cost-line">
      <span>${LT(c.name)}${c.source !== "parent" ? ` <span class="tag">${I("repeat", 12)} ${L("added by me", "ฉันรับมาเอง")}</span>` : ""}</span>
      <b>${KB.baht(c.perMonth)}</b></div>`).join("")}
    <div class="cost-line" style="margin-top:5px"><b>${L("Per day", "ต่อวัน")}</b>
      <b style="color:var(--c-fill-ink)">${KB.baht(KB.dailyCost())}${added ? ` <span class="tag">+${KB.baht(added)}</span>` : ""}</b></div>
  </div>`;
},

mount(el) {
  /* เลื่อนทีละเดือน · ปุ่มดับเองเมื่อสุดทาง เพื่อไม่ให้กดแล้วไม่มีอะไรเกิดขึ้น */
  const sc = el.querySelector(".s1scroll");
  const step = () => sc.querySelector(".s1mon").getBoundingClientRect().width + 16;
  const arrows = { prev: el.querySelector('[data-mon="prev"]'), next: el.querySelector('[data-mon="next"]') };
  const sync = () => {
    arrows.prev.disabled = sc.scrollLeft < 4;
    arrows.next.disabled = sc.scrollLeft > sc.scrollWidth - sc.clientWidth - 4;
  };
  arrows.prev.onclick = () => sc.scrollBy({ left: -step(), behavior: "smooth" });
  arrows.next.onclick = () => sc.scrollBy({ left:  step(), behavior: "smooth" });
  sc.addEventListener("scroll", sync);
  sync();

  /* --- โหลเต็ม: เลือกว่าเงินส่วนเกินจะไปไหน --- */
  const over = el.querySelector("#s1over");
  if (over) {
    over.querySelector(".tg").onclick = () => over.classList.toggle("open");
    /* เปิดได้ทีละข้อ — บังคับให้อ่านทีละทาง แทนที่จะกวาดตาเทียบสามอันพร้อมกัน */
    over.querySelectorAll(".s1opt").forEach(o => o.querySelector(".oh").onclick = () => {
      const wasOpen = o.classList.contains("on");
      over.querySelectorAll(".s1opt").forEach(x => x.classList.remove("on"));
      if (!wasOpen) o.classList.add("on");
    });
    over.querySelectorAll("[data-park]").forEach(b => b.onclick = () => {
      const amt = KB.surplusFree();
      KB.parkSurplus(b.dataset.park, amt);
      render();
      toast(L(`${KB.baht(amt)} into emergency money · ${KB.bufferPct()}% of the way there`,
              `เก็บ ${KB.baht(amt)} เข้าเงินสำรองแล้ว · ตอนนี้ ${KB.bufferPct()}% ของเป้า`));
    });
  }

  /* --- แถบเติมรายได้ --- */
  const add = el.querySelector("#s1add");
  add.querySelector(".tg").onclick = () => {
    add.classList.toggle("open");
    if (add.classList.contains("open")) add.querySelector("#s1amt").focus();
  };
  /* เลือกได้ทีละอันในแต่ละแถว */
  ["#s1lv", "#s1day"].forEach(sel => el.querySelectorAll(`${sel} button`).forEach(b => b.onclick = () => {
    el.querySelectorAll(`${sel} button`).forEach(x => x.classList.remove("on"));
    b.classList.add("on");
  }));

  const DAY_LABELS = [
    { en: "Today",     th: "วันนี้" },
    { en: "Yesterday", th: "เมื่อวาน" },
    { en: "Earlier this week", th: "ต้นสัปดาห์" }
  ];
  el.querySelector("#s1save").onclick = () => {
    const amt = +el.querySelector("#s1amt").value;
    if (!amt) return toast(L("Put an amount in first", "ใส่จำนวนเงินก่อนนะ"));
    const d = +el.querySelector("#s1day button.on").dataset.day;
    /* hrs = 0 เพราะฟอร์มเร็วไม่ถามชั่วโมง — ไม่กระทบ hourly() เพราะเป็นแค่ตัวหารที่ไม่ถูกบวกเพิ่ม
       อยากได้ชั่วโมงกับโน้ตให้กดลิงก์ไปฟอร์มเต็ม */
    KB.addIncome(amt, +el.querySelector("#s1lv button.on").dataset.lv, 0,
                 L("Work done", "งานที่ทำ"), d ? "backfill" : "live", DAY_LABELS[d]);
    openSheet("s3b", { amt, hrs: 0 });        // → หน้าฉลอง "= กี่วัน" เหมือนกดจาก S3
  };
  el.querySelector("#s1full").onclick = () => openSheet("s3");

  el.querySelector('[data-act="spend"]').onclick = () => openSheet("s2", { skipAsk: true });
}
};
