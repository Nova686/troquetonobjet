<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LanguageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "codeISO" => $this->codeISO,
            "categories" => $this->categories,
            "subCategories" => $this->subCategories,
            "languageTrad" => $this->languageTrad,
        ];
    }
}
