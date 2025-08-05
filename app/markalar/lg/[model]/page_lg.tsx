"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Monitor, ArrowLeft, CheckCircle, Settings, Wrench, Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const LGModelPage = () => {
  const params = useParams();
  const modelSlug = params.model as string;
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  // LG modelleri listesi
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

  // Slug'dan model adını bulma
  const findModelFromSlug = (slug: string) => {
    return lgModels.find(model => {
      const modelSlug = model.toLowerCase()
        .replace(/[^a-z0-9\s]/gi, '')
        .replace(/\s+/g, '-')
        .trim();
      return modelSlug === slug;
    });
  };

  const currentModel = findModelFromSlug(modelSlug);

  // Site ayarlarını çek
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data))
      .catch(error => console.error('Site ayarları yüklenirken hata:', error));
  }, []);

  if (!currentModel) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Model Bulunamadı</h1>
          <p className="text-gray-600 mb-6">Aradığınız LG TV modeli bulunamadı.</p>
          <Link href="/markalar/lg">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              LG Modelleri Sayfasına Dön
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const faqData = [
    {
      question: `${currentModel} LCD ekranı neden kırılır?`,
      answer: "LCD ekranlar genellikle fiziksel darbe, düşme, yanlış taşıma veya üzerine ağır cisim düşmesi sonucu kırılır. Ayrıca aşırı sıcaklık değişimleri de ekran hasarına neden olabilir."
    },
    {
      question: `${currentModel} tamiri kaç gün sürer?`,
      answer: "LG TV ekran değişimi genellikle 1-3 iş günü arasında tamamlanır. Yedek parça mevcudiyetine göre süre değişebilir. Acil durumlar için aynı gün servis de sunuyoruz."
    },
    {
      question: `${currentModel} orijinal ekran bulunur mu?`,
      answer: "Evet, LG orijinal LCD panelleri tedarik ediyoruz. Tüm ekran değişimlerinde orijinal LG parçaları kullanarak uzun ömürlü çözümler sunuyoruz."
    },
    {
      question: `${currentModel} tamiri garantili mi?`,
      answer: "Tüm LG TV tamirleri 12 ay garanti kapsamındadır. Hem işçilik hem de kullanılan orijinal parçalar için tam garanti veriyoruz."
    },
    {
      question: `${currentModel} tamiri evde yapılır mı?`,
      answer: "Evet, LG TV ekran değişimi işlemini evinizde gerçekleştirebiliriz. Mobil servis ekibimiz tüm gerekli donanım ve yedek parçalarla evinize gelir."
    }
  ];

  const districts = [
    'Kadıköy', 'Beşiktaş', 'Şişli', 'Bakırköy', 'Ataşehir', 'Maltepe',
    'Pendik', 'Kartal', 'Ümraniye', 'Üsküdar', 'Fatih', 'Beyoğlu',
    'Başakşehir', 'Avcılar', 'Bahçelievler', 'Bağcılar', 'Esenler', 'Gaziosmanpaşa'
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <Link href="/markalar/lg">
                <Button variant="ghost" className="mr-4 text-red-600 hover:text-red-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  LG Modelleri
                </Button>
              </Link>
              <Image src="/marka_logo/lg.svg" alt="LG Logo" width={80} height={60} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-red-600">LG {currentModel}</span> Ekran Tamiri
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              LG {currentModel} LCD ekran değişimi. Orijinal parça, profesyonel montaj, 12 ay garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/ucretsiz-teklif?marka=LG&model=${encodeURIComponent(currentModel)}`}>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                  Ücretsiz Teklif Al
                </Button>
              </Link>
              <a href={`tel:${siteSettings?.phone || '+905525587905'}`}>
                <Button variant="outline" size="lg" className="border-red-600 text-red-600 hover:bg-red-50 px-8">
                  <Phone className="w-5 h-5 mr-2" />
                  Hemen Ara
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            LG {currentModel} <span className="text-red-600">Tamiri Özellikleri</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal LG Parça</h3>
              <p className="text-sm text-gray-600">Sadece orijinal LG LCD paneli</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Settings className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Uzman Montaj</h3>
              <p className="text-sm text-gray-600">Profesyonel teknisyen</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hızlı Servis</h3>
              <p className="text-sm text-gray-600">1-3 gün içinde teslim</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">Tam kapsamlı garanti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Model Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  LG {currentModel} Özellikleri
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Monitor className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">Model: <strong>LG {currentModel}</strong></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Orijinal LCD Panel Mevcut</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Wrench className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Profesyonel Tamir Hizmeti</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <span className="text-gray-700">Premium Kalite Garantisi</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Yaygın Sorunlar</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Ekran kırılması veya çatlakları</li>
                  <li>• Beyaz veya siyah ekran problemi</li>
                  <li>• Renk bozuklukları ve bantlar</li>
                  <li>• Arka aydınlatma arızası</li>
                  <li>• Dokunmatik panel çalışmıyor</li>
                  <li>• Ekranda lekeler veya gölgeler</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            LG {currentModel} <span className="text-red-600">Sıkça Sorulan Sorular</span>
          </h2>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <span className="text-gray-500">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            LG {currentModel} Tamiri <span className="text-red-600">Hizmet Bölgeleri</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {districts.map((district) => (
              <div
                key={district}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span className="text-gray-900 font-medium">{district}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">LG {currentModel} Tamiri</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              İstanbul'un her yerinde LG {currentModel} tamir hizmeti
            </p>
            <Link href={`/ucretsiz-teklif?marka=LG&model=${encodeURIComponent(currentModel)}`}>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8">
                Ücretsiz Teklif Al
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            LG {currentModel} Tamiriniz İçin Hemen İletişime Geçin
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Uzman teknisyenlerimiz ile LG {currentModel} ekranınızı orijinal parçalarla tamir ediyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/ucretsiz-teklif?marka=LG&model=${encodeURIComponent(currentModel)}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8">
                Ücretsiz Teklif Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone || '+905525587905'}`}>
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8">
                <Phone className="w-5 h-5 mr-2" />
                {siteSettings?.phone || '+90 552 558 79 05'}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LGModelPage;
