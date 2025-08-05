'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Users, Award, Clock, CheckCircle, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const AboutPage = () => {
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

  const stats = [
    { number: '10+', label: 'Yıllık Deneyim' },
    { number: '5.000+', label: 'Onarılan TV' },
    { number: '%99', label: 'Başarı Oranı' },
    { number: '4.9/5', label: 'Müşteri Puanı' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Kalite Garantisi',
      description: 'Sadece yüksek kaliteli parçalar kullanıyor ve tüm onarımlarımıza kapsamlı garanti sunuyoruz.'
    },
    {
      icon: Clock,
      title: 'Hızlı Servis',
      description: 'Aynı gün servis imkanı, çoğu onarım 2-4 saat içinde tamamlanır.'
    },
    {
      icon: Users,
      title: 'Uzman Teknisyenler',
      description: 'TV tamiri ve elektronik alanında geniş deneyime sahip sertifikalı profesyoneller.'
    },
    {
      icon: Award,
      title: 'Müşteri Memnuniyeti',
      description: '5.000+ mutlu müşteri, 4.9/5 ortalama puan ve olumlu yorumlar.'
    }
  ];

  const team = [
    {
      name: 'Mehmet Yılmaz',
      role: 'Başteknisyen',
      experience: '12 yıl',
      specialization: 'Samsung & LG TV Uzmanlığı',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Ahmet Kaya',
      role: 'Kıdemli Tamir Uzmanı',
      experience: '8 yıl',
      specialization: 'OLED & QLED Ekranlar',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Fatma Özkan',
      role: 'Elektronik Mühendisi',
      experience: '6 yıl',
      specialization: 'Anakart Tamiri',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const certifications = [
    'Sertifikalı Elektronik Teknisyeni (CET)',
    'Samsung Yetkili Servis Ortağı',
    'LG Profesyonel Servis Sertifikası',
    'Sony Teknik Eğitim Sertifikası',
    'ISO 9001 Kalite Yönetimi'
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Zero Teknik Hakkında
                <span className="block text-blue-600">TV Tamir Uzmanları</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                10 yılı aşkın süredir İstanbul\'un güvenilir TV tamir servisiyiz. Tüm TV tamir ihtiyaçlarınız için profesyonel, güvenilir ve uygun fiyatlı çözümler sunuyoruz.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                    Ücretsiz Fiyat Teklifi Al
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50">
                    Bize Ulaşın
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4009599/pexels-photo-4009599.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="TV Repair Service"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Hikayemiz
            </h2>
            <div className="text-lg text-gray-600 space-y-6">
              <p>
                Zero Teknik, 2014 yılında basit bir misyonla kuruldu: İstanbul halkına dürüst, profesyonel ve uygun fiyatlı TV tamir hizmeti sunmak. Küçük bir tamir atölyesi olarak başlayan yolculuğumuz, şehrin en güvenilir TV tamir servisine dönüştü.
              </p>
              <p>
                Yıllar içinde, eski CRT modellerden en yeni OLED ve QLED ekranlara kadar binlerce TV tamir ettik. Kaliteye, şeffaflığa ve müşteri memnuniyetine olan bağlılığımız, İstanbul\'da TV tamiri denince akla gelen uzmanlar olmamızı sağladı.
              </p>
              <p>
                Bugün, teknolojiyi yakından takip ederek en yeni ekipmanlara, eğitimlere ve tekniklere yatırım yapıyoruz. Sertifikalı teknisyen ekibimiz, her onarıma onlarca yıllık birleşik deneyimle yaklaşıyor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Değerlerimiz
            </h2>
            <p className="text-xl text-gray-600">
              Tüm işlerimizde bizi yönlendiren ilkeler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Uzman Ekibimizle Tanışın
            </h2>
            <p className="text-xl text-gray-600">
              TV'nizi onarmaya adanmış sertifikalı profesyoneller
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <div className="text-blue-600 font-medium mb-2">
                    {member.role}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div><strong>Experience:</strong> {member.experience}</div>
                    <div><strong>Specialization:</strong> {member.specialization}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Sertifikalar & Yeterlilikler
            </h2>
            <p className="text-xl text-blue-100">
              Profesyonelliğe olan bağlılığımız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-white">{cert}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-blue-100 mb-6">
              Tüm teknisyenlerimiz, en güncel TV teknolojileri ve tamir teknikleri konusunda sürekli eğitim almaktadır.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Müşterilerimizin Yorumları
            </h2>
            <p className="text-xl text-gray-600">
              Memnun müşterilerimizden gerçek geri bildirimler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Harika bir hizmet! Samsung TV ekranım tamamen kırılmıştı, mükemmel şekilde değiştirdiler. Teknisyen çok profesyoneldi ve fiyatı çok makuldü."
              </p>
              <div className="font-semibold text-gray-900">Ahmet Y.</div>
              <div className="text-sm text-gray-600">Kadıköy, İstanbul</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Hızlı ve güvenilir servis. LG TV'min arka aydınlatma arızasını hemen tespit edip aynı gün tamir ettiler. 12 ay garanti içimi rahatlattı."
              </p>
              <div className="font-semibold text-gray-900">Elif K.</div>
              <div className="text-sm text-gray-600">Şişli, İstanbul</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Profesyonel ekip ve dürüst fiyatlandırma. Her şeyi açıkça anlattılar ve anakart tamirini beklediğimden hızlı tamamladılar. Kesinlikle tavsiye ederim!"
              </p>
              <div className="font-semibold text-gray-900">Mehmet Ö.</div>
              <div className="text-sm text-gray-600">Üsküdar, İstanbul</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Uzman Servis Deneyimini Yaşayın
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            TV tamirinde Zero Teknik'e güvenen binlerce memnun müşterimize katılın. Hemen ücretsiz teklif alın!
          </p>
          <div className="flex flex-col gap-4 w-full items-center">
            <Link href="/quote">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Ücretsiz Teklif Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                Ara: {siteSettings?.phone || '+90 552 558 79 05'}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;