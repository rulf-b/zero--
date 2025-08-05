"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Search, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const ArcelikPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 12;

  const districts = [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Ataşehir', 'Maltepe',
    'Pendik', 'Kartal', 'Ümraniye', 'Üsküdar', 'Fatih', 'Beyoğlu'
  ];
  const [siteSettings, setSiteSettings] = useState<any>(null);


  const arcelikModels = [
    "32A650", "40A650", "43A650", "50A650", "55A650", "65A650",
    "32A680", "40A680", "43A680", "50A680", "55A680", "65A680",
    "32A720", "40A720", "43A720", "50A720", "55A720", "65A720",
    "32A850", "40A850", "43A850", "50A850", "55A850", "65A850",
    "32A950", "40A950", "43A950", "50A950", "55A950", "65A950"
  ];

  const createModelSlug = (model: string) => {
    return model.toLowerCase()
      .replace(/[^a-z0-9\s]/gi, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  // Arama ve sayfalama işlemleri
  const filteredModels = arcelikModels.filter(model =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredModels.length / modelsPerPage);
  const currentModels = filteredModels.slice(
    (currentPage - 1) * modelsPerPage,
    currentPage * modelsPerPage
  );

  
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
              <Image src="/marka_logo/arcelik.svg" alt="Arçelik Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Arçelik</span> TV Tamiri İstanbul
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {arcelikModels.length} farklı Arçelik TV modelinde uzman servis hizmeti. Modelinizi seçerek detaylı bilgi ve fiyat teklifi alabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=Arçelik">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Arçelik TV Teklifi Al
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

      {/* Arçelik Modelleri */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tamir Ettiğimiz <span className="text-blue-600">Arçelik TV Modelleri</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Arçelik TV modelinizi listeden bulun ve detaylı tamir bilgileri için tıklayın. 
              Tüm modellerde orijinal parça kullanımı ve 12 ay garanti.
            </p>
          </div>

          {/* Arama */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Model ara (örn: 43A650)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* Model Grid */}
          {currentModels.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {currentModels.map((model, index) => (
                  <Link
                    key={index}
                    href={`/markalar/arcelik/${createModelSlug(model)}`}
                    className="group bg-white hover:bg-blue-50 p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 group-hover:bg-blue-200 rounded-lg p-3 transition-colors">
                        <Monitor className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                          Arçelik {model}
                        </h3>
                        <p className="text-sm text-green-600 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Tamir Edilebilir
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Sayfalama */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Önceki
                  </Button>
                  
                  <span className="text-gray-600">
                    Sayfa {currentPage} / {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center"
                  >
                    Sonraki
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Monitor className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Model bulunamadı</h3>
              <p className="text-gray-600">
                Aradığınız modeli bulamadık. Lütfen farklı bir arama terimi deneyin.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Servis Özellikleri */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Arçelik TV <span className="text-blue-600">Servis Avantajları</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Parça</h3>
              <p className="text-sm text-gray-600">Tüm Arçelik modelleri için orijinal yedek parçalar</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Aynı Gün Servis</h3>
              <p className="text-sm text-gray-600">Arçelik TV tamirinde hızlı çözüm</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">İstanbul Geneli</h3>
              <p className="text-sm text-gray-600">Tüm ilçelerde Arçelik TV servisi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">Tüm Arçelik TV tamirlerinde garanti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hizmet Verdiğimiz İlçeler */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Arçelik TV <span className="text-blue-600">Servis Bölgeleri</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {districts.map((district, index) => (
              <div key={index} className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">{district}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Yukarıdaki ilçelerde ve İstanbul genelinde Arçelik TV servisi veriyoruz
            </p>
            <Link href="/ucretsiz-teklif?marka=Arçelik">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Arçelik TV Servisi Al
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Arçelik TV'nizin Tamiri İçin Hemen İletişime Geçin
          </h2>
          <p className="text-xl mb-8">
            Uzman teknisyenlerimiz {arcelikModels.length} farklı Arçelik TV modeli için servis vermeye hazır
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" variant="outline" className="bg-white text-blue-600 border-white hover:bg-gray-100 px-8">
                <Phone className="w-5 h-5 mr-2" />
                Hemen Ara
              </Button>
            </a>
            <Link href="/ucretsiz-teklif?marka=Arçelik">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 border-white hover:bg-gray-100 px-8">
                Ücretsiz Teklif Al
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArcelikPage;
