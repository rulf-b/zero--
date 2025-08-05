"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Monitor, ArrowLeft, CheckCircle, Settings, Wrench, Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const PanasonicModelPage = () => {
  const params = useParams();
  const modelSlug = params.model as string;
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  // Panasonic modelleri listesi
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

  // Slug'dan model adını bulma
  const findModelFromSlug = (slug: string) => {
    return panasonicModels.find(model => {
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
          <p className="text-gray-600 mb-6">Aradığınız Panasonic TV modeli bulunamadı.</p>
          <Link href="/markalar/panasonic">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Panasonic Modelleri Sayfasına Dön
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
      answer: "Panasonic TV ekran değişimi genellikle 1-3 iş günü arasında tamamlanır. Yedek parça mevcudiyetine göre süre değişebilir. Acil durumlar için aynı gün servis de sunuyoruz."
    },
    {
      question: `${currentModel} orijinal ekran bulunur mu?`,
      answer: "Evet, Panasonic orijinal LCD panelleri tedarik ediyoruz. Tüm ekran değişimlerinde orijinal Panasonic parçaları kullanarak uzun ömürlü çözümler sunuyoruz."
    },
    {
      question: `${currentModel} tamiri garantili mi?`,
      answer: "Tüm Panasonic TV tamirleri 12 ay garanti kapsamındadır. Hem işçilik hem de kullanılan orijinal parçalar için tam garanti veriyoruz."
    },
    {
      question: `${currentModel} tamiri evde yapılır mı?`,
      answer: "Evet, Panasonic TV ekran değişimi işlemini evinizde gerçekleştirebiliriz. Mobil servis ekibimiz tüm gerekli donanım ve yedek parçalarla evinize gelir."
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
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <Link href="/markalar/panasonic">
                <Button variant="ghost" className="mr-4 text-blue-600 hover:text-blue-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Panasonic Modelleri
                </Button>
              </Link>
              <Image src="/marka_logo/panasonic.svg" alt="Panasonic Logo" width={80} height={60} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Panasonic {currentModel}</span> Ekran Tamiri
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Panasonic {currentModel} LCD ekran değişimi. Orijinal parça, profesyonel montaj, 12 ay garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/ucretsiz-teklif?marka=Panasonic&model=${encodeURIComponent(currentModel)}`}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Ücretsiz Teklif Al
                </Button>
              </Link>
              <a href={`tel:${siteSettings?.phone || '+905525587905'}`}>
                <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
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
            Panasonic {currentModel} <span className="text-blue-600">Tamiri Özellikleri</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Panasonic Parça</h3>
              <p className="text-sm text-gray-600">Sadece orijinal Panasonic LCD paneli</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Uzman Montaj</h3>
              <p className="text-sm text-gray-600">Profesyonel teknisyen</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hızlı Servis</h3>
              <p className="text-sm text-gray-600">1-3 gün içinde teslim</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-blue-600" />
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
                  Panasonic {currentModel} Özellikleri
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Monitor className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Model: <strong>Panasonic {currentModel}</strong></span>
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
            Panasonic {currentModel} <span className="text-blue-600">Sıkça Sorulan Sorular</span>
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
            Panasonic {currentModel} Tamiri <span className="text-blue-600">Hizmet Bölgeleri</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {districts.map((district) => (
              <div
                key={district}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-900 font-medium">{district}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Panasonic {currentModel} Tamiri</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              İstanbul'un her yerinde Panasonic {currentModel} tamir hizmeti
            </p>
            <Link href={`/ucretsiz-teklif?marka=Panasonic&model=${encodeURIComponent(currentModel)}`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Ücretsiz Teklif Al
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Panasonic {currentModel} Tamiriniz İçin Hemen İletişime Geçin
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Uzman teknisyenlerimiz ile Panasonic {currentModel} ekranınızı orijinal parçalarla tamir ediyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/ucretsiz-teklif?marka=Panasonic&model=${encodeURIComponent(currentModel)}`}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Ücretsiz Teklif Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone || '+905525587905'}`}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
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

export default PanasonicModelPage;
