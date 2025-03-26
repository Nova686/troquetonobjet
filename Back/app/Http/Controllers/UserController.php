<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Library\Results;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function update(UserUpdateRequest $request)
    {
        $data = $request->validated();

        $nb = User::where("id", Auth::user()->id)->update($data);

        return $nb > 0 ? Results::noContent() : Results::notFound();
    }

    
}
