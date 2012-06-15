<?php
include "config.php";

$id = $_GET['id'];

if (mysql_query("DELETE FROM contacts WHERE id = '{$id}' ")) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false, 'msg' => 'Error has occurred while removing the contacts from DB'));
}
