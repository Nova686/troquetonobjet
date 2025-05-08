<?php

namespace App\Http\Controllers;

use App\Http\Resources\Offers\UserOfferResource;
use App\Library\Results;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FavoriteOfferController extends Controller
{
    public function favorite(Offer $offer)
    {
        $this->authorize('view', $offer);

        /**
         * @var User
         */
        $user = Auth::user();
        if ($user->favoriteOffers()->where('offer_id', $offer->id)->exists()) {
            $user->favoriteOffers()->detach($offer->id);
        } else {
            $user->favoriteOffers()->attach($offer->id);
        }

        return Results::noContent();
    }

    public function get()
    {
        /**
         * @var User
         */
        $user = Auth::user();
        $offers = $user->favoriteOffers()
            ->with(['offerImages', 'user'])
            ->isVisible()->get();

        return Results::ok([
            'offers' => UserOfferResource::collection($offers)
        ]);
    }
}
