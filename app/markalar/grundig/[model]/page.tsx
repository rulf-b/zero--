"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Monitor, ArrowLeft, CheckCircle, Settings, Wrench, Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import StatsSection from '@/components/StatsSection';

const GrundigModelPage = () => {
  const params = useParams();
  const modelSlug = params.model as string;
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  // Grundig modelleri listesi
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

  // Slug'dan model adını bulma
  const findModelFromSlug = (slug: string) => {
    return grundigModels.find(model => {
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
          <p className="text-gray-600 mb-6">Aradığınız Grundig TV modeli bulunamadı.</p>
          <Link href="/markalar/grundig">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Grundig Modelleri Sayfasına Dön
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  // Model özelliklerini belirleme
  const getModelSpecs = (model: string) => {
    const size = model.match(/\d+/)?.[0] || "Bilinmiyor";
    const isOLED = model.toLowerCase().includes("oled");
    const isQuantum = model.toLowerCase().includes("q") || model.toLowerCase().includes("quantum");
    const isCrystal = model.toLowerCase().includes("crystal");
    const is4K = model.toLowerCase().includes("4k") || model.toLowerCase().includes("uhd");
    
    return {
      size: size + '"',
      technology: isOLED ? "OLED" : isQuantum ? "QLED" : isCrystal ? "Crystal Display" : is4K ? "4K LED" : "LED",
      series: isOLED ? "Premium OLED Serisi" : isQuantum ? "Quantum Serisi" : isCrystal ? "Crystal Pro Serisi" : "Standart Serisi"
    };
  };

  const specs = getModelSpecs(currentModel);

  // SSS verileri
  const faqs = [
    {
      question: `Grundig ${currentModel} TV ekranı tamiri ne kadar sürer?`,
      answer: "Standart ekran tamiri işlemi genellikle 2-4 saat arasında tamamlanır. OLED ekranlar için bu süre 4-6 saat olabilir. Parça temini durumuna göre aynı gün veya ertesi gün teslim edilir."
    },
    {
      question: `${currentModel} modeli için orijinal ekran bulunur mu?`,
      answer: "Evet, Grundig'nin yetkili servis partneri olarak tüm modeller için orijinal ekran ve yedek parçalarımız mevcuttur. Taklit veya uyumlu parça kullanmıyoruz."
    },
    {
      question: `Grundig ${currentModel} tamiri için garanti veriyor musunuz?`,
      answer: "Evet, tüm Grundig TV tamirlerimiz için 12 ay tam garanti veriyoruz. Bu garanti hem işçilik hem de kullandığımız orijinal parçaları kapsar."
    },
    {
      question: `${specs.size} ekran tamiri maliyeti nedir?`,
      answer: `${specs.size} Grundig TV ekran tamiri maliyeti ekranın teknolojisine göre değişir. ${specs.technology} teknolojisi için özel fiyat teklifi alabilirsiniz. Ücretsiz keşif hizmeti sunuyoruz.`
    },
    {
      question: `Evde servis hizmeti var mı?`,
      answer: "Evet, İstanbul genelinde evde servis hizmeti veriyoruz. Teknisyenimiz evinize gelir, keşif yapar ve gerekirse TV'nizi atölyemizde tamir eder. Tamir sonrası tekrar evinize teslim ederiz."
    },
    {
      question: `Bu model için hangi arızaları tamira alıyorsunuz?`,
      answer: "Ekran kırılması, çizilme, renk bozukluğu, arka aydınlatma arızası, piksel hataları, görüntü bozuklukları ve tüm panel arızalarını tamira alıyoruz."
    }
  ];

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/markalar" className="hover:text-blue-600">Markalar</Link>
            <span>/</span>
            <Link href="/markalar/grundig" className="hover:text-blue-600">Grundig</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{currentModel}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/markalar/grundig">
              <Button variant="outline" size="sm" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri Dön
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/marka_logo/grundig.svg" alt="Grundig Logo" width={60} height={40} className="object-contain mr-4" />
                <span className="text-lg text-gray-600">TV Tamiri</span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Grundig <span className="text-blue-600">{currentModel}</span> Tamiri
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {specs.size} {specs.technology} teknolojili Grundig TV'niz için profesyonel ekran tamiri. 
                Aynı gün servis, orijinal parça, 12 ay garanti.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Monitor className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">Ekran Boyutu</span>
                  </div>
                  <p className="text-gray-600">{specs.size}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">Teknoloji</span>
                  </div>
                  <p className="text-gray-600">{specs.technology}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/ucretsiz-teklif?marka=Grundig&model=${encodeURIComponent(currentModel)}`}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 w-full sm:w-auto">
                    Ücretsiz Teklif Al
                  </Button>
                </Link>
                <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                  <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    Hemen Ara
                  </Button>
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Model Özellikleri</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Model Adı</span>
                  <span className="font-semibold text-gray-900">{currentModel}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Marka</span>
                  <span className="font-semibold text-gray-900">Grundig</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Ekran Boyutu</span>
                  <span className="font-semibold text-gray-900">{specs.size}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Panel Teknolojisi</span>
                  <span className="font-semibold text-gray-900">{specs.technology}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Seri</span>
                  <span className="font-semibold text-gray-900">{specs.series}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Tamir Durumu</span>
                  <span className="font-semibold text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Tamir Edilebilir
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Grundig {currentModel} için <span className="text-blue-600">Servis Hizmetlerimiz</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Monitor className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ekran Tamiri</h3>
              <p className="text-sm text-gray-600">Kırık, çizik, renk bozukluğu tamiri</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Panel Değişimi</h3>
              <p className="text-sm text-gray-600">Komple ekran paneli değişimi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Wrench className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Arka Aydınlatma</h3>
              <p className="text-sm text-gray-600">LED backlight tamiri</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Garanti</h3>
              <p className="text-sm text-gray-600">12 ay tam garanti</p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Neden Bizi Tercih Etmelisiniz?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Sadece orijinal Grundig parçaları</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Aynı gün servis imkanı</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">12 ay kapsamlı garanti</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Ücretsiz keşif ve tespit</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">İstanbul geneli evde servis</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <StatsSection />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Sıkça Sorulan <span className="text-blue-600">Sorular</span>
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:bg-gray-50"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <span className="text-blue-600 text-xl">
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

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Grundig {currentModel} Tamiri İçin Hemen İletişime Geçin
          </h2>
          <p className="text-blue-100 mb-8">
            Uzman teknisyenlerimiz size en iyi hizmeti sunmaya hazır. 
            Ücretsiz keşif ve teklif için hemen arayın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/ucretsiz-teklif?marka=Grundig&model=${encodeURIComponent(currentModel)}`}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Ücretsiz Teklif Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border border-white px-8">
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

export default GrundigModelPage;