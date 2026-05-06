import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // 1. Same-element classes
            // bg-primary ... text-on-surface -> bg-primary ... text-white
            content = content.replace(/className="([^"]*?\bbg-(?:brand-)?primary\b[^"]*?)\btext-on-surface\b/g, 'className="$1text-white');
            content = content.replace(/className="([^"]*?\btext-on-surface\b[^"]*?\bbg-(?:brand-)?primary\b)/g, (match, p1) => {
                return 'className="' + p1.replace(/\btext-on-surface\b/, 'text-white');
            });
            content = content.replace(/className="([^"]*?\bbg-black\b[^"]*?)\btext-on-surface\b/g, 'className="$1text-white');

            // 2. Immediate Child Icons (e.g. <div className="bg-primary">\n  <Icon className="text-on-surface" />)
            // We use a regex that looks across 1-3 lines max.
            let i = 0;
            while (i < 20) { // arbitrary limit to prevent infinite loops if we repeatedly replace
                let newContent = content.replace(/(\bbg-(?:brand-)?primary\b[^>]*?>\s*<[A-Z][a-zA-Z]*[^>]*?className="[^"]*?)\btext-on-surface\b/g, '$1text-white');
                if (newContent === content) break;
                content = newContent;
                i++;
            }

            // 3. Hover issues
            // Elements with hover:bg-primary or group-hover:bg-primary should change text to white on hover
            // e.g. className="... hover:bg-primary ..." -> className="... hover:bg-primary hover:text-white ..."
            content = content.replace(/className="([^"]*?hover:bg-(?:brand-)?primary(?!.*?hover:text-white|.*?hover:text-on-primary)[^"]*?)"/g, 'className="$1 hover:text-white"');
            content = content.replace(/className="([^"]*?group-hover:bg-(?:brand-)?primary(?!.*?group-hover:text-white|.*?group-hover:text-on-primary)[^"]*?)"/g, 'className="$1 group-hover:text-white"');

            // Also check for background hover on items that have text-on-surface globally (like sidebar items)
            // We already did sidebar but let's be safe.

            // 4. Any direct hardcoded fill colors or specific manual icon colors inside such elements
            // e.g. <Icon className="text-[#1a1c1d]" /> -> text-white
            content = content.replace(/(\bbg-(?:brand-)?primary\b[^>]*?>\s*<[A-Z][a-zA-Z]*[^>]*?className="[^"]*?)\btext-\[#1a1c1d\]\b/g, '$1text-white');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${file}`);
            }
        }
    }
}

try {
    processDir(srcDir);
    console.log("Done fixing icons.");
} catch(e) {
    console.error(e);
}
