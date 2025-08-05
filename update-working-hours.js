const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const fs = require('fs');
const path = require('path');

// Tüm dosyalarda "Pazartesi-Pazar 08:00-22:00" bulunan dosyaları bul (Windows uyumlu)
const findFilesWithStaticHours = (dir = 'app/brands') => {
  let results = [];
  
  const scanDirectory = (directory) => {
    try {
      const items = fs.readdirSync(directory);
      
      for (const item of items) {
        const fullPath = path.join(directory, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath);
        } else if (item.endsWith('.tsx')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf-8');
            if (content.includes('Pazartesi-Pazar 08:00-22:00')) {
              results.push(fullPath);
            }
          } catch (error) {
            // Dosya okunamadı, atla
          }
        }
      }
    } catch (error) {
      // Dizin okunamadı, atla
    }
  };
  
  scanDirectory(dir);
  return results;
};

// Dosyayı güncelle
const updateFile = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // useState hook'unu kontrol et
    if (!content.includes('setSiteSettings')) {
      // siteSettings state'ini ekle
      const stateRegex = /const \[([^,]+), set[^]]+\] = useState<any>\(null\);/;
      const stateMatch = content.match(stateRegex);
      
      if (stateMatch) {
        const lastStateIndex = content.lastIndexOf(stateMatch[0]);
        const insertPoint = lastStateIndex + stateMatch[0].length;
        const newState = '\n  const [siteSettings, setSiteSettings] = useState<any>(null);';
        content = content.slice(0, insertPoint) + newState + content.slice(insertPoint);
      }
    }
    
    // formatWorkingHours fonksiyonunu ekle
    if (!content.includes('formatWorkingHours')) {
      const functionCode = `
  const formatWorkingHours = (workingHours: any) => {
    if (!workingHours || !Array.isArray(workingHours)) {
      return 'Pazartesi-Pazar 08:00-22:00';
    }
    
    const weekdays = workingHours.filter(w => !['Cumartesi', 'Pazar'].includes(w.day));
    const saturday = workingHours.find(w => w.day === 'Cumartesi');
    const sunday = workingHours.find(w => w.day === 'Pazar');
    
    if (weekdays.length > 0 && weekdays.every(w => w.hours === weekdays[0].hours)) {
      let result = \`Pazartesi-Cuma \${weekdays[0].hours}\`;
      if (saturday && saturday.hours !== 'Kapalı') {
        result += \`, Cumartesi \${saturday.hours}\`;
      }
      if (sunday && sunday.hours !== 'Kapalı') {
        result += \`, Pazar \${sunday.hours}\`;
      } else if (saturday && saturday.hours === 'Kapalı') {
        // Pazar kapalı, Cumartesi de kapalıysa
      } else {
        result += ', Pazar Kapalı';
      }
      return result;
    }
    
    return workingHours.map(w => \`\${w.day} \${w.hours}\`).join(', ');
  };
`;
      
      const useEffectIndex = content.indexOf('useEffect(');
      if (useEffectIndex > -1) {
        content = content.slice(0, useEffectIndex) + functionCode + '\n  ' + content.slice(useEffectIndex);
      }
    }
    
    // API çağrısını ekle
    if (!content.includes("fetch('/api/site-settings')")) {
      const apiCallCode = `
    
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data));`;
      
      const useEffectEndRegex = /\}\);[\s]*\n[\s]*\}, \[\]\);/;
      const match = content.match(useEffectEndRegex);
      if (match) {
        const insertPoint = content.indexOf(match[0]);
        const beforeEnd = content.slice(0, insertPoint);
        const endPart = content.slice(insertPoint);
        content = beforeEnd + apiCallCode + '\n  ' + endPart;
      }
    }
    
    // Hardcoded mesai saatlerini değiştir
    content = content.replace(
      /<p className="text-sm text-gray-600">Pazartesi-Pazar 08:00-22:00<\/p>/g,
      '<p className="text-sm text-gray-600">{formatWorkingHours(siteSettings?.workingHours)}</p>'
    );
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated: ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
};

// Ana işlem
const files = findFilesWithStaticHours();
console.log(`Found ${files.length} files to update`);

files.forEach(file => {
  updateFile(file);
});

console.log('Update completed!');
