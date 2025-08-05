"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Search, Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import StatsSection from '@/components/StatsSection';

const MarkalarsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data));
  }, []);

  const brands = [
    { name: 'Samsung', slug: 'samsung', description: 'Samsung TV Tamiri ve Ekran Değişimi', logo: 'samsung.svg' },
    { name: 'LG', slug: 'lg', description: 'LG TV Tamiri ve Ekran Değişimi', logo: 'lg.svg' },
    { name: 'Sony', slug: 'sony', description: 'Sony TV Tamiri ve Ekran Değişimi', logo: 'sony.svg' },
    { name: 'Vestel', slug: 'vestel', description: 'Vestel TV Tamiri ve Ekran Değişimi', logo: 'vestel.svg' },
    { name: 'Arçelik', slug: 'arcelik', description: 'Arçelik TV Tamiri ve Ekran Değişimi', logo: 'arcelik.svg' },
    { name: 'Beko', slug: 'beko', description: 'Beko TV Tamiri ve Ekran Değişimi', logo: 'beko.svg' },
    { name: 'Grundig', slug: 'grundig', description: 'Grundig TV Tamiri ve Ekran Değişimi', logo: 'grundig.svg' },
    { name: 'Hisense', slug: 'hisense', description: 'Hisense TV Tamiri ve Ekran Değişimi', logo: 'hisense.svg' },
    { name: 'Panasonic', slug: 'panasonic', description: 'Panasonic TV Tamiri ve Ekran Değişimi', logo: 'panasonic.svg' },
    { name: 'Philips', slug: 'philips', description: 'Philips TV Tamiri ve Ekran Değişimi', logo: 'philips.png' },
    { name: 'TCL', slug: 'tcl', description: 'TCL TV Tamiri ve Ekran Değişimi', logo: 'tcl.svg' },
    { name: 'Toshiba', slug: 'toshiba', description: 'Toshiba TV Tamiri ve Ekran Değişimi', logo: 'toshiba.svg' },
    { name: 'Xiaomi', slug: 'xiaomi', description: 'Xiaomi TV Tamiri ve Ekran Değişimi', logo: 'xiaomi.svg' },
    { name: 'JVC', slug: 'jvc', description: 'JVC TV Tamiri ve Ekran Değişimi', logo: 'jvc.svg' },
    { name: 'Hi-Level', slug: 'hi-level', description: 'Hi-Level TV Tamiri ve Ekran Değişimi', logo: 'hi-level.svg' },
    { name: 'Finlux', slug: 'finlux', description: 'Finlux TV Tamiri ve Ekran Değişimi', logo: 'finlux.svg' },
    { name: 'Profilo', slug: 'profilo', description: 'Profilo TV Tamiri ve Ekran Değişimi', logo: 'profilo.png' },
    { name: 'Regal', slug: 'regal', description: 'Regal TV Tamiri ve Ekran Değişimi', logo: 'regal.svg' },
    { name: 'Telefunken', slug: 'telefunken', description: 'Telefunken TV Tamiri ve Ekran Değişimi', logo: 'telefunken.png' },
    { name: 'Sunny', slug: 'sunny', description: 'Sunny TV Tamiri ve Ekran Değişimi', logo: 'sunny.svg' },
    { name: 'Axen', slug: 'axen', description: 'Axen TV Tamiri ve Ekran Değişimi', logo: 'axen.png' },
    { name: 'Next', slug: 'next', description: 'Next TV Tamiri ve Ekran Değişimi', logo: 'next.svg' },
    { name: 'Awox', slug: 'awox', description: 'Awox TV Tamiri ve Ekran Değişimi', logo: 'awox.svg' },
    { name: 'Botech', slug: 'botech', description: 'Botech TV Tamiri ve Ekran Değişimi', logo: 'botech.png' }
  ];

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              TV <span className="text-blue-600">Markaları</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Tüm TV markaları için profesyonel tamir ve ekran değişimi hizmetleri. 
              Orijinal parça garantisi ile aynı gün servis imkanı.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Marka ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="max-w-4xl mx-auto">
              <StatsSection />
            </div>
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBrands.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aradığınız marka bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {filteredBrands.map((brand) => (
                <Link 
                  key={brand.slug}
                  href={`/markalar/${brand.slug}`}
                  className="group block p-6 bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg rounded-xl transition-all duration-300 text-center"
                >
                  <div className="mb-4 h-16 flex items-center justify-center">
                    <Image 
                      src={`/marka_logo/${brand.logo}`} 
                      alt={`${brand.name} Logo`} 
                      width={80} 
                      height={50} 
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{brand.description}</p>
                  <div className="flex items-center justify-center space-x-1 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>Tamir Edilebilir</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tüm Markalar İçin <span className="text-blue-600">Hizmetlerimiz</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Her marka için özel çözümler ve orijinal parça garantisi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ekran Tamiri</h3>
              <p className="text-sm text-gray-600">Kırık, çizik ve renk bozukluğu tamiri</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Parça</h3>
              <p className="text-sm text-gray-600">Sadece orijinal ve kaliteli parçalar</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hızlı Servis</h3>
              <p className="text-sm text-gray-600">Aynı gün tamir imkanı</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">Kapsamlı garanti süresi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            TV'niz Hangi Marka Olursa Olsun
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Uzman teknisyenlerimiz tüm markaları tamir edebilir. 
            Ücretsiz keşif ve teklif için hemen iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ucretsiz-teklif">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Ücretsiz Teklif Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" variant="outline" className="border-white text-blue-600 hover:bg-white hover:text-blue-600 px-8">
                <Phone className="w-5 h-5 mr-2" />
                Hemen Ara
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarkalarsPage;
