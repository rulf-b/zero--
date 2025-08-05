const brands = ['samsung', 'lg', 'sony', 'vestel'];

// Türkçe URL yapısı
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

// Türkçe URL kombinasyonları
const generateTurkishPages = () => {
  const pages = [];
  
  brands.forEach(brand => {
    districts.forEach(district => {
      pages.push({
        brand: brand,
        brandName: brandNames[brand],
        district: district,
        districtName: districtNames[district],
        turkishUrl: `markalar/${brand}/istanbul/${district}`,
        englishUrl: `brands/${brand}/istanbul/${district}`,
        filePath: `app/markalar/${brand}/istanbul/${district}/page.tsx`
      });
    });
  });
  
  return pages;
};

console.log(`Total Turkish pages to create: ${brands.length * districts.length}`);
console.log('Sample Turkish combinations:');
generateTurkishPages().slice(0, 5).forEach(page => {
  console.log(`${page.brandName} ${page.districtName}: /${page.turkishUrl}`);
});

module.exports = { generateTurkishPages, brands, districts, districtNames, brandNames };
