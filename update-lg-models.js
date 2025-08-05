const fs = require('fs');

// Read LG models
const lgModels = JSON.parse(fs.readFileSync('./lg-models.json', 'utf8'));

// Read current LG page
let content = fs.readFileSync('./app/markalar/lg/page.tsx', 'utf8');

// Create LG models array string
const lgModelsString = lgModels.map(model => `    "${model}"`).join(',\n');

// Replace the array content
const newModelsArray = `  const lgModels = [
${lgModelsString}
  ];`;

// Find and replace the models array
const modelsRegex = /const lgModels = \[[\s\S]*?\];/;
content = content.replace(modelsRegex, newModelsArray);

// Write back to file
fs.writeFileSync('./app/markalar/lg/page.tsx', content);

console.log('LG models updated successfully');
