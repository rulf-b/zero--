import React from 'react';

const AydinlatmaMetniPage = () => (
  <div className="max-w-3xl mx-auto py-16 px-4">
    <h1 className="text-3xl font-bold mb-6">Aydınlatma Metni (KVKK)</h1>
    <h2 className="text-xl font-semibold mt-8 mb-2">1. Veri Sorumlusunun Kimliği</h2>
    <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verileriniz; veri sorumlusu olarak Zero Elektronik tarafından aşağıda açıklanan kapsamda işlenebilecektir.</p>
    <ul className="mb-4 mt-2">
      <li><b>Ticari Unvan:</b> Zero Elektronik</li>
      <li><b>Vergi Dairesi:</b> Sultanbeyli</li>
      <li><b>Vergi Numarası:</b> 45802040564</li>
      <li><b>Adres:</b> [Turgut Reis, Armutlu Sk. No:2/A, 34235 Sultanbeyli/İstanbul]</li>
      <li><b>E-posta:</b> [zero@ledtvpaneli.com]</li>
      <li><b>Web Sitesi:</b> <a href="https://www.zeroteknik.com" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">https://www.zeroteknik.com</a></li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">2. Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepleri</h2>
    <p>Tarafınızdan toplanan kişisel veriler, aşağıdaki amaçlar ve hukuki sebepler doğrultusunda işlenecektir:</p>
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Veri İşleme Amacı</th>
            <th className="border px-2 py-1">İşlenen Veri Kategorileri</th>
            <th className="border px-2 py-1">Hukuki Sebep (KVKK Madde 5/2)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Sözleşmesel Süreçlerin Yürütülmesi (Ürün/hizmet satışı, teklif hazırlama, teslimat vb.)</td>
            <td className="border px-2 py-1">Kimlik (Ad, Soyad), İletişim (Adres, E-posta, Telefon), Müşteri İşlem (Sipariş Bilgisi, Teklif Detayları)</td>
            <td className="border px-2 py-1">(c) Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması.</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Finans ve Muhasebe İşlerinin Yürütülmesi (Faturalandırma, cari hesap takibi)</td>
            <td className="border px-2 py-1">Kimlik, İletişim, Finans (Fatura Bilgileri, Vergi No)</td>
            <td className="border px-2 py-1">(ç) Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması.</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Müşteri İlişkileri Yönetimi (Talep, şikayet ve önerilerin takibi, memnuniyet anketleri)</td>
            <td className="border px-2 py-1">Kimlik, İletişim, Müşteri İşlem (Talep Geçmişi)</td>
            <td className="border px-2 py-1">(f) İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması.</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Pazarlama ve Tanıtım Faaliyetleri (Kampanya, indirim, yeni ürün bilgilendirmeleri)</td>
            <td className="border px-2 py-1">İletişim (E-posta, Telefon)</td>
            <td className="border px-2 py-1">(a) İlgili kişinin açık rızası (Ticari elektronik ileti onayı).</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Web Sitesi Güvenliği ve Performans Analizi (Sitenin teknik yönetimi, siber güvenliğin sağlanması)</td>
            <td className="border px-2 py-1">İşlem Güvenliği (IP Adresi, Cihaz Bilgileri, Log Kayıtları)</td>
            <td className="border px-2 py-1">(f) Meşru menfaat. (ç) Hukuki yükümlülük (5651 Sayılı Kanun gereği trafik bilgilerinin saklanması).</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Hukuki Süreçlerin Takibi (Olası uyuşmazlıklarda ispat yükümlülüğü)</td>
            <td className="border px-2 py-1">İlgili tüm veri kategorileri</td>
            <td className="border px-2 py-1">(e) Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 className="text-xl font-semibold mt-8 mb-2">3. Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h2>
    <p>Kişisel verileriniz, KVKK’nın 8. ve 9. maddelerinde belirtilen veri işleme şartları çerçevesinde, yukarıda sayılan amaçların gerçekleştirilebilmesi için aşağıdaki alıcı gruplarına aktarılabilecektir:</p>
    <ul className="mb-4 mt-2 list-disc list-inside">
      <li><b>Tedarikçiler ve İş Ortakları:</b> Hizmet aldığımız kargo ve lojistik firmaları (teslimat amacıyla), bağımsız denetim firmaları, mali müşavirler ve muhasebe hizmeti alınan firmalar (yasal yükümlülükler).</li>
      <li><b>Bilişim Teknolojileri Hizmet Sağlayıcıları:</b> Sunucu (hosting), yazılım, bulut bilişim ve veri tabanı hizmeti aldığımız yurt içi/yurt dışı teknoloji şirketleri (veri saklama ve güvenlik amacıyla).</li>
      <li><b>Yetkili Kamu Kurum ve Kuruluşları:</b> Yasal talepler doğrultusunda mahkemeler, savcılıklar, vergi daireleri gibi hukuken yetkili kamu kurumları (yasal yükümlülükler).</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">4. Kişisel Veri Toplamanın Yöntemi</h2>
    <p>Kişisel verileriniz, web sitemiz (iletişim/teklif formları, çerezler), e-posta, telefon, fuar ve etkinlikler, iş birliği yapılan kurumlar gibi fiziksel ve elektronik kanallar aracılığıyla toplanmaktadır.</p>
    <p>    <p>Başvurularınızı, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ'e uygun olarak, kimliğinizi tevsik edici belgelerle birlikte, yukarıda belirtilen adresimize yazılı olarak veya <a href="mailto:zero@ledtvpaneli.com" className="underline text-blue-600">zero@ledtvpaneli.com</a> e-posta adresimize güvenli elektronik imzalı olarak iletebilirsiniz.</p></p>
  </div>
);

export default AydinlatmaMetniPage; 