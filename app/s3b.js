/* ============================================================
   S3b — หน้าฉลองหลังบันทึกรายได้: "เงินก้อนนี้ = กี่วัน" (C10)
   โมเมนต์ reward ที่สำคัญที่สุดของแอป
   160 บาท ฟังดูน้อย แต่ "16 วัน" ฟังดูเป็นเรื่องใหญ่
   ============================================================ */

SCREENS.s3b = {
title: () => L("Nice one", "เก่งมาก"),
notes: () => [
  [L("Days, not baht", "หน่วยเป็นวัน ไม่ใช่บาท"), L("฿160 sounds like nothing to a teenager. '16 days of your phone bill' sounds like something. Same number, a unit that means something to them.",
      "160 บาท ฟังดูไม่เท่าไหร่สำหรับเด็ก แต่ 'จ่ายค่ามือถือได้ 16 วัน' ฟังดูเป็นเรื่องใหญ่ ตัวเลขเดียวกัน แต่เป็นหน่วยที่มีความหมายกับเขา")],
  [L("Reward the logging", "ให้รางวัลกับการบันทึก"), L("This screen is the payoff for entering data. If logging feels like homework the whole system dies, so the moment right after saving has to feel good.",
      "หน้านี้คือผลตอบแทนของการกรอกข้อมูล ถ้าการบันทึกรู้สึกเหมือนการบ้าน ทั้งระบบจะตาย โมเมนต์หลังกดบันทึกจึงต้องรู้สึกดี")],
  [L("Still pending", "ยังรอยืนยัน"), L("The celebration happens now, but the number only counts once a parent confirms it. The striped band shows the difference.",
      "ฉลองได้เลยตอนนี้ แต่ตัวเลขจะถูกนับก็ต่อเมื่อพ่อแม่ยืนยัน แถบลายทางคือส่วนต่างนั้น")]
],

css: `
.cel { text-align: center; padding: 4px 0 2px; }
.cel .em { color: var(--c-fill); line-height: 0; }
.cel h3 { font-size: 38px; font-weight: 700; margin: 10px 0 4px; letter-spacing: -1.5px; font-variant-numeric: tabular-nums; }
.cel .sub { font-size: var(--fs-sm); color: var(--c-ink-3); margin-bottom: 20px; }

.dayline { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md);
  padding: 18px; box-shadow: var(--shadow); margin-bottom: 12px; }
.dayline .top { display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px; }
.dayline .medal { font-size: 18px; }
.dayline .nm { font-size: var(--fs-sm); font-weight: 700; color: var(--c-ink-2); flex: 1; }
.dayline .hero { font-size: 46px; font-weight: 700; letter-spacing: -2px; line-height: 1.05;
  font-variant-numeric: tabular-nums; color: var(--c-fill-ink); }
.dayline .hero span { font-size: var(--fs-lg); letter-spacing: 0; }
.dayline .say { font-size: var(--fs-md); line-height: 1.6; margin-top: 6px; }

/* กราฟแท่ง: จำนวนวันที่ cover ได้ ก่อน → หลัง */
.daybars { display: flex; align-items: flex-end; gap: 10px; height: 96px; margin: 16px 0 8px; }
.daybars .col { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; height: 100%; }
.daybars .bx { border-radius: 7px 7px 3px 3px; background: var(--c-surface-2); transition: height .8s cubic-bezier(.2,.9,.25,1); }
.daybars .col.now .bx { background: var(--c-fill); }
.daybars .cap { font-size: var(--fs-xs); font-weight: 700; color: var(--c-ink-3); text-align: center; margin-top: 8px; }
.daybars .col.now .cap { color: var(--c-fill-ink); }
.daybars .val { font-size: var(--fs-sm); font-weight: 700; text-align: center; margin-bottom: 5px; font-variant-numeric: tabular-nums; }

.minipit { height: 96px; border-radius: 8px 8px 16px 16px; position: relative; overflow: hidden; margin-bottom: 7px;
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
  const amt = ctx.amt || 0;
  const d = KB.daysOf(amt);
  const item = KB.goalSmallItem();
  const cov = KB.coverage(), covP = KB.coveragePending();
  const rate = ctx.hrs ? amt / ctx.hrs : 0;

  /* จำนวนวันของเป้าเล็กที่ cover ได้ ก่อน vs หลังเงินก้อนนี้ */
  const daysAfter = KB.goalSmallDays() + d.small;   // pending ยังไม่นับใน goalSmallDays
  const daysBefore = KB.goalSmallDays();
  const top = Math.max(daysAfter, 1);

  return `
  <div class="cel">
    <div class="em">${I("sparkle", 50)}</div>
    <h3>+${KB.baht(amt)}</h3>
    <div class="sub">${rate ? L(`${KB.baht(rate)} an hour for your time`, `คิดเป็น ${KB.baht(rate)}/ชม. ของเวลาที่ใช้`) : ""}</div>
  </div>

  <div class="dayline">
    <div class="top">${MEDAL("silver")}<span class="nm">${LT(item.name)}</span></div>
    <div class="hero">${d.small} <span>${L(d.small === 1 ? "day" : "days", "วัน")}</span></div>
    <div class="say">${L(`This alone pays your ${LT(item.name).toLowerCase()} for <b>${d.small} days</b>.`,
                         `เงินก้อนนี้ก้อนเดียว จ่าย${LT(item.name)}ได้ <b>${d.small} วัน</b> เลยนะ`)}</div>

    <div class="daybars">
      <div class="col"><div class="val">${daysBefore}</div>
        <div class="bx" style="height:${Math.max(6, daysBefore / top * 100)}%"></div>
        <div class="cap">${L("before", "ก่อนหน้านี้")}</div></div>
      <div class="col now"><div class="val">${daysAfter}</div>
        <div class="bx" style="height:${Math.max(6, daysAfter / top * 100)}%"></div>
        <div class="cap">${L("now", "ตอนนี้")}</div></div>
    </div>
  </div>

  <div class="dayline">
    <div class="top">${MEDAL("gold")}<span class="nm">${L("Everything it costs to be you", "ค่าใช้จ่ายทั้งหมดของหนู")}</span></div>
    <div class="hero">${d.big.toFixed(1)} <span>${L("days", "วัน")}</span></div>
    <div class="say">${L(`At ${KB.baht(KB.dailyCost())} a day, that's <b>${d.big.toFixed(1)} full days</b> of living covered.`,
                         `วันละ ${KB.baht(KB.dailyCost())} เท่ากับ cover ได้ <b>${d.big.toFixed(1)} วันเต็ม</b>`)}</div>
  </div>

  <div class="minipit">
    <div class="p" style="bottom:${cov}%;height:${Math.max(0, covP - cov)}%"></div>
    <div class="f" style="height:${cov}%"></div>
    <div class="lb">${cov}% → ${covP}%</div>
  </div>
  <div class="tiny muted" style="text-align:center;margin-bottom:14px">${L(
    "The striped part is waiting for a parent to confirm it",
    "แถบลายทางคือส่วนที่รอพ่อแม่ยืนยัน")}</div>

  <div class="card">
    <div class="card-t">${I("split", 18)} ${L("Split by your own rule", "แบ่งตามกฎของหนู")}
      <span class="r">${KB.s.rule.need}/${KB.s.rule.save}/${KB.s.rule.spend}/${KB.s.rule.share}</span></div>
    ${KB.splitOf(amt).map(x => `
      <div class="splitrow">
        <span class="dot" style="background:var(--c-${x.key})"></span>
        <span class="nm">${x.name}</span><span class="pp">${x.p}%</span>
        <span class="am">+${KB.baht(x.amt)}</span>
      </div>`).join("")}
  </div>

  <button class="btn ghost" data-close="1">${L("Done", "เสร็จแล้ว")}</button>`;
}
};
