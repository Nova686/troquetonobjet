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
            "username" => ["string", "max:255"],
            "phone" => ["nullable", "max:20", "string"],
			"avatar" => ["integer", "nullable", "min:1", "max:8"], 
            "language_id" => ["integer", "exists:languages,id"],
			"two_fa_activated" => ["required", "boolean"]
        ];
    }
}
