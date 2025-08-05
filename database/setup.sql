-- TV Repair Veritabanı Kurulum Scripti
-- Bu dosyayı phpMyAdmin'de veya MySQL komut satırında çalıştırın

-- Veritabanını oluştur (eğer yoksa)
CREATE DATABASE IF NOT EXISTS tvrepair CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Veritabanını kullan
USE tvrepair;

-- Müşteri başvuruları tablosu
CREATE TABLE IF NOT EXISTS quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    tv_brand VARCHAR(50),
    tv_model VARCHAR(100),
    screen_size VARCHAR(10),
    issue_type VARCHAR(100),
    issue_description TEXT,
    location VARCHAR(100),
    preferred_date DATE,
    preferred_time VARCHAR(20),
    estimated_price DECIMAL(10,2),
    read_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at),
    INDEX idx_read_status (read_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Fiyatlar tablosu
CREATE TABLE IF NOT EXISTS prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    screen_size VARCHAR(10) NOT NULL,
    issue_type VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    price_range VARCHAR(50), -- Fiyat aralığı için (örn: "₺500 - ₺1000")
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_price (brand, screen_size, issue_type),
    INDEX idx_brand (brand),
    INDEX idx_screen_size (screen_size)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Markalar tablosu
CREATE TABLE IF NOT EXISTS brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    logo_url VARCHAR(255),
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin kullanıcıları tablosu
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    full_name VARCHAR(100),
    role ENUM('admin', 'moderator') DEFAULT 'admin',
    active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Örnek admin kullanıcısı ekle (şifre: admin123)
-- Bu şifreyi bcrypt ile hashlenmiş hali
INSERT INTO admins (username, password_hash, email, full_name, role) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@tvrepair.com', 'Admin User', 'admin')
ON DUPLICATE KEY UPDATE id=id;

-- Örnek markalar ekle
INSERT INTO brands (name, description) VALUES 
('Samsung', 'Samsung TV modelleri için ekran değişimi ve tamir hizmetleri'),
('LG', 'LG TV modelleri için ekran değişimi ve tamir hizmetleri'),
('Sony', 'Sony TV modelleri için ekran değişimi ve tamir hizmetleri'),
('Philips', 'Philips TV modelleri için ekran değişimi ve tamir hizmetleri'),
('Vestel', 'Vestel TV modelleri için ekran değişimi ve tamir hizmetleri'),
('TCL', 'TCL TV modelleri için ekran değişimi ve tamir hizmetleri'),
('Hisense', 'Hisense TV modelleri için ekran değişimi ve tamir hizmetleri'),
('Panasonic', 'Panasonic TV modelleri için ekran değişimi ve tamir hizmetleri')
ON DUPLICATE KEY UPDATE id=id;

-- Örnek fiyatlar ekle
INSERT INTO prices (brand, screen_size, issue_type, price, price_range) VALUES 
-- Samsung fiyatları
('Samsung', '32"', 'Kırık Ekran', 970, '₺970 ~ ₺1.450'),
('Samsung', '32"', 'Siyah Ekran', 1500, '₺1.500'),
('Samsung', '32"', 'Arka Aydınlatma Sorunları', 800, '₺800'),
('Samsung', '32"', 'Ölü Piksel', 1500, '₺1.500'),
('Samsung', '32"', 'Renk Sorunları', 1500, '₺1.500'),
('Samsung', '32"', 'Güç Yok', 600, '₺600'),
('Samsung', '32"', 'Diğer', 1000, '₺1.000'),

('Samsung', '55"', 'Kırık Ekran', 3000, '₺3.000'),
('Samsung', '55"', 'Siyah Ekran', 3000, '₺3.000'),
('Samsung', '55"', 'Arka Aydınlatma Sorunları', 1500, '₺1.500'),
('Samsung', '55"', 'Ölü Piksel', 3000, '₺3.000'),
('Samsung', '55"', 'Renk Sorunları', 3000, '₺3.000'),
('Samsung', '55"', 'Güç Yok', 1000, '₺1.000'),
('Samsung', '55"', 'Diğer', 2200, '₺2.200'),

-- LG fiyatları
('LG', '55"', 'Kırık Ekran', 3100, '₺3.100'),
('LG', '55"', 'Siyah Ekran', 3100, '₺3.100'),
('LG', '55"', 'Arka Aydınlatma Sorunları', 1550, '₺1.550'),
('LG', '55"', 'Ölü Piksel', 3100, '₺3.100'),
('LG', '55"', 'Renk Sorunları', 3100, '₺3.100'),
('LG', '55"', 'Güç Yok', 1050, '₺1.050'),
('LG', '55"', 'Diğer', 2300, '₺2.300'),

-- Sony fiyatları
('Sony', '55"', 'Kırık Ekran', 3200, '₺3.200'),
('Sony', '55"', 'Siyah Ekran', 3200, '₺3.200'),
('Sony', '55"', 'Arka Aydınlatma Sorunları', 1600, '₺1.600'),
('Sony', '55"', 'Ölü Piksel', 3200, '₺3.200'),
('Sony', '55"', 'Renk Sorunları', 3200, '₺3.200'),
('Sony', '55"', 'Güç Yok', 1100, '₺1.100'),
('Sony', '55"', 'Diğer', 2400, '₺2.400')
ON DUPLICATE KEY UPDATE price=VALUES(price), price_range=VALUES(price_range);

-- Tabloları kontrol et
SHOW TABLES;
SELECT 'Veritabanı kurulumu tamamlandı!' as message; 