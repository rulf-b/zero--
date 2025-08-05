const fs = require('fs');
const path = require('path');

// Tüm marka konum sayfalarında telefon numaralarını güncelle
function updateAllBrandLocationPages() {
  const brandsPath = path.join(__dirname, 'app', 'markalar');
  
  if (!fs.existsSync(brandsPath)) {
    console.log('Markalar klasörü bulunamadı');
    return;
  }

  const brands = fs.readdirSync(brandsPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log(`${brands.length} marka bulundu`);

  let totalUpdated = 0;

  brands.forEach(brand => {
    const brandPath = path.join(brandsPath, brand);
    
    // İstanbul klasörü var mı kontrol et
    const istanbulPath = path.join(brandPath, 'istanbul');
    if (!fs.existsSync(istanbulPath)) {
      return;
    }

    const districts = fs.readdirSync(istanbulPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    console.log(`\n${brand.toUpperCase()}: ${districts.length} konum sayfası`);

    districts.forEach(district => {
      const pagePath = path.join(istanbulPath, district, 'page.tsx');
      
      if (fs.existsSync(pagePath)) {
        try {
          let content = fs.readFileSync(pagePath, 'utf8');
          let modified = false;

          // Eski telefon numaralarını bul ve değiştir
          const phoneReplacements = [
            { old: /\+90 555 123 4567/g, new: '{siteSettings?.phone || \'+90 552 558 79 05\'}' },
            { old: /0555 123 45 67/g, new: '{siteSettings?.phone || \'+90 552 558 79 05\'}' },
            { old: /\+90 555 123 45 67/g, new: '{siteSettings?.phone || \'+90 552 558 79 05\'}' },
            { old: /555\s*123\s*4567/g, new: '{siteSettings?.phone || \'+90 552 558 79 05\'}' },
            { old: /555\s*123\s*45\s*67/g, new: '{siteSettings?.phone || \'+90 552 558 79 05\'}' }
          ];

          phoneReplacements.forEach(replacement => {
            if (replacement.old.test(content)) {
              content = content.replace(replacement.old, replacement.new);
              modified = true;
            }
          });

          // Statik numaraları HTML içinde değiştir
          if (content.includes('>+90 555 123 4567<')) {
            content = content.replace(/>[\+]?90\s*555\s*123\s*\d+</g, '>{siteSettings?.phone || \'+90 552 558 79 05\'}<');
            modified = true;
          }

          // siteSettings import'u yoksa ekle
          if (modified && !content.includes('siteSettings')) {
            // React import'unu kontrol et ve güncelle
            if (content.includes("from 'react'")) {
              content = content.replace(
                /import.*from 'react';/,
                "import { useEffect, useState } from 'react';"
              );
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

          if (modified) {
            fs.writeFileSync(pagePath, content, 'utf8');
            console.log(`  ✅ ${district}`);
            totalUpdated++;
          }
        } catch (error) {
          console.error(`  ❌ ${district}: ${error.message}`);
        }
      }
    });
  });

  console.log(`\n🎉 Toplam ${totalUpdated} sayfa güncellendi!`);
}

// Çalıştır
updateAllBrandLocationPages();
