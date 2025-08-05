import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Professional TV Screen Repair & Replacement Services | Zero Teknik',
  description: 'Expert TV screen replacement, LED panel repair, and motherboard services. Fast, reliable repairs for all TV brands. Get your quote today!',
  keywords: 'TV screen repair, TV panel replacement, LED repair, motherboard repair, Samsung TV repair, LG TV repair',
  authors: [{ name: 'Zero Teknik' }],
  openGraph: {
    title: 'Professional TV Screen Repair & Replacement Services',
    description: 'Expert TV screen replacement, LED panel repair, and motherboard services. Fast, reliable repairs for all TV brands.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional TV Screen Repair & Replacement Services',
    description: 'Expert TV screen replacement, LED panel repair, and motherboard services.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Zero Teknik',
              description: 'Professional TV Screen Repair and Replacement Services',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Istanbul',
                addressCountry: 'TR'
              },
              telephone: '+90-555-123-4567',
              url: 'https://techfixpro.com',
              serviceArea: 'Istanbul, Turkey',
              priceRange: '$$'
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <header className="w-full bg-white shadow-md z-50 border-b flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-lg font-bold text-gray-900">TechFix</span>
          </div>
          <button className="p-2" aria-label="Menüyü Aç/Kapat">
            {/* Hamburger icon (svg) */}
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}