'use client';
import { Star, Quote, Tv2, Award, Shield, Calendar } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useCounter } from '@/hooks/use-counter';

const Testimonials = () => {
  // Site ayarları state'i
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

  // Yorumları yükle
  const [testimonials, setTestimonials] = useState<any[]>([]);
  useEffect(() => {
    // API'den yorumları çek
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          // Sadece onaylanmış yorumları göster
          const verifiedTestimonials = data.filter((t: any) => t.verified);
          setTestimonials(verifiedTestimonials);
        } else {
          // Fallback - varsayılan testimonialler
          const defaultTestimonials = [
            {
              id: '1',
              name: 'Mehmet Kaya',
              location: 'Kadıköy, İstanbul',
              rating: 5,
              comment: 'Samsung TV\'min ekranı bozulmuştu. Aynı gün geldiler ve 2 saatte hallettiler. Orijinal parça kullandılar, 1 yıl garanti verdiler. Çok memnunum.',
              service: 'Samsung TV Ekran Tamiri',
              date: '2025-07-15',
              verified: true
            },
            {
              id: '2',
              name: 'Ayşe Demir',
              location: 'Beşiktaş, İstanbul',
              rating: 5,
              comment: 'LG TV\'mde arka aydınlatma sorunu vardı. Teknisyen çok bilgili ve işini iyi biliyor. Fiyat da gayet makul. Tavsiye ederim.',
              service: 'LG LED Panel Tamiri',
              date: '2025-07-12',
              verified: true
            },
            {
              id: '3',
              name: 'Can Özkan',
              location: 'Şişli, İstanbul', 
              rating: 5,
              comment: '55 inç Sony TV\'min ekranı kırılmıştı. Diğer yerler çok pahalı fiyat vermişti. Burada hem uygun fiyat hem kaliteli hizmet aldım.',
              service: 'Sony TV Ekran Değişimi',
              date: '2025-07-08',
              verified: true
            }
          ];
          setTestimonials(defaultTestimonials);
        }
      })
      .catch(error => {
        console.error('Testimonials yüklenirken hata:', error);
        // Hata durumunda varsayılan yorumları kullan
        const defaultTestimonials = [
          {
            id: '1',
            name: 'Mehmet Kaya',
            location: 'Kadıköy, İstanbul',
            rating: 5,
            comment: 'Samsung TV\'min ekranı bozulmuştu. Aynı gün geldiler ve 2 saatte hallettiler. Orijinal parça kullandılar, 1 yıl garanti verdiler. Çok memnunum.',
            service: 'Samsung TV Ekran Tamiri',
            date: '2025-07-15',
            verified: true
          }
        ];
        setTestimonials(defaultTestimonials);
      });
  }, []);

  // Sonsuz döngü için listeyi dinamik olarak genişletiyoruz.
  const displayTestimonials = useMemo(() => {
    if (testimonials.length === 0) return [];
    const firstClone = testimonials[0];
    const lastClone = testimonials[testimonials.length - 1];
    return [lastClone, ...testimonials, firstClone];
  }, [testimonials]);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  // --- DÜZELTME BURADA ---
  // Sonsuz döngü interval'ı ve güvenli currentIndex kontrolü
  useEffect(() => {
    if (displayTestimonials.length < 3) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        // Eğer currentIndex aralık dışına çıkarsa hemen başa sar
        if (prev >= displayTestimonials.length - 1) {
          setIsTransitionEnabled(false);
          return 1;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [displayTestimonials.length]);

  // currentIndex aralık dışına çıkarsa hemen düzelt (güvenlik için)
  useEffect(() => {
    if (currentIndex >= displayTestimonials.length) {
      setIsTransitionEnabled(false);
      setCurrentIndex(1);
    } else if (currentIndex < 0) {
      setIsTransitionEnabled(false);
      setCurrentIndex(displayTestimonials.length - 2);
    }
  }, [currentIndex, displayTestimonials.length]);

  // Sonsuz döngü mantığı (değişiklik yok)
  const handleTransitionEnd = () => {
    if (currentIndex === displayTestimonials.length - 1) {
      setIsTransitionEnabled(false);
      setCurrentIndex(1);
    }
    if (currentIndex === 0) {
      setIsTransitionEnabled(false);
      setCurrentIndex(testimonials.length);
    }
  };
  
  // Geçiş animasyonunu yöneten useEffect (değişiklik yok)
  useEffect(() => {
    if (isTransitionEnabled) return;
    const timer = setTimeout(() => setIsTransitionEnabled(true), 50);
    return () => clearTimeout(timer);
  }, [isTransitionEnabled]);

  // Sayaçlar için hook'ları en üstte tanımla
  const tvsCount = useCounter({ end: 5000, start: 0, duration: 2000, delay: 0 });
  const successCount = useCounter({ end: 99, start: 0, duration: 1800, delay: 0 });

  // Yeni: site-settings'ten istatistikleri çek
  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setStats(data.testimonialStats));
  }, []);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Müşterilerimizin Yorumları
          </h2>
          <p className="text-xl text-gray-600">
            {stats ? `${stats.tvsCount}+ mutlu müşteri TV tamirinde bize güveniyor` : '5.000+ mutlu müşteri TV tamirinde bize güveniyor'}
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative overflow-hidden">
          <div 
            className="flex"
            style={{
              width: `${displayTestimonials.length * 100}%`,
              transform: `translateX(-${currentIndex * (100 / displayTestimonials.length)}%)`,
              transition: isTransitionEnabled ? 'transform 1s ease-in-out' : 'none'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {displayTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full"
                style={{ width: `${100 / displayTestimonials.length}%` }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 hover-lift animate-fade-in-up h-full">
                  {/* Yorum kartı içeriği */}
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <Quote className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {testimonial.service}
                  </div>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                    <div className="text-sm text-gray-500 mt-1">{testimonial.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section (Gelişmiş) - Sizin tasarımınızla birebir aynı */}
        <div className="mt-16 bg-gradient-to-br from-blue-50/80 to-white/90 rounded-2xl shadow-lg p-8 relative overflow-visible">
          {/* Marka maskotu ve animasyonlu logo */}
          {/* Kutular */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-20">
            {/* Onarılan TV */}
            <a href="#testimonials" className="group bg-white/90 rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-blue-50/90 border border-blue-100 flex flex-col items-center cursor-pointer focus:ring-2 focus:ring-blue-400 outline-none relative">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform animate-pulse">
                <Tv2 className="w-7 h-7 text-blue-600 group-hover:rotate-6 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stats ? stats.tvsCount : '5000'}+
              </div>
              <div className="text-gray-700 font-semibold mb-1">{stats ? stats.tvsLabel : 'Onarılan TV'}</div>
              <div className="text-xs text-gray-500">{stats ? stats.tvsSub : 'Tüm marka ve modeller'}</div>
              <div className="mt-2 text-xs text-blue-700 bg-blue-50 rounded px-2 py-1 animate-fade-in-up">
                {stats ? stats.lastModel : 'En son: Samsung 55NU7100'}
              </div>
            </a>
            {/* Ortalama Puan */}
            <a href="https://www.google.com/search?q=Zero+TV+Servisi+yorumlar" target="_blank" rel="noopener noreferrer" className="group bg-white/90 rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-yellow-50/90 border border-yellow-100 flex flex-col items-center cursor-pointer focus:ring-2 focus:ring-yellow-400 outline-none relative">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform animate-wiggle">
                <Star className="w-7 h-7 text-yellow-500 fill-yellow-400 group-hover:scale-125 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1 flex items-center gap-1">
                {stats ? stats.rating : '4.9/5'}
                <span className="text-yellow-400 text-lg">★</span>
              </div>
              <div className="text-gray-700 font-semibold mb-1">{stats ? stats.ratingLabel : 'Ortalama Puan'}</div>
              <div className="text-xs text-gray-500">{stats ? stats.ratingSub : 'Google & WhatsApp yorumları'}</div>
              <div className="mt-2 text-xs text-gray-700 bg-yellow-50 rounded px-2 py-1 animate-fade-in-up flex items-center gap-2">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Müşteri" className="w-5 h-5 rounded-full border" />
                "{stats ? stats.ratingQuote : 'Harika hizmet, 2 saatte TV\'im yenilendi!'}" <span className="text-gray-400">- {stats ? stats.ratingQuoteAuthor : 'Ahmet Y.'}</span>
              </div>
            </a>
            {/* Başarı Oranı */}
            <a href="#testimonials" className="group bg-white/90 rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-green-50/90 border border-green-100 flex flex-col items-center cursor-pointer focus:ring-2 focus:ring-green-400 outline-none relative">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform animate-bounce">
                <Award className="w-7 h-7 text-green-600 group-hover:rotate-12 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                %{stats ? stats.successRate : 99}
              </div>
              <div className="text-gray-700 font-semibold mb-1">{stats ? stats.successLabel : 'Başarı Oranı'}</div>
              <div className="text-xs text-gray-500">{stats ? stats.successSub : 'Yüksek müşteri memnuniyeti'}</div>
              <div className="mt-2 text-xs text-green-700 bg-green-50 rounded px-2 py-1 animate-fade-in-up">
                "{stats ? stats.successQuote : 'Tüm süreç çok şeffaf ve güven vericiydi. %100 memnuniyet!'}"
              </div>
            </a>
            {/* Garanti Süresi */}
            <a href="/faq" className="group bg-white/90 rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-purple-50/90 border border-purple-100 flex flex-col items-center cursor-pointer focus:ring-2 focus:ring-purple-400 outline-none relative">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform animate-shake">
                <Shield className="w-7 h-7 text-purple-600 group-hover:scale-125 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stats ? stats.warranty : 12} <span className="text-base font-semibold">Ay</span>
              </div>
              <div className="text-gray-700 font-semibold mb-1">{stats ? stats.warrantyLabel : 'Garanti Süresi'}</div>
              <div className="text-xs text-gray-500">{stats ? stats.warrantySub : 'Tüm işlemlerde geçerli'}</div>
              <div className="mt-2 text-xs text-purple-700 bg-purple-50 rounded px-2 py-1 animate-fade-in-up">
                "{stats ? stats.warrantyQuote : 'Panel değişiminden sonra 1 yıl boyunca hiç sorun yaşamadım!'}"
              </div>
            </a>
          </div>
          {/* Güçlü CTA ve iletişim entegrasyonu */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-10 z-30 relative">
            <a href="/quote" className="w-full md:w-auto">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg transition-all duration-300 animate-pulse-slow w-full md:w-auto">
                Hemen İletişime Geç
              </button>
            </a>
            {/* WhatsApp butonunda ikon değişikliği */}
            <a href={`https://wa.me/${siteSettings?.whatsapp?.replace(/\s/g, '') || '905525587905'}`} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg transition-all duration-300 flex items-center gap-2 w-full md:w-auto">
                {/* MessageCircle ikonu */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.38 8.38 0 0 1 12.5 3h.5A8.5 8.5 0 0 1 21 11.5z"/></svg>
                WhatsApp
              </button>
            </a>
            <a href={`tel:${siteSettings?.phone || '+905525587905'}`} className="w-full md:w-auto">
              <button className="bg-white border border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-bold shadow-lg transition-all duration-300 flex items-center gap-2 w-full md:w-auto hover:bg-blue-600 hover:text-white">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.06.72 3a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.94.35 1.95.59 3 .72A2 2 0 0 1 22 16.92z"/></svg>
                Telefon
              </button>
            </a>
          </div>
          {/* Arka plan deseni */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg width="100%" height="100%" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
              <circle cx="100" cy="100" r="80" fill="#2563eb" />
              <circle cx="500" cy="100" r="80" fill="#facc15" />
              <rect x="250" y="50" width="100" height="100" rx="30" fill="#22d3ee" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;