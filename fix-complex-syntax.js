const fs = require('fs');
const path = require('path');

// Karmaşık syntax hatalarını düzeltecek script
const fixComplexSyntaxErrors = () => {
  console.log('Karmaşık syntax hataları düzeltiliyor...');

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
          
          // Karmaşık telefon numarası hatalarını düzelt
          const complexPhonePattern = /\{siteSettings\?\.phone \|\| '\{siteSettings.*?\}'\}/g;
          if (complexPhonePattern.test(content)) {
            content = content.replace(complexPhonePattern, "{siteSettings?.phone || '+90 552 558 79 05'}");
            hasChanges = true;
          }
          
          // İç içe geçmiş telefon numarası patternlarını düzelt
          const nestedPhonePattern = /\{siteSettings\?\.phone \|\| '\{.*?\{.*?'0555 123 45 67'.*?\}.*?\}'\}/g;
          if (nestedPhonePattern.test(content)) {
            content = content.replace(nestedPhonePattern, "{siteSettings?.phone || '+90 552 558 79 05'}");
            hasChanges = true;
          }
          
          // Yanlış escape karakterlerini düzelt
          content = content.replace(/\\\\s/g, '\\s');
          content = content.replace(/\\\\d/g, '\\d');
          
          // Çift noktalı virgül hatalarını düzelt
          content = content.replace(/;;/g, ';');
          
          // Yanlış return statement düzenlemelerini düzelt
          const returnPattern = /return\s*\(\s*<div/;
          if (returnPattern.test(content)) {
            content = content.replace(returnPattern, 'return (\\n    <div');
          }

          if (hasChanges) {
            fs.writeFileSync(pagePath, content, 'utf8');
            console.log(`✅ ${brand} model sayfası karmaşık hatalar düzeltildi`);
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
        
        // Aynı düzeltmeleri ana sayfa için de yap
        const complexPhonePattern = /\{siteSettings\?\.phone \|\| '\{siteSettings.*?\}'\}/g;
        if (complexPhonePattern.test(content)) {
          content = content.replace(complexPhonePattern, "{siteSettings?.phone || '+90 552 558 79 05'}");
          hasChanges = true;
        }
        
        const nestedPhonePattern = /\{siteSettings\?\.phone \|\| '\{.*?\{.*?'0555 123 45 67'.*?\}.*?\}'\}/g;
        if (nestedPhonePattern.test(content)) {
          content = content.replace(nestedPhonePattern, "{siteSettings?.phone || '+90 552 558 79 05'}");
          hasChanges = true;
        }
        
        content = content.replace(/\\\\s/g, '\\s');
        content = content.replace(/\\\\d/g, '\\d');
        content = content.replace(/;;/g, ';');

        if (hasChanges) {
          fs.writeFileSync(brandPagePath, content, 'utf8');
          console.log(`✅ ${brand} ana sayfası karmaşık hatalar düzeltildi`);
          fixedFiles++;
        }
      } catch (error) {
        console.error(`❌ ${brand} ana sayfası düzeltilirken hata:`, error.message);
      }
    }
  });

  console.log(`\\n🎉 ${fixedFiles} dosyada karmaşık hatalar düzeltildi!`);
};

// Script'i çalıştır
fixComplexSyntaxErrors();
