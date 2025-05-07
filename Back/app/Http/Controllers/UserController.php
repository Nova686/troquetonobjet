<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Report;

class UserController extends Controller
{
    public function getAllUsers(Request $request)
    {
        $users = User::all();
        $reports = Report::all();

        $userReports = [];
        foreach ($users as $user) {
            $userReports[$user->id] = [
                'user' => $user,
                'reports' => $reports->where('user_id', $user->id),
            ];
        }
        return response()->json([
            'users' => $userReports,
        ]);
    }
}
