import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';
import BlogPreview from '@/components/home/BlogPreview';
import QuoteSection from '@/components/home/QuoteSection';

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