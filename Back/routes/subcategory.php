<?php


use App\Http\Controllers\Category\SubCategoryController;
use Illuminate\Support\Facades\Route;

Route::controller(SubCategoryController::class)->prefix("subcategory")->group(function () {
    Route::get('/{subcategory}','get')
        ->whereNumber("subcategory");

    Route::get("/", "getAll/{idLanguage}")
    ->whereNumber("idLanguage");

    Route::post("/", "post");

    Route::delete("/{idsubcategory}", "delete")
        ->whereNumber("subcategory");

    Route::put("/{subcategory}","update")
        ->whereNumber("subcategory");
});