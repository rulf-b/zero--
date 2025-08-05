"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Search, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const HisensePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 12;

  const districts = [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Ataşehir', 'Maltepe',
    'Pendik', 'Kartal', 'Ümraniye', 'Üsküdar', 'Fatih', 'Beyoğlu'
  ];

  const hisenseModels = [
    "32A4BG",
    "40A4BG",
    "43A4BG",
    "50A4BG",
    "55A4BG",
    "32A5K",
    "40A5K",
    "43A5K",
    "50A5K",
    "55A5K",
    "65A5K",
    "43A6K",
    "50A6K",
    "55A6K",
    "65A6K",
    "75A6K",
    "43A7K",
    "50A7K",
    "55A7K",
    "65A7K",
    "75A7K",
    "55U7K",
    "65U7K",
    "75U7K",
    "85U7K",
    "55U8K",
    "65U8K",
    "75U8K",
    "85U8K",
    "32A4H",
    "40A4H",
    "43A4H",
    "50A4H",
    "55A4H",
    "32A5H",
    "40A5H",
    "43A5H",
    "50A5H",
    "55A5H",
    "65A5H",
    "43A6H",
    "50A6H",
    "55A6H",
    "65A6H",
    "75A6H",
    "43A7H",
    "50A7H",
    "55A7H",
    "65A7H",
    "75A7H",
    "55U7H",
    "65U7H",
    "75U7H",
    "85U7H",
    "55U8H",
    "65U8H",
    "75U8H",
    "85U8H"
  ];

  const filteredModels = hisenseModels.filter(model =>
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

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image src="/marka_logo/hisense.svg" alt="Hisense Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Hisense</span> TV Tamiri İstanbul
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              İstanbul genelinde Hisense TV ekran tamiri ve değişimi. Aynı gün servis, orijinal parça, 12 ay garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=Hisense">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Hisense TV Teklifi Al
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
            İstanbul Hisense TV <span className="text-blue-600">Servis Hizmetleri</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Parça</h3>
              <p className="text-sm text-gray-600">Sadece Hisense orijinal yedek parçaları</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Aynı Gün Servis</h3>
              <p className="text-sm text-gray-600">Hisense TV için aynı gün tamiri</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">İstanbul Geneli</h3>
              <p className="text-sm text-gray-600">Tüm ilçelerde Hisense servisi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">Hisense tamirinde tam garanti</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hisense TV Tamiri Hakkında</h3>
            <p className="text-gray-600 mb-4">
              Hisense televizyonunuzda meydana gelen ekran kırılması, arka aydınlatma sorunu, 
              renk bozukluğu ve tüm teknik arızalar için İstanbul genelinde hizmet vermekteyiz.
            </p>
            <p className="text-gray-600">
              Uzman teknisyen kadromuz ve orijinal Hisense yedek parçalarımız ile 
              TV'nizin en kısa sürede tamirini gerçekleştiriyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Tamir Ettiğimiz <span className="text-blue-600">Hisense TV Modelleri</span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {hisenseModels.length} farklı Hisense TV modelinde uzman servis hizmeti
          </p>

          {/* Model Arama */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Model ara (örn: 55A7K)..."
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
                href={`/markalar/hisense/${createModelSlug(model)}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <Monitor className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">Hisense {model}</h3>
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
                        window.location.href = `/ucretsiz-teklif?marka=Hisense&model=${encodeURIComponent(model)}`;
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
                Aradığınız model bulunamadı. Tüm Hisense TV modelleri için servis hizmeti vermekteyiz.
              </p>
            ) : null}
          </div>

          {filteredModels.length === 0 && searchTerm && (
            <div className="bg-blue-50 p-6 rounded-lg text-center mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Model Bulunamadı?</h3>
              <p className="text-gray-600 mb-4">
                Tüm Hisense TV modelleri için servis hizmeti vermekteyiz. 
                Modeliniz listede olmasa bile size yardımcı olabiliriz.
              </p>
              <Link href="/ucretsiz-teklif?marka=Hisense">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Teklif Al
                </Button>
              </Link>
            </div>
          )}

          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600 mb-4">
              Listede olmayan tüm Hisense TV modelleri için de profesyonel tamir hizmeti sunuyoruz. 
              TV modelinizi bilmiyorsanız da endişelenmeyin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=Hisense">
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
            Hisense TV Tamiri <span className="text-blue-600">Popüler İlçeler</span>
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
                  <p className="text-sm text-gray-600 mt-1">Hisense TV Tamiri</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Listelenen ilçelerde yakında Hisense servisi başlatılacaktır.</p>
            <Link href="/ucretsiz-teklif?marka=Hisense">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Hisense TV Teklifi Al
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HisensePage;
