<?php

namespace App\Library\GooglePlace;

use Exception;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class GooglePlaceService implements IGooglePlaceService
{
    private const BASE_URL = "https://maps.googleapis.com/maps/api/place";

    private const AUTO_COMPLETE = "/autocomplete/json?types=(cities)&components=country:fr";
    private const DETAIL = "/details/json?";

    public function AutoComplete(string $_searchTerm)
    {
        if(empty($_searchTerm))
            return [];

        $apiKey = $this->GetKey();

        if(empty($apiKey))
            throw new Exception("env GOOGLE_MAPS_API_KEY introuvable");

        $response = Http::get(self::BASE_URL.self::AUTO_COMPLETE."&key=$apiKey"."&input=$_searchTerm");
        
        if($response->status() != Response::HTTP_OK)
            throw new Exception($response->body());

        $liste = $response->json("predictions");

        /** @var AutoCompleteResponse[] */
        $result = [];

        foreach ($liste as $element)
        {
            $result[] = new AutoCompleteResponse(
                $element["description"],
                $element["place_id"]
            );
        }
        
        return $result;
    }

    public function Location(string $_placeId)
    {
        if(empty($_placeId))
            return null;

        $apiKey = $this->GetKey();

        if(empty($apiKey))
            throw new Exception("env GOOGLE_MAPS_API_KEY introuvable");

        $response = Http::get(self::BASE_URL.self::DETAIL."key=$apiKey"."&place_id=$_placeId");

        if($response->json("status") != "OK")
            return null;

        $info = $response->json("result.geometry.location");

        return new LocationResponse(
            $info["lng"],
            $info["lat"]
        );
    }

    private function GetKey(): string
    {
        return env("GOOGLE_MAPS_API_KEY");
    }
}