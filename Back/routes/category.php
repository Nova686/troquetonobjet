<?php


use App\Http\Controllers\Category\CategoryController;
use Illuminate\Support\Facades\Route;

Route::controller(CategoryController::class)->prefix("category")->group(function () {
    Route::get('/{category}','get')
        ->whereNumber("category");

    Route::get("/all/{idLanguage}", "getAll")
        ->whereNumber("{idLanguage}");

    Route::post("/", "post");

    Route::delete("/{category}", "delete")
        ->whereNumber("category");

    Route::put("/{category}","update")
        ->whereNumber("category");
});