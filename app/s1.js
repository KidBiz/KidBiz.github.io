/* ============================================================
   S1 — หน้าแรก: ค่าใช้จ่ายของฉัน  ⭐ หน้าที่สำคัญที่สุด
   N1 เริ่มจากยังไม่ครอบคลุม (ไม่ใช่ยอดเงินคงเหลือ) · Coverage % = พระเอก
   ============================================================ */

SCREENS.s1 = {
title: () => L("Cost Covered", "ค่าใช้จ่ายของฉัน"),
sub: () => L(`Week ${KB.s.child.week} · ${LT(KB.s.child.name)}`,
             `สัปดาห์ที่ ${KB.s.child.week} · ${LT(KB.s.child.name)}`),
notes: () => [
  ["N1", L("The first screen is not a balance. It's what it costs to be you, and how much of that you've covered yourself — so money from parents never reads as 'my income'.",
           "หน้าแรกไม่ใช่ยอดเงินคงเหลือ แต่เป็นค่าใช้จ่ายจริงของลูก และส่วนที่ลูกหาเองได้แล้ว เพื่อไม่ให้เงินที่พ่อแม่ให้ถูกเข้าใจว่าเป็น 'รายได้ของฉัน'")],
  ["C1", L("The meter fills to the top at 100%. The striped band is income still waiting for a parent to confirm — it doesn't count yet.",
           "แถบจะเต็มเมื่อครอบคลุม 100% ส่วนแถบลายทางคือรายได้ที่ยังรอพ่อแม่ยืนยัน ยังไม่ถูกนับ")],
  ["N2", L("Baht amounts appear only on private screens like this one. Anything shareable is percentages only.",
           "ยอดเงินบาทเห็นได้เฉพาะหน้าส่วนตัวแบบนี้ ส่วนอะไรที่แชร์ออกไปได้จะเป็น % ล้วน")]
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
.well .depth { position: absolute; right: 14px; top: 12px; font-size: var(--fs-xs); font-weight: 700; color: rgba(255,255,255,.55); }
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

.lad { display: flex; gap: 7px; margin: 4px 0 12px; }
.lad i { flex: 1; height: 8px; border-radius: var(--r-pill); background: var(--c-surface-2); }
.lad i.on { background: var(--c-fill); }
.lad-now { font-size: var(--fs-md); font-weight: 700; }
.lad-next { font-size: var(--fs-sm); color: var(--c-ink-2); margin-top: 5px; line-height: 1.5; }

.cost-line { display: flex; justify-content: space-between; font-size: var(--fs-md); padding: 9px 0; border-bottom: 1px dashed var(--c-line); }
.cost-line:last-child { border: 0; }
.cost-line b { font-variant-numeric: tabular-nums; font-weight: 700; }
.guess { background: var(--c-fill-soft); border-radius: var(--r-sm); padding: 13px 14px;
  font-size: var(--fs-sm); margin-top: 12px; line-height: 1.6; color: var(--c-fill-ink); }
.guess b { font-weight: 700; }

.acts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 13px; }
.acts .btn { padding: 18px 8px; font-size: var(--fs-md);
  display: flex; align-items: center; justify-content: center; gap: 8px; }
.guess { display: flex; gap: 9px; align-items: flex-start; }
.guess .ic { margin-top: 2px; }
`,

render() {
  const s = KB.s, cov = KB.coverage(), covP = KB.coveragePending();
  const pend = KB.pending(), pendGap = Math.max(0, covP - cov);
  const now = KB.ladderNow(), next = KB.ladderNext();
  const h = s.handoff;

  return `
  <div class="s1hero">
    <div class="ground"><span>${L("Fully covered", "ครอบคลุมเต็ม 100%")}</span></div>
    <div class="well">
      ${pendGap ? `<div class="pend" style="bottom:${cov}%;height:${pendGap}%"></div>` : ""}
      <div class="fill" style="height:${cov}%"></div>
      ${cov === 0 && !pendGap
        ? `<div class="empty">${L("Nothing covered yet.<br>Let's earn the first baht.", "ยังไม่ได้เริ่มเลย<br>มาลองหาเองบาทแรกกัน")}</div>`
        : `<div class="big"><b>${cov}%</b><span>${L("COVERED BY ME", "หาเองได้แล้ว")}</span></div>`}
      <div class="depth">${KB.baht(KB.dailyCost())} / ${L("day", "วัน")}</div>
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
    <div><b>${s.streak.now}</b><small>${I("flame", 15)} ${L("Days running", "ทำต่อเนื่อง (วัน)")}</small></div>
  </div>

  <div class="acts">
    <button class="btn fill"  data-sheet="s3">${I("plus", 19)} ${L("I earned", "ได้เงินมา")}</button>
    <button class="btn ghost" data-act="spend">${I("minus", 19)} ${L("I spent", "ใช้เงินไป")}</button>
    <button class="btn pause" data-sheet="s2">${I("hand", 19)} ${L("Want to buy", "กำลังอยากซื้อ")}</button>
    <button class="btn ghost" data-go="s5">${I("clipboard", 19)} ${L("Weekly card", "สรุปสัปดาห์")}</button>
  </div>

  <div class="card">
    <div class="card-t">${I("target", 18)} ${L("Goal Ladder", "บันไดเป้าหมาย")} <span class="r">${L("Level", "ระดับ")} ${now.lv} / 5</span></div>
    <div class="lad">${s.ladder.map(l => `<i class="${l.lv <= now.lv ? "on" : ""}"></i>`).join("")}</div>
    <div class="lad-now">${LT(now.t)} ✓</div>
    ${next ? `<div class="lad-next">${L("Next", "ถัดไป")} → <b>${LT(next.t)}</b> ${L(
      `at ${next.need}% covered — ${Math.max(0, next.need - cov)}% to go`,
      `เมื่อหาเองได้ ${next.need}% — อีก ${Math.max(0, next.need - cov)}%`)}</div>` : ""}
  </div>

  <div class="card">
    <div class="card-t">${I("phone", 18)} ${LT(h.name)} — ${L("taking it over", "รับช่วงจ่ายเอง")} <span class="r">${h.phase}%</span></div>
    <div class="bar" style="margin-bottom:11px"><i style="width:${h.phase}%"></i></div>
    <div class="spread tiny muted">
      <span>${L("You pay", "จ่ายเอง")} <b style="color:var(--c-ink)">${KB.baht(h.perWeek * h.phase / 100)}</b>/${L("week", "สัปดาห์")}</span>
      <span>${L(`${Math.floor(h.runwayLeft / h.perWeek)} weeks of cover left`, `เงินสำรองเหลือ ${Math.floor(h.runwayLeft / h.perWeek)} สัปดาห์`)}</span>
    </div>
    <div class="tiny muted" style="margin-top:8px">${L(
      `Paid on time ${h.paidOnTime}/${h.paidTotal} · moves to 50% at the end of this month`,
      `จ่ายตรงเวลา ${h.paidOnTime}/${h.paidTotal} ครั้ง · ขยับเป็น 50% สิ้นเดือนนี้`)}</div>
  </div>

  <div class="card">
    <div class="card-t">${I("receipt", 18)} ${L("What my life costs", "ค่าใช้จ่ายของฉัน")} <span class="r">${KB.baht(KB.monthlyCost())}/${L("mo", "เดือน")}</span></div>
    ${s.costItems.map(c => `<div class="cost-line"><span>${LT(c.name)}</span><b>${KB.baht(c.perMonth)}</b></div>`).join("")}
    <div class="cost-line" style="margin-top:5px"><b>${L("Per day", "ต่อวัน")}</b><b style="color:var(--c-fill-ink)">${KB.baht(KB.dailyCost())}</b></div>
    <div class="guess">${I("bulb", 17)} ${L(
      `On day one you guessed <b>${KB.baht(s.guessedCost)} a day</b>. It's really <b>${KB.baht(KB.dailyCost())}</b> — <b>${Math.round(KB.dailyCost() / s.guessedCost)}× more</b>.`,
      `วันแรกเดาไว้ <b>${KB.baht(s.guessedCost)}/วัน</b> ของจริงคือ <b>${KB.baht(KB.dailyCost())}/วัน</b> ห่างกัน <b>${Math.round(KB.dailyCost() / s.guessedCost)} เท่า</b>`)}</div>
  </div>`;
},

mount(el) {
  el.querySelector('[data-act="spend"]').onclick = () => openSheet("s2", { skipAsk: true });
}
};
