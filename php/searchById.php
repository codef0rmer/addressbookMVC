<?php
include "config.php";

$id = $_GET['id'];
$result = mysql_fetch_array(mysql_query("SELECT id, full_name, email, phone, address FROM contacts WHERE id = '{$id}' "), MYSQL_ASSOC);
if (is_array($result)) {
  echo json_encode(array('success' => true, 'contact' => $result));
} else {
  echo json_encode(array('success' => false));
}
