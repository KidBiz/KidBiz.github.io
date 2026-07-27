/* ============================================================
   S5 — Weekly Card  ⭐ สะพานระหว่างแอปกับห้องเรียน
   และเป็นจุดที่การกรอกย้อนหลังเกิดขึ้นจริง (ตัวกระตุ้นจริง = ใกล้ถึงวันเรียน)
   โหมด A เติมข้อมูล · โหมด B สรุป · โหมดคาบเรียน (% ล้วน)
   ============================================================ */

SCREENS.s5 = {
title: () => L("Weekly Card", "สรุปสัปดาห์"),
sub: () => L(`Week ${KB.s.child.week} · take this to class`, `สัปดาห์ที่ ${KB.s.child.week} · เอาไปเปิดในคาบเรียน`),
notes: () => [
  [L("The real trigger", "ตัวกระตุ้นจริง"), L("Nobody opens a money app at the moment of buying. They open it because class is in two days. This screen is built around that, and it is where the whole week actually gets entered.",
      "ไม่มีใครเปิดแอปการเงินตอนกำลังจะซื้อของ แต่เปิดเพราะอีก 2 วันจะถึงคาบเรียน หน้านี้สร้างมารอบความจริงข้อนั้น และเป็นจุดที่ข้อมูลทั้งสัปดาห์ถูกกรอกจริง")],
  ["N8", L("Fill it in from memory, skip what you can't remember. There is no 'incomplete' warning anywhere — this is a training log, not an account book.",
           "กรอกจากความจำได้ ข้ามข้อที่นึกไม่ออกได้ ไม่มีคำเตือนว่า 'ข้อมูลไม่ครบ' ที่ไหนเลย นี่คือสมุดบันทึกการฝึก ไม่ใช่สมุดบัญชี")],
  [L("Class mode", "โหมดคาบเรียน"), L("One tap and every baht amount disappears, leaving percentages only — safe when a classmate glances at the screen.",
      "กดครั้งเดียว ยอดเงินบาททุกตัวหายไป เหลือแต่ % ปลอดภัยเวลาเพื่อนมองจอ")]
],

css: `
.callout { background: var(--c-ink); color: #fff; border-radius: var(--r-md); padding: 17px; margin-bottom: 13px; }
.callout h4 { font-size: var(--fs-md); font-weight: 700; margin-bottom: 5px; }
.callout p { font-size: var(--fs-sm); color: #C3C3CC; line-height: 1.6; margin-bottom: 14px; }
.callout .btn { background: var(--c-fill); }

.steps { counter-reset: st; }
.step-c { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md);
  padding: 16px; box-shadow: var(--shadow); margin-bottom: 12px; }
.step-c .hd { display: flex; align-items: center; gap: 11px; margin-bottom: 5px; }
.step-c .no { width: 28px; height: 28px; border-radius: 50%; background: var(--c-fill-soft); color: var(--c-fill-ink);
  display: grid; place-items: center; font-size: var(--fs-sm); font-weight: 700; flex: none; }
.step-c .tt { font-size: var(--fs-md); font-weight: 700; }
.step-c .ds { font-size: var(--fs-sm); color: var(--c-ink-3); line-height: 1.55; margin: 0 0 12px 39px; }
.step-c .ac { margin-left: 39px; }
.step-c .ac .btn { padding: 12px 16px; }
.step-c.ok .no { background: var(--c-fill); color: #fff; }

.big4 { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; margin-bottom: 13px; }
.big4 > div { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md); padding: 15px; box-shadow: var(--shadow); }
.big4 .k { font-size: var(--fs-xs); color: var(--c-ink-3); font-weight: 600; line-height: 1.35;
  display: flex; align-items: flex-start; gap: 6px; min-height: 34px; }
.big4 .k .ic { margin-top: 1px; }
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
.proud .lb { font-size: var(--fs-xs); font-weight: 700; color: var(--brand-amber-d); letter-spacing: .5px; margin-bottom: 8px;
  display: flex; align-items: center; gap: 6px; }
.proud .tx { font-size: var(--fs-md); line-height: 1.7; font-weight: 600; color: #6B4A05; }
.go-class { margin-top: 13px; display: flex; align-items: center; justify-content: center; gap: 9px; }

.class { position: absolute; inset: 0; z-index: 80; background: var(--c-ink); color: #fff; padding: 50px 26px 26px; overflow-y: auto; }
.class .hd { font-size: var(--fs-xs); letter-spacing: 3px; font-weight: 700; color: #8B8B96; margin-bottom: 5px; }
.class h2 { font-size: 27px; font-weight: 700; margin-bottom: 24px; }
.class .g { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
.class .g > div { background: rgba(255,255,255,.07); border-radius: var(--r-md); padding: 16px; }
.class .g b { display: block; font-size: 42px; font-weight: 700; letter-spacing: -2px; line-height: 1; font-variant-numeric: tabular-nums; }
.class .g small { font-size: var(--fs-xs); color: #A9A9B4; font-weight: 600; }
.class .g .up { color: #4FD9EC; font-size: var(--fs-xs); font-weight: 700; margin-top: 4px; }
.class .line { font-size: var(--fs-sm); color: #C3C3CC; line-height: 1.85; margin-bottom: 22px; }
.class .safe { display: inline-flex; align-items: center; gap: 7px; font-size: var(--fs-xs); font-weight: 700; color: #4FD9EC;
  background: rgba(79,217,236,.14); padding: 10px 15px; border-radius: var(--r-pill); margin-bottom: 22px; }
`,

render(ctx) {
  const lw = KB.s.lastWeek;
  const cov = KB.coverage(), sav = KB.savingRate(), prac = KB.practiceCount(), need = KB.needPct();
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
      <div><b>${prac}</b><small>${L("times I practised", "ครั้งที่ฝึกคิด")}</small><div class="up">↑ ${prac - lw.practice}</div></div>
      <div><b>${KB.s.streak.weeks}</b><small>${L("weeks running", "สัปดาห์ต่อเนื่อง")}</small><div class="up">↑ ${KB.s.streak.weeks - lw.streak}</div></div>
    </div>
    <div class="line">${L(`Needed ${need}% : wanted ${100 - need}%`, `จำเป็น ${need}% : อยากได้ ${100 - need}%`)}<br>
      ${MEDAL("silver",15)} ${L(`Small goal ${KB.goalSmallPct()}%`, `เป้าเล็ก ${KB.goalSmallPct()}%`)} · ${MEDAL("gold",15)} ${L(`Big goal ${cov}%`, `เป้าใหญ่ ${cov}%`)}<br>
      ${L("Ran out early:", "ซองที่หมดก่อนกำหนด:")} ${KB.emptyEnvs().length ? KB.emptyEnvs().map(e => LT(e.name)).join(", ") : L("none", "ไม่มี")}</div>
    <div class="safe">${I("lock", 15)} ${L("Checked — no baht amounts on this screen", "ตรวจแล้ว — ไม่มียอดเงินบาทในหน้านี้")}</div>
    <button class="btn ghost" data-stage="">${L("Leave class mode", "ออกจากโหมดคาบเรียน")}</button>
  </div>`;

  /* --- โหมด A: เติมข้อมูลก่อนถึงคาบ (โหมดที่ใช้จริงที่สุด) --- */
  if (ctx.stage === "fill") return `
  <div class="callout">
    <h4>${L("Class is in two days", "อีก 2 วันเจอกัน")}</h4>
    <p>${L("Let's fill in this week together — about five minutes. Skip anything you can't remember; rough is fine.",
            "มาเติมสัปดาห์นี้ด้วยกัน ใช้เวลาราวๆ 5 นาที ข้อไหนนึกไม่ออกข้ามได้เลย คร่าวๆ ก็พอ")}</p>
  </div>

  <div class="steps">
    <div class="step-c ${KB.s.income.length ? "ok" : ""}">
      <div class="hd"><span class="no">1</span><span class="tt">${L("Money that came in", "เงินที่เข้ามา")}</span></div>
      <div class="ds">${L(`Income is the easy one to remember. You've got ${KB.verified().length + KB.pending().length} logged so far.`,
                          `รายได้เป็นเรื่องที่จำง่ายที่สุด ตอนนี้บันทึกไว้แล้ว ${KB.verified().length + KB.pending().length} รายการ`)}</div>
      <div class="ac"><button class="btn ghost" data-sheet="s3">${L("Add income", "เพิ่มรายได้")}</button></div>
    </div>

    <div class="step-c ${KB.adherence() > 0 ? "ok" : ""}">
      <div class="hd"><span class="no">2</span><span class="tt">${L("Did you split it?", "ได้แบ่งตามกฎไหม")}</span></div>
      <div class="ds">${L(`You've followed your own rule ${KB.s.alloc.followed} of ${KB.s.alloc.total} times.`,
                          `ทำตามกฎตัวเองแล้ว ${KB.s.alloc.followed} จาก ${KB.s.alloc.total} ครั้ง`)}</div>
      <div class="ac"><button class="btn ghost" data-go="s4">${L("Check my envelopes", "ดูซองเงิน")}</button></div>
    </div>

    <div class="step-c ${KB.practiceCount() ? "ok" : ""}">
      <div class="hd"><span class="no">3</span><span class="tt">${L("Anything you wanted this week?", "สัปดาห์นี้มีอะไรที่อยากซื้อบ้าง")}</span></div>
      <div class="ds">${L("Think back — anything you nearly bought, or did buy. Running it through now counts exactly the same as doing it in the shop.",
                          "ลองนึกย้อน มีอะไรที่เกือบซื้อ หรือซื้อไปแล้วบ้าง มาลองคิดตอนนี้ นับเท่ากับตอนยืนอยู่หน้าร้านเลย")}</div>
      <div class="ac"><button class="btn ghost" id="backfill-intent">${L("Think one through", "ลองคิดสักอัน")}</button></div>
    </div>

    <div class="step-c ${KB.s.reflection.did ? "ok" : ""}">
      <div class="hd"><span class="no">4</span><span class="tt">${L("Three questions", "สะท้อน 3 คำถาม")}</span></div>
      <div class="ds">${L("One sentence each is plenty.", "ข้อละประโยคเดียวก็พอ")}</div>
      <div class="ac"><button class="btn ghost" data-stage="">${L("Go to the questions", "ไปตอบคำถาม")}</button></div>
    </div>
  </div>

  <button class="btn" data-stage="">${L("Done for now", "พอแค่นี้ก่อน")}</button>`;

  /* --- โหมด B: สรุป --- */
  return `
  <div class="callout">
    <h4>${I("calendarDays", 17)} ${L("Class is in two days", "อีก 2 วันเจอกัน")}</h4>
    <p>${L("Fill in what happened this week before you go — takes about five minutes.",
            "มาเติมสิ่งที่เกิดขึ้นสัปดาห์นี้ก่อนไปเรียน ใช้เวลาราวๆ 5 นาที")}</p>
    <button class="btn" data-stage="fill">${L("Fill in this week", "เติมสัปดาห์นี้")}</button>
  </div>

  <div class="big4">
    <div><div class="k">${I("home", 15)} ${L("Covered by me", "หาเองได้")}</div><div class="v">${cov}%</div>${d(cov, lw.coverage)}</div>
    <div><div class="k">${I("save", 15)} ${L("Savings rate", "อัตราออม")}</div><div class="v">${sav}%</div>${d(sav, lw.saving)}</div>
    <div><div class="k">${I("hand", 15)} ${L("Times I practised", "ครั้งที่ฝึกคิด")}</div><div class="v">${prac}</div>${d(prac, lw.practice)}</div>
    <div><div class="k">${I("flame", 15)} ${L("Weeks running", "สัปดาห์ต่อเนื่อง")}</div><div class="v">${KB.s.streak.weeks}</div>${d(KB.s.streak.weeks, lw.streak)}</div>
  </div>

  <div class="card">
    <div class="card-t">${I("scale", 18)} ${L("Needed vs wanted", "จำเป็น กับ อยากได้")}
      <span class="r">${L("of what you logged", "จากที่บันทึกไว้")}</span></div>
    <div class="nw">
      <i style="width:${need}%;background:var(--c-need)">${need}%</i>
      <i style="width:${100 - need}%;background:var(--c-spend);color:var(--c-ink)">${100 - need}%</i>
    </div>
    <div class="tiny muted">${L("A direction, not a verdict — this only covers what you remembered to write down.",
                                "ดูเป็นแนวโน้ม ไม่ใช่คำตัดสิน เพราะนี่นับเฉพาะที่นึกออกแล้วจดไว้")}</div>
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
    <div class="card-t">${I("pin", 18)} ${L("When you want to spend", "ช่วงที่อยากใช้เงิน")}</div>
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
    <div class="card-t">${I("message", 18)} ${L("Three questions", "สะท้อน 3 คำถาม")}
      <span class="r">${KB.s.reflectionsDone}/${KB.s.reflectionsDue} ${L("weeks", "สัปดาห์")}</span></div>
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

  const bf = el.querySelector("#backfill-intent");
  if (bf) bf.onclick = () => openSheet("s2", { mode: "backfill" });

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
