import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';
import BlogPreview from '@/components/home/BlogPreview';
import QuoteSection from '@/components/home/QuoteSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TV Ekran Tamiri İstanbul | Ekran Değişimi & LED Panel Tamiri - Zero Teknik',
  description: 'İstanbul genelinde profesyonel TV ekran tamiri ve değişimi. Samsung, LG, Sony, Vestel tüm markalar. Aynı gün servis, 12 ay garanti. Ücretsiz teklif alın!',
  keywords: 'tv ekran tamiri istanbul, tv ekran değişimi, led panel tamiri, samsung tv tamiri, lg ekran tamiri, tv tamiri istanbul',
  openGraph: {
    title: 'Ekran Sitesi - Profesyonel Ekran Çözümleri',
    description: 'Profesyonel ekran çözümleri ve LED ekranlar için güvenilir hizmet.',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ekran Sitesi - Profesyonel Ekran Çözümleri',
    description: 'Profesyonel ekran çözümleri ve LED ekranlar için güvenilir hizmet.',
  },
};

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <Services />
      <QuoteSection />
      <Testimonials />
      <BlogPreview />
    </div>
  );
}