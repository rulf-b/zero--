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

// Popüler marka+şehir kombinasyonları - Türkçe URL
const popularBrandLocations = [
];

// Tüm TV markalarının listesi
const allBrands = [
  { name: 'Samsung', href: '/markalar/samsung', logo: 'samsung.svg' },
  { name: 'LG', href: '/markalar/lg', logo: 'lg.svg' },
  { name: 'Sony', href: '/markalar/sony', logo: 'sony.svg' },
  { name: 'Vestel', href: '/markalar/vestel', logo: 'vestel.svg' },
  { name: 'TCL', href: '/markalar/tcl', logo: 'tcl.svg' },
  { name: 'Philips', href: '/markalar/philips', logo: 'philips.svg' },
  { name: 'Panasonic', href: '/markalar/panasonic', logo: 'panasonic.svg' },
  { name: 'Hisense', href: '/markalar/hisense', logo: 'hisense.svg' },
  { name: 'Arçelik', href: '/markalar/arcelik', logo: 'placeholder.svg' },
  { name: 'Beko', href: '/markalar/beko', logo: 'placeholder.svg' },
  { name: 'Grundig', href: '/markalar/grundig', logo: 'placeholder.svg' },
  { name: 'Finlux', href: '/markalar/finlux', logo: 'placeholder.svg' },
  { name: 'Profilo', href: '/markalar/profilo', logo: 'placeholder.svg' },
  { name: 'Regal', href: '/markalar/regal', logo: 'placeholder.svg' },
  { name: 'Telefunken', href: '/markalar/telefunken', logo: 'placeholder.svg' },
  { name: 'Toshiba', href: '/markalar/toshiba', logo: 'placeholder.svg' },
  { name: 'Xiaomi', href: '/markalar/xiaomi', logo: 'placeholder.svg' },
  { name: 'Sunny', href: '/markalar/sunny', logo: 'placeholder.svg' },
  { name: 'Hi-Level', href: '/markalar/hi-level', logo: 'placeholder.svg' },
  { name: 'Axen', href: '/markalar/axen', logo: 'placeholder.svg' },
  { name: 'Next', href: '/markalar/next', logo: 'placeholder.svg' },
  { name: 'Awox', href: '/markalar/awox', logo: 'placeholder.svg' },
  { name: 'Botech', href: '/markalar/botech', logo: 'placeholder.svg' },
  { name: 'JVC', href: '/markalar/jvc', logo: 'placeholder.svg' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const pathname = usePathname() || "";

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
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/brands/zero_alt.png" alt="Zero Teknik TV Tamiri" width={180} height={60} className="object-contain" />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {mainPages.filter(page => page.name !== 'TV Markaları').map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium transition-colors duration-200 ${
                  isActivePage(item.href)
                    ? 'text-blue-600 font-semibold'
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
                className={`flex items-center text-base font-medium transition-colors duration-200 ${
                  pathname.startsWith('/markalar')
                    ? 'text-blue-600 font-semibold'
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
                        className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 transition-colors text-xs"
                        onClick={() => setIsBrandsOpen(false)}
                      >
                        <Image
                          src={`/brands/${brand.logo}`}
                          alt={`${brand.name} Logo`}
                          width={16}
                          height={16}
                          className="object-contain"
                        />
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
                className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
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
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+905525587905" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Phone className="w-5 h-5" />
              <span className="font-medium">+90 555 123 4567</span>
            </a>
            <Link href="/ucretsiz-teklif">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-semibold shadow-md">
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
            
            <a href="tel:+905525587905" className="flex items-center space-x-2 text-gray-700 py-2 mt-2">
              <Phone className="w-5 h-5 mr-1 text-blue-600" />
              <span className="font-semibold">İletişim</span>
              <span className="text-base font-medium text-gray-700 ml-2">+90 555 123 4567</span>
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
