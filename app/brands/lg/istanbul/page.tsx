"use client";

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Monitor, Clock, Shield, Star, Phone, CheckCircle, Wrench, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Metadata (client component'te export edilemez)
// title: 'LG TV Ekran Tamiri İstanbul | LG Ekran Değişimi Servisi'
// description: 'İstanbul genelinde LG TV ekran tamiri ve değişimi. Tüm LG OLED, NanoCell, UltraHD modelleri için aynı gün servis, orijinal parça, 12 ay garanti.'
// keywords: 'lg tv tamiri istanbul, lg ekran değişimi, lg oled tamiri, lg nanocell servisi, lg tv servisi istanbul'

const lgSeries = [
  { series: 'OLED Series', models: ['C3', 'G3', 'B3', 'A3'], popular: true },
  { series: 'NanoCell', models: ['NANO75', 'NANO80', 'NANO86'], popular: true },
  { series: 'UltraHD 4K', models: ['UP75', 'UP77', 'UP81'], popular: true },
  { series: 'QNED', models: ['QNED80', 'QNED85', 'QNED90'], popular: false },
  { series: 'Full HD', models: ['LM63', 'LM55', 'LM50'], popular: false }
];

const commonIssues = [
  {
    issue: 'OLED Panel Yanığı',
    description: 'OLED ekranlarda görüntü kalıcılığı ve renk yanması',
    icon: '🔥',
    severity: 'Yüksek'
  },
  {
    issue: 'NanoCell Arka Aydınlatma',
    description: 'LED backlighting ve dimming sorunları',
    icon: '💡',
    severity: 'Orta'
  },
  {
    issue: 'webOS Sistem Hatası',
    description: 'Smart TV işletim sistemi ve yazılım sorunları',
    icon: '⚙️',
    severity: 'Düşük'
  },
  {
    issue: 'Kırık Ekran',
    description: 'Fiziksel hasar ve çatlak ekran problemleri',
    icon: '📺',
    severity: 'Yüksek'
  }
];

const districts = [
  'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler',
  'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü',
  'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt',
  'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane',
  'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer',
  'Silivri', 'Sultangazi', 'Sultanbeyli', 'Şile', 'Şişli', 'Tuzla',
  'Ümraniye', 'Üsküdar', 'Zeytinburnu'
];

const features = [
  {
    icon: Shield,
    title: 'Orijinal LG Parça',
    description: 'Sadece orijinal LG yedek parçaları ve OLED panelleri'
  },
  {
    icon: Users,
    title: 'LG Sertifikalı Teknisyen',
    description: 'LG eğitimli ve OLED uzmanı teknisyen kadromuz'
  },
  {
    icon: Clock,
    title: 'Aynı Gün LG Servisi',
    description: 'İstanbul genelinde aynı gün LG TV tamiri'
  },
  {
    icon: Star,
    title: '12 Ay LG Garantisi',
    description: 'Tüm LG tamirlerde 1 yıl garanti'
  }
];

const LGIstanbulPage = () => {
  const [mounted, setMounted] = useState(false);
  const [prices, setPrices] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // LG fiyatlarını çek
    fetch('/api/prices')
      .then(res => res.json())
      .then(data => {
        if (data.LG) {
          setPrices(data.LG);
        }
      });
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
            <Link href="/brands" className="text-blue-600 hover:text-blue-700">Markalar</Link>
            <span className="text-gray-400">/</span>
            <Link href="/brands/lg" className="text-blue-600 hover:text-blue-700">LG</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">İstanbul</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-white p-3 rounded-xl shadow-md">
                  <Image src="/brands/lg.png" alt="LG Logo" width={60} height={40} className="object-contain" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                    <span className="text-blue-600">LG</span> TV Tamiri
                  </h1>
                  <p className="text-lg text-gray-600">İstanbul Genelinde</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                İstanbul genelinde profesyonel LG TV ekran tamiri ve değişimi. 
                OLED, NanoCell, UltraHD tüm LG modelleri için orijinal parça kullanımı, aynı gün servis ve 12 ay garanti.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1.800+</div>
                  <div className="text-sm text-gray-600">LG TV Tamiri</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-gray-600">OLED Başarı Oranı</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">90 dk</div>
                  <div className="text-sm text-gray-600">Ortalama Tamir</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote?brand=LG">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8">
                    LG TV Teklifi Al
                  </Button>
                </Link>
                <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Phone className="w-5 h-5 mr-2" />
                    LG Destek Hattı
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Popüler LG Serileri</h3>
                <div className="space-y-4">
                  {lgSeries.filter(s => s.popular).map((series) => (
                    <div key={series.series} className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-semibold text-gray-900">{series.series}</h4>
                      <p className="text-sm text-gray-600">{series.models.join(', ')}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">ve diğer tüm LG modelleri...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Sık Görülen <span className="text-blue-600">LG TV Arızaları</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonIssues.map((issue, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">{issue.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{issue.issue}</h3>
                <p className="text-gray-600 text-sm mb-3">{issue.description}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  issue.severity === 'Yüksek' ? 'bg-blue-100 text-red-800' :
                  issue.severity === 'Orta' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {issue.severity} Öncelik
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LG Series */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tamir Ettiğimiz <span className="text-blue-600">LG TV Serileri</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lgSeries.map((series, index) => (
              <div key={index} className={`bg-white rounded-lg p-6 border-2 transition-all hover:shadow-md ${
                series.popular ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{series.series}</h3>
                  {series.popular && (
                    <Star className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <div className="space-y-2">
                  {series.models.map((model) => (
                    <div key={model} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{model}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            LG TV <span className="text-blue-600">Servis Avantajlarımız</span>
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

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            LG TV Servisi Verdiğimiz <span className="text-blue-600">İstanbul İlçeleri</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {districts.map((district) => (
              <Link 
                key={district}
                href={`/brands/lg/istanbul/${district.toLowerCase().replace('ç','c').replace('ğ','g').replace('ı','i').replace('ö','o').replace('ş','s').replace('ü','u')}`}
                className="bg-white rounded-lg p-4 text-center border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <Monitor className="w-6 h-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {district}
                </span>
                <p className="text-xs text-gray-500 mt-1">LG Servis</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Price Preview */}
      {prices && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              LG TV <span className="text-blue-600">Tamir Fiyatları</span>
            </h2>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ekran Boyutuna Göre</h3>
                  <div className="space-y-3">
                    {Object.entries(prices).slice(0, 4).map(([size, priceData]: [string, any]) => (
                      <div key={size} className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-700">{size} LG TV</span>
                        <span className="text-blue-600 font-semibold">
                          ₺{priceData['Kırık Ekran']?.toLocaleString()} - ₺{priceData['Siyah Ekran']?.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">LG Özel Servisler</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">OLED Panel Değişimi</span>
                      <span className="text-blue-600 font-semibold">Özel Fiyat</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">NanoCell Tamiri</span>
                      <span className="text-yellow-600 font-semibold">Orta</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">webOS Güncelleme</span>
                      <span className="text-green-600 font-semibold">Düşük</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <Link href="/quote?brand=LG">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                    Detaylı LG Fiyat Teklifi Al
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            LG TV'niz Bozuldu mu? OLED Uzmanı Ekibimiz Yardımcı Olsun!
          </h2>
          <p className="text-xl text-red-100 mb-8">
            İstanbul genelinde LG TV için aynı gün servis, orijinal OLED parça garantisi ve 12 ay garanti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote?brand=LG">
              <Button size="lg" variant="secondary" className="px-8 py-4">
                LG TV Teklifi Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                LG Destek Hattı
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LGIstanbulPage;

