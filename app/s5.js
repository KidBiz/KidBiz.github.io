/* ============================================================
   S5 — Weekly Card  ⭐ สะพานระหว่างแอปกับห้องเรียน
   สรุป 1 หน้า · เด็กเปิดหน้านี้ตอนต้นคาบ
   ============================================================ */

SCREENS.s5 = {
title: () => L("Weekly Card", "สรุปสัปดาห์"),
sub: () => L(`Week ${KB.s.child.week} · take this to class`, `สัปดาห์ที่ ${KB.s.child.week} · เอาไปเปิดในคาบเรียน`),
notes: () => [
  [L("The bridge", "สะพาน"), L("This is what keeps the app tied to the camp. The teacher opens the lesson with this card instead of preparing material.",
      "นี่คือชิ้นที่ทำให้แอปไม่หลุดจากแคมป์ ครูเปิดคาบด้วยการ์ดนี้ได้เลย ไม่ต้องเตรียมเนื้อหาเอง")],
  ["N3", L("Every arrow compares this week to last week. There is no leaderboard and no class average.",
           "ทุกลูกศรเทียบสัปดาห์นี้กับสัปดาห์ที่แล้ว ไม่มีตารางอันดับ ไม่มีค่าเฉลี่ยของห้อง")],
  [L("Class mode", "โหมดคาบเรียน"), L("Tap 'Take it to class' and every baht amount disappears — safe when a friend glances at the screen.",
      "กด 'เตรียมไปคาบเรียน' แล้วยอดเงินบาททุกตัวจะหายไป ปลอดภัยเวลาเพื่อนมองจอ")]
],

css: `
.big4 { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; margin-bottom: 13px; }
.big4 > div { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md); padding: 15px; box-shadow: var(--shadow); }
.big4 .k { font-size: var(--fs-xs); color: var(--c-ink-3); font-weight: 600; line-height: 1.35;
  display: flex; align-items: flex-start; gap: 6px; min-height: 34px; }
.big4 .k .ic { margin-top: 1px; }
.proud .lb { display: flex; align-items: center; gap: 6px; }
.go-class { margin-top: 13px; display: flex; align-items: center; justify-content: center; gap: 9px; }
.big4 .v { font-size: var(--fs-xl); font-weight: 700; letter-spacing: -1.5px; font-variant-numeric: tabular-nums; line-height: 1.15; margin: 2px 0 1px; }

.nw { display: flex; height: 30px; border-radius: var(--r-pill); overflow: hidden; margin: 5px 0 10px; }
.nw > i { display: grid; place-items: center; color: #fff; font-size: var(--fs-xs); font-weight: 700; }

.trg { display: flex; align-items: center; gap: 11px; padding: 11px 0; border-bottom: 1px solid var(--c-line); }
.trg:last-child { border: 0; }
.trg .t { font-size: var(--fs-sm); font-weight: 700; width: 104px; font-variant-numeric: tabular-nums; }
.trg .w { flex: 1; font-size: var(--fs-sm); color: var(--c-ink-2); }
.trg .b { width: 66px; height: 8px; border-radius: var(--r-pill); background: var(--c-surface-2); overflow: hidden; }
.trg .b i { display: block; height: 100%; background: var(--c-pause); }
.trg .n { font-size: var(--fs-sm); font-weight: 700; color: var(--c-ink-3); width: 18px; text-align: right; }

.qbox { margin-bottom: 14px; }
.qbox label { display: block; font-size: var(--fs-md); font-weight: 700; margin-bottom: 7px; }
.qbox label span { color: var(--c-ink-3); font-weight: 500; font-size: var(--fs-sm); }
.proud { background: linear-gradient(135deg, var(--brand-amber-soft), #FFEDC7); border-radius: var(--r-md); padding: 17px; box-shadow: var(--shadow); }
.proud .lb { font-size: var(--fs-xs); font-weight: 700; color: var(--brand-amber-d); letter-spacing: .5px; margin-bottom: 8px; }
.proud .tx { font-size: var(--fs-md); line-height: 1.7; font-weight: 600; color: #6B4A05; }

/* --- โหมดคาบเรียน --- */
.class { position: absolute; inset: 0; z-index: 80; background: var(--c-ink); color: #fff; padding: 50px 26px 26px; overflow-y: auto; }
.class .hd { font-size: var(--fs-xs); letter-spacing: 3px; font-weight: 700; color: #8B8B96; margin-bottom: 5px; }
.class h2 { font-size: 27px; font-weight: 700; margin-bottom: 24px; }
.class .g { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
.class .g > div { background: rgba(255,255,255,.07); border-radius: var(--r-md); padding: 16px; }
.class .g b { display: block; font-size: 42px; font-weight: 700; letter-spacing: -2px; line-height: 1; font-variant-numeric: tabular-nums; }
.class .g small { font-size: var(--fs-xs); color: #A9A9B4; font-weight: 600; }
.class .g .up { color: #4FD9EC; font-size: var(--fs-xs); font-weight: 700; margin-top: 4px; }
.class .line { font-size: var(--fs-sm); color: #C3C3CC; line-height: 1.85; margin-bottom: 22px; }
.class .safe { display: inline-flex; gap: 7px; font-size: var(--fs-xs); font-weight: 700; color: #4FD9EC;
  background: rgba(79,217,236,.14); padding: 10px 15px; border-radius: var(--r-pill); margin-bottom: 22px; }
`,

render(ctx) {
  const lw = KB.s.lastWeek;
  const cov = KB.coverage(), sav = KB.savingRate(), pau = KB.pauseRate(), need = KB.needPct();
  const d = (a, b) => {
    const x = a - b;
    return `<div class="delta ${x > 0 ? "up" : "flat"}">${x > 0 ? "↑" : x < 0 ? "↓" : "→"} ${Math.abs(x)} ${L("from last week", "จากสัปดาห์ก่อน")}</div>`;
  };

  /* --- โหมดคาบเรียน: % ล้วน ไม่มียอดบาท --- */
  if (ctx.stage === "class") return `
  <div class="class">
    <div class="hd">${L("WEEKLY CARD", "สรุปสัปดาห์")}</div>
    <h2>${L(`Week ${KB.s.child.week} · ${LT(KB.s.child.name)}`, `สัปดาห์ที่ ${KB.s.child.week} · ${LT(KB.s.child.name)}`)}</h2>
    <div class="g">
      <div><b>${cov}%</b><small>${L("covered by me", "หาเองได้")}</small><div class="up">↑ ${cov - lw.coverage}</div></div>
      <div><b>${sav}%</b><small>${L("savings rate", "อัตราออม")}</small><div class="up">↑ ${sav - lw.saving}</div></div>
      <div><b>${pau}%</b><small>${L("looked before buying", "คิดก่อนซื้อ")}</small><div class="up">↑ ${pau - lw.pauseRate}</div></div>
      <div><b>${KB.s.streak.now}</b><small>${L("days running", "วันต่อเนื่อง")}</small><div class="up">↑ ${KB.s.streak.now - lw.streak}</div></div>
    </div>
    <div class="line">${L(`Needed ${need}% : wanted ${100 - need}%`, `จำเป็น ${need}% : อยากได้ ${100 - need}%`)}<br>
      ${L("Ran out early:", "ซองที่หมดก่อนกำหนด:")} ${KB.emptyEnvs().length ? KB.emptyEnvs().map(e => LT(e.name)).join(", ") : L("none", "ไม่มี")}<br>
      ${L("Wanted to spend most at:", "อยากใช้เงินบ่อยสุดที่:")} ${LT(KB.s.triggers[0].where)}, ${LT(KB.s.triggers[0].when)}</div>
    <div class="safe">${I("lock", 15)} ${L("Checked — no baht amounts on this screen", "ตรวจแล้ว — ไม่มียอดเงินบาทในหน้านี้")}</div>
    <button class="btn ghost" data-stage="">${L("Leave class mode", "ออกจากโหมดคาบเรียน")}</button>
  </div>`;

  return `
  <div class="big4">
    <div><div class="k">${I("home", 15)} ${L("Covered by me", "หาเองได้")}</div><div class="v">${cov}%</div>${d(cov, lw.coverage)}</div>
    <div><div class="k">${I("save", 15)} ${L("Savings rate", "อัตราออม")}</div><div class="v">${sav}%</div>${d(sav, lw.saving)}</div>
    <div><div class="k">${I("hand", 15)} ${L("Looked before buying", "คิดก่อนซื้อ")}</div><div class="v">${pau}%</div>${d(pau, lw.pauseRate)}</div>
    <div><div class="k">${I("flame", 15)} ${L("Days running", "ทำต่อเนื่อง")}</div><div class="v">${KB.s.streak.now}</div>${d(KB.s.streak.now, lw.streak)}</div>
  </div>

  <div class="card">
    <div class="card-t">${I("scale", 18)} ${L("Needed vs wanted", "จำเป็น กับ อยากได้")}
      <span class="r">${L("last week", "สัปดาห์ก่อน")} ${lw.needPct}:${100 - lw.needPct}</span></div>
    <div class="nw">
      <i style="width:${need}%;background:var(--c-need)">${need}%</i>
      <i style="width:${100 - need}%;background:var(--c-spend);color:var(--c-ink)">${100 - need}%</i>
    </div>
    <div class="tiny muted">${L("There's no 'right' split — the question is whether it matches what you meant to do.",
                                "ไม่มีสัดส่วนที่ 'ถูก' — คำถามคือมันตรงกับที่ตั้งใจไว้ไหม")}</div>
  </div>

  <div class="card">
    <div class="card-t">${I("inbox", 18)} ${L("Ran out early", "ซองที่หมดก่อนกำหนด")}</div>
    ${KB.emptyEnvs().length
      ? KB.emptyEnvs().map(e => `<div class="row" style="padding:5px 0"><span style="color:var(--c-${e.key})">${I(e.ic, 19)}</span>
          <span style="flex:1;font-size:var(--fs-md);font-weight:600">${LT(e.name)}</span>
          <span class="badge neutral">${L("empty since the 19th", "หมดตั้งแต่วันที่ 19")}</span></div>`).join("")
      : `<div class="tiny muted">${L("Nothing ran out this week", "ไม่มีซองไหนหมดเลยสัปดาห์นี้")}</div>`}
  </div>

  <div class="card">
    <div class="card-t">${I("pin", 18)} ${L("When you want to spend", "ช่วงที่อยากใช้เงิน")} <span class="r">${L("this week", "สัปดาห์นี้")}</span></div>
    ${KB.s.triggers.map(t => `
      <div class="trg">
        <span class="t">${LT(t.when)}</span><span class="w">${LT(t.where)}</span>
        <span class="b"><i style="width:${t.n / KB.s.triggers[0].n * 100}%"></i></span>
        <span class="n">${t.n}</span>
      </div>`).join("")}
    <div class="tiny muted" style="margin-top:11px">${L(
      "The top one happens most. Worth trying a different way home next week?",
      "จุดแรกเกิดบ่อยสุด ลองเปลี่ยนเส้นทางกลับบ้านดูสัปดาห์หน้าไหม")}</div>
  </div>

  <div class="card">
    <div class="card-t">${I("message", 18)} ${L("Three questions", "สะท้อน 3 คำถาม")} <span class="r">${KB.s.reflectionsDone}/${KB.s.reflectionsDue} ${L("weeks", "สัปดาห์")}</span></div>
    <div class="qbox"><label>1. ${L("What went well?", "อะไรที่ทำได้ดี")} <span>${L("even a small thing", "เรื่องเล็กก็ได้")}</span></label>
      <textarea class="inp" id="q1">${KB.s.reflection.did}</textarea></div>
    <div class="qbox"><label>2. ${L("What slipped?", "อะไรที่พลาดไป")} <span>${L("no blame, just tell it", "ไม่ต้องโทษตัวเอง แค่เล่า")}</span></label>
      <textarea class="inp" id="q2">${KB.s.reflection.missed}</textarea></div>
    <div class="qbox" style="margin-bottom:8px"><label>3. ${L("What will you change?", "จะปรับอะไร")} <span>${L("one thing is enough", "ข้อเดียวพอ")}</span></label>
      <textarea class="inp" id="q3">${KB.s.reflection.fix}</textarea></div>
    <button class="btn sm ghost" id="qsave" style="width:100%;border-radius:var(--r-md)">${L("Save answers", "บันทึกคำตอบ")}</button>
  </div>

  <div class="proud">
    <div class="lb">${I("star", 15)} ${L("PROUDEST MOMENT", "ประโยคที่ภูมิใจที่สุด")}</div>
    <div class="tx">"${LT(KB.s.proud)}"</div>
  </div>

  <button class="btn go-class" data-stage="class">${I("bag", 19)} ${L("Take it to class", "เตรียมไปคาบเรียน")}</button>`;
},

mount(el, ctx) {
  el.querySelectorAll("[data-stage]").forEach(b => b.onclick = () => setCtx({ stage: b.dataset.stage || null }));
  const s = el.querySelector("#qsave");
  if (s) s.onclick = () => {
    KB.s.reflection = {
      did:    el.querySelector("#q1").value.trim(),
      missed: el.querySelector("#q2").value.trim(),
      fix:    el.querySelector("#q3").value.trim()
    };
    KB.save();
    toast(L("Saved · ready to talk about in class", "บันทึกแล้ว · เอาไปคุยในคาบได้เลย"));
  };
}
};
