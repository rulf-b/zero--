"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/blog-posts')
      .then(res => res.json())
      .then(data => {
        setBlogPosts(data);
        setLoading(false);
      });
  }, []);

  const filteredPosts = blogPosts.filter((post: any) => {
    const q = search.toLowerCase();
    return (
      post.title?.toLowerCase().includes(q) ||
      post.excerpt?.toLowerCase().includes(q)
    );
  });

  const categories = [
    'Tüm Yazılar',
    // Kategoriler dinamikleştirilebilir
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
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Makalelerde ara..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </section>
      {/* Remove the category button section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div>Yükleniyor...</div>
          ) : filteredPosts.length === 0 ? (
            <div>Blog yazısı bulunamadı.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Link key={post.id || index} href={`/blog/${post.id}`} className="block group">
                  <article
                    key={post.id || index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
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
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
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