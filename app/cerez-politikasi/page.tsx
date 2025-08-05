import React from 'react';

const CerezPolitikasiPage = () => (
  <div className="max-w-3xl mx-auto py-16 px-4">
    <h1 className="text-3xl font-bold mb-6">Çerez Politikası</h1>
    <p>Web sitemizi ziyaretinizde kullanıcı deneyiminizi geliştirmek ve sitemizin verimli çalışmasını sağlamak amacıyla çerezler kullanmaktayız.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">1. Çerez Nedir ve Ne İşe Yarar?</h2>
    <p>Çerezler, web sitelerini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Sitenin tercihlerinizi (dil, yazı boyutu vb.) hatırlamasını, oturumunuzun açık kalmasını ve site trafiğinin analiz edilmesini sağlarlar.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">2. Kullandığımız Çerez Türleri</h2>
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Çerez Türü</th>
            <th className="border px-2 py-1">Açıklama</th>
            <th className="border px-2 py-1">Örnek Kullanım</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Zorunlu Çerezler (Oturum Çerezleri)</td>
            <td className="border px-2 py-1">Web sitesinin temel fonksiyonlarının çalışabilmesi için mutlak surette gereklidir. Bu çerezler olmadan site düzgün çalışmaz. Tarayıcı kapatıldığında silinirler.</td>
            <td className="border px-2 py-1">Kullanıcının bir form doldururken sayfalar arasında gezindiğinde girdiği bilgilerin kaybolmaması.</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Performans ve Analiz Çerezleri</td>
            <td className="border px-2 py-1">Ziyaretçilerin web sitesini nasıl kullandığı hakkında anonim veriler toplar. Hangi sayfaların popüler olduğunu, hangi bağlantıların tıklandığını anlamamıza yardımcı olur.</td>
            <td className="border px-2 py-1">Google Analytics çerezleri ile ziyaretçi sayısını ve davranışlarını ölçerek site performansını iyileştirmek.</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">İşlevsel Çerezler</td>
            <td className="border px-2 py-1">Kullanıcının web sitesindeki tercihlerini (kullanıcı adı, dil, bölge vb.) hatırlayarak daha kişiselleştirilmiş bir deneyim sunar.</td>
            <td className="border px-2 py-1">"Beni Hatırla" seçeneği işaretlendiğinde giriş bilgilerinizin saklanması.</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Pazarlama Çerezleri (Üçüncü Taraf)</td>
            <td className="border px-2 py-1">Ziyaretçilerin ilgi alanlarına yönelik reklamlar sunmak amacıyla iş ortaklarımız (örn: Google, Facebook) tarafından yerleştirilen çerezlerdir.</td>
            <td className="border px-2 py-1">Daha önce incelediğiniz bir ürünle ilgili reklamların başka sitelerde karşınıza çıkması (Yeniden Pazarlama).</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 className="text-xl font-semibold mt-8 mb-2">3. Çerezlerin Yönetimi</h2>
    <p>Çerezleri kabul etmek zorunda değilsiniz. Tarayıcınızın ayarlarını değiştirerek çerezleri devre dışı bırakabilir veya silebilirsiniz. Ancak bu durumda web sitemizin bazı özelliklerinden tam olarak faydalanamayabilirsiniz.</p>
    <p className="mt-4">Tarayıcınızda çerezleri nasıl yöneteceğinize dair talimatları aşağıdaki bağlantılarda bulabilirsiniz:</p>
    <ul className="list-disc list-inside mb-2">
      <li><a href="https://support.google.com/accounts/answer/61416?hl=tr" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
      <li><a href="https://support.mozilla.org/tr/kb/web-sitesi-tercihleri-cerezleri-etkinlestirme-ve-devre-disi-birakma" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
      <li><a href="https://support.microsoft.com/tr-tr/windows/microsoft-edge-gözatma-verileri-ve-gizlilik-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      <li><a href="https://support.apple.com/tr-tr/guide/safari/sfri11471/mac" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">Safari</a></li>
    </ul>
  </div>
);

export default CerezPolitikasiPage; 