import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BrandsPage() {
  const [brands, setBrands] = useState<{name: string; models: string[]}[]>([]);
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
    <div className="pt-16">
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            TV Markaları
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Tüm büyük TV markaları için uzman onarım ve ekran değişimi hizmeti. Markanızı seçerek detaylı bilgi ve hizmetlerimize ulaşabilirsiniz.
          </p>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={`/brands/${brand.name.toLowerCase()}`}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4 flex items-center justify-center" style={{height: 60}}>
                <Image src={`/brands/${brand.name.toLowerCase()}.svg`} alt={brand.name + ' Logo'} width={100} height={60} style={{objectFit: 'contain', maxHeight: 60}} />
              </div>
              <div className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                {brand.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Aradığınız marka listede yok mu? Bize ulaşın, tüm markalara hizmet veriyoruz!
          </p>
          <Link href="/contact">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-md transition-all">
              Bize Ulaşın
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 