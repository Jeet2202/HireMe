import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'src');

function walkDir(dirPath, callback) {
  fs.readdirSync(dirPath).forEach(file => {
    const p = path.join(dirPath, file);
    if (fs.statSync(p).isDirectory()) walkDir(p, callback);
    else callback(p);
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.jsx') && !filePath.endsWith('.js')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replacements list
  const replacements = [
    // #391053 (Dark purple -> On Surface)
    [/text-\[\#391053\]\/[0-9]+/g, 'text-on-surface-variant'],
    [/text-\[\#391053\]/g, 'text-on-surface'],
    [/bg-\[\#391053\]/g, 'bg-on-surface'],
    [/border-\[\#391053\]/g, 'border-on-surface'],
    [/fill-\[\#391053\]/g, 'fill-on-surface'],
    [/\#391053/g, '#1a1c1d'],

    // #c9a8f1 (Light purple -> Primary / Surface Container / Outline Variant)
    [/border-\[\#c9a8f1\]\/[0-9]+/g, 'border-outline-variant'],
    [/border-\[\#c9a8f1\]/g, 'border-outline-variant'],
    [/bg-\[\#c9a8f1\]\/10/g, 'bg-surface-container'],
    [/bg-\[\#c9a8f1\]\/[0-9]+/g, 'bg-surface-container-high'],
    [/bg-\[\#c9a8f1\]/g, 'bg-primary'],
    [/text-\[\#c9a8f1\]/g, 'text-primary'],
    [/fill-\[\#c9a8f1\]\/[0-9]+/g, 'fill-surface-container-high'],
    [/fill-\[\#c9a8f1\]/g, 'fill-primary'],
    [/\#c9a8f1/g, '#000000'],

    // Other accent purples
    [/bg-\[\#e4b5ff\]\/[0-9]+/g, 'bg-surface-container-high'],
    [/bg-\[\#eedcff\]/g, 'bg-surface-container-high'],
    [/bg-\[\#d4b3fd\]\/[0-9]+/g, 'bg-surface-container-high'],
    [/text-\[\#6e5193\]/g, 'text-on-surface'],
    [/fill-\[\#6e5193\]/g, 'fill-on-surface'],
    [/\#6e5193/g, '#1a1c1d'],

    // Secondary Buttons and specific styling
    [/bg-\[\#f3f3f4\]/g, 'bg-surface-container'],
    [/border-\[\#eeeeef\]/g, 'border-outline-variant'],

    // Data Vis
    [/\#1f0033/g, '#1a1c1d'],
  ];

  for (const [regex, replacement] of replacements) {
    content = content.replace(regex, replacement);
  }

  // Also replace `text-[#1a1c1d]` on bg-primary -> text-on-primary
  content = content.replace(/bg-primary\s+text-on-surface/g, 'bg-primary text-on-primary');

  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

walkDir(dir, processFile);
