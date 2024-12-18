<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\GooglePlaceController;

Route::prefix('/')->group(function () {
    // Route for Offers
    Route::prefix('offers')->group(function () {
        Route::get('', [OfferController::class, 'getOffers']);
        Route::get('{offer}', [OfferController::class, 'get']);
    });

    Route::get("test/{searchTerm}", [GooglePlaceController::class, "AutoComplete"]);
    Route::get("test2/{placeId}", [GooglePlaceController::class, "Location"]);

});
