<?php

$keyfile="../keys/key.pem";
$passphrase = $_GET["passphrase"];

// no passphrase -> return false
if( Empty( $passphrase ) ){
  echo "0";
  exit;
}

// passphrase -> check if keyfile file_exists first

if( file_exists($keyfile) ){
  // key file exists -> don't create new key
  echo "0";
  exit;
}

$config = array(
    "digest_alg" => "sha512",
    "private_key_bits" => 1024,
    "private_key_type" => OPENSSL_KEYTYPE_RSA,
    "encrypt_key" => $passphrase,
    "encrypt_key_cipher" => OPENSSL_CIPHER_AES_256_CBC
);

// Create the private and public key
$res = openssl_pkey_new($config);

// Extract the private key from $res to $privKey
//openssl_pkey_export($res, $privKey);

openssl_pkey_export_to_file ( $res , $keyfile );

echo "1";

// Extract the public key from $res to $pubKey
//$pubKey = openssl_pkey_get_details($res);
//$pubKey = $pubKey["key"];


//$data = 'plaintext data goes here';

// Encrypt the data to $encrypted using the public key
//openssl_public_encrypt($data, $encrypted, $pubKey);

// Decrypt the data using the private key and store the results in $decrypted
//openssl_private_decrypt($encrypted, $decrypted, $privKey);

//echo $decrypted;


?>
