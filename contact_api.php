<?php
/**
 * NEXUS — İletişim Formu API
 * POST /contact_api.php  → Mesaj kaydet
 * GET  /contact_api.php  → Mesajları listele (admin)
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

// ── GET: Tüm mesajları listele ───────────────────────────────
if ($method === 'GET') {
    try {
        $db   = getDB();
        $page = max(1, (int)($_GET['page'] ?? 1));
        $limit = 20;
        $offset = ($page - 1) * $limit;

        $total = $db->query('SELECT COUNT(*) FROM contact_messages')->fetchColumn();
        $stmt  = $db->prepare(
            'SELECT id, fname, lname, email, subject, LEFT(message,120) AS excerpt, created_at
             FROM contact_messages ORDER BY created_at DESC LIMIT ? OFFSET ?'
        );
        $stmt->execute([$limit, $offset]);
        $rows = $stmt->fetchAll();

        jsonOut(true, 'OK', [
            'total'    => (int) $total,
            'page'     => $page,
            'per_page' => $limit,
            'messages' => $rows,
        ]);

    } catch (PDOException $e) {
        jsonOut(false, 'Mesajlar alınamadı.');
    }
}

// ── POST: Yeni mesaj kaydet ──────────────────────────────────
if ($method === 'POST') {
    $raw  = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    $fname   = clean($body['fname']   ?? '');
    $lname   = clean($body['lname']   ?? '');
    $email   = clean($body['email']   ?? '');
    $phone   = clean($body['phone']   ?? '');
    $subject = clean($body['subject'] ?? '');
    $message = clean($body['message'] ?? '');

    // Doğrulama
    $errors = [];
    if (strlen($fname) < 2)                        $errors[] = 'Ad zorunludur.';
    if (strlen($lname) < 2)                        $errors[] = 'Soyad zorunludur.';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Geçersiz e-posta.';
    if (empty($subject))                            $errors[] = 'Konu seçilmedi.';
    if (strlen($message) < 10)                      $errors[] = 'Mesaj çok kısa.';

    if (!empty($errors)) {
        jsonOut(false, implode(' ', $errors));
    }

    try {
        $db   = getDB();
        $stmt = $db->prepare(
            'INSERT INTO contact_messages (fname, lname, email, phone, subject, message)
             VALUES (?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$fname, $lname, $email, $phone ?: null, $subject, $message]);

        jsonOut(true, 'Mesajınız başarıyla gönderildi!', [
            'id' => (int) $db->lastInsertId(),
        ]);

    } catch (PDOException $e) {
        jsonOut(false, 'Mesaj kaydedilemedi.');
    }
}

jsonOut(false, 'Geçersiz istek yöntemi.');
?>
