<?php

namespace App\Policies;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Http\Client\Response;

class OfferPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Offer $offer): Response
    {
        return $offer->is_visible ? Response::allow()
        : Response::denyWithStatus(404);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Offer $offer): bool
    {
        return $user->id === $offer->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Offer $offer): bool
    {
        return $user->id === $offer->user_id;
    }

     /**
     * Create a new policy instance.
     */
    public function createConversation(User $user, Offer $offer): bool
    {
        return $offer->user_id !== $user->id && $offer->is_visible &&
            $offer->conversation()->where('seller_id', $user->id)->orWhere('buyer_id', $user->id)->count() === 0;
    }
}
