"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Search, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const LGPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 12;

  const districts = [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Ataşehir', 'Maltepe',
    'Pendik', 'Kartal', 'Ümraniye', 'Üsküdar', 'Fatih', 'Beyoğlu'
  ];
  const [siteSettings, setSiteSettings] = useState<any>(null);


    const lgModels = [
    "43NANO776PA",
    "43UQ75006LF",
    "43UQ81006LB",
    "43UT81006LA",
    "48LX1Q6LA",
    "49NANO866NA",
    "49SJ800V",
    "49SK7900PLA",
    "49SK8100PLA",
    "49SM8000PLA",
    "49SM8200PLA",
    "49SM8600PLA",
    "49UH770V",
    "49UH850V",
    "50NANO756PA",
    "50NANO766QA",
    "50NANO776PA",
    "50NANO816PA",
    "50NANO81T6A",
    "50NANO866PA",
    "50QNED7S6QA",
    "50QNED816QA",
    "50QNED816RE",
    "50UP77006LB",
    "50UQ75006LF",
    "50UQ81006LB",
    "50UR81006LJ",
    "50UR91006LA",
    "50UT81006LA",
    "50UT91006LA",
    "55EA980V",
    "55EC930V",
    "55EG920V",
    "55EG960V",
    "55LX1Q6LA",
    "55NANO756PA",
    "55NANO766QA",
    "55NANO796NE",
    "55NANO816NA",
    "55NANO816PA",
    "55NANO816QA",
    "55NANO81T6A",
    "55NANO866NA",
    "55NANO866PA",
    "55NANO916NA",
    "55NANO916PA",
    "55NANO956NA",
    "55NANO966PA",
    "55QNED756RA",
    "55QNED7S6QA",
    "55QNED80T6A",
    "55QNED816QA",
    "55QNED816RE",
    "55QNED866QA",
    "55QNED86T6A",
    "55SJ800V",
    "55SJ850V",
    "55SJ950V",
    "55SK8100PLA",
    "55SK8500PLA",
    "55SM8000PLA",
    "55SM8200PLA",
    "55SM8600PLA",
    "55SM9010PLA",
    "55UH850V",
    "55UH950V",
    "55UK6100PLB",
    "55UK6300PLB",
    "55UK6500PLA",
    "55UK7550PLA",
    "55UM7450PLA",
    "55UM751C0ZA",
    "55UM7660PLA",
    "55UN71006LB",
    "55UN711C0ZB",
    "55UN73006LA",
    "55UN74006LB",
    "55UN81006LB",
    "55UP75006LF",
    "55UP77006LB",
    "55UP77106LB",
    "55UP80006LA",
    "55UP81006LA",
    "55UQ75006LF",
    "55UQ81006LB",
    "55UR81006LJ",
    "55UR91006LA",
    "55UT81006LA",
    "55UT91006LA",
    "60UH770V",
    "60UH850V",
    "60UN71006LB",
    "60UP80006LA",
    "65ART90E6QA",
    "65EC970V",
    "65EG960V",
    "65NANO776PA",
    "65NANO796NE",
    "65NANO816NA",
    "65NANO816PA",
    "65NANO81T6A",
    "65NANO866NA",
    "65NANO866PA",
    "65NANO916NA",
    "65NANO916PA",
    "65NANO956NA",
    "65NANO966PA",
    "65NANO996NA",
    "65QNED756RA",
    "65QNED7S6QA",
    "65QNED80T6A",
    "65QNED816QA",
    "65QNED816RE",
    "65QNED866QA",
    "65QNED86T6A",
    "65QNED916PA",
    "65QNED916QA",
    "65QNED91T6A",
    "65QNED996PB",
    "65SJ955V",
    "65SJ800V",
    "65SJ850V",
    "65SJ950V",
    "65SK7900PLA",
    "65SK8100PLA",
    "65SK8500PLA",
    "65SM8000PLA",
    "65SM8200PLA",
    "65SM8600PLA",
    "65SM9010PLA",
    "65UB980V",
    "65UC970V",
    "65UF950V",
    "65UH770V",
    "65UH850V",
    "65UH950V",
    "65UJ630V",
    "65UJ651V",
    "65UJ701V",
    "65UK6100PLB",
    "65UK6470PLC",
    "65UK6950PLB",
    "65UM7100PLA",
    "65UM7400v",
    "65UM7450PLA",
    "65UM7510PLA",
    "65UM751C0ZA",
    "65UN71006LB",
    "65UN711C0ZB",
    "65UP75006LF",
    "65UP77106LB",
    "65UQ75006LF",
    "65UR81006LJ",
    "65UR91006LA",
    "65UT81006LA",
    "65UT91006LA",
    "70NANO756PA",
    "70NANO766QA",
    "70UH700V",
    "70UJ675V",
    "70UM7100PLA",
    "70UM7100PLB",
    "70UM7450PLA",
    "70UN70706LB",
    "70UN71006LA",
    "70UP77006LB",
    "70UP81006LA",
    "75NANO756PA",
    "75NANO766QA",
    "75NANO796NF",
    "75NANO816PA",
    "75NANO816QA",
    "75NANO866PA",
    "75NANO906NA",
    "75NANO916NA",
    "75NANO916PA",
    "75NANO966PA",
    "75NANO996NA",
    "75QNED7S6QA",
    "75QNED80T6A",
    "75QNED816QA",
    "75QNED816RE",
    "75QNED866QA",
    "75QNED86T6A",
    "75QNED916PA",
    "75QNED916QA",
    "75QNED91T6A",
    "75QNED996PB",
    "75SJ955V",
    "75SK8100PLA",
    "75SM8610PLA",
    "75SM9000PLA",
    "75UH855V",
    "75UJ675V",
    "75UK6500PLA",
    "75UM7110PLB",
    "75UM7600PLB",
    "75UN71006LC",
    "75UN85006LA",
    "75UP75006LC",
    "75UP77006LB",
    "75UP77109LC",
    "75UP80006LA",
    "75UP81006LA",
    "75UQ81006LB",
    "75UR81006LJ",
    "75UR91006LA",
    "75US760H0ZD",
    "75UT81006LA",
    "75UT91006LA",
    "79UB980V",
    "79UG880V",
    "82UP80006LA",
    "84UB980V",
    "86NANO756PA",
    "86NANO766QA",
    "86NANO866PA",
    "86NANO906NA",
    "86NANO916NA",
    "86NANO916PA",
    "86QNED80T6A",
    "86QNED816QA",
    "86QNED816RE",
    "86QNED85T6C",
    "86QNED916PA",
    "86QNED916QA",
    "86QNED91T6A",
    "86SM9000PLA",
    "86UH955V",
    "86UK6500PLA",
    "86UM7600PLB",
    "86UN85006LA",
    "86UP80006LA",
    "86UQ91006LA",
    "86UR81006LA",
    "86UT81006LA",
    "98UB980V",
    "OLED Flex 42LX3Q6LA",
    "OLED42C24LA",
    "OLED48A16LA",
    "OLED48A26LA",
    "OLED48A29LA",
    "OLED48C14LB",
    "OLED48C24LA",
    "OLED48C34LA",
    "OLED55A16LA",
    "OLED55A26LA",
    "OLED55B16LA",
    "OLED55B46LA",
    "OLED55B6J",
    "OLED55B7V",
    "OLED55B8PLA",
    "OLED55B9PLA",
    "OLED55B9SLA",
    "OLED55BX6LB",
    "OLED55C14LB",
    "OLED55C24LA",
    "OLED55C34LA",
    "OLED55C46LA",
    "OLED55C6V",
    "OLED55C7V",
    "OLED55C8PLA",
    "OLED55C9PLA",
    "OLED55CS3VA",
    "OLED55CS6LA",
    "OLED55CX6LA",
    "OLED55E6V",
    "OLED55E7N",
    "OLED55E7V",
    "OLED55E8PLA",
    "OLED55E9PLA",
    "OLED55G16LA",
    "OLED55G26LA",
    "OLED55G36LA",
    "OLED55GX6LA",
    "OLED65A16LA",
    "OLED65A26LA",
    "OLED65B16LA",
    "OLED65B46LA",
    "OLED65B7V",
    "OLED65B8PLA",
    "OLED65B9PLA",
    "OLED65B9SLA",
    "OLED65BX6LB",
    "OLED65C14LB",
    "OLED65C24LA",
    "OLED65C34LA",
    "OLED65C46LA",
    "OLED65C6V",
    "OLED65C7V",
    "OLED65C8PLA",
    "OLED65C9PLA",
    "OLED65CS3VA",
    "OLED65CS6LA",
    "OLED65CX6LA",
    "OLED65E6V",
    "OLED65E7V",
    "OLED65E8PLA",
    "OLED65E9PLA",
    "OLED65G16LA",
    "OLED65G26LA",
    "OLED65G36LA",
    "OLED65G45LW",
    "OLED65G6V",
    "OLED65GX6LA",
    "OLED65W7V",
    "OLED65W8PLA",
    "OLED65W9PLA",
    "OLED65WX9LA",
    "OLED77A16LA",
    "OLED77B16LA",
    "OLED77B36LA",
    "OLED77B46LA",
    "OLED77C14LB",
    "OLED77C24LA",
    "OLED77C34LA",
    "OLED77C46LA",
    "OLED77C8LLA",
    "OLED77C9PLA",
    "OLED77CS6LA",
    "OLED77CX6LA",
    "OLED77G16LA",
    "OLED77G26LA",
    "OLED77G36LA",
    "OLED77G45LW",
    "OLED77GX6LA",
    "OLED77M39LA",
    "OLED77W7V",
    "OLED77Z29LA",
    "OLED77ZX9LA",
    "OLED83C14LA",
    "OLED83C24LA",
    "OLED83C34LA",
    "OLED83C46LA",
    "OLED83G26LA",
    "OLED83G36LA",
    "OLED83G45LW",
    "OLED83M39LA",
    "OLED88Z29LA",
    "OLED97G29LA",
    "OLED97M39LA"
  ];

  const filteredModels = lgModels.filter(model =>
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
              <Image src="/marka_logo/lg.svg" alt="LG Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">LG</span> TV Tamiri İstanbul
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              İstanbul genelinde LG TV ekran tamiri ve değişimi. Aynı gün servis, orijinal parça, 12 ay garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=LG">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  LG TV Teklifi Al
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
            İstanbul LG TV <span className="text-blue-600">Servis Hizmetleri</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Parça</h3>
              <p className="text-sm text-gray-600">Sadece LG orijinal yedek parçaları</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Aynı Gün Servis</h3>
              <p className="text-sm text-gray-600">LG TV için aynı gün tamiri</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">İstanbul Geneli</h3>
              <p className="text-sm text-gray-600">Tüm ilçelerde LG servisi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">LG tamirinde tam garanti</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">LG TV Tamiri Hakkında</h3>
            <p className="text-gray-600 mb-4">
              LG televizyonunuzda meydana gelen ekran kırılması, arka aydınlatma sorunu, 
              renk bozukluğu ve tüm teknik arızalar için İstanbul genelinde hizmet vermekteyiz.
            </p>
            <p className="text-gray-600">
              Uzman teknisyen kadromuz ve orijinal LG yedek parçalarımız ile 
              TV'nizin en kısa sürede tamirini gerçekleştiriyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Tamir Ettiğimiz <span className="text-blue-600">LG TV Modelleri</span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {lgModels.length} farklı LG TV modelinde uzman servis hizmeti
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Model ara... (örn: Atlanta)"
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
                href={`/markalar/lg/${createModelSlug(model)}`}
                className="bg-gray-50 hover:bg-blue-50 p-4 rounded-lg border transition-colors group block"
              >
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">LG {model}</h3>
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
                      window.location.href = `/ucretsiz-teklif?marka=LG&model=${encodeURIComponent(model)}`;
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
                `Toplam ${lgModels.length} model mevcut`
              )}
            </p>
          </div>

          {/* No results message */}
          {filteredModels.length === 0 && searchTerm && (
            <div className="text-center py-8 mb-8">
              <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aradığınız model bulunamadı.</p>
              <p className="text-sm text-gray-400 mt-2">
                Tüm LG TV modelleri için servis hizmeti vermekteyiz. 
                <Link href="/ucretsiz-teklif?marka=LG" className="text-blue-600 hover:underline ml-1">
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
              Listede olmayan tüm LG TV modelleri için de profesyonel tamiri hizmeti sunuyoruz. 
              Modeliniz için özel teklifimizi alın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ucretsiz-teklif?marka=LG">
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
            LG TV Tamiri <span className="text-blue-600">Popüler İlçeler</span>
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
                  <p className="text-sm text-gray-600 mt-1">LG TV Tamiri</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Listelenen ilçelerde yakında LG servisi başlatılacaktır.</p>
            <Link href="/ucretsiz-teklif?marka=LG">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                LG TV Teklifi Al
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LGPage;
