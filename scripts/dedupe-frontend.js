const fs = require('fs');
const path = require('path');

function findFiles(dir, exts) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(filePath, exts));
    } else if (exts.some(e => filePath.endsWith(e))) {
      results.push(filePath);
    }
  });
  return results;
}

function dedupeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const len = content.length;
    if (len === 0 || len % 2 !== 0) return false;
    const half = len / 2;
    const first = content.slice(0, half);
    const second = content.slice(half);
    if (first === second) {
      fs.writeFileSync(filePath, first, 'utf8');
      console.log(`Fixed duplicate: ${filePath}`);
      return true;
    }
  } catch (err) {
    // ignore
  }
  return false;
}

const targetDir = path.join(__dirname, '..', 'frontend');
const exts = ['.js', '.jsx', '.config.js', '.css', '.json'];
const files = findFiles(targetDir, exts);
let fixed = 0;
files.forEach(f => { if (dedupeFile(f)) fixed++; });
console.log(`Done. Files checked: ${files.length}, fixed: ${fixed}`);
