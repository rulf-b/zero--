const fs = require('fs');

// tv-screens.json dosyasını oku
const tvScreens = JSON.parse(fs.readFileSync('./data/tv-screens.json', 'utf8'));

// Hisense modellerini filtrele
const hisenseModels = tvScreens
  .filter(item => item.brand === 'Hisense')
  .map(item => item.model);

console.log('Hisense modelleri:', hisenseModels);
console.log('Toplam model sayısı:', hisenseModels.length);

// brands.json dosyasını oku
const brands = JSON.parse(fs.readFileSync('./data/brands.json', 'utf8'));

// Hisense markası var mı kontrol et
const hisenseIndex = brands.findIndex(brand => brand.name === 'Hisense');

if (hisenseIndex === -1) {
  // Hisense markası yoksa ekle
  brands.push({
    "name": "Hisense",
    "models": hisenseModels,
    "logo": "/brands/placeholder.svg"
  });
  console.log('Hisense markası brands.json dosyasına eklendi.');
} else {
  // Hisense markası varsa modellerini güncelle
  brands[hisenseIndex].models = hisenseModels;
  console.log('Hisense modelları güncellendi.');
}

// brands.json dosyasını güncelle
fs.writeFileSync('./data/brands.json', JSON.stringify(brands, null, 2));
console.log('brands.json dosyası güncellendi.');
