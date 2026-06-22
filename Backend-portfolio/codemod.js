import fs from 'fs';
import path from 'path';

const rootDir = '/Users/mac/Desktop/MY/Current-Portfolio-Deploy/Backend-portfolio';

function convertToEsModule(content) {
    let newContent = content;

    // 1. require('dotenv').config() -> import 'dotenv/config.js';
    newContent = newContent.replace(/require\(['"]dotenv['"]\)\.config\(\);?/g, "import 'dotenv/config.js';");

    // 2. const { a, b } = require('x')
    newContent = newContent.replace(/(const|let|var)\s+\{([^}]+)\}\s*=\s*require\((['"])(.*?)\3\);?/g, (match, p1, p2, p3, p4) => {
        let importPath = p4;
        if (importPath.startsWith('.') && !importPath.endsWith('.js')) importPath += '.js';
        return `import { ${p2.trim()} } from '${importPath}';`;
    });

    // 3. const x = require('y')
    newContent = newContent.replace(/(const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*require\((['"])(.*?)\3\);?/g, (match, p1, p2, p3, p4) => {
        let importPath = p4;
        if (importPath.startsWith('.') && !importPath.endsWith('.js')) importPath += '.js';
        return `import ${p2} from '${importPath}';`;
    });

    // 4. require('y')
    newContent = newContent.replace(/require\((['"])(.*?)\1\);?/g, (match, p1, p2) => {
        let importPath = p2;
        if (importPath.startsWith('.') && !importPath.endsWith('.js')) importPath += '.js';
        return `import '${importPath}';`;
    });

    // 5. module.exports = { x, y }
    newContent = newContent.replace(/module\.exports\s*=\s*\{([^}]+)\};?/g, (match, p1) => {
        return `export { ${p1.trim()} };`;
    });

    // 6. module.exports = x
    newContent = newContent.replace(/module\.exports\s*=\s*([a-zA-Z0-9_.]+);?/g, (match, p1) => {
        return `export default ${p1};`;
    });

    // 7. Remove 'use strict'
    newContent = newContent.replace(/['"]use strict['"];?\n?/g, '');

    return newContent;
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === 'codemod.js') continue;
        
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.js')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const newContent = convertToEsModule(content);
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDirectory(rootDir);
