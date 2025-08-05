const fs = require('fs');

const generateSitemap = () => {
  const baseUrl = 'https://ekransitesi.com';
  const today = new Date().toISOString().split('T')[0];
  
  const brands = ['samsung', 'lg', 'sony', 'vestel'];
  const districts = [
    'adalar', 'arnavutkoy', 'atasehir', 'avcilar', 'bagcilar', 'bahcelievler',
    'bakirkoy', 'basaksehir', 'bayrampasa', 'besiktas', 'beykoz', 'beylikduzu',
    'beyoglu', 'buyukcekmece', 'catalca', 'cekmekoy', 'esenler', 'esenyurt',
    'eyupsultan', 'fatih', 'gaziosmanpasa', 'gungorent', 'kadikoy', 'kagithane',
    'kartal', 'kucukcekmece', 'maltepe', 'pendik', 'sancaktepe', 'sariyer',
    'silivri', 'sultangazi', 'sultanbeyli', 'sile', 'sisli', 'tuzla',
    'umraniye', 'uskudar', 'zeytinburnu'
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Ana Sayfalar -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/markalar</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/locations</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/ucretsiz-teklif</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Marka Ana Sayfaları -->`;

  brands.forEach(brand => {
    sitemap += `
  <url>
    <loc>${baseUrl}/markalar/${brand}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/markalar/${brand}/istanbul</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += '\n\n  <!-- Marka + İlçe Sayfaları -->';

  brands.forEach(brand => {
    districts.forEach(district => {
      sitemap += `
  <url>
    <loc>${baseUrl}/markalar/${brand}/istanbul/${district}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
  });

  sitemap += '\n</urlset>';

  fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');
  console.log(`Sitemap generated with ${brands.length * districts.length + brands.length * 2 + 8} URLs`);
};

generateSitemap();
