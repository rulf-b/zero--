const fs = require('fs');

const tvScreens = JSON.parse(fs.readFileSync('./data/tv-screens.json', 'utf8'));
const jvcModels = tvScreens
  .filter(item => item.brand === 'JVC')
  .map(item => item.model)
  .filter((model, index, self) => self.indexOf(model) === index)
  .sort();

console.log('JVC Modelleri:');
jvcModels.forEach(model => console.log(model));
console.log(`\nToplam ${jvcModels.length} JVC model bulundu.`);
