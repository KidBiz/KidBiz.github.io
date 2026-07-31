/* ============================================================
   S2b — เงินกู้จำลอง (F16)  ⭐ กลไกหัวใจของ Day 2
   จำลองล้วนๆ ไม่มีเงินจริง ไม่มีการกู้จากพ่อแม่
   ⛔ ห้ามทำให้การกู้ดูเป็น "ความผิด" — ให้เป็นการทดลองที่เห็นผลด้วยตัวเอง
   ============================================================ */

SCREENS.s2b = {
title: () => L("Borrow (simulated)", "ขอกู้เงิน (จำลอง)"),
notes: () => [
  [L("No real money", "ไม่มีเงินจริง"), L("Nothing here touches an actual account and nobody borrows from a parent. It is a sandbox for one specific feeling: money now, weight later.",
      "ไม่มีอะไรในนี้แตะบัญชีจริง และไม่ได้กู้จากพ่อแม่ เป็นสนามทดลองสำหรับความรู้สึกเดียว — ได้เงินตอนนี้ แบกทีหลัง")],
  [L("Shown, not explained", "แสดงให้เห็น ไม่ใช่อธิบาย"), L("Interest as a formula changes nothing. Watching your own daily cost rise the moment you accept, and stay risen every day after, is the lesson.",
      "ดอกเบี้ยในรูปสูตรไม่เปลี่ยนอะไร แต่การเห็นต้นทุนรายวันของตัวเองสูงขึ้นทันทีที่กดรับ แล้วค้างอยู่ทุกวันหลังจากนั้น คือบทเรียน")],
  [L("A way out", "ทางออกต้องมี"), L("Paying off early is always available and shows the jar shrinking back down. Borrowing is never framed as a mistake — only as a decision with a visible price.",
      "ปิดหนี้ก่อนกำหนดได้เสมอ และจะเห็นโหลเล็กกลับลงมา การกู้ไม่เคยถูกวางเป็นความผิด เป็นแค่การตัดสินใจที่มีราคาให้เห็น")]
],

css: `
.loanpick { display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; margin-bottom: 6px; }
.loanpick button { font-family: var(--font); font-size: var(--fs-md); font-weight: 700; padding: 16px 6px;
  border: 1.5px solid var(--c-line); background: var(--c-surface); border-radius: var(--r-sm); cursor: pointer; color: var(--c-ink); }
.loanpick button.on { border-color: var(--c-pause); background: var(--brand-amber-soft); color: var(--brand-amber-d); }

.preview { background: var(--c-ink); border-radius: var(--r-md); padding: 18px; color: #fff; margin: 16px 0 14px; }
.preview .ttl { font-size: var(--fs-sm); font-weight: 700; color: #A9A9B4; margin-bottom: 14px; }
.preview .line { display: flex; align-items: baseline; gap: 10px; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,.1); }
.preview .line:last-of-type { border: 0; }
.preview .line span { flex: 1; font-size: var(--fs-sm); color: #C3C3CC; }
.preview .line b { font-size: var(--fs-md); font-variant-numeric: tabular-nums; }
.preview .good b { color: #4FD9EC; }
.preview .cost b { color: var(--brand-amber); }
/* โหลก่อน-หลังกู้ · เหมือน .s2jars แต่คนละไฟล์จึงต้องคนละชื่อคลาส (ดู README) */
.s2bjars { display: flex; align-items: flex-end; gap: 14px; margin-top: 16px; }
.s2bjars .h { flex: 1; text-align: center; }
.s2bjars .rim { height: 3px; border-radius: 2px; background: rgba(255,255,255,.32); margin: 0 16% 3px; }
.s2bjars .jar { border-radius: 5px 5px 13px 13px; background: rgba(255,255,255,.07);
  border: 1.5px solid rgba(255,255,255,.24); position: relative; overflow: hidden; transition: height .5s ease; }
.s2bjars .jar i { position: absolute; left: 0; right: 0; bottom: 0; background: var(--c-fill); display: block; }
.s2bjars .lb { font-size: var(--fs-xs); font-weight: 700; margin-top: 8px; color: #C3C3CC; }
.s2bjars .vv { font-size: 19px; font-weight: 700; font-variant-numeric: tabular-nums; }
.s2bjars .arrow { color: var(--brand-amber); padding-bottom: 32px; transform: rotate(-90deg); }

.debt { background: var(--brand-amber-soft); border-radius: var(--r-md); padding: 16px; margin-bottom: 12px; }
.debt .hd { display: flex; align-items: baseline; gap: 9px; margin-bottom: 10px; }
.debt .hd b { font-size: 21px; font-weight: 700; color: var(--brand-amber-d); font-variant-numeric: tabular-nums; }
.debt .hd span { font-size: var(--fs-sm); color: var(--brand-amber-d); font-weight: 600; }
.debt .meta { font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.6; margin-bottom: 13px; }

.taken { text-align: center; padding: 22px 8px 4px; }
.taken .em { color: var(--brand-amber-d); line-height: 0; }
.taken h3 { font-size: 26px; font-weight: 700; margin: 12px 0 10px; }
.taken p { font-size: var(--fs-md); color: var(--c-ink-2); line-height: 1.7; margin-bottom: 16px; }
.takennote { font-size: var(--fs-sm); color: var(--brand-amber); font-weight: 700; line-height: 1.55; margin-top: 16px; }

/* ช่องดอกเบี้ย · พิมพ์เองได้ เพราะตัวเลขนี้คือสิ่งที่ต้องรู้สึกว่าเปลี่ยนแล้วเจ็บแค่ไหน */
.ratebox { display: flex; align-items: center; gap: 10px; }
.ratebox .inp { width: 108px; font-size: 25px; font-weight: 700; text-align: center;
  font-variant-numeric: tabular-nums; padding: 10px 8px; }
.ratebox .unit { font-size: var(--fs-md); font-weight: 700; color: var(--c-ink-2); }
.ratehint { display: flex; gap: 8px; align-items: flex-start; margin-top: 10px;
  font-size: var(--fs-xs); color: var(--c-ink-3); line-height: 1.6; }
`,

render(ctx) {
  const active = KB.activeLoans();

  /* --- หลังกดกู้ · ต้องเห็นโหลใหญ่ขึ้นทันที ไม่ใช่แค่อ่านว่ามันใหญ่ขึ้น --- */
  if (ctx.step === "taken") {
    const tBefore = ctx.before, tAfter = KB.dailyCost();
    const tJarNow = 78;
    const tJarAfter = tBefore ? Math.min(114, Math.round(tJarNow * tAfter / tBefore)) : tJarNow;
    const tCovNow = ctx.covBefore;
    const tCovAfter = KB.coverage();
    return `
    <div class="taken">
      <div class="em">${I("loan", 54)}</div>
      <h3>+${KB.baht(ctx.amt)}</h3>
      <p>${L(`It's in your pocket right now. From this month on, ${KB.baht(ctx.perMonth)} goes back out every month for ${ctx.months} months.`,
              `เงินอยู่ในกระเป๋าแล้วตอนนี้ ตั้งแต่เดือนนี้เป็นต้นไป ต้องคืนเดือนละ ${KB.baht(ctx.perMonth)} เป็นเวลา ${ctx.months} เดือน`)}</p>
    </div>
    <div class="preview">
      <div class="ttl">${L("Your jar just got bigger", "โหลค่าใช้จ่ายเพิ่งใหญ่ขึ้น")}</div>
      <div class="line cost"><span>${L("Your cost per day", "ต้นทุนต่อวันของหนู")}</span><b>${KB.baht(tBefore)} → ${KB.baht(tAfter)}</b></div>
      <div class="s2bjars">
        <div class="h"><div class="rim"></div><div class="jar" style="height:${tJarNow}px"><i style="height:${tCovNow}%"></i></div>
          <div class="lb">${L("before", "ก่อนกู้")}</div><div class="vv">${tCovNow}%</div></div>
        <div class="arrow">${I("arrowDown", 22)}</div>
        <div class="h"><div class="rim"></div><div class="jar" style="height:${tJarAfter}px"><i style="height:${tCovAfter}%"></i></div>
          <div class="lb">${L("now", "ตอนนี้")}</div><div class="vv" style="color:var(--brand-amber)">${tCovAfter}%</div></div>
      </div>
      <div class="takennote">${L(
        `The money you earn has not changed. The jar it has to fill is ${KB.baht(tAfter - tBefore)} a day bigger, and stays that way until the loan is cleared.`,
        `เงินที่หาได้เท่าเดิม แต่โหลที่ต้องเติมใหญ่ขึ้นวันละ ${KB.baht(tAfter - tBefore)} และจะค้างอยู่แบบนั้นจนกว่าจะปิดหนี้`)}</div>
    </div>
    <button class="btn ghost" data-close="1" style="width:100%">${L("Go and look at the jar", "ไปดูโหลกัน")}</button>`;
  }

  /* --- มีหนี้อยู่ --- */
  const activeBlock = active.length ? `
    <div class="card-t" style="font-size:var(--fs-md);margin-bottom:11px">${I("repeat", 18)} ${L("What you're carrying", "ที่แบกอยู่ตอนนี้")}</div>
    ${active.map(l => `
      <div class="debt">
        <div class="hd"><b>${KB.baht(l.left)}</b><span>${L("left to repay", "ยอดคงเหลือ")}</span></div>
        <div class="meta">${L(`${KB.baht(l.perMonth)} a month for ${l.months} months · ${l.rate}% a year, ${KB.baht(l.interest)} of it interest · adds ${KB.baht(l.perMonth / 30)} to every single day`,
                              `เดือนละ ${KB.baht(l.perMonth)} เป็นเวลา ${l.months} เดือน · ดอกเบี้ย ${l.rate}% ต่อปี คิดเป็น ${KB.baht(l.interest)} · เพิ่มค่าใช้จ่ายวันละ ${KB.baht(l.perMonth / 30)}`)}</div>
        <button class="btn sm ghost" style="width:100%;border-radius:var(--r-md)" data-close-loan="${l.id}">
          ${L("Pay it off early", "ปิดหนี้ก่อนกำหนด")}</button>
      </div>`).join("")}` : "";

  /* --- ฟอร์มกู้ --- */
  const amt = ctx.amt || KB.s.loanAmounts[1], months = ctx.months || KB.s.loanMonths[1];
  const rate = ctx.rate === undefined ? KB.s.loanRate : ctx.rate;
  const interest = KB.loanInterest(amt, months, rate);
  const total = KB.loanTotal(amt, months, rate);
  const perMonth = KB.loanPerMonth(amt, months, rate);
  const before = KB.dailyCost(), after = KB.previewDailyCost(perMonth);
  const covNow = KB.coverage();
  /* ฐานเดียวกับ KB.coverage() — ยอดผ่อนต่อเดือนบวกเข้าค่าใช้จ่ายของเดือนตรงๆ */
  const covAfter = Math.min(100, KB.pct(KB.monthIncome(), KB.monthCost() + perMonth));
  /* กู้ = โหลใหญ่ขึ้นตามต้นทุน/วันที่เพิ่ม · ตัดที่ 114px กันทะลุการ์ดตอนกู้ก้อนใหญ่ผ่อนสั้น */
  const jarNow = 78;
  const jarAfter = before ? Math.min(114, Math.round(jarNow * after / before)) : jarNow;

  return `
  ${activeBlock}
  <div class="card-t" style="font-size:var(--fs-md);margin-bottom:11px">${I("loan", 18)} ${L("Try borrowing", "ลองกู้ดู")}</div>
  <div class="field">
    <label class="fl">${L("How much do you want now?", "อยากได้เท่าไหร่ตอนนี้")}</label>
    <div class="loanpick" id="amtpick">
      ${KB.s.loanAmounts.map(v => `<button class="${v === amt ? "on" : ""}" data-amt="${v}">${KB.baht(v)}</button>`).join("")}
    </div>
  </div>
  <div class="field">
    <label class="fl">${L("Paid back over how many months?", "ผ่อนคืนกี่เดือน")}</label>
    <div class="loanpick" id="mopick">
      ${KB.s.loanMonths.map(v => `<button class="${v === months ? "on" : ""}" data-mo="${v}">${v} ${L("mo", "เดือน")}</button>`).join("")}
    </div>
  </div>
  <div class="field">
    <label class="fl" for="rate">${L("Interest rate they charge you", "ดอกเบี้ยที่เขาคิดกับเรา")}</label>
    <div class="ratebox">
      <input class="inp" id="rate" type="number" inputmode="decimal" min="0" max="400" step="1" value="${rate}">
      <span class="unit">${L("% per year", "% ต่อปี")}</span>
    </div>
    <div class="ratehint">${I("bulb", 15)} ${L(
      "Real ones in Thailand: a cash card is about 25%, nano-finance 33%, pico-finance 36%. Lending outside the system is quoted per month — 20% a month is 240% a year. Type any number in and watch what it does.",
      "ของจริงในไทย: บัตรกดเงินสด ~25% · นาโนไฟแนนซ์ 33% · พิโกไฟแนนซ์ 36% ส่วนหนี้นอกระบบคิดเป็นต่อเดือน — ร้อยละ 20 ต่อเดือน = 240% ต่อปี ลองพิมพ์เลขอะไรก็ได้แล้วดูว่าเกิดอะไรขึ้น")}</div>
  </div>

  <div class="preview">
    <div class="ttl">${L("Before you decide — here's what changes", "ก่อนตัดสินใจ นี่คือสิ่งที่จะเปลี่ยน")}</div>
    <div class="line good"><span>${L("In your pocket, today", "เข้ากระเป๋าวันนี้")}</span><b>+${KB.baht(amt)}</b></div>
    <div class="line cost"><span>${L(`Interest, for ${months} months`, `ดอกเบี้ย ${months} เดือน`)}</span><b>+${KB.baht(interest)}</b></div>
    <div class="line cost"><span>${L("So you pay back, in total", "รวมที่ต้องคืนทั้งหมด")}</span><b>${KB.baht(total)}</b></div>
    <div class="line cost"><span>${L("Back out, every month", "คืนเดือนละ")}</span><b>−${KB.baht(perMonth)}</b></div>
    <div class="line cost"><span>${L("Your cost per day", "ต้นทุนต่อวันของหนู")}</span><b>${KB.baht(before)} → ${KB.baht(after)}</b></div>
    <div class="s2bjars">
      <div class="h"><div class="rim"></div><div class="jar" style="height:${jarNow}px"><i style="height:${covNow}%"></i></div>
        <div class="lb">${L("now", "ตอนนี้")}</div><div class="vv">${covNow}%</div></div>
      <div class="arrow">${I("arrowDown", 22)}</div>
      <div class="h"><div class="rim"></div><div class="jar" style="height:${jarAfter}px"><i style="height:${covAfter}%"></i></div>
        <div class="lb">${L("after borrowing", "หลังกู้")}</div><div class="vv" style="color:var(--brand-amber)">${covAfter}%</div></div>
    </div>
  </div>

  <button class="btn pause" id="take">${L(`Take ${KB.baht(amt)} now`, `รับ ${KB.baht(amt)} เลย`)}</button>
  <div class="tiny muted" style="text-align:center;margin-top:12px">${L(
    "Simulated only — no real money moves, and you can pay it off whenever you like.",
    "จำลองล้วนๆ ไม่มีเงินจริงเคลื่อนไหว และปิดหนี้เมื่อไหร่ก็ได้")}</div>`;
},

mount(el, ctx) {
  el.querySelectorAll("#amtpick button").forEach(b => b.onclick = () => setSheet({ ...ctx, amt: +b.dataset.amt }));
  el.querySelectorAll("#mopick button").forEach(b => b.onclick = () => setSheet({ ...ctx, months: +b.dataset.mo }));

  /* พิมพ์แล้วคำนวณใหม่ทันทีโดยไม่เสียโฟกัส — ทั้งหน้านี้มีไว้ให้ลองเปลี่ยนตัวเลขเล่น
     ถ้าต้องกดออกจากช่องก่อนถึงจะเห็นผล ความรู้สึก "ดอกเบี้ยทำแบบนี้เอง" จะหายไป */
  const rateBox = el.querySelector("#rate");
  if (rateBox) rateBox.oninput = () => {
    const v = rateBox.value === "" ? 0 : Math.max(0, +rateBox.value);
    setSheet({ ...ctx, rate: v, focus: "rate", caret: rateBox.selectionStart });
  };
  if (rateBox && ctx.focus === "rate") {
    rateBox.focus();
    const p = ctx.caret ?? rateBox.value.length;
    rateBox.setSelectionRange(p, p);
  }

  el.querySelectorAll("[data-close-loan]").forEach(b => b.onclick = () => {
    KB.closeLoan(b.dataset.closeLoan);
    setSheet({ ...ctx });
    toast(L(`Paid off · your daily cost is back to ${KB.baht(KB.dailyCost())}`,
            `ปิดหนี้แล้ว · ต้นทุนต่อวันกลับมาที่ ${KB.baht(KB.dailyCost())}`));
  });

  const take = el.querySelector("#take");
  if (take) take.onclick = () => {
    const amt = ctx.amt || KB.s.loanAmounts[1], months = ctx.months || KB.s.loanMonths[1];
    const rate = ctx.rate === undefined ? KB.s.loanRate : ctx.rate;
    /* เก็บค่าก่อนกู้ไว้ก่อนเรียก takeLoan — หลังจากนั้น dailyCost/coverage เปลี่ยนไปแล้ว */
    const before = KB.dailyCost(), covBefore = KB.coverage();
    KB.takeLoan(amt, months, rate);
    setSheet({ step: "taken", amt, months, rate, before, covBefore,
               perMonth: KB.loanPerMonth(amt, months, rate) });
  };
}
};
