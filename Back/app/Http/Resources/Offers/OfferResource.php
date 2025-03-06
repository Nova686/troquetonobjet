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
            'images' => $this->whenLoaded('imageOffers', function()
            {
                $urlList = [];
                foreach ($this->imageOffers as $element) 
                {
                    if($element->order != 0)
                        $urlList[] = url(preg_replace("/public/", "/storage/", $element->url));
                }

                return $urlList;
            }),
            'mainImage' => $this->whenLoaded('imageOffers', function () 
            {
                foreach ($this->imageOffers as $element) 
                {
                    if($element->order == 0)
                    {
                        $url = $element->url;
                        break;
                    }
                }

                if(empty($url))
                    $url = $this->imageOffers[0]->url;

                return url(preg_replace("/public/", "/storage/", $url));
            }),
            'isDonation' => $this->is_donation,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'cityName' => $this->city_name,
            'isUpdated' => $this->updated_at != $this->created_at,
            'createdAt' => $this->created_at,
            'isFavorite' => (bool)$this->isFavorite
        ];
    }
}
