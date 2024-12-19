<?php

namespace App\Http\Requests\UserAddress;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UserAddressRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "city_name" => ["required", "string", "max:100"],
            "place_id" => ["required"]
        ];
    }
}
