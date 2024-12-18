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
            "searchTerm" => ["required", "min:2"]
        ]);

        $result = $this->googlePlaceServ->AutoComplete(
            $validated["searchTerm"]
        );

        return Results::ok($result);
    }
}
