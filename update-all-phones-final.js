const fs = require('fs');
const path = require('path');

// Tüm dosyalarda kalan eski telefon numaralarını bul ve değiştir
function findAndReplacePhoneNumbers() {
  const appPath = path.join(__dirname, 'app');
  
  let totalUpdated = 0;
  let totalFiles = 0;

  function processFile(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    
    totalFiles++;
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      const originalContent = content;

      // Tüm olası eski telefon numarası formatlarını bul ve değiştir
      const phonePatterns = [
        { old: /\+90 555 123 4567/g, new: '{siteSettings?.phone || \'+90 552 558 79 05\'}' },
        { old: /0555 123 45 67/g, new: '{siteSettings?.phone || \'+90 552 558 79 05\'}' },
        { old: /\+90 555 123 45 67/g, new: '{siteSettings?.phone || \'+90 552 558 79 05\'}' },
        { old: /555 123 4567/g, new: '{siteSettings?.phone || \'+90 552 558 79 05\'}' },
        { old: /555 123 45 67/g, new: '{siteSettings?.phone || \'+90 552 558 79 05\'}' }
      ];

      phonePatterns.forEach(pattern => {
        if (pattern.old.test(content)) {
          content = content.replace(pattern.old, pattern.new);
          modified = true;
        }
      });

      // siteSettings import'u yoksa ve değişiklik yapıldıysa ekle
      if (modified && !content.includes('siteSettings')) {
        // React import'unu kontrol et
        if (content.includes("from 'react'")) {
          if (!content.includes('useState') || !content.includes('useEffect')) {
            content = content.replace(
              /import.*from 'react';/,
              "import { useEffect, useState } from 'react';"
            );
          }
        } else {
          content = "import { useEffect, useState } from 'react';\n" + content;
        }

        // Component başlangıcına siteSettings state'ini ekle
        const componentMatch = content.match(/const\s+\w+\s*=\s*\(\)\s*=>\s*\{/);
        if (componentMatch) {
          const insertIndex = content.indexOf(componentMatch[0]) + componentMatch[0].length;
          const siteSettingsCode = `
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await fetch('/api/site-settings');
        if (response.ok) {
          const settings = await response.json();
          setSiteSettings(settings);
        }
      } catch (error) {
        console.error('Site ayarları yüklenirken hata:', error);
      }
    };

    fetchSiteSettings();
  }, []);
`;
          content = content.slice(0, insertIndex) + siteSettingsCode + content.slice(insertIndex);
        }
      }

      if (modified && content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${path.relative(__dirname, filePath)}`);
        totalUpdated++;
      }
    } catch (error) {
      console.error(`❌ ${path.relative(__dirname, filePath)}: ${error.message}`);
    }
  }

  function walkDir(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        walkDir(fullPath);
      } else {
        processFile(fullPath);
      }
    });
  }

  console.log('Tüm dosyalarda eski telefon numaralarını arıyor...\n');
  
  walkDir(appPath);
  
  console.log(`\n🎉 ${totalUpdated}/${totalFiles} dosya güncellendi!`);
}

// Çalıştır
findAndReplacePhoneNumbers();
