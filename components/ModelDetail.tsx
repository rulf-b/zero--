"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";

export interface ModelDetailProps {
  brand: string;
  model: string;
  image?: string;
  screenSize?: string;
  resolution?: string;
  displayType?: string;
  releaseYear?: string;
  panelType?: string;
}

const commonIssues = [
  {
    issue: "Kırık ve Çatlak Ekran",
    description: "Darbe sonucu oluşan ekran hasarlarını orijinal parçalarla değiştiriyoruz.",
  },
  {
    issue: "Görüntüde Kararma ve Renk Kaybı",
    description: "Panelinizdeki kararma, çizgilenme veya renk kaybı sorunlarını garantili olarak çözüyoruz.",
  },
  {
    issue: "Diğer Teknik Arızalar",
    description: "Anakart, güç kaynağı ve diğer donanımsal sorunlar için uzman desteği alın.",
  },
];

const repairFeatures = [
  "Orijinal parçalar ve %100 uyumlu yedekler",
  "Sertifikalı teknisyenler tarafından profesyonel montaj",
  "Tüm onarımlarda 12 ay garanti",
  "Aynı gün servis imkanı",
  "Renk kalibrasyonu ve test dahil",
  "İstanbul içi ücretsiz alım ve teslimat"
];

export default function ModelDetail({
  brand,
  model,
  image,
  screenSize,
  resolution,
  displayType,
  releaseYear,
  panelType,
}: ModelDetailProps) {
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data))
      .catch(err => console.error('Site ayarları yüklenemedi:', err));
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Link href="/brands" className="text-blue-600 hover:text-blue-700">Markalar</Link>
                <span className="text-gray-400">/</span>
                <span className="text-blue-600">{brand}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{model}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {brand} {model}
                <span className="block text-blue-600">Ekran Değişimi ve Tamiri</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Orijinal parçalar, <span className="text-blue-600 font-semibold">12 ay garanti</span> ve <span className="text-blue-600 font-semibold">uzman teknisyenlerimiz</span>le televizyonunuzu ilk günkü performansına kavuşturuyoruz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/quote">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                    Anında Fiyat Teklifi Al
                  </Button>
                </Link>
                <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                    Hemen Ara
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <Image
                  src={image || "/brands/zero-tv.png"}
                  alt={model}
                  width={520}
                  height={340}
                  className="w-full h-64 object-contain rounded-lg mb-6"
                  priority
                />
                <h3 className="text-xl font-bold text-gray-900 mb-4">TV Özellikleri</h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-gray-600">Marka:</span><span className="font-medium">{brand}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Model:</span><span className="font-medium">{model}</span></div>
                  {screenSize && <div className="flex justify-between"><span className="text-gray-600">Ekran Boyutu:</span><span className="font-medium">{screenSize}</span></div>}
                  {resolution && <div className="flex justify-between"><span className="text-gray-600">Çözünürlük:</span><span className="font-medium">{resolution}</span></div>}
                  {panelType && <div className="flex justify-between"><span className="text-gray-600">Panel Tipi:</span><span className="font-medium">{panelType}</span></div>}
                  {displayType && <div className="flex justify-between"><span className="text-gray-600">Ekran Tipi:</span><span className="font-medium">{displayType}</span></div>}
                  {releaseYear && <div className="flex justify-between"><span className="text-gray-600">Çıkış Yılı:</span><span className="font-medium">{releaseYear}</span></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sık Karşılaşılan {brand} {model} Sorunları</h2>
            <p className="text-xl text-gray-600">En sık yaşanan sorunlar için profesyonel tamir çözümleri</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commonIssues.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.issue}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Neden {brand} Servisimizi Tercih Etmelisiniz?</h2>
            <p className="text-xl text-gray-600">Garantili kaliteyle profesyonel hizmet</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repairFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">12 Ay Garanti</h3>
                <p className="text-gray-600">Tüm onarımlar ve parçalarda kapsamlı garanti</p>
              </div>
              <div>
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hızlı Servis</h3>
                <p className="text-gray-600">Çoğu onarım aynı gün tamamlanır</p>
              </div>
              <div>
                <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Uzman Teknisyenler</h3>
                <p className="text-gray-600">Sertifikalı ve deneyimli teknik ekip</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{brand} {model} TV'nizi Onarmaya Hazır Mısınız?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            TV'niz için ücretsiz teşhis ve şeffaf fiyat teklifi alın. Uzman teknisyenlerimiz TV'nizi ilk günkü haline getirmeye hazır.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/quote">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Ücretsiz Fiyat Teklifi Al
              </Button>
            </Link>
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Ara: {siteSettings?.phone || '+90 552 558 79 05'}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
