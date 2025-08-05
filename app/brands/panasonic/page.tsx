"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export default function PanasonicBrandPage() {
  const [models, setModels] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => {
        const panasonic = data.find((b: any) => b.name.toLowerCase() === "panasonic");
        setModels(panasonic ? panasonic.models.map((m: string) => ({ name: m })) : []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Modeller yükleniyor...</div>;

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Panasonic TV Modelleri
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Popüler Panasonic TV modelleri için ekran değişimi ve tamir hizmetleri. Modelinizi seçerek detaylı bilgi ve fiyat teklifi alabilirsiniz.
          </p>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {models.map((model) => (
            <Link
              key={model.name}
              href={`/brands/panasonic/${model.name.toLowerCase()}`}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="text-lg font-bold text-gray-900 group-hover:text-blue-600 mb-2">{model.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
