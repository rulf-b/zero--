'use client';

import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Phone, MessageCircle, Calculator, Clock } from 'lucide-react';

// Rate limiting helper functions
const RATE_LIMIT_KEY = 'quote_form_submissions';
const MAX_SUBMISSIONS = 3;
const TIME_WINDOW = 10 * 60 * 1000; // 10 minutes in milliseconds

const checkRateLimit = (): { allowed: boolean; remainingTime?: number } => {
  if (typeof window === 'undefined') return { allowed: true };
  
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  const now = Date.now();
  
  if (!stored) {
    return { allowed: true };
  }
  
  const submissions = JSON.parse(stored);
  const validSubmissions = submissions.filter((time: number) => now - time < TIME_WINDOW);
  
  if (validSubmissions.length >= MAX_SUBMISSIONS) {
    const oldestSubmission = Math.min(...validSubmissions);
    const remainingTime = TIME_WINDOW - (now - oldestSubmission);
    return { allowed: false, remainingTime };
  }
  
  return { allowed: true };
};

const recordSubmission = () => {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  const now = Date.now();
  
  let submissions = stored ? JSON.parse(stored) : [];
  submissions = submissions.filter((time: number) => now - time < TIME_WINDOW);
  submissions.push(now);
  
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(submissions));
};

const UcretsizTeklifPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tvBrand: '',
    tvModel: '',
    screenSize: '',
    issueType: '',
    issueDescription: '',
    location: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [brands, setBrands] = useState<string[]>([]);
  const [workingHours, setWorkingHours] = useState<{day: string, hours: string}[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    // Site ayarlarını çek
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => {
        setSiteSettings(data);
        setWorkingHours(data.workingHours || []);
      });

    fetch('/api/brands')
      .then(res => res.json())
      .then(data => setBrands(data.map((b: any) => b.name)));
  }, []);

  const screenSizes = ['32"', '40"', '43"', '50"', '55"', '65"', '75"', '85"'];
  const issueTypes = [
    'Kırık Ekran',
    'Siyah Ekran',
    'Arka Aydınlatma Sorunları',
    'Ölü Piksel',
    'Renk Sorunları',
    'Güç Yok',
    'Diğer'
  ];
  const locations = [
    'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt', 'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane', 'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer', 'Şile', 'Şişli', 'Sultanbeyli', 'Sultangazi', 'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu', 'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate estimated price when key fields change
    if ((name === 'screenSize' || name === 'issueType') && formData.screenSize && formData.issueType) {
      calculateEstimatedPrice();
    }
  };

  const calculateEstimatedPrice = () => {
    const basePrices: { [key: string]: number } = {
      'Kırık Ekran': 800,
      'Siyah Ekran': 600,
      'Arka Aydınlatma Sorunları': 500,
      'Ölü Piksel': 400,
      'Renk Sorunları': 450,
      'Güç Yok': 350,
      'Diğer': 400
    };

    const sizeMultipliers: { [key: string]: number } = {
      '32"': 1,
      '40"': 1.2,
      '43"': 1.3,
      '50"': 1.5,
      '55"': 1.8,
      '65"': 2.2,
      '75"': 2.8,
      '85"': 3.5
    };

    const basePrice = basePrices[formData.issueType] || 400;
    const multiplier = sizeMultipliers[formData.screenSize] || 1;
    const price = Math.round(basePrice * multiplier);
    
    setEstimatedPrice(`₺${price} - ₺${price + 200}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limit kontrolü
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setIsRateLimited(true);
      setRemainingTime(rateLimitCheck.remainingTime || 0);
      return;
    }
    
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        recordSubmission();
        setIsSubmitted(true);
      } else {
        alert('Başvuru gönderilemedi. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      alert('Bir hata oluştu.');
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Merhaba! ${formData.tvBrand} ${formData.tvModel} TV'im için teklif almak istiyorum. Arıza: ${formData.issueType}. Lokasyon: ${formData.location}`);
    const whatsappUrl = `https://wa.me/${siteSettings?.whatsapp?.replace(/\s/g, '') || '905525587905'}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Talebiniz Alındı!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Talebiniz için teşekkürler. Uzman teknisyenimiz 30 dakika içinde sizinle iletişime geçecek ve detaylı fiyat teklifi sunacak.
            </p>
            
            {estimatedPrice && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="text-sm text-blue-600 font-medium">Tahmini Fiyat Aralığı</div>
                <div className="text-2xl font-bold text-blue-700">{estimatedPrice}</div>
                <div className="text-sm text-blue-600 mt-1">*Kesin fiyat teşhis sonrası belirlenecektir</div>
              </div>
            )}

            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <strong>İletişim:</strong> {formData.name} - {formData.phone}
              </div>
              <div className="text-sm text-gray-600">
                <strong>TV:</strong> {formData.tvBrand} {formData.tvModel} ({formData.screenSize})
              </div>
              <div className="text-sm text-gray-600">
                <strong>Arıza:</strong> {formData.issueType}
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full items-center mt-8">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-6 py-3 shadow-md transition-transform duration-200 hover:scale-105">
                Ücretsiz Fiyat Teklifi Al
              </Button>
                            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-6 text-lg font-semibold">
                  <Phone className="w-5 h-5 mr-2" />
                  Hemen Ara: {siteSettings?.phone || '+90 552 558 79 05'}
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Rate limited state
  if (isRateLimited) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6">
          <Card className="p-8 text-center shadow-lg border border-orange-200">
            <div className="flex justify-center mb-4">
              <Clock className="w-16 h-16 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Form Gönderme Limiti
            </h2>
            <p className="text-gray-600 mb-6">
              10 dakika içerisinde en fazla 3 form gönderebilirsiniz. Lütfen daha sonra tekrar deneyin.
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => setIsRateLimited(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Geri Dön
              </Button>
              <a href={`tel:${siteSettings?.phone || '+90 552 558 79 05'}`}>
                <Button variant="outline" className="w-full">
                  <Phone className="w-5 h-5 mr-2" />
                  Hemen Ara: {siteSettings?.phone || '+90 552 558 79 05'}
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 w-full overflow-x-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center overflow-x-hidden">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 break-words max-w-4xl mx-auto font-sans leading-tight overflow-visible">
            Ücretsiz TV Tamir Teklifi Alın
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Aşağıdaki formu doldurun, TV'niz için anında fiyat tahmini alın. Uzman teknisyenimiz 30 dakika içinde sizinle iletişime geçecek.
          </p>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Kişisel Bilgiler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Ad Soyad *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Adınızı ve soyadınızı girin"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon Numarası *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+90 5XX XXX XX XX"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          E-posta Adresi
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="ornek@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* TV Information */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">TV Bilgileri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="tvBrand" className="block text-sm font-medium text-gray-700 mb-2">
                          TV Markası *
                        </label>
                        <select
                          id="tvBrand"
                          name="tvBrand"
                          required
                          value={formData.tvBrand}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Marka Seçin</option>
                          {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="tvModel" className="block text-sm font-medium text-gray-700 mb-2">
                          TV Modeli
                        </label>
                        <input
                          type="text"
                          id="tvModel"
                          name="tvModel"
                          value={formData.tvModel}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Örn: 55NU7100"
                        />
                      </div>
                      <div>
                        <label htmlFor="screenSize" className="block text-sm font-medium text-gray-700 mb-2">
                          Ekran Boyutu *
                        </label>
                        <select
                          id="screenSize"
                          name="screenSize"
                          required
                          value={formData.screenSize}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Boyut Seçin</option>
                          {screenSizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                          Lokasyon *
                        </label>
                        <select
                          id="location"
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Lokasyon Seçin</option>
                          {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-2">
                          Arıza Türü *
                        </label>
                        <select
                          id="issueType"
                          name="issueType"
                          required
                          value={formData.issueType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Arıza Seçin</option>
                          {issueTypes.map(issue => (
                            <option key={issue} value={issue}>{issue}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 mb-2">
                          Sorununuzu Açıklayın
                        </label>
                        <textarea
                          id="issueDescription"
                          name="issueDescription"
                          rows={4}
                          value={formData.issueDescription}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="TV'nizdeki sorunu kısaca açıklayın..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Estimated Price */}
                  {estimatedPrice && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calculator className="w-6 h-6 text-blue-600" />
                        <h3 className="text-lg font-semibold text-blue-900">Tahmini Fiyat Aralığı</h3>
                      </div>
                      <div className="text-3xl font-bold text-blue-700 mb-2">{estimatedPrice}</div>
                      <div className="text-sm text-blue-600">*Kesin fiyat teşhis sonrası belirlenecektir</div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex flex-col gap-4 w-full items-center mt-8">
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-6 py-3 shadow-md transition-transform duration-200 hover:scale-105">
                      Ücretsiz Fiyat Teklifi Al
                    </Button>
                    <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                      <Button type="button" className="w-full bg-white text-blue-600 hover:bg-gray-100 text-lg font-bold px-6 py-3 shadow-md transition-transform duration-200 hover:scale-105">
                        Hemen Ara: {siteSettings?.phone || '+90 552 558 79 05'}
                      </Button>
                    </a>
                  </div>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hemen Yardım Alın</h3>
                <div className="space-y-4">
                  <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Phone className="w-5 h-5 mr-2" />
                      Hemen Ara
                    </Button>
                  </a>
                  <Button 
                    variant="outline" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => {
                      const message = encodeURIComponent("Merhaba! TV tamiri için yardıma ihtiyacım var. Bana yardımcı olabilir misiniz?");
                      window.open(`https://wa.me/${siteSettings?.whatsapp?.replace(/\s/g, '') || '905525587905'}?text=${message}`, '_blank');
                    }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </Card>

              {/* Why Choose Us */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Neden Bizi Seçmelisiniz?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Ücretsiz teşhis ve fiyat teklifi
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Aynı gün servis imkanı
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    12 ay garanti
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Uzman teknisyenler
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Şeffaf fiyatlandırma
                  </li>
                </ul>
              </Card>

              {/* Working Hours */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Çalışma Saatleri</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  {workingHours.map((item, idx) => (
                    <div className="flex justify-between" key={idx}>
                      <span>{item.day}</span>
                      <span>{item.hours}</span>
                    </div>
                  ))}
                  <div className="text-xs text-green-600 mt-2">Acil servis 7/24</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UcretsizTeklifPage;
