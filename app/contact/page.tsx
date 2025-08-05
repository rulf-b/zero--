"use client";

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import { useEffect, useState } from 'react';

const ContactPage = () => {
  const [siteSettings, setSiteSettings] = useState<any>(null);
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data));
  }, []);

  const contactMethods = [
    {
      icon: Phone,
      title: 'Telefon',
      description: 'Hemen yardım almak için bizi arayın',
      contact: siteSettings?.phone || '+90 552 558 79 05',
      action: `tel:${(siteSettings?.phone || '+90 552 558 79 05').replace(/\D/g, '')}`,
      available: '7/24 Hizmet'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'WhatsApp üzerinden hızlı yanıt',
      contact: siteSettings?.whatsapp || siteSettings?.phone || '+90 552 558 79 05',
      action: `https://wa.me/${(siteSettings?.whatsapp || siteSettings?.phone || '905525587905').replace(/\D/g, '')}`,
      available: 'Şu an çevrimiçi'
    },
    {
      icon: Mail,
      title: 'E-posta',
      description: 'Detaylı bilgi gönderebilirsiniz',
      contact: siteSettings?.email || 'zero@ledtvpaneli.com',
      action: `mailto:${siteSettings?.email || 'zero@ledtvpaneli.com'}`,
      available: '< 2 saat yanıt'
    },
    {
      icon: MapPin,
      title: 'Hizmet Bölgesi',
      description: "Sadece İstanbul'un tüm ilçelerine hizmet veriyoruz",
      contact: siteSettings?.address || 'İstanbul, Tüm İlçeler',
      action: '/locations/istanbul',
      available: 'Ücretsiz alım & teslimat'
    }
  ];

  // FAQ state
  const [faqs, setFaqs] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/faq')
      .then(res => res.json())
      .then(data => setFaqs(data));
  }, []);

  const [workingHours, setWorkingHours] = useState<{day: string, hours: string}[]>([]);
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setWorkingHours(data.workingHours || []));
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            TV Tamir Uzmanlarımıza Ulaşın
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            TV tamir ihtiyaçlarınız için hızlı ve profesyonel destek alın. Birden fazla iletişim seçeneğiyle hızlı yanıt garantisi.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {method.description}
                  </p>
                  <div className="text-lg font-semibold text-blue-600 mb-2">
                    {method.contact}
                  </div>
                  <div className="text-sm text-green-600 font-medium mb-4">
                    {method.available}
                  </div>
                  {method.action.startsWith('http') ? (
                    <a href={method.action} target="_blank" rel="noopener noreferrer" className="block w-full">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Şimdi İletişime Geç
                      </Button>
                    </a>
                  ) : method.action.startsWith('/') ? (
                    <Link href={method.action} className="block w-full">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Detayları Gör
                      </Button>
                    </Link>
                  ) : (
                    <a href={method.action} className="block w-full">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Şimdi İletişime Geç
                      </Button>
                    </a>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Bize Mesaj Gönderin
              </h2>
              <p className="text-gray-600 mb-8">
                Aşağıdaki formu doldurun, mesai saatleri içinde 2 saat içinde size dönüş yapalım.
              </p>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Business Hours */}
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Çalışma Saatleri</h3>
                </div>
                <div className="space-y-3">
                  {workingHours.map((item, idx) => (
                    <div className="flex justify-between" key={idx}>
                      <span className="text-gray-600">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 mt-3">
                    <div className="text-sm text-green-600 font-medium">
                      Acil servis 7/24 hizmetinizde
                    </div>
                  </div>
                </div>
              </Card>

              {/* Service Areas */}
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Hizmet Bölgeleri</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">TV tamir hizmeti sunduğumuz bölgeler:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Tüm İstanbul ilçeleri</li>
                    <li>• Ücretsiz alım ve teslimat</li>
                    <li>• Yerinde tamir imkanı</li>
                    <li>• Çoğu bölgede aynı gün servis</li>
                  </ul>
                  <Link href="/locations/istanbul" className="inline-block mt-3">
                    <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      Tüm Bölgeleri Gör
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hızlı İşlemler</h3>
                <div className="space-y-3">
                  <Link href="/quote" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Ücretsiz Teklif Al
                    </Button>
                  </Link>
                  <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`} className="block">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      <Phone className="w-4 h-4 mr-2" />
                      Hemen Ara
                    </Button>
                  </a>
                  <a 
                    href={`https://wa.me/${(siteSettings?.whatsapp || '905525587905').replace(/\D/g, '')}?text=Hi! I need help with my TV repair.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-xl text-gray-600">
              TV tamir hizmetlerimizle ilgili sık sorulan sorulara hızlı yanıtlar
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={faq.id || index} className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Başka sorunuz mu var? Size yardımcı olmaktan memnuniyet duyarız!
            </p>
            <div className="flex justify-center space-x-4">
              <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Bizi Arayın
                </Button>
              </a>
              <a 
                href={`https://wa.me/${(siteSettings?.whatsapp || '905525587905').replace(/\D/g, '')}?text=Hi! I have a question about TV repair.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
