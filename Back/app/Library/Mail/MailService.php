<?php

namespace App\Library\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Support\Facades\Mail;

class MailService extends Mailable implements IMailService
{
    private string $message;

    public function go(string $to, string $subject, string $message)
    {
        $this->message = $message;

        $this->subject($subject);

        $mail = Mail::to($to)->send($this);

        return $mail != null;
    }

    public function content(): Content
    {
        return new Content(
            htmlString: $this->message
        );
    }
}