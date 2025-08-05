"use client";

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Monitor, Cpu, Zap, Wrench, Shield, Clock, CheckCircle } from 'lucide-react';

const iconMap: Record<string, any> = {
  Monitor,
  Cpu,
  Zap,
  Wrench,
  Shield,
  Clock,
  CheckCircle,
};

// Metadata (moved from export for client component compatibility):
// title: 'TV Tamiri Hizmetleri İstanbul | Ekran Değişimi & LED Panel Tamiri'
// description: 'İstanbul genelinde TV tamiri hizmetleri: Ekran değişimi, LED panel tamiri, anakart onarımı. Samsung, LG, Sony tüm markalar. Aynı gün servis.'
// keywords: 'tv tamiri hizmetleri istanbul, ekran değişimi, led panel tamiri, anakart tamiri, tv onarımı istanbul'
// openGraph: { ... }
// twitter: { ... }

const ServicesPage = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      });
  }, []);

  // Site ayarlarını çek
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data))
      .catch(error => console.error('Site ayarları yüklenirken hata:', error));
  }, []);

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
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 mb-24">
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
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {loading ? (
          <div className="text-center py-20">Hizmetler yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Monitor;
              return (
                <div
                  key={service.id || index}
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
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mb-4">
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
                      {service.features && service.features.map((feature: string, idx: number) => (
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
                      <Link href={service.href && service.href.trim() !== '' ? service.href : '/quote'}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Teklif Al
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 py-24 bg-gray-50 rounded-2xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Neden Zero Teknik'i Tercih Etmelisiniz?
          </h2>
          <p className="text-xl text-gray-600">
            En iyi TV tamir deneyimini sunmaya kararlıyız
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <h2 className="text-4xl font-bold mb-6">
          TV'nizi Onarmaya Hazır Mısınız?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Bugün ücretsiz teşhis ve fiyat teklifi alın. Uzman teknisyenlerimiz size yardımcı olmaya hazır.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/quote">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
              Ücretsiz Fiyat Teklifi Al
            </Button>
          </Link>
          <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Hemen Ara
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;