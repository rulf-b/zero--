const fs = require('fs');
const path = require('path');

// Tüm sayfalardaki telefon numaralarını dinamik hale getirecek script
const updateAllPhoneNumbers = () => {
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
    // Eğer zaten site settings kullanılıyorsa skip et
    if (content.includes('siteSettings?.phone')) {
      return content;
    }

    // useState ve useEffect import'larını kontrol et
    if (content.includes('useState') && !content.includes('useEffect')) {
      content = content.replace(
        /'react';/g,
        match => match.replace("'react'", "'react'").replace('useState', 'useState, useEffect')
      );
    } else if (!content.includes('useState') && !content.includes('useEffect')) {
      content = content.replace(
        /from 'react';/g,
        "from 'react';"
      );
      // React import ekle
      if (!content.includes("import") || !content.includes("'react'")) {
        content = "import { useState, useEffect } from 'react';\\n" + content;
      }
    }

    // siteSettings state'ini ekle
    if (!content.includes('siteSettings, setSiteSettings')) {
      const statePattern = /const \[([^,]+),\s*set[^\]]*\] = useState/;
      const stateMatch = content.match(statePattern);
      if (stateMatch) {
        const afterState = content.indexOf('];', content.indexOf(stateMatch[0])) + 2;
        content = content.slice(0, afterState) + 
          '\\n  const [siteSettings, setSiteSettings] = useState<any>(null);\\n' +
          content.slice(afterState);
      } else {
        // useState kullanılmıyorsa function component içine ekle
        const functionMatch = content.match(/const \w+Page = \(\) => \{/);
        if (functionMatch) {
          const afterFunction = content.indexOf('{', content.indexOf(functionMatch[0])) + 1;
          content = content.slice(0, afterFunction) + 
            '\\n  const [siteSettings, setSiteSettings] = useState<any>(null);\\n' +
            content.slice(afterFunction);
        }
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

  // Tüm .tsx dosyalarını bul ve güncelle
  const findAndUpdateTsxFiles = (dir) => {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        findAndUpdateTsxFiles(itemPath);
      } else if (item.endsWith('.tsx') && item !== 'layout.tsx') {
        try {
          let content = fs.readFileSync(itemPath, 'utf8');
          let hasChanges = false;
          
          // Telefon numaralarını kontrol et ve güncelle
          replacements.forEach(replacement => {
            if (replacement.find.test(content)) {
              content = content.replace(replacement.find, replacement.replace);
              hasChanges = true;
            }
          });

          if (hasChanges) {
            // Import ve state'leri ekle
            content = addImportsAndState(content, itemPath);
            
            fs.writeFileSync(itemPath, content, 'utf8');
            const relativePath = path.relative(process.cwd(), itemPath);
            console.log(`✅ ${relativePath} güncellendi`);
          }
        } catch (error) {
          const relativePath = path.relative(process.cwd(), itemPath);
          console.error(`❌ ${relativePath} güncellenirken hata:`, error.message);
        }
      }
    });
  };

  // app dizinini tara
  const appDir = path.join(__dirname, 'app');
  
  if (!fs.existsSync(appDir)) {
    console.log('App dizini bulunamadı');
    return;
  }

  console.log('Tüm sayfalar taranıyor ve telefon numaraları güncelleniyor...');
  findAndUpdateTsxFiles(appDir);
  
  console.log('\\n🎉 Tüm sayfalardaki telefon numarası güncellemesi tamamlandı!');
};

// Script'i çalıştır
updateAllPhoneNumbers();
