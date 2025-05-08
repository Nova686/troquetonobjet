<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\LanguageResource;

class LanguageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $languages = Language::all();

        return response()->json([
            'languages' => LanguageResource::collection($languages),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request)
    {
        $validated=$request->validate([
            'code_iso' => 'required',
        ]);

        $language = new Language();
        $language->codeISO = $validated['code_iso'];
        $language->save();

        return response()->json([
            'language' => LanguageResource::make($language),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $language = Language::find($id);

        return response()->json([
            'language' => LanguageResource::make($language),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Language $language)
    {
        $validated=$request->validate([
            'code_iso' => 'required',
        ]);

        $language->codeISO = $validated['code_iso'];
        $language->save();

        return response()->json([
            'language' => LanguageResource::make($language),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Language $language)
    {
        $language->delete();

        return response()->json([
            'message' => 'Language deleted successfully',
        ]);
    }
}
