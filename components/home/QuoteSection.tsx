'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePrices } from '@/lib/PricesContext';

const QuoteSection = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedIssue, setSelectedIssue] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [brands, setBrands] = useState<string[]>([]);

  const { prices, loading } = usePrices();

  const sizes = ['32"', '40"', '43"', '50"', '55"', '65"', '75"', '85"'];
  const issues = [
    { name: 'Cracked Screen', turkishName: 'Kırık Ekran' },
    { name: 'Black Screen', turkishName: 'Siyah Ekran' },
    { name: 'Backlight Issues', turkishName: 'Arka Aydınlatma Sorunları' },
    { name: 'Dead Pixels', turkishName: 'Ölü Piksel' },
    { name: 'Color Problems', turkishName: 'Renk Sorunları' },
    { name: 'No Power', turkishName: 'Güç Yok' },
    { name: 'Other', turkishName: 'Diğer' }
  ];

  useEffect(() => {
    fetch('/api/brands')
      .then(res => res.json())
      .then(data => setBrands(data.map((b: any) => b.name)));
  }, []);

  // Yeni fiyat yapısından fiyat hesapla
  const calculatePrice = () => {
    if (!selectedBrand || !selectedSize || !selectedIssue || !prices) {
      setEstimatedPrice('');
      return;
    }

    // Seçilen sorun tipini Türkçe'ye çevir
    const selectedIssueObj = issues.find(issue => issue.name === selectedIssue);
    const turkishIssueName = selectedIssueObj?.turkishName || selectedIssue;

    // Yeni fiyat yapısından fiyatı al
    const brandData = prices[selectedBrand];
    if (brandData && typeof brandData === 'object' && !Array.isArray(brandData)) {
      const sizeData = (brandData as any)[selectedSize];
      if (sizeData && typeof sizeData === 'object') {
        const price = sizeData[turkishIssueName];
        if (typeof price === 'string' && price.includes('~')) {
          // Fiyat aralığı formatında kaydedilmiş
          setEstimatedPrice(price);
          return;
        } else if (typeof price === 'number') {
          // Eski format - tek fiyat, aralık oluştur
          const minPrice = Math.round(price * 0.8);
          const maxPrice = Math.round(price * 1.2);
          setEstimatedPrice(`₺${minPrice.toLocaleString()} ~ ₺${maxPrice.toLocaleString()}`);
          return;
        }
      }
    }

    // Eğer özel fiyat bulunamazsa, genel fiyat aralığını kullan
    if (prices.generalQuoteRange) {
      setEstimatedPrice(prices.generalQuoteRange);
    } else {
      setEstimatedPrice('₺3242 ~ ₺3442');
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [selectedBrand, selectedSize, selectedIssue, prices]);

  if (loading || !prices) return null;

  return (
    <section id="quote-section" className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Anında Fiyat Teklifi Alın
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              TV'niz için hızlı fiyat hesaplama aracıyla tahmini onarım maliyetini öğrenin. Fiyatlarımız şeffaf ve rekabetçidir.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calculator className="w-8 h-8" />
                </div>
                <div className="font-semibold">Hızlı Teklif</div>
                <div className="text-sm text-blue-100">Saniyeler içinde fiyat alın</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-8 h-8" />
                </div>
                <div className="font-semibold">Uzman Danışmanlık</div>
                <div className="text-sm text-blue-100">Teknisyenlerimizle görüşün</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div className="font-semibold">WhatsApp Destek</div>
                <div className="text-sm text-blue-100">Hızlı yanıt garantisi</div>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-2xl p-8 text-gray-900">
            <h3 className="text-2xl font-bold mb-6 text-center">
              TV Onarım Hesaplayıcı
            </h3>
            
            <div className="space-y-6">
              {/* Brand Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">TV Markası</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Marka Seçin</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Ekran Boyutu</label>
                <select
                  value={selectedSize}
                  onChange={(e) => {
                    setSelectedSize(e.target.value);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Boyut Seçin</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Issue Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Sorun Tipi</label>
                <select
                  value={selectedIssue}
                  onChange={(e) => {
                    setSelectedIssue(e.target.value);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sorun Seçin</option>
                  {issues.map(issue => (
                    <option key={issue.name} value={issue.name}>{issue.turkishName}</option>
                  ))}
                </select>
              </div>

              {/* Price Display */}
              {estimatedPrice && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-sm text-blue-600 font-medium">Tahmini Fiyat Aralığı</div>
                    <div className="text-3xl font-bold text-blue-700 mt-1">{estimatedPrice}</div>
                    <div className="text-sm text-blue-600 mt-1">*Kesin fiyat teşhis sonrası belirlenecektir</div>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link
                  href={{
                    pathname: "/quote",
                    query: {
                      brand: selectedBrand,
                      size: selectedSize,
                      issue: selectedIssue
                    }
                  }}
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                    Detaylı Teklif Al
                  </Button>
                </Link>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Profesyonel Destek</h4>
                  <p className="text-gray-600 mb-4">
                    Teknik ekibimiz ile görüşerek daha detaylı bilgi alabilirsiniz.
                  </p>
                </div>
                
                <a href="tel:+905525587905">
                  <Button size="lg" variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    Hemen Ara
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;