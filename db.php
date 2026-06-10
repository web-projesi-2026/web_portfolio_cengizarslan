<?php
// ─── VERİTABANI BAĞLANTI AYARLARI ───────────────────────────
// Bu değerleri kendi hosting/local ortamınıza göre değiştirin
define('DB_HOST', 'localhost');
define('DB_USER', 'root');       // Veritabanı kullanıcı adı
define('DB_PASS', '');           // Veritabanı şifresi
define('DB_NAME', 'nexus');   // Veritabanı adı

// PDO bağlantısı (güvenli, SQL injection korumalı)
function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(['success' => false, 'message' => 'Veritabanı bağlantı hatası.']));
        }
    }
    return $pdo;
}

// JSON çıktı yardımcısı
function jsonOut(bool $success, string $message, array $data = []): void {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array_merge(['success' => $success, 'message' => $message], $data));
    exit;
}

// XSS temizleme
function clean(string $val): string {
    return htmlspecialchars(trim($val), ENT_QUOTES, 'UTF-8');
}
?>
