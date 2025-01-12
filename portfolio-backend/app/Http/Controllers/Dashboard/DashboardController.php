<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function getDashboard()
    {
        
            $users = User::count();
            $auth_user = Auth::user();
    
            return response()->json([
                "users" => $users,
                "auth_user" => $auth_user
            ], 200);

       
    }
}
