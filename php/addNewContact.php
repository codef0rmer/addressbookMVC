<?php
include "config.php";

$id = $_GET['id'];
$id = $id === 'undefined' ? '' : $id;
$full_name = $_GET['full_name'];
$email = $_GET['email'];
$phone = $_GET['phone'];
$address = $_GET['address'];
$validate = true;
$validationError = array();

if ($full_name === '') {
    $validate = false;
    $validationError[] = array(
        'target' => 'full_name_error', 
        'error'  => 'Full name is required'
    );
}

if ($email === '') {
    $validate = false;
    $validationError[] = array(
        'target' => 'email_error', 
        'error'  => 'Email Id is required'
    );
}

if ($phone !== '' && !is_numeric($phone)) {
    $validate = false;
    $validationError[] = array(
        'target' => 'phone_error', 
        'error'  => 'Phone number should be in numeric'
    );
}


if ($validate === true) {
	if (empty($id) && mysql_query(
		"INSERT INTO contacts (full_name, email, phone, address) 
		 VALUE('{$full_name}', '{$email}', '{$phone}', '{$address}')"
	)) {
		exit(json_encode(array('success' => true, 'msg' => 'Saved!')));
	} elseif ($id > 0  && mysql_query(
		"UPDATE contacts SET full_name = '{$full_name}', email = '{$email}', phone = '{$phone}', address = '{$address}' 
		 WHERE id = '{$id}'"
	)) {
		exit(json_encode(array('success' => true, 'msg' => 'Saved!')));
	}
}

echo json_encode(array(
    'success' => false, 
    'msg'     => 'Error has occurred while entering the contacts into DB', 
    'validationError' => $validationError
));
