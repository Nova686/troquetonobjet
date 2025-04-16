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
            "username" => ["required", "max:300", "string"],
            "phone" => ["nullable", "max:20", "string"],
            "language_id" => ["integer", "exists:languages,id"],
            "two_fa_activated" => ["required", "boolean"]
        ];
    }
}
