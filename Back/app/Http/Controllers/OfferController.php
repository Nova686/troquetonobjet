<?php

namespace App\Http\Controllers;

use App\Http\Requests\Offers\CreateOfferRequest;
use App\Http\Requests\Offers\EditOfferRequest;
use App\Http\Resources\Offers\OfferResource;
use App\Http\Resources\Offers\UserOfferResource;
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

    public function index(Request $request)
    {
        $offers = Offer::query()
            ->with(['user'])
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

    public function show(Offer $offer)
    {
        return response()->json([
            'offer' => OfferResource::make($offer)
        ]);
    }

    public function update(EditOfferRequest $request, Offer $offer)
    {
        $validated = $request->validated();

        $offer->update($validated);

        return response()->json([
            'offer' => OfferResource::make($offer)
        ]);
    }

    public function destroy(Offer $offer)
    {
        $offer->delete();

        return response()->noContent();
    }
}
