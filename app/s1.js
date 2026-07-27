/* ============================================================
   S1 — หน้าแรก: ค่าใช้จ่ายของฉัน  ⭐ หน้าที่สำคัญที่สุด
   N1 เริ่มจากยังไม่ครอบคลุม · Coverage % = พระเอก
   ⭐ สเปค 2026-07-27: มี 2 เป้าหมายเท่านั้น — ไม่มีบันได ไม่มีเฟส
   ============================================================ */

SCREENS.s1 = {
title: () => L("Cost Covered", "ค่าใช้จ่ายของฉัน"),
sub: () => L(`Week ${KB.s.child.week} · ${LT(KB.s.child.name)}`,
             `สัปดาห์ที่ ${KB.s.child.week} · ${LT(KB.s.child.name)}`),
notes: () => [
  ["N1", L("The first screen is not a balance. It's what it costs to be you, and how much of that you cover yourself — so money from parents never reads as 'my income'.",
           "หน้าแรกไม่ใช่ยอดเงินคงเหลือ แต่เป็นค่าใช้จ่ายจริงของลูก และส่วนที่ลูกหาเองได้แล้ว เพื่อไม่ให้เงินที่พ่อแม่ให้ถูกเข้าใจว่าเป็น 'รายได้ของฉัน'")],
  [L("Two goals only", "มีแค่ 2 เป้าหมาย"), L("A small goal (cover one bill your parents pay) and a big one (cover everything). No ladder, no levels, no phases — and the small goal never means a parent stops paying. The child covering it means the parent carries less.",
      "เป้าเล็ก (cover ค่าใช้จ่าย 1 รายการที่พ่อแม่จ่ายอยู่) กับเป้าใหญ่ (cover ทั้งหมด) ไม่มีบันได ไม่มีเลเวล ไม่มีเฟส และเป้าเล็กไม่ได้แปลว่าพ่อแม่จะหยุดจ่าย — ลูกหามา cover ได้ = พ่อแม่เบาลง")],
  [L("Depth can change", "หลุมลึกลงได้"), L("Take on a repayment or a subscription and the daily cost rises, so the hole gets deeper and stays deeper. That is the lesson, shown rather than explained.",
      "ถ้ามียอดผ่อนหรือค่าบริการรายเดือนเพิ่ม ต้นทุนต่อวันจะสูงขึ้น หลุมลึกลงและค้างอยู่อย่างนั้น นี่คือบทเรียนที่แสดงให้เห็น ไม่ใช่อธิบายให้ฟัง")]
],

css: `
.s1hero { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-lg);
  padding: 18px 18px 17px; box-shadow: var(--shadow); margin-bottom: 13px; }
.ground { display: flex; align-items: center; gap: 9px; font-size: var(--fs-xs); font-weight: 700; color: var(--c-ink-3); margin-bottom: 7px; }
.ground:after { content: ""; flex: 1; height: 2px; background: repeating-linear-gradient(90deg, var(--c-ink-3) 0 6px, transparent 6px 11px); }
.well { position: relative; height: 208px; border-radius: 8px 8px 18px 18px; overflow: hidden;
  background: linear-gradient(175deg, var(--c-well) 0%, var(--c-well-d) 100%);
  box-shadow: inset 0 9px 18px rgba(0,0,0,.4); }
.well:before { content: ""; position: absolute; inset: 0; opacity: .5; pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent 0 25px, var(--c-well-line) 25px 26px); }
.well .fill { position: absolute; left: 0; right: 0; bottom: 0;
  background: linear-gradient(180deg, #35D5EC, var(--c-fill));
  transition: height .8s cubic-bezier(.2,.9,.25,1); box-shadow: 0 -3px 18px rgba(0,177,203,.55); }
.well .fill:after { content: ""; position: absolute; top: -3px; left: 0; right: 0; height: 6px; border-radius: 50%; background: #6FE4F5; opacity: .9; }
.well .pend { position: absolute; left: 0; right: 0; transition: all .8s cubic-bezier(.2,.9,.25,1);
  background: repeating-linear-gradient(135deg, var(--c-pending) 0 7px, rgba(127,216,229,.4) 7px 14px); }
.well .big { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-shadow: 0 2px 14px rgba(0,0,0,.5); }
.well .big b { font-size: var(--fs-hero); font-weight: 700; color: #fff; line-height: .95; letter-spacing: -3px; font-variant-numeric: tabular-nums; }
.well .big span { font-size: var(--fs-xs); font-weight: 700; color: rgba(255,255,255,.92); letter-spacing: 2px; margin-top: 5px; text-align: center; padding: 0 20px; }
.well .depth { position: absolute; right: 14px; top: 12px; font-size: var(--fs-xs); font-weight: 700; color: rgba(255,255,255,.55); text-align: right; }
.well .depth em { display: block; font-style: normal; color: var(--brand-amber); margin-top: 2px; }
.well .empty { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; padding: 0 28px;
  font-size: var(--fs-md); font-weight: 600; color: rgba(255,255,255,.92); line-height: 1.55; }
.s1hero .cap { font-size: var(--fs-sm); color: var(--c-ink-2); text-align: center; margin-top: 13px; line-height: 1.55; }
.s1hero .cap b { color: var(--c-ink); font-weight: 700; }
.pendnote { display: flex; justify-content: center; margin-top: 10px; }

.mrow { display: flex; gap: 11px; margin-bottom: 13px; }
.mrow > div { flex: 1; background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md);
  padding: 15px 11px; box-shadow: var(--shadow); text-align: center; }
.mrow b { display: block; font-size: 30px; font-weight: 700; letter-spacing: -1px; font-variant-numeric: tabular-nums; line-height: 1.1; }
.mrow small { font-size: var(--fs-xs); color: var(--c-ink-3); font-weight: 600; margin-top: 4px;
  display: flex; align-items: center; justify-content: center; gap: 5px; }

/* --- ⭐ 2 เป้าหมาย --- */
.goal { padding: 15px 0; border-bottom: 1px solid var(--c-line); }
.goal:last-child { border: 0; padding-bottom: 2px; }
.goal .hd { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; }
.goal .medal { font-size: 17px; }
.goal .nm { font-size: var(--fs-md); font-weight: 700; }
.goal .pc { margin-left: auto; font-size: 21px; font-weight: 700; font-variant-numeric: tabular-nums; }
.goal .sub { font-size: var(--fs-xs); color: var(--c-ink-3); margin-bottom: 9px; line-height: 1.5; }
.goal .bar { height: 12px; }
.goal.done .pc { color: var(--c-fill-ink); }
.goal .days { display: inline-flex; align-items: center; gap: 6px; margin-top: 9px;
  background: var(--c-fill-soft); color: var(--c-fill-ink); font-size: var(--fs-sm); font-weight: 700;
  padding: 8px 13px; border-radius: var(--r-pill); }
.goal .won { display: inline-flex; align-items: center; gap: 7px; margin-top: 9px;
  background: var(--brand-amber-soft); color: var(--brand-amber-d); font-size: var(--fs-sm); font-weight: 700;
  padding: 8px 13px; border-radius: var(--r-pill); }

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
  const s = KB.s, cov = KB.coverage(), covP = KB.coveragePending();
  const pend = KB.pending(), pendGap = Math.max(0, covP - cov);
  const added = KB.addedDailyCost();
  const smallItem = KB.goalSmallItem(), smallPct = KB.goalSmallPct(), smallDone = KB.goalSmallDone();

  return `
  <div class="s1hero">
    <div class="ground"><span>${L("Fully covered", "ครอบคลุมเต็ม 100%")}</span></div>
    <div class="well">
      ${pendGap ? `<div class="pend" style="bottom:${cov}%;height:${pendGap}%"></div>` : ""}
      <div class="fill" style="height:${cov}%"></div>
      ${cov === 0 && !pendGap
        ? `<div class="empty">${L("Nothing covered yet.<br>Let's earn the first baht.", "ยังไม่ได้เริ่มเลย<br>มาลองหาเองบาทแรกกัน")}</div>`
        : `<div class="big"><b>${cov}%</b><span>${L("COVERED BY ME", "หาเองได้แล้ว")}</span></div>`}
      <div class="depth">${KB.baht(KB.dailyCost())} / ${L("day", "วัน")}
        ${added ? `<em>+${KB.baht(added)} ${L("from what you took on", "จากที่รับมาเพิ่ม")}</em>` : ""}</div>
    </div>
    <div class="cap">${L(
      `You've covered <b>${cov}%</b> of what the last ${s.child.daysElapsed} days cost you (<b>${KB.baht(KB.cumCost())}</b>)`,
      `หาเองได้ <b>${cov}%</b> ของค่าใช้จ่ายตัวเองใน ${s.child.daysElapsed} วันที่ผ่านมา (<b>${KB.baht(KB.cumCost())}</b>)`)}</div>
    ${pend.length ? `<div class="pendnote"><span class="badge wait">${I("hourglass", 14)} ${L(
      `${pendGap}% more once a parent confirms (${pend.length})`,
      `อีก ${pendGap}% รอพ่อแม่ยืนยัน (${pend.length} รายการ)`)}</span></div>` : ""}
  </div>

  <div class="mrow">
    <div><b>${KB.score()}</b><small>${I("trophy", 15)} ${L("Money Habit Score", "คะแนนนิสัยการเงิน")}</small></div>
    <div><b>${s.streak.weeks}</b><small>${I("flame", 15)} ${L("Weeks running", "สัปดาห์ต่อเนื่อง")}</small></div>
  </div>

  <div class="acts">
    <button class="btn fill"  data-sheet="s3">${I("plus", 19)} ${L("I earned", "ได้เงินมา")}</button>
    <button class="btn ghost" data-act="spend">${I("minus", 19)} ${L("I spent", "ใช้เงินไป")}</button>
    <button class="btn pause wide" data-sheet="s2">${I("eye", 19)} ${L("What happens if I buy this?", "จะเกิดอะไรถ้าซื้ออันนี้?")}</button>
    <button class="btn ghost" data-sheet="s2b">${I("loan", 19)} ${L("Borrow (sim)", "ขอกู้ (จำลอง)")}</button>
    <button class="btn ghost" data-go="s5">${I("clipboard", 19)} ${L("Weekly card", "สรุปสัปดาห์")}</button>
  </div>

  <div class="card">
    <div class="card-t">${I("target", 18)} ${L("My two goals", "2 เป้าหมายของฉัน")}</div>

    <div class="goal ${smallDone ? "done" : ""}">
      <div class="hd">${MEDAL("silver")}
        <span class="nm">${L("Lighten the load at home", "ช่วยลดภาระที่บ้าน")}</span>
        <span class="pc">${smallPct}%</span></div>
      <div class="sub">${L(`Cover the ${LT(smallItem.name).toLowerCase()} — ${KB.baht(smallItem.perMonth)} a month. Your parents still pay it; what you earn means they carry less.`,
                           `cover ${LT(smallItem.name)} — เดือนละ ${KB.baht(smallItem.perMonth)} พ่อแม่ยังจ่ายตามปกติ เงินที่หาได้แปลว่าพ่อแม่เบาลง`)}</div>
      <div class="bar"><i style="width:${smallPct}%"></i></div>
      ${smallDone
        ? `<div class="won">${I("medal", 16)} ${L(`Reached — covers ${KB.goalSmallDays()} days of it`, `ถึงเป้าแล้ว — จ่ายได้ ${KB.goalSmallDays()} วัน`)}</div>`
        : `<div class="days">${I("calendarDays", 16)} ${L(`Covers ${KB.goalSmallDays()} days of it so far`, `ตอนนี้จ่ายได้ ${KB.goalSmallDays()} วันแล้ว`)}</div>`}
    </div>

    <div class="goal ${KB.goalBigDone() ? "done" : ""}">
      <div class="hd">${MEDAL("gold")}
        <span class="nm">${L("Cover myself", "เลี้ยงตัวเองได้")}</span>
        <span class="pc">${cov}%</span></div>
      <div class="sub">${L(`Cover everything it costs to be you — ${KB.baht(KB.dailyCost())} a day.`,
                           `cover ค่าใช้จ่ายของตัวเองทั้งหมด — วันละ ${KB.baht(KB.dailyCost())}`)}</div>
      <div class="bar"><i style="width:${cov}%"></i></div>
      <div class="days">${I("calendarDays", 16)} ${L(`Worth ${KB.goalBigDays().toFixed(1)} full days of living`,
                                                     `เท่ากับค่าใช้จ่าย ${KB.goalBigDays().toFixed(1)} วันเต็ม`)}</div>
    </div>
  </div>

  <div class="card">
    <div class="card-t">${I("receipt", 18)} ${L("What my life costs", "ค่าใช้จ่ายของฉัน")}
      <span class="r">${KB.baht(KB.monthlyCost())}/${L("mo", "เดือน")}</span></div>
    ${s.costItems.map(c => `<div class="cost-line">
      <span>${LT(c.name)}${c.source !== "parent" ? ` <span class="tag">${I("repeat", 12)} ${L("added by me", "ฉันรับมาเอง")}</span>` : ""}</span>
      <b>${KB.baht(c.perMonth)}</b></div>`).join("")}
    <div class="cost-line" style="margin-top:5px"><b>${L("Per day", "ต่อวัน")}</b>
      <b style="color:var(--c-fill-ink)">${KB.baht(KB.dailyCost())}</b></div>
    <div class="guess">${I("bulb", 17)}<div>${L(
      `On day one you guessed <b>${KB.baht(s.guessedCost)} a day</b>. It's really <b>${KB.baht(KB.baseDailyCost())}</b> — <b>${Math.round(KB.baseDailyCost() / s.guessedCost)}× more</b>.`,
      `วันแรกเดาไว้ <b>${KB.baht(s.guessedCost)}/วัน</b> ของจริงคือ <b>${KB.baht(KB.baseDailyCost())}/วัน</b> ห่างกัน <b>${Math.round(KB.baseDailyCost() / s.guessedCost)} เท่า</b>`)}</div></div>
  </div>`;
},

mount(el) {
  el.querySelector('[data-act="spend"]').onclick = () => openSheet("s2", { skipAsk: true });
}
};
