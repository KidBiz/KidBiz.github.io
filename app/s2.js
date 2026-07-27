/* ============================================================
   S2 — "จะเกิดอะไรถ้าซื้ออันนี้?"  ⭐ โมเมนต์ลายเซ็นของแอป
   เป็นแบบฝึกหัด ไม่ใช่ด่าน · ทุกครั้งที่กดนับเป็น "ฝึกคิดสำเร็จ" เท่ากัน
   ⛔ ห้ามทำให้ปุ่มซื้อดูผิด · ⛔ ห้ามทำให้รู้สึกว่าต้องกดทุกครั้งที่ซื้อของ
   ============================================================ */

SCREENS.s2 = {
title: () => L("What happens if I buy this?", "จะเกิดอะไรถ้าซื้ออันนี้?"),
sheetTitle: c => c.skipAsk ? L("Log what I spent", "บันทึกเงินที่ใช้")
                           : L("What happens if I buy this?", "จะเกิดอะไรถ้าซื้ออันนี้?"),
notes: () => [
  [L("An exercise, not a gate", "แบบฝึกหัด ไม่ใช่ด่าน"), L("Nobody opens an app before every purchase, so this is not built as a checkpoint. Both buttons at the end count equally — we measure practising the thinking, not resisting the purchase.",
      "ไม่มีใครเปิดแอปก่อนซื้อของทุกครั้ง หน้านี้จึงไม่ได้ทำเป็นด่าน ปุ่มทั้งสองท้ายสุดนับเท่ากัน เพราะเราวัดการได้ฝึกคิด ไม่ได้วัดการอดใจไม่ซื้อ")],
  [L("Recurring is the real lesson", "ค่าใช้จ่ายต่อเนื่องคือบทเรียนจริง"), L("A one-off empties a pocket. A subscription raises the ceiling on what you cost, every day, forever — shown as the hole getting permanently deeper.",
      "ของชิ้นเดียวทำให้กระเป๋าพร่อง แต่ค่าบริการรายเดือนทำให้เพดานค่าใช้จ่ายของเราสูงขึ้นทุกวันไปตลอด แสดงให้เห็นเป็นหลุมที่ลึกลงถาวร")],
  [L("Third category", "ทางเลือกที่สาม"), L("'Could earn me money' sits beside need and want. It is the bridge to the business side of the programme — some spending is an investment.",
      "'มีโอกาสสร้างรายได้' วางคู่กับจำเป็นและไม่จำเป็น เป็นสะพานไปฝั่งธุรกิจของโปรแกรม — รายจ่ายบางอย่างคือการลงทุน")]
],

css: `
.q { font-size: var(--fs-lg); font-weight: 700; text-align: center; margin: 8px 0 18px; line-height: 1.4; }
.pricebox { text-align: center; margin-bottom: 18px; }
.pricebox .cur { font-size: 28px; font-weight: 700; color: var(--c-ink-3); vertical-align: super; }
.pricebox input { width: 200px; font-family: var(--font); font-size: 56px; font-weight: 700; letter-spacing: -2px;
  text-align: center; border: 0; border-bottom: 3px solid var(--c-line); background: none; color: var(--c-ink); padding: 4px 0; }
.pricebox input:focus { outline: 0; border-color: var(--c-pause); }

.catpick { display: grid; gap: 9px; }
.catbtn { display: flex; align-items: center; gap: 12px; text-align: left; font-family: var(--font);
  background: var(--c-surface); border: 1.5px solid var(--c-line); border-radius: var(--r-sm); padding: 14px; cursor: pointer; }
.catbtn.on { border-color: var(--c-fill); background: var(--c-fill-soft); }
.catbtn .ic { color: var(--c-ink-3); }
.catbtn.on .ic { color: var(--c-fill-ink); }
.catbtn b { display: block; font-size: var(--fs-md); font-weight: 700; }
.catbtn small { font-size: var(--fs-xs); color: var(--c-ink-3); line-height: 1.4; }

.cmp { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md); padding: 4px 17px; box-shadow: var(--shadow); margin-bottom: 14px; }
.cmp .r { display: flex; align-items: center; gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--c-line); }
.cmp .r:last-child { border: 0; }
.cmp .tx { flex: 1; font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.45; }
.cmp .vl { font-size: 27px; font-weight: 700; letter-spacing: -1px; font-variant-numeric: tabular-nums; }

/* --- ผลกระทบของค่าใช้จ่ายต่อเนื่อง: หลุมก่อน-หลัง --- */
.deeper { background: var(--c-ink); border-radius: var(--r-md); padding: 17px; margin-bottom: 14px; color: #fff; }
.deeper h4 { font-size: var(--fs-md); font-weight: 700; margin-bottom: 4px; }
.deeper p { font-size: var(--fs-xs); color: #A9A9B4; line-height: 1.55; margin-bottom: 14px; }
.holes { display: flex; align-items: flex-end; gap: 14px; }
.holes .h { flex: 1; text-align: center; }
.holes .pit { height: 92px; border-radius: 6px 6px 12px 12px; background: rgba(255,255,255,.09); position: relative; overflow: hidden; }
.holes .pit i { position: absolute; left: 0; right: 0; bottom: 0; background: var(--c-fill); display: block; transition: height .7s cubic-bezier(.2,.9,.25,1); }
.holes .lb { font-size: var(--fs-xs); font-weight: 700; margin-top: 8px; color: #C3C3CC; }
.holes .vv { font-size: 19px; font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }
.holes .arrow { color: var(--brand-amber); padding-bottom: 34px; }
.deeper .note { font-size: var(--fs-sm); color: var(--brand-amber); font-weight: 700; margin-top: 14px; line-height: 1.5; }

.twin { display: flex; gap: 11px; }
.twin .btn { flex: 1; padding: 20px 8px; font-size: var(--fs-md); background: var(--c-surface); color: var(--c-ink); border: 2px solid var(--c-ink); }
.twin .btn small { display: block; font-size: var(--fs-xs); font-weight: 500; color: var(--c-ink-3); margin-top: 4px; }
.evenly { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 17px;
  font-size: var(--fs-xs); color: var(--c-ink-2); line-height: 1.5; text-align: center; }

.s2done { text-align: center; padding: 26px 8px 8px; }
.s2done .em { color: var(--c-pause-ink); line-height: 0; }
.s2done h3 { font-size: 26px; font-weight: 700; margin: 12px 0 10px; }
.s2done p { font-size: var(--fs-md); color: var(--c-ink-2); line-height: 1.7; margin-bottom: 20px; }
.s2done .st { display: inline-flex; align-items: center; gap: 8px; background: var(--c-fill-soft); color: var(--c-fill-ink);
  font-weight: 700; font-size: var(--fs-sm); padding: 11px 18px; border-radius: var(--r-pill); margin-bottom: 22px; }
`,

render(ctx) {
  const st = ctx.step || (ctx.skipAsk ? "log" : "ask");
  const amt = ctx.amt || 0;

  /* --- โหมด "ใช้เงินไป" ธรรมดา --- */
  if (st === "log") return `
    <div class="q">${L("How much did you spend?", "ใช้เงินไปเท่าไหร่?")}</div>
    <div class="pricebox"><span class="cur">฿</span><input id="amt" type="number" inputmode="numeric" value="${amt || ""}"></div>
    <div class="field"><label class="fl">${L("On what?", "ซื้ออะไร")}</label>
      <input class="inp" id="what" placeholder="${L("e.g. bubble tea", "เช่น ชานมไข่มุก")}"></div>
    <div class="field"><label class="fl">${L("From which envelope?", "จ่ายจากซองไหน")}</label>
      <div class="chips" id="envpick">${KB.s.envelopes.map((e, i) =>
        `<button class="chip ${i === 2 ? "on" : ""}" data-env="${e.key}">${LT(e.name)}</button>`).join("")}</div>
    </div>
    <div class="field"><label class="fl">${L("Needed it, or wanted it?", "จำเป็น หรือ อยากได้")}</label>
      <div class="chips" id="nwpick">
        <button class="chip on" data-nw="need">${L("Needed", "จำเป็น")}</button>
        <button class="chip" data-nw="want">${L("Wanted", "อยากได้")}</button>
      </div>
    </div>
    <button class="btn" id="save">${L("Save", "บันทึก")}</button>`;

  /* --- ขั้น 1: ของ + ราคา + ประเภท + ต่อเนื่องไหม --- */
  if (st === "ask") return `
    <div class="q">${L("What are you looking at?", "กำลังอยากได้อะไรอยู่?")}</div>
    <div class="pricebox"><span class="cur">฿</span><input id="amt" type="number" inputmode="numeric" value="${amt || ""}"></div>
    <div class="field"><label class="fl">${L("What is it?", "ของที่อยากได้")}</label>
      <input class="inp" id="what" placeholder="${L("e.g. bluetooth headphones", "เช่น หูฟังบลูทูธ")}"></div>

    <div class="field"><label class="fl">${L("Which kind is it?", "เป็นของแบบไหน")}</label>
      <div class="catpick" id="cat">
        <button class="catbtn" data-cat="need">${I("bag", 22)}<span>
          <b>${L("I need it", "จำเป็น")}</b><small>${L("Life doesn't work without it", "ไม่มีไม่ได้จริงๆ")}</small></span></button>
        <button class="catbtn on" data-cat="want">${I("heart", 22)}<span>
          <b>${L("I want it", "ไม่จำเป็น แต่อยากได้")}</b><small>${L("Perfectly allowed — just worth seeing the price of", "อยากได้ก็ไม่ผิด แค่ควรได้เห็นราคาของมัน")}</small></span></button>
        <button class="catbtn" data-cat="earner">${I("lift", 22)}<span>
          <b>${L("It could earn me money", "มีโอกาสสร้างรายได้")}</b><small>${L("A tool, materials, something that pays back", "เครื่องมือ วัตถุดิบ ของที่คืนทุนได้")}</small></span></button>
      </div>
    </div>

    <div class="field"><label class="fl">${L("One-off, or does it keep charging?", "จ่ายครั้งเดียว หรือมีค่าใช้จ่ายต่อเนื่อง")}</label>
      <div class="chips" id="rec">
        <button class="chip on" data-rec="0">${L("One-off", "จ่ายครั้งเดียว")}</button>
        <button class="chip" data-rec="1">${L("Charges every month", "เก็บทุกเดือน")}</button>
      </div>
      <div id="recamt" style="display:none;margin-top:11px">
        <label class="fl">${L("How much per month?", "เดือนละเท่าไหร่")}</label>
        <input class="inp" id="recval" type="number" inputmode="numeric" placeholder="199">
      </div>
    </div>

    <button class="btn pause" id="next">${L("Show me what happens →", "ดูว่าจะเกิดอะไรขึ้น →")}</button>`;

  /* --- ขั้น 2: หน้าผลกระทบ --- */
  if (st === "show") {
    const allBal = KB.s.envelopes.reduce((a, e) => a + KB.envBal(e), 0);
    const pctMine = allBal ? Math.round(amt / allBal * 100) : null;
    const hrs = KB.hourly() ? (amt / KB.hourly()) : 0;
    const rec = ctx.recur || 0;
    const before = KB.dailyCost();
    const after = rec ? Math.round((KB.monthlyCost() + rec) / 30) : before;
    const covNow = KB.coverage();
    const covAfter = rec ? KB.pct(KB.incomeTotal(), after * KB.s.child.daysElapsed) : covNow;

    return `
    <div class="q">${KB.baht(amt)} <span class="muted" style="font-weight:500;font-size:var(--fs-md)">— ${ctx.what || L("this", "ของชิ้นนี้")}</span></div>
    <div class="cmp">
      <div class="r">
        <div class="ic-box" style="background:var(--brand-amber-soft);color:var(--brand-amber-d)">${I("cart", 22)}</div>
        <div class="tx">${L("of all the money you have right now", "ของเงินที่มีอยู่ตอนนี้ทั้งหมด")}<br>
          <span class="tiny" style="color:var(--c-ink-3)">${KB.baht(allBal)} ${L("across your envelopes", "รวมทุกซอง")}</span></div>
        <div class="vl" style="color:var(--brand-amber-d)">${pctMine === null ? "—" : pctMine + "%"}</div>
      </div>
      <div class="r">
        <div class="ic-box" style="background:var(--c-fill-soft);color:var(--c-fill-ink)">${I("clock", 22)}</div>
        <div class="tx">${L("hours of your own work", "ชั่วโมงที่ต้องทำงานเอง")}<br>
          <span class="tiny" style="color:var(--c-ink-3)">${L(`you average ${KB.baht(KB.hourly())}/hr`, `เฉลี่ย ${KB.baht(KB.hourly())}/ชม.`)}</span></div>
        <div class="vl" style="color:var(--c-fill-ink)">${hrs.toFixed(1)}<span style="font-size:15px"> ${L("hr", "ชม.")}</span></div>
      </div>
      <div class="r">
        <div class="ic-box">${I("calendarDays", 22)}</div>
        <div class="tx">${L(`days of the ${LT(KB.goalSmallItem().name).toLowerCase()} it could have paid`,
                            `วันของ${LT(KB.goalSmallItem().name)}ที่เงินก้อนนี้จ่ายได้`)}</div>
        <div class="vl">${Math.floor(amt / KB.goalSmallPerDay())}</div>
      </div>
    </div>

    ${rec ? `
    <div class="deeper">
      <h4>${I("repeat", 17)} ${L("This one keeps charging", "อันนี้เก็บเงินทุกเดือน")}</h4>
      <p>${L(`${KB.baht(rec)} a month is ${KB.baht(rec / 30)} a day added to what you cost — permanently, until you stop it.`,
              `เดือนละ ${KB.baht(rec)} = เพิ่มค่าใช้จ่ายวันละ ${KB.baht(rec / 30)} และจะค้างอยู่แบบนั้นจนกว่าจะเลิก`)}</p>
      <div class="holes">
        <div class="h">
          <div class="pit"><i style="height:${covNow}%"></i></div>
          <div class="lb">${L("now", "ตอนนี้")}</div><div class="vv">${covNow}%</div>
        </div>
        <div class="arrow">${I("arrowDown", 22)}</div>
        <div class="h">
          <div class="pit"><i style="height:${covAfter}%"></i></div>
          <div class="lb">${L("after", "หลังซื้อ")}</div><div class="vv">${covAfter}%</div>
        </div>
      </div>
      <div class="note">${L(`Your daily cost goes ${KB.baht(before)} → ${KB.baht(after)}. The hole gets deeper and stays deeper.`,
                            `ต้นทุนต่อวันจาก ${KB.baht(before)} → ${KB.baht(after)} หลุมลึกลงและค้างอยู่อย่างนั้น`)}</div>
    </div>` : ""}

    <div class="twin">
      <button class="btn" data-pick="bought">${L("Buying it", "ซื้อ")}<small>${L("or already did", "หรือซื้อไปแล้ว")}</small></button>
      <button class="btn" data-pick="skip">${L("Not buying", "ไม่ซื้อ")}<small>${L("not this time", "ไว้ก่อน")}</small></button>
    </div>
    <div class="evenly">${I("hand", 16)}<span>${L(
      "Both count the same — what matters is that you looked first",
      "ทั้งสองปุ่มนับเท่ากัน — สิ่งที่สำคัญคือได้ดูตัวเลขก่อนตัดสินใจ")}</span></div>`;
  }

  /* --- ขั้น 3: ยืนยันผล --- */
  const bought = ctx.pick === "bought";
  return `
  <div class="s2done">
    <div class="em">${I("hand", 58)}</div>
    <h3>${L("That's the thinking practised", "ได้ฝึกคิดแล้ว")}</h3>
    <div class="st">${I("flame", 17)} ${L(`${KB.practiceCount()} times practised so far`,
                                          `ฝึกคิดมาแล้ว ${KB.practiceCount()} ครั้ง`)}</div>
    <p>${bought
      ? (ctx.recur
          ? L(`Added to what you cost. You'll see it on the front screen every day now — that's the point.`,
              `เพิ่มเข้าค่าใช้จ่ายของหนูแล้ว จากนี้จะเห็นมันบนหน้าแรกทุกวัน — นั่นแหละคือประเด็น`)
          : L(`Buying it is completely fine. What counts is that you knew the real price first — ${(ctx.amt / KB.hourly()).toFixed(1)} hours of your own work.`,
              `ซื้อก็ไม่เป็นไรเลย สิ่งที่นับคือได้รู้ราคาจริงก่อน — ${(ctx.amt / KB.hourly()).toFixed(1)} ชั่วโมงของตัวเอง`))
      : L("Holding off is just as complete a decision.<br>If you still want it in three days, it'll still be there.",
          "ไม่ซื้อก็เป็นการตัดสินใจที่สมบูรณ์เหมือนกัน<br>ถ้าอีก 3 วันยังอยากอยู่ ค่อยกลับมาก็ได้")}</p>
    <button class="btn ghost" data-close="1">${L("Back home", "กลับหน้าแรก")}</button>
  </div>`;
},

mount(el, ctx) {
  const st = ctx.step || (ctx.skipAsk ? "log" : "ask");
  const num = id => parseInt(el.querySelector(id)?.value || 0, 10) || 0;

  const pickOne = sel => el.querySelectorAll(sel).forEach(c => c.onclick = () => {
    c.parentElement.querySelectorAll(sel.split(" ").pop()).forEach(x => x.classList.remove("on"));
    c.classList.add("on");
    if (c.dataset.rec !== undefined) el.querySelector("#recamt").style.display = c.dataset.rec === "1" ? "block" : "none";
  });
  pickOne("#cat .catbtn"); pickOne("#rec .chip");
  pickOne("#envpick .chip"); pickOne("#nwpick .chip");

  if (st === "ask") el.querySelector("#next").onclick = () => {
    if (!num("#amt")) return toast(L("Put a price in first", "ใส่ราคาก่อนนะ"));
    const isRec = el.querySelector("#rec .chip.on").dataset.rec === "1";
    setSheet({ step: "show", amt: num("#amt"),
               what: el.querySelector("#what").value.trim(),
               cat: el.querySelector("#cat .catbtn.on").dataset.cat,
               recur: isRec ? (num("#recval") || num("#amt")) : 0 });
  };

  if (st === "show") el.querySelectorAll("[data-pick]").forEach(b => b.onclick = () => {
    const pick = b.dataset.pick;
    KB.addIntent(ctx.amt, ctx.cat, ctx.recur, pick, ctx.what || "—", ctx.mode);
    if (pick === "bought" && !ctx.recur) KB.addExpense(ctx.amt, ctx.cat === "need" ? "need" : "want", "spend");
    setSheet({ ...ctx, step: "done", pick });
  });

  if (st === "log") el.querySelector("#save").onclick = () => {
    if (!num("#amt")) return toast(L("Put an amount in first", "ใส่จำนวนเงินก่อนนะ"));
    KB.addExpense(num("#amt"), el.querySelector("#nwpick .chip.on").dataset.nw,
                  el.querySelector("#envpick .chip.on").dataset.env);
    closeSheet();
    toast(L(`Logged ${KB.baht(num("#amt"))}`, `บันทึก ${KB.baht(num("#amt"))} แล้ว`));
  };
}
};
