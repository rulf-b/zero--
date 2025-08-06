# 🎯 HIZLI YÜKLEME - CPANEL'E 5 ADIMDA DEPLOY

## 📦 1. Dosyaları Hazırla

### Şu anda hazır olan dosyalar:
```
📁 c:\Users\ibrahim\Downloads\zero-eae72a8e595cf4ee28ae298362c63cedd3622d56\
├── 📁 app/          # Ana Next.js uygulaması  
├── 📁 components/   # React bileşenleri
├── 📁 data/         # JSON verileri
├── 📁 public/       # Statik dosyalar (resimler vs)
├── 📄 .htaccess     # Apache ayar dosyası
└── 📄 package.json  # Proje ayarları
```

---

## 🌐 2. cPanel'e Giriş Yap

1. **Browser'da şu adresi aç:**
   ```
   https://yourdomain.com:2083
   veya  
   https://yourdomain.com/cpanel
   ```

2. **Giriş bilgilerini gir:**
   - Kullanıcı adı: (hosting sağlayıcısından)
   - Şifre: (hosting şifresi)

---

## 📁 3. Dosyaları Yükle

### File Manager ile:

#### 🗂️ Adım 1: Eski Siteyi Temizle
1. cPanel'de **"File Manager"** tıkla
2. **"public_html"** klasörüne git
3. İçindeki **TÜM dosyaları seç** (Ctrl+A)
4. **"Delete"** tıkla → Onayla

#### ⬆️ Adım 2: Yeni Siteyi Yükle
1. **"Upload"** butonuna tıkla
2. Bu klasörü ZIP'le ve yükle:
   ```
   📁 c:\Users\ibrahim\Downloads\zero-eae72a8e595cf4ee28ae298362c63cedd3622d56\
   ```
3. Yüklenen ZIP'i **extract** (çıkar) et

#### 🔧 Adım 3: Klasör Düzeni
Upload sonrası `public_html` içi şöyle olmalı:
```
public_html/
├── app/
├── components/  
├── data/
├── public/
├── .htaccess
├── package.json
└── diğer dosyalar...
```

---

## ⚙️ 4. Node.js Ayarları (ZORUNLU - Admin Panel İçin)

### 🔍 Node.js Desteği Kontrol Et:
cPanel'de **"Node.js"** arıyoruz:

#### ✅ MUTLAKA Node.js App Oluştur:
1. **"Node.js App"** → **"Create Application"**
2. **Ayarlar:**
   ```
   Node.js Version: 18+ (en güncel)
   Application Mode: Production  
   Application Root: public_html
   Application URL: / (root domain)
   Application Startup File: server.js
   ```
3. **Environment Variables (ÇOK ÖNEMLİ):**
   ```
   NODE_ENV = production
   JWT_SECRET = tv-repair-cpanel-hosting-jwt-secret-2025-production-key-shared-hosting-admin-panel-secure
   ```
4. **"Create"** tıkla
5. **"Restart"** tıkla

#### ❌ Node.js Yoksa:
- Hosting sağlayıcınızdan **Node.js desteği** isteyin
- Alternatif hosting kullanın (Vercel öneriyoruz)

---

## 🧪 5. Test Et

### 🌐 Site Kontrol:
1. **Browser'da git:** `https://yourdomain.com`
2. **Ana sayfa** açılmalı
3. **Menüler** çalışmalı

### 🔐 Admin Panel Kontrol:
```
🔗 Admin1: https://yourdomain.com/admin
   Kullanıcı: 1
   Şifre: 1

🔗 Admin2: https://yourdomain.com/admin2  
   Kullanıcı: 2
   Şifre: 2
```

---

## 🚨 Sorun mu Var?

### ❌ Site açılmıyor:
- `.htaccess` dosyası kontrol et
- **Error Logs** bak (cPanel'de)

### ❌ Admin panel çalışmıyor:
- **Normal!** API routes static hosting'de çalışmaz
- **Çözüm:** Vercel kullan (ücretsiz, kolay)

### ❌ Resimler gözükmüyor:
- `public/` klasörü doğru yerde mi kontrol et

---

## 🚀 Alternatif: Vercel (Önerilen)

cPanel karmaşık geliyorsa:

1. **GitHub'a push et** projeyi
2. **Vercel.com**'a git
3. **"Import Project"** → GitHub'dan seç
4. **Otomatik deploy** olur
5. **Environment variables** ekle
6. **Admin paneli çalışır!**

---

## 📞 Yardım

Sorun yaşarsan:
1. **Hosting desteği** ara
2. **"Next.js deployment"** de
3. **Bu dosyayı** göster

**Başarılar! 🎉**
