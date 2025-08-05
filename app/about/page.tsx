'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Users, Award, Clock, CheckCircle } from 'lucide-react';
import Testimonials from '@/components/home/Testimonials';
import { useEffect, useState } from 'react';

const AboutPage = () => {
  const [about, setAbout] = useState<any>(null);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => {
        setAbout(data.about || null);
        setSiteSettings(data);
        setLoading(false);
      });
  }, []);

  if (loading || !about) return <div className="text-center py-20">Yükleniyor...</div>;

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

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {about.title.split(' ').map((word: string, i: number) =>
                  word.toLowerCase() === 'ekran' ? (
                    <span key={i} className="text-blue-600">{word} </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
                <span className="block text-blue-600">{about.subtitle}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {about.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {about.stats && about.stats.map((stat: any, index: number) => (
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
                src={about.image || "https://images.pexels.com/photos/4009599/pexels-photo-4009599.jpeg?auto=compress&cs=tinysrgb&w=800"}
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
              {about.storyTitle || 'Hikayemiz'}
            </h2>
            <div className="text-lg text-gray-600 space-y-6">
              {Array.isArray(about.story) && about.story.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {about.valuesTitle || 'Değerlerimiz'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {about.valuesSubtitle || 'Tüm işlerimizde bizi yönlendiren ilkeler'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.isArray(about.values) && about.values.map((value: any, index: number) => {
              const icons = ['🛡️', '⚡', '👨‍🔧', '⭐'];
              const gradients = [
                'from-blue-500 to-blue-600',
                'from-green-500 to-green-600', 
                'from-purple-500 to-purple-600',
                'from-orange-500 to-orange-600'
              ];
              const bgColors = [
                'bg-blue-50 hover:bg-blue-100',
                'bg-green-50 hover:bg-green-100',
                'bg-purple-50 hover:bg-purple-100', 
                'bg-orange-50 hover:bg-orange-100'
              ];
              
              return (
                <div 
                  key={index} 
                  className={`group ${bgColors[index % 4]} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50 backdrop-blur-sm`}
                >
                  <div className="p-8 text-center h-full flex flex-col">
                    <div className={`w-16 h-16 bg-gradient-to-r ${gradients[index % 4]} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <span className="text-2xl">{icons[index % 4]}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-grow">
                      {value.description}
                    </p>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className={`w-full h-1 bg-gradient-to-r ${gradients[index % 4]} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
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
          <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg mb-8">
            <img
              src={about.teamImage || "/public/teamsample.jpg"}
              alt="Uzman Ekip"
              className="w-full h-full object-cover"
            />
          </div>
          {about.teamText && (
            <div className="relative">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-3xl transform rotate-1"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-green-50/30 to-blue-50/30 rounded-3xl transform -rotate-1"></div>
              
              {/* Content */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
                <div className="text-center">
                  {/* Quote Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>
                  
                  {/* Text with enhanced styling */}
                  <div className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line max-w-4xl mx-auto font-medium">
                    {about.teamText.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className={`${index > 0 ? 'mt-6' : ''} ${index === 0 ? 'text-2xl font-semibold text-gray-900' : ''}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="flex justify-center mt-8 space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {about.certifications?.title || 'Sertifikalar & Yeterlilikler'}
            </h2>
            <p className="text-xl text-blue-100">
              {about.certifications?.subtitle || 'Profesyonelliğe olan bağlılığımız'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(about.certifications?.items) && about.certifications.items.map((cert: string, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-white">{cert}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-blue-100 mb-6">
              {about.certifications?.description || 'Tüm teknisyenlerimiz, en güncel TV teknolojileri ve tamir teknikleri konusunda sürekli eğitim almaktadır.'}
            </p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Uzman Servis Deneyimini Yaşayın
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            TV tamirinde Zero Teknik'e güvenen binlerce memnun müşterimize katılın. Hemen ücretsiz teklif alın!
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/quote">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Ücretsiz Teklif Al
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

export default AboutPage;