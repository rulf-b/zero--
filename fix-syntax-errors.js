const fs = require('fs');
const path = require('path');

// \n syntax hatalarını ve eksik state'leri düzeltecek script
const fixSyntaxErrors = () => {
  console.log('Syntax hataları düzeltiliyor...');

  // Ana markalar dizinini tara
  const markalarDir = path.join(__dirname, 'app', 'markalar');
  
  if (!fs.existsSync(markalarDir)) {
    console.log('Markalar dizini bulunamadı');
    return;
  }

  const brands = fs.readdirSync(markalarDir).filter(item => {
    const itemPath = path.join(markalarDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  console.log(`${brands.length} marka bulundu`);

  let fixedFiles = 0;

  brands.forEach(brand => {
    const brandDir = path.join(markalarDir, brand);
    
    // [model] klasörünü kontrol et
    const modelDir = path.join(brandDir, '[model]');
    if (fs.existsSync(modelDir)) {
      const pagePath = path.join(modelDir, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        try {
          let content = fs.readFileSync(pagePath, 'utf8');
          let hasChanges = false;
          
          // \n karakterini düzelt
          if (content.includes('\\n  return (')) {
            content = content.replace('\\n  return (', '\n\n  return (');
            hasChanges = true;
          }
          
          // siteSettings state'ini ekle eğer yoksa
          if (content.includes('siteSettings?.phone') && !content.includes('[siteSettings, setSiteSettings]')) {
            // State ekle
            const statePattern = /const \[([^,]+),\s*set[^\]]*\] = useState/;
            const stateMatch = content.match(statePattern);
            if (stateMatch) {
              const afterState = content.indexOf('];', content.indexOf(stateMatch[0])) + 2;
              content = content.slice(0, afterState) + 
                '\n  const [siteSettings, setSiteSettings] = useState<any>(null);\n' +
                content.slice(afterState);
              hasChanges = true;
            }
          }

          if (hasChanges) {
            fs.writeFileSync(pagePath, content, 'utf8');
            console.log(`✅ ${brand} model sayfası düzeltildi`);
            fixedFiles++;
          }
        } catch (error) {
          console.error(`❌ ${brand} model sayfası düzeltilirken hata:`, error.message);
        }
      }
    }

    // Ana marka sayfasını da kontrol et
    const brandPagePath = path.join(brandDir, 'page.tsx');
    if (fs.existsSync(brandPagePath)) {
      try {
        let content = fs.readFileSync(brandPagePath, 'utf8');
        let hasChanges = false;
        
        // \n karakterini düzelt
        if (content.includes('\\n  return (')) {
          content = content.replace('\\n  return (', '\n\n  return (');
          hasChanges = true;
        }
        
        // siteSettings state'ini ekle eğer yoksa
        if (content.includes('siteSettings?.phone') && !content.includes('[siteSettings, setSiteSettings]')) {
          // State ekle
          const statePattern = /const \[([^,]+),\s*set[^\]]*\] = useState/;
          const stateMatch = content.match(statePattern);
          if (stateMatch) {
            const afterState = content.indexOf('];', content.indexOf(stateMatch[0])) + 2;
            content = content.slice(0, afterState) + 
              '\n  const [siteSettings, setSiteSettings] = useState<any>(null);\n' +
              content.slice(afterState);
            hasChanges = true;
          }
        }

        if (hasChanges) {
          fs.writeFileSync(brandPagePath, content, 'utf8');
          console.log(`✅ ${brand} ana sayfası düzeltildi`);
          fixedFiles++;
        }
      } catch (error) {
        console.error(`❌ ${brand} ana sayfası düzeltilirken hata:`, error.message);
      }
    }
  });

  console.log(`\n🎉 ${fixedFiles} dosya düzeltildi!`);
};

// Script'i çalıştır
fixSyntaxErrors();
