<?php

namespace App\Http\Controllers;

use App\Classes\Pagination;
use App\Http\Requests\Offers\CreateOfferRequest;
use App\Http\Requests\Offers\EditOfferRequest;
use App\Http\Requests\PaginationRequest;
use App\Http\Resources\Offers\OfferResource;
use App\Http\Resources\Offers\UserOfferResource;
use App\Library\GooglePlace\IGooglePlaceService;
use App\Library\Results;
use App\Library\Storage\EStorageResponse;
use App\Library\Storage\StorageService;
use App\Models\OfferImage;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
    public function __construct(
        private StorageService $storageServ,
        private IGooglePlaceService $googlePlaceServ
    ) { }

    public function getUserOffers()
    {
        $offers = Offer::query()
            ->where('user_id', Auth::user()->id)
            ->get();

        return response()->json([
            'offers' => UserOfferResource::collection($offers)
        ]);
    }

    public function getOffers(PaginationRequest $request)
    {
        $data = $request->validated();

        $query = Offer::baseQuery(isVisible: true)
            ->with(["offerImages"]);

        $p = Pagination::paginate($query, $data);

        $p->list = OfferResource::collection($p->list);

        return Results::ok($p);
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

        if($validated["place_id"] != null)
        {
            $result = $this->googlePlaceServ->Location($validated["place_id"]);

            if($result == null)
                return Results::badRequest(["message" => "Le place id n'existe pas"]);

            $offer->longitude = $result->longitude;
            $offer->latitude = $result->latitude;
        }
        else
        {
            if($validated['latitude'] == null || $validated['longitude'])
                return Results::badRequest(["message" => "latitude et longitude obligatoire si pas de place id"]);

            $offer->longitude = $validated['longitude'];
            $offer->latitude = $validated['latitude'];
        }

        $offer->user()->associate(Auth::user()->id);
        $offer->save();

        $result = Offer::baseQuery($offer->id)->first();

        return response()->json([
            'offer' => OfferResource::make($result)
        ]);
    }

    public function get(int $id)
    {
        $result = Offer::baseQuery($id)
            ->with(['wishs.subCategory', 'offerImages'])
            ->first();

        if($result !== null)
            return Results::ok(OfferResource::make($result));

        return Results::notFound();
    }

    public function update(EditOfferRequest $request, Offer $offer)
    {
        $this->authorize('update', $offer);

        $validated = $request->validated();

        $offer->update($validated);
        $result = Offer::baseQuery($offer->id)->first();

        return response()->json([
            'offer' => OfferResource::make($result)
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

    public function fileStore(Request $request)
    {
        $file = $request->file("fichier");
        $offerId = $request->input("offer_id", 0);
        $order = $request->input("order", 0);

        $offerId = Offer::where([
            ["id", "=", $offerId],
            ["user_id", "=", Auth::id()]
        ])?->value("id");

        if($offerId === null)
            return Results::notFound();

        $response = $this->storageServ->upload($file, "offers/$offerId", "public");

        if($response->state == EStorageResponse::Ok)
        {
            OfferImage::create([
                "order" => $order,
                "offer_id" => $offerId,
                "url" => $response->url
            ]);
        }

        return Results::ok(["state" => $response->state]);
    }

    public function deleteFile(int $fileOfferId)
    {
        if($fileOfferId <= 0)
            return Results::notFound();

        $query = OfferImage::join(
            (new Offer())->getTable()." as o", 
            "o.id", "=", "offer_images.offer_id"
        )
        ->where([
            ["offer_images.id", "=", $fileOfferId],
            ["user_id", "=", Auth::id()]
        ]);

        if(!$query->exists())
            return Results::notFound();

        $imageOfferUrl = $query->value("url");

        $this->storageServ->delete($imageOfferUrl, "public");

        $ok = $query->delete();

        return $ok ? Results::noContent() : Results::notFound();
    }
}
