<?php

namespace App\Http\Resources\Offers;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserOfferResource extends JsonResource
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
            'author' => ["id" => $this->user->id, "username" => $this->user->username],
            'isDonation' => (bool)$this->is_donation,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'cityName' => $this->city_name,
            'images' => $this->whenLoaded('offerImages', function() {
                $urlList = [];
                foreach ($this->offerImages as $element) {
                    if($element->order != 0)
                        $urlList[] = url("storage/".$element->url);
                }

                return $urlList;
            }),
            'mainImage' => $this->whenLoaded('offerImages', function () {
                return $this->mainOfferImage ? url("storage/" . $this->mainOfferImage->url) : null;
            }),
            'isUpdated' => $this->isUpdated,
            'createdAt' => $this->created_at,
        ];
    }
}
