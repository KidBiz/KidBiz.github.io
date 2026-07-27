/* ============================================================
   KidFinance — โครง: router / tab / sheet / toast / ภาษา
   ปกติไม่ต้องแก้ไฟล์นี้ · แก้หน้าจอที่ s1.js … s7.js
   ============================================================ */

const TABS = [
  { id: "s1",  ic: "home",      t: { en: "Home",      th: "หน้าแรก" } },
  { id: "s4",  ic: "envelope",  t: { en: "Envelopes", th: "ซองเงิน" } },
  { id: "s5",  ic: "clipboard", t: { en: "Weekly",    th: "สัปดาห์" } },
  { id: "s2c", ic: "book",      t: { en: "Lessons",   th: "บทเรียน" } },
  { id: "s7",  ic: "chart",     t: { en: "Progress",  th: "ก้าวหน้า" } },
  { id: "s6",  ic: "family",    t: { en: "Parents",   th: "พ่อแม่" } }
];

let cur = "s1";
let CTX = {};              // context แยกตามหน้า
let sheetId = null, sheetCtx = {};

/* ---------- helpers ที่หน้าจอเรียกใช้ได้ ---------- */
function go(id)          { cur = id; CTX[id] = CTX[id] || {}; render(); document.getElementById("scr").scrollTop = 0; }
function setCtx(patch)   { CTX[cur] = { ...(CTX[cur] || {}), ...patch }; render(); }
function openSheet(id, c){ sheetId = id; sheetCtx = c || {}; renderSheet(); }
function setSheet(c)     { sheetCtx = c; renderSheet(); }
function closeSheet()    { sheetId = null; document.getElementById("layer").innerHTML = ""; render(); }

function toast(msg) {
  const l = document.getElementById("layer");
  l.querySelectorAll(".toast").forEach(t => t.remove());
  const d = document.createElement("div");
  d.className = "toast"; d.textContent = msg;
  l.appendChild(d);
  setTimeout(() => d.remove(), 3000);
}

/* ---------- แถบบน + แถบล่าง ---------- */
function render() {
  const S = SCREENS[cur], ctx = CTX[cur] || {};

  document.getElementById("top").innerHTML = `
    <div style="flex:1;min-width:0">
      <h1>${S.title()}</h1>
      ${S.sub ? `<div class="sub">${S.sub()}</div>` : ""}
    </div>
    <div class="lang">
      <button class="${LANG === "en" ? "on" : ""}" data-lang="en">EN</button>
      <button class="${LANG === "th" ? "on" : ""}" data-lang="th">ไทย</button>
    </div>
    <button class="icon-btn" id="why" title="${L("Why this screen works this way", "หลักการเบื้องหลังหน้านี้")}">?</button>`;

  const scr = document.getElementById("scr");
  scr.innerHTML = S.render(ctx);
  if (S.mount) S.mount(scr, ctx);

  document.getElementById("tabs").className = "tabbar" + (S.parent ? " parent" : "");
  document.getElementById("tabs").innerHTML = TABS.map(t =>
    `<button class="tab ${t.id === cur ? "on" : ""}" data-go="${t.id}">
       ${I(t.ic, 23)}${LT(t.t)}</button>`).join("");

  document.getElementById("why").onclick = () => openSheet("_why");
  document.querySelectorAll("[data-lang]").forEach(b => b.onclick = () => setLang(b.dataset.lang));
  renderSide();
}

/* ---------- Sheet (S2 / S3 / กล่องหลักการ) ---------- */
function renderSheet() {
  const l = document.getElementById("layer");
  if (!sheetId) return;

  if (sheetId === "_why") {
    l.innerHTML = sheetHTML(L("Behind this screen", "เบื้องหลังหน้านี้"),
      SCREENS[cur].notes().map(n => `<div class="rule" style="margin-bottom:10px"><b>${n[0]}</b>${n[1]}</div>`).join(""));
  } else {
    const S = SCREENS[sheetId];
    l.innerHTML = sheetHTML(S.sheetTitle ? S.sheetTitle(sheetCtx) : S.title(), S.render(sheetCtx));
    const bd = l.querySelector(".sheet-bd");
    if (S.mount) S.mount(bd, sheetCtx);
  }

  l.querySelector(".sheet-wrap").onclick = e => { if (e.target.classList.contains("sheet-wrap")) closeSheet(); };
  l.querySelector("[data-x]").onclick = closeSheet;
}

function sheetHTML(title, body) {
  return `<div class="sheet-wrap"><div class="sheet">
    <div class="sheet-hd"><h2>${title}</h2><button class="icon-btn" data-x="1">✕</button></div>
    <div class="sheet-bd">${body}</div>
  </div></div>`;
}

/* ---------- แผงข้าง (เดสก์ท็อป) ---------- */
function renderSide() {
  const S = SCREENS[cur];
  document.getElementById("side").innerHTML = `
    <div class="logo">Kid<span>Finance</span></div>
    <div class="side-sub">${cur.toUpperCase()} · ${S.title()}<br>
      ${L("Every button works. Numbers are recalculated live from data.js.",
          "กดได้จริงทุกปุ่ม ตัวเลขคำนวณสดจาก data.js")}</div>
    ${S.notes().map(n => `<div class="rule"><b>${n[0]}</b>${n[1]}</div>`).join("")}
    <div class="side-actions">
      <button class="btn sm ghost" id="rs">↺ ${L("Reset demo data", "รีเซ็ตข้อมูลเดโม")}</button>
    </div>`;
  document.getElementById("rs").onclick = () => {
    KB.reset(); CTX = {}; go("s1");
    toast(L("Back to the week 3 starting state", "กลับสู่สถานะตั้งต้น สัปดาห์ที่ 3"));
  };
}

/* ---------- delegate ---------- */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-go],[data-sheet],[data-close]");
  if (!b) return;
  if (b.dataset.go)    { if (sheetId) closeSheet(); go(b.dataset.go); }
  if (b.dataset.sheet) openSheet(b.dataset.sheet, {});
  if (b.dataset.close) closeSheet();
});

/* ---------- boot ----------
   รอ window.load ก่อน เผื่อ browser/preview บางตัวโหลดสคริปต์ไม่เรียงลำดับ */
function boot() {
  KB.boot();
  document.body.classList.toggle("th", LANG === "th");
  const st = document.createElement("style");
  st.textContent = Object.values(SCREENS).map(s => s.css || "").join("\n");
  document.head.appendChild(st);
  go("s1");
}
if (document.readyState === "complete") boot();
else window.addEventListener("load", boot);
