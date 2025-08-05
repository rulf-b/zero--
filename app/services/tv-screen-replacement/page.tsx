"use client";

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Monitor, Shield, Clock, Star, CheckCircle } from 'lucide-react';
import { usePrices } from '@/lib/PricesContext';
import { useEffect, useState } from 'react';

// Metadata (moved from export for client component compatibility):
// title: 'TV Screen Replacement Service | LCD, LED, OLED Screen Repair'
// description: 'Professional TV screen replacement for all brands. LCD, LED, OLED, QLED screens. Same-day service, 12-month warranty. Get quote now!'
// keywords: 'TV screen replacement, LCD screen repair, LED screen replacement, OLED screen fix, broken TV screen'

const TVScreenReplacementPage = () => {
  const { prices, loading } = usePrices();
  const [screenTypes, setScreenTypes] = useState<any[]>([]);
  const [screenTypesLoading, setScreenTypesLoading] = useState(true);
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

  useEffect(() => {
    fetch('/api/services/screen-types')
      .then(res => res.json())
      .then(data => {
        setScreenTypes(data);
        setScreenTypesLoading(false);
      });
  }, []);

  if (loading || !prices || screenTypesLoading) return <div className="text-center py-20">Fiyatlar yükleniyor...</div>;

  const supportedBrands = [
    'Samsung', 'LG', 'Sony', 'Philips', 'TCL', 'Hisense', 'Vestel', 'Panasonic'
  ];

  const process = [
    {
      step: 1,
      title: "Ücretsiz Teşhis",
      description: "TV\u0027nizi inceliyor, detaylı hasar raporu sunuyoruz"
    },
    {
      step: 2,
      title: "Teklif & Onay",
      description: "Şeffaf fiyatlandırma, gizli maliyet yok"
    },
    {
      step: 3,
      title: "Ekran Değişimi",
      description: "Orijinal parça ile profesyonel montaj"
    },
    {
      step: 4,
      title: "Test & Garanti",
      description: "Tüm testler ve 12 ay garanti"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Profesyonel TV Ekran Değişimi
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Kırık, çatlak veya arızalı TV ekranlarının uzman değişimi. Tüm büyük markalara orijinal kalitede panel ve aynı gün servis.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2-4 Saat</div>
                  <div className="text-sm text-gray-600">Servis Süresi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">12 Ay</div>
                  <div className="text-sm text-gray-600">Garanti</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">%99</div>
                  <div className="text-sm text-gray-600">Başarı Oranı</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                    Ücretsiz Teklif Al
                  </Button>
                </Link>
                <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                    Uzmanı Ara
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4009599/pexels-photo-4009599.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="TV Screen Replacement Service"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Screen Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Değişimini Yaptığımız Ekran Tipleri
            </h2>
            <p className="text-xl text-gray-600">
              Tüm ekran teknolojileri için profesyonel değişim
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {screenTypes.map((type, index) => (
              <div key={type.id || index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Monitor className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {type.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {type.description}
                </p>
                <div className="text-2xl font-bold text-blue-600">
                  {type.priceRange}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Brands */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Desteklenen TV Markaları
            </h2>
            <p className="text-xl text-gray-600">
              Tüm büyük TV markalarına orijinal yedek parça ile hizmet
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {supportedBrands.map((brand, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-lg font-semibold text-gray-900">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ekran Değişim Sürecimiz
            </h2>
            <p className="text-xl text-gray-600">
              Teşhisten teslimata şeffaf ve kolay süreç
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Orijinal Kalite Parçalar</h3>
              <p className="text-blue-100">Sadece orijinal standartlara uygun yüksek kaliteli ekranlar kullanıyoruz.</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Hızlı Servis</h3>
              <p className="text-blue-100">Çoğu ekran değişimi 2-4 saat içinde, aynı gün teslim.</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">12 Ay Garanti</h3>
              <p className="text-blue-100">Tüm değişimler kapsamlı 12 ay garanti ile sunulur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            TV Ekranınız mı Değişecek?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            TV ekran değişimi için ücretsiz teşhis ve fiyat teklifi alın. Uzman teknisyenlerimiz TV'nizi ilk günkü gibi yeniler.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/quote">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Hemen Ücretsiz Teklif Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Ara: {siteSettings?.phone || '+90 552 558 79 05'}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TVScreenReplacementPage;