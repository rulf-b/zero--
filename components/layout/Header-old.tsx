'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

// ...existing code...

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const pathname = usePathname() || "";

  // Ekran genişliğine göre cihaz türü belirle
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) setDevice('mobile');
      else if (width < 1200) setDevice('tablet');
      else setDevice('desktop');
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Aktif sayfa kontrolü
  const isActivePage = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  if (device === 'mobile') {
    // Telefon: sadece logo ve hamburger menü
    return (
      <header className="fixed top-0 w-full bg-white shadow-md z-50 border-b transition-shadow">
        <div className="flex justify-between items-center h-28 px-4">
          <Link href="/" className="flex items-center min-w-0 mr-4">
            <Image src="/brands/zero_alt.png" alt="Zero Teknik TV Tamiri" width={140} height={140} className="rounded-xl" />
          </Link>
          <button className="p-2 ml-2 flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menüyü Aç/Kapat">
            <Menu className="w-7 h-7" />
          </button>
        </div>
        {isMenuOpen && (
          <div className="bg-white border-t shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {[...mainPages.filter(page => page.name !== 'TV Markaları'), ...morePages].map((item) => (
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
              
              {/* TV Markaları Bölümü */}
              <div className="border-t pt-4">
                <Link 
                  href="/brands"
                  className={`block font-medium py-2 text-lg transition-colors duration-200 ${
                    pathname === '/brands' 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  TV Markaları
                </Link>
                <div className="ml-4 mt-2 space-y-2">
// ...existing code...
                </div>
              </div>
              
              <a href="tel:+905525587905" className="flex items-center space-x-2 text-gray-700 py-2 mt-2">
                <Phone className="w-5 h-5 mr-1 text-blue-600" />
                <span className="font-semibold">İletişim</span>
                <span className="text-base font-medium text-gray-700 ml-2">+90 555 123 4567</span>
              </a>
              <Link href="/quote" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 mt-2">Teklif Al</Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    );
  }

  if (device === 'tablet') {
    // Tablet: logo + büyük hamburger menü (yanında 'Menü' yazısı) + iletişim ve fiyat teklifi butonu
    return (
      <header className="fixed top-0 w-full bg-white shadow-md z-50 border-b transition-shadow">
        <div className="flex justify-between items-center h-28 px-4">
          <Link href="/" className="flex items-center min-w-0 mr-4">
            <Image src="/brands/logo.png" alt="Site Logosu" width={140} height={140} className="rounded-xl" />
          </Link>
          <div className="flex items-center space-x-4">
            <a href="tel:+905525587905" className="hidden sm:flex items-center space-x-2 text-gray-700 font-semibold">
              <Phone className="w-5 h-5 text-blue-600" />
              <span>İletişim</span>
            </a>
            <Link href="/quote">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-base font-bold shadow-md">Teklif Al</Button>
            </Link>
            <button className="p-2 ml-2 flex items-center text-lg font-bold" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menüyü Aç/Kapat">
              <Menu className="w-8 h-8" />
              <span className="ml-2">Menü</span>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="bg-white border-t shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {[...mainPages.filter(page => page.name !== 'TV Markaları'), ...morePages].map((item) => (
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
              
              {/* TV Markaları Bölümü */}
              <div className="border-t pt-4">
                <Link 
                  href="/brands"
                  className={`block font-medium py-2 text-lg transition-colors duration-200 ${
                    pathname === '/brands' 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  TV Markaları
                </Link>
                <div className="ml-4 mt-2 space-y-2">
// ...existing code...
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Masaüstü: klasik menü
  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50 border-b transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center min-w-0 mr-4">
            <Image src="/brands/logo.png" alt="Site Logosu" width={140} height={140} className="rounded-xl" />
          </Link>
          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-2 relative">
            {mainPages.filter(page => page.name !== 'TV Markaları').map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isActivePage(item.href)
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* TV Markaları Dropdown */}
            <div className="relative">
              <button 
                className={`flex items-center px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                  pathname.startsWith('/brands')
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsBrandsOpen((v) => !v)} 
                onBlur={() => setTimeout(() => setIsBrandsOpen(false), 150)} 
                aria-haspopup="true" 
                aria-expanded={isBrandsOpen}
              >
                TV Markaları <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {isBrandsOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg py-2 z-[999]">
                  <Link 
                    href="/brands"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-b border-gray-100"
                    onClick={() => setIsBrandsOpen(false)}
                  >
                    Tüm TV Markaları
                  </Link>
// ...existing code...
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                className={`flex items-center px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                  morePages.some(page => isActivePage(page.href))
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsMoreOpen((v) => !v)} 
                onBlur={() => setTimeout(() => setIsMoreOpen(false), 150)} 
                aria-haspopup="true" 
                aria-expanded={isMoreOpen}
              >
                Daha Fazla <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {isMoreOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-[999]">
                  {morePages.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href} 
                      className={`block px-4 py-2 transition-colors duration-200 ${
                        isActivePage(item.href)
                          ? 'text-blue-600 bg-blue-50 font-semibold'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
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
          {/* Contact + CTA */}
          <div className="flex items-center space-x-6 min-w-[260px] justify-end">
            <a href="tel:+905525587905" className="flex flex-col items-end group hover:text-blue-600 transition-colors min-w-[140px]">
              <span className="flex items-center space-x-2">
                <Phone className="w-5 h-5 mr-1 text-blue-600 group-hover:text-blue-700" />
                <span className="font-semibold">İletişim</span>
              </span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">+90 555 123 4567</span>
            </a>
            <Link href="/quote">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-bold shadow-md">Teklif Al</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;