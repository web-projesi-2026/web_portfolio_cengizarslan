<?php
/**
 * NEXUS — Kullanıcı Kayıt API
 * POST /register.php
 * Body: { name, email, password, password_confirm }
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=utf-8');

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonOut(false, 'Sadece POST isteği kabul edilir.');
}

// Gelen veriyi al (form veya JSON)
$raw   = file_get_contents('php://input');
$body  = json_decode($raw, true) ?? $_POST;

$name     = clean($body['name']     ?? '');
$email    = clean($body['email']    ?? '');
$password = $body['password']       ?? '';
$confirm  = $body['password_confirm'] ?? '';

// ── Doğrulama ────────────────────────────────────────────────
$errors = [];

if (strlen($name) < 2)          $errors[] = 'Ad en az 2 karakter olmalıdır.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Geçersiz e-posta adresi.';
if (strlen($password) < 6)      $errors[] = 'Şifre en az 6 karakter olmalıdır.';
if ($password !== $confirm)      $errors[] = 'Şifreler eşleşmiyor.';

if (!empty($errors)) {
    jsonOut(false, implode(' ', $errors));
}

// ── Veritabanı işlemi ────────────────────────────────────────
try {
    $db = getDB();

    // E-posta daha önce kayıtlı mı?
    $check = $db->prepare('SELECT id FROM users WHERE email = ?');
    $check->execute([$email]);
    if ($check->fetch()) {
        jsonOut(false, 'Bu e-posta adresi zaten kayıtlı.');
    }

    // Şifreyi hashle ve kaydet
    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
    $stmt = $db->prepare(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    );
    $stmt->execute([$name, $email, $hash]);

    jsonOut(true, 'Kayıt başarılı! Giriş yapabilirsiniz.', [
        'user_id' => (int) $db->lastInsertId(),
    ]);

} catch (PDOException $e) {
    jsonOut(false, 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
}
?>
