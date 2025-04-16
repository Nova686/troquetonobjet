<?php
namespace App\Library\Mail;

interface IMailService
{
    /**
     * Envoyer un mail
     * 
     * @param string $to mail du destinataire
     * @param string $subject sujet du mail
     * @param string $message contenu du mail
     * 
     * @return bool
     */
    public function go(string $to, string $subject, string $message);
}