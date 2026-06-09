# NEXUS — Premium Phone Store

Türkiye'nin önde gelen premium telefon mağazası için geliştirilmiş modern, tam işlevsel bir e-ticaret web sitesi.

---

## 🚀 Özellikler

- **Ürün Listeleme** — `products.json` dosyasından dinamik olarak yüklenen ürün kartları
- **Arama Kutusu** — Anlık ürün arama (isim bazlı filtreleme)
- **Kategori Filtresi** — Apple, Samsung, Xiaomi, Google markalarına göre filtreleme
- **Fiyat & İsim Sıralama** — Açılır menü ile sıralama seçeneği
- **Kullanıcı Kayıt / Giriş** — PHP + MySQL destekli kimlik doğrulama sistemi
- **İletişim Formu** — 3 adımlı çok adımlı form, veritabanına kaydedilir
- **Ürün Değerlendirme** — Yıldızlı puanlama + yorum sistemi, kayıt & listeleme & silme
- **Dark Mode** — Karanlık / aydınlık tema geçişi
- **Responsive Tasarım** — Tüm cihaz boyutlarına uyumlu
- **Custom Cursor** — Masaüstünde özel animasyonlu imleç

---

## 🛠 Kullanılan Teknolojiler

| Katman      | Teknoloji                        |
|-------------|----------------------------------|
| Arayüz      | HTML5, CSS3, Vanilla JavaScript  |
| Fontlar     | Google Fonts (Syne, DM Sans)     |
| Backend     | PHP 8+                           |
| Veritabanı  | MySQL 5.7+ / MariaDB             |
| Veri        | JSON (products.json)             |

---

## 📁 Dosya Yapısı

```
nexus/
├── index.html          # Ana sayfa
├── products.html       # Ürünler sayfası
├── about.html          # Hakkımızda sayfası
├── contact.html        # İletişim sayfası
├── auth.html           # Giriş / Kayıt sayfası
├── style.css           # Tüm sayfalara ait stil dosyası
├── script.js           # Tüm JavaScript etkileşimleri
├── favicon.svg         # Site ikonu
├── products.json       # Ürün verileri
├── db.php              # Veritabanı bağlantı ayarları
├── login.php           # Kullanıcı giriş API
├── register.php        # Kullanıcı kayıt API
├── reviews_api.php     # Ürün değerlendirme API (GET/POST/DELETE)
├── contact_api.php     # İletişim formu API (GET/POST)
├── setup.sql           # Veritabanı kurulum dosyası
└── README.md           # Bu dosya
```

---

## ⚙️ Kurulum

### 1. Veritabanı Kurulumu

MySQL'e bağlanıp kurulum dosyasını çalıştırın:

```bash
mysql -u root -p < setup.sql
```

Bu işlem `nexus_db` veritabanını ve gerekli tabloları (`users`, `contact_messages`, `reviews`) oluşturur.

Test kullanıcısı otomatik eklenir:
- **E-posta:** `demo@nexus.com`
- **Şifre:** `nexus123`

### 2. Veritabanı Bağlantısını Yapılandır

`db.php` dosyasını kendi ortamınıza göre düzenleyin:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');       // Kullanıcı adınız
define('DB_PASS', '');           // Şifreniz
define('DB_NAME', 'nexus_db');
```

### 3. Sunucuya Yükle

Projeyi bir PHP destekli sunucuya (XAMPP, WAMP, LAMP veya hosting) yükleyin. Tüm dosyaları aynı dizine koyun ve tarayıcıda `index.html`'i açın.

---

## 🗄 Veritabanı İşlemleri

| İşlem      | Dosya              | Açıklama                                |
|------------|--------------------|-----------------------------------------|
| INSERT     | `register.php`     | Yeni kullanıcı kaydı                    |
| SELECT     | `login.php`        | Kullanıcı girişi doğrulama              |
| INSERT     | `contact_api.php`  | İletişim mesajı kaydetme                |
| SELECT     | `contact_api.php`  | İletişim mesajlarını listeleme          |
| INSERT     | `reviews_api.php`  | Ürün değerlendirmesi ekleme             |
| SELECT     | `reviews_api.php`  | Değerlendirmeleri listeleme + ortalama  |
| DELETE     | `reviews_api.php`  | Değerlendirme silme (e-posta doğrulama) |

---

## 📝 API Kullanımı

### Ürün Değerlendirme

```
GET  /reviews_api.php?product=iPhone+15+Pro    → Değerlendirmeleri listele
POST /reviews_api.php                          → Yeni değerlendirme ekle
DELETE /reviews_api.php                        → Değerlendirme sil (body: {id, email})
```

### İletişim Formu

```
POST /contact_api.php    → Mesaj gönder
GET  /contact_api.php    → Tüm mesajları listele (admin)
```

---

## 👤 Geliştirici

NEXUS projesi, web geliştirme dersi dönem ödevi kapsamında geliştirilmiştir.

---

## 📄 Lisans

Bu proje eğitim amaçlıdır.
