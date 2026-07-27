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
  [L("A way out", "ทางออกต้องมี"), L("Paying off early is always available and shows the hole coming back up. Borrowing is never framed as a mistake — only as a decision with a visible price.",
      "ปิดหนี้ก่อนกำหนดได้เสมอ และจะเห็นหลุมตื้นกลับ การกู้ไม่เคยถูกวางเป็นความผิด เป็นแค่การตัดสินใจที่มีราคาให้เห็น")]
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
.holes2 { display: flex; align-items: flex-end; gap: 14px; margin-top: 16px; }
.holes2 .h { flex: 1; text-align: center; }
.holes2 .pit { height: 88px; border-radius: 6px 6px 12px 12px; background: rgba(255,255,255,.09); position: relative; overflow: hidden; }
.holes2 .pit i { position: absolute; left: 0; right: 0; bottom: 0; background: var(--c-fill); display: block; }
.holes2 .lb { font-size: var(--fs-xs); font-weight: 700; margin-top: 8px; color: #C3C3CC; }
.holes2 .vv { font-size: 19px; font-weight: 700; font-variant-numeric: tabular-nums; }
.holes2 .arrow { color: var(--brand-amber); padding-bottom: 32px; }

.debt { background: var(--brand-amber-soft); border-radius: var(--r-md); padding: 16px; margin-bottom: 12px; }
.debt .hd { display: flex; align-items: baseline; gap: 9px; margin-bottom: 10px; }
.debt .hd b { font-size: 21px; font-weight: 700; color: var(--brand-amber-d); font-variant-numeric: tabular-nums; }
.debt .hd span { font-size: var(--fs-sm); color: var(--brand-amber-d); font-weight: 600; }
.debt .meta { font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.6; margin-bottom: 13px; }

.taken { text-align: center; padding: 22px 8px 8px; }
.taken .em { color: var(--brand-amber-d); line-height: 0; }
.taken h3 { font-size: 26px; font-weight: 700; margin: 12px 0 10px; }
.taken p { font-size: var(--fs-md); color: var(--c-ink-2); line-height: 1.7; margin-bottom: 20px; }
`,

render(ctx) {
  const active = KB.activeLoans();

  /* --- หลังกดกู้ --- */
  if (ctx.step === "taken") return `
    <div class="taken">
      <div class="em">${I("loan", 54)}</div>
      <h3>+${KB.baht(ctx.amt)}</h3>
      <p>${L(`It's in your pocket right now. From this week on, ${KB.baht(ctx.perWeek)} a week goes back out — and that is already on your front screen as a bigger daily cost.`,
              `เงินอยู่ในกระเป๋าแล้วตอนนี้ ตั้งแต่สัปดาห์นี้เป็นต้นไป จะต้องคืนสัปดาห์ละ ${KB.baht(ctx.perWeek)} — และมันขึ้นบนหน้าแรกเป็นต้นทุนรายวันที่สูงขึ้นเรียบร้อยแล้ว`)}</p>
      <button class="btn ghost" data-close="1">${L("Go and look at the hole", "ไปดูหลุมกัน")}</button>
    </div>`;

  /* --- มีหนี้อยู่ --- */
  const activeBlock = active.length ? `
    <div class="card-t" style="font-size:var(--fs-md);margin-bottom:11px">${I("repeat", 18)} ${L("What you're carrying", "ที่แบกอยู่ตอนนี้")}</div>
    ${active.map(l => `
      <div class="debt">
        <div class="hd"><b>${KB.baht(l.left)}</b><span>${L("left to repay", "ยอดคงเหลือ")}</span></div>
        <div class="meta">${L(`${KB.baht(l.perWeek)} a week · borrowed in week ${l.takenWeek} · adds ${KB.baht(l.perWeek * 52 / 12 / 30)} to every single day`,
                              `สัปดาห์ละ ${KB.baht(l.perWeek)} · กู้ตอนสัปดาห์ที่ ${l.takenWeek} · เพิ่มค่าใช้จ่ายวันละ ${KB.baht(l.perWeek * 52 / 12 / 30)}`)}</div>
        <button class="btn sm ghost" style="width:100%;border-radius:var(--r-md)" data-close-loan="${l.id}">
          ${L("Pay it off early", "ปิดหนี้ก่อนกำหนด")}</button>
      </div>`).join("")}` : "";

  /* --- ฟอร์มกู้ --- */
  const amt = ctx.amt || 1000, weeks = ctx.weeks || 10;
  const perWeek = Math.round(amt / weeks);
  const before = KB.dailyCost(), after = KB.previewDailyCost(perWeek);
  const covNow = KB.coverage();
  const covAfter = KB.pct(KB.incomeTotal(), after * KB.s.child.daysElapsed);

  return `
  ${activeBlock}
  <div class="card-t" style="font-size:var(--fs-md);margin-bottom:11px">${I("loan", 18)} ${L("Try borrowing", "ลองกู้ดู")}</div>
  <div class="field">
    <label class="fl">${L("How much do you want now?", "อยากได้เท่าไหร่ตอนนี้")}</label>
    <div class="loanpick" id="amtpick">
      ${[500, 1000, 2000].map(v => `<button class="${v === amt ? "on" : ""}" data-amt="${v}">${KB.baht(v)}</button>`).join("")}
    </div>
  </div>
  <div class="field">
    <label class="fl">${L("Paid back over how long?", "ผ่อนคืนกี่สัปดาห์")}</label>
    <div class="loanpick" id="wkpick">
      ${[5, 10, 20].map(v => `<button class="${v === weeks ? "on" : ""}" data-wk="${v}">${v} ${L("wks", "สัปดาห์")}</button>`).join("")}
    </div>
  </div>

  <div class="preview">
    <div class="ttl">${L("Before you decide — here's what changes", "ก่อนตัดสินใจ นี่คือสิ่งที่จะเปลี่ยน")}</div>
    <div class="line good"><span>${L("In your pocket, today", "เข้ากระเป๋าวันนี้")}</span><b>+${KB.baht(amt)}</b></div>
    <div class="line cost"><span>${L("Back out, every week", "คืนทุกสัปดาห์")}</span><b>−${KB.baht(perWeek)}</b></div>
    <div class="line cost"><span>${L("Your cost per day", "ต้นทุนต่อวันของหนู")}</span><b>${KB.baht(before)} → ${KB.baht(after)}</b></div>
    <div class="holes2">
      <div class="h"><div class="pit"><i style="height:${covNow}%"></i></div>
        <div class="lb">${L("now", "ตอนนี้")}</div><div class="vv">${covNow}%</div></div>
      <div class="arrow">${I("arrowDown", 22)}</div>
      <div class="h"><div class="pit"><i style="height:${covAfter}%"></i></div>
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
  el.querySelectorAll("#wkpick button").forEach(b => b.onclick = () => setSheet({ ...ctx, weeks: +b.dataset.wk }));

  el.querySelectorAll("[data-close-loan]").forEach(b => b.onclick = () => {
    KB.closeLoan(b.dataset.closeLoan);
    setSheet({ ...ctx });
    toast(L(`Paid off · your daily cost is back to ${KB.baht(KB.dailyCost())}`,
            `ปิดหนี้แล้ว · ต้นทุนต่อวันกลับมาที่ ${KB.baht(KB.dailyCost())}`));
  });

  const take = el.querySelector("#take");
  if (take) take.onclick = () => {
    const amt = ctx.amt || 1000, weeks = ctx.weeks || 10;
    KB.takeLoan(amt, weeks);
    setSheet({ step: "taken", amt, perWeek: Math.round(amt / weeks) });
  };
}
};
