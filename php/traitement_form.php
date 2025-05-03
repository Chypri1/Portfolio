<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST["nom"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $destinataire = "cyprienpennachi@gmail.com";
    $sujet = "Nouveau message de $nom";
    $corpsMessage = "De : $nom\n\nEmail : $email\n\nMessage :\n$message";

    // Envoi de l'e-mail
    mail($destinataire, $sujet, $corpsMessage, "From: $email");

    // Redirection après l'envoi du formulaire
    header("Location: confirmation.html");
    exit();
}
?>
