<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\GooglePlaceController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Category\SubCategoryController;

// Route for Offers
Route::prefix('offers')->group(function () {
    Route::get('', [OfferController::class, 'getOffers']);
    Route::get('{offer}', [OfferController::class, 'get']);
});

Route::get("auto-complete", [GooglePlaceController::class, "AutoComplete"]);

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
    Route::get('/{subCategory}','get')
        ->whereNumber("subCategory");

    Route::get("/all/{idLanguage}", "getAll")
        ->whereNumber("idLanguage");

    Route::post("/", "create");

    Route::delete("/{idSubCategory}", "delete")
        ->whereNumber("idSubCategory");

    Route::put("/{subCategory}","update")
        ->whereNumber("subCategory");
});
