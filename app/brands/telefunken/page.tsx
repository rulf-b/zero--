"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import Image from "next/image";
// import tvScreens from '../../../data/tv-screens.json';
import { useSearchParams, useRouter } from "next/navigation";

const PAGE_SIZE = 12;

export default function TelefunkenBrandPage() {
  const searchParams = useSearchParams() as any;
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [models, setModels] = useState<{ brand: string; model: string; image?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tv-models')
      .then(res => res.json())
      .then(data => {
        setModels(data.filter((item: any) => item.brand === 'Telefunken'));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setSearch("");
      }
    }
    if (search.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [search]);

  useEffect(() => {
    setSearch("");
  }, [page]);

  if (loading) return <div className="text-center py-20">Modeller yükleniyor...</div>;

  const telefunkenModels = models;
  const totalPages = Math.ceil(telefunkenModels.length / PAGE_SIZE);
  const pagedModels = telefunkenModels.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Arama sonuçları (en az 2 harf girildiyse, baştan eşleşenler)
  const filteredModels =
    search.length > 1
      ? telefunkenModels.filter((item) =>
          item.model.toLowerCase().startsWith(search.toLowerCase())
        )
      : [];

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 pt-24 lg:pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 mt-4 text-center">Telefunken TV Modelleri</h1>
          <p className="text-xl text-gray-600 mb-14">Telefunken Televizyonunuz için Garantili Ekran Değişimi ve Profesyonel Tamir Hizmetleri. Modelinizi seçerek anında online fiyat teklifi alın veya uzman ekibimizle iletişime geçin.</p>
          {/* Güven ve Uzmanlık Vurgusu */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white/80 rounded-2xl shadow border border-blue-100 overflow-hidden">
              {/* Sol Sütun: Süreç */}
              <div className="col-span-2 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-blue-100">
                <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-7 tracking-tight">Süreç Nasıl İşliyor?</h2>
                <ol className="list-none pl-0 text-gray-700 space-y-6 mb-2">
                  {[
                    { title: "Model Seç & Teklif Al", desc: "Modelinizi bulun, sorununuzu belirtin ve anında ön teklif alın." },
                    { title: "Ücretsiz Teslimat/Analiz", desc: "Cihazınızı adresinizden alalım veya servisimize getirin." },
                    { title: "Uzman Onarım", desc: "Orijinal parçalarla, uzman teknisyenlerimiz tarafından onarımı gerçekleştirilir." },
                    { title: "Garantili Teslimat", desc: "Onarılan cihazınız, garantili olarak size teslim edilir." },
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-5">
                      <span className="text-blue-600 font-extrabold text-3xl md:text-4xl min-w-[44px] text-center leading-none drop-shadow-sm">{i + 1}.</span>
                      <span>
                        <span className="font-bold text-lg md:text-xl text-gray-900">{step.title}:</span> <span className="text-base md:text-lg text-gray-700">{step.desc}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* Sağ Sütun: Güven Rozetleri */}
              <div className="flex flex-col items-center justify-center bg-blue-50/80 border-l border-blue-200 p-8 h-full min-w-[220px]">
                <div className="flex flex-col gap-6 w-full">
                  <span className="flex flex-row items-center gap-3">
                    <span className="w-10 flex justify-end items-center flex-shrink-0">
                      {/* Chip/Memory Icon */}
                      <svg className="w-9 h-9 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10h-4V7h4v3zm2-7h-2V1a1 1 0 1 0-2 0v2h-4V1a1 1 0 1 0-2 0v2H5a2 2 0 0 0-2 2v2H1a1 1 0 1 0 0 2h2v4H1a1 1 0 1 0 0 2h2v2a2 2 0 0 0 2 2h2v2a1 1 0 1 0 2 0v-2h4v2a1 1 0 1 0 2 0v-2h2a2 2 0 0 0 2-2v-2h2a1 1 0 1 0 0-2h-2v-4h2a1 1 0 1 0 0-2h-2V5a2 2 0 0 0-2-2zm0 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12z"/></svg>
                    </span>
                    <span className="flex-1 text-base md:text-lg font-semibold text-gray-700 flex items-center">
                      <span className="text-blue-600 font-bold">Orijinal Parça</span>
                    </span>
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <span className="w-10 flex justify-end items-center flex-shrink-0">
                      {/* Shield Icon */}
                      <svg className="w-9 h-9 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l7 4v6c0 5.25-3.5 10-7 10s-7-4.75-7-10V6l7-4z"/></svg>
                    </span>
                    <span className="flex-1 text-base md:text-lg font-semibold text-gray-700 flex items-center">
                      <span className="text-blue-600 font-bold">12 Ay Garanti</span>
                    </span>
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <span className="w-10 flex justify-end items-center flex-shrink-0">
                      {/* Badge Icon */}
                      <svg className="w-10 h-10 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10zm-5 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                    </span>
                    <span className="flex-1 text-base md:text-lg font-semibold text-gray-700 flex items-center">
                      <span className="flex flex-row items-center gap-1">
                        <span className="w-10 flex justify-end items-center flex-shrink-0">
                          <svg className="w-9 h-9 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10zm-5 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                        </span>
                        <span className="flex-1 text-base md:text-lg font-semibold text-gray-700 flex items-center">
                          <span className="text-blue-600 font-bold ml-2">Sertifikalı<br />Teknisyen</span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <span className="flex flex-row items-center gap-3">
                    <span className="w-10 flex justify-end items-center flex-shrink-0">
                      {/* Bolt Icon */}
                      <svg className="w-9 h-9 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v13h3v7l7-12h-4l4-8z"/></svg>
                    </span>
                    <span className="flex-1 text-base md:text-lg font-semibold text-gray-700 flex items-center">
                      <span className="text-blue-600 font-bold">Hızlı & Güvenilir</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Arama kutucuğu burada */}
          <div className="flex justify-center mb-12">
            <div ref={searchBoxRef} className="bg-white shadow-lg rounded-xl p-2 w-full max-w-2xl border border-gray-200">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Model ara..."
                className="w-full px-6 py-2 border rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-400 h-12"
                style={{ height: 48 }}
              />
              {search.length > 1 && (
                <div className="mt-2 max-h-80 overflow-auto">
                  {filteredModels.length > 0 ? (
                    <>
                      <ul>
                        {filteredModels.map((item) => (
                          <li key={item.model} className="py-2 px-3 hover:bg-blue-50 rounded text-base font-mono cursor-pointer">
                            {item.model}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 text-center">
                        <a href="/contact" className="inline-block text-blue-600 hover:underline font-semibold text-base mt-2">
                          Modelinizi listede bulamadınız mı? Buraya tıklayarak bize yazın.
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-gray-400 text-base mt-2">Sonuç bulunamadı.</div>
                      <div className="mt-4 text-center">
                        <a href="/contact" className="inline-block text-blue-600 hover:underline font-semibold text-base mt-2">
                          Modelinizi listede bulamadınız mı? Buraya tıklayarak bize yazın.
                        </a>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Ayırıcı çizgi */}
          <div className="w-full h-px bg-gray-200 mb-12"></div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pagedModels.map((model) => (
            <Link
              key={model.model}
              href={`/brands/telefunken/${encodeURIComponent(model.model)}`}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="mb-4 w-32 h-20 flex items-center justify-center">
                <Image src={(model as any).image || "/brands/zero-tv.png"} alt={model.model} width={128} height={80} className="object-contain" />
              </div>
              <div className="text-lg font-bold text-gray-900 group-hover:text-blue-600 mb-2">{model.model}</div>
            </Link>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2 overflow-auto max-w-full whitespace-nowrap pb-4">
          {/* Geri (Previous) butonu */}
          <button
            onClick={() => router.push(`/brands/telefunken?page=${page - 1}`)}
            className={`px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold mr-2`}
            disabled={page === 1}
          >
            Geri
          </button>
          {/* İlk sayfa */}
          <button
            onClick={() => router.push(`/brands/telefunken?page=1`)}
            className={`px-4 py-2 rounded ${page === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} font-semibold`}
            disabled={page === 1}
          >
            1
          </button>
          {page > 4 && <span className="px-2">...</span>}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(i =>
              (i >= page - 2 && i <= page + 2) && i !== 1 && i !== totalPages
            )
            .map(i => (
              <button
                key={i}
                onClick={() => router.push(`/brands/telefunken?page=${i}`)}
                className={`px-4 py-2 rounded ${page === i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} font-semibold`}
                disabled={page === i}
              >
                {i}
              </button>
            ))}
          {page < totalPages - 3 && <span className="px-2">...</span>}
          {totalPages > 1 && (
            <button
              onClick={() => router.push(`/brands/telefunken?page=${totalPages}`)}
              className={`px-4 py-2 rounded ${page === totalPages ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} font-semibold`}
              disabled={page === totalPages}
            >
              {totalPages}
            </button>
          )}
          {/* Next (İleri) butonu */}
          <button
            onClick={() => router.push(`/brands/telefunken?page=${page + 1}`)}
            className={`px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold ml-2`}
            disabled={page === totalPages}
          >
            İleri
          </button>
        </div>
      </div>
    </div>
  );
} 
