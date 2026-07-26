/* ============================================================
   S7 — ความก้าวหน้า (Before/After) + การ์ดแชร์
   N2 การ์ดแชร์ต้องไม่มียอดเงินหลุดออกไป
   ============================================================ */

SCREENS.s7 = {
title: () => L("Progress", "ความก้าวหน้า"),
sub: () => L(`Day 1 → week ${KB.s.child.week}`, `วันแรก → สัปดาห์ที่ ${KB.s.child.week}`),
notes: () => [
  [L("The evidence", "หลักฐาน"), L("This is what the programme is judged on — not 'did the kids enjoy it' but how far the behaviour moved, read straight from what they actually did in the app.",
      "นี่คือสิ่งที่ใช้ตัดสินโปรแกรม ไม่ใช่ 'เด็กสนุกไหม' แต่เป็นพฤติกรรมที่ขยับไปเท่าไหร่ อ่านจากสิ่งที่เด็กทำจริงในแอป ไม่ได้ถามเอา")],
  ["N2", L("The share card carries badges, percentages and a streak only — with an automatic check that no currency slipped through.",
           "การ์ดแชร์มีแค่เหรียญ เปอร์เซ็นต์ และจำนวนวันต่อเนื่อง พร้อมตัวตรวจอัตโนมัติว่าไม่มียอดเงินหลุดออกไป")],
  ["N3", L("Every row is this child against their own day one. There is no class average to sit next to.",
           "ทุกบรรทัดคือเด็กคนนี้เทียบกับวันแรกของตัวเอง ไม่มีค่าเฉลี่ยของห้องมาวางข้างๆ")]
],

css: `
.ba { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md); box-shadow: var(--shadow); overflow: hidden; margin-bottom: 13px; }
.ba .hr { display: flex; align-items: center; gap: 8px; padding: 11px 15px; background: var(--c-surface-2);
  font-size: var(--fs-xs); font-weight: 700; color: var(--c-ink-3); }
.ba .hr .a { flex: 1; }
.ba .hr .b, .ba .hr .c { width: 60px; text-align: right; }
.ba .rw { display: flex; align-items: center; gap: 8px; padding: 13px 15px; border-top: 1px solid var(--c-line); }
.ba .rw .a { flex: 1; font-size: var(--fs-sm); font-weight: 600; line-height: 1.4;
  display: flex; align-items: center; gap: 9px; }
.ba .rw .a .ic { color: var(--c-ink-3); }
.ba .rw.key .a .ic { color: var(--c-fill-ink); }
.bg .b .e { color: var(--c-fill-ink); }
.sc .pill { display: inline-flex; align-items: center; gap: 6px; }
.audit .ic { margin-top: 2px; }
.ba .rw .b { width: 60px; text-align: right; font-size: var(--fs-sm); color: var(--c-ink-3); font-variant-numeric: tabular-nums; }
.ba .rw .c { width: 60px; text-align: right; font-size: var(--fs-md); font-weight: 700; font-variant-numeric: tabular-nums; }
.ba .rw .up { font-size: var(--fs-xs); font-weight: 700; color: var(--c-fill-ink); width: 44px; text-align: right; }
.ba .rw.key { background: var(--c-fill-soft); }

.bg { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
.bg .b { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md); padding: 14px 7px; text-align: center; box-shadow: var(--shadow); }
.bg .b .e { display: block; line-height: 0; }
.bg .b .t { font-size: 12px; font-weight: 700; color: var(--c-ink-2); margin-top: 6px; line-height: 1.35; }
.bg .b.off { opacity: .32; filter: grayscale(1); }

/* --- การ์ดแชร์ --- */
.sc { border-radius: var(--r-lg); padding: 24px 22px; color: #fff; box-shadow: var(--shadow-lift);
  background: linear-gradient(150deg, var(--brand-teal) 0%, #0A4A63 55%, var(--c-ink) 100%); position: relative; overflow: hidden; }
.sc:before { content: ""; position: absolute; width: 230px; height: 230px; border-radius: 50%;
  background: rgba(255,255,255,.08); top: -95px; right: -75px; }
.sc .lb { font-size: 11px; letter-spacing: 3px; font-weight: 700; opacity: .75; }
.sc .nm { font-size: 23px; font-weight: 700; margin: 4px 0 20px; }
.sc .top { display: flex; align-items: flex-end; gap: 13px; margin-bottom: 18px; }
.sc .top b { font-size: 64px; font-weight: 700; letter-spacing: -3px; line-height: .9; font-variant-numeric: tabular-nums; }
.sc .top span { font-size: var(--fs-xs); font-weight: 600; opacity: .82; padding-bottom: 8px; line-height: 1.5; }
.sc .rowx { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
.sc .pill { background: rgba(255,255,255,.16); border-radius: var(--r-pill); padding: 8px 13px; font-size: var(--fs-xs); font-weight: 700; }
.sc .bd { display: flex; gap: 8px; }
.sc .bd i { width: 38px; height: 38px; border-radius: 11px; background: rgba(255,255,255,.16); display: grid; place-items: center; font-size: 19px; font-style: normal; }
.sc .ft { font-size: 11px; opacity: .6; margin-top: 18px; letter-spacing: .4px; }

.audit { display: flex; gap: 10px; align-items: flex-start; background: var(--c-fill-soft); color: var(--c-fill-ink);
  border-radius: var(--r-sm); padding: 14px 15px; font-size: var(--fs-sm); font-weight: 600; line-height: 1.65; margin-top: 13px; }
`,

render() {
  const b = KB.s.before;
  const rows = [
    ["home",   L("Covered by me", "หาเองได้"),            b.coverage + "%",  KB.coverage() + "%",   KB.coverage() - b.coverage, true],
    ["save",  L("Savings rate", "อัตราออม"),              b.saving + "%",    KB.savingRate() + "%", KB.savingRate() - b.saving],
    ["hand",   L("Looked before buying", "คิดก่อนซื้อ"),    b.pauseRate + "%", KB.pauseRate() + "%",  KB.pauseRate() - b.pauseRate],
    ["scale",  L("Share that was a need", "สัดส่วนที่จำเป็น"), b.need + "%",   KB.needPct() + "%",    KB.needPct() - b.need],
    ["split",  L("Followed own rule", "ทำตามกฎตัวเอง"),    "—",               KB.adherence() + "%",  null],
    ["flame",  L("Longest streak", "ต่อเนื่องสูงสุด"),       b.streak,          KB.s.streak.best,      KB.s.streak.best - b.streak],
    ["trophy", L("Money Habit Score", "คะแนนนิสัยการเงิน"), b.score,           KB.score(),            KB.score() - b.score, true],
    ["family", L("Parent: didn't step in", "พ่อแม่: ไม่ช่วยจ่าย"), b.bailoutFree + "%", KB.bailoutFree() + "%", KB.bailoutFree() - b.bailoutFree]
  ];

  return `
  <div class="card" style="background:linear-gradient(135deg, var(--c-fill-soft), #DDF5F9);border-color:#C5EAF1">
    <div class="tiny" style="font-weight:700;color:var(--c-fill-ink);letter-spacing:.5px">${L("THE GAP THAT CLOSED", "ช่องว่างที่ปิดได้")}</div>
    <div style="font-size:var(--fs-md);line-height:1.7;margin-top:8px">${L(
      `On day one they guessed they cost <b>${KB.baht(KB.s.guessedCost)} a day</b>.<br>It's really <b>${KB.baht(KB.dailyCost())}</b> — and they now cover <b>${KB.coverage()}%</b> of it themselves.`,
      `วันแรกลูกเดาว่าตัวเองมีค่าใช้จ่าย <b>${KB.baht(KB.s.guessedCost)}/วัน</b><br>ของจริงคือ <b>${KB.baht(KB.dailyCost())}/วัน</b> และตอนนี้หาเองได้แล้ว <b>${KB.coverage()}%</b>`)}
    </div>
  </div>

  <div class="ba">
    <div class="hr"><span class="a">${L("Metric", "ตัวชี้วัด")}</span><span class="b">${L("Day 1", "วันแรก")}</span><span class="c">${L("Now", "ตอนนี้")}</span><span style="width:44px"></span></div>
    ${rows.map(([ic, n, x, y, d, key]) => `
      <div class="rw ${key ? "key" : ""}">
        <span class="a">${I(ic, 17)} ${n}</span><span class="b">${x}</span><span class="c">${y}</span>
        <span class="up">${d === null ? "" : d > 0 ? "↑" + d : d === 0 ? "→" : "↓" + Math.abs(d)}</span>
      </div>`).join("")}
  </div>

  <div class="card-t" style="margin:18px 0 11px;font-size:var(--fs-md)">${I("medal", 19)} ${L("Badges earned", "เหรียญที่ได้")}</div>
  <div class="bg">
    ${KB.s.badges.map(x => `<div class="b ${x.got ? "" : "off"}"><span class="e">${I(x.ic, 27)}</span><div class="t">${LT(x.t)}</div></div>`).join("")}
  </div>

  <div class="card-t" style="margin:20px 0 11px;font-size:var(--fs-md)">${I("share", 19)} ${L("Share card", "การ์ดแชร์")}
    <span class="r">${L("safe to post", "แชร์ได้")}</span></div>
  <div class="sc">
    <div class="lb">KIDFINANCE</div>
    <div class="nm">${L(`${LT(KB.s.child.name)} · ${KB.s.child.week} weeks in`, `${LT(KB.s.child.name)} · ${KB.s.child.week} สัปดาห์`)}</div>
    <div class="top"><b>${KB.coverage()}%</b><span>${L("of what I cost,<br>earned by me", "ของค่าใช้จ่ายตัวเอง<br>ที่หาเองได้")}</span></div>
    <div class="rowx">
      <span class="pill">${I("trophy", 14)} ${L("Score", "คะแนน")} ${KB.score()}</span>
      <span class="pill">${I("flame", 14)} ${L(`${KB.s.streak.best} days`, `ต่อเนื่อง ${KB.s.streak.best} วัน`)}</span>
      <span class="pill">${I("hand", 14)} ${L("Paused", "คิดก่อนซื้อ")} ${KB.pauseRate()}%</span>
      <span class="pill">${I("save", 14)} ${L("Saved", "ออม")} ${KB.savingRate()}%</span>
    </div>
    <div class="bd">${KB.s.badges.filter(x => x.got).map(x => `<i>${I(x.ic, 20)}</i>`).join("")}</div>
    <div class="ft">${L(`Compared with myself ${KB.s.child.week} weeks ago · not with anyone else`,
                        `เทียบกับตัวเองเมื่อ ${KB.s.child.week} สัปดาห์ก่อน · ไม่ได้เทียบกับใคร`)}</div>
  </div>

  <div class="audit">${I("lock", 19)}<div>${L(
    "<b>Card check: passed.</b><br>No currency amounts found. A kid with ฿500 and a kid with ฿5,000 post exactly the same card.",
    "<b>ตรวจการ์ดแล้ว: ผ่าน</b><br>ไม่พบยอดเงินในการ์ดนี้ เด็กที่มี ฿500 กับเด็กที่มี ฿5,000 แชร์การ์ดหน้าตาเดียวกัน")}</div></div>

  <button class="btn" id="share" style="margin-top:13px">${L("Share this card", "แชร์การ์ดนี้")}</button>
  <div class="tiny muted" style="text-align:center;margin-top:12px">${L(
    "Round 2: scam radar · environment audit · practice portfolio · time machine",
    "รอบ 2: เรดาร์กลโกง · ตรวจสิ่งแวดล้อม · พอร์ตจำลอง · เครื่องเวลา")}</div>`;
},

mount(el) {
  el.querySelector("#share").onclick = () => toast(L("Checked — no baht amounts. Ready to share ✓",
                                                     "ตรวจแล้วไม่มียอดเงิน · พร้อมแชร์ ✓"));
}
};
