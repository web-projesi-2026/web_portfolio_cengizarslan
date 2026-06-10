# 📱 NEXUS — Premium Akıllı Telefon Mağazası

<div align="center">

![NEXUS](https://img.shields.io/badge/NEXUS-Premium%20Phone%20Store-00d4ff?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

**Türkiye'nin en güvenilen premium akıllı telefon mağazası.**
Modern, responsive ve dinamik bir e-ticaret web sitesi.

</div>

---

## 🖥️ Proje Hakkında

NEXUS, 2013 yılında İstanbul'da küçük bir mağaza olarak başlayan ve bugün 250.000'den fazla mutlu müşteriye sahip olan premium telefon mağazasının web sitesidir. Bu proje; HTML5, CSS3, JavaScript, PHP ve MySQL teknolojileri kullanılarak geliştirilmiş tam kapsamlı bir e-ticaret web uygulamasıdır.

---

## ✨ Özellikler

### 🔍 Kullanıcı Deneyimi
| Özellik | Açıklama |
|---------|----------|
| **Arama Kutusu** | Ürün adı, marka ve özelliğe göre anlık arama |
| **Kategori Filtreleme** | Apple, Samsung, Xiaomi, Google marka filtreleri |
| **Fiyat / İsim Sıralama** | Artan/azalan fiyat ve alfabetik sıralama |
| **Dark / Light Mod** | Kullanıcı tercihi kaydedilir |
| **Responsive Tasarım** | Mobil, tablet ve masaüstü uyumlu |

### 🌐 API ve Dinamik Veri
| Özellik | Açıklama |
|---------|----------|
| **Canlı Döviz Kurları** | ExchangeRate-API ile USD, EUR, GBP, CHF → TRY kurları |
| **JSON Ürün Listeleme** | products.json dosyasından dinamik kart oluşturma |

### 🗄️ Veritabanı İşlemleri
| İşlem | Dosya |
|-------|-------|
| **Kullanıcı Kayıt** | register.php — bcrypt ile şifre hashleme |
| **Kullanıcı Giriş** | login.php — PHP session yönetimi |
| **Veri Ekleme** | contact_api.php — iletişim mesajları MySQL'e kaydedilir |
| **Veri Listeleme** | admin.html — mesajlar, kullanıcılar, yorumlar listelenir |
| **Veri Silme** | delete_api.php — admin panelinden kayıt silme |

---

## 🛠️ Kullanılan Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | PHP 8.0+ |
| **Veritabanı** | MySQL 8.0 / MariaDB |
| **Fontlar** | Google Fonts — Syne, DM Sans |
| **API** | ExchangeRate-API (Döviz Kurları) |
| **Sunucu** | Apache (XAMPP) |

---

## 📁 Dosya Yapısı

```
nexus/
├── index.html           # Ana sayfa (hero, ürünler, canlı döviz kurları)
├── products.html        # Ürün listesi (arama + filtre + sıralama)
├── about.html           # Hakkımızda (ekip, tarihçe, değerler)
├── contact.html         # İletişim formu (3 adımlı, DB'ye kaydeder)
├── auth.html            # Giriş / Kayıt sayfası
├── admin.html           # Admin paneli (listeleme + silme)
├── style.css            # Tüm stiller, animasyonlar, dark/light mod
├── script.js            # Frontend JavaScript
├── favicon.svg          # Site ikonu
├── products.json        # Ürün verileri (9 ürün)
├── db.php               # Veritabanı PDO bağlantısı
├── register.php         # Kullanıcı kayıt API
├── login.php            # Kullanıcı giriş API
├── contact_api.php      # İletişim mesajları API
├── reviews_api.php      # Ürün değerlendirme API
├── users_api.php        # Kullanıcı listesi API
├── delete_api.php       # Kayıt silme API
├── setup.sql            # Veritabanı kurulum dosyası
└── README.md
```

---

## ⚙️ Kurulum

### Gereksinimler
- XAMPP (Apache + MySQL + PHP 8.0+)
- Modern bir web tarayıcı

### Adım 1 — Proje Dosyaları
Tüm dosyaları şu klasöre kopyalayın:
```
C:/xampp/htdocs/nexus/
```

### Adım 2 — Veritabanı Kurulumu
1. XAMPP'ı başlatın (Apache + MySQL)
2. `http://localhost/phpmyadmin` açın
3. **İçe Aktar** sekmesinden `setup.sql` dosyasını çalıştırın

### Adım 3 — Bağlantı Ayarları
`db.php` dosyasını düzenleyin:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');       // XAMPP varsayılan: boş
define('DB_NAME', 'nexus');
```

### Adım 4 — Siteyi Açın
```
http://localhost/nexus/
```

---

## 🧪 Test Kullanıcısı

| Alan | Değer |
|------|-------|
| **E-posta** | demo@nexus.com |
| **Şifre** | nexus123 |

---

## 📸 Sayfalar

| Sayfa | Açıklama |
|-------|----------|
| `index.html` | Ana sayfa, hero, öne çıkan ürünler, döviz kurları |
| `products.html` | Tüm ürünler, arama, filtre, sıralama |
| `about.html` | Ekip, değerler, tarihçe |
| `contact.html` | 3 adımlı iletişim formu |
| `auth.html` | Kullanıcı girişi ve kaydı |
| `admin.html` | Mesajlar, kullanıcılar, yorumlar — listeleme ve silme |

---

## 👨‍💻 Geliştirici

**Cengiz Arslan**
Web Programlama Final Projesi — 2025

---

<div align="center">
© 2025 NEXUS. Tüm hakları saklıdır.
</div>
