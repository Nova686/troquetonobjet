<?php

use App\Http\Controllers\ConversationController;
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
});
