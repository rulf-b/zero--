# Paylaşımlı Hosting Kurulum Rehberi

## 📋 Gereksinimler
- Node.js 18+ destekleyen hosting
- cPanel erişimi
- SSH erişimi (tercihen)

## 🔧 cPanel Ayarları

### 1. package.json Scripts Güncelleme
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p $PORT",
    "export": "next export"
  }
}
```

### 2. Environment Variables (cPanel'de)
```
NODE_ENV=production
JWT_SECRET=tv-repair-cpanel-hosting-jwt-secret-2025-production-key-shared-hosting
PORT=3000
```

### 3. .htaccess Dosyası (public_html'de)
```apache
RewriteEngine On
RewriteRule ^$ http://localhost:3000/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

## 🚀 Deploy Adımları

### Yöntem 1: Static Export (Önerilen)
1. `npm run build`
2. `npm run export` 
3. `out/` klasörünü public_html'e yükle

### Yöntem 2: Node.js App
1. Projeyi hosting'e yükle
2. `npm install --production`
3. `npm run build`
4. `npm start`

## ⚠️ Önemli Notlar
- API routes çalışmayabilir (static export'ta)
- Sunucu restart gerekebilir
- Log dosyaları için yazma izni kontrol et

## 🔗 Alternatif Hosting Önerileri
- **Vercel**: Next.js için optimize
- **Netlify**: Kolay deploy
- **Railway**: Uygun fiyat
