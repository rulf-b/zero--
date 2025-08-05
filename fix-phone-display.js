const fs = require('fs');
const path = require('path');

// Telefon numarası metinlerindeki ekstra '}' karakterlerini düzeltecek script
const fixPhoneDisplayText = () => {
  console.log('Telefon numarası metinlerindeki ekstra karakter hataları düzeltiliyor...');

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
          
          // Telefon numarası metnindeki ekstra '}' karakterlerini düzelt
          if (content.includes("|| '0555 123 45 67'}'}")) {
            content = content.replace("|| '0555 123 45 67'}'}", "|| '+90 552 558 79 05'}");
            hasChanges = true;
          }
          
          if (content.includes("|| '+90 555 123 45 67'}'}")) {
            content = content.replace("|| '+90 555 123 45 67'}'}", "|| '+90 552 558 79 05'}");
            hasChanges = true;
          }
          
          // Daha genel pattern ile ekstra '}' karakterlerini düzelt
          const extraBracePattern = /\|\| '[^']+'\}'\}/g;
          if (extraBracePattern.test(content)) {
            content = content.replace(extraBracePattern, match => {
              // Son '}' karakterini kaldır
              return match.slice(0, -1);
            });
            hasChanges = true;
          }

          if (hasChanges) {
            fs.writeFileSync(pagePath, content, 'utf8');
            console.log(`✅ ${brand} model sayfası telefon metni düzeltildi`);
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
        
        if (content.includes("|| '0555 123 45 67'}'}")) {
          content = content.replace("|| '0555 123 45 67'}'}", "|| '+90 552 558 79 05'}");
          hasChanges = true;
        }
        
        if (content.includes("|| '+90 555 123 45 67'}'}")) {
          content = content.replace("|| '+90 555 123 45 67'}'}", "|| '+90 552 558 79 05'}");
          hasChanges = true;
        }
        
        const extraBracePattern = /\|\| '[^']+'\}'\}/g;
        if (extraBracePattern.test(content)) {
          content = content.replace(extraBracePattern, match => {
            return match.slice(0, -1);
          });
          hasChanges = true;
        }

        if (hasChanges) {
          fs.writeFileSync(brandPagePath, content, 'utf8');
          console.log(`✅ ${brand} ana sayfası telefon metni düzeltildi`);
          fixedFiles++;
        }
      } catch (error) {
        console.error(`❌ ${brand} ana sayfası düzeltilirken hata:`, error.message);
      }
    }
  });

  console.log(`\\n🎉 ${fixedFiles} dosyada telefon numarası metni düzeltildi!`);
  console.log('\\n📞 Şimdi tüm telefon numaraları admin panelinden +90 552 558 79 05 olarak çekilecek!');
};

// Script'i çalıştır
fixPhoneDisplayText();
