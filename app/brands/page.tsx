'use client';

import Link from 'next/link';
import Image from 'next/image';
import brandsData from '../../data/brands.json';
import { Metadata } from 'next';
import { useEffect, useState } from 'react';

export default function BrandsPage() {
  const [brands, setBrands] = useState<{ name: string; models?: string[]; logo?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/brands')
      .then(res => res.json())
      .then(data => {
        setBrands(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Markalar yükleniyor...</div>;

  return (
    <div className="container mx-auto py-8 pt-32">
      <h1 className="text-4xl font-bold text-center mb-4">TV Markaları</h1>
      <p className="text-center mb-8 text-lg text-gray-600">
        Tüm büyük TV markaları için uzman onarım ve ekran değişimi hizmeti. Markanızı seçerek detaylı bilgi ve hizmetlerimize ulaşabilirsiniz.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => {
          // Özel durumlar için URL mapping
          const urlMapping: { [key: string]: string } = {
            'Arçelik': 'arcelik',
            'Hi-Level': 'hi-level',
            'SEG': 'seg'
          };
          
          const urlSlug = urlMapping[brand.name] || brand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          
          return (
            <Link key={brand.name} href={`/brands/${urlSlug}`} className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="mb-4 flex items-center justify-center" style={{height: 60}}>
                <Image src={brand.logo || `/brands/${urlSlug}.svg`} alt={brand.name + ' Logo'} width={100} height={60} style={{objectFit: 'contain', maxHeight: 60}} />
              </div>
              <div className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                {brand.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 
