<?php

namespace App\Http\Requests\Offers;

use Illuminate\Foundation\Http\FormRequest;

class CreateOfferRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:5', 'max:100'],
            'description' => ['required', 'string', 'max:1500'],
            'is_visible' => ['required', 'boolean'],
            'is_donation' => ['required', 'boolean'],
            'city_name' => ['required', 'string', 'max:100'],
            'longitude' => [
                'nullable', 
                'numeric', 
                'required_without:place_id', 
                'required_with:latitude'
            ],
            'latitude' => [
                'nullable', 
                'numeric', 
                'required_without:place_id',
                'required_with:longitude'
            ],
            'place_id' => ['nullable', 'required_without_all:longitude,latitude']
        ];
    }
}
