-- ═══════════════════════════════════════════════════════
--  NEXUS — Veritabanı Kurulum Dosyası
--  phpMyAdmin veya MySQL CLI ile çalıştırın:
--    mysql -u root -p < setup.sql
-- ═══════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS nexus_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE nexus_db;

-- ─── Kullanıcılar tablosu (kayıt / giriş) ───────────────
CREATE TABLE IF NOT EXISTS users (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(150)  NOT NULL UNIQUE,
    password   VARCHAR(255)  NOT NULL,       -- bcrypt hash
    created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── İletişim formu mesajları ───────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    fname      VARCHAR(80)   NOT NULL,
    lname      VARCHAR(80)   NOT NULL,
    email      VARCHAR(150)  NOT NULL,
    phone      VARCHAR(30)   DEFAULT NULL,
    subject    VARCHAR(100)  NOT NULL,
    message    TEXT          NOT NULL,
    created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── Ürün değerlendirmeleri ─────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    product     VARCHAR(150)  NOT NULL,
    reviewer    VARCHAR(150)  NOT NULL,
    email       VARCHAR(150)  NOT NULL,
    rating      TINYINT       NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title       VARCHAR(150)  NOT NULL,
    comment     TEXT          NOT NULL,
    recommend   ENUM('evet','hayir') NOT NULL,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── Demo kullanıcı (test için) ─────────────────────────
-- Şifre: nexus123
INSERT IGNORE INTO users (name, email, password) VALUES
('Demo Kullanıcı', 'demo@nexus.com',
 '$2y$12$YSfCrqI8dYLjMsPwVrqfseKFuGJUijFqTHscpIPuwMp4Kx7pMSqye');
