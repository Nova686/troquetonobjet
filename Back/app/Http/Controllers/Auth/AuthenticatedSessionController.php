<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Library\Mail\IMailService;
use App\Library\Results;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthenticatedSessionController extends Controller
{
    public function __construct(private IMailService $mailService) { }

    public function verif2fa(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "code" => "required|string"
        ]);

        if($validator->fails())
            return Results::badRequest();

        /** @var mixed */
        $user = Auth::user();

        $token = $user->createToken('auth_token', ["auth"])->plainTextToken;
        $user->remember_token = $token;
        $user->code_two_fa = null;
        
        $user->save();

        return Results::ok([
            'token' => $token,
            'user' => $user
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        try 
        {
            $request->validate([
                'email' => ['required', 'string', 'email'],
                'password' => ['required', 'string']
            ]);
    
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json(['message' => 'Invalid login credentials'], 401);
            }
    
            $user = User::find(Auth::user()->getAuthIdentifier());
            $token = "";
    
            if($user->two_fa_activated)
            {
                $user->code_two_fa = Str::random(6);
    
                $token = $user->createToken("auth_token", ["2fa"])->plainTextToken;
    
                $this->mailService->go(
                    $user->email, 
                    "Authentification", 
                    "Bonjour, \n votre code d'acces est: {$user->code_two_fa}"
                );    
            }
            else
                $token = $user->createToken('auth_token', ["auth"])->plainTextToken;
            
            $user->remember_token = $token;
            $user->save();

            return Results::ok([
                'token' => $token,
                'user' => $user->two_fa_activated ? null : $user
            ]); 
        } 
        catch (\Throwable $th) 
        {
            return Results::ok($th->getMessage());
        }

    }
    
    public function destroy(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    }
}