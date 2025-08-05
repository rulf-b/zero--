const fs = require('fs');

// tv-screens.json dosyasını oku
const tvScreens = JSON.parse(fs.readFileSync('./data/tv-screens.json', 'utf8'));

// Hi-Level modellerini filtrele
const hiLevelModels = tvScreens
  .filter(item => item.brand === 'Hi-Level')
  .map(item => item.model);

console.log('Hi-Level modelleri:', hiLevelModels);
console.log('Toplam model sayısı:', hiLevelModels.length);
