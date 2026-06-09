<?php
/**
 * NEXUS — Ürün Değerlendirme API
 * POST /reviews_api.php  → Değerlendirme kaydet
 * GET  /reviews_api.php  → Değerlendirmeleri listele
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

// ── GET: Değerlendirmeleri listele ───────────────────────────
if ($method === 'GET') {
    try {
        $db      = getDB();
        $product = $_GET['product'] ?? '';
        $page    = max(1, (int)($_GET['page'] ?? 1));
        $limit   = 10;
        $offset  = ($page - 1) * $limit;

        if ($product) {
            $count = $db->prepare('SELECT COUNT(*) FROM reviews WHERE product = ?');
            $count->execute([$product]);
            $total = $count->fetchColumn();

            $stmt = $db->prepare(
                'SELECT id, product, reviewer, rating, title, comment, recommend, created_at
                 FROM reviews WHERE product = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'
            );
            $stmt->execute([$product, $limit, $offset]);
        } else {
            $total = $db->query('SELECT COUNT(*) FROM reviews')->fetchColumn();
            $stmt  = $db->prepare(
                'SELECT id, product, reviewer, rating, title, comment, recommend, created_at
                 FROM reviews ORDER BY created_at DESC LIMIT ? OFFSET ?'
            );
            $stmt->execute([$limit, $offset]);
        }

        $rows = $stmt->fetchAll();
        $avg  = null;
        if ($product && count($rows)) {
            $avgStmt = $db->prepare('SELECT AVG(rating) FROM reviews WHERE product = ?');
            $avgStmt->execute([$product]);
            $avg = round((float)$avgStmt->fetchColumn(), 1);
        }

        jsonOut(true, 'OK', [
            'total'   => (int) $total,
            'average' => $avg,
            'page'    => $page,
            'reviews' => $rows,
        ]);

    } catch (PDOException $e) {
        jsonOut(false, 'Değerlendirmeler alınamadı.');
    }
}

// ── POST: Yeni değerlendirme kaydet ─────────────────────────
if ($method === 'POST') {
    $raw  = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? $_POST;

    $product   = clean($body['product']   ?? '');
    $reviewer  = clean($body['name']      ?? '');
    $email     = clean($body['email']     ?? '');
    $rating    = (int)($body['rating']    ?? 0);
    $title     = clean($body['title']     ?? '');
    $comment   = clean($body['comment']   ?? '');
    $recommend = in_array($body['recommend'] ?? '', ['evet','hayir'])
                 ? $body['recommend'] : '';

    $errors = [];
    if (empty($product))                            $errors[] = 'Ürün seçilmedi.';
    if (strlen($reviewer) < 2)                      $errors[] = 'Ad soyad zorunludur.';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Geçersiz e-posta.';
    if ($rating < 1 || $rating > 5)                 $errors[] = 'Puan 1-5 arasında olmalıdır.';
    if (strlen($title) < 3)                         $errors[] = 'Başlık çok kısa.';
    if (strlen($comment) < 20)                      $errors[] = 'Yorum en az 20 karakter olmalıdır.';
    if (empty($recommend))                          $errors[] = 'Tavsiye seçeneği zorunludur.';

    if (!empty($errors)) {
        jsonOut(false, implode(' ', $errors));
    }

    try {
        $db   = getDB();
        $stmt = $db->prepare(
            'INSERT INTO reviews (product, reviewer, email, rating, title, comment, recommend)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$product, $reviewer, $email, $rating, $title, $comment, $recommend]);

        jsonOut(true, 'Değerlendirmeniz kaydedildi!', [
            'id' => (int) $db->lastInsertId(),
        ]);

    } catch (PDOException $e) {
        jsonOut(false, 'Değerlendirme kaydedilemedi.');
    }
}

// ── DELETE: Değerlendirme sil ────────────────────────────────
if ($method === 'DELETE') {
    $raw  = file_get_contents('php://input');
    $body = json_decode($raw, true) ?? [];

    $id    = (int)($body['id']    ?? 0);
    $email = clean($body['email'] ?? '');

    if ($id < 1 || empty($email)) {
        jsonOut(false, 'Geçersiz istek. ID ve e-posta zorunludur.');
    }

    try {
        $db   = getDB();
        // Sadece kendi e-postasıyla eşleşen kaydı sil (güvenlik)
        $stmt = $db->prepare('DELETE FROM reviews WHERE id = ? AND email = ?');
        $stmt->execute([$id, $email]);

        if ($stmt->rowCount() > 0) {
            jsonOut(true, 'Değerlendirme başarıyla silindi.');
        } else {
            jsonOut(false, 'Değerlendirme bulunamadı veya bu işlem için yetkiniz yok.');
        }

    } catch (PDOException $e) {
        jsonOut(false, 'Silme işlemi sırasında bir hata oluştu.');
    }
}

jsonOut(false, 'Geçersiz istek yöntemi.');
?>
