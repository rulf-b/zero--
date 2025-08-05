const fs = require('fs');

// tv-screens.json dosyasını oku
const tvScreens = JSON.parse(fs.readFileSync('./data/tv-screens.json', 'utf8'));

// Arçelik modellerini filtrele
const arcelikModels = tvScreens
  .filter(item => item.brand === 'Arçelik')
  .map(item => item.model);

console.log('Arçelik modelleri:', arcelikModels);
console.log('Toplam model sayısı:', arcelikModels.length);
