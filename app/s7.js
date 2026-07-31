/* ============================================================
   S7 — ความก้าวหน้า + ใบประกาศ + รางวัลตามเป้า + การ์ดแชร์
   ⭐ รางวัล 2 ชั้น: ใบประกาศจบคอร์ส (ทุกคนได้) · โล่/เหรียญตามเป้า
   N2 การ์ดแชร์ต้องไม่มียอดเงินหลุดออกไป
   ============================================================ */

SCREENS.s7 = {
title: () => L("Progress", "ความก้าวหน้า"),
sub: () => L(`Day 1 → week ${KB.s.child.week}`, `วันแรก → สัปดาห์ที่ ${KB.s.child.week}`),
notes: () => [
  [L("Two tiers, on purpose", "แยก 2 ชั้นโดยตั้งใจ"), L("The certificate goes to everyone who finishes and is never tied to a financial result — family incomes differ. The medals are tied to the goals and are for the family, not for a school file.",
      "ใบประกาศให้ทุกคนที่เรียนจบ และไม่ผูกกับผลลัพธ์ทางการเงินเลย เพราะฐานะแต่ละบ้านต่างกัน ส่วนเหรียญผูกกับเป้าหมาย และเป็นของครอบครัว ไม่ใช่ของแฟ้มโรงเรียน")],
  [L("Nobody leaves empty-handed", "ไม่มีใครกลับบ้านมือเปล่า"), L("That is the whole reason for splitting them. A child from a household where earning is harder still finishes with something real and official.",
      "นี่คือเหตุผลทั้งหมดของการแยก 2 ชั้น เด็กจากบ้านที่หาเงินยากกว่า ก็ยังจบพร้อมของที่จับต้องได้และเป็นทางการ")],
  ["N2", L("The share card carries badges, percentages and a streak only — with an automatic check that no currency slipped through.",
           "การ์ดแชร์มีแค่เหรียญ เปอร์เซ็นต์ และจำนวนสัปดาห์ต่อเนื่อง พร้อมตัวตรวจอัตโนมัติว่าไม่มียอดเงินหลุดออกไป")]
],

css: `
.ba { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md); box-shadow: var(--shadow); overflow: hidden; margin-bottom: 13px; }
.ba .hr { display: flex; align-items: center; gap: 8px; padding: 11px 15px; background: var(--c-surface-2);
  font-size: var(--fs-xs); font-weight: 700; color: var(--c-ink-3); }
.ba .hr .a { flex: 1; }
.ba .hr .b, .ba .hr .c { width: 60px; text-align: right; }
.ba .rw { display: flex; align-items: center; gap: 8px; padding: 13px 15px; border-top: 1px solid var(--c-line); }
.ba .rw .a { flex: 1; font-size: var(--fs-sm); font-weight: 600; line-height: 1.4; display: flex; align-items: center; gap: 9px; }
.ba .rw .a .ic { color: var(--c-ink-3); }
.ba .rw.key .a .ic { color: var(--c-fill-ink); }
.ba .rw .b { width: 60px; text-align: right; font-size: var(--fs-sm); color: var(--c-ink-3); font-variant-numeric: tabular-nums; }
.ba .rw .c { width: 60px; text-align: right; font-size: var(--fs-md); font-weight: 700; font-variant-numeric: tabular-nums; }
.ba .rw .up { font-size: var(--fs-xs); font-weight: 700; color: var(--c-fill-ink); width: 44px; text-align: right; }
.ba .rw.key { background: var(--c-fill-soft); }

/* --- ⭐ ใบประกาศ --- */
.cert { background: linear-gradient(160deg,#FFFEFA,#F6F2E6); border: 1.5px solid #E4DCC4; border-radius: var(--r-md);
  padding: 22px 20px; box-shadow: var(--shadow); margin-bottom: 13px; position: relative; }
.cert:before { content: ""; position: absolute; inset: 7px; border: 1px solid #E4DCC4; border-radius: 11px; pointer-events: none; }
.cert .lb { font-size: 10px; letter-spacing: 3px; font-weight: 700; color: #A08B52; text-align: center; }
.cert h3 { font-size: 21px; font-weight: 700; text-align: center; margin: 8px 0 3px; }
.cert .who { font-size: var(--fs-sm); color: var(--c-ink-2); text-align: center; margin-bottom: 16px; }
.cert .comp { font-size: var(--fs-xs); font-weight: 700; color: var(--c-ink-3); letter-spacing: .4px; margin-bottom: 8px; }
.cert ul { list-style: none; }
.cert li { display: flex; gap: 9px; align-items: flex-start; font-size: var(--fs-sm); line-height: 1.55; padding: 5px 0; }
.cert li .ic { color: #A08B52; margin-top: 2px; flex: none; }
.cert .acts { display: flex; gap: 8px; margin-top: 17px; }
.cert .acts .btn { padding: 11px 8px; font-size: var(--fs-sm); }

/* --- ⭐ รางวัลตามเป้า --- */
.award { display: flex; gap: 14px; align-items: center; background: var(--c-surface); border: 1px solid var(--c-line);
  border-radius: var(--r-md); padding: 16px; box-shadow: var(--shadow); margin-bottom: 11px; }
.award.locked { opacity: .5; }
.award .medal { font-size: 34px; line-height: 1; flex: none; }
.award .tx { flex: 1; }
.award .tt { font-size: var(--fs-md); font-weight: 700; }
.award .ds { font-size: var(--fs-xs); color: var(--c-ink-3); line-height: 1.5; margin-top: 3px; }
.award .st { font-size: var(--fs-xs); font-weight: 700; color: var(--c-fill-ink); margin-top: 6px; }
.award.locked .st { color: var(--c-ink-3); }
.ceremony { display: flex; gap: 10px; background: var(--c-parent-soft); border-radius: var(--r-sm); padding: 14px 15px;
  font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.65; margin-bottom: 13px; }
.ceremony .ic { color: var(--c-parent); margin-top: 2px; flex: none; }

.bg { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
.bg .b { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md); padding: 14px 7px; text-align: center; box-shadow: var(--shadow); }
.bg .b .e { display: block; line-height: 0; color: var(--c-fill-ink); }
.bg .b .t { font-size: 12px; font-weight: 700; color: var(--c-ink-2); margin-top: 6px; line-height: 1.35; }
.bg .b.off { opacity: .32; filter: grayscale(1); }

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
.sc .pill { background: rgba(255,255,255,.16); border-radius: var(--r-pill); padding: 8px 13px; font-size: var(--fs-xs); font-weight: 700;
  display: inline-flex; align-items: center; gap: 6px; }
.sc .bd { display: flex; gap: 8px; }
.sc .bd i { width: 38px; height: 38px; border-radius: 11px; background: rgba(255,255,255,.16); display: grid; place-items: center; font-style: normal; }
.sc .ft { font-size: 11px; opacity: .6; margin-top: 18px; letter-spacing: .4px; }

.audit { display: flex; gap: 10px; align-items: flex-start; background: var(--c-fill-soft); color: var(--c-fill-ink);
  border-radius: var(--r-sm); padding: 14px 15px; font-size: var(--fs-sm); font-weight: 600; line-height: 1.65; margin-top: 13px; }
.audit .ic { margin-top: 2px; }
`,

render() {
  const b = KB.s.before;
  const rows = [
    ["home",   L("Covered by me", "หาเองได้"),               b.coverage + "%", KB.coverage() + "%",    KB.coverage() - b.coverage, true],
    ["save",   L("Savings rate", "อัตราออม"),                 b.saving + "%",   KB.savingRate() + "%",  KB.savingRate() - b.saving],
    ["hand",   L("Times practised", "ครั้งที่ฝึกคิด"),          b.practice,       KB.practiceCount(),     KB.practiceCount() - b.practice],
    ["scale",  L("Share that was a need", "สัดส่วนที่จำเป็น"),  b.need + "%",     KB.needPct() + "%",     KB.needPct() - b.need],
    ["split",  L("Followed own rule", "ทำตามกฎตัวเอง"),        "—",              KB.adherence() + "%",   null],
    ["flame",  L("Weeks running", "สัปดาห์ต่อเนื่อง"),          b.streak,         KB.s.streak.weeks,      KB.s.streak.weeks - b.streak],
    ["trophy", L("Money Habit Score", "คะแนนนิสัยการเงิน"),     b.score,          KB.score(),             KB.score() - b.score, true],
    ["family", L("Parent: didn't step in", "พ่อแม่: ไม่ช่วยจ่าย"), b.bailoutFree + "%", KB.bailoutFree() + "%", KB.bailoutFree() - b.bailoutFree]
  ];

  /* สมรรถนะทางการเงิน 6 ด้าน — สิ่งที่ทำให้ใบประกาศโชว์หน่วยงานภายนอกได้จริง */
  const comps = [
    { en: "Knows what their own life costs and can break it down",  th: "รู้ต้นทุนชีวิตของตัวเองและแยกรายการได้" },
    { en: "Can earn income and tell earned money from a gift",      th: "หารายได้เองได้ และแยกเงินจากงานออกจากเงินที่ได้เปล่า" },
    { en: "Allocates income by a rule they set themselves",          th: "แบ่งรายได้ตามกฎที่ตั้งเอง" },
    { en: "Weighs a purchase against its real cost before deciding", th: "ชั่งน้ำหนักการซื้อกับต้นทุนจริงก่อนตัดสินใจ" },
    { en: "Understands how borrowing shifts cost into the future",   th: "เข้าใจว่าการกู้ย้ายต้นทุนไปไว้ในอนาคตอย่างไร" },
    { en: "Reflects on their own money decisions week to week",      th: "สะท้อนการตัดสินใจเรื่องเงินของตัวเองได้ทุกสัปดาห์" }
  ];

  return `
  <div class="card" style="background:linear-gradient(135deg, var(--c-fill-soft), #DDF5F9);border-color:#C5EAF1">
    <div class="tiny" style="font-weight:700;color:var(--c-fill-ink);letter-spacing:.5px">${L("THE GAP THAT CLOSED", "ช่องว่างที่ปิดได้")}</div>
    <div style="font-size:var(--fs-md);line-height:1.7;margin-top:8px">${L(
      `On day one they guessed they cost <b>${KB.baht(KB.s.guessedCost)} a day</b>.<br>It's really <b>${KB.baht(KB.baseDailyCost())}</b> — and they now cover <b>${KB.coverage()}%</b> of it themselves.`,
      `วันแรกลูกเดาว่าตัวเองมีค่าใช้จ่าย <b>${KB.baht(KB.s.guessedCost)}/วัน</b><br>ของจริงคือ <b>${KB.baht(KB.baseDailyCost())}/วัน</b> และตอนนี้หาเองได้แล้ว <b>${KB.coverage()}%</b>`)}
    </div>
  </div>

  <div class="ba">
    <div class="hr"><span class="a">${L("Metric", "ตัวชี้วัด")}</span><span class="b">${L("Day 1", "วันแรก")}</span><span class="c">${L("Now", "ตอนนี้")}</span><span style="width:44px"></span></div>
    ${rows.map(([ic, n, x, y, dd, key]) => `
      <div class="rw ${key ? "key" : ""}">
        <span class="a">${I(ic, 17)} ${n}</span><span class="b">${x}</span><span class="c">${y}</span>
        <span class="up">${dd === null ? "" : dd > 0 ? "↑" + dd : dd === 0 ? "→" : "↓" + Math.abs(dd)}</span>
      </div>`).join("")}
  </div>

  <div class="card-t" style="margin:20px 0 11px;font-size:var(--fs-md)">${I("certificate", 19)} ${L("Course certificate", "ใบประกาศจบคอร์ส")}
    <span class="r">${L("everyone who finishes", "ทุกคนที่เรียนจบ")}</span></div>
  <div class="cert">
    <div class="lb">CERTIFICATE OF COMPLETION</div>
    <h3>${LT(KB.s.child.name)}</h3>
    <div class="who">${L(`KidFinance · five-day programme · ${LT(KB.s.child.grade)}`,
                         `KidFinance · โปรแกรม 5 วัน · ${LT(KB.s.child.grade)}`)}</div>
    <div class="comp">${L("FINANCIAL COMPETENCIES DEMONSTRATED", "สมรรถนะทางการเงินที่ผ่าน")}</div>
    <ul>${comps.map(c => `<li>${I("check", 15)}<span>${LT(c)}</span></li>`).join("")}</ul>
    <div class="acts">
      <button class="btn ghost" data-cert="download">${L("Download", "ดาวน์โหลด")}</button>
      <button class="btn ghost" data-cert="print">${L("Print", "พิมพ์")}</button>
    </div>
  </div>
  <div class="tiny muted" style="margin:-4px 0 18px">${L(
    "Not tied to any financial result — household circumstances differ, and this is the document that goes to a school or a portfolio.",
    "ไม่ผูกกับผลลัพธ์ทางการเงินใดๆ เพราะแต่ละบ้านต่างกัน และนี่คือเอกสารที่จะไปอยู่ในแฟ้มโรงเรียนหรือ portfolio")}</div>

  <div class="card-t" style="margin:0 0 11px;font-size:var(--fs-md)">${I("medal", 19)} ${L("Goal awards", "รางวัลตามเป้าหมาย")}
    <span class="r">${L("handed over on day 4", "รับในพิธีวันที่ 4")}</span></div>

  ${KB.goals().map((g, i, arr) => `
  <div class="award ${g.done ? "" : "locked"}">
    ${MEDAL_FOR(i, arr.length, 34)}
    <div class="tx">
      <div class="tt">${g.isTotal ? L("Covered myself", "เลี้ยงตัวเองได้")
                                  : L(`Covered the ${LT(g.name).toLowerCase()}`, `cover ${LT(g.name)} ได้`)}</div>
      <div class="ds">${g.isTotal
        ? L("Everything it costs to be you, for a whole month", "ค่าใช้จ่ายของตัวเองทั้งหมด ครบทั้งเดือน")
        : L(`${KB.baht(g.cost)} a month lifted off your parents — a real medal, given at the ceremony`,
            `แบ่งเบาพ่อแม่เดือนละ ${KB.baht(g.cost)} — เหรียญของจริง มอบในพิธี`)}</div>
      <div class="st">${g.done ? L("Reached ✓", "ถึงเป้าแล้ว ✓")
                               : L(`${g.pct}% of the way`, `ไปได้ ${g.pct}%`)}</div>
    </div>
  </div>`).join("")}

  <div class="ceremony">${I("family", 19)}<div>${L(
    "At the ceremony the <b>parent</b> hands over the medal, not the instructor — this award is about a child lightening the load at home, so the thank-you should come from the person who felt it.",
    "ในพิธี <b>พ่อแม่</b> เป็นคนมอบเหรียญให้ลูก ไม่ใช่ผู้สอน เพราะรางวัลนี้คือเรื่องลูกช่วยแบ่งเบาภาระที่บ้าน คำขอบคุณจึงควรมาจากคนที่รู้สึกถึงมันจริงๆ")}</div></div>

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
      <span class="pill">${I("flame", 14)} ${L(`${KB.s.streak.best} weeks`, `ต่อเนื่อง ${KB.s.streak.best} สัปดาห์`)}</span>
      <span class="pill">${I("hand", 14)} ${L("Practised", "ฝึกคิด")} ${KB.practiceCount()}×</span>
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
  el.querySelectorAll("[data-cert]").forEach(b => b.onclick = () => toast(
    b.dataset.cert === "print" ? L("Sent to print", "ส่งไปพิมพ์แล้ว") : L("Certificate downloaded", "ดาวน์โหลดใบประกาศแล้ว")));
}
};
