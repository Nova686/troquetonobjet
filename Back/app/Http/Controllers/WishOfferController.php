<?php

namespace App\Http\Controllers;

use App\Http\Resources\WishOfferResource;
use App\Library\Results;
use App\Models\Offer;
use App\Models\SubCategory;
use App\Models\WishOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishOfferController extends Controller
{
    public function get(Offer $offer)
    {
        $wishs = WishOffer::query()
            ->where('offer_id', $offer->id)
            ->get();

        return Results::ok([
            'wishs' => WishOfferResource::collection($wishs)
        ]);
    }

    public function add(Offer $offer, Request $request)
    {
        $this->authorize('update', $offer);

        $validated = $request->validate([
            'text' => ['required', 'string'],
            'sub_category_id' => ['nullable', 'exists:' . (new SubCategory())->getTable() . ',id']
        ]);

        $wish = new WishOffer();
        $wish->text = $validated['text'];
        $wish->offer()->associate($offer);
        if (isset($validated['sub_category_id'])) {
            $wish->subCategory()->associate($validated['sub_category_id']);
        }
        $wish->save();

        return Results::ok([
            'wish' => WishOfferResource::make($wish)
        ]);
    }

    public function remove(int $idWishOffer)
    {
        $isDeleted = WishOffer::query()
            ->join((new Offer())->getTable() . ' as o', 'o.id', '=', 'wish_offers.offer_id')
            ->where('o.user_id', Auth::id())
            ->where('wish_offers.id', $idWishOffer)
            ->delete();

        return $isDeleted ? Results::noContent() : Results::notFound();
    }
}
