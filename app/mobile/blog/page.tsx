import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TV Tamir Blogu & Rehberler | Zero Teknik',
  description: 'TV tamiri hakkında uzman ipuçları, sorun giderme rehberleri ve sektörden güncel bilgiler. TV bakımını öğrenin, cihazlarınızı daha uzun ömürlü kullanın.',
  keywords: 'TV tamir blogu, TV sorun giderme, TV bakım ipuçları, TV tamir rehberleri',
};

const BlogPage = () => {
  const blogPosts = [
    {
      title: 'TV Ekranında Dikey Çizgiler Nasıl Giderilir?',
      excerpt: 'TV ekranında dikey çizgilerin yaygın nedenlerini ve ne zaman profesyonel tamir gerektiğini öğrenin. Sorun giderme adımlarını ve çözüm seçeneklerini anlatıyoruz.',
      image: 'https://images.pexels.com/photos/6953876/pexels-photo-6953876.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Teknoloji Uzmanı',
      date: '15 Ocak 2025',
      slug: 'fix-vertical-lines-tv-screen',
      category: 'TV Tamir İpuçları',
      readTime: '5 dk okuma'
    },
    {
      title: 'Samsung ve LG: Hangi TV Ekranı Daha Dayanıklı?',
      excerpt: 'Samsung ve LG TV ekranlarının dayanıklılığını ve ömrünü karşılaştırarak bilinçli bir tercih yapın. Detaylı analiz ve güvenilirlik.',
      image: 'https://images.pexels.com/photos/4009599/pexels-photo-4009599.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Teknoloji Uzmanı',
      date: '12 Ocak 2025',
      slug: 'samsung-vs-lg-tv-screen-durability',
      category: 'TV Markaları',
      readTime: '8 dk okuma'
    },
    {
      title: 'TV Anakartı Arızası Belirtileri',
      excerpt: 'TV anakartınızın profesyonel tamir veya değişim gerektirdiğini gösteren uyarı işaretlerini öğrenin. Yaygın semptomlar ve çözümler.',
      image: 'https://images.pexels.com/photos/4009604/pexels-photo-4009604.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Teknoloji Uzmanı',
      date: '10 Ocak 2025',
      slug: 'tv-motherboard-repair-signs',
      category: 'Donanım Sorunları',
      readTime: '6 dk okuma'
    },
    {
      title: 'LED Arka Aydınlatma Sorunları: Teşhis ve Çözümler',
      excerpt: "Modern TV'lerde LED arka aydınlatma sorunlarını teşhis etme ve giderme rehberi. Farklı arka aydınlatma problemleri ve çözüm yolları.",
      image: 'https://images.pexels.com/photos/4009606/pexels-photo-4009606.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Teknoloji Uzmanı',
      date: '8 Ocak 2025',
      slug: 'led-backlight-problems-solutions',
      category: 'LED Tamiri',
      readTime: '7 dk okuma'
    },
    {
      title: 'TV Ekran Değişimi: Tamir mi, Yenisi mi?',
      excerpt: 'TV ekranınızı tamir ettirmek ile yeni TV almak arasında doğru kararı verin. Fiyat analizi ve farklı boyut/yaş için öneriler.',
      image: 'https://images.pexels.com/photos/4009608/pexels-photo-4009608.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Teknoloji Uzmanı',
      date: '5 Ocak 2025',
      slug: 'tv-screen-replacement-vs-new-tv',
      category: 'Satın Alma Rehberi',
      readTime: '10 dk okuma'
    },
    {
      title: 'Yaygın TV Sorunları ve Pratik Çözümler',
      excerpt: 'Profesyonel yardıma başvurmadan önce yaygın TV sorunlarını kendiniz çözün. Ses, görüntü ve bağlantı problemleri için pratik öneriler.',
      image: 'https://images.pexels.com/photos/4009610/pexels-photo-4009610.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Teknoloji Uzmanı',
      date: '3 Ocak 2025',
      slug: 'common-tv-problems-quick-fixes',
      category: 'Sorun Giderme',
      readTime: '12 dk okuma'
    }
  ];

  const categories = [
    'Tüm Yazılar',
    'TV Tamir İpuçları',
    'TV Markaları',
    'Donanım Sorunları',
    'LED Tamiri',
    'Satın Alma Rehberi',
    'Sorun Giderme'
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            TV Tamir Blogu & Rehberler
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            TV tamiri hakkında uzman ipuçları, sorun giderme rehberleri ve sektörden güncel bilgiler. TV bakımını öğrenin, cihazlarınızı daha uzun ömürlü kullanın.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Makalelerde ara..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-blue-600 hover:bg-blue-700 text-white" : "border-gray-300 text-gray-700 hover:bg-gray-50"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-4">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Makalenin Devamı
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Daha Fazla Makale Yükle
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            TV Tamir İpuçlarıyla Güncel Kalın
          </h2>
          <p className="mb-8 text-white">
            En yeni TV tamir rehberleri, sorun giderme ipuçları ve sektör haberleri e-posta kutunuza gelsin.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="E-posta adresinizi girin"
              className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent text-gray-900 bg-white placeholder-gray-500"
              required
            />
            <Button type="submit" className="bg-white hover:bg-blue-50 text-blue-700 px-8 py-3 rounded-lg font-bold border border-white">
              Abone Ol
            </Button>
          </div>
          <p className="text-xs text-gray-200 mt-4">
            Spam yok, istediğiniz zaman abonelikten çıkabilirsiniz. Gizliliğinize saygı duyuyoruz.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;