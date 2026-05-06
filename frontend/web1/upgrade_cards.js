import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src', 'pages');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Simplify LabourerDashboard manual overrides back to card-shadow
            content = content.replace(/shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\] border border-outline-variant hover:-translate-y-2 hover:shadow-\[0_20px_40px_rgb\(0,0,0,0\.08\)\] transition-all relative z-10/g, 'border border-outline-variant card-shadow');
            content = content.replace(/shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\] border border-outline-variant flex flex-col items-center justify-center text-center relative z-10 hover:-translate-y-1 hover:shadow-\[0_15px_30px_rgb\(0,0,0,0\.06\)\] transition-all/g, 'border border-outline-variant card-shadow flex flex-col items-center justify-center text-center');
            content = content.replace(/shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\] border border-outline-variant flex flex-col justify-between relative z-10 hover:-translate-y-1 hover:shadow-\[0_15px_30px_rgb\(0,0,0,0\.06\)\] transition-all/g, 'border border-outline-variant card-shadow flex flex-col justify-between');
            content = content.replace(/shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\] border border-outline-variant h-\[400px\] flex flex-col relative z-10 hover:-translate-y-1 hover:shadow-\[0_15px_30px_rgb\(0,0,0,0\.06\)\] transition-all/g, 'border border-outline-variant card-shadow h-[400px] flex flex-col');
            content = content.replace(/shadow-\[0_8px_30px_rgb\(0,0,0,0\.3\)\] flex flex-col justify-between relative z-10 hover:-translate-y-1 hover:shadow-\[0_15px_30px_rgb\(0,0,0,0\.4\)\] transition-all/g, 'card-shadow flex flex-col justify-between');

            // Catch any standard un-updated shadow-sm instances attached to structural cards (bg-white + padding + rounded)
            content = content.replace(/bg-white([\s\w-]+)rounded-(?:xl|2xl|lg)([\s\w-]+)shadow-sm/g, 'bg-white$1rounded-2xl$2card-shadow');
            
            // For instances where it's shadow-sm followed by border
            content = content.replace(/shadow-sm border border-(?:outline-variant|secondary-container|gray-50|gray-200|gray-100)/g, 'card-shadow border border-outline-variant');
            
            // Clean up old explicit hover classes mimicking this feature. 
            content = content.replace(/card-shadow hover:-translate-y-1 transition-transform/g, 'card-shadow');
            content = content.replace(/card-shadow hover:-translate-y-1 hover:shadow-2xl transition-all relative z-10/g, 'card-shadow');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${file}`);
            }
        }
    }
}

try {
    processDir(srcDir);
    console.log("Done upgrading cards.");
} catch(e) {
    console.error(e);
}
