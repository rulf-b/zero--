"use client";

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Monitor, Cpu, Zap, Wrench, Shield, Clock, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

// export const metadata: Metadata = {
//   title: 'Profesyonel TV Tamir Hizmetleri | Ekran Değişimi & LED Tamiri',
//   description: 'Ekran değişimi, LED panel tamiri ve anakart onarımları dahil uzman TV tamir hizmetleri. Hızlı, güvenilir ve garantili onarımlar.',
//   keywords: 'TV tamir hizmetleri, ekran değişimi, LED panel tamiri, anakart tamiri, TV onarımı',
// };

const ServicesPage = () => {
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await fetch('/api/site-settings');
        if (response.ok) {
          const settings = await response.json();
          setSiteSettings(settings);
        }
      } catch (error) {
        console.error('Site ayarları yüklenirken hata:', error);
      }
    };

    fetchSiteSettings();
  }, []);

  const services = [
    {
      icon: Monitor,
      title: 'TV Ekran Değişimi',
      description: 'Tüm büyük markalar için LCD, LED, OLED ve QLED ekran değişimi hizmeti.',
      features: [
        '32" - 85" arası tüm ekran boyutları',
        'Orijinal kalitede paneller',
        'Aynı gün servis imkanı',
        '12 ay garanti',
        'Renk kalibrasyonu dahil',
        'Profesyonel montaj'
      ],
      priceRange: '₺800 - ₺3.500',
      href: '/services/tv-screen-replacement',
      popular: true
    },
    {
      icon: Zap,
      title: 'LED Panel & Arka Aydınlatma Tamiri',
      description: 'Arka aydınlatma sorunları, LED şerit değişimi ve parlaklık problemleri çözümü.',
      features: [
        'LED arka aydınlatma şerit değişimi',
        'İnvertör kartı tamiri',
        'Güç kaynağı onarımı',
        'Parlaklık ayarı',
        'Renk düzeltme',
        'Edge-lit ve direct-lit LEDler'
      ],
      priceRange: '₺500 - ₺1.200',
      href: '/services/led-replacement'
    },
    {
      icon: Cpu,
      title: 'Anakart & Logic Board Tamiri',
      description: 'Gelişmiş anakart teşhisi ve bileşen bazında onarımlar.',
      features: [
        'Bileşen bazında teşhis',
        'IC çip değişimi',
        'Yazılım güncelleme & yükleme',
        'Güç regülasyonu onarımı',
        'HDMI port tamiri',
        'Akıllı TV fonksiyonlarının geri kazandırılması'
      ],
      priceRange: '₺600 - ₺1.800',
      href: '/services/motherboard-repair'
    },
    {
      icon: Wrench,
      title: 'Genel TV Tamiri',
      description: 'Çeşitli sorunlar için kapsamlı TV tamir hizmetleri.',
      features: [
        'Ses problemleri',
        'Uzaktan kumanda sorunları',
        'Port ve konnektör tamiri',
        'Ayak ve montaj onarımları',
        'Yazılım sorun giderme',
        'Performans optimizasyonu'
      ],
      priceRange: '₺200 - ₺800',
      href: '/services/general-repair'
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Garanti Güvencesi',
      description: 'Tüm onarımlarda orijinal parça garantisiyle 12 ay garanti.'
    },
    {
      icon: Clock,
      title: 'Hızlı Servis',
      description: 'Aynı gün servis imkanı, hızlı teşhis ve onarım.'
    },
    {
      icon: CheckCircle,
      title: 'Uzman Teknisyenler',
      description: '10+ yıl deneyimli sertifikalı teknisyenler.'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Profesyonel TV Tamir Hizmetleri
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Tüm TV marka ve modelleri için uzman onarım hizmetleri. Ekran değişiminden anakart tamirine kadar hızlı, güvenilir ve garantili çözümler sunuyoruz.
            </p>
            <div className="flex flex-col gap-4 w-full items-center">
              <Link href="/quote">
                <Button size="lg" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                  Ücretsiz Fiyat Teklifi Al
                </Button>
              </Link>
              <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                <Button size="lg" variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                  Hemen Ara
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg border p-8 hover:shadow-xl transition-all duration-300 ${
                    service.popular ? 'border-blue-200 ring-2 ring-blue-100' : 'border-gray-100'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-8">
                      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        En Popüler
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>
                      
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500">Başlangıç fiyatı</div>
                          <div className="text-2xl font-bold text-blue-600">
                            {service.priceRange}
                          </div>
                        </div>
                        <Link href={service.href}>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Detaylı Bilgi
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden Zero Teknik'i Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-gray-600">
              En iyi TV tamir deneyimini sunmaya kararlıyız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            TV'nizi Onarmaya Hazır Mısınız?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Bugün ücretsiz teşhis ve fiyat teklifi alın. Uzman teknisyenlerimiz size yardımcı olmaya hazır.
          </p>
          <div className="flex flex-col gap-4 w-full items-center">
            <Link href="/quote">
              <Button size="lg" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                Ücretsiz Teklif Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                Hemen Ara: {siteSettings?.phone || '+90 552 558 79 05'}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;