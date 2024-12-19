<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\Users\UserResource;
use App\Library\Results;
use App\Models\User;
use App\Models\Language;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        //return Results::ok($request->json());

        $request->validate([
            'language_iso' => ["required", "exists:languages,codeISO"],
            'first_name' => ["required", "max:300"],
            'last_name' => ["required", "max:300"],
            'phone' => ["nullable", "max:20"],
            'username' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'min:8', Rules\Password::defaults()],
        ]);

        $languageId = Language::where("codeISO", $request->language_iso)
            ->value("id");

        $user = User::create([
            'language_id' => $languageId,
            'phone' => $request->phone,
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'username' => $request->username,
            'email' => $request->email,
            "phone" => $request->phone,
            'password' => Hash::make($request->password)
        ]);

        event(new Registered($user));

        $token = $user->createToken('auth_token')->plainTextToken;

        return Results::created([
            'token' => $token,
            'username' => $user->username
        ]);
    }
}
