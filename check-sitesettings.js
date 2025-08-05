const fs = require('fs');
const path = require('path');

// siteSettings kullanılan ama state tanımı olmayan dosyaları bul
function findProblematicFiles() {
  const locationsDir = 'app/markalar';
  const problematicFiles = [];
  
  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.name === 'page.tsx' && fullPath.includes('/istanbul/')) {
        checkFile(fullPath);
      }
    }
  }
  
  function checkFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // siteSettings kullanılıyor mu?
      const usesSiteSettings = content.includes('siteSettings?.');
      
      // siteSettings state tanımı var mı?
      const hasStateDefinition = content.includes('setSiteSettings');
      
      if (usesSiteSettings && !hasStateDefinition) {
        problematicFiles.push(filePath);
        console.log(`❌ Sorunlu dosya: ${filePath}`);
      } else if (usesSiteSettings && hasStateDefinition) {
        console.log(`✅ Temiz dosya: ${filePath}`);
      }
    } catch (error) {
      console.error(`Hata: ${filePath}`, error.message);
    }
  }
  
  scanDirectory(locationsDir);
  
  console.log(`\n📊 Özet:`);
  console.log(`Sorunlu dosya sayısı: ${problematicFiles.length}`);
  
  return problematicFiles;
}

findProblematicFiles();
