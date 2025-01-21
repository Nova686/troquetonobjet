<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Resources\SubCategoryResource;
use App\Library\Results;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Language;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    //
    public function get(SubCategory $subCategory)
    {
        return Results::ok([
            "subCategory"=>SubCategoryResource::make($subCategory),
        ]);
    }

    public function getAll(int $idLanguage)
    {
        if($idLanguage<=0){
            return Results::notFound();
        }
        $subCategories=SubCategory::where("language_id", $idLanguage)->get();

        return Results::ok([
            "subCategories"=>SubCategoryResource::collection($subCategories)
        ]);
    }

    public function create(Request $request)
    {
        $validated=$request->validate([
            "name"=>["max:255", "required", "unique:".((new SubCategory())->getTable()).",name"],
            "category_id"=>["required", "integer", "min:1", "exists:".((new Category())->getTable()).",id"],
            "language_id"=>["required", "integer", "min:1", "exists:".((new Language())->getTable()).",id"]
        ]);

        $subCategory = new SubCategory();
        $subCategory->name=$validated["name"];
        $subCategory->category()->associate($validated['category_id']);
        $subCategory->language()->associate($validated['language_id']);
        $subCategory->save();
        
        return Results::created([
            "subCategory"=>SubCategoryResource::make($subCategory),
        ]);
    }
    public function update(Request $request, SubCategory $subCategory)
    {
        $validated=$request->validate([
            "name"=>["max:255","required", "unique:".((new SubCategory)->getTable()).",name"]
        ]);
        $subCategory->update($validated);
        return Results::ok(_body: ["subCategory"=>SubCategoryResource::make($subCategory)]);
    }

    public function delete(int $idSubCategory)
    {
        if($idSubCategory<= 0){
            return Results::notFound();
        }
        $isDeleted = SubCategory::where("id",$idSubCategory)->delete();
        
        return $isDeleted ? Results::noContent() : Results::notFound();
    }
}
