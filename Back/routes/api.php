<?php

use App\Http\Controllers\ConversationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\UserAddressController;

// Route for Users
Route::prefix('users')->group(function () {
    Route::get('offers', [OfferController::class, 'getUserOffers']);
});

// Route for Offers
Route::prefix('offers')->group(function (): void {
    Route::post('', [OfferController::class, 'store']);

    Route::prefix('{offer}')->group(function (): void {
        Route::put('', [OfferController::class, 'update']);
        Route::delete('', [OfferController::class, 'destroy']);

        Route::post('conversation', [ConversationController::class, 'create']);
    });
});

// Route for Conversations
Route::prefix('conversations')->group(function () {
    Route::get('', [ConversationController::class, 'getConversations']);
    Route::post('{conversation}/close', [ConversationController::class, 'hide']);
});

Route::prefix('user-address')
    ->controller(UserAddressController::class)
    ->group(function () 
    {
        Route::get("", "getAll");
        Route::post("", "store");
        Route::delete("{userAddressId}", "delete")
            ->whereNumber("userAddressId");
    });
