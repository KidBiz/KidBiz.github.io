/* ============================================================
   S6 — ฝั่งพ่อแม่
   ยืนยันรายได้ · แทร็กบทบาทของพ่อแม่เอง · บทความประจำสัปดาห์
   ⛔ ห้ามมีปุ่มแก้บันทึกของลูก (N4)
   ============================================================ */

SCREENS.s6 = {
title: () => L("For parents", "สำหรับพ่อแม่"),
sub: () => L(`${LT(KB.s.child.name)}'s parent view`, `ผู้ปกครองของ${LT(KB.s.child.name)}`),
parent: true,
notes: () => [
  ["N4", L("This screen has 'Confirm' and 'Not from work' — and nothing else. There is no button anywhere on it that edits a child's record.",
           "หน้านี้มีแค่ปุ่ม 'ยืนยัน' กับ 'ไม่ใช่รายได้จากงาน' เท่านั้น ทั้งจอไม่มีปุ่มแก้ตัวเลขของลูกเลย")],
  ["N2", L("Your child's progress shows as percentages even here, on your own screen — so you get used to reading progress rather than balances.",
           "ความคืบหน้าของลูกโชว์เป็น % แม้แต่ในหน้าของคุณเอง เพื่อให้คุ้นกับการมองพัฒนาการ ไม่ใช่ยอดเงิน")],
  [L("Your metric", "ตัวชี้วัดของคุณ"), L("Parents get a number of their own. The research is consistent: what the parent does predicts the child's money habits more strongly than the curriculum.",
      "พ่อแม่มีตัวเลขของตัวเอง งานวิจัยชี้ตรงกันว่าสิ่งที่พ่อแม่ทำ ทำนายนิสัยการเงินของลูกได้แรงกว่าหลักสูตร")]
],

css: `
.phead { background: linear-gradient(135deg, var(--c-parent), #7D0F50); color: #fff; border-radius: var(--r-lg);
  padding: 19px 20px; margin-bottom: 13px; box-shadow: var(--shadow); }
.phead .nm { font-size: var(--fs-sm); font-weight: 600; opacity: .9; }
.phead .g { display: flex; margin: 15px 0 13px; gap: 8px; }
.phead .g > div { flex: 1; }
.phead .g b { display: block; font-size: 31px; font-weight: 700; letter-spacing: -1px; line-height: 1; font-variant-numeric: tabular-nums; }
.phead .g small { font-size: var(--fs-xs); opacity: .85; font-weight: 600; display: block; margin-top: 4px; line-height: 1.35; }
.phead .lvbar { height: 8px; border-radius: var(--r-pill); background: rgba(255,255,255,.3); overflow: hidden; }
.phead .lvbar i { display: block; height: 100%; background: #fff; }
.phead .cap { font-size: var(--fs-xs); opacity: .92; margin-top: 10px; font-weight: 600; }

.vf { border: 1.5px solid var(--c-line); border-radius: var(--r-sm); padding: 15px; margin-bottom: 11px; background: var(--c-surface-2); }
.vf .top { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; }
.vf .amt { font-size: 24px; font-weight: 700; font-variant-numeric: tabular-nums; }
.vf .dt { font-size: var(--fs-xs); color: var(--c-ink-3); font-weight: 600; margin-left: auto; }
.vf .note { font-size: var(--fs-md); color: var(--c-ink); margin-bottom: 5px; }
.vf .meta { font-size: var(--fs-xs); color: var(--c-ink-3); margin-bottom: 13px; line-height: 1.5; }
.vf .btn-row .btn { padding: 12px 10px; font-size: var(--fs-sm); }

/* 3 สัญญาณการมีส่วนร่วม · กล่องแคบลงเพราะจาก 2 เป็น 3 ช่อง */
.ptrack { display: flex; gap: 9px; margin-bottom: 10px; }
.ptrack > div { flex: 1; min-width: 0; background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--r-md);
  padding: 14px 9px; box-shadow: var(--shadow); text-align: center; }
.ptrack b { display: block; font-size: 26px; font-weight: 700; letter-spacing: -1px; font-variant-numeric: tabular-nums; }
.ptrack small { font-size: var(--fs-xs); color: var(--c-ink-3); font-weight: 600; line-height: 1.4; display: block; margin-top: 4px; }
.ptrack .tr { font-size: var(--fs-xs); font-weight: 700; color: var(--c-ink-3); margin-top: 5px; }
.ptrack .tr.up { color: var(--c-fill-ink); }

.mis { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--c-line); }
.mis:last-of-type { border: 0; }
.mis .bx { width: 26px; height: 26px; border-radius: 8px; border: 2px solid var(--c-line); flex: none;
  display: grid; place-items: center; font-size: 14px; color: #fff; cursor: pointer; }
.mis .bx.on { background: var(--c-parent); border-color: var(--c-parent); }
.mis .t { flex: 1; font-size: var(--fs-md); font-weight: 600; text-align: left; line-height: 1.45; }
.mis.ticked .t { color: var(--c-ink-3); }

.art { background: var(--c-parent-soft); border-radius: var(--r-md); padding: 17px; box-shadow: var(--shadow); margin-bottom: 13px; }
.art .lb { font-size: var(--fs-xs); font-weight: 700; color: var(--c-parent); letter-spacing: .5px; margin-bottom: 7px;
  display: flex; align-items: center; gap: 6px; }
.lock .ic { color: var(--c-ink-3); margin-top: 1px; }
.art h4 { font-size: var(--fs-md); font-weight: 700; margin-bottom: 9px; line-height: 1.45; }
.art p { font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.75; }

.lock { display: flex; gap: 10px; background: var(--c-surface-2); border-radius: var(--r-sm); padding: 14px 15px;
  font-size: var(--fs-sm); color: var(--c-ink-2); line-height: 1.65; }
`,

render() {
  const p = KB.s.parent, pend = KB.pending(), item = KB.goalSmallItem();

  return `
  <div class="phead">
    <div class="nm">${LT(KB.s.child.name)} · ${LT(KB.s.child.grade)} · ${L(`week ${KB.s.child.week}`, `สัปดาห์ที่ ${KB.s.child.week}`)}</div>
    <div class="g">
      <div><b>${KB.coverage()}%</b><small>${L("covered by them", "หาเองได้")}</small></div>
      <div><b>${KB.savingRate()}%</b><small>${L("savings rate", "อัตราออม")}</small></div>
      <div><b>${KB.practiceCount()}</b><small>${L("times practised", "ครั้งที่ฝึกคิด")}</small></div>
    </div>
    <div class="lvbar"><i style="width:${KB.goalSmallPct()}%"></i></div>
    <div class="cap">${MEDAL("silver",15)} ${L(`Small goal — ${LT(item.name).toLowerCase()} ${KB.goalSmallPct()}%`,
                            `เป้าเล็ก — ${LT(item.name)} ${KB.goalSmallPct()}%`)}</div>
  </div>

  <div class="card">
    <div class="card-t">${I("target", 18)} ${L("Their step goals", "เป้าหมายเป็นขั้นของลูก")}
      <span class="r">${KB.s.goalTiers.length + 1} ${L("goals", "เป้า")}</span></div>
    <div class="tiny muted" style="margin-bottom:12px">${L(
      "Pick the expenses you already pay that become their step goals, cheapest first. Their earnings fill each one in turn, and the last goal is always the whole month. Them covering a bill doesn't mean you stop paying it — it means you carry less, and they see exactly how much less.",
      "เลือกค่าใช้จ่ายที่คุณจ่ายอยู่แล้ว ให้เป็นเป้าหมายไล่ขั้นของลูก เรียงจากถูกไปแพง รายได้ของลูกจะเติมทีละขั้น และเป้าสุดท้ายคือค่าใช้จ่ายทั้งเดือนเสมอ การที่ลูก cover รายการไหนได้ ไม่ได้แปลว่าคุณหยุดจ่าย แต่แปลว่าคุณเบาลง และลูกเห็นชัดว่าเบาลงเท่าไหร่")}</div>
    <div class="chips" id="goalpick">
      ${KB.s.costItems.filter(c => c.source === "parent").map(c => {
        const on = KB.s.goalTiers.includes(c.id);
        return `<button class="chip ${on ? "on" : ""}" data-goal="${c.id}">${on ? "✓ " : ""}${LT(c.name)} · ${KB.baht(c.perMonth)}</button>`;
      }).join("")}
    </div>
  </div>

  <div class="card">
    <div class="card-t"><span style="color:var(--c-parent)">${I("check", 18)}</span> ${L("Waiting for you", "รอคุณยืนยัน")} <span class="r">${pend.length}</span></div>
    ${pend.length ? pend.map(i => `
      <div class="vf">
        <div class="top"><span class="amt">${KB.baht(i.amt)}</span><span class="dt">${LT(i.d)}</span></div>
        <div class="note">${LT(i.note)}</div>
        <div class="meta">${LT(KB.s.workLevels[i.lv - 1])} · ${L(`${i.hrs} hrs`, `ใช้เวลา ${i.hrs} ชม.`)} · ${KB.baht(i.amt / i.hrs)}/${L("hr", "ชม.")}</div>
        <div class="btn-row">
          <button class="btn parent" data-ok="${i.id}">${L("Yes, real work", "ใช่ งานจริง")}</button>
          <button class="btn ghost" data-no="${i.id}" style="flex:0 0 44%">${L("Not from work", "ไม่ใช่รายได้จากงาน")}</button>
        </div>
      </div>`).join("")
    : `<div class="tiny muted">${L("All caught up ✓ nothing waiting", "ยืนยันครบแล้ว ✓ ไม่มีรายการค้าง")}</div>`}
    <div class="tiny muted" style="margin-top:11px">${L(
      "Gifts, birthday money, anything handed over → tap 'Not from work', so the progress number stays honest.",
      "ของขวัญ เงินขวัญถุง หรือเงินที่ให้เปล่า → กด 'ไม่ใช่รายได้จากงาน' เพื่อให้ตัวเลขพัฒนาการตรงกับความจริง")}</div>
  </div>

  <div class="card-t" style="margin:20px 0 11px;font-size:var(--fs-md)">${I("family", 19)} ${L("What I've been part of", "สิ่งที่ฉันมีส่วนร่วม")}</div>

  <div class="ptrack">
    <div><b>${p.moneyTalk}</b><small>${L("money talks<br>this month", "ครั้งที่คุยเรื่องเงิน<br>เดือนนี้")}</small>
      <div class="tr ${p.moneyTalk >= p.moneyTalkLast ? "up" : ""}">${p.moneyTalk - p.moneyTalkLast >= 0 ? "↑" : "↓"} ${Math.abs(p.moneyTalk - p.moneyTalkLast)} ${L("vs last", "จากเดือนก่อน")}</div></div>
    <div><b>${p.earnChances}</b><small>${L("chances to earn<br>I opened up", "โอกาสหาเงิน<br>ที่เปิดให้ลูก")}</small></div>
    <div><b>${p.missionStreak}</b><small>${L("weeks I finished<br>my own missions", "สัปดาห์ที่ทำ<br>ภารกิจตัวเองครบ")}</small></div>
  </div>
  <div class="tiny muted" style="margin-bottom:16px">${L(
    "Three things you can actually do. None of them is about withholding money from your child.",
    "สามอย่างที่พ่อแม่ทำได้จริง ไม่มีข้อไหนเกี่ยวกับการไม่ให้เงินลูก")}</div>

  <div class="card">
    <div class="card-t">${I("target", 18)} ${L("This week", "ภารกิจสัปดาห์นี้")} <span class="r">${p.missions.filter(m => m.done).length}/${p.missions.length}</span></div>
    ${p.missions.map((m, i) => `
      <div class="mis ${m.done ? "ticked" : ""}">
        <span class="bx ${m.done ? "on" : ""}" data-mis="${i}">${m.done ? "✓" : ""}</span>
        <span class="t">${LT(m.t)}</span>
      </div>`).join("")}
    <div class="btn-row" style="margin-top:14px">
      <button class="btn ghost sm" style="flex:1;border-radius:var(--r-md)" data-log="moneyTalk">+ ${L("Talked money", "คุยเรื่องเงิน")}</button>
      <button class="btn ghost sm" style="flex:1;border-radius:var(--r-md)" data-log="earnChances">+ ${L("Opened a chance", "เปิดโอกาสให้หาเงิน")}</button>
    </div>
  </div>

  <div class="art">
    <div class="lb">${I("doc", 15)} ${L("THIS WEEK'S READ", "บทความประจำสัปดาห์")}</div>
    <h4>${LT(p.article.t)}</h4>
    <p>${LT(p.article.s)}</p>
  </div>

  <div class="lock">${I("lock", 19)}<div>${L(
    "You can <b>confirm</b>, but you can't <b>edit what your child recorded</b> — if they don't feel they own their own data, the habit doesn't form.",
    "คุณ<b>ยืนยัน</b>ได้ แต่<b>แก้บันทึกของลูกไม่ได้</b> — ถ้าลูกไม่รู้สึกเป็นเจ้าของข้อมูลตัวเอง นิสัยจะไม่เกิด")}</div></div>`;
},

mount(el) {
  el.querySelectorAll("[data-ok]").forEach(b => b.onclick = () => {
    KB.verifyIncome(+b.dataset.ok, true); render();
    toast(L(`Confirmed · ${LT(KB.s.child.name)} is now at ${KB.coverage()}% covered`,
            `ยืนยันแล้ว · ตอนนี้${LT(KB.s.child.name)}หาเองได้ ${KB.coverage()}%`));
  });
  el.querySelectorAll("[data-no]").forEach(b => b.onclick = () => {
    KB.verifyIncome(+b.dataset.no, false); render();
    toast(L("Not counted as earned · your child will see why", "ไม่นับเป็นรายได้จากงาน · ลูกจะเห็นเหตุผลในแอป"));
  });
  el.querySelectorAll("[data-goal]").forEach(b => b.onclick = () => {
    const id = b.dataset.goal, t = KB.s.goalTiers;
    if (t.includes(id)) {
      if (t.length === 1) return toast(L("Keep at least one step goal", "ต้องเหลือเป้าขั้นไว้อย่างน้อย 1 อัน"));
      KB.s.goalTiers = t.filter(x => x !== id);
    } else {
      KB.s.goalTiers = [...t, id];
    }
    /* เรียงจากถูกไปแพง เพื่อให้ชั้นล่างสุดคือชั้นที่ถึงก่อนเสมอ */
    const cost = x => (KB.s.costItems.find(c => c.id === x) || {}).perMonth || 0;
    KB.s.goalTiers.sort((a, c) => cost(a) - cost(c));
    KB.save(); render();
    toast(L(`${KB.s.goalTiers.length + 1} goals now`, `ตอนนี้มี ${KB.s.goalTiers.length + 1} เป้าหมาย`));
  });
  el.querySelectorAll("[data-mis]").forEach(b => b.onclick = () => {
    const m = KB.s.parent.missions[+b.dataset.mis]; m.done = !m.done; KB.save(); render();
  });
  el.querySelectorAll("[data-log]").forEach(b => b.onclick = () => {
    const p = KB.s.parent;
    p[b.dataset.log]++;
    KB.save(); render();
    toast(b.dataset.log === "moneyTalk"
      ? L("Logged — that's the one that predicts the most", "บันทึกแล้ว — ข้อนี้คือตัวที่ทำนายผลได้มากที่สุด")
      : L("Logged — earning it beats being given it", "บันทึกแล้ว — ได้มาจากการทำเองดีกว่าได้เปล่า"));
  });
}
};
