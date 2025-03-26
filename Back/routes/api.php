<?php

use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\FavoriteOfferController;
use App\Http\Controllers\UserAddressController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishOfferController;

// Route for Users
Route::prefix('users')->group(function () {
    Route::put('update', [UserController::class, 'update']);
    Route::get('offers', [OfferController::class, 'getUserOffers']);
});

// Route for Offers
Route::prefix('offers')->group(function (): void {
    Route::post('', [OfferController::class, 'store']);
    Route::post("upload", [OfferController::class, 'fileStore']);
    Route::delete("delete-file/{fileOfferId}", [OfferController::class, 'deleteFile'])
        ->whereNumber("fileOfferId");

    Route::prefix('{offer}')->group(function (): void {
        Route::put('', [OfferController::class, 'update']);
        Route::delete('', [OfferController::class, 'destroy']);
        Route::post('favorite', [FavoriteOfferController::class, 'favorite']);

        Route::post('conversation', [ConversationController::class, 'create']);

        Route::post('wishs', [WishOfferController::class, 'add']);
    });
    Route::delete('wishs/{idWishOffer}', [WishOfferController::class, 'remove']);
    Route::get('favorite', [FavoriteOfferController::class, 'get']);
});

// Route for Conversations
Route::prefix('conversations')->group(function () {
    Route::get('', [ConversationController::class, 'getConversations']);
    Route::post('{conversation}/close', [ConversationController::class, 'hide']);

    Route::prefix('{conversation}')->group(function () {
        Route::prefix('messages')->group(function () {
            Route::get('', [MessageController::class, 'get']);
            Route::post('', [MessageController::class, 'store']);
        });
    });
});

// Route for Messages
Route::prefix('messages')->group(function () {
    Route::put('{message}', [MessageController::class, 'update']);
    Route::delete('{message}', [MessageController::class, 'destroy']);

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
