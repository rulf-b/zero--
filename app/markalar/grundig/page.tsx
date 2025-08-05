"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Search, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const GrundigPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const modelsPerPage = 12;

  const districts = [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Ataşehir', 'Maltepe',
    'Pendik', 'Kartal', 'Ümraniye', 'Üsküdar', 'Fatih', 'Beyoğlu'
  ];

  const grundigModels = [
    "40 GHF 6000 B",
    "40 GHF 6500 B",
    "43 GGF 6950 B",
    "43 GGU 7880 B",
    "43 GHF 6500 B",
    "43 GHU 7000 B",
    "43 GHU 7500 B",
    "43 GHU 8500 A",
    "50 GGU 7880 B",
    "50 GHU 7000 B",
    "50 GHU 7500 B",
    "50 GHU 8000",
    "50 GHU 8500 A",
    "50 GHU 9000",
    "55 GCO 9900B",
    "55 GEU 7830 B",
    "55 GGO 9900 B",
    "55 GGU 9760 A",
    "55 GHO 9700",
    "55 GHO 9900",
    "65 GCO 9900B",
    "65 GGO 9900 B",
    "65 GGU 9760 A",
    "65 GHO 9700",
    "65 GHO 9900",
    "65 GHQ 9100",
    "65 GHQ 9200",
    "65 GHQ 9500",
    "65 GHU 7000 B",
    "65 GHU 7505 B",
    "65 GHU 8000",
    "65 GHU 8500 A",
    "65 GHU 9000",
    "65 VLO 9700",
    "75 GHU 7000 B",
    "75 GHU 7505 B",
    "75 GHU 8000",
    "75 GHU 8500 A",
    "75 GHU 9000",
    "Atlanta 55 GGU 8965 B",
    "Atlanta 65 GGU 8965 B",
    "Barcelona 58 GGU 8935 B",
    "Dubai 65 GHO 9905",
    "Hamburg 32 GDH 5955B",
    "Miami 55 GGU 9765 A",
    "Monaco 55 GHQ 9550",
    "Monaco 65 GHQ 9550",
    "Monaco 65 GHQ 9550A",
    "Moskova 43 GFU 7905 W",
    "Munich 43 GFF 6970 B",
    "Münich 43 GHF 6900 B",
    "Paris 75 GHU 9055",
    "Rio 43 GHU 8900 S",
    "Rio 50 GHU 8900 S",
    "Rio 55 GHU 8900 S",
    "Rio 65 GHU 8900 S",
    "Roma 65 GGU 7905 A",
    "Tokyo 43 GHU 7900 C",
    "Tokyo 50 GHU 7900 C",
    "Tokyo 55 GHU 7905 C",
    "Tokyo 65 GHU 7905 C",
    "Tokyo 75 GHU 7905 C",
    "Toronto 32 GIH 6900"
];

  const filteredModels = grundigModels.filter(model =>
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
              <Image src="/marka_logo/grundig.svg" alt="Grundig Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Grundig</span> TV Tamiri İstanbul
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              İstanbul genelinde Grundig TV ekran tamiri ve değişimi. Aynı gün servis, orijinal parça, 12 ay garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=Grundig">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Grundig TV Teklifi Al
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
            İstanbul Grundig TV <span className="text-blue-600">Servis Hizmetleri</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Parça</h3>
              <p className="text-sm text-gray-600">Sadece Grundig orijinal yedek parçaları</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Aynı Gün Servis</h3>
              <p className="text-sm text-gray-600">Grundig TV için aynı gün tamiri</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">İstanbul Geneli</h3>
              <p className="text-sm text-gray-600">Tüm ilçelerde Grundig servisi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">Grundig tamirinde tam garanti</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Grundig TV Tamiri Hakkında</h3>
            <p className="text-gray-600 mb-4">
              Grundig televizyonunuzda meydana gelen ekran kırılması, arka aydınlatma sorunu, 
              renk bozukluğu ve tüm teknik arızalar için İstanbul genelinde hizmet vermekteyiz.
            </p>
            <p className="text-gray-600">
              Uzman teknisyen kadromuz ve orijinal Grundig yedek parçalarımız ile 
              TV'nizin en kısa sürede tamirini gerçekleştiriyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Tamir Ettiğimiz <span className="text-blue-600">Grundig TV Modelleri</span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {grundigModels.length} farklı Grundig TV modelinde uzman servis hizmeti
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Model ara... (örn: 40)"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {currentModels.map((model, index) => (
              <Link 
                key={index} 
                href={`/markalar/grundig/${createModelSlug(model)}`}
                className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg border transition-colors group block"
              >
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">Grundig {model}</h3>
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
                      window.location.href = `/ucretsiz-teklif?marka=Grundig&model=${encodeURIComponent(model)}`;
                    }}
                  >
                    Teklif Al
                  </Button>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mb-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Önceki</span>
              </Button>
              
              <div className="flex space-x-1">
                {getPagination(currentPage, totalPages).map((item, idx) =>
                  item === '...'
                    ? <span key={"dots-"+idx} className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
                    : <Button
                        key={item}
                        variant={currentPage === item ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(Number(item))}
                        className={`w-8 h-8 p-0 ${
                          currentPage === item 
                            ? "bg-blue-600 text-white" 
                            : "border-gray-300 text-gray-700 hover:bg-blue-50"
                        }`}
                      >
                        {item}
                      </Button>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-1"
              >
                <span>Sonraki</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Results info */}
          <div className="text-center text-gray-600 mb-8">
            <p>
              {filteredModels.length > 0 ? (
                <>
                  Sayfa {currentPage} / {totalPages} - 
                  Toplam {filteredModels.length} model bulundu
                </>
              ) : searchTerm ? (
                "Arama sonucu bulunamadı"
              ) : (
                `Toplam ${grundigModels.length} model mevcut`
              )}
            </p>
          </div>

          {/* No results message */}
          {filteredModels.length === 0 && searchTerm && (
            <div className="text-center py-8 mb-8">
              <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aradığınız model bulunamadı.</p>
              <p className="text-sm text-gray-400 mt-2">
                Tüm Grundig TV modelleri için servis hizmeti vermekteyiz. 
                <Link href="/ucretsiz-teklif?marka=Grundig" className="text-blue-600 hover:underline ml-1">
                  Teklif alın
                </Link>
              </p>
            </div>
          )}

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg text-center mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Modelinizi Bulamadınız mı?
            </h3>
            <p className="text-gray-600 mb-6">
              Listede olmayan tüm Grundig TV modelleri için de profesyonel tamiri hizmeti sunuyoruz. 
              Modeliniz için özel teklifimizi alın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=Grundig">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                  Ücretsiz Teklif Al
                </Button>
              </Link>
              <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6">
                  <Phone className="w-4 h-4 mr-2" />
                  Hemen Ara
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Grundig TV Tamiri <span className="text-blue-600">Popüler İlçeler</span>
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
                  <p className="text-sm text-gray-600 mt-1">Grundig TV Tamiri</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Listelenen ilçelerde yakında Grundig servisi başlatılacaktır.</p>
            <Link href="/ucretsiz-teklif?marka=Grundig">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Grundig TV Teklifi Al
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GrundigPage;
