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
}
