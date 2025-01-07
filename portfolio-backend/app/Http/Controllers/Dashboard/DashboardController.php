<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getDashboard()
    {
        $users = User::select("id", "name", "email")->get();

        return response()->json([
            "users" => $users
        ], 200);
    }
}
