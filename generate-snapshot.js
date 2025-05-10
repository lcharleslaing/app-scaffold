const fs = require('fs');
const path = require('path');

const ignoreDirs = ['node_modules', 'dist', '.git', 'release'];
const alwaysInclude = ['public', 'js', 'styles', 'vercel', 'htmx', 'assets'];
const rootFiles = ['README.md', 'generate-snapshot.js', 'scaffold.js', 'package.json', '.gitignore'];

const now = new Date();
const date = now.toLocaleDateString('en-US').replace(/\//g, '-'); // MM-DD-YYYY
const time = now.toLocaleTimeString('en-US', { hour12: true }).replace(/:/g, '-').replace(/ /g, '');
const timestamp = `${date}_${time}`;

const snapshotDir = 'snapshots';
const snapshotFile = `project-snapshot-${timestamp}.md`;
const fullPath = path.join(snapshotDir, snapshotFile);

function walk(dir, depth = 0) {
  const pad = '  '.repeat(depth);
  let output = '';
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (ignoreDirs.includes(entry.name)) continue;
    if (entry.name === snapshotDir || full === __filename) continue;

    output += `${pad}- ${entry.name}\n`;
    if (entry.isDirectory()) {
      output += walk(full, depth + 1);
    }
  }

  return output;
}

function generateSnapshot() {
  if (!fs.existsSync(snapshotDir)) fs.mkdirSync(snapshotDir);

  let snapshot = '# Project Structure\n\n';

  // Include folder trees
  for (const root of alwaysInclude) {
    if (fs.existsSync(root)) {
      snapshot += `\n## ${root}\n\n`;
      snapshot += walk(root) + '\n';
    }
  }

  // Include root-level files
  snapshot += '\n## Root Files\n\n';
  for (const file of rootFiles) {
    if (fs.existsSync(file)) {
      snapshot += `- ${file}\n`;
    }
  }

  fs.writeFileSync(fullPath, snapshot, 'utf8');
  console.log(`📸 Snapshot saved: ${fullPath}`);
}

generateSnapshot();
