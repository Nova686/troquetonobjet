<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;


Route::prefix('/')->group(function () {
    // Route for Offers
    Route::prefix('offers')->group(function () {
        Route::get('', [OfferController::class, 'index']);
        Route::get('{offer}', [OfferController::class, 'show']);
    });
});
