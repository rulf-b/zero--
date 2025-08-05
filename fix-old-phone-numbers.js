const fs = require('fs');
const path = require('path');

const replacements = [
  {
    find: /\+905525587905/g,
    replace: '+905525587905'
  }
];

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    replacements.forEach(replacement => {
      if (replacement.find.test(content)) {
        content = content.replace(replacement.find, replacement.replace);
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.js'))) {
      processFile(fullPath);
    }
  }
}

// Ana dizini işle
const rootDir = __dirname;
processDirectory(rootDir);

console.log('Phone number update completed!');
