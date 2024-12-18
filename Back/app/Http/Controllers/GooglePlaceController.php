<?php

namespace App\Http\Controllers;

use App\Library\GooglePlace\IGooglePlaceService;
use App\Library\Results;

class GooglePlaceController extends Controller
{
    public function __construct(
        private IGooglePlaceService $googlePlaceServ
    ) { }

    public function AutoComplete(string $searchTerm)
    {
        $result = $this->googlePlaceServ->AutoComplete($searchTerm);

        return Results::ok($result);
    }
}
