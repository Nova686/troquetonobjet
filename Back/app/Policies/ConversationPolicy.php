<?php

namespace App\Policies;

use App\Models\Conversation;
use App\Models\Offer;
use App\Models\User;

class ConversationPolicy
{
    public function hide(User $user, Conversation $conversation): bool
    {
        return $conversation->buyer_id === $user->id || $conversation->seller_id === $user->id;
    }
}
