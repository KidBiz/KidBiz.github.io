/* ============================================================
   S3 — บันทึกรายได้
   N6/§0.1: การกรอกย้อนหลังคือโหมดปกติ ไม่ใช่ความล้มเหลว
            → เลือกวันย้อนหลังได้ในคลิกเดียว · กรอกหลายรายการรวดเดียวได้
   ============================================================ */

SCREENS.s3 = {
title: () => L("I earned", "ได้เงินมา"),
notes: () => [
  [L("Backfilling is normal", "กรอกย้อนหลังคือเรื่องปกติ"), L("Families who already track every baht don't need this programme. Ours fill things in from memory the night before class — so picking a past day is one tap, and you can keep adding without leaving the screen.",
      "บ้านที่จดครบทุกบาทอยู่แล้วไม่ต้องมาเรียนกับเรา ผู้ใช้จริงของเราจะนั่งกรอกจากความจำคืนก่อนวันเรียน การเลือกวันย้อนหลังจึงกดครั้งเดียว และเพิ่มรายการต่อได้โดยไม่ต้องออกจากหน้านี้")],
  [L("Confirmed only", "นับเมื่อยืนยัน"), L("Nothing counts toward the goals until a parent confirms it came from real work rather than a gift.",
      "ยังไม่ถูกนับเข้าเป้าจนกว่าพ่อแม่จะยืนยันว่ามาจากงานจริง ไม่ใช่ของขวัญ")],
  [L("Four kinds of work", "งาน 4 แบบ"), L("Not a score. It lets a teenager see themselves moving from trading hours for money toward building something that sells while they sleep.",
      "ไม่ใช่คะแนน แต่ทำให้เด็กเห็นว่าตัวเองกำลังขยับจากการเอาเวลาแลกเงิน ไปสู่การสร้างของที่ขายได้แม้ตอนหลับ")]
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
.whenrow { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.whenrow .ic { color: var(--c-ink-3); }
`,

render() {
  return `
  <div class="field" style="text-align:center">
    <label class="fl">${L("How much did you earn?", "ได้มาเท่าไหร่")}</label>
    <input class="inp big" id="amt" type="number" inputmode="numeric">
  </div>

  <div class="field">
    <div class="whenrow">${I("calendarDays", 16)}<label class="fl" style="margin:0">${L("When was this?", "เมื่อไหร่")}</label></div>
    <div class="chips" id="when">
      <button class="chip on" data-en="Today"        data-th="วันนี้">${L("Today", "วันนี้")}</button>
      <button class="chip"    data-en="Yesterday"    data-th="เมื่อวาน">${L("Yesterday", "เมื่อวาน")}</button>
      <button class="chip"    data-en="A few days ago" data-th="2-3 วันก่อน">${L("A few days ago", "2-3 วันก่อน")}</button>
      <button class="chip"    data-en="Earlier this week" data-th="ต้นสัปดาห์นี้">${L("Earlier this week", "ต้นสัปดาห์นี้")}</button>
      <button class="chip"    data-en="Last week"    data-th="สัปดาห์ก่อน">${L("Last week", "สัปดาห์ก่อน")}</button>
    </div>
  </div>

  <div class="field">
    <label class="fl">${L("What kind of work was it?", "งานแบบไหน")}</label>
    <div class="lvpick" id="lv">
      ${KB.s.workLevels.map((w, i) => `
        <button class="lvbtn ${i === 1 ? "on" : ""}" data-lv="${i + 1}">
          <span class="n">${i + 1}</span>
          <span><b>${LT(w)}</b><small>${LT(KB.s.workHints[i])}</small></span>
        </button>`).join("")}
    </div>
  </div>

  <div class="field"><label class="fl">${L("What did you do?", "ทำอะไร")}</label>
    <input class="inp" id="note" placeholder="${L("e.g. washed a neighbour's car", "เช่น ล้างรถให้เพื่อนบ้าน")}"></div>

  <div class="field"><label class="fl">${L("Roughly how long did it take?", "ใช้เวลาประมาณกี่ชั่วโมง")}</label>
    <div class="chips" id="hrs">
      ${[0.5, 1, 2, 3, 4, 6].map((h, i) => `<button class="chip ${i === 2 ? "on" : ""}" data-h="${h}">${h} ${L("hr", "ชม.")}</button>`).join("")}
    </div>
  </div>

  <button class="btn fill" id="save">${L("Save", "บันทึก")}</button>
  <button class="btn ghost" id="saveMore" style="margin-top:10px">${L("Save and add another", "บันทึก แล้วเพิ่มอีกรายการ")}</button>
  <div class="tiny muted" style="text-align:center;margin-top:12px">${L(
    "Rough numbers from memory are fine. This is a training log, not an account book.",
    "ตัวเลขคร่าวๆ จากความจำก็พอ นี่คือสมุดบันทึกการฝึก ไม่ใช่สมุดบัญชี")}</div>`;
},

mount(el) {
  const one = sel => el.querySelectorAll(sel).forEach(c => c.onclick = () => {
    c.parentElement.querySelectorAll(sel.split(" ").pop()).forEach(x => x.classList.remove("on"));
    c.classList.add("on");
  });
  one(".lvpick .lvbtn"); one("#hrs .chip"); one("#when .chip");

  const collect = () => {
    const amt = parseInt(el.querySelector("#amt").value || 0, 10) || 0;
    if (!amt) { toast(L("Put an amount in first", "ใส่จำนวนเงินก่อนนะ")); return null; }
    const when = el.querySelector("#when .chip.on");
    return {
      amt,
      lv:   +el.querySelector(".lvbtn.on").dataset.lv,
      hrs:  +el.querySelector("#hrs .chip.on").dataset.h,
      note: el.querySelector("#note").value.trim() || L("Work done", "งานที่ทำ"),
      mode: when.dataset.en === "Today" ? "live" : "backfill",
      day:  { en: when.dataset.en, th: when.dataset.th }
    };
  };

  el.querySelector("#save").onclick = () => {
    const v = collect(); if (!v) return;
    KB.addIncome(v.amt, v.lv, v.hrs, v.note, v.mode, v.day);
    openSheet("s3b", { amt: v.amt, hrs: v.hrs });      // → หน้าฉลอง "= กี่วัน"
  };

  el.querySelector("#saveMore").onclick = () => {
    const v = collect(); if (!v) return;
    KB.addIncome(v.amt, v.lv, v.hrs, v.note, v.mode, v.day);
    setSheet({ n: (Math.random()) });                   // ล้างฟอร์ม อยู่หน้าเดิม
    toast(L(`Saved ${KB.baht(v.amt)} · add the next one`, `บันทึก ${KB.baht(v.amt)} แล้ว · เพิ่มรายการต่อได้เลย`));
  };
}
};
