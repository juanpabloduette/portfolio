<?php

require 'phpmailer/PHPMailerAutoload.php';
$nombre = $_POST['nombrep'];
$email = $_POST['correop'];

$mail = new PHPMailer;

// $mail->SMTPDebug = 3;                       // Activar o desactivar el modo debug
$mail->isSMTP();                              // Indicar al mailer que use SMTP
$mail->Host = 'dtc030.ferozo.com';           // Acá va el host SMTP dtc030.ferozo.com
$mail->SMTPAuth = true;                       // Activar la autenticación SMTP
$mail->Username = 'info@juanpabloduette.com.ar';    // La cuenta de correos que vas a utilizar. Tiene que estar creada previamente en el cPanel
$mail->Password = 'Password';             // La clave de de esa cuenta de correos
$mail->SMTPSecure = 'ssl';                    // Activar el cifrado TLS, "ssl" también es aceptado
$mail->Port = 465;
$mail->CharSet = "utf-8";
$mail->SMTPOptions = array(
  'ssl' => array(
    'verify_peer' => false,
    'verify_peer_name' => false,
    'allow_self_signed' => true
  )
);   // El puerto de conexión SMTP


//$mail->From = $email; // Email desde donde envío el correo.
//$mail->FromName = $nombre;
$mail->setFrom($email, $nombre);            // El correo desde cual sale el correo y el "nombre" 
$mail->addAddress('info@juanpabloduette.com.ar', 'JP');  // Añadir el recipiente
// $mail->addReplyTo('info@juanpabloduette.com.ar', 'Informacion');            // Indicar una cuenta para responder (opcional)
// $mail->addCC('cc@ejemplo.com');                                  // Indicar una cuenta de copia (opcional)
// $mail->addBCC('bcc@ejemplo.com');                                // Indicar una cuenta de copia adicional (ocional)

$mail->isHTML(true);                                             // Indicar que esté activo HTML
$mail->Subject = 'Contacto desde sitio web';
$mail->Body    = '<b>Nombre:</b> ' . $nombrepri . ' <br>
                  <b>Email:</b> ' . $emailpri . '';
$mail->AltBody = 'Contacto desde sitio web';

if (!$mail->send()) {
  echo '<link href="/css/css.css" type="text/css" rel="stylesheet">';
  echo '<b>El mensaje no pudo ser enviado.</b> Redireccionando al sitio web ...';
  echo 'Error del Mailer: ' . $mail->ErrorInfo;
  // header("Location: index.html");
  echo '<script>
    setTimeout(function(){ 
    window.location="index.html"
    }, 3000);
  </script>';
} else {
  echo '<link href="/css/css.css" type="text/css" rel="stylesheet">';
  echo "<div class='msgphp'><div class='msgphpbox'><b>El mensaje se envió correctamente, te contestaremos a la brevedad.</b><br><br>Redireccionando al sitio web ...</div></div>
             
        ";
  echo '<script>
            setTimeout(function(){ 
            window.location="index.html"
            }, 1500);
          </script>';
}
