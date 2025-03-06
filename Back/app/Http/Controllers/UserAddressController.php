<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserAddress\UserAddressRequest;
use App\Library\GooglePlace\IGooglePlaceService;
use App\Library\Results;
use App\Models\UserAddress;
use Illuminate\Support\Facades\Auth;

class UserAddressController extends Controller
{
    public function __construct(
        private IGooglePlaceService $googlePlaceServ
    ) { }

    public function getAll()
    {
        $liste = UserAddress::where("user_id", Auth::user()->id)
            ->select("id", "city_name")
            ->orderBy("city_name")
            ->get();

        return Results::ok(["userAddress" => $liste]);
    }

    public function store(UserAddressRequest $request)
    {
        $validated = $request->validated();

        $info = $this->googlePlaceServ->Location($validated["place_id"]);

        if($info === null)
            return Results::notFound(["message" => "'place_id' n'existe pas"]);

        $obj = UserAddress::create([
            "longitude" => $info->longitude,
            "latitude" => $info->latitude,
            "city_name" => $validated["city_name"],
            "user_id" => Auth::user()->id
        ]);

        return $obj->id == 0 ? Results::badRequest() : Results::created([
            "longitude" => $info->longitude,
            "latitude" => $info->latitude
        ]);
    }

    public function delete(int $userAddressId)
    {
        if($userAddressId <= 0)
            return Results::notFound();

        $isDeleted = UserAddress::where([
            ["user_id", "=", Auth::user()->id],
            ["id", "=", $userAddressId]
        ])
        ->delete();

        return $isDeleted ? Results::noContent() : Results::notFound();
    }
}