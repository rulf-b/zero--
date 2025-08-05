'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mainPages = [
  { name: 'Anasayfa', href: '/' },
  { name: 'Hizmetler', href: '/services' },
  { name: 'TV Markaları', href: '/markalar' },
  { name: 'Hakkımızda', href: '/about' },
  { name: 'Blog', href: '/blog' },
];
const morePages = [
  { name: 'Lokasyonlar', href: '/locations' },
  { name: 'İletişim', href: '/contact' },
];

// Popüler marka+şehir kombinasyonları - Türkçe URL
const popularBrandLocations: any[] = [
];

// Tüm TV markalarının listesi
const allBrands = [
  { name: 'Samsung', href: '/markalar/samsung', logo: '/marka_logo/samsung.png' },
  { name: 'LG', href: '/markalar/lg', logo: '/marka_logo/1753122788887-ogkegf.png' },
  { name: 'Sony', href: '/markalar/sony', logo: '/marka_logo/sony.png' },
  { name: 'Vestel', href: '/markalar/vestel', logo: '/marka_logo/vestel.png' },
  { name: 'TCL', href: '/markalar/tcl', logo: '/marka_logo/tcl.png' },
  { name: 'Philips', href: '/markalar/philips', logo: '/marka_logo/philips.png' },
  { name: 'Panasonic', href: '/markalar/panasonic', logo: '/marka_logo/panasonic.png' },
  { name: 'Hisense', href: '/markalar/hisense', logo: '/marka_logo/hisense.png' },
  { name: 'Arçelik', href: '/markalar/arcelik', logo: '/marka_logo/1753123175619-qqtaj0.png' },
  { name: 'Beko', href: '/markalar/beko', logo: '/marka_logo/beko.png' },
  { name: 'Grundig', href: '/markalar/grundig', logo: '/marka_logo/1753123626318-nukdru.png' },
  { name: 'Finlux', href: '/markalar/finlux', logo: '/marka_logo/1753123961434-yjapbf.png' },
  { name: 'Profilo', href: '/markalar/profilo', logo: '/marka_logo/1753124288707-bbwgf7.png' },
  { name: 'Regal', href: '/markalar/regal', logo: '/marka_logo/1753124368642-8d5p61.png' },
  { name: 'Telefunken', href: '/markalar/telefunken', logo: '/marka_logo/1753124566301-iw8s7q.png' },
  { name: 'Toshiba', href: '/markalar/toshiba', logo: '/marka_logo/1753123224001-ehy807.png' },
  { name: 'Xiaomi', href: '/markalar/xiaomi', logo: '/marka_logo/1753124652995-hp9jui.png' },
  { name: 'Sunny', href: '/markalar/sunny', logo: '/marka_logo/1753123540532-fgm7tm.png' },
  { name: 'Hi-Level', href: '/markalar/hi-level', logo: '/marka_logo/1753123988860-2tfu91.png' },
  { name: 'Axen', href: '/markalar/axen', logo: '/marka_logo/1753123715933-q4xrn7.png' },
  { name: 'Next', href: '/markalar/next', logo: '/marka_logo/next.png' },
  { name: 'Awox', href: '/markalar/awox', logo: '/marka_logo/1753123263048-ymdfsc.jpg' },
  { name: 'Botech', href: '/markalar/botech', logo: '/marka_logo/1753123769323-ra61xg.png' },
  { name: 'JVC', href: '/markalar/jvc', logo: '/marka_logo/1753124036533-feb003.png' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const pathname = usePathname() || "";

  // Site ayarlarını çek
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data))
      .catch(err => console.error('Site ayarları yüklenemedi:', err));
  }, []);

  // Aktif sayfa kontrolü
  const isActivePage = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50 border-b transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
            <img src="/site_logo/logo.png" alt="Zero Teknik TV Tamiri" width={120} height={40} className="object-contain" />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 space-x-1 max-w-2xl mx-4">
            {mainPages.filter(page => page.name !== 'TV Markaları').map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-gray-50 whitespace-nowrap ${
                  isActivePage(item.href)
                    ? 'text-blue-600 font-semibold bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* TV Markaları Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-gray-50 whitespace-nowrap ${
                  pathname.startsWith('/markalar')
                    ? 'text-blue-600 font-semibold bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                TV Markaları
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isBrandsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isBrandsOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-lg border py-4 z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 mb-3">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Tüm TV Markalarımız</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-1 px-4">
                    {allBrands.map((brand) => (
                      <Link
                        key={brand.href}
                        href={brand.href}
                        className="flex items-center p-2 rounded hover:bg-gray-50 transition-colors text-xs"
                        onClick={() => setIsBrandsOpen(false)}
                      >
                        <span className="font-medium text-gray-700">{brand.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t mt-3 pt-3 px-4">
                    {popularBrandLocations.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        onClick={() => setIsBrandsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded-md whitespace-nowrap"
              >
                Daha Fazla
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isMoreOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                  {morePages.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                        isActivePage(item.href)
                          ? 'text-blue-600 font-semibold bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMoreOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Contact & CTA */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`} className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors px-2 py-2 rounded-md hover:bg-gray-50">
              <Phone className="w-4 h-4" />
              <span className="font-medium text-sm whitespace-nowrap">{siteSettings?.phone || '+90 552 558 79 05'}</span>
            </a>
            <Link href="/ucretsiz-teklif">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold shadow-md rounded-md whitespace-nowrap">
                Ücretsiz Teklif
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menüyü Aç/Kapat"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {mainPages.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`block font-medium py-2 text-lg transition-colors duration-200 ${
                  isActivePage(item.href) 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {morePages.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`block font-medium py-2 text-lg transition-colors duration-200 ${
                  isActivePage(item.href) 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <a href={`tel:${siteSettings?.phone?.replace(/\s/g, '') || '+905525587905'}`} className="flex items-center space-x-2 text-gray-700 py-2 mt-2">
              <Phone className="w-5 h-5 mr-1 text-blue-600" />
              <span className="font-semibold">İletişim</span>
              <span className="text-base font-medium text-gray-700 ml-2">{siteSettings?.phone || '+90 552 558 79 05'}</span>
            </a>
            <Link href="/ucretsiz-teklif" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 mt-2">Teklif Al</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
