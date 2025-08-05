const fs = require('fs');
const path = require('path');
const { combinations } = require('./generate-pages.js');
const { generatePageTemplate } = require('./page-template.js');

async function createAllPages() {
  console.log(`Creating ${combinations.length} pages...`);
  
  let created = 0;
  let skipped = 0;
  
  for (const combo of combinations) {
    const dirPath = path.join(__dirname, combo.path);
    const filePath = path.join(dirPath, 'page.tsx');
    
    // Skip if already exists (like kadikoy)
    if (fs.existsSync(filePath)) {
      console.log(`Skipping existing: ${combo.url}`);
      skipped++;
      continue;
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Generate page content
    const pageContent = generatePageTemplate(
      combo.brand,
      combo.district,
      combo.brandName,
      combo.districtName
    );
    
    // Write file
    fs.writeFileSync(filePath, pageContent, 'utf8');
    console.log(`Created: ${combo.url}`);
    created++;
  }
  
  console.log(`\\nCompleted!`);
  console.log(`Created: ${created} pages`);
  console.log(`Skipped: ${skipped} pages`);
  console.log(`Total: ${created + skipped} pages`);
}

createAllPages().catch(console.error);
