<?php
/**
 * NEXUS — Kullanıcı Listele API (Admin)
 * GET /users_api.php
 */
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

try {
    $db    = getDB();
    $total = $db->query('SELECT COUNT(*) FROM users')->fetchColumn();
    $stmt  = $db->query('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC');
    $users = $stmt->fetchAll();
    jsonOut(true, 'OK', ['total' => (int)$total, 'users' => $users]);
} catch (PDOException $e) {
    jsonOut(false, 'Kullanıcılar alınamadı.');
}
?>
