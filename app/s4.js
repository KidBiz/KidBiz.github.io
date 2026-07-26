/* ============================================================
   S4 — ซองเงิน + กฎแบ่ง
   N5 ซองหมด = บทเรียน ไม่ใช่ error (ห้ามตำหนิ ห้ามสีแดง)
   ============================================================ */

SCREENS.s4 = {
title: () => L("Envelopes", "ซองเงิน"),
sub: () => L(`Your rule: ${KB.s.rule.need}/${KB.s.rule.save}/${KB.s.rule.spend}/${KB.s.rule.share}`,
             `กฎของฉัน ${KB.s.rule.need}/${KB.s.rule.save}/${KB.s.rule.spend}/${KB.s.rule.share}`),
notes: () => [
  ["N5", L("The Spend envelope is empty — and there is no alert, no red, no telling-off. Just the numbers and a question worth answering.",
           "ซองใช้หมดแล้ว และไม่มีป๊อปอัพเตือน ไม่มีสีแดง ไม่มีคำตำหนิ มีแค่ตัวเลขกับคำถามที่ควรตอบ")],
  [L("Their rule", "กฎของลูกเอง"), L("The child sets the percentages, and has to write down why whenever they change them — so they can look back and see how they were thinking at the time.",
      "เด็กเป็นคนตั้ง % เอง และต้องเขียนเหตุผลทุกครั้งที่แก้ เพื่อย้อนกลับมาดูได้ว่าตอนนั้นคิดอะไรอยู่")],
  ["N4", L("Parents can see the envelopes but cannot change a number here. The rule belongs to the child.",
           "พ่อแม่เห็นซองได้ แต่แก้ตัวเลขตรงนี้ไม่ได้ เจ้าของกฎคือลูก")]
],

css: `
.envs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 13px; }
.env { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md); padding: 14px; box-shadow: var(--shadow); }
.env .hd { display: flex; align-items: center; gap: 7px; font-size: var(--fs-sm); font-weight: 700; margin-bottom: 11px; }
.env .hd .p { margin-left: auto; font-size: var(--fs-xs); color: var(--c-ink-3); font-weight: 600; }
.pack { position: relative; height: 82px; border-radius: 5px 5px 10px 10px; overflow: hidden;
  background: var(--c-surface-2); border: 1.5px solid var(--c-line); }
.pack .lv { position: absolute; left: 0; right: 0; bottom: 0; transition: height .6s cubic-bezier(.2,.9,.25,1); opacity: .92; }
/* รอยพับซองแบบเส้นบางๆ — เห็นได้ทั้งบนพื้นอ่อนและบนสีเต็มซอง */
.pack .flap { position: absolute; top: 0; left: 0; right: 0; height: 30px; pointer-events: none;
  background:
    linear-gradient(to bottom right, transparent calc(50% - 1px), rgba(0,0,0,.14) calc(50% - 1px),
      rgba(0,0,0,.14) calc(50% + 1px), transparent calc(50% + 1px)) left / 50% 100% no-repeat,
    linear-gradient(to bottom left,  transparent calc(50% - 1px), rgba(0,0,0,.14) calc(50% - 1px),
      rgba(0,0,0,.14) calc(50% + 1px), transparent calc(50% + 1px)) right / 50% 100% no-repeat; }
.pack .n { position: absolute; inset: 0; display: grid; place-items: center; font-size: 23px; font-weight: 700;
  font-variant-numeric: tabular-nums; }
.env .ft { display: flex; justify-content: space-between; font-size: var(--fs-xs); margin-top: 10px; color: var(--c-ink-3); font-weight: 600; }
.env .ft b { color: var(--c-ink); font-variant-numeric: tabular-nums; font-weight: 700; }
.env.zero .pack { border-style: dashed; }

.reflect { background: var(--c-surface); border: 1px solid var(--c-line); border-left: 4px solid var(--c-neutral);
  border-radius: var(--r-sm); padding: 16px 17px; box-shadow: var(--shadow); margin-bottom: 13px; }
.reflect h4 { font-size: var(--fs-md); font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; color: var(--c-ink); }
.reflect h4 .ic { color: var(--c-neutral); }
.reflect p { font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.6; margin-bottom: 13px; }
.reflect textarea { min-height: 70px; }

.rule-row { display: flex; align-items: center; gap: 11px; padding: 12px 0; border-bottom: 1px solid var(--c-line); }
.rule-row:last-of-type { border: 0; }
.rule-row .dot { width: 11px; height: 11px; border-radius: 50%; flex: none; }
.rule-row .nm { flex: 1; font-size: var(--fs-md); font-weight: 600; }
.step { display: flex; align-items: center; gap: 4px; }
.step button { width: 34px; height: 34px; border-radius: 10px; border: 1.5px solid var(--c-line); background: var(--c-surface);
  font-size: 18px; font-weight: 700; cursor: pointer; color: var(--c-ink-2); font-family: var(--font); }
.step .v { width: 54px; text-align: center; font-size: var(--fs-md); font-weight: 700; font-variant-numeric: tabular-nums; }
.total { display: flex; justify-content: space-between; align-items: center; margin-top: 13px; padding-top: 13px;
  border-top: 2px solid var(--c-line); font-size: var(--fs-md); font-weight: 700; }
.total .bad { color: var(--c-ink-3); }
.hist { font-size: var(--fs-sm); padding: 11px 0; border-bottom: 1px dashed var(--c-line); line-height: 1.6; }
.hist:last-child { border: 0; }
.hist b { font-variant-numeric: tabular-nums; font-weight: 700; }
`,

render(ctx) {
  const empties = KB.emptyEnvs();
  const r = ctx.draft || KB.s.rule;
  const sum = r.need + r.save + r.spend + r.share;

  return `
  <div class="envs">
    ${KB.s.envelopes.map(e => {
      const bal = KB.envBal(e), fill = KB.envFill(e);
      return `<div class="env ${bal === 0 ? "zero" : ""}">
        <div class="hd"><span style="color:var(--c-${e.key})">${I(e.ic, 19)}</span> ${LT(e.name)}<span class="p">${KB.s.rule[e.key]}%</span></div>
        <div class="pack">
          <div class="lv" style="height:${fill}%;background:var(--c-${e.key})"></div>
          <div class="flap"></div>
          <div class="n" style="color:${fill > 48 ? "#fff" : "var(--c-ink)"}">${fill}%</div>
        </div>
        <div class="ft"><span>${L("left", "เหลือ")} <b>${KB.baht(bal)}</b></span><span>${L("in", "เข้า")} ${KB.baht(e.inn)}</span></div>
      </div>`;
    }).join("")}
  </div>

  ${empties.length ? `
  <div class="reflect">
    <h4>${I("inbox", 19)} ${L(`The ${empties.map(e => LT(e.name)).join(" / ")} envelope is empty`,
             `ซอง${empties.map(e => LT(e.name)).join(" / ")}หมดแล้ว`)}</h4>
    <p>${L(`That's information, not a mistake — you've found the edge of a rule you set yourself.<br>This week it took in ${KB.baht(empties[0].inn)} and ${KB.baht(empties[0].out)} went out.`,
            `นี่คือข้อมูล ไม่ใช่ความผิดพลาด — แปลว่าเจอขอบของกฎที่ตั้งไว้เองแล้ว<br>สัปดาห์นี้ซองนี้เข้า ${KB.baht(empties[0].inn)} ออก ${KB.baht(empties[0].out)}`)}</p>
    <textarea class="inp" id="rf" placeholder="${L("What happened? What would you change next week?", "เกิดอะไรขึ้น? สัปดาห์หน้าอยากปรับอะไร?")}"></textarea>
    <div class="btn-row" style="margin-top:12px">
      <button class="btn sm ghost" style="flex:1" id="rf-save">${L("Save this thought", "บันทึกความคิด")}</button>
      <button class="btn sm ghost" style="flex:1" id="rf-rule">${L("Adjust my rule", "ปรับกฎแบ่งเงิน")}</button>
    </div>
  </div>` : ""}

  <div class="card" id="rulecard">
    <div class="card-t">${I("split", 18)} ${L("My splitting rule", "กฎแบ่งเงินของฉัน")} <span class="r">v${KB.s.ruleHistory.length}</span></div>
    ${KB.s.envelopes.map(e => `
      <div class="rule-row">
        <span class="dot" style="background:var(--c-${e.key})"></span>
        <span class="nm">${LT(e.name)}</span>
        <span class="step">
          <button data-d="-1" data-k="${e.key}">−</button>
          <span class="v">${r[e.key]}%</span>
          <button data-d="1" data-k="${e.key}">+</button>
        </span>
      </div>`).join("")}
    <div class="total"><span>${L("Total", "รวม")}</span>
      <span class="${sum === 100 ? "" : "bad"}">${sum}% ${sum === 100 ? "✓" : L("· needs to be 100%", "· ต้องได้ 100%")}</span></div>
    ${ctx.draft ? `
      <div class="field" style="margin-top:16px">
        <label class="fl">${L("Why are you changing it?", "ทำไมถึงอยากปรับ")}</label>
        <textarea class="inp" id="why" placeholder="${L("e.g. Spend runs out too fast, trying 5% more", "เช่น ซองใช้หมดเร็วเกินไป อยากลองเพิ่มอีก 5%")}"></textarea>
      </div>
      <div class="btn-row">
        <button class="btn ghost" id="cancel">${L("Cancel", "ยกเลิก")}</button>
        <button class="btn fill" id="apply" ${sum === 100 ? "" : "disabled style=opacity:.4"}>${L("Use the new rule", "ใช้กฎใหม่")}</button>
      </div>` : ""}
  </div>

  <div class="card">
    <div class="card-t">${I("history", 18)} ${L("Rule history", "ประวัติกฎ")}</div>
    ${KB.s.ruleHistory.slice().reverse().map(h =>
      `<div class="hist"><b>v${h.v} · ${h.r}</b> <span class="muted tiny">(${LT(h.d)})</span><br><span class="muted">${LT(h.why)}</span></div>`).join("")}
  </div>

  <div class="card">
    <div class="card-t">${I("bars", 18)} ${L("This week", "ตัวเลขสัปดาห์นี้")}</div>
    <div class="row" style="align-items:stretch">
      <div class="metric"><b>${KB.savingRate()}%</b><span>${L("Savings rate", "อัตราออม")}</span></div>
      <div class="metric"><b>${KB.adherence()}%</b><span>${L("Followed the rule", "ทำตามกฎ")}</span></div>
      <div class="metric"><b>${KB.s.alloc.total}</b><span>${L("Times split", "ครั้งที่แบ่ง")}</span></div>
    </div>
  </div>`;
},

mount(el, ctx) {
  el.querySelectorAll(".step button").forEach(b => b.onclick = () => {
    const d = { ...(ctx.draft || KB.s.rule) };
    d[b.dataset.k] = Math.max(0, Math.min(100, d[b.dataset.k] + (+b.dataset.d) * 5));
    setCtx({ draft: d });
  });
  const on = (id, fn) => { const x = el.querySelector(id); if (x) x.onclick = fn; };

  on("#cancel", () => setCtx({ draft: null }));
  on("#rf-rule", () => { setCtx({ draft: { ...KB.s.rule } }); el.querySelector("#rulecard")?.scrollIntoView({ behavior: "smooth" }); });
  on("#rf-save", () => {
    const v = el.querySelector("#rf").value.trim();
    toast(v ? L("Saved to your weekly card 📋", "เก็บไว้ในสรุปสัปดาห์แล้ว 📋")
            : L("One sentence is plenty", "เขียนสัก 1 ประโยคก็พอ"));
  });
  on("#apply", () => {
    const d = ctx.draft, why = el.querySelector("#why").value.trim();
    if (d.need + d.save + d.spend + d.share !== 100) return toast(L("It has to add up to 100%", "รวมกันต้องได้ 100%"));
    if (!why) return toast(L("Write a short reason first — you'll want to read it back later",
                             "เขียนเหตุผลสั้นๆ ก่อนนะ จะได้ย้อนดูได้ว่าตอนนั้นคิดอะไร"));
    KB.s.rule = d;
    KB.s.ruleHistory.push({ v: KB.s.ruleHistory.length + 1, d: { en: "Today", th: "วันนี้" },
                            r: `${d.need}/${d.save}/${d.spend}/${d.share}`, why: { en: why, th: why } });
    KB.save(); setCtx({ draft: null });
    toast(L("New rule is live · your next money will split this way", "ใช้กฎใหม่แล้ว · เงินก้อนถัดไปจะแบ่งตามนี้"));
  });
}
};
