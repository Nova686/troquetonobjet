<?php

namespace App\Http\Requests;

use App\Models\Language;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "first_name" => ["required", "max:300", "string"],
            "last_name" => ["required", "max:300", "string"],
            "phone" => ["nullable", "max:20", "string"],
            "language_id" => ["integer", "exists:languages,id"]
        ];
    }
}
