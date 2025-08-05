"use client";
import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { CallButton } from '@/components/ui/WhatsAppButton';
import { PricesProvider } from '@/lib/PricesContext';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

function isMobileUserAgent(ua: any) {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua);
}

function MobileLayout({ children }: any) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

function DesktopLayout({ children }: any) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default function RootLayout({ children }: any) {
  const [isMobile, setIsMobile] = useState(false);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://ekransitesi.com/#organization",
    "name": "Zero Teknik TV Tamiri",
    "alternateName": ["Ekran Sitesi", "TV Tamiri İstanbul"],
    "description": "İstanbul'un en güvenilir TV ekran tamiri ve değişimi servisi. Samsung, LG, Sony, Vestel tüm markalar için aynı gün servis, orijinal parça garantisi.",
    "url": "https://ekransitesi.com",
    "telephone": "+905525587905",
    "priceRange": "₺₺",
    "image": "https://ekransitesi.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "İstanbul Geneli Servis",
      "addressLocality": "İstanbul",
      "addressRegion": "Marmara",
      "postalCode": "34000",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.0082,
      "longitude": 28.9784
    },
    "openingHours": [
      "Mo-Su 08:00-22:00"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 41.0082,
        "longitude": 28.9784
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "TV Tamiri Hizmetleri",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "TV Ekran Tamiri",
            "description": "Kırık, çatlak, siyah ekran TV tamiri"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "LED Panel Değişimi",
            "description": "TV LED panel ve backlight tamiri"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marka Bazlı Servis", 
            "description": "Samsung, LG, Sony, Vestel tüm markalar"
          }
        }
      ]
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "İstanbul",
        "containedInPlace": {
          "@type": "Country",
          "name": "Türkiye"
        }
      }
    ],
    "paymentAccepted": ["Cash", "Credit Card"],
    "currenciesAccepted": "TRY",
    "keywords": "tv tamiri istanbul, ekran değişimi, led panel tamiri, samsung tv tamiri, lg tv tamiri, sony tv tamiri, vestel tv tamiri, tv servisi istanbul",
    "sameAs": [
      "https://g.co/kgs/utcuNWK",
      "https://ekransitesi.com/markalar"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1", 
      "ratingCount": "156"
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(isMobileUserAgent(navigator.userAgent));
    }
  }, []);

  return (
    <html lang="tr">
      <head>
        <title>TV Ekran Tamiri İstanbul | Samsung LG Sony Vestel Ekran Değişimi</title>
        <meta name="description" content="İstanbul'da TV ekran tamiri ve değişimi. Samsung, LG, Sony, Vestel tüm markalar için aynı gün servis, orijinal parça, 12 ay garanti. ☎️ 0{siteSettings?.phone || '+90 552 558 79 05'}" />
        <meta name="keywords" content="tv tamiri istanbul, ekran değişimi, samsung tv tamiri, lg tv tamiri, sony tv tamiri, vestel tv tamiri, led panel tamiri, tv servisi istanbul" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Zero Teknik TV Tamiri" />
        <meta name="geo.region" content="TR-34" />
        <meta name="geo.placename" content="İstanbul" />
        <meta name="geo.position" content="41.0082;28.9784" />
        <meta name="ICBM" content="41.0082, 28.9784" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="TV Ekran Tamiri İstanbul | Samsung LG Sony Vestel Servisi" />
        <meta property="og:description" content="İstanbul'da TV ekran tamiri ve değişimi. Tüm markalar için aynı gün servis, 12 ay garanti." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ekransitesi.com" />
        <meta property="og:image" content="https://ekransitesi.com/og-image.jpg" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="Zero Teknik TV Tamiri" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TV Ekran Tamiri İstanbul | Samsung LG Sony Vestel" />
        <meta name="twitter:description" content="İstanbul'da TV ekran tamiri. Aynı gün servis, 12 ay garanti." />
        <meta name="twitter:image" content="https://ekransitesi.com/og-image.jpg" />
        
        {/* Structured Data */}
        <link rel="canonical" href="https://ekransitesi.com" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Hreflang for language/region */}
        <link rel="alternate" hrefLang="tr" href="https://ekransitesi.com" />
        <link rel="alternate" hrefLang="tr-TR" href="https://ekransitesi.com" />
        <link rel="icon" href="/brands/zero_alt.png" type="image/png" />
        
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData)
          }}
        />
      </head>
      <body className={inter.className}>
        <PricesProvider>
          {isMobile ? (
            <MobileLayout>{children}</MobileLayout>
          ) : (
            <DesktopLayout>{children}</DesktopLayout>
          )}
          <WhatsAppButton />
          <CallButton />
        </PricesProvider>
      </body>
    </html>
  );
}