<?php

header('Access-Control-Allow-Origin: *');

$project_title = "fairplayground.info";
$project_postURL = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

$agentid_placeholder = "FCLN.XXXX";

$action = $_POST["action"];

$agent_pubkey = $_POST["publicKey"];

if( $action == "getpublickey" ){

  $filename="../keys/public.pem";
  $fp=fopen($filename,"r");
  $project_pubkey=fread($fp,filesize($filename));
  fclose($fp);

  $project_pubkey=preg_replace("/[\n\r]/","",$project_pubkey);
  $project_pubkey_hashed = openssl_digest ( $project_pubkey , "SHA256", FALSE );

  echo $project_pubkey_hashed;
  exit;

} else if( $action == "join" ){

  if( ! empty ( $agent_pubkey ) ){

    // check if publicKey is valid
    if( !openssl_pkey_get_public ( $agent_pubkey ) ) exit;

    $agent_pubkey=preg_replace("/[\n\r]/","",$agent_pubkey);

    $publicKeyHashed=openssl_digest ( $agent_pubkey , "SHA256", FALSE );

    $filename="./data/agents/".$publicKeyHashed.".encrypted";
    if( file_exists($filename) ){
      // agent already exists -> skip joined
      echo "Agent already joined! <br>Please POST the new data to<br><input type='text' size='100' readonly value='$project_postURL'>";
      exit;
    }

    $filename="./data/join/".$publicKeyHashed.".hash";
    if( file_exists($filename) ){

      // file exists -> skip
      echo "Join request already exists!<br><br>Please POST the data to<br><input type='text' size='100' readonly value='$project_postURL'>";

    } else {

      $fp=fopen( $filename, "w+" );
      fwrite($fp,"");
      fclose($fp);

      echo "Join request successfull created!<br><br>Please POST the data to<br><input type='text' size='100' readonly value='$project_postURL'>";
    }

    exit;
  }

} else if( $action == "post" ){

  $data = $_POST["data"];

  // check if publicKey is valid
  if( !openssl_pkey_get_public ( $agent_pubkey ) ) exit;

  $publicKeyRes = openssl_pkey_get_public($agent_pubkey);

  $agent_pubkey=preg_replace("/[\n\r]/","",$agent_pubkey);

  $publicKeyHashed = openssl_digest ( $agent_pubkey , "SHA256", FALSE );

  $signature = $_POST["signature"];

  $ok = openssl_verify($data, base64_decode( $signature ), $publicKeyRes, OPENSSL_ALGO_SHA256);

  // check if signature is valid
  if( ! $ok ) exit;

  include_once("../keys/cipher.key.php");

  //$key previously generated safely, ie: openssl_random_pseudo_bytes
  $ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
  $iv = openssl_random_pseudo_bytes($ivlen);
  $ciphertext_raw = openssl_encrypt($data, $cipher, $cipher_key, $options=OPENSSL_RAW_DATA, $iv);
  $hmac = hash_hmac('sha256', $ciphertext_raw, $cipher_key, $as_binary=true);
  $ciphertext = base64_encode( $iv.$hmac.$ciphertext_raw );

  //decrypt later....

  /*
  $c = base64_decode($ciphertext);
  $ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
  $iv = substr($c, 0, $ivlen);
  $hmac = substr($c, $ivlen, $sha2len=32);
  $ciphertext_raw = substr($c, $ivlen+$sha2len);
  $data = openssl_decrypt($ciphertext_raw, $cipher, $cipher_key, $options=OPENSSL_RAW_DATA, $iv);
  $calcmac = hash_hmac('sha256', $ciphertext_raw, $cipher_key, $as_binary=true);
  if (hash_equals($hmac, $calcmac))//PHP 5.6+ timing attack safe comparison
  {
      echo $original_plaintext."\n";
  }

  */

  //$encrypted = openssl_encrypt ( $data , "AES-256-CBC" , string $key [, int $options = 0 [, string $iv = "" [, string &$tag = NULL [, string $aad = "" [, int $tag_length = 16 ]]]]] )

  $filename="./data/agents/".$publicKeyHashed.".encrypted";

  $fp=fopen( $filename, "w+" );
  fwrite($fp, $ciphertext);
  fclose($fp);

  $filename="./data/join/".$publicKeyHashed.".hash";
  unlink($filename);


}

?>
<html>
<head>
</head>
<body>
  <form action="" method="POST">
  <table>
    <tr>
      <th colspan="2">Joining Parameter <font color="blue"><?=$project_title; ?></b></th>
    </tr>
    <tr>
      <td>
        Agents - Public Key
      </td>
      <td>
        <textarea name="publicKey" cols="65" rows="10"></textarea>
      </td>
    </tr>
    <tr>
      <td>
      </td>
      <td>
        <input type="hidden" name="action" value="join">
        <button type="submit">JOIN</button>
      </td>
    </tr>
  </table>
  </form>
</body>
</html>
