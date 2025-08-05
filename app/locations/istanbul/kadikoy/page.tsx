"use client";

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Shield, Star, Phone, CheckCircle, Navigation, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

// Metadata (client component'te export edilemez)
// title: 'Kadıköy TV Ekran Tamiri | Samsung LG Sony Ekran Değişimi'
// description: 'Kadıköy ve çevresinde profesyonel TV ekran tamiri. Samsung, LG, Sony tüm markalar. Aynı gün servis, 12 ay garanti. Ücretsiz keşif!'
// keywords: 'kadıköy tv tamiri, kadıköy ekran değişimi, samsung tv tamiri kadıköy, lg ekran tamiri, sony tv servisi kadıköy'

const neighborhoods = [
  'Fenerbahçe', 'Göztepe', 'Caddebostan', 'Bostancı', 'Acıbadem', 
  'Kozyatağı', 'Feneryolu', 'Kızıltoprak', 'Erenköy', 'Suadiye',
  'Moda', 'Kalamış', 'Osmanağa', 'Hasanpaşa', 'Fikirtepe'
];

const brands = [
  { name: 'Samsung', popular: true },
  { name: 'LG', popular: true },
  { name: 'Sony', popular: true },
  { name: 'Vestel', popular: true },
  { name: 'TCL', popular: false },
  { name: 'Philips', popular: false },
  { name: 'Panasonic', popular: false },
  { name: 'Hisense', popular: false }
];

const services = [
  {
    title: 'TV Ekran Değişimi',
    description: 'Kırık veya hasarlı TV ekranlarının orijinal kalitede değişimi',
    icon: '📺',
    timeframe: '2-4 saat'
  },
  {
    title: 'LED Panel Tamiri',
    description: 'Arka aydınlatma, ölü piksel ve renk sorunları tamiri',
    icon: '💡',
    timeframe: '1-3 saat'
  },
  {
    title: 'Anakart Tamiri',
    description: 'Güç, görüntü ve ses sorunlarının elektronik tamiri',
    icon: '🔧',
    timeframe: '2-5 saat'
  }
];

const features = [
  { icon: Clock, title: 'Aynı Gün Servis', description: 'Kadıköy genelinde aynı gün müdahale' },
  { icon: Shield, title: '12 Ay Garanti', description: 'Tüm tamirlerde 1 yıl garanti' },
  { icon: Users, title: 'Uzman Teknisyen', description: 'Sertifikalı ve deneyimli ekip' },
  { icon: Navigation, title: 'Ücretsiz Keşif', description: 'Evde tespit ve fiyat teklifi' }
];

const KadikoyPage = () => {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    repairedCount: 847,
    responseTime: '45 dk',
    satisfaction: '98%'
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-700">Anasayfa</Link>
            <span className="text-gray-400">/</span>
            <Link href="/locations" className="text-blue-600 hover:text-blue-700">Lokasyonlar</Link>
            <span className="text-gray-400">/</span>
            <Link href="/locations/istanbul" className="text-blue-600 hover:text-blue-700">İstanbul</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Kadıköy</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-blue-600">Kadıköy</span> TV Ekran Tamiri
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Kadıköy ve çevresinde profesyonel TV ekran tamiri ve değişimi hizmetleri. 
                Samsung, LG, Sony, Vestel tüm markalar için aynı gün servis imkanı.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.repairedCount}+</div>
                  <div className="text-sm text-gray-600">Tamir Edilen TV</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.responseTime}</div>
                  <div className="text-sm text-gray-600">Ortalama Yanıt</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.satisfaction}</div>
                  <div className="text-sm text-gray-600">Müşteri Memnuniyeti</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8">
                    Ücretsiz Teklif Al
                  </Button>
                </Link>
                <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                    <Phone className="w-5 h-5 mr-2" />
                    Hemen Ara
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Kadıköy'de Hizmet Verdiğimiz Mahalleler</h3>
                <div className="grid grid-cols-2 gap-2">
                  {neighborhoods.slice(0, 8).map((neighborhood) => (
                    <div key={neighborhood} className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{neighborhood}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">ve diğer tüm mahalleler...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kadıköy'de Sunduğumuz <span className="text-blue-600">TV Tamiri Hizmetleri</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center text-sm text-blue-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{service.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TV Brands */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kadıköy'de Tamir Ettiğimiz <span className="text-blue-600">TV Markaları</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <div key={index} className={`bg-white rounded-lg p-6 text-center border-2 transition-all hover:shadow-md ${
                brand.popular ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
              }`}>
                <h3 className="font-semibold text-gray-900 mb-2">{brand.name}</h3>
                <p className="text-sm text-gray-600">
                  {brand.popular ? 'Popüler Marka' : 'Desteklenen Marka'}
                </p>
                {brand.popular && (
                  <div className="mt-2">
                    <Star className="w-4 h-4 text-yellow-500 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/brands">
              <Button variant="outline" className="px-8">
                Tüm Desteklenen Markaları Gör
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kadıköy'de Neden <span className="text-blue-600">Bizi Tercih Ediyorlar?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kadıköy'de Hizmet Verdiğimiz <span className="text-blue-600">Mahalleler</span>
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {neighborhoods.map((neighborhood) => (
              <div key={neighborhood} className="bg-white rounded-lg p-3 text-center border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                <MapPin className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">{neighborhood}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Kadıköy'de TV Ekranınız Bozuldu mu?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Aynı gün servis imkanı ile TV'nizi eski haline döndürüyoruz. 
            Ücretsiz keşif ve şeffaf fiyatlandırma garantisi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button size="lg" variant="secondary" className="px-8 py-4">
                Ücretsiz Teklif Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Hemen Ara - Kadıköy
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KadikoyPage;

