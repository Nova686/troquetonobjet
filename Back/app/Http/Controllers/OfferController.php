<?php

namespace App\Http\Controllers;

use App\Http\Requests\Offers\CreateOfferRequest;
use App\Http\Requests\Offers\EditOfferRequest;
use App\Http\Resources\Offers\OfferResource;
use App\Http\Resources\Offers\UserOfferResource;
use App\Library\Results;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
    public function getUserOffers()
    {
        $offers = Offer::query()
            ->where('user_id', Auth::user()->id)
            ->get();

        return response()->json([
            'offers' => UserOfferResource::collection($offers)
        ]);
    }

    public function getOffers(Request $request)
    {
        $offers = Offer::query()
            ->with(['user'])
            ->isVisible()
            ->get();

        return response()->json([
            'offers' => OfferResource::collection($offers)
        ]);
    }

    public function store(CreateOfferRequest $request)
    {
        $validated = $request->validated();

        $offer = new Offer();
        $offer->title = $validated['title'];
        $offer->description = $validated['description'];
        $offer->is_visible = $validated['is_visible'];
        $offer->is_donation = $validated['is_donation'];
        $offer->city_name = $validated['city_name'];
        $offer->longitude = $validated['longitude'];
        $offer->latitude = $validated['latitude'];
        $offer->user()->associate(Auth::user()->id);
        $offer->save();

        return response()->json([
            'offer' => OfferResource::make($offer)
        ]);
    }

    public function get(Offer $offer)
    {
        $this->authorize('view', $offer);

        return response()->json([
            'offer' => OfferResource::make($offer)
        ]);
    }

    public function update(EditOfferRequest $request, Offer $offer)
    {
        $this->authorize('update', $offer);

        $validated = $request->validated();

        $offer->update($validated);

        return response()->json([
            'offer' => OfferResource::make($offer)
        ]);
    }

    public function destroy(int $idOffer)
    {
        $isDeleted = Offer::query()
        ->where('id', $idOffer)
            ->where('user_id', Auth::user()->id)
            ->delete();

        return $isDeleted ? Results::noContent() : Results::notFound();
    }
}
