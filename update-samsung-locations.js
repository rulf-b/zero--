const fs = require('fs');
const path = require('path');

// Samsung konum sayfalarında telefon numaralarını güncelle
function updateSamsungLocationPages() {
  const basePath = path.join(__dirname, 'app', 'markalar', 'samsung', 'istanbul');
  
  if (!fs.existsSync(basePath)) {
    console.log('Samsung İstanbul klasörü bulunamadı');
    return;
  }

  const districts = fs.readdirSync(basePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`${districts.length} Samsung konum sayfası bulundu`);

  districts.forEach(district => {
    const pagePath = path.join(basePath, district, 'page.tsx');
    
    if (fs.existsSync(pagePath)) {
      try {
        let content = fs.readFileSync(pagePath, 'utf8');
        let modified = false;

        // +90 555 123 4567 numarasını değiştir
        if (content.includes('+90 555 123 4567')) {
          content = content.replace(/\+90 555 123 4567/g, '{siteSettings?.phone || \'+90 552 558 79 05\'}');
          modified = true;
        }

        // 0555 123 45 67 numarasını değiştir  
        if (content.includes('0555 123 45 67')) {
          content = content.replace(/0555 123 45 67/g, '{siteSettings?.phone || \'+90 552 558 79 05\'}');
          modified = true;
        }

        // Diğer varyasyonları da kontrol et
        const phonePatterns = [
          /555\s*123\s*4567/g,
          /555\s*123\s*45\s*67/g,
          /"[+]?90\s*555\s*123\s*\d+"/g
        ];

        phonePatterns.forEach(pattern => {
          if (pattern.test(content)) {
            content = content.replace(pattern, '"{siteSettings?.phone || \'+90 552 558 79 05\'}"');
            modified = true;
          }
        });

        // siteSettings import'u yoksa ekle
        if (modified && !content.includes('siteSettings')) {
          // useEffect ve useState import'u yoksa ekle
          if (!content.includes('useEffect') || !content.includes('useState')) {
            content = content.replace(
              /import.*from 'react';/,
              "import { useEffect, useState } from 'react';"
            );
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

        if (modified) {
          fs.writeFileSync(pagePath, content, 'utf8');
          console.log(`✅ ${district} sayfası güncellendi`);
        }
      } catch (error) {
        console.error(`❌ ${district} sayfası güncellenirken hata:`, error.message);
      }
    }
  });

  console.log('Samsung konum sayfaları güncelleme tamamlandı!');
}

// Çalıştır
updateSamsungLocationPages();
