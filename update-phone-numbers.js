const fs = require('fs');
const path = require('path');

// Telefon numaralarını dinamik hale getirecek script
const updatePhoneNumbers = () => {
  const replacements = [
    // Statik tel linklerini dinamik hale getir
    {
      find: /href="tel:\+905525587905"/g,
      replace: 'href={`tel:${siteSettings?.phone?.replace(/\\s/g, \'\') || \'+905525587905\'}`}'
    },
    {
      find: /href="tel:\+90\s*5\d{2}\s*\d{3}\s*\d{2}\s*\d{2}"/g,
      replace: 'href={`tel:${siteSettings?.phone?.replace(/\\s/g, \'\') || \'+905525587905\'}`}'
    },
    // Statik telefon numarası textlerini dinamik hale getir
    {
      find: /0555 123 45 67/g,
      replace: '{siteSettings?.phone || \'+90 552 558 79 05\'}'
    },
    {
      find: /\+90 555 123 45 67/g,
      replace: '{siteSettings?.phone || \'+90 552 558 79 05\'}'
    }
  ];

  const addImportsAndState = (content, filePath) => {
    // useState ve useEffect import'larını kontrol et
    if (!content.includes('useState') && !content.includes('useEffect')) {
      content = content.replace(
        "import { useState } from 'react';",
        "import { useState, useEffect } from 'react';"
      );
    } else if (!content.includes('useEffect')) {
      content = content.replace(
        "import { useState } from 'react';",
        "import { useState, useEffect } from 'react';"
      );
    }

    // siteSettings state'ini ekle
    if (!content.includes('siteSettings, setSiteSettings')) {
      const stateMatch = content.match(/const \[([^,]+),\s*set[^]]*?\] = useState/);
      if (stateMatch) {
        const afterState = content.indexOf('];', content.indexOf(stateMatch[0])) + 2;
        content = content.slice(0, afterState) + 
          '\\n  const [siteSettings, setSiteSettings] = useState<any>(null);\\n' +
          content.slice(afterState);
      }
    }

    // useEffect ekle
    if (!content.includes('fetch(\'/api/site-settings\')')) {
      const useEffectCode = `
  // Site ayarlarını çek
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data))
      .catch(error => console.error('Site ayarları yüklenirken hata:', error));
  }, []);
`;
      
      const returnMatch = content.match(/return\s*\(/);
      if (returnMatch) {
        const beforeReturn = content.indexOf(returnMatch[0]);
        content = content.slice(0, beforeReturn) + useEffectCode + '\\n  ' + content.slice(beforeReturn);
      }
    }

    return content;
  };

  // Ana markalar dizinini tara
  const markalarDir = path.join(__dirname, 'app', 'markalar');
  
  if (!fs.existsSync(markalarDir)) {
    console.log('Markalar dizini bulunamadı');
    return;
  }

  const brands = fs.readdirSync(markalarDir).filter(item => {
    const itemPath = path.join(markalarDir, item);
    return fs.statSync(itemPath).isDirectory() && item !== 'page.tsx';
  });

  console.log(`${brands.length} marka bulundu:`, brands);

  brands.forEach(brand => {
    const brandDir = path.join(markalarDir, brand);
    
    // [model] klasörünü kontrol et
    const modelDir = path.join(brandDir, '[model]');
    if (fs.existsSync(modelDir)) {
      const pagePath = path.join(modelDir, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        try {
          let content = fs.readFileSync(pagePath, 'utf8');
          
          // Telefon numaralarını güncelle
          replacements.forEach(replacement => {
            content = content.replace(replacement.find, replacement.replace);
          });

          // Import ve state'leri ekle
          content = addImportsAndState(content, pagePath);

          fs.writeFileSync(pagePath, content, 'utf8');
          console.log(`✅ ${brand} model sayfası güncellendi`);
        } catch (error) {
          console.error(`❌ ${brand} model sayfası güncellenirken hata:`, error.message);
        }
      }
    }

    // Ana marka sayfasını da kontrol et
    const brandPagePath = path.join(brandDir, 'page.tsx');
    if (fs.existsSync(brandPagePath)) {
      try {
        let content = fs.readFileSync(brandPagePath, 'utf8');
        
        // Telefon numaralarını güncelle
        replacements.forEach(replacement => {
          content = content.replace(replacement.find, replacement.replace);
        });

        // Import ve state'leri ekle
        content = addImportsAndState(content, brandPagePath);

        fs.writeFileSync(brandPagePath, content, 'utf8');
        console.log(`✅ ${brand} ana sayfası güncellendi`);
      } catch (error) {
        console.error(`❌ ${brand} ana sayfası güncellenirken hata:`, error.message);
      }
    }
  });

  console.log('\\n🎉 Telefon numarası güncellemesi tamamlandı!');
};

// Script'i çalıştır
updatePhoneNumbers();
