<?php
require ''; // chemin vers PHPMailer

use PHPMailer\PHPMailer\PHPMailer; // pour envoyer les emails
use PHPMailer\PHPMailer\Exception; // pour gérer les erreurs
use Dotenv\Dotenv; // Variables d'environnement

// Chargement des variables d'environnement (a adapter plus tard selon l'emplacement du fichier .env)
$dotenv = Dotenv::createImmutable(__DIR__); 
$dotenv->load();


$mail = new PHPMailer(true); 


// verif requète POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // récupération et validation des données
        $nom = htmlspecialchars(trim($_POST['nom']));
        $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
        $message = htmlspecialchars(trim($_POST['message']));

        if (!$nom ||!$email || !$message ) {
            throw new Exception("Tous les champs sont requis pour l'envoi du message.");
        }
        
        // Config SMTP
        $mail->isSMTP();
        $mail->Host = ''; 
        $mail->SMTPAuth = true;
        $mail->Username = '';
        $mail->Password = '';
        $mail->SMTPSecure = '';
        $mail->Port = '';

        // Expéditeur et destinataire
        $mail->setFrom(); // Expéditeur 
        $mail->addAddress();  // Destinataire
        $mail->addReplyTo($email, $nom); // visiteur (pour répondre)

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = "Nouveau message de $nom - $email";
        $mail->Body = "<b>Nom :</b> $nom <br> <b>Email :</b> $email <br> <b>Message :</b> $message"; // version HTML
        $mail->AltBody = "Nom: $nom\nEmail: $email\nMessage: $message"; // version texte

        $mail->send(); // envoi
        echo "Message envoyé avec succès !";
    } 
    catch (Exception $e) {
        echo "Erreur lors de l'envoi : {$mail->ErrorInfo}"; 
    }
}
