'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Star, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const IstanbulLocationPage = () => {
  const serviceAreas = [
    'Kadıköy', 'Şişli', 'Beşiktaş', 'Üsküdar', 'Fatih', 'Beyoğlu',
    'Bakırköy', 'Maltepe', 'Ataşehir', 'Pendik', 'Kartal', 'Tuzla'
  ];

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
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data));
  }, []);

  const whyChooseUs = [
    'İstanbul genelinde aynı gün servis',
    'Ücretsiz alım ve teslimat hizmeti',
    'Tüm büyük TV markaları desteklenir',
    'Tüm onarımlarda 12 ay garanti',
    'Sertifikalı ve deneyimli teknisyenler',
    'Şeffaf fiyatlandırma, gizli maliyet yok'
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Link href="/locations" className="text-blue-600 hover:text-blue-700">Lokasyonlar</Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">İstanbul</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                İstanbul <span className="text-blue-600">TV Ekran Tamiri</span> ve Değişimi
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                İstanbul genelinde profesyonel TV ekran değişimi ve tamir hizmetleri. Samsung, LG, Sony, Vestel tüm markalar. Aynı gün servis, uzman teknisyenler ve 12 ay garanti.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">15M+</div>
                  <div className="text-sm text-gray-600">Hizmet Verilen Nüfus</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">39</div>
                  <div className="text-sm text-gray-600">Kapsanan İlçe</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2s</div>
                  <div className="text-sm text-gray-600">Yanıt Süresi</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
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

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4954006/pexels-photo-4954006.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="TV Repair Service in Istanbul"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Tüm İstanbul</div>
                    <div className="text-sm text-gray-600">Tüm İlçeler</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              İstanbul'daki Hizmet Bölgeleri
            </h2>
            <p className="text-xl text-gray-600">
              İstanbul'un tüm büyük ilçelerinde TV tamir hizmeti sunuyoruz
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
              Bölgenizi listede göremiyor musunuz? Çevre ilçelere de hizmet veriyoruz.
            </p>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Uygunluk İçin Ara
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              İstanbul'daki Hizmetlerimiz
            </h2>
            <p className="text-xl text-gray-600">
              Tüm ihtiyaçlarınız için kapsamlı TV tamir çözümleri
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">Hizmetler yükleniyor...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service, index) => (
                <div key={service.id || index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Başlangıç Fiyatı</div>
                      <div className="text-lg font-bold text-blue-600">{service.priceRange ? service.priceRange.split('-')[0].trim() : service.price || 'Fiyat için teklif alın'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Süre</div>
                      <div className="text-lg font-bold text-green-600">{index === 0 ? '2-4 saat' : index === 1 ? '1-3 saat' : '2-5 saat'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden İstanbul Servisimizi Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-gray-600">
              Yerel uzmanlık, profesyonel kaliteyle buluşuyor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {whyChooseUs.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                İletişim Bilgileri
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Telefon</div>
                    <div className="text-blue-600">{siteSettings?.phone || '+90 552 558 79 05'}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Çalışma Saatleri</div>
                    <div className="text-gray-600">
                      {siteSettings?.workingHours ? (
                        <div className="flex flex-col gap-1">
                          {siteSettings.workingHours.map((wh: any, idx: number) => (
                            <div key={idx}>{wh.day}: {wh.hours}</div>
                          ))}
                        </div>
                      ) : (
                        <div>Pzt-Paz: 8:00 - 22:00</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Adres</div>
                    <div className="text-gray-600">{siteSettings?.address || 'Tüm İstanbul İlçeleri'}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-5 h-5 text-blue-600 font-bold">@</span>
                  <div>
                    <div className="font-medium text-gray-900">E-posta</div>
                    <div className="text-gray-600">{siteSettings?.email || 'zero@ledtvpaneli.com'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            İstanbul'da TV Tamiri Mi Lazım?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            İstanbul'un her yerinde hızlı ve profesyonel TV tamir hizmeti. Ücretsiz teşhis, şeffaf fiyatlandırma ve aynı gün servis imkanı.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/quote">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Ücretsiz Fiyat Teklifi Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone || '+905525587905'}`}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Ara: {siteSettings?.phone || '+90 552 558 79 05'}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IstanbulLocationPage;
