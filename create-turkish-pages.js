const fs = require('fs');
const path = require('path');
const { generateTurkishPages } = require('./generate-turkish-pages');
const { generateTurkishPageTemplate } = require('./turkish-page-template');

const createTurkishPages = () => {
  const pages = generateTurkishPages();
  
  console.log(`Creating ${pages.length} Turkish pages...`);
  
  let created = 0;
  let skipped = 0;
  
  pages.forEach(page => {
    const { brand, district, brandName, districtName, filePath } = page;
    
    // Ensure directory exists
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`Skipping existing: /markalar/${brand}/istanbul/${district}`);
      skipped++;
      return;
    }
    
    // Generate page contenttt
    const pageContent = generateTurkishPageTemplate(brand, district, brandName, districtName);
    
    // Write file
    fs.writeFileSync(filePath, pageContent, 'utf8');
    console.log(`Created: /markalar/${brand}/istanbul/${district}`);
    created++;
  });
  
  console.log(`\nCompleted!`);
  console.log(`Created: ${created} pages`);
  console.log(`Skipped: ${skipped} pages`);
  console.log(`Total: ${created + skipped} pages`);
};

// Ana markalar sayfası için template
const createMainBrandPages = () => {
  const brands = ['samsung', 'lg', 'sony', 'vestel'];
  const brandNames = {
    'samsung': 'Samsung',
    'lg': 'LG', 
    'sony': 'Sony',
    'vestel': 'Vestel'
  };

  brands.forEach(brand => {
    const brandName = brandNames[brand];
    
    // Ana marka sayfası
    const mainBrandPath = `app/markalar/${brand}/page.tsx`;
    const mainBrandDir = path.dirname(mainBrandPath);
    
    if (!fs.existsSync(mainBrandDir)) {
      fs.mkdirSync(mainBrandDir, { recursive: true });
    }
    
    if (!fs.existsSync(mainBrandPath)) {
      const mainBrandContent = `"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield } from 'lucide-react';
import Image from 'next/image';

const ${brandName}Page = () => {
  const districts = [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Ataşehir', 'Maltepe',
    'Pendik', 'Kartal', 'Ümraniye', 'Üsküdar', 'Fatih', 'Beyoğlu'
  ];

  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image src="/brands/${brand}.png" alt="${brandName} Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">${brandName}</span> TV Tamiri İstanbul
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              İstanbul genelinde ${brandName} TV ekran tamiri ve değişimi. Aynı gün servis, orijinal parça, 12 ay garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=${brandName}">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  ${brandName} TV Teklifi Al
                </Button>
              </Link>
              <a href="tel:+905525587905">
                <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
                  <Phone className="w-5 h-5 mr-2" />
                  Hemen Ara
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            İstanbul ${brandName} TV <span className="text-blue-600">Servis Bölgeleri</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {districts.map((district) => {
              const districtSlug = district.toLowerCase()
                .replace('ı', 'i').replace('ğ', 'g').replace('ü', 'u')
                .replace('ş', 's').replace('ö', 'o').replace('ç', 'c');
              
              return (
                <Link 
                  key={district}
                  href={\`/markalar/${brand}/istanbul/\${districtSlug}\`}
                  className="block p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-900 font-medium">{district}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">${brandName} TV Tamiri</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ${brandName}Page;`;

      fs.writeFileSync(mainBrandPath, mainBrandContent, 'utf8');
      console.log(`Created main brand page: /markalar/${brand}`);
    }

    // İstanbul ana sayfası
    const istanbulPath = `app/markalar/${brand}/istanbul/page.tsx`;
    const istanbulDir = path.dirname(istanbulPath);
    
    if (!fs.existsSync(istanbulDir)) {
      fs.mkdirSync(istanbulDir, { recursive: true });
    }
    
    if (!fs.existsSync(istanbulPath)) {
      const istanbulContent = `"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield } from 'lucide-react';
import Image from 'next/image';

const ${brandName}IstanbulPage = () => {
  const districts = [
    { name: 'Adalar', slug: 'adalar' },
    { name: 'Arnavutköy', slug: 'arnavutkoy' },
    { name: 'Ataşehir', slug: 'atasehir' },
    { name: 'Avcılar', slug: 'avcilar' },
    { name: 'Bağcılar', slug: 'bagcilar' },
    { name: 'Bahçelievler', slug: 'bahcelievler' },
    { name: 'Bakırköy', slug: 'bakirkoy' },
    { name: 'Başakşehir', slug: 'basaksehir' },
    { name: 'Bayrampaşa', slug: 'bayrampasa' },
    { name: 'Beşiktaş', slug: 'besiktas' },
    { name: 'Beykoz', slug: 'beykoz' },
    { name: 'Beylikdüzü', slug: 'beylikduzu' },
    { name: 'Beyoğlu', slug: 'beyoglu' },
    { name: 'Büyükçekmece', slug: 'buyukcekmece' },
    { name: 'Çatalca', slug: 'catalca' },
    { name: 'Çekmeköy', slug: 'cekmekoy' },
    { name: 'Esenler', slug: 'esenler' },
    { name: 'Esenyurt', slug: 'esenyurt' },
    { name: 'Eyüpsultan', slug: 'eyupsultan' },
    { name: 'Fatih', slug: 'fatih' },
    { name: 'Gaziosmanpaşa', slug: 'gaziosmanpasa' },
    { name: 'Güngören', slug: 'gungorent' },
    { name: 'Kadıköy', slug: 'kadikoy' },
    { name: 'Kağıthane', slug: 'kagithane' },
    { name: 'Kartal', slug: 'kartal' },
    { name: 'Küçükçekmece', slug: 'kucukcekmece' },
    { name: 'Maltepe', slug: 'maltepe' },
    { name: 'Pendik', slug: 'pendik' },
    { name: 'Sancaktepe', slug: 'sancaktepe' },
    { name: 'Sarıyer', slug: 'sariyer' },
    { name: 'Silivri', slug: 'silivri' },
    { name: 'Sultangazi', slug: 'sultangazi' },
    { name: 'Sultanbeyli', slug: 'sultanbeyli' },
    { name: 'Şile', slug: 'sile' },
    { name: 'Şişli', slug: 'sisli' },
    { name: 'Tuzla', slug: 'tuzla' },
    { name: 'Ümraniye', slug: 'umraniye' },
    { name: 'Üsküdar', slug: 'uskudar' },
    { name: 'Zeytinburnu', slug: 'zeytinburnu' }
  ];

  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image src="/brands/${brand}.png" alt="${brandName} Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">${brandName}</span> TV Tamiri İstanbul
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              İstanbul'un tüm ilçelerinde ${brandName} TV ekran tamiri ve değişimi. Aynı gün servis garantisi.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ${brandName} TV Tamiri <span className="text-blue-600">İstanbul İlçeleri</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {districts.map((district) => (
              <Link 
                key={district.slug}
                href={\`/markalar/${brand}/istanbul/\${district.slug}\`}
                className="block p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-900 font-medium">{district.name}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">${brandName} TV Servisi</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ${brandName}IstanbulPage;`;

      fs.writeFileSync(istanbulPath, istanbulContent, 'utf8');
      console.log(`Created Istanbul page: /markalar/${brand}/istanbul`);
    }
  });
};

