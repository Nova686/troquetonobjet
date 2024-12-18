<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\GooglePlaceController;

// Route for Offers
Route::prefix('offers')->group(function () {
    Route::get('', [OfferController::class, 'getOffers']);
    Route::get('{offer}', [OfferController::class, 'get']);
});

Route::get("auto-complete/{searchTerm}", [GooglePlaceController::class, "AutoComplete"]);
