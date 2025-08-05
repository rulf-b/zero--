const fs = require('fs');
const path = require('path');

// Location sayfalarında siteSettings ekleyen script
function fixLocationPages() {
  const locationsDir = 'app/markalar';
  
  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.name === 'page.tsx' && fullPath.includes('/istanbul/')) {
        fixPageFile(fullPath);
      }
    }
  }
  
  function fixPageFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Eğer siteSettings kullanılıyor ama state tanımlanmamışsa
      if (content.includes('siteSettings?.') && !content.includes('setSiteSettings')) {
        console.log(`Düzeltiliyor: ${filePath}`);
        
        // useState import'unu kontrol et
        if (!content.includes('import { useEffect, useState }')) {
          content = content.replace(
            'import { useEffect }',
            'import { useEffect, useState }'
          );
        }
        
        // Component function'ını bul ve siteSettings state'ini ekle
        const componentMatch = content.match(/(const \w+Page = \(\) => \{\s*)(const \[mounted)/);
        if (componentMatch) {
          const newContent = content.replace(
            componentMatch[0],
            componentMatch[1] + 'const [siteSettings, setSiteSettings] = useState<any>(null);\n  ' + componentMatch[2]
          );
          
          // useEffect'teki syntax hatalarını düzelt
          let fixedContent = newContent.replace(
            /useEffect\(\(\) => \{\s*setMounted\(true\);\s*fetch\('\/api\/prices'\)[\s\S]*?\}\s*\)\s*\}\);[\s\S]*?\}, \[\]\);/g,
            `useEffect(() => {
    setMounted(true);
    fetch('/api/prices')
      .then(res => res.json())
      .then(data => {
        const brandName = Object.keys(data)[0];
        if (brandName && data[brandName]) {
          setPrices(data[brandName]);
        }
      })
      .catch(err => console.error('Fiyatlar yüklenemedi:', err));
    
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data))
      .catch(err => console.error('Site ayarları yüklenemedi:', err));
  }, []);`
          );
          
          fs.writeFileSync(filePath, fixedContent, 'utf8');
          console.log(`✅ Düzeltildi: ${filePath}`);
        }
      }
    } catch (error) {
      console.error(`❌ Hata: ${filePath}`, error.message);
    }
  }
  
  scanDirectory(locationsDir);
  console.log('Location sayfaları düzeltme işlemi tamamlandı!');
}

fixLocationPages();
