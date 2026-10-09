const fs = require('fs');
const p = 'client/src/styles.css';
let t = fs.readFileSync(p, 'utf8');
const a = `  .menu-tile--food-bundles { grid-row: auto; min-height: clamp(180px, 46vw, 300px); }
  .menu-description { margin: 10px auto 32px; }`;
const b = `  .menu-tile--food-bundles { grid-row: auto; min-height: clamp(180px, 46vw, 300px); }
  .menu-description { margin-top: 12px; margin-bottom: 32px; }`;
if (!t.includes(a)) { console.log('MISS mobile'); process.exit(1); }
t = t.split(a).join(b);
fs.writeFileSync(p, t);
console.log('WROTE mobile sync');
