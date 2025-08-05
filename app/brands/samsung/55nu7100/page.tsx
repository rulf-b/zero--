'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Monitor, Shield, Clock, CheckCircle, Star } from 'lucide-react';
import { usePrices } from '@/lib/PricesContext';

const Samsung55NU7100Page = () => {
  const tvSpecs = {
    brand: 'Samsung',
    model: '55NU7100',
    screenSize: '55 inç',
    resolution: '4K UHD (3840 x 2160)',
    displayType: 'LED',
    releaseYear: '2018',
    panelType: 'VA Panel'
  };

  const commonIssues = [
    {
      issue: 'Kırık veya Çatlak Ekran',
      description: 'Ekran panelinde fiziksel hasar',
      repairCost: '₺1.800 - ₺2.200',
      repairTime: '2-4 saat'
    },
    {
      issue: 'Siyah Ekran / Görüntü Yok',
      description: 'TV açılıyor ancak görüntü gelmiyor',
      repairCost: '₺800 - ₺1.500',
      repairTime: '1-3 saat'
    },
    {
      issue: 'Arka Aydınlatma Sorunları',
      description: 'Kısık ekran veya dengesiz parlaklık',
      repairCost: '₺600 - ₺1.200',
      repairTime: '2-3 saat'
    },
    {
      issue: 'Dikey/Yatay Çizgiler',
      description: 'Ekranda çizgiler oluşuyor',
      repairCost: '₺700 - ₺1.400',
      repairTime: '2-4 saat'
    }
  ];

  const repairFeatures = [
    'Orijinal Samsung uyumlu parçalar',
    'Sertifikalı teknisyenler tarafından profesyonel montaj',
    'Tüm onarımlarda 12 ay garanti',
    'Aynı gün servis imkanı',
    'Renk kalibrasyonu ve test dahil',
    'İstanbul içi ücretsiz alım ve teslimat'
  ];

  const { prices, loading } = usePrices();
  if (loading || !prices) return <div className="text-center py-20">Fiyatlar yükleniyor...</div>;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Link href="/brands" className="text-blue-600 hover:text-blue-700">Markalar</Link>
                <span className="text-gray-400">/</span>
                <Link href="/brands/samsung" className="text-blue-600 hover:text-blue-700">Samsung</Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">55NU7100</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Samsung 55NU7100
                <span className="block text-blue-600">Ekran Değişimi</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Samsung 55NU7100 TV'niz için profesyonel tamir hizmeti. Uzman teknisyenler, orijinal parçalar ve garantili hızlı servis.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-2xl font-bold text-blue-600">₺{prices.samsung55nu7100}</div>
                  <div className="text-sm text-gray-600">Başlangıç Fiyatı</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">2-4s</div>
                  <div className="text-sm text-gray-600">Onarım Süresi</div>
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
                    Hemen Ara
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <img
                  src="https://images.pexels.com/photos/4009599/pexels-photo-4009599.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Samsung 55NU7100 TV"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">TV Özellikleri</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marka:</span>
                    <span className="font-medium">{tvSpecs.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model:</span>
                    <span className="font-medium">{tvSpecs.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ekran Boyutu:</span>
                    <span className="font-medium">{tvSpecs.screenSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Çözünürlük:</span>
                    <span className="font-medium">{tvSpecs.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Panel Tipi:</span>
                    <span className="font-medium">{tvSpecs.panelType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ekran Tipi:</span>
                    <span className="font-medium">{tvSpecs.displayType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sık Karşılaşılan Samsung 55NU7100 Sorunları
            </h2>
            <p className="text-xl text-gray-600">
              En sık yaşanan sorunlar için profesyonel tamir çözümleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commonIssues.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.issue}
                </h3>
                <p className="text-gray-600 mb-6">
                  {item.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Onarım Ücreti</div>
                    <div className="text-lg font-bold text-blue-600">{item.repairCost}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Onarım Süresi</div>
                    <div className="text-lg font-bold text-green-600">{item.repairTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden Samsung Servisimizi Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-gray-600">
              Garantili kaliteyle profesyonel hizmet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repairFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">12-Month Warranty</h3>
                <p className="text-gray-600">Comprehensive warranty on all repairs and parts</p>
              </div>
              <div>
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Service</h3>
                <p className="text-gray-600">Most repairs completed within same day</p>
              </div>
              <div>
                <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Technicians</h3>
                <p className="text-gray-600">Certified Samsung repair specialists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Samsung 55NU7100 TV'nizi Onarmaya Hazır Mısınız?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Samsung TV'niz için ücretsiz teşhis ve şeffaf fiyat teklifi alın. Uzman teknisyenlerimiz TV'nizi ilk günkü haline getirmeye hazır.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/quote">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Ücretsiz Fiyat Teklifi Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Ara: {siteSettings?.phone || '+90 552 558 79 05'}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Samsung55NU7100Page;
