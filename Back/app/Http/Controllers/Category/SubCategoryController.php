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
            "subcategory"=>SubCategoryResource::collection($subCategory),
        ]);
    }

    public function getAll(int $idLanguage)
    {
        if($idLanguage<=0){
            return Results::notFound();
        }
        $subcategories=SubCategory::where("language_id", $idLanguage)->get();

        return Results::ok([
            "subcategories"=>SubCategoryResource::collection($subcategories)
        ]);
    }

    public function create(Request $request)
    {
        $validated=$request->validate([
            "name"=>["max:255", "required", "unique:sub_categories,name"],
            "category_id"=>["required", "integer", "min:1", "exists:categories,id"],
            "language_id"=>["required", "integer", "min:1", "exists:languages,id"]
        ]);

        $subcategory = new SubCategory();
        $subcategory->name=$validated["name"];
        $subcategory->category()->associate($validated['category_id']);
        $subcategory->language()->associate($validated['language_id']);
        $subcategory->save();
        
        return Results::created([
            "subcategory"=>SubCategoryResource::make($subcategory),
        ]);
    }
    public function update(Request $request, SubCategory $subcategory)
    {
        dd($request);
        $validated=$request->validate([
            "name"=>["max:255","required", "unique:"((new SubCategory)->getTable()).",name"]
        ]);
        $subcategory->update($validated);
        return Results::ok(_body: ["subcategory"=>SubCategoryResource::make($subcategory)]);
    }

    public function delete(int $idsubcategory)
    {
        if($idsubcategory<= 0){
            return Results::notFound();
        }
        $isOkay = SubCategory::where("id",$idsubcategory)->delete();
        
        return $isOkay ? Results::noContent() : Results::notFound();
    }
}
