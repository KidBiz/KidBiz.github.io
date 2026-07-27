/* ============================================================
   S2c — เมนูบทเรียนรายวัน (C9)
   Day 1-4 · วันที่ยังไม่ถึง = ล็อก · แต่ละวันมี บทเรียน / ฟีเจอร์ที่ปลดล็อก /
   ภารกิจเด็ก / ภารกิจพ่อแม่ / งานวิจัยเบื้องหลัง
   ============================================================ */

SCREENS.s2c = {
title: () => L("Lessons", "บทเรียน"),
sub: () => L(`${KB.s.lessons.filter(l => l.done).length} of 4 days done`,
             `เรียนแล้ว ${KB.s.lessons.filter(l => l.done).length} จาก 4 วัน`),
notes: () => [
  [L("One thread", "เส้นเรื่องเดียว"), L("All four days answer the same question — did the hole get shallower? Each day opens with it, so the app and the classroom never drift apart.",
      "ทั้ง 4 วันตอบคำถามเดียวกัน — หลุมตื้นลงไหม ทุกวันเปิดด้วยคำถามนี้ แอปกับห้องเรียนจึงไม่หลุดจากกัน")],
  [L("Locked on purpose", "ล็อกโดยตั้งใจ"), L("Days ahead stay closed so each session has something genuinely new to teach and nobody is overwhelmed on day one.",
      "วันที่ยังไม่ถึงถูกปิดไว้ เพื่อให้แต่ละคาบมีของใหม่ให้สอนจริงๆ และไม่ทำให้เด็กท่วมตั้งแต่วันแรก")],
  [L("Parents have homework too", "พ่อแม่ก็มีการบ้าน"), L("The child can see the parent's missions for each day. Seeing that the adult is also being asked to change is part of what makes it work.",
      "เด็กเห็นภารกิจของพ่อแม่ในแต่ละวันได้ การได้เห็นว่าผู้ใหญ่ก็ถูกขอให้เปลี่ยนด้วย เป็นส่วนหนึ่งที่ทำให้มันได้ผล")]
],

css: `
.dcard { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md);
  box-shadow: var(--shadow); margin-bottom: 12px; overflow: hidden; }
.dcard.locked { opacity: .62; }
.dhead { display: flex; align-items: center; gap: 13px; padding: 16px; cursor: pointer; width: 100%;
  background: none; border: 0; font-family: var(--font); text-align: left; }
.dhead .num { width: 44px; height: 44px; border-radius: 13px; display: grid; place-items: center; flex: none;
  background: var(--c-fill-soft); color: var(--c-fill-ink); }
.dcard.locked .dhead .num { background: var(--c-surface-2); color: var(--c-ink-3); }
.dhead .tx { flex: 1; min-width: 0; }
.dhead .dd { font-size: var(--fs-xs); font-weight: 700; color: var(--c-ink-3); letter-spacing: .4px; }
.dhead .tt { font-size: var(--fs-md); font-weight: 700; line-height: 1.35; }
.dhead .chev { color: var(--c-ink-3); transition: transform .2s; }
.dcard.open .dhead .chev { transform: rotate(180deg); }

.dbody { padding: 0 16px 16px; }
.dbody .lead { font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.7; margin-bottom: 15px; }
.blk { margin-bottom: 14px; }
.blk .lb { display: flex; align-items: center; gap: 7px; font-size: var(--fs-xs); font-weight: 700;
  color: var(--c-ink-3); letter-spacing: .4px; margin-bottom: 6px; }
.blk .bd { font-size: var(--fs-sm); line-height: 1.65; }
.blk.kid .bd, .blk.par .bd { background: var(--c-surface-2); border-radius: var(--r-sm); padding: 12px 13px; }
.blk.par .lb { color: var(--c-parent); }
.blk.par .bd { background: var(--c-parent-soft); }
.blk.why .bd { border-left: 3px solid var(--c-line); padding-left: 13px; color: var(--c-ink-2); font-style: italic; }
.lockrow { display: flex; align-items: center; gap: 9px; padding: 0 16px 16px;
  font-size: var(--fs-sm); color: var(--c-ink-3); }
`,

render(ctx) {
  const open = ctx.open || 0;
  return KB.s.lessons.map(l => {
    const isOpen = open === l.day && l.done;
    return `
    <div class="dcard ${l.done ? "" : "locked"} ${isOpen ? "open" : ""}">
      <button class="dhead" ${l.done ? `data-open="${isOpen ? 0 : l.day}"` : "disabled"}>
        <span class="num">${I(l.done ? l.ic : "lock", 22)}</span>
        <span class="tx">
          <span class="dd">${L(`DAY ${l.day}`, `วันที่ ${l.day}`)}</span>
          <span class="tt">${LT(l.t)}</span>
        </span>
        ${l.done ? `<span class="chev">${I("arrowDown", 20)}</span>` : ""}
      </button>
      ${!l.done ? `<div class="lockrow">${I("lock", 16)} ${L("Opens on the day", "เปิดในวันเรียนวันนั้น")}</div>` : ""}
      ${isOpen ? `
      <div class="dbody">
        <div class="lead">${LT(l.s)}</div>
        <div class="blk"><div class="lb">${I("lift", 14)} ${L("UNLOCKS", "ปลดล็อก")}</div>
          <div class="bd">${LT(l.unlocked)}</div></div>
        <div class="blk kid"><div class="lb">${I("hand", 14)} ${L("YOUR MISSION", "ภารกิจของหนู")}</div>
          <div class="bd">${LT(l.kid)}</div></div>
        <div class="blk par"><div class="lb">${I("family", 14)} ${L("YOUR PARENT'S MISSION", "ภารกิจของพ่อแม่")}</div>
          <div class="bd">${LT(l.parent)}</div></div>
        <div class="blk why"><div class="lb">${I("book", 14)} ${L("WHY THIS DAY WORKS", "ทำไมวันนี้ถึงได้ผล")}</div>
          <div class="bd">${LT(l.why)}</div></div>
      </div>` : ""}
    </div>`;
  }).join("");
},

mount(el) {
  el.querySelectorAll("[data-open]").forEach(b => b.onclick = () => setCtx({ open: +b.dataset.open }));
}
};
