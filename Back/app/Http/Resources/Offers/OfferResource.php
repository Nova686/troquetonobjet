<?php

namespace App\Http\Resources\Offers;

use App\Http\Resources\Users\UserResource;
use App\Http\Resources\WishOfferResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'author' => ["id" => $this->userId, "username" => $this->username],
            'wishs' => $this->whenLoaded('wishs', function () {
                return WishOfferResource::collection($this->wishs);
            }),
            'images' => $this->whenLoaded('offerImages', function()
            {
                $urlList = [];
                foreach ($this->offerImages as $element) 
                {
                    if($element->order != 0)
                        $urlList[] = url("storage/".$element->url);
                }

                return $urlList;
            }),
            'mainImage' => $this->whenLoaded('offerImages', function () 
            {
                return $this->mainOfferImage ? url("storage/".$this->mainOfferImage->url) : null;
            }),
            'isDonation' => $this->is_donation,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'cityName' => $this->city_name,
            'isUpdated' => $this->updated_at != $this->created_at,
            'createdAt' => $this->created_at,
            'isFavorite' => (bool)$this->isFavorite,
            'reportNumber' => $this->reports()->count(),
        ];
    }
}
