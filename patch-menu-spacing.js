const fs = require('fs');
const p = 'client/src/styles.css';
let t = fs.readFileSync(p, 'utf8');
const reps = [
  // 1. Content-driven height: drop 100svh + flex stretch; keep hero-matching width.
  [`.menu-shell {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: min(1280px, 89%);
  text-align: center;
  padding-top: clamp(18px, 2.1vw, 24px);
  padding-bottom: 32px;
}`,
  `.menu-shell {
  width: min(1280px, 89%);
  text-align: center;
  padding-top: clamp(48px, 7vw, 72px);
  padding-bottom: clamp(56px, 7vw, 80px);
}`],
  // 3. Scroll offset: heading ~24px below the 68px nav panel bottom.
  // Placed right after the menu variant block so it lands with related rules.
  [`.menu-shell {`,
  `#menu { scroll-margin-top: 92px; }
.menu-shell {`],
  // 2. h2 -> description gap 12px (match the specific multi-line rule).
  [`.menu-heading {
  margin: 0 0 10px;`,
  `.menu-heading {
  margin: 0;`],
  [`.menu-description {
  margin: 10px auto 32px;`,
  `.menu-description {
  display: block;
  width: 100%;
  margin-inline: auto;
  margin-top: 12px;
  margin-bottom: 32px;`],
  // 1. Cap tile rows; remove flex stretch so empty space can't accumulate.
  [`  grid-template-rows: repeat(2, clamp(140px, calc((100svh - 340px) / 2), 260px));
  grid-auto-rows: minmax(0, 1fr);
  gap: 14px;
  flex: 1 1 auto;
  min-height: 0;`,
  `  grid-template-rows: repeat(2, clamp(120px, calc((100svh - 380px) / 2), 210px));
  grid-auto-rows: auto;
  gap: 14px;`],
];
let ok = true;
for (const [a, b] of reps) {
  if (!t.includes(a)) { console.log('MISS: ' + JSON.stringify(a.slice(0, 70))); ok = false; }
  else { t = t.split(a).join(b); console.log('OK: ' + JSON.stringify(a.slice(0, 70))); }
}
if (ok) { fs.writeFileSync(p, t); console.log('WROTE styles.css'); }
else { process.exit(1); }
