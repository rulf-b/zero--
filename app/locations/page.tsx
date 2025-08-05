'use client';

import Link from "next/link";
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield, Star, CheckCircle, Truck, Users } from 'lucide-react';
import { Metadata } from 'next';
import Services from '@/components/home/Services';
import { useEffect, useState } from 'react';

const serviceAreas = [
  'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt', 'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane', 'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer', 'Şile', 'Şişli', 'Sultanbeyli', 'Sultangazi', 'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu'
];

const whyChooseUs = [
  {
    icon: Clock,
    title: 'Aynı gün servis imkanı',
    description: 'İstanbul genelinde aynı gün hızlı servis'
  },
  {
    icon: Truck,
    title: 'Ücretsiz alım ve teslimat',
    description: 'Evinizden alıp tamir edip geri getiriyoruz'
  },
  {
    icon: CheckCircle,
    title: 'Tüm büyük TV markaları desteklenir',
    description: 'Samsung, LG, Sony, Vestel ve tüm markalar'
  },
  {
    icon: Shield,
    title: '12 ay garanti',
    description: 'Tüm tamir işlemlerinde 1 yıl garanti'
  },
  {
    icon: Users,
    title: 'Sertifikalı ve deneyimli teknisyenler',
    description: 'Uzman kadromuz ile profesyonel hizmet'
  },
  {
    icon: Star,
    title: 'Şeffaf fiyatlandırma, gizli maliyet yok',
    description: 'Net fiyat, ek ücret yok'
  }
];

// Metadata (client component'te export edilemez)
// title: 'İstanbul TV Ekran Tamiri | Tüm İlçelerde Hızlı Servis - Zero Teknik'
// description: 'İstanbul'un 39 ilçesinde TV ekran tamiri ve değişimi. Kadıköy, Beşiktaş, Şişli, Üsküdar ve tüm ilçelerde aynı gün servis. Ücretsiz keşif!'
// keywords: 'istanbul tv tamiri, kadıköy tv tamiri, beşiktaş ekran değişimi, şişli tv tamiri, üsküdar tv servisi, istanbul tv servisi'

export default function LocationsPage() {
  const [siteSettings, setSiteSettings] = useState<any>(null);

  const formatWorkingHours = (workingHours: any) => {
    if (!workingHours || !Array.isArray(workingHours)) {
      return 'Pazartesi-Cumartesi 08:00-18:00';
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
      } else if (!saturday || saturday.hours === 'Kapalı') {
        // Pazar kapalı, Cumartesi de kapalıysa belirtme
      } else {
        result += ', Pazar Kapalı';
      }
      return result;
    }
    
    return workingHours.map(w => `${w.day} ${w.hours}`).join(', ');
  };

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data));
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-20 pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-blue-600 font-semibold">Lokasyonlar</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            İstanbul <span className="text-blue-600">TV Ekran Tamiri</span> Hizmetleri
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            İstanbul'un 39 ilçesinde profesyonel TV ekran değişimi ve değişimi. Samsung, LG, Sony, Vestel tüm markalar için aynı gün servis, uzman teknisyenler ve 12 ay garanti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/quote">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                Ücretsiz Fiyat Teklifi Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                <Phone className="w-5 h-5 mr-2" />
                Hemen Ara
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden Bizi <span className="text-blue-600">Tercih Etmelisiniz?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              İstanbul genelinde TV tamir hizmetinde öncü olmamızın sebepleri
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div key={i} className="group">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 h-full">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hizmet Verdiğimiz İlçeler
            </h2>
            <p className="text-xl text-gray-600">
              İstanbul'un tüm ilçelerinde TV tamir hizmeti sunuyoruz
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {serviceAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-100 p-4 text-center hover:shadow-lg transition-shadow">
                <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900">{area}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Tüm İstanbul ilçelerine hizmet veriyoruz.
            </p>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Uygunluk İçin Ara
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Merkez <span className="text-blue-600">Lokasyonumuz</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Zero Elektronik TV Servisi - İstanbul genelinde hizmet veriyoruz
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12050.9231403117!2d29.26807526389628!3d40.96547613195019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad101db35db8d%3A0x12e7825d5fbdc1e!2sZero%20Elektronik%20TV%20Servisi!5e0!3m2!1str!2str!4v1754264365989!5m2!1str!2str" 
                width="100%" 
                height="450" 
                style={{border: 0}} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96 md:h-[450px]"
              />
            </div>
            
            <div className="p-8 bg-gradient-to-r from-blue-50 to-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-6 h-6 text-blue-600 mr-2" />
                    Zero Elektronik TV Servisi
                  </h3>
                  <p className="text-gray-600 mb-4">
                    İstanbul genelinde profesyonel TV tamir hizmeti veren güvenilir adresiniz. 
                    Tüm marka ve modellerde uzman teknisyen kadromuz ile hizmetinizdeyiz.
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>Hizmet Alanı:</strong> İstanbul - Tüm İlçeler
                    </p>
                    <p className="text-gray-700">
                      <strong>Çalışma Saatleri:</strong> {formatWorkingHours(siteSettings?.workingHours)}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center space-y-4">
                  <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Phone className="w-5 h-5 mr-2" />
                      Hemen Ara: {siteSettings?.phone || '+90 552 558 79 05'}
                    </Button>
                  </a>
                  <Link href="/quote">
                    <Button size="lg" variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      Ücretsiz Fiyat Teklifi Al
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Services />
    </div>
  );
} 