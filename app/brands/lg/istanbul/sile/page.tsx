"use client";

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Monitor, Clock, Shield, Star, Phone, CheckCircle, MapPin, Navigation } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Metadata (client component'te export edilemez)
// title: 'LG TV Tamiri Şile | LG Ekran Değişimi Şile Servisi'
// description: 'Şile'de LG TV ekran tamiri ve değişimi. Aynı gün LG TV servisi, orijinal parça, 12 ay garanti.'
// keywords: 'lg tv tamiri sile, lg ekran değişimi sile, sile lg servisi'

const features = [
  {
    icon: MapPin,
    title: 'Şile Merkez Konumu',
    description: 'Şile ve çevresinde 30 dakikada LG TV tamiri'
  },
  {
    icon: Shield,
    title: 'Orijinal LG Parça',
    description: 'Sadece orijinal LG yedek parçaları'
  },
  {
    icon: Clock,
    title: 'Aynı Gün Şile Servisi',
    description: 'Şile içinde aynı gün LG TV tamiri garantisi'
  },
  {
    icon: Star,
    title: 'Şile 12 Ay Garanti',
    description: 'Tüm LG tamirlerde 1 yıl garanti'
  }
];

const LGilePage = () => {
  const [mounted, setMounted] = useState(false);
  const [prices, setPrices] = useState<any>(null);

  
  const formatWorkingHours = (workingHours: any) => {
    if (!workingHours || !Array.isArray(workingHours)) {
      return 'Pazartesi-Pazar 08:00-22:00';
    }
    
    const weekdays = workingHours.filter(w => !['Cumartesi', 'Pazar'].includes(w.day));
    const saturday = workingHours.find(w => w.day === 'Cumartesi');
    const sunday = workingHours.find(w => w.day === 'Pazar');
    
    if (weekdays.length > 0 && weekdays.every(w => w.hours === weekdays[0].hours)) {
      let result = `Pazartesi-Cuma ${weekdays[0].hours}`;
      if (saturday && saturday.hours !== 'Kapalı') {
        result += `, Cumartesi ${saturday.hours}`;
      }
      if (sunday && sunday.hours !== 'Kapalı') {
        result += `, Pazar ${sunday.hours}`;
      } else if (saturday && saturday.hours === 'Kapalı') {
        // Pazar kapalı, Cumartesi de kapalıysa
      } else {
        result += ', Pazar Kapalı';
      }
      return result;
    }
    
    return workingHours.map(w => `${w.day} ${w.hours}`).join(', ');
  };

  useEffect(() => {
    setMounted(true);
    fetch('/api/prices')
      .then(res => res.json())
      .then(data => {
        if (data.LG) {
          setPrices(data.LG);
        }
      
    
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data));
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
            <Link href="/brands/lg/istanbul" className="text-blue-600 hover:text-blue-700">İstanbul</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Şile</span>
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
                    <span className="text-blue-600">LG TV</span> Tamiri
                  </h1>
                  <p className="text-lg text-gray-600">Şile - İstanbul</p>
                  <div className="flex items-center mt-2 text-blue-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">Şile Merkez Lokasyon</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Şile'de profesyonel LG TV ekran tamiri ve değişimi. 
                Aynı gün LG servis hizmeti, orijinal parça kullanımı ve 12 ay garanti.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">Şile LG Tamiri</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">30 dk</div>
                  <div className="text-sm text-gray-600">Şile Ulaşım</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">99%</div>
                  <div className="text-sm text-gray-600">Şile Memnuniyet</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote?brand=LG&location=Şile">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8">
                    Şile LG Teklifi
                  </Button>
                </Link>
                <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Phone className="w-5 h-5 mr-2" />
                    Şile Destek Hattı
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Şile LG TV Servisi</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Aynı gün Şile servisi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Orijinal LG parçaları</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">12 ay Şile garantisi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Uzman LG teknisyeni</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Şile bölgesinde LG TV tamiri için güvenilir adres.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Şile LG TV <span className="text-blue-600">Servis Avantajları</span>
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

      {/* Location Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Şile'de <span className="text-blue-600">LG TV Tamiri</span>
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Şile bölgesinde LG TV tamiri hizmeti veriyoruz. 
                  Tüm LG modelleri için uzman teknisyen kadromuz ile hızlı ve güvenilir tamir hizmeti.
                </p>
                <p className="text-gray-600">
                  LG Smart TV, 4K, LED panel ve tüm LG televizyon modelleri için 
                  Şile'de aynı gün servis garantisi sunuyoruz.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">LG Şile Servis Avantajları:</h3>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Aynı gün LG TV tamiri</li>
                    <li>• Orijinal LG yedek parçası</li>
                    <li>• 12 ay garanti</li>
                    <li>• Şile bölgesinde hızlı servis</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Şile <span className="text-blue-600">LG Servis Bilgileri</span>
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Servis Bölgesi</h3>
                      <p className="text-sm text-gray-600">Şile ve çevresi</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Çalışma Saatleri</h3>
                      <p className="text-sm text-gray-600">{formatWorkingHours(siteSettings?.workingHours)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Şile Destek</h3>
                      <p className="text-sm text-gray-600">{siteSettings?.phone || '+90 552 558 79 05'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Monitor className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Uzmanlık Alanı</h3>
                      <p className="text-sm text-gray-600">LG TV Tamiri ve Bakımı</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Şile'de LG TV'niz Bozuldu mu?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Şile bölgesinde LG TV için aynı gün servis, orijinal parça garantisi ve 12 ay garanti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote?brand=LG&location=Şile">
              <Button size="lg" variant="secondary" className="px-8 py-4">
                Şile LG TV Teklifi Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Şile Destek Hattı
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LGilePage;
