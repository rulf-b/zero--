"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Monitor, ArrowLeft, CheckCircle, Settings, Wrench, Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const ArcelikModelPage = () => {
  const params = useParams();
  const modelSlug = params.model as string;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Arçelik modelleri listesi
  const arcelikModels = [
    "32A650", "40A650", "43A650", "50A650", "55A650", "65A650",
    "32A680", "40A680", "43A680", "50A680", "55A680", "65A680",
    "32A720", "40A720", "43A720", "50A720", "55A720", "65A720",
    "32A850", "40A850", "43A850", "50A850", "55A850", "65A850",
    "32A950", "40A950", "43A950", "50A950", "55A950", "65A950"
  ];
  const [siteSettings, setSiteSettings] = useState<any>(null);


  // Model slug'ını gerçek model adına çevir
  const createModelSlug = (model: string) => {
    return model.toLowerCase()
      .replace(/[^a-z0-9\s]/gi, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  // Model adını bul
  const currentModel = arcelikModels.find(model => 
    createModelSlug(model) === modelSlug
  );

  const modelDisplayName = currentModel || modelSlug.toUpperCase();

  // Sayfa meta bilgileri
  const pageTitle = `Arçelik ${modelDisplayName} TV Tamiri İstanbul`;
  const pageDescription = `Arçelik ${modelDisplayName} televizyon ekran tamiri ve değişimi. Uzman teknisyen, orijinal parça, aynı gün servis. İstanbul geneli hizmet.`;

  // FAQ verileri
  const faqs = [
    {
      question: `Arçelik ${modelDisplayName} ekran tamiri ne kadar sürer?`,
      answer: "Arçelik TV ekran tamiri genellikle 1-3 iş günü sürmektedir. Basit arızalarda aynı gün teslim mümkündür."
    },
    {
      question: `Arçelik ${modelDisplayName} ekran tamiri garantili mi?`,
      answer: "Evet, tüm Arçelik TV tamirlerimizde 12 ay garanti vermekteyiz. Garanti süresi içinde herhangi bir sorun yaşanırsa ücretsiz müdahale ediyoruz."
    },
    {
      question: `Arçelik ${modelDisplayName} için orijinal parça kullanıyor musunuz?`,
      answer: "Evet, sadece Arçelik orijinal yedek parçaları kullanmaktayız. Bu sayede TV'nizin performansı ve ömrü korunur."
    },
    {
      question: `Arçelik ${modelDisplayName} ekran fiyatı ne kadar?`,
      answer: "Arçelik TV ekran fiyatları model ve boyuta göre değişiklik gösterir. Size özel fiyat teklifi için bizimle iletişime geçin."
    },
    {
      question: `Arçelik ${modelDisplayName} tamirinde ne tür arızalar çözülür?`,
      answer: "Ekran kırılması, arka aydınlatma sorunu, renk bozukluğu, çizgiler, lekelenmeler ve görüntü kalitesi sorunları tamir edilir."
    }
  ];

  // Teknik özellikler
  const technicalSpecs = [
    { label: "Marka", value: "Arçelik" },
    { label: "Model", value: modelDisplayName },
    { label: "Ekran Tipi", value: "LED/Smart TV" },
    { label: "Tamir Türü", value: "Ekran Değişimi" },
    { label: "Garanti", value: "12 Ay" },
    { label: "Parça Türü", value: "Orijinal Arçelik" }
  ];

  
  // Site ayarlarını çek
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data))
      .catch(error => console.error('Site ayarları yüklenirken hata:', error));
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              href="/markalar/arcelik" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Arçelik Modelleri'ne Dön
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image src="/marka_logo/arcelik.svg" alt="Arçelik Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Arçelik {modelDisplayName}</span> TV Tamiri
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Arçelik {modelDisplayName} televizyon ekran tamiri ve değişimi. 
              Uzman teknisyen, orijinal parça, 12 ay garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/ucretsiz-teklif?marka=Arçelik&model=${encodeURIComponent(modelDisplayName)}`}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Arçelik {modelDisplayName} Teklifi Al
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

      {/* Servis Özellikleri */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Arçelik {modelDisplayName} <span className="text-blue-600">Servis Avantajları</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Parça</h3>
              <p className="text-sm text-gray-600">Arçelik {modelDisplayName} için orijinal yedek parçalar</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hızlı Servis</h3>
              <p className="text-sm text-gray-600">Arçelik {modelDisplayName} için aynı gün tamiri</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Uzman Teknisyen</h3>
              <p className="text-sm text-gray-600">Arçelik TV'lerde uzman servis ekibi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">Arçelik {modelDisplayName} tamirinde garanti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teknik Özellikler */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Arçelik {modelDisplayName} <span className="text-blue-600">Teknik Bilgiler</span>
              </h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="space-y-4">
                  {technicalSpecs.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-700">{spec.label}</span>
                      <span className="text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Tamiri Yapılan <span className="text-blue-600">Arızalar</span>
              </h2>
              <div className="space-y-4">
                {[
                  "Ekran kırılması ve çatlaklar",
                  "Arka aydınlatma arızaları", 
                  "Renk bozukluğu ve tonlama sorunları",
                  "Ekranda çizgiler ve lekelenmeler",
                  "Görüntü kalitesi problemleri",
                  "Panel değişimi gereken durumlar"
                ].map((issue, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{issue}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Arçelik {modelDisplayName} Tamiri İçin</h3>
                <p className="text-gray-600 mb-4">
                  Ücretsiz ön inceleme ve fiyat teklifi alın. 
                  Tamir olmayacak durumlarda ücret alınmaz.
                </p>
                <Link href={`/ucretsiz-teklif?marka=Arçelik&model=${encodeURIComponent(modelDisplayName)}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Ücretsiz Teklif Al
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sık Sorulan Sorular */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Arçelik {modelDisplayName} <span className="text-blue-600">Sık Sorulan Sorular</span>
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                    ▼
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

      {/* İletişim */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Arçelik {modelDisplayName} Tamiri İçin Hemen İletişime Geçin
          </h2>
          <p className="text-xl mb-8">
            Uzman teknisyenlerimiz Arçelik {modelDisplayName} TV'nizin tamiri için hazır
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" variant="outline" className="bg-white text-blue-600 border-white hover:bg-gray-100 px-8">
                <Phone className="w-5 h-5 mr-2" />
                Hemen Ara
              </Button>
            </a>
            <Link href={`/ucretsiz-teklif?marka=Arçelik&model=${encodeURIComponent(modelDisplayName)}`}>
              <Button size="lg" variant="outline" className="bg-white text-blue-600 border-white hover:bg-gray-100 px-8">
                Ücretsiz Teklif Al
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benzer Modeller */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Diğer <span className="text-blue-600">Arçelik TV Modelleri</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {arcelikModels.slice(0, 8).map((model, index) => (
              <Link 
                key={index}
                href={`/markalar/arcelik/${createModelSlug(model)}`}
                className="bg-white hover:bg-blue-50 p-4 rounded-lg border transition-colors block"
              >
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">Arçelik {model}</h3>
                    <p className="text-xs text-green-600 mt-1">✓ Tamir Edilebilir</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/markalar/arcelik">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Tüm Arçelik Modelleri
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArcelikModelPage;
