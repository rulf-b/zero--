const brands = ['samsung', 'lg', 'sony', 'vestel'];
const districts = [
  'adalar', 'arnavutkoy', 'atasehir', 'avcilar', 'bagcilar', 'bahcelievler',
  'bakirkoy', 'basaksehir', 'bayrampasa', 'besiktas', 'beykoz', 'beylikduzu',
  'beyoglu', 'buyukcekmece', 'catalca', 'cekmekoy', 'esenler', 'esenyurt',
  'eyupsultan', 'fatih', 'gaziosmanpasa', 'gungorent', 'kadikoy', 'kagithane',
  'kartal', 'kucukcekmece', 'maltepe', 'pendik', 'sancaktepe', 'sariyer',
  'silivri', 'sultangazi', 'sultanbeyli', 'sile', 'sisli', 'tuzla',
  'umraniye', 'uskudar', 'zeytinburnu'
];

const districtNames = {
  'adalar': 'Adalar',
  'arnavutkoy': 'Arnavutköy', 
  'atasehir': 'Ataşehir',
  'avcilar': 'Avcılar',
  'bagcilar': 'Bağcılar',
  'bahcelievler': 'Bahçelievler',
  'bakirkoy': 'Bakırköy',
  'basaksehir': 'Başakşehir',
  'bayrampasa': 'Bayrampaşa',
  'besiktas': 'Beşiktaş',
  'beykoz': 'Beykoz',
  'beylikduzu': 'Beylikdüzü',
  'beyoglu': 'Beyoğlu',
  'buyukcekmece': 'Büyükçekmece',
  'catalca': 'Çatalca',
  'cekmekoy': 'Çekmeköy',
  'esenler': 'Esenler',
  'esenyurt': 'Esenyurt',
  'eyupsultan': 'Eyüpsultan',
  'fatih': 'Fatih',
  'gaziosmanpasa': 'Gaziosmanpaşa',
  'gungorent': 'Güngören',
  'kadikoy': 'Kadıköy',
  'kagithane': 'Kağıthane',
  'kartal': 'Kartal',
  'kucukcekmece': 'Küçükçekmece',
  'maltepe': 'Maltepe',
  'pendik': 'Pendik',
  'sancaktepe': 'Sancaktepe',
  'sariyer': 'Sarıyer',
  'silivri': 'Silivri',
  'sultangazi': 'Sultangazi',
  'sultanbeyli': 'Sultanbeyli',
  'sile': 'Şile',
  'sisli': 'Şişli',
  'tuzla': 'Tuzla',
  'umraniye': 'Ümraniye',
  'uskudar': 'Üsküdar',
  'zeytinburnu': 'Zeytinburnu'
};

const brandNames = {
  'samsung': 'Samsung',
  'lg': 'LG',
  'sony': 'Sony',
  'vestel': 'Vestel'
};

// Generate all combinations
const combinations = [];
brands.forEach(brand => {
  districts.forEach(district => {
    combinations.push({
      brand,
      district,
      brandName: brandNames[brand],
      districtName: districtNames[district],
      path: `app/brands/${brand}/istanbul/${district}`,
      url: `/brands/${brand}/istanbul/${district}`
    });
  });
});

console.log(`Total pages to create: ${combinations.length}`);
console.log('Sample combinations:');
combinations.slice(0, 5).forEach(combo => {
  console.log(`${combo.brandName} ${combo.districtName}: ${combo.url}`);
});

module.exports = { combinations, brandNames, districtNames };
