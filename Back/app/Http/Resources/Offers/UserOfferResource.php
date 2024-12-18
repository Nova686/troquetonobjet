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
            'isDonation' => (bool)$this->is_donation,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'city_name' => $this->city_name,
            'isUpdated' => $this->isUpdated,
            'createdAt' => $this->created_at,
        ];
    }
}
