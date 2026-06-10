# 📱 NEXUS — Premium Akıllı Telefon Mağazası

> Türkiye'nin en güvenilen premium telefon mağazası. Modern, responsive ve dinamik bir e-ticaret web sitesi.

---

## 🚀 Özellikler

### Kullanıcı Deneyimi
- 🔍 **Ürün arama kutusu** — Anlık arama (isim, marka, özellik)
- 🏷️ **Kategori filtreleme** — Apple, Samsung, Xiaomi, Google
- 📊 **Sıralama** — Fiyata göre artan/azalan, isme göre
- 🌙 **Dark / Light mod** — Kullanıcı tercihi kaydedilir
- 📱 **Responsive tasarım** — Mobil, tablet, masaüstü

### Dinamik Veri & API
- 💱 **Canlı döviz kurları** — Frankfurter API (USD, EUR, GBP, CHF → TRY)
- 📦 **JSON'dan ürün listeleme** — `products.json` dosyasından dinamik kart oluşturma

### Veritabanı İşlemleri (PHP + MySQL)
- 👤 **Kullanıcı kayıt** — Şifre bcrypt ile hashlenir
- 🔐 **Kullanıcı girişi** — Session yönetimi
- 📩 **İletişim formu kayıt** — Mesajlar DB'ye yazılır
- 📋 **Veri listeleme** — Admin panelinde görüntüleme
- 🗑️ **Veri silme** — Admin panelinden kayıt silme

### Diğer
- Özel cursor animasyonu
- Scroll reveal animasyonları
- Ürün modal / detay görünümü
- Favoriler & Sepet paneli
- Sayfa geçiş animasyonları

---

## 🛠️ Kullanılan Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | PHP 8+ |
| Veritabanı | MySQL 8 / MariaDB |
| Fontlar | Google Fonts (Syne, DM Sans) |
| API | [Frankfurter API](https://www.frankfurter.app/) |

---

## 📁 Dosya Yapısı

```
nexus/
├── index.html          # Ana sayfa (döviz widget dahil)
├── products.html       # Ürün listesi (arama + filtre + sıralama)
├── about.html          # Hakkımızda
├── contact.html        # İletişim formu
├── auth.html           # Giriş / Kayıt sayfası
├── admin.html          # Admin paneli
├── style.css           # Tüm stiller
├── script.js           # Frontend JavaScript
├── favicon.svg         # Site ikonu
├── products.json       # Ürün verileri
│
├── db.php              # Veritabanı bağlantısı
├── register.php        # Kullanıcı kayıt API
├── login.php           # Kullanıcı giriş API
├── contact_api.php     # İletişim mesajları API
├── reviews_api.php     # Ürün değerlendirme API
├── users_api.php       # Kullanıcı listesi API (admin)
├── delete_api.php      # Kayıt silme API (admin)
├── setup.sql           # Veritabanı kurulum dosyası
└── README.md
```

---

## ⚙️ Kurulum

### 1. Gereksinimler
- PHP 8.0+
- MySQL 8.0+ veya MariaDB
- Web sunucusu (Apache / Nginx) veya XAMPP / WAMP (local)

### 2. Veritabanı Kurulumu
```bash
# MySQL'e giriş yap
mysql -u root -p

# SQL dosyasını çalıştır
source setup.sql
```
veya phpMyAdmin üzerinden `setup.sql` dosyasını import edin.

### 3. Bağlantı Ayarları
`db.php` dosyasındaki sabitleri kendi ortamınıza göre düzenleyin:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');       // Kullanıcı adınız
define('DB_PASS', '');           // Şifreniz
define('DB_NAME', 'nexus_db');
```

### 4. Çalıştırma
```bash
# XAMPP kullanıyorsanız dosyaları buraya kopyalayın:
C:/xampp/htdocs/nexus/

# Tarayıcıda açın:
http://localhost/nexus/
```

### 5. Test Kullanıcısı
`setup.sql` ile otomatik oluşturulan demo hesap:
- **E-posta:** `demo@nexus.com`
- **Şifre:** `nexus123`

---

## 📸 Sayfalar

| Sayfa | Açıklama |
|-------|----------|
| `index.html` | Ana sayfa, hero, öne çıkan ürünler, döviz kurları |
| `products.html` | Tüm ürünler, arama, filtre, sıralama |
| `about.html` | Hakkımızda, ekip, tarihçe |
| `contact.html` | İletişim formu (DB'ye kaydeder) |
| `auth.html` | Giriş / Kayıt |
| `admin.html` | Admin paneli — mesajlar, kullanıcılar, yorumlar |

---

## 👨‍💻 Geliştirici

**NEXUS Web Projesi** — Web Programlama Final Ödevi  
© 2025 NEXUS. Tüm hakları saklıdır.
