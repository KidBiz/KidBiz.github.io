/* ============================================================
   S2 — ลองคิดดูก่อน (Pause)  ⭐ โมเมนต์ลายเซ็นของแอป
   ⛔ ห้ามทำให้ [ซื้อเลย] ดูเป็นตัวเลือกที่ผิด — เราวัดการได้หยุดดู ไม่ได้วัดการไม่ซื้อ
   ============================================================ */

SCREENS.s2 = {
title: () => L("Think it over", "ลองคิดดูก่อน"),
sheetTitle: c => (c.skipAsk ? L("Log what I spent", "บันทึกเงินที่ใช้") : L("Think it over", "ลองคิดดูก่อน")),
notes: () => [
  [L("Signature", "ลายเซ็น"), L("A price turns into three things a teenager can actually feel: a share of the Spend envelope, hours of their own work, and a share of one day of living.",
      "ราคาถูกแปลงเป็น 3 อย่างที่เด็กรู้สึกได้จริง: สัดส่วนของซองใช้ · ชั่วโมงที่ต้องทำงานเอง · สัดส่วนของค่าใช้จ่าย 1 วัน")],
  [L("Even weight", "สองปุ่มเท่ากัน"), L("'Buy it' and 'Not yet' look identical and both count as a successful pause. We measure looking first, not resisting.",
      "ปุ่ม 'ซื้อเลย' กับ 'ยังไม่ซื้อ' หน้าตาเหมือนกันเป๊ะ และนับเป็นความสำเร็จเท่ากัน เราวัดการได้ดูตัวเลขก่อน ไม่ได้วัดการอดใจ")],
  ["N7", L("Coach, not parent. No 'are you sure?', no guilt, no red.",
           "โทนแบบโค้ช ไม่ใช่คนคอยห้าม ไม่มีคำว่า 'แน่ใจเหรอ' ไม่มีการทำให้รู้สึกผิด ไม่มีสีแดง")]
],

css: `
.q { font-size: var(--fs-lg); font-weight: 700; text-align: center; margin: 8px 0 20px; line-height: 1.4; }
.pricebox { text-align: center; margin-bottom: 20px; }
.pricebox .cur { font-size: 28px; font-weight: 700; color: var(--c-ink-3); vertical-align: super; }
.pricebox input { width: 200px; font-family: var(--font); font-size: 56px; font-weight: 700; letter-spacing: -2px;
  text-align: center; border: 0; border-bottom: 3px solid var(--c-line); background: none; color: var(--c-ink); padding: 4px 0; }
.pricebox input:focus { outline: 0; border-color: var(--c-pause); }

.cmp { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md); padding: 4px 17px; box-shadow: var(--shadow); margin-bottom: 15px; }
.cmp .r { display: flex; align-items: center; gap: 14px; padding: 17px 0; border-bottom: 1px solid var(--c-line); }
.cmp .r:last-child { border: 0; }
.evenly { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 17px;
  font-size: var(--fs-xs); color: var(--c-ink-2); line-height: 1.5; text-align: center; }
.cmp .tx { flex: 1; font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.45; }
.cmp .vl { font-size: 28px; font-weight: 700; letter-spacing: -1px; font-variant-numeric: tabular-nums; }
.warnfree { background: var(--c-surface-2); border-radius: var(--r-sm); padding: 14px 15px; font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.6; margin-bottom: 16px; }
.twin { display: flex; gap: 11px; }
.twin .btn { flex: 1; padding: 20px 8px; font-size: var(--fs-md); background: var(--c-surface); color: var(--c-ink); border: 2px solid var(--c-ink); }
.twin .btn small { display: block; font-size: var(--fs-xs); font-weight: 500; color: var(--c-ink-3); margin-top: 4px; }
.s2done { text-align: center; padding: 28px 8px 8px; }
.s2done .em { color: var(--c-pause-ink); line-height: 0; }
.s2done .st .ic { color: var(--c-fill-ink); }
.s2done h3 { font-size: 26px; font-weight: 700; margin: 12px 0 10px; }
.s2done p { font-size: var(--fs-md); color: var(--c-ink-2); line-height: 1.7; margin-bottom: 20px; }
.s2done .st { display: inline-flex; gap: 8px; background: var(--c-fill-soft); color: var(--c-fill-ink); font-weight: 700;
  font-size: var(--fs-sm); padding: 11px 18px; border-radius: var(--r-pill); margin-bottom: 22px; }
`,

render(ctx) {
  const st = ctx.step || (ctx.skipAsk ? "log" : "ask");
  const amt = ctx.amt || 0;

  /* --- โหมด "ใช้เงินไป" ธรรมดา (ไม่ได้ผ่านการหยุดดู) --- */
  if (st === "log") return `
    <div class="q">${L("How much did you spend?", "ใช้เงินไปเท่าไหร่?")}</div>
    <div class="pricebox"><span class="cur">฿</span><input id="amt" type="number" inputmode="numeric" value="${amt || ""}"></div>
    <div class="field"><label class="fl">${L("On what?", "ซื้ออะไร")}</label>
      <input class="inp" id="what" placeholder="${L("e.g. bubble tea", "เช่น ชานมไข่มุก")}" value="${ctx.what || ""}"></div>
    <div class="field"><label class="fl">${L("From which envelope?", "จ่ายจากซองไหน")}</label>
      <div class="chips" id="envpick">${KB.s.envelopes.map((e, i) =>
        `<button class="chip ${i === 2 ? "on" : ""}" data-env="${e.key}">${e.ic} ${LT(e.name)}</button>`).join("")}</div>
    </div>
    <div class="field"><label class="fl">${L("Needed it, or wanted it?", "จำเป็น หรือ อยากได้")}</label>
      <div class="chips" id="nwpick">
        <button class="chip on" data-nw="need">${L("Needed", "จำเป็น")}</button>
        <button class="chip" data-nw="want">${L("Wanted", "อยากได้")}</button>
      </div>
    </div>
    <button class="btn" id="save">${L("Save", "บันทึก")}</button>`;

  /* --- ขั้น 1: ราคา --- */
  if (st === "ask") return `
    <div class="q">${L("What are you looking at?", "กำลังอยากได้อะไรอยู่?")}</div>
    <div class="pricebox"><span class="cur">฿</span><input id="amt" type="number" inputmode="numeric" value="${amt || ""}"></div>
    <div class="field"><label class="fl">${L("What is it?", "ของที่อยากได้")}</label>
      <input class="inp" id="what" placeholder="${L("e.g. bluetooth headphones", "เช่น หูฟังบลูทูธ")}" value="${ctx.what || ""}"></div>
    <div class="field"><label class="fl">${L("Or tap a quick one", "หรือกดเลือกเร็วๆ")}</label>
      <div class="chips" id="quick">
        <button class="chip" data-p="45"  data-w="${L("Bubble tea", "ชานมไข่มุก")}">${L("Bubble tea", "ชานม")} ฿45</button>
        <button class="chip" data-p="120" data-w="${L("Gachapon toy", "ตุ๊กตากาชาปอง")}">${L("Gachapon", "กาชาปอง")} ฿120</button>
        <button class="chip" data-p="199" data-w="${L("Game skin", "สกินในเกม")}">${L("Game skin", "สกินเกม")} ฿199</button>
        <button class="chip" data-p="590" data-w="${L("Headphones", "หูฟังบลูทูธ")}">${L("Headphones", "หูฟัง")} ฿590</button>
      </div>
    </div>
    <button class="btn pause" id="next">${L("Show me what it costs →", "ดูก่อนตัดสินใจ →")}</button>`;

  /* --- ขั้น 2: หน้าคั่น (หัวใจของหน้านี้) --- */
  if (st === "show") {
    const sp = KB.env("spend"), bal = KB.envBal(sp);
    const allBal = KB.s.envelopes.reduce((a, e) => a + KB.envBal(e), 0);
    const base = bal > 0 ? bal : allBal;          // ซองใช้หมด → เทียบกับเงินที่เหลือทุกซองแทน
    const pctSpend = base ? Math.round(amt / base * 100) : null;
    const hrs = KB.hourly() ? (amt / KB.hourly()) : 0;
    const pctDay = Math.round(amt / KB.dailyCost() * 100);
    return `
    <div class="q">${KB.baht(amt)} <span class="muted" style="font-weight:500;font-size:var(--fs-md)">— ${ctx.what || L("this", "ของชิ้นนี้")}</span></div>
    <div class="cmp">
      <div class="r">
        <div class="ic-box" style="background:var(--brand-amber-soft);color:var(--brand-amber-d)">${I("cart", 22)}</div>
        <div class="tx">${bal > 0 ? L("of what's left in your Spend envelope", "ของเงินที่เหลือในซองใช้")
                                  : L("of everything you have left across all envelopes", "ของเงินที่เหลือทุกซองรวมกัน")}<br>
          <span class="tiny" style="color:var(--c-ink-3)">${bal > 0 ? L(`${KB.baht(bal)} left`, `เหลือ ${KB.baht(bal)}`)
            : L(`Spend envelope is empty · ${KB.baht(allBal)} left in total`, `ซองใช้หมดแล้ว · รวมทุกซองเหลือ ${KB.baht(allBal)}`)}</span></div>
        <div class="vl" style="color:var(--brand-amber-d)">${pctSpend === null ? "—" : pctSpend + "%"}</div>
      </div>
      <div class="r">
        <div class="ic-box" style="background:var(--c-fill-soft);color:var(--c-fill-ink)">${I("clock", 22)}</div>
        <div class="tx">${L("hours of your own work", "ชั่วโมงที่ต้องทำงานเอง")}<br>
          <span class="tiny" style="color:var(--c-ink-3)">${L(`you average ${KB.baht(KB.hourly())}/hr so far`, `เฉลี่ย ${KB.baht(KB.hourly())}/ชม. จากงานที่ผ่านมา`)}</span></div>
        <div class="vl" style="color:var(--c-fill-ink)">${hrs.toFixed(1)}<span style="font-size:15px"> ${L("hr", "ชม.")}</span></div>
      </div>
      <div class="r">
        <div class="ic-box">${I("calendar", 22)}</div>
        <div class="tx">${L("of one day of living", "ของค่าใช้จ่าย 1 วัน")}<br>
          <span class="tiny" style="color:var(--c-ink-3)">${L(`${KB.baht(KB.dailyCost())} a day`, `วันละ ${KB.baht(KB.dailyCost())}`)}</span></div>
        <div class="vl" style="color:var(--c-ink)">${pctDay}%</div>
      </div>
    </div>
    ${bal === 0 ? `<div class="warnfree">${L(
      "Your Spend envelope is empty right now, so this would come out of another one. Worth a look at which — and what that does to next week.",
      "ตอนนี้ซองใช้หมดพอดี ถ้าซื้อจะต้องดึงจากซองอื่น ลองดูว่าจะดึงจากไหน แล้วสัปดาห์หน้าจะเป็นยังไง")}</div>` : ""}
    <div class="twin">
      <button class="btn" data-pick="buy">${L("Buy it", "ซื้อเลย")}<small>${L("I've decided", "ตัดสินใจแล้ว")}</small></button>
      <button class="btn" data-pick="skip">${L("Not yet", "ยังไม่ซื้อ")}<small>${L("maybe later", "ไว้ก่อน")}</small></button>
    </div>
    <div class="evenly">${I("hand", 16)}<span>${L(
      "Both count the same — what matters is that you looked first",
      "ทั้งสองปุ่มนับเท่ากัน — สิ่งที่สำคัญคือได้ดูตัวเลขก่อนตัดสินใจ")}</span></div>`;
  }

  /* --- ขั้น 3: ยืนยันผล --- */
  const bought = ctx.pick === "buy";
  return `
  <div class="s2done">
    <div class="em">${I("hand", 58)}</div>
    <h3>${L("You looked first", "ได้ดูก่อนตัดสินใจแล้ว")}</h3>
    <div class="st">${I("flame", 17)} ${L(`Pause #${KB.s.pause.stopped} · ${KB.pauseRate()}% of the time`,
                           `ครั้งที่ ${KB.s.pause.stopped} · คิดก่อนซื้อ ${KB.pauseRate()}%`)}</div>
    <p>${bought
      ? L(`Buying it is completely fine — what counts is that you knew the real price first.<br>This one was ${(ctx.amt / KB.hourly()).toFixed(1)} hours of your work.`,
          `ซื้อก็ไม่เป็นไรเลย สิ่งที่นับคือได้รู้ราคาจริงก่อนกด<br>ครั้งนี้ ${KB.baht(ctx.amt)} = ${(ctx.amt / KB.hourly()).toFixed(1)} ชั่วโมงของตัวเอง`)
      : L("Holding off is just as complete a decision.<br>If you still want it in three days, it'll still be there.",
          "เก็บไว้ก่อนก็เป็นการตัดสินใจที่สมบูรณ์เหมือนกัน<br>ถ้าอีก 3 วันยังอยากอยู่ ค่อยกลับมาก็ได้")}</p>
    <button class="btn ghost" data-close="1">${L("Back home", "กลับหน้าแรก")}</button>
  </div>`;
},

mount(el, ctx) {
  const st = ctx.step || (ctx.skipAsk ? "log" : "ask");
  const num = () => parseInt(el.querySelector("#amt")?.value || 0, 10) || 0;
  const txt = () => el.querySelector("#what")?.value.trim() || "";

  el.querySelectorAll("#quick .chip").forEach(c => c.onclick = () => {
    el.querySelector("#amt").value = c.dataset.p;
    el.querySelector("#what").value = c.dataset.w;
  });
  el.querySelectorAll("#envpick .chip, #nwpick .chip").forEach(c => c.onclick = () => {
    c.parentElement.querySelectorAll(".chip").forEach(x => x.classList.remove("on"));
    c.classList.add("on");
  });

  if (st === "ask") el.querySelector("#next").onclick = () => {
    if (!num()) return toast(L("Put a price in first", "ใส่ราคาก่อนนะ"));
    setSheet({ step: "show", amt: num(), what: txt() });
  };

  if (st === "show") el.querySelectorAll("[data-pick]").forEach(b => b.onclick = () => {
    const pick = b.dataset.pick;
    if (pick === "buy") KB.addExpense(ctx.amt, "want", "spend", true);
    else { KB.s.pause.stopped++; KB.save(); }
    setSheet({ ...ctx, step: "done", pick });
  });

  if (st === "log") el.querySelector("#save").onclick = () => {
    if (!num()) return toast(L("Put an amount in first", "ใส่จำนวนเงินก่อนนะ"));
    const env = el.querySelector("#envpick .chip.on").dataset.env;
    const nw  = el.querySelector("#nwpick .chip.on").dataset.nw;
    KB.addExpense(num(), nw, env, false);   // ไม่ได้หยุดดู → เข้า denominator
    closeSheet();
    toast(L(`Logged ${KB.baht(num())} · ${KB.baht(KB.envBal(KB.env("spend")))} left to spend`,
            `บันทึก ${KB.baht(num())} แล้ว · เหลือในซองใช้ ${KB.baht(KB.envBal(KB.env("spend")))}`));
  };
}
};
