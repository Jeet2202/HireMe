import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src', 'pages', 'Labourer');

const replacements = [
    // Verified Labourer badge in Profile
    { regex: /bg-primary text-\[#2e0349\](.*?)border-\[#e4b5ff\]/g, replace: 'bg-primary text-white$1border-white/20' },
    // Any remaining dark purples
    { regex: /text-\[#2e0349\]/g, replace: 'text-on-surface' },
    { regex: /text-\[#28084b\]/g, replace: 'text-on-surface' },
    { regex: /border-\[#e4b5ff\]/g, replace: 'border-outline-variant' },
    { regex: /bg-\[#d4b3fd\]/g, replace: 'bg-surface-container-highest' },
    // Grays
    { regex: /text-\[#7d747f\]/g, replace: 'text-on-surface-variant' },
    { regex: /text-\[#1b1c1c\]/g, replace: 'text-on-surface' },
    { regex: /border-\[#efeded\]/g, replace: 'border-outline-variant' },
    { regex: /bg-\[#efeded\]/g, replace: 'bg-surface-container-high' },
];

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            for (let r of replacements) {
                content = content.replace(r.regex, r.replace);
            }

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Cleaned purples from ${file}`);
            }
        }
    }
}

try {
    processDir(srcDir);
    console.log("Done.");
} catch(e) {
    console.error(e);
}
