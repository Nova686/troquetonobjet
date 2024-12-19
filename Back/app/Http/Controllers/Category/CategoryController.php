<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Library\Results;
use App\Models\Category;
use App\Models\Language;
use DeepCopy\f013\C;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function get(Category $category)
    {
        return Results::ok([
            "category"=> CategoryResource::make($category),
        ]);
    }

    public function getAll(int $idLanguage)
    {
        $categories=Category::query()->where("language_id", $idLanguage)->get();

        return Results::ok(_body: ["categories" => CategoryResource::collection($categories)]);
    }

    public function create(Request $request)
    {
        $validated=$request->validate([
            "name"=>["max:255", "required", "unique:"(New Category())->getTable().",name"],
            "language_id"=>["exists:"(New Language())->getTable().",id","integer"]
        ]);

        $category=new Category();
        $category->name=$validated["name"];
        $category->language()->associate(Language::find($validated["language_id"]));
        $category->save();

        
        return Results::ok([
            "category"=> CategoryResource::make($category),
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated=$request->validate([
            "name"=>["max:255","required", "unique:"(New Category())->getTable().",name"]
        ]);
        $category->update($validated);
        return Results::ok(_body: ["category"=>CategoryResource::make($category)]);
    }

    public function delete(int $idCategory)
    {
        if ($idCategory<=0){
            return Results::notFound();
        }
        $isDeleted = Category::where("id",$idCategory)->delete();

        return $isDeleted ? Results::noContent() : Results::notFound();
    }
}
