import { notFound } from "next/navigation";
import tvScreens from '../../../../data/tv-screens.json';
import Image from "next/image";

export default function SamsungModelDetail({ params }: { params: { model: string } }) {
  const decodedModel = decodeURIComponent(params.model);
  const modelData = tvScreens.find(
    (item) => item.brand === "Samsung" && item.model === decodedModel
  );

  if (!modelData) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16">
      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-br from-blue-50 to-white relative overflow-hidden py-12 md:py-20 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Sol: Metin */}
          <div className="flex-1 flex flex-col items-start justify-center text-left z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-700 mb-6 leading-tight drop-shadow-sm">{modelData.brand} {modelData.model} Ekran Değişimi ve Tamiri</h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl">Orijinal parçalar, <span className="text-blue-600 font-semibold">12 ay garanti</span> ve <span className="text-blue-600 font-semibold">uzman teknisyenlerimiz</span>le televizyonunuzu ilk günkü performansına kavuşturuyoruz.</p>
            <a href="/quote" className="inline-block px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-bold shadow-lg hover:bg-blue-700 transition-all duration-200 animate-float focus:outline-none focus:ring-4 focus:ring-blue-300">Anında Fiyat Teklifi Al</a>
          </div>
          {/* Sağ: TV Görseli */}
          <div className="flex-1 flex items-center justify-center z-10">
            <div className="relative w-[320px] h-[200px] sm:w-[400px] sm:h-[250px] md:w-[480px] md:h-[300px] lg:w-[520px] lg:h-[340px]">
              <Image
                src={modelData.image || "/brands/zero-tv.png"}
                alt={modelData.model}
                width={520}
                height={340}
                className="object-contain w-full h-full drop-shadow-2xl rounded-xl bg-white/60"
                priority
              />
            </div>
          </div>
        </div>
        {/* Hafif doku efekti için dekoratif arka plan */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-gradient-to-r from-blue-100/40 via-white/0 to-blue-100/40 blur-2xl opacity-60"></div>
        </div>
      </section>

      {/* Sık Karşılaşılan Sorunlar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-10 text-center tracking-tight">Sık Karşılaşılan Sorunlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kart 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-all">
            <svg className="w-14 h-14 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zm-2 0H5v14h14V5zm-7 7l-2.5 3.5h5L12 12zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Kırık ve Çatlak Ekran</h3>
            <p className="text-gray-600">Darbe sonucu oluşan ekran hasarlarını orijinal parçalarla değiştiriyoruz.</p>
          </div>
          {/* Kart 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-all">
            <svg className="w-14 h-14 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H3V5h18v14zm-9-3a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Görüntüde Kararma ve Renk Kaybı</h3>
            <p className="text-gray-600">Panelinizdeki kararma, çizgilenme veya renk kaybı sorunlarını garantili olarak çözüyoruz.</p>
          </div>
          {/* Kart 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-all">
            <svg className="w-14 h-14 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3h-2v10h2V3zm-1 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Diğer Teknik Arızalar</h3>
            <p className="text-gray-600">Anakart, güç kaynağı ve diğer donanımsal sorunlar için uzman desteği alın.</p>
          </div>
        </div>
      </section>

      {/* Neden Biz? (Değer Önerileri) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-10 text-center tracking-tight">Neden Biz?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Kart 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-all">
            <svg className="w-14 h-14 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l7 4v6c0 5.25-3.5 10-7 10s-7-4.75-7-10V6l7-4z"/></svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">12 Ay Garantili Servis</h3>
            <p className="text-gray-600">Yaptığımız tüm parça değişimi ve onarım işlemleri, adınıza faturalı ve 12 ay garantilidir.</p>
          </div>
          {/* Kart 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-all">
            <svg className="w-14 h-14 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10h-4V7h4v3zm2-7h-2V1a1 1 0 1 0-2 0v2h-4V1a1 1 0 1 0-2 0v2H5a2 2 0 0 0-2 2v2H1a1 1 0 1 0 0 2h2v4H1a1 1 0 1 0 0 2h2v2a2 2 0 0 0 2 2h2v2a1 1 0 1 0 2 0v-2h4v2a1 1 0 1 0 2 0v-2h2a2 2 0 0 0 2-2v-2h2a1 1 0 1 0 0-2h-2v-4h2a1 1 0 1 0 0-2h-2V5a2 2 0 0 0-2-2zm0 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12z"/></svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Sadece Orijinal Parçalar</h3>
            <p className="text-gray-600">Televizyonunuzun ömrünü ve performansını korumak için sadece üreticinin onayladığı orijinal parçaları kullanırız.</p>
          </div>
          {/* Kart 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-all">
            <svg className="w-14 h-14 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10zm-5 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Sertifikalı Uzman Kadro</h3>
            <p className="text-gray-600">Ekibimiz, en yeni TV teknolojileri konusunda eğitimli ve sertifikalı teknisyenlerden oluşur.</p>
          </div>
          {/* Kart 4 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-all">
            <svg className="w-14 h-14 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8V4m0 0C7.03 4 2.73 7.11 2.09 12.01c-.09.7.48 1.32 1.19 1.32h17.44c.71 0 1.28-.62 1.19-1.32C21.27 7.11 16.97 4 12 4zm0 0v4"/></svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hızlı ve Şeffaf Süreç</h3>
            <p className="text-gray-600">Size en başından net bilgi verir, onarım sürecini mümkün olan en kısa sürede tamamlarız.</p>
          </div>
        </div>
      </section>

      {/* İçerik */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-lg text-gray-700 mb-8 text-left max-w-2xl mx-auto">
          <p className="mb-4">
            <b>{modelData.brand} {modelData.model}</b> televizyonunuzun ekranında kırık, çatlak, kararma veya görüntü kaybı mı yaşıyorsunuz? Uzman teknik servis ekibimizle, televizyonunuz için profesyonel ekran değişimi ve tamir hizmeti sunuyoruz. Tüm işlemler, orijinal yedek parçalar kullanılarak, hızlı ve güvenli şekilde gerçekleştirilir.
          </p>
          <p className="mb-4">
            Servisimizde, ekran değişimi süreci modelinize özel olarak planlanır. Gelişmiş ekipmanlarımız ve tecrübeli kadromuzla televizyonunuzun görüntü kalitesini ilk günkü haline getiriyoruz.
          </p>
          <h2 className="font-semibold text-xl mt-6 mb-2">Hizmet Özelliklerimiz</h2>
          <ul className="list-disc list-inside mb-4">
            <li>%100 orijinal ekran ve yedek parça kullanımı</li>
            <li>Uzman teknik servis desteği</li>
            <li>Hızlı onarım süreci ve aynı gün teslimat seçeneği</li>
            <li>Garanti kapsamında işlem</li>
          </ul>
          <h2 className="font-semibold text-xl mt-6 mb-2">Ekran Değişimi Gerektiren Durumlar</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Ekranda kırık veya çatlak oluşması</li>
            <li>Görüntünün tamamen gitmesi</li>
            <li>Renk bozulmaları, çizgiler veya lekelenmeler</li>
            <li>Panel içi sıvı teması</li>
            <li>Darbe sonucu oluşan görüntü kayıpları</li>
          </ul>
          <p className="mb-4">
            Yukarıdaki belirtiler, ekran değişiminin gerekli olduğunu gösteren başlıca işaretlerdir. Cihazınızı servisimize getirdiğinizde, <b>ücretsiz arıza tespiti</b> yaparak size en uygun çözümü sunuyoruz.
          </p>
          <h2 className="font-semibold text-xl mt-6 mb-2">Servis Süreci</h2>
          <ol className="list-decimal list-inside mb-4">
            <li><b>İletişim:</b> Randevu oluşturmak için bize ulaşın.</li>
            <li><b>Teslimat:</b> Cihazınızı sadece servisimize getirin.</li>
            <li><b>Arıza Tespiti:</b> Cihaz ücretsiz kontrol edilir.</li>
            <li><b>Onay ve Onarım:</b> Onayınızla ekran değişimi yapılır.</li>
            <li><b>Kalite Kontrol ve Teslim:</b> Testleri tamamlanan cihaz tarafınıza teslim edilir.</li>
          </ol>
          <h2 className="font-semibold text-xl mt-6 mb-2">Neden Bizi Tercih Etmelisiniz?</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Deneyimli teknik kadro</li>
            <li>Hızlı servis ve uygun fiyat</li>
            <li>Orijinal parça garantisi</li>
            <li>Yüzlerce memnun müşteri</li>
            <li>Güvenli ve şeffaf hizmet anlayışı</li>
          </ul>
          <p className="mb-4">
            <b>{modelData.brand} {modelData.model}</b> televizyonunuz için profesyonel ekran değişimi arıyorsanız, doğru adrestesiniz. Cihazınızı güvenle bize emanet edin, televizyon keyfinize kaldığınız yerden devam edin.
          </p>
          <p className="font-semibold text-blue-700 mb-4">Hemen iletişime geçin – Uzman desteğimiz bir telefon kadar yakın!</p>
          <div className="flex justify-center">
            <a
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-colors duration-200 animate-pulse-slow"
            >
              İletişime Geç
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 