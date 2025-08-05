"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Search, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const PanasonicPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 12;

  const districts = [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Ataşehir', 'Maltepe',
    'Pendik', 'Kartal', 'Ümraniye', 'Üsküdar', 'Fatih', 'Beyoğlu'
  ];
  const [siteSettings, setSiteSettings] = useState<any>(null);


  const panasonicModels = [
    "TX-32FS503E",
    "TX-40FS503E", 
    "TX-43FS503E",
    "TX-49FS503E",
    "TX-55FS503E",
    "TX-32GS352",
    "TX-40GS352",
    "TX-43GS352",
    "TX-50GS352",
    "TX-55GS352",
    "TX-32GX700",
    "TX-43GX700",
    "TX-50GX700",
    "TX-55GX700",
    "TX-65GX700",
    "TX-40HX700",
    "TX-43HX700",
    "TX-50HX700",
    "TX-55HX700",
    "TX-65HX700",
    "TX-40JX700",
    "TX-43JX700",
    "TX-50JX700",
    "TX-55JX700",
    "TX-65JX700",
    "TX-32LX700",
    "TX-43LX700",
    "TX-50LX700",
    "TX-55LX700",
    "TX-65LX700",
    "TX-32LX800",
    "TX-43LX800",
    "TX-50LX800",
    "TX-55LX800",
    "TX-65LX800",
    "TX-32MX700",
    "TX-43MX700",
    "TX-50MX700",
    "TX-55MX700",
    "TX-65MX700",
    "TX-32MX800",
    "TX-43MX800",
    "TX-50MX800",
    "TX-55MX800",
    "TX-65MX800",
    "TX-32FX600",
    "TX-40FX600",
    "TX-43FX600",
    "TX-50FX600",
    "TX-55FX600",
    "TX-65FX600",
    "TX-32FX700",
    "TX-40FX700",
    "TX-43FX700",
    "TX-50FX700",
    "TX-55FX700",
    "TX-65FX700"
  ];

  const filteredModels = panasonicModels.filter(model =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredModels.length / modelsPerPage);
  const startIndex = (currentPage - 1) * modelsPerPage;
  const endIndex = startIndex + modelsPerPage;
  const currentModels = filteredModels.slice(startIndex, endIndex);

  // Kısaltılmış pagination dizisi oluşturan fonksiyon
  const getPagination = (current: number, total: number) => {
    const delta = 2; // aktif sayfanın sağ-solunda kaç sayfa gösterilecek
    const range = [];
    const rangeWithDots = [];
    let l;
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  // Reset to page 1 when search term changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const createModelSlug = (model: string) => {
    return model.toLowerCase()
      .replace(/[^a-z0-9\s]/gi, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  
  // Site ayarlarını çek
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data))
      .catch(error => console.error('Site ayarları yüklenirken hata:', error));
  }, []);


  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image src="/marka_logo/panasonic.svg" alt="Panasonic Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Panasonic</span> TV Tamiri İstanbul
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              İstanbul genelinde Panasonic TV ekran tamiri ve değişimi. Aynı gün servis, orijinal parça, 12 ay garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=Panasonic">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Panasonic TV Teklifi Al
                </Button>
              </Link>
              <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
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
            İstanbul Panasonic TV <span className="text-blue-600">Servis Hizmetleri</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Parça</h3>
              <p className="text-sm text-gray-600">Sadece Panasonic orijinal yedek parçaları</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Aynı Gün Servis</h3>
              <p className="text-sm text-gray-600">Panasonic TV için aynı gün tamiri</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">İstanbul Geneli</h3>
              <p className="text-sm text-gray-600">Tüm ilçelerde Panasonic servisi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">Panasonic tamirinde tam garanti</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Panasonic TV Tamiri Hakkında</h3>
            <p className="text-gray-600 mb-4">
              Panasonic televizyonunuzda meydana gelen ekran kırılması, arka aydınlatma sorunu, 
              renk bozukluğu ve tüm teknik arızalar için İstanbul genelinde hizmet vermekteyiz.
            </p>
            <p className="text-gray-600">
              Uzman teknisyen kadromuz ve orijinal Panasonic yedek parçalarımız ile 
              TV'nizin en kısa sürede tamirini gerçekleştiriyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Tamir Ettiğimiz <span className="text-blue-600">Panasonic TV Modelleri</span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {panasonicModels.length} farklı Panasonic TV modelinde uzman servis hizmeti
          </p>

          {/* Model Arama */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Model ara (örn: TX-55LX700)..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Model Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {currentModels.map((model, index) => (
              <Link
                key={model}
                href={`/markalar/panasonic/${createModelSlug(model)}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <Monitor className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">Panasonic {model}</h3>
                      <p className="text-xs text-gray-600 mt-1">Ekran Tamiri Mevcut</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-green-600 font-medium">✓ Tamir Edilebilir</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/ucretsiz-teklif?marka=Panasonic&model=${encodeURIComponent(model)}`;
                      }}
                    >
                      Teklif Al
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mb-8">
              <Button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
                className="disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex space-x-1">
                {getPagination(currentPage, totalPages).map((page, index) => (
                  typeof page === 'number' ? (
                    <Button
                      key={index}
                      onClick={() => setCurrentPage(page)}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ) : (
                    <span key={index} className="px-2 py-1 text-gray-500">
                      {page}
                    </span>
                  )
                ))}
              </div>
              
              <Button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
                className="disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="text-center mb-8">
            {filteredModels.length > 0 ? (
              <p className="text-gray-600 mb-4">
                Toplam {filteredModels.length} model bulundu
              </p>
            ) : searchTerm ? (
              <p className="text-gray-600 mb-4">
                Aradığınız model bulunamadı. Tüm Panasonic TV modelleri için servis hizmeti vermekteyiz.
              </p>
            ) : null}
          </div>

          {filteredModels.length === 0 && searchTerm && (
            <div className="bg-blue-50 p-6 rounded-lg text-center mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Model Bulunamadı?</h3>
              <p className="text-gray-600 mb-4">
                Tüm Panasonic TV modelleri için servis hizmeti vermekteyiz. 
                Modeliniz listede olmasa bile size yardımcı olabiliriz.
              </p>
              <Link href="/ucretsiz-teklif?marka=Panasonic">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Teklif Al
                </Button>
              </Link>
            </div>
          )}

          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600 mb-4">
              Listede olmayan tüm Panasonic TV modelleri için de profesyonel tamir hizmeti sunuyoruz. 
              TV modelinizi bilmiyorsanız da endişelenmeyin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=Panasonic">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Hemen Teklif Al
                </Button>
              </Link>
              <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Phone className="w-4 h-4 mr-2" />
                  Ara & Danış
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Panasonic TV Tamiri <span className="text-blue-600">Popüler İlçeler</span>
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
                  <p className="text-sm text-gray-600 mt-1">Panasonic TV Tamiri</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Listelenen ilçelerde yakında Panasonic servisi başlatılacaktır.</p>
            <Link href="/ucretsiz-teklif?marka=Panasonic">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Panasonic TV Teklifi Al
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PanasonicPage;
