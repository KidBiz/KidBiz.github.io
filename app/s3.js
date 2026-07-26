/* ============================================================
   S3 — บันทึกรายได้
   4 ระดับงาน · หลังบันทึก = รอพ่อแม่ยืนยัน (กันตัวเลขปลอม)
   ============================================================ */

SCREENS.s3 = {
title: () => L("I earned", "ได้เงินมา"),
notes: () => [
  ["N6", L("Logging has to be almost free. A number and four taps — the detail and the hours can come later.",
           "การบันทึกต้องง่ายมาก ใส่ตัวเลขกับแตะ 4 ครั้งก็จบ รายละเอียดกับชั่วโมงเติมทีหลังได้")],
  [L("Confirmed only", "นับเมื่อยืนยัน"), L("Nothing counts toward Covered until a parent confirms it came from real work, not a gift.",
      "ยังไม่ถูกนับจนกว่าพ่อแม่จะยืนยันว่ามาจากงานจริง ไม่ใช่ของขวัญ")],
  [L("Four levels", "4 ระดับงาน"), L("The levels aren't a score. They let a teenager see themselves moving from trading time for money toward building something that sells while they sleep.",
      "4 ระดับไม่ได้ให้คะแนน แต่ทำให้เด็กเห็นว่าตัวเองกำลังขยับจาก 'ทำงานแลกเงิน' ไปสู่ 'สร้างของที่ขายได้แม้ตอนหลับ'")]
],

css: `
.lvpick { display: grid; gap: 9px; }
.lvbtn { display: flex; align-items: center; gap: 12px; text-align: left; font-family: var(--font);
  background: var(--c-surface); border: 1.5px solid var(--c-line); border-radius: var(--r-sm); padding: 14px; cursor: pointer; }
.lvbtn.on { border-color: var(--c-fill); background: var(--c-fill-soft); }
.lvbtn .n { width: 30px; height: 30px; border-radius: 50%; background: var(--c-surface-2); color: var(--c-ink-2);
  display: grid; place-items: center; font-size: var(--fs-sm); font-weight: 700; flex: none; }
.lvbtn.on .n { background: var(--c-fill); color: #fff; }
.lvbtn b { display: block; font-size: var(--fs-sm); font-weight: 700; line-height: 1.35; }
.lvbtn small { font-size: var(--fs-xs); color: var(--c-ink-3); line-height: 1.4; }

.res { text-align: center; padding: 6px 0 4px; }
.res .em { color: var(--c-fill); line-height: 0; }
.res h3 { font-size: 30px; font-weight: 700; margin: 8px 0 5px; letter-spacing: -.5px; }
.res .lift { font-size: var(--fs-md); color: var(--c-ink-2); margin-bottom: 16px; }
.res .lift b { color: var(--c-fill-ink); font-weight: 700; }
.minipit { height: 100px; border-radius: 8px 8px 16px 16px; position: relative; overflow: hidden; margin-bottom: 7px;
  background: linear-gradient(175deg, var(--c-well), var(--c-well-d)); box-shadow: inset 0 7px 14px rgba(0,0,0,.36); }
.minipit .f { position: absolute; left: 0; right: 0; bottom: 0; background: var(--c-fill); transition: height 1s cubic-bezier(.2,.9,.25,1); }
.minipit .p { position: absolute; left: 0; right: 0; transition: all 1s cubic-bezier(.2,.9,.25,1);
  background: repeating-linear-gradient(135deg, var(--c-pending) 0 7px, rgba(127,216,229,.4) 7px 14px); }
.minipit .lb { position: absolute; inset: 0; display: grid; place-items: center; color: #fff; font-weight: 700; font-size: 21px; text-shadow: 0 2px 10px rgba(0,0,0,.5); }

.splitrow { display: flex; align-items: center; gap: 11px; padding: 11px 0; border-bottom: 1px solid var(--c-line); }
.splitrow:last-child { border: 0; }
.splitrow .dot { width: 10px; height: 10px; border-radius: 50%; flex: none; }
.splitrow .nm { flex: 1; font-size: var(--fs-md); font-weight: 600; }
.splitrow .pp { font-size: var(--fs-xs); color: var(--c-ink-3); font-weight: 600; }
.splitrow .am { font-size: var(--fs-md); font-weight: 700; font-variant-numeric: tabular-nums; width: 72px; text-align: right; }
`,

render(ctx) {
  /* --- ผลลัพธ์หลังบันทึก --- */
  if (ctx.step === "done") {
    const cov = KB.coverage(), covP = KB.coveragePending();
    const pctDay = Math.round(ctx.amt / KB.dailyCost() * 100);
    const rate = ctx.hrs ? ctx.amt / ctx.hrs : 0;
    return `
    <div class="res">
      <div class="em">${I("sparkle", 54)}</div>
      <h3>+${KB.baht(ctx.amt)}</h3>
      <div class="lift">${L(`That's <b>${pctDay}%</b> of what today costs you`, `= <b>${pctDay}%</b> ของค่าใช้จ่ายวันนี้`)}${rate ? ` · ${KB.baht(rate)}/${L("hr", "ชม.")}` : ""}</div>
    </div>
    <div class="minipit">
      <div class="p" style="bottom:${cov}%;height:${Math.max(0, covP - cov)}%"></div>
      <div class="f" style="height:${cov}%"></div>
      <div class="lb">${cov}% → ${covP}%</div>
    </div>
    <div class="tiny muted" style="text-align:center;margin-bottom:16px">${L(
      "The striped part is waiting to be confirmed — it isn't counted yet",
      "แถบลายทางคือส่วนที่รอยืนยัน ยังไม่ถูกนับ")}</div>

    <div class="card" style="background:var(--brand-amber-soft);border-color:#F4E4BE">
      <div class="row" style="align-items:flex-start"><span style="color:var(--brand-amber-d)">${I("hourglass", 22)}</span>
        <div style="flex:1"><b style="font-size:var(--fs-md)">${L("Waiting for a parent to confirm", "รอพ่อแม่ยืนยัน")}</b>
          <div class="tiny" style="color:var(--brand-amber-d);margin-top:3px">${L(
            "Once they confirm this came from real work, it counts toward Covered.",
            "เมื่อพ่อแม่ยืนยันว่ามาจากงานจริง ตัวเลขจะถูกนับเข้าทันที")}</div></div></div>
    </div>

    <div class="card">
      <div class="card-t">${I("split", 18)} ${L("Split automatically by your own rule", "แบ่งอัตโนมัติตามกฎที่ตั้งไว้")}
        <span class="r">${KB.s.rule.need}/${KB.s.rule.save}/${KB.s.rule.spend}/${KB.s.rule.share}</span></div>
      ${KB.splitOf(ctx.amt).map(x => `
        <div class="splitrow">
          <span class="dot" style="background:var(--c-${x.key})"></span>
          <span class="nm">${x.name}</span><span class="pp">${x.p}%</span>
          <span class="am">+${KB.baht(x.amt)}</span>
        </div>`).join("")}
    </div>
    <button class="btn ghost" data-close="1">${L("Done", "เสร็จแล้ว")}</button>`;
  }

  /* --- ฟอร์ม --- */
  return `
  <div class="field" style="text-align:center">
    <label class="fl">${L("How much did you earn?", "ได้มาเท่าไหร่")}</label>
    <input class="inp big" id="amt" type="number" inputmode="numeric">
  </div>
  <div class="field">
    <label class="fl">${L("What kind of work was it?", "งานแบบไหน")}</label>
    <div class="lvpick" id="lv">
      ${KB.s.workLevels.map((w, i) => `
        <button class="lvbtn ${i === 1 ? "on" : ""}" data-lv="${i + 1}">
          <span class="n">${i + 1}</span>
          <span><b>${LT(w).replace(/^[①②③④]\s*/, "")}</b><small>${LT(KB.s.workHints[i])}</small></span>
        </button>`).join("")}
    </div>
  </div>
  <div class="field"><label class="fl">${L("What did you do?", "ทำอะไร")}</label>
    <input class="inp" id="note" placeholder="${L("e.g. washed a neighbour's car", "เช่น ล้างรถให้เพื่อนบ้าน")}"></div>
  <div class="field"><label class="fl">${L("How long did it take?", "ใช้เวลากี่ชั่วโมง")}</label>
    <div class="chips" id="hrs">
      ${[0.5, 1, 2, 3, 4, 6].map((h, i) => `<button class="chip ${i === 2 ? "on" : ""}" data-h="${h}">${h} ${L("hr", "ชม.")}</button>`).join("")}
    </div>
  </div>
  <button class="btn fill" id="save">${L("Save and send to a parent", "บันทึก แล้วส่งให้พ่อแม่ยืนยัน")}</button>`;
},

mount(el, ctx) {
  el.querySelectorAll(".lvbtn").forEach(b => b.onclick = () => {
    el.querySelectorAll(".lvbtn").forEach(x => x.classList.remove("on")); b.classList.add("on");
  });
  el.querySelectorAll("#hrs .chip").forEach(c => c.onclick = () => {
    el.querySelectorAll("#hrs .chip").forEach(x => x.classList.remove("on")); c.classList.add("on");
  });

  const save = el.querySelector("#save");
  if (save) save.onclick = () => {
    const amt = parseInt(el.querySelector("#amt").value || 0, 10) || 0;
    if (!amt) return toast(L("Put an amount in first", "ใส่จำนวนเงินก่อนนะ"));
    const lv   = +el.querySelector(".lvbtn.on").dataset.lv;
    const hrs  = +el.querySelector("#hrs .chip.on").dataset.h;
    const note = el.querySelector("#note").value.trim() || L("Work done today", "งานที่ทำวันนี้");
    KB.addIncome(amt, lv, hrs, note);
    setSheet({ step: "done", amt, hrs });
  };
}
};
