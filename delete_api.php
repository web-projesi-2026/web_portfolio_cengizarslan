<?php
/**
 * NEXUS — Kayıt Sil API (Admin)
 * POST /delete_api.php
 * Body: { table: "contact_messages"|"reviews", id: int }
 */
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') jsonOut(false, 'POST gerekli.');

$raw  = file_get_contents('php://input');
$body = json_decode($raw, true) ?? [];

$allowed = ['contact_messages', 'reviews']; // sadece bu tablolardan silme izni
$table   = $body['table'] ?? '';
$id      = (int)($body['id'] ?? 0);

if (!in_array($table, $allowed, true)) jsonOut(false, 'Geçersiz tablo.');
if ($id < 1) jsonOut(false, 'Geçersiz ID.');

try {
    $db   = getDB();
    $stmt = $db->prepare("DELETE FROM `$table` WHERE id = ?");
    $stmt->execute([$id]);
    if ($stmt->rowCount() > 0) {
        jsonOut(true, 'Kayıt silindi.');
    } else {
        jsonOut(false, 'Kayıt bulunamadı.');
    }
} catch (PDOException $e) {
    jsonOut(false, 'Silme işlemi başarısız.');
}
?>
