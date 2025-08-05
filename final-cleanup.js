const fs = require('fs');
const path = require('path');

// \n syntax hatalarını tamamen temizleyecek final script
const finalCleanup = () => {
  console.log('Final temizlik başlıyor - tüm \\n syntax hataları düzeltiliyor...');

  const markalarDir = path.join(__dirname, 'app', 'markalar');
  
  if (!fs.existsSync(markalarDir)) {
    console.log('Markalar dizini bulunamadı');
    return;
  }

  const brands = fs.readdirSync(markalarDir).filter(item => {
    const itemPath = path.join(markalarDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

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
          
          // Tüm \n karakterlerini düzelt
          if (content.includes('\\n')) {
            content = content.replace(/\\\\n/g, '\n');
            hasChanges = true;
          }
          
          // return (\n ile başlayan satırları düzelt
          if (content.includes('return (\\n')) {
            content = content.replace('return (\\n', 'return (\n');
            hasChanges = true;
          }

          if (hasChanges) {
            fs.writeFileSync(pagePath, content, 'utf8');
            console.log(`✅ ${brand} model sayfası \\n hataları düzeltildi`);
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
        
        if (content.includes('\\n')) {
          content = content.replace(/\\\\n/g, '\n');
          hasChanges = true;
        }
        
        if (content.includes('return (\\n')) {
          content = content.replace('return (\\n', 'return (\n');
          hasChanges = true;
        }

        if (hasChanges) {
          fs.writeFileSync(brandPagePath, content, 'utf8');
          console.log(`✅ ${brand} ana sayfası \\n hataları düzeltildi`);
          fixedFiles++;
        }
      } catch (error) {
        console.error(`❌ ${brand} ana sayfası düzeltilirken hata:`, error.message);
      }
    }
  });

  console.log(`\\n🎉 Final temizlik tamamlandı - ${fixedFiles} dosyada \\n hataları düzeltildi!`);
};

// Script'i çalıştır
finalCleanup();
