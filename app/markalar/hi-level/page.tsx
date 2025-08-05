"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Search, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const HiLevelPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hiLevelModels, setHiLevelModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const modelsPerPage = 12;

  useEffect(() => {
    // Site ayarlarını çek
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data))
      .catch(err => console.error('Site ayarları yüklenemedi:', err));

    // TV modellerini çek
    fetch('/api/tv-models')
      .then(res => res.json())
      .then(data => {
        const models = data
          .filter((item: any) => item.brand === 'Hi-Level')
          .map((item: any) => item.model)
          .sort();
        setHiLevelModels(models);
        setLoading(false);
      })
      .catch(err => {
        console.error('Hi-Level modelleri yüklenemedi:', err);
        setLoading(false);
      });
  }, []);
  const districts = [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Ataşehir', 'Maltepe',
    'Pendik', 'Kartal', 'Ümraniye', 'Üsküdar', 'Fatih', 'Beyoğlu'
  ];

  // Model arama ve sayfalama
  const filteredModels = hiLevelModels.filter(model =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredModels.length / modelsPerPage);
  const startIndex = (currentPage - 1) * modelsPerPage;
  const endIndex = startIndex + modelsPerPage;
  const currentModels = filteredModels.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const createModelSlug = (model: string) => {
    return model
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image src="/marka_logo/hi-level.svg" alt="Hi-Level Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Hi-Level</span> TV Tamiri İstanbul
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              İstanbul genelinde Hi-Level TV ekran tamiri ve değişimi. Aynı gün servis, orijinal parça, 12 ay garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=Hi-Level">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Hi-Level TV Teklifi Al
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
            İstanbul Hi-Level TV <span className="text-blue-600">Servis Hizmetleri</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Parça</h3>
              <p className="text-sm text-gray-600">Sadece Hi-Level orijinal yedek parçaları</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Aynı Gün Servis</h3>
              <p className="text-sm text-gray-600">Hi-Level TV için aynı gün tamiri</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">İstanbul Geneli</h3>
              <p className="text-sm text-gray-600">Tüm ilçelerde Hi-Level servisi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">Hi-Level tamirinde tam garanti</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hi-Level TV Tamiri Hakkında</h3>
            <p className="text-gray-600 mb-4">
              Hi-Level televizyonunuzda meydana gelen ekran kırılması, arka aydınlatma sorunu, 
              renk bozukluğu ve tüm teknik arızalar için İstanbul genelinde hizmet vermekteyiz.
            </p>
            <p className="text-gray-600">
              Uzman teknisyen kadromuz ve orijinal Hi-Level yedek parçalarımız ile 
              TV'nizin en kısa sürede tamirini gerçekleştiriyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Hi-Level TV Modelleri Bölümü */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Tamir Ettiğimiz <span className="text-blue-600">Hi-Level TV Modelleri</span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {loading ? 'Modeller yükleniyor...' : `${hiLevelModels.length} farklı Hi-Level TV modelinde uzman servis hizmeti`}
          </p>

          {!loading && hiLevelModels.length > 0 && (
            <>
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Model ara... (örn: HI-32HL500)"
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
                    href={`/markalar/hi-level/${createModelSlug(model)}`}
                    className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg border transition-colors group block"
                  >
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">Hi-Level {model}</h3>
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
                          window.location.href = `/ucretsiz-teklif?marka=Hi-Level&model=${encodeURIComponent(model)}`;
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
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className="disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
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
                    Aradığınız model bulunamadı. Tüm Hi-Level TV modelleri için servis hizmeti vermekteyiz.
                  </p>
                ) : null}
              </div>

              {filteredModels.length === 0 && searchTerm && (
                <div className="bg-blue-50 p-6 rounded-lg text-center mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Model Bulunamadı?</h3>
                  <p className="text-gray-600 mb-4">
                    Tüm Hi-Level TV modelleri için servis hizmeti vermekteyiz. 
                    Modeliniz listede olmasa bile size yardımcı olabiliriz.
                  </p>
                  <Link href="/ucretsiz-teklif?marka=Hi-Level">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Teklif Al
                    </Button>
                  </Link>
                </div>
              )}

              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-600 mb-4">
                  Listede olmayan tüm Hi-Level TV modelleri için de profesyonel tamir hizmeti sunuyoruz. 
                  TV modelinizi bilmiyorsanız da endişelenmeyin!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/ucretsiz-teklif?marka=Hi-Level">
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
            </>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Hi-Level TV modelleri yükleniyor...</p>
            </div>
          )}

          {!loading && hiLevelModels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Hi-Level TV modelleri yüklenirken bir hata oluştu.</p>
              <Link href="/ucretsiz-teklif?marka=Hi-Level">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Teklif Al
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Hi-Level TV Tamiri <span className="text-blue-600">Popüler İlçeler</span>
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
                  <p className="text-sm text-gray-600 mt-1">Hi-Level TV Tamiri</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Listelenen ilçelerde yakında Hi-Level servisi başlatılacaktır.</p>
            <Link href="/ucretsiz-teklif?marka=Hi-Level">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Hi-Level TV Teklifi Al
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HiLevelPage;
