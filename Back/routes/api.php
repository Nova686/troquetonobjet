<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;


Route::prefix('/')->group(function () {
    // Route for Users
    Route::prefix('users')->group(function () {
        Route::get('offers', [OfferController::class, 'getUserOffers']);
    });

    // Route for Offers
    Route::prefix('offers')->group(function (): void {
        Route::post('', [OfferController::class, 'store']);
        Route::put('{offer}', [OfferController::class, 'update']);
        Route::delete('{offer}', [OfferController::class, 'destroy']);
    });
});
