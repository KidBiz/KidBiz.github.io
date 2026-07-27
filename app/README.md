# KidFinance

An interactive prototype of a money-habit app for teenagers (13–18) **and their parents**, built as the companion tool to a four-day finance camp.

Plain HTML, CSS and JavaScript. No build step, no dependencies, no framework — open `index.html` and it runs, including offline.

**Live demo:** _(add your GitHub Pages URL here once Pages is enabled)_

---

## What it is

Most money apps for young people show a balance that goes up. This one starts from the opposite premise: the first screen shows **what it actually costs to be you**, and how much of that you cover yourself. Money from a parent is a family expense, not the child's income — showing a positive balance on day one teaches the wrong category.

Everything shareable is expressed as a **percentage**, never an amount, so a teenager with ฿500 and one with ฿5,000 play the same game. Progress is always measured against your own past, never against a classmate.

### The screens

| | Screen | What it does |
|---|---|---|
| **S1** | Cost Covered | A meter filling toward 100% of your real living cost · **two goals only** — cover one bill your parents pay, and cover everything |
| **S2** | What happens if I buy this? | Turns a price into felt units: share of what you have, hours of your own work, days of a bill it could have paid. A recurring purchase visibly deepens the hole, permanently |
| **S2b** | Borrow (simulated) | Take a simulated loan: money now, a weekly repayment that becomes a new daily cost, and the hole deeper for it. Pay it off early and watch it come back |
| **S2c** | Lessons | Day 1–4 cards, locked until the day arrives — lesson, features unlocked, the child's mission, **the parent's mission**, and the research behind it |
| **S3** | I earned | Log income across four kinds of work · picking a past day is one tap, because backfilling is the normal mode |
| **S3b** | Nice one | The moment after saving: this money pays your phone bill for **16 days**. ฿160 sounds small; 16 days doesn't |
| **S4** | Envelopes | Four envelopes filling and emptying · you set the split and must write down why you changed it |
| **S5** | Weekly Card | Two modes — a five-minute guided fill-in before class, and the summary you open in class. Class mode hides every amount |
| **S6** | For parents | Confirm income, pick the small goal, track your own behaviour — parents can confirm but can never edit what their child recorded |
| **S7** | Progress | Day one vs. now · **course certificate for everyone who finishes** · medals tied to the two goals · a share card checked for leaked amounts |

Both languages ship together. **English is the default**; the EN / ไทย toggle sits in the top bar.

---

## Running it

Double-click `index.html`. That's it.

If your browser restricts `file://`, serve the folder over HTTP with any static server and open the address it prints.

On a wide screen you get a phone frame plus a side panel explaining the design rule behind whichever screen you're on. On a narrow screen it goes full-bleed.

Fonts load from Google Fonts and fall back to system faces when offline — the layout is unaffected.

There is a **Reset demo data** button in the side panel (or call `KB.reset()` from the console).

---

## How the code is organised

The layout optimises for **cheap iteration**, not for tidiness. The expensive part of prototyping is reading a file before you change it, so each screen is its own file and carries its own CSS. Changing one screen means opening ~180 lines, not the whole app.

| File | Responsibility |
|---|---|
| `tokens.css` | Colours, fonts, type scale, radii — all branding lives here |
| `app.css` | Phone shell and shared components (buttons, cards, forms, sheets) |
| `icons.js` | The icon set |
| `icon.svg` | The app icon — the meter motif, reduced |
| `data.js` | Every demo number, every metric formula, and the two i18n helpers |
| `s1.js` … `s7.js` | One screen each — markup, screen-specific CSS, and event handlers. `s2b`, `s2c` and `s3b` follow the spec's own numbering |
| `app.js` | Router, tabs, bottom sheets, toasts, language switching |
| `index.html` | Shell and script order |

**Please keep the split.** Consolidating these files would make every small change expensive.

### State

Real state, held in `localStorage` (`kfapp` for data, `kflang` for language). Log some income and every screen updates — the numbers are computed live from the formulas in `data.js`, not hardcoded. The demo figures represent a child three weeks into the programme.

### Two languages

Strings live **next to where they're used**, deliberately not in a separate dictionary, so editing one screen's copy means reading one file:

```js
L("Covered by me", "หาเองได้")        // in screen files
LT({ en: "Food", th: "ค่าอาหาร" })     // for data in data.js
```

A third language would need this reworked into a dictionary.

Thai copy is written from the family's point of view rather than the product's — plain words a 15-year-old or a parent would actually use.

### Icons

Around 35 hand-drawn line icons in `icons.js`, one consistent system: 24px grid, 1.7 stroke, round caps, and `currentColor` so a single icon works on light backgrounds, on brand colour, and on the dark share card.

```js
I("flame")        // 20px default
I("trophy", 15)   // explicit size
```

**No emoji anywhere, by design.** Emoji render differently on every operating system (some have no glyph at all and show as empty boxes) and can't be matched to a brand's colour or stroke weight.

Adding an icon: add the path to `icons.js` and call it by name. Check it reads at **15px**, not just at 27px — a flame read as a water droplet and a piggy bank read as a cloud until they were redrawn.

### Type scale

Body text is 17px, secondary 15px, and nothing goes below 13px — larger than a typical app, because half the audience is a parent aged 40–55 reading on a phone. The phone frame is 414px wide to accommodate it. Adjust the `--fs-*` set in `tokens.css` together and the proportions hold.

### One thing to watch

Every screen's CSS is injected into a single stylesheet, so **class names must be unique across files**. Prefix anything generic with the screen id — `.s1hero`, `.s2done`. A `.done` in one screen once silently restyled a list in another.

---

## Design rules worth knowing before you change anything

**The user does not keep records.** Families who already track every baht don't need this programme. Ours fill the week in from memory the night before class — so backfilling is the normal mode, not a failure state, and there is no "incomplete data" warning anywhere in the app.

**Metrics have to survive missing data.** Income and allocations are reliable (rare, memorable, parent-confirmed). Day-to-day spending never will be. So the headline numbers lean on the income side, and "times you practised the thinking" is a **count**, not a rate — a rate would need a denominator nobody can capture.

**Two goals, never a ladder.** A small goal (one bill a parent already pays) and a big one (everything). The small goal never means the parent stops paying — the child covering it means the parent carries less. Framed as a gain, never as a threat.

**The hole can get deeper.** A simulated loan or a subscription adds a real line to the daily cost, so the meter drops and stays down until it's cleared. Borrowing is never framed as a mistake; it's an experiment with a visible price.

## Not built yet

Scam radar, environment audit, practice investment portfolio, and the time machine are planned for the next round. The Money Habit Score weighting (covered 30% + followed own rule 30% + practised thinking 15% + kept it up 15% + reflected 10%) is still provisional.

---

© 2026 KidBiz. All rights reserved.
