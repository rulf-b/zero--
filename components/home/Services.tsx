'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Monitor, Cpu, Zap, Wrench, Shield, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

const ICONS: Record<string, any> = {
  Monitor,
  Cpu,
  Zap,
  Wrench,
  Shield,
  Clock
};

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      });
  }, []);
  if (loading) return <div className="text-center py-20">Hizmetler yükleniyor...</div>;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Uzmanlık Alanlarımız
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Garantili kalite ve hızlı teslimat ile profesyonel TV tamir hizmetleri. Tüm büyük markalara orijinal parça ve uzman teknisyenlerle hizmet veriyoruz.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            // Try to use Lucide icon if available, else fallback to emoji or image
            let IconComponent = ICONS[service.icon] || null;
            return (
              <div
                key={service.id || index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-3xl">
                  {IconComponent ? (
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  ) : service.icon && service.icon.length <= 3 ? (
                    <span>{service.icon}</span>
                  ) : service.image ? (
                    <img src={service.image} alt={service.title} className="w-8 h-8 object-contain" />
                  ) : null}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features && service.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <Shield className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">
                    {service.price && service.price.trim() !== '' ? service.price : 'Fiyat için teklif alın'}
                  </div>
                  <Link href="/quote">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Teklif Al
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Doğru Hizmeti Seçmekte Zorlanıyor Musunuz?
            </h3>
            <p className="text-gray-600 mb-6">
              Uzmanlarımız TV arızanızı teşhis edip size en uygun çözümü önerebilir.
            </p>
            <div className="flex flex-col gap-4 w-full items-center">
              <Link href="/quote">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Ücretsiz Teşhis Al
                </Button>
              </Link>
              <a href="tel:+905525587905">
                <Button size="lg" variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                  Uzmanı Ara
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;