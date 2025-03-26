<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\GooglePlaceController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Category\SubCategoryController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\UserAddressController;
use App\Http\Controllers\WishOfferController;

// Route for Offers
Route::prefix('offers')->group(function () {
    Route::get('', [OfferController::class, 'getOffers']);

    Route::prefix('{offer}')->group(function () {
        Route::get('', [OfferController::class, 'get']);

        Route::get('wishs', [WishOfferController::class, 'get']);
    });
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

Route::controller(ReportController::class)->prefix("report")->group(function () {
    Route::get('', 'getReports');
    Route::post('', 'create');
    Route::delete('{id}', 'delete')
        ->whereNumber("id");
});

Route::controller(LanguageController::class)->prefix("language")->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'create');
    Route::get('/{language}', 'show')
        ->whereNumber("language");
    Route::put('/{language}', 'update')
        ->whereNumber("language");
});
