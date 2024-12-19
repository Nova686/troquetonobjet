<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Library\Results;
use App\Models\Category;
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

    public function post(Request $request)
    {
        $validated=$request->validate([
            "name"=>["max:255", "required", "unique:categories,name"],
            "language_id"=>["exists:languages,id","integer"]
        ]);

        $category=Category::create($validated);
        
        return Results::ok([
            "category"=> CategoryResource::make($category),
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated=$request->validate([
            "name"=>["max:255","required", "unique:categories,name"]
        ]);
        $category->update($validated);
        return Results::ok(_body: ["category"=>CategoryResource::make($category)]);
    }

    public function delete(int $idCategory)
    {
        if ($idCategory<=0){
            return Results::notFound();
        }
        $isOkay = Category::where("id",$idCategory)->delete();

        return $isOkay ? Results::noContent() : Results::notFound();
    }
}
