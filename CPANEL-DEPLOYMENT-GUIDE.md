# 🚀 cPanel'e Adım Adım Yükleme Rehberi

## 📋 Ön Hazırlık

### 1. Proje Dosyalarını Hazırla
```bash
# Terminal'de şu komutu çalıştır:
cd "c:\Users\ibrahim\Downloads\zero-eae72a8e595cf4ee28ae298362c63cedd3622d56"
npm run build
```

✅ Bu komut `out/` klasörü oluşturacak (static files)

### 2. Gerekli Dosyalar
- ✅ `out/` klasörü (build edilen site)
- ✅ `.htaccess` dosyası
- ✅ Environment variables bilgisi

---

## 🌐 cPanel'e Giriş

### 1. Hosting Sağlayıcınızdan Bilgileri Alın
```
cPanel URL: https://yourdomain.com:2083
veya
https://yourdomain.com/cpanel
```

### 2. Giriş Bilgileri
- **Kullanıcı adı**: Hosting sağlayıcısından aldığınız
- **Şifre**: Hosting şifresi

---

## 📁 Dosya Yükleme İşlemi

### Yöntem 1: File Manager (Kolay)

#### Adım 1: File Manager'ı Aç
1. cPanel'e giriş yap
2. **"Dosya Yöneticisi"** veya **"File Manager"** tıkla
3. **"public_html"** klasörüne git

#### Adım 2: Eski Dosyaları Temizle
1. `public_html` içindeki **TÜM** dosyaları seç
2. **"Delete"** (Sil) tıkla
3. Onaylayın

#### Adım 3: Yeni Dosyaları Yükle
1. **"Upload"** butonuna tıkla
2. Bilgisayarınızdan bu dosyaları seçin:
   ```
   📁 out/ klasörünün İÇİNDEKİ tüm dosyalar
   📄 .htaccess
   ```
3. **Upload** tıkla ve bekle

#### Adım 4: out/ Klasörünü Çıkar
1. Upload edilen `out` klasörünü seç
2. **"Extract"** (Çıkar) tıkla
3. Çıkarılan dosyalar `public_html`'e taşınacak

### Yöntem 2: FTP (İleri Düzey)

#### FTP Bilgilerini Al
1. cPanel'de **"FTP Accounts"** git
2. FTP bilgilerini not al:
   ```
   Host: ftp.yourdomain.com
   Username: username@yourdomain.com
   Password: hosting_password
   Port: 21
   ```

#### FileZilla ile Yükle
1. FileZilla'da FTP bilgilerini gir
2. Local: `out/` klasörü
3. Remote: `public_html/`
4. Tüm dosyaları sürükle-bırak

---

## ⚙️ Environment Variables Ayarları

### Node.js App Olarak (Eğer destekliyorsa)

#### Adım 1: Node.js App Oluştur
1. cPanel'de **"Node.js App"** ara
2. **"Create Application"** tıkla
3. Bu bilgileri gir:
   ```
   Node.js Version: 18+
   Application Mode: Production
   Application Root: public_html
   Application URL: / (root)
   Application Startup File: server.js
   ```

#### Adım 2: Environment Variables Ekle
Environment Variables bölümünde:
```
NODE_ENV = production
JWT_SECRET = tv-repair-cpanel-hosting-jwt-secret-2025-production-key-shared-hosting
```

#### Adım 3: Restart App
**"Restart"** butonuna tıkla

### Static Site Olarak (Önerilen)

Eğer Node.js desteklenmiyorsa:
1. Sadece static dosyaları yükle
2. Admin paneli çalışmayabilir
3. Alternatif: Vercel/Netlify kullan

---

## 🔧 .htaccess Ayarları

`public_html/.htaccess` dosyasının içeriği:

```apache
RewriteEngine On

# Next.js routing için
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Güvenlik header'ları
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"

# Cache ayarları
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
</IfModule>
```

---

## ✅ Test Etme

### 1. Site Kontrolü
1. Browser'da `https://yourdomain.com` git
2. Ana sayfa açılmalı
3. Tüm linkler çalışmalı

### 2. Admin Panel Kontrolü
```
Admin1: https://yourdomain.com/admin
Kullanıcı: 1, Şifre: 1

Admin2: https://yourdomain.com/admin2  
Kullanıcı: 2, Şifre: 2
```

### 3. Hata Kontrolü
Eğer hata varsa:
1. cPanel **"Error Logs"** kontrol et
2. Browser **F12 Console** kontrol et

---

## 🚨 Yaygın Problemler ve Çözümler

### Problem 1: 404 Hatası
**Çözüm**: `.htaccess` dosyasını kontrol et

### Problem 2: Admin Panel Çalışmıyor
**Çözüm**: API routes static export'ta çalışmaz
- **Alternatif**: Vercel kullan

### Problem 3: Resimler Gözükmüyor  
**Çözüm**: 
1. `public/` klasörünü kontrol et
2. Dosya yollarını kontrol et

### Problem 4: CSS/JS Yüklenmiyor
**Çözüm**:
1. Cache temizle
2. `.htaccess` mime types kontrol et

---

## 📞 Hosting Desteği

Eğer sorun yaşarsan:
1. **Hosting desteği** ile iletişime geç
2. **"Next.js deployment"** yardımı iste
3. **Node.js version** kontrolü yap

---

## 🎯 Alternatif Çözümler

### Vercel (Önerilen)
```bash
1. GitHub'a push et
2. Vercel'e connect et  
3. Otomatik deploy
```

### Netlify
```bash
1. Drag & drop out/ klasörü
2. Environment variables ekle
3. Deploy
```

**Bu hostingler Next.js için daha uyumlu ve kolay!**
