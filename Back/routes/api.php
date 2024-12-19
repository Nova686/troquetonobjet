<?php

use App\Http\Controllers\ConversationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Category\SubCategoryController;

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
    Route::controller(CategoryController::class)->prefix("category")->group(function () {
        Route::get('/{category}','get')
            ->whereNumber("category");
    
        Route::get("/all/{idLanguage}", "getAll")
            ->whereNumber("{idLanguage}");
    
        Route::post("/", "create");
    
        Route::delete("/{category}", "delete")
            ->whereNumber("category");
    
        Route::put("/{category}","update")
            ->whereNumber("category");
    });
    Route::controller(SubCategoryController::class)->prefix("subcategory")->group(function () {
        Route::get('/{subcategory}','get')
            ->whereNumber("subcategory");
    
        Route::get("/all/{idLanguage}", "getAll")
            ->whereNumber("idLanguage");
    
        Route::post("/", "create");
    
        Route::delete("/{idsubcategory}", "delete")
            ->whereNumber("subcategory");
    
        Route::put("/{subcategory}","update")
            ->whereNumber("subcategory");
    });
});
