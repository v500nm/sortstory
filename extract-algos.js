const fs = require('fs');
const path = require('path');

const algoDir = path.join(__dirname, 'lib/algoData');
const files = fs.readdirSync(algoDir).filter(f => f.endsWith('Data.ts'));

const allAlgos = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(algoDir, file), 'utf8');
  // Simple regex to find top-level keys before `{ title:` or similar
  const matches = [...content.matchAll(/['"]?([\w-]+)['"]?:\s*\{/g)];
  
  const ignore = new Set(['complexity', 'time', 'space', 'useCases', 'advantages', 'disadvantages']);
  const keys = matches.map(m => m[1]).filter(k => !ignore.has(k));
  
  if (keys.length > 0) {
    allAlgos[file.replace('Data.ts', '')] = keys;
  }
});

console.log(JSON.stringify(allAlgos, null, 2));
