const fs = require('fs');
const path = require('path');

// Eksik markalar
const extraBrands = [
  { name: 'TCL', slug: 'tcl' },
  { name: 'Philips', slug: 'philips' },
  { name: 'Panasonic', slug: 'panasonic' },
  { name: 'Hisense', slug: 'hisense' },
  { name: 'Arçelik', slug: 'arcelik' },
  { name: 'Beko', slug: 'beko' },
  { name: 'Grundig', slug: 'grundig' },
  { name: 'Finlux', slug: 'finlux' },
  { name: 'Profilo', slug: 'profilo' },
  { name: 'Regal', slug: 'regal' },
  { name: 'Telefunken', slug: 'telefunken' },
  { name: 'Toshiba', slug: 'toshiba' },
  { name: 'Xiaomi', slug: 'xiaomi' },
  { name: 'Sunny', slug: 'sunny' },
  { name: 'Hi-Level', slug: 'hi-level' },
  { name: 'Axen', slug: 'axen' },
  { name: 'Next', slug: 'next' },
  { name: 'Awox', slug: 'awox' },
  { name: 'Botech', slug: 'botech' },
  { name: 'JVC', slug: 'jvc' },
];

const createBrandPageTemplate = (brand, brandName) => {
  return `"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield } from 'lucide-react';
import Image from 'next/image';

const ${brandName.replace(/[^a-zA-Z]/g, '')}Page = () => {
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
              <Image src="/brands/placeholder.svg" alt="${brandName} Logo" width={120} height={80} className="object-contain" />
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
            İstanbul ${brandName} TV <span className="text-blue-600">Servis Hizmetleri</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Parça</h3>
              <p className="text-sm text-gray-600">Sadece ${brandName} orijinal yedek parçaları</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Aynı Gün Servis</h3>
              <p className="text-sm text-gray-600">${brandName} TV için aynı gün tamiri</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">İstanbul Geneli</h3>
              <p className="text-sm text-gray-600">Tüm ilçelerde ${brandName} servisi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">${brandName} tamirinde tam garanti</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">${brandName} TV Tamiri Hakkında</h3>
            <p className="text-gray-600 mb-4">
              ${brandName} televizyonunuzda meydana gelen ekran kırılması, arka aydınlatma sorunu, 
              renk bozukluğu ve tüm teknik arızalar için İstanbul genelinde hizmet vermekteyiz.
            </p>
            <p className="text-gray-600">
              Uzman teknisyen kadromuz ve orijinal ${brandName} yedek parçalarımız ile 
              TV'nizin en kısa sürede tamirini gerçekleştiriyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ${brandName} TV Tamiri <span className="text-blue-600">Popüler İlçeler</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {districts.map((district) => {
              const districtSlug = district.toLowerCase()
                .replace('ı', 'i').replace('ğ', 'g').replace('ü', 'u')
                .replace('ş', 's').replace('ö', 'o').replace('ç', 'c');
              
              return (
                <div
                  key={district}
                  className="block p-4 bg-white hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-900 font-medium">{district}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">${brandName} TV Tamiri</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Listelenen ilçelerde yakında ${brandName} servisi başlatılacaktır.</p>
            <Link href="/ucretsiz-teklif?marka=${brandName}">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                ${brandName} TV Teklifi Al
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ${brandName.replace(/[^a-zA-Z]/g, '')}Page;`;
};

// Eksik brand sayfalarını oluştur
extraBrands.forEach(brand => {
  const brandDir = `app/markalar/${brand.slug}`;
  const brandPath = `${brandDir}/page.tsx`;
  
  // Directory oluştur
  if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true });
  }
  
  // Sayfa oluştur
  if (!fs.existsSync(brandPath)) {
    const pageContent = createBrandPageTemplate(brand.slug, brand.name);
    fs.writeFileSync(brandPath, pageContent, 'utf8');
    console.log(`Created: ${brandPath}`);
  } else {
    console.log(`Skipped existing: ${brandPath}`);
  }
});

console.log(`Completed! Created brand pages for ${extraBrands.length} additional brands.`);
