"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Shield } from 'lucide-react';
import Image from 'next/image';

const SonyIstanbulPage = () => {
  const districts = [
    { name: 'Adalar', slug: 'adalar' },
    { name: 'Arnavutköy', slug: 'arnavutkoy' },
    { name: 'Ataşehir', slug: 'atasehir' },
    { name: 'Avcılar', slug: 'avcilar' },
    { name: 'Bağcılar', slug: 'bagcilar' },
    { name: 'Bahçelievler', slug: 'bahcelievler' },
    { name: 'Bakırköy', slug: 'bakirkoy' },
    { name: 'Başakşehir', slug: 'basaksehir' },
    { name: 'Bayrampaşa', slug: 'bayrampasa' },
    { name: 'Beşiktaş', slug: 'besiktas' },
    { name: 'Beykoz', slug: 'beykoz' },
    { name: 'Beylikdüzü', slug: 'beylikduzu' },
    { name: 'Beyoğlu', slug: 'beyoglu' },
    { name: 'Büyükçekmece', slug: 'buyukcekmece' },
    { name: 'Çatalca', slug: 'catalca' },
    { name: 'Çekmeköy', slug: 'cekmekoy' },
    { name: 'Esenler', slug: 'esenler' },
    { name: 'Esenyurt', slug: 'esenyurt' },
    { name: 'Eyüpsultan', slug: 'eyupsultan' },
    { name: 'Fatih', slug: 'fatih' },
    { name: 'Gaziosmanpaşa', slug: 'gaziosmanpasa' },
    { name: 'Güngören', slug: 'gungorent' },
    { name: 'Kadıköy', slug: 'kadikoy' },
    { name: 'Kağıthane', slug: 'kagithane' },
    { name: 'Kartal', slug: 'kartal' },
    { name: 'Küçükçekmece', slug: 'kucukcekmece' },
    { name: 'Maltepe', slug: 'maltepe' },
    { name: 'Pendik', slug: 'pendik' },
    { name: 'Sancaktepe', slug: 'sancaktepe' },
    { name: 'Sarıyer', slug: 'sariyer' },
    { name: 'Silivri', slug: 'silivri' },
    { name: 'Sultangazi', slug: 'sultangazi' },
    { name: 'Sultanbeyli', slug: 'sultanbeyli' },
    { name: 'Şile', slug: 'sile' },
    { name: 'Şişli', slug: 'sisli' },
    { name: 'Tuzla', slug: 'tuzla' },
    { name: 'Ümraniye', slug: 'umraniye' },
    { name: 'Üsküdar', slug: 'uskudar' },
    { name: 'Zeytinburnu', slug: 'zeytinburnu' }
  ];

  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Image src="/brands/sony.png" alt="Sony Logo" width={120} height={80} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Sony</span> TV Tamiri İstanbul
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              İstanbul'un tüm ilçelerinde Sony TV ekran tamiri ve değişimi. Aynı gün servis garantisi.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Sony TV Tamiri <span className="text-blue-600">İstanbul İlçeleri</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {districts.map((district) => (
              <Link 
                key={district.slug}
                href={`/markalar/sony/istanbul/${district.slug}`}
                className="block p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-900 font-medium">{district.name}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Sony TV Servisi</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SonyIstanbulPage;
