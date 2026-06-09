<?php
/**
 * NEXUS — Kullanıcı Giriş API
 * POST /login.php
 * Body: { email, password }
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=utf-8');

session_start();
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonOut(false, 'Sadece POST isteği kabul edilir.');
}

$raw   = file_get_contents('php://input');
$body  = json_decode($raw, true) ?? $_POST;

$email    = clean($body['email']    ?? '');
$password = $body['password']       ?? '';

// ── Doğrulama ────────────────────────────────────────────────
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonOut(false, 'Geçersiz e-posta adresi.');
}
if (empty($password)) {
    jsonOut(false, 'Şifre boş olamaz.');
}

// ── Veritabanı sorgusu ───────────────────────────────────────
try {
    $db   = getDB();
    $stmt = $db->prepare('SELECT id, name, email, password FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        jsonOut(false, 'E-posta veya şifre hatalı.');
    }

    // Oturum başlat
    session_regenerate_id(true);
    $_SESSION['user_id']    = $user['id'];
    $_SESSION['user_name']  = $user['name'];
    $_SESSION['user_email'] = $user['email'];

    jsonOut(true, 'Giriş başarılı!', [
        'user' => [
            'id'    => $user['id'],
            'name'  => $user['name'],
            'email' => $user['email'],
        ],
    ]);

} catch (PDOException $e) {
    jsonOut(false, 'Giriş sırasında bir hata oluştu.');
}
?>
