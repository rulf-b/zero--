"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Search, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const PhilipsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 12;

  const districts = [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Ataşehir', 'Maltepe',
    'Pendik', 'Kartal', 'Ümraniye', 'Üsküdar', 'Fatih', 'Beyoğlu'
  ];
  const [siteSettings, setSiteSettings] = useState<any>(null);


  const philipsModels = [
    "32PHS4112",
    "32PHS5505",
    "32PHS5507",
    "32PHS6808",
    "42OLED809",
    "43PFS5302",
    "43PFS5507",
    "43PFS6805",
    "43PFS6808",
    "43PUS7303",
    "43PUS7354",
    "43PUS7505",
    "43PUS7506",
    "43PUS7607",
    "43PUS7608",
    "43PUS7805",
    "43PUS7906",
    "43PUS7956",
    "43PUS8007",
    "43PUS8057",
    "43PUS8108",
    "43PUS8309",
    "43PUS8507",
    "43PUS8808",
    "43PUS8887",
    "43PUS8909",
    "48OLED707",
    "48OLED708",
    "48OLED759",
    "48OLED808",
    "48OLED848",
    "49PUS7803",
    "49PUS8303",
    "49PUS8503",
    "50PUS7009",
    "50PUS7303",
    "50PUS7304",
    "50PUS7505",
    "50PUS7556",
    "50PUS7607",
    "50PUS7608",
    "50PUS7805",
    "50PUS7956",
    "50PUS8007",
    "50PUS8057",
    "50PUS8108",
    "50PUS8118",
    "50PUS8309",
    "50PUS8349",
    "50PUS8505",
    "50PUS8506",
    "50PUS8507",
    "50PUS8508",
    "50PUS8548",
    "50PUS8807",
    "50PUS8808",
    "50PUS8887",
    "50PUS8909",
    "55OLED705",
    "55OLED706",
    "55OLED707",
    "55OLED708",
    "55OLED759",
    "55OLED803",
    "55OLED804",
    "55OLED805",
    "55OLED806",
    "55OLED807",
    "55OLED808",
    "55OLED809",
    "55OLED848",
    "55OLED903",
    "55OLED907",
    "55OLED908",
    "55OLED909",
    "55OLED935",
    "55OLED936",
    "55PML9008",
    "55PML9009",
    "55PML9308",
    "55PML9507",
    "55POS9002",
    "55POS901F",
    "55PUS6704",
    "55PUS7009",
    "55PUS7304",
    "55PUS7354",
    "55PUS7502",
    "55PUS7503",
    "55PUS7504",
    "55PUS7556",
    "55PUS7608",
    "55PUS7609",
    "55PUS7803",
    "55PUS7805",
    "55PUS7906",
    "55PUS7956",
    "55PUS8007",
    "55PUS8057",
    "55PUS8108",
    "55PUS8118",
    "55PUS8204",
    "55PUS8303",
    "55PUS8309",
    "55PUS8349",
    "55PUS8503",
    "55PUS8508",
    "55PUS8548",
    "55PUS8602",
    "55PUS8700",
    "55PUS8804",
    "55PUS8807",
    "55PUS8808",
    "55PUS8848",
    "55PUS8887",
    "55PUS8909",
    "55PUS8949",
    "55PUS9206",
    "55PUS9435",
    "58PUS7304",
    "58PUS7505",
    "58PUS7805",
    "58PUS8506",
    "58PUS8507",
    "65OLED705",
    "65OLED706",
    "65OLED707",
    "65OLED708",
    "65OLED759",
    "65OLED805",
    "65OLED806",
    "65OLED807",
    "65OLED808",
    "65OLED809",
    "65OLED848",
    "65OLED873",
    "65OLED903",
    "65OLED907",
    "65OLED908",
    "65OLED909",
    "65OLED935",
    "65OLED936",
    "65OLED937",
    "65PML9008",
    "65PML9009",
    "65PML9308",
    "65PML9506",
    "65PML9507",
    "65PUS6412",
    "65PUS7009",
    "65PUS7101",
    "65PUS7303",
    "65PUS7304/12",
    "65PUS7304/62",
    "65PUS7354",
    "65PUS7502",
    "65PUS7506",
    "65PUS7556",
    "65PUS7601",
    "65PUS7803",
    "65PUS7805",
    "65PUS7906",
    "65PUS7956",
    "65PUS8007",
    "65PUS8057",
    "65PUS8108",
    "65PUS8204",
    "65PUS8303",
    "65PUS8309",
    "65PUS8349",
    "65PUS8503",
    "65PUS8505",
    "65PUS8506",
    "65PUS8507",
    "65PUS8508",
    "65PUS8548",
    "65PUS8602",
    "65PUS8700",
    "65PUS8807",
    "65PUS8808",
    "65PUS8848",
    "65PUS8909",
    "65PUS8949",
    "65PUS9206",
    "65PUS9435",
    "70PUS6504",
    "70PUS6724",
    "70PUS7304",
    "70PUS7505",
    "70PUS7607",
    "75PUS8007",
    "75PUS8108",
    "75PUS8303",
    "75PUS8309",
    "75PUS8505",
    "75PUS8506",
    "75PUS8807",
    "75PUS8808",
    "75PUS8848",
    "75PUS8909",
    "77OLED807",
    "77OLED808",
    "77OLED809",
    "77OLED848",
    "77OLED937",
    "84PFL9708S",
    "85PML9009",
    "85PUS8309",
    "85PUS8808",
    "86PUS8807",
    "70PUS7805",
    "70PUS7906",
    "70PUS8007",
    "70PUS8108",
    "70PUS8118",
    "70PUS8505",
    "70PUS8506",
    "75PML9008",
    "75PML9009",
    "75PML9506",
    "75PML9507",
    "75PUS7101",
    "75PUS7354",
    "75PUS7803",
    "75PUS7805",
    "75PUS7906"
];

  const filteredModels = philipsModels.filter(model =>
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
              <Image src="/marka_logo/philips.png" alt="Philips Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Philips</span> TV Tamiri İstanbul
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              İstanbul genelinde Philips TV ekran tamiri ve değişimi. Aynı gün servis, orijinal parça, 12 ay garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=Philips">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Philips TV Teklifi Al
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
            İstanbul Philips TV <span className="text-blue-600">Servis Hizmetleri</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Parça</h3>
              <p className="text-sm text-gray-600">Sadece Philips orijinal yedek parçaları</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Aynı Gün Servis</h3>
              <p className="text-sm text-gray-600">Philips TV için aynı gün tamiri</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">İstanbul Geneli</h3>
              <p className="text-sm text-gray-600">Tüm ilçelerde Philips servisi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">Philips tamirinde tam garanti</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Philips TV Tamiri Hakkında</h3>
            <p className="text-gray-600 mb-4">
              Philips televizyonunuzda meydana gelen ekran kırılması, arka aydınlatma sorunu, 
              renk bozukluğu ve tüm teknik arızalar için İstanbul genelinde hizmet vermekteyiz.
            </p>
            <p className="text-gray-600">
              Uzman teknisyen kadromuz ve orijinal Philips yedek parçalarımız ile 
              TV'nizin en kısa sürede tamirini gerçekleştiriyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Tamir Ettiğimiz <span className="text-blue-600">Philips TV Modelleri</span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {philipsModels.length} farklı Philips TV modelinde uzman servis hizmeti
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Model ara... (örn: 32PHS4112)"
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
                href={`/markalar/philips/${createModelSlug(model)}`}
                className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg border transition-colors group block"
              >
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">Philips {model}</h3>
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
                      window.location.href = `/ucretsiz-teklif?marka=Philips&model=${encodeURIComponent(model)}`;
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
                `Toplam ${philipsModels.length} model mevcut`
              )}
            </p>
          </div>

          {/* No results message */}
          {filteredModels.length === 0 && searchTerm && (
            <div className="text-center py-8 mb-8">
              <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aradığınız model bulunamadı.</p>
              <p className="text-sm text-gray-400 mt-2">
                Tüm Philips TV modelleri için servis hizmeti vermekteyiz. 
                <Link href="/ucretsiz-teklif?marka=Philips" className="text-blue-600 hover:underline ml-1">
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
              Listede olmayan tüm Philips TV modelleri için de profesyonel tamiri hizmeti sunuyoruz. 
              Modeliniz için özel teklifimizi alın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=Philips">
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
            Philips TV Tamiri <span className="text-blue-600">Popüler İlçeler</span>
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
                  <p className="text-sm text-gray-600 mt-1">Philips TV Tamiri</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Listelenen ilçelerde yakında Philips servisi başlatılacaktır.</p>
            <Link href="/ucretsiz-teklif?marka=Philips">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Philips TV Teklifi Al
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PhilipsPage;
