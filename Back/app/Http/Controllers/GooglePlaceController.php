<?php

namespace App\Http\Controllers;

use App\Library\GooglePlace\IGooglePlaceService;
use App\Library\Results;
use Illuminate\Http\Request;

class GooglePlaceController extends Controller
{
    public function __construct(
        private IGooglePlaceService $googlePlaceServ
    ) { }

    public function AutoComplete(Request $request)
    {
        $validated = $request->validate([
            "search_term" => ["required", "min:2"]
        ]);

        $result = $this->googlePlaceServ->AutoComplete(
            $validated["search_term"]
        );

        return Results::ok($result);
    }
}
