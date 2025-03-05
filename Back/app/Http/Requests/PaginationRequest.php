<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaginationRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "page" => "integer|required|min:1",
            "nb_per_page" => "integer|required|min:1|max:50",
            "search_term" => "string|nullable"
        ];
    }
}