// Markalar ana sayfası
const createMarksMainPage = () => {
  const marksMainPath = 'app/markalar/page.tsx';
  const marksMainDir = path.dirname(marksMainPath);
  
  if (!fs.existsSync(marksMainDir)) {
    fs.mkdirSync(marksMainDir, { recursive: true });
  }
  
  if (!fs.existsSync(marksMainPath)) {
    const marksMainContent = `"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield } from 'lucide-react';
import Image from 'next/image';

const MarkalarsPage = () => {
  const brands = [
    { name: 'Samsung', slug: 'samsung', description: 'Samsung TV Tamiri ve Ekran Değişimi' },
    { name: 'LG', slug: 'lg', description: 'LG TV Tamiri ve Ekran Değişimi' },
    { name: 'Sony', slug: 'sony', description: 'Sony TV Tamiri ve Ekran Değişimi' },
    { name: 'Vestel', slug: 'vestel', description: 'Vestel TV Tamiri ve Ekran Değişimi' }
  ];

  return (
    <div className="pt-20">
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              TV <span className="text-blue-600">Markalar</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Tüm TV markaları için profesyonel tamiri ve ekran değişimi hizmeti
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brands.map((brand) => (
              <Link 
                key={brand.slug}
                href={\`/markalar/\${brand.slug}\`}
                className="block p-6 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors text-center"
              >
                <div className="mb-4">
                  <Image 
                    src={\`/brands/\${brand.slug}.png\`} 
                    alt={\`\${brand.name} Logo\`} 
                    width={100} 
                    height={60} 
                    className="object-contain mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{brand.name}</h3>
                <p className="text-sm text-gray-600">{brand.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarkalarsPage;`;

    fs.writeFileSync(marksMainPath, marksMainContent, 'utf8');
    console.log('Created main brands page: /markalar');
  }
};

// Tüm sayfaları oluştur
createMarksMainPage();
createMainBrandPages();
createTurkishPages();
