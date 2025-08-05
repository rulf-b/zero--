import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    brand: '',
    size: '',
    issue: '',
  });
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    setForm(f => ({
      ...f,
      brand: searchParams.get('brand') || '',
      size: searchParams.get('size') || '',
      issue: searchParams.get('issue') || ''
    }));
  }, [searchParams]);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data));
  }, []);

  return (
    <footer className="bg-gray-900 text-white overflow-x-hidden w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full overflow-x-hidden">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/site_logo/zero_alt.png" alt="Zero Logo" width={60} height={60} className="rounded-lg bg-white p-0" />
              <div className="text-xl font-bold">{siteSettings?.companyName || 'Zero Teknik'}</div>
            </div>
            <p className="text-gray-400 mb-4">
              {siteSettings?.description || '10 yılı aşkın deneyimle profesyonel TV ekran tamiri ve değişimi hizmetleri.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/zerotvservisi/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hizmetler</h3>
            <ul className="space-y-2">
              <li><Link href="/services/tv-screen-replacement" className="text-gray-400 hover:text-white transition-colors">TV Ekran Değişimi</Link></li>
              <li><Link href="/services/led-replacement" className="text-gray-400 hover:text-white transition-colors">LED Panel Tamiri</Link></li>
              <li><Link href="/services/motherboard-repair" className="text-gray-400 hover:text-white transition-colors">Anakart Tamiri</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Tüm Hizmetler</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/quote" className="text-gray-400 hover:text-white transition-colors">Fiyat Teklifi Al</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim Bilgileri</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">{siteSettings?.phone || '+90 552 558 79 05'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">{siteSettings?.email || 'zero@ledtvpaneli.com'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">{siteSettings?.address || 'İstanbul, Türkiye'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Zero Elektronik. Tüm hakları saklıdır.</p>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <Link href="/aydinlatma-metni" className="underline hover:text-blue-600">Aydınlatma Metni (KVKK)</Link>
          <span className="mx-2">|</span>
          <Link href="/kullanim-kosullari" className="underline hover:text-blue-600">Kullanım Koşulları</Link>
          <span className="mx-2">|</span>
          <Link href="/gizlilik-politikasi" className="underline hover:text-blue-600">Gizlilik Politikası</Link>
          <span className="mx-2">|</span>
          <Link href="/cerez-politikasi" className="underline hover:text-blue-600">Çerez Politikası</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;