"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Monitor, ArrowLeft, CheckCircle, Settings, Wrench, Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const JVCModelPage = () => {
  const params = useParams();
  const modelSlug = params.model as string;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // JVC modelleri listesi
  const jvcModels = [
    "LT-32VAF545T", "LT-32VH3106T", "LT-40VAF545T", "LT-43VA7405T", "LT-43VAF305T", 
    "LT-43VU3105T", "LT-50VA3005T", "LT-50VA3205T", "LT-50VA7405T", "LT-50VU3105T", 
    "LT-50VU3405T", "LT-55VA3005T", "LT-55VA3205T", "LT-55VA7405T", "LT-55VAQ7405T", 
    "LT-55VAQ745T", "LT-58VA3005T", "LT-58VA3205T", "LT-65VA3005T", "LT-65VA3205T", 
    "LT-65VA3405T", "LT-65VA7405T", "LT-65VAQ345T", "LT-65VAQ7405T", "LT-65VAQ745T", 
    "LT-70VAQ745T", "LT-70VU7405T", "LT-75VA8205T"
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
  const currentModel = jvcModels.find(model => 
    createModelSlug(model) === modelSlug
  );

  const modelDisplayName = currentModel || modelSlug.toUpperCase();

  // Sayfa meta bilgileri
  const pageTitle = `JVC ${modelDisplayName} TV Tamiri İstanbul`;
  const pageDescription = `JVC ${modelDisplayName} televizyon ekran tamiri ve değişimi. Uzman teknisyen, orijinal parça, aynı gün servis. İstanbul geneli hizmet.`;

  // FAQ verileri
  const faqs = [
    {
      question: `JVC ${modelDisplayName} ekran tamiri ne kadar sürer?`,
      answer: "JVC TV ekran tamiri genellikle 1-3 iş günü sürmektedir. Basit arızalarda aynı gün teslim mümkündür."
    },
    {
      question: `JVC ${modelDisplayName} ekran tamiri garantili mi?`,
      answer: "Evet, tüm JVC TV tamirlerimizde 12 ay garanti vermekteyiz. Garanti süresi içinde herhangi bir sorun yaşanırsa ücretsiz müdahale ediyoruz."
    },
    {
      question: `JVC ${modelDisplayName} için orijinal parça kullanıyor musunuz?`,
      answer: "Evet, sadece JVC orijinal yedek parçaları kullanmaktayız. Bu sayede TV'nizin performansı ve ömrü korunur."
    },
    {
      question: `JVC ${modelDisplayName} ekran fiyatı ne kadar?`,
      answer: "JVC TV ekran fiyatları model ve boyuta göre değişiklik gösterir. Size özel fiyat teklifi için bizimle iletişime geçin."
    },
    {
      question: `JVC ${modelDisplayName} tamirinde ne tür arızalar çözülür?`,
      answer: "Ekran kırılması, arka aydınlatma sorunu, renk bozukluğu, çizgiler, lekelenmeler ve görüntü kalitesi sorunları tamir edilir."
    }
  ];

  // Teknik özellikler
  const technicalSpecs = [
    { label: "Marka", value: "JVC" },
    { label: "Model", value: modelDisplayName },
    { label: "Ekran Tipi", value: "LED/Smart TV" },
    { label: "Tamir Türü", value: "Ekran Değişimi" },
    { label: "Garanti", value: "12 Ay" },
    { label: "Parça Türü", value: "Orijinal JVC" }
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
              href="/markalar/jvc" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              JVC Modelleri'ne Dön
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image src="/marka_logo/jvc.svg" alt="JVC Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">JVC {modelDisplayName}</span> TV Tamiri
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              JVC {modelDisplayName} televizyon ekran tamiri ve değişimi. 
              Uzman teknisyen, orijinal parça, 12 ay garanti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/ucretsiz-teklif?marka=JVC&model=${encodeURIComponent(modelDisplayName)}`}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  JVC {modelDisplayName} Teklifi Al
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
            JVC {modelDisplayName} <span className="text-blue-600">Servis Avantajları</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Orijinal Parça</h3>
              <p className="text-sm text-gray-600">JVC {modelDisplayName} için orijinal yedek parçalar</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hızlı Servis</h3>
              <p className="text-sm text-gray-600">JVC {modelDisplayName} için aynı gün tamiri</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Uzman Teknisyen</h3>
              <p className="text-sm text-gray-600">JVC TV'lerde uzman servis ekibi</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">12 Ay Garanti</h3>
              <p className="text-sm text-gray-600">JVC {modelDisplayName} tamirinde garanti</p>
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
                JVC {modelDisplayName} <span className="text-blue-600">Teknik Bilgiler</span>
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
                <h3 className="font-semibold text-gray-900 mb-3">JVC {modelDisplayName} Tamiri İçin</h3>
                <p className="text-gray-600 mb-4">
                  Ücretsiz ön inceleme ve fiyat teklifi alın. 
                  Tamir olmayacak durumlarda ücret alınmaz.
                </p>
                <Link href={`/ucretsiz-teklif?marka=JVC&model=${encodeURIComponent(modelDisplayName)}`}>
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
            JVC {modelDisplayName} <span className="text-blue-600">Sık Sorulan Sorular</span>
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
            JVC {modelDisplayName} Tamiri İçin Hemen İletişime Geçin
          </h2>
          <p className="text-xl mb-8">
            Uzman teknisyenlerimiz JVC {modelDisplayName} TV'nizin tamiri için hazır
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" variant="outline" className="bg-white text-blue-600 border-white hover:bg-gray-100 px-8">
                <Phone className="w-5 h-5 mr-2" />
                Hemen Ara
              </Button>
            </a>
            <Link href={`/ucretsiz-teklif?marka=JVC&model=${encodeURIComponent(modelDisplayName)}`}>
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
            Diğer <span className="text-blue-600">JVC TV Modelleri</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {jvcModels.slice(0, 8).map((model, index) => (
              <Link 
                key={index}
                href={`/markalar/jvc/${createModelSlug(model)}`}
                className="bg-white hover:bg-blue-50 p-4 rounded-lg border transition-colors block"
              >
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">JVC {model}</h3>
                    <p className="text-xs text-green-600 mt-1">✓ Tamir Edilebilir</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/markalar/jvc">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Tüm JVC Modelleri
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JVCModelPage;
