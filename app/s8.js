/* ============================================================
   S8 — "นิสัยการเงินของฉัน"  ⭐ หน้าแรกของแอป และหัวใจของคอร์ส
   §2.4 · โชว์ความสม่ำเสมอในการฝึก ไม่ใช่ตัวเลขเยอะๆ ที่เด็กดูไม่เข้าใจ
   ⛔ ทั้ง 3 สัญญาณห้ามผูกกับยอดเงินหรือ coverage % — เด็กบ้านที่มีน้อย
      ต้องเห็นตัวเองว่า "ฝึกสม่ำเสมอ = ถูกทาง" ได้เท่ากับบ้านที่มีมาก (N2/N3)
   เนื้อหา "ก้าวหน้า" เดิม (S7) ต่อท้ายอยู่ด้านล่างหน้าเดียวกัน
   ============================================================ */

/* ปฏิทินความสม่ำเสมอเผื่อช่องอนาคตไว้เสมอ — ให้เห็นว่ายังมีที่ให้เติม
   ไม่ใช่แถบที่เต็มแล้วจบ ซึ่งจะกลายเป็นรางวัลปลายทางแทนที่จะเป็นนิสัย */
const S8_SLOTS = 6;

SCREENS.s8 = {
title: () => L("My money habits", "นิสัยการเงินของฉัน"),
sub: () => L(`Week ${KB.s.child.week} · ${LT(KB.s.child.name)}`, `สัปดาห์ที่ ${KB.s.child.week} · ${LT(KB.s.child.name)}`),
notes: () => [
  [L("Practice, not balance", "วัดการฝึก ไม่ใช่ยอดเงิน"), L("None of the three signals touches how much money you have. A teenager from a household with less has to be able to look at this screen and see themselves doing well — otherwise the app quietly teaches that being poor is failing.",
      "ไม่มีสัญญาณไหนในสามอันนี้แตะยอดเงินเลย เด็กจากบ้านที่มีน้อยกว่าต้องเปิดหน้านี้แล้วเห็นว่าตัวเองทำได้ดี ไม่งั้นแอปจะสอนเงียบๆ ว่าการมีน้อยคือความล้มเหลว")],
  [L("Consistency is the headline", "ความสม่ำเสมอคือพระเอก"), L("The streak sits at the top because it is the one thing a four-week course can actually move. A habit is a thing you did again, not a thing you understood.",
      "แถบต่อเนื่องอยู่บนสุดเพราะเป็นสิ่งเดียวที่คอร์สไม่กี่สัปดาห์ขยับได้จริง นิสัยคือสิ่งที่ทำซ้ำ ไม่ใช่สิ่งที่เข้าใจ")],
  [L("Only your own", "เห็นเฉพาะของตัวเอง"), L("The parent's side of this lives on the parent screen. Mixing them would turn a child's habit tracker into a report card someone else reads.",
      "ฝั่งพ่อแม่แยกไปอยู่หน้าพ่อแม่ ถ้าเอามาปนกันหน้านี้จะกลายเป็นสมุดพกที่คนอื่นอ่าน แทนที่จะเป็นที่ของเด็กเอง")]
],

css: `
/* คำของ Duhigg เปิดหน้า — ชี้ไปที่ "สิ่งที่ทำ" ซึ่งคือสิ่งเดียวที่หน้านี้วัด
   สีสด ไม่ใช่ดำ เพราะหน้านี้พูดเรื่องกำลังจะเปลี่ยนตัวเอง ไม่ใช่เรื่องหดหู่
   เตี้ยที่สุดเท่าที่อ่านออก — พื้นที่ควรเป็นของข้อมูลเด็ก ไม่ใช่ของคำคม */
.s8id { background: var(--c-fill); color: #fff; border-radius: var(--r-md);
  padding: 13px 15px; margin-bottom: 13px; }
.s8id b { display: block; font-size: var(--fs-md); font-weight: 700; line-height: 1.45; }
.s8id .by { font-size: var(--fs-xs); font-weight: 600; color: rgba(255,255,255,.8); margin-top: 5px; }

/* --- loop ของเด็กคนนี้ (Duhigg: cue → routine → reward → วนกลับ) ---
   ⛔ ช่อง cue ห้ามมีจำนวนเงิน — สิ่งกระตุ้นคือ "เงินเข้า" ไม่ใช่ "เงินเข้าเท่าไหร่"
   ลูกศรวนกลับคือ craving: พอทำซ้ำพอ สมองจะคาดหวังรางวัลตั้งแต่เห็น cue
   ก่อนทำซ้ำพอ ห้ามเคลมประโยคนั้น */
.s8loop { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md);
  box-shadow: var(--shadow); padding: 17px; margin-bottom: 12px; }

/* เส้นวนกลับ — ขอบ "⊂" กอดด้านซ้าย ต่อจากช่องล่างสุดขึ้นไปหาช่องบนสุด
   นี่คือส่วนที่ทำให้เป็น loop ไม่ใช่ลำดับ 3 ขั้น ถ้าตัดเส้นนี้ออกภาพจะกลายเป็น flowchart */
.s8flow { position: relative; padding-left: 30px; }
.s8ring { position: absolute; left: 3px; top: 26px; bottom: 26px; width: 20px;
  border: 2px solid var(--c-ink-3); border-right: 0; border-radius: 13px 0 0 13px; }
.s8ring:after { content: ""; position: absolute; top: -6px; left: 18px;
  border: 5px solid transparent; border-left-color: var(--c-ink-3); }

.s8node { border-radius: var(--r-sm); padding: 12px 14px; border-left: 5px solid var(--dot);
  background: var(--soft); }
.s8node .k { font-size: var(--fs-xs); font-weight: 700; color: var(--dot); letter-spacing: .3px; }
.s8node .v { font-size: var(--fs-md); font-weight: 700; line-height: 1.45; margin-top: 3px; }
.s8arrow { display: flex; justify-content: center; color: var(--c-ink-3); padding: 5px 0; }
.s8sig { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md);
  box-shadow: var(--shadow); padding: 17px; margin-bottom: 12px; }
.s8sig .top { display: flex; align-items: center; gap: 10px; margin-bottom: 11px; }
.s8sig .top .ic { color: var(--c-fill-ink); line-height: 0; }
.s8sig .top b { font-size: var(--fs-md); font-weight: 700; }
.s8sig .big { font-size: 44px; font-weight: 700; letter-spacing: -2px; line-height: 1; font-variant-numeric: tabular-nums; }
.s8sig .unit { font-size: var(--fs-sm); color: var(--c-ink-2); font-weight: 600; margin-left: 7px; }

/* ⭐ ตารางจุดฝึก — 1 จุด = ฝึก 1 ครั้ง · 1 แถว = 1 สัปดาห์
   แถวยาว = ฝึกเยอะ · ไม่มีแถวขาด = สม่ำเสมอ · เห็นสองอย่างพร้อมกันโดยไม่ต้องอ่านตัวเลข
   ⛔ แถวที่พลาดห้ามเป็นสีแดงหรือมีกากบาท (N5/N7) — ปล่อยให้ว่างเฉยๆ
   แถวถัดไปต้องเด่นเสมอ: small wins มาจากการเห็นก้าวหน้าที่เอื้อมถึง ไม่ใช่การชื่นชมของเก่า */
.s8reps { margin: 15px 0 12px; }
.s8wk { display: flex; align-items: center; gap: 11px; padding: 6px 0; }
.s8wk .lb { width: 62px; flex: none; font-size: var(--fs-xs); font-weight: 700; color: var(--c-ink-3); }
.s8wk .dots { display: flex; flex-wrap: wrap; gap: 5px; flex: 1; min-width: 0; }
.s8wk .d { width: 13px; height: 13px; border-radius: 50%; background: var(--c-fill); flex: none; }
.s8wk .n { font-size: var(--fs-xs); font-weight: 700; color: var(--c-ink-3); font-variant-numeric: tabular-nums; }
.s8wk.next { background: var(--brand-amber-soft); border-radius: var(--r-sm); padding: 10px 11px; margin-top: 4px; }
.s8wk.next .lb { color: var(--brand-amber-d); }
.s8wk.next .d { background: var(--c-pause); }
.s8wk .empty { width: 13px; height: 13px; border-radius: 50%; border: 2px dashed var(--c-line); flex: none; }
.s8wk.next .empty { border-color: var(--c-pause); }

/* ท่อนล่าง — ทุกอย่างที่แอปเก็บได้จริง เอาไว้ให้เห็นว่าไม่ได้เดา */
.s8raw { margin-top: 22px; padding-top: 4px; border-top: 2px solid var(--c-line); }
.s8raw .hd { font-size: var(--fs-sm); font-weight: 700; color: var(--c-ink-3); margin: 16px 0 12px; }
.s8raw .row { display: flex; align-items: baseline; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--c-line); }
.s8raw .row:last-child { border: 0; }
.s8raw .k { flex: 1; font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.4; }
.s8raw .v { font-size: var(--fs-md); font-weight: 700; font-variant-numeric: tabular-nums; }
.s8raw .v em { font-style: normal; font-size: var(--fs-xs); color: var(--c-ink-3); font-weight: 600; }
.s8note { font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.6; }
.s8row { display: flex; gap: 11px; }
.s8row > div { flex: 1; }
.s8row .n { font-size: 30px; font-weight: 700; letter-spacing: -1px; font-variant-numeric: tabular-nums; line-height: 1.1; }
.s8row .t { font-size: var(--fs-xs); color: var(--c-ink-3); font-weight: 600; line-height: 1.45; margin-top: 3px; }
.s8old { margin-top: 22px; padding-top: 4px; border-top: 2px solid var(--c-line); }
.s8old .hd { font-size: var(--fs-sm); font-weight: 700; color: var(--c-ink-3); margin: 16px 0 13px; }
`,

render(ctx) {
  const streak = KB.habitStreak();
  const reps = KB.habitReps();
  const rows = KB.repWeeks();
  const a = KB.s.alloc;

  const rule = KB.s.envelopes.map(e => KB.s.rule[e.key]).join("/");
  /* รางวัลเล่าเป็น "วัน" ให้ตรงกับ S3b — เด็กแปลบาทเป็นความรู้สึกไม่ออก แต่แปลวันออก */
  const small = KB.goals()[0];
  const last = KB.s.income[KB.s.income.length - 1];
  const rewardDays = last && small.perDay ? Math.floor(last.amt / small.perDay) : 0;

  return `
  <div class="s8id">
    <b>${L("The difference between who you are and who you want to be is what you do.",
           "ความต่างระหว่างคนที่เราเป็น กับคนที่เราอยากเป็น คือสิ่งที่เราลงมือทำ")}</b>
    <div class="by">— Charles Duhigg</div>
  </div>

  <div class="s8loop">
    <div class="s8flow">
      <div class="s8ring"></div>
      <div class="s8node" style="--dot:var(--brand-amber-d);--soft:var(--brand-amber-soft)">
        <div class="k">${L("THE TRIGGER", "สิ่งกระตุ้น")}</div>
        <div class="v">${L("Money comes in", "เงินเข้า")}</div>
      </div>
      <div class="s8arrow">${I("arrowDown", 20)}</div>
      <div class="s8node" style="--dot:var(--c-fill-ink);--soft:var(--c-fill-soft)">
        <div class="k">${L("WHAT YOU DO", "สิ่งที่ทำ")}</div>
        <div class="v">${L(`Split it ${rule}, before spending any`, `แบ่ง ${rule} ก่อนใช้`)}</div>
      </div>
      <div class="s8arrow">${I("arrowDown", 20)}</div>
      <div class="s8node" style="--dot:var(--c-parent);--soft:var(--c-parent-soft)">
        <div class="k">${L("WHAT YOU GET", "สิ่งที่ได้")}</div>
        <div class="v">${rewardDays
          ? L(`The jar fills — that last one covered ${rewardDays} days of ${LT(small.name).toLowerCase()}`,
              `โหลเต็มขึ้นทันที — ก้อนล่าสุดจ่าย${LT(small.name)}ได้ ${rewardDays} วัน`)
          : L("The jar fills, the moment you log it", "โหลเต็มขึ้นทันทีที่กรอก")}</div>
      </div>
    </div>
  </div>

  <div class="s8sig">
    <div class="top"><span class="ic">${I("repeat", 21)}</span><b>${L("How much you've practised", "ฝึกมาแค่ไหนแล้ว")}</b></div>
    <div><span class="big">${reps}</span><span class="unit">${L(`times in ${KB.s.child.daysElapsed} days · ${streak} weeks in a row`,
                                                                `ครั้ง ใน ${KB.s.child.daysElapsed} วัน · ต่อเนื่อง ${streak} สัปดาห์`)}</span></div>

    <div class="s8reps">
      ${rows.map(w => `
      <div class="s8wk">
        <span class="lb">${L(`Week ${w.w}`, `สัปดาห์ ${w.w}`)}</span>
        <span class="dots">${w.reps
          ? Array.from({ length: w.reps }, () => `<i class="d"></i>`).join("")
          : `<i class="empty"></i>`}</span>
        <span class="n">${w.reps}</span>
      </div>`).join("")}
      <div class="s8wk next">
        <span class="lb">${L(`Week ${rows.length + 1}`, `สัปดาห์ ${rows.length + 1}`)}</span>
        <span class="dots">${Array.from({ length: 4 }, () => `<i class="empty"></i>`).join("")}</span>
      </div>
    </div>

    <div class="s8note">${L(`Split by your rule ${a.followed} · stopped to think ${KB.practiceCount()}`,
                            `แบ่งเงินตามกฎ ${a.followed} · ฝึกคิดก่อนซื้อ ${KB.practiceCount()}`)}</div>
  </div>

  <div class="s8sig">
    <div class="top"><span class="ic">${I("hand", 21)}</span><b>${L("Did it without being told", "ริเริ่มเอง")}</b></div>
    <div class="s8row">
      <div><div class="n">${KB.liveLogs()}</div>
        <div class="t">${L("logged the moment it happened", "บันทึกทันทีตอนนั้น")}</div></div>
      <div><div class="n">${KB.practiceCount()}</div>
        <div class="t">${L("times you stopped to think before buying", "ครั้งที่หยุดคิดก่อนซื้อ")}</div></div>
    </div>
  </div>

  <div class="s8raw">
    <div class="hd">${I("clipboard", 16)} ${L("EVERYTHING RECORDED SO FAR", "ทั้งหมดที่บันทึกไว้")}</div>
    ${[
      [L("Days in the programme", "วันในโปรแกรม"), KB.s.child.daysElapsed, L("days", "วัน")],
      [L("Week you're on", "สัปดาห์ที่"), KB.s.child.week, ""],
      [L("Times money came in", "เงินเข้า"), KB.s.income.length, L("times", "ครั้ง")],
      [L("Split by your rule", "แบ่งเงินตามกฎ"), `${a.followed}/${a.total}`, L("times", "ครั้ง")],
      [L("Stopped to think before buying", "ฝึกคิดก่อนซื้อ"), KB.practiceCount(), L("times", "ครั้ง")],
      [L("Logged the moment it happened", "บันทึกสดตอนนั้น"), KB.liveLogs(), L("times", "ครั้ง")],
      [L("Filled in afterwards", "กรอกย้อนหลัง"), KB.backfillLogs(), L("times", "ครั้ง")],
      [L("Wanting-to-buy moments caught", "จับโมเมนต์อยากซื้อ"), KB.s.triggers.reduce((x, t) => x + t.n, 0), L("times", "ครั้ง")],
      [L("Kinds of work tried", "ประเภทงานที่เคยทำ"), new Set(KB.s.income.map(i => i.lv)).size, L("of 4", "จาก 4 แบบ")],
      [L("Weeks in a row", "สัปดาห์ต่อเนื่อง"), streak, L(`best ${KB.habitBest()}`, `ดีสุด ${KB.habitBest()}`)],
      [L("Lessons done", "บทเรียนที่เรียนแล้ว"), `${KB.s.lessons.filter(l => l.done).length}/${KB.s.lessons.length}`, L("days", "วัน")],
      [L("Envelopes in use", "ซองเงินที่ใช้"), KB.s.envelopes.length, L("envelopes", "ซอง")],
      [L("Costs on record", "ค่าใช้จ่ายที่บันทึกไว้"), KB.s.costItems.length, L("items", "รายการ")],
      [L("Simulated loans taken", "เงินกู้จำลองที่เคยลอง"), KB.s.loans.length, L("times", "ครั้ง")]
    ].map(([k, v, u]) => `<div class="row"><span class="k">${k}</span>
      <span class="v">${v} ${u ? `<em>${u}</em>` : ""}</span></div>`).join("")}
  </div>

  <div class="s8old">
    <div class="hd">${I("chart", 16)} ${L("DAY ONE VS NOW", "วันแรกเทียบกับตอนนี้")}</div>
    ${SCREENS.s7.render(ctx)}
  </div>`;
},

mount(el, ctx) {
  /* เนื้อหาก้าวหน้าเดิมยังต้องการ handler ของตัวเอง (ปุ่มแชร์ ฯลฯ) */
  if (SCREENS.s7.mount) SCREENS.s7.mount(el, ctx);
}
};
